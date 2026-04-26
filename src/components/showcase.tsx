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
  const messages = useMessages();

  const cardContent = (
    <>
      <Image
        src={item.image}
        alt={`${item.title} background`}
        aria-hidden
        fill
        draggable={false}
        className="border-card z-10 rounded-lg border mask-b-from-90% object-contain"
      />
      <Image
        src={item.image}
        alt={`${item.title} background`}
        aria-hidden
        fill
        draggable={false}
        className="border-card rounded-lg border mask-b-from-90% object-cover opacity-50 blur-xl"
      />

      <div className="from-card/65 to-card group-hover:from-card relative z-20 mt-auto flex flex-col justify-between gap-2 border-t bg-linear-to-b pt-4 backdrop-blur-md transition-colors">
        <CardHeader className="block">
          <CardTitle className="flex items-center gap-4 p-0">
            <p>{item.title}</p>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex gap-4 pb-4 text-sm">
          <p className="text-muted-foreground">{item.author}</p>
        </CardFooter>
        {item.link && (
          <ExternalLinkIcon className="text-muted-foreground absolute right-4 bottom-4 ml-auto h-4 w-4" />
        )}
      </div>
    </>
  );

  return (
    <Card className="h-64 w-96 overflow-hidden py-0 lg:data-[expanded=true]:col-span-2">
      {item.link ? (
        <Link
          href={item.link}
          className="group relative flex h-full flex-col"
          target="_blank"
          rel="noopener"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="relative flex h-full flex-col">{cardContent}</div>
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
