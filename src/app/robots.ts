import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const normalizedBaseUrl = baseUrl.startsWith("http")
  ? baseUrl
  : `https://${baseUrl}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", normalizedBaseUrl).toString(),
  };
}
