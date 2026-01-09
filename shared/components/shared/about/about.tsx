"use client";

import React from "react";
import { CardsAboutUs } from "./card-about";
import { DataCardAbout } from "@/shared/interface/IAbout";

interface Props {
  data: DataCardAbout;
}

export const AboutUs: React.FC<Props> = ({ data }) => {
  return (
    <div className="about-us">
      <p className="about-us__txt">
        {data.text}
      </p>
      <div className="about-us__cards">
        {data.cards.map((card, i) => (
          <CardsAboutUs key={i} title={card.title} text={card.text} />
        ))}
      </div>
    </div>
  );
};
