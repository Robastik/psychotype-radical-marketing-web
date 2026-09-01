import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const PARENT_DOCS_DIR = path.resolve(ROOT, "..", "docs", "reference", "Tasks");
const LOCAL_DOCS_DIR = path.resolve(ROOT, "docs", "reference", "Tasks");

async function docsDir() {
  try {
    await fs.access(PARENT_DOCS_DIR);
    return PARENT_DOCS_DIR;
  } catch {
    return LOCAL_DOCS_DIR;
  }
}

const DOCS_DIR = await docsDir();
const OUT_DIR = path.resolve(ROOT, "src", "app", "guide", "data");
const OUT_FILE = path.join(OUT_DIR, "guide-data.ts");

const CROSS_LINK_REGEX = /\[((?:[^\]\n→]+?)\s*[→>]\s*)?([A-Z0-9]+(?:\.[0-9]+)*(?:[-–][A-Z0-9]+(?:\.[0-9]+)*)?)\]/;
function parseInline(text, validCodes = new Set()) {
  const segments = [];
  let i = 0;

  while (i < text.length) {
    const rest = text.slice(i);

    if (rest.startsWith("**")) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        segments.push({ type: "strong", content: text.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }

    if (rest.startsWith("*") && !rest.startsWith("* ")) {
      const end = text.indexOf("*", i + 1);
      if (end !== -1) {
        segments.push({ type: "em", content: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if (rest.startsWith("`")) {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        segments.push({ type: "code", content: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    const linkMatch = rest.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      segments.push({ type: "link", label: linkMatch[1], href: linkMatch[2] });
      i += linkMatch[0].length;
      continue;
    }

    const crossMatch = rest.match(CROSS_LINK_REGEX);
    if (crossMatch && crossMatch.index === 0) {
      const label = crossMatch[1] ? crossMatch[1].replace(/[\s→>]+$/, "").trim() : undefined;
      const code = crossMatch[2];
      if (validCodes.has(code)) {
        segments.push({ type: "crossLink", code, label });
      } else {
        segments.push({ type: "text", content: crossMatch[0] });
      }
      i += crossMatch[0].length;
      continue;
    }

    let nextSpecial = text.length;
    const specialIdxs = [
      text.indexOf("**", i),
      text.indexOf("*", i),
      text.indexOf("`", i),
      text.indexOf("[", i),
    ].filter((idx) => idx > i);
    if (specialIdxs.length > 0) {
      nextSpecial = Math.min(...specialIdxs);
    }

    segments.push({ type: "text", content: text.slice(i, nextSpecial) });
    i = nextSpecial;
  }

  return segments;
}

function parseInlineSegments(text, validCodes) {
  return parseInline(text, validCodes);
}

function parseTableRows(lines) {
  const rows = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("|")) {
      const cells = trimmed
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      rows.push(cells);
    }
  }
  return rows;
}

function collectListLines(lines, start) {
  const listLines = [];
  let i = start;
  let inItem = false;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      let next = i + 1;
      while (next < lines.length && lines[next].trim() === "") next++;
      if (next >= lines.length) break;
      const nextTrimmed = lines[next].trim();
      if (nextTrimmed.match(/^[-*]\s+/) || nextTrimmed.match(/^\d+\.\s+/)) {
        i++;
        continue;
      }
      break;
    }

    if (trimmed.match(/^[-*]\s+/) || trimmed.match(/^\d+\.\s+/)) {
      listLines.push(line);
      inItem = true;
      i++;
    } else if (inItem) {
      listLines.push(line);
      i++;
    } else {
      break;
    }
  }

  return { lines: listLines, nextIndex: i };
}

function parseList(lines) {
  const items = [];
  let currentItem = [];
  let ordered = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);

    if (unorderedMatch || orderedMatch) {
      if (currentItem.length > 0) {
        items.push(currentItem.join("\n"));
        currentItem = [];
      }
      ordered = !!orderedMatch;
      currentItem.push(unorderedMatch ? unorderedMatch[1] : orderedMatch[1]);
    } else if (trimmed && currentItem.length > 0) {
      currentItem.push(line.trimStart());
    }
  }

  if (currentItem.length > 0) {
    items.push(currentItem.join("\n"));
  }

  return { items, ordered };
}

function parseBody(bodyLines, validCodes) {
  const blocks = [];
  let i = 0;

  while (i < bodyLines.length) {
    const line = bodyLines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed === "---") {
      blocks.push({ type: "divider" });
      i++;
      continue;
    }

    if (trimmed.startsWith("#")) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const text = match[2].trim();
        // Skip the structural "Основной текст" heading — it's noise in the rendered page.
        if (text.toLowerCase() === "основной текст") {
          i++;
          continue;
        }
        blocks.push({ type: "heading", level: match[1].length, text });
        i++;
        continue;
      }
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < bodyLines.length && !bodyLines[i].trim().startsWith("```")) {
        codeLines.push(bodyLines[i]);
        i++;
      }
      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableLines = [];
      while (i < bodyLines.length && bodyLines[i].trim().startsWith("|")) {
        tableLines.push(bodyLines[i]);
        i++;
      }
      const allRows = parseTableRows(tableLines);
      const header = allRows[0] || [];
      const rows = allRows.slice(2).filter((row) => row.some((c) => c.trim()));
      blocks.push({ type: "table", header, rows });
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines = [];
      while (i < bodyLines.length && bodyLines[i].trim().startsWith(">")) {
        quoteLines.push(bodyLines[i].replace(/^>\s?/, ""));
        i++;
      }
      const content = quoteLines.join(" ").trim();
      blocks.push({ type: "blockquote", content: parseInlineSegments(content, validCodes) });
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || /^\d+\.\s/.test(trimmed)) {
      const { lines: listLines, nextIndex } = collectListLines(bodyLines, i);
      const { items, ordered } = parseList(listLines);
      blocks.push({
        type: "list",
        ordered,
        items: items.map((item) => parseInlineSegments(item, validCodes)),
      });
      i = nextIndex;
      continue;
    }

    const paragraphLines = [line];
    i++;
    while (i < bodyLines.length && bodyLines[i].trim() && !bodyLines[i].trim().startsWith("#") && !bodyLines[i].trim().startsWith("- ") && !bodyLines[i].trim().startsWith("* ") && !/^\d+\.\s/.test(bodyLines[i].trim()) && !bodyLines[i].trim().startsWith("|") && !bodyLines[i].trim().startsWith("❌") && !bodyLines[i].trim().startsWith("✅")) {
      paragraphLines.push(bodyLines[i]);
      i++;
    }
    const text = paragraphLines.join(" ").trim();
    if (text) {
      blocks.push({ type: "paragraph", content: parseInlineSegments(text, validCodes) });
    }
  }

  return blocks;
}

