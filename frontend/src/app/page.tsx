"use client";

import Link from "next/link";
import { useState } from "react";

import DatasetSidebar from "@/components/DatasetSidebar";
import MapViewport from "@/components/MapViewport";
import { AnnotationPanel } from "@/components/annotation";
import ResourcePanel from "@/components/ResourcePanel";
import SearchPanel from "@/components/SearchPanel";
import TimelinePlayer from "@/components/TimelinePlayer";
import TranslationWidget from "@/components/TranslationWidget";
import { DATASET_LOOKUP, DATASETS } from "@/data/datasets";
import type { Annotation } from "@/types/annotation";
import useTranslations from "@/hooks/useTranslations";
import useImageryPreview from "@/hooks/useImageryPreview";

type WorkspaceView = "explore" | "insights" | "annotate" | "translate";
type FeatureTab = { id: WorkspaceView; label: string; description: string };

const FEATURE_TABS: FeatureTab[] = [
  { id: "explore", label: "Explore", description: "Browse the space imagery catalog and switch datasets." },
  {
    id: "insights",
    label: "Insights",
    description: "Review timelines, mission updates, and contextual resources in one place.",
  },
  {
    id: "annotate",
    label: "Annotate",
    description: "Capture notes, tag coordinates, and collaborate on observations.",
  },
  {
    id: "translate",
    label: "Translate",
    description: "Localise mission content or field notes with integrated translation tools.",
  },
];

export default function Home() {
  const { preview, isLoading, fetchPreview, error, availableDates } = useImageryPreview();
  const hero = useTranslations("hero");
  const backend = useTranslations("backendSection");

  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(DATASETS[0]?.id ?? "earth-true-color");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeView, setActiveView] = useState<WorkspaceView>("explore");

  const selectedDataset = DATASET_LOOKUP.get(selectedDatasetId);

  const handleNewAnnotation = (annotation: Annotation) => {
    setAnnotations((prev) => [annotation, ...prev]);
  };

  const heroContent = (
    <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.45em] text-slate-500 dark:text-slate-400">
            {hero.badge}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-50 md:text-[36px]">
            {hero.title}
          </h1>
          <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">{hero.description}</p>
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {hero.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <section className="flex max-w-sm flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600 shadow-inner dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{backend.title}</h2>
          <p>{backend.description}</p>
          <Link
            href="/docs/architecture"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
          >
            {backend.linkText}
          </Link>
        </section>
      </div>
    </section>
  );

  const explorePane = (
    <div className="grid w-full gap-4">
      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <div className="flex h-full flex-col gap-4">
          <SearchPanel onPreview={fetchPreview} isLoading={isLoading} error={error} preview={preview} />
          <DatasetSidebar
            selectedId={selectedDatasetId}
            onSelect={setSelectedDatasetId}
            className="hidden lg:flex flex-1 min-h-0"
            height="lg:h-[360px]"
          />
        </div>
        <div className="h-full min-h-[360px]">
          <MapViewport
            datasetId={selectedDatasetId}
            previewUrl={preview?.image}
            layerName={preview?.layer}
            timestamp={preview?.time}
            metadata={preview ? preview.bbox.join(", ") : undefined}
            attribution={preview?.attribution}
            onDatasetChange={(dataset) => {
              if (dataset.supportsTime && dataset.defaultDate) {
                // Hook for future enhancements
              }
            }}
            className="h-full"
            availableDates={availableDates}
            onDateChange={(date) => {
              if (preview && date) {
                fetchPreview({ layer: preview.layer, startDate: date });
              }
            }}
          />
        </div>
      </div>
      <DatasetSidebar selectedId={selectedDatasetId} onSelect={setSelectedDatasetId} className="lg:hidden" />
    </div>
  );

  const insightsPane = (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <TimelinePlayer />
      <ResourcePanel />
    </div>
  );

  const annotatePane = (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <AnnotationPanel dataset={selectedDataset} annotations={annotations} onAdd={handleNewAnnotation} />
      <MapViewport
        datasetId={selectedDatasetId}
        previewUrl={preview?.image}
        layerName={preview?.layer}
        timestamp={preview?.time}
        metadata={preview ? preview.bbox.join(", ") : undefined}
        attribution={preview?.attribution}
        className="min-h-[480px]"
      />
    </div>
  );

  const translatePane = (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
      <TranslationWidget />
      <ResourcePanel />
    </div>
  );

  const renderActiveContent = () => {
    switch (activeView) {
      case "explore":
        return explorePane;
      case "insights":
        return insightsPane;
      case "annotate":
        return annotatePane;
      case "translate":
        return translatePane;
      default:
        return explorePane;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 pb-12 pt-8 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
          {heroContent}
          <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/40">
            <header className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Workspace Modes</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch between exploration, mission insights, annotation, or translation tools.
                </p>
              </div>
            </header>
            <div className="grid gap-3 md:grid-cols-2">
              {FEATURE_TABS.map((tab) => {
                const active = activeView === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveView(tab.id)}
                    className={`group flex flex-col gap-2 rounded-2xl border px-4 py-4 text-left transition-all ${
                      active
                        ? "border-blue-500 bg-gradient-to-br from-blue-600/15 via-blue-500/10 to-blue-600/5 text-blue-600 shadow-lg shadow-blue-500/20 dark:text-blue-200"
                        : "border-slate-200 bg-white/60 text-slate-600 hover:border-blue-300 hover:text-blue-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
                    }`}
                  >
                    <span className="text-sm font-semibold">{tab.label}</span>
                    <span className="text-xs text-slate-500 transition-colors group-hover:text-inherit dark:text-slate-400">
                      {tab.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-900/40">
          <div className="rounded-3xl border border-white/60 bg-white/85 p-6 dark:border-slate-800/60 dark:bg-slate-900/70">
            {renderActiveContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
