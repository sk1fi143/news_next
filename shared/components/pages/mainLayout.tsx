 "use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Regions } from "@/shared/models/regions";
import { Head } from "../shared/head";
import { NewsFeed } from "../shared/news-feed";
import { CardsWrapper } from "../shared/cards/cards-wrapper";
import { Line } from "../shared/line";
import { HeadWSort } from "../shared/cards/head-w-sort";
import { Cards } from "../shared/cards/cards";
import { PromoCards } from "../shared/promo/cards";
import { ReadNow } from "../shared/read-now";
import { Map } from "@/shared/components/shared/map";
import { CardsProps, IPromoCards } from "@/shared/interface/cards";
import { PromoCardData } from "@/shared/models/promoCard";

interface Props {
  data: CardsProps[];
  type: string;
  breadcrumbs?: boolean;
  regionName?: string;
  notRegionData: CardsProps[];
  promoData?: IPromoCards[];
}

export const MainLayout: React.FC<Props> = ({
  data,
  type,
  breadcrumbs,
  regionName,
  notRegionData,
  promoData,
}) => {
  const titleMain = regionName
    ? `Главные ${type.toLowerCase()} ${regionName}`
    : `Главные ${type.toLowerCase()}`;

    const title = regionName
    ? `${type} ${regionName}`
    : `${type}`;

  const finalPromoData = promoData || PromoCardData;

  const [visibleCount, setVisibleCount] = React.useState(2);
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 1);
  };

  const visibleData = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const isRegionPrefix = firstSegment && Regions.some((r) => r.url === firstSegment);
  const isHome = segments.length === 0 || (isRegionPrefix && segments.length === 1);

  return (
    <main>
      <Head breadcrumbs={breadcrumbs} title={isHome ? titleMain : title} />
      <div className="page__sticky">
        <NewsFeed
          title="Новости"
          link="news"
          data={data}
          className="stickyFeed"
          firstCard="newsCard-F"
        />
        <div className="page__column">
          <div className="page__top">
            <NewsFeed
              title="Новости"
              link="news"
              data={data}
              firstCard="newsCard-F"
              className="nostickyFeed"
            />
            <CardsWrapper
              className="cards-wrapper__title-sm"
              title={`Последние ${type.toLowerCase()}`}
              data={data[0]}
            />
            <NewsFeed
              title="Статьи"
              link="articles"
              data={data}
              firstCard="newsCard-S"
            />
          </div>
          <Line />
          <HeadWSort title={`Все ${type.toLowerCase()}`} />
          {visibleData.map((cards, index) => {
            const isLast = index === visibleData.length - 1;

            return (
              <React.Fragment key={`${cards.region}-${cards.slug}`}>
                <Cards data={cards} />

                {!isLast && <Line />}

                {index === 0 && (
                  <React.Fragment>
                    <PromoCards promoData={finalPromoData} />
                    <Line />
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}

          {hasMore && (
            <button onClick={showMore} className="page__column-buttonMore">
              Показать еще
            </button>
          )}
        </div>
      </div>
      <ReadNow data={data} />
      <Map data={notRegionData} />
    </main>
  );
};