function extractSpecialBlocks(blocks) {
  const result = [];
  let currentEssence = null;
  let currentMyth = null;
  let currentMythBuffer = [];
  let currentAction = null;

  function flushEssence() {
    if (currentEssence) {
      result.push(currentEssence);
      currentEssence = null;
    }
  }

  function flushMyth() {
    if (!currentMyth) return;
    for (let k = 0; k < currentMythBuffer.length; k++) {
      const item = currentMythBuffer[k];
      const nextItem = currentMythBuffer[k + 1];
      if (item.type === "myth-statement" && nextItem && nextItem.type === "myth-truth") {
        currentMyth.items.push({
          statement: inlineToPlain(item.segments),
          truth: inlineToPlain(nextItem.segments),
        });
        k++;
      }
    }
    result.push(currentMyth);
    currentMyth = null;
    currentMythBuffer = [];
  }

  function flushAction() {
    if (currentAction) {
      result.push(currentAction);
      currentAction = null;
    }
  }

  function flushAll() {
    flushEssence();
    flushMyth();
    flushAction();
  }

  function isActionHeading(text) {
    return text.startsWith("Что делать") && !text.includes(":");
  }

  function isReadMore(block) {
    return (
      block.type === "paragraph" &&
      block.content.length > 0 &&
      inlineToPlain(block.content).startsWith("Читайте также:")
    );
  }

  for (const block of blocks) {
    // 1. Heading starts a new special block → flush all active blocks first
    if (block.type === "heading" && block.text.startsWith("Суть за 30 секунд")) {
      flushAll();
      currentEssence = { type: "essence", content: [] };
      continue;
    }

    if (block.type === "heading" && block.text.startsWith("Как на самом деле")) {
      flushAll();
      currentMyth = { type: "myth", items: [] };
      currentMythBuffer = [];
      continue;
    }

    if (block.type === "heading" && isActionHeading(block.text)) {
      flushAll();
      currentAction = { type: "action", items: [] };
      continue;
    }

    // 2. Divider terminates special blocks
    if (block.type === "divider") {
      flushAll();
      result.push(block);
      continue;
    }

    // 3. Level-2 heading terminates special blocks
    if (block.type === "heading" && block.level <= 2) {
      flushAll();
      result.push(block);
      continue;
    }

    // 4. ReadMore terminates special blocks
    if (isReadMore(block)) {
      flushAll();
      const links = [];
      // Extract cross-links from segments directly (crossLinks already parsed),
      // plus scan text/strong segments for bracketed codes that weren't converted.
      for (const seg of block.content) {
        if (seg.type === "crossLink") {
          links.push({ code: seg.code, label: seg.label || seg.code });
        } else if (seg.type === "text" || seg.type === "strong") {
          let match;
          const crossRegex = new RegExp(CROSS_LINK_REGEX.source, "g");
          while ((match = crossRegex.exec(seg.content)) !== null) {
            const label = match[1] ? match[1].replace(/[\s→>]+$/, "").trim() : undefined;
            const code = match[2];
            links.push({ code, label: label || code });
          }
        }
      }
      result.push({ type: "readMore", links });
      continue;
    }

    // 5. Content inside essence
    if (currentEssence) {
      currentEssence.content.push(block);
      continue;
    }

    // 6. Content inside myth
    if (currentMyth) {
      if (block.type === "paragraph") {
        const plain = inlineToPlain(block.content);
        if (plain.startsWith("❌")) {
          currentMythBuffer.push({ type: "myth-statement", segments: block.content });
        } else if (plain.startsWith("✅")) {
          currentMythBuffer.push({ type: "myth-truth", segments: block.content });
        }
      } else if (block.type === "list") {
        flushMyth();
        currentMyth = { type: "myth", items: [] };
        currentMythBuffer = [];
        for (let k = 0; k < block.items.length; k += 2) {
          const item = block.items[k];
          const nextItem = block.items[k + 1];
          currentMyth.items.push({
            statement: inlineToPlain(item),
            truth: nextItem ? inlineToPlain(nextItem) : "",
          });
        }
      }
      continue;
    }

    // 7. Content inside action
    if (currentAction) {
      if (block.type === "list") {
        currentAction.items.push(...block.items);
      }
      continue;
    }

    // 8. Regular block — pass through
    result.push(block);
  }

  // Flush any remaining active blocks at end of document
  flushAll();

  return result;
}

