"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
    <section className="flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white/75 p-5 shadow-sm shadow-slate-200/50 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70 dark:shadow-slate-900/50">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.42em] text-slate-500 dark:text-slate-400">
            {hero.badge}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-50 md:text-[36px]">
            {hero.title}
          </h1>
          <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">{hero.description}</p>
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {hero.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <section className="flex max-w-sm flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm text-slate-600 shadow-inner dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
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

  const workspaceModesCard = (
    <section className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm shadow-slate-200/40 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70 dark:shadow-slate-900/40">
      <header className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Workspace Modes</h2>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          Switch between the key toolsets you need for each workflow.
        </p>
      </header>
      <div className="grid gap-2 md:grid-cols-2">
        {FEATURE_TABS.map((tab) => {
          const active = activeView === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveView(tab.id)}
              className={`group flex flex-col gap-1.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                active
                  ? "border-blue-500 bg-gradient-to-br from-blue-600/15 via-blue-500/10 to-blue-600/5 text-blue-600 shadow-md shadow-blue-500/20 dark:text-blue-200"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-blue-300 hover:text-blue-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
              }`}
            >
              <span className="text-sm font-semibold">{tab.label}</span>
              <span className="text-[11px] leading-snug text-slate-500 transition-colors group-hover:text-inherit dark:text-slate-400">
                {tab.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );

  const mapViewport = useMemo(
    () => (
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
        className="min-h-[60vh] xl:min-h-[66vh] 2xl:min-h-[70vh]"
        availableDates={availableDates}
        selectedDate={preview?.time?.slice(0, 10)}
        onDateChange={({ dataset, date }) => {
          const nextLayer = dataset.layerId ?? dataset.id;
          fetchPreview({ layer: nextLayer, startDate: date });
        }}
      />
    ),
    [availableDates, fetchPreview, preview, selectedDatasetId],
  );

  const sidebarContent = useMemo(() => {
    switch (activeView) {
      case "insights":
        return (
          <>
            <TimelinePlayer />
            <ResourcePanel />
          </>
        );
      case "annotate":
        return (
          <>
            <AnnotationPanel dataset={selectedDataset} annotations={annotations} onAdd={handleNewAnnotation} />
            <ResourcePanel />
          </>
        );
      case "translate":
        return (
          <>
            <TranslationWidget />
            <ResourcePanel />
          </>
        );
      case "explore":
      default:
        return (
          <>
            <SearchPanel onPreview={fetchPreview} isLoading={isLoading} error={error} preview={preview} />
            <DatasetSidebar
              selectedId={selectedDatasetId}
              onSelect={setSelectedDatasetId}
              className="self-start max-h-[420px]"
              height="lg:max-h-[420px] xl:max-h-[460px]"
            />
          </>
        );
    }
  }, [activeView, annotations, error, fetchPreview, handleNewAnnotation, isLoading, preview, selectedDataset, selectedDatasetId]);

  const mobileDatasetSidebar = activeView === "explore"
    ? (
        <DatasetSidebar selectedId={selectedDatasetId} onSelect={setSelectedDatasetId} className="lg:hidden" />
      )
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col gap-6 px-6 pb-10 pt-6 sm:px-8 lg:px-10 xl:px-14">
        <header className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)] xl:items-stretch">
          {heroContent}
          {workspaceModesCard}
        </header>

        <main className="grid flex-1 gap-4 xl:grid-cols-[minmax(320px,360px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(360px,400px)_minmax(0,1fr)] 2xl:gap-6">
          <section className="flex min-h-[520px] flex-col gap-4 overflow-visible xl:min-h-[640px] 2xl:min-h-[720px]">
            {sidebarContent}
          </section>
          <section className="flex min-h-[520px] flex-col xl:min-h-[640px] 2xl:min-h-[720px]">
            {mapViewport}
          </section>
        </main>

        {mobileDatasetSidebar}
      </div>
    </div>
  );
}
