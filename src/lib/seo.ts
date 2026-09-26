import type { Metadata } from "next";

const SITE_URL = "https://stopher-malik.co.za";

type PageOpenGraph = NonNullable<Metadata["openGraph"]>;

export function pageOpenGraph(path: string): PageOpenGraph {
  return {
    type: "website",
    url: `${SITE_URL}${path}`,
    images: [
      {
        url: `${SITE_URL}/assets/og-image-1200x630.png`,
        width: 1200,
        height: 630,
        alt: "SMK Web Design — Professional Website Design in Johannesburg, South Africa",
      },
    ],
    locale: "en_ZA",
    siteName: "SMK Web Design",
  };
}
