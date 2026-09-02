"use client";

import WulfrumProsthesis from "@/../public/showcaseImages/wulfrum_prosthesis.png";
import Shroomie from "@/../public/showcaseImages/Shroomie.webp";
import MushroomLizard from "@/../public/showcaseImages/MushroomLizard.png";
import AlecsTamework from "@/../public/showcaseImages/AlecsTamework.png";
import Sanguivar from "@/../public/showcaseImages/Sanguivar.webp";
import Hexcode from "@/../public/showcaseImages/Hexcode.png";
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
import TrorkFortress from "@/../public/showcaseImages/TrorkFortress.png";
import TrorkArena from "@/../public/showcaseImages/TrorkArena.png";
import TrorkZeppelins from "@/../public/showcaseImages/TrorkZeppelins.png";

import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Card, CardTitle } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import {
  Marquee,
  MarqueeFade,
  MarqueeContent,
  MarqueeItem,
} from "./ui/shadcn-io/marquee";

type ProjectType = "art" | "website" | "server" | "mod" | "worldgen";

type ShowcaseItem = {
  title: string;
  author: string;
  link: string;
  type: ProjectType;
} & (
  | { image: StaticImageData }
  | { video: string; poster?: string | StaticImageData }
);

const resolvePoster = (poster?: string | StaticImageData) => {
  if (!poster) return undefined;
  return typeof poster === "string" ? poster : poster.src;
};

const AutoplayVideo = ({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      loop
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      tabIndex={-1}
    />
  );
};

const ShowcaseMedia = ({
  item,
  fit,
}: {
  item: ShowcaseItem;
  fit: "cover" | "contain";
}) => {
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  if ("video" in item) {
    return (
      <AutoplayVideo
        src={item.video}
        poster={resolvePoster(item.poster)}
        className={`pointer-events-none absolute inset-0 h-full w-full ${fitClass}`}
      />
    );
  }

  return (
    <Image
      src={item.image}
      alt={item.title}
      fill
      draggable={false}
      sizes="384px"
      className={fitClass}
    />
  );
};

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Hynergy: Electric Motor",
    author: "seyager",
    video: "/showcaseVideos/HyEnergy_Electric_Motor.webm",
    poster: "/showcaseVideos/posters/HyEnergy_Electric_Motor.jpg",
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
    video: "/showcaseVideos/gale_wivern.webm",
    poster: "/showcaseVideos/posters/gale_wivern.jpg",
    link: "https://x.com/TourneVis_MC",
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
    video: "/showcaseVideos/BattleshipEffectExperiment.webm",
    poster: "/showcaseVideos/posters/BattleshipEffectExperiment.jpg",
    link: "",
    type: "art",
  },
  {
    title: "Ping Pong",
    author: "FoxyCCA",
    video: "/showcaseVideos/PingPong.webm",
    poster: "/showcaseVideos/posters/PingPong.jpg",
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
    title: "Trork Fortress",
    author: "DeepCanionStudio",
    image: TrorkFortress,
    link: "",
    type: "worldgen",
  },
  {
    title: "Coldest Reaches",
    author: "Lunaronin777",
    image: ColdestReaches,
    link: "https://www.curseforge.com/hytale/mods/fullmetal-labyrinth",
    type: "worldgen",
  },
  {
    title: "Trork Zeppelins",
    author: "Lunaronin777",
    image: TrorkZeppelins,
    link: "https://www.curseforge.com/hytale/prefabs/trork-zeppelins",
    type: "worldgen",
  },
  {
    title: "Trork Arena",
    author: "Harizon",
    image: TrorkArena,
    link: "",
    type: "worldgen",
  }
];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  const isWorldgen = item.type === "worldgen";

  const cardContent = isWorldgen ? (
    <>
      <div className="absolute inset-0">
        <ShowcaseMedia item={item} fit="cover" />
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
        <ShowcaseMedia item={item} fit="contain" />
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
  const [items, setItems] = useState(showcaseItems);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setItems(shuffle(showcaseItems));
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Marquee className="h-64 w-full">
      <MarqueeFade side="left" className="w-12" />
      <MarqueeContent speed={200} autoFill>
        {items.map((item) => (
          <MarqueeItem key={item.title} className="mx-2">
            <ShowcaseCard item={item} />
          </MarqueeItem>
        ))}
      </MarqueeContent>
      <MarqueeFade side="right" className="w-12" />
    </Marquee>
  );
}
