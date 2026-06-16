"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import { transformMap } from "@/lib/tools/transforms";
import { getToolMeta } from "@/utils/textTransforms";
import ToolEditor from "@/components/tools/ToolEditor";
import ToolPageWrapper from "@/components/tools/ToolPageWrapper";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import UTMGenerator from "@/components/tools/UTMGenerator";
import RegexTester from "@/components/tools/RegexTester";
import UUIDGenerator from "@/components/tools/UUIDGenerator";

const specialTools: Record<string, React.ReactNode> = {
  "password-generator": <PasswordGenerator />,
  "utm-generator": <UTMGenerator />,
  "regex-tester": <RegexTester />,
  "uuid-generator": <UUIDGenerator />,
};

const toolPageSlugs = new Set([
  ...Object.keys(transformMap),
  ...Object.keys(specialTools),
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

  if (specialTools[slug]) {
    return (
      <ToolPageWrapper slug={slug}>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
              {t("common.freePrivate")}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {t(`tools.${slug}.name`)}
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {t(`tools.${slug}.description`)}
            </p>
          </div>
          {specialTools[slug]}
        </div>
      </ToolPageWrapper>
    );
  }

  const fn = transformMap[slug];

  return (
    <ToolPageWrapper slug={slug}>
      <ToolEditor
        title={t(`tools.${slug}.name`)}
        description={t(`tools.${slug}.description`)}
        placeholder={t("common.placeholder")}
        transforms={[{ label: t(`home.transforms.${meta.i18nKey}`), fn: fn as (s: string) => string }]}
      />
    </ToolPageWrapper>
  );
}
