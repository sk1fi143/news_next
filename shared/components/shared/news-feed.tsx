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
  
  // Собираем все новости из всех категорий
  const allNews = data.flatMap(category => 
    category.cardsData.map(card => ({
      ...card,
      categorySlug: category.slug,
      categoryTitle: category.title
    }))
  );

  // Для "Новое" берем первые 3 новости
  const newNews = allNews.slice(0, 3);
  
  // Для "Популярное" берем новости с 3 по 6
  const popularNews = allNews.slice(3, 6);
  
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
          newNews.map((card, index) => (
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
        }
        {activeTab === "popular" &&
          popularNews.map((card, index) => (
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
        }
      </div>
      <RegionLink href={`/${link}`} className="news-feed__button">
        Смотреть все
      </RegionLink>
    </div>
  );
};
