import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ConsentPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100vh", padding: "40px 0" }}>
      <Header />
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Simple Technical Header */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "14px", fontFamily: "var(--font-mono)", color: "var(--cobalt-primary)", fontWeight: "bold" }}>
            ← eyeCARD
          </Link>
        </div>

        <article className="card" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
            Согласие на обработку персональных данных
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "-12px" }}>
            Последнее обновление: {new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Настоящим я (Пользователь) даю свое согласие <strong>ИП Мамаев Д.Л. (ОГРНИП 306143519900087)</strong> (далее — Оператор) на обработку моих персональных данных, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, обезличивание, блокирование, удаление, уничтожение, а также передачу третьим лицам (включая платёжного агента и облачных провайдеров) в объёме, необходимом для предоставления услуг Сервиса.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Персональные данные — любая информация, относящаяся к прямо или косвенно определённому или определяемому физическому лицу (Пользователю), включая технические идентификаторы, контактные данные, платёжные реквизиты и иные данные, которые могут быть получены в рамках использования Сервиса.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Я подтверждаю, что даю такое согласие добровольно и в своём интересе. Согласие даётся на срок использования Сервиса и до истечения обязательств сторон, если иное не предусмотрено законодательством Российской Федерации.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Я осведомлён(а), что вправе отозвать согласие, направив соответствующее уведомление на электронный адрес Оператора. В случае отзыва согласия на обработку персональных данных, необходимых для предоставления услуг, дальнейшее использование Сервиса может стать невозможным.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Если я не согласен с условиями настоящей Политики и/или данным согласием, я обязуюсь прекратить использование Сервиса.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Контактная информация</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Если у вас возникли вопросы по поводу настоящего согласия, пожалуйста, свяжитесь с нами по электронной почте: <a href="mailto:support@eyecard.ru" style={{ color: "var(--cobalt-primary)" }}>support@eyecard.ru</a>.
            </p>
          </section>
        </article>

        <Footer />
      </div>
    </div>
  );
}
