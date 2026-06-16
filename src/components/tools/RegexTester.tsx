"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function RegexTester() {
  const { t } = useTranslation();
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("gm");
  const [testText, setTestText] = useState("");

  const regexResult = useMemo(() => {
    if (!pattern) return { regex: null as RegExp | null, error: null as string | null };
    try {
      const re = new RegExp(pattern, flags);
      return { regex: re, error: null };
    } catch (e) {
      return { regex: null, error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags]);

  const matches = useMemo(() => {
    if (!regexResult.regex || !testText) return [];
    try {
      const results: { index: number; length: number; text: string }[] = [];
      let match: RegExpExecArray | null;
      const re = new RegExp(regexResult.regex.source, regexResult.regex.flags.includes("g") ? regexResult.regex.flags : regexResult.regex.flags + "g");
      while ((match = re.exec(testText)) !== null) {
        results.push({
          index: match.index,
          length: match[0].length,
          text: match[0],
        });
        if (match.index === re.lastIndex) re.lastIndex++;
      }
      return results;
    } catch {
      return [];
    }
  }, [regexResult.regex, testText]);

  const handleClear = useCallback(() => {
    setPattern("");
    setTestText("");
  }, []);

  const { regex, error } = regexResult;
  const matchCount = matches.length;
  const hasContent = pattern.length > 0 || testText.length > 0;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Regex Pattern
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="/expression/"
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Flags
            </label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))}
              placeholder="gm"
              maxLength={5}
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Test Text
          </label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Paste or type text to test against..."
            rows={8}
            className="w-full resize-y rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 font-mono"
          />
        </div>

        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-3 text-xs text-red-700 dark:text-red-400">
            <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {!error && regex && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {matchCount} match{matchCount !== 1 ? "es" : ""}
              </span>
              <button
                onClick={handleClear}
                disabled={!hasContent}
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {t("common.clearAll")}
              </button>
            </div>

            <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-3 max-h-48 overflow-y-auto">
              {matches.length > 0 ? (
                <ul className="space-y-1">
                  {matches.map((m, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300">
                      <span className="text-slate-400 dark:text-slate-500">
                        #{i + 1} (pos {m.index}):
                      </span>{" "}
                      <code className="font-mono bg-indigo-50 dark:bg-indigo-950 px-1 rounded">
                        &ldquo;{m.text.length > 50 ? m.text.slice(0, 50) + "..." : m.text}&rdquo;
                      </code>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  No matches found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
