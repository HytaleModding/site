"use server";

import { Sponsor } from "@/lib/types/sponsor";

export async function getDiscordStats() {
  if (!process.env.INTERNAL_API_TOKEN) {
    if (process.env.NODE_ENV === "development") {
      console.warn("INTERNAL_API_TOKEN is not set.");
      return {
        active_members: 0,
        total_members: 0,
      };
    }
    throw new Error("INTERNAL_API_TOKEN is not set");
  }

  try {
    const response = await fetch(
      "https://api.internal.hytalemodding.guide/guild/stats",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.INTERNAL_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const stats = await response.json();

    return {
      active_members: stats.active_members,
      total_members: stats.total_members,
    };
  } catch (error) {
    console.error("Failed to fetch Discord stats:", error);
    throw error;
  }
}

export async function getSponsors(): Promise<Sponsor[]> {
  try {
    const response = await fetch(
      "https://opencollective.com/hytalemodding/members.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();

    const activeBackers = members.filter(
      (member: any) => member.role === "BACKER" && member.isActive === true,
    );

    const uniqueBackers = activeBackers.filter(
      (member: any, index: number, array: any[]) =>
        index ===
        array.findIndex(
          (m: any) => m.name === member.name && m.profile === member.profile,
        ),
    );

    return uniqueBackers.map((member: any) => ({
      ...member,
      image:
        member.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`,
    }));
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    throw error;
  }
}
