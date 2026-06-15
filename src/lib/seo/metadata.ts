import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/types";

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
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const fullDescription = description ?? siteConfig.description;
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
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
      title: fullTitle,
      description: fullDescription,
      images: [siteConfig.ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

function localeToPath(locale: Locale): string {
  if (locale === "pt-BR") return "pt";
  return locale;
}

export function buildLocalizedMetadata(locale: Locale, page: string) {
  const dict = getDictionary(locale) as Record<string, unknown>;
  const seo = (dict.seo as Record<string, Record<string, string>>)?.[page];
  return buildMetadata({
    title: seo?.title,
    description: seo?.description,
    path: `/${localeToPath(locale)}/${page === "home" ? "" : page}`,
    locale,
  });
}
