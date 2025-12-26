import React from "react";

interface Props {
  className?: string;
}

export const SearchIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <circle
        cx="8.85714"
        cy="8.85714"
        r="6.85714"
        stroke="#252525"
        strokeWidth="2"
      />
      <path
        d="M14.5713 14.5714L17.9999 18"
        stroke="#252525"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
