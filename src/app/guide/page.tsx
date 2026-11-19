import type { Metadata } from "next";
import GuideIndexView from "@/app/guide/components/GuideIndexView";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/guide",
  ogType: "article",
  title: "Методология анализа карточек товаров — Guide | eyeCARD",
  description: "Полное руководство по анализу карточек товаров: психология покупателя, визуальный шум, когнитивный комфорт, архетипы бренда, нейромаркетинг. Научная методология eyeCARD.",
  ogDescription: "Полное руководство по анализу карточек товаров: психология покупателя, визуальный шум, когнитивный комфорт, архетипы бренда.",
});

export default function GuideIndexPage() {
  return <GuideIndexView />;
}
