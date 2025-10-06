"use client";

import { useState } from "react";

import type { ImageryPreview } from "@/types/imagery";

type PreviewRequest = {
  bbox?: [number, number, number, number];
  startDate?: string;
  endDate?: string;
  layer?: string;
};

export default function useImageryPreview() {
  const [preview, setPreview] = useState<ImageryPreview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const fetchPreview = async (request: PreviewRequest = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const layer = request.layer ?? "MODIS_Terra_CorrectedReflectance_TrueColor";
      const responseTimeline = await fetch(
        `/api/tiles/timeline?layer=${encodeURIComponent(layer)}&limit=200`,
      );

      if (responseTimeline.ok) {
        const timeline = (await responseTimeline.json()) as { timestamp: string }[];
        const dates = timeline.map((item) => item.timestamp.slice(0, 10));
        setAvailableDates(dates);
      }

      const response = await fetch("/api/tiles/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bbox: request.bbox,
          width: 800,
          height: 400,
          layer,
          time: request.startDate || request.endDate,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail?.message ?? "Failed to load imagery preview");
      }

      const data = (await response.json()) as ImageryPreview;
      setPreview(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    preview,
    isLoading,
    error,
    availableDates,
    fetchPreview,
  };
}


