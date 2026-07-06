import "./styles/global.css";
import "./styles/transitions.css";
import "./styles/official-docs.css";
import "katex/dist/katex.css";
import { Geist, Geist_Mono, Lexend, Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/config";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-official-title",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-official-body",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="transition-colors">
        <div
          className={cn(
            geist.variable,
            geistMono.variable,
            lexend.variable,
            nunitoSans.variable,
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
