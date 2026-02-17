console.log("Preparing development environment...");

import { rmdir } from "fs/promises";
import { existsSync } from "fs";

const languagesToRemove = [
  "af-ZA",
  "ar-SA",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "es-ES",
  "fr-FR",
  "hi-IN",
  "hu-HU",
  "id-ID",
  "it-IT",
  "ja-JP",
  "lt-LT",
  "lv-LV",
  "nl-NL",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ro-RO",
  "ru-RU",
  "sq-AL",
  "sv-SE",
  "tr-TR",
  "uk-UA",
  "vi-VN",
];

console.log("Removing non-English language directories from content/docs/...");

const removePromises = languagesToRemove.map(async (lang) => {
  const path = `content/docs/${lang}`;
  if (existsSync(path)) {
    await rmdir(path, { recursive: true });
    console.log(`Removed ${lang}`);
  }
});

await Promise.all(removePromises);

console.log("Development environment ready (English only for faster builds)");
console.log(
  "Run 'bun run dev:restore' to restore all languages after development",
);
