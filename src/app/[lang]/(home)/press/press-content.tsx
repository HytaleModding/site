"use client";

import Image from "next/image";
import { ViewTransition } from "react";
import { DownloadIcon, FileArchiveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitInfoButton } from "@/components/git-info-button";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useMessages } from "@/lib/hooks/useMessages";
import { pressKitLogos } from "@/lib/press-kit";

const PRESS_KIT_ZIP_URL =
  "https://cdn.internal.hytalemodding.dev/branding/HytaleModding_PressKit.zip";

function linkifyEmails(text: string) {
  return text.split(/([\w.+-]+@[\w.-]+\.\w+)/g).map((part, i) =>
    /^[\w.+-]+@[\w.-]+\.\w+$/.test(part) ? (
      <a
        key={i}
        href={`mailto:${part}`}
        className="hover:text-primary font-medium underline underline-offset-4 transition-colors"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function PressContent() {
  const messages = useMessages();
  const press = messages.press;
  const contacts = [
    press.contact.business,
    press.contact.media,
    press.contact.legal,
  ];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <GitInfoButton />
      <Spotlight />
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:py-24">
        <ViewTransition name="hero" share="blur-scale-transition">
          <header className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight">
              {press.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              {press.description}
            </p>
            <Button asChild variant={"primary"} size={"lg"}>
              <a href={PRESS_KIT_ZIP_URL} download>
                <FileArchiveIcon className="size-4" />
                {press.downloadKit}
              </a>
            </Button>
          </header>
        </ViewTransition>

        <section className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-semibold">{press.about.title}</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            {press.about.body1}
          </p>
          <ul className="mt-5 space-y-1.5">
            {press.about.mentions.map((mention, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-center gap-3 text-sm"
              >
                <span className="text-foreground w-7 shrink-0 text-right font-semibold tabular-nums">
                  {mention.count}×
                </span>
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {mention.label}
                  <span className="flex gap-1">
                    {mention.hrefs.map((href, j) =>
                      href ? (
                        <a
                          key={j}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={mention.label}
                          className="border-border hover:border-primary hover:text-primary rounded border px-1.5 text-xs leading-5 transition-colors"
                        >
                          {j + 1}
                        </a>
                      ) : null,
                    )}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 max-w-xl">
          <h2 className="text-2xl font-semibold">{press.contact.title}</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            {press.contact.leadIn}
          </p>
          <div className="mt-4 space-y-1.5">
            {contacts.map(({ label, email }) => (
              <p key={email}>
                <span className="text-muted-foreground">{label}: </span>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary font-medium underline underline-offset-4 transition-colors"
                >
                  {email}
                </a>
              </p>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            {linkifyEmails(press.legalNote)}
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold">{press.logos.title}</h2>
          <p className="text-muted-foreground mt-2">{press.logos.subtitle}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pressKitLogos.map((logo) => (
              <div
                key={logo.name + logo.svg}
                className="border-border bg-background/50 overflow-hidden rounded-xl border"
              >
                <div className="relative h-48 bg-zinc-900">
                  <Image
                    src={logo.svg}
                    alt={logo.name}
                    fill
                    className="object-contain p-10"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-semibold">{logo.name}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {logo.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button asChild variant={"outline"} size={"sm"}>
                      <a href={logo.svg} download>
                        SVG
                        <DownloadIcon className="size-3.5" />
                      </a>
                    </Button>
                    <Button asChild variant={"outline"} size={"sm"}>
                      <a href={logo.png} download>
                        PNG
                        <DownloadIcon className="size-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            {press.logos.note}
          </p>
        </section>
      </div>
    </div>
  );
}
