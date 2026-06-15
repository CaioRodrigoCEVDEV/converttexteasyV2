"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";

export default function Footer() {
  const { t, localeUrl } = useTranslation();
  const year = new Date().getFullYear();

  const buildHref = (path: string) => `/${localeUrl}/${path}`;

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm shadow-slate-200/30 dark:shadow-black/10">
          <div className="px-6 py-10 sm:py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Link
                  href={`/${localeUrl}`}
                  className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                    CT
                  </span>
                  {t("common.siteName")}
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t("footer.brand.description")}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {t("footer.product.title")}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      href={buildHref("tools")}
                      className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {t("footer.product.tools")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={buildHref("blog")}
                      className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {t("footer.product.blog")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={buildHref("about")}
                      className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {t("footer.product.about")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {t("footer.support.title")}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      href={buildHref("contact")}
                      className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {t("footer.support.contact")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={buildHref("privacy")}
                      className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {t("footer.support.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={buildHref("terms")}
                      className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {t("footer.support.terms")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {t("footer.highlight.title")}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t("footer.highlight.description")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    {t("footer.highlight.badges.free")}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    {t("footer.highlight.badges.private")}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    {t("footer.highlight.badges.noSignup")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/60 dark:border-slate-800/60 px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
              <p>{t("footer.copyright", { year: String(year) })}</p>
              <p>{t("common.freePrivate")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
