"use client";
import { ExternalLinkIcon, HeartHandshakeIcon } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitInfoButton } from "@/components/git-info-button";
import { ViewTransition } from "react";
import { SponsorsList } from "./sponsors-list";
import { useMessages } from "@/lib/hooks/useMessages";

export default function SponsorsPage() {
  const messages = useMessages();

  return (
    <div className="relative flex flex-1 overflow-hidden">
      <GitInfoButton />
      <Spotlight />
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-2 py-8">
        <div className="space-y-8 py-16 text-center max-lg:max-w-lg">
          <ViewTransition name="hero" share="blur-scale-transition">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-4">
              <h1 className="text-4xl font-semibold text-balance">
                {messages.sponsors.title}
              </h1>
              <h2 className="text-muted-foreground text-lg text-balance">
                {messages.sponsors.description}
              </h2>
              <Button asChild variant={"primary"}>
                <Link
                  href="https://opencollective.com/hytalemodding"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HeartHandshakeIcon className="mr-2 size-5" />
                  Open Collective
                  <ExternalLinkIcon className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </ViewTransition>

          <SponsorsList />
        </div>
      </div>
    </div>
  );
}
