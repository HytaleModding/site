import type { Metadata } from "next";
import { PressContent } from "./press-content";
import { Footer } from "../footer";

export const metadata: Metadata = {
  title: "Press Kit | HytaleModding",
  description:
    "Learn about HytaleModding, download our logos and brand assets, and get in touch with the team.",
  alternates: {
    canonical: "/press",
  },
  openGraph: {
    type: "website",
    siteName: "HytaleModding",
    url: "/press",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "HytaleModding" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function PressPage() {
  return (
    <>
      <PressContent />
      <Footer />
    </>
  );
}
