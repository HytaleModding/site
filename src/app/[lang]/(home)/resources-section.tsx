import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";

type Resource = {
  title: string;
  description: string;
  image: string;
  links: { label: string; href: string }[];
  external?: boolean;
};

const RESOURCES: Resource[] = [
  {
    title: "Documentation",
    description: "HytaleModding provides documentation for World Gen, Asset Packs, and Modding Toolsa. Learn how to create your own mods, explore the API, and get started with modding in Hytale. Start with practical guides, then dive into the API reference for more advanced topics.",
    image: "/assets/landing/hero/exploration.jpg",
    links: [
      { label: "View documentation", href: "/en/docs" },
    ],
  },
  {
    title: "HytaleModding Wiki",
    description: "The HytaleModding Wiki lets modders create a dedicated wiki for their own mod. It's a place to publish guides, document features, and keep everything about the project organized in one spot for the community.",
    image: "/assets/blogs/background/sunlight-through-trees.jpg",
    external: true,
    links: [
      { label: "Browse existing mods", href: "https://wiki.hytalemodding.dev/mods" },
      { label: "Write your own wiki", href: "https://wiki.hytalemodding.dev/login" },
    ],
  },
];

function ResourceRow({ resource, reverse }: { resource: Resource; reverse?: boolean }) {
  return (
    <article className={`resource-row relative grid overflow-hidden rounded-xl border bg-card shadow-sm lg:grid-cols-2 ${reverse ? "lg:[&_.resource-row-image]:order-2" : ""}`}>
      <div className="resource-row-image relative min-h-64 overflow-hidden lg:min-h-88">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url(${resource.image})` }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent lg:hidden" />
      </div>

      <div className="resource-row-copy flex flex-col p-6 sm:p-8 lg:p-10">
        <h2 className="font-display text-3xl font-semibold">{resource.title}</h2>
        <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">{resource.description}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {resource.links.map((link) => (
            <Button key={link.label} asChild variant="primary">
              <Link href={link.href} target={resource.external ? "_blank" : undefined} rel={resource.external ? "noopener noreferrer" : undefined}>
                {link.label}<ArrowRightIcon />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ResourcesSection() {
  return (
    <section className="container mx-auto my-24 max-w-7xl px-4">
      <SectionHeader
        align="left"
        className="mb-10"
        title={
          <>
            <span className="text-sky-600 dark:text-sky-400">
              There’s a place to start,
            </span>{" "}
            whatever you want to make.
          </>
        }
      />
      <div className="grid gap-8">
        <ResourceRow resource={RESOURCES[0]} />
        <ResourceRow resource={RESOURCES[1]} reverse />
      </div>
    </section>
  );
}
