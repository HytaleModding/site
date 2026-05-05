import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

interface MilestoneBase {
  date: Date;
  title: string;
  description: string;
  button?: {
    text: string;
    link: string;
  };
  image?: StaticImageData | string;
  minHeight?: number;
}

interface MilestoneWithIconImage extends MilestoneBase {
  iconImage?: StaticImageData;
  Icon?: never;
}

interface MilestoneWithIcon extends MilestoneBase {
  Icon?: LucideIcon;
  iconImage?: never;
}

export type Milestone = MilestoneWithIconImage | MilestoneWithIcon;
