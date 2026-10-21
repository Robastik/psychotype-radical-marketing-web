"use client";

import styles from "../guide.module.css";
import type { GuideDoc } from "@/app/guide/data/types";
import Breadcrumbs from "./Breadcrumbs";

interface GuideHeaderProps {
  doc: GuideDoc;
}

// «2026-09-30» → «30.09.2026»
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export default function GuideHeader({ doc }: GuideHeaderProps) {
  return (
    <header className={styles.guideHeader}>
      <Breadcrumbs doc={doc} />
      <div className={styles.guideMeta}>
        <span className={styles.guideReadingTime}>{doc.readingTime}</span>
        {doc.publishedAt && (
          <time className={styles.guideDate} dateTime={doc.publishedAt}>
            Опубликовано: {formatDate(doc.publishedAt)}
          </time>
        )}
        {doc.updatedAt && doc.updatedAt !== doc.publishedAt && (
          <time className={styles.guideDate} dateTime={doc.updatedAt}>
            Обновлено: {formatDate(doc.updatedAt)}
          </time>
        )}
      </div>
      <h1 className={styles.guideTitle}>{doc.title}</h1>
    </header>
  );
}
