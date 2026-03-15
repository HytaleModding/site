import { baseUrl } from "@/lib/config";
import { getLLMIndex } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const entries = getLLMIndex(baseUrl);

  const header = [
    "# Hytale Modding Documentation",
    "> The number one community resource for modding Hytale, featuring comprehensive guides, detailed documentation, and essential tools to kickstart your modding journey.",
    "",
    "## Docs",
    "",
  ].join("\n");

  const footer = [
    "\n",
    "## Links",
    `- [Full Documentation (LLM-optimized)](${baseUrl}/llms-full.txt)`,
    `- [Wiki](https://wiki.hytalemodding.dev) - This is the official Wiki project from HytaleModding. It allows mod teams to create and manage documentation for their mods, making it easy for players and developers to find the information they need.`,
    "",
  ].join("\n");

  return new Response(header + entries.join("\n") + footer);
}
