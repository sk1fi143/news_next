import { NewsData } from "@/shared/models/newsData";
import { NewsRC } from "@/shared/models/newsRC";
import { NewsRT } from "@/shared/models/newsRT";
import { NewsRME } from "@/shared/models/newsRME";
import { NewsKO } from "@/shared/models/newsKO";
import { NewsNO } from "@/shared/models/newsNO";
import { Metadata } from "next";
import { MainLayout } from "@/shared/components/pages/mainLayout";
import { generateItemListSchema } from "@/shared/lib/schema";
import { JsonLd } from "@/shared/components/schema/json-ld";
import { generateBreadcrumbListSchema } from "@/shared/lib/schema";
import { buildPageMetadata } from "@/shared/lib/seo";
import { regionNamesMap } from "@/shared/models/regions";

// Пример получения данных с бэкенда (оставлено закомментированным):
// const homeData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, { next: { revalidate: 60 } })
//   .then(res => res.json());
// и далее использовать вместо локальных NewsData/regionDataMap

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/", {
    title: "Новая Версия Приволжье",
    description: "Новости регионов Приволжья",
    image: "/images/card.png",
    type: "website",
  });
}

interface PageProps {
  searchParams: Promise<{ region?: string }>;
}

export const regionDataMap = {
  chuvash: NewsRC,
  tatarstan: NewsRT,
  mari_el: NewsRME,
  kirov: NewsKO,
  nizhny_novgorod: NewsNO,
} as const;

export default async function Home({ searchParams }: PageProps) {
  const { region: regionCode } = await searchParams;

  let filteredData;
  let regionName = "";

  if (regionCode && regionCode in regionDataMap) {
    filteredData = regionDataMap[regionCode as keyof typeof regionDataMap];
    regionName = regionNamesMap[regionCode] || "";
  } else {
    filteredData = NewsData;
  }

  // Генерируем ItemList для списка главных новостей (первые 10)
  const topNews = filteredData
    .flatMap(category => category.cardsData)
    .slice(0, 10)
    .map(news => ({
      name: news.title,
      url: `/news/${news.id}`,
      image: news.imageUrl,
    }));

  const itemListSchema = generateItemListSchema({
    name: regionName ? `Главные новости ${regionName}` : "Главные новости",
    description: "Последние новости регионов Приволжья",
    items: topNews,
  });

  // Генерируем BreadcrumbList если есть регион
  const breadcrumbItems = [
    { name: "Главная", url: "/" },
  ];
  if (regionName) {
    breadcrumbItems.push({ name: `Новости ${regionName}`, url: `/?region=${regionCode}` });
  }
  const breadcrumbSchema = generateBreadcrumbListSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={itemListSchema} />
      {regionName && <JsonLd data={breadcrumbSchema} />}
      <MainLayout
        breadcrumbs={Boolean(regionName)}
        notRegionData={NewsData}
        data={filteredData}
        type="Новости"
        regionName={regionName}
      />
    </>
  );
}
