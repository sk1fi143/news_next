import { NewsData } from "@/shared/models/newsData";
import { Metadata } from "next";
import { SearchLayout } from "@/shared/components/pages/searchLayout";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Результаты поиска",
  description: "Поиск новостей по ключевым словам",
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query =
    typeof params.q === "string" ? params.q.toLowerCase().trim() : "";

  const allNews = NewsData.flatMap((category) => category.cardsData);
  const filteredNews = query
    ? allNews.filter(
        (news) =>
          news.title.toLowerCase().includes(query) ||
          news.location.toLowerCase().includes(query),
      )
    : [];

  const dataForLayout = {
    title: query
      ? `Результаты по запросу: «${query}»`
      : "Введите поисковый запрос",
    cardsData: filteredNews,
  };


  return (
    <Suspense fallback={<div>Загрузка результатов...</div>}>
      <SearchLayout key={query} data={dataForLayout} />
    </Suspense>
  );
}
