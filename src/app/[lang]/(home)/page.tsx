import { ViewTransition } from "react";
import Link from "next/link";
import {
  BookIcon,
  SquarePenIcon,
  ArrowDownCircleIcon,
  NewspaperIcon,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { FadeIn } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { DiscordButton } from "@/components/discord-button";
import { DeferredShowcase } from "@/components/deferred-showcase";
import { Separator } from "@/components/ui/separator";
import { DynamicLink } from "fumadocs-core/dynamic-link";
import { CommunitySection } from "./community";
import { ProgramsSection } from "./programs";
import { Footer } from "./footer";
import { HeroStickers } from "./hero-stickers";
import { getMessages, Messages } from "@/lib/locale";
import { deepMerge } from "@/lib/utils";
import { richText } from "@/lib/rich-text";
import TownHallHomepageBlock from "@/components/TownHallHomepageBlock";
import { CommunityCta } from "./community-cta";
import { ResourcesSection } from "./resources-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const baseMessages = getMessages("en");
  const messages =
    lang === "en"
      ? baseMessages
      : (deepMerge(baseMessages, getMessages(lang)) as Messages);
  return (
    <div className="flex flex-1 flex-col">
      <Spotlight />
      <div className="relative container mx-auto flex h-192 max-h-[calc(100svh-9rem)] min-h-fit flex-col items-center justify-center px-4 py-20 md:max-h-[calc(100vh-21rem)] md:px-12 md:py-32">
        <div className="hidden md:block">
          <HeroStickers />
        </div>
        <div className="flex h-full w-full max-w-5xl flex-col items-center justify-around gap-6 space-y-8 text-center">
          <ViewTransition name="hero" share="blur-scale-transition">
            <div className="space-y-6">
              <h1 className="font-display text-4xl font-semibold text-balance sm:text-5xl md:text-7xl">
                <span className="block">
                  {richText(messages.home.title, {
                    italic: (chunks) => (
                      <span className="italic">{chunks}</span>
                    ),
                    badge: (chunks) => (
                      <span className="text-rainbow rounded-md py-0.5 font-bold text-black">
                        {chunks}
                      </span>
                    ),
                  })}
                </span>
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
                  Mod Wiki
                </Link>
              </Button>
              <Button asChild>
                <Link href="/news" passHref>
                  <NewspaperIcon />
                  News
                </Link>
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
        <DeferredShowcase />
      </div>

      <CommunitySection />
      <Separator />

      <ResourcesSection messages={messages.home.resources} />
      <Separator />

      <ProgramsSection />
      <Separator />

      <TownHallHomepageBlock messages={messages.home.townHalls} />

      <CommunityCta />

      <Footer />
    </div>
  );
}
