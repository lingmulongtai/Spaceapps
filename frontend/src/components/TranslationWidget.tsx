"use client";

import { useEffect, useMemo, useState } from "react";

import useTranslation from "@/hooks/useTranslation";
import useTranslations from "@/hooks/useTranslations";

const LANGUAGE_OPTIONS = [
  { value: "EN", label: "English" },
  { value: "JA", label: "日本語" },
  { value: "FR", label: "Français" },
  { value: "DE", label: "Deutsch" },
  { value: "ES", label: "Español" },
];

export default function TranslationWidget() {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("EN");
  const { result, isLoading, error, requestTranslation } = useTranslation();
  const t = useTranslations("translationWidget");
  const [buttonAnimation, setButtonAnimation] = useState<"idle" | "press" | "release">("idle");

  useEffect(() => {
    const textarea = document.getElementById("translation-textarea");
    if (textarea) {
      textarea.setAttribute("aria-label", t.sourceLabel);
    }
  }, [t.sourceLabel]);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setButtonAnimation("press");
    await requestTranslation({ text, target_language: targetLanguage });
    setButtonAnimation("release");
  };

  useEffect(() => {
    if (buttonAnimation === "release") {
      const timeout = window.setTimeout(() => setButtonAnimation("idle"), 500);
      return () => window.clearTimeout(timeout);
    }
  }, [buttonAnimation]);

  const iconPath = useMemo(() => {
    return buttonAnimation === "press"
      ? "M12 3.25a8.75 8.75 0 1 0 8.75 8.75A8.76 8.76 0 0 0 12 3.25Zm0 15a6.25 6.25 0 1 1 6.25-6.25A6.26 6.26 0 0 1 12 18.25Zm0-10.5a4.25 4.25 0 0 0-3.39 6.77l-1.68 1.68a.75.75 0 0 0 1.06 1.06l1.68-1.68A4.25 4.25 0 1 0 12 7.75Zm0 6.5a2.25 2.25 0 1 1 2.25-2.25A2.25 2.25 0 0 1 12 14.25Z"
      : "M12 2a10 10 0 1 0 5.7 18.19l1.74 1.74a.75.75 0 0 0 1.06-1.06l-1.74-1.74A10 10 0 0 0 12 2Zm0 18.5a8.5 8.5 0 1 1 5.15-15.33.75.75 0 0 0 .09.9l1.21 1.21A8.5 8.5 0 0 1 12 20.5Zm4-8.5a4 4 0 1 1-4-4 .75.75 0 0 0 0-1.5 5.5 5.5 0 1 0 5.5 5.5.75.75 0 0 0-1.5 0Z";
  }, [buttonAnimation]);

  return (
    <section className="grid gap-4 rounded-lg border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>
      </header>

      <label className="grid gap-1 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {t.sourceLabel}
        <textarea
          id="translation-textarea"
          className="min-h-[120px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t.placeholder}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex flex-col text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {t.targetLabel}
          <select
            className="mt-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            value={targetLanguage}
            onChange={(event) => setTargetLanguage(event.target.value)}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className={`ml-auto inline-flex items-center gap-3 rounded-2xl border border-blue-400/70 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-slate-400/60 disabled:text-slate-200 ${
            buttonAnimation === "press" ? "translate-press-animate" : buttonAnimation === "release" ? "translate-release-animate" : "hover:scale-[1.02] hover:shadow-blue-400/50"
          }`}
          onClick={handleTranslate}
          onAnimationEnd={(event) => {
            if (event.animationName.includes("press") && buttonAnimation === "press") {
              setButtonAnimation("release");
            }
            if (event.animationName.includes("release") && buttonAnimation === "release") {
              setButtonAnimation("idle");
            }
          }}
          disabled={isLoading || !text.trim()}
        >
          <span
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-inner shadow-white/30 backdrop-blur transition-transform duration-300"
          >
            <svg
              className={`h-4 w-4 text-white transition-transform duration-300 ${buttonAnimation === "press" ? "rotate-180" : buttonAnimation === "release" ? "rotate-0" : ""}`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={iconPath} />
            </svg>
          </span>
          <span>{isLoading ? t.buttonLoading : t.button}</span>
          <span className="inline-flex h-2 w-8 items-center justify-end gap-1">
            <span className="h-2 w-2 rounded-full bg-white/90 shadow" />
            <span className="h-2 w-2 rounded-full bg-white/60 shadow" />
          </span>
        </button>
      </div>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </p>
      )}

      {result && (
        <div className="grid gap-2 rounded-md border border-slate-200 bg-white/70 p-3 text-xs text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900 dark:text-slate-100">{result.target_language}</span>
            <span className="rounded bg-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {result.provider}
            </span>
          </div>
          {result.detected_source_language && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t.detectedLabel}: {result.detected_source_language}
            </p>
          )}
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{result.text}</p>
          {result.note && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{result.note}</p>
          )}
        </div>
      )}
    </section>
  );
}
