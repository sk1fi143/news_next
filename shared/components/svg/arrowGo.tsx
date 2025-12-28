import React from "react";

interface Props {
  className?: string;
}

export const ArrowGo: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M6.79297 5.29321C7.18349 4.90269 7.81651 4.90269 8.20703 5.29321L11.207 8.29321C11.5974 8.68375 11.5975 9.3168 11.207 9.70728L8.20703 12.7073C7.81656 13.0977 7.18351 13.0976 6.79297 12.7073C6.40244 12.3168 6.40244 11.6837 6.79297 11.2932L9.08594 9.00024L6.79297 6.70728C6.40244 6.31675 6.40244 5.68374 6.79297 5.29321Z"
        fill="white"
      />
    </svg>
  );
};
