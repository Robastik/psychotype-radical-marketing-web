import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="technical-data footer-logo">eyeCARD</span>
            <span className="footer-tagline">Нейромаркетинговая AI-лаборатория для бизнеса.</span>
          </div>
          <nav className="technical-data footer-nav" aria-label="Дополнительная навигация">
            <Link href="/terms" className="footer-link">Оферта</Link>
            <Link href="/privacy" className="footer-link">Конфиденциальность</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span className="technical-data">© {new Date().getFullYear()} eyeCARD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
