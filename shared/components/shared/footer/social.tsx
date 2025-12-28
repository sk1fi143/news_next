import React from 'react';
import { Socials } from '@models/social';
import Link from 'next/link';

export const Social: React.FC = () => {
  return (
    <div className='social-footer'>
        {Socials.map((social) => {
            const Icon = social.icon;
            return (
                <Link href={social.link} className="social-footer__item" key={social.name}>
                    <Icon fill="white" />
                </Link>
            );
        })}
    </div>
  );
};