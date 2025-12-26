import React from 'react';
import { Topics } from './data';
import Link from 'next/link';

export const Bar: React.FC = () => {
  return (
    <div className='topBar'>
        {Topics.map((topic) => (
            <Link href={topic.link} className="topBar__item" key={topic.name}>
                <span className="topBar__item-text">{topic.name}</span>
            </Link>
        ))}
    </div>
  );
};