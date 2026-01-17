import { IDocuments } from '@/shared/interface/IDocuments';
import React from 'react';

interface Props {
data: IDocuments[];
}

export const DocsLayout: React.FC<Props> = ({ data }) => {
  return (
    <div className='docs'>
        {data.map((doc, index) => (
            <section key={index} className='docs__section'>
                <h4 className='docs__section-title'>{doc.title}</h4>
                <h6 className='docs__section-subtitle'>{doc.subtitle}</h6>
                {doc.numList && (
                    <ol className='docs__section-numlist'>
                      {doc.numList
                        .split("\n")
                        .map(
                          (li, liIdx) => li.trim() && <li key={liIdx} className='docs__section-numlist-item'>{li}</li>
                        )}
                    </ol>
                )}

                {doc.markList && (
                    <ul className='docs__section-marklist'>
                      {doc.markList
                        .split("\n")
                        .map(
                          (li, liIdx) => li.trim() && <li key={liIdx} className='docs__section-marklist-item'>{li}</li>
                        )}
                    </ul>
                )}

                <p className='docs__section-text'>{doc.text}</p>
            </section>
        ))}
    </div>
  );
};