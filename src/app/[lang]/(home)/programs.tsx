import BisectHostingDark from "@/../public/branding/bisecthosting/BH_DARK.svg";
import BisectHostingLight from "@/../public/branding/bisecthosting/BH_LIGHT.svg";
import HMLogoDark from "@/../public/branding/hytalemodding/HM_DARK.svg";
import HMLogoLight from "@/../public/branding/hytalemodding/HM_LIGHT.svg";
import NitradoLogoColored from "@/../public/branding/nitrado/nitrado-logo.svg";
import NitradoLogoDark from "@/../public/branding/nitrado/nitrado-logo-black.svg";
import HytaleLogo from "@/../public/branding/hytale/Hytale-Logo-Illustrated.png";
import Mascot from "@/../public/grants/BH_HytaleModding_Assets-05.png";
import Cubes from "@/../public/grants/BH_HytaleModding_Assets-09.png";
import Background from "@/../public/grants/BG_Desert_Dunes.png";
import { BorderTrail } from "@/components/ui/border-trail";

import { BisectButton } from "./grants/bisect-button";
import ModJamBg from "@/../public/branding/hytalemodding/hytalemodjam-bg.jpg";
import NitradoBg from "@/../public/assets/landing/hero/exploration.jpg";
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
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Official Docs */}
        <div
          className="dark relative overflow-hidden rounded-xl border bg-[#0f1418] bg-cover bg-top p-8"
          style={{
            backgroundImage:
              "url(https://cdn.internal.hytalemodding.dev/assets/landing/content-lower-nowatermark.webp), linear-gradient(#0f1418,#0f1418)",
          }}
        >
          <div className="flex flex-col gap-12">
            <div className="flex h-12 items-center gap-6">
              <Image
                src={HMLogoDark}
                alt="HytaleModding Logo"
                className="h-full w-fit"
              />
              <XIcon className="size-6 shrink-0 text-white/50" />
              <Image
                src={HytaleLogo}
                alt="Hytale Logo"
                className="h-full w-auto scale-250 pl-2"
              />
            </div>
            <div className="space-y-4">
              <h2
                className="text-3xl font-semibold tracking-wide text-[#f0c65f]"
                style={{ fontFamily: "Lexend, Geist, sans-serif" }}
              >
                Hytale's Official Documentation
              </h2>
              <p className="font-normal text-[#9eb2c0]">
                We host the official documentation for Hytale, provided by
                Hypixel Studios. It contains source reference material for
                modders, and guides for modding Hytale.
              </p>
            </div>
            <div className="mt-auto flex">
              <Button asChild variant={"primary"}>
                <DynamicLink href="/[lang]/docs/">
                  View Documentation
                  <ArrowRightIcon />
                </DynamicLink>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border p-8 text-white">
          <Image src={ModJamBg} alt="" fill className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-black/60" />
          <div className="flex flex-col gap-12">
            <div className="flex h-12 items-center gap-6">
              <Image
                src={HMLogoDark}
                alt="HytaleModding Logo"
                className="h-full w-fit"
              />
              <XIcon className="size-6 shrink-0 text-white/50" />
              <Image
                src={HytaleLogo}
                alt="Hytale Logo"
                className="h-full w-auto scale-250 pl-2"
              />
            </div>
            <div className="space-y-4">
              <h2
                className="text-3xl font-semibold text-[#dce8eb]"
                style={{ fontFamily: "Lexend, Geist, sans-serif" }}
              >
                The Hytale ModJam, June 2026
              </h2>
              <p className="font-normal opacity-75">
                A 7-day modding event where creators from around the world come
                together to build amazing mods based on a secret theme. Funded
                by Hypixel Studios.
              </p>
            </div>
            <div className="mt-auto flex">
              <Button asChild variant={"primary"}>
                <DynamicLink href="/[lang]/grants">
                  View Submissions
                  <ExternalLinkIcon />
                </DynamicLink>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-[#1B57C4] p-8 shadow-xl shadow-[#0C46B0]/40">
          <BorderTrail
            style={{ boxShadow: "0px 0px 90px 90px rgba(137,230,196,0.6)" }}
            size={0}
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-l from-[#0C46B0]/10 via-[#0C46B0]/90 to-[#0C46B0]" />
          <Image
            src={Background}
            alt=""
            fill
            className="-z-20 object-cover object-top"
          />
          <div className="flex h-full flex-col gap-12">
            <div className="flex h-12 items-center gap-6">
              <Image
                src={HMLogoDark}
                alt="HytaleModding Logo"
                className="h-full w-fit"
              />
              <XIcon className="size-6 shrink-0 text-white/50" />
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
            <div className="space-y-4 text-white">
              <h2 className="text-3xl font-semibold">
                HytaleModding Grant Program
              </h2>
              <p className="font-normal opacity-75 text-shadow-lg">
                We partnered with BisectHosting to fund impactful community
                projects that advance the Hytale modding ecosystem.
              </p>
            </div>
            <div className="mt-auto flex gap-4">
              <BisectButton
                variant="alternative"
                href="/en/grants/apply"
                className="bg-white text-[#0C46B0]"
              >
                Applications are open!
                <ArrowRightIcon />
              </BisectButton>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-6 -bottom-4 z-[-1] h-40 w-56 not-lg:hidden">
            <Image
              src={Mascot}
              alt=""
              className="-scale-x-100 -rotate-12 object-cover object-top"
              draggable={false}
            />
            <Image
              src={Cubes}
              alt=""
              width={64}
              height={64}
              className="absolute top-0 left-0"
            />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border p-8">
          <Image src={NitradoBg} alt="" fill className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-black/50" />
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
                A 4-day modding event in collaboration with Kweebec Corner with
                a prize of $5,000 funded by Nitrado.
              </p>
            </div>
            <div className="mt-auto flex gap-4">
              <Button asChild variant={"primary"}>
                <DynamicLink href="/[lang]/grants">
                  View Submissions
                  <ExternalLinkIcon />
                </DynamicLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
