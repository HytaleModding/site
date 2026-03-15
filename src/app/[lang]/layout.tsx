import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import englishTranslations from "@/../messages/en.json";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/config";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  keywords: [
    "hytale modding",
    "hytale",
    "hytale plugins",
    "hytale mods",
    "how to mod hytale",
    "modding tutorial",
    "modding guides",
    "hytale modding guides",
    "hytale modding tutorial",
    "how to start modding Hytale",
    "how to make a mod",
  ],
  alternates: {
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM-friendly site index" },
        { url: "/llms-full.txt", title: "LLM-friendly full documentation" },
      ],
    },
  },
};

const translations = Object.fromEntries(
  i18n.languages.map((lang) => {
    const messages = require(`@/../messages/${lang}.json`);
    return [
      lang,
      {
        displayName: messages.displayName ?? lang,
        ...(messages.nav?.search && {
          search: messages.nav.search ?? englishTranslations.nav.search,
        }),
      },
    ];
  }),
);

const { provider } = defineI18nUI(i18n, {
  translations,
});

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const dir = lang.startsWith("ar") ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body>
        <div className={cn(geist.className, geistMono.variable)}>
          <RootProvider i18n={provider(lang)}>{children}</RootProvider>
        </div>
      </body>
    </html>
  );
}
