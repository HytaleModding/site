"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { useEffect, useState } from "react";
import { useMessages } from "@/lib/hooks/useMessages";
import { richText } from "@/lib/rich-text";

const COMMUNITY_PHOTOS = Array.from({ length: 20 }, (_, i) => `${i + 1}.png`);

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildRow(): string[] {
  return [...shuffle(COMMUNITY_PHOTOS), ...shuffle(COMMUNITY_PHOTOS)];
}

function PhotoTile({ photo }: { photo: string }) {
  return (
    <div
      className="h-40 w-60 rounded-xl border shadow-sm transition-transform duration-300 hover:scale-[1.03] sm:h-48 sm:w-72"
      style={{ backgroundImage: `url(/assets/landing/community/${photo})`, backgroundSize: "cover", backgroundPosition: "center" }}
    />
  );
}

function PhotoRow({ photos, reverse = false }: { photos: string[]; reverse?: boolean }) {
  return (
    <Marquee>
      <MarqueeFade side="left" className="w-12" />
      <MarqueeContent speed={160} autoFill={false} direction={reverse ? "right" : "left"}>
        {photos.map((photo, index) => (
          <MarqueeItem key={`${reverse ? "b" : "a"}-${photo}-${index}`}>
            <PhotoTile photo={photo} />
          </MarqueeItem>
        ))}
      </MarqueeContent>
      <MarqueeFade side="right" className="w-12" />
    </Marquee>
  );
}

export function CommunityCta() {
  const messages = useMessages();
  const t = messages.home.communityCta;
  const [rows, setRows] = useState(() => ({
    rowOne: [...COMMUNITY_PHOTOS, ...COMMUNITY_PHOTOS],
    rowTwo: [...COMMUNITY_PHOTOS].reverse().concat([...COMMUNITY_PHOTOS].reverse()),
  }));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setRows({ rowOne: buildRow(), rowTwo: buildRow().reverse() });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="my-24 space-y-10 overflow-hidden">
      <PhotoRow photos={rows.rowOne} />

      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          {richText(t.title, {
            italic: (chunks) => <span className="italic">{chunks}</span>,
          })}
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/en/docs/guides/plugin/world-gen">{t.worldGen} <ArrowRightIcon /></Link></Button>
          <Button asChild><Link href="/en/docs/official-documentation/worldgen/pack-tutorial/asset-packs">{t.firstAsset}<ArrowRightIcon /></Link></Button>
          <Button asChild><Link href="/en/docs/guides/plugin/setting-up-env">{t.firstMod}<ArrowRightIcon /></Link></Button>
        </div>
      </div>

      <PhotoRow photos={rows.rowTwo} reverse />
    </section>
  );
}
