import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

const PHOTOS = ["photo1.png", "photo2.png", "photo3.png", "photo4.png", "photo5.png", "photo6.png", "photo7.png", "photo8.png"];

function PhotoTile({ photo }: { photo: string }) {
  return (
    <div
      className="h-40 w-60 rounded-xl border shadow-sm transition-transform duration-300 hover:scale-[1.03] sm:h-48 sm:w-72"
      style={{ backgroundImage: `url(/assets/landing/hero/${photo})`, backgroundSize: "cover", backgroundPosition: "center" }}
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
  const rowOne = [...PHOTOS, ...PHOTOS, ...PHOTOS];
  const rowTwo = [...PHOTOS].reverse();
  const rowTwoRepeated = [...rowTwo, ...rowTwo, ...rowTwo];

  return (
    <section className="my-24 space-y-10 overflow-hidden">
      <PhotoRow photos={rowOne} />

      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          So, what are you <span className="italic">waiting</span> for?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/en/docs/guides/plugin/world-gen">Start playing with World Gen <ArrowRightIcon /></Link></Button>
          <Button asChild><Link href="/en/docs/official-documentation/worldgen/pack-tutorial/asset-packs">Make your first asset<ArrowRightIcon /></Link></Button>
          <Button asChild><Link href="/en/docs/guides/plugin/setting-up-env">Code your first mod<ArrowRightIcon /></Link></Button>
        </div>
      </div>

      <PhotoRow photos={rowTwoRepeated} reverse />
    </section>
  );
}
