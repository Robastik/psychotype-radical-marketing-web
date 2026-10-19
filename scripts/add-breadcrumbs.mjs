// Добавление breadcrumbs в коммерческие страницы
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = resolve(__dirname, '../src/app');

const PAGES = [
  { path: 'audit-kartochki/page.tsx', label: 'Аудит карточки товара' },
  { path: 'dizayn-kartochki/page.tsx', label: 'Дизайн карточки товара' },
  { path: 'ctr-kartochki/page.tsx', label: 'Увеличение CTR карточки' },
  { path: 'infografika/page.tsx', label: 'Анализ инфографики' },
  { path: 'analiz-konkurentov/page.tsx', label: 'Анализ конкурентов' },
  { path: 'vizualny-audit/page.tsx', label: 'Визуальный аудит' },
];

function addBreadcrumbs(filePath, label) {
  let content = readFileSync(filePath, 'utf-8');

  // Проверяем, есть ли уже breadcrumbs
  if (content.includes('breadcrumbs={')) {
    console.log(`⏭️  ${filePath} — breadcrumbs уже есть`);
    return false;
  }

  // Находим heroDescription и добавляем breadcrumbs после него
  const heroDescPattern = /(heroDescription="[^"]*"\n\s*)(benefits=\{)/s;
  const match = content.match(heroDescPattern);

  if (!match) {
    console.log(`❌ ${filePath} — не найден паттерн для вставки`);
    return false;
  }

  const breadcrumbsCode = `breadcrumbs={[\n        { label: "Главная", href: "/" },\n        { label: "${label}" },\n      ]}\n      `;

  content = content.replace(heroDescPattern, `$1${breadcrumbsCode}$2`);
  writeFileSync(filePath, content);
  console.log(`✅ ${filePath} — breadcrumbs добавлены`);
  return true;
}

console.log('🔍 Добавление breadcrumbs в коммерческие страницы\n');

let updated = 0;
for (const page of PAGES) {
  const filePath = resolve(APP_DIR, page.path);
  if (addBreadcrumbs(filePath, page.label)) {
    updated++;
  }
}

console.log(`\n📊 Итоги: обновлено ${updated}/${PAGES.length} страниц`);
