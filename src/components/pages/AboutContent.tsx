"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import Link from "next/link";

function HighlightCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6 shadow-sm">
      <span className="text-2xl">{icon}</span>
      <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{text}</p>
    </div>
  );
}

function AudienceCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-5 shadow-sm">
      <span className="mt-0.5 text-xl shrink-0">{icon}</span>
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function PrincipleCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-5 shadow-sm">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-sm font-bold text-indigo-600 dark:text-indigo-400">
        {number}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function AboutContent() {
  const { t, localeUrl } = useTranslation();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("about.title")}
        </h1>
        <p className="mt-3 text-lg text-indigo-600 dark:text-indigo-400 font-medium">
          {t("about.subtitle")}
        </p>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t("about.heroDesc")}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <HighlightCard icon="🔒" title={t("about.cardPrivacyTitle")} text={t("about.cardPrivacyText")} />
        <HighlightCard icon="✅" title={t("about.cardFreeTitle")} text={t("about.cardFreeText")} />
        <HighlightCard icon="⚡" title={t("about.cardFastTitle")} text={t("about.cardFastText")} />
        <HighlightCard icon="🚀" title={t("about.cardEvolvingTitle")} text={t("about.cardEvolvingText")} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("about.whyTitle")}
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {t("about.whyText")}
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("about.audienceTitle")}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AudienceCard icon="💻" title={t("about.audienceDevTitle")} text={t("about.audienceDevText")} />
          <AudienceCard icon="📚" title={t("about.audienceStudentTitle")} text={t("about.audienceStudentText")} />
          <AudienceCard icon="✍️" title={t("about.audienceCreatorTitle")} text={t("about.audienceCreatorText")} />
          <AudienceCard icon="🏢" title={t("about.audienceOfficeTitle")} text={t("about.audienceOfficeText")} />
          <AudienceCard icon="👤" title={t("about.audienceEveryoneTitle")} text={t("about.audienceEveryoneText")} />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("about.principlesTitle")}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PrincipleCard number="1" title={t("about.principle1")} desc={t("about.principle1Desc")} />
          <PrincipleCard number="2" title={t("about.principle2")} desc={t("about.principle2Desc")} />
          <PrincipleCard number="3" title={t("about.principle3")} desc={t("about.principle3Desc")} />
          <PrincipleCard number="4" title={t("about.principle4")} desc={t("about.principle4Desc")} />
          <PrincipleCard number="5" title={t("about.principle5")} desc={t("about.principle5Desc")} />
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-indigo-200/60 dark:border-indigo-800/60 bg-indigo-50/80 dark:bg-indigo-950/70 backdrop-blur-xl p-8 sm:p-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("about.ctaTitle")}
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          {t("about.ctaText")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${localeUrl}/contact`}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 dark:hover:bg-indigo-400"
          >
            {t("about.ctaContact")}
          </Link>
          <Link
            href={`/${localeUrl}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {t("about.ctaTools")}
          </Link>
        </div>
      </div>

    </div>
  );
}
