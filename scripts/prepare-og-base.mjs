/**
 * prepare-og-base.mjs — build-хук OG-MIGRATION (этап 2).
 *
 * Копирует собранный Next.js-экспорт out/verify.html в functions/verify_base.html —
 * базовый HTML, в который Firebase Function ssrVerifyPage инъектирует OG-теги.
 *
 * Запуск: автоматически в конце `npm run build` (package.json, скрипт build).
 *
 * ── Почему это build-хук, а не шаг CI ──────────────────────────────────────
 * verify_base.html обязан быть артефактом ТЕКУЩЕЙ сборки. Next.js хэширует
 * имена чанков и шрифтов на каждую сборку, поэтому любая заранее сохранённая
 * копия устаревает и начинает ссылаться на несуществующие /_next/static/*.
 *
 * 30.09.2026 это сломало авто-доставку отчётов (job 728cdf6e-09e5-4cbe-a3cb-
 * e17c4d0fb18c): в функции лежал снапшот от 7 сентября, часть его ассетов
 * отдавала 404, гидрация Next.js не проходила, маркер #passport-report не появлялся,
 * Playwright в report_service.py падал по таймауту, и ShareService возвращал
 * пользователю монеты, так и не отправив сообщение в Telegram.
 *
 * Хук живёт в `npm run build`, а не отдельным шагом CI, потому что тогда он
 * работает и при локальной сборке тоже: локальный `firebase deploy --only
 * functions` физически не сможет задеплоить мусор.
 *
 * В ci-cd.yml есть шаг-ПРОВЕРКА (не копирование): если этот хук когда-нибудь
 * отвяжут от скрипта build, CI упадёт и покажет именно это, а не молча
 * сделает работу за него.
 *
 * ── Расширение .mjs ────────────────────────────────────────────────────────
 * Обязательное требование, а не предпочтение: корневой eslint-config-next
 * включает правило @typescript-eslint/no-require-imports, поэтому CommonJS-
 * вариант с require() не проходит `npm run lint`. А линт в ci-cd.yml гейтит
 * деплой без `|| true` — ошибка здесь отменила бы весь деплой, включая
 * hosting. ESM-скрипты с .mjs в этом репо уже приняты: см. рядом
 * scripts/build-guide-data.mjs.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, "..");
const src = path.join(webRoot, "out", "verify.html");
const dest = path.join(webRoot, "functions", "verify_base.html");

// Якорь, перед которым функция инъектирует OG-теги. Должен совпадать с
// INJECTION_ANCHOR в functions/index.js.
const INJECTION_ANCHOR = '<meta name="next-size-adjust" content=""/>';

function fail(message) {
  console.error(`[prepare-og-base] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(src)) {
  fail(`not found: ${path.relative(webRoot, src)} — запустите "next build" перед этим шагом`);
}

const html = fs.readFileSync(src, "utf8");

// Страховка от смены формата вывода Next.js. Закалённая функция в этом случае
// НЕ падает — она отдаёт базу без изменения со статусом 200, поэтому доставка
// отчётов продолжает работать, а деградирует только превью. Но молча терять
// превью в проде хуже, чем упасть на сборке: здесь дефект виден сразу.
if (!html.includes(INJECTION_ANCHOR)) {
  fail(
    `в ${path.relative(webRoot, src)} нет якоря инъекции:\n` +
      `    ${INJECTION_ANCHOR}\n` +
      "  Вероятно, Next.js изменил разметку <head>. Обновите INJECTION_ANCHOR\n" +
      "  в functions/index.js и эту константу под новую разметку."
  );
}

if (html.split(INJECTION_ANCHOR).length - 1 !== 1) {
  fail(
    `якорь встречается ${html.split(INJECTION_ANCHOR).length - 1} раз, должен ровно 1 — ` +
      "инъекция OG-тегов станет неоднозначной"
  );
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);

// Проверяем результат копирования, а не только факт вызова: молча пустой или
// обрезанный файл привёл бы к тому же сценарию, что и устаревший снапшот.
const written = fs.readFileSync(dest, "utf8");
if (written !== html) {
  fail(
    `скопированный ${path.relative(webRoot, dest)} не совпадает с источником ` +
      `(${written.length} байт против ${html.length})`
  );
}

console.log(
  `[prepare-og-base] ${path.relative(webRoot, src)} → ` +
    `${path.relative(webRoot, dest)} (${written.length} байт, якорь на месте)`
);
