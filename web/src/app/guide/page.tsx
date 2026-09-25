"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { guideData } from "@/app/guide/data/guide-data";
import GuideSidebar from "@/app/guide/components/GuideSidebar";
import styles from "./guide.module.css";

export default function GuideIndexPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className={styles.guidePage}>
      <Header />
      <div className={styles.guideContainer}>
        <GuideSidebar />
        <main className={styles.guideMain}>
          <div className={styles.guideContent}>
            <h1 className={styles.guideTitle}>Методический справочник eyeCARD</h1>
            <p className={styles.paragraph}>
              Пошаговое руководство по методу: от теории до практики. Каждый документ — один
              узкий вопрос, 1–3 экрана чтения.
            </p>

            <div className={styles.indexGrid}>
              {guideData.sections.map((section) => (
                <div key={section.code} className={styles.indexCard}>
                  <h2 className={styles.indexCardTitle}>{section.title}</h2>
                  <ul className={styles.indexDocList}>
                    {section.subsections.map((subsection) => (
                      <li key={subsection.code}>
                        <div className={styles.indexSubsectionTitle}>{subsection.title}</div>
                        <ul className={styles.indexSubsectionDocList}>
                          {subsection.docs.map((doc) => (
                            <li key={doc.code}>
                              <Link
                                href={`/guide/${doc.code}`}
                                className={styles.inlineLink}
                              >
                                <span className={styles.indexDocCode}>{doc.code}</span>{" "}
                                {doc.shortTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </main>
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
        <div
          className={styles.mobileSidebarOverlay}
          onClick={() => setIsMobileNavOpen(false)}
        >
          <div className={styles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
            <GuideSidebar />
          </div>
        </div>
      )}
    </div>
  );
}
