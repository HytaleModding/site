"use client";

import { ApplyToday } from "./apply-today";
import { ElligibilityRequirements } from "./elligibility-requirements";
import { GrantsHero } from "./hero";
import { WhatWeFund } from "./what-we-fund";

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
