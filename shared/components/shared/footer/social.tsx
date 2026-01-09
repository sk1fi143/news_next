import React from 'react';
import Link from 'next/link';
import { SocialItem } from '@/shared/interface/IAbout';
import { Vk } from "@cmp/svg/vk";
import { Tg } from "@cmp/svg/tg";
import { Odn } from "@cmp/svg/odn"

interface Props {
  data: SocialItem[];
}

const ICONS = { Vk, Tg, Odn };

export const Social: React.FC<Props> = ({data}) => {
  return (
    <div className='social-footer'>
        {data.map((social) => {
            const Icon = ICONS[social.icon as unknown as keyof typeof ICONS];
            return (
                <Link href={social.link} className="social-footer__item" key={social.name}>
                    {Icon ? <Icon fill="white" /> : null}
                </Link>
            );
        })}
    </div>
  );
};