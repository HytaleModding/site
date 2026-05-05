import Image from "next/image";
import { BookIcon, XIcon } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";
import { getMessages } from "./locale";
import HytaleLogo from "@/../public/hytale-branding/hytale-logo-white.svg";
import HytaleModdingLogo from "@/../public/branding/hytalemodding/HM_DARK.svg";
import HytaleModdingIcon from "@/app/icon0.svg";

export function baseOptions(
  locale: string,
  docsLayout?: boolean,
): BaseLayoutProps {
  const messages = getMessages(locale);

  let options: BaseLayoutProps = {
    i18n,
    nav: {
      title: (
        <div className="flex items-center gap-2 lg:px-2">
          <div className="hidden in-[.official]:block">
            <div className="relative h-16 w-20 lg:h-8">
              <Image
                alt="Hytale"
                src={HytaleLogo}
                fill
                className="object-contain not-dark:invert lg:object-cover"
              />
            </div>
          </div>
          <div className="hidden in-[.official]:block">
            <XIcon className="text-muted-foreground size-4" />
          </div>

          <div className="relative h-16 w-8 in-[.official]:w-20 lg:h-8">
            <Image
              alt="Hytale Modding"
              src={HytaleModdingLogo}
              fill
              className="hidden object-contain not-dark:invert in-[.official]:block"
            />
            <Image
              alt="Hytale Modding"
              src={HytaleModdingIcon}
              fill
              className="object-contain not-dark:invert in-[.official]:hidden"
            />
          </div>
          <div className="in-[.official]:hidden">
            <span className="font-medium">{messages.nav.title}</span>
          </div>
        </div>
      ),
      url: `/${locale}/`,
    },
  };

  options.links = [];

  if (!docsLayout) {
    options.links?.push(
      {
        icon: <BookIcon />,
        text: messages.nav.documentation,
        url: `/${locale}/docs`,
        active: "nested-url",
      },
      {
        text: messages.nav.sponsors,
        url: `/${locale}/sponsors`,
      },
      {
        text: messages.nav.wiki,
        url: "https://wiki.hytalemodding.dev",
      },
      {
        text: messages.nav.grants,
        url: `/${locale}/grants`,
      },
      {
        text: messages.nav.milestones,
        url: `/${locale}/milestones`,
      },
    );
  }

  return options;
}
