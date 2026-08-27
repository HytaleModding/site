import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { FadeIn } from "@/components/ui/reveal";
import { Messages } from "@/lib/locale";
import { richText } from "@/lib/rich-text";

type Resource = {
  title: string;
  description: string;
  image: string;
  links: { label: string; href: string }[];
  external?: boolean;
};

function ResourceRow({
  resource,
  reverse,
}: {
  resource: Resource;
  reverse?: boolean;
}) {
  return (
    <article
      className={`resource-row bg-card relative grid overflow-hidden rounded-xl border shadow-sm lg:grid-cols-2 ${reverse ? "lg:[&_.resource-row-image]:order-2" : ""}`}
    >
      <FadeIn
        y={16}
        x={reverse ? 48 : -48}
        className={`min-h-64 lg:min-h-88 ${reverse ? "lg:order-2" : ""}`}
      >
        <div className="resource-row-image relative h-full min-h-64 overflow-hidden lg:min-h-88">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${resource.image})` }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent lg:hidden" />
        </div>
      </FadeIn>

      <FadeIn y={16} x={reverse ? -48 : 48} delay={0.12} className="h-full">
        <div className="resource-row-copy flex h-full flex-col p-6 sm:p-8 lg:p-10">
          <h2 className="font-display text-3xl font-semibold">
            {resource.title}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            {resource.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {resource.links.map((link) => (
              <Button key={link.label} asChild variant="primary">
                <Link
                  href={link.href}
                  target={resource.external ? "_blank" : undefined}
                  rel={resource.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                  <ArrowRightIcon />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </FadeIn>
    </article>
  );
}

export function ResourcesSection({
  messages,
}: {
  messages: Messages["home"]["resources"];
}) {
  const resources: Resource[] = [
    {
      title: messages.documentation.title,
      description: messages.documentation.description,
      image: "/assets/landing/hero/exploration.jpg",
      links: [{ label: messages.documentation.viewDocs, href: "/en/docs" }],
    },
    {
      title: messages.wiki.title,
      description: messages.wiki.description,
      image: "/assets/blogs/background/sunlight-through-trees.jpg",
      external: true,
      links: [
        {
          label: messages.wiki.browseMods,
          href: "https://wiki.hytalemodding.dev/mods",
        },
        {
          label: messages.wiki.writeWiki,
          href: "https://wiki.hytalemodding.dev/login",
        },
      ],
    },
  ];

  return (
    <section className="container mx-auto my-24 max-w-7xl px-4">
      <FadeIn>
        <SectionHeader
          align="left"
          className="mb-10"
          title={richText(messages.title, {
            accent: (chunks) => (
              <span className="text-sky-600 dark:text-sky-400">{chunks}</span>
            ),
          })}
        />
      </FadeIn>
      <div className="grid gap-8">
        <ResourceRow resource={resources[0]} />
        <ResourceRow resource={resources[1]} reverse />
      </div>
    </section>
  );
}
