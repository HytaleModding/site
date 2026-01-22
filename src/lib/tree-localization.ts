import FallbackLanguage from "@/../messages/en.json";
import * as fs from "fs";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import * as path from "path";

export function localizePageTree(
  tree: DocsLayoutProps["tree"],
  lang: string,
): DocsLayoutProps["tree"] {
  let translations = FallbackLanguage;

  if (lang !== "en") {
    const langFilePath = path.join(process.cwd(), "messages", `${lang}.json`);
    if (fs.existsSync(langFilePath)) {
      translations = JSON.parse(fs.readFileSync(langFilePath, "utf-8"));
    } else {
      console.warn(
        `Translation file for language '${lang}' not found. Falling back to English.`,
      );
    }
  }

  function getTranslation(key: string): string {
    const parts = key.split(".");
    let value = translations;

    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = (value as Record<string, any>)[part];
      } else {
        value = FallbackLanguage;
        for (const fallbackPart of parts) {
          if (value && typeof value === "object" && fallbackPart in value) {
            value = (value as Record<string, any>)[fallbackPart];
          } else {
            return key;
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  }

  function translateString(text: string): string {
    if (!text || typeof text !== "string") return text;

    const match = text.match(/^\{(.+)\}$/);
    if (match) {
      return getTranslation(match[1]);
    }
    return text;
  }

  function traverseNode(node: any): any {
    if (!node) return node;

    if (node.name) node.name = translateString(node.name);

    if (node.title) node.title = translateString(node.title);

    if (node.index && typeof node.index === "object")
      node.index = traverseNode(node.index);

    if (Array.isArray(node.children))
      node.children = node.children.map(traverseNode);

    return node;
  }

  return traverseNode(tree);
}
