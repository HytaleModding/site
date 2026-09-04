import { people, type PersonProfile } from "@/lib/people";

export type Speaker = PersonProfile;

export interface TownHall {
  id: string;
  videoId: string;
  title: string;
  date: string;
  speakers: Speaker[];
  reportHref?: string;
}

export const townHalls: TownHall[] = [
  {
    id: "2026-08-27",
    date: "2026-08-27T22:30:00+05:30",
    videoId: "ei0PuGwKPAo",
    title: "HytaleModding Town Hall",
    speakers: [people.neil, people.buddhacat, people.ryanhcode],
  },
  {
    id: "2026-07-30",
    videoId: "MDRimYi75fY",
    title: "HytaleModding Town Hall",
    date: "2026-07-30",
    speakers: [people.neil, people.kaupenjoe],
    reportHref: "",
  },
  {
    id: "2026-06-25",
    videoId: "ji0a7JWcWm4",
    title: "HytaleModding Town Hall",
    date: "2026-06-25",
    speakers: [people.neil, people.kaupenjoe],
    reportHref: "",
  },
  {
    id: "2026-05-28",
    videoId: "XSSEFF_RVeM",
    title: "HytaleModding Town Hall",
    date: "2026-05-28",
    speakers: [people.neil, people.kaupenjoe, people.zeroerrors],
    reportHref: "",
  },
  {
    id: "2026-05-14",
    videoId: "_0OYFmRu5LQ",
    title: "HytaleModding Town Hall",
    date: "2026-05-14",
    speakers: [people.neil, people.kaupenjoe, people.zeroerrors],
    reportHref: "",
  },
];

export const upcomingTownHall:
  | {
      date: string;
      videoId?: string;
      discordHref: string;
      note?: string;
      speakers: Speaker[];
    }
  | undefined = undefined;
