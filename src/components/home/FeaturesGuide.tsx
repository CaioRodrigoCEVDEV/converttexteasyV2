"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";

const featureSlugs = [
  "lowercase",
  "uppercase",
  "strikethrough",
  "capitalize",
  "reverse",
  "alternating-case",
  "italic",
  "morse",
] as const;

export default function FeaturesGuide() {
  const { t, localeUrl } = useTranslation();

  return (
    <section className="mt-12 sm:mt-16">
      <div className="text-center mb-10">
        <span className="inline-block rounded-full bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
          {t("home.features.label")}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t("home.features.title")}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {t("home.features.description")}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {featureSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/${localeUrl}/tools/${slug}`}
            className="group rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-5 transition-all hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-900 hover:-translate-y-0.5"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {t(`home.features.cards.${slug}.title`)}
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(`home.features.cards.${slug}.description`)}
            </p>
            <div className="mt-3 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">
              <code className="text-[11px] text-slate-600 dark:text-slate-400 font-mono break-all">
                {t(`home.features.cards.${slug}.example`)}
              </code>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
