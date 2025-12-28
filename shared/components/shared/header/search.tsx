"use client";

import React from 'react';
import { SearchIcon } from '@cmp/svg/search';
import { Close } from '@cmp/svg/close';

interface SearchProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const Search: React.FC<SearchProps> = ({ isOpen, onOpen, onClose }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`search ${isOpen ? 'search__full-width' : ''}`}>
      <div className={`search__container ${isOpen ? 'open' : ''}`} 
        onClick={!isOpen ? onOpen : undefined}>
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
        <button className="search__close" onClick={onClose}>
          <Close />
        </button>
      )}
    </div>
  );
};