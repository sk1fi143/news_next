import React from 'react';
import { Pages } from '@models/tabs';
import { RegionLink } from '../region-link';

export const Tabs: React.FC = () => {
  return (
    <div className='tabs-footer'>
        {Pages.map((page) => (
            <RegionLink href={`/${page.link}`} className="tabs-footer__item" key={page.name}>
                <span className="tabs-footer__item-text">{page.name}</span>
            </RegionLink>
        ))}
    </div>
  );
};