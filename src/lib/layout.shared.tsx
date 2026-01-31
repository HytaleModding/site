import { BookIcon } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";
import { getMessages } from "./locale";

export function baseOptions(
  locale: string,
  docsLayout?: boolean,
): BaseLayoutProps {
  const messages = getMessages(locale);

  let options: BaseLayoutProps = {
    i18n,
    nav: {
      title: messages.nav.title,
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
