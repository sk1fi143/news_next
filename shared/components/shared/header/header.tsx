"use client";

import React from "react";
import { Select } from "./select";
import { Bar } from "./bar";
import { Tabs } from "./tabs";
import { Search } from "./search";
import { CardsProps } from "@/shared/interface/cards";
import { RegionLink } from "../region-link";
import { Logo_Mob } from "../../svg/logo-mob";
import { SearchIcon } from "../../svg/search";
import { Burger } from "../../svg/burger";
import { Cross } from "../../svg/cross";
import { BarMod } from "./bar-mob";
import { TabsMob } from "./tabs-mob";
import { Close } from "../../svg/close";
import { TabsMobileNavigation } from "./tabs-burger";

interface Props {
  data: CardsProps[];
}

export const Header: React.FC<Props> = ({ data }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
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
        <RegionLink href="/" className="header__row-logo">
          <Logo_Mob className="header__row-logo" />
        </RegionLink>
        <Search
          isOpen={isSearchOpen}
          onOpen={() => setIsSearchOpen(true)}
          onClose={() => setIsSearchOpen(false)}
        />
        {!isSearchOpen && (
          <>
            <Tabs />
            <Select topics={data}/>
          </>
        )}
        <div className="header__info-mob">
          <div className="header__mob-search">
            <div className="header__mob-search-icon">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Найти в новостях"
              className="header__mob-input"
            />
          </div>
          <div
            className="header__burger-circle"
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
          >
            <Burger />
          </div>
        </div>
      </div>
      <Bar />
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
          <Select topics={data} onItemClick={() => setIsBurgerOpen(false)}/>
          <div className="header__burger-line"></div>
          <div className="header__burger-category">
            <h6 className="header__burger-title">Регион</h6>
            <BarMod onItemClick={() => setIsBurgerOpen(false)}/>
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
