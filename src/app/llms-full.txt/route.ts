import { getLLMFullText } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const entries = await getLLMFullText();

  return new Response(entries.join("\n\n"));
}
