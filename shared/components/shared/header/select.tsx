"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowDown } from "@/shared/components/svg/arrowDown";
import { CardsProps } from "@/shared/interface/cards";
import { RegionLink } from "../region-link";
import { Union } from "../../svg/union";
import { useSearchParams, usePathname } from "next/navigation";
import { RegionCode, REGIONS_CODES } from "@/shared/models/regionCodes";

interface Props {
  topics: CardsProps[];
  onItemClick?: () => void;
}
export const Select: React.FC<Props> = ({ topics, onItemClick }) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectRef = useRef<HTMLDivElement>(null);

  // Получаем текущий topic из URL
  const currentTopicSlug = searchParams.get("topic");
  
  // Находим выбранную тему на основе URL параметра
  const selectedTopic = currentTopicSlug
    ? topics.find((topic) => topic.slug === currentTopicSlug) || null
    : null;

  const handleSelect = () => {
    setOpen(false);
    onItemClick?.();
  };

  // Закрытие при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Фильтруем категории, оставляя только уникальные по slug
  const uniqueTopics = topics.filter((topic, index, self) =>
    index === self.findIndex((t) => t.slug === topic.slug)
  );

  return (
    <div className="select" ref={selectRef}>
      <div className="select__visible" onClick={() => setOpen((prev) => !prev)}>
        <Union />

        <span className="select__visible-text">
          {selectedTopic ? selectedTopic.title : "Выбрать рубрику"}
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
          {uniqueTopics.map((topic) => {
            // Определяем, на какой странице мы находимся (news или articles).
            // Учитываем возможный префикс региона: /{region}/articles
            const segments = pathname.split("/").filter(Boolean);
            const firstSegment = segments[0];
            const hasRegionPrefix = firstSegment && REGIONS_CODES.includes(firstSegment as RegionCode);
            const currentSegment = hasRegionPrefix ? segments[1] : firstSegment;
            const isArticlesPage = currentSegment === "articles";
            const href = isArticlesPage
              ? `/articles?topic=${topic.slug}`
              : `/news?topic=${topic.slug}`;
            
            return (
              <RegionLink
                onClick={() => handleSelect()}
                className="select__hidden-item"
                href={href}
                key={topic.slug}
              >
                <span className="select__hidden-item-text">{topic.title}</span>
              </RegionLink>
            );
          })}
        </div>
      )}
    </div>
  );
};
