"use client";

import { useTranslation } from "@/i18n/I18nProvider";

const benefitKeys = ["free", "private", "noSignUp", "browser"] as const;
const benefitIcons: Record<string, string> = {
  free: "🎁",
  private: "🔒",
  noSignUp: "⚡",
  browser: "💻",
};

export default function Benefits() {
  const { t } = useTranslation();

  return (
    <section className="bg-white/50 dark:bg-slate-950/80 backdrop-blur-sm border-t border-slate-100 dark:border-slate-800 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {benefitKeys.map((key) => (
            <div
              key={key}
              className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 text-center"
            >
              <span className="text-xl">{benefitIcons[key]}</span>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {t(`home.benefits.${key}.title`)}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t(`home.benefits.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
