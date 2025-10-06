import { create } from "zustand";

import { Locale, locales, isLocale } from "@/i18n/messages";

type LocaleState = {
  locale: Locale;
  setLocale: (locale: string) => void;
  cycleLocale: () => void;
};

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale: "en",
  setLocale: (value: string) => {
    set((state) => ({
      ...state,
      locale: isLocale(value) ? value : state.locale,
    }));
  },
  cycleLocale: () => {
    const current = get().locale;
    const index = locales.indexOf(current);
    const next = locales[(index + 1) % locales.length];
    set({ locale: next });
  },
}));


