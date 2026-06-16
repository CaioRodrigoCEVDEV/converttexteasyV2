import { buildMetadata } from "@/lib/seo/metadata";
import { getDictionary, getValue } from "@/i18n/dictionary";
import { urlToLocale } from "@/i18n/types";
import { siteConfig } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import BlogPostPage from "@/components/blog/BlogPostPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = urlToLocale(locale);
  const dict = getDictionary(loc) as unknown as Record<string, unknown>;
  const title = getValue(dict, `blog.posts.${slug}.title`) || slug.replace(/-/g, " ");
  const description = getValue(dict, `blog.posts.${slug}.excerpt`) || "";

  return buildMetadata({
    title,
    description,
    path: `/${locale}/blog/${slug}`,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = urlToLocale(locale);
  const dict = getDictionary(loc) as unknown as Record<string, unknown>;
  const title = getValue(dict, `blog.posts.${slug}.title`) || slug.replace(/-/g, " ");
  const description = getValue(dict, `blog.posts.${slug}.excerpt`) || "";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteConfig.url}/${locale}/blog/${slug}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BlogPostPage slug={slug} />
    </>
  );
}
