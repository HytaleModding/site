import { TextLink } from "@/components/text-link";
import { DiscordButton } from "@/components/discord-button";

export function CommunitySection() {
  return (
    <div className="mx-auto my-24 flex w-full max-w-7xl items-center gap-12 px-4 not-lg:flex-col">
      <div className="space-y-8">
        <h1 className="text-3xl font-semibold">What is Hytale Modding?</h1>
        <p className="text-muted-foreground">
          Hytale Modding is a community around modding{" "}
          <TextLink href="https://hytale.com">Hytale</TextLink>
          .
          <br />
          A big part of Hytale is its moddability, and our goal is to empower
          modders of all skill levels to create amazing content for the game.
          <br />
          <br />
          Whether you&apos;re a beginner looking to make your first mod or an
          experienced developer aiming to create complex mods, you&apos;ll find
          something for you in our documentation, guides, and tools. Join us and
          be part of the exciting world of Hytale modding!
          <br />
          <br />
          Join our{" "}
          <TextLink href="https://discord.gg/hytalemodding">
            Discord community
          </TextLink>{" "}
          to connect with 9,800+ other modders, get help, and share your
          creations!
        </p>
        <div className="not-lg:hidden">
          <DiscordButton />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <DiscordWidget />
      </div>
    </div>
  );
}

function DiscordWidget() {
  return (
    <iframe
      src="https://discord.com/widget?id=1440173445039132724&theme=dark"
      height="500"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      className="w-full rounded-lg lg:max-w-96"
    />
  );
}
