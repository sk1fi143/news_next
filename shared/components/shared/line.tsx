import React from 'react';

interface Props {
  className?: string;
}

export const Line: React.FC<Props> = ({ className }) => {
  return (
    <div className={className + ' line'}></div>
  );
};