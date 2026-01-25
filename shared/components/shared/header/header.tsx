"use client";

import React from "react";
import { Select } from "./select";
import { Bar } from "./bar";
import { Tabs } from "./tabs";
import { Search } from "./search";
import { CardsProps } from "@/shared/interface/cards";
import { RegionLink } from "../region-link";
import { Logo_Mob } from "../../svg/logo-mob";
import { Burger } from "../../svg/burger";
import { Cross } from "../../svg/cross";
import { BarMod } from "./bar-mob";
import { TabsMob } from "./tabs-mob";
import { Close } from "../../svg/close";
import { TabsMobileNavigation } from "./tabs-burger";
import { SearchMob } from "./search-mob";
import { Line } from "../line";
import {
  AboutDataItem,
  SocialItem,
  AboutSocialsBlock,
} from "@/shared/interface/IAbout";
import Link from "next/link";
import { Vk } from "../../svg/vk";
import { Max } from "../../svg/max";
import { Odn } from "../../svg/odn";
import { Tg } from "../../svg/tg";

interface Props {
  data: CardsProps[];
  AboutData: AboutDataItem[];
}

export const Header: React.FC<Props> = ({ data, AboutData }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isDesctopBurgerOpen, setIsDesctopBurgerOpen] = React.useState(false);
  React.useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBurgerOpen]);

  return (
    <header className={`header ${isBurgerOpen ? "header-fixed" : ""}`}>
      <div className="header__row">
        <RegionLink className="header__logo-mob" href="/">
          <Logo_Mob className="header__logo-mob" />
        </RegionLink>
        <Search
          isOpen={isSearchOpen}
          onOpen={() => setIsSearchOpen(true)}
          onClose={() => setIsSearchOpen(false)}
        />
        {!isSearchOpen && (
          <>
            <RegionLink href="/" className="header__row-logo">
              <Logo_Mob className="header__row-logo" />
            </RegionLink>
            <Select topics={data} />
            <div
              className="header__desctopBurger"
              onClick={() => setIsDesctopBurgerOpen(!isDesctopBurgerOpen)}
            >
              <Burger />
            </div>
          </>
        )}
        <div className="header__info-mob">
          <SearchMob />
          <div
            className="header__burger-circle"
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
          >
            <Burger />
          </div>
        </div>
      </div>
      <Bar />
      <div
        className={`desctopNav ${isDesctopBurgerOpen ? "open" : ""}`}
        aria-hidden={!isDesctopBurgerOpen}
      >
        <div
          className="desctopNav__close"
          onClick={() => setIsDesctopBurgerOpen(false)}
        >
          <Cross />
        </div>
        <Line />
        <Tabs onItemClick={() => setIsDesctopBurgerOpen(false)}/>
        <Line />
        <p className="desctopNav__text">
          Подпишитесь на наши социальные сети чтобы не пропустить свежие новости
        </p>
        <div className="desctopNav__socials">
          {(() => {
            const maybeSocials = AboutData.find(
              (item) => item.slug === "Социальные сети",
            );

            const isSocials = (item: AboutDataItem | undefined): item is AboutSocialsBlock =>
              !!(item && (item as AboutSocialsBlock).data && Array.isArray((item as AboutSocialsBlock).data));

            const socials: SocialItem[] = isSocials(maybeSocials)
              ? maybeSocials.data
              : [];

            return socials.map((social) => {
              const ICONS = { Vk, Tg, Odn, Max };
              const Icon = ICONS[social.icon as unknown as keyof typeof ICONS];
            return (
              <Link
                href={social.link}
                className="desctopNav__socials-item"
                key={social.name}
              >
                {Icon ? <Icon fill="#252525" /> : null}
              </Link>
            );
            });
          })()}
        </div>
      </div>
      {isBurgerOpen && (
        <div className="burger-block">
          <div
            className="header__burger-circle cross"
            onClick={() => setIsBurgerOpen(false)}
          >
            <Cross />
          </div>
          <div className="header__burger-line"></div>
          <h6 className="header__burger-title">Категории новостей</h6>
          <Select topics={data} onItemClick={() => setIsBurgerOpen(false)} />
          <div className="header__burger-line"></div>
          <div className="header__burger-category">
            <h6 className="header__burger-title">Регион</h6>
            <BarMod onItemClick={() => setIsBurgerOpen(false)} />
          </div>
          <div className="header__burger-line"></div>
          <TabsMob onItemClick={() => setIsBurgerOpen(false)} />
        </div>
      )}
      <div className="header__mob-navigation">
        <TabsMobileNavigation onItemClick={() => setIsBurgerOpen(false)} />
        <div
          onClick={() => setIsBurgerOpen(!isBurgerOpen)}
          className="header__mob-nagigation-el"
        >
          <Burger
            className={`header__mob-navigation-burger ${isBurgerOpen ? "" : "hidden"}`}
          />
          <Close
            className={`header__mob-navigation-close ${isBurgerOpen ? "hidden" : ""}`}
          />
          <span
            className={`header__mob-navigation-txt ${isBurgerOpen ? "yellow" : ""}`}
          >
            Меню
          </span>
        </div>
      </div>
    </header>
  );
};
