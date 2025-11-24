import { AnchorProvider, type TOCItemType } from "fumadocs-core/toc";
import FooterClient from "@/components/layout/PageClient";
import { TocItemClient } from "@/components/layout/PageClient";
import { type ReactNode } from "react";

export interface DocsPageProps {
  toc?: TOCItemType[];
  children: ReactNode;
}

export function DocsPage({ toc = [], ...props }: DocsPageProps) {
  return (
    <AnchorProvider toc={toc}>
      <div className="flex flex-1">
        <article className="mx-auto max-w-[860px] flex-1 px-8 py-12">
          {props.children}
          <FooterClient />
        </article>

        {toc.length > 0 && (
          <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-60 shrink-0 p-6 xl:block">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-orange-300">
                  On this page
                </span>
              </div>
              {toc.map((item) => (
                <TocItemClient key={item.url} item={item} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </AnchorProvider>
  );
}