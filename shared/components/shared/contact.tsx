import React from 'react';

interface Props {
className?: string;
title: string;
contact: string;
mail: string;
}

export const Contact: React.FC<Props> = ({ className, title, contact, mail }) => {
  return (
    <div className={className + ' contact'}>
        <h6 className="contact__title">{title}</h6>
        <span className='contact__text'>{contact}</span>
        <span className='contact__text'>{mail}</span>
    </div>
  );
};