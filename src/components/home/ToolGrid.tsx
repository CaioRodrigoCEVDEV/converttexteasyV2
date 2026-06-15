"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";
import { tools } from "@/data/tools";
import type { Tool } from "@/data/tools";

function ToolIcon({ icon, available }: { icon: string; available: boolean }) {
  return (
    <div
      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold transition-colors ${
        available
          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900"
          : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
      }`}
    >
      {icon}
    </div>
  );
}

function ToolCard({ tool, t, localeUrl }: { tool: Tool; t: (key: string) => string; localeUrl: string }) {
  const available = tool.status === "available";
  const base =
    "group relative rounded-2xl border p-6 transition-all";
  const enabled =
    "bg-white/80 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10 hover:-translate-y-0.5";
  const disabled =
    "bg-white/40 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-700/60 opacity-60";
  const cls = `${base} ${available ? enabled : disabled}`;

  const toolName = t(`tools.${tool.slug}.name`);
  const toolDesc = t(`tools.${tool.slug}.description`);

  const content = (
    <>
      <ToolIcon icon={tool.icon} available={available} />
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
    </>
  );

  if (available) {
    return (
      <Link href={`/${localeUrl}/tools/${tool.slug}`} className={cls}>
        {content}
      </Link>
    );
  }

  return <div className={cls}>{content}</div>;
}

export default function ToolGrid() {
  const { t, localeUrl } = useTranslation();

  return (
    <section className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm py-16 sm:py-20 border-t border-slate-200/50 dark:border-slate-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            {t("home.toolGrid.title")}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("home.toolGrid.description")}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} t={t} localeUrl={localeUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}
