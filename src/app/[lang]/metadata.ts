import type { Metadata } from "next";

const SITE_URL = "https://hytalemodding.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: SITE_URL,
    languages: {
      af: `${SITE_URL}/af-ZA`,
      de: `${SITE_URL}/de-DE`,
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es-ES`,
      fr: `${SITE_URL}/fr-FR`,
      id: `${SITE_URL}/id-ID`,
      it: `${SITE_URL}/it-IT`,
      ja: `${SITE_URL}/ja-JP`,
      nl: `${SITE_URL}/nl-NL`,
      "pt-BR": `${SITE_URL}/pt-BR`,
      "pt-PT": `${SITE_URL}/pt-PT`,
      ru: `${SITE_URL}/ru-RU`,
      uk: `${SITE_URL}/uk-UA`,
    },
  },

  openGraph: {
    type: "website",
    siteName: "HytaleModding",
    url: SITE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HytaleModding",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};
