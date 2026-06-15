"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/I18nProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";
import LanguageSelector from "@/i18n/LanguageSelector";

const navLinks = [
  { key: "nav.tools", href: "tools" },
  { key: "nav.blog", href: "blog" },
  { key: "nav.about", href: "about" },
  { key: "nav.contact", href: "contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { t, localeUrl } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const buildHref = (path: string) => `/${localeUrl}/${path}`;

  const isActive = (href: string) => {
    const path = `/${localeUrl}/${href}`;
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-100/80 dark:bg-slate-950/70 backdrop-blur-xl shadow-sm shadow-slate-200/40 dark:shadow-black/20">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-4">
              <Link href={`/${localeUrl}`} className="flex items-center gap-3 shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm">
                  CT
                </span>
                <div className="hidden sm:block">
                  <div className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    {t("common.siteName")}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {t("header.tagline")}
                  </div>
                </div>
              </Link>

              <div ref={dropdownRef} className="relative hidden sm:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    dropdownOpen || isActive("tools")
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {t("nav.tools")}
                  <svg className={`h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg py-1 z-50">
                    <Link
                      href={buildHref("tools/uppercase")}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {t("tools.uppercase.name")}
                    </Link>
                    <Link
                      href={buildHref("tools")}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {t("tools.title")}
                    </Link>
                  </div>
                )}
              </div>

              <nav className="hidden sm:flex items-center gap-1">
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={buildHref(link.href)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-1">
              <LanguageSelector />
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="sm:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="border-t border-slate-200/60 dark:border-slate-700/60 sm:hidden px-5 py-3">
              <nav className="flex flex-col gap-1">
                <Link
                  href={buildHref("tools")}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive("tools")
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {t("nav.tools")}
                </Link>
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={buildHref(link.href)}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
