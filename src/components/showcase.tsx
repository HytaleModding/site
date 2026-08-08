import WulfrumProsthesis from "@/../public/showcaseImages/wulfrum_prosthesis.png";
import Melodium from "@/../public/showcaseImages/Melodium.gif";
import GaleWivern from "@/../public/showcaseImages/gale_wivern.gif";
import WulfrumArmor from "@/../public/showcaseImages/Wulfrum_Armor.gif";
import ElectricMotor from "@/../public/showcaseImages/HyEnergy_Electric_Motor.gif";
import WulfrumTriangle from "@/../public/showcaseImages/Wulfrum_triangle.gif";
import MagicCircleGust from "@/../public/showcaseImages/MagicCircleGust.gif";
import Shroomie from "@/../public/showcaseImages/Shroomie.gif";
import Froggy from "@/../public/showcaseImages/Froggy.gif";
import VoileBanner from "@/../public/showcaseImages/voile.png";
import MushroomLizard from "@/../public/showcaseImages/MushroomLizard.png";
import AlecsTamework from "@/../public/showcaseImages/AlecsTamework.png";
import Sanguivar from "@/../public/showcaseImages/Sanguivar.gif";
import Hexcode from "@/../public/showcaseImages/Hexcode.png";
import HyYap from "@/../public/showcaseImages/HyYap.png";

import { useMessages } from "@/lib/hooks/useMessages";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import {
  Marquee,
  MarqueeFade,
  MarqueeContent,
  MarqueeItem,
} from "./ui/shadcn-io/marquee";
import { ProgressiveBlur } from "./ui/progressive-blur";

type ProjectType = "art" | "website" | "server" | "mod";

interface ShowcaseItem {
  title: string;
  author: string;
  image: StaticImageData;
  link: string;
  type: ProjectType;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Hynergy: Electric Motor",
    author: "seyager",
    image: ElectricMotor,
    link: "https://x.com/SeyagerYT",
    type: "art",
  },
  {
    title: "Hylamity: Wulfrum Prosthesis",
    author: "slader._.",
    image: WulfrumProsthesis,
    link: "https://discord.gg/f2fMKYnRqR",
    type: "art",
  },
  {
    title: "Soundscape: Melodium Chunk",
    author: "44Hydras",
    image: Melodium,
    link: "https://discord.com/users/197065442479702016",
    type: "art",
  },
  {
    title: "Gale Wivern",
    author: "Nicolas | Tourne_Vis",
    image: GaleWivern,
    link: "https://x.com/TourneVis_MC",
    type: "art",
  },
  {
    title: "Hylamity: Wulfrum Armor",
    author: "slader._.",
    image: WulfrumArmor,
    link: "https://discord.gg/f2fMKYnRqR",
    type: "art",
  },
  {
    title: "Hylamity: Wulfrum Triangle",
    author: "slader._.",
    image: WulfrumTriangle,
    link: "https://discord.gg/f2fMKYnRqR",
    type: "art",
  },
  {
    title: "Saqvobase's Spellcasting: Magic Circle - Gust",
    author: "Saqvobase",
    image: MagicCircleGust,
    link: "",
    type: "art",
  },
  {
    title: "Shroomie",
    author: "Miyako Hikari",
    image: Shroomie,
    link: "",
    type: "art",
  },
  {
    title: "Froggy",
    author: "Unknown Knight",
    image: Froggy,
    link: "",
    type: "art",
  },
  {
    title: "Voile",
    author: "mayuna",
    image: VoileBanner,
    link: "https://www.curseforge.com/hytale/mods/docs",
    type: "art",
  },
  {
    title: "Mushroom Lizard",
    author: "lulu",
    image: MushroomLizard,
    link: "https://discord.gg/hytalemodding",
    type: "art",
  },
  {
    title: "Alec's Tamework",
    author: "Alec",
    image: AlecsTamework,
    link: "https://www.curseforge.com/hytale/mods/alecs-tamework",
    type: "art",
  },
  {
    title: "Sanguivar",
    author: "lulu",
    image: Sanguivar,
    link: "https://discord.gg/hytalemodding",
    type: "art",
  },
  {
    title: "Hexcode",
    author: "Riprod",
    image: Hexcode,
    link: "https://discord.gg/hytalemodding",
    type: "art",
  },
  {
    title: "HyYap",
    author: "Azim",
    image: HyYap,
    link: "https://discord.gg/hytalemodding",
    type: "art",
  },
];

const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  const cardContent = (
    <>
      <div className="relative h-44 w-full shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          draggable={false}
          className="object-contain"
        />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col justify-center border-t px-4 py-3">
        <CardTitle className="pr-6 text-base">{item.title}</CardTitle>

        <p className="text-muted-foreground mt-1 text-sm">{item.author}</p>

        {item.link && (
          <ExternalLinkIcon className="text-muted-foreground absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" />
        )}
      </div>
    </>
  );

  return (
    <Card className="h-64 w-96 overflow-hidden p-0">
      {item.link ? (
        <Link
          href={item.link}
          className="group flex h-full flex-col"
          target="_blank"
          rel="noopener"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="flex h-full flex-col">{cardContent}</div>
      )}
    </Card>
  );
};

export function ShowcaseMarquee() {
  const [repeatedItems] = useState(() => {
    const shuffledItems = [...showcaseItems].sort(() => Math.random() - 0.5);
    return [...shuffledItems, ...shuffledItems, ...shuffledItems];
  });

  return (
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
  );
}
