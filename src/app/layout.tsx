import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import AnalyticsScripts from "@/app/components/AnalyticsScripts";
import CookieConsent from "@/app/components/CookieConsent";
import { OrganizationJsonLd } from "@/app/components/JsonLd";
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "https://eyecard.ru",
  },
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
