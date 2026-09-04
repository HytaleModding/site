import type { ReactNode } from "react";
import { Clock3Icon, MessageCircleQuestionIcon } from "lucide-react";

function timestampToSeconds(timestamp: string) {
  const parts = timestamp.split(":").map(Number);
  if (parts.some(Number.isNaN) || parts.length < 2 || parts.length > 3) {
    return null;
  }

  return parts.reduce((total, part) => total * 60 + part, 0);
}

export function TownHallQuestion({
  title,
  askedBy,
  timestamp,
  videoId,
  children,
}: {
  title: string;
  askedBy?: string;
  timestamp?: string;
  videoId?: string;
  children: ReactNode;
}) {
  const seconds = timestamp ? timestampToSeconds(timestamp) : null;
  const timestampHref =
    videoId && seconds !== null
      ? `https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`
      : undefined;

  return (
    <section className="not-prose border-border/80 bg-muted/35 my-8 overflow-hidden rounded-2xl border">
      <div className="border-border/70 bg-background/70 border-b px-5 py-5 sm:px-6">
        <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 tracking-wide uppercase">
            <MessageCircleQuestionIcon className="size-3.5" />
            Community question
          </span>
          {askedBy && <span>Asked by {askedBy}</span>}
          {timestampHref && (
            <a
              href={timestampHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <Clock3Icon className="size-3.5" />
              {timestamp}
            </a>
          )}
        </div>
        <h3 className="text-foreground text-lg leading-snug font-semibold text-balance sm:text-xl">
          {title}
        </h3>
      </div>
      <div className="px-4 py-1 sm:px-5">{children}</div>
    </section>
  );
}
