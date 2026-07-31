import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* HEADER */}
      <header>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px", color: "var(--cobalt-primary)", fontFamily: "var(--font-mono)" }}>
              eyeCARD
            </span>
            <span className="badge technical-data" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
              v19.4_RELEASE
            </span>
          </div>
          <nav style={{ display: "flex", gap: "24px", fontSize: "14px", fontFamily: "var(--font-mono)", fontWeight: "500" }}>
            <Link href="/methodology" style={{ color: "var(--text-primary)" }}>Методология</Link>
            <Link href="/terms" style={{ color: "var(--text-primary)" }}>Оферта</Link>
            <Link href="/privacy" style={{ color: "var(--text-primary)" }}>Конфиденциальность</Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <main style={{ flex: 1, padding: "60px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
          
          {/* Main Value Proposition */}
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h1 style={{ fontSize: "42px", fontWeight: "800", lineHeight: "1.2", color: "var(--cobalt-primary)", letterSpacing: "-0.5px" }}>
              Дешифровка визуального кода карточек товаров
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--text-muted)" }}>
              Автоматизированная AI-платформа нейромаркетингового и психографического аудита для Wildberries и Ozon. eyeCARD измеряет профиль вашего дизайна и сопоставляет его с ожиданиями целевой аудитории.
            </p>
            
            {/* Core Delivery Frame */}
            <div style={{ margin: "16px auto", padding: "16px 24px", border: "1px solid var(--cobalt-primary)", borderRadius: "8px", backgroundColor: "oklch(94% 0.02 250)", maxWidth: "600px" }}>
              <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--cobalt-primary)" }}>
                📢 Результат анализа формируется в виде комплексного Визуального Паспорта и мгновенно отправляется в ваш Telegram или ВКонтакте чат-бот.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "12px" }}>
              <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="badge" style={{ padding: "14px 28px", fontSize: "15px", fontWeight: "bold", backgroundColor: "var(--cobalt-primary)", color: "var(--bg-primary)", borderRadius: "8px" }}>
                Установить расширение
              </a>
              <a href="https://t.me/your_eyecard_bot" target="_blank" rel="noopener noreferrer" className="badge" style={{ padding: "14px 28px", fontSize: "15px", fontWeight: "bold", borderRadius: "8px" }}>
                Анализ в Telegram
              </a>
            </div>
          </div>

          {/* MAIN SCIENTIFIC METHODOLOGY PIPELINE */}
          <section style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "var(--cobalt-primary)" }}>
                Научный метод анализа eyeCARD
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "8px" }}>
                Три последовательных этапа автоматического сканирования и валидации коммерческой графики
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
              
              {/* STEP 1 */}
              <div className="card" style={{ padding: "32px" }}>
                <div className="badge technical-data" style={{ marginBottom: "16px", color: "var(--cobalt-primary)" }}>ЭТАП 1. ИЗМЕРЕНИЕ ПРОФИЛЯ МАРКЕТИНГОВОГО СООБЩЕНИЯ</div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
                  Деконструкция и маппинг визуально-текстового кода
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr md:1fr 1fr", gap: "24px", marginTop: "12px" }}>
                  <div style={{ borderRight: "1px solid var(--border-color)", paddingRight: "16px" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "8px", color: "var(--cobalt-primary)" }}>
                      1. Деконструкция кода (6 слоев изображения)
                    </h4>
                    <p style={{ fontSize: "13px", lineHeight: "1.5", color: "var(--text-muted)" }}>
                      Алгоритм раскладывает изображение карточки на 6 объективных графических слоев: хроматика (палитра), морфология (геометрия форм), типографика (шрифты), архитектоника (сетка и композиция), графика (плашки, пиктограммы) и сюжет (ракурсы, сюжетные триггеры).
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "8px", color: "var(--cobalt-primary)" }}>
                      2. Когнитивный маппинг в психографику
                    </h4>
                    <p style={{ fontSize: "13px", lineHeight: "1.5", color: "var(--text-muted)" }}>
                      Полученные физические параметры графики переводятся в научно обоснованные психологические показатели маркетингового сообщения: выстраивается позиционирование по <strong>4 семантическим осям (вектор смысла)</strong>, определяются ключевые <strong>архетипы</strong> по Юнгу и доминирующие <strong>психологические радикалы</strong> по методу Пономаренко.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="card" style={{ padding: "32px" }}>
                <div className="badge technical-data" style={{ marginBottom: "16px", color: "var(--cobalt-primary)" }}>ЭТАП 2. РАСЧЕТ ПРОФИЛЯ ИЦА</div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
                  Определение профиля Идеала Целевой Аудитории (ИЦА)
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)", maxWidth: "800px" }}>
                  Алгоритм анализирует входящие текстовые данные товара: его наименование, ценовой сегмент, подробные характеристики и ключевые потребительские свойства. На основе этих параметров рассчитывается идеальный психологический портрет потенциального покупателя, определяя, какие радикалы, архетипы и семантические векторы дизайна обязаны преобладать в карточке для максимальной конверсии.
                </p>
              </div>

              {/* STEP 3 */}
              <div className="card" style={{ padding: "32px" }}>
                <div className="badge technical-data" style={{ marginBottom: "16px", color: "var(--cobalt-primary)" }}>ЭТАП 3. СРАВНИТЕЛЬНЫЙ АНАЛИЗ (THE GAP)</div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
                  Зеркальная валидация и выявление разрывов
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)", maxWidth: "800px" }}>
                  Финальный этап сопоставляет измеренный профиль дизайна (Этап 1) с идеальным профилем ИЦА (Этап 2). Сервис вычисляет разрыв (GAP) между ожиданиями аудитории и реальностью текущей графики. Выявляется избыточный визуальный шум и нехватка триггеров. Интегральный показатель <strong>Индекса Когнитивного Комфорта (ICC)</strong> оценивает общую когнитивную нагрузку на мозг покупателя, после чего AI формулирует текстовый экспертный вердикт.
                </p>
              </div>

            </div>
          </section>

          {/* VISUAL PASSPORT PREVIEW (v19.4 SCHEMATICS) */}
          <section className="card" style={{ padding: "40px", backgroundColor: "var(--bg-primary)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="badge technical-data" style={{ alignSelf: "flex-start" }}>SAMPLE_VISUAL_PASSPORT</div>
                <h2 style={{ fontSize: "28px", fontWeight: "700", color: "var(--cobalt-primary)" }}>
                  Пример ИИ-вердикта и анализа векторов
                </h2>
                <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                  Ниже приведен фрагмент реального анализа семантического вектора смысла, отображаемый в Визуальном Паспорте. eyeCARD наглядно демонстрирует отклонения фактического дизайна от идеала.
                </p>
              </div>

              {/* Interactive Mock SVG/HTML Radar Chart */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
                
                {/* SVG Mock Radar */}
                <div style={{ border: "1px solid var(--border-color)", borderRadius: "8px", padding: "20px", backgroundColor: "var(--bg-secondary)", width: "320px", height: "320px", display: "flex", flexDirection: "column", justifySelf: "center", alignItems: "center", position: "relative" }}>
                  <div className="technical-data" style={{ fontSize: "11px", fontWeight: "bold", marginBottom: "10px" }}>VECTOR_RADAR: SEMANTIC_AXES</div>
                  
                  {/* Simplistic Pure CSS/SVG representation of a radar */}
                  <svg width="220" height="220" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="var(--border-color)" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="var(--border-color)" strokeWidth="0.5" />
                    
                    {/* Ideal area path (Muted blue) */}
                    <polygon points="50,15 75,50 50,80 20,50" fill="oklch(25% 0.15 250 / 15%)" stroke="var(--cobalt-primary)" strokeWidth="1" strokeDasharray="2,2" />
                    
                    {/* Actual design path (Solid Cobalt line) */}
                    <polygon points="50,30 65,50 50,60 40,50" fill="none" stroke="var(--cobalt-primary)" strokeWidth="2" />
                    
                    {/* Labels */}
                    <text x="50" y="6" textAnchor="middle" fontSize="4" fontFamily="var(--font-mono)">Рациональность</text>
                    <text x="94" y="52" textAnchor="start" fontSize="4" fontFamily="var(--font-mono)">Статика</text>
                    <text x="50" y="97" textAnchor="middle" fontSize="4" fontFamily="var(--font-mono)">Эмоциональность</text>
                    <text x="6" y="52" textAnchor="end" fontSize="4" fontFamily="var(--font-mono)">Динамика</text>
                  </svg>
                  <div style={{ display: "flex", gap: "12px", fontSize: "10px", fontFamily: "var(--font-mono)", marginTop: "12px" }}>
                    <span style={{ color: "var(--cobalt-primary)" }}>■ Факт Дизайна</span>
                    <span style={{ color: "var(--text-muted)" }}>-- Идеал ЦА</span>
                  </div>
                </div>

                {/* Mock AI Verdict text card */}
                <div className="card" style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                    <span className="technical-data" style={{ fontWeight: "bold", fontSize: "12px" }}>VERDICT_METRIC_ANALYSIS</span>
                    <span className="badge" style={{ fontSize: "10px", color: "var(--status-error)", borderColor: "var(--status-error)", backgroundColor: "oklch(55% 0.22 25 / 5%)" }}>ОТКЛОНЕНИЕ 42%</span>
                  </div>
                  <div className="technical-data" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                    <strong>Выдержка из ИИ-вердикта:</strong>
                    <p style={{ marginTop: "6px", color: "var(--text-primary)" }}>
                      «Фактическая графика карточки имеет избыточное смещение в сторону <i>Эмоциональности</i> за счет хаотичного использования пастельных оттенков. Однако, технические характеристики товара требуют доминирования вектора <i>Рациональности</i> для привлечения Прагматиков. Имеется критический дефицит структурированности (слой Архитектоники).»
                    </p>
                    <p style={{ marginTop: "10px", color: "var(--text-muted)" }}>
                      <strong>Рекомендация:</strong> Увеличить размер шрифта УТП на 20%, упорядочить плашки характеристик по вертикальной сетке, снизить насыщенность фонового шума.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* INSTALLATION GUIDE SECTION */}
          <section style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "var(--cobalt-primary)" }}>
                Быстрая установка расширения eyeCARD
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "8px" }}>
                3 простых шага для интеграции нейромаркетинга прямо в ваш браузер
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              
              {/* Card 1 */}
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "oklch(92% 0.02 250)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", color: "var(--cobalt-primary)", fontFamily: "var(--font-mono)" }}>
                  01
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "700" }}>Скачайте расширение</h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  Перейдите в Chrome Web Store по официальной кнопке установки и нажмите «Установить в Chrome». Процесс полностью безопасен.
                </p>
              </div>

              {/* Card 2 */}
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "oklch(92% 0.02 250)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", color: "var(--cobalt-primary)", fontFamily: "var(--font-mono)" }}>
                  02
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "700" }}>Закрепите на панели</h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  Кликните по иконке пазла «Расширения» в правом верхнем углу браузера и закрепите (pin) значок eyeCARD для быстрого доступа.
                </p>
              </div>

              {/* Card 3 */}
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "oklch(92% 0.02 250)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", color: "var(--cobalt-primary)", fontFamily: "var(--font-mono)" }}>
                  03
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "700" }}>Запустите аудит</h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  Откройте любую карточку товара на WB или Ozon. На панели расширения мгновенно появится плашка eyeCARD. Нажмите «Запустить анализ».
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* FOOTER WITH COMPLIANCE FOOTNOTE */}
      <footer>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Navigation & Legal Links */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontWeight: "800", color: "var(--cobalt-primary)", fontFamily: "var(--font-mono)" }}>eyeCARD</span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Автоматизированный нейромаркетинговый анализ.</span>
            </div>
            <div style={{ display: "flex", gap: "24px", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
              <Link href="/methodology" style={{ color: "var(--text-muted)" }}>Методология</Link>
              <Link href="/terms" style={{ color: "var(--text-muted)" }}>Договор оферты</Link>
              <Link href="/privacy" style={{ color: "var(--text-muted)" }}>Конфиденциальность</Link>
            </div>
          </div>

          {/* STRICT MANDATED FINANCIAL FOOTNOTE */}
          <div style={{ fontSize: "11px", lineHeight: "1.5", color: "var(--text-muted)", fontStyle: "italic" }}>
            * Стоимость проведения анализов указывается в интерфейсе браузерного расширения eyeCARD в условных единицах (Coins/Монеты) и приводится в российских рублях (RUB) при формировании счета на оплату внутри авторизованного мессенджер-бота (Telegram/ВКонтакте).
          </div>

          {/* Legal Copyright Line */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", flexWrap: "wrap", gap: "8px" }}>
            <span>© {new Date().getFullYear()} eyeCARD. Все права защищены.</span>
            <span>ИП / Организация: [Реквизиты организации]</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
