import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { urlToLocale } from "@/i18n/types";
import PrivacyContent from "@/components/pages/PrivacyContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildLocalizedMetadata(urlToLocale(locale), "privacy");
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
