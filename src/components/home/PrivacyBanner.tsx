"use client";

import { useTranslation } from "@/i18n/I18nProvider";

const items = [
  {
    key: "noAccount",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>
    ),
  },
  {
    key: "browser",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    key: "fast",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    key: "workflows",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 6.75v-.75c0-1.117.822-2.04 1.92-2.247m12 0A2.25 2.25 0 0119.5 6v.75m-12 0v8.25m12-8.25v8.25m-12 0h12m-12 0a2.25 2.25 0 01-2.25-2.25V9m12 6.75a2.25 2.25 0 002.25-2.25V9" />
      </svg>
    ),
  },
];

export default function PrivacyBanner() {
  const { t } = useTranslation();

  return (
    <section className="mt-12 sm:mt-16">
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-900/50 backdrop-blur-xl shadow-sm p-6 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {t("home.privacy.title")}
          </h2>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.key} className="text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60 text-indigo-600 dark:text-indigo-400">
                {item.icon}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                {t(`home.privacy.${item.key}.title`)}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {t(`home.privacy.${item.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
