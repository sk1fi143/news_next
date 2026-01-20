"use client";

import React from "react";
import { SearchIcon } from "@cmp/svg/search";
import { useRouter } from "next/navigation";

export const SearchMob = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null); // реф для input
  const router = useRouter();

  const handleSearch = () => {
    const query = searchValue.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setSearchValue("");
    }
  };

  // Фокус на инпут при монтировании или открытии
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className="header__mob-search"
      onSubmit={(e) => {
        e.preventDefault(); // чтобы не перезагружалась страница
        handleSearch();
      }}
    >
      <div className="header__mob-search-icon">
        <SearchIcon />
      </div>

      <input
        ref={inputRef} // реф только на input
        type="search"
        placeholder="Найти в новостях"
        className="header__mob-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        enterKeyHint="search"
        inputMode="search"
      />
    </form>
  );
};

