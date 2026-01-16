import React from 'react';
import { CardsProps } from '@/shared/interface/cards';
import { RegionLink } from '../region-link';

interface Props {
  Topics: CardsProps[];
}

export const BarMod: React.FC<Props> = ({ Topics }) => {
  return (
    <div className="topBar-mob">
      {Topics.map((topic) => (
        <RegionLink href={`/news/${topic.slug}`} className="topBar-mob__item-mob" key={topic.slug}>
          <span className="topBar-mob__item-text-mob">{topic.title}</span>
        </RegionLink>
      ))}
    </div>
  );
};