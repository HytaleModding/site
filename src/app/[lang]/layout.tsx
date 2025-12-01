import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import Script from "next/script";

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    "es-ES": {
      displayName: "Español",
      search: "Buscar",
    },
  },
});

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const lang = (await params).lang;
  return (
    <>
      <Script id="set-lang" strategy="beforeInteractive">
        {`document.documentElement.lang = '${lang}';`}
      </Script>
      <RootProvider i18n={provider(lang)}>{children}</RootProvider>
    </>
  );
}
