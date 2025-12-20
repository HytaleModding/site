import "./docs.css";

import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import { DocsBanner, DocsFooter } from "./docs-banner";
import { ViewTransition } from "react";
import { localizePageTree } from "@/lib/tree-localization";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params;
  const tree = localizePageTree(source.pageTree[lang], lang);

  return (
    <ViewTransition update="none">
      <div className="flex min-h-screen flex-col">
        <DocsLayout
          tree={tree}
          {...baseOptions(lang, true)}
          githubUrl="https://github.com/HytaleModding/site"
          sidebar={{
            banner: <DocsBanner />,
            footer: <DocsFooter />,
          }}
        >
          {children}
        </DocsLayout>
      </div>
    </ViewTransition>
  );
}
