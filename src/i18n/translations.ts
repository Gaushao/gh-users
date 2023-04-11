import en from "./en.json";
import Locale from "./locale";
import pt from "./pt.json";

const TRANSLATIONS = {
  [Locale.enUS]: en,
  [Locale.ptBR]: pt,
};

export type TranslationKey = keyof typeof TRANSLATIONS[Locale];

export default TRANSLATIONS;
