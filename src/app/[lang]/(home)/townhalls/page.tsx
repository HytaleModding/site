import TownHallsArchive from "@/components/TownHallsArchive";
import { townHalls } from "@/lib/townhalls";
import { getMessages, Messages } from "@/lib/locale";
import { deepMerge } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Town Halls | HytaleModding",
  description:
    "Watch and explore HytaleModding town halls, community events, and developer discussions.",
  alternates: { canonical: "/townhalls" },
  openGraph: { type: "website", url: "/townhalls", siteName: "HytaleModding" },
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const baseMessages = getMessages("en");
  const messages =
    lang === "en"
      ? baseMessages
      : (deepMerge(baseMessages, getMessages(lang)) as Messages);

  return (
    <TownHallsArchive
      messages={messages.home.townHalls}
      townHalls={townHalls}
    />
  );
}
