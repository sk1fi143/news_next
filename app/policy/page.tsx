import { Metadata } from "next";
import { DocsLayout } from "@/shared/components/pages/docsLayout";
import { Privacy } from "@/shared/models/documents";

export const metadata: Metadata = {
  title: "Политика конфиденциальности - Новая Версия Приволжье",
  description: "Политика конфиденциальности - Новая Версия Приволжье",
};

export default function Policy() {
  return (
    <DocsLayout data={Privacy} title="Политика конфиденциальности" />
  );
}