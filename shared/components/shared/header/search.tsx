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
  const containerRef = React.useRef<HTMLDivElement>(null); // реф для контейнера поиска
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      onClose();
      setSearchValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Обработчик клика вне компонента
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`search ${isOpen ? "search__full-width" : ""}`} ref={containerRef}>
      <div
        className={`search__container ${isOpen ? "open" : ""}`}
        onClick={!isOpen ? onOpen : undefined}
      >
        <div className="search__container-icon">
          <SearchIcon />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Найти в новостях"
          className="search__container-input"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSearch();
          }}
          className="search__container-button"
        >
          Найти
        </button>
      </div>

      {isOpen && (
        <button className="search__close" onClick={onClose}>
          <Close />
        </button>
      )}
    </div>
  );
};