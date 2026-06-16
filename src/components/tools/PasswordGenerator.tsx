"use client";

import { useState, useCallback } from "react";
import { generatePassword } from "@/lib/tools/transforms";
import { useTranslation } from "@/i18n/I18nProvider";

export default function PasswordGenerator() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    const pw = generatePassword(length, {
      numbers: includeNumbers,
      symbols: includeSymbols,
      uppercase: includeUppercase,
      lowercase: includeLowercase,
    });
    setPassword(pw);
  }, [length, includeNumbers, includeSymbols, includeUppercase, includeLowercase]);

  const handleCopy = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  }, [password]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Length: {length}
            </label>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {[
            { label: "Numbers", value: includeNumbers, set: setIncludeNumbers },
            { label: "Symbols", value: includeSymbols, set: setIncludeSymbols },
            { label: "Uppercase", value: includeUppercase, set: setIncludeUppercase },
            { label: "Lowercase", value: includeLowercase, set: setIncludeLowercase },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={opt.value}
                onChange={() => opt.set(!opt.value)}
                className="rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          {t("common.generate")}
        </button>

        {password && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
              <code className="flex-1 text-sm font-mono text-slate-800 dark:text-slate-200 break-all select-all">
                {password}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                {copied ? (
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                )}
                {copied ? t("common.copied") : t("common.copy")}
              </button>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(password.length, 32) }).map((_, i) => {
                const char = password[i];
                const score = /[a-z]/.test(char) ? 1 : /[A-Z]/.test(char) ? 2 : /[0-9]/.test(char) ? 3 : 4;
                const colors = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-emerald-400"];
                return (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${colors[score - 1] || "bg-emerald-400"}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
