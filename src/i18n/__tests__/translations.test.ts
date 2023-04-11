import { mockTranslate } from "../../utils/mocks/hooks";
import I18N from "..";

test("translations", async () => {
  I18N.LOCALES.forEach((locale) => {
    const translations = I18N.TRANSLATIONS[locale];
    I18N.TRANSLATION_KEYS.forEach((key) => {
      expect(typeof translations[key] === "string").toBeTruthy();
    });
  });
});

test("translation hook", async () => {
  const i18n = I18N.TRANSLATION_KEYS[0];
  expect(typeof mockTranslate(i18n) === "string").toBeTruthy();
});
