"use client";

import { useMemo, useState } from "react";

import { DATASETS } from "@/data/datasets";

type DatasetSidebarProps = {
  selectedId: string;
  onSelect: (datasetId: string) => void;
  className?: string;
  height?: string;
};

export function DatasetSidebar({ selectedId, onSelect, className, height }: DatasetSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return DATASETS;
    return DATASETS.filter((dataset) =>
      [dataset.name, dataset.description, dataset.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [query]);

  const containerClasses = [
    "flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200",
    height,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={containerClasses}
      aria-label="Dataset selection"
    >
      <header className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Explore Datasets</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Choose mission layers, deep sky mosaics, or planetary maps.
        </p>
      </header>

      <label className="flex min-h-[44px] items-center gap-3 rounded-xl border border-slate-200 bg-white/65 px-3 py-2 text-sm text-slate-700 shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Search</span>
        <input
          type="search"
          placeholder="Search datasets..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 border-none bg-transparent text-sm focus:outline-none"
        />
      </label>

      <div className="scroll-elevated -mx-1 flex-1 overflow-y-auto px-1">
        <ul className="space-y-3 pb-1">
          {filtered.map((dataset) => {
            const active = dataset.id === selectedId;
            return (
              <li key={dataset.id}>
                <button
                  type="button"
                  onClick={() => onSelect(dataset.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                    active
                      ? "border-blue-500 bg-blue-500/15 text-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-400/80 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-400/60 dark:hover:bg-blue-500/15"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{dataset.name}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {dataset.category}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {dataset.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{dataset.attribution}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default DatasetSidebar;

