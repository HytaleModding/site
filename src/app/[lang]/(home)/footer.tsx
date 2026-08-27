"use client";

import { ExternalLinkIcon, MailIcon } from "lucide-react";
import { SiGithub, SiYoutube, SiDiscord } from "react-icons/si";
import { branch, commit } from "@/git-info.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import HytaleModdingLogoDark from "@/../public/branding/hytalemodding/HM_DARK.svg";
import HytaleModdingLogoLight from "@/../public/branding/hytalemodding/HM_LIGHT.svg";

const LINK_GROUPS = [
  {
    heading: "HytaleModding",
    links: [
      { label: "Press Inquiries", href: "/press" },
      { label: "Town Halls", href: "/townhalls" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/en/docs" },
      { label: "Wiki", href: "https://wiki.hytalemodding.dev" },
      { label: "Grant Program", href: "/en/grants" },
      { label: "Blogs", href: "/news" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Discord",
    href: "https://discord.gg/hytalemodding",
    icon: SiDiscord,
  },
  { label: "GitHub", href: "https://github.com/HytaleModding", icon: SiGithub },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@HytaleModding",
    icon: SiYoutube,
  },
  { label: "Email", href: "mailto:hello@hytalemodding.dev", icon: MailIcon },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

function LinkCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-[160px]">
      <p className="mb-4 text-lg font-bold tracking-tight text-[var(--paper)]">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            {isExternal(link.href) ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[var(--paper)]/80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-base text-[var(--paper)]/80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ logoAlt = "HytaleModding" }: { logoAlt?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer bg-background text-foreground relative overflow-hidden border-t"
      style={{
        paddingLeft: "clamp(24px, 6vw, 80px)",
        paddingRight: "clamp(24px, 6vw, 80px)",
        paddingTop: 56,
        paddingBottom: 32,
      }}
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
        <div className="absolute top-0 -left-7 hidden w-[clamp(180px,24vw,320px)] translate-y-[-35%] md:block">
          <Image
            src={HytaleModdingLogoLight}
            alt=""
            className="block w-full dark:hidden"
          />
          <Image
            src={HytaleModdingLogoDark}
            alt=""
            className="hidden w-full dark:block"
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <Link href="/" aria-label={logoAlt} className="inline-flex">
              <div className="relative h-12 w-[min(100%,200px)]">
                <Image
                  src={HytaleModdingLogoLight}
                  alt={logoAlt}
                  fill
                  className="object-contain dark:hidden"
                  sizes="200px"
                />
                <Image
                  src={HytaleModdingLogoDark}
                  alt={logoAlt}
                  fill
                  className="hidden object-contain dark:block"
                  sizes="200px"
                />
              </div>
            </Link>

            <p className="text-foreground/80 mt-4 max-w-lg text-base leading-relaxed sm:text-lg">
              HytaleModding is the largest community of modders for Hytale.
            </p>

            <p className="text-foreground/70 mt-3 max-w-lg text-sm leading-relaxed sm:text-base">
              We write docs, guides, and tools, and run community events that
              help modders of every skill level build better projects.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={isExternal(href) ? "_blank" : undefined}
                  rel={isExternal(href) ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="bg-background text-foreground hover:bg-accent focus-visible:bg-accent inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-12">
            {LINK_GROUPS.map((group) => (
              <LinkCol
                key={group.heading}
                title={group.heading}
                links={group.links}
              />
            ))}
          </div>
        </div>

        <div className="border-border text-foreground/70 flex flex-col-reverse gap-3 border-t pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl leading-relaxed">
            &copy; {year} HytaleModding. Not affiliated with Hypixel Studios.
          </p>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:text-foreground h-auto gap-1.5 px-2 py-1.5"
          >
            <Link
              href={`https://github.com/HytaleModding/site/tree/${branch}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="size-3.5" />
              <span>{branch}</span>
              <span className="opacity-60">@ {commit}</span>
            </Link>
          </Button>
        </div>
      </div>

      <style>{`
        .site-footer a:hover,
        .site-footer a:focus-visible {
          opacity: 1;
        }
      `}</style>
    </footer>
  );
}
