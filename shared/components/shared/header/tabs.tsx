import Link from 'next/link';
import React from 'react';
import { Pages } from '@models/tabs';

export const Tabs: React.FC = () => {
  return (
    <div className='tabs'>
        {Pages.map((page) => (
            <Link href={page.link} className="tabs__item" key={page.name}>
                <span className="tabs__item-text">{page.name}</span>
            </Link>
        ))}
    </div>
  );
};