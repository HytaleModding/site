import type { Milestone } from "./types";

import ThousandMembersImage from "./images/1000.png";
import HytaleReleaseImage from "./images/hytale-release.png";
import OfficialDocsImage from "./images/official-docs.png";
import ModJam from "./images/modjam.png";
import GrantsProgramImage from "./images/grants.png";

export const milestones: Milestone[] = [
  {
    date: new Date("2026-01-06"),
    title: "1,000 Discord Members",
    description:
      "Our community reached it's first major milestone: 1,000 modders, excited to mod the game after Early Access Launch!",
    image: ThousandMembersImage,
  },
  {
    date: new Date("2026-01-12"),
    title: "2,000 Discord Members",
    description:
      "Less than a week later, a day before release, the community doubled in size, showing how quickly interest in Hytale UGC was growing.",
  },
  {
    date: new Date("2026-01-13"),
    title: "Hytale Launch Day",
    description:
      "Hytale launched, and the community crossed 3,000 Discord members in the same window, marking the beginning of our journey to support modders with the best resources available.",
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
    title: "We hosted the first Modjam!",
    description:
      "We hosted the first Hytale ModJam from 29th March to 5th February 2026 in collaboration with Kweebec Corner and Nitrado!",
    image: ModJam,
  },
  {
    date: new Date("2026-03-28"),
    title: "Grants Program Released",
    description:
      "HytaleModding launched a grants program with support from BisectHosting to help fund mod creators directly. The goal was to make it easier for promising projects to keep moving, especially when creators needed hosting, resources, or a bit of support to turn an idea into something playable. It marked another step toward building long-term infrastructure for the modding community.",
    image: GrantsProgramImage,
  },
];
