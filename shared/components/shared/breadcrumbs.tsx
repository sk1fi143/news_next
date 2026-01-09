'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BreadcrumbsMap } from '@/shared/models/breadcrumbsMap';

type BreadcrumbsProps = {
  slug?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ slug }) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const pageKey = segments[0];
  const pageTitle = BreadcrumbsMap[pageKey];

  const isPageActive = segments.length === 1;
  const isSlugActive = segments.length > 1;

  return (
    <nav className="breadcrumbs">

      <Link href="/" className="breadcrumbs__text">Главная</Link>

      {pageTitle && (
        <>
          <span className="breadcrumbs__text">/</span>
          {isPageActive ? (
            <span className="breadcrumbs__text breadcrumbs__text-active">{pageTitle}</span>
          ) : (
            <Link
              href={`/${pageKey}`}
              className="breadcrumbs__text"
            >
              {pageTitle}
            </Link>
          )}
        </>
      )}

      {isSlugActive && (
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