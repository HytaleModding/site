import { Sponsor } from "@/lib/types/sponsor";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, ViewTransition, startTransition } from "react";
import { getSponsors } from "../actions";
import { useMessages } from "@/lib/hooks/useMessages";

const featuredSponsors: Sponsor[] = [
  {
    MemberId: "BisectHosting",
    name: "BisectHosting",
    image: "/sponsors/bisecthosting.png",
    website: "https://bisecthosting.com",
  },
];

const staticSponsors: Sponsor[] = [
  {
    MemberId: "apexhosting",
    name: "ApexHosting",
    image: "/sponsors/apexhosting.png",
    website: "https://apexminecrafthosting.com",
  },
];
export function SponsorsList() {
  const messages = useMessages();

  const [sponsors, setSponsors] = useState<Sponsor[]>(staticSponsors);
  const [state, setState] = useState<"loading" | "error" | "loaded">("loading");

  useEffect(() => {
    async function loadSponsors() {
      try {
        const openCollectiveSponsors = await getSponsors();
        const sortedSponsors = [...openCollectiveSponsors].sort((a, b) => {
          const amountA = a.totalAmountDonated || 0;
          const amountB = b.totalAmountDonated || 0;
          return amountB - amountA;
        });
        setSponsors([...sortedSponsors, ...staticSponsors]);
        startTransition(() => setState("loaded"));
      } catch (error) {
        console.error("Failed to load sponsors:", error);
        startTransition(() => setState("error"));
      }
    }
    loadSponsors();
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-center text-xl font-semibold">
        {messages.sponsors.ourSponsors}
      </h3>
      <div className="pt-1">
        <div className="flex justify-center gap-4">
          {featuredSponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-105"
            >
              <div className="relative h-32 w-48">
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      <ViewTransition update="blur-scale-transition">
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {state === "loading" && (
            <p className="text-muted-foreground">{messages.misc.loading}</p>
          )}
          {state === "error" && (
            <p className="text-destructive">{messages.misc.failedToLoad}</p>
          )}
          {state === "loaded" &&
            sponsors.map((sponsor) => {
              const logoSrc = sponsor.image;
              if (!logoSrc) return null;

              console.log("sponsor:", sponsor);

              const content = (
                <Tooltip key={sponsor.MemberId}>
                  <TooltipTrigger
                    style={{
                      cursor: sponsor.website ? "pointer" : "default",
                    }}
                  >
                    <Avatar className="hover:border-primary size-16 border-2 transition-all ease-in-out hover:scale-110">
                      <AvatarImage src={logoSrc} alt={sponsor.name} />
                      <AvatarFallback>
                        {sponsor.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sponsor.name}</p>
                  </TooltipContent>
                </Tooltip>
              );

              return sponsor.website ? (
                <Link
                  key={sponsor.MemberId}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={sponsor.name}
                >
                  {content}
                </Link>
              ) : (
                content
              );
            })}
        </div>
      </ViewTransition>
    </div>
  );
}
