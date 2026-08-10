"use client";

import WulfrumProsthesis from "@/../public/showcaseImages/wulfrum_prosthesis.png";
import GaleWivern from "@/../public/showcaseImages/gale_wivern.gif";
import WulfrumArmor from "@/../public/showcaseImages/Wulfrum_Armor.gif";
import ElectricMotor from "@/../public/showcaseImages/HyEnergy_Electric_Motor.gif";
import MagicCircleGust from "@/../public/showcaseImages/MagicCircleGust.gif";
import Shroomie from "@/../public/showcaseImages/Shroomie.gif";
import Froggy from "@/../public/showcaseImages/Froggy.gif";
import MushroomLizard from "@/../public/showcaseImages/MushroomLizard.png";
import AlecsTamework from "@/../public/showcaseImages/AlecsTamework.png";
import Sanguivar from "@/../public/showcaseImages/Sanguivar.gif";
import Hexcode from "@/../public/showcaseImages/Hexcode.png";
import BattleshipEffectExperiment from "@/../public/showcaseImages/BattleshipEffectExperiment.gif";
import PingPong from "@/../public/showcaseImages/PingPong.gif";
import TriggerVolumeKeyboard from "@/../public/showcaseImages/TriggerVolumeKeyboard.png";
import Burger from "@/../public/showcaseImages/Burger.png";
import LuminaryAethers from "@/../public/showcaseImages/LuminaryAethers.png";
import AutumnPeaks from "@/../public/showcaseImages/AutumnPeaks.png";
import Prehistoria from "@/../public/showcaseImages/Prehistoria.png";
import ScarakStacks from "@/../public/showcaseImages/ScarakStacks.png";
import TheUnderfrost from "@/../public/showcaseImages/TheUnderfrost.png";
import TheGlimmerdeep from "@/../public/showcaseImages/TheGlimmerdeep.png";
import FungusSpiral from "@/../public/showcaseImages/FungusSpiral.png";
import TheWastelands from "@/../public/showcaseImages/TheWastelands.png";
import RaptorHollows from "@/../public/showcaseImages/RaptorHollows.png";
import ColdestReaches from "@/../public/showcaseImages/ColdestReaches.png";

import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Card, CardTitle } from "./ui/card";
import { useState } from "react";
import {
  Marquee,
  MarqueeFade,
  MarqueeContent,
  MarqueeItem,
} from "./ui/shadcn-io/marquee";

type ProjectType = "art" | "website" | "server" | "mod" | "worldgen";

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
    title: "Mushroom Lizard",
    author: "lulu",
    image: MushroomLizard,
    link: "",
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
    link: "",
    type: "art",
  },
  {
    title: "Hexcode",
    author: "Riprod",
    image: Hexcode,
    link: "https://docs.hexcodec.com",
    type: "art",
  },
  {
    title: "Battleship Effect Experiment",
    author: "FoxyCCA",
    image: BattleshipEffectExperiment,
    link: "",
    type: "art",
  },
  {
    title: "Ping Pong",
    author: "FoxyCCA",
    image: PingPong,
    link: "",
    type: "worldgen",
  },
  {
    title: "Trigger Volume Keyboard",
    author: "FoxyCCA",
    image: TriggerVolumeKeyboard,
    link: "",
    type: "art",
  },
  {
    title: "Burger",
    author: "StrayTheDev",
    image: Burger,
    link: "",
    type: "art",
  },
  {
    title: "Luminary Aethers",
    author: "SAMPL3R, Meyos and Nep",
    image: LuminaryAethers,
    link: "https://www.curseforge.com/hytale/mods/neymeros",
    type: "worldgen",
  },
  {
    title: "Raptor Hollows",
    author: "SAMPL3R",
    image: RaptorHollows,
    link: "",
    type: "worldgen",
  },
  {
    title: "Autumn Peaks",
    author: "Breadley",
    image: AutumnPeaks,
    link: "",
    type: "worldgen",
  },
  {
    title: "Prehistoria",
    author: "Kirschdieb and PlasticFantastic",
    image: Prehistoria,
    link: "",
    type: "worldgen",
  },
  {
    title: "Scarak Stacks",
    author: "Kirschdieb",
    image: ScarakStacks,
    link: "",
    type: "worldgen",
  },
  {
    title: "The Underfrost",
    author: "TristanM",
    image: TheUnderfrost,
    link: "",
    type: "worldgen",
  },
  {
    title: "The Glimmerdeep",
    author: "TristanM",
    image: TheGlimmerdeep,
    link: "",
    type: "worldgen",
  },
  {
    title: "Fungus Spiral",
    author: "DeepCanionStudio",
    image: FungusSpiral,
    link: "",
    type: "worldgen",
  },
  {
    title: "The Wastelands",
    author: "DeepCanionStudio",
    image: TheWastelands,
    link: "",
    type: "worldgen",
  },
  {
    title: "Coldest Reaches",
    author: "Lunaronin777",
    image: ColdestReaches,
    link: "https://www.curseforge.com/hytale/mods/fullmetal-labyrinth",
    type: "worldgen",
  }
];

const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  const isWorldgen = item.type === "worldgen";

  const cardContent = isWorldgen ? (
    <>
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          draggable={false}
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      <div className="relative mt-auto flex min-h-0 flex-1 flex-col justify-end px-4 py-3 text-white">
        <CardTitle className="pr-6 text-base text-balance text-white">
          {item.title}
        </CardTitle>

        <p className="mt-1 text-sm text-white/80">{item.author}</p>

        {item.link && (
          <ExternalLinkIcon className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/80" />
        )}
      </div>
    </>
  ) : (
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
          className={`group flex h-full ${isWorldgen ? "relative" : "flex-col"}`}
          target="_blank"
          rel="noopener"
        >
          {cardContent}
        </Link>
      ) : (
        <div className={`flex h-full ${isWorldgen ? "relative" : "flex-col"}`}>
          {cardContent}
        </div>
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
      <MarqueeContent speed={200} autoFill={false}>
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
