import React from "react";
import Link from "next/link";
import Header from "../../components/Header";

export default function ExtensionPrivacyPolicy() {
  return (
    <div style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100vh", padding: "40px 0" }}>
      <Header />
      <div className="container" style={{ maxWidth: "800px" }}>
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
            Privacy Policy for eyeCARD Chrome Extension
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "-12px" }}>
            Last updated: {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Overview</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              <strong>eyeCARD</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;the extension&quot;) is a Chrome browser extension that provides psychological analysis of marketplace product cards. This privacy policy explains what data we collect, how we use it, and your rights.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>1. Account &amp; Authentication Data</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Telegram ID</strong>: Your Telegram user identifier, used to link your extension session to your account.
              </li>
              <li>
                <strong>JWT token</strong>: A session token stored locally in your browser (<code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", backgroundColor: "var(--bg-primary)", padding: "2px 4px", borderRadius: "3px" }}>chrome.storage.local</code>) to authenticate API requests.
              </li>
              <li>
                <strong>Coin balance</strong>: The number of eyeCARD coins in your account, cached locally for 30 days.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>2. Product Card Data</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Sent to backend <strong>only when you explicitly request analysis</strong> by clicking the &quot;Analyze&quot; button:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Product images</strong>: Binary image files from the product card you are analyzing (downloaded from your browser cache, not from the marketplace directly).
              </li>
              <li>
                <strong>Product text</strong>: Product name, description, and attributes extracted from the page you are viewing.
              </li>
              <li>
                <strong>Marketplace identifier</strong>: Which marketplace the card is from (Wildberries or Ozon).
              </li>
              <li>
                <strong>Product SKU</strong>: The unique identifier of the product on the marketplace.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>3. Telemetry</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Anonymous client ID</strong>: A random identifier generated locally to distinguish extension instances.
              </li>
              <li>
                <strong>Usage events</strong>: Events like <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", backgroundColor: "var(--bg-primary)", padding: "2px 4px", borderRadius: "3px" }}>extension_opened</code>, <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", backgroundColor: "var(--bg-primary)", padding: "2px 4px", borderRadius: "3px" }}>analysis_clicked</code>, with parameters (marketplace, SKU, timestamp).
              </li>
              <li>
                <strong>No personal data</strong>: Telemetry does not include your name, email, Telegram ID, or any identifiable information.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>4. Local Storage (never sent to backend)</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Analysis cache</strong>: Results of past analyses, stored locally for 30 days to avoid re-analyzing the same product.
              </li>
              <li>
                <strong>UI preferences</strong>: Menu settings, language preference, etc.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>5. How We Use Your Data</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Telegram ID &amp; JWT</strong>: To authenticate you, track your coin balance, and deliver reports to your Telegram account.
              </li>
              <li>
                <strong>Product images &amp; text</strong>: Solely for the purpose of psychological analysis (the single purpose of the extension). Data is processed on our backend and not stored permanently.
              </li>
              <li>
                <strong>Telemetry</strong>: To improve the extension&apos;s performance and user experience. Data is aggregated and anonymized.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>6. Data Sharing &amp; Third Parties</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Backend processing</strong>: Product data is sent to our FastAPI backend hosted on Google Cloud Run (GCP, us-central1 region). We do not share your data with any other third parties.
              </li>
              <li>
                <strong>Payments</strong>: If you purchase additional coins, payment processing is handled by ModulBank (a Russian payment service) via our Telegram bot. We do not store your payment credentials or financial data in the extension or backend.
              </li>
              <li>
                <strong>No data selling</strong>: We do not sell, rent, or trade your personal data to any third party.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>7. Data Retention</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>JWT token</strong>: Stored locally until you log out or the token expires.
              </li>
              <li>
                <strong>Analysis cache</strong>: Automatically deleted after 30 days.
              </li>
              <li>
                <strong>Backend logs</strong>: Server logs may retain IP addresses and request metadata for up to 30 days for security and debugging purposes.
              </li>
              <li>
                <strong>Telemetry</strong>: Aggregated data is retained indefinitely; individual events are not linked to your identity.
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>8. Your Rights</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              You have the right to:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Access</strong>: Request a copy of the data we hold about you (contact us via the email below).
              </li>
              <li>
                <strong>Deletion</strong>: Request deletion of your Telegram ID and associated account data by logging out of the extension and contacting support.
              </li>
              <li>
                <strong>Opt-out of telemetry</strong>: Telemetry can be disabled in the extension settings (menu → preferences).
              </li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>9. Data Security</h2>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>All API communication uses HTTPS encryption.</li>
              <li>JWT tokens are stored in Chrome&apos;s secure local storage.</li>
              <li>We do not log or store your Telegram password or authentication credentials (authentication is handled by Telegram&apos;s official OAuth flow).</li>
            </ul>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>10. Children&apos;s Privacy</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              The extension is intended for adult users (marketplace sellers). We do not knowingly collect data from children under 13.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>11. Changes to This Policy</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              We may update this policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>12. Contact Us</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              If you have questions about this privacy policy or wish to exercise your data rights, contact us:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Email</strong>: <a href="mailto:support@eyecard.ru" style={{ color: "var(--cobalt-primary)" }}>support@eyecard.ru</a>
              </li>
              <li>
                <strong>Website</strong>: <a href="https://eyecard.ru" style={{ color: "var(--cobalt-primary)" }} target="_blank" rel="noopener noreferrer">eyecard.ru</a>
              </li>
              <li>
                <strong>Telegram support</strong>: <a href="https://t.me/eyecard_support" style={{ color: "var(--cobalt-primary)" }} target="_blank" rel="noopener noreferrer">@eyecard_support</a>
              </li>
            </ul>
          </section>
        </article>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} eyeCARD. All rights reserved.
        </div>
      </div>
    </div>
  );
}
