"use client";

import { useState } from "react";

import useTranslations from "@/hooks/useTranslations";

const LAYER_PRESETS = [
  { key: "modisTerra", value: "MODIS_Terra_CorrectedReflectance_TrueColor" },
  { key: "blueMarble", value: "BlueMarble_NextGeneration" },
  { key: "modisAqua", value: "MODIS_Aqua_CorrectedReflectance_TrueColor" },
];

type SearchPanelProps = {
  onPreview: (params: {
    bbox?: [number, number, number, number];
    startDate?: string;
    endDate?: string;
    layer?: string;
  }) => void;
  isLoading?: boolean;
  error?: string | null;
  preview?: {
    layer: string;
    time: string;
    bbox: [number, number, number, number];
    source?: string;
  } | null;
};

export function SearchPanel({
  onPreview,
  isLoading = false,
  error,
  preview,
}: SearchPanelProps) {
  const t = useTranslations("searchPanel");
  const [activeMode, setActiveMode] = useState(t.modes[0]?.label ?? "Coordinates");
  const [primaryInput, setPrimaryInput] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [selectedLayer, setSelectedLayer] = useState(LAYER_PRESETS[0]?.value ?? "");

  const handlePreview = () => {
    const bbox = primaryInput
      .split(",")
      .map((value) => Number.parseFloat(value.trim()))
      .filter(Number.isFinite);

    onPreview({
      bbox: bbox.length === 4 ? (bbox as [number, number, number, number]) : undefined,
      startDate: dateStart,
      endDate: dateEnd,
      layer: selectedLayer,
    });
  };

  return (
    <section className="grid gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/30">
      <header className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="max-w-full">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {t.modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                activeMode === mode.label
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
              onClick={() => setActiveMode(mode.label)}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-4">
        <label className="grid w-full min-w-0 gap-1 text-sm">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {t.primaryInputLabel}
          </span>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder={
              t.modes.find((mode) => mode.label === activeMode)?.placeholder ?? ""
            }
            value={primaryInput}
            onChange={(event) => setPrimaryInput(event.target.value)}
          />
        </label>

        <label className="grid w-full min-w-0 gap-1 text-sm">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {t.dateRangeLabel}
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              type="date"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:max-w-[200px]"
              value={dateStart}
              onChange={(event) => setDateStart(event.target.value)}
            />
            <input
              type="date"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:max-w-[200px]"
              value={dateEnd}
              onChange={(event) => setDateEnd(event.target.value)}
            />
          </div>
        </label>

        <label className="grid w-full min-w-0 gap-1 text-sm">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {t.layerLabel}
          </span>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            value={selectedLayer}
            onChange={(event) => setSelectedLayer(event.target.value)}
          >
            {LAYER_PRESETS.map((layer) => (
              <option key={layer.value} value={layer.value}>
                {t.layers[layer.key] ?? layer.value}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {t.helper}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-wait disabled:bg-blue-400"
            onClick={handlePreview}
            disabled={isLoading}
          >
            {isLoading ? t.previewLoading : t.previewButton}
          </button>
        </div>
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </p>
        )}

        {preview && (
          <div className="grid gap-1 rounded-xl border border-slate-200 bg-white/70 p-3 text-xs text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            <span>
              {t.summary.layer}: {preview.layer}
            </span>
            <span>
              {t.summary.time}: {preview.time}
            </span>
            <span>
              {t.summary.bbox}: {preview.bbox.join(", ")}
            </span>
            {preview.source && (
              <span>
                {t.summary.source}: {preview.source}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchPanel;

