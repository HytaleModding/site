import { BorderTrail } from "@/components/ui/border-trail";
import { Button } from "@/components/ui/button";
import { BookOpenTextIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";

import Background from "@/../public/grants/BG_Desert_Dunes.png";
import Mascot from "@/../public/grants/BH_HytaleModding_Assets-05.png";
import Cubes from "@/../public/grants/BH_HytaleModding_Assets-09.png";
import { BisectButton } from "./bisect-button";

export function ApplyToday() {
  return (
    <div className="py-20">
      <div className="relative rounded-xl shadow-xl shadow-[#0C46B0]/40">
        <div className="relative flex size-full flex-col gap-8 overflow-hidden rounded-xl border border-[#1B57C4] px-16 py-12">
          <BorderTrail
            style={{
              boxShadow: "0px 0px 128px 128px rgba(137, 230, 196, 0.8)",
            }}
            size={0}
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 -z-10 bg-linear-to-l from-[#0C46B0]/10 via-[#0C46B0]/90 to-[#0C46B0]" />
          <div className="flex flex-col gap-4 text-white">
            <h2 className="text-3xl font-semibold">Ready to apply?</h2>
            <p className="max-w-xl opacity-75 text-shadow-lg">
              Applications are reviewed based on project quality, feasibility,
              demonstrated progress, community impact and responsible use of
              resources.
            </p>
          </div>
          <div className="flex gap-6 not-xl:flex-col not-xl:items-start">
            <BisectButton
              variant="alternative"
              href="/en/grants/apply"
              className="bg-white text-[#0C46B0]"
            >
              Apply Now
            </BisectButton>
            <BisectButton
              variant="secondary"
              href="https://docs.google.com/document/d/e/2PACX-1vSBk6nq86dzmAHZSc9lFpIBkwAzgOaQop9b5OrSwVkMBdrBZjCtXlNb7Rd9PQFImrVHrExWgK73R8KX/pub"
              className="text-white hover:text-white"
            >
              <BookOpenTextIcon /> View Guidelines
            </BisectButton>
          </div>
          <Image
            src={Background}
            alt="Background"
            fill
            className="-z-20 object-cover object-top"
          />
          {/* mobile mascot */}
          <div className="relative xl:hidden flex flex-col items-center">
            <div className="h-40 w-90 sm:h-60 sm:w-120 relative">
              <Image
                src={Mascot}
                alt="Yeti Mascot"
                className="translate-x-8 -translate-y-16 -scale-x-100 -rotate-12 object-cover object-top"
                draggable={false}
              />
              <Image
                className="absolute top-0 left-0"
                src={Cubes}
                alt="Cubes Accent"
                width={96}
                height={96}
              />
            </div>
          </div>
        </div>
        {/* desktop mascot */}
        <div className="absolute -right-8 bottom-0 h-80 w-xl overflow-hidden not-xl:hidden">
          <div className="relative">
            <Image
              src={Mascot}
              alt="Yeti Mascot"
              className="translate-x-8 -translate-y-16 -scale-x-100 -rotate-12 object-cover object-top"
              draggable={false}
            />
            <Image
              className="absolute top-0 left-0"
              src={Cubes}
              alt="Cubes Accent"
              width={96}
              height={96}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
