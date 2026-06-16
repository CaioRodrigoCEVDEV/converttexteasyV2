"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "@/i18n/I18nProvider";

const posts = [
  { slug: "uppercase-guide", icon: "Aa" },
  { slug: "remove-spaces-guide", icon: "▦" },
  { slug: "free-text-tools", icon: "🧰" },
];

export default function BlogContent() {
  const { t, locale, localeUrl } = useTranslation();

  const publishDate = useMemo(() => {
    const date = new Date("2026-06-15T12:00:00Z");
    const localeForDate = locale === "pt-BR" ? "pt-BR" : locale;
    return new Intl.DateTimeFormat(localeForDate, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }, [locale]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm p-6 sm:p-10 text-center">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            {t("blog.title")}
          </p>
          <p className="mt-1 text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("blog.subtitle")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${localeUrl}/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6 transition-all hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10 hover:-translate-y-0.5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-lg font-bold text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors">
              {post.icon}
            </div>
            <div className="mb-3">
              <span className="inline-block rounded-md bg-slate-50 dark:bg-slate-700 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {t(`blog.posts.${post.slug}.category`)}
              </span>
            </div>
            <h2 className="text-base font-semibold leading-snug text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {t(`blog.posts.${post.slug}.title`)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
              {t(`blog.posts.${post.slug}.excerpt`)}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {t("blog.publishedOn")} {publishDate}
              </span>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
                {t("blog.readMore")} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
