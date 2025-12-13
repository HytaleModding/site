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
    },
    "af-ZA": {
      displayName: "Afrikaans",
    },
    "de-DE": {
      displayName: "Deutsch",
    },
    "id-ID": {
      displayName: "Indonesia",
    },
    "fr-FR": {
      displayName: "Français",
    },
    "hi-IN": {
      displayName: "हिन्दी",
      search: "खोजें",
    },
    "pt-BR": {
      displayName: "Português (Brasil)",
    },
    "ru-RU": {
      displayName: "Русский",
    },
    "tr-TR": {
      displayName: "Türkçe",
    },
    "ar-SA": {
      displayName: "العربية",
    },
  },
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
        <RootProvider i18n={provider(lang)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
