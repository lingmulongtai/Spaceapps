export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export type MessageBundle = {
  languageSwitcher: {
    buttonLabel: string;
    menuTitle: string;
    closeLabel: string;
    preferenceHeading: string;
    manageLink: string;
    note: string;
    languageNames: Record<Locale, string>;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    tags: string[];
  };
  searchPanel: {
    title: string;
    subtitle: string;
    modes: Array<{
      id: string;
      label: string;
      placeholder: string;
    }>;
    layers: Record<string, string>;
    primaryInputLabel: string;
    dateRangeLabel: string;
    layerLabel: string;
    helper: string;
    previewButton: string;
    previewLoading: string;
    summary: {
      layer: string;
      time: string;
      bbox: string;
      source: string;
    };
  };
  resourcePanel: {
    title: string;
    subtitle: string;
    statusChip: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    footer: string;
  };
  map: {
    badge: string;
    headingWithLayer: string;
    headingFallback: string;
    layerPrefix: string;
    timePrefix: string;
    metadataPrefix: string;
    placeholderParagraphs: string[];
    badges: string[];
    attributionFallback: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    prev: string;
    next: string;
    progressStart: string;
    progressEnd: string;
    events: Array<{
      id: string;
      label: string;
      timestamp: string;
    }>;
    footnote: string;
  };
  translationWidget: {
    title: string;
    subtitle: string;
    sourceLabel: string;
    placeholder: string;
    targetLabel: string;
    button: string;
    buttonLoading: string;
    fallbackNote: string;
    detectedLabel: string;
  };
  backendSection: {
    title: string;
    description: string;
    linkText: string;
  };
};

