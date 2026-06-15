"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import type { Locale, LocaleUrl } from "./types";
import { defaultLocale, localeToUrl, localeDirections } from "./types";
import { getDictionary, getValue } from "./dictionary";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
  localeUrl: LocaleUrl;
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key: string) => key,
  localeUrl: "en" as LocaleUrl,
});

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);
      try {
        localStorage.setItem("locale", localeToUrl(newLocale));
      } catch {
        // localStorage unavailable
      }
      try {
        document.cookie = `locale=${localeToUrl(newLocale)};path=/;max-age=31536000;SameSite=Lax`;
      } catch {
        // cookie unavailable
      }

      const newUrl = localeToUrl(newLocale);
      const path = window.location.pathname;
      const parts = path.split("/").filter(Boolean);
      if (parts.length > 0) {
        parts[0] = newUrl;
      }
      const newPath = "/" + parts.join("/") + window.location.search + window.location.hash;
      router.replace(newPath);
    },
    [router],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirections[locale] || "ltr";
  }, [locale]);

  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      const raw = getValue(dictionary as unknown as Record<string, unknown>, key);
      if (params) {
        return raw.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`);
      }
      return raw;
    },
    [dictionary],
  );

  const localeUrl = useMemo(() => localeToUrl(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t, localeUrl }),
    [locale, setLocale, t, localeUrl],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext);
}
