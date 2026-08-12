import { ViewTransition } from "react";
import Link from "next/link";
import {
  BookIcon,
  SquarePenIcon,
  ArrowDownCircleIcon,
  CoinsIcon,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { DiscordButton } from "@/components/discord-button";
import { ShowcaseMarquee } from "@/components/showcase";
import { Separator } from "@/components/ui/separator";
import { DynamicLink } from "fumadocs-core/dynamic-link";
import { CommunitySection } from "./community";
import { ProgramsSection } from "./programs";
import { Footer } from "./footer";
import { HeroStickers } from "./hero-stickers";
import { getBlogs } from "@/lib/blogs";
import { getMessages } from "@/lib/locale";
import { richText } from "@/lib/rich-text";
import TownHallHomepageBlock from "@/components/TownHallHomepageBlock";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const messages = getMessages(lang);
  const blogs = (await getBlogs()).slice(0, 4);

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
                className="text-4xl font-semibold text-balance sm:text-5xl md:text-7xl"
                style={{ fontFamily: "Lexend, Geist, sans-serif" }}
              >
                <div>
                  {richText(messages.home.title, {
                    italic: (chunks) => (
                      <span className="italic">{chunks}</span>
                    ),
                    badge: (chunks) => (
                      <span className="text-shine font-bold">{chunks}</span>
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

      {/* <BlogsSection
        blogs={blogs}
        lang={lang}
        title={messages.nav.blogs ?? "Blogs"}
      />
      <Separator /> */}

      {/* <UtilsSection />
      <Separator /> */}

      <ProgramsSection />
      <Separator />

      <TownHallHomepageBlock />

      <Footer />
    </div>
  );
}
