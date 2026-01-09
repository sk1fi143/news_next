"use client";

import React from "react";
import { Select } from "./select/select";
import { Bar } from "./bar/bar";
import { Tabs } from "./tabs";
import { Search } from "./search";
import { Logo_H_Desctop } from "../../svg/logo_H_Desctop";
import Link from "next/link";

export const Header: React.FC = () => {
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
            <Link href="/" className="header__row-logo">
              <Logo_H_Desctop className="header__row-logo" />
            </Link>
            <Select />
          </>
        )}
      </div>
      <Bar />
    </header>
  );
};
