"use client";

import Link from "next/link";
import styles from "../guide.module.css";
import type { GuideDoc } from "@/app/guide/data/types";

interface BreadcrumbsProps {
  doc: GuideDoc;
}

export default function Breadcrumbs({ doc }: BreadcrumbsProps) {
  const sectionName = doc.section.split(" → ")[0];
  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/">eyeCARD</Link>
      {" / "}
      <Link href="/guide">Гид</Link>
      {" / "}
      <span>{sectionName}</span>
      {" / "}
      <span>{doc.code}</span>
    </nav>
  );
}
