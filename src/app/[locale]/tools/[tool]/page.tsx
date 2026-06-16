import { buildMetadata } from "@/lib/seo/metadata";
import { tools as toolsData } from "@/data/tools";
import { getDictionary, getValue } from "@/i18n/dictionary";
import { urlToLocale } from "@/i18n/types";
import ToolPageClient from "./ToolPageClient";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { locale: localeUrl, tool } = await params;
  const locale = urlToLocale(localeUrl);
  const dict = getDictionary(locale);

  const toolName = getValue(dict, `tools.${tool}.name`) || toolsData.find((t) => t.slug === tool)?.name || "Tool";
  const toolDesc = getValue(dict, `tools.${tool}.description`) || toolsData.find((t) => t.slug === tool)?.description || "Free online text tool.";

  return buildMetadata({
    title: toolName,
    description: toolDesc,
    path: `/${localeUrl}/tools/${tool}`,
    locale,
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
