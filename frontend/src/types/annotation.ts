export type Annotation = {
  id: string;
  title: string;
  description?: string;
  coordinates: { lat: number; lon: number };
  zoom?: number;
  timestamp?: string;
  datasetId: string;
};

