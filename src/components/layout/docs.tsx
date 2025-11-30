// DocsLayout.tsx
"use client";
import type * as PageTree from "fumadocs-core/page-tree";
import { type ReactNode, useMemo, useState, useEffect } from "react";
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
  Menu,
  TriangleAlert,
} from "lucide-react";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return (stored as "light" | "dark") || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { theme, toggleTheme };
}

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  return (
    <TreeContextProvider tree={tree}>
      <div className="bg-background text-foreground min-h-screen">
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
    <header className="sticky top-0 z-50 border-b border-[#1A1A1C] border-gray-200 bg-[#111114] bg-white dark:border-[#1A1A1C] dark:bg-[#111114]">
      <nav className="flex h-[72px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-base font-bold text-black text-orange-300 dark:text-orange-300"
          >
            Hytale Modding
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-coral-400 absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-2 rounded-full px-4 py-1.5 md:flex">
            <TriangleAlert className="h-3.5 w-3.5 text-red-800" />
            <span className="text-xs font-medium text-red-800">
              Documentation WIP!
            </span>
            <span className="text-[10px] text-red-700">main @ 123abc</span>
          </div>

          <button
            className="p-2 text-black text-orange-300 md:hidden dark:text-orange-300"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-5 w-5" />
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
  const { theme, toggleTheme } = useTheme();

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
          "bg-background fixed top-[72px] left-0 z-40 h-[calc(100vh-72px)] w-[320px] overflow-y-auto border-r border-[#1A1A1C] border-gray-200 transition-transform md:sticky dark:border-[#1A1A1C]",
          !open && "max-md:-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col gap-4 p-6">
          {/* Header */}
          <div className="border-b-2 border-orange-300 pb-3">
            <h2 className="text-base font-bold text-black text-orange-300 dark:text-orange-300">
              Hytale Modding
            </h2>
          </div>

          {/* Search */}
          {enabled && (
            <button
              onClick={() => setOpenSearch(true)}
              className="flex items-center justify-between rounded-lg bg-orange-100 bg-orange-900 px-3 py-2 transition-colors hover:bg-[#3d2f21] hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-[#3d2f21]"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-orange-300 text-orange-700 dark:text-orange-300" />
                <span className="text-xs text-orange-300 text-orange-700 dark:text-orange-300">
                  Search...
                </span>
              </div>
              <div className="flex gap-1">
                <kbd className="rounded bg-orange-200 bg-orange-950 px-2 py-1 text-[10px] text-orange-200 text-orange-800 dark:bg-orange-950 dark:text-orange-200">
                  CTRL
                </kbd>
                <kbd className="rounded bg-orange-200 bg-orange-950 px-2 py-1 text-[10px] text-orange-200 text-orange-800 dark:bg-orange-950 dark:text-orange-200">
                  K
                </kbd>
              </div>
            </button>
          )}

          {/* Navigation */}
          <nav className="flex flex-1 flex-col gap-2">{children}</nav>

          {/* Footer Settings */}
          <div className="flex items-center justify-between border-t border-[#1A1A1C] border-gray-200 pt-4 dark:border-[#1A1A1C]">
            <button className="rounded-full bg-orange-200 bg-orange-800 p-2 transition-colors hover:bg-[#654630] hover:bg-orange-300 dark:bg-orange-800 dark:hover:bg-[#654630]">
              <Settings className="h-3.5 w-3.5 text-orange-300 text-orange-700 dark:text-orange-300" />
            </button>

            <div className="flex gap-1 rounded-full bg-[#1A1A1C] bg-gray-200 p-0.5 dark:bg-[#1A1A1C]">
              <button
                onClick={() => toggleTheme("light")}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  theme === "light"
                    ? "bg-orange-300 bg-orange-800 dark:bg-orange-800"
                    : "hover:bg-orange-200 hover:bg-orange-800 dark:hover:bg-orange-800",
                )}
              >
                <Sun className="h-3.5 w-3.5 text-orange-300 text-orange-700 dark:text-orange-300" />
              </button>
              <button
                onClick={() => toggleTheme("dark")}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  theme === "dark"
                    ? "bg-orange-300 bg-orange-800 dark:bg-orange-800"
                    : "hover:bg-orange-200 hover:bg-orange-800 dark:hover:bg-orange-800",
                )}
              >
                <Moon className="h-3.5 w-3.5 text-orange-300 text-orange-700 dark:text-orange-300" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
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
          "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-orange-200 bg-orange-900 font-medium text-orange-300 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            : "text-gray-600 text-orange-200 hover:bg-[#1A1A1C] hover:bg-gray-100 hover:text-orange-300 hover:text-orange-800 dark:text-orange-200 dark:hover:bg-[#1A1A1C] dark:hover:text-orange-300",
        )}
      >
        {isActive && (
          <div className="h-1.5 w-1.5 rounded-full bg-orange-200 bg-orange-600 dark:bg-orange-200" />
        )}
        {item.icon}
        {item.name}
      </Link>
    );
  }

  if (item.type === "separator") {
    return (
      <p className="mt-4 mb-2 text-xs font-medium text-gray-600 text-orange-200 first:mt-0 dark:text-orange-200">
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
              "flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
              pathname === item.index.url
                ? "font-medium text-orange-300 text-orange-800 dark:text-orange-300"
                : "text-gray-600 text-orange-200 hover:text-orange-300 hover:text-orange-800 dark:text-orange-200 dark:hover:text-orange-300",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {item.icon}
            {item.index.name}
          </Link>
          <button
            onClick={toggleOpen}
            className="rounded p-1 transition-colors hover:bg-[#1A1A1C] hover:bg-gray-100 dark:hover:bg-[#1A1A1C]"
            aria-label="Toggle folder"
          >
            <ChevronDown
              className={cn(
                "h-3 w-3 text-gray-600 text-orange-200 transition-transform duration-200 dark:text-orange-200",
                isOpen && "rotate-180",
              )}
            />
          </button>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm font-medium text-gray-600 text-orange-200 transition-colors hover:bg-[#1A1A1C] hover:bg-gray-100 hover:text-orange-300 hover:text-orange-800 dark:text-orange-200 dark:hover:bg-[#1A1A1C] dark:hover:text-orange-300"
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.name}
          </span>
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
      )}
      {isOpen && children && (
        <div className="relative mt-1 ml-4 flex flex-col gap-1 pl-3">
          {/* Decorative vertical line with gradient */}
          <div className="absolute top-0 bottom-0 left-0 w-[2px] rounded-full bg-orange-300 bg-orange-600 dark:bg-orange-300" />
          {children}
        </div>
      )}
    </div>
  );
}
