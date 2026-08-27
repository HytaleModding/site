import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { ArrowRight, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { FadeIn } from "@/components/ui/reveal";
import { Messages } from "@/lib/locale";
import { DeferredYouTubeEmbed } from "./deferred-youtube-embed";

interface Speaker {
  name: string;
  role?: string;
  company?: string;
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
  messages: Messages["home"]["townHalls"];
  speakers: Speaker[];
  archiveHref: string;
  upcoming?: UpcomingTownHall;
  latestVod?: LatestVod;
}

export default function TownHallSection({
  messages: t,
  speakers,
  archiveHref,
  upcoming,
  latestVod,
}: TownHallSectionProps) {
  return (
    <section className="mx-auto my-24 flex w-full max-w-7xl flex-col gap-16 px-4">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <FadeIn x={-32} y={0} className="flex flex-col gap-8">
          <SectionHeader align="left" title={t.title} />

          <p className="text-muted-foreground max-w-md text-base leading-relaxed">
            {t.description}
          </p>

          {speakers.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-muted-foreground/70 text-xs font-medium tracking-wide uppercase">
                {upcoming ? t.confirmedSpeakers : t.speakers}
              </span>
              <div className="flex flex-wrap gap-4">
                {speakers.map((speaker) => (
                  <div key={speaker.name} className="flex items-start gap-2.5">
                    <div className="border-border bg-muted relative h-9 w-9 overflow-hidden rounded-full border">
                      <Image
                        src={speaker.avatarUrl}
                        alt={speaker.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-foreground text-sm font-medium">
                        {speaker.name}
                      </span>
                      {speaker.role && (
                        <span className="text-muted-foreground/70 text-xs">
                          {speaker.role}
                        </span>
                      )}
                      {speaker.company && (
                        <span className="text-muted-foreground/70 text-xs">
                          {speaker.company}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col items-start gap-3">
            <span className="text-muted-foreground text-sm font-medium">
              {t.archiveKicker}
            </span>
            <Button
              className="h-12 bg-black px-8 text-base text-white hover:bg-black/90 hover:text-white dark:bg-white dark:text-black dark:hover:bg-white/90 dark:hover:text-black"
              asChild
            >
              <Link href={archiveHref}>
                {t.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn x={32} y={0} className="flex flex-col gap-3">
          {upcoming?.videoId ? (
            <ScheduledEmbed messages={t} upcoming={upcoming} />
          ) : upcoming ? (
            <UpcomingCard messages={t} upcoming={upcoming} />
          ) : latestVod ? (
            <VodEmbed messages={t} vod={latestVod} />
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}

function ScheduledEmbed({
  messages: t,
  upcoming,
}: {
  messages: Messages["home"]["townHalls"];
  upcoming: UpcomingTownHall;
}) {
  if (!upcoming.videoId) return null;

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
      <div className="border-border relative aspect-video w-full overflow-hidden rounded-2xl border bg-black shadow-2xl shadow-black/40">
        <DeferredYouTubeEmbed
          videoId={upcoming.videoId}
          title="Upcoming town hall"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <CalendarClock className="h-3.5 w-3.5" />
          <span>
            {formattedDate} · {formattedTime}
          </span>
          {upcoming.note && (
            <span className="text-muted-foreground/60">· {upcoming.note}</span>
          )}
        </div>
        <Button className="h-9 px-4 text-sm" asChild variant="primary">
          <Link href={upcoming.discordHref} target="_blank">
            <FaDiscord />
            {t.joinOnDiscord}
          </Link>
        </Button>
      </div>
    </>
  );
}

function UpcomingCard({
  messages: t,
  upcoming,
}: {
  messages: Messages["home"]["townHalls"];
  upcoming: UpcomingTownHall;
}) {
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
    <div className="border-border bg-muted flex h-full flex-col justify-center gap-6 rounded-2xl border px-8 py-10">
      <div className="flex items-center gap-4">
        <div className="border-border bg-background flex h-11 w-11 shrink-0 items-center justify-center rounded-full border">
          <CalendarClock className="text-muted-foreground h-5 w-5" />
        </div>
        <span className="text-muted-foreground/70 text-xs font-medium tracking-wide uppercase">
          {t.next}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-foreground text-2xl font-semibold">
          {formattedDate}
        </span>
        <span className="text-muted-foreground text-base">{formattedTime}</span>
        {upcoming.note && (
          <span className="text-muted-foreground/70 mt-1 text-sm">
            {upcoming.note}
          </span>
        )}
      </div>

      <Button className="h-11 w-fit px-5" asChild variant="primary">
        <Link href={upcoming.discordHref} target="_blank">
          <FaDiscord />
          {t.joinOnDiscord}
        </Link>
      </Button>
    </div>
  );
}

function VodEmbed({
  messages: t,
  vod,
}: {
  messages: Messages["home"]["townHalls"];
  vod: LatestVod;
}) {
  const formattedDate = vod.date
    ? new Intl.DateTimeFormat(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(typeof vod.date === "string" ? new Date(vod.date) : vod.date)
    : null;

  return (
    <>
      <div className="border-border relative aspect-video w-full overflow-hidden rounded-2xl border bg-black shadow-2xl shadow-black/40">
        <DeferredYouTubeEmbed videoId={vod.videoId} title={vod.title} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Play className="h-3.5 w-3.5" />
          <span className="truncate">{vod.title}</span>
          {formattedDate && <span className="text-muted-foreground/60">· {formattedDate}</span>}
        </div> */}
        {vod.reportHref && (
          <Link
            href={vod.reportHref}
            className="text-muted-foreground decoration-muted-foreground/40 hover:text-foreground hover:decoration-foreground/60 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 transition-colors"
          >
            {t.readReport}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </>
  );
}
