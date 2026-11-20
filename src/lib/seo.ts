import type { Metadata } from "next";

/**
 * Единственная точка, где страница объявляет canonical, og:url и og:image.
 *
 * Почему это отдельные модули, а не поля в pages:
 *
 * 1. Canonical жил в корневом `app/layout.tsx` (`alternates.canonical:
 *    "https://eyecard.ru"`), а Next наследует metadata дочерним сегментам,
 *    если они не переопределили поле. В результате 130 из 131 собранной
 *    страницы говорили роботу, что они — дубль главной. Яндекс directive
 *    выполнял: в индексе оставалась одна страница.
 *
 * 2. `openGraph` замещается родителем целиком, а не по полям. Страницы,
 *    объявившие свой `openGraph` без `images`, теряли og:image совсем
 *    (`/wildberries`, `/ozon`). Страницы, не объявлявшие его вовсе,
 *    наследовали `og-image.png` — файла в `public/` нет, og:image отдаёт 404.
 *    Telegram и VK на таких ссылках показывают превью без картинки, то есть
 *    дефект бьёт по доставке отчётов, а не только по выдаче.
 *
 * Реальный URL site-картинки — `/opengraph-image` (генерируется
 * `app/opengraph-image.tsx`, в проде 200 image/png).
 */

export const SITE_ORIGIN = "https://eyecard.ru";

/** Стабильный путь site-wide OG-превью из `app/opengraph-image.tsx`. */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/opengraph-image`;

export interface PageSeoInput {
  /** Без домена: "/ozon", "/guide/kak-chitat-vizualnyy-pasport". "/" — главная. */
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  /**
   * string — использовать эту картинку;
   * false — ничего не объявлять, чтобы сработало файловое соглашение
   * сегмента (`[route]/opengraph-image.tsx`, как в статьях guide).
   */
  ogImage?: string | false;
  ogImageAlt?: string;
  keywords?: string[];
  /** hreflang-альтернативы, если у страницы есть языковые версии (privacy / en/privacy). */
  languages?: Record<string, string>;
}

export function absoluteUrl(path: string): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean ? `${SITE_ORIGIN}/${clean}` : SITE_ORIGIN;
}

export function pageSeo({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  keywords,
  languages,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageAlt = ogImageAlt ?? title;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: ogType,
    url,
    siteName: "eyeCARD",
    title: ogTitle ?? title,
    description: ogDescription ?? description,
  };

  const twitter: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image",
    title: ogTitle ?? title,
    description: ogDescription ?? description,
  };

  if (ogImage !== false) {
    openGraph.images = [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }];
    twitter.images = [ogImage];
  }

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph,
    twitter,
  };
}
