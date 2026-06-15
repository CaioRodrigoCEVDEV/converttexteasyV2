"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import PageShell from "@/components/layout/PageShell";

const sections = [
  "acceptance",
  "useOfService",
  "userContent",
  "intellectualProperty",
  "disclaimer",
  "limitation",
  "changes",
];

export default function TermsContent() {
  const { t } = useTranslation();

  return (
    <PageShell
      title={t("terms.title")}
      description={t("terms.lastUpdated")}
    >
      <div className="space-y-8 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {sections.map((section) => (
          <section key={section}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t(`terms.${section}.title`)}
            </h2>
            <p className="mt-2">{t(`terms.${section}.body`)}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
