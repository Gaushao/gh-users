import TRANSLATIONS, { TranslationKey } from "./translations";
import * as hooks from "./hooks";
import Locale from "./locale";

const LOCALES = Object.values(Locale);

const TRANSLATION_KEYS = (() => {
  const keys = new Set();
  LOCALES.forEach((locale) => {
    Object.keys(TRANSLATIONS[locale]).forEach(keys.add.bind(keys));
  });
  return Array.from(keys) as TranslationKey[];
})();

const I18N = {
  ...hooks,
  LOCALES,
  TRANSLATIONS,
  TRANSLATION_KEYS,
};

export default I18N;
