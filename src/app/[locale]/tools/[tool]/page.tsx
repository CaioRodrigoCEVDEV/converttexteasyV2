import { buildMetadata } from "@/lib/seo/metadata";
import { tools as toolsData } from "@/data/tools";
import ToolPageClient from "./ToolPageClient";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { locale, tool } = await params;
  const toolData = toolsData.find((t) => t.slug === tool);
  return buildMetadata({
    title: toolData?.name ?? "Tool",
    description: toolData?.description ?? "Free online text tool.",
    path: `/${locale}/tools/${tool}`,
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { tool } = await params;
  return <ToolPageClient slug={tool} />;
}
