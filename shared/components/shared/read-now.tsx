import React from "react";
import { Card } from "@/shared/components/shared/cards/card";
import { CardProps } from "@/shared/interface/cards";

interface Props {
  data: SidebarData[];
}

interface SidebarData {
  slug: string;
  cardsData: CardProps[];
}

export const ReadNow: React.FC<Props> = ({ data }) => {
  return (
    <div className="read-now">
      <h3 className="read-now__title">Сейчас читают</h3>
      <div className="read-now__content">
        {data.map(
          (cards) =>
            cards.slug == "vlast" &&
            cards.cardsData
              .slice(0, 12)
              .map((card, index) => (
                <Card
                  key={card.id || index}
                  id={card.id}
                  title={card.title}
                  location={card.location}
                  time={card.time}
                  imageUrl={card.imageUrl}
                  className="newsCard newsCard-S"
                />
              ))
        )}
      </div>
    </div>
  );
};
