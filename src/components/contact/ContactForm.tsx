"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

type FormState = {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
  website: ""
};

export default function ContactForm() {
  const t = useTranslations("Pages.contact.form");
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(initialState);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setErrorCode(null);

    startTransition(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setStatus("error");
        setErrorCode(data?.error ?? "invalid_request");
        return;
      }

      setStatus("success");
      resetForm();
    });
  }

  return (
    <div className="metal-panel p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="section-label">{t("eyebrow")}</p>
        <h2 className="headline-lg mt-5">{t("title")}</h2>
        <p className="body-md mt-5 reading-measure">{t("description")}</p>
      </div>

      <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--color-text)]">{t("nameLabel")}</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={t("namePlaceholder")}
              className="rounded-2xl border border-[var(--color-border)] bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:bg-white/7"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--color-text)]">{t("emailLabel")}</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={t("emailPlaceholder")}
              className="rounded-2xl border border-[var(--color-border)] bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:bg-white/7"
              required
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--color-text)]">
              {t("organizationLabel")}
            </span>
            <input
              type="text"
              name="organization"
              autoComplete="organization"
              value={form.organization}
              onChange={(event) => updateField("organization", event.target.value)}
              placeholder={t("organizationPlaceholder")}
              className="rounded-2xl border border-[var(--color-border)] bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:bg-white/7"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--color-text)]">
              {t("subjectLabel")}
            </span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              placeholder={t("subjectPlaceholder")}
              className="rounded-2xl border border-[var(--color-border)] bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:bg-white/7"
            />
          </label>
        </div>

        <label className="hidden">
          <span>{t("websiteLabel")}</span>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">{t("messageLabel")}</span>
          <textarea
            name="message"
            rows={7}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={t("messagePlaceholder")}
            className="rounded-[1.6rem] border border-[var(--color-border)] bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:bg-white/7"
            required
          />
        </label>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="body-sm max-w-xl">{t("privacyNote")}</p>
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? t("submitting") : t("submit")}
          </button>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            {t("success")}
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
            {t(`errors.${errorCode ?? "invalid_request"}`)}
          </div>
        ) : null}
      </form>
    </div>
  );
}
