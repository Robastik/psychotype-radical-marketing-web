import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="page-wrapper">
      
      {/* HEADER */}
      <Header />

      {/* HERO SECTION: THE NEURAL DECK */}
      <main className="main-content">
        <section className="expert-terminal hero-section">
          <div className="container hero-grid">
            
            {/* Value Proposition */}
            <div className="hero-content">
              <h1 className="hero-title">
                Дешифровка <br /> <span className="accent-text">визуального кода</span> <br /> карточек товаров
              </h1>
              
              <div className="hero-description">
                <p className="hero-text">
                  Автоматизированная AI-платформа нейромаркетингового и психографического аудита. eyeCARD измеряет профиль вашего дизайна и сопоставляет его с ожиданиями целевой аудитории.
                </p>
                <div className="technical-data platforms-badge">
                  ОЗОН <br />
                  ВАЙЛДБЕРРИЗ
                </div>
                <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Установить расширение
                </a>
              </div>
            </div>

            {/* Neural Deconstruction Illustration */}
            <div className="hero-image-wrapper">
              <div className="image-frame">
                <Image src="/hero.png" alt="eyeCARD Neural Deconstruction" width={420} height={420} priority className="hero-image" />
              </div>
            </div>

          </div>
        </section>

        <div className="container methodology-section">

          {/* MAIN SCIENTIFIC METHODOLOGY PIPELINE */}
          <section className="methodology-pipeline">
            <div className="section-header">
              <h2 className="section-title">
                Научный метод
              </h2>
              <p className="section-subtitle">
                Анализ психологии покупателя и выявление отклонений в дизайне карточек
              </p>
            </div>

            <div className="steps-grid">
              
              {/* STEP 1: INSTRUMENTAL MODULE */}
              <div className="card step-card">
                <div className="card-header">
                  <span className="technical-data">[01]: ФАКТ</span>
                </div>
                <div className="card-body step-grid">
                  <div>
                    <h3 className="step-title">
                      Расшифровка визуального кода
                    </h3>
                    <p className="step-description">
                      Алгоритм раскладывает изображение товара на 6 базовых слоев: цвета, формы, шрифты, композицию, графику и сюжет (например, лица людей). ИИ анализирует каждый элемент и переводит его на язык психологии эмоций.
                    </p>
                  </div>
                  <div className="step-image-container">
                    <div className="step-image" style={{ backgroundImage: "url('/Phase1.jpg')" }}></div>
                  </div>
                </div>
              </div>

              {/* STEP 2: INSTRUMENTAL MODULE */}
              <div className="card step-card">
                <div className="card-header">
                  <span className="technical-data">[02]: ИДЕАЛ</span>
                </div>
                <div className="card-body step-grid">
                  <div>
                    <h3 className="step-title">
                      Профиль идеальной целевой аудитории
                    </h3>
                    <p className="step-description">
                      ИИ изучает категорию товара, его цену и описание, а затем воссоздает «ожидания» мозга покупателя. Мы рассчитываем идеальный визуальный ритм, который подсознательно привлечет именно вашего клиента.
                    </p>
                  </div>
                  <div className="step-image-container">
                    <div className="step-image" style={{ backgroundImage: "url('/Phase2-1.jpg')" }}></div>
                  </div>
                </div>
              </div>

              {/* STEP 3: INSTRUMENTAL MODULE */}
              <div className="card step-card">
                <div className="card-header">
                  <span className="technical-data">[03]: СРАВНЕНИЕ</span>
                </div>
                <div className="card-body">
                  <h3 className="step-title">
                    Анализ соответствия
                  </h3>
                  <p className="step-description step-description-wide">
                    Финальное сопоставление &quot;Факта&quot; и &quot;Идеала&quot; для выявления и оценки расхождений. Интегральный показатель <strong>ICC (Индекс Когнитивного Комфорта)</strong> выявляет зоны визуального шума. Получаем четкий вектор для доработки CTR.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* VISUAL PASSPORT PREVIEW (v19.4 SCHEMATICS) */}
          <section className="expert-terminal visual-passport-section">
            <div className="visual-passport-grid">
              
              <div className="visual-passport-content">
                <h2 className="visual-passport-title">
                  Визуальный Паспорт
                </h2>
                <p className="visual-passport-description">
                  eyeCARD визуализирует сложные данные через систему инструментальных графиков: от семантических осей смысла до детального разбора психотипов и радикалов. Вы получаете не просто вердикт «красиво/некрасиво», а точную геометрию маркетингового сообщения с развернутыми формулировками профиля идеальной целевой аудитории.
                </p>
              </div>

              {/* Exact Replica of Archetype Radar from Preliminary Design with MOCK_DATA */}
              <div className="radar-chart-wrapper">
                <div style={{ position: "relative", width: "100%", maxWidth: "400px", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="100%" height="100%" viewBox="0 0 360 360" style={{ overflow: "visible", maxWidth: "100%", height: "auto" }}>
                    <defs>
                      <linearGradient id="vp-arch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="oklch(64.13% 0.17 48.74)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="oklch(64.13% 0.17 48.74)" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    {/* Quadrant Background Shading - Rotated 45 degrees */}
                    {/* Individualism: -45 to 45 (Top) */}
                    <path d="M180,180 L109.3,109.3 A100,100 0 0,1 250.7,109.3 Z" fill="oklch(85% 0.08 90)" opacity="0.12" />
                    {/* Stability: 45 to 135 (Right) */}
                    <path d="M180,180 L250.7,109.3 A100,100 0 0,1 250.7,250.7 Z" fill="oklch(45% 0.06 252)" opacity="0.12" />
                    {/* Change: 135 to 225 (Bottom) */}
                    <path d="M180,180 L250.7,250.7 A100,100 0 0,1 109.3,250.7 Z" fill="oklch(60% 0.15 30)" opacity="0.12" />
                    {/* Belonging: 225 to 315 (Left) */}
                    <path d="M180,180 L109.3,250.7 A100,100 0 0,1 109.3,109.3 Z" fill="oklch(75% 0.15 65)" opacity="0.12" />

                    {/* Quadrant Labels - Re-positioned closer to edge */}
                    <text x="180" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.6" style={{ fill: "oklch(85% 0.08 90)" }}>ИНДИВИДУАЛИЗМ</text>
                    <text x="290" y="180" textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.6" transform="rotate(90, 290, 180)" style={{ fill: "oklch(45% 0.06 252)" }}>СТАБИЛЬНОСТЬ</text>
                    <text x="180" y="290" textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.6" style={{ fill: "oklch(60% 0.15 30)" }}>ИЗМЕНЕНИЯ</text>
                    <text x="70" y="180" textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.6" transform="rotate(270, 70, 180)" style={{ fill: "oklch(75% 0.15 65)" }}>ПРИНАДЛЕЖНОСТЬ</text>

                    {/* Grid Lines - Enhanced Contrast */}
                    <circle cx="180" cy="180" r="100" fill="none" stroke="oklch(55% 0.1 252)" strokeOpacity="0.4" strokeWidth="1" />
                    <circle cx="180" cy="180" r="75" fill="none" stroke="oklch(55% 0.1 252)" strokeOpacity="0.2" strokeWidth="1" />
                    <circle cx="180" cy="180" r="50" fill="none" stroke="oklch(55% 0.1 252)" strokeOpacity="0.2" strokeWidth="1" />
                    <circle cx="180" cy="180" r="25" fill="none" stroke="oklch(55% 0.1 252)" strokeOpacity="0.2" strokeWidth="1" />
                    
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => {
                      const angle = (a - 90) * (Math.PI / 180);
                      return (
                        <line 
                          key={a}
                          x1="180" y1="180" 
                          x2={180 + 100 * Math.cos(angle)} 
                          y2={180 + 100 * Math.sin(angle)} 
                          stroke="oklch(55% 0.1 252)" strokeOpacity="0.3" strokeWidth="1"
                        />
                      );
                    })}

                    {/* Ideal Area (Dashed lines between calculated points from MOCK_DATA) */}
                    {/* Sage(0) -> Caregiver(100) */}
                    <line x1="180" y1="180" x2="280" y2="180" stroke="oklch(60% 0.15 252)" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4,2" />
                    {/* Caregiver(100) -> Ruler(0) */}
                    <line x1="280" y1="180" x2="180" y2="180" stroke="oklch(60% 0.15 252)" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4,2" />
                    {/* Creator(0) -> Hero(45) */}
                    <line x1="180" y1="180" x2="180" y2="225" stroke="oklch(60% 0.15 252)" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4,2" />
                    {/* Hero(45) -> Outlaw(0) */}
                    <line x1="180" y1="225" x2="180" y2="180" stroke="oklch(60% 0.15 252)" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4,2" />
                    {/* Outlaw(0) -> Magician(45) */}
                    <line x1="180" y1="180" x2="141" y2="202.5" stroke="oklch(60% 0.15 252)" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4,2" />
                    {/* Magician(45) -> Everyman(0) */}
                    <line x1="141" y1="202.5" x2="180" y2="180" stroke="oklch(60% 0.15 252)" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4,2" />

                    {/* Actual Area (Solid Polygon from MOCK_DATA) */}
                    <polygon 
                      points="180,107 182,175 193,172 252,180 206,195 190,197 180,280 175,188 141,202 116,180 175,177 152,132" 
                      fill="url(#vp-arch-grad)" stroke="oklch(64.13% 0.17 48.74)" strokeWidth="1.5" 
                    />
                    
                    {/* Archetype Labels - Luminous Cobalt for Contrast */}
                    <text x="180" y="55" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ПРОСТОДУШНЫЙ</text>
                    <text x="255" y="65" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ИСКАТЕЛЬ</text>
                    <text x="300" y="115" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">МУДРЕЦ</text>
                    <text x="335" y="180" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ЗАБОТЛИВЫЙ</text>
                    <text x="300" y="245" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ПРАВИТЕЛЬ</text>
                    <text x="250" y="290" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ТВОРЕЦ</text>
                    <text x="180" y="305" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ГЕРОЙ</text>
                    <text x="110" y="290" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">БУНТАРЬ</text>
                    <text x="60" y="245" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">МАГ</text>
                    
                    {/* СЛАВНЫЙ МАЛЫЙ in two lines */}
                    <text x="30" y="175" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">СЛАВНЫЙ</text>
                    <text x="30" y="185" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">МАЛЫЙ</text>
                    
                    <text x="60" y="115" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ЭСТЕТ</text>
                    <text x="110" y="70" textAnchor="middle" dominantBaseline="middle" fill="oklch(85% 0.05 252)" fontSize="9" fontWeight="800">ШУТ</text>
                  </svg>
                  
                  {/* Legend Overlay */}
                  <div style={{ position: "absolute", bottom: "-30px", display: "flex", gap: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "oklch(64.13% 0.17 48.74)" }} />
                      <span className="technical-data" style={{ fontSize: "11px", fontWeight: "700", color: "oklch(85% 0.05 252)" }}>ФАКТ</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1px dashed oklch(60% 0.15 252)", backgroundColor: "rgba(28, 62, 97, 0.1)" }} />
                      <span className="technical-data" style={{ fontSize: "11px", fontWeight: "700", color: "oklch(85% 0.05 252)" }}>ИДЕАЛ</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* WORKFLOW & INSTALLATION SECTION */}
          <section className="workflow-section">
            
            {/* Part 1: How it Works */}
            <div className="workflow-grid">
              <div className="workflow-content">
                <h2 className="workflow-title">
                  Как работает eyeCARD
                </h2>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <div className="step-number">1</div>
                    <p className="step-text">
                      Открыть карточку товара на <strong>Wildberries или Ozon</strong> в браузере Chrome.
                    </p>
                  </div>
                  <div className="workflow-step">
                    <div className="step-number">2</div>
                    <p className="step-text">
                      Запустить анализ через <strong>боковую панель расширения</strong>.
                    </p>
                  </div>
                  <div className="workflow-step">
                    <div className="step-number">3</div>
                    <p className="step-text">
                      Готовый <strong>Визуальный Паспорт</strong> с аналитикой приходит в выбранный мессенджер Telegram/ВКонтакте.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Workflow Illustration */}
              <div className="workflow-image-wrapper">
                <Image src="/extension-ui.png" alt="eyeCARD Extension Interface" fill className="workflow-image" />
                <div className="workflow-image-overlay" />
              </div>
            </div>

            {/* Part 2: Chrome Extension Installation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "700", textAlign: "center" }}>Установка расширения Chrome</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                
                {/* Step 01 Card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", paddingBottom: "0" }}>
                  <div className="technical-data" style={{ fontSize: "48px", fontWeight: "800", color: "rgba(52, 92, 252, 0.05)", position: "absolute", top: "10px", right: "20px" }}>01</div>
                  <div style={{ padding: "0 24px 0 0" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "4px", border: "2px solid var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </div>
                    <h4 style={{ fontSize: "18px", fontWeight: "700" }}>Скачайте расширение</h4>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6", minHeight: "68px" }}>
                      Официальный Chrome Web Store. Установка в один клик. Система автоматически интегрируется в интерфейс WB и Ozon.
                    </p>
                  </div>
                  <div style={{ marginTop: "auto", height: "180px", backgroundColor: "var(--surface-low)", borderTop: "1px solid var(--border-color)", margin: "0 -24px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "20px" }}>
                    <Image src="/chrome-store.png" alt="Google Chrome Web Store" fill style={{ objectFit: "contain" }} />
                  </div>
                </div>

                {/* Step 02 Card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", paddingBottom: "0" }}>
                  <div className="technical-data" style={{ fontSize: "48px", fontWeight: "800", color: "rgba(52, 92, 252, 0.05)", position: "absolute", top: "10px", right: "20px" }}>02</div>
                  <div style={{ padding: "0 24px 0 0" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "4px", border: "2px solid var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    </div>
                    <h4 style={{ fontSize: "18px", fontWeight: "700" }}>Закрепите на панели</h4>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6", minHeight: "68px" }}>
                      Для мгновенного доступа закрепите иконку eyeCARD в меню расширений. Панель управления анализом всегда будет под рукой.
                    </p>
                  </div>
                  <div style={{ marginTop: "auto", height: "180px", backgroundColor: "#fff", borderTop: "1px solid var(--border-color)", margin: "0 -24px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                    <Image src="/pin-instruction.png" alt="How to pin extension" fill style={{ objectFit: "contain" }} />
                  </div>
                </div>

              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "16px 48px" }}>
                  Установить расширение
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER WITH COMPLIANCE FOOTNOTE */}
      <footer style={{ backgroundColor: "var(--surface-low)", borderTop: "1px solid var(--border-color)", padding: "48px 0" }}>
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
  );
}
