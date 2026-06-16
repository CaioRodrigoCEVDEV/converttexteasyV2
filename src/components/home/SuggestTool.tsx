"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";

export default function SuggestTool() {
  const { t, localeUrl } = useTranslation();

  return (
    <section className="mt-12 sm:mt-16">
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl shadow-sm p-6 sm:p-10 text-center">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {t("home.suggestTool.title")}
        </h2>
        <Link
          href={`/${localeUrl}/contact`}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t("home.suggestTool.button")}
        </Link>
      </div>
    </section>
  );
}
