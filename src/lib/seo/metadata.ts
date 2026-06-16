import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/types";
import { locales, localeToUrl } from "@/i18n/types";

function ogLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: "en_US",
    "pt-BR": "pt_BR",
    es: "es_ES",
    fr: "fr_FR",
    it: "it_IT",
    de: "de_DE",
    ru: "ru_RU",
    ar: "ar_SA",
    zh: "zh_CN",
    ja: "ja_JP",
  };
  return map[locale] ?? "en_US";
}

function localeToPath(locale: Locale): string {
  return localeToUrl(locale);
}

function buildAlternates(path: string, locale: Locale) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    const locUrl = localeToPath(loc);
    const localizedPath =
      path === ""
        ? `${siteConfig.url}/${locUrl}`
        : `${siteConfig.url}/${locUrl}${path.startsWith("/") ? path : `/${path}`}`;
    languages[loc] = localizedPath;
  }
  languages["x-default"] = `${siteConfig.url}/`;
  return {
    canonical: `${siteConfig.url}/${localeToPath(locale)}${path.startsWith("/") ? path : `/${path}`}`,
    languages,
  };
}

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  locale = "en" as Locale,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  locale?: Locale;
} = {}): Metadata {
  const fullDescription = description ?? siteConfig.description;
  const canonicalPath = path.startsWith("/")
    ? `${siteConfig.url}${path}`
    : path
      ? `${siteConfig.url}/${path}`
      : siteConfig.url;

  const alternates = path !== undefined 
    ? buildAlternates(path, locale)
    : undefined;

  return {
    title,
    description: fullDescription,
    metadataBase: new URL(siteConfig.url),
    keywords: siteConfig.keywords,
    alternates,
    openGraph: {
      title: title ?? siteConfig.name,
      description: fullDescription,
      url: canonicalPath,
      siteName: siteConfig.name,
      locale: ogLocale(locale),
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description: fullDescription,
      images: [siteConfig.ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function buildLocalizedMetadata(
  locale: Locale,
  page: string,
  pathOverride?: string,
) {
  const dict = getDictionary(locale) as Record<string, unknown>;
  const seo = (dict.seo as Record<string, Record<string, string>>)?.[page];
  const pagePath =
    pathOverride ?? (page === "home" ? "" : page);
  return buildMetadata({
    title: seo?.title,
    description: seo?.description,
    path: `/${localeToPath(locale)}/${pagePath}`,
    locale,
  });
}
