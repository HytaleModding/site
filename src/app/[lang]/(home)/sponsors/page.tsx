"use client";
import { ExternalLinkIcon } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitInfoButton } from "@/components/git-info-button";
import Image from "next/image";

const featuredSponsors = [
  {
    name: 'Template until we have a sponsor',
    logo: '/branding/logo-light-348.png',
    url: 'https://hytalemodding.guide',
  },
];

const sponsors = [
  {
    name: 'Template until we have a sponsor',
    logo: '/branding/logo-light-348.png',
    url: 'https://hytalemodding.guide',
  },
];

export default function SponsorsPage() {
  return (
    <div className="relative flex flex-1 overflow-hidden">
      <GitInfoButton />
      <Spotlight />
      <div className="container mx-auto flex flex-1 flex-col items-center gap-8 px-12 py-8 lg:flex-row lg:justify-between lg:py-0">
        <div className="max-w-xl space-y-6 max-lg:max-w-lg max-lg:py-32 max-lg:text-center">
          <h1 className="text-4xl font-semibold text-balance">
            Sponsors
          </h1>
          <h2 className="text-muted-foreground text-lg text-balance">
            HytaleModding is an open-source community project, and part of managing the community involves paying for services, servers and infrastructure, like hosting this website. If you would like to support the project, consider becoming a sponsor!
          </h2>
          <div className="flex flex-wrap gap-4 max-lg:justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="https://opencollective.com/hytalemodding" target="_blank" rel="noopener noreferrer">
                Open Collective
              </Link>
            </Button>
          </div>

          <div className="space-y-4 pt-8">
            <h3 className="text-xl font-semibold">Our Sponsors</h3>
            <div className="space-y-3">
              {featuredSponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-fd-border bg-fd-card hover:bg-fd-accent transition-all hover:shadow-lg overflow-hidden"
                >
                  <div className="w-full h-24 relative">
                    <Image 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex flex-wrap gap-3">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={sponsor.name}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg border-2 border-fd-border bg-fd-card hover:bg-fd-accent hover:border-fd-primary transition-all hover:scale-110 relative overflow-hidden">
                    <Image 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-fd-popover text-fd-popover-foreground px-3 py-1 rounded-md text-sm font-medium pointer-events-none border border-fd-border shadow-lg z-10">
                    {sponsor.name}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}