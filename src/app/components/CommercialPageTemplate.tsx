import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { FaqJsonLd } from "@/app/guide/components/GuideJsonLd";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
  image?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedArticle {
  title: string;
  url: string;
  description: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Вводный абзац под конкретный поисковый интент — то, чего нет на главной. */
interface LeadBlock {
  title?: string;
  paragraphs: string[];
}

interface ContentPoint {
  title: string;
  text: string;
}

/** Произвольный смысловой блок: заголовок + абзацы + карточки-пункты. */
interface ContentSection {
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  points?: ContentPoint[];
}

interface SpecTable {
  title: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

interface ChecklistBlock {
  title: string;
  intro?: string;
  items: string[];
}

interface PromptPackBlock {
  title: string;
  intro?: string;
  items: { label: string; prompt: string; note?: string }[];
}

interface SourceLink {
  label: string;
  href: string;
}

interface CommercialPageTemplateProps {
  heroTitle: React.ReactNode;
  heroAlt: string;
  heroDescription: string;
  heroImage?: string;
  benefits: Benefit[];
  steps: Step[];
  faq: FAQItem[];
  relatedArticles: RelatedArticle[];
  ctaText?: string;
  ctaLink?: string;
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Уникальное наполнение под интент страницы. Без этих блоков любая новая
   * посадочная становится пересказом главной, а Яндекс склеивает такие
   * страницы по содержанию — уже независимо от canonical.
   */
  lead?: LeadBlock;
  sections?: ContentSection[];
  specs?: SpecTable;
  checklist?: ChecklistBlock;
  promptPack?: PromptPackBlock;
  /** Первоисточники (документация площадок и т.п.) — сигнал E-E-A-T. */
  sources?: { title: string; items: SourceLink[] };
}

export default function CommercialPageTemplate({
  heroTitle,
  heroAlt,
  heroDescription,
  heroImage = "/hero.png",
  benefits,
  steps,
  faq,
  relatedArticles,
  ctaText = "Установить расширение",
  ctaLink = "https://chromewebstore.google.com/detail/eyecard/fdmglgodmnjklcbkdjmnlbphccjcppdp",
  breadcrumbs,
  lead,
  sections,
  specs,
  checklist,
  promptPack,
  sources,
}: CommercialPageTemplateProps) {
  return (
    <div className="page-wrapper">
      <Header />

      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      <main className="main-content">
        {/* Hero Section — как на главной */}
        <section className="expert-terminal hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                {heroTitle}
              </h1>
              <div className="hero-description">
                <p className="hero-text" dangerouslySetInnerHTML={{ __html: heroDescription }} />
                <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {ctaText}
                </a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <div className="image-frame">
                <Image src={heroImage} alt={heroAlt} width={420} height={420} priority className="hero-image" />
              </div>
            </div>
          </div>
        </section>

        {/* Lead — постановка задачи под интент страницы */}
        {lead && (
          <section className="container" style={{ padding: "72px 24px 0" }}>
            <div style={{ maxWidth: "820px" }}>
              {lead.title && (
                <h2 className="section-title" style={{ marginBottom: "20px" }}>
                  {lead.title}
                </h2>
              )}
              {lead.paragraphs.map((text, index) => (
                <p
                  key={index}
                  style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "16px" }}
                >
                  {text}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="container methodology-section" style={{ padding: "80px 24px" }}>
          <div className="section-header">
            <h2 className="section-title">Преимущества</h2>
            <p className="section-subtitle">Почему селлеры выбирают eyeCARD</p>
          </div>
          <div className="steps-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="card step-card">
                <div className="card-header">
                  <span className="technical-data">[{String(index + 1).padStart(2, "0")}]: {benefit.icon}</span>
                </div>
                <div className="card-body">
                  <h3 className="step-title">{benefit.title}</h3>
                  <p className="step-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section — с изображениями как на главной */}
        <section className="container" style={{ padding: "80px 24px" }}>
          <div className="section-header">
            <h2 className="section-title">Как это работает</h2>
            <p className="section-subtitle">Три простых шага к улучшению карточки</p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="card step-card">
                <div className="card-header">
                  <span className="technical-data">[{String(step.number).padStart(2, "0")}]: {step.title}</span>
                </div>
                <div className="card-body step-grid">
                  <div>
                    <p className="step-description">{step.description}</p>
                  </div>
                  {step.image && (
                    <div className="step-image-container">
                      <div className="step-image" style={{ backgroundImage: `url('${step.image}')` }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Смысловые блоки под интент */}
        {sections?.map((section, index) => (
          <section key={`s${index}`} className="container" style={{ padding: "72px 24px" }}>
            <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
              <h2 className="section-title">{section.title}</h2>
              {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
            </div>
            {section.paragraphs?.map((text, i) => (
              <p key={`p${i}`} style={{ fontSize: "17px", lineHeight: "1.7", maxWidth: "820px", marginBottom: "16px" }}>
                {text}
              </p>
            ))}
            {section.points && (
              <div className="steps-grid">
                {section.points.map((point, i) => (
                  <div key={`pt${i}`} className="card step-card">
                    <div className="card-header">
                      <span className="technical-data">[{String(i + 1).padStart(2, "0")}]: {point.title}</span>
                    </div>
                    <div className="card-body">
                      <p className="step-description">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Таблица требований */}
        {specs && (
          <section className="container" style={{ padding: "72px 24px" }}>
            <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
              <h2 className="section-title">{specs.title}</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
                <thead>
                  <tr>
                    {specs.columns.map((col, i) => (
                      <th
                        key={i}
                        style={{
                          textAlign: "left",
                          padding: "14px 16px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "13px",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          borderBottom: "2px solid var(--border-color)",
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          style={{
                            padding: "14px 16px",
                            fontSize: "16px",
                            lineHeight: "1.5",
                            verticalAlign: "top",
                            borderBottom: "1px solid var(--border-color)",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {specs.note && (
              <p style={{ marginTop: "20px", fontSize: "14px", color: "var(--text-muted)", maxWidth: "820px" }}>
                {specs.note}
              </p>
            )}
          </section>
        )}

        {/* Чек-лист */}
        {checklist && (
          <section style={{ backgroundColor: "var(--surface-low)", padding: "72px 0" }}>
            <div className="container">
              <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
                <h2 className="section-title">{checklist.title}</h2>
                {checklist.intro && <p className="section-subtitle">{checklist.intro}</p>}
              </div>
              <ol style={{ maxWidth: "820px", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {checklist.items.map((item, i) => (
                  <li key={i} style={{ fontSize: "17px", lineHeight: "1.6" }}>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Промпт-пак */}
        {promptPack && (
          <section className="container" style={{ padding: "72px 24px" }}>
            <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
              <h2 className="section-title">{promptPack.title}</h2>
              {promptPack.intro && <p className="section-subtitle">{promptPack.intro}</p>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
              {promptPack.items.map((item, i) => (
                <div key={i} className="card" style={{ padding: "24px" }}>
                  <h3 className="step-title" style={{ marginBottom: "12px" }}>
                    {item.label}
                  </h3>
                  <pre
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      whiteSpace: "pre-wrap",
                      backgroundColor: "var(--deep-ink)",
                      color: "#fff",
                      padding: "18px",
                      borderRadius: "var(--radius-md)",
                      overflowX: "auto",
                    }}
                  >
                    {item.prompt}
                  </pre>
                  {item.note && (
                    <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-muted)" }}>{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Первоисточники */}
        {sources && (
          <section className="container" style={{ padding: "0 24px 72px" }}>
            <h2 className="section-title" style={{ fontSize: "20px", marginBottom: "16px" }}>
              {sources.title}
            </h2>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {sources.items.map((link, i) => (
                <li key={i} style={{ fontSize: "16px" }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--primary)", textDecoration: "underline" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ Section */}
        <section style={{ backgroundColor: "var(--surface-low)", padding: "80px 0" }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Частые вопросы</h2>
            </div>
            <FaqJsonLd items={faq} />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
              {faq.map((item, index) => (
                <details key={index} className="card" style={{ padding: "24px" }}>
                  <summary style={{ fontSize: "18px", fontWeight: "600", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {item.question}
                    <span style={{ color: "var(--accent)", fontSize: "24px" }}>+</span>
                  </summary>
                  <p style={{ fontSize: "16px", lineHeight: "1.6", color: "var(--text-muted)", marginTop: "12px" }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="container" style={{ padding: "80px 24px" }}>
          <div className="section-header">
            <h2 className="section-title">Читайте также</h2>
            <p className="section-subtitle">Углубите знания по методологии</p>
          </div>
          <div className="steps-grid">
            {relatedArticles.map((article, index) => (
              <Link key={index} href={article.url} className="card step-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card-body">
                  <h3 className="step-title">{article.title}</h3>
                  <p className="step-description">{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA — как на главной */}
        <section className="expert-terminal container" style={{ padding: "60px 32px", textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
          <h2 className="section-title" style={{ color: "#fff", marginBottom: "16px" }}>
            Готовы <span className="accent-text">улучшить</span> свои карточки?
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "32px", color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto 32px" }}>
            Установите расширение eyeCARD и начните анализ прямо сейчас
          </p>
          <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "16px 48px" }}>
            {ctaText}
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
