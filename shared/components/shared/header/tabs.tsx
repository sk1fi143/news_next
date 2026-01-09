'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Pages } from '@/shared/models/tabs';

export const Tabs: React.FC = () => {
  const pathname = usePathname(); // /news/123

  return (
    <div className="tabs">
      {Pages.map((page) => {
        const isActive = pathname.startsWith(`/${page.link}`);

        return (
          <Link
            href={`/${page.link}`}
            key={page.name}
            className='tabs__item'
          >
            <span className={`tabs__item-text ${isActive ? 'tabs__item-text-active' : ''}`}>{page.name}</span>
          </Link>
        );
      })}
    </div>
  );
};