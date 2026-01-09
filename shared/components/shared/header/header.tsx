"use client";

import React from "react";
import { Select } from "./select";
import { Bar } from "./bar";
import { Tabs } from "./tabs";
import { Search } from "./search";
import { Logo_H_Desctop } from "../../svg/logo_H_Desctop";
import { CardsProps } from "@/shared/interface/cards";
import { RegionLink } from "../region-link";

interface Props {
  data: CardsProps[];
}

export const Header: React.FC<Props> = ({data}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  return (
    <header className="header">
      <div className="header__row">
        <Search
          isOpen={isSearchOpen}
          onOpen={() => setIsSearchOpen(true)}
          onClose={() => setIsSearchOpen(false)}
        />
        {!isSearchOpen && (
          <>
            <Tabs />
            <RegionLink href="/" className="header__row-logo">
              <Logo_H_Desctop className="header__row-logo" />
            </RegionLink>
            <Select />
          </>
        )}
      </div>
      <Bar Topics={data}/>
    </header>
  );
};
