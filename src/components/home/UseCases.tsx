"use client";

import { useTranslation } from "@/i18n/I18nProvider";

const useCases = [
  {
    key: "writers",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    color: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
  },
  {
    key: "developers",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    color: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "seoAnalysts",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
  },
  {
    key: "students",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
    color: "bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400",
  },
  {
    key: "supportTeams",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    color: "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400",
  },
];

export default function UseCases() {
  const { t } = useTranslation();

  return (
    <section className="mt-12 sm:mt-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t("home.useCases.title")}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {t("home.useCases.description")}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {useCases.map((uc) => (
          <div
            key={uc.key}
            className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-5 transition-all hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-900"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${uc.color}`}>
              {uc.icon}
            </span>
            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
              {t(`home.useCases.${uc.key}.title`)}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {t(`home.useCases.${uc.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
