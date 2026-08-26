"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ShowcaseMarquee = dynamic(
  () => import("./showcase").then((module) => module.ShowcaseMarquee),
  { ssr: false },
);

/**
 * The marquee is visually below the hero, but its animation measures layout and
 * used to start video downloads during the LCP window. Load it only when the
 * visitor is about to reach it.
 */
export function DeferredShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isReady ? <ShowcaseMarquee /> : <div className="h-64" />}
    </div>
  );
}
