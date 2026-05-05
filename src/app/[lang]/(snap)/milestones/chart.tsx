"use client";

import { useEffect, useState } from "react";
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

export function MilestoneChart() {
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    const scroller = document.querySelector("[data-snap-scroller]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dateStr = entry.target.getAttribute("data-date");
            if (dateStr) {
              setTargetDate(new Date(dateStr));
            }
          }
        });
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

    return () => observer.disconnect();
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="fixed bottom-0 -z-10 h-[calc(100vh-100px)] w-screen opacity-50"
    >
      <AreaChart
        data={chartData.filter((data) => new Date(data.date) <= targetDate)}
      >
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
        />
        <Area
          dataKey="currentMembers"
          type="natural"
          fill="var(--color-background)"
          stroke="var(--color-currentMembers)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
