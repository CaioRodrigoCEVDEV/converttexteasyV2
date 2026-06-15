import { buildMetadata } from "@/lib/seo/metadata";
import BlogPostPage from "@/components/blog/BlogPostPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return buildMetadata({
    title: `Blog - ${slug.replace(/-/g, " ")}`,
    description: `Read our blog post about ${slug.replace(/-/g, " ")}.`,
    path: `/${locale}/blog/${slug}`,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
