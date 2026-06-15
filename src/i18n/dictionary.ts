import en from "./locales/en.json";
import ptBR from "./locales/pt-BR.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";
import de from "./locales/de.json";
import ru from "./locales/ru.json";
import ar from "./locales/ar.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";
import type { Locale } from "./types";

const dictionaries = {
  en,
  "pt-BR": ptBR,
  es,
  fr,
  it,
  de,
  ru,
  ar,
  zh,
  ja,
} as const;

type Dict = typeof en;

export function getDictionary(locale: Locale): Dict {
  return (dictionaries[locale] ?? dictionaries.en) as Dict;
}

export function getValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  if (typeof current === "string") return current;
  return path;
}
