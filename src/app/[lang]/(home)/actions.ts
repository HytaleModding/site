"use server";

export async function getDiscordStats() {
  try {
    // TODO: Change to .dev however needs api changing first.
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
