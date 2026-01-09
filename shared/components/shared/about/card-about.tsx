import React from "react";

interface Props {
  title: string;
  text: string;
}

export const CardsAboutUs: React.FC<Props> = ({ title, text }) => {
  return (
    <div className="about-card">
      <h4 className="about-card__title">{title}</h4>
      <p className="about-card__txt">{text}</p>
    </div>
  );
};
