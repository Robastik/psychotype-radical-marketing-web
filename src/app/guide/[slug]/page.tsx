import { notFound } from "next/navigation";
import { getGuideDocBySlug, getAllGuideSlugs } from "@/app/guide/data/guide-data";
import GuideLayout from "@/app/guide/components/GuideLayout";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/app/guide/components/GuideJsonLd";
import { pageSeo } from "@/lib/seo";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getGuideDocBySlug(slug);
  if (!doc) {
    return { title: "Документ не найден — Справочник eyeCARD" };
  }

  // Используем SEO поля, если они есть, иначе fallback на старые значения
  const seoTitle = doc.seo?.title || `${doc.shortTitle} — Справочник eyeCARD`;
  const seoDescription = doc.seo?.description || doc.essence;

  // ogImage: false — не объявлять images в metadata, чтобы работало файловое
  // соглашение ./opengraph-image.tsx (112 PNG по одному на документ).
  // Canonical здесь раньше приходил из корневого layout и был равен главной.
  const seo = pageSeo({
    path: `/guide/${doc.slug}`,
    ogType: "article",
    ogImage: false,
    title: seoTitle,
    description: seoDescription,
    keywords: doc.seo?.keywords,
  });

  return {
    ...seo,
    authors: [{ name: doc.author || "Команда eyeCARD" }],
    openGraph: {
      ...seo.openGraph,
      publishedTime: doc.publishedAt,
      modifiedTime: doc.updatedAt,
      authors: [doc.author || "Команда eyeCARD"],
    },
  };
}

export default async function GuideDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getGuideDocBySlug(slug);
  if (!doc) {
    notFound();
  }
  return (
    <>
      <ArticleJsonLd
        title={doc.title}
        description={doc.seo?.description || doc.essence}
        url={`/guide/${doc.slug}`}
        author={doc.author}
        publishedAt={doc.publishedAt}
        updatedAt={doc.updatedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Справочник", url: "/guide" },
          { name: doc.title, url: `/guide/${doc.slug}` },
        ]}
      />
      {doc.faq && doc.faq.length > 0 && <FaqJsonLd items={doc.faq} />}
      <GuideLayout doc={doc} />
    </>
  );
}
