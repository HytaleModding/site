import { TextLink } from "@/components/text-link";
import { DiscordButton } from "@/components/discord-button";

export function CommunitySection() {
  return (
    <div
      className="mx-auto my-24 flex w-full max-w-3xl items-center justify-center gap-12 px-4 not-lg:flex-col"
    >
      <div className="space-y-8 text-center">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "Lexend, Geist, sans-serif" }}>What is HytaleModding?</h1>
        <p className="text-foreground/80 text-lg">
          HytaleModding is the largest community of modders for {" "}
  <TextLink href="https://hytale.com">Hytale</TextLink>. We write docs,
  guides, and tools for modders of every skill level, and run community
  events like ModJams, town halls, and more that bring modders together and
  celebrate what they build.
          <br />
          <br />
          A big part of Hytale is its moddability, and our goal is to empower
          modders of all skill levels to create amazing content for the game.
          <br />
          <br />
          <b style={{ fontFamily: "Lexend, Geist, sans-serif" }}>Artists, game developers, or just curious players: everyone's welcome, and nobody needs experience to start.</b>
          <br />
          <br />
          <div style={{ fontFamily: "Lexend, Geist, sans-serif" }}>
            Join{" "}
            <TextLink href="https://discord.gg/hytalemodding"
              className="group relative inline-block font-medium text-foreground"
            >
            <span className="relative z-10">9,800+ modders on Discord</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-0 origin-right scale-x-0 bg-indigo-400
                        transition-transform duration-300 ease-out
                        group-hover:origin-left group-hover:scale-x-100"
            />
            </TextLink>{" "}
            and start building.
          </div>
        </p>
        <div className="not-lg:hidden">
          <DiscordButton showMemberCount />
        </div>
      </div>
      
    </div>
  );
}

