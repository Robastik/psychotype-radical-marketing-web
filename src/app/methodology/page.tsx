import React from "react";
import Link from "next/link";

export default function MethodologyHub() {
  return (
    <div style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Navigation & Status Header */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "14px", fontFamily: "var(--font-mono)", color: "var(--cobalt-primary)", fontWeight: "bold" }}>
            ← eyeCARD
          </Link>
          <span className="badge technical-data" style={{ color: "var(--cobalt-primary)" }}>
            METHODOLOGY_INDEX: v19.4
          </span>
        </div>

        {/* Global Page Container */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {/* Main Title Block */}
          <div className="card" style={{ padding: "40px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px", color: "var(--cobalt-primary)" }}>
              Научно-методологическая база eyeCARD
            </h1>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              Платформа eyeCARD представляет собой экспертную систему нейромаркетингового и психографического аудита. Алгоритм осуществляет деконструкцию визуального кода коммерческой графики (карточек товаров) и сопоставляет его с паттернами восприятия целевой аудитории. В основе анализа лежит строгая иерархическая структура из трех фундаментальных слоев и одного интегрального показателя комфорта.
            </p>
          </div>

          {/* SECTION 1: Semantic Axes */}
          <div className="card" style={{ padding: "32px" }}>
            <div className="badge" style={{ marginBottom: "16px", fontFamily: "var(--font-mono)" }}>LEVEL 1. ВЕКТОР СМЫСЛА (СЕМАНТИЧЕСКИЕ ОСИ)</div>
            <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px" }}>1. Четыре семантические оси позиционирования</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "16px" }}>
              Семантические оси определяют вектор движения внимания и ключевые смысловые координаты карточки товара. Алгоритм оценивает графические элементы по 4 дихотомическим шкалам: Рациональность/Эмоциональность, Статика/Динамика, Простота/Сложность и Индивидуализм/Социальность. Это позволяет понять, какое базовое сообщение транслирует дизайн на подсознательном уровне.
            </p>
            <div style={{ padding: "12px 16px", borderLeft: "3px solid var(--cobalt-primary)", backgroundColor: "var(--bg-secondary)", fontSize: "13px", fontStyle: "italic", lineHeight: "1.5" }}>
              * Научные основы примененного семантического подхода изложены в классической академической литературе по психологии восприятия, семиотике и теории систем. Более детально прикладные нейромаркетинговые кейсы и краткое изложение теории векторов смысла представлены в профильных статьях в нашем научном блоге внизу этой страницы.
            </div>
          </div>

          {/* SECTION 2: Archetypes */}
          <div className="card" style={{ padding: "32px" }}>
            <div className="badge" style={{ marginBottom: "16px", fontFamily: "var(--font-mono)" }}>LEVEL 2. АРХЕТИПЫ (ЮНГ / ПИРСОН)</div>
            <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px" }}>2. Глубинное позиционирование через архетипы</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "16px" }}>
              Второй слой анализа дешифрует эстетические маркеры через призму 12 классических архетипов. Каждый визуальный стиль (выбор шрифта, композиционные приемы, геометрия) соотносится с глубинными паттернами коллективного бессознательного (например, Правитель, Бунтарь, Эстет). Алгоритм определяет, насколько гармонично дизайн карточки транслирует выбранный архетипический образ.
            </p>
            <div style={{ padding: "12px 16px", borderLeft: "3px solid var(--cobalt-primary)", backgroundColor: "var(--bg-secondary)", fontSize: "13px", fontStyle: "italic", lineHeight: "1.5" }}>
              * Научные основы теории архетипов восходят к трудам К. Г. Юнга и К. Пирсон. Полное теоретическое обоснование следует искать в специализированной литературе по глубинной психологии и брендингу, а ознакомиться с кратким изложением концепции и ее адаптацией под маркетплейсы можно в материалах нашего блога.
            </div>
          </div>

          {/* SECTION 3: Radicals */}
          <div className="card" style={{ padding: "32px" }}>
            <div className="badge" style={{ marginBottom: "16px", fontFamily: "var(--font-mono)" }}>LEVEL 3. ПСИХОТИПЫ (7 РАДИКАЛОВ ПОНОМАРЕНКО)</div>
            <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px" }}>3. Психотипирование ЦА и поведенческие триггеры</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "16px" }}>
              Третий и наиболее точный прикладной слой — оценка дизайна по системе 7 психологических радикалов (Паранойяльный, Истероидный, Эпилептоидный, Шизоидный, Гипертимный, Эмотивный, Тревожный). Сервис сканирует композицию на наличие специфических маркеров, привлекающих или отторгающих определенные психотипы покупателей (например, потребность в таблицах и порядке у Эпилептоида или стремление к ограниченным сериям у Истероида).
            </p>
            <div style={{ padding: "12px 16px", borderLeft: "3px solid var(--cobalt-primary)", backgroundColor: "var(--bg-secondary)", fontSize: "13px", fontStyle: "italic", lineHeight: "1.5" }}>
              * Научные основы методики 7 радикалов изложены в работах В. В. Пономаренко и классических трудах по характерологии. Исчерпывающие научные исследования доступны в академических библиотеках, а прикладные руководства по работе с каждым психотипом покупателя на Wildberries и Ozon опубликованы в статьях нашего методологического центра ниже.
            </div>
          </div>

          {/* SECTION 4: ICC Deep Exploration */}
          <div className="card" style={{ padding: "32px" }}>
            <div className="badge" style={{ marginBottom: "16px", fontFamily: "var(--font-mono)" }}>INTEGRAL METRIC. COGNITIVE COMFORT</div>
            <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "16px", color: "var(--cobalt-primary)" }}>
              4. Индекс Когнитивного Комфорта (ICC)
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "15px", lineHeight: "1.6" }}>
              <div>
                <strong>Теоретический базис: когнитивная нагрузка и лимиты внимания</strong>
                <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
                  Индекс Когнитивного Комфорта (Cognitive Comfort Index, ICC) базируется на фундаментальной теории когнитивной нагрузки (Дж. Свеллер) и законе Миллера (ограничение объема рабочей памяти величиной 7±2 элемента). На маркетплейсах селлеры часто перенасыщают дизайн плашками, градиентами и хаотичными текстами. Мозг покупателя, перегруженный избыточным визуальным шумом, мгновенно утомляется, испытывая когнитивное отторжение, что приводит к уходу с карточки и резкому падению CTR.
                </p>
              </div>

              <div>
                <strong>Технический подход к измерению плотности шума</strong>
                <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
                  eyeCARD сканирует геометрию карточки, оценивая плотность, контраст и взаимное расположение визуальных маркеров. Алгоритм математически сопоставляет количество распознанных элементов с эталонной емкостью человеческого восприятия. Измерение производится с помощью экспоненциального сглаживания (Soft Clamping V2.1), что позволяет получить точный, нелинейный индекс от 0 до 100%, отражающий реальный уровень когнитивного комфорта при чтении карточки.
                </p>
              </div>

              <div>
                <strong>Синергия ICC с радикалами и архетипами</strong>
                <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
                  ICC является вторичным, интегрирующим показателем. Его нормы динамически адаптируются под ведущий радикал аудитории. Например, Эпилептоидный психотип требует идеального порядка и пустоты (низкий визуальный шум, экстремально высокий ICC). В то же время, Истероидный психотип лоялен к обилию ярких акцентов (более высокая плотность маркеров), однако даже для него критический перенасыщенный дизайн разрушает Вектор Смысла и ломает целостность Архетипа, уводя фокус внимания с преимуществ товара.
                </p>
              </div>
            </div>
          </div>

          {/* ACADEMIC BLOG / SEO ARTICLES */}
          <div style={{ marginTop: "16px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", color: "var(--cobalt-primary)", fontFamily: "var(--font-mono)" }}>
              НАУЧНЫЕ ПУБЛИКАЦИИ И КЕЙСЫ
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div className="card" style={{ padding: "24px" }}>
                <span className="badge technical-data" style={{ marginBottom: "8px" }}>PSYCHOGRAPHICS</span>
                <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                  <Link href="/methodology/psychotyp-wb-epileptoid" style={{ color: "var(--cobalt-primary)" }}>
                    Психотипирование ЦА на Wildberries: как продавать Эпилептоидам и снижать визуальный шум
                  </Link>
                </h4>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  Разбор эпилептоидного радикала по методу Пономаренко. Какие графические маркеры и таблицы вызывают доверие у этого типа покупателей, а какой дизайн заставит их покинуть карточку.
                </p>
              </div>

              <div className="card" style={{ padding: "24px" }}>
                <span className="badge technical-data" style={{ marginBottom: "8px" }}>NEUROMARKETING</span>
                <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                  <Link href="/methodology/archetypes-jung-ozon" style={{ color: "var(--cobalt-primary)" }}>
                    Архетипы Юнга в товарном дизайне: кейсы оптимизации CTR на Ozon
                  </Link>
                </h4>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  Исследование влияния глубинных архетипов бренда на подсознательный выбор потребителя. Практические примеры перевода эстетики карточки в архетипы «Заботливый» и «Искатель».
                </p>
              </div>

              <div className="card" style={{ padding: "24px" }}>
                <span className="badge technical-data" style={{ marginBottom: "8px" }}>COGNITIVE_LOAD</span>
                <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                  <Link href="/methodology/cognitive-comfort-conversions" style={{ color: "var(--cobalt-primary)" }}>
                    Влияние когнитивной нагрузки на удержание внимания: математика индекса ICC
                  </Link>
                </h4>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  Как перегрузка визуальными элементами снижает эффективность рекламы. Разбор метрики Cognitive Comfort Index как надежного предсказателя кликабельности (CTR) карточки.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Page Footer */}
        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} eyeCARD. Все материалы защищены в соответствии с Публичной офертой.
        </div>
      </div>
    </div>
  );
}
