"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { REGIONS_CODES } from "@models/regions";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export const RegionLink = ({ className ,href, children, ...props }: Props) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const currentRegion =
    segments.length && REGIONS_CODES.includes(segments[0])
      ? segments[0]
      : null;

  const finalHref =
    currentRegion && typeof href === "string"
      ? `/${currentRegion}${href}`
      : href;

  return (
    <Link className={className} href={finalHref} {...props}>
      {children}
    </Link>
  );
};