"use client";

import React from "react";
import { SearchIcon } from "@cmp/svg/search";
import { Close } from "@cmp/svg/close";
import { useRouter } from "next/navigation";

interface SearchProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const Search: React.FC<SearchProps> = ({ isOpen, onOpen, onClose }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const query = searchValue.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
      setSearchValue("");
    }
  };

  React.useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className={`search ${isOpen ? "search__full-width" : ""}`} ref={containerRef}>
      {/* Используем form, чтобы Enter на мобильных срабатывал */}
      <form
        className={`search__container ${isOpen ? "open" : ""}`}
        onClick={!isOpen ? onOpen : undefined}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="search__container-icon">
          <SearchIcon />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Найти в новостях"
          className="search__container-input"
          enterKeyHint="search"   // подсказка для клавиатуры на мобиле
          inputMode="search"      // оптимизирует клавиатуру для поиска
        />

        {/* Кнопка submit — даже если скрыта, клавиатура на мобиле сможет отправить форму */}
        <button
          type="submit"
          className="search__container-button"
          onClick={(e) => e.stopPropagation()}
        >
          Найти
        </button>
      </form>

      {isOpen && (
        <button className="search__close" onClick={onClose}>
          <Close />
        </button>
      )}
    </div>
  );
};
