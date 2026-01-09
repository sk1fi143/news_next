import type { MetadataRoute } from "next";

async function getAllNews() {
  // const res = await fetch('https://api.example.com/news');
  // return res.json();
  return [{ id: "1" }, { id: "2" }]; // Заглушка
}

async function getAllArticles() {
  return [{ id: "1" }, { id: "2" }]; // Заглушка
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

  const [news, articles] = await Promise.all([getAllNews(), getAllArticles()]);

  const newsUrls: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${siteUrl}/news/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((item) => ({
    url: `${siteUrl}/articles/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...newsUrls,
    ...articleUrls,
  ];
}
