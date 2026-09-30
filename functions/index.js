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
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ИНВАРИАНТ ДОСТАВКИ — читать перед любой правкой этого файла
 * ─────────────────────────────────────────────────────────────────────────
 * На этот же URL смотрит Playwright в backend/app/services/report_service.py:
 *   :38   VERIFY_BASE_URL = "https://eyecard.ru/verify"
 *   :135  page.goto(url, wait_until="domcontentloaded")
 *   :142  if response.status >= 400: raise [STAGE:page_load]
 *   :150  wait_for_selector("#passport-report", timeout=MARKER_TIMEOUT)
 *
 * Провал загрузки = 3 попытки, 500 от скриншот-сервиса, ошибка ShareService,
 * полный возврат монет и ПОЛНОЕ ОТСУТСТВИЕ сообщения в Telegram. Так произошла
 * авария 30.09.2026 (job 728cdf6e): замороженный verify_base.html ссылался на
 * 10 несуществующих ассетов /_next/static/*, гидрация не проходила, маркер не
 * появлялся, wait_for_selector падал по таймауту.
 *
 * Отсюда два правила обработки сбоев:
 *
 *   1. Нет якоря инъекции → отдаём базу БЕЗ ИЗМЕНЕНИЯ и со статусом 200.
 *      Пропажа якоря означает, что Next.js изменил формат вывода, но сама
 *      страница остаётся валидной и гидратируемой. Доставка продолжает
 *      работать, деградирует только превью. Молчаливый 500 здесь был бы
 *      хуже: он убивает доставку ради косметики.
 *
 *   2. База не читается → ЯВНЫЙ 500 с внятным телом, никогда не
 *      непойманное исключение. Отдавать нечего, доставка обречена в любом
 *      случае, но report_service.py:142 диагностирует явный 500 как
 *      [STAGE:page_load] примерно за секунду — вместо 30-секундного
 *      таймаута на маркере, умноженного на три попытки, с непрозрачным
 *      стеком в логах. Быстрый и громкий провал здесь строго лучше
 *      тихого.
 *
 * Оба сценария отсекаются до деплоя в CI: шаг «Sync verify_base.html from
 * build» проверяет наличие якоря и размер файла. Поэтому в норме ни одна из
 * этих веток не достигается, а их поведение существует ради наблюдаемости.
 *
 * verify_base.html намеренно НЕ коммитится (см. functions/.gitignore): это
 * build-артефакт, который создаёт хук `npm run build:og-base`
 * (scripts/prepare-og-base.mjs) в конце каждой сборки. Хэши чанков и шрифтов
 * меняются на каждую сборку, поэтому закоммиченный снапшот неизбежно
 * устаревает — ровно это и сломало доставку отчётов 30.09.2026.
 *
 * В ci-cd.yml есть шаг-ПРОВЕРКА (cmp с out/verify.html), который падает, если
 * хук отвяжут от сборки или база окажется от прошлого прогона.
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
// null — «ещё не читали», false — «прочитать не удалось».
let verifyBaseHtml = null;
let verifyBaseReadFailed = false;

/**
 * Возвращает базовый HTML или null, если файл отсутствует/нечитаем.
 * Исключение не пробрасываем: непойманный throw дал бы 500 с непрозрачным
 * стеком, а вызывающему коду нужно различать «базы нет» и «база есть».
 */
function getVerifyBaseHtml() {
  if (verifyBaseReadFailed) return null;
  if (verifyBaseHtml !== null) return verifyBaseHtml;

  const basePath = path.join(__dirname, "verify_base.html");
  try {
    verifyBaseHtml = fs.readFileSync(basePath, "utf8");
    return verifyBaseHtml;
  } catch (err) {
    verifyBaseReadFailed = true;
    console.error(
      `[ssrVerifyPage] cannot read ${basePath}: ${err.message}. ` +
        "CI step 'Sync verify_base.html from build' did not run or did not deploy."
    );
    return null;
  }
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
  const imageDims = imageUrl
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
    // Базу читаем ПЕРВЫМ делом: если её нет — отвечать нечем, и бессмысленно
    // тратить до API_TIMEOUT_MS на запрос к бэкенду, результат которого
    // некуда инжектить. Это же снижает задержку на пути Playwright.
    const baseHtml = getVerifyBaseHtml();
    if (baseHtml === null) {
      // Явный 500 — см. правило 2 в шапке файла. no-store, чтобы CDN не
      // закешировал сбой на сутки, как закешировал бы успешный ответ.
      res.set("Cache-Control", "no-store");
      res
        .status(500)
        .send("ssrVerifyPage: verify_base.html is missing — build artifact was not synced");
      return;
    }

    const canInject = baseHtml.includes(INJECTION_ANCHOR);
    if (!canInject) {
      // Правило 1 в шапке файла: страница остаётся валидной и гидратируемой,
      // поэтому отдаём её как есть — доставка важнее превью.
      console.warn(
        "[ssrVerifyPage] injection anchor not found in verify_base.html — " +
          "serving base HTML without OG tags. Next.js output format may have changed."
      );
    }

    const id = (req.query.id || "").toString().trim();

    let ogTags = "";
    if (canInject) {
      try {
        const data = id ? await fetchAnalysis(id) : null;
        ogTags =
          data && data.status === "completed"
            ? buildOgTags(id, data)
            : buildFallbackTags(id);
      } catch (err) {
        console.warn(
          `[ssrVerifyPage] backend fetch failed for id=${id}: ${err.message}`
        );
        ogTags = buildFallbackTags(id);
      }
    }

    const html = canInject
      ? baseHtml.replace(INJECTION_ANCHOR, `${ogTags}\n    ${INJECTION_ANCHOR}`)
      : baseHtml;

    // CDN-кэш сутки: Telegram-краулер и повторные шары не долбят функцию.
    res.set("Cache-Control", "public, max-age=0, s-maxage=86400");
    res.set("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  }
);
