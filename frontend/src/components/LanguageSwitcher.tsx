"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { locales } from "@/i18n/messages";
import { useLocaleStore } from "@/store/useLocaleStore";
import useTranslations from "@/hooks/useTranslations";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const bundle = useTranslations("languageSwitcher");
  const [buttonAnimation, setButtonAnimation] = useState<"idle" | "press" | "release">("idle");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (buttonAnimation === "release") {
      const timeout = window.setTimeout(() => setButtonAnimation("idle"), 400);
      return () => window.clearTimeout(timeout);
    }
  }, [buttonAnimation]);

  const iconPath = useMemo(() => {
    return buttonAnimation === "press"
      ? "M12 2a9 9 0 0 0-9 9 .75.75 0 0 0 1.5 0 7.5 7.5 0 1 1 7.5 7.5.75.75 0 0 0 0 1.5 9 9 0 0 0 0-18ZM12 6a5 5 0 0 0-5 5v4.44l-1.72-1.73a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.28-.53V11a3.5 3.5 0 0 1 7 0 .75.75 0 0 0 1.5 0A5 5 0 0 0 12 6Z"
      : "M12 2a10 10 0 0 0-8.66 5 .75.75 0 1 0 1.32.74A8.5 8.5 0 1 1 3.5 12a.75.75 0 1 0-1.5 0 10 10 0 1 0 10-10Zm0 5a5 5 0 0 0-5 5v4.44l-1.72-1.73a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.28-.53V12a3.5 3.5 0 0 1 7 0 .75.75 0 0 0 1.5 0 5 5 0 0 0-5-5Z";
  }, [buttonAnimation]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setButtonAnimation("press");
        }}
        onAnimationEnd={(event) => {
          if (event.animationName.includes("press") && buttonAnimation === "press") {
            setButtonAnimation("release");
          } else if (event.animationName.includes("release") && buttonAnimation === "release") {
            setButtonAnimation("idle");
          }
        }}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-lg font-semibold text-white shadow-[0_18px_38px_-15px_rgba(59,130,246,0.8)] backdrop-blur transition-all ${
          buttonAnimation === "press"
            ? "translate-press-animate"
            : buttonAnimation === "release"
            ? "translate-release-animate"
            : "hover:scale-[1.04] hover:shadow-[0_22px_40px_-18px_rgba(96,165,250,0.95)]"
        }`}
        aria-label={bundle.buttonLabel}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 via-cyan-400/25 to-blue-700/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/30 shadow-inner shadow-white/10">
          <svg
            className={`h-5 w-5 text-white transition-transform duration-500 ${
              buttonAnimation === "press" ? "rotate-180" : buttonAnimation === "release" ? "rotate-0" : "group-hover:rotate-12"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={iconPath} />
          </svg>
        </span>
      </button>
      {open && (
        <div className="mt-2 w-60 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-sm text-slate-100 shadow-xl backdrop-blur transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
          <header className="mb-3 flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
            <span>{bundle.menuTitle}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-slate-200 transition hover:bg-slate-800"
            >
              {bundle.closeLabel}
            </button>
          </header>

          <section className="grid gap-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {bundle.preferenceHeading}
              </h3>
              <div className="mt-2 grid gap-2">
                {locales.map((option) => {
                  const active = option === locale;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setLocale(option);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${
                        active
                          ? "border-blue-500 bg-blue-500/10 text-white"
                          : "border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      <span>{bundle.languageNames[option]}</span>
                      {active && <span className="text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-300">
              <p>{bundle.note}</p>
              <Link
                href="/preferences"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                {bundle.manageLink}
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}


