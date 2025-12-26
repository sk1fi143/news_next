import React from 'react';

interface Props {
className?: string;
}

export const ArrowDown: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M12.627 7.62629C13.0175 7.23617 13.6506 7.2359 14.041 7.62629C14.431 8.01671 14.431 8.64993 14.041 9.04035L10.707 12.3734C10.3166 12.7638 9.68351 12.7637 9.29297 12.3734L5.95996 9.04035C5.56944 8.64983 5.56944 8.01681 5.95996 7.62629C6.3505 7.23601 6.98358 7.23585 7.37402 7.62629L10 10.2523L12.627 7.62629Z"
        fill="#252525"
      />
    </svg>
  );
};