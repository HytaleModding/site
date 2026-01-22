import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";
import { ImageZoom } from "@/components/image-zoom";
import { ParameterList } from "@/components/mdx/parameter-list";
import { OfficialDocumentationNotice } from "@/components/mdx/official-documentation-notice";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Callout,
    ParameterList,
    OfficialDocumentationNotice,
    img: ImageZoom,
  };
}
