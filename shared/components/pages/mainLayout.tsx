"use client";

import React from "react";
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
  const title = regionName
    ? `Главные ${type.toLowerCase()} ${regionName}`
    : `Главные ${type.toLowerCase()}`;

  const finalPromoData = promoData || PromoCardData;

  const [visibleCount, setVisibleCount] = React.useState(2);
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 1);
  };

  const visibleData = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;

  return (
    <main>
      {breadcrumbs ? <Head breadcrumbs title={type} /> : <Head title={title} />}
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
