"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { RegionLink } from "../region-link";
import { Pages } from "@/shared/models/tabs";
import { Regions } from "@/shared/models/regions";

interface Props {
  onItemClick?: () => void;
}

export const Tabs: React.FC<Props> = ({ onItemClick }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const hasRegion = Regions.some((r) => r.url === segments[0]);
  const cleanPath = "/" + (hasRegion ? segments.slice(1) : segments).join("/");

  return (
    <div className="tabs">
      {Pages.map((page) => {
        const href = `/${page.link}`;
        const isActive = cleanPath === href || cleanPath.startsWith(`${href}/`);
        return (
          <RegionLink
            onClick={onItemClick}
            href={`/${page.link}`}
            key={page.name}
            className="tabs__item"
          >
            <span
              className={`tabs__item-text ${
                isActive ? "tabs__item-text-active" : ""
              }`}
            >
              {page.name}
            </span>
          </RegionLink>
        );
      })}
    </div>
  );
};
