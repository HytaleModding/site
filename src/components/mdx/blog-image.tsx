import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function isDirectVideo(src?: string) {
  if (!src) return false;

  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

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
      className={cn(
        "not-prose my-8 block h-auto w-auto max-w-full rounded-lg border object-contain",
        className,
      )}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}

export function BlogVideo({
  className,
  controls = true,
  ...props
}: ComponentProps<"video">) {
  return (
    <video
      className={cn(
        "not-prose my-8 aspect-video w-full max-w-[704px] rounded-xl border bg-black object-contain",
        className,
      )}
      controls={controls}
      preload="metadata"
      {...props}
    />
  );
}

export function BlogIframe({
  className,
  src,
  title,
  ...props
}: ComponentProps<"iframe">) {
  if (isDirectVideo(src)) {
    return <BlogVideo src={src} title={title} />;
  }

  return (
    <iframe
      className={cn(
        "not-prose my-8 aspect-video w-full max-w-[704px] rounded-xl border",
        className,
      )}
      src={src}
      title={title}
      loading="lazy"
      allowFullScreen
      {...props}
    />
  );
}
