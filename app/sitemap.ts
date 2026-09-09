import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://acmecorp.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/privacy-policy", "/terms-of-service"];
  const locales = ["id", "en"] as const;

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const isHome = route === "";
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: isHome ? "weekly" : "monthly",
        priority: isHome ? 1.0 : 0.6,
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
