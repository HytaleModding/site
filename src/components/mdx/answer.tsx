import React from "react";
import { getPerson, getPersonTitle } from "@/lib/people";

export function Answer({
  profile,
  person,
  children,
}: {
  profile?: {
    name: string;
    avatarUrl: string;
    title: string;
  };
  person?: string;
  children: React.ReactNode;
}) {
  const personProfile = person ? getPerson(person) : undefined;
  const resolvedProfile =
    profile ??
    (personProfile
      ? {
          name: personProfile.name,
          avatarUrl: personProfile.avatarUrl,
          title: getPersonTitle(personProfile),
        }
      : undefined);

  return (
    <div className="not-prose text-muted-foreground my-4 flex flex-col gap-4">
      <div className="bg-card flex flex-col gap-3 rounded-xl border px-5 py-5 shadow-sm">
        {resolvedProfile && (
          <>
            <div className="flex shrink-0 items-center gap-3">
              {/* Q&A profile images are arbitrary external URLs supplied by content. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolvedProfile.avatarUrl}
                alt={resolvedProfile.name}
                className="my-0! size-10 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10"
              />
              <div className="flex flex-col gap-0.5 text-start text-sm">
                <p className="text-foreground my-0! font-medium">
                  {resolvedProfile.name}
                </p>
                {resolvedProfile.title && (
                  <p className="my-0! text-xs">{resolvedProfile.title}</p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="prose prose-no-margin text-foreground/85 max-w-none leading-7">
          {children}
        </div>
      </div>
    </div>
  );
}
