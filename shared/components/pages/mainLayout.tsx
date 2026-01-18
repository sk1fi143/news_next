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
import { CardsProps } from "@/shared/interface/cards";

interface Props {
  data: CardsProps[];
  type: string;
  breadcrumbs?: boolean;
}

export const MainLayout: React.FC<Props> = ({ data, type, breadcrumbs }) => {
  return (
    <main>
      {breadcrumbs ? <Head breadcrumbs title={type} /> : <Head title={`Главные ${type.toLowerCase()}`} />}
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
          data={data[0].cardsData}
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
        {data.map((cards, index) => {
          const isLast = index === data.length - 1;
          return (
            <React.Fragment key={cards.title}>
              <Cards data={cards} />
              {!isLast && <Line />}
              {index === 0 && (
                <React.Fragment>
                  <PromoCards />
                  <Line />
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </div>
      </div>
      <ReadNow data={data} />
      <Map data={data} />
    </main>
  );
};