import React from "react";
import { PromoCard } from "./card";
import { PromoCardData } from "./promoCard";


export const PromoCards: React.FC = () => {
  const colorModifiers = ["-primary", "-secondary", "-neutral"];

  return (
    <section className="promoCards">
      {PromoCardData.slice(0, 3).map((card, index) => {
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