import { DocsLayout } from '@/components/layout/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsBanner } from './docs-banner'; // Adjust path as needed

export default function Layout({ children }: LayoutProps<"/docs">) {
return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}