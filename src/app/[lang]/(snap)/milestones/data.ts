import type { Milestone } from "./types";

import ThousandMembersImage from "./images/1000.png";
import HytaleReleaseImage from "./images/hytale-release.png";
import OfficialDocsImage from "./images/official-docs.png";
import ModJamWinners from "./images/winners.png";
import GrantsProgramImage from "./images/grants.png";

export const milestones: Milestone[] = [
  {
    date: new Date("2026-01-06"),
    title: "1,000 Discord Members",
    description:
      "HytaleModding reached its first 1,000 members on Discord, marking an early moment of momentum for the community. What started as a place for people excited about modding Hytale quickly became a shared space for builders, developers, creators, and players to follow progress, ask questions, and connect around the future of community-made content.",
    image: ThousandMembersImage,
  },
  {
    date: new Date("2026-01-12"),
    title: "2,000 Discord Members",
    description:
      "Only a few days after reaching 1,000 members, the Discord passed 2,000. The speed of that growth showed how much interest there already was around Hytale modding, even before most tools and workflows were fully understood. It was a clear sign that people were not just watching from the sidelines, they wanted to be part of shaping what came next.",
  },
  {
    date: new Date("2026-01-13"),
    title: "Hytale Launch Day",
    description:
      "Hytale launched, and the community crossed 3,000 Discord members in the same window. For HytaleModding, this was the moment everything became real: discussions turned into experiments, ideas turned into plans, and the community began moving from speculation toward hands-on creation, documentation, and support for the first wave of creators.",
    image: HytaleReleaseImage,
  },
  {
    date: new Date("2026-01-22"),
    title: "Official Docs Joined Our Website",
    description:
      "After building a community documentation website to help people understand Hytale modding, Hypixel Studios reached out to share official documentation with us. Having official docs hosted through the site was a major step forward, giving creators a clearer and more reliable place to learn from while keeping the community-driven spirit that made the project useful in the first place.",
    image: OfficialDocsImage,
  },
  {
    date: new Date("2026-02-05"),
    title: "ModJam Winners Revealed",
    description:
      "The first HytaleModding ModJam wrapped up with a judging stream and winner announcement. Partnered with Nitrado and supported in collaboration with four content creators, the event brought the community together around real projects, live feedback, and friendly competition. In total, more than $5,000 in prizes were awarded, excluding the Nitrado servers provided for participants.",
    image: ModJamWinners,
  },
  {
    date: new Date("2026-03-28"),
    title: "Grants Program Released",
    description:
      "HytaleModding launched a grants program with support from BisectHosting to help fund mod creators directly. The goal was to make it easier for promising projects to keep moving, especially when creators needed hosting, resources, or a bit of support to turn an idea into something playable. It marked another step toward building long-term infrastructure for the modding community.",
    image: GrantsProgramImage,
  },
];
