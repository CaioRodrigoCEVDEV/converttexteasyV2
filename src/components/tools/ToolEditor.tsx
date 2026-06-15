"use client";

import { useState, useCallback } from "react";
import { countWords, countLines } from "@/lib/tools/transforms";
import { useTranslation } from "@/i18n/I18nProvider";

export interface TransformAction {
  label: string;
  fn: (text: string) => string;
  available?: boolean;
}

interface ToolEditorProps {
  title: string;
  description: string;
  placeholder?: string;
  transforms: TransformAction[];
  compact?: boolean;
}

export default function ToolEditor({
  title,
  description,
  placeholder,
  transforms,
  compact = false,
}: ToolEditorProps) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWordCount, setShowWordCount] = useState(false);

  const charCount = text.length;
  const wordCount = countWords(text);
  const lineCount = countLines(text);
  const hasContent = text.length > 0;

  const resolvedPlaceholder = placeholder ?? t("common.placeholder");

  const handleTransform = useCallback((fn: (s: string) => string) => {
    try {
      setText((prev) => fn(prev));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("common.errorTransform"));
    }
  }, [t]);

  const handleCopy = useCallback(async () => {
    if (!hasContent) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(t("common.errorCopy"));
    }
  }, [text, hasContent, t]);

  const handleClear = useCallback(() => {
    setText("");
    setError(null);
    setShowWordCount(false);
  }, []);

  const handleDownload = useCallback(() => {
    if (!hasContent) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, hasContent]);

  const actionButtons = [
    {
      label: copied ? t("common.copied") : t("common.copy"),
      onClick: handleCopy,
      disabled: !hasContent,
      icon: copied ? (
        <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      ),
    },
    {
      label: t("common.clear"),
      onClick: handleClear,
      disabled: !hasContent,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    {
      label: t("common.download"),
      onClick: handleDownload,
      disabled: !hasContent,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
    },
  ];

  const availableTransforms = transforms.filter((tr) => tr.available !== false);
  const disabledTransforms = transforms.filter((tr) => tr.available === false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {!compact && (
        <div className="mb-6 text-center">
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
            {t("common.freePrivate")}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {description}
          </p>
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <textarea
            id="tool-textarea"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            placeholder={resolvedPlaceholder}
            rows={12}
            className="w-full resize-y rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-5 text-base leading-relaxed text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all"
            style={{ minHeight: "280px" }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs tabular-nums">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWordCount(!showWordCount)}
              className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span className="font-semibold text-slate-600 dark:text-slate-300">{charCount.toLocaleString()}</span>
              <span>{t("common.chars")}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <button
              onClick={() => setShowWordCount(!showWordCount)}
              className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span className="font-semibold text-slate-600 dark:text-slate-300">{wordCount.toLocaleString()}</span>
              <span>{t("common.words")}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-600 dark:text-slate-300">{lineCount.toLocaleString()}</span>
              <span>{t("common.lines")}</span>
            </span>
          </div>
          <button
            onClick={handleClear}
            disabled={!hasContent}
            className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {t("common.clearAll")}
          </button>
        </div>

        {showWordCount && hasContent && (
          <div className="mt-3 rounded-xl border border-indigo-100/60 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/30 p-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{charCount.toLocaleString()}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t("common.chars")}</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{wordCount.toLocaleString()}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t("common.words")}</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{lineCount.toLocaleString()}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t("common.lines")}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {actionButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.onClick}
              disabled={btn.disabled}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {availableTransforms.map((tr, i) => (
            <button
              key={`${tr.label}-${i}`}
              onClick={() => handleTransform(tr.fn)}
              disabled={!hasContent}
              className="rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 px-4 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-800 dark:hover:text-indigo-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {tr.label}
            </button>
          ))}
          {disabledTransforms.map((tr, i) => (
            <span
              key={`disabled-${i}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 px-4 py-2.5 text-sm font-medium text-slate-400 dark:text-slate-500 opacity-60 cursor-default"
            >
              {tr.label}
            </span>
          ))}
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-4 text-sm text-red-700 dark:text-red-400">
            <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
