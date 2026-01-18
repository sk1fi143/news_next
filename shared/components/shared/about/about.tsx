"use client";

import React from "react";
import { CardsAboutUs } from "./card-about";
import { AboutTextBlock } from "@/shared/interface/IAbout";

interface Props {
  data: AboutTextBlock;
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
