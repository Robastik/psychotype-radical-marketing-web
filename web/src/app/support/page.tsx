import React from "react";
import Link from "next/link";
import Header from "../components/Header";

export default function Support() {
  return (
    <div style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100vh", padding: "40px 0" }}>
      <Header />
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "14px", fontFamily: "var(--font-mono)", color: "var(--cobalt-primary)", fontWeight: "bold" }}>
            ← eyeCARD
          </Link>
          <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
            SUPPORT
          </span>
        </div>

        <article className="card" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
            Поддержка eyeCARD
          </h1>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Нужна помощь?</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Если у вас возникли вопросы по работе расширения eyeCARD, проблемы с авторизацией, оплатой или анализом карточек — мы готовы помочь.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Свяжитесь с нами</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{
                padding: "16px",
                backgroundColor: "var(--bg-primary)",
                borderRadius: "8px",
                border: "1px solid var(--border-color)"
              }}>
                <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "4px" }}>
                  Email:
                </div>
                <a
                  href="mailto:support@eyecard.ru"
                  style={{
                    fontSize: "16px",
                    color: "var(--cobalt-primary)",
                    fontWeight: "600",
                    textDecoration: "none"
                  }}
                >
                  support@eyecard.ru
                </a>
              </div>

              <div style={{
                padding: "16px",
                backgroundColor: "var(--bg-primary)",
                borderRadius: "8px",
                border: "1px solid var(--border-color)"
              }}>
                <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "4px" }}>
                  Telegram:
                </div>
                <a
                  href="https://t.me/eyecard_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "16px",
                    color: "var(--cobalt-primary)",
                    fontWeight: "600",
                    textDecoration: "none"
                  }}
                >
                  @eyecard_support
                </a>
              </div>
            </div>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Что указать при обращении</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Чтобы мы могли быстрее помочь, пожалуйста, укажите:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Описание проблемы (что вы делали и что произошло)</li>
              <li>Название маркетплейса (Wildberries или Ozon)</li>
              <li>Версию браузера Chrome</li>
              <li>Скриншоты (если возможно)</li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Время ответа</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Мы стараемся отвечать на обращения в течение <strong>24 часов</strong> в рабочие дни.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Полезные ссылки</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <Link href="/guide" style={{ color: "var(--cobalt-primary)" }}>
                  Методические материалы и руководство
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ color: "var(--cobalt-primary)" }}>
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: "var(--cobalt-primary)" }}>
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </section>
        </article>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} eyeCARD. Все права защищены.
        </div>
      </div>
    </div>
  );
}
