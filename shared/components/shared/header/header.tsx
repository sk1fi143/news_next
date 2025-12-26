import React from "react";
import { Select } from "./select/select";
import { Bar } from "./bar/bar";
import { Tabs } from "./tabs/tabs";
import { Search } from "./search";
import { Logo_H_Desctop } from "../../svg/logo_H_Desctop";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__row">
        <Search />
        <Tabs />
        <Logo_H_Desctop />
        <Select />
      </div>
      <Bar />
    </header>
  );
};
