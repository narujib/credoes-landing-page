import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const siteUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2024-01-01T00:00:00.000Z");
  const routes = [""];
  const locales = ["id", "en"] as const;

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const isHome = route === "";
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: isHome ? "weekly" : "monthly",
        priority: isHome ? 1.0 : 0.8,
        alternates: {
          languages: {
            id: `${siteUrl}/id${route}`,
            en: `${siteUrl}/en${route}`,
            "x-default": `${siteUrl}/id${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
