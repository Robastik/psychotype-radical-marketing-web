import { notFound } from "next/navigation";
import { getGuideDoc, getAllGuideCodes } from "@/app/guide/data/guide-data";
import GuideLayout from "@/app/guide/components/GuideLayout";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/app/guide/components/GuideJsonLd";

export function generateStaticParams() {
  return getAllGuideCodes().map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const doc = getGuideDoc(code);
  if (!doc) {
    return { title: "Документ не найден — Справочник eyeCARD" };
  }

  // Используем SEO поля, если они есть, иначе fallback на старые значения
  const seoTitle = doc.seo?.title || `${doc.title} — Справочник eyeCARD`;
  const seoDescription = doc.seo?.description || doc.essence;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: doc.seo?.keywords?.join(", "),
    authors: [{ name: doc.author || "Команда eyeCARD" }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: doc.publishedAt,
      modifiedTime: doc.updatedAt,
      authors: [doc.author || "Команда eyeCARD"],
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
      title: seoTitle,
      description: seoDescription,
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
        description={doc.seo?.description || doc.essence}
        url={`/guide/${code}`}
        author={doc.author}
        publishedAt={doc.publishedAt}
        updatedAt={doc.updatedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Справочник", url: "/guide" },
          { name: doc.title, url: `/guide/${code}` },
        ]}
      />
      {doc.faq && doc.faq.length > 0 && <FaqJsonLd items={doc.faq} />}
      <GuideLayout doc={doc} />
    </>
  );
}
