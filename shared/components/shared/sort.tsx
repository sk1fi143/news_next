"use client";

import React from "react";
import { ArrowDown } from "@/shared/components/svg/arrowDown";
import { Check } from "@/shared/components/svg/check";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Sorting } from '@/shared/components/svg/sorting';


interface IRegion {
  name: string;
  url: string;
}

export const Sort = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState<IRegion | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (filter: IRegion) => {
    setSelectedFilter(filter);
    setOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set('sorted', filter.url);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const Filters = [
    { name: 'По популярности', url: 'popular' },
    { name: 'Сначала новые', url: 'new' },
    { name: 'Сначала старые', url: 'old' },
    { name: 'По рейтингу', url: 'rating' }
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="select main-sort" ref={wrapperRef}>
      <div className="select__visible sort" onClick={() => setOpen(!open)}>
        <Sorting />
        <span className="select__visible-text">
          {selectedFilter ? selectedFilter.name : "Сначала новые"}
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
          {Filters.map((filter, i) => (
            <div
              className="select__hidden-item"
              key={i}
              onClick={() => handleSelect(filter)}
            >
              <span className="select__hidden-item-text">{filter.name}</span>
              {selectedFilter?.name === filter.name && (
                <Check className="select__hidden-item-check" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};