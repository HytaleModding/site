import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  description,
  align = "center",
  className,
}: {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <p className="text-muted-foreground text-xs font-bold tracking-[0.16em] uppercase">
          {kicker}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
