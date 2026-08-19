import React from "react";
import Link from "next/link";
import Header from "../components/Header";

export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100vh", padding: "40px 0" }}>
      <Header />
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Simple Technical Header */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "14px", fontFamily: "var(--font-mono)", color: "var(--cobalt-primary)", fontWeight: "bold" }}>
            ← eyeCARD
          </Link>
          <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
            STATUS: ACTIVE
          </span>
        </div>

        <article className="card" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
            Политика конфиденциальности
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "-12px" }}>
            Последнее обновление: {new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>1. Общие положения</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Настоящая Политика конфиденциальности определяет порядок обработки технической информации сервисом <strong>eyeCARD</strong> (далее — Сервис). Сервис предназначен для проведения нейромаркетингового аудита карточек товаров и предоставления результатов анализа пользователям.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>2. Отсутствие сбора персональных данных</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Сервис eyeCARD придерживается принципа минимизации данных и <strong>не собирает, не хранит и не обрабатывает персональные данные</strong> пользователей (такие как имя, фамилия, номер телефона, адрес электронной почты или платежные реквизиты).
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>3. Обрабатываемая техническая информация</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Для обеспечения работоспособности Сервиса и своевременной отправки готовых отчетов (Визуальных Паспортов) Сервис сохраняет исключительно минимальную техническую информацию:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Идентификатор чата (chatId)</strong> — для пользователей мессенджера Telegram. Используется только для отправки отчетов и системных уведомлений через Telegram-бот.
              </li>
              <li>
                <strong>Идентификатор пользователя (userId)</strong> — для пользователей социальной сети ВКонтакте. Используется только для доставки результатов аудита.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>4. Анализ общедоступных изображений</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Сервис выполняет визуальный и семантический аудит на основе изображений товаров, которые находятся в свободном, публичном доступе на страницах маркетплейсов (Wildberries, Ozon и др.). Сервис не осуществляет сбор, анализ или передачу конфиденциальных графических материалов или закрытых данных селлеров.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>5. Безопасность и защита данных</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Технические идентификаторы (`chatId` и `userId`) хранятся в защищенной облачной базе данных Google Firestore и защищены строгими протоколами безопасности. Доступ к этим данным ограничен и используется исключительно автоматизированными модулями Сервиса для отправки готовых результатов анализа.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>6. Защита данных детей</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Сервис eyeCARD не предназначен для лиц младше 13 лет. Мы не собираем осознанно персональные данные от детей младше 13 лет. Если нам станет известно, что мы получили такую информацию, мы немедленно удалим её из нашей базы данных.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>7. Изменения политики</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Сервис оставляет за собой право вносить изменения в настоящую Политику конфиденциальности в любое время. Изменения вступают в силу с момента их публикации на данной странице.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>8. Контактная информация</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Если у вас возникли вопросы или предложения по поводу настоящей Политики конфиденциальности, пожалуйста, свяжитесь с нами по электронной почте: <a href="mailto:support@eyecard.ru" style={{ color: "var(--cobalt-primary)" }}>support@eyecard.ru</a>.
            </p>
          </section>
        </article>

        {/* Footer info */}
        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} eyeCARD. All rights reserved.
        </div>
      </div>
    </div>
  );
}
