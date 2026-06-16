"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";

export default function ToolCategories() {
  const { t, localeUrl } = useTranslation();
  const showFiscalTools = localeUrl === "pt";

  const categories = [
    {
      key: "textTools",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
      href: "/tools",
      color: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
    },
    {
      key: "developerTools",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      href: "/tools",
      color: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
    },
    {
      key: "seoTools",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
      href: "/tools",
      color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
    },
    {
      key: "dataConverters",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
      href: "/tools",
      color: "bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400",
    },
    {
      key: "textCleaners",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      href: "/tools",
      color: "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400",
    },
  ];

  if (showFiscalTools) {
    categories.push({
      key: "fiscalTools",
      icon: <span className="text-[11px] font-bold tracking-wide">IBS</span>,
      href: "/tools/classificacao-tributaria-ibs-cbs",
      color: "bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400",
    });
  }

  const gridClass = showFiscalTools
    ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    : "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <section className="mt-12 sm:mt-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t("home.categories.title")}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {t("home.categories.description")}
        </p>
      </div>

      <div className={gridClass}>
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={`/${localeUrl}${cat.href}`}
            className="group rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-5 transition-all hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-900 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.color} transition-colors group-hover:scale-110`}>
              {cat.icon}
            </span>
            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {t(`home.categories.${cat.key}.title`)}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {t(`home.categories.${cat.key}.description`)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
