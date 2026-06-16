"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function UTMGenerator() {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(() => {
    setError(null);

    if (!url.trim()) {
      setError("Website URL is required.");
      return;
    }
    if (!source.trim()) {
      setError("Campaign source (utm_source) is required.");
      return;
    }
    if (!medium.trim()) {
      setError("Campaign medium (utm_medium) is required.");
      return;
    }
    if (!campaign.trim()) {
      setError("Campaign name (utm_campaign) is required.");
      return;
    }

    try {
      const base = new URL(url.trim());
      base.searchParams.set("utm_source", source.trim());
      base.searchParams.set("utm_medium", medium.trim());
      base.searchParams.set("utm_campaign", campaign.trim());
      if (term.trim()) base.searchParams.set("utm_term", term.trim());
      if (content.trim()) base.searchParams.set("utm_content", content.trim());
      setResult(base.toString());
    } catch {
      setError("Please enter a valid URL (e.g. https://example.com).");
    }
  }, [url, source, medium, campaign, term, content]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
    setResult("");
    setError(null);
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Website URL *
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              utm_source *
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="google, newsletter, twitter..."
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              utm_medium *
            </label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="email, cpc, social..."
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              utm_campaign *
            </label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="summer_sale, launch..."
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              utm_term
              <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="running shoes..."
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              utm_content
              <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="hero_button, sidebar..."
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-[0.98]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            {t("common.generate")}
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t("common.clear")}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-3 text-sm text-red-700 dark:text-red-400">
            <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-3">
              <code className="flex-1 text-sm font-mono text-slate-800 dark:text-slate-200 break-all select-all">
                {result}
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
          </div>
        )}
      </div>
    </div>
  );
}
