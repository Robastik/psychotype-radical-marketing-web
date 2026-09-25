"use client";

import Link from "next/link";
import styles from "../guide.module.css";
import { guideData } from "@/app/guide/data/guide-data";

interface GuideSidebarProps {
  currentCode?: string;
}

export default function GuideSidebar({ currentCode }: GuideSidebarProps) {
  return (
    <aside className={styles.guideSidebar}>
      {guideData.sections.map((section) => (
        <div key={section.code} className={styles.sidebarSection}>
          <div className={styles.sidebarSectionTitle}>{section.title}</div>
          {section.subsections.map((subsection) => (
            <div key={subsection.code} className={styles.sidebarSubsection}>
              <div className={styles.sidebarSubsectionTitle}>{subsection.title}</div>
              {subsection.docs.map((doc) => (
                <Link
                  key={doc.code}
                  href={`/guide/${doc.code}`}
                  className={`${styles.sidebarDoc} ${
                    doc.code === currentCode ? styles.sidebarDocActive : ""
                  }`}
                >
                  <span className={styles.sidebarDocCode}>{doc.code}</span>
                  <span className={styles.sidebarDocTitle}>{doc.shortTitle}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
