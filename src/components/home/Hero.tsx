"use client";

import { useTranslation } from "@/i18n/I18nProvider";

const badgeKeys = ["free", "noLogin", "browser", "multiLang"] as const;

const badgeIcons: Record<string, string> = {
  free: "🎁",
  noLogin: "🔑",
  browser: "💻",
  multiLang: "🌐",
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-2 sm:pt-12 sm:pb-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {badgeKeys.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60"
              >
                <span className="text-xs">{badgeIcons[key]}</span>
                {t(`home.hero.badges.${key}`)}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-slate-500 dark:text-slate-400 leading-relaxed">
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
