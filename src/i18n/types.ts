export type Locale = "en" | "pt-BR" | "es" | "fr" | "it" | "de" | "ru" | "ar" | "zh" | "ja";
export type LocaleUrl = "en" | "pt" | "es" | "fr" | "it" | "de" | "ru" | "ar" | "zh" | "ja";

export const locales: Locale[] = ["en", "pt-BR", "es", "fr", "it", "de", "ru", "ar", "zh", "ja"];
export const localeUrls: LocaleUrl[] = ["en", "pt", "es", "fr", "it", "de", "ru", "ar", "zh", "ja"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  de: "Deutsch",
  ru: "Русский",
  ar: "العربية",
  zh: "中文",
  ja: "日本語",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  "pt-BR": "🇧🇷",
  es: "🇪🇸",
  fr: "🇫🇷",
  it: "🇮🇹",
  de: "🇩🇪",
  ru: "🇷🇺",
  ar: "🇸🇦",
  zh: "🇨🇳",
  ja: "🇯🇵",
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  "pt-BR": "ltr",
  es: "ltr",
  fr: "ltr",
  it: "ltr",
  de: "ltr",
  ru: "ltr",
  ar: "rtl",
  zh: "ltr",
  ja: "ltr",
};

export const defaultLocale: Locale = "en";

export function localeToUrl(locale: Locale): LocaleUrl {
  if (locale === "pt-BR") return "pt";
  return locale as LocaleUrl;
}

export function urlToLocale(url: string): Locale {
  if (url === "pt") return "pt-BR";
  if (locales.includes(url as Locale)) return url as Locale;
  return defaultLocale;
}

export interface Translations {
  [key: string]: string | Translations;
}
