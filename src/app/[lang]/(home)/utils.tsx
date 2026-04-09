import { DiscordButton } from "@/components/discord-button";
import { TextLink } from "@/components/text-link";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DynamicLink from "fumadocs-core/dynamic-link";
import { CircleQuestionMarkIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { startTransition, useState, ViewTransition } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function UtilsSection() {
  return (
    <div className="mx-auto my-24 w-full max-w-7xl items-center space-y-8 px-4">
      <h1 className="text-3xl font-semibold">Powering Your Mods</h1>
      <p className="text-muted-foreground">
        See what the community has built to help you create amazing mods.
      </p>
      <UtilsShowcase />
    </div>
  );
}

const utilTypes = ["tool", "platform"] as const;

interface UtilsShowcaseItemBase {
  title: string;
  description: string;
  href: string;
  logo?: string;
  backgroundImage: string;
  type: (typeof utilTypes)[number];
  expanded?: boolean;
}

interface HMShowcaseItem extends UtilsShowcaseItemBase {
  logo: string;
  by: "hytalemodding";
}

interface CommunityShowcaseItem extends UtilsShowcaseItemBase {
  by: "community";
}

type UtilsShowcaseItem = HMShowcaseItem | CommunityShowcaseItem;

const utils: UtilsShowcaseItem[] = [
  {
    title: "HM Documentation",
    description:
      "Community maintained documentation for modding Hytale. Now even hosts official documentation!",
    href: "/[lang]/docs",
    type: "tool",
    logo: "https://cataas.com/cat/says/hmdocs-logo",
    backgroundImage: "https://cataas.com/cat/says/hmdocs-background",
    by: "hytalemodding",
    expanded: true,
  },
  {
    title: "Wiki",
    description:
      "Wiki platform for your Hytale mods. Create pages for your mod, document your APIs, and more!",
    href: "https://wiki.hytalemodding.dev",
    type: "tool",
    logo: "https://cataas.com/cat/says/wiki-logo",
    backgroundImage: "https://cataas.com/cat/says/wiki-background",
    by: "hytalemodding",
  },
  {
    title: "Forum",
    description:
      "Discuss about Hytale, ask questions, and connect with other modders!",
    href: "https://forum.hytalemodding.dev",
    type: "platform",
    logo: "https://cataas.com/cat/says/forum-logo",
    backgroundImage: "https://cataas.com/cat/says/forum-background",
    by: "hytalemodding",
  },
];

function UtilsShowcase() {
  const anchor = useComboboxAnchor();
  const [selectedTags, setSelectedTags] = useState<
    (typeof utilTypes)[number][]
  >([]);
  const [search, setSearch] = useState("");
  const [communityFilter, setCommunityFilter] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <Input
          placeholder="Search..."
          onChange={(e) => startTransition(() => setSearch(e.target.value))}
          className="mr-auto w-fit"
        />
        <div className="flex items-center space-x-2">
          <Switch
            id="filter-community"
            checked={communityFilter}
            onCheckedChange={(checked) =>
              startTransition(() => setCommunityFilter(checked))
            }
          />
          <Label htmlFor="filter-community">
            Exclude Community
            <Tooltip>
              <TooltipTrigger>
                <CircleQuestionMarkIcon className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Exclude utilities made by the HytaleModding community but not
                  maintained by HytaleModding team.
                </p>
              </TooltipContent>
            </Tooltip>
          </Label>
        </div>
        <Combobox
          multiple
          autoHighlight
          items={utilTypes}
          defaultValue={[]}
          onValueChange={(value) =>
            startTransition(() => setSelectedTags(value))
          }
          value={selectedTags}
        >
          <ComboboxChips ref={anchor} className="group w-full max-w-xs gap-0">
            <ComboboxValue>
              {(values) => (
                <>
                  {values.length === 0 && (
                    <span className="text-muted-foreground w-0 text-nowrap transition-opacity group-focus-within:opacity-0">
                      No filters applied
                    </span>
                  )}
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor} className="above-transitions">
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList className="font-geist">
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {utils
          .filter((item) =>
            selectedTags.length > 0 ? selectedTags.includes(item.type) : true,
          )
          .filter(
            (item) =>
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.description.toLowerCase().includes(search.toLowerCase()),
          )
          .filter((item) => (communityFilter ? item.by !== "community" : true))
          .map((item, index) => (
            <ViewTransition key={item.title}>
              <UtilsShowcaseCard item={item} index={index} />
            </ViewTransition>
          ))}
      </div>
    </>
  );
}

function UtilsShowcaseCard({
  item,
  index,
}: {
  item: UtilsShowcaseItem;
  index: number;
}) {
  return (
    <Card
      data-expanded={item.expanded}
      className="h-96 overflow-hidden py-0 lg:data-[expanded=true]:col-span-2"
    >
      <DynamicLink
        href={item.href}
        className="group relative flex h-full flex-col"
      >
        <Image
          src={item.backgroundImage}
          alt={`${item.title} background`}
          aria-hidden
          fill
          draggable={false}
          className="mask-b-from-90% object-cover object-top"
        />
        <div className="from-card/65 to-card group-hover:from-card z-10 mt-auto flex min-h-40 flex-col justify-between gap-4 border-t bg-linear-to-b pt-4 backdrop-blur-md transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              {item.logo && (
                <div className="flex size-12 items-center justify-center">
                  <Image
                    src={item.logo}
                    alt={`${item.title} logo`}
                    width={48}
                    height={48}
                    className="rounded-md object-contain"
                  />
                </div>
              )}
              <p>{item.title}</p>
            </CardTitle>
            {item.description && (
              <CardDescription>{item.description}</CardDescription>
            )}
          </CardHeader>
          <CardFooter className="flex gap-4 border-t py-2! text-sm">
            <p className="text-muted-foreground">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} •{" "}
              {item.by === "hytalemodding" ? "HytaleModding" : "Community"}{" "}
              project
            </p>
          </CardFooter>
        </div>
      </DynamicLink>
    </Card>
  );
}
