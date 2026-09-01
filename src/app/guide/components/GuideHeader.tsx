"use client";

import styles from "../guide.module.css";
import type { GuideDoc } from "@/app/guide/data/types";
import Breadcrumbs from "./Breadcrumbs";

interface GuideHeaderProps {
  doc: GuideDoc;
}

export default function GuideHeader({ doc }: GuideHeaderProps) {
  return (
    <header className={styles.guideHeader}>
      <Breadcrumbs doc={doc} />
      <div className={styles.guideMeta}>
        <span className={styles.guideReadingTime}>{doc.readingTime}</span>
      </div>
      <h1 className={styles.guideTitle}>{doc.title}</h1>
    </header>
  );
}
