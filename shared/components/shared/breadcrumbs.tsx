"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BreadcrumbsMap } from "@/shared/models/breadcrumbsMap";
import { Regions } from "@/shared/models/regions";
import { RegionLink } from "./region-link";

type BreadcrumbsProps = {
  slug?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ slug }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const hasRegionPrefix = firstSegment && Regions.some((r) => r.url === firstSegment);
  const regionFromPath = hasRegionPrefix ? firstSegment : null;
  const regionFromQuery = searchParams?.get("region") || null;
  const regionCode = regionFromPath || regionFromQuery;
  const regionDisplayName = regionCode
    ? Regions.find((r) => r.url === regionCode)?.name || null
    : null;

  const cleanSegments = hasRegionPrefix ? segments.slice(1) : segments;

  const pageKey = cleanSegments[0];
  const pageTitle = pageKey ? BreadcrumbsMap[pageKey] : null;

  const isPageActive = cleanSegments.length === 1 && !slug;
  const isSlugActive = Boolean(slug);

  // Показ региона только на главной и на списковых страницах news/articles (не на страницах отдельного материала)
  const isListingPage = cleanSegments.length === 0 || (pageKey === "news" || pageKey === "articles") && cleanSegments.length === 1;
  const showRegion = Boolean(regionDisplayName) && isListingPage;

  return (
    <nav className="breadcrumbs">
      <RegionLink href="/" className="breadcrumbs__text">
        Главная
      </RegionLink>

      {showRegion && (
        <>
          <span className="breadcrumbs__text">/</span>
          <span
            style={{ cursor: "default" }}
            className={`breadcrumbs__text ${cleanSegments.length === 0 && !slug ? "breadcrumbs__text-active" : ""}`}
          >
            {regionDisplayName}
          </span>
        </>
      )}

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
