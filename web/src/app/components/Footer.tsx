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
            <div className="footer-nav-group">
              <span className="footer-nav-title">О нас</span>
              <div className="footer-nav-links">
                <Link href="/terms" className="footer-link">Пользовательское соглашение</Link>
                <Link href="/privacy" className="footer-link">Политика конфиденциальности</Link>
                <Link href="/consent" className="footer-link">Согласие на обработку персональных данных</Link>
              </div>
            </div>
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
