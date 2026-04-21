import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import { DocsFooter } from "./docs-banner";
import { ViewTransition } from "react";
import { localizePageTree } from "@/lib/tree-localization";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]/docs">) {
  return (
    <ViewTransition update="none">
      <div className="flex min-h-screen flex-col">{children}</div>
    </ViewTransition>
  );
}
