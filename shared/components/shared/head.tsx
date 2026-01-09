import React from "react";
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
      {breadcrumbs && <Breadcrumbs slug={breadcrumbsSlug} />}
      <h1 className="head__title">{title}</h1>
    </div>
  );
};
