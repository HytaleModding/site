import { ViewTransition, type ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HytaleModding",
  description:
    "HytaleModding is the largest community of modders for Hytale. We bring modders together to build, share, and celebrate what they make. We write docs, guides, and tools for modders of every skill level, and run events like ModJams, town halls, and more!",

  alternates: {
    canonical: "/",
    languages: {
      af: "/af-ZA",
      de: "/de-DE",
      en: "/en",
      es: "/es-ES",
      fr: "/fr-FR",
      id: "/id-ID",
      it: "/it-IT",
      ja: "/ja-JP",
      nl: "/nl-NL",
      "pt-BR": "/pt-BR",
      "pt-PT": "/pt-PT",
      ru: "/ru-RU",
      uk: "/uk-UA",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HytaleModding",
    url: "/",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "HytaleModding" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
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
