import FallbackLanguage from "@/../messages/en.json";
import * as fs from "fs";
import { Node, Root } from "fumadocs-core/page-tree";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import * as path from "path";

export function localizePageTree(
  tree: DocsLayoutProps["tree"],
  lang: string,
  options?: {
    translateName?: boolean;
    translateTitle?: boolean;
    translateIndex?: boolean;
    translateChildren?: boolean;
  },
): DocsLayoutProps["tree"] {
  const {
    translateName = true,
    translateTitle = true,
    translateIndex = true,
    translateChildren = true,
  } = options ?? {};

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

  function getTranslation(
    key: string,
    translationMap: Record<string, string | object>,
  ): string | undefined {
    const keys = key.split(".");
    let translated: string | Record<string, string | object> = translationMap;

    for (let i = 0; i < keys.length; i++) {
      if (translated == null || typeof translated !== "object")
        return undefined;
      translated = translated[keys[i]] as
        | string
        | Record<string, string | object>;
    }

    if (typeof translated !== "string") return undefined;

    return translated;
  }

  function translateString(text: string): string {
    if (!text || typeof text !== "string") return text;

    const match = text.match(/^\{(.+)\}$/);
    if (match) {
      let translation = getTranslation(match[1], translations);
      if (translation) return translation;

      console.debug(`key '{${match[1]}}' not found in '${lang}'`);
      translation = getTranslation(match[1], FallbackLanguage);
      if (translation) return translation;

      console.warn(`key '{${match[1]}}' not found in '${lang}' and EN`);
      return text;
    }

    return text;
  }

  function traverseNode<TraversableNode extends Node | Node[] | Root>(
    node: TraversableNode,
  ) {
    function traverseChildren(children: Node[]) {
      for (let i = 0; i < children.length; i++) {
        traverseNode(children[i]);
      }
    }

    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        traverseNode(node[i]);
      }
      return;
    }

    if (translateName && "name" in node && typeof node.name === "string")
      node.name = translateString(node.name);

    if (translateTitle && "title" in node && typeof node.title === "string")
      node.title = translateString(node.title);

    if (translateIndex && "index" in node && typeof node.index === "object")
      traverseNode(node.index);

    if (
      translateChildren &&
      "children" in node &&
      Array.isArray(node.children)
    ) {
      traverseChildren(node.children);
    }
  }

  traverseNode(tree);

  return tree;
}
