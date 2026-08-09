import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { ArrowRight, CalendarClock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Speaker {
  name: string;
  role?: string;
  avatarUrl: string;
}

interface UpcomingTownHall {
  date: string | Date;
  discordHref: string;
  videoId?: string;
  note?: string;
}

interface LatestVod {
  videoId: string;
  title: string;
  date?: string | Date;
  reportHref?: string;
}

interface TownHallSectionProps {
  speakers: Speaker[];
  archiveHref: string;
  upcoming?: UpcomingTownHall;
  latestVod?: LatestVod;
  archiveKicker?: string;
}

export default function TownHallSection({
  speakers,
  archiveHref,
  upcoming,
  latestVod,
  archiveKicker = "missed one? we've got you",
}: TownHallSectionProps) {
  return (
    <section className="mx-auto my-24 flex w-full max-w-7xl flex-col gap-16 px-4">
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold">Town Halls</h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="flex flex-col gap-8">
            <p className="max-w-md text-base leading-relaxed text-white/60">
              We run monthly town halls to keep everyone in the loop, share what
              we&apos;re building, and collect feedback for Hytale directly from
              the community.
            </p>

            {speakers.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium tracking-wide text-white/40 uppercase">
                  {upcoming ? "Confirmed speakers" : "Speakers"}
                </span>
                <div className="flex flex-wrap gap-4">
                  {speakers.map((speaker) => (
                    <div
                      key={speaker.name}
                      className="flex items-center gap-2.5"
                    >
                      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/5">
                        <Image
                          src={speaker.avatarUrl}
                          alt={speaker.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm font-medium text-white">
                          {speaker.name}
                        </span>
                        {speaker.role && (
                          <span className="text-xs text-white/40">
                            {speaker.role}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {upcoming?.videoId ? (
              <ScheduledEmbed upcoming={upcoming} />
            ) : upcoming ? (
              <UpcomingCard upcoming={upcoming} />
            ) : latestVod ? (
              <VodEmbed vod={latestVod} />
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-white/70">
            {archiveKicker}
          </span>
          <Link
            href={archiveHref}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-6 py-3 text-base font-semibold text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            View all Townhalls
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ScheduledEmbed({ upcoming }: { upcoming: UpcomingTownHall }) {
  const d =
    typeof upcoming.date === "string" ? new Date(upcoming.date) : upcoming.date;

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(d);

  const formattedTime = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);

  return (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${upcoming.videoId}`}
          title="Upcoming town hall"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 text-sm text-white/50">
          <CalendarClock className="h-3.5 w-3.5" />
          <span>
            {formattedDate} · {formattedTime}
          </span>
          {upcoming.note && (
            <span className="text-white/30">· {upcoming.note}</span>
          )}
        </div>
        <Button className="h-9 px-4 text-sm" asChild variant="primary">
          <Link href={upcoming.discordHref} target="_blank">
            <FaDiscord />
            Join on Discord
          </Link>
        </Button>
      </div>
    </>
  );
}

function UpcomingCard({ upcoming }: { upcoming: UpcomingTownHall }) {
  const d =
    typeof upcoming.date === "string" ? new Date(upcoming.date) : upcoming.date;

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(d);

  const formattedTime = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);

  return (
    <div className="flex h-full flex-col justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-8 py-10">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <CalendarClock className="h-5 w-5 text-white/70" />
        </div>
        <span className="text-xs font-medium tracking-wide text-white/40 uppercase">
          Next town hall
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-2xl font-semibold text-white">
          {formattedDate}
        </span>
        <span className="text-base text-white/60">{formattedTime}</span>
        {upcoming.note && (
          <span className="mt-1 text-sm text-white/40">{upcoming.note}</span>
        )}
      </div>

      <Button className="h-11 w-fit px-5" asChild variant="primary">
        <Link href={upcoming.discordHref} target="_blank">
          <FaDiscord />
          Join on Discord
        </Link>
      </Button>
    </div>
  );
}

function VodEmbed({ vod }: { vod: LatestVod }) {
  const formattedDate = vod.date
    ? new Intl.DateTimeFormat(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(typeof vod.date === "string" ? new Date(vod.date) : vod.date)
    : null;

  return (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${vod.videoId}`}
          title={vod.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        {/* <div className="flex items-center gap-2 text-sm text-white/50">
          <Play className="h-3.5 w-3.5" />
          <span className="truncate">{vod.title}</span>
          {formattedDate && <span className="text-white/30">· {formattedDate}</span>}
        </div> */}
        {vod.reportHref && (
          <Link
            href={vod.reportHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
          >
            Read the report
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </>
  );
}
