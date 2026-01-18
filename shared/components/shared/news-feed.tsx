"use client";

import React, { useState } from "react";
import { Card } from "./cards/card";
import { CardsProps } from "@/shared/interface/cards";
import { RegionLink } from "./region-link";


interface Props {
  title: string;
  data: CardsProps[];
  link: string;
  firstCard?: string;
  className?: string;
}

export const NewsFeed: React.FC<Props> = ({ title, link, data, firstCard, className }) => {
  const [activeTab, setActiveTab] = useState<"new" | "popular">("new");
  return (
    <div className={`news-feed ${className}`}>
      <div className="news-feed__topBar">
        <h5 className="news-feed__title">{title}</h5>
        <div className="news-feed__navigation">
          <button
            className={`news-feed__tab ${
              activeTab === "new" ? "news-feed__tab--active" : ""
            }`}
            onClick={() => setActiveTab("new")}
          >
            Новое
          </button>
          <button
            className={`news-feed__tab ${
              activeTab === "popular" ? "news-feed__tab--active" : ""
            }`}
            onClick={() => setActiveTab("popular")}
          >
            Популярное
          </button>
        </div>
      </div>
      <div className="news-feed__content">
        {activeTab === "new" &&
          data.map(
            (cards) =>
              cards.slug == "vlast" &&
              cards.cardsData
                .slice(0, 5)
                .map((card, index) => (
                  <Card
                    key={card.id || index}
                    id={card.id}
                    title={card.title}
                    location={card.location}
                    time={card.time}
                    imageUrl={card.imageUrl}
                    className={`newsCard ${index === 0 ? `${firstCard}` : 'newsCard-S'}`}
                  />
                ))
          )}
        {activeTab === "popular" &&
          data.map(
            (cards) =>
              cards.slug == "politika" &&
              cards.cardsData
                .slice(0, 5)
                .map((card, index) => (
                  <Card
                    key={card.id || index}
                    id={card.id}
                    title={card.title}
                    location={card.location}
                    time={card.time}
                    imageUrl={card.imageUrl}
                    className={`newsCard ${index === 0 ? `${firstCard}` : 'newsCard-S'}`}
                  />
                ))
          )}
      </div>
      <RegionLink href={link} className="news-feed__button">
        Смотреть все
      </RegionLink>
    </div>
  );
};
