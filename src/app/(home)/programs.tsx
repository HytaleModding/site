import BisectHostingDark from "@/../public/branding/bisecthosting/BH_DARK.svg";
import BisectHostingLight from "@/../public/branding/bisecthosting/BH_LIGHT.svg";
import HMLogoDark from "@/../public/branding/hytalemodding/HM_DARK.svg";
import HMLogoLight from "@/../public/branding/hytalemodding/HM_LIGHT.svg";
import Yeti from "@/../public/grants/BH_HytaleModding_Assets-10.png";
import NitradoLogoColored from "@/../public/branding/nitrado/nitrado-logo.svg";
import NitradoLogoDark from "@/../public/branding/nitrado/nitrado-logo-black.svg";

import { TextLink } from "@/components/text-link";
import { DiscordButton } from "@/components/discord-button";
import { GrantsHero } from "./grants/hero";
import { BisectButton } from "./grants/bisect-button";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import DynamicLink from "fumadocs-core/dynamic-link";
import { Button } from "@/components/ui/button";

export function ProgramsSection() {
  return (
    <div className="mx-auto my-24 flex w-full max-w-7xl flex-col gap-16 px-4">
      <div className="space-y-8">
        <h1 className="text-3xl font-semibold">Programs & Partnerships</h1>
        <p className="text-muted-foreground">
          We work with various partners to make programs for supporting our
          community and help them succeed.
          <br />
          See them below!
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="overflow-clip rounded-xl border p-8">
          <div className="flex h-full flex-col gap-12">
            <div className="flex h-12 items-center gap-6">
              <Image
                src={HMLogoDark}
                alt="HytaleModding Logo"
                className="h-full w-fit not-dark:hidden"
              />
              <Image
                src={HMLogoLight}
                alt="HytaleModding Logo"
                className="h-full w-fit dark:hidden"
              />
              <XIcon className="size-6 shrink-0" />
              <Image
                src={BisectHostingDark}
                alt="BisectHosting Logo"
                className="h-full w-fit not-dark:hidden"
              />
              <Image
                src={BisectHostingLight}
                alt="BisectHosting Logo"
                className="h-full w-fit dark:hidden"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">
                HytaleModding Grant Program
              </h2>
              <p className="text-muted-foreground font-normal">
                We have partnered with BisectHosting to fund high-impact,
                community-driven projects that help advance the Hytale modding
                ecosystem forward.
              </p>
            </div>
            <div className="mt-auto flex">
              <Button asChild variant={"primary"}>
                <DynamicLink href="/[lang]/grants">
                  Applications are open!
                  <ArrowRightIcon />
                </DynamicLink>
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-xl border p-8">
          <div className="flex flex-col gap-12">
            <div className="flex h-12 items-center gap-6">
              <Image
                src={HMLogoDark}
                alt="HytaleModding Logo"
                className="h-full w-fit not-dark:hidden"
              />
              <Image
                src={HMLogoLight}
                alt="HytaleModding Logo"
                className="h-full w-fit dark:hidden"
              />
              <XIcon className="size-6 shrink-0" />
              <Image
                src={NitradoLogoColored}
                alt="Nitrado Logo"
                className="h-full w-fit not-dark:hidden"
              />
              <Image
                src={NitradoLogoDark}
                alt="Nitrado Logo"
                className="h-full w-fit dark:hidden"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">
                The first ever Hytale Modjam!
              </h2>
              <p className="text-muted-foreground font-normal">
                A 4-day modding event in collaboration with Kweebec Corner,
                where creators from around the world come together to create
                amazing mods based on a secret theme and compete for 5,000$ in
                prizes funded by Nitrado!
              </p>
            </div>
            <div className="mt-auto flex gap-4">
              <Button variant={"primary"} disabled>
                Jam has ended.
              </Button>
              <Button variant={"secondary"} asChild>
                <DynamicLink href="https://hytalemodjam.com/submissions">
                  See submissions <ExternalLinkIcon />
                </DynamicLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
