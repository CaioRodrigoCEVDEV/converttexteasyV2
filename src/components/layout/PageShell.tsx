"use client";

import { useTranslation } from "@/i18n/I18nProvider";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm p-6 sm:p-10">
        {eyebrow && (
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
