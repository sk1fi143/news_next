/**
 * Утилиты для генерации микроразметки schema.org в формате JSON-LD
 * 
 * Schema.org - это словарь структурированных данных, который помогает
 * поисковым системам лучше понимать содержимое страницы.
 * JSON-LD (JavaScript Object Notation for Linked Data) - формат данных,
 * который вставляется в <head> страницы в виде <script type="application/ld+json">
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

/**
 * Получить полный URL страницы
 */
export function getFullUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Получить URL изображения (полный путь)
 */
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${SITE_URL}${imagePath}`;
}

/**
 * Форматировать дату в формат ISO 8601 для schema.org
 */
export function formatDate(dateString: string): string {
  // Парсим дату вида "18 января 2026, 14:30"
  const months: Record<string, string> = {
    января: "01", февраля: "02", марта: "03", апреля: "04",
    мая: "05", июня: "06", июля: "07", августа: "08",
    сентября: "09", октября: "10", ноября: "11", декабря: "12",
  };

  const parts = dateString.match(/(\d+)\s+(\w+)\s+(\d+),\s+(\d+):(\d+)/);
  if (!parts) {
    // Если формат не совпал, пытаемся создать дату из строки или возвращаем текущую
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    } catch (e) {
      // Игнорируем ошибки
    }
    return new Date().toISOString();
  }

  const [, day, month, year, hours, minutes] = parts;
  const monthNum = months[month] || "01";
  
  // Формат: YYYY-MM-DDTHH:MM:SS+03:00 (для России обычно UTC+3)
  // Альтернативно можно использовать toISOString() после создания Date объекта
  try {
    const date = new Date(
      parseInt(year),
      parseInt(monthNum) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
    // Используем UTC и добавляем смещение для Москвы (UTC+3)
    const yearStr = date.getFullYear();
    const monthStr = String(date.getMonth() + 1).padStart(2, "0");
    const dayStr = String(date.getDate()).padStart(2, "0");
    const hoursStr = String(date.getHours()).padStart(2, "0");
    const minutesStr = String(date.getMinutes()).padStart(2, "0");
    
    return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}:00+03:00`;
  } catch (e) {
    // Fallback к простому форматированию
    return `${year}-${monthNum}-${day.padStart(2, "0")}T${hours.padStart(2, "0")}:${minutes}:00+03:00`;
  }
}

/**
 * Генерация разметки NewsArticle для страниц новостей
 * 
 * NewsArticle - специальный тип для новостных статей
 * Содержит: заголовок, описание, изображение, автора, даты публикации и изменения
 */
export interface NewsArticleSchemaProps {
  headline: string; // Заголовок статьи
  description?: string; // Краткое описание (из первого абзаца)
  imageUrl: string; // URL главного изображения
  author: string; // Имя автора
  datePublished: string; // Дата публикации (формат: "18 января 2026, 14:30")
  dateModified?: string; // Дата последнего обновления
  url: string; // URL страницы статьи
  articleBody?: string; // Полный текст статьи (опционально)
}

export function generateNewsArticleSchema({
  headline,
  description,
  imageUrl,
  author,
  datePublished,
  dateModified,
  url,
  articleBody,
}: NewsArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: headline,
    image: getImageUrl(imageUrl) ? [getImageUrl(imageUrl)] : [],
    datePublished: formatDate(datePublished),
    dateModified: dateModified ? formatDate(dateModified) : formatDate(datePublished),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Новая Версия Приволжье",
      logo: {
        "@type": "ImageObject",
        url: getFullUrl("/logo.png"), // Если есть логотип организации
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getFullUrl(url),
    },
  } as const;

  if (description) {
    (schema as any).description = description;
  }

  if (articleBody) {
    (schema as any).articleBody = articleBody;
  }

  return schema;
}

/**
 * Генерация разметки Article для обычных статей
 * (используется для страниц articles)
 */
export function generateArticleSchema({
  headline,
  description,
  imageUrl,
  author,
  datePublished,
  dateModified,
  url,
}: NewsArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    image: getImageUrl(imageUrl) ? [getImageUrl(imageUrl)] : [],
    datePublished: formatDate(datePublished),
    dateModified: dateModified ? formatDate(dateModified) : formatDate(datePublished),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Новая Версия Приволжье",
      logo: {
        "@type": "ImageObject",
        url: getFullUrl("/logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getFullUrl(url),
    },
  } as const;

  if (description) {
    (schema as any).description = description;
  }

  return schema;
}

/**
 * Генерация разметки Organization (организация)
 * Информация о компании/организации сайта
 */
export interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: string;
  email?: string;
  telephone?: string;
}

export function generateOrganizationSchema({
  name,
  url,
  logo,
  description,
  address,
  email,
  telephone,
}: OrganizationSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: name,
    url: url,
  };

  if (logo) {
    schema.logo = getFullUrl(logo);
  }

  if (description) {
    schema.description = description;
  }

  if (address || email || telephone) {
    schema.contactPoint = {
      "@type": "ContactPoint",
    };

    if (address) schema.address = address;
    if (email) schema.contactPoint.email = email;
    if (telephone) schema.contactPoint.telephone = telephone;
  }

  return schema;
}

/**
 * Генерация разметки WebSite (веб-сайт)
 * Основная информация о сайте, включая поисковую строку
 */
export interface WebSiteSchemaProps {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string; // URL страницы поиска с параметром q
}

export function generateWebSiteSchema({
  name,
  url,
  description,
  searchUrl,
}: WebSiteSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    url: url,
  };

  if (description) {
    schema.description = description;
  }

  if (searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${searchUrl}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

/**
 * Генерация разметки BreadcrumbList (хлебные крошки)
 * Показывает путь навигации: Главная > Раздел > Подраздел
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getFullUrl(item.url),
    })),
  };
}

/**
 * Генерация разметки ItemList (список элементов)
 * Используется для списков новостей/статей на странице
 */
export interface ItemListSchemaProps {
  name: string; // Название списка
  description?: string;
  items: Array<{
    name: string;
    url: string;
    description?: string;
    image?: string;
    datePublished?: string;
  }>;
}

export function generateItemListSchema({
  name,
  description,
  items,
}: ItemListSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    itemListElement: items.map((item, index) => {
      const listItem: any = {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          name: item.name,
          url: getFullUrl(item.url),
        },
      };

      if (item.description) {
        listItem.item.description = item.description;
      }

      if (item.image) {
        listItem.item.image = getImageUrl(item.image);
      }

      if (item.datePublished) {
        listItem.item.datePublished = formatDate(item.datePublished);
      }

      return listItem;
    }),
  };

  if (description) {
    schema.description = description;
  }

  return schema;
}
