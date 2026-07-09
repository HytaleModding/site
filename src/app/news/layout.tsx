import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { ViewTransition, type ReactNode } from "react";
import type { Metadata } from "next";
import { i18n } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";
import { baseUrl } from "@/lib/config";
import englishTranslations from "@/../messages/en.json";
import { DocumentAttributes } from "@/components/document-attributes";

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: englishTranslations.displayName ?? "en",
      search: englishTranslations.nav.search,
    },
  },
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "News | Hytale Modding",
  description: "News, guides, and community updates from HytaleModding.",
};

export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <RootProvider i18n={provider("en")}>
      <DocumentAttributes lang="en" dir="ltr" />
      <ViewTransition update="none">
        <HomeLayout
          {...baseOptions("en")}
          className="flex min-h-screen flex-col"
          i18n={false}
        >
          <div className="official flex flex-1 flex-col">{children}</div>
        </HomeLayout>
      </ViewTransition>
    </RootProvider>
  );
}
