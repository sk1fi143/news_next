import { NotFoundLayout } from "@/shared/components/pages/notFound";
import { Metadata } from "next";
import { buildPageMetadata } from "@/shared/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/404", {
    title: "Страница не найдена - Новая Версия Приволжье",
    description: "Запрашиваемая страница не найдена",
    image: "/images/card.png",
    type: "website",
  });
}

export default function NotFound() {
  return (
   <NotFoundLayout />
  );
}