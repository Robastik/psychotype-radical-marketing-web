"use client";

import React from "react";
import Link from "next/link";
import {
  type InlineSegment,
  type GuideBlock,
} from "@/app/guide/data/types";
import styles from "../guide.module.css";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function InlineRenderer({ segments }: { segments: InlineSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => {
        switch (segment.type) {
          case "strong":
            return <strong key={index}>{segment.content}</strong>;
          case "em":
            return <em key={index}>{segment.content}</em>;
          case "code":
            return <code key={index}>{segment.content}</code>;
          case "link":
            return (
              <Link key={index} href={segment.href} className={styles.inlineLink}>
                {segment.label}
              </Link>
            );
          case "crossLink":
            return (
              <Link
                key={index}
                href={`/guide/${segment.code}`}
                className={styles.inlineLink}
              >
                {segment.label || segment.code}
              </Link>
            );
          case "text":
          default:
            return <span key={index}>{segment.content}</span>;
        }
      })}
    </>
  );
}

function HeadingBlock({
  level,
  text,
}: {
  level: number;
  text: string;
}) {
  const id = slugify(text);
  const HeadingTag = `h${Math.min(level, 6)}` as React.ElementType;
  return (
    <HeadingTag id={id} className={styles.heading}>
      {text}
    </HeadingTag>
  );
}

function ParagraphBlock({
  content,
}: {
  content: InlineSegment[];
}) {
  return (
    <p className={styles.paragraph}>
      <InlineRenderer segments={content} />
    </p>
  );
}

function ListBlock({
  ordered,
  items,
}: {
  ordered: boolean;
  items: InlineSegment[][];
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={styles.list}>
      {items.map((item, index) => (
        <li key={index}>
          <InlineRenderer segments={item} />
        </li>
      ))}
    </Tag>
  );
}

function CodeBlock({
  language,
  code,
}: {
  language?: string;
  code: string;
}) {
  return (
    <pre className={styles.codeBlock}>
      <code data-language={language}>{code}</code>
    </pre>
  );
}

function TableBlock({
  header,
  rows,
}: {
  header: string[];
  rows: string[][];
}) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {header.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockquoteBlock({ content }: { content: InlineSegment[] }) {
  return (
    <blockquote className={styles.blockquote}>
      <InlineRenderer segments={content} />
    </blockquote>
  );
}

function EssenceBlock({ content }: { content: GuideBlock[] }) {
  return (
    <div className={styles.essence}>
      <div className={styles.essenceLabel}>Суть за 30 секунд</div>
      <div className={styles.essenceContent}>
        <MarkdownRenderer blocks={content} />
      </div>
    </div>
  );
}

function MythBlock({
  items,
}: {
  items: { statement: string; truth: string }[];
}) {
  return (
    <div className={styles.myth}>
      <div className={styles.mythLabel}>Как на самом деле</div>
      <div className={styles.mythList}>
        {items.map((item, index) => (
          <div key={index} className={styles.mythItem}>
            <div className={styles.mythStatement}>
              <span className={styles.mythIcon}>❌</span>
              <span dangerouslySetInnerHTML={{ __html: item.statement }} />
            </div>
            <div className={styles.mythTruth}>
              <span className={styles.mythIcon}>✅</span>
              <span dangerouslySetInnerHTML={{ __html: item.truth }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionBlock({ items }: { items: InlineSegment[][] }) {
  return (
    <div className={styles.action}>
      <div className={styles.actionLabel}>Что делать</div>
      <ol className={styles.actionList}>
        {items.map((item, index) => (
          <li key={index}>
            <InlineRenderer segments={item} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function ReadMoreBlock({
  links,
}: {
  links: { code: string; label: string }[];
}) {
  return (
    <div className={styles.readMore}>
      <span className={styles.readMoreLabel}>Читайте также:</span>{" "}
      {links.map((link, index) => (
        <span key={link.code}>
          <Link href={`/guide/${link.code}`} className={styles.inlineLink}>
            {link.label}
          </Link>
          {index < links.length - 1 && (
            <span className={styles.readMoreSeparator}>·</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function MarkdownRenderer({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <HeadingBlock key={index} level={block.level} text={block.text} />;
          case "paragraph":
            return <ParagraphBlock key={index} content={block.content} />;
          case "list":
            return <ListBlock key={index} ordered={block.ordered} items={block.items} />;
          case "code":
            return <CodeBlock key={index} language={block.language} code={block.code} />;
          case "table":
            return <TableBlock key={index} header={block.header} rows={block.rows} />;
          case "blockquote":
            return <BlockquoteBlock key={index} content={block.content} />;
          case "divider":
            return <hr key={index} className={styles.divider} />;
          case "essence":
            return <EssenceBlock key={index} content={block.content} />;
          case "myth":
            return <MythBlock key={index} items={block.items} />;
          case "action":
            return <ActionBlock key={index} items={block.items} />;
          case "readMore":
            return <ReadMoreBlock key={index} links={block.links} />;
          default:
            return null;
        }
      })}
    </>
  );
}
