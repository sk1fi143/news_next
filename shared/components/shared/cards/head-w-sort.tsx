import React from 'react';
import { Sort } from '../sort';
import { Suspense } from 'react';

interface Props {
title: string;
}

export const HeadWSort: React.FC<Props> = ({ title }) => {
  return (
    <div className="HeadWSort">
        <h2 className='HeadWSort__title'>{title}</h2>
        <Suspense fallback={<div>Загрузка...</div>}>
        <Sort />
        </Suspense>
    </div>
  );
};