import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { urlToLocale } from "@/i18n/types";
import LocaleLayoutClient from "./LocaleLayoutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = urlToLocale(locale);
  return buildLocalizedMetadata(loc, "home");
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = urlToLocale(locale);

  return (
    <LocaleLayoutClient initialLocale={resolvedLocale}>
      {children}
    </LocaleLayoutClient>
  );
}
