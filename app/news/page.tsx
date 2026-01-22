import { NewsData } from "@/shared/models/newsData";
import { Metadata } from "next";
import { Suspense } from "react";
import { MainLayout } from "@/shared/components/pages/mainLayout";
import { NewsTopicLayout } from "@/shared/components/pages/newsTopicLayout";
import { notFound } from "next/navigation";
import { regionDataMap } from "../page";
import {
  generateBreadcrumbListSchema,
  generateItemListSchema,
} from "@/shared/lib/schema";
import { JsonLd } from "@/shared/components/schema/json-ld";
import { buildPageMetadata } from "@/shared/lib/seo";
import { regionNamesMap } from "@/shared/models/regions";

// Пример серверного запроса (оставлено закомментированным):
// const newsList = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, { next: { revalidate: 60 } })
//   .then(res => res.json());
// и передать в MainLayout вместо локального NewsData/regionDataMap

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; region?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.topic) query.set("topic", params.topic);
  if (params.region) query.set("region", params.region);

  const path = query.toString() ? `/news?${query.toString()}` : "/news";

  // Получаем данные для поиска названия раздела
  let filteredData;
  if (params.region && params.region in regionDataMap) {
    filteredData = regionDataMap[params.region as keyof typeof regionDataMap];
  } else {
    filteredData = NewsData;
  }

  // Находим topicItem по slug, чтобы получить русское название
  let topicTitle = params.topic;
  if (params.topic) {
    const topicItem = filteredData.find((item) => item.slug === params.topic);
    if (topicItem) {
      topicTitle = topicItem.title;
    }
  }

  const regionName =
    params.region && regionNamesMap[params.region]
      ? regionNamesMap[params.region]
      : "";

  const title = params.topic
    ? `Новости: ${topicTitle}${regionName ? ` — ${regionName}` : ""}`
    : regionName
      ? `Новости ${regionName} — Новая Версия Приволжье`
      : "Новости — Новая Версия Приволжье";

  const description = params.topic
    ? `Новости по теме «${topicTitle}»${regionName ? ` в ${regionName}` : ""}`
    : regionName
      ? `Все новости ${regionName}`
      : "Все новости регионов Приволжья";

  return buildPageMetadata(path, {
    title,
    description,
    image: "/images/card.png",
    type: "website",
  });
}

export const dynamic = "force-dynamic";

export default async function News({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; region?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { region: regionCode } = await searchParams;

  const regionName =
    regionCode && regionNamesMap[regionCode] ? regionNamesMap[regionCode] : "";

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
    .flatMap((category) => category.cardsData)
    .slice(0, 20)
    .map((news) => ({
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
        regionName={regionName}
      />
    </>
  );
}
