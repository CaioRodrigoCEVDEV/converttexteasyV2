"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";
import PageShell from "@/components/layout/PageShell";

interface BlogPostPageProps {
  slug: string;
}

const postBodyKeys: Record<string, string[]> = {
  "uppercase-guide": [
    "Converting text to uppercase is one of the most common text formatting needs. Whether you're preparing a title, emphasizing a section, or formatting data for consistency, having a quick and reliable way to convert case is essential.",
    "With ConvertTextEasy, you can convert any text to uppercase instantly, right in your browser. Simply paste your text into the editor, click the \"UPPERCASE\" button, and your text will be transformed immediately. No sign-up, no data uploads — everything happens locally on your device.",
    "This approach is not only fast but also private. Unlike other online tools that send your text to a server, ConvertTextEasy processes everything using client-side JavaScript. Your sensitive content stays with you.",
    "Additionally, you can copy the result with one click, download it as a text file, or clear the editor to start fresh. It's designed to be as frictionless as possible."
  ],
  "remove-spaces-guide": [
    "Extra spaces in text can be a real headache. They creep in from copy-paste operations, inconsistent formatting, or messy data sources. Manually cleaning them up is tedious and error-prone.",
    "ConvertTextEasy's \"Remove Extra Spaces\" tool solves this problem instantly. It collapses multiple spaces into single spaces, trims leading and trailing whitespace, and normalizes tabs and line breaks. Just paste your messy text and click the button.",
    "This tool is particularly useful for cleaning up text copied from PDFs, websites, or spreadsheets where formatting often gets scrambled. It's also great for normalizing user-submitted content before storing or displaying it.",
    "Like all ConvertTextEasy tools, the space removal runs entirely in your browser — no data is sent anywhere. You get fast, private, and reliable text cleanup every time."
  ],
  "free-text-tools": [
    "There are many text formatting tools available online, but not all of them respect your privacy. Many require sign-ups, display intrusive ads, or process your text on remote servers. ConvertTextEasy takes a different approach.",
    "Every tool on ConvertTextEasy runs locally in your browser. This means instant results with no latency, complete privacy since your text never leaves your device, and no sign-up required — just open the tool and start using it.",
    "Our growing collection includes tools for case conversion (uppercase, lowercase, sentence case, capitalization), text cleanup (removing extra spaces), and more. We're continuously adding new tools based on user feedback and common needs.",
    "The philosophy is simple: text tools should be free, fast, and private. No paywalls, no trials, no data collection. Just useful tools that work when you need them."
  ]
};

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const { t, localeUrl } = useTranslation();

  const bodyParagraphs = postBodyKeys[slug] ?? [];

  return (
    <PageShell
      title={t(`blog.posts.${slug}.title`)}
      description={`${t("blog.publishedOn")} ${t(`blog.posts.${slug}.date`)}`}
    >
      <Link
        href={`/${localeUrl}/blog`}
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t("blog.title")}
      </Link>

      <article>
        <div className="space-y-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {bodyParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
