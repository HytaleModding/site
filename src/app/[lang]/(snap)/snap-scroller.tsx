"use client";

import { useEffect } from "react";

const SCROLL_DURATION = 700;
const WHEEL_THRESHOLD = 12;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(element: HTMLElement, target: number) {
  const start = element.scrollTop;
  const distance = target - start;
  const startedAt = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startedAt) / SCROLL_DURATION, 1);
    element.scrollTop = start + distance * easeInOutCubic(progress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

export function SnapScroller() {
  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>("[data-snap-scroller]");
    if (!scroller) return;

    let isSnapping = false;

    const getSnapPoints = () => {
      const sections = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-snap-section]"),
      );

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const scrollerRect = scroller.getBoundingClientRect();
      const centerSnapPoints = sections.map((section) => {
        const sectionRect = section.getBoundingClientRect();
        const centeredOffset =
          scroller.scrollTop +
          sectionRect.top -
          scrollerRect.top +
          (sectionRect.height - scrollerRect.height) / 2;

        return Math.max(0, Math.min(maxScroll, centeredOffset));
      });

      // Keep the hero snap pinned to the absolute top, but center every milestone.
      return [0, ...centerSnapPoints].sort((a, b) => a - b);
    };

    const getCurrentIndex = (points: number[]) => {
      const current = scroller.scrollTop;
      return points.reduce((closestIndex, point, index) => {
        const closestDistance = Math.abs(points[closestIndex] - current);
        const distance = Math.abs(point - current);
        return distance < closestDistance ? index : closestIndex;
      }, 0);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

      event.preventDefault();
      if (isSnapping) return;

      const points = getSnapPoints();
      const currentIndex = getCurrentIndex(points);
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(
        0,
        Math.min(points.length - 1, currentIndex + direction),
      );

      if (nextIndex === currentIndex) return;

      isSnapping = true;
      smoothScrollTo(scroller, points[nextIndex]);
      window.setTimeout(() => {
        isSnapping = false;
      }, SCROLL_DURATION + 80);
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      scroller.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
