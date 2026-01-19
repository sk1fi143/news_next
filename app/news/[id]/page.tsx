import { getNewsItemById } from "@/shared/models/newsItemData";
import { Metadata } from "next";
import { NewsPageLayout } from "@/shared/components/pages/newsPageLayout";
import { NewsData } from "@/shared/models/newsData";
import { notFound } from "next/navigation";
import { generateNewsArticleSchema } from "@/shared/lib/schema";
import { JsonLd } from "@/shared/components/schema/json-ld";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const newsItem = getNewsItemById(id);
  
  return {
    title: newsItem.title,
    description: newsItem.title,
  };
}

export default async function PageNews({ params }: PageProps) {
  const { id } = await params;
  const newsItem = getNewsItemById(id);
  
  if (!newsItem) {
    notFound();
  }

  // Получаем первое изображение из контента
  const firstImage = newsItem.content.find(item => item.image && item.imageUrl);
  const imageUrl = firstImage?.imageUrl || "";

  // Получаем описание из первого абзаца текста
  const firstText = newsItem.content.find(item => item.text);
  const description = firstText?.text?.split('\n').find(p => p.trim())?.trim().substring(0, 160) || newsItem.title;

  // Получаем полный текст статьи
  const articleBody = newsItem.content
    .map(item => {
      let text = "";
      if (item.title) text += item.title + "\n\n";
      if (item.text) text += item.text;
      return text;
    })
    .join("\n\n");

  // Генерируем разметку NewsArticle
  const newsArticleSchema = generateNewsArticleSchema({
    headline: newsItem.title,
    description: description,
    imageUrl: imageUrl,
    author: newsItem.info.author,
    datePublished: newsItem.info.update,
    dateModified: newsItem.info.update,
    url: `/news/${id}`,
    articleBody: articleBody,
  });

  // Генерируем разметку BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Новости",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com"}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: newsItem.title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com"}/news/${id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={newsArticleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <NewsPageLayout 
        data={newsItem} 
        newsData={NewsData} 
      />
    </>
  );
}
