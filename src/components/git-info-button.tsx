import { ExternalLinkIcon } from "lucide-react";
import { branch, commit } from "@/git-info.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function GitInfoButton() {
  return (
    <Button
      asChild
      className="fixed right-4 bottom-4 z-10 flex items-center gap-2"
    >
      <Link
        href={`https://github.com/HytaleModding/site/tree/${branch}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <div className="flex items-center gap-1.5">
          <ExternalLinkIcon className="size-4" />
          {branch}
        </div>
        <span className="text-muted-foreground">@ {commit}</span>
      </Link>
    </Button>
  );
}
