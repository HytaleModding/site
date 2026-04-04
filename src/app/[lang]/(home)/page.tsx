"use client";
import {
  BookIcon,
  MessageSquareIcon,
  SquarePenIcon,
  ArrowDownCircleIcon,
  CoinsIcon,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMessages } from "@/lib/hooks/useMessages";

import { DiscordButton } from "../../../components/discord-button";
import { SponsorButton } from "../../../components/support-button";
import { ViewTransition } from "react";
import { ShowcaseMarquee } from "@/components/showcase";
import { Separator } from "@/components/ui/separator";
import { DynamicLink } from "fumadocs-core/dynamic-link";

export default function HomePage() {
  const params = useParams();
  const messages = useMessages();

  return (
    <div className="flex flex-1 flex-col">
      <Spotlight />
      <div className="relative container mx-auto flex h-192 max-h-[calc(100vh-12rem)] min-h-fit flex-col items-center justify-center px-4 py-32 md:px-12">
        <div className="flex h-full w-full max-w-5xl flex-col items-center justify-around gap-6 space-y-8 text-center">
          <ViewTransition name="hero" share="blur-scale-transition">
            <div className="space-y-6">
              {/* <div className="relative mx-auto w-fit max-w-full">
                <GlowEffect
                  colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
                  mode="flowHorizontal"
                  blur="soft"
                  duration={3}
                  scale={0.9}
                />
                <div className="bg-background hover:bg-background/85 relative mx-4 rounded-lg p-2 text-sm font-medium shadow-md transition-colors duration-200 ease-in-out">
                    <Link
                    href={"https://hytalemodding.dev/en/grants"}
                    className="flex items-center justify-center gap-2 text-wrap"
                    >
                    We launched the HytaleModding x BisectHosting Grant Program!{" "}
                    <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
              </div> */}
              <h1 className="text-4xl font-semibold text-balance md:text-5xl">
                <div>{messages.home.title}</div>
              </h1>
              <h2 className="text-muted-foreground text-lg text-balance md:text-xl">
                {messages.home.description}
              </h2>
            </div>
          </ViewTransition>

          <div className="flex w-fit flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 px-4">
              <DiscordButton />
              <SponsorButton />
            </div>

            <div className="flex w-full items-center gap-2">
              <Separator className="flex-1" />
              <p className="text-muted-foreground text-sm">
                ... or use our tools below!
              </p>
              <Separator className="flex-1" />
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
                <Link href="https://forum.hytalemodding.dev" target="_blank">
                  <MessageSquareIcon />
                  {messages.home.forum}
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
        {/* TODO: decide if we're going to keep this */}
        {/* <div className="text-muted-foreground absolute bottom-0 mx-auto mb-4 flex items-center gap-2">
          <p className="text-sm">Scroll down for more</p>
          <ArrowDownCircleIcon />
        </div> */}
      </div>

      <div className="w-full pb-16">
        <ShowcaseMarquee />
      </div>
    </div>
  );
}
