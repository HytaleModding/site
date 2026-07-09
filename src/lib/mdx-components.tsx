import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { ImageZoom } from "@/components/image-zoom";
import { ParameterList } from "@/components/mdx/parameter-list";
import { OfficialDocumentationNotice } from "@/components/mdx/official-documentation-notice";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Answer } from "@/components/mdx/answer";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    Callout,
    ParameterList,
    OfficialDocumentationNotice,
    img: ImageZoom,
    Card,
    Cards,
    Answer,
    ...components,
  };
}
