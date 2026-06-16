"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function UUIDGenerator() {
  const { t } = useTranslation();
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    setUuid(crypto.randomUUID());
  }, []);

  const handleCopy = useCallback(async () => {
    if (!uuid) return;
    try {
      await navigator.clipboard.writeText(uuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  }, [uuid]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-[0.98]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            {t("common.generate")}
          </button>
          {uuid && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {copied ? (
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              )}
              {copied ? t("common.copied") : t("common.copy")}
            </button>
          )}
        </div>

        {uuid && (
          <div className="mt-4">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
              <code className="flex-1 text-sm font-mono text-slate-800 dark:text-slate-200 break-all select-all">
                {uuid}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
