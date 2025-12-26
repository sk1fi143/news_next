"use client";

import React from "react";
import { RegionIcon } from "@cmp/svg/region";
import { ArrowDown } from "@/shared/components/svg/arrowDown";
import { Regions } from "./data";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Check } from "@/shared/components/svg/check";
import { useRouter } from 'next/navigation';

interface IRegion {
  name: string;
  logo: string | StaticImport;
  url: string;
}

export const Select = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState<IRegion | null>(
    null
  );
  const router = useRouter();

  const handleSelect = (region: IRegion) => {
    setSelectedRegion(region);
    setOpen(false);
    router.push(`${window.location.pathname}?region=${region.url}`, undefined);
  };

  return (
    <div className="select">
      <div className="select__visible" onClick={() => setOpen(!open)}>
        {selectedRegion ? (
          <Image
            src={selectedRegion.logo}
            alt={selectedRegion.name}
            width={24}
            height={24}
            className="select__visible-icon"
          />
        ) : (
          <RegionIcon />
        )}
        <span className="select__visible-text">
          {selectedRegion ? selectedRegion.name : "Выбрать регион"}
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
              className="select__hidden-item"
              key={region.name}
              onClick={() => handleSelect(region)}
            >
              <Image
                src={region.logo}
                alt={region.name}
                className="select__hidden-item-icon"
              />
              <span className="select__hidden-item-text">{region.name}</span>
              {selectedRegion?.name === region.name && (
                <Check className="select__hidden-item-check" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