export const messages: Record<Locale, MessageBundle> = {
  en: {
    languageSwitcher: {
      buttonLabel: "Language menu",
      menuTitle: "Preferences",
      closeLabel: "Close",
      preferenceHeading: "Display language",
      manageLink: "Open full preferences",
      note: "Choose your browsing language. This setting syncs with your local session.",
      languageNames: {
        en: "English",
        ja: "日本語",
      },
    },
    hero: {
      badge: "SpaceApps Concept",
      title: "Orbital Imagery Exploration Toolkit",
      description:
        "Orbital imagery explorer with live NASA GIBS previews and DeepL-powered translations.",
      tags: ["NASA imagery", "DeepL translation", "Timeline-ready"],
    },
    searchPanel: {
      title: "Search the Archive",
      subtitle: "Prototype inputs wired for future data federation and AI retrieval.",
      modes: [
        {
          id: "coordinates",
          label: "Coordinates",
          placeholder: "Enter latitude, longitude or draw a bounding box",
        },
        {
          id: "features",
          label: "Named Features",
          placeholder: "Search for landmarks, missions, or catalog IDs",
        },
        {
          id: "ai",
          label: "AI Description",
          placeholder: "Describe the scene (e.g., 'aurora over polar night')",
        },
        {
          id: "filters",
          label: "Metadata Filters",
          placeholder: "Filter by acquisition params (sensor, cloud cover, etc.)",
        },
      ],
      layers: {
        modisTerra: "MODIS True Color (Terra)",
        blueMarble: "Blue Marble",
        modisAqua: "Aqua True Color",
      },
      primaryInputLabel: "Primary input",
      dateRangeLabel: "Date/time range",
      layerLabel: "Imagery layer",
      helper: "AI endpoints and catalog adapters will attach here.",
      previewButton: "Preview results",
      previewLoading: "Loading imagery...",
      summary: {
        layer: "Layer",
        time: "Time",
        bbox: "BBox",
        source: "Source",
      },
    },
    resourcePanel: {
      title: "Data & Resources",
      subtitle: "Drop in mission catalogs, COG tiles, ML models, or custom APIs later.",
      statusChip: "Placeholder",
      items: [
        {
          title: "Imagery Store",
          description: "Configure OGC/WMS, STAC, or COG sources here.",
        },
        {
          title: "AI Vector Index",
          description: "Connect embeddings (CLIP, Sentinel-2, etc.) via vector database.",
        },
        {
          title: "Analytics Pipelines",
          description: "Reserve space for batch processing, change detection, and alerts.",
        },
      ],
      footer: "Upload manifests or link cloud buckets; metadata adapters mount here.",
    },
    map: {
      badge: "Geospatial canvas",
      headingWithLayer: "Live NASA GIBS Preview",
      headingFallback: "Interactive Explorer Placeholder",
      layerPrefix: "Layer",
      timePrefix: "Time",
      metadataPrefix: "BBox",
      placeholderParagraphs: [
        "Mount WebGL engines such as deck.gl, Cesium, or OpenLayers here to render tiled imagery, 3D terrain, and vector overlays.",
        "Streaming controls (time scrubber, AI annotations, layer blending) attach to the overlay toolbar in future iterations.",
      ],
      badges: [
        "Drop target for video timelapse",
        "Multi-layer comparison",
        "AI overlay widgets",
      ],
      attributionFallback: "NASA GIBS",
    },
    timeline: {
      title: "Timeline & Video Controls",
      subtitle: "Hook up mission timelapse clips or multi-temporal imagery here.",
      prev: "◀︎ Prev",
      next: "▶︎ Next",
      progressStart: "00:00",
      progressEnd: "Live",
      events: [
        { id: "t0", label: "Launch", timestamp: "2024-01-13T00:00:00Z" },
        { id: "t1", label: "Aurora Event", timestamp: "2024-02-02T10:15:00Z" },
        { id: "t2", label: "Volcanic Plume", timestamp: "2024-03-21T18:20:00Z" },
        { id: "t3", label: "Cyclone Landfall", timestamp: "2024-04-11T06:45:00Z" },
      ],
      footnote: "Wire up video players or animated tile sequences; sync to map via shared viewport state.",
    },
    translationWidget: {
      title: "Quick Translator",
      subtitle: "Powered by DeepL with rule-based fallback if credentials are missing.",
      sourceLabel: "Source text",
      placeholder: "Type or paste text to translate",
      targetLabel: "Target language",
      button: "Translate",
      buttonLoading: "Translating…",
      fallbackNote: "DeepL API key not configured; using fallback.",
      detectedLabel: "Detected source language",
    },
    backendSection: {
      title: "Backend & Data Integrations",
      description:
        "REST endpoints, STAC adapters, and DeepL-powered translations will live in the `/server` workspace. See README for integration notes.",
      linkText: "View architecture notes →",
    },
  },
  ja: {
    languageSwitcher: {
      buttonLabel: "言語メニュー",
      menuTitle: "プリファレンス",
      closeLabel: "閉じる",
      preferenceHeading: "表示言語",
      manageLink: "詳細設定を開く",
      note: "サイト表示の言語を選択します。この設定はローカルセッションに保持されます。",
      languageNames: {
        en: "English",
        ja: "日本語",
      },
    },
    hero: {
      badge: "SpaceApps コンセプト",
      title: "軌道イメージ探索ツールキット",
      description:
        "NASA GIBS のライブプレビューと DeepL 連携翻訳を備えた軌道イメージ閲覧プロトタイプです。",
      tags: ["NASA イメージ", "DeepL 翻訳", "タイムライン対応"],
    },
    searchPanel: {
      title: "アーカイブ検索",
      subtitle: "将来的なデータ連携と AI 検索に向けた試験的な入力欄です。",
      modes: [
        {
          id: "coordinates",
          label: "座標",
          placeholder: "緯度・経度を入力、またはバウンディングボックスを指定",
        },
        {
          id: "features",
          label: "地名・対象",
          placeholder: "ランドマーク、ミッション名、カタログ ID で検索",
        },
        {
          id: "ai",
          label: "AI 説明",
          placeholder: "シーンを説明（例：オーロラが見える極夜の空）",
        },
        {
          id: "filters",
          label: "メタデータ",
          placeholder: "取得条件（センサー、雲量など）で絞り込み",
        },
      ],
      layers: {
        modisTerra: "MODIS 真カラー（Terra）",
        blueMarble: "ブルーマーブル",
        modisAqua: "MODIS 真カラー（Aqua）",
      },
      primaryInputLabel: "メイン入力",
      dateRangeLabel: "期間",
      layerLabel: "イメージレイヤー",
      helper: "ここに AI エンドポイントやカタログアダプターが接続されます。",
      previewButton: "プレビュー",
      previewLoading: "イメージを読み込み中...",
      summary: {
        layer: "レイヤー",
        time: "時刻",
        bbox: "BBox",
        source: "ソース",
      },
    },
    resourcePanel: {
      title: "データとリソース",
      subtitle: "ミッションカタログ、COG タイル、ML モデル、独自 API などを将来的に連携できます。",
      statusChip: "準備中",
      items: [
        {
          title: "イメージ保管庫",
          description: "OGC/WMS や STAC、COG ソースを設定します。",
        },
        {
          title: "AI ベクター検索",
          description: "CLIP や Sentinel-2 などの埋め込みをベクターデータベースに接続。",
        },
        {
          title: "解析パイプライン",
          description: "バッチ処理、変化検知、通知などの枠を確保します。",
        },
      ],
      footer: "マニフェストをアップロード、またはクラウドバケットをリンクしてメタデータアダプターを配置します。",
    },
    map: {
      badge: "地理空間キャンバス",
      headingWithLayer: "NASA GIBS ライブプレビュー",
      headingFallback: "インタラクティブ探索プレースホルダー",
      layerPrefix: "レイヤー",
      timePrefix: "時刻",
      metadataPrefix: "BBox",
      placeholderParagraphs: [
        "deck.gl、Cesium、OpenLayers などの WebGL エンジンを組み込み、タイルイメージや 3D 地形、ベクトルオーバーレイを描画します。",
        "タイムライン、AI 注釈、レイヤーブレンドなどのストリーミングコントロールは将来オーバーレイツールバーに追加されます。",
      ],
      badges: [
        "タイムラプス動画のドロップ領域",
        "複数レイヤーの比較",
        "AI オーバーレイウィジェット",
      ],
      attributionFallback: "NASA GIBS",
    },
    timeline: {
      title: "タイムライン／動画コントロール",
      subtitle: "ミッションのタイムラプスや時系列イメージをここに接続します。",
      prev: "◀︎ 前へ",
      next: "▶︎ 次へ",
      progressStart: "00:00",
      progressEnd: "ライブ",
      events: [
        { id: "t0", label: "打ち上げ", timestamp: "2024-01-13T00:00:00Z" },
        { id: "t1", label: "オーロラ観測", timestamp: "2024-02-02T10:15:00Z" },
        { id: "t2", label: "火山の噴煙", timestamp: "2024-03-21T18:20:00Z" },
        { id: "t3", label: "サイクロン上陸", timestamp: "2024-04-11T06:45:00Z" },
      ],
      footnote: "動画プレイヤーや連続タイリングを連携し、マップと同期します。",
    },
    translationWidget: {
      title: "クイック翻訳",
      subtitle: "DeepL を優先使用し、認証がない場合は簡易ルールでフォールバックします。",
      sourceLabel: "翻訳元テキスト",
      placeholder: "翻訳したい文章を入力または貼り付け",
      targetLabel: "翻訳先言語",
      button: "翻訳する",
      buttonLoading: "翻訳中...",
      fallbackNote: "DeepL API キーが設定されていません。フォールバック処理を使用します。",
      detectedLabel: "判定された言語",
    },
    backendSection: {
      title: "バックエンドとデータ連携",
      description:
        "REST エンドポイント、STAC アダプター、DeepL 翻訳は `/server` ワークスペースで開発します。詳しくは README を参照してください。",
      linkText: "アーキテクチャノートを見る →",
    },
  },
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

