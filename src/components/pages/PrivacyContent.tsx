"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import PageShell from "@/components/layout/PageShell";

const sections = [
  "dataCollection",
  "cookies",
  "analytics",
  "thirdParty",
  "advertising",
  "contactForm",
  "userRights",
  "contact",
];

export default function PrivacyContent() {
  const { t } = useTranslation();

  return (
    <PageShell
      title={t("privacy.title")}
      description={t("privacy.lastUpdated")}
    >
      <div className="space-y-8 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {sections.map((section) => (
          <section key={section}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t(`privacy.${section}.title`)}
            </h2>
            <p className="mt-2">{t(`privacy.${section}.body`)}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
