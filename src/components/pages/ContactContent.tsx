"use client";

import { useState, type FormEvent } from "react";
import { useTranslation } from "@/i18n/I18nProvider";
import PageShell from "@/components/layout/PageShell";

export default function ContactContent() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t("contact.validation.nameRequired");
    }
    if (!email.trim()) {
      newErrors.email = t("contact.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = t("contact.validation.emailInvalid");
    }
    if (!message.trim()) {
      newErrors.message = t("contact.validation.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald-200/60 dark:border-emerald-800/60 bg-emerald-50/80 dark:bg-emerald-950/70 backdrop-blur-xl p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
            <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            {t("contact.successTitle")}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            {t("contact.successMessage")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 dark:hover:bg-indigo-400"
          >
            {t("contact.send")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageShell
      title={t("contact.title")}
      description={t("contact.subtitle")}
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("contact.name")}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
              className="mt-1.5 block w-full rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all"
              placeholder={t("contact.namePlaceholder")}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("contact.email")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
              className="mt-1.5 block w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all"
              placeholder={t("contact.emailPlaceholder")}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("contact.message")}
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: "" })); }}
              className="mt-1.5 block w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all resize-none"
              placeholder={t("contact.messagePlaceholder")}
            />
            {errors.message && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 dark:hover:bg-indigo-400"
          >
            {t("contact.send")}
          </button>
      </form>
    </PageShell>
  );
}
