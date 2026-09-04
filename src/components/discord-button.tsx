"use client";
import { FaDiscord } from "react-icons/fa6";
import { CircleUserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startTransition, useEffect, useState, ViewTransition } from "react";
import { getDiscordStats } from "../app/[lang]/(home)/actions";
import { useMessages } from "@/lib/hooks/useMessages";
import Link from "next/link";

type DiscordButtonProps = {
  showMemberCount?: boolean;
};

export function useDiscordStats(showMemberCount = false) {
  const [stats, setStats] = useState<{
    active_members: number;
    total_members: number;
  } | null>(null);
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (!showMemberCount) return;

    let active = true;

    getDiscordStats()
      .then((data) => {
        if (!active) return;
        setStats(data);
        startTransition(() => setState("loaded"));
      })
      .catch((error) => {
        if (!active) return;
        console.error("Failed to fetch Discord stats:", error);
        startTransition(() => setState("error"));
      });

    return () => {
      active = false;
    };
  }, [showMemberCount]);

  return {
    stats: showMemberCount ? stats : null,
    state: showMemberCount ? state : ("loading" as const),
  };
}

export function DiscordButton({ showMemberCount = false }: DiscordButtonProps) {
  const messages = useMessages();
  const { stats, state } = useDiscordStats(showMemberCount);

  return (
    <div className="relative inline-flex flex-col items-center">
      <Button asChild variant={"primary"}>
        <Link href="https://discord.gg/hytalemodding" target="_blank">
          <FaDiscord />
          {messages.home.discord}
        </Link>
      </Button>
      {showMemberCount ? (
        <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap">
          <ViewTransition>
            {state === "loading" ? (
              <p className="text-muted-foreground text-sm">
                {messages.misc.loading}
              </p>
            ) : state === "loaded" && stats ? (
              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <span className="flex gap-1 text-green-400">
                  <CircleUserIcon className="my-auto" />
                  {messages.home.memberCount.replace(
                    "{count}",
                    stats.total_members.toLocaleString(),
                  )}
                </span>
              </p>
            ) : (
              <p className="text-destructive text-sm">Failed to load stats</p>
            )}
          </ViewTransition>
        </div>
      ) : null}
    </div>
  );
}
