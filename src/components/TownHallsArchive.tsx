import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { TownHall } from "@/lib/townhalls";
import { Footer } from "../app/[lang]/(home)/footer";

interface TownHallsArchiveProps {
  townHalls: TownHall[];
}

export default function TownHallsArchive({ townHalls }: TownHallsArchiveProps) {
  const sorted = [...townHalls].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div>
      <div className="mx-auto my-24 flex w-full max-w-7xl flex-col gap-16 px-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Town Halls</h1>
          <p className="max-w-md text-base leading-relaxed text-white/60">
            Every town hall we&apos;ve run, in one place with their recordings
            and speakers. Check back here for new town halls as they happen, and
            for reports on what we discussed.
          </p>
        </div>

        {sorted.length === 0 ? (
          <p className="text-white/50">Nothing here yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((townHall) => (
              <TownHallCard key={townHall.id} townHall={townHall} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function TownHallCard({ townHall }: { townHall: TownHall }) {
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(townHall.date));

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`https://www.youtube.com/watch?v=${townHall.videoId}`}
        target="_blank"
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
      >
        <Image
          src={`https://i.ytimg.com/vi/${townHall.videoId}/hqdefault.jpg`}
          alt={townHall.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-base font-medium text-white">
            {townHall.title}
          </span>
          <span className="text-sm text-white/40">{formattedDate}</span>
        </div>

        {townHall.speakers.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {townHall.speakers.map((speaker) => (
              <div key={speaker.name} className="flex items-center gap-2">
                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/10 bg-white/5">
                  <Image
                    src={speaker.avatarUrl}
                    alt={speaker.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-white/50">{speaker.name}</span>
              </div>
            ))}
          </div>
        )}

        {townHall.reportHref && (
          <Link
            href={townHall.reportHref}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <FileText className="h-3.5 w-3.5" />
            Read the report
          </Link>
        )}
      </div>
    </div>
  );
}
