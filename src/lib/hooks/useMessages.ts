"use client";

import { useParams } from "next/navigation";
import { getMessages, Messages } from "../locale";
import { deepMerge } from "../utils";

export function useMessages(): Messages {
  const params = useParams();
  const lang = params?.lang?.toString();

  const baseMessages = getMessages("en");

  if (!lang || lang === "en") {
    return baseMessages;
  }

  const currentMessages = getMessages(lang);

  return deepMerge(baseMessages, currentMessages) as Messages;
}
