import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { loadIbsCbsDataset } from "@/lib/ibs-cbs";
import { urlToLocale } from "@/i18n/types";
import IbsCbsLookup from "@/components/tools/ibs-cbs/IbsCbsLookup";

const TITLE = "Consulta Classificação Tributária IBS/CBS";
const DESCRIPTION =
  "Consulte cClassTrib, CST IBS/CBS, reduções, base legal e documentos fiscais aplicáveis.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = urlToLocale(locale);

  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: `/${locale}/tools/classificacao-tributaria-ibs-cbs`,
    locale: resolvedLocale,
    noIndex: resolvedLocale !== "pt-BR",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = urlToLocale(locale);

  if (resolvedLocale !== "pt-BR") {
    notFound();
  }

  const dataset = await loadIbsCbsDataset();

  return (
    <IbsCbsLookup
      metadata={dataset.metadata}
      cClassTribRecords={dataset.cClassTribRecords}
      cstRecords={dataset.cstRecords}
    />
  );
}
