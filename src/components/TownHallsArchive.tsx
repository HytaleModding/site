import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { TownHall } from "@/lib/townhalls";
import { Messages } from "@/lib/locale";
import { Footer } from "../app/[lang]/(home)/footer";

interface TownHallsArchiveProps {
  messages: Messages["home"]["townHalls"];
  townHalls: TownHall[];
}

export default function TownHallsArchive({
  messages: t,
  townHalls,
}: TownHallsArchiveProps) {
  const sorted = [...townHalls].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div>
      <div className="mx-auto my-24 flex w-full max-w-7xl flex-col gap-16 px-4">
        <div className="space-y-4">
          <h1 className="text-foreground text-3xl font-semibold">{t.title}</h1>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed">
            {t.archiveDescription}
          </p>
        </div>

        {sorted.length === 0 ? (
          <p className="text-muted-foreground">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((townHall) => (
              <TownHallCard
                key={townHall.id}
                messages={t}
                townHall={townHall}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function TownHallCard({
  messages: t,
  townHall,
}: {
  messages: Messages["home"]["townHalls"];
  townHall: TownHall;
}) {
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
        className="group border-border bg-muted relative block aspect-video w-full overflow-hidden rounded-2xl border"
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
          <span className="text-foreground text-base font-medium">
            {townHall.title}
          </span>
          <span className="text-muted-foreground text-sm">{formattedDate}</span>
        </div>

        {townHall.speakers.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {townHall.speakers.map((speaker) => (
              <div key={speaker.name} className="flex items-center gap-2">
                <div className="border-border bg-muted relative h-6 w-6 overflow-hidden rounded-full border">
                  <Image
                    src={speaker.avatarUrl}
                    alt={speaker.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <span className="text-muted-foreground text-xs">
                  {speaker.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {townHall.reportHref && (
          <Link
            href={townHall.reportHref}
            className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            {t.readReport}
          </Link>
        )}
      </div>
    </div>
  );
}
