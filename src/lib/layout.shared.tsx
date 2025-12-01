import { BookIcon } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";
import { getMessages } from "./locale";

export function baseOptions(locale: string): BaseLayoutProps {
  const messages = getMessages(locale);
  return {
    i18n,
    nav: {
      title: messages.nav.title,
    },
    links: [
      {
        icon: <BookIcon />,
        text: messages.nav.documentation,
        url: `/${locale}/docs`,
        active: "nested-url",
      },
    ],
  };
}
