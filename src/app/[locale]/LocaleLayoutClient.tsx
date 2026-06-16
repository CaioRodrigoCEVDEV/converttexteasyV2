"use client";

import { I18nProvider } from "@/i18n/I18nProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/i18n/types";

export default function LocaleLayoutClient({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <ThemeProvider>
      <I18nProvider key={initialLocale} initialLocale={initialLocale}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  );
}
