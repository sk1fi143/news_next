import { NewsData } from "@/shared/models/newsData";
import { Metadata } from "next";
import { Suspense } from "react";
import { MainLayout } from "@/shared/components/pages/mainLayout";
import { NewsTopicLayout } from "@/shared/components/pages/newsTopicLayout";
import { notFound } from "next/navigation";
import { regionDataMap } from "../page";
import { generateBreadcrumbListSchema, generateItemListSchema } from "@/shared/lib/schema";
import { JsonLd } from "@/shared/components/schema/json-ld";

export const metadata: Metadata = {
  title: "Новости - Новая Версия Приволжье",
  description: "Все новости регионов Приволжья",
};

export const dynamic = "force-dynamic";

export default async function News({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; region?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { region: regionCode } = await searchParams;

  let filteredData;
  if (regionCode && regionCode in regionDataMap) {
    filteredData = regionDataMap[regionCode as keyof typeof regionDataMap];
  } else {
    filteredData = NewsData;
  }

  if (resolvedSearchParams.topic) {
    const topicItem = filteredData.find(
      (item) => item.slug === resolvedSearchParams.topic,
    );
    if (!topicItem) notFound();

    // BreadcrumbList для страницы категории
    const breadcrumbSchema = generateBreadcrumbListSchema([
      { name: "Главная", url: "/" },
      { name: "Новости", url: "/news" },
      { name: topicItem.title, url: `/news?topic=${topicItem.slug}` },
    ]);

    return (
      <>
        <JsonLd data={breadcrumbSchema} />
        <Suspense>
          <NewsTopicLayout type="Новости" data={topicItem} />
        </Suspense>
      </>
    );
  }

  // BreadcrumbList для страницы списка новостей
  const breadcrumbSchema = generateBreadcrumbListSchema([
    { name: "Главная", url: "/" },
    { name: "Новости", url: "/news" },
  ]);

  // ItemList для списка новостей (первые 20)
  const newsList = filteredData
    .flatMap(category => category.cardsData)
    .slice(0, 20)
    .map(news => ({
      name: news.title,
      url: `/news/${news.id}`,
      image: news.imageUrl,
    }));

  const itemListSchema = generateItemListSchema({
    name: "Список новостей",
    description: "Последние новости регионов Приволжья",
    items: newsList,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <MainLayout
        breadcrumbs
        notRegionData={NewsData}
        data={filteredData}
        type="Новости"
      />
    </>
  );
}
