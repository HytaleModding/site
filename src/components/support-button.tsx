"use client";
import { HeartHandshakeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useState,
  ViewTransition,
} from "react";
import { getSponsors } from "../app/[lang]/(home)/actions";
import { useMessages } from "@/lib/hooks/useMessages";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Sponsor } from "@/lib/types/sponsor";

export function SponsorButton() {
  const messages = useMessages();
  const params = useParams();
  const locale = params.lang as string;
  const [sponsorsList, setSponsorsList] = useState<Sponsor[]>([]);
  const [displayedSponsors, setDisplayedSponsors] = useState<Sponsor[]>([]);
  const [isError, setIsError] = useState(false);

  const STAGGER_DELAY = 0.1,
    MAX_DISPLAY = 3;

  const cycleSponsors = useEffectEvent((sponsorsList: Sponsor[]) => {
    setTimeout(
      () => {
        setDisplayedSponsors((_) => {
          const lastIndex =
            displayedSponsors.length > 0
              ? sponsorsList.findIndex(
                  (s) =>
                    s.MemberId ===
                    displayedSponsors[displayedSponsors.length - 1].MemberId,
                )
              : -1;

          const nextIndex = (lastIndex + 1) % sponsorsList.length;
          const selected = [];

          for (let i = 0; i < Math.min(MAX_DISPLAY, sponsorsList.length); i++) {
            selected.push(sponsorsList[(nextIndex + i) % sponsorsList.length]);
          }

          return selected;
        });
      },
      (STAGGER_DELAY * displayedSponsors.length + 0.5) * 1000,
    );
    setDisplayedSponsors([]);
  });

  useEffect(() => {
    let killSwitch = false;

    getSponsors()
      .catch((error) => {
        console.error("Failed to fetch sponsors:", error);
        setIsError(true);
      })
      .then((data) => {
        if (!data || killSwitch) return;

        data = data.sort(() => Math.random() - 0.5);
        setSponsorsList(data);
        cycleSponsors(data);
        let interval = setInterval(() => {
          if (killSwitch) {
            return clearInterval(interval);
          }
          cycleSponsors(data);
        }, 5 * 1000);
      });

    return () => {
      killSwitch = true;
    };
  }, []);

  return (
    <Button className="relative" asChild>
      <Link href={`/${locale}/sponsors`}>
        <HeartHandshakeIcon />
        {messages.misc.supportUs}
        {/* <div className="absolute top-full mt-2 flex -space-x-2">
          {isError ? (
            <p className="text-destructive text-sm">Failed to load sponsors</p>
          ) : (
            <AnimatePresence>
              {displayedSponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * STAGGER_DELAY }}
                  layout
                >
                  <Avatar
                    className="border-background border-2"
                    title={sponsor.name}
                  >
                    <AvatarImage src={sponsor.image} alt={sponsor.name} />
                    <AvatarFallback>
                      {sponsor.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}
              {displayedSponsors.length > 0 &&
                displayedSponsors.length < sponsorsList.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      delay: (displayedSponsors.length + 1) * STAGGER_DELAY,
                    }}
                    layout
                  >
                    <Avatar
                      className="border-background border-2"
                      title={`+ ${sponsorsList.length - displayedSponsors.length}`}
                    >
                      <AvatarFallback>
                        {`+${sponsorsList.length >= 10 + MAX_DISPLAY ? "" : " "}${sponsorsList.length - displayedSponsors.length}`}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                )}
            </AnimatePresence>
          )}
        </div> */}
      </Link>
    </Button>
  );
}