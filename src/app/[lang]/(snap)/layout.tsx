import { ViewTransition, type ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Metadata } from "next";
import { SnapScroller } from "./snap-scroller";

export const metadata: Metadata = {
  title: "Hytale Modding",
  description:
    "An unofficial community for modding Hytale, providing guides, documentation, and resources.",
};

export default async function SnapLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <ViewTransition update="none">
      <HomeLayout
        {...baseOptions(lang)}
        className="h-screen overflow-y-auto"
        data-snap-scroller
      >
        <SnapScroller />
        <div className="flex flex-col">{children}</div>
      </HomeLayout>
    </ViewTransition>
  );
}
