import React from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export function Answer({
  profile,
  children,
}: {
  profile?: {
    name: string;
    avatarUrl: string;
    title: string;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="text-muted-foreground my-4 flex flex-col gap-4">
      <div className="bg-card flex flex-col gap-2 rounded-r-lg border-l px-4">
        {profile && (
          <>
            <div className="mt-4 flex shrink-0 items-center gap-4">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="my-0! size-12 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1 text-start text-sm">
                <p className="text-foreground my-0! font-medium">
                  {profile.name}
                </p>
                <p className="my-0!">{profile.title}</p>
              </div>
            </div>
          </>
        )}

        <div className="my-0!">{children}</div>
      </div>
    </div>
  );
}