function inlineToPlain(segments) {
  if (typeof segments === "string") return segments;
  return segments
    .map((s) => {
      if (s.type === "text") return s.content;
      if (s.type === "strong") return s.content;
      if (s.type === "em") return s.content;
      if (s.type === "code") return s.content;
      if (s.type === "link") return s.label;
      if (s.type === "crossLink") return s.code;
      return "";
    })
    .join("");
}

function parseDocFile(content, validCodes) {
  const lines = content.split(/\r?\n/);
  const titleLine = lines.find((l) => l.trim().startsWith("# "));
  const rawTitle = titleLine ? titleLine.replace(/^#\s*/, "").trim() : "";
  // Remove leading "Документ " if present; keep the second mention of the doc number.
  const title = rawTitle.replace(/^Документ\s+/, "");
  // Derive a short title without the leading doc number for lists/sidebars.
  const shortTitle = title.replace(/^([A-Z0-9]+(?:\.[0-9]+)*)\.\s*/, "").trim();

  const codeLine = lines.find((l) => l.trim().startsWith("**Код:**"));
  const code = codeLine ? codeLine.replace("**Код:**", "").trim() : "";

  const sectionLine = lines.find((l) => l.trim().startsWith("**Раздел:**"));
  const section = sectionLine ? sectionLine.replace("**Раздел:**", "").trim() : "";

  const readingTimeLine = lines.find((l) => l.trim().startsWith("**Время чтения:**"));
  const readingTime = readingTimeLine ? readingTimeLine.replace("**Время чтения:**", "").trim() : "";

  const metaEnd = lines.findIndex((l) => l.trim() === "---");
  const bodyStart = metaEnd !== -1 ? metaEnd + 1 : 0;
  const bodyLines = lines.slice(bodyStart);

  const blocks = parseBody(bodyLines, validCodes);
  const specialBlocks = extractSpecialBlocks(blocks);

  const essenceBlock = specialBlocks.find((b) => b.type === "essence");
  let essence = "";
  if (essenceBlock && essenceBlock.content.length > 0) {
    const first = essenceBlock.content[0];
    if (first.type === "paragraph") {
      essence = inlineToPlain(first.content);
    }
  }

  return {
    code,
    section,
    sectionCode: section.split(".")[0],
    readingTime,
    title,
    shortTitle,
    essence,
    blocks: specialBlocks,
  };
}

function buildSectionTree(docs) {
  const sections = [];
  const byCode = {};

  for (const doc of docs) {
    byCode[doc.code] = doc;
    let section = sections.find((s) => s.code === doc.sectionCode);

    const sectionParts = doc.section.split(" → ");
    const sectionTitle = sectionParts[0] || doc.section;
    const subsectionTitle = sectionParts[1] || sectionTitle;

    if (!section) {
      section = {
        code: doc.sectionCode,
        title: sectionTitle,
        docs: [],
        subsections: [],
      };
      sections.push(section);
    }
    section.docs.push(doc);

    const parts = doc.code.split(".");
    const subsectionCode = parts.slice(0, 2).join(".");
    let subsection = section.subsections.find((s) => s.code === subsectionCode);
    if (!subsection) {
      subsection = {
        code: subsectionCode,
        title: subsectionTitle,
        docs: [],
      };
      section.subsections.push(subsection);
    }
    subsection.docs.push(doc);
  }

  // Sort subsections by their code (e.g., I.1, I.2, I.10).
  for (const section of sections) {
    section.subsections.sort((a, b) => compareCodes(a.code, b.code));
  }

  return { sections, byCode };
}

function romanToInt(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100 };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]] || 0;
    const next = map[roman[i + 1]] || 0;
    if (current < next) result -= current;
    else result += current;
  }
  return result;
}

