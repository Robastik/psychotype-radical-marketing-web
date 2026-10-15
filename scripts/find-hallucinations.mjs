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

  // Подсчёт блоков "Что делать"
  const whatToDoBlocks = [];
  const howActuallyBlocks = [];
  const caseStudyBlocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Ищем заголовки
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

    // Ищем упоминания конкретных товаров (артикулы)
    const articleMatches = line.match(/\b(OZON|WB|Wildberries|Ozon)\s*\d{5,}\b/gi);
    if (articleMatches) {
      issues.orphanedCaseStudies.push({
        line: i + 1,
        content: line.trim(),
        articles: articleMatches
      });
    }
  }

  // Проверка на дублирование блоков "Что делать"
  if (whatToDoBlocks.length > 1) {
    issues.duplicateWhatToDo = true;
    issues.problems.push({
      type: "DUPLICATE_WHAT_TODO",
      severity: "HIGH",
      message: `Найдено ${whatToDoBlocks.length} блока "Что делать":`,
      details: whatToDoBlocks.map(b => `  Строка ${b.line}: ${b.heading}`)
    });
  }

  // Проверка порядка блоков
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

  // Проверка на изолированные кейсы
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

  // Вывод результатов
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

    if (Object.keys(issues.blockOrder).some(k => issues.blockOrder[k].length > 0)) {
      console.log("\n📋 Порядок блоков:");
      if (issues.blockOrder.whatToDo.length > 0) {
        console.log(`   Что делать: ${issues.blockOrder.whatToDo.map(b => `строка ${b.line}`).join(", ")}`);
      }
      if (issues.blockOrder.howActually.length > 0) {
        console.log(`   Как на самом деле: ${issues.blockOrder.howActually.map(b => `строка ${b.line}`).join(", ")}`);
      }
      if (issues.blockOrder.caseStudies.length > 0) {
        console.log(`   Кейсы: ${issues.blockOrder.caseStudies.map(b => `строка ${b.line}`).join(", ")}`);
      }
    }
  }

  // Итоговая статистика
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

  // Генерация отчёта
  const reportPath = path.resolve(ROOT, "docs", "HALLUCINATION-AUDIT-REPORT.md");
  const report = generateReport(allIssues, mdFiles.length);
  await fs.writeFile(reportPath, report, "utf-8");

  console.log(`\n✅ Отчёт сохранён: ${reportPath}`);
}

function generateReport(allIssues, totalFiles) {
  const date = new Date().toISOString().split("T")[0];

  let report = `# Аудит галлюцинаций в guide\n\n`;
  report += `**Дата:** ${date}\n`;
  report += `**Всего файлов:** ${totalFiles}\n`;
  report += `**Файлов с проблемами:** ${allIssues.length}\n\n`;

  report += `## Сводка проблем\n\n`;

  const duplicateCount = allIssues.filter(i => i.duplicateWhatToDo).length;
  const orphanedCount = allIssues.filter(i => i.orphanedCaseStudies.length > 0).length;
  const wrongOrderCount = allIssues.filter(i =>
    i.problems.some(p => p.type === "WRONG_BLOCK_ORDER")
  ).length;

  report += `| Тип проблемы | Количество |\n`;
  report += `|--------------|------------|\n`;
  report += `| Дублирование блоков "Что делать" | ${duplicateCount} |\n`;
  report += `| Изолированные кейсы без контекста | ${orphanedCount} |\n`;
  report += `| Неправильный порядок блоков | ${wrongOrderCount} |\n\n`;

  report += `## Детальный отчёт\n\n`;

  for (const issues of allIssues) {
    report += `### ${issues.file}\n\n`;

    for (const problem of issues.problems) {
      report += `#### ⚠️ ${problem.type} [${problem.severity}]\n\n`;
      report += `${problem.message}\n\n`;

      if (problem.details) {
        report += `\`\`\`\n`;
        report += problem.details.join("\n");
        report += `\n\`\`\`\n\n`;
      }

      if (problem.suggestion) {
        report += `💡 **Решение:** ${problem.suggestion}\n\n`;
      }
    }

    report += `---\n\n`;
  }

  report += `## Рекомендации\n\n`;
  report += `1. **Удалить дублирующиеся блоки "Что делать"** — оставить только один блок в конце статьи\n`;
  report += `2. **Удалить изолированные кейсы** — если нет контекста карточки (описание, изображение), кейс не имеет смысла\n`;
  report += `3. **Исправить порядок блоков** — правильный порядок: Как на самом деле → Что делать\n\n`;

  report += `## Предлагаемая структура статьи\n\n`;
  report += `\`\`\`markdown\n`;
  report += `# Заголовок\n\n`;
  report += `## Суть за 30 секунд\n\n`;
  report += `## Основной текст\n`;
  report += `### Теоретическая часть\n`;
  report += `### Доказательная база\n\n`;
  report += `## Как на самом деле (разрушение мифов)\n\n`;
  report += `## Что делать (практические рекомендации)\n\n`;
  report += `## Читайте также\n`;
  report += `\`\`\`\n`;

  return report;
}

main().catch(console.error);
