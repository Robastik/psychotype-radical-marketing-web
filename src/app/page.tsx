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
                <a href="https://t.me/your_eyecard_bot" target="_blank" rel="noopener noreferrer" className="btn-accent" style={{ padding: "16px 32px", backgroundColor: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>
                  Анализ в Telegram
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
              <div className="badge technical-data" style={{ color: "var(--primary)", marginBottom: "16px" }}>PIPELINE_ARCHITECTURE_V3</div>
              <h2 style={{ fontSize: "36px", fontWeight: "700", color: "var(--primary)", letterSpacing: "-0.5px" }}>
                Научный метод анализа eyeCARD
              </h2>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.6" }}>
                Как ИИ анализирует психологию покупателя и находит ошибки в дизайне карточек.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
              
              {/* STEP 1: INSTRUMENTAL MODULE */}
              <div className="card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--surface-low)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="technical-data" style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)" }}>[01]: ФАКТ</span>
                  <span className="technical-data" style={{ fontSize: "10px", color: "var(--text-muted)" }}>STATUS: OK</span>
                </div>
                <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
                      Как ИИ видит ваш дизайн <br /> (Деконструкция кода)
                    </h3>
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                      Наш алгоритм раскладывает изображение товара на 6 базовых элементов: цвета, формы, шрифты, композицию, графику и сюжет (например, лица людей). ИИ анализирует каждый элемент и переводит его на язык психологии эмоций.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ height: "140px", borderRadius: "6px", backgroundImage: "url('/visual-analytics.png')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid var(--border-color)", position: "relative" }}>
                      <div className="technical-data" style={{ position: "absolute", bottom: "8px", left: "12px", fontSize: "10px", backgroundColor: "rgba(0,0,0,0.7)", color: "#fff", padding: "2px 8px", borderRadius: "3px" }}>
                        SYS_VISUAL_LAYER_DECONSTRUCTION
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div style={{ padding: "12px", backgroundColor: "var(--surface-low)", borderRadius: "4px", border: "1px dashed var(--border-color)" }}>
                        <h4 className="technical-data" style={{ fontSize: "10px", color: "var(--primary)", marginBottom: "6px" }}>COGNITIVE_MAPPING</h4>
                        <div style={{ height: "4px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "2px" }}>
                          <div style={{ height: "100%", width: "85%", backgroundColor: "var(--primary)", borderRadius: "2px" }} />
                        </div>
                      </div>
                      <div style={{ padding: "12px", backgroundColor: "var(--surface-low)", borderRadius: "4px", border: "1px dashed var(--border-color)" }}>
                        <h4 className="technical-data" style={{ fontSize: "10px", color: "var(--primary)", marginBottom: "6px" }}>RADICAL_DETECTION</h4>
                        <div style={{ height: "4px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "2px" }}>
                          <div style={{ height: "100%", width: "60%", backgroundColor: "var(--primary)", borderRadius: "2px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: INSTRUMENTAL MODULE */}
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--surface-low)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="technical-data" style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)" }}>[02]: ИДЕАЛ</span>
                  <span className="technical-data" style={{ fontSize: "10px", color: "var(--text-muted)" }}>MODE: PREDICTIVE</span>
                </div>
                <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>
                      Профиль идеальной целевой аудитории
                    </h3>
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                      ИИ изучает категорию товара, его цену и описание, а затем воссоздает «ожидания» мозга покупателя. Мы рассчитываем идеальный визуальный ритм, который подсознательно привлечет именно вашего клиента.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ height: "140px", borderRadius: "6px", backgroundImage: "url('/behavioral-analytics.png')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid var(--border-color)", position: "relative" }}>
                      <div className="technical-data" style={{ position: "absolute", bottom: "8px", left: "12px", fontSize: "10px", backgroundColor: "rgba(0,0,0,0.7)", color: "#fff", padding: "2px 8px", borderRadius: "3px" }}>
                        SYS_BEHAVIORAL_AUDIENCE_MODEL
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div style={{ padding: "12px", backgroundColor: "var(--surface-low)", borderRadius: "4px", border: "1px dashed var(--border-color)" }}>
                        <h4 className="technical-data" style={{ fontSize: "10px", color: "var(--primary)", marginBottom: "6px" }}>ICA_EXPECTATIONS</h4>
                        <div style={{ height: "4px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "2px" }}>
                          <div style={{ height: "100%", width: "75%", backgroundColor: "var(--primary)", borderRadius: "2px" }} />
                        </div>
                      </div>
                      <div style={{ padding: "12px", backgroundColor: "var(--surface-low)", borderRadius: "4px", border: "1px dashed var(--border-color)" }}>
                        <h4 className="technical-data" style={{ fontSize: "10px", color: "var(--primary)", marginBottom: "6px" }}>SEMANTIC_ALIGNMENT</h4>
                        <div style={{ height: "4px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "2px" }}>
                          <div style={{ height: "100%", width: "90%", backgroundColor: "var(--primary)", borderRadius: "2px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: INSTRUMENTAL MODULE */}
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--surface-low)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="technical-data" style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent)" }}>[03]: СРАВНЕНИЕ</span>
                  <span className="technical-data" style={{ fontSize: "10px", color: "var(--accent)" }}>CRITICAL_PHASE</span>
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
                <div className="badge technical-data" style={{ alignSelf: "flex-start", color: "var(--accent)", borderColor: "var(--accent)" }}>MODULE: VISUAL_PASSPORT_HUD</div>
                <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#fff" }}>
                  Интерфейс Визуального Паспорта
                </h2>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "rgba(255,255,255,0.6)" }}>
                  eyeCARD визуализирует сложные данные через систему инструментальных графиков. Вы видите не просто «красиво/некрасиво», а точную геометрию вашего маркетингового сообщения.
                </p>
                
                <div className="card" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span className="technical-data" style={{ fontSize: "12px", color: "var(--accent)" }}>VERDICT_SUMMARY</span>
                    <span className="technical-data" style={{ fontSize: "12px", color: "#fff" }}>ICC: 68% [MODERATE]</span>
                  </div>
                  <p className="technical-data" style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                    «Фактическая графика имеет избыточное смещение в Эмоциональность. Рекомендуется упорядочить плашки по вертикальной сетке (Архитектоника).»
                  </p>
                </div>
              </div>

              {/* Advanced Radar Chart Simulation */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                <div style={{ position: "relative", width: "360px", height: "360px", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div className="technical-data" style={{ position: "absolute", top: "10px", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>RADAR_SCOPE_04_AXES</div>
                  
                  <svg width="280" height="280" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
                    {/* Grid Lines */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    
                    {/* IDEAL AREA (Hollow Dashed) */}
                    <polygon points="50,10 85,50 50,85 15,50" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                    
                    {/* ACTUAL AREA (Solid Cobalt) */}
                    <polygon points="50,25 70,50 50,65 35,50" fill="rgba(52, 92, 252, 0.2)" stroke="var(--primary)" strokeWidth="2" />
                    
                    {/* AXIS LABELS (Expert Style) */}
                    <text x="50" y="5" textAnchor="middle" fill="#fff" fontSize="3.5" className="technical-data">РАЦИОНАЛЬНОСТЬ</text>
                    <text x="94" y="52" textAnchor="start" fill="#fff" fontSize="3.5" className="technical-data">СТАТИКА</text>
                    <text x="50" y="98" textAnchor="middle" fill="#fff" fontSize="3.5" className="technical-data">ЭМОЦИОНАЛЬНОСТЬ</text>
                    <text x="6" y="52" textAnchor="end" fill="#fff" fontSize="3.5" className="technical-data">ДИНАМИКА</text>
                  </svg>
                  
                  {/* Legend Overlay */}
                  <div style={{ position: "absolute", bottom: "20px", display: "flex", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "8px", height: "8px", backgroundColor: "var(--primary)" }} />
                      <span className="technical-data" style={{ fontSize: "9px", color: "#fff" }}>ACTUAL_FACT</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "8px", height: "8px", border: "1px dashed var(--primary)" }} />
                      <span className="technical-data" style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)" }}>TARGET_IDEAL</span>
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
