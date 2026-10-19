// Генерация изображений для коммерческих страниц через DashScope API (img2img)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Загрузка .env
const ENV_PATHS = [
  resolve(__dirname, '../../../benchmark-qwen/.env'),
  resolve(__dirname, '../../benchmark-qwen/.env'),
  'C:/Users/Salice/benchmark-qwen/.env',
];
for (const ENV_PATH of ENV_PATHS) {
  if (existsSync(ENV_PATH)) {
    const content = readFileSync(ENV_PATH, 'utf-8').replace(/^\uFEFF/, '');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      const value = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (key && value) process.env[key] = value;
    }
    console.log(`📁 .env загружен: ${ENV_PATH}`);
    break;
  }
}

const WS_ID = 'ws-9ymm2pb8475b2twj';
const ENDPOINT = `https://${WS_ID}.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/images/generations`;
const OUTPUT_DIR = resolve(__dirname, '../public/generated-images');
const REFERENCE_IMAGE = resolve(__dirname, '../public/hero.png');

// Промпты для коммерческих страниц с указанием сохранить стиль референса
const IMAGE_SPECS = [
  {
    id: 'wildberries-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Modern e-commerce analytics dashboard specifically for Wildberries marketplace product card analysis, neural network visualization with glowing data streams, professional tech aesthetic, dark background with subtle grid pattern, 4k quality, minimalist design. Keep the same dark futuristic atmosphere and holographic elements.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'ozon-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Futuristic AI interface analyzing Ozon marketplace product cards, holographic data visualization with neural connections, professional analytics dashboard, dark tech aesthetic, 4k quality. Maintain the same dark background with glowing elements and minimalist composition.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'analiz-kartochki-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: AI brain analyzing product card structure with six holographic layers representing visual analysis (colors, shapes, typography, composition, graphics, narrative), cognitive psychology meets e-commerce, futuristic medical-tech aesthetic, clean minimalist design. Keep the same dark atmospheric background.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'audit-kartochki-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Expert terminal interface displaying product card audit results, radical psychology analysis visualization with seven psychic radicals represented as geometric shapes, professional analytics tool, dark background with glowing data. Maintain the same futuristic tech atmosphere.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'dizayn-kartochki-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Design analysis interface with product card composition grid, color harmony visualization, typography analysis overlay, professional design tool aesthetic, dark minimalist background. Keep the same holographic data streams and futuristic atmosphere.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'ctr-kartochki-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Click-through rate optimization visualization with upward trending graph overlaid on neural network, product card in spotlight, futuristic analytics dashboard, 4k quality, clean design. Maintain the same dark background with glowing elements.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'infografika-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Infographic analysis interface displaying product slides breakdown, visual hierarchy visualization, composition grid overlay, professional analytics tool, dark background with glowing elements. Keep the same minimalist tech design and futuristic atmosphere.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'analiz-konkurentov-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Competitive analysis matrix with multiple product cards comparison, radar chart visualization of ICC scores, market positioning map, futuristic analytics dashboard, 4k quality. Maintain the same dark atmospheric background and holographic elements.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
  {
    id: 'vizualny-audit-hero',
    prompt: `Preserve the exact visual style, color scheme (cobalt blue primary, focus orange accents), and Expert Terminal aesthetic of the reference image. Transform the content to show: Visual audit interface with six-layer analysis visualization, eye tracking heatmap overlay on product card, cognitive comfort meter, professional tech aesthetic, dark minimalist design. Keep the same futuristic atmosphere and glowing data streams.`,
    size: '1792x1024',
    model: 'qwen-image-3.0',
  },
];

async function generateImage(spec, apiKey, referenceBase64) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  const body = {
    model: spec.model,
    prompt: spec.prompt,
    image: referenceBase64, // base64 data URL
    n: 1,
    size: spec.size,
    response_format: 'url',
    prompt_extend: true, // Расширить промпт для лучшего результата
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 минуты на img2img

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }

    const data = await res.json();
    return data.data[0].url;
  } catch (e) {
    throw new Error(`Ошибка генерации: ${e.message}`);
  }
}

async function downloadImage(url, outputPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(outputPath, buffer);
    return true;
  } catch (e) {
    throw new Error(`Ошибка загрузки: ${e.message}`);
  }
}

