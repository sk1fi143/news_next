import { Metadata } from "next";
import { DocsLayout } from "@/shared/components/pages/docsLayout";
import { Privacy } from "@/shared/models/documents";
import { buildPageMetadata } from "@/shared/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/agreement", {
    title: "Пользовательское соглашение - Новая Версия Приволжье",
    description: "Пользовательское соглашение - Новая Версия Приволжье",
    image: "/images/card.png",
    type: "website",
  });
}

export default function Agreement() {
  return (
    <DocsLayout data={Privacy} title="Пользовательское соглашение" />
  );
}