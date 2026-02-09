"use client";
import {
  ExternalLinkIcon,
  BookIcon,
  MessageSquareIcon,
  ArrowUpRightIcon,
  ArrowRightIcon,
} from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import Image, { StaticImageData } from "next/image";
import { localizeHref } from "@/lib/locale";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMessages } from "@/lib/hooks/useMessages";

import WulfrumProsthesis from "./(showcaseImages)/wulfrum_prosthesis.png";
import Melodium from "./(showcaseImages)/Melodium.gif";
import GaleWivern from "./(showcaseImages)/gale_wivern.gif";
import WulfrumArmor from "./(showcaseImages)/Wulfrum_Armor.gif";
import ElectricMotor from "./(showcaseImages)/HyEnergy_Electric_Motor.gif";
import WulfrumTriangle from "./(showcaseImages)/Wulfrum_triangle.gif";
import HylandiaBanner from "./(showcaseImages)/Hylandia_Banner.png";
import HylandiaLogo from "./(showcaseImages)/Hylandia_Logo.png";
import MagicCircleGust from "./(showcaseImages)/MagicCircleGust.gif";
import Shroomie from "./(showcaseImages)/Shroomie.gif";
import Froggy from "./(showcaseImages)/Froggy.gif";
import { DiscordButton } from "./discord-button";
import { SponsorButton } from "./support-button";
import { GitInfoButton } from "@/components/git-info-button";
import { useState, ViewTransition, useMemo } from "react";
import { GlowEffect } from "@/components/ui/glow-effect";

type ProjectType = "art" | "website" | "server" | "mod";

const RELEASE_DATE = new Date("2026-01-13T15:00:00.000Z");

interface ShowcaseItem {
  title: string;
  author: string;
  image?: StaticImageData;
  logo?: StaticImageData;
  banner?: StaticImageData;
  link: string;
  type: ProjectType;
  description?: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Hynergy: Electric Motor",
    author: "by seyager",
    image: ElectricMotor,
    link: "https://x.com/SeyagerYT",
    type: "art",
  },
  {
    title: "[WIP] Hylamity: Wulfrum Prosthesis",
    author: "by slader._.",
    image: WulfrumProsthesis,
    link: "https://discord.gg/f2fMKYnRqR",
    type: "art",
  },
  {
    title: "[WIP] Soundscape: Melodium Chunk",
    author: "by 44Hydras",
    image: Melodium,
    link: "https://discord.com/users/197065442479702016",
    type: "art",
  },
  {
    title: "Gale Wivern",
    author: "by Nicolas | Tourne_Vis",
    image: GaleWivern,
    link: "https://x.com/TourneVis_MC",
    type: "art",
  },
  {
    title: "[WIP] Hylamity: Wulfrum Armor",
    author: "by slader._.",
    image: WulfrumArmor,
    link: "https://discord.gg/f2fMKYnRqR",
    type: "art",
  },
  {
    title: "[WIP] Hylamity: Wulfrum Triangle",
    author: "by slader._.",
    image: WulfrumTriangle,
    link: "https://discord.gg/f2fMKYnRqR",
    type: "art",
  },
  {
    title: "Saqvobase's Spellcasting: Magic Circle - Gust",
    author: "by Saqvobase",
    image: MagicCircleGust,
    link: "",
    type: "art",
  },
  {
    title: "Shroomie",
    author: "by Miyako Hikari",
    image: Shroomie,
    link: "",
    type: "art",
  },
  {
    title: "Froggy",
    author: "by Unknown Knight",
    image: Froggy,
    link: "",
    type: "art",
  },
  {
    title: "Hylandia",
    author: "by Kristian / Hylandia Studios",
    logo: HylandiaLogo,
    banner: HylandiaBanner,
    link: "https://discord.gg/hylandia",
    type: "server",
    description:
      "A progressive minigames server for Hytale where your progress actually matters.",
  },
];

