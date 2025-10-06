"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLayoutEffect } from "react";

import maplibregl from "maplibre-gl";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { DATASET_LOOKUP, DATASETS } from "@/data/datasets";
import useTranslations from "@/hooks/useTranslations";
import type { DatasetDefinition } from "@/types/datasets";

export type MapViewportProps = {
  datasetId?: string;
  previewUrl?: string | null;
  layerName?: string;
  timestamp?: string;
  metadata?: string;
  attribution?: string;
  onDatasetChange?: (dataset: DatasetDefinition) => void;
  className?: string;
  availableDates?: string[];
  onDateChange?: (date: string | undefined) => void;
};

const DATASET_SOURCE_PREFIX = "dataset-source-";
const DATASET_LAYER_PREFIX = "dataset-layer-";
const OVERLAY_SOURCE_PREFIX = "overlay-source-";
const OVERLAY_LAYER_PREFIX = "overlay-layer-";
const DEFAULT_MIN_ZOOM = 0;
const DEFAULT_MAX_ZOOM = 18;
const ZOOM_EPSILON = 0.05;

export function MapViewport({
  datasetId = DATASETS[0]?.id ?? "earth-true-color",
  previewUrl,
  layerName,
  timestamp,
  metadata,
  attribution,
  onDatasetChange,
  className,
  availableDates,
  onDateChange,
}: MapViewportProps) {
  const t = useTranslations("map");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  const [selectedDatasetId, setSelectedDatasetId] = useState(datasetId);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    DATASET_LOOKUP.get(datasetId)?.defaultDate,
  );
  const [overlaySelection, setOverlaySelection] = useState<Record<string, boolean>>({});
  const [mapReady, setMapReady] = useState(false);

  const dataset = useMemo(() => DATASET_LOOKUP.get(selectedDatasetId), [selectedDatasetId]);

  // initialise map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialDataset = DATASET_LOOKUP.get(datasetId) ?? DATASETS[0];
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#020617" },
          },
        ],
      },
      center: initialDataset?.initialView.center ?? [0, 0],
      zoom: initialDataset?.initialView.zoom ?? 2,
      minZoom: initialDataset?.minZoom ?? DEFAULT_MIN_ZOOM,
      maxZoom: initialDataset?.maxZoom ?? DEFAULT_MAX_ZOOM,
      attributionControl: true,
    });

    const handleLoad = () => setMapReady(true);
    map.on("load", handleLoad);
    mapRef.current = map;

    return () => {
      map.off("load", handleLoad);
      map.remove();
      mapRef.current = null;
    };
  }, [datasetId]);

  // update overlay defaults when dataset changes
  useEffect(() => {
    if (!dataset) return;
    const derivedDates = availableDates && availableDates.length > 0 ? availableDates : dataset.availableDates ?? [];
    const dates = derivedDates.length > 0 ? derivedDates : dataset.availableDates ?? [];
    const defaultDate = dataset.supportsTime ? dataset.defaultDate ?? dates[0] : undefined;
    setSelectedDate(defaultDate);
    setOverlaySelection(
      Object.fromEntries(dataset.overlays?.map((overlay) => [overlay.id, true]) ?? []),
    );
    onDatasetChange?.(dataset);
    onDateChange?.(defaultDate);
    if (mapRef.current) {
      const minZoom = dataset.minZoom ?? DEFAULT_MIN_ZOOM;
      const nativeMaxZoom = dataset.nativeMaxZoom ?? dataset.maxZoom ?? DEFAULT_MAX_ZOOM;
      mapRef.current.setMinZoom(minZoom);
      mapRef.current.setMaxZoom(nativeMaxZoom + ZOOM_EPSILON);
    }
  }, [dataset, onDatasetChange, availableDates, onDateChange]);

  const clearDatasetLayers = useCallback((map: MapLibreMap) => {
    const style = map.getStyle();
    if (!style) return;

    style.layers
      ?.map((layer) => layer.id)
      .filter((id: string) => id.startsWith(DATASET_LAYER_PREFIX) || id.startsWith(OVERLAY_LAYER_PREFIX))
      .forEach((layerId: string) => {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
      });

    Object.keys(style.sources ?? {})
      .filter((id: string) => id.startsWith(DATASET_SOURCE_PREFIX) || id.startsWith(OVERLAY_SOURCE_PREFIX))
      .forEach((sourceId: string) => {
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      });
  }, []);

  const applyDatasetToMap = useCallback(
    (map: MapLibreMap, targetDataset: DatasetDefinition, date?: string) => {
      const tileUrls = targetDataset.getTileUrls({ date });
      const sourceId = `${DATASET_SOURCE_PREFIX}${targetDataset.id}`;
      const layerId = `${DATASET_LAYER_PREFIX}${targetDataset.id}`;

      const minZoom = targetDataset.minZoom ?? DEFAULT_MIN_ZOOM;
      const maxZoom = targetDataset.nativeMaxZoom ?? targetDataset.maxZoom ?? DEFAULT_MAX_ZOOM;

      map.addSource(sourceId, {
        type: "raster",
        tiles: tileUrls,
        tileSize: targetDataset.tileSize ?? 256,
        minzoom: minZoom,
        maxzoom: maxZoom,
      });

      map.addLayer({
        id: layerId,
        type: "raster",
        source: sourceId,
        paint: {
          "raster-opacity": 0.85,
        },
        minzoom: minZoom,
        maxzoom: maxZoom + ZOOM_EPSILON,
      });

      targetDataset.overlays
        ?.filter((overlay) => overlaySelection[overlay.id] ?? true)
        .forEach((overlay) => {
            const overlaySource = `${OVERLAY_SOURCE_PREFIX}${targetDataset.id}-${overlay.id}`;
          const overlayLayer = `${OVERLAY_LAYER_PREFIX}${targetDataset.id}-${overlay.id}`;

          map.addSource(overlaySource, {
            type: "raster",
            tiles: overlay.getTileUrls({ date }),
            tileSize: targetDataset.tileSize ?? 256,
            minzoom: minZoom,
            maxzoom: maxZoom,
          });

          map.addLayer({
            id: overlayLayer,
            type: "raster",
            source: overlaySource,
            paint: {
              "raster-opacity": overlay.opacity ?? 0.6,
            },
            minzoom: minZoom,
            maxzoom: maxZoom + ZOOM_EPSILON,
          });
        });
    },
    [overlaySelection],
  );

  // refresh map when dataset/time/overlay changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !dataset) return;

    const refresh = () => {
      clearDatasetLayers(map);
      applyDatasetToMap(map, dataset, selectedDate);
      if (dataset.initialView) {
        map.easeTo({ center: dataset.initialView.center, zoom: dataset.initialView.zoom, duration: 500 });
      }
    };

    if (mapReady) {
      refresh();
    } else {
      map.once("load", refresh);
    }
  }, [dataset, selectedDate, overlaySelection, mapReady, clearDatasetLayers, applyDatasetToMap]);

  useLayoutEffect(() => {
    if (!mapReady || !mapRef.current) return;
    mapRef.current.resize();
  }, [mapReady]);

  useEffect(() => {
    if (!mapReady || !containerRef.current || !mapRef.current) return;
    const map = mapRef.current;
    const observer = new ResizeObserver(() => {
      map.resize();
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [mapReady]);

  const infoItems = useMemo(() => {
    return [
      layerName ? `${t.layerPrefix}: ${layerName}` : dataset?.name ?? null,
      timestamp
        ? `${t.timePrefix}: ${new Date(timestamp).toUTCString()}`
        : dataset?.supportsTime
        ? `${t.timePrefix}: ${selectedDate ?? dataset?.defaultDate ?? ""}`
        : null,
      metadata ? `${t.metadataPrefix}: ${metadata}` : dataset?.description ?? null,
    ].filter((item): item is string => Boolean(item));
  }, [
    dataset?.name,
    dataset?.description,
    dataset?.supportsTime,
    dataset?.defaultDate,
    selectedDate,
    layerName,
    timestamp,
    metadata,
    t,
  ]);

  const handleDatasetSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDatasetId(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value || undefined;
    setSelectedDate(value);
    onDateChange?.(value);
  };

  const handleOverlayToggle = (overlayId: string) => {
    setOverlaySelection((prev) => ({ ...prev, [overlayId]: !prev[overlayId] }));
  };

  const defaultHeightClasses = className ? "" : "h-[520px] md:h-[580px] lg:h-[640px]";
  const containerClasses = [
    "relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-900/30 bg-slate-950 text-slate-100 shadow-xl shadow-slate-900/40",
    defaultHeightClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={containerClasses}>
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/85 px-4 py-3 text-xs backdrop-blur">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Dataset</span>
            <select
              className="rounded-lg border border-white/20 bg-slate-900 px-2 py-1.5 text-xs text-slate-100 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
              value={selectedDatasetId}
              onChange={handleDatasetSelect}
            >
              {DATASETS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          {(dataset?.supportsTime || availableDates) && (
            <label className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Date</span>
          <select
            className="rounded-lg border border-white/20 bg-slate-900 px-2 py-1.5 text-xs text-slate-100 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
            value={selectedDate ?? ""}
            onChange={handleDateChange}
          >
            <option value="">Latest available</option>
            {(availableDates ?? dataset?.availableDates ?? []).map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
            </label>
          )}
        </div>
        {dataset?.overlays && dataset.overlays.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
            <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Overlays</span>
            {dataset.overlays.map((overlay) => (
              <label key={overlay.id} className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 backdrop-blur">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-white/30 bg-slate-900 text-blue-500 focus:ring-blue-400"
                  checked={overlaySelection[overlay.id] ?? true}
                  onChange={() => handleOverlayToggle(overlay.id)}
                />
                <span className="text-[11px]">{overlay.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex-1">
        <div ref={containerRef} className="h-full w-full" />
        {previewUrl && (
          <div className="pointer-events-none absolute inset-0">
            <picture>
              <img src={previewUrl} alt={layerName ?? "Imagery preview"} className="h-full w-full object-cover" />
            </picture>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent px-5 pb-4 pt-8">
          <div className="pointer-events-auto flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/5 p-4 text-[12px] text-slate-200 backdrop-blur">
            <div className="flex items-start gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">{t.badge}</p>
                <h2 className="text-lg font-semibold">{dataset?.name ?? t.headingFallback}</h2>
              </div>
              {attribution || dataset?.attribution ? (
                <span className="ml-auto rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-slate-300">
                  {attribution ?? dataset?.attribution}
                </span>
              ) : null}
            </div>
            <ul className="space-y-1 text-slate-300">
              {infoItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
                  <span>{item}</span>
                </li>
              ))}
              {dataset?.description && !metadata && (
                <li className="text-[11px] text-slate-400">{dataset.description}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapViewport;

