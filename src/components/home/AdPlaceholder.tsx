"use client";

import { useTranslation } from "@/i18n/I18nProvider";

interface AdPlaceholderProps {
  position: string;
  className?: string;
}

export default function AdPlaceholder({ position, className = "" }: AdPlaceholderProps) {
  const { t } = useTranslation();

  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  if (!enabled) return null;

  return (
    <div
      className={`mt-8 rounded-2xl border border-dashed border-slate-300/60 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30 p-6 text-center ${className}`}
      data-ad-placeholder={position}
    >
      <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {t("common.advertisement")}
      </p>
      <div className="mt-2 flex items-center justify-center h-20 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/40 dark:border-slate-700/40">
        <span className="text-xs text-slate-300 dark:text-slate-600">
          728 × 90
        </span>
      </div>
    </div>
  );
}
