import type { Metadata } from "next";
import CommercialPageTemplate from "@/app/components/CommercialPageTemplate";

export const metadata: Metadata = {
  title: "Как увеличить CTR карточки товара — советы AI | eyeCARD",
  description: "Увеличьте CTR карточки товара с помощью AI-анализа: советы по повышению кликабельности на Wildberries и Ozon.",
};

export default function CtrKartochkiPage() {
  return (
    <CommercialPageTemplate
      heroTitle={<>Увеличение <span className="accent-text">CTR карточки</span></>}
      heroDescription="Увеличьте <span className='accent-text'>CTR карточки товара</span> с помощью AI-анализа: советы по повышению кликабельности на <span className='accent-text'>Wildberries и Ozon</span>."
      benefits={[
        { icon: "📈", title: "Рост CTR", description: "Средний рост CTR после внедрения рекомендаций eyeCARD — 15-25% за счёт улучшения визуала." },
        { icon: "🎯", title: "Точное попадание", description: "Дизайн, который выделяется в выдаче и привлекает внимание именно вашей целевой аудитории." },
        { icon: "🔬", title: "Научная база", description: "Рекомендации основаны на исследованиях когнитивной психологии и нейромаркетинга." },
        { icon: "⚡", title: "Быстрый эффект", description: "Первые результаты через 30 секунд после анализа. Внедрение рекомендаций — 1-2 дня." },
        { icon: "📊", title: "Измеримость", description: "Отслеживайте рост CTR в динамике после внедрения изменений." },
        { icon: "🧠", title: "Психология покупателя", description: "Понимание, почему покупатель кликает на одни карточки и игнорирует другие." },
      ]}
      steps={[
        { number: 1, title: "Анализ текущего CTR", description: "Проанализируйте карточку в eyeCARD и узнайте ICC — главный фактор, влияющий на CTR.", image: "/Phase1.jpg" },
        { number: 2, title: "Выявите проблемы", description: "Получите список проблем, которые снижают CTR: визуальный шум, несоответствие ЦА, слабый контраст.", image: "/Phase2-1.jpg" },
        { number: 3, title: "Внедрите решения", description: "Следуйте рекомендациям eyeCARD и наблюдайте рост CTR после обновления карточки.", image: "/extension-ui.png" },
      ]}
      faq={[
        { question: "Что такое CTR карточки товара?", answer: "CTR (Click-Through Rate) — процент кликов по карточке товара в выдаче маркетплейса. Чем выше CTR, тем больше покупателей видят вашу карточку." },
        { question: "Как дизайн влияет на CTR?", answer: "Визуал — первый фактор, который видит покупатель. Если дизайн не привлекает внимание или не соответствует ожиданиям ЦА — покупатель пролистнёт карточку." },
        { question: "Какой CTR считается хорошим?", answer: "Средний CTR на Wildberries — 3-5%. Хороший CTR — выше 7%. Топовые карточки достигают 10-15%." },
        { question: "Как быстро растёт CTR после изменений?", answer: "Обычно рост заметен через 3-7 дней после обновления карточки. Алгоритмы маркетплейса учитывают новый CTR." },
        { question: "Можно ли увеличить CTR без изменения товара?", answer: "Да! В 80% случаев рост CTR достигается только за счёт улучшения визуала — без изменения самого товара." },
      ]}
      relatedArticles={[
        { title: "Кликабельность карточки", url: "/guide/klikabelnost", description: "Факторы, влияющие на CTR карточки товара." },
        { title: "Визуальный шум", url: "/guide/vizualny-shum", description: "Как визуальный шум снижает кликабельность." },
        { title: "Первое фото товара", url: "/guide/pervoe-foto", description: "Главный элемент, влияющий на CTR." },
      ]}
    />
  );
}
