import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Методология анализа карточек товаров — Guide | eyeCARD",
  description: "Полное руководство по анализу карточек товаров: психология покупателя, визуальный шум, когнитивный комфорт, архетипы бренда, нейромаркетинг. Научная методология eyeCARD.",
  openGraph: {
    title: "Методология анализа карточек товаров — Guide | eyeCARD",
    description: "Полное руководство по анализу карточек товаров: психология покупателя, визуальный шум, когнитивный комфорт, архетипы бренда.",
    type: "article",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
