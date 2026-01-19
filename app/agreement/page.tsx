import { Metadata } from "next";
import { DocsLayout } from "@/shared/components/pages/docsLayout";
import { Privacy } from "@/shared/models/documents";

export const metadata: Metadata = {
  title: "Пользовательское соглашение - Новая Версия Приволжье",
  description: "Пользовательское соглашение - Новая Версия Приволжье",
};

export default function Agreement() {
  return (
    <DocsLayout data={Privacy} title="Пользовательское соглашение" />
  );
}