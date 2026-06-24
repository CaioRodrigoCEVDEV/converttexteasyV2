"use client";

import { useState, type FormEvent } from "react";
import { useTranslation } from "@/i18n/I18nProvider";

const messageMaxLength = 2000;

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{text}</p>
    </div>
  );
}

function BottomCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl px-4 py-3.5 shadow-sm">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>
    </div>
  );
}

export default function ContactContent() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
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
      const res = await fetch("https://api-feedback.caiorodrigocev.com.br/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        setErrorMessage(t("contact.validation.sendError"));
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setErrorMessage("");
    } catch {
      setErrorMessage(t("contact.validation.sendError"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("contact.title")}
        </h1>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t("contact.subtitle")}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["feedback", "suggestions", "bugReports", "partnerships"].map((key) => (
            <span
              key={key}
              className="inline-flex items-center rounded-full border border-indigo-200/60 dark:border-indigo-700/60 bg-indigo-50/80 dark:bg-indigo-950/60 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300"
            >
              {t(`contact.badge${key.charAt(0).toUpperCase() + key.slice(1)}`)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <svg className="h-7 w-7 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {t("contact.successTitle")}
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {t("contact.successMessage")}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setErrorMessage(""); }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 dark:hover:bg-indigo-400"
                >
                  {t("contact.send")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 dark:hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
            )}
          </div>
        </div>

        <div className="space-y-4">
          <InfoCard
            title={t("contact.cardSuggestTitle")}
            text={t("contact.cardSuggestText")}
          />
          <InfoCard
            title={t("contact.cardBugTitle")}
            text={t("contact.cardBugText")}
          />
          <InfoCard
            title={t("contact.cardFeedbackTitle")}
            text={t("contact.cardFeedbackText")}
          />
          <InfoCard
            title={t("contact.cardFastTitle")}
            text={t("contact.cardFastText")}
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-xl font-bold text-slate-900 dark:text-white">
          {t("contact.bottomTitle")}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <BottomCard icon="💡" title={t("contact.bottomCardIdeas")} />
          <BottomCard icon="🌐" title={t("contact.bottomCardTranslations")} />
          <BottomCard icon="🐛" title={t("contact.bottomCardBugs")} />
          <BottomCard icon="♿" title={t("contact.bottomCardSEO")} />
        </div>
      </div>
    </div>
  );
}
