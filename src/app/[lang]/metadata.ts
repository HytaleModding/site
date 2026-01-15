import type { Metadata } from "next";

const SITE_URL = "https://hytalemodding.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: SITE_URL,
    languages: {
      af: `${SITE_URL}/af-ZA`,
      ar: `${SITE_URL}/ar-SA`,
      de: `${SITE_URL}/de-DE`,
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es-ES`,
      fr: `${SITE_URL}/fr-FR`,
      hi: `${SITE_URL}/hi-IN`,
      id: `${SITE_URL}/id-ID`,
      it: `${SITE_URL}/it-IT`,
      ja: `${SITE_URL}/ja-JP`,
      lv: `${SITE_URL}/lv-LV`,
      lt: `${SITE_URL}/lt-LT`,
      nl: `${SITE_URL}/nl-NL`,
      "pt-BR": `${SITE_URL}/pt-BR`,
      "pt-PT": `${SITE_URL}/pt-PT`,
      pl: `${SITE_URL}/pl-PL`,
      ro: `${SITE_URL}/ro-RO`,
      ru: `${SITE_URL}/ru-RU`,
      tr: `${SITE_URL}/tr-TR`,
      uk: `${SITE_URL}/uk-UA`,
      vi: `${SITE_URL}/vi-VN`,
    },
  },

  openGraph: {
    type: "website",
    siteName: "Hytale Modding",
    url: SITE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hytale Modding",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};
