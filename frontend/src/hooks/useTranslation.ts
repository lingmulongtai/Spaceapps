"use client";

import { useState } from "react";

type TranslationPayload = {
  text: string;
  target_language: string;
};

type TranslationResult = {
  provider: string;
  text: string;
  target_language: string;
  status: string;
  note?: string | null;
  detected_source_language?: string | null;
};

export default function useTranslation() {
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestTranslation = async (payload: TranslationPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Translation request failed");
      }

      const data = (await response.json()) as TranslationResult;

      if (data.status !== "success") {
        setError(data.note ?? "Translation failed");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    error,
    requestTranslation,
  };
}


