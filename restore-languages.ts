console.log("Restoring language directories...");

import { $ } from "bun";

const languagesToRestore = [
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

console.log("Restoring deleted language directories from git...");

try {
  // Restore each language directory individually
  for (const lang of languagesToRestore) {
    const path = `./content/docs/${lang}/`;
    try {
      await $`git reset -q -- ${path}`; // Unstage any changes to the directory
      await $`git restore -q ${path}`; // Restore the directory from the last commit
      await $`git add ${path}`; // Stage the restored directory
      console.log(`   Restored ${lang}`);
    } catch {
      // If the directory was not deleted or already restored, ignore the error
    }
  }

  console.log("All language directories restored successfully");
  console.log("Your changes in content/docs/en remain untouched\n");
} catch (error) {
  console.log("Something went wrong while restoring languages:");
  console.error(error);
}
