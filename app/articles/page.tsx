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
  title: "Статьи - Новая Версия Приволжье",
  description: "Все статьи регионов Приволжья",
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
      { name: "Статьи", url: "/articles" },
      { name: topicItem.title, url: `/articles?topic=${topicItem.slug}` },
    ]);

    return (
      <>
        <JsonLd data={breadcrumbSchema} />
        <Suspense>
          <NewsTopicLayout type="Статьи" data={topicItem} />
        </Suspense>
      </>
    );
  }

  // BreadcrumbList для страницы списка статей
  const breadcrumbSchema = generateBreadcrumbListSchema([
    { name: "Главная", url: "/" },
    { name: "Статьи", url: "/articles" },
  ]);

  // ItemList для списка статей (первые 20)
  const articlesList = filteredData
    .flatMap(category => category.cardsData)
    .slice(0, 20)
    .map(article => ({
      name: article.title,
      url: `/articles/${article.id}`,
      image: article.imageUrl,
    }));

  const itemListSchema = generateItemListSchema({
    name: "Список статей",
    description: "Последние статьи регионов Приволжья",
    items: articlesList,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <MainLayout
        breadcrumbs
        notRegionData={NewsData}
        data={filteredData}
        type="Статьи"
      />
    </>
  );
}
