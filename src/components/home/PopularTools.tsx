"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";

const popular = [
  { slug: "uppercase", icon: "UC", color: "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400" },
  { slug: "lowercase", icon: "lc", color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400" },
  { slug: "json-formatter", icon: "{ }", color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400" },
  { slug: "kebabcase", icon: "Sl", color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400" },
  { slug: "camelcase", icon: "cC", color: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400" },
  { slug: "password-generator", icon: "Pw", color: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400" },
  { slug: "regex-tester", icon: ".*", color: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400" },
  { slug: "utm-generator", icon: "Ut", color: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400" },
  { slug: "uuid-generator", icon: "Ui", color: "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400" },
  { slug: "lorem-ipsum-generator", icon: "Li", color: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400" },
  { slug: "html-formatter", icon: "Ht", color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400" },
  { slug: "remove-extra-spaces", icon: "Sp", color: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400" },
];

export default function PopularTools() {
  const { t, localeUrl } = useTranslation();

  return (
    <section className="mt-12 sm:mt-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t("home.popularTools.title")}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {t("home.popularTools.description")}
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {popular.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${localeUrl}/tools/${tool.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-4 transition-all hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-900 hover:-translate-y-0.5"
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${tool.color}`}>
              {tool.icon}
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {t(`tools.${tool.slug}.name`)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
