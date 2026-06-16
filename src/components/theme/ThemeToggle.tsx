"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, type ThemePreference } from "./ThemeProvider";
import { useTranslation } from "@/i18n/I18nProvider";

const options: { value: ThemePreference; icon: string }[] = [
  { value: "system", icon: "monitor" },
  { value: "light", icon: "sun" },
  { value: "dark", icon: "moon" },
];

function ThemeIcon({ type }: { type: string }) {
  if (type === "sun") {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    );
  }
  if (type === "moon") {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentIcon = options.find((o) => o.value === preference)?.icon ?? "monitor";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={t("common.theme")}
        className="rounded-lg p-1.5 md:p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        <ThemeIcon type={currentIcon} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg py-1 z-50">
          {options.map((opt) => {
            const isActive = preference === opt.value;
            const labelKey =
              opt.value === "system"
                ? "common.themeAuto"
                : opt.value === "light"
                  ? "common.themeLight"
                  : "common.themeDark";
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setPreference(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <ThemeIcon type={opt.icon} />
                <span>{t(labelKey)}</span>
                {isActive && (
                  <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
