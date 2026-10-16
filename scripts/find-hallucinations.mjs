import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.resolve(ROOT, "docs", "reference", "Tasks");

async function analyzeFile(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  const lines = content.split("\n");
  const fileName = path.basename(filePath);
  
  const issues = {
    file: fileName,
    duplicateWhatToDo: false,
    orphanedCaseStudies: [],
    blockOrder: [],
    problems: []
  };
  
  const whatToDoBlocks = [];
  const howActuallyBlocks = [];
  const caseStudyBlocks = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith("### ") || line.startsWith("## ")) {
      const heading = line.replace(/^#+\s*/, "").trim();
      
      if (heading.toLowerCase().includes("что делать")) {
        whatToDoBlocks.push({ line: i + 1, heading });
      }
      
      if (heading.toLowerCase().includes("как на самом деле")) {
        howActuallyBlocks.push({ line: i + 1, heading });
      }
      
      if (heading.toLowerCase().includes("кейс") || heading.toLowerCase().includes("пример")) {
        caseStudyBlocks.push({ line: i + 1, heading });
      }
    }
    
    const articleMatches = line.match(/\b(OZON|WB|Wildberries|Ozon)\s*\d{5,}\b/gi);
    if (articleMatches) {
      issues.orphanedCaseStudies.push({
        line: i + 1,
        content: line.trim(),
        articles: articleMatches
      });
    }
  }
  
  if (whatToDoBlocks.length > 1) {
    issues.duplicateWhatToDo = true;
    issues.problems.push({
      type: "DUPLICATE_WHAT_TODO",
      severity: "HIGH",
      message: `Найдено ${whatToDoBlocks.length} блока "Что делать":`,
      details: whatToDoBlocks.map(b => `  Строка ${b.line}: ${b.heading}`)
    });
  }
  
  if (whatToDoBlocks.length > 0 && howActuallyBlocks.length > 0) {
    const firstWhatToDo = whatToDoBlocks[0].line;
    const firstHowActually = howActuallyBlocks[0].line;
    
    if (firstWhatToDo < firstHowActually) {
      issues.problems.push({
        type: "WRONG_BLOCK_ORDER",
        severity: "MEDIUM",
        message: `Блок "Что делать" (строка ${firstWhatToDo}) идёт ДО "Как на самом деле" (строка ${firstHowActually})`,
        suggestion: "Порядок должен быть: Как на самом деле → Что делать"
      });
    }
  }
  
  if (issues.orphanedCaseStudies.length > 0) {
    issues.problems.push({
      type: "ORPHANED_CASE_STUDY",
      severity: "HIGH",
      message: `Найдено ${issues.orphanedCaseStudies.length} упоминаний конкретных товаров без контекста:`,
      details: issues.orphanedCaseStudies.map(c => `  Строка ${c.line}: ${c.articles.join(", ")}`)
    });
  }
  
  issues.blockOrder = {
    whatToDo: whatToDoBlocks,
    howActually: howActuallyBlocks,
    caseStudies: caseStudyBlocks
  };
  
  return issues;
}

async function main() {
  console.log("🔍 Анализ файлов guide на наличие галлюцинаций...\n");
  
  const files = await fs.readdir(DOCS_DIR);
  const mdFiles = files.filter(f => f.endsWith(".md")).sort();
  
  const allIssues = [];
  let filesWithIssues = 0;
  
  for (const file of mdFiles) {
    const filePath = path.join(DOCS_DIR, file);
    const issues = await analyzeFile(filePath);
    
    if (issues.problems.length > 0) {
      filesWithIssues++;
      allIssues.push(issues);
    }
  }
  
  console.log(`📊 Найдено файлов с проблемами: ${filesWithIssues} из ${mdFiles.length}\n`);
  console.log("=" .repeat(80));
  
  for (const issues of allIssues) {
    console.log(`\n📄 ${issues.file}`);
    console.log("-".repeat(80));
    
    for (const problem of issues.problems) {
      console.log(`\n⚠️  [${problem.severity}] ${problem.type}`);
      console.log(`   ${problem.message}`);
      
      if (problem.details) {
        problem.details.forEach(d => console.log(d));
      }
      
      if (problem.suggestion) {
        console.log(`   💡 ${problem.suggestion}`);
      }
    }
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("\n📈 Итоговая статистика:");
  
  const duplicateCount = allIssues.filter(i => i.duplicateWhatToDo).length;
  const orphanedCount = allIssues.filter(i => i.orphanedCaseStudies.length > 0).length;
  const wrongOrderCount = allIssues.filter(i => 
    i.problems.some(p => p.type === "WRONG_BLOCK_ORDER")
  ).length;
  
  console.log(`   Дублирование блоков "Что делать": ${duplicateCount} файлов`);
  console.log(`   Изолированные кейсы без контекста: ${orphanedCount} файлов`);
  console.log(`   Неправильный порядок блоков: ${wrongOrderCount} файлов`);
}

main().catch(console.error);
