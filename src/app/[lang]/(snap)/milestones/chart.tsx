"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import chartData from "./members_chart_data.json";

import { milestones } from "./data";

const chartConfig = {
  averageMembers: {
    label: "Average Members",
    color: "#2563eb",
  },
  currentMembers: {
    label: "Current Members",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const chartStartDate = new Date("2026-01-01").getTime();
const chartEndDate = milestones[milestones.length - 1].date.getTime();
const chartRevealDuration = 800;

const normalizedChartData = chartData
  .filter((d) => new Date(d.date).getTime() <= chartEndDate)
  .map((d) => ({ ...d, date: new Date(d.date).getTime() }));

function setActiveMilestone(dateStr: string | null) {
  document
    .querySelectorAll<HTMLElement>("[data-snap-section][data-date]")
    .forEach((element) => {
      const isActive = dateStr !== null && element.dataset.date === dateStr;

      if (isActive) {
        element.dataset.active = "true";
      } else {
        delete element.dataset.active;
      }
    });
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getRevealedChartData(cutoffDate: number | null) {
  if (cutoffDate === null) return [];

  const clampedCutoffDate = Math.min(
    Math.max(cutoffDate, chartStartDate),
    chartEndDate,
  );
  const revealedData = normalizedChartData.filter(
    (d) => d.date <= clampedCutoffDate,
  );
  const nextPoint = normalizedChartData.find((d) => d.date > clampedCutoffDate);
  const previousPoint = revealedData[revealedData.length - 1];

  if (
    !previousPoint ||
    !nextPoint ||
    previousPoint.date === clampedCutoffDate
  ) {
    return revealedData;
  }

  const progress =
    (clampedCutoffDate - previousPoint.date) /
    (nextPoint.date - previousPoint.date);

  return [
    ...revealedData,
    {
      ...previousPoint,
      date: clampedCutoffDate,
      averageMembers:
        previousPoint.averageMembers +
        (nextPoint.averageMembers - previousPoint.averageMembers) * progress,
      currentMembers:
        previousPoint.currentMembers +
        (nextPoint.currentMembers - previousPoint.currentMembers) * progress,
    },
  ];
}

export function MilestoneChart() {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [revealedDate, setRevealedDate] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const displayedChartData = useMemo(
    () => getRevealedChartData(revealedDate),
    [revealedDate],
  );

  useEffect(() => {
    const scroller = document.querySelector("[data-snap-scroller]");
    const activeDates = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dateStr = entry.target.getAttribute("data-date");
          if (!dateStr) return;

          if (entry.isIntersecting) {
            activeDates.add(dateStr);
          } else {
            activeDates.delete(dateStr);
          }
        });

        if (activeDates.size > 0) {
          const dates = Array.from(activeDates).map((d) => ({
            dateStr: d,
            time: new Date(d).getTime(),
          }));
          const nextTargetTime = Math.max(...dates.map((date) => date.time));
          const nextActiveDate = dates.find(
            (date) => date.time === nextTargetTime,
          );

          setTargetDate((currentTargetDate) =>
            currentTargetDate?.getTime() === nextTargetTime
              ? currentTargetDate
              : new Date(nextTargetTime),
          );
          setActiveMilestone(nextActiveDate?.dateStr ?? null);
          setIsVisible(true);
        } else {
          setActiveMilestone(null);
          setIsVisible(false);
        }
      },
      {
        root: scroller,
        threshold: 0.5,
      },
    );

    const checkElements = () => {
      const elements = document.querySelectorAll(
        "[data-snap-section][data-date]",
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Small delay to ensure elements are mounted
    setTimeout(checkElements, 100);

    return () => {
      observer.disconnect();
      setActiveMilestone(null);
    };
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const targetTime = targetDate.getTime();

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setRevealedDate((currentRevealedDate) => {
      const startTime = currentRevealedDate ?? chartStartDate;
      const distance = Math.abs(targetTime - startTime);

      if (distance === 0) return targetTime;

      const startedAt = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / chartRevealDuration, 1);
        const easedProgress = easeInOutCubic(progress);

        setRevealedDate(startTime + (targetTime - startTime) * easedProgress);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return startTime;
    });

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [targetDate]);

  return (
    <ChartContainer
      config={chartConfig}
      className="pointer-events-none fixed bottom-0 -z-10 h-[calc(100vh-100px)] w-screen"
      style={{
        opacity: isVisible ? 0.5 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <AreaChart data={displayedChartData}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          domain={[chartStartDate, chartEndDate]}
          type="number"
          scale="time"
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <YAxis
          dataKey="currentMembers"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          domain={[
            0,
            Math.max(...normalizedChartData.map((d) => d.currentMembers)),
          ]}
        />
        <Area
          dataKey="currentMembers"
          type="natural"
          fill="var(--color-background)"
          stroke="var(--color-currentMembers)"
          stackId="a"
          isAnimationActive={false}
          connectNulls={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
