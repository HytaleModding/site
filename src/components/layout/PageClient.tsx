'use client';
import { useActiveAnchors } from 'fumadocs-core/toc';
import { useTreeContext } from 'fumadocs-ui/contexts/tree';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import type * as PageTree from 'fumadocs-core/page-tree';
import { ComponentProps, useMemo } from 'react';
import { type TOCItemType } from 'fumadocs-core/toc';
import { cn } from '../../lib/cn';


export function TocItemClient({ item }: { item: TOCItemType }) {
  const activeAnchors = useActiveAnchors();
  const isActive = activeAnchors.includes(item.url.slice(1));

  return (
    <a
      href={item.url}
      className={cn(
        'text-xs transition-colors  flex items-center gap-2',
        isActive ? 'text-orange-300 font-medium' : 'text-stone-400 hover:text-orange-300'
      )}
      style={{ paddingLeft: Math.max(0, item.depth - 2) * 16 }}
    >
      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-orange-200" />}
      {item.title}
    </a>
  );
}

export default function FooterClient() {
  const { root } = useTreeContext();
  const pathname = usePathname();

  const flatten = useMemo(() => {
    const result: PageTree.Item[] = [];
    function scan(items: PageTree.Node[]) {
      for (const item of items) {
        if (item.type === 'page') result.push(item);
        else if (item.type === 'folder') {
          if (item.index) result.push(item.index);
          scan(item.children);
        }
      }
    }
    scan(root.children);
    return result;
  }, [root]);

  const { previous, next } = useMemo(() => {
    const idx = flatten.findIndex((item) => item.url === pathname);
    if (idx === -1) return {};
    return {
      previous: flatten[idx - 1],
      next: flatten[idx + 1],
    };
  }, [flatten, pathname]);

  if (!previous && !next) return null;

  return (
    <div className="flex gap-4 mt-12 pt-6 border-t border-surface">
      {previous && (
        <Link
          href={previous.url}
          className="flex-1 p-4 rounded-lg bg-surface border-l-4 border-orange-300 hover:bg-elevated transition-colors"
        >
          <div className="text-xs text-stone-400 mb-1 ">Previous</div>
          <div className="text-sm font-medium text-text-primary ">
            {previous.name}
          </div>
        </Link>
      )}
      {next && (
        <Link
          href={next.url}
          className="flex-1 p-4 rounded-lg bg-surface border-r-4 border-orange-300 hover:bg-elevated transition-colors text-right ml-auto"
        >
          <div className="text-xs text-stone-400 mb-1 ">Next</div>
          <div className="text-sm font-medium text-text-primary ">
            {next.name}
          </div>
        </Link>
      )}
    </div>
  );
}

export function DocsTitle(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className={cn(
        'text-5xl font-bold bg-gradient-to-t from-text-gradient-start to-text-gradient-end bg-clip-text ',
        props.className
      )}
      style={{ WebkitTextFillColor: 'transparent' }}
    >
      {props.children}
    </h1>
  );
}
// TODO: please uh do these
// make the text thing more margin with the description, like add more space in it 
// also make the sep under the desc be aligned to how long the text is and be right behind the text, by like 5px
export function DocsDescription(props: ComponentProps<'p'>) {
  if (props.children === undefined) return null;
  return (
    <p
      {...props}
      className={cn('text-xs text-text-muted ', props.className)}
      > 
      {props.children}
    </p>
  );
}

export function DocsBody(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'prose max-w-none text-text-primary',
        '[&_a]:bg-gradient-to-t [&_a]:from-text-gradient-start [&_a]:to-text-gradient-end [&_a]:bg-clip-text [&_a]:font-bold',
        '[&_blockquote]:border-l-4 [&_blockquote]:border-orange-300 [&_blockquote]:pl-4 [&_blockquote]:text-stone-400 [&_blockquote]:italic',
        '[&_pre]:bg-surface [&_pre]:p-4 [&_pre]:rounded-lg',
        '[&_code]:font-["Azeret_Mono"] [&_code]:text-xs'
      )}
    >
      {props.children}
    </div>
  );
}
