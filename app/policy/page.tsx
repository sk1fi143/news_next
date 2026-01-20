import { Metadata } from "next";
import { DocsLayout } from "@/shared/components/pages/docsLayout";
import { Privacy } from "@/shared/models/documents";
import { buildPageMetadata } from "@/shared/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/policy", {
    title: "Политика конфиденциальности - Новая Версия Приволжье",
    description: "Политика конфиденциальности - Новая Версия Приволжье",
    image: "/images/card.png",
    type: "website",
  });
}

export default function Policy() {
  return (
    <DocsLayout data={Privacy} title="Политика конфиденциальности" />
  );
}