function imageToBase64(imagePath) {
  const imageBuffer = readFileSync(imagePath);
  const ext = imagePath.split('.').pop().toLowerCase();
  const mimeType = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
  const base64 = imageBuffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

async function main() {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    console.error('❌ DASHSCOPE_API_KEY не найден в .env');
    process.exit(1);
  }

  // Проверка наличия референсного изображения
  if (!existsSync(REFERENCE_IMAGE)) {
    console.error(`❌ Референсное изображение не найдено: ${REFERENCE_IMAGE}`);
    process.exit(1);
  }

  // Создаем директорию для сгенерированных изображений
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🎨 Генерация изображений для коммерческих страниц (img2img)');
  console.log(`🔑 Ключ: ${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`);
  console.log(`🖼️  Референс: ${REFERENCE_IMAGE}`);
  console.log(`📁 Выходная директория: ${OUTPUT_DIR}`);
  console.log(`🖼️  Количество изображений: ${IMAGE_SPECS.length}\n`);

  // Загрузка референсного изображения в base64
  console.log('⏳ Загрузка референсного изображения в base64...');
  const referenceBase64 = imageToBase64(REFERENCE_IMAGE);
  console.log(`✅ Референс загружен (${(referenceBase64.length / 1024 / 1024).toFixed(2)} MB)\n`);

  const results = [];
  for (let i = 0; i < IMAGE_SPECS.length; i++) {
    const spec = IMAGE_SPECS[i];
    console.log(`\n[${i + 1}/${IMAGE_SPECS.length}] 📌 ${spec.id}`);
    console.log(`   Модель: ${spec.model}, Размер: ${spec.size}`);
    console.log(`   Промпт: ${spec.prompt.slice(0, 80)}...`);

    try {
      // Генерация изображения с референсом
      console.log('   ⏳ Генерация (img2img)...');
      const imageUrl = await generateImage(spec, apiKey, referenceBase64);
      console.log(`   ✅ Изображение сгенерировано: ${imageUrl.slice(0, 60)}...`);

      // Скачивание изображения
      const outputPath = resolve(OUTPUT_DIR, `${spec.id}.png`);
      console.log('   ⏳ Скачивание...');
      await downloadImage(imageUrl, outputPath);
      console.log(`   ✅ Сохранено: ${outputPath}`);

      results.push({ id: spec.id, status: 'success', path: outputPath, url: imageUrl });
    } catch (e) {
      console.log(`   ❌ Ошибка: ${e.message}`);
      results.push({ id: spec.id, status: 'error', error: e.message });
    }

    // Ждем 3 секунды между запросами, чтобы избежать rate limit
    if (i < IMAGE_SPECS.length - 1) {
      console.log('   ⏳ Пауза 3 секунды...');
      await new Promise(ok => setTimeout(ok, 3000));
    }
  }

  // Итоги
  console.log('\n\n' + '═'.repeat(60));
  console.log('📊 Итоги генерации:');
  console.log('═'.repeat(60));

  const success = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'error');

  console.log(`✅ Успешно: ${success.length}/${IMAGE_SPECS.length}`);
  if (success.length > 0) {
    console.log('\nУспешные изображения:');
    success.forEach(r => console.log(`   • ${r.id} → ${r.path}`));
  }

  if (failed.length > 0) {
    console.log(`\n❌ Ошибки: ${failed.length}/${IMAGE_SPECS.length}`);
    console.log('\nНеудачные изображения:');
    failed.forEach(r => console.log(`   • ${r.id}: ${r.error}`));
  }

  console.log('\n' + '═'.repeat(60));
  console.log('📝 Следующие шаги:');
  console.log('   1. Проверьте сгенерированные изображения в public/generated-images/');
  console.log('   2. Сравните стиль с hero.png — должна быть визуальная консистентность');
  console.log('   3. Обновите коммерческие страницы, используя новые изображения');
  console.log('   4. Закоммитьте и запушьте изменения для авто-деплоя');
  console.log('═'.repeat(60));
}

main().catch(e => {
  console.error('❌ Критическая ошибка:', e.message);
  process.exit(1);
});
