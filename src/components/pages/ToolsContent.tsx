"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";
import { getVisibleTools } from "@/data/tools";
import type { Tool } from "@/data/tools";

function ToolCard({ tool, t, localeUrl }: { tool: Tool; t: (key: string) => string; localeUrl: string }) {
  const available = tool.status === "available";
  const base = "group relative rounded-2xl border p-4 md:p-6 transition-all";
  const enabled =
    "bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10 hover:-translate-y-0.5";
  const disabled =
    "bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800/70 opacity-60";
  const cls = `${base} ${available ? enabled : disabled}`;

  const toolName = t(`tools.${tool.slug}.name`);
  const toolDesc = t(`tools.${tool.slug}.description`);

  const content = (
    <>
      <div
        className={`mb-3 md:mb-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl text-base md:text-lg font-bold transition-colors ${
          available
            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900"
            : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
        }`}
      >
        {tool.icon}
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {toolName}
        </h3>
        {!available && (
          <span className="rounded-full bg-amber-50 dark:bg-amber-900/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {t("common.soon")}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {toolDesc}
      </p>
      <span className="mt-3 inline-block rounded-md bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
        {tool.category}
      </span>
    </>
  );

  if (available) {
    return (
      <Link key={tool.slug} href={`/${localeUrl}/tools/${tool.slug}`} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <div key={tool.slug} className={cls}>
      {content}
    </div>
  );
}

export default function ToolsContent() {
  const { t, localeUrl } = useTranslation();
  const visibleTools = getVisibleTools(localeUrl);
  const availableCount = visibleTools.filter((tool) => tool.status === "available").length;
  const comingSoonCount = visibleTools.filter((tool) => tool.status === "coming_soon").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm p-6 sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("tools.title")}
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            {t("tools.everyToolRunsLocally")}
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-emerald-700 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {availableCount} {t("common.available")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 px-3 py-1 text-amber-700 dark:text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {comingSoonCount} {t("common.comingSoon")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} t={t} localeUrl={localeUrl} />
        ))}
      </div>
    </div>
  );
}
