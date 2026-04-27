import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";
import { ImageZoom } from "@/components/image-zoom";
import { Mermaid } from "@/components/mdx/mermaid";
import { ParameterList } from "@/components/mdx/parameter-list";
import { OfficialDocumentationNotice } from "@/components/mdx/official-documentation-notice";
import * as TabsComponents from "fumadocs-ui/components/tabs";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ...TabsComponents,
    Callout,
    ParameterList,
    Mermaid,
    OfficialDocumentationNotice,
    img: ImageZoom,
  };
}
