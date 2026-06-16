"use client";

import { useState, type FormEvent } from "react";
import { useTranslation } from "@/i18n/I18nProvider";
import PageShell from "@/components/layout/PageShell";

const messageMaxLength = 2000;

const errorCodeToKey: Record<string, string> = {
  email_required: "contact.validation.emailRequired",
  email_invalid: "contact.validation.emailInvalid",
  email_too_long: "contact.validation.emailTooLong",
  message_too_short: "contact.validation.messageTooShort",
  message_too_long: "contact.validation.messageTooLong",
  name_too_long: "contact.validation.nameTooLong",
  subject_too_long: "contact.validation.subjectTooLong",
  rating_invalid: "contact.validation.ratingInvalid",
  rate_limited: "contact.validation.rateLimited",
  send_error: "contact.validation.sendError",
};

export default function ContactContent() {
  const { t, localeUrl } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = t("contact.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = t("contact.validation.emailInvalid");
    }
    if (!message.trim()) {
      newErrors.message = t("contact.validation.messageRequired");
    } else if (message.trim().length < 5) {
      newErrors.message = t("contact.validation.messageTooShort");
    } else if (message.trim().length > messageMaxLength) {
      newErrors.message = t("contact.validation.messageTooLong");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validate()) return;

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          rating,
          page_url: window.location.href,
          language: localeUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const code: string = data.error || "send_error";
        const i18nKey = errorCodeToKey[code] || "contact.validation.sendError";
        setErrorMessage(t(i18nKey));
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setRating(null);
      setErrors({});
    } catch {
      setErrorMessage(t("contact.validation.sendError"));
    } finally {
      setSending(false);
    }
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
            onClick={() => { setSubmitted(false); setErrorMessage(""); }}
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
          {errorMessage && (
            <div className="rounded-xl border border-red-200/60 dark:border-red-800/60 bg-red-50/80 dark:bg-red-950/70 backdrop-blur-xl px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {errorMessage}
            </div>
          )}
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
              {t("contact.email")} <span className="text-red-500">*</span>
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
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("contact.subject")}
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value); setErrors((prev) => ({ ...prev, subject: "" })); }}
              className="mt-1.5 block w-full rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all"
              placeholder={t("contact.subjectPlaceholder")}
            />
            {errors.subject && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("contact.rating")}
            </label>
            <div className="mt-1.5 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(rating === star ? null : star)}
                  className="p-0.5 transition-colors focus:outline-none"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <svg
                    className={`h-7 w-7 transition-colors ${
                      star <= (rating ?? 0)
                        ? "text-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                    fill={star <= (rating ?? 0) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("contact.message")} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              maxLength={messageMaxLength}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: "" })); }}
              className="mt-1.5 block w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all resize-none"
              placeholder={t("contact.messagePlaceholder")}
            />
            <div className="mt-1 flex items-center justify-end">
              <span className="text-xs tabular-nums text-slate-400 dark:text-slate-500">
                {message.length}/{messageMaxLength}
              </span>
            </div>
            {errors.message && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 dark:hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t("contact.sending")}
              </>
            ) : (
              t("contact.send")
            )}
          </button>
      </form>
    </PageShell>
  );
}
