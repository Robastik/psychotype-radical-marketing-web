"use client";

import { useState } from "react";
import styles from "../guide.module.css";
import type { GuideDoc } from "@/app/guide/data/types";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideSidebar from "./GuideSidebar";
import GuideHeader from "./GuideHeader";
import TableOfContents from "./TableOfContents";
import MarkdownRenderer from "./MarkdownRenderer";

interface GuideLayoutProps {
  doc: GuideDoc;
}

export default function GuideLayout({ doc }: GuideLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className={styles.guidePage}>
      <Header />
      <div className={styles.guideContainer}>
        <GuideSidebar currentCode={doc.code} />
        <main className={styles.guideMain}>
          <article className={styles.guideContent}>
            <GuideHeader doc={doc} />
            <MarkdownRenderer blocks={doc.blocks} />
          </article>
        </main>
        <aside className={styles.guideToc}>
          <TableOfContents blocks={doc.blocks} />
        </aside>
      </div>
      <Footer />
      <button
        className={styles.mobileSidebarToggle}
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        aria-label="Открыть навигацию"
      >
        ☰
      </button>
      {isMobileNavOpen && (
        <div className={styles.mobileSidebarOverlay} onClick={() => setIsMobileNavOpen(false)}>
          <div className={styles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
            <GuideSidebar currentCode={doc.code} />
          </div>
        </div>
      )}
    </div>
  );
}
