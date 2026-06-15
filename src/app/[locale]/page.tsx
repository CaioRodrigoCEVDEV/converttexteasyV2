import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { urlToLocale } from "@/i18n/types";
import HomePage from "./HomePage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = urlToLocale(locale);
  return buildLocalizedMetadata(loc, "home");
}

export default function Page() {
  return <HomePage />;
}
