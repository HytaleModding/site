export interface Speaker {
  name: string;
  role?: string;
  company?: string;
  avatarUrl: string;
}

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
    speakers: [
      {
        name: "Neil",
        company: "HytaleModding",
        avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/neil.jpg",
      },
      {
        name: "BuddhaCat",
        role: "Community Manager",
        company: "Hypixel Studios",
        avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/BuddhaCat.jpg",
      },
      {
        name: "RyanHCode",
        role: "Game Engineer",
        company: "Hypixel Studios",
        avatarUrl:
          "https://cdn.internal.hytalemodding.dev/avatars/ryan.webp",
      }
    ]
  },
  {
    id: "2026-07-30",
    videoId: "MDRimYi75fY",
    title: "HytaleModding Town Hall",
    date: "2026-07-30",
    speakers: [
      {
        name: "Neil",
        company: "HytaleModding",
        avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/neil.jpg",
      },
      {
        name: "Kaupenjoe",
        role: "Content Creator",
        avatarUrl:
          "https://cdn.internal.hytalemodding.dev/avatars/kaupenjoe.webp",
      },
    ],
    reportHref: "",
  },
  {
    id: "2026-06-25",
    videoId: "ji0a7JWcWm4",
    title: "HytaleModding Town Hall",
    date: "2026-06-25",
    speakers: [
      {
        name: "Neil",
        company: "HytaleModding",
        avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/neil.jpg",
      },
      {
        name: "Kaupenjoe",
        role: "Content Creator",
        avatarUrl:
          "https://cdn.internal.hytalemodding.dev/avatars/kaupenjoe.webp",
      },
    ],
    reportHref: "",
  },
  {
    id: "2026-05-28",
    videoId: "XSSEFF_RVeM",
    title: "HytaleModding Town Hall",
    date: "2026-05-28",
    speakers: [
      {
        name: "Neil",
        company: "HytaleModding",
        avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/neil.jpg",
      },
      {
        name: "Kaupenjoe",
        role: "Content Creator",
        avatarUrl:
          "https://cdn.internal.hytalemodding.dev/avatars/kaupenjoe.webp",
      },
      {
        name: "ZeroErrors",
        role: "Lead Architect",
        company: "Hypixel Studios",
        avatarUrl:
          "https://cdn.internal.hytalemodding.dev/avatars/zeroerrors.jpg",
      },
    ],
    reportHref: "",
  },
  {
    id: "2026-05-14",
    videoId: "_0OYFmRu5LQ",
    title: "HytaleModding Town Hall",
    date: "2026-05-14",
    speakers: [
      {
        name: "Neil",
        company: "HytaleModding",
        avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/neil.jpg",
      },
      {
        name: "Kaupenjoe",
        role: "Content Creator",
        avatarUrl:
          "https://cdn.internal.hytalemodding.dev/avatars/kaupenjoe.webp",
      },
      {
        name: "ZeroErrors",
        role: "Lead Architect",
        company: "Hypixel Studios",
        avatarUrl:
          "https://cdn.internal.hytalemodding.dev/avatars/zeroerrors.jpg",
      },
    ],
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
