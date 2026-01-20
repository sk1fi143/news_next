import { NewsData } from "@/shared/models/newsData";
import { Metadata } from "next";
import { AboutData } from "@/shared/models/about";
import { AboutLayout } from "@/shared/components/pages/aboutLayout";
import { buildPageMetadata } from "@/shared/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/about", {
    title: "О нас - Новая Версия Приволжье",
    description: "О компании Новая Версия Приволжье",
    image: "/images/card.png",
    type: "website",
  });
}

export default function About() {
  return (
    <AboutLayout 
      newsData={NewsData} 
      aboutData={AboutData} 
    />
  );
}
