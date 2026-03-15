import { docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import type { Node } from "fumadocs-core/page-tree";
import { i18n } from "@/lib/i18n";
import { localizePageTree } from "@/lib/tree-localization";

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
  const tree = localizePageTree(source.pageTree["en"], "en");
  const lines: string[] = [];

  function walk(nodes: Node[], depth: number) {
    let inSeparator = false;

    for (const node of nodes) {
      if (node.type === "separator") {
        if (node.name) {
          const indent = "  ".repeat(depth);
          lines.push(`${indent}- ${node.name}`);
          inSeparator = true;
        }

        continue;
      }

      const d = inSeparator ? depth + 1 : depth;
      const indent = "  ".repeat(d);

      if (node.type === "page") {
        const desc = node.description ? `: ${node.description}` : "";
        lines.push(`${indent}- [${node.name}](${baseUrl}${node.url})${desc}`);
      } else if (node.type === "folder") {
        if (node.index) {
          const desc = node.index.description
            ? `: ${node.index.description}`
            : "";
          lines.push(
            `${indent}- [${node.name}](${baseUrl}${node.index.url})${desc}`,
          );
        } else {
          lines.push(`${indent}- ${node.name}`);
        }
        walk(node.children, d + 1);
      }
    }
  }

  walk(tree.children, 0);
  return lines;
}

export async function getLLMFullText(baseUrl: string) {
  const pages = getEnglishPages().map(async (page) => {
    const processed = await page.data.getText("processed");
    return `--- ${page.data.title}\nSource: ${baseUrl}${page.url}\n${processed}`;
  });
  return Promise.all(pages);
}
