/**
 * ssrVerifyPage — Firebase Function (v2) для динамических OG-тегов /verify.
 *
 * OG-MIGRATION, этап 2. Спецификация: docs/OG-PREVIEW-PLAN.md §Phase 2.
 *
 * Поток:
 *   GET /verify?id=<uuid>
 *     → читает verify_base.html (копия out/verify.html, build-артефакт)
 *     → фетчит BACKEND_URL/api/v1/analysis/public/{id}
 *     → инъекция OG-тегов ПЕРЕД <meta name="next-size-adjust" content=""/>
 *     → HTML + Cache-Control: public, max-age=0, s-maxage=86400
 *
 * Fallback-и:
 *   - API недоступен / id невалиден / статус != completed → дефолтные OG-теги (брендинг)
 *   - og_image_url отсутствует в Firestore → og:image = прокси-URL фото товара с бэкенда
 *
 * Клиентская гидрация SPA не затрагивается: инъекция добавляет только <meta>-теги в <head>.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { onRequest } from "firebase-functions/v2/https";

// ESM-эквивалент __dirname (в модулях с "type": "module" глобального __dirname нет).
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BACKEND_URL = "https://eyecard-api-634368981577.us-central1.run.app";
const VERIFY_ORIGIN = "https://eyecard.ru";
const INJECTION_ANCHOR = '<meta name="next-size-adjust" content=""/>';
const API_TIMEOUT_MS = 5000;

// verify_base.html читается один раз на инстанс (cold start), дальше — из памяти.
let verifyBaseHtml = null;

function getVerifyBaseHtml() {
  if (verifyBaseHtml === null) {
    const basePath = path.join(__dirname, "verify_base.html");
    verifyBaseHtml = fs.readFileSync(basePath, "utf8");
  }
  return verifyBaseHtml;
}

/** Экранирование значений атрибутов meta (кавычки, <, >). */
function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Дефолтные OG-теги (брендинг eyeCARD) — для ошибок и невалидных id. */
function buildFallbackTags(id) {
  const url = id
    ? `${VERIFY_ORIGIN}/verify?id=${encodeURIComponent(id)}`
    : `${VERIFY_ORIGIN}/verify`;
  return [
    '<meta property="og:type" content="article"/>',
    `<meta property="og:url" content="${escapeAttr(url)}"/>`,
    '<meta property="og:site_name" content="eyeCARD"/>',
    '<meta property="og:title" content="Визуальный паспорт карточки товара"/>',
    '<meta property="og:description" content="Психология продаж: смыслы, архетипы и эмоции 🧠"/>',
    '<meta name="twitter:card" content="summary_large_image"/>',
  ].join("\n    ");
}

/** OG-теги из JSON ответа /public/{id}. */
function buildOgTags(id, data) {
  const title = "Визуальный паспорт карточки товара";
  const description = "Психология продаж: смыслы, архетипы и эмоции 🧠";

  // og_image_url (генерируется этапом 1); fallback — прокси-фото с бэкенда.
  let imageUrl = data.og_image_url;
  let imageDims = imageUrl
    ? '<meta property="og:image:width" content="1200"/>\n    <meta property="og:image:height" content="630"/>'
    : "";
  if (!imageUrl) {
    imageUrl = `${BACKEND_URL}/api/v1/analysis/image/${encodeURIComponent(id)}`;
  }

  const url = `${VERIFY_ORIGIN}/verify?id=${encodeURIComponent(id)}`;

  return [
    '<meta property="og:type" content="article"/>',
    `<meta property="og:url" content="${escapeAttr(url)}"/>`,
    '<meta property="og:site_name" content="eyeCARD"/>',
    `<meta property="og:title" content="${escapeAttr(title)}"/>`,
    `<meta property="og:description" content="${escapeAttr(description)}"/>`,
    `<meta property="og:image" content="${escapeAttr(imageUrl)}"/>`,
    imageDims,
    '<meta name="twitter:card" content="summary_large_image"/>',
    `<meta name="twitter:title" content="${escapeAttr(title)}"/>`,
    `<meta name="twitter:description" content="${escapeAttr(description)}"/>`,
    `<meta name="twitter:image" content="${escapeAttr(imageUrl)}"/>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

async function fetchAnalysis(id) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v1/analysis/public/${encodeURIComponent(id)}`,
      { signal: controller.signal, headers: { Accept: "application/json" } }
    );
    if (!res.ok) return null;
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const ssrVerifyPage = onRequest(
  { region: "us-central1", memory: "256Mi", maxInstances: 10 },
  async (req, res) => {
    const id = (req.query.id || "").toString().trim();

    let ogTags;
    try {
      const data = id ? await fetchAnalysis(id) : null;
      ogTags =
        data && data.status === "completed" ? buildOgTags(id, data) : buildFallbackTags(id);
    } catch (err) {
      console.warn(`[ssrVerifyPage] backend fetch failed for id=${id}: ${err.message}`);
      ogTags = buildFallbackTags(id);
    }

    let html = getVerifyBaseHtml();
    if (!html.includes(INJECTION_ANCHOR)) {
      console.error("[ssrVerifyPage] injection anchor not found in verify_base.html");
      res.status(500).send("verify base html missing injection anchor");
      return;
    }
    html = html.replace(INJECTION_ANCHOR, `${ogTags}\n    ${INJECTION_ANCHOR}`);

    // CDN-кэш сутки: Telegram краулер и повторные шары не долбят функцию.
    res.set("Cache-Control", "public, max-age=0, s-maxage=86400");
    res.set("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  }
);
