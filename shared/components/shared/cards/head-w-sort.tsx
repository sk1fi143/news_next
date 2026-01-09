import React from 'react';
import { Sort } from '../sort';

interface Props {
title: string;
}

export const HeadWSort: React.FC<Props> = ({ title }) => {
  return (
    <div className="HeadWSort">
        <h2 className='HeadWSort__title'>{title}</h2>
        <Sort />
    </div>
  );
};