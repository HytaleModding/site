import Image, { StaticImageData } from "next/image";
import { BookIcon, CodeIcon, UsersIcon } from "lucide-react";

import Kweebec from "@/../public/grants/BH_HytaleModding_Assets-06.png";

import ModsToolsBG from "@/../public/grants/image-6.png";
import ContentPackBG from "@/../public/grants/image-4.png";
import ComProjBG from "@/../public/grants/image-3.png";

export function WhatWeFund() {
  return (
    <div className="flex flex-col gap-12 py-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">What We Fund</h1>
        <p className="text-muted-foreground">
          A few examples of what type of projects that can apply for the grant.
        </p>
      </div>
      <div className="flex justify-stretch gap-4 not-lg:flex-col">
        <WhatWeFundCard
          icon={<CodeIcon />}
          title="Mods & Tools"
          description="Mods, development tools, frameworks, and ecosystem-level utilities."
          background={ModsToolsBG}
        />
        <WhatWeFundCard
          icon={<BookIcon />}
          title="Content Packs"
          description="Asset libraries, model packs, and content that enhances the game experience."
          background={ContentPackBG}
        />
        <WhatWeFundCard
          icon={<UsersIcon />}
          title="Community Projects"
          description="Open-source projects that benefit the entire Hytale modding community."
          background={ComProjBG}
          kweebec
        />
      </div>
    </div>
  );
}

function WhatWeFundCard({
  icon,
  title,
  description,
  background,
  kweebec = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  background: StaticImageData;
  kweebec?: boolean;
}) {
  return (
    <div className="relative">
      <div className="bg-card relative flex flex-col gap-4 overflow-clip rounded-lg border p-8">
        <div className="bg-secondary aspect-square size-fit rounded-full p-4">
          {icon}
        </div>
        <div className="z-10 flex flex-col gap-2">
          <p className="mt-4 font-bold">{title}</p>
          <p className="font-normal opacity-75">{description}</p>
        </div>
        <Image
          src={background}
          alt={`${title} Background`}
          fill
          className="pointer-events-none absolute translate-x-1/4 mask-radial-to-transparent mask-radial-to-60% mask-circle mask-radial-at-center object-cover opacity-60"
          draggable={false}
        />
      </div>
      {kweebec && (
        <Image
          src={Kweebec}
          alt="Kweebec Mascot"
          className="pointer-events-none absolute right-2 bottom-5 -z-10 size-40 translate-y-full object-cover object-top opacity-80"
          draggable={false}
        />
      )}
    </div>
  );
}
