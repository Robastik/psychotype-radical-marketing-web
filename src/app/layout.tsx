import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import AnalyticsScripts from "@/app/components/AnalyticsScripts";
import CookieConsent from "@/app/components/CookieConsent";
import { OrganizationJsonLd } from "@/app/components/JsonLd";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "eyeCARD — ИИ-анализ карточек товаров Wildberries и Ozon",
  description: "ИИ-аналитика для продавцов маркетплейсов: повышение CTR карточек через анализ дизайна Wildberries и Ozon. Оптимизация карточек товаров с научным подходом.",
  metadataBase: new URL("https://eyecard.ru"),
  openGraph: {
    type: "website",
    siteName: "eyeCARD",
    title: "eyeCARD — ИИ-анализ карточек товаров Wildberries и Ozon",
    description: "ИИ-аналитика для продавцов маркетплейсов: повышение CTR карточек через анализ дизайна Wildberries и Ozon.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "eyeCARD — ИИ-анализ карточек товаров",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eyeCARD — ИИ-анализ карточек товаров Wildberries и Ozon",
    description: "ИИ-аналитика для продавцов маркетплейсов: повышение CTR карточек через анализ дизайна.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/favicon.png",
  },
  // КАНОНИЧЕСКИЙ URL ЗАДАЁТ ТОЛЬКО `pageSeo()` В КОНКРЕТНОМ МАРШРУТЕ.
  //
  // Здесь его быть не может: Next наследует metadata дочерним сегментам,
  // поэтому единственный canonical в корневом layout превращал 130 из 131
  // страницы в объявление «я — дубль https://eyecard.ru». Яндекс directive
  // выполнял буквально: в индексе была одна главная.
  //
  // OpenGraph-картинка сюда тоже не возвращается: `/og-image.png` не
  // существует (og:image отдавал 404). Дефолт — DEFAULT_OG_IMAGE в seo.ts.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className={inter.className}>
        <AnalyticsScripts />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
