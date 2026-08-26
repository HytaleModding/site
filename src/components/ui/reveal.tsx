"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 24,
  x = 0,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className ?? ""}`}
      style={{
        "--reveal-x": `${x}px`,
        "--reveal-y": `${y}px`,
        "--reveal-delay": `${delay}s`,
        "--reveal-duration": `${duration}s`,
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
