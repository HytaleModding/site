import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import { ViewTransition } from "react";
import { localizePageTree } from "@/lib/tree-localization";
import { cn } from "@/lib/utils";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
  children: React.ReactNode;
}) {
  const { lang, slug } = await params;

  const tree = localizePageTree(source.pageTree[lang], lang, {
    translateName: true,
    translateTitle: true,
    translateIndex: false,
    translateChildren: true,
  });

  return (
    <ViewTransition name="docs-layout">
      <div
        className={slug?.includes("official-documentation") ? "official" : ""}
      >
        <DocsLayout
          tree={tree}
          {...baseOptions(lang, true)}
          githubUrl="https://github.com/HytaleModding/site"
        >
          {children}
        </DocsLayout>
      </div>
    </ViewTransition>
  );
}
