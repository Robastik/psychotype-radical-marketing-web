import React from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
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

interface CommercialPageTemplateProps {
  heroTitle: string;
  heroDescription: string;
  benefits: Benefit[];
  steps: Step[];
  faq: FAQItem[];
  relatedArticles: RelatedArticle[];
  ctaText?: string;
  ctaLink?: string;
}

export default function CommercialPageTemplate({
  heroTitle,
  heroDescription,
  benefits,
  steps,
  faq,
  relatedArticles,
  ctaText = "Установить расширение",
  ctaLink = "https://chromewebstore.google.com/detail/eyecard/fdmglgodmnjklcbkdjmnlbphccjcppdp",
}: CommercialPageTemplateProps) {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="expert-terminal hero-section">
          <div className="container">
            <h1 className="hero-title" style={{ fontSize: "48px", fontWeight: "800", marginBottom: "24px" }}>
              {heroTitle}
            </h1>
            <p className="hero-description" style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "800px", marginBottom: "32px" }}>
              {heroDescription}
            </p>
            <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {ctaText}
            </a>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container" style={{ padding: "80px 20px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }}>
            Преимущества
          </h2>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {benefits.map((benefit, index) => (
              <div key={index} className="card" style={{ padding: "32px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>{benefit.icon}</div>
                <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>{benefit.title}</h3>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container" style={{ padding: "80px 20px", backgroundColor: "var(--bg-secondary)" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }}>
            Как это работает
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "800px", margin: "0 auto" }}>
            {steps.map((step) => (
              <div key={step.number} className="card" style={{ padding: "32px", display: "flex", gap: "24px" }}>
                <div style={{ fontSize: "48px", fontWeight: "800", color: "var(--cobalt-primary)", opacity: "0.2" }}>
                  {String(step.number).padStart(2, "0")}
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>{step.title}</h3>
                  <p style={{ fontSize: "16px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container" style={{ padding: "80px 20px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }}>
            Частые вопросы
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            {faq.map((item, index) => (
              <details key={index} className="card" style={{ padding: "24px" }}>
                <summary style={{ fontSize: "18px", fontWeight: "600", cursor: "pointer", marginBottom: "12px" }}>
                  {item.question}
                </summary>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "var(--text-muted)", marginTop: "12px" }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="container" style={{ padding: "80px 20px", backgroundColor: "var(--bg-secondary)" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }}>
            Читайте также
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1200px", margin: "0 auto" }}>
            {relatedArticles.map((article, index) => (
              <Link key={index} href={article.url} className="card" style={{ padding: "24px", textDecoration: "none", color: "inherit" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>{article.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="expert-terminal container" style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "24px" }}>
            Готовы улучшить свои карточки?
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "32px", color: "var(--text-muted)" }}>
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
