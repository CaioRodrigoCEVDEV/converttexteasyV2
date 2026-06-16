"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "@/i18n/I18nProvider";
import PageShell from "@/components/layout/PageShell";

interface BlogPostPageProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const { t, locale, localeUrl } = useTranslation();

  const bodyRaw = t(`blog.posts.${slug}.body`);
  const bodyParagraphs = useMemo(() => {
    if (bodyRaw.startsWith("blog.posts.")) return [];
    return bodyRaw.split("\n\n");
  }, [bodyRaw]);

  const publishDate = useMemo(() => {
    const date = new Date("2026-06-15T12:00:00Z");
    const localeForDate = locale === "pt-BR" ? "pt-BR" : locale;
    return new Intl.DateTimeFormat(localeForDate, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }, [locale]);

  const description = `${t("blog.publishedOn")} ${publishDate}`;

  return (
    <PageShell
      title={t(`blog.posts.${slug}.title`)}
      description={description}
    >
      <Link
        href={`/${localeUrl}/blog`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mb-8"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t("blog.title")}
      </Link>
      <article>
        <div className="space-y-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {bodyParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
