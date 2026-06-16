import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { urlToLocale } from "@/i18n/types";
import { siteConfig } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import BlogContent from "@/components/pages/BlogContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildLocalizedMetadata(urlToLocale(locale), "blog");
}

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ConvertTextEasy Blog",
    description: "Tips and guides about online text conversion and formatting.",
    url: `${siteConfig.url}/blog`,
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <BlogContent />
    </>
  );
}
