// Проверка всех моделей qwen-image через OpenAI-совместимый endpoint
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
const OPENAI_URL = `https://${WS_ID}.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/images/generations`;

const MODELS = [
  'qwen-image-3.0',
  'qwen-image-3.0-pro',
  'qwen-image-2.0',
  'qwen-image-2.0-pro',
];

async function tryModel(model, apiKey) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  const body = {
    model,
    prompt: 'a blue square on white background',
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  };

  console.log(`\n📌 ${model}`);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await res.text();

    if (res.ok) {
      const data = JSON.parse(text);
      if (data.data?.[0]?.url) {
        console.log(`  ✅ РАБОТАЕТ! URL: ${data.data[0].url.slice(0, 80)}...`);
        return { model, ok: true, url: data.data[0].url };
      }
    }
    console.log(`  ❌ HTTP ${res.status}: ${text.slice(0, 100)}`);
    return { model, ok: false };
  } catch (e) {
    console.log(`  ❌ Ошибка: ${e.message}`);
    return { model, ok: false };
  }
}

async function main() {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) { console.error('❌ DASHSCOPE_API_KEY не найден'); process.exit(1); }

  console.log('🔍 Проверка моделей qwen-image через OpenAI-compatible API');
  console.log(`🔑 Ключ: ${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`);
  console.log(`🆔 Workspace: ${WS_ID}\n`);
  console.log(`🌐 Endpoint: ${OPENAI_URL}\n`);

  const results = [];
  for (const model of MODELS) {
    const r = await tryModel(model, apiKey);
    results.push(r);
    // Ждем 3 секунды между запросами, чтобы избежать rate limit
    await new Promise(ok => setTimeout(ok, 3000));
  }

  console.log('\n\n📊 Итоги:');
  console.log('─'.repeat(60));
  const working = results.filter(r => r.ok);
  if (working.length === 0) {
    console.log('❌ Ни одна модель не работает');
  } else {
    console.log(`✅ Рабочие модели (${working.length}):`);
    working.forEach(r => console.log(`   • ${r.model}`));
    console.log(`\n📝 Пример использования:`);
    console.log(`   POST ${OPENAI_URL}`);
    console.log(`   Headers: Authorization: Bearer ${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`);
    console.log(`   Body: { "model": "${working[0].model}", "prompt": "...", "n": 1, "size": "1024x1024", "response_format": "url" }`);
  }
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
