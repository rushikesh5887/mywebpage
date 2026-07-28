import { Meta } from "@once-ui-system/core";
import type { Metadata } from "next";

type SeoMetadataInput = Parameters<typeof Meta.generate>[0] & {
  keywords?: string[];
};

const defaultKeywords = [
  "Rushikesh Amrutsamanvar",
  "Dr. Rushikesh Amrutsamanvar",
  "Rushikesh B. Amrutsamanvar",
  "R. B. Amrutsamanvar",
  "applied data scientist",
  "mobility analytics",
  "geospatial analytics",
  "urban systems",
  "transportation research",
  "traffic trajectory analysis",
  "mixed traffic",
];

export const authorProfileLinks = {
  orcid: "https://orcid.org/0000-0002-6879-5220",
};

export function canonicalUrl(baseURL: string, path = "") {
  const normalizedBaseURL = baseURL.replace(/\/$/, "");

  if (!path || path === "/") {
    return `${normalizedBaseURL}/`;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBaseURL}${normalizedPath.replace(/\/$/, "")}/`;
}

export function resourceUrl(baseURL: string, path: string) {
  const normalizedBaseURL = baseURL.replace(/\/$/, "");

  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${normalizedBaseURL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function generateSeoMetadata({ keywords = [], ...metadata }: SeoMetadataInput): Metadata {
  const canonical = metadata.canonical || canonicalUrl(metadata.baseURL, metadata.path);
  const generated = Meta.generate({
    ...metadata,
    canonical,
  });

  return {
    ...generated,
    alternates: {
      ...(typeof generated.alternates === "object" ? generated.alternates : {}),
      canonical,
    },
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])),
    robots: generated.robots || "index, follow",
  };
}
