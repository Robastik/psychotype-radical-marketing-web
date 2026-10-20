"use client";

import { useState } from "react";
import styles from "../guide.module.css";
import type { GuideDoc } from "@/app/guide/data/types";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumbs from "@/app/components/Breadcrumbs";
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
      <Breadcrumbs items={[
        { label: "Главная", href: "/" },
        { label: "Справочник", href: "/guide" },
        { label: doc.title },
      ]} />
      <div className={styles.guideContainer}>
        <GuideSidebar currentCode={doc.code} />
        <main className={styles.guideMain}>
          <article className={styles.guideContent}>
            <GuideHeader doc={doc} />
            <MarkdownRenderer blocks={doc.blocks} />
            {doc.faq && doc.faq.length > 0 && (
              <section className={styles.faq} aria-labelledby="guide-faq-heading">
                <h2 className={styles.faqLabel} id="guide-faq-heading">
                  Частые вопросы
                </h2>
                <div className={styles.faqList}>
                  {doc.faq.map((item, index) => (
                    <details key={index} className={styles.faqItem}>
                      <summary className={styles.faqQuestion}>{item.question}</summary>
                      <p className={styles.faqAnswer}>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
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
