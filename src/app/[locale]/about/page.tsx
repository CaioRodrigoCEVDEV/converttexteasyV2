import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { urlToLocale } from "@/i18n/types";
import { siteConfig } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import AboutContent from "@/components/pages/AboutContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildLocalizedMetadata(urlToLocale(locale), "about");
}

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About ConvertTextEasy",
    description: "Learn about ConvertTextEasy — the free, private text tool platform.",
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <AboutContent />
    </>
  );
}
