/**
 * Компонент для вставки JSON-LD разметки в <head> страницы
 * 
 * Использование:
 * <JsonLd data={schemaObject} />
 */
import React from "react";

interface JsonLdProps {
  data: object;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
