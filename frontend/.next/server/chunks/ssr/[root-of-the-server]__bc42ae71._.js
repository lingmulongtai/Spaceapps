module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/frontend/src/i18n/messages.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isLocale",
    ()=>isLocale,
    "locales",
    ()=>locales,
    "messages",
    ()=>messages
]);
const locales = [
    "en",
    "ja"
];
const messages = {
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
                ja: "日本語"
            }
        },
        hero: {
            badge: "SpaceApps Concept",
            title: "Orbital Imagery Exploration Toolkit",
            description: "Orbital imagery explorer with live NASA GIBS previews and DeepL-powered translations.",
            tags: [
                "NASA imagery",
                "DeepL translation",
                "Timeline-ready"
            ]
        },
        searchPanel: {
            title: "Search the Archive",
            subtitle: "Prototype inputs wired for future data federation and AI retrieval.",
            modes: [
                {
                    id: "coordinates",
                    label: "Coordinates",
                    placeholder: "Enter latitude, longitude or draw a bounding box"
                },
                {
                    id: "features",
                    label: "Named Features",
                    placeholder: "Search for landmarks, missions, or catalog IDs"
                },
                {
                    id: "ai",
                    label: "AI Description",
                    placeholder: "Describe the scene (e.g., 'aurora over polar night')"
                },
                {
                    id: "filters",
                    label: "Metadata Filters",
                    placeholder: "Filter by acquisition params (sensor, cloud cover, etc.)"
                }
            ],
            layers: {
                modisTerra: "MODIS True Color (Terra)",
                blueMarble: "Blue Marble",
                modisAqua: "Aqua True Color"
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
                source: "Source"
            }
        },
        resourcePanel: {
            title: "Data & Resources",
            subtitle: "Drop in mission catalogs, COG tiles, ML models, or custom APIs later.",
            statusChip: "Placeholder",
            items: [
                {
                    title: "Imagery Store",
                    description: "Configure OGC/WMS, STAC, or COG sources here."
                },
                {
                    title: "AI Vector Index",
                    description: "Connect embeddings (CLIP, Sentinel-2, etc.) via vector database."
                },
                {
                    title: "Analytics Pipelines",
                    description: "Reserve space for batch processing, change detection, and alerts."
                }
            ],
            footer: "Upload manifests or link cloud buckets; metadata adapters mount here."
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
                "Streaming controls (time scrubber, AI annotations, layer blending) attach to the overlay toolbar in future iterations."
            ],
            badges: [
                "Drop target for video timelapse",
                "Multi-layer comparison",
                "AI overlay widgets"
            ],
            attributionFallback: "NASA GIBS"
        },
        timeline: {
            title: "Timeline & Video Controls",
            subtitle: "Hook up mission timelapse clips or multi-temporal imagery here.",
            prev: "◀︎ Prev",
            next: "▶︎ Next",
            progressStart: "00:00",
            progressEnd: "Live",
            events: [
                {
                    id: "t0",
                    label: "Launch",
                    timestamp: "2024-01-13T00:00:00Z"
                },
                {
                    id: "t1",
                    label: "Aurora Event",
                    timestamp: "2024-02-02T10:15:00Z"
                },
                {
                    id: "t2",
                    label: "Volcanic Plume",
                    timestamp: "2024-03-21T18:20:00Z"
                },
                {
                    id: "t3",
                    label: "Cyclone Landfall",
                    timestamp: "2024-04-11T06:45:00Z"
                }
            ],
            footnote: "Wire up video players or animated tile sequences; sync to map via shared viewport state."
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
            detectedLabel: "Detected source language"
        },
        backendSection: {
            title: "Backend & Data Integrations",
            description: "REST endpoints, STAC adapters, and DeepL-powered translations will live in the `/server` workspace. See README for integration notes.",
            linkText: "View architecture notes →"
        }
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
                ja: "日本語"
            }
        },
        hero: {
            badge: "SpaceApps コンセプト",
            title: "軌道イメージ探索ツールキット",
            description: "NASA GIBS のライブプレビューと DeepL 連携翻訳を備えた軌道イメージ閲覧プロトタイプです。",
            tags: [
                "NASA イメージ",
                "DeepL 翻訳",
                "タイムライン対応"
            ]
        },
        searchPanel: {
            title: "アーカイブ検索",
            subtitle: "将来的なデータ連携と AI 検索に向けた試験的な入力欄です。",
            modes: [
                {
                    id: "coordinates",
                    label: "座標",
                    placeholder: "緯度・経度を入力、またはバウンディングボックスを指定"
                },
                {
                    id: "features",
                    label: "地名・対象",
                    placeholder: "ランドマーク、ミッション名、カタログ ID で検索"
                },
                {
                    id: "ai",
                    label: "AI 説明",
                    placeholder: "シーンを説明（例：オーロラが見える極夜の空）"
                },
                {
                    id: "filters",
                    label: "メタデータ",
                    placeholder: "取得条件（センサー、雲量など）で絞り込み"
                }
            ],
            layers: {
                modisTerra: "MODIS 真カラー（Terra）",
                blueMarble: "ブルーマーブル",
                modisAqua: "MODIS 真カラー（Aqua）"
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
                source: "ソース"
            }
        },
        resourcePanel: {
            title: "データとリソース",
            subtitle: "ミッションカタログ、COG タイル、ML モデル、独自 API などを将来的に連携できます。",
            statusChip: "準備中",
            items: [
                {
                    title: "イメージ保管庫",
                    description: "OGC/WMS や STAC、COG ソースを設定します。"
                },
                {
                    title: "AI ベクター検索",
                    description: "CLIP や Sentinel-2 などの埋め込みをベクターデータベースに接続。"
                },
                {
                    title: "解析パイプライン",
                    description: "バッチ処理、変化検知、通知などの枠を確保します。"
                }
            ],
            footer: "マニフェストをアップロード、またはクラウドバケットをリンクしてメタデータアダプターを配置します。"
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
                "タイムライン、AI 注釈、レイヤーブレンドなどのストリーミングコントロールは将来オーバーレイツールバーに追加されます。"
            ],
            badges: [
                "タイムラプス動画のドロップ領域",
                "複数レイヤーの比較",
                "AI オーバーレイウィジェット"
            ],
            attributionFallback: "NASA GIBS"
        },
        timeline: {
            title: "タイムライン／動画コントロール",
            subtitle: "ミッションのタイムラプスや時系列イメージをここに接続します。",
            prev: "◀︎ 前へ",
            next: "▶︎ 次へ",
            progressStart: "00:00",
            progressEnd: "ライブ",
            events: [
                {
                    id: "t0",
                    label: "打ち上げ",
                    timestamp: "2024-01-13T00:00:00Z"
                },
                {
                    id: "t1",
                    label: "オーロラ観測",
                    timestamp: "2024-02-02T10:15:00Z"
                },
                {
                    id: "t2",
                    label: "火山の噴煙",
                    timestamp: "2024-03-21T18:20:00Z"
                },
                {
                    id: "t3",
                    label: "サイクロン上陸",
                    timestamp: "2024-04-11T06:45:00Z"
                }
            ],
            footnote: "動画プレイヤーや連続タイリングを連携し、マップと同期します。"
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
            detectedLabel: "判定された言語"
        },
        backendSection: {
            title: "バックエンドとデータ連携",
            description: "REST エンドポイント、STAC アダプター、DeepL 翻訳は `/server` ワークスペースで開発します。詳しくは README を参照してください。",
            linkText: "アーキテクチャノートを見る →"
        }
    }
};
const isLocale = (value)=>locales.includes(value);
}),
"[project]/frontend/src/store/useLocaleStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocaleStore",
    ()=>useLocaleStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/i18n/messages.ts [app-ssr] (ecmascript)");
