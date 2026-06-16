"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "@/i18n/I18nProvider";
import {
  countWords,
  countLines,
} from "@/lib/tools/transforms";
import { toolGroups, transformText, type ToolGroup, type ToolMeta } from "@/utils/textTransforms";
import Hero from "@/components/home/Hero";
import ToolCategories from "@/components/home/ToolCategories";
import PopularTools from "@/components/home/PopularTools";
import UseCases from "@/components/home/UseCases";
import PrivacyBanner from "@/components/home/PrivacyBanner";
import SuggestTool from "@/components/home/SuggestTool";
import FeaturesGuide from "@/components/home/FeaturesGuide";
import AdPlaceholder from "@/components/home/AdPlaceholder";

export default function HomePage() {
  const { t, locale } = useTranslation();
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [lastTransform, setLastTransform] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeGroup, setActiveGroup] = useState<ToolGroup>("essentials");
  const [toast, setToast] = useState<string | null>(null);

  const charCount = text.length;
  const wordCount = countWords(text);
  const lineCount = countLines(text);
  const hasContent = text.length > 0;

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleTransform = useCallback(
    (tool: ToolMeta) => {
      if (!hasContent && tool.slug !== "invisible") return;
      try {
        const input = text || " ";
        const result = transformText(tool.slug, input, locale);
        setOutput(result);
        setLastTransform(tool.slug);
        setError(null);
        showToast(t("common.textConverted"));
      } catch (e) {
        setError(e instanceof Error ? e.message : t("common.errorTransform"));
      }
    },
    [text, hasContent, locale, t, showToast],
  );

  const handleCopy = useCallback(async () => {
    const content = output || text;
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(t("common.errorCopy"));
    }
  }, [text, output, t]);

  const handleClear = useCallback(() => {
    setText("");
    setOutput("");
    setLastTransform(null);
    setError(null);
  }, []);

  const handleDownload = useCallback(() => {
    const content = output || text;
    if (!content) return;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, output]);

  const displayText = output || text;
  const currentTools = toolGroups[activeGroup].tools;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 px-4 py-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 shadow-lg">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {toast}
          </div>
        </div>
      )}

      <Hero />

      <div className="flex flex-col lg:flex-row gap-6 mt-2">
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/60 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                {t("home.editor.label")}
              </span>
              <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs text-slate-400 dark:text-slate-500 tabular-nums whitespace-nowrap overflow-x-auto min-w-0">
                <span className="shrink-0">
                  <span className="font-medium text-slate-600 dark:text-slate-300">{charCount.toLocaleString()}</span>{" "}
                  {t("home.counts.letters")}
                </span>
                <span className="text-slate-300 dark:text-slate-600 shrink-0">|</span>
                <span className="shrink-0">
                  <span className="font-medium text-slate-600 dark:text-slate-300">{wordCount.toLocaleString()}</span>{" "}
                  {t("home.counts.words")}
                </span>
                <span className="text-slate-300 dark:text-slate-600 shrink-0">|</span>
                <span className="shrink-0">
                  <span className="font-medium text-slate-600 dark:text-slate-300">{lineCount.toLocaleString()}</span>{" "}
                  {t("home.counts.lines")}
                </span>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setOutput("");
                setLastTransform(null);
                setError(null);
              }}
              placeholder={t("home.editor.placeholder")}
              rows={10}
              className="w-full resize-y border-0 bg-transparent px-4 py-4 text-base leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 min-h-[180px] md:min-h-[220px]"
            />

            {displayText && displayText !== text && (
              <div className="border-t border-slate-200/50 dark:border-slate-700/60 px-4 py-3 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                  {displayText}
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 border-t border-slate-200/50 dark:border-slate-700/60 bg-slate-50/30 dark:bg-slate-800/20 overflow-x-auto">
              <button
                onClick={handleCopy}
                disabled={!hasContent && !output}
                className="inline-flex items-center gap-1 md:gap-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-2 md:px-3 py-1.5 text-[11px] md:text-xs font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                {copied ? (
                  <svg className="h-3 md:h-3.5 w-3 md:w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="h-3 md:h-3.5 w-3 md:w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                )}
                {t("home.actions.copy")}
              </button>
              <button
                onClick={handleClear}
                disabled={!hasContent}
                className="inline-flex items-center gap-1 md:gap-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-2 md:px-3 py-1.5 text-[11px] md:text-xs font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <svg className="h-3 md:h-3.5 w-3 md:w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t("home.actions.clear")}
              </button>
              <button
                onClick={handleDownload}
                disabled={!hasContent && !output}
                className="inline-flex items-center gap-1 md:gap-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-2 md:px-3 py-1.5 text-[11px] md:text-xs font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-200 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <svg className="h-3 md:h-3.5 w-3 md:w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t("home.actions.download")}
              </button>

              <div className="flex-1 min-w-2" />

              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden inline-flex items-center gap-1 rounded-lg px-1.5 md:px-2 py-1.5 text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-1 mb-3 border-b border-slate-200/50 dark:border-slate-700/60 overflow-x-auto overflow-y-hidden scrollbar-none">
              {(Object.keys(toolGroups) as ToolGroup[]).map((group) => (
                <button
                  key={group}
                  onClick={() => setActiveGroup(group)}
                  className={`px-2.5 md:px-3 py-2 text-[11px] md:text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
                    activeGroup === group
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {t(toolGroups[group].i18nLabel)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-2">
              {currentTools.map((tool) => {
                const isActive = lastTransform === tool.slug;
                const isDisabled = !hasContent && tool.slug !== "invisible";
                return (
                  <button
                    key={tool.slug}
                    onClick={() => handleTransform(tool)}
                    disabled={isDisabled}
                    className={`flex items-center gap-1.5 md:gap-2 rounded-xl border px-2 md:px-2.5 py-1.5 md:py-2 text-[10px] md:text-xs font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-left leading-tight ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                        : "bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className={`flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-md text-[9px] md:text-[10px] font-bold ${tool.badgeColor}`}>
                      {tool.icon}
                    </span>
                    <span className="break-words">{t(`home.transforms.${tool.i18nKey}`)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-4 text-sm text-red-700 dark:text-red-400">
              <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          <AdPlaceholder position="after-editor" />
        </div>

        <aside
          className={`lg:w-72 shrink-0 ${
            showSidebar ? "block" : "hidden lg:block"
          }`}
        >
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              {t("home.sidebar.summary")}
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-sm">
                  ⚡
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t("home.sidebar.instantConversion")}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t("home.sidebar.instantConversionDesc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm">
                  🌐
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t("home.sidebar.languagesReady")}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t("home.sidebar.languagesReadyDesc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-sm">
                  ✨
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t("home.sidebar.simpleFlow")}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t("home.sidebar.simpleFlowDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/60">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {t("home.sidebar.quickTips")}
              </h4>
              <ul className="space-y-2">
                <li className="text-[11px] text-slate-500 dark:text-slate-400 flex gap-2">
                  <span className="text-indigo-500 mt-0.5">•</span>
                  {t("home.sidebar.tipStandardize")}
                </li>
                <li className="text-[11px] text-slate-500 dark:text-slate-400 flex gap-2">
                  <span className="text-indigo-500 mt-0.5">•</span>
                  {t("home.sidebar.tipClean")}
                </li>
                <li className="text-[11px] text-slate-500 dark:text-slate-400 flex gap-2">
                  <span className="text-indigo-500 mt-0.5">•</span>
                  {t("home.sidebar.tipCount")}
                </li>
              </ul>
            </div>

            {!hasContent && (
              <div className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-700/40 p-3">
                <p className="text-[11px] text-amber-800 dark:text-amber-300">
                  {t("home.sidebar.chooseTransform")}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <AdPlaceholder position="after-popular-tools" />

      <ToolCategories />

      <PopularTools />

      <AdPlaceholder position="after-tool-grid" />

      <UseCases />

      <PrivacyBanner />

      <FeaturesGuide />

      <SuggestTool />

    </div>
  );
}
