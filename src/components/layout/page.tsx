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
        <article className="flex-1 max-w-[860px] mx-auto px-8 py-12">
          {props.children}
          <FooterClient />
        </article>

        {toc.length > 0 && (
          <aside className="hidden xl:block w-60 shrink-0 sticky top-[72px] h-[calc(100vh-72px)] p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-orange-300 ">
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
