"use client";

import { useEffect, useRef, useState } from "react";

type DeferredYouTubeEmbedProps = {
  videoId: string;
  title: string;
};

/** Loads the normal YouTube player only as it approaches the viewport. */
export function DeferredYouTubeEmbed({
  videoId,
  title,
}: DeferredYouTubeEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsLoaded(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 bg-black">
      {isLoaded && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}
