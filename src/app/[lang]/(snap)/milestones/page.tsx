import { GitInfoButton } from "@/components/git-info-button";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight-new";
import { ExternalLinkIcon, HeartHandshakeIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import { Milestone } from "./types";
import { milestones } from "./data";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { MilestoneChart } from "./chart";

export default function MilestonesPage() {
  return (
    <div className="relative overflow-hidden">
      <GitInfoButton />
      <Spotlight />

      <MilestoneChart />

      <div className="container mx-auto items-center gap-28 px-2">
        <section className="flex items-center justify-center py-24">
          <div className="space-y-8 py-16 text-center max-lg:max-w-lg">
            <ViewTransition name="hero" share="blur-scale-transition">
              <div className="flex max-w-4xl flex-col items-center justify-center gap-8">
                <h1 className="text-4xl font-semibold text-balance">
                  Hytale Modding Milestones
                </h1>
                <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance">
                  From the first wave of Discord members to official
                  documentation, community events, and more.
                  <br /> <br />
                  These are the moments that helped turn HytaleModding into a
                  home for builders.
                </p>
              </div>
            </ViewTransition>
          </div>
        </section>

        <div className="container mt-24 flex w-full flex-col gap-32 border-l pl-8 md:pl-16">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} {...milestone} />
          ))}
        </div>

        <div>
          <p>This is only the beginning</p>
          <p>Join the community to shape Hytale&apos;s future.</p>
        </div>
      </div>
    </div>
  );
}

function MilestoneCard(milestone: Milestone) {
  return (
    <div
      data-snap-section
      data-date={milestone.date.toISOString()}
      className="group relative flex min-h-screen items-center justify-between gap-16 rounded-2xl p-2 transition-colors lg:gap-24"
      style={{ minHeight: milestone.minHeight }}
    >
      <div className="flex flex-1 flex-col gap-3">
        <div className="bg-background ring-background group-data-[active=true]:border-primary absolute top-1/2 -left-8 size-4 -translate-x-1/2 rounded-full border shadow-sm ring-4 transition-colors md:-left-16" />
        <time
          dateTime={milestone.date.toISOString()}
          className="text-primary/80 flex items-center gap-4 text-sm font-medium"
        >
          {milestone.date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <h3 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          {milestone.title}
          {milestone.Icon && <milestone.Icon className="size-4" />}
          {milestone.iconImage && (
            <Image
              alt={milestone.title}
              src={milestone.iconImage}
              width={16}
              height={16}
              className="object-contain not-dark:invert"
            />
          )}
        </h3>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {milestone.description}
        </p>
        {milestone.button && (
          <Button variant="outline" asChild className="w-fit">
            <Link href={milestone.button.link} target="_blank">
              {milestone.button.text}
              <ExternalLinkIcon className="size-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="hidden max-w-lg flex-1 lg:block">
        {milestone.image && (
          <Image
            src={milestone.image}
            alt={milestone.title}
            className="my-auto size-full scale-125 rounded-md mask-b-from-60% object-cover"
          />
        )}
      </div>
    </div>
  );
}
