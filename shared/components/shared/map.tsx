"use client";

import React, { useState } from "react";
import { Card } from "./cards/card";
import Image from "next/image";
import MapImage from "@img/map.png";
import { MapRegions } from "@/shared/models/map";
import { CardsProps } from "@/shared/interface/cards";
import { RegionLink } from "./region-link";

interface Props {
  data: CardsProps[];
}

export const Map: React.FC<Props> = ({ data }) => {
  const [activeRegion, setActiveRegion] = useState<string>("nijni");

  const currentRegion = MapRegions.find((r) => r.id === activeRegion);

  const filteredCards = data
    .filter((item) => item.region === currentRegion?.name)
    .flatMap((item) => item.cardsData);

  const handleRegionClick = (region: string) => {
    setActiveRegion(region);
  };

  return (
    <div className="map">
      <h2 className="map__title">Последние новости на карте</h2>
      <span className="map__take">Выберите регион, чтобы увидеть новости</span>
      <div className="map__main-info">
        <div className="map__cover-img">
          <Image
            className="map__main-info-img"
            src={MapImage}
            alt="Большая карта страны с отмеченными регионами"
          />
        </div>
        <div className="map__category">
        {MapRegions.map((region) => (
          <div
            key={region.id}
            className={region.containerClass}
            onClick={() => handleRegionClick(region.id)}
          >
            <div
              className={`map__card-content ${
                activeRegion === region.id ? "map-active" : ""
              }`}
            >
              <Image src={region.icon} alt={region.name} />
              <span className="map__name">{region.name}</span>
            </div>
            <div className={region.lineClass}></div>
            <div className="map__circle"></div>
          </div>
        ))}
        </div>
      </div>

      <div className="map__result">
        <h4 className="map__region">
          {currentRegion ? currentRegion.name : "Выберите регион"}
        </h4>
        <div className="map__news-list">
          {filteredCards.length > 0 ? (
            filteredCards
              .slice(0, 4)
              .map((card, index) => (
                <Card
                  key={index}
                  id={card.id}
                  title={card.title}
                  location={card.location}
                  time={card.time}
                  imageUrl={card.imageUrl}
                  className="newsCard newsCard-S"
                />
              ))
          ) : (
            <p>В данном регионе новостей пока нет</p>
          )}
        </div>
        <RegionLink href="/news" className="map__button-link">
          Смотреть все новости
        </RegionLink>
      </div>
    </div>
  );
};
