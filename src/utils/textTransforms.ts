import { transformMap } from "@/lib/tools/transforms";

export type ToolGroup = "essentials" | "styles" | "utilities" | "developer";

export interface ToolMeta {
  slug: string;
  i18nKey: string;
  icon: string;
  badgeColor: string;
  group: ToolGroup;
  needsLocale?: boolean;
  hasOutput?: boolean;
}

export const toolGroups: Record<ToolGroup, { i18nLabel: string; tools: ToolMeta[] }> = {
  essentials: {
    i18nLabel: "home.groups.essentials",
    tools: [
      { slug: "sentence-case", i18nKey: "sentenceCase", icon: "Sc", badgeColor: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400", group: "essentials" },
      { slug: "lowercase", i18nKey: "lower", icon: "lc", badgeColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400", group: "essentials" },
      { slug: "uppercase", i18nKey: "upper", icon: "UC", badgeColor: "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400", group: "essentials" },
      { slug: "capitalize", i18nKey: "capitalize", icon: "CC", badgeColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400", group: "essentials" },
      { slug: "title-case", i18nKey: "titleCase", icon: "TC", badgeColor: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400", group: "essentials", needsLocale: true },
      { slug: "alternating-case", i18nKey: "alternatingCase", icon: "aC", badgeColor: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400", group: "essentials" },
      { slug: "inverse-case", i18nKey: "inverseCase", icon: "iC", badgeColor: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400", group: "essentials" },
      { slug: "remove-extra-spaces", i18nKey: "removeSpaces", icon: "Sp", badgeColor: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400", group: "essentials" },
    ],
  },
  styles: {
    i18nLabel: "home.groups.styles",
    tools: [
      { slug: "strikethrough", i18nKey: "strikethrough", icon: "ST", badgeColor: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-400", group: "styles" },
      { slug: "italic", i18nKey: "italic", icon: "It", badgeColor: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400", group: "styles" },
      { slug: "bold", i18nKey: "bold", icon: "Bd", badgeColor: "bg-fuchsia-100 dark:bg-fuchsia-950 text-fuchsia-700 dark:text-fuchsia-400", group: "styles" },
      { slug: "underline", i18nKey: "underline", icon: "Un", badgeColor: "bg-lime-100 dark:bg-lime-950 text-lime-700 dark:text-lime-400", group: "styles" },
      { slug: "wide", i18nKey: "wide", icon: "Wd", badgeColor: "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400", group: "styles" },
      { slug: "small-caps", i18nKey: "small", icon: "Sm", badgeColor: "bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-400", group: "styles" },
    ],
  },
  utilities: {
    i18nLabel: "home.groups.utilities",
    tools: [
      { slug: "reverse", i18nKey: "reverse", icon: "Rv", badgeColor: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400", group: "utilities" },
      { slug: "mirror", i18nKey: "mirror", icon: "Mr", badgeColor: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400", group: "utilities" },
      { slug: "upside-down", i18nKey: "upsideDown", icon: "UD", badgeColor: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400", group: "utilities" },
      { slug: "morse-auto", i18nKey: "morse", icon: "Mc", badgeColor: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400", group: "utilities" },
      { slug: "binary-auto", i18nKey: "binary", icon: "Bn", badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400", group: "utilities" },
      { slug: "invisible", i18nKey: "invisible", icon: "Iv", badgeColor: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400", group: "utilities" },
    ],
  },
  developer: {
    i18nLabel: "home.groups.developer",
    tools: [
      { slug: "camelcase", i18nKey: "camelCase", icon: "cC", badgeColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400", group: "developer" },
      { slug: "pascalcase", i18nKey: "pascalCase", icon: "PC", badgeColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400", group: "developer" },
      { slug: "snakecase", i18nKey: "snakeCase", icon: "sC", badgeColor: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400", group: "developer" },
      { slug: "constantcase", i18nKey: "constantCase", icon: "CN", badgeColor: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400", group: "developer" },
      { slug: "kebabcase", i18nKey: "kebabCase", icon: "Sl", badgeColor: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400", group: "developer" },
      { slug: "dotcase", i18nKey: "dotCase", icon: "Dt", badgeColor: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400", group: "developer" },
      { slug: "pathcase", i18nKey: "pathCase", icon: "Pt", badgeColor: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400", group: "developer" },
    ],
  },
};

export function transformText(slug: string, input: string, locale?: string): string {
  const fn = transformMap[slug];
  if (!fn) return input;
  if (slug === "title-case") {
    const langCode = locale ? locale.split("-")[0] : "en";
    return fn(input, langCode);
  }
  return fn(input) as string;
}

export const allTools: ToolMeta[] = [
  ...toolGroups.essentials.tools,
  ...toolGroups.styles.tools,
  ...toolGroups.utilities.tools,
  ...toolGroups.developer.tools,
];

const toolBySlug: Record<string, ToolMeta> = {};
for (const t of allTools) {
  toolBySlug[t.slug] = t;
}

export function getToolMeta(slug: string): ToolMeta | undefined {
  return toolBySlug[slug];
}
