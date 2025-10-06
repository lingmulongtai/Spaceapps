export type DatasetCategory = "earth" | "moon" | "mars" | "deep-space";

export type DatasetViewport = {
  center: [number, number];
  zoom: number;
};

export type DatasetOverlay = {
  id: string;
  name: string;
  description?: string;
  getTileUrls: (options: { date?: string }) => string[];
  opacity?: number;
};

export type DatasetDefinition = {
  id: string;
  name: string;
  description: string;
  category: DatasetCategory;
  attribution: string;
  minZoom: number;
  maxZoom: number;
  tileSize?: number;
  initialView: DatasetViewport;
  supportsTime?: boolean;
  availableDates?: string[];
  defaultDate?: string;
  getTileUrls: (options: { date?: string }) => string[];
  overlays?: DatasetOverlay[];
};

