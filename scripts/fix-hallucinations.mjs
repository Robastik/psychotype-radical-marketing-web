import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.resolve(ROOT, "docs", "reference", "Tasks");

async function removeOrphanedArticles(content) {
  const lines = content.split("\n");
  const cleanedLines = [];
  let removedCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hasArticle = /\b(OZON|WB|Wildberries|Ozon)\s*\d{5,}\b/i.test(line);
    
    if (hasArticle) {
      const contextWindow = lines.slice(Math.max(0, i - 5), i).join("\n");
      const hasContext = /(Кейс|Пример|Анализ|Исходная карточка|Результат):/i.test(contextWindow);
      
      if (!hasContext) {
        removedCount++;
        continue;
      }
    }
    
    cleanedLines.push(line);
  }
  
  return { content: cleanedLines.join("\n"), removedCount };
}

async function processFile(filePath) {
  const fileName = path.basename(filePath);
  let content = await fs.readFile(filePath, "utf-8");
  const result = await removeOrphanedArticles(content);
  
  if (result.removedCount > 0) {
    await fs.writeFile(filePath, result.content, "utf-8");
    console.log(`✅ ${fileName}: удалено ${result.removedCount} строк`);
    return true;
  }
  return false;
}

async function main() {
  console.log("🔧 Автоматическое исправление...\n");
  
  const files = [
    "doc-VI.1.1.md", "doc-VI.1.2.md", "doc-VI.2.1.md", "doc-VI.2.2.md",
    "doc-VI.2.3.md", "doc-VI.4.2.md", "doc-VI.5.1.md", "doc-VI.6.2.md",
    "doc-VI.7.1.md", "doc-VIII.3.2.md"
  ];
  
  let fixedCount = 0;
  for (const fileName of files) {
    const filePath = path.join(DOCS_DIR, fileName);
    try {
      const fixed = await processFile(filePath);
      if (fixed) fixedCount++;
    } catch (error) {
      console.error(`❌ ${fileName}:`, error.message);
    }
  }
  
  console.log(`\n✅ Исправлено: ${fixedCount} файлов`);
}

main().catch(console.error);
