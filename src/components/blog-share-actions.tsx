"use client";

import { useState } from "react";
import { CheckIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogShareActions({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const xIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-3" aria-label="Share this post">
      <Button asChild variant="outline">
        <a href={xIntentUrl} target="_blank" rel="noopener noreferrer">
          <span className="text-xs font-black" aria-hidden="true">
            X
          </span>
          Share on X
        </a>
      </Button>
      <Button type="button" variant="outline" onClick={copyLink}>
        {copied ? <CheckIcon /> : <LinkIcon />}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}
