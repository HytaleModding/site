export interface PersonProfile {
  name: string;
  role?: string;
  company?: string;
  avatarUrl: string;
}

export const people = {
  neil: {
    name: "Neil",
    company: "HytaleModding",
    avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/neil.jpg",
  },
  buddhacat: {
    name: "BuddhaCat",
    role: "Community Manager",
    company: "Hypixel Studios",
    avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/BuddhaCat.jpg",
  },
  ryanhcode: {
    name: "RyanHCode",
    role: "Game Engineer",
    company: "Hypixel Studios",
    avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/ryan.webp",
  },
  kaupenjoe: {
    name: "Kaupenjoe",
    role: "Content Creator",
    avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/kaupenjoe.webp",
  },
  zeroerrors: {
    name: "ZeroErrors",
    role: "Lead Architect",
    company: "Hypixel Studios",
    avatarUrl: "https://cdn.internal.hytalemodding.dev/avatars/zeroerrors.jpg",
  },
  slikey: {
    name: "Slikey",
    role: "Technical Director",
    company: "Hypixel Studios",
    avatarUrl:
      "https://cdn.internal.hytalemodding.dev/avatars/slikey.webp",
  },
  devslashnull: {
    name: "DevSlashNull",
    role: "Platform Lead",
    company: "Hypixel Studios",
    avatarUrl:
      "https://cdn.internal.hytalemodding.dev/avatars/devslashnull.webp",
  },
} satisfies Record<string, PersonProfile>;

export type PersonId = keyof typeof people;

export function getPerson(id: string): PersonProfile | undefined {
  return people[id as PersonId];
}

export function getPersonTitle(person: PersonProfile) {
  return [person.role, person.company].filter(Boolean).join(" · ");
}
