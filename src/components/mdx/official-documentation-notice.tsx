import { getMessages } from "@/lib/locale";
import { Callout } from "./Callout";

export function OfficialDocumentationNotice() {
  const messages = getMessages();

  return (
    <Callout
      type="info"
      title={messages.misc.officialDocumentationNotice.title}
    >
      {messages.misc.officialDocumentationNotice.description
        .split(/(\*\*.*?\*\*)/)
        .map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            part
          ),
        )}
    </Callout>
  );
}
