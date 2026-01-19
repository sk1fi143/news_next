"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { REGIONS_CODES, RegionCode } from "@models/regionCodes";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

function isRegionCode(code: string): code is RegionCode {
  return REGIONS_CODES.includes(code as RegionCode);
}

export const RegionLink = ({ className ,href, children, ...props }: Props) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const currentRegion =
    segments.length && isRegionCode(segments[0])
      ? segments[0]
      : null;

  const finalHref =
    currentRegion && typeof href === "string"
      ? `/${currentRegion}${href}`
      : href;

  return (
    <Link rel="canonical" className={className} href={finalHref} {...props}>
      {children}
    </Link>
  );
};