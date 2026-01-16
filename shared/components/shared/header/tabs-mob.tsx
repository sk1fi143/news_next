"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Pages } from "@/shared/models/tabs";
import { RegionLink } from "../region-link";
import { Regions } from "@/shared/models/regions";

export const TabsMob: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const hasRegion = Regions.some((r) => r.url === segments[0]);
  const cleanPath = "/" + (hasRegion ? segments.slice(1) : segments).join("/");

  return (
    <div className="tabs-mob">
      {Pages.map((page) => {
        const href = `/${page.link}`;
        const isActive = cleanPath === href || cleanPath.startsWith(`${href}/`);
        return (
          <RegionLink
            href={`/${page.link}`}
            key={page.name}
            className="tabs-mob__item"
          >
            <span
              className={`tabs-mob__item-text ${
                isActive ? "tabs-mob__item-text-active" : ""
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