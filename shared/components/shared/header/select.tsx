"use client";

import React, { useState } from "react";
import { ArrowDown } from "@/shared/components/svg/arrowDown";
import { CardsProps } from "@/shared/interface/cards";
import { RegionLink } from "../region-link";
import { Union } from "../../svg/union";

interface Props {
  topics: CardsProps[];
  onItemClick?: () => void;
}
export const Select: React.FC<Props> = ({ topics, onItemClick }) => {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<CardsProps | null>(null);

  const handleSelect = (topic: CardsProps) => {
    setSelectedTopic(topic);
    setOpen(false);
    onItemClick?.();
  };

  return (
    <div className="select">
      <div className="select__visible" onClick={() => setOpen((prev) => !prev)}>
        <Union />

        <span className="select__visible-text">
          {selectedTopic ? selectedTopic.title : "Выбрать категорию"}
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
          {topics.map((topic, idx) => (
            <RegionLink
              onClick={() => handleSelect(topic)}
              className="select__hidden-item"
              href={`/news?topic=${topic.slug}`}
              key={idx}
            >
              <span className="select__hidden-item-text">{topic.title}</span>
            </RegionLink>
          ))}
        </div>
      )}
    </div>
  );
};
