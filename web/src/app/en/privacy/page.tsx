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
              This Privacy Policy defines the procedure for processing information by the <strong>eyeCARD</strong> service (hereinafter referred to as the Service). The Service is designed to conduct neuromarketing audits of product cards and provide analysis results to users.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>2. Account and Authentication Data</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              To access the Service, a user creates an account using a <strong>Telegram username</strong> as a login and a password set by the user. The following account data is processed:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Telegram username (login)</strong> — used as a unique account identifier. The Service does not collect email addresses or phone numbers.
              </li>
              <li>
                <strong>Password hash</strong> — the password is stored only as a bcrypt hash. The plain-text password is never stored.
              </li>
              <li>
                <strong>Telegram ID (chatId)</strong> — used solely for sending completed reports and system notifications via the Telegram bot.
              </li>
              <li>
                <strong>JWT token</strong> — a session token stored locally in the browser (for the web app) or in <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", backgroundColor: "var(--bg-primary)", padding: "2px 4px", borderRadius: "3px" }}>chrome.storage.local</code> (for the extension) to authenticate API requests.
              </li>
              <li>
                <strong>Auth channel</strong> — indicates the messenger used for report delivery (Telegram, VK, etc.).
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>3. Processed Technical Information</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              To ensure the functionality of the Service and timely delivery of completed reports (Visual Passports), the Service stores the following technical information:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Account identifiers</strong> — Telegram username, Telegram ID, and internal user ID.
              </li>
              <li>
                <strong>Balance data</strong> — the number of eyeCARD Coins associated with the account.
              </li>
              <li>
                <strong>Analysis metadata</strong> — job identifiers, timestamps, and delivery status, used to provide history and send reports.
              </li>
              <li>
                <strong>Technical data transmitted automatically</strong> — IP address, cookies, browser information, time of access, and requested page address. Cookies are not used to establish the user&apos;s identity.
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
              We take the security of account data seriously:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Passwords are stored as bcrypt hashes; plain-text passwords are never retained.</li>
              <li>All API communication is performed over HTTPS.</li>
              <li>JWT tokens are stored in secure browser storage and are not shared with third parties.</li>
              <li>Telegram username, Telegram ID, and account data are stored in Google Firestore with restricted access and are used only by automated Service modules.</li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>6. Data Retention and Deletion</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Account data is stored for as long as the account remains active. Users may request deletion of their account and associated data by contacting <a href="mailto:support@eyecard.ru" style={{ color: "var(--cobalt-primary)" }}>support@eyecard.ru</a>. Upon request, the Service will remove the Telegram username, Telegram ID, analysis history, and balance information in accordance with applicable law.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>7. Children&apos;s Privacy</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              The eyeCARD service is not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that we have received such information, we will immediately delete it from our database.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>8. Changes to This Policy</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              The Service reserves the right to make changes to this Privacy Policy at any time. Changes take effect from the moment they are published on this page.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>9. Contact Information</h2>
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
