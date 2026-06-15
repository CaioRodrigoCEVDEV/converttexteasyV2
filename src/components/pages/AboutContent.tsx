"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import PageShell from "@/components/layout/PageShell";

export default function AboutContent() {
  const { t } = useTranslation();

  return (
    <PageShell
      title={t("about.title")}
      description={t("about.description")}
    >
      <div className="space-y-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <h2 className="mt-8 text-xl font-semibold text-slate-900 dark:text-white">
          {t("about.principlesTitle")}
        </h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
            <span>
              <strong className="text-slate-900 dark:text-white">{t("about.principle1")}</strong>{" "}
              {t("about.principle1Desc")}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
            <span>
              <strong className="text-slate-900 dark:text-white">{t("about.principle2")}</strong>{" "}
              {t("about.principle2Desc")}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
            <span>
              <strong className="text-slate-900 dark:text-white">{t("about.principle3")}</strong>{" "}
              {t("about.principle3Desc")}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
            <span>
              <strong className="text-slate-900 dark:text-white">{t("about.principle4")}</strong>{" "}
              {t("about.principle4Desc")}
            </span>
          </li>
        </ul>
        <p className="mt-8">{t("about.closing")}</p>
      </div>
    </PageShell>
  );
}
