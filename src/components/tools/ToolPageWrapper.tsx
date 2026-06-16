"use client";

import { useTranslation } from "@/i18n/I18nProvider";

interface ToolPageWrapperProps {
  slug: string;
  children: React.ReactNode;
}

export default function ToolPageWrapper({ slug, children }: ToolPageWrapperProps) {
  const { t } = useTranslation();

  const hasHowTo = t(`tools.${slug}.howTo`) !== `tools.${slug}.howTo`;
  const hasFaq1q = t(`tools.${slug}.faq1q`) !== `tools.${slug}.faq1q`;

  if (!hasHowTo && !hasFaq1q) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {children}

      <div className="mx-auto max-w-3xl mt-12 space-y-8">
        {hasHowTo && (
          <section className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              How to Use
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t(`tools.${slug}.howTo`)}
            </p>
          </section>
        )}

        {hasFaq1q && (
          <section className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              FAQ
            </h2>
            <div className="space-y-4">
              {[1, 2].map((num) => {
                const qKey = `tools.${slug}.faq${num}q`;
                const aKey = `tools.${slug}.faq${num}a`;
                const question = t(qKey);
                if (question === qKey) return null;
                return (
                  <div key={num}>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {question}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {t(aKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
