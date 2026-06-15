"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import { transformMap } from "@/lib/tools/transforms";
import { getToolMeta } from "@/utils/textTransforms";
import ToolEditor from "@/components/tools/ToolEditor";

const toolPageSlugs = new Set([
  ...Object.keys(transformMap),
]);

export default function ToolPageClient({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const meta = getToolMeta(slug);

  if (!meta || !toolPageSlugs.has(slug)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t(`tools.${slug}.name`)}
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          {t("common.comingSoon")}
        </p>
      </div>
    );
  }

  const fn = transformMap[slug];

  return (
    <ToolEditor
      title={t(`tools.${slug}.name`)}
      description={t(`tools.${slug}.description`)}
      placeholder={t("common.placeholder")}
      transforms={[{ label: t(`home.transforms.${meta.i18nKey}`), fn: fn as (s: string) => string }]}
    />
  );
}
