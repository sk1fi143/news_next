import { IDocuments } from "@/shared/interface/IDocuments";
import React from "react";
import { Head } from "../shared/head";

interface Props {
  data: IDocuments[];
  title: string;
}

export const DocsLayout: React.FC<Props> = ({ data, title }) => {
  return (
    <main>
      <Head breadcrumbs title={title} />
      <div className="docs">
        {data.map((doc, index) => (
          <section key={index} className="docs__section">
            <h4 className="docs__section-title">{doc.title}</h4>
            <h6 className="docs__section-subtitle">{doc.subtitle}</h6>
            {doc.numList && (
              <ol className="docs__section-numlist">
                {doc.numList.split("\n").map(
                  (li, liIdx) =>
                    li.trim() && (
                      <li key={liIdx} className="docs__section-numlist-item">
                        {li}
                      </li>
                    ),
                )}
              </ol>
            )}

            {doc.markList && (
              <ul className="docs__section-marklist">
                {doc.markList.split("\n").map(
                  (li, liIdx) =>
                    li.trim() && (
                      <li key={liIdx} className="docs__section-marklist-item">
                        {li}
                      </li>
                    ),
                )}
              </ul>
            )}

            <p className="docs__section-text">{doc.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
};
