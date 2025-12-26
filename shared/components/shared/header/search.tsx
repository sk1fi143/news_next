"use client";

import React from 'react';
import { SearchIcon } from '@cmp/svg/search';
import { Close } from '@cmp/svg/close';

export const Search: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="search">
      <div className={`search__container ${isOpen ? 'open' : ''}`} onClick={!isOpen ? handleOpen : undefined}>
        <div className="search__container-icon">
          <SearchIcon />
        </div>
        
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Найти в новостях" 
          className="search__container-input"
        />
        
        <button className="search__container-button">Найти</button>
      </div>

      {isOpen && (
        <button className="search__close" onClick={handleClose}>
          <Close />
        </button>
      )}
    </div>
  );
};