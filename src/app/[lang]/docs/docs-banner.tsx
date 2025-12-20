"use client";

import { branch, commit } from "@/git-info.json";
import Link from "next/link";
import { ExternalLinkIcon, AlertTriangle } from "lucide-react";

export function DocsBanner() {
  return (
    <div className="border-fd-warning/50 bg-fd-warning/10 text-fd-warning mb-4 flex gap-2 rounded-md border p-2 text-balance">
      <AlertTriangle className="size-5" />
      <span className="font-medium">
        Documentation is still work in progress
      </span>
    </div>
  );
}

export function DocsFooter() {
  return (
    <Link
      href={`https://github.com/HytaleModding/site/tree/${branch}`}
      className="flex gap-2 p-2 rounded-md border mt-4 items-center"
    >
      <ExternalLinkIcon className="size-4" />
      <span>{branch}</span>
      <span className="text-muted-foreground">@ {commit}</span>
    </Link>
  );
}
