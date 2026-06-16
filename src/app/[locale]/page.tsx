import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { urlToLocale } from "@/i18n/types";
import { siteConfig } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
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
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/en/tools/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: siteConfig.description,
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={webAppJsonLd} />
      <JsonLd data={orgJsonLd} />
      <HomePage />
    </>
  );
}
