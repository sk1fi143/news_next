import { NewsData } from "@/shared/models/newsData";
import { Metadata } from "next";
import { AboutData } from "@/shared/models/about";
import { AboutLayout } from "@/shared/components/pages/aboutLayout";

export const metadata: Metadata = {
  title: "О нас - Новая Версия Приволжье",
  description: "О компании Новая Версия Приволжье",
};

export default function About() {
  return (
    <AboutLayout 
      newsData={NewsData} 
      aboutData={AboutData} 
    />
  );
}
