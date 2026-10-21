import { ImageResponse } from "next/og";
import { getGuideDoc, getAllGuideCodes } from "@/app/guide/data/guide-data";

// OG-изображение статьи (Neural Deck): satori рендерит PNG на этапе сборки,
// по одному статическому файлу на код — файловое соглашение opengraph-image.
// metadataBase из layout.tsx (https://eyecard.ru) даёт абсолютный og:image URL.
export const alt = "Статья справочника eyeCARD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllGuideCodes().map((code) => ({ code }));
}

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const doc = getGuideDoc(code);

  // Заголовок без кодового префикса (код — в чипе внизу); очень длинные
  // обрезаем по границе слова, чтобы не вылезти за три строки.
  let title = doc?.shortTitle || doc?.title || code;
  if (title.length > 95) {
    title = `${title.slice(0, 92).replace(/\s+\S*$/, "")}…`;
  }
  const titleSize = title.length > 70 ? 44 : title.length > 48 ? 52 : 62;

  // Секция без подраздела: «V. Визуальный паспорт: декодер → V.2 …» → «V. Визуальный паспорт: декодер»
  const section = (doc?.section || "Справочник").split(" → ")[0].toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0e1a",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Шапка: вордмарк + домен */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 800,
              color: "#F27318",
              letterSpacing: "0.05em",
            }}
          >
            eyeCARD
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8b9bb4" }}>
            eyecard.ru
          </div>
        </div>

        {/* Центр: секция + заголовок статьи */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: "#8b9bb4",
              letterSpacing: "0.12em",
            }}
          >
            {`СПРАВОЧНИК · ${section}`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              color: "#e0e7ef",
              lineHeight: 1.2,
              maxWidth: 1050,
            }}
          >
            {title}
          </div>
        </div>

        {/* Подвал: чип с кодом документа */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: "#F27318",
              border: "2px solid rgba(242, 115, 24, 0.5)",
              borderRadius: 12,
              padding: "8px 20px",
            }}
          >
            {code}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
