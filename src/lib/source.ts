import { docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { i18n } from "@/lib/i18n";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  i18n,
});

// export function getPageImage(page: InferPageType<typeof source>) {
//   return {
//     segments: page.slugs,
//     url: `/og/docs/${page.locale}/${page.slugs.join("/")}`,
//   };
// }

function getEnglishPages() {
  return source.getPages().filter((page) => page.locale === "en");
}

export function getLLMIndex(baseUrl: string) {
  return getEnglishPages().map((page) => {
    const desc = page.data.description ? `: ${page.data.description}` : "";
    return `- [${page.data.title}](${baseUrl}${page.url})${desc}`;
  });
}

export async function getLLMFullText() {
  const pages = getEnglishPages().map(async (page) => {
    const processed = await page.data.getText("processed");
    return `# ${page.data.title}\n\n${processed}`;
  });
  return Promise.all(pages);
}
