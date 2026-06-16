"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "converttexteasy-theme";

interface ThemeContextValue {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (p: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  preference: "system",
  resolved: "light",
  setPreference: () => {},
});

function getSavedPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const oldVal = localStorage.getItem("theme");
    if (oldVal === "dark" || oldVal === "light") {
      localStorage.setItem(STORAGE_KEY, oldVal);
      localStorage.removeItem("theme");
      return oldVal;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // localStorage unavailable
  }
  return "system";
}

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyThemeToDOM(resolved: ResolvedTheme) {
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    getSavedPreference,
  );
  const [systemDark, setSystemDark] = useState(getSystemDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolved = useMemo<ResolvedTheme>(() => {
    if (preference === "dark") return "dark";
    if (preference === "light") return "light";
    return systemDark ? "dark" : "light";
  }, [preference, systemDark]);

  useEffect(() => {
    applyThemeToDOM(resolved);
  }, [resolved]);

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      // localStorage unavailable
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ preference, resolved, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
