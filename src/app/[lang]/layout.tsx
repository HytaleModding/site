import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import Script from "next/script";
import englishTranslations from "@/../messages/en.json";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";
import { cn } from "@/lib/utils";
import fallbackMessages from "@/../messages/en.json";
import { headers } from "next/headers";

const geist = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const otherLangs = i18n.languages.filter((l) => l !== lang);

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || `/${lang}`;

  // Remove the language prefix from pathname to get the page path
  const pagePath = pathname.replace(`/${lang}`, "");

  const messages = require(`@/../messages/${lang}.json`);

  return {
    metadataBase: new URL(siteUrl),
    keywords: messages.meta?.keywords || fallbackMessages.meta.keywords,

    alternates: {
      canonical: `${siteUrl}/${lang}${pagePath}`,
      languages: {
        ...Object.fromEntries(
          otherLangs.map((l) => [l, `${siteUrl}/${l}${pagePath}`]),
        ),
      },
    },

    openGraph: {
      type: "website",
      siteName: "Hytale Modding",
      url: `${siteUrl}/${lang}${pagePath}`,
    },
  };
}
