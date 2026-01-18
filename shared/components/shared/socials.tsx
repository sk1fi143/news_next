import { SocialItem } from '@/shared/interface/IAbout';
import Link from 'next/link';
import React from 'react';
import { Vk } from "@cmp/svg/vk";
import { Tg } from "@cmp/svg/tg";
import { Odn } from "@cmp/svg/odn"
import { Max } from '../svg/max';

interface Props {
soc: SocialItem[];
}

const ICONS = { Vk, Tg, Odn, Max };

export const Socials: React.FC<Props> = ({ soc }) => {
  return (
    <div className="socials">
      {soc.map((social) => {
        const Icon = ICONS[social.icon as unknown as keyof typeof ICONS];
        return (
          <Link href={social.link} className="socials__item" key={social.name}>
            {Icon ? <Icon className='socials__item-icon' fill="#000000" /> : null}
          </Link>
        );
      })}
    </div>
  );
};