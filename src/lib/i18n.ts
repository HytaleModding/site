import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: [
    "af-ZA",
    "ar-SA",
    "de-DE",
    "en",
    "es-ES",
    "fr-FR",
    "hi-IN",
    "id-ID",
    "it-IT",
    "ja-JP",
    "lv-LV",
    "lt-LT",
    "nl-NL",
    "pt-BR",
    "pt-PT",
    "pl-PL",
    "ro-RO",
    "ru-RU",
    "tr-TR",
    "uk-UA",
    "vi-VN",
  ],
  parser: "dir",
});

// see: https://github.com/vercel/next.js/issues/74897
export const ogLanguageBlacklist = ["ar-SA"];
