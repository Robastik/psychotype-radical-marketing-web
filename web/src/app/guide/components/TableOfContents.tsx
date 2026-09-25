"use client";

import Link from "next/link";
import styles from "../guide.module.css";
import type { GuideBlock } from "@/app/guide/data/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

interface TableOfContentsProps {
  blocks: GuideBlock[];
}

export default function TableOfContents({ blocks }: TableOfContentsProps) {
  const headings = blocks
    .filter((block): block is Extract<GuideBlock, { type: "heading" }> =>
      block.type === "heading" && block.level >= 2 && block.level <= 3
    )
    .map((block) => ({
      text: block.text,
      level: block.level,
      id: slugify(block.text),
    }));

  if (headings.length === 0) return null;

  return (
    <nav className={styles.toc}>
      <div className={styles.tocTitle}>На странице</div>
      <ul className={styles.tocList}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${styles.tocItem} ${heading.level === 3 ? styles.tocItemLevel2 : ""}`}
          >
            <Link href={`#${heading.id}`}>{heading.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
