import React from "react";
import { Card } from "./card";
import { CardProps } from "@/shared/interface/cards";

interface Props {
  title?: string;
  data: CardProps[];
  className?: string;
}

export const CardsWrapper: React.FC<Props> = ({ className, title, data }) => {
  return (
    <div className="cards-wrapper">
      <h2 className={`cards-wrapper__title ${className}`}>{title}</h2>
      <div className="cards-wrapper__cards">
        {data.slice(0, 3).map((card, index) => {
          const sizeClass = index === 0 ? "newsCard-L" : "newsCard-M";

          return (
            <Card
              key={card.id}
              className={`newsCard ${sizeClass}`}
              title={card.title}
              time={card.time}
              id={card.id}
              location={card.location}
              imageUrl={card.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
};
