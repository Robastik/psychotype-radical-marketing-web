import { notFound } from "next/navigation";
import { getGuideDoc, getAllGuideCodes } from "@/app/guide/data/guide-data";
import GuideLayout from "@/app/guide/components/GuideLayout";

export function generateStaticParams() {
  return getAllGuideCodes().map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const doc = getGuideDoc(code);
  if (!doc) {
    return { title: "Документ не найден — eyeCARD Гид" };
  }
  return {
    title: `${doc.title} — eyeCARD Гид`,
    description: doc.essence,
  };
}

export default async function GuideDocPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const doc = getGuideDoc(code);
  if (!doc) {
    notFound();
  }
  return <GuideLayout doc={doc} />;
}
