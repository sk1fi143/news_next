import React from "react";

interface Props {
  className?: string;
  fill: string;
}

export const Tg: React.FC<Props> = ({ className, fill }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M14.6558 2.81396C14.6747 2.80541 15.7505 2.32295 15.7505 3.14014L13.3774 15.5269C13.3749 15.5334 13.0418 16.3844 12.1333 15.9741L6.65869 11.6274L6.6333 11.6147C7.37278 10.9271 13.1073 5.58722 13.3579 5.34521C13.7456 4.97051 13.5046 4.74768 13.0542 5.03076L4.58447 10.6011L1.31689 9.4624C1.31689 9.4624 0.80289 9.27272 0.753418 8.86084C0.703926 8.45086 1.3263 8.22766 1.3335 8.2251L14.6558 2.81396Z"
        fill={fill}
      />
    </svg>
  );
};
