import React, { Suspense } from "react";
import { Breadcrumbs } from "./breadcrumbs";

interface Props {
  breadcrumbs?: boolean;
  breadcrumbsSlug?: string;
  title: string;
}

export const Head: React.FC<Props> = ({
  breadcrumbs,
  breadcrumbsSlug,
  title,
}) => {
  return (
    <div className="head">
      {breadcrumbs && (
        <Suspense fallback={null}>
          <Breadcrumbs slug={breadcrumbsSlug} />
        </Suspense>
      )}
      <h1 className="head__title">{title}</h1>
    </div>
  );
};
