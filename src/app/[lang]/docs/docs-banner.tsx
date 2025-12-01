"use client";

import { branch, commit } from "@/git-info.json";
import Link from "next/link";
import { ExternalLinkIcon, AlertTriangle } from "lucide-react";

export function DocsBanner() {
  return (
    <div className="border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-screen-2xl px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <AlertTriangle className="size-5" />
            <span className="font-medium">Documentation In Progress</span>
          </div>
          <Link
            href={`https://github.com/HytaleModding/site/tree/${branch}`}
            className="flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400"
          >
            <ExternalLinkIcon className="size-4" />
            <span>{branch}</span>
            <span className="text-slate-400 dark:text-slate-600">@</span>
            <span>{commit}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
