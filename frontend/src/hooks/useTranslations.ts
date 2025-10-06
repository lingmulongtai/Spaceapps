"use client";

import { useMemo } from "react";

import type { MessageBundle } from "@/i18n/messages";
import { messages } from "@/i18n/messages";
import { useLocaleStore } from "@/store/useLocaleStore";

export type TranslationKeys<T> = T extends object ? {
  [K in keyof T]: TranslationKeys<T[K]>;
} : string;

export default function useTranslations<T extends keyof MessageBundle>(section: T) {
  const locale = useLocaleStore((state) => state.locale);

  const sectionMessages = useMemo(() => messages[locale][section], [locale, section]);

  return sectionMessages;
}