;
;
const useLocaleStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        locale: "en",
        setLocale: (value)=>{
            set((state)=>({
                    ...state,
                    locale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLocale"])(value) ? value : state.locale
                }));
        },
        cycleLocale: ()=>{
            const current = get().locale;
            const index = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].indexOf(current);
            const next = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"][(index + 1) % __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].length];
            set({
                locale: next
            });
        }
    }));
}),
"[project]/frontend/src/hooks/useTranslations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useTranslations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/i18n/messages.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$useLocaleStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/useLocaleStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useTranslations(section) {
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$useLocaleStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocaleStore"])((state)=>state.locale);
    const sectionMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"][locale][section], [
        locale,
        section
    ]);
    return sectionMessages;
}
}),
"[project]/frontend/src/components/LanguageSwitcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/i18n/messages.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$useLocaleStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/useLocaleStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$hooks$2f$useTranslations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/hooks/useTranslations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function LanguageSwitcher() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$useLocaleStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocaleStore"])((state)=>state.locale);
    const setLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$useLocaleStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocaleStore"])((state)=>state.setLocale);
    const bundle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$hooks$2f$useTranslations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("languageSwitcher");
    const [buttonAnimation, setButtonAnimation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.documentElement.lang = locale;
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (buttonAnimation === "release") {
            const timeout = window.setTimeout(()=>setButtonAnimation("idle"), 400);
            return ()=>window.clearTimeout(timeout);
        }
    }, [
        buttonAnimation
    ]);
    const iconPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return buttonAnimation === "press" ? "M12 2a9 9 0 0 0-9 9 .75.75 0 0 0 1.5 0 7.5 7.5 0 1 1 7.5 7.5.75.75 0 0 0 0 1.5 9 9 0 0 0 0-18ZM12 6a5 5 0 0 0-5 5v4.44l-1.72-1.73a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.28-.53V11a3.5 3.5 0 0 1 7 0 .75.75 0 0 0 1.5 0A5 5 0 0 0 12 6Z" : "M12 2a10 10 0 0 0-8.66 5 .75.75 0 1 0 1.32.74A8.5 8.5 0 1 1 3.5 12a.75.75 0 1 0-1.5 0 10 10 0 1 0 10-10Zm0 5a5 5 0 0 0-5 5v4.44l-1.72-1.73a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.28-.53V12a3.5 3.5 0 0 1 7 0 .75.75 0 0 0 1.5 0 5 5 0 0 0-5-5Z";
    }, [
        buttonAnimation
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 left-4 z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    setOpen((prev)=>!prev);
                    setButtonAnimation("press");
                },
                onAnimationEnd: (event)=>{
                    if (event.animationName.includes("press") && buttonAnimation === "press") {
                        setButtonAnimation("release");
                    } else if (event.animationName.includes("release") && buttonAnimation === "release") {
                        setButtonAnimation("idle");
                    }
                },
                className: `group relative flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-lg font-semibold text-white shadow-[0_18px_38px_-15px_rgba(59,130,246,0.8)] backdrop-blur transition-all ${buttonAnimation === "press" ? "translate-press-animate" : buttonAnimation === "release" ? "translate-release-animate" : "hover:scale-[1.04] hover:shadow-[0_22px_40px_-18px_rgba(96,165,250,0.95)]"}`,
                "aria-label": bundle.buttonLabel,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 via-cyan-400/25 to-blue-700/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/30 shadow-inner shadow-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: `h-5 w-5 text-white transition-transform duration-500 ${buttonAnimation === "press" ? "rotate-180" : buttonAnimation === "release" ? "rotate-0" : "group-hover:rotate-12"}`,
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            "aria-hidden": "true",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: iconPath
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 w-60 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-sm text-slate-100 shadow-xl backdrop-blur transition-transform duration-300 ease-out animate-in slide-in-from-bottom",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-3 flex items-center justify-between text-xs uppercase tracking-widest text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: bundle.menuTitle
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setOpen(false),
                                className: "rounded px-2 py-1 text-slate-200 transition hover:bg-slate-800",
                                children: bundle.closeLabel
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "grid gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold uppercase tracking-widest text-slate-400",
                                        children: bundle.preferenceHeading
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 grid gap-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].map((option)=>{
                                            const active = option === locale;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setLocale(option);
                                                    setOpen(false);
                                                },
                                                className: `flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${active ? "border-blue-500 bg-blue-500/10 text-white" : "border-slate-800 hover:border-slate-700 hover:bg-slate-800"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: bundle.languageNames[option]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 23
                                                    }, this),
                                                    active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 34
                                                    }, this)
                                                ]
                                            }, option, true, {
                                                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                                lineNumber: 94,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: bundle.note
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/preferences",
                                        className: "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300",
                                        children: bundle.manageLink
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/LanguageSwitcher.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc42ae71._.js.map