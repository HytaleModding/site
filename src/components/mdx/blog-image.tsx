import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function BlogImage({
  className,
  alt = "",
  ...props
}: ComponentProps<"img">) {
  return (
    // Blog/news Markdown images usually come from external URLs and do not carry
    // dimensions, so render them as normal responsive images instead of next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cn("my-8 h-auto max-w-full rounded-lg border", className)}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
