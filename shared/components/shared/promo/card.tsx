import React from 'react';
import { RegionLink } from '../region-link';

interface Props {
className?: string;
type: string;
title: string;
description: string;
time: string;
id: string | number;
}

export const PromoCard: React.FC<Props> = ({ className, type, title, description, time, id }) => {
  return (
    <RegionLink href={`/news/${id}`} className={className}>
        <div className={`promoCard__type`}>
            <span className={`promoCard__type-text`}>{type}</span>
        </div>
        <h3 className={`promoCard__title`}>{title}</h3>
        <p className={`promoCard__description`}>{description}</p>
        <span className={`promoCard__time`}>{time} назад</span>
        <button className={`promoCard__button`}>Читать материал</button>
    </RegionLink>
  );
};