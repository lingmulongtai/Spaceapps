import type { DatasetDefinition } from "@/types/datasets";

const GIBS_BASE = "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best";

export const DATASETS: DatasetDefinition[] = [
  {
    id: "earth-true-color",
    name: "Earth True Color (MODIS)",
    description:
      "NASA GIBS MODIS Terra Corrected Reflectance daily imagery at 250m resolution.",
    category: "earth",
    attribution: "NASA GIBS / Blue Marble",
    minZoom: 2,
    maxZoom: 9,
    nativeMaxZoom: 9,
    tileSize: 256,
    initialView: { center: [0, 0], zoom: 2 },
    supportsTime: true,
    availableDates: [
      "2024-10-01",
      "2024-09-01",
      "2024-08-01",
      "2024-07-01",
    ],
    defaultDate: "2024-10-01",
    layerId: "MODIS_Terra_CorrectedReflectance_TrueColor",
    getTileUrls: ({ date }) => {
      const day = date ?? "2024-10-01";
      return [
        `${GIBS_BASE}/MODIS_Terra_CorrectedReflectance_TrueColor/default/${day}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
      ];
    },
  },
  {
    id: "earth-thermal-night",
    name: "Earth Nighttime Thermal",
    description: "Suomi NPP VIIRS day/night band highlighting nighttime lights and thermal features.",
    category: "earth",
    attribution: "NASA GIBS / VIIRS",
    minZoom: 2,
    maxZoom: 8,
    nativeMaxZoom: 8,
    tileSize: 256,
    initialView: { center: [0, 20], zoom: 2 },
    supportsTime: true,
    availableDates: ["2024-10-01", "2024-09-05"],
    defaultDate: "2024-10-01",
    layerId: "VIIRS_SNPP_DayNightBand_ENCC",
    getTileUrls: ({ date }) => {
      const day = date ?? "2024-10-01";
      return [
        `${GIBS_BASE}/VIIRS_SNPP_DayNightBand_ENCC/default/${day}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg`,
      ];
    },
  },
  {
    id: "mars-mro-marci",
    name: "Mars Global Daily Mosaic (MARCI)",
    description:
      "Mars Reconnaissance Orbiter MARCI global mosaic taps CTX context color imagery for daily weather tracking.",
    category: "mars",
    attribution: "NASA / JPL / MSSS",
    minZoom: 2,
    maxZoom: 7,
    nativeMaxZoom: 7,
    tileSize: 512,
    initialView: { center: [0, 0], zoom: 2 },
    supportsTime: true,
    availableDates: ["2024-09-15", "2024-08-01"],
    defaultDate: "2024-09-15",
    getTileUrls: ({ date }) => {
      const day = date ?? "2024-09-15";
      return [`https://mars.nasa.gov/mmgis-maps/MARCI/${day}/{z}/{x}/{y}.jpg`];
    },
  },
  {
    id: "moon-lro-wac",
    name: "Moon LRO WAC Mosaic",
    description: "Lunar Reconnaissance Orbiter Wide Angle Camera monochrome global mosaic.",
    category: "moon",
    attribution: "NASA / GSFC / Arizona State University",
    minZoom: 2,
    maxZoom: 8,
    nativeMaxZoom: 8,
    tileSize: 512,
    initialView: { center: [0, 0], zoom: 1.5 },
    getTileUrls: () => [
      "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd/{z}/{x}/{y}.jpg",
    ],
    overlays: [
      {
        id: "moon-dem",
        name: "LRO LOLA Elevation",
        description: "Laser altimeter-based shaded relief from LOLA.",
        getTileUrls: () => [
          "https://trek.nasa.gov/tiles/Moon/EQ/LRO_LOLA_ClrShade_Global_128ppd/{z}/{x}/{y}.png",
        ],
        opacity: 0.6,
      },
    ],
  },
  {
    id: "andromeda-hubble",
    name: "Andromeda Galaxy (Panchromatic)",
    description:
      "2.5 gigapixel panchromatic mosaic of Andromeda (M31) captured by the Hubble Space Telescope (PHAT survey).",
    category: "deep-space",
    attribution: "NASA / ESA / JHU",
    minZoom: 0,
    maxZoom: 12,
    nativeMaxZoom: 12,
    tileSize: 512,
    initialView: { center: [0, 0], zoom: 0.5 },
    getTileUrls: () => [
      "https://www.spacetelescope.org/static/archives/images/newscollection/heic1502a/{z}/{x}/{y}.jpg",
    ],
  },
];

export const DATASET_LOOKUP = new Map(DATASETS.map((dataset) => [dataset.id, dataset]));

