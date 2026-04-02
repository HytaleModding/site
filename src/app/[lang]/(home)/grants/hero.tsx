import SnowBg from "@/../public/grants/BG_Snowy_Forest.png";
import Yeti from "@/../public/grants/BH_HytaleModding_Assets-10.png";
import { div } from "motion/react-client";
import { ViewTransition } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpenIcon, ExternalLinkIcon } from "lucide-react";

import BisectHostingDark from "@/../public/branding/bisecthosting/BH_DARK.svg";
import BisectHostingLight from "@/../public/branding/bisecthosting/BH_LIGHT.svg";

import HMLogoDark from "@/../public/branding/hytalemodding/HM_DARK.svg";
import HMLogoLight from "@/../public/branding/hytalemodding/HM_LIGHT.svg";
import { BisectButton } from "./bisect-button";

export function GrantsHero() {
  return (
    <div className="relative h-164 overflow-clip">
      <div className="container mx-auto flex h-full items-center justify-start">
        <div className="flex flex-col gap-8 px-4 md:not-xl:mr-64 xl:w-1/2">
          <motion.div
            initial={{
              opacity: 0,
              // y: 20,
            }}
            animate={{
              opacity: 1,
              // y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.4,
              ease: "backOut",
            }}
          >
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
              <p>x</p>
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
          </motion.div>
          <ViewTransition name="hero" share="blur-scale-transition">
            <h1 className="text-4xl font-bold lg:text-7xl">
              HytaleModding Grant Program
            </h1>
            <p className="text-xl font-normal opacity-75">
              We have partnered with BisectHosting to fund high-impact,
              community-driven projects that help advance the Hytale modding
              ecosystem forward.{" "}
            </p>
          </ViewTransition>
          <motion.div
            className="mt-4 flex h-10 gap-6 not-sm:w-fit not-sm:flex-col"
            initial={{
              opacity: 0,
              // y: -20,
            }}
            animate={{
              opacity: 1,
              // y: 0,
            }}
            transition={{
              delay: 0.7,
              duration: 0.4,
              ease: "backOut",
            }}
          >
            <BisectButton className="h-full" href="/en/grants/apply">
              Apply Now
            </BisectButton>
            <BisectButton
              variant={"secondary"}
              href="https://docs.google.com/document/d/e/2PACX-1vSBk6nq86dzmAHZSc9lFpIBkwAzgOaQop9b5OrSwVkMBdrBZjCtXlNb7Rd9PQFImrVHrExWgK73R8KX/pub"
              className="h-full"
            >
              <BookOpenIcon className="size-4" />
              View Guidelines
            </BisectButton>
          </motion.div>
        </div>
        <motion.div
          className="pointer-events-none absolute -right-20 z-10 object-cover object-top not-md:-right-16 not-md:-bottom-24 not-md:size-75 md:not-xl:right-0 md:not-xl:-bottom-16 md:not-xl:size-100 xl:top-0 xl:size-215"
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.9,
            duration: 1,
            ease: "backOut",
          }}
        >
          <Image src={Yeti} alt="Yeti Mascot" className="" draggable={false} />
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 1,
          ease: "backOut",
        }}
      >
        <Image
          src={SnowBg}
          alt="Snow Background"
          fill
          className="mask-b-from-background/35 pointer-events-none overflow-hidden object-cover object-top"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
