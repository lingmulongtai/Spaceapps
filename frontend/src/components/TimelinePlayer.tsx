"use client";

import { useState } from "react";

import useTranslations from "@/hooks/useTranslations";

export function TimelinePlayer() {
  const t = useTranslations("timeline");
  const [activeId, setActiveId] = useState(t.events[0]?.id ?? "");

  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/30">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>
        <div className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-1 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800">
            {t.prev}
          </button>
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-1 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800">
            {t.next}
          </button>
        </div>
      </header>

      <div className="grid gap-2">
        <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="absolute h-full rounded-full bg-blue-500"
            style={{
              width: `${
                (t.events.findIndex((m) => m.id === activeId) /
                  (Math.max(t.events.length - 1, 1))) *
                100
              }%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>{t.progressStart}</span>
          <span>{t.progressEnd}</span>
        </div>
      </div>

      <ul className="grid gap-2">
        {t.events.map((moment) => {
          const active = moment.id === activeId;
          return (
            <li key={moment.id}>
              <button
                type="button"
                onClick={() => setActiveId(moment.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "border-blue-400 bg-blue-50 text-blue-900 dark:border-blue-400/60 dark:bg-blue-500/10 dark:text-blue-100"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                }`}
              >
                <span className="font-medium">{moment.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(moment.timestamp).toUTCString()}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl border border-dashed border-slate-300 bg-white/40 p-3 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
        {t.footnote}
      </div>
    </section>
  );
}

export default TimelinePlayer;

