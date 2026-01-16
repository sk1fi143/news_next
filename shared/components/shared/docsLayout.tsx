import { IDocuments } from '@/shared/interface/IDocuments';
import React from 'react';

interface Props {
data: IDocuments[];
}

export const DocsLayout: React.FC<Props> = ({ data }) => {
  return (
    <div className=''>
        {data.map((doc, index) => (
            <section key={index} className=''>
                <h4 className=''>{doc.title}</h4>
                <h6 className=''>{doc.subtitle}</h6>
                {doc.numList && (
                    <ol className=''>
                      {doc.numList
                        .split("\n")
                        .map(
                          (li, liIdx) => li.trim() && <li key={liIdx}>{li}</li>
                        )}
                    </ol>
                )}

                {doc.markList && (
                    <ul className=''>
                      {doc.markList
                        .split("\n")
                        .map(
                          (li, liIdx) => li.trim() && <li key={liIdx}>{li}</li>
                        )}
                    </ul>
                )}

                <p className=''>{doc.text}</p>
            </section>
        ))}
    </div>
  );
};