"use client";

import Link from "next/link";
import Image from "next/image";
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-1">
                <Link
                  href={`/${localeUrl}`}
                  className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white"
                >
                  <Image
                    src="/iconeTextLab.png"
                    alt={t("common.siteName")}
                    width={36}
                    height={36}
                    className="h-9 w-auto"
                  />
                  {t("common.siteName")}
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t("footer.columns.convertTextEasy.description")}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {t("footer.columns.textTools.title")}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link href={buildHref("tools/uppercase")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.textTools.uppercase")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/lowercase")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.textTools.lowercase")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/capitalize")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.textTools.capitalize")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/strikethrough")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.textTools.strikethrough")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/remove-extra-spaces")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.textTools.removeSpaces")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {t("footer.columns.developerTools.title")}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link href={buildHref("tools/camelcase")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.developerTools.camelcase")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/snakecase")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.developerTools.snakecase")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/kebabcase")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.developerTools.kebabcase")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/word-counter")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.developerTools.json")}
                    </Link>
                  </li>
                  <li>
                    <span className="text-sm text-slate-400 dark:text-slate-500 cursor-default">
                      {t("footer.columns.developerTools.base64")}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {t("footer.columns.seoTools.title")}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link href={buildHref("tools/kebabcase")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.seoTools.slug")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/word-counter")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.seoTools.wordCounter")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("tools/title-case")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.seoTools.titleCase")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {t("footer.columns.company.title")}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link href={buildHref("about")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.company.about")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("blog")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.company.blog")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("privacy-policy")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.company.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("terms")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.company.terms")}
                    </Link>
                  </li>
                  <li>
                    <Link href={buildHref("contact")} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                      {t("footer.columns.company.contact")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/60 dark:border-slate-800/60 px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
              <p>{t("footer.copyright", { year: String(year) })}</p>
              <p className="text-center sm:text-right">{t("footer.tagline")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
