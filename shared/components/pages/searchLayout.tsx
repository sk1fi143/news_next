"use client";

import { CardsProps } from "@/shared/interface/cards";
import { Head } from "../shared/head";
import { Card } from "../shared/cards/card";
import React from "react";
import { useSearchParams } from "next/navigation";
import { RegionLink } from "../shared/region-link";

interface Props {
  data: CardsProps;
}

export const SearchLayout: React.FC<Props> = ({ data }) => {
  const PAGE_SIZE = 16;
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [sections, setSections] = React.useState<number[][]>([]);

  const updateUrl = (pageNumber: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", pageNumber.toString());
      window.history.pushState({}, "", url.toString());
    }
  };

  React.useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);

    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam, 10) - 1 : 0;

    const initialSections = [
      data.cardsData
        .slice(initialPage * PAGE_SIZE, (initialPage + 1) * PAGE_SIZE)
        .map((_, i) => initialPage * PAGE_SIZE + i),
    ];
    setSections(initialSections);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [searchParams, data.cardsData]);

  const totalPages = Math.ceil(data.cardsData.length / PAGE_SIZE);

  const handleShowMore = () => {
    if (sections.length < totalPages) {
      const startIdx = sections.length * PAGE_SIZE;
      const newCardsIndices = data.cardsData
        .slice(startIdx, startIdx + PAGE_SIZE)
        .map((_, i) => startIdx + i);
      const newSections = [...sections, newCardsIndices];
      setSections(newSections);
      updateUrl(newSections.length);
    }
  };

  const renderCardsForSection = (indices: number[]) => {
    let countPerSection = 16;
    let specialPositions: number[] = [];

    if (windowWidth > 1200) {
      countPerSection = 16;
    } else {
      countPerSection = 15;
      specialPositions = [0, 5, 10];
    }

    const slicedIndices = indices.slice(0, countPerSection);

    return slicedIndices.map((cardIdx, index) => {
      const className =
        windowWidth > 1200
          ? "newsCard-M"
          : specialPositions.includes(index)
            ? "newsCard-L"
            : "newsCard-M";

      const cardData = data.cardsData[cardIdx];
      if (!cardData) return null;

      return <Card key={cardIdx} className={className} {...cardData} />;
    });
  };

  if (!isMounted) {
    return null;
  }

  const isDataEmpty = data.cardsData.length === 0;

  return (
    <main>
      {isDataEmpty ? (
        <div className="notFound">
          <span className="notFound__error">404</span>
          <h1 className="notFound__title">Ничего не найдено</h1>
          <p className="notFound__decription">
            Возможно, вы ввели неверный запрос. <br />
            Вы можете вернуться на{" "}
            <RegionLink href="/" className="notFound__decription-primary">
              главную страницу сайта.
            </RegionLink>
          </p>
          <RegionLink href="/" className="notFound__button">
            Вернуться на главную
          </RegionLink>
        </div>
      ) : (
        <>
          <Head breadcrumbs title="Результаты поиска" />
          <div className="newsTopics">
            {sections.map((sectionIndices, index) => (
              <section key={index} className="newsTopics__section">
                {renderCardsForSection(sectionIndices)}
              </section>
            ))}

            {sections.length < totalPages && (
              <button
                onClick={handleShowMore}
                type="button"
                className="newsTopics__button"
              >
                Показать ещё
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
};
