import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getVisibleTools } from "@/data/tools";
import { localeUrls } from "@/i18n/types";

const blogSlugs = ["uppercase-guide", "remove-spaces-guide", "free-text-tools"];

interface RouteEntry {
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

const staticRoutes: RouteEntry[] = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "tools", changeFrequency: "weekly", priority: 0.8 },
  { path: "about", changeFrequency: "monthly", priority: 0.6 },
  { path: "contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "privacy-policy", changeFrequency: "monthly", priority: 0.5 },
  { path: "terms", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const localeUrl of localeUrls) {
    for (const route of staticRoutes) {
      const url = route.path
        ? `${siteConfig.url}/${localeUrl}/${route.path}`
        : `${siteConfig.url}/${localeUrl}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }

    for (const slug of blogSlugs) {
      entries.push({
        url: `${siteConfig.url}/${localeUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const tool of getVisibleTools(localeUrl)) {
      entries.push({
        url: `${siteConfig.url}/${localeUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
