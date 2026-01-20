import { getNewsItemById } from "@/shared/models/newsItemData";
import { Metadata } from "next";
import { NewsPageLayout } from "@/shared/components/pages/newsPageLayout";
import { NewsData } from "@/shared/models/newsData";
import { notFound } from "next/navigation";
import { generateArticleSchema } from "@/shared/lib/schema";
import { JsonLd } from "@/shared/components/schema/json-ld";
import { buildPageMetadata } from "@/shared/lib/seo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getNewsItemById(id);

  if (!article) {
    return buildPageMetadata(`/articles/${id}`, {
      title: "Статья не найдена",
      description: "Запрошенная статья не найдена",
      type: "article",
    });
  }

  const firstImage = article.content.find((item) => item.image && item.imageUrl);
  const imageUrl = firstImage?.imageUrl || "";
  const firstText = article.content.find((item) => item.text);
  const description =
    firstText?.text?.split("\n").find((p) => p.trim())?.trim().substring(0, 160) ||
    article.title;

  return buildPageMetadata(`/articles/${id}`, {
    title: article.title,
    description,
    image: imageUrl,
    type: "article",
  });
}

export default async function PageArticle({ params }: PageProps) {
  const { id } = await params;
  const article = getNewsItemById(id);
  
  if (!article) {
    notFound();
  }

  // Получаем первое изображение из контента
  const firstImage = article.content.find(item => item.image && item.imageUrl);
  const imageUrl = firstImage?.imageUrl || "";

  // Получаем описание из первого абзаца текста
  const firstText = article.content.find(item => item.text);
  const description = firstText?.text?.split('\n').find(p => p.trim())?.trim().substring(0, 160) || article.title;

  // Генерируем разметку Article (для статей)
  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: description,
    imageUrl: imageUrl,
    author: article.info.author,
    datePublished: article.info.update,
    dateModified: article.info.update,
    url: `/articles/${id}`,
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
        name: "Статьи",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com"}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com"}/articles/${id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <NewsPageLayout 
        data={article} 
        newsData={NewsData} 
      />
    </>
  );
}
