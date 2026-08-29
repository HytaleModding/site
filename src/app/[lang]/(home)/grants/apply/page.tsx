import type { Metadata } from "next";
import { FilloutFullScreenEmbed } from "@fillout/react";

export const metadata: Metadata = {
  title: "Apply for a Grant | HytaleModding",
  description: "Apply for funding through the HytaleModding Grant Program.",
  alternates: { canonical: "/en/grants/apply" },
  openGraph: {
    type: "website",
    url: "/en/grants/apply",
    siteName: "HytaleModding",
  },
};

export default function ApplyPage() {
  return <FilloutFullScreenEmbed filloutId="4SS1AuUjYFus" inheritParameters />;
}
