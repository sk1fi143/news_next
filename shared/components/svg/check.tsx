import React from 'react';

interface Props {
className?: string;
}

export const Check: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M5 10L8.53553 13.5355L15.6058 6.46444"
        stroke="#252525"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};