const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  const hasImage = item.image;
  const hasLogo = item.logo;
  const hasBanner = item.banner;

  return (
    <Card className="relative h-64 w-96 overflow-hidden">
      <CardContent className="flex h-full items-center justify-center p-0">
        {hasImage ? (
          <>
            <div className="from-card absolute z-20 flex size-full items-end bg-linear-to-t from-15% to-transparent to-30% p-6">
              <div className="flex flex-1 flex-col">
                <h3 className="z-20 line-clamp-2 text-xl font-bold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground z-20 text-base">
                  {item.author}
                </p>
                {item.description && (
                  <p className="text-muted-foreground z-20 mt-1 line-clamp-2 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
              <Button
                size="default"
                asChild
                className="bg-background/90 text-foreground hover:bg-background ml-3"
              >
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Image
              src={hasImage}
              alt={item.title}
              className="absolute size-full object-cover opacity-30 blur-sm"
              fill
            />
            <div className="z-10 flex size-full items-center justify-center">
              <Image
                src={hasImage}
                alt={item.title}
                className="h-full w-auto overflow-hidden object-contain"
                fill
              />
            </div>
          </>
        ) : hasBanner ? (
          <>
            <div className="from-card absolute z-20 flex size-full items-end bg-linear-to-t from-25% to-transparent to-50% p-6">
              <div className="flex flex-1 flex-col">
                {hasLogo && (
                  <div className="mb-2">
                    <Image
                      src={hasLogo}
                      alt={`${item.title} logo`}
                      className="h-8 w-8 rounded object-contain"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
                <h3 className="z-20 line-clamp-2 text-xl font-bold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground z-20 text-base">
                  {item.author}
                </p>
                {item.description && (
                  <p className="text-muted-foreground z-20 mt-1 line-clamp-2 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
              <Button
                size="default"
                asChild
                className="bg-background/90 text-foreground hover:bg-background ml-3"
              >
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Image
              src={hasBanner}
              alt={item.title}
              className="absolute size-full object-cover"
              fill
            />
          </>
        ) : (
          <div className="flex h-full w-full flex-col justify-between p-6">
            <div className="flex flex-1 flex-col justify-center">
              {hasLogo && (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={hasLogo}
                    alt={`${item.title} logo`}
                    className="h-16 w-16 rounded-lg object-contain"
                    width={64}
                    height={64}
                  />
                </div>
              )}
              <h3 className="mb-2 line-clamp-2 text-center text-xl font-bold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-3 text-center text-base">
                {item.author}
              </p>
              {item.description && (
                <p className="text-muted-foreground line-clamp-4 text-center text-sm">
                  {item.description}
                </p>
              )}
            </div>
            <div className="flex justify-center pt-4">
              <Button size="default" asChild>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="mr-2 h-4 w-4" />
                  Visit
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  const params = useParams();
  const messages = useMessages();

  const [repeatedItems] = useState(() => {
    const shuffledItems = [...showcaseItems].sort(() => Math.random() - 0.5);
    return [...shuffledItems, ...shuffledItems, ...shuffledItems];
  });

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <Spotlight />
      <GitInfoButton />
      {/* <div className="absolute top-4 right-4 z-10 max-w-xs">
        <p className="text-muted-foreground mb-2 text-right text-xs">
          Proudly sponsored by
        </p>
        <div className="flex justify-end">
          <Image
            src="/branding/logo-light-348.png"
            alt="Sponsor Logo"
            width={40}
            height={20}
            className="object-contain"
          />
        </div>
      </div> */}

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8 md:px-12">
        <div className="w-full max-w-5xl space-y-8 pt-16 text-center md:pt-0">
          <ViewTransition name="hero" share="blur-scale-transition">
            <div className="space-y-6">
              <div className="relative mx-auto w-fit max-w-full">
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
                    We hosted the first Hytale Modjam with $5,000 in prizes!{" "}
                    <ArrowRightIcon className="h4 w-4" />
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-semibold text-balance md:text-5xl">
                <div>{messages.home.title.split("{flipwords}")[0]}</div>
                <div>
                  <FlipWords words={messages.home.flipwords} />
                </div>
                <div>{messages.home.title.split("{flipwords}")[1]}</div>
              </h1>
              <h2 className="text-muted-foreground text-lg text-balance md:text-xl">
                {messages.home.description}
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href={localizeHref("/docs", params.lang?.toString())}>
                    <BookIcon /> {messages.home.documentation}
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    href="https://forum.hytalemodding.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquareIcon /> {messages.home.forum}{" "}
                    <ExternalLinkIcon />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <DiscordButton />
                <SponsorButton />
              </div>
            </div>
          </ViewTransition>
        </div>
      </div>

      <div className="mt-auto mb-8 w-full py-8">
        <Marquee className="h-64 w-full">
          <MarqueeFade side="left" className="w-12" />
          <MarqueeContent speed={100} autoFill={false}>
            {repeatedItems.map((item, index) => (
              <MarqueeItem key={`${item.title}-${index}`} className="mx-2">
                <ShowcaseCard item={item} />
              </MarqueeItem>
            ))}
          </MarqueeContent>
          <MarqueeFade side="right" className="w-12" />
        </Marquee>

        {/* <div className="mt-6 flex justify-center">
            <Button asChild>
              <Link href={params?.lang?.toString() + "/projects"}>
                <ArrowUpRightIcon className="mr-2 h-4 w-4" />
                View More Projects
              </Link>
            </Button>
          </div> */}
      </div>
    </div>
  );
}
