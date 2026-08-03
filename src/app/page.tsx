import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* HEADER */}
      <header style={{ padding: "12px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/logo.png" alt="eyeCARD Logo" style={{ height: "32px", width: "auto", display: "block" }} />
            <span className="technical-data" style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px", color: "var(--primary)" }}>
              eyeCARD
            </span>
            <span className="badge technical-data" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
              v19.4_RELEASE
            </span>
          </div>
          <nav className="technical-data" style={{ display: "flex", gap: "24px", fontSize: "13px", fontWeight: "500" }}>
            <Link href="/methodology" style={{ color: "var(--text-primary)" }}>Методология</Link>
            <Link href="/terms" style={{ color: "var(--text-primary)" }}>Оферта</Link>
            <Link href="/privacy" style={{ color: "var(--text-primary)" }}>Конфиденциальность</Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION: THE NEURAL DECK */}
      <main style={{ flex: 1 }}>
        <section className="expert-terminal" style={{ margin: "24px", padding: "80px 0", overflow: "hidden" }}>
          <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            
            {/* Value Proposition */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <h1 style={{ fontSize: "52px", fontWeight: "800", lineHeight: "1.1", color: "#fff", letterSpacing: "-1px" }}>
                Дешифровка <br /> <span style={{ color: "var(--accent)" }}>визуального кода</span> <br /> карточек товаров
              </h1>
              <p style={{ fontSize: "19px", lineHeight: "1.6", color: "rgba(255,255,255,0.7)", maxWidth: "520px" }}>
                Автоматизированная AI-платформа нейромаркетингового и психографического аудита. eyeCARD измеряет профиль вашего дизайна и сопоставляет его с ожиданиями целевой аудитории.
              </p>
              
              <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
                <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "16px 32px" }}>
                  Установить расширение
                </a>
              </div>
            </div>

            {/* Neural Deconstruction Illustration */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", padding: "8px", backgroundColor: "rgba(255,255,255,0.02)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
                <img src="/hero.png" alt="eyeCARD Neural Deconstruction" style={{ maxWidth: "100%", maxHeight: "420px", borderRadius: "6px", display: "block" }} />
              </div>
            </div>

          </div>
        </section>

        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "80px", padding: "80px 0" }}>

          {/* MAIN SCIENTIFIC METHODOLOGY PIPELINE */}
          <section style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "36px", fontWeight: "700", color: "var(--primary)", letterSpacing: "-0.5px" }}>
                Научный метод
              </h2>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.6" }}>
                Анализ психологии покупателя и выявление отклонений в дизайне карточек
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
              
              {/* STEP 1: INSTRUMENTAL MODULE */}
              <div className="card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--surface-low)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="technical-data" style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)" }}>[01]: ФАКТ</span>
                </div>
                <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
                      Расшифровка визуального кода
                    </h3>
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                      Алгоритм раскладывает изображение товара на 6 базовых слоев: цвета, формы, шрифты, композицию, графику и сюжет (например, лица людей). ИИ анализирует каждый элемент и переводит его на язык психологии эмоций.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ height: "300px", borderRadius: "6px", backgroundImage: "url('/Phase1.jpg')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid var(--border-color)", position: "relative" }}>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: INSTRUMENTAL MODULE */}
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--surface-low)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="technical-data" style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)" }}>[02]: ИДЕАЛ</span>
                </div>
                <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>
                      Профиль идеальной целевой аудитории
                    </h3>
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                      ИИ изучает категорию товара, его цену и описание, а затем воссоздает «ожидания» мозга покупателя. Мы рассчитываем идеальный визуальный ритм, который подсознательно привлечет именно вашего клиента.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ height: "300px", borderRadius: "6px", backgroundImage: "url('/Phase2-1.jpg')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid var(--border-color)", position: "relative" }}>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: INSTRUMENTAL MODULE */}
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--surface-low)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="technical-data" style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent)" }}>[03]: СРАВНЕНИЕ</span>
                </div>
                <div style={{ padding: "32px" }}>
                  <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>
                    Анализ соответствия
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text-muted)", maxWidth: "850px" }}>
                    Финальное сопоставление "Факта" и "Идеала" для выявления и оценки расхождений. Интегральный показатель <strong>ICC (Индекс Когнитивного Комфорта)</strong> выявляет зоны визуального шума. Получаем четкий вектор для доработки CTR.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* VISUAL PASSPORT PREVIEW (v19.4 SCHEMATICS) */}
          <section className="expert-terminal" style={{ padding: "60px", position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#fff" }}>
                  Визуальный Паспорт
                </h2>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "rgba(255,255,255,0.6)" }}>
                  eyeCARD визуализирует сложные данные через систему инструментальных графиков: от семантических осей смысла до детального разбора психотипов и радикалов. Вы получаете не просто вердикт «красиво/некрасиво», а точную геометрию маркетингового сообщения с развернутыми формулировками профиля идеальной целевой аудитории.
                </p>
              </div>

              {/* Exact Replica of Archetype Radar from Preliminary Design with MOCK_DATA */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ position: "relative", width: "400px", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="400" height="400" viewBox="0 0 360 360" style={{ overflow: "visible" }}>
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

          {/* INSTALLATION GUIDE SECTION */}
          <section style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ textAlign: "center" }}>
              <div className="badge technical-data" style={{ color: "var(--primary)", marginBottom: "16px" }}>DEPLOYMENT_GUIDE_V1</div>
              <h2 style={{ fontSize: "32px", fontWeight: "700", color: "var(--primary)" }}>
                Быстрая установка eyeCARD
              </h2>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", marginTop: "12px" }}>
                Три шага до запуска нейромаркетингового аудита в вашем браузере.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              
              {/* Card 1 */}
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
                <div className="technical-data" style={{ fontSize: "48px", fontWeight: "800", color: "rgba(52, 92, 252, 0.05)", position: "absolute", top: "10px", right: "20px" }}>01</div>
                <div style={{ width: "40px", height: "40px", borderRadius: "4px", border: "2px solid var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700" }}>Скачайте расширение</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  Официальный Chrome Web Store. Установка в один клик. Система автоматически интегрируется в интерфейс WB и Ozon.
                </p>
              </div>

              {/* Card 2 */}
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
                <div className="technical-data" style={{ fontSize: "48px", fontWeight: "800", color: "rgba(52, 92, 252, 0.05)", position: "absolute", top: "10px", right: "20px" }}>02</div>
                <div style={{ width: "40px", height: "40px", borderRadius: "4px", border: "2px solid var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700" }}>Закрепите на панели</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  Для мгновенного доступа закрепите иконку eyeCARD в меню расширений. Панель управления анализом всегда будет под рукой.
                </p>
              </div>

              {/* Card 3 */}
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
                <div className="technical-data" style={{ fontSize: "48px", fontWeight: "800", color: "rgba(52, 92, 252, 0.05)", position: "absolute", top: "10px", right: "20px" }}>03</div>
                <div style={{ width: "40px", height: "40px", borderRadius: "4px", border: "2px solid var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700" }}>Запустите аудит</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  Нажмите кнопку «Анализировать» прямо на странице товара. ИИ мгновенно сформирует отчет и отправит его в Telegram.
                </p>
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
              <span className="technical-data">© {new Date().getFullYear()} eyeCARD. NEURAL_DECK_V19.4</span>
              <span className="technical-data">[SYSTEM_STATUS]: OPERATIONAL</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
