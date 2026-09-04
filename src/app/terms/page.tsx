import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        </div>

        <article className="card" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
            Пользовательское соглашение
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
              ИП Мамаев Д.Л.<br />
              ОГРНИП 306143519900087<br />
              Email: support@eyecard.ru
            </p>
          </section>
        </article>

      <Footer />
      </div>
    </div>
  );
}
