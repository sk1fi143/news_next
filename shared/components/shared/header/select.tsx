"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Regions } from "@/shared/models/regions";
import { RegionIcon } from "@cmp/svg/region";
import { ArrowDown } from "@/shared/components/svg/arrowDown";
import { Check } from "@/shared/components/svg/check";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface IRegion {
  name: string;
  logo: string | StaticImport;
  url: string;
}

export const Select = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const selectedRegion = Regions.find((r) => r.url === firstSegment) ?? null;

  const getPathWithoutRegion = () => {
    const currentSegments = [...segments];
    if (currentSegments.length && Regions.some((r) => r.url === currentSegments[0])) {
      currentSegments.shift();
    }
    return "/" + currentSegments.join("/");
  };

  const handleSelect = (region: IRegion | null) => {
    setOpen(false);
    const basePath = getPathWithoutRegion();

    // Формируем новый путь
    const newPath = region 
      ? `/${region.url}${basePath === "/" ? "" : basePath}`
      : (basePath === "/" ? "/" : basePath);

    router.push(newPath);
  };

  return (
    <div className="select">
      <div className="select__visible" onClick={() => setOpen((prev) => !prev)}>
        {selectedRegion ? (
          <Image
            src={selectedRegion.logo}
            alt={selectedRegion.name}
            width={24}
            height={24}
          />
        ) : (
          <RegionIcon />
        )}

        <span className="select__visible-text">
          {selectedRegion ? selectedRegion.name : "Все регионы"}
        </span>

        <div
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowDown />
        </div>
      </div>

      {open && (
        <div className="select__hidden">
          {Regions.map((region) => (
            <div
              key={region.url}
              className="select__hidden-item"
              onClick={() => handleSelect(region)}
            >
              <Image
                src={region.logo}
                alt={region.name}
                width={20}
                height={20}
              />
              <span>{region.name}</span>
              {selectedRegion?.url === region.url && <Check />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
