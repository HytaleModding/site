import Image from "next/image";
import { BookIcon } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";
import HytaleModdingLogo from "@/app/icon0.svg";
import { getMessages } from "./locale";

export function baseOptions(
  locale: string,
  docsLayout?: boolean,
): BaseLayoutProps {
  const messages = getMessages(locale);

  let options: BaseLayoutProps = {
    i18n,
    nav: {
      title: (
        <>
          <div className="relative h-12 w-12 lg:h-8 lg:w-8">
            <Image alt="Hytale Modding" src={HytaleModdingLogo} fill />
          </div>
          <span className="font-medium">{messages.nav.title}</span>
        </>
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
    );
  }

  return options;
}
