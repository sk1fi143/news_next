import React from "react";
import { PromoCard } from "./card";
import { IPromoCards } from "@/shared/interface/cards";

interface Props {
  promoData: IPromoCards[];
}

export const PromoCards: React.FC<Props> = ({ promoData }) => {
  const colorModifiers = ["-primary", "-secondary", "-neutral"];

  return (
    <section className="promoCards">
      {promoData.slice(0, 3).map((card, index) => {
        const sizeClass = index === 0 ? "promoCard-L" : "promoCard-S";
        const colorClass = `promoCard${colorModifiers[index] || "-neutral"}`;

        return (
          <PromoCard
            key={card.id}
            className={`promoCard ${sizeClass} ${colorClass}`}
            type={card.type}
            title={card.title}
            description={card.description}
            time={card.time}
            id={card.id}
          />
        );
      })}
    </section>
  );
};