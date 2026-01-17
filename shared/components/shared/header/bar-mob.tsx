import React from 'react';
import { CardsProps } from '@/shared/interface/cards';
import { RegionLink } from '../region-link';

interface Props {
  Topics: CardsProps[];
  onItemClick?: () => void; 
}

export const BarMod: React.FC<Props> = ({ Topics, onItemClick  }) => {
  return (
    <div className="topBar-mob">
      {Topics.map((topic) => (
        <RegionLink href={`/news/${topic.slug}`} className="topBar-mob__item-mob" key={topic.slug}  onClick={onItemClick}>
          <span className="topBar-mob__item-text-mob">{topic.title}</span>
        </RegionLink>
      ))}
    </div>
  );
};