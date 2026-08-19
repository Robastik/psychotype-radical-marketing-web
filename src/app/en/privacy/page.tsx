import React from "react";
import Link from "next/link";
import Header from "../../components/Header";

export default function PrivacyPolicyEn() {
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
            Privacy Policy
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "-12px" }}>
            Last updated: {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>1. Introduction</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              This Privacy Policy defines the procedure for processing technical information by the <strong>eyeCARD</strong> service (hereinafter referred to as the Service). The Service is designed to conduct neuromarketing audits of product cards and provide analysis results to users.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>2. No Collection of Personal Data</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              The eyeCARD service adheres to the principle of data minimization and <strong>does not collect, store, or process personal data</strong> of users (such as name, surname, phone number, email address, or payment details).
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>3. Processed Technical Information</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              To ensure the functionality of the Service and timely delivery of completed reports (Visual Passports), the Service stores only minimal technical information:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Chat Identifier (chatId)</strong> — for Telegram messenger users. Used solely for sending reports and system notifications via the Telegram bot.
              </li>
              <li>
                <strong>User Identifier (userId)</strong> — for VKontakte social network users. Used solely for delivering audit results.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>4. Analysis of Publicly Available Images</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              The Service performs visual and semantic audits based on product images that are freely and publicly available on marketplace pages (Wildberries, Ozon, etc.). The Service does not collect, analyze, or transmit confidential graphic materials or closed seller data.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>5. Data Security and Protection</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              {"Technical identifiers (`chatId` and `userId`) are stored in a secure Google Firestore cloud database and protected by strict security protocols. Access to this data is restricted and used exclusively by automated Service modules for sending completed analysis results."}
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>6. Children's Privacy</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              The eyeCARD service is not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that we have received such information, we will immediately delete it from our database.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>7. Changes to This Policy</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              The Service reserves the right to make changes to this Privacy Policy at any time. Changes take effect from the moment they are published on this page.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>8. Contact Information</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              If you have any questions or suggestions regarding this Privacy Policy, please contact us by email: <a href="mailto:support@eyecard.ru" style={{ color: "var(--cobalt-primary)" }}>support@eyecard.ru</a>.
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
