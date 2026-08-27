import TownHallSection from "./TownHallSection";
import { townHalls, upcomingTownHall } from "@/lib/townhalls";
import { Messages } from "@/lib/locale";

export default function TownHallHomepageBlock({
  messages,
}: {
  messages: Messages["home"]["townHalls"];
}) {
  const sorted = [...townHalls].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latest = sorted[0];

  return (
    <TownHallSection
      messages={messages}
      speakers={
        upcomingTownHall ? upcomingTownHall.speakers : (latest?.speakers ?? [])
      }
      archiveHref="/townhalls"
      upcoming={
        upcomingTownHall
          ? {
              date: upcomingTownHall.date,
              videoId: upcomingTownHall.videoId,
              discordHref: upcomingTownHall.discordHref,
              note: upcomingTownHall.note,
            }
          : undefined
      }
      latestVod={
        !upcomingTownHall && latest
          ? {
              videoId: latest.videoId,
              title: latest.title,
              date: latest.date,
              reportHref: latest.reportHref,
            }
          : undefined
      }
    />
  );
}
