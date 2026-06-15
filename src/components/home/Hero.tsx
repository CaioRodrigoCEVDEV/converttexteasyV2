"use client";

import { useTranslation } from "@/i18n/I18nProvider";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-2 sm:pt-10 sm:pb-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-2 max-w-lg mx-auto text-base text-slate-500 dark:text-slate-400">
            {t("home.hero.subtitle")}
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {t("home.hero.tagline")}
          </p>
        </div>
      </div>
    </section>
  );
}
