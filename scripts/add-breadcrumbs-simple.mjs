// Добавление breadcrumbs в простые страницы (support, privacy, terms)
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = resolve(__dirname, '../src/app');

const PAGES = [
  {
    path: 'privacy/page.tsx',
    label: 'Политика конфиденциальности',
    importLine: 'import Header from "../components/Header";',
    afterHeader: '<Header />',
  },
  {
    path: 'terms/page.tsx',
    label: 'Пользовательское соглашение',
    importLine: 'import Header from "../components/Header";',
    afterHeader: '<Header />',
  },
];

function addBreadcrumbs(filePath, label, importLine, afterHeader) {
  let content = readFileSync(filePath, 'utf-8');

  // Проверяем, есть ли уже breadcrumbs
  if (content.includes('<Breadcrumbs')) {
    console.log(`⏭️  ${filePath} — breadcrumbs уже есть`);
    return false;
  }

  // Добавляем импорт Breadcrumbs
  if (!content.includes('import Breadcrumbs')) {
    content = content.replace(
      importLine,
      `${importLine}\nimport Breadcrumbs from "../components/Breadcrumbs";`
    );
  }

  // Добавляем breadcrumbs после Header
  const breadcrumbsCode = `\n      <Breadcrumbs items={[\n        { label: "Главная", href: "/" },\n        { label: "${label}" },\n      ]} />`;

  content = content.replace(afterHeader, afterHeader + breadcrumbsCode);

  writeFileSync(filePath, content);
  console.log(`✅ ${filePath} — breadcrumbs добавлены`);
  return true;
}

console.log('🔍 Добавление breadcrumbs в простые страницы\n');

let updated = 0;
for (const page of PAGES) {
  const filePath = resolve(APP_DIR, page.path);
  if (addBreadcrumbs(filePath, page.label, page.importLine, page.afterHeader)) {
    updated++;
  }
}

console.log(`\n📊 Итоги: обновлено ${updated}/${PAGES.length} страниц`);
