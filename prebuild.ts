console.log("Generating git-info.json");

import { $ } from "bun";
import { rmdir } from "fs/promises";

//check if git is available
$`git --version`.catch(() => {
  console.warn("Git is not available. Skipping git-info.json generation.");
  process.exit(0);
});

$`git rev-parse --abbrev-ref HEAD`.then((branch) => {
  $`git rev-parse --short HEAD`.then((commit) => {
    const gitInfo = {
      branch: branch.text().trim(),
      commit: commit.text().trim(),
    };

    Bun.file("src/git-info.json").write(JSON.stringify(gitInfo, null, 2));
    console.log("git-info.json generated:", gitInfo);
  });
});

console.log("Finished generating git-info.json");
// console.log("Clearing image fetch cache...");

// await rmdir(".next/cache/images", { recursive: true }).catch((err) => {
//   if (err.code !== "ENOENT") {
//     console.error("Failed to clear image fetch cache:", err);
//   }
// });

// console.log("Image fetch cache cleared.");
