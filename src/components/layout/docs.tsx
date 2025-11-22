// DocsLayout.tsx
"use client";
import type * as PageTree from "fumadocs-core/page-tree";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { type ComponentProps, type ReactNode, useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { TreeContextProvider, useTreeContext } from "fumadocs-ui/contexts/tree";
import Link from "fumadocs-core/link";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { usePathname } from "fumadocs-core/framework";
import {
  Search,
  Settings,
  Sun,
  Moon,
  ChevronDown,
  BookOpen,
  MessageSquare,
  Menu,
  TriangleAlert,
} from "lucide-react";

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  return (
    <TreeContextProvider tree={tree}>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex">
          <Sidebar />
          {children}
        </main>
      </div>
    </TreeContextProvider>
  );
}

function Header() {
  const { setOpenSearch } = useSearchContext();
  const { open, setOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A1A1C] bg-[#111114]">
      <nav className="flex items-center justify-between h-[72px] px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-base font-bold text-primary ">
            Hytale Modding
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Alert Badge */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-400">
            <TriangleAlert className="w-3.5 h-3.5 text-red-800" />
            <span className="text-xs font-medium text-red-800 ">
              Documentation in Progress!
            </span>
            <span className="text-[10px] text-red-700 ">
              documentation @ 2de03df
            </span>
          </div>

          {/* External Links */}
          {/* <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-800">
            <BookOpen className="w-3.5 h-3.5 text-orange-300" />
            <span className="text-xs font-medium text-orange-300 ">
              Documentation
            </span>
          </button>

          <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-800">
            <MessageSquare className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-xs font-medium text-blue-300 ">
              Discord
            </span>
          </button> */}

          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setOpen(!open)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}

function Sidebar() {
  const { root } = useTreeContext();
  const { open, setOpen } = useSidebar();
  const { enabled, setOpenSearch } = useSearchContext();

  const children = useMemo(() => {
    function renderItems(items: PageTree.Node[]) {
      return items.map((item) => (
        <SidebarItem key={item.$id} item={item}>
          {item.type === "folder" ? renderItems(item.children) : null}
        </SidebarItem>
      ));
    }
    return renderItems(root.children);
  }, [root]);

  return (
    <>
      <aside
        className={cn(
          "fixed md:sticky top-[72px] left-0 h-[calc(100vh-72px)] w-[320px] border-r border-[#1A1A1C] bg-background overflow-y-auto transition-transform z-40",
          !open && "max-md:-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-4 p-6 h-full">
          {/* Header */}
          <div className="pb-3 border-b-2 border-orange-300">
            <h2 className="text-base font-bold text-primary">Hytale Modding</h2>
          </div>

          {/* Search */}
          {enabled && (
            <button
              onClick={() => setOpenSearch(true)}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-orange-900 hover:bg-[#3d2f21] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-orange-300" />
                <span className="text-xs text-orange-300">Search...</span>
              </div>
              <div className="flex gap-1">
                <kbd className="px-2 py-1 rounded text-[10px] bg-orange-950 text-orange-200">
                  CTRL
                </kbd>
                <kbd className="px-2 py-1 rounded text-[10px] bg-orange-950 text-orange-200">
                  K
                </kbd>
              </div>
            </button>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1">{children}</nav>

          {/* Footer Settings */}
          <div className="pt-4 border-t border-[#1A1A1C] flex items-center justify-between">
            <button className="p-2 rounded-full bg-orange-800 hover:bg-[#654630] transition-colors">
              <Settings className="w-3.5 h-3.5 text-orange-300" />
            </button>

            <div className="flex gap-1 p-0.5 rounded-full bg-[#1A1A1C]">
              <button className="p-2 rounded-full hover:bg-orange-800 transition-colors">
                <Sun className="w-3.5 h-3.5 text-orange-300" />
              </button>
              <button className="p-2 rounded-full bg-orange-800 hover:bg-[#654630] transition-colors">
                <Moon className="w-3.5 h-3.5 text-orange-300" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

function SidebarItem({
  item,
  children,
}: {
  item: PageTree.Node;
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Load initial state from localStorage
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(`sidebar-${item.$id}`);
    return stored !== null ? JSON.parse(stored) : true;
  });

  // Save state to localStorage whenever it changes
  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem(`sidebar-${item.$id}`, JSON.stringify(newState));
    }
  };

  if (item.type === "page") {
    const isActive = pathname === item.url;
    return (
      <Link
        href={item.url}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors",
          isActive
            ? "text-orange-300 font-medium bg-orange-900"
            : "text-orange-200 hover:text-orange-300 hover:bg-[#1A1A1C]"
        )}
      >
        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-orange-200" />}
        {item.icon}
        {item.name}
      </Link>
    );
  }

  if (item.type === "separator") {
    return (
      <p className="text-muted text-xs font-medium mt-4 mb-2 first:mt-0">
        {item.icon}
        {item.name}
      </p>
    );
  }

  // Folder
  return (
    <div className="flex flex-col">
      {item.index ? (
        <div className="flex items-center gap-1">
          <Link
            href={item.index.url}
            className={cn(
              "flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors",
              pathname === item.index.url
                ? "text-orange-300 font-medium"
                : "text-orange-200 hover:text-orange-300"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {item.icon}
            {item.index.name}
          </Link>
          <button
            onClick={toggleOpen}
            className="p-1 rounded hover:bg-[#1A1A1C] transition-colors"
            aria-label="Toggle folder"
          >
            <ChevronDown
              className={cn(
                "w-3 h-3 text-orange-200 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          className="flex items-center justify-between px-2 py-1.5 text-sm text-orange-200 font-medium hover:text-orange-300 hover:bg-[#1A1A1C] rounded-lg transition-colors w-full text-left"
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.name}
          </span>
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      )}
      {isOpen && children && (
        <div className="relative ml-4 mt-1 flex flex-col gap-1 pl-3">
          {/* Decorative vertical line with gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-300 rounded-full" />
          {children}
        </div>
      )}
    </div>
  );
}