function compareCodes(a, b) {
  const aParts = a.split(".");
  const bParts = b.split(".");
  const aSection = romanToInt(aParts[0]);
  const bSection = romanToInt(bParts[0]);
  if (aSection !== bSection) return aSection - bSection;
  for (let i = 1; i < Math.max(aParts.length, bParts.length); i++) {
    const aNum = parseInt(aParts[i] || "0", 10);
    const bNum = parseInt(bParts[i] || "0", 10);
    if (aNum !== bNum) return aNum - bNum;
  }
  return 0;
}

async function main() {

  const files = await fs.readdir(DOCS_DIR);
  const mdFiles = files.filter((f) => f.startsWith("doc-") && f.endsWith(".md"));

  const rawDocs = [];
  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(DOCS_DIR, file), "utf-8");
    rawDocs.push({ file, content });
  }

  const validCodes = new Set(rawDocs.map((d) => parseDocFile(d.content, new Set()).code));

  const docs = rawDocs.map((d) => parseDocFile(d.content, validCodes));
  docs.sort((a, b) => compareCodes(a.code, b.code));

  const { sections, byCode } = buildSectionTree(docs);

  const data = {
    docs,
    sections,
    byCode,
  };

  const ts = `// Auto-generated by scripts/build-guide-data.mjs
// Do not edit manually
import type { GuideData } from "./types";

export const guideData: GuideData = ${JSON.stringify(data, null, 2)};

export function getGuideDoc(code: string) {
  return guideData.byCode[code];
}

export function getGuideSection(code: string) {
  return guideData.sections.find((s) => s.code === code);
}

export function getAllGuideCodes() {
  return guideData.docs.map((d) => d.code);
}
`;

  await fs.writeFile(OUT_FILE, ts, "utf-8");
  console.log(`Generated ${OUT_FILE} with ${docs.length} docs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
