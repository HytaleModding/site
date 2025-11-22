import { BookIcon, BookOpen } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Hytale Modding",
    },
    links: [
      {
        icon: <BookIcon />,
        text: "Documentation",
        url: "/docs",
        active: "nested-url",
      },
    ],
  };
}
