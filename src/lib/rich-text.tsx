import { Fragment, type ReactNode } from "react";

type RichTextComponents = Record<string, (chunks: string) => ReactNode>;

/**
 * Parses a string with simple <tag>...</tag> markers and renders
 * them using the provided component map. Non-nested, single-level only.
 *
 * Example:
 *   richText("The <italic>largest</italic> community", {
 *     italic: (chunks) => <em>{chunks}</em>,
 *   })
 */
export function richText(
  input: string,
  components: RichTextComponents,
): ReactNode[] {
  const tagPattern = /<(\w+)>(.*?)<\/\1>/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tagPattern.exec(input)) !== null) {
    const [fullMatch, tag, content] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(
        <Fragment key={key++}>{input.slice(lastIndex, start)}</Fragment>,
      );
    }

    const renderer = components[tag];
    parts.push(
      <Fragment key={key++}>
        {renderer ? renderer(content) : content}
      </Fragment>,
    );

    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < input.length) {
    parts.push(<Fragment key={key++}>{input.slice(lastIndex)}</Fragment>);
  }

  return parts;
}