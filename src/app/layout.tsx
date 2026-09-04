import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import AnalyticsScripts from "@/app/components/AnalyticsScripts";
import CookieConsent from "@/app/components/CookieConsent";
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
  title: "eyeCARD — Нейромаркетинговый аудит дизайна карточек товаров",
  description: "Аналитическая AI-платформа для Wildberries и Ozon. Дешифровка визуального кода через 4 семантические оси позиционирования, архетипы Юнга и 7 психологических радикалов.",
  icons: {
    icon: "/favicon.png",
  }
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
      <body className={inter.className}>
        <AnalyticsScripts />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
