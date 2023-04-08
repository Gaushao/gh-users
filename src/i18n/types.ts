import TRANSLATIONS from "./translations";

export type TranslationLocale = keyof typeof TRANSLATIONS;
export type TranslationKey = keyof typeof TRANSLATIONS[TranslationLocale];
