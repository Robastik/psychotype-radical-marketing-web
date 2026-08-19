import React from "react";
import Link from "next/link";
import Header from "../components/Header";

export default function TermsOfService() {
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
            CONTRACT_OFFER: v1.0
          </span>
        </div>

        <article className="card" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
            Публичная оферта (Пользовательское соглашение)
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "-12px" }}>
            Последнее обновление: 30 июля 2026 г.
          </p>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>1. Предмет соглашения</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Настоящее Соглашение является публичной офертой сервиса <strong>eyeCARD</strong> (далее — Исполнитель). Исполнитель предоставляет пользователю (далее — Заказчик) доступ к автоматизированной AI-платформе нейромаркетингового аудита карточек товаров на маркетплейсах.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>2. Права Исполнителя на результаты анализа</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Поскольку аудит проводится исключительно на основе изображений товаров и текстовых описаний, находящихся в свободном, открытом доступе на страницах маркетплейсов, <strong>Сервис оставляет за собой право использовать результаты любого проведенного анализа по своему усмотрению</strong>. Это включает, но не ограничивается: публикацией результатов анализа (Визуальных Паспортов) в открытом доступе на данном сайте, демонстрацией их в качестве публичных кейсов, а также использованием в рекламных и образовательных материалах Исполнителя.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>3. Условия хранения данных и верификация</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Исполнитель предоставляет функцию подтверждения подлинности отчетов (сервис верификации паспортов по уникальному идентификатору `JOB_ID`). 
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              <strong>Обратите внимание:</strong> Сервис <strong>не обязуется хранить данные результатов анализа (Паспорта) какое-либо определенное время</strong> и может удалить или архивировать их без предварительного уведомления. Условия использования сервиса подтверждения паспортов, включая срок хранения и доступность архивов, могут меняться Исполнителем в одностороннем порядке в любой момент.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>4. Тарификация и порядок оплаты</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Внутренней расчетной единицей Сервиса являются Монеты (Coins). Текущая стоимость тарифов и пакетов монет отображается внутри браузерного расширения eyeCARD. При переходе к оплате в авторизованном мессенджер-боте (например, Telegram) стоимость условных единиц (Coins) конвертируется и выставляется к оплате в российских рублях (RUB) в соответствии с тарифами Исполнителя.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>5. Правила возврата денежных средств</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Поскольку предоставление услуг по аудиту является цифровой услугой мгновенного исполнения, возврат денежных средств за успешно выполненные анализы не производится. В случае технических сбоев в работе алгоритма, повлекших невозможность формирования отчета, Заказчику компенсируется стоимость списанных монет на баланс личного кабинета в мессенджере.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>6. Реквизиты и контакты Исполнителя</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6", fontFamily: "var(--font-mono)" }}>
              Сервис: eyeCARD (Индивидуальный предприниматель / Организация)<br />
              ИНН / ОГРН: [Укажите Ваши реквизиты]<br />
              Служба поддержки: t.me/eyecard_support_bot<br />
              Email: support@eyecard.ru
            </p>
          </section>
        </article>

      <footer style={{ backgroundColor: "var(--surface-low)", borderTop: "1px solid var(--border-color)", padding: "48px 0", marginTop: "24px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span className="technical-data" style={{ fontSize: "20px", fontWeight: "800", color: "var(--primary)" }}>eyeCARD</span>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Нейромаркетинговая AI-лаборатория для бизнеса.</span>
            </div>
            <div className="technical-data" style={{ display: "flex", gap: "32px", fontSize: "13px" }}>
              <Link href="/methodology" style={{ color: "var(--text-primary)", fontWeight: "600" }}>Методология</Link>
              <Link href="/terms" style={{ color: "var(--text-primary)", fontWeight: "600" }}>Оферта</Link>
              <Link href="/privacy" style={{ color: "var(--text-primary)", fontWeight: "600" }}>Privacy</Link>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ fontSize: "11px", lineHeight: "1.6", color: "var(--text-muted)", maxWidth: "800px" }}>
              * Стоимость проведения анализов указывается в интерфейсе браузерного расширения eyeCARD в условных единицах (Coins/Монеты) и приводится в российских рублях (RUB) при формировании счета на оплату внутри авторизованного мессенджер-бота (Telegram/ВКонтакте).
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "var(--text-muted)", flexWrap: "wrap", gap: "12px" }}>
              <span className="technical-data">© {new Date().getFullYear()} eyeCARD</span>
            </div>
          </div>

        </div>
      </footer>
      </div>
    </div>
  );
}
