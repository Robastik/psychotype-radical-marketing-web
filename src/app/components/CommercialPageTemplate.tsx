import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

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

        {/* FAQ Section */}
        <section style={{ backgroundColor: "var(--surface-low)", padding: "80px 0" }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Частые вопросы</h2>
            </div>
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
