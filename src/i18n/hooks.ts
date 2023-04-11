import { useMemo } from "react";
import TRANSLATIONS, { TranslationKey } from "./translations";
import Locale from "./locale";

const DEFAULT = TRANSLATIONS["en-US"];

export function useTranslation() {
  const { language } = navigator;
  return useMemo(() => TRANSLATIONS[language as Locale] || DEFAULT, [language]);
}

export function useTranslate(key?: TranslationKey) {
  const translation = useTranslation();
  return useMemo(() => (key && translation[key]) || key, [key, translation]);
}
useTranslate.key = "" as TranslationKey;
