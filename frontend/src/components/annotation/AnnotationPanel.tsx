"use client";

import { useState } from "react";

import type { Annotation } from "@/types/annotation";
import type { DatasetDefinition } from "@/types/datasets";

type AnnotationPanelProps = {
  dataset?: DatasetDefinition;
  annotations: Annotation[];
  onAdd: (annotation: Annotation) => void;
  onSelect?: (annotation: Annotation) => void;
  className?: string;
};

export function AnnotationPanel({ dataset, annotations, onAdd, onSelect, className }: AnnotationPanelProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("0");
  const [lon, setLon] = useState("0");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataset) return;

    onAdd({
      id: `annotation-${Date.now()}`,
      title: title.trim() || `Marker ${annotations.length + 1}`,
      description: description.trim() || undefined,
      coordinates: {
        lat: Number.parseFloat(lat) || 0,
        lon: Number.parseFloat(lon) || 0,
      },
      datasetId: dataset.id,
    });

    setTitle("");
    setDescription("");
    setLat("0");
    setLon("0");
  };

  const baseClasses =
    "flex h-full w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 p-5 text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200";
  const containerClasses = [baseClasses, className ? "" : "min-h-[360px]", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={containerClasses} aria-label="Annotations">
      <header className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Annotations</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tag interesting features, patterns, or events for this dataset.
        </p>
      </header>

      <form className="grid gap-2 text-sm" onSubmit={handleSubmit}>
        <label className="grid min-w-0 gap-1">
          <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Aurora filament, crater rim, etc."
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="grid min-w-0 gap-1 text-xs">
          <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Observation notes, scientific context, or hypotheses"
            className="min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="grid min-w-0 gap-1">
            <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Latitude</span>
            <input
              value={lat}
              onChange={(event) => setLat(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
          <label className="grid min-w-0 gap-1">
            <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Longitude</span>
            <input
              value={lon}
              onChange={(event) => setLon(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!dataset}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          Add annotation
        </button>
      </form>

      <div className="flex-1 overflow-y-auto pr-1 text-sm">
        <ul className="space-y-3">
          {annotations
            .filter((annotation) => annotation.datasetId === dataset?.id)
            .map((annotation) => (
              <li key={annotation.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(annotation)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-blue-400/80 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-400/60 dark:hover:bg-blue-500/15"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{annotation.title}</span>
                    <span className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {annotation.coordinates.lat.toFixed(2)}, {annotation.coordinates.lon.toFixed(2)}
                    </span>
                  </div>
                  {annotation.description && (
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{annotation.description}</p>
                  )}
                  {annotation.timestamp && (
                    <p className="mt-2 text-[11px] text-slate-400">{annotation.timestamp}</p>
                  )}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default AnnotationPanel;

