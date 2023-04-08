import { useMemo } from "react";
import TRANSLATIONS from "./translations";
import { TranslationKey, TranslationLocale } from "./types";

const DEFAULT = TRANSLATIONS["en-US"];

export function useTranslations() {
  const { language } = navigator;
  return useMemo(
    () => TRANSLATIONS[language as TranslationLocale] || DEFAULT,
    [language]
  );
}

export function useTranslate(key?: TranslationKey) {
  const translations = useTranslations();
  return useMemo(() => (key && translations[key]) || key, [key, translations]);
}
