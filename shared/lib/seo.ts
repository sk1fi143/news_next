import { Metadata } from "next";

type MetadataOpenGraph = NonNullable<Metadata["openGraph"]>;

type BackendOpenGraph = {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  images?: Array<string | { url: string }>;
};

type BackendMetadata = {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string | string[];
  url?: string;
  type?: string;
  robots?: Metadata["robots"];
  alternates?: Metadata["alternates"];
  openGraph?: BackendOpenGraph;
};

type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

const FALLBACK_SITE_URL = "https://your-site.com";
const META_API_URL =
  process.env.META_API_URL ||
  process.env.NEXT_PUBLIC_META_API_URL ||
  process.env.NEXT_PUBLIC_API_URL;

const toArray = <T>(value?: T | T[]): T[] =>
  Array.isArray(value) ? value.filter(Boolean) : value ? [value] : [];

const normalizeImages = (
  images?: Array<string | { url: string }> | string,
): MetadataOpenGraph["images"] => {
  const list = toArray(images);
  if (!list.length) return undefined;

  return list.map((item) =>
    typeof item === "string" ? { url: item } : { url: item.url },
  );
};

export const getSiteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, "");

export const buildCanonicalUrl = (pathname: string) => {
  const siteUrl = getSiteUrl();
  if (!pathname.startsWith("/")) return pathname;
  return `${siteUrl}${pathname}`;
};

export async function fetchBackendMetadata(
  pathname: string,
): Promise<BackendMetadata | null> {
  if (!META_API_URL) return null;

  try {
    const url = `${META_API_URL.replace(/\/$/, "")}/meta?path=${encodeURIComponent(pathname)}`;
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.warn("[meta] Backend returned non-ok response", response.status);
      return null;
    }

    const data = (await response.json()) as BackendMetadata;
    return data;
  } catch (error) {
    console.error("[meta] Failed to fetch metadata", error);
    return null;
  }
}

export async function buildPageMetadata(
  pathname: string,
  fallback: {
    title: string;
    description: string;
    image?: string | string[];
    type?: OpenGraphType;
    keywords?: string | string[];
    robots?: Metadata["robots"];
  },
): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const canonical = buildCanonicalUrl(pathname);
  const remote = await fetchBackendMetadata(pathname);

  const title = remote?.title ?? fallback.title;
  const description = remote?.description ?? fallback.description;
  const images =
    normalizeImages(remote?.openGraph?.images) ||
    normalizeImages(remote?.image) ||
    normalizeImages(fallback.image);
  const ogType: OpenGraphType =
    (remote?.openGraph?.type as OpenGraphType) ??
    (remote?.type as OpenGraphType) ??
    fallback.type ??
    "website";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: remote?.keywords ?? fallback.keywords,
    robots: remote?.robots ?? fallback.robots,
    alternates: {
      canonical: remote?.alternates?.canonical ?? canonical,
    },
    openGraph: {
      title: remote?.openGraph?.title ?? title,
      description: remote?.openGraph?.description ?? description,
      url: remote?.openGraph?.url ?? remote?.url ?? canonical,
      type: ogType,
      images,
    },
  };
}
