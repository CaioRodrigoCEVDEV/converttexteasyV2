import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { urlToLocale } from "@/i18n/types";
import { siteConfig } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import ContactContent from "@/components/pages/ContactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildLocalizedMetadata(urlToLocale(locale), "contact");
}

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ConvertTextEasy",
    description: "Get in touch with ConvertTextEasy.",
    url: `${siteConfig.url}/contact`,
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <ContactContent />
    </>
  );
}
