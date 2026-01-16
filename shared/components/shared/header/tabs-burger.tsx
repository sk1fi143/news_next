// components/tabs-mobile-navigation.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Regions } from "@/shared/models/regions";
import { Home } from "../../svg/home";
import { Book } from "../../svg/book";
import { CloseBook } from "../../svg/bookClose";
import { RegionLink } from "../region-link";

const MobileNavItems = [
  {
    name: "Главная",
    link: "",
    icon: Home,
    className: "header__mob-nagigation-el",
  },
  {
    name: "Статьи",
    link: "articles",
    icon: Book,
    className: "header__mob-nagigation-el",
  },
  {
    name: "Новости",
    link: "news",
    icon: CloseBook,
    className: "header__mob-nagigation-el",
  },
];

export const TabsMobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const hasRegion = Regions.some((r) => r.url === segments[0]);
  const cleanPath = "/" + (hasRegion ? segments.slice(1) : segments).join("/");

  return (
    <>
      {MobileNavItems.map((item) => {
        const IconComponent = item.icon;
        const href = `/${item.link}`;
        const isActive = cleanPath === href || cleanPath.startsWith(`${href}/`);
        
        return (
          <RegionLink
            key={item.name}
            href={href}
            className={`${item.className} ${isActive ? "active" : ""}`}
          >
            <IconComponent className={isActive ? "active-icon" : ""} />
            <span className={`header__mob-navigation-txt ${isActive ? "active-text" : ""}`}>
              {item.name}
            </span>
          </RegionLink>
        );
      })}
    </>
  );
};