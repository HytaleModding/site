"use client";
import {
  BookIcon,
  SquarePenIcon,
  ArrowDownCircleIcon,
  CoinsIcon,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMessages } from "@/lib/hooks/useMessages";
import { richText } from "@/lib/rich-text";

import { DiscordButton } from "@/components/discord-button";
import { ViewTransition } from "react";
import { ShowcaseMarquee } from "@/components/showcase";
import { Separator } from "@/components/ui/separator";
import { DynamicLink } from "fumadocs-core/dynamic-link";
import { CommunitySection } from "./community";
import { UtilsSection } from "./utils";
import { ProgramsSection } from "./programs";
import { Footer } from "./footer";
import { HeroStickers } from "./hero-stickers";

export default function HomePage() {
  const messages = useMessages();

  return (
    <div className="flex flex-1 flex-col">
      <Spotlight />
      <div className="relative container mx-auto flex h-192 max-h-[calc(100vh-21rem)] min-h-fit flex-col items-center justify-center px-4 py-32 md:px-12">
        <HeroStickers />
        <div className="flex h-full w-full max-w-5xl flex-col items-center justify-around gap-6 space-y-8 text-center">
          <ViewTransition name="hero" share="blur-scale-transition">
            <div className="space-y-6">
              {/*<div className="relative mx-auto w-fit max-w-full">
                <GlowEffect
                  colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
                  mode="flowHorizontal"
                  blur="soft"
                  duration={3}
                  scale={0.9}
                />
                <div className="bg-background hover:bg-background/85 relative mx-4 rounded-lg p-2 text-sm font-medium shadow-md transition-colors duration-200 ease-in-out">
                    <Link
                    href={"https://hytalemodjam.com"}
                    className="flex items-center justify-center gap-2 text-wrap"
                    >
                    Hytale x HytaleModding ModJam is live!{" "}
                    <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
              </div>*/}
              <h1
                className="text-6xl font-semibold text-balance md:text-7xl"
                style={{ fontFamily: "Lexend, Geist, sans-serif" }}
              >
                <div>
                  {richText(messages.home.title, {
                    italic: (chunks) => (
                      <span className="italic">{chunks}</span>
                    ),
                    badge: (chunks) => (
                      <span className="text-rainbow rounded-md px-2.5 py-0.5 font-bold text-black">
                        {chunks}
                      </span>
                    ),
                  })}
                </div>
              </h1>
              <h2 className="text-muted-foreground text-lg text-balance md:text-xl">
                {messages.home.description}
              </h2>
            </div>
          </ViewTransition>

          <div className="flex w-fit flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 px-4">
              <DiscordButton />
            </div>

            <div className="flex flex-wrap justify-center gap-4 px-4">
              <Button asChild>
                <DynamicLink href="/[lang]/docs">
                  <BookIcon /> {messages.home.documentation}
                </DynamicLink>
              </Button>
              <Button asChild>
                <Link href="https://wiki.hytalemodding.dev" target="_blank">
                  <SquarePenIcon />
                  Wiki
                </Link>
              </Button>
              <Button asChild>
                <DynamicLink href="/[lang]/grants">
                  <CoinsIcon />
                  Grant Program
                </DynamicLink>
              </Button>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground absolute bottom-0 mx-auto mb-4 flex items-center gap-2">
          <p className="text-sm">Scroll down for more</p>
          <ArrowDownCircleIcon />
        </div>
      </div>

      <div className="w-full pb-4">
        <ShowcaseMarquee />
      </div>

      <CommunitySection />
      <Separator />

      {/* <UtilsSection />
      <Separator /> */}

      <ProgramsSection />
      <Footer />
    </div>
  );
}
