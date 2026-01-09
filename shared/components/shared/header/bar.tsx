import React from 'react';
import { CardsProps } from '@/shared/interface/cards';
import { RegionLink } from '../region-link';

interface Props {
  Topics: CardsProps[];
}

export const Bar: React.FC<Props> = ({ Topics }) => {
  return (
    <div className="topBar">
      <RegionLink href="/news" className="topBar__item" key="all">
        <span className="topBar__item-text">Все материалы</span>
      </RegionLink>

      {Topics.map((topic) => (
        <RegionLink href={`/news/${topic.slug}`} className="topBar__item" key={topic.slug}>
          <span className="topBar__item-text">{topic.title}</span>
        </RegionLink>
      ))}
    </div>
  );
};