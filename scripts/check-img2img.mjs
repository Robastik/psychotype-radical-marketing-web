// Проверка поддержки image-to-image для qwen-image-3.0
import { readFileSync, existsSync } from 'fs';
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
const WS_BASE = `https://${WS_ID}.ap-southeast-1.maas.aliyuncs.com`;

// Все возможные endpoint'ы для img2img
const IMG2IMG_ENDPOINTS = {
  'native-img2img': {
    url: `${WS_BASE}/api/v1/services/aigc/image2image/image-synthesis`,
    format: 'dashscope',
  },
  'native-img2img-v2': {
    url: `${WS_BASE}/api/v1/services/aigc/image2image/generation`,
    format: 'dashscope',
  },
  'openai-img2img': {
    url: `${WS_BASE}/compatible-mode/v1/images/edits`,
    format: 'openai',
  },
  'openai-variations': {
    url: `${WS_BASE}/compatible-mode/v1/images/variations`,
    format: 'openai',
  },
};

const MODELS = ['qwen-image-3.0', 'qwen-image-3.0-pro'];

async function tryImg2ImgEndpoint(model, apiKey, epName, ep) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  // Для img2img нужно отправить изображение
  // Попробуем с пустым изображением для проверки endpoint'а
  const body = ep.format === 'openai'
    ? {
        model,
        prompt: 'test',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', // 1x1 transparent PNG
        n: 1,
        size: '1024x1024',
      }
    : {
        model,
        input: {
          prompt: 'test',
          image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        },
        parameters: {
          size: '1024*1024',
          n: 1,
          strength: 0.7,
        },
      };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(ep.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { return { epName, error: `Invalid JSON (HTTP ${res.status}): ${text.slice(0, 100)}` }; }

    if (res.ok) {
      return { epName, ok: true, data: JSON.stringify(data).slice(0, 150) };
    }
    return { epName, error: `${data.code || 'HTTP ' + res.status}: ${data.message || text.slice(0, 100)}` };
  } catch (e) {
    return { epName, error: e.message };
  }
}

async function main() {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) { console.error('❌ DASHSCOPE_API_KEY не найден'); process.exit(1); }

  console.log('🔍 Проверка поддержки image-to-image для qwen-image-3.0');
  console.log(`🔑 Ключ: ${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`);
  console.log(`🆔 Workspace: ${WS_ID}\n`);

  for (const model of MODELS) {
    console.log(`\n📌 ${model}`);
    let found = false;
    for (const [epName, ep] of Object.entries(IMG2IMG_ENDPOINTS)) {
      console.log(`  🌐 ${epName}: ${ep.url}`);
      const r = await tryImg2ImgEndpoint(model, apiKey, epName, ep);
      if (r.ok) {
        console.log(`  ✅ ${epName} — ПОДДЕРЖИВАЕТСЯ!`);
        console.log(`     Ответ: ${r.data}`);
        found = true;
      } else {
        console.log(`  ❌ ${epName} — ${r.error}`);
      }
      await new Promise(ok => setTimeout(ok, 500));
    }
    if (!found) {
      console.log(`  ⛔ ${model} — img2img не поддерживается ни на одном endpoint'е`);
    }
  }

  console.log('\n\n📊 Итоги:');
  console.log('─'.repeat(60));
  console.log('Если img2img не поддерживается, используем текстовое описание стиля.');
  console.log('Если поддерживается, можно использовать hero.png как референс.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
