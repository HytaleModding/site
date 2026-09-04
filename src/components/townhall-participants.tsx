import Image from "next/image";
import type { Speaker } from "@/lib/townhalls";

export function TownHallParticipants({ speakers }: { speakers: Speaker[] }) {
  return (
    <section aria-labelledby="townhall-participants">
      <h2 id="townhall-participants" className="mb-5 text-xl font-semibold">
        Participants
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <div
            key={speaker.name}
            className="bg-muted/55 flex min-w-0 items-center gap-4 rounded-xl p-4"
          >
            <div className="border-border bg-background relative size-14 shrink-0 overflow-hidden rounded-full border">
              <Image
                src={speaker.avatarUrl}
                alt={speaker.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold">{speaker.name}</p>
              {(speaker.role || speaker.company) && (
                <p className="text-muted-foreground mt-1 truncate text-sm">
                  {[speaker.role, speaker.company].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
