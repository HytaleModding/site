"use server";

export async function getDiscordStats() {
  "use cache";
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

export async function getSponsors() {
  "use cache";
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

    return activeBackers.map((member: any) => ({
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
