import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import Script from "next/script";
import englishTranslations from "@/../messages/en.json";

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
  "use cache";
  const { lang } = await params;
  const dir = lang.startsWith("ar") ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body>
        <RootProvider i18n={provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
