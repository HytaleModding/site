"use client";
import { ExternalLinkIcon, BookIcon, MessageSquare } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
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
import HyFableLogo from "./(showcaseImages)/HyFableLogo.jpg";
import HyFableBanner from "./(showcaseImages)/HyFableBanner.jpg";
import { DiscordButton } from "./discord-button";
import { GitInfoButton } from "@/components/git-info-button";

type ProjectType = 'art' | 'website' | 'server' | 'mod';

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

const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  const hasImage = item.image;
  const hasLogo = item.logo;
  const hasBanner = item.banner;
  
  return (
    <Card className="relative overflow-hidden w-96 h-64">
      <CardContent className="flex h-full items-center justify-center p-0">
        {hasImage ? (
          <>
            <div className="from-card absolute z-20 flex size-full items-end bg-linear-to-t from-15% to-transparent to-30% p-6">
              <div className="flex flex-1 flex-col">
                <h3 className="z-20 text-xl font-bold line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base z-20">
                  {item.author}
                </p>
                {item.description && (
                  <p className="text-muted-foreground text-sm z-20 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <Button size="default" asChild className="ml-3 bg-background/90 text-foreground hover:bg-background">
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
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
                      className="h-8 w-8 object-contain rounded"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
                <h3 className="z-20 text-xl font-bold line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base z-20">
                  {item.author}
                </p>
                {item.description && (
                  <p className="text-muted-foreground text-sm z-20 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <Button size="default" asChild className="ml-3 bg-background/90 text-foreground hover:bg-background">
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
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
            <div className="flex-1 flex flex-col justify-center">
              {hasLogo && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={hasLogo}
                    alt={`${item.title} logo`}
                    className="h-16 w-16 object-contain rounded-lg"
                    width={64}
                    height={64}
                  />
                </div>
              )}
              <h3 className="text-xl font-bold line-clamp-2 mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-base mb-3 text-center">
                {item.author}
              </p>
              {item.description && (
                <p className="text-muted-foreground text-sm line-clamp-4 text-center">
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
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
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
  
  const showcaseItems: ShowcaseItem[] = [
    // Art projects
    {
      title: "Hynergy: Electric Motor",
      author: "by seyager",
      image: ElectricMotor,
      link: "https://x.com/SeyagerYT",
      type: 'art'
    },
    {
      title: "[WIP] Hylamity: Wulfrum Prosthesis",
      author: "by alder_",
      image: WulfrumProsthesis,
      link: "https://discord.gg/f2fMKYnRqR",
      type: 'art'
    },
    {
      title: "[WIP] Soundscape: Melodium Chunk",
      author: "by 44Hydras",
      image: Melodium,
      link: "https://discord.com/users/197065442479702016",
      type: 'art'
    },
    {
      title: "Gale Wivern",
      author: "by Nicolas | Tourne_Vis",
      image: GaleWivern,
      link: "https://x.com/TourneVis_MC",
      type: 'art'
    },
    {
      title: "[WIP] Hylamity: Wulfrum Armor",
      author: "by alder_",
      image: WulfrumArmor,
      link: "https://discord.gg/f2fMKYnRqR",
      type: 'art'
    },
    {
      title: "Hyfable Server Network",
      author: "by Brad",
      logo: HyFableLogo,
      banner: HyFableBanner,
      type: 'server',
      description: "Hyfable is a Day 1 server preparing for Hytale release! Join us today!",
      link: "https://hyfable.com"
    }
  ];

  const shuffledItems = [...showcaseItems].sort(() => Math.random() - 0.5);
  const repeatedItems = [...shuffledItems, ...shuffledItems, ...shuffledItems];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <GitInfoButton />
      <Spotlight />
      <div className="container mx-auto flex flex-col items-center px-4 md:px-12 py-8 flex-1 justify-center">
        <div className="max-w-5xl space-y-8 text-center">
            <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-balance">
              <div>{messages.home.title.split("{flipwords}")[0]}</div>
              <div>
                <FlipWords words={messages.home.flipwords} />
              </div>
              <div>
              {messages.home.title.split("{flipwords}")[1]}
              </div>
            </h1>
            <h2 className="text-muted-foreground text-lg md:text-xl text-balance">
              {messages.home.description}
            </h2>
            </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link href={localizeHref("/docs", params.lang?.toString())}>
                <BookIcon /> {messages.home.documentation}
              </Link>
            </Button>
            <Button asChild>
              <Link
                href="https://forum.hytalemodding.guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare /> {messages.home.forum}
              </Link>
            </Button>
            <DiscordButton />
          </div>
        </div>
      </div>
      
      <div className="w-full mt-auto mb-8 md:mb-16 pb-16 pt-16">
        <Marquee className="h-64 w-full">
          <MarqueeFade side="left" className="w-12" />
          <MarqueeContent speed={50} pauseOnHover autoFill={false}>
            {repeatedItems.map((item, index) => (
              <MarqueeItem key={`${item.title}-${index}`} className="mx-2">
                <ShowcaseCard item={item} />
              </MarqueeItem>
            ))}
          </MarqueeContent>
          <MarqueeFade side="right" className="w-12" />
        </Marquee>
      </div>
    </div>
  );
}
