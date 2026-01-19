"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbsMap } from "@/shared/models/breadcrumbsMap";
import { Regions } from "@/shared/models/regions";
import { RegionLink } from "./region-link";

type BreadcrumbsProps = {
  slug?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ slug }) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const cleanSegments = Regions.some((r) => r.url === segments[0])
    ? segments.slice(1)
    : segments;

  const pageKey = cleanSegments[0];
  const pageTitle = pageKey ? BreadcrumbsMap[pageKey] : null;

  const isPageActive = cleanSegments.length === 1;
  const isSlugActive = cleanSegments.length > 1;

  return (
    <nav className="breadcrumbs">
      <RegionLink href="/" className="breadcrumbs__text">
        Главная
      </RegionLink>

      {pageTitle && (
        <>
          <span className="breadcrumbs__text">/</span>

          {isPageActive ? (
            <span className="breadcrumbs__text breadcrumbs__text-active">
              {pageTitle}
            </span>
          ) : (
            <RegionLink href={`/${pageKey}`} className="breadcrumbs__text">
              {pageTitle}
            </RegionLink>
          )}
        </>
      )}

      {isSlugActive && slug && (
        <>
          <span className="breadcrumbs__text">/</span>
          <span className="breadcrumbs__text breadcrumbs__text-active">
            {slug}
          </span>
        </>
      )}
    </nav>
  );
};
