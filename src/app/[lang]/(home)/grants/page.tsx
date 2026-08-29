import type { Metadata } from "next";
import { ApplyToday } from "./apply-today";
import { ElligibilityRequirements } from "./elligibility-requirements";
import { GrantsHero } from "./hero";
import { WhatWeFund } from "./what-we-fund";

export const metadata: Metadata = {
  title: "Grant Program | HytaleModding",
  description:
    "The HytaleModding Grant Program funds creators building mods, tools, content packs, and community projects for Hytale.",
  alternates: { canonical: "/en/grants" },
  openGraph: { type: "website", url: "/en/grants", siteName: "HytaleModding" },
};

export default function Home() {
  return (
    <>
      <GrantsHero />
      <div className="container mx-auto flex flex-col px-4">
        <WhatWeFund />
        <ElligibilityRequirements />
        <ApplyToday />
      </div>
    </>
  );
}
