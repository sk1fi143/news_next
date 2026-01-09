import React from "react";
import { Card } from "./card";
import { CardsWrapper } from "./cards-wrapper";
import { CardsProps } from "@/shared/interface/cards";
import { ArrowGo } from "../../svg/arrowGo";
import { RegionLink } from "../region-link";

interface Props {
  data: CardsProps;
}

export const Cards: React.FC<Props> = ({ data }) => {
  return (
    <section className="newsCards">
      <CardsWrapper title={data.title} data={data.cardsData} />
      <div className="newsCards__column">
        <RegionLink href="/news" className="newsCards__column-button">
          <span className="newsCards__column-button-text">Все новости по теме</span>
          <ArrowGo className="newsCards__column-button-icon" />
        </RegionLink>
        <div className="newsCards__column-cards">
          {data.cardsData.slice(0, 2).map((card) => (
            <Card className="newsCard-M" key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
