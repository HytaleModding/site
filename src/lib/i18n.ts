import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: [
    "ar-SA",
    "cs-CZ",
    "de-DE",
    "en",
    "es-ES",
    "fr-FR",
    "id-ID",
    "it-IT",
    "ja-JP",
    "nl-NL",
    "pt-BR",
    "pt-PT",
    "pl-PL",
    "ru-RU",
    "tr-TR",
    "uk-UA",
  ],
  parser: "dir",
});

// see: https://github.com/vercel/next.js/issues/74897
export const ogLanguageBlacklist = ["ar-SA"];
