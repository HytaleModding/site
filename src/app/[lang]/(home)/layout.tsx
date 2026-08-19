import { ViewTransition, type ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HytaleModding",
  description:
    "An unofficial community for modding Hytale, providing guides, documentation, and resources.",
};

export default async function Layout({
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
        searchToggle={{ enabled: false }}
        className="flex min-h-screen flex-col"
      >
        {children}
      </HomeLayout>
    </ViewTransition>
  );
}
