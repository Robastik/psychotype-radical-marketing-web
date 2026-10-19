// Анализ мета-тегов всех страниц
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = resolve(__dirname, '../src/app');

const PAGES_TO_CHECK = [
  { path: 'page.tsx', name: 'Главная' },
  { path: 'wildberries/page.tsx', name: 'Wildberries' },
  { path: 'ozon/page.tsx', name: 'Ozon' },
  { path: 'analiz-kartochki/page.tsx', name: 'Анализ карточки' },
  { path: 'audit-kartochki/page.tsx', name: 'Аудит карточки' },
  { path: 'dizayn-kartochki/page.tsx', name: 'Дизайн карточки' },
  { path: 'ctr-kartochki/page.tsx', name: 'CTR карточки' },
  { path: 'infografika/page.tsx', name: 'Инфографика' },
  { path: 'analiz-konkurentov/page.tsx', name: 'Анализ конкурентов' },
  { path: 'vizualny-audit/page.tsx', name: 'Визуальный аудит' },
  { path: 'support/page.tsx', name: 'Поддержка' },
  { path: 'privacy/page.tsx', name: 'Конфиденциальность' },
  { path: 'terms/page.tsx', name: 'Условия использования' },
  { path: 'consent/page.tsx', name: 'Согласие на обработку данных' },
  { path: 'guide/page.tsx', name: 'Guide (нет metadata - client component)' },
];

function extractMetaTags(filePath) {
  if (!existsSync(filePath)) return null;

  const content = readFileSync(filePath, 'utf-8');

  // Извлекаем title
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const title = titleMatch ? titleMatch[1] : null;

  // Извлекаем description
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  const description = descMatch ? descMatch[1] : null;

  return { title, description };
}

function analyzeLength(text, type) {
  const len = text ? text.length : 0;
  let status = '✅';
  let recommendation = '';

  if (type === 'title') {
    if (len < 50) {
      status = '⚠️';
      recommendation = 'Слишком короткий (рекомендуется 50-60 символов)';
    } else if (len > 60) {
      status = '⚠️';
      recommendation = 'Слишком длинный (рекомендуется 50-60 символов)';
    }
  } else if (type === 'description') {
    if (len < 120) {
      status = '⚠️';
      recommendation = 'Слишком короткий (рекомендуется 150-160 символов)';
    } else if (len > 160) {
      status = '⚠️';
      recommendation = 'Слишком длинный (рекомендуется 150-160 символов)';
    }
  }

  return { len, status, recommendation };
}

console.log('🔍 Анализ мета-тегов всех страниц\n');
console.log('═'.repeat(100));

const results = [];

for (const page of PAGES_TO_CHECK) {
  const filePath = resolve(APP_DIR, page.path);
  const meta = extractMetaTags(filePath);

  if (!meta || (!meta.title && !meta.description)) {
    console.log(`\n❌ ${page.name} (${page.path})`);
    console.log('   Мета-теги не найдены (возможно, это client component)');
    results.push({ page: page.name, path: page.path, status: '❌', title: null, description: null });
    continue;
  }

  const titleAnalysis = meta.title ? analyzeLength(meta.title, 'title') : null;
  const descAnalysis = meta.description ? analyzeLength(meta.description, 'description') : null;

  console.log(`\n📄 ${page.name} (${page.path})`);

  if (meta.title) {
    console.log(`   Title: ${titleAnalysis.status} [${titleAnalysis.len} символов]`);
    console.log(`   "${meta.title}"`);
    if (titleAnalysis.recommendation) {
      console.log(`   ⚠️  ${titleAnalysis.recommendation}`);
    }
  }

  if (meta.description) {
    console.log(`   Description: ${descAnalysis.status} [${descAnalysis.len} символов]`);
    console.log(`   "${meta.description}"`);
    if (descAnalysis.recommendation) {
      console.log(`   ⚠️  ${descAnalysis.recommendation}`);
    }
  }

  results.push({
    page: page.name,
    path: page.path,
    status: (titleAnalysis?.status === '✅' && descAnalysis?.status === '✅') ? '✅' : '⚠️',
    title: meta.title,
    titleLen: titleAnalysis?.len,
    description: meta.description,
    descLen: descAnalysis?.len,
  });
}

console.log('\n\n' + '═'.repeat(100));
console.log('📊 Итоги:');
console.log('═'.repeat(100));

const ok = results.filter(r => r.status === '✅');
const warning = results.filter(r => r.status === '⚠️');
const failed = results.filter(r => r.status === '❌');

console.log(`✅ Оптимизировано: ${ok.length}/${results.length}`);
console.log(`⚠️  Требует оптимизации: ${warning.length}/${results.length}`);
console.log(`❌ Нет мета-тегов: ${failed.length}/${results.length}`);

if (warning.length > 0) {
  console.log('\n⚠️  Страницы, требующие оптимизации:');
  warning.forEach(r => {
    console.log(`   • ${r.page}: Title=${r.titleLen || 0} символов, Description=${r.descLen || 0} символов`);
  });
}

if (failed.length > 0) {
  console.log('\n❌ Страницы без мета-тегов:');
  failed.forEach(r => {
    console.log(`   • ${r.page} (${r.path})`);
  });
  console.log('\n💡 Решение: Создать layout.tsx для этих страниц с metadata');
}

console.log('\n' + '═'.repeat(100));
