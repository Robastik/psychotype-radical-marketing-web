import { notFound } from "next/navigation";
import { getGuideDoc, getAllGuideCodes } from "@/app/guide/data/guide-data";
import GuideLayout from "@/app/guide/components/GuideLayout";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/app/guide/components/GuideJsonLd";

export function generateStaticParams() {
  return getAllGuideCodes().map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const doc = getGuideDoc(code);
  if (!doc) {
    return { title: "Документ не найден — Справочник eyeCARD" };
  }
  return {
    title: `${doc.title} — Справочник eyeCARD`,
    description: doc.essence,
    openGraph: {
      title: `${doc.title} — Справочник eyeCARD`,
      description: doc.essence,
      type: "article",
      images: [
        {
          url: `/guide/${code}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.title} — Справочник eyeCARD`,
      description: doc.essence,
    },
  };
}

export default async function GuideDocPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const doc = getGuideDoc(code);
  if (!doc) {
    notFound();
  }
  return (
    <>
      <ArticleJsonLd
        title={doc.title}
        description={doc.essence}
        url={`/guide/${code}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Справочник", url: "/guide" },
          { name: doc.title, url: `/guide/${code}` },
        ]}
      />
      <GuideLayout doc={doc} />
    </>
  );
}
