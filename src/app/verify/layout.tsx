import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проверка результата анализа — eyeCARD",
  description: "Верификация результата ИИ-анализа карточки товара по уникальному идентификатору.",
  robots: { index: false, follow: true },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
