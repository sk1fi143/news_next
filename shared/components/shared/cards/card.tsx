import { CardProps } from '@/shared/interface/cards';
import Image from 'next/image';
import React from 'react';
import CardImg from '@img/card.png';
import { RegionLink } from '../region-link';

export const Card: React.FC<CardProps> = ({ className, id, title, location, time, imageUrl }) => {
  return (
    <RegionLink href={`/news/${id}`} className={className}>
        <Image quality={75} src={CardImg} alt={title} className="newsCard__img" />
        <div className="newsCard__description">
        <h6 className="newsCard__description-title">{title}</h6>
        <div className="newsCard__description-info">
          <span className="newsCard__description-txt">{time} назад</span>
          <span className="newsCard__description-txt">|</span>
          <span className="newsCard__description-txt">{location}</span>
        </div>
      </div>
    </RegionLink>
  );
};