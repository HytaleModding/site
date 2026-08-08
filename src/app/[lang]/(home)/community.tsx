"use client";

import { TextLink } from "@/components/text-link";
import { DiscordButton } from "@/components/discord-button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SidePhoto = {
  src: string;
  top: string;
  x: number;
  rotate: number;
  side: "left" | "right";
  size?: number;
};

const PHOTOS: SidePhoto[] = [
  {
    src: "/assets/landing/hero/photo2.png",
    top: "2%",
    x: -70,
    rotate: -8,
    side: "left",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo6.png",
    top: "27%",
    x: -105,
    rotate: 14,
    side: "left",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo5.png",
    top: "52%",
    x: -85,
    rotate: -12,
    side: "left",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo4.png",
    top: "77%",
    x: -65,
    rotate: 9,
    side: "left",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo3.png",
    top: "2%",
    x: -70,
    rotate: 10,
    side: "right",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo8.png",
    top: "27%",
    x: -105,
    rotate: -16,
    side: "right",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo7.png",
    top: "52%",
    x: -85,
    rotate: 12,
    side: "right",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo1.png",
    top: "77%",
    x: -65,
    rotate: -10,
    side: "right",
    size: 340,
  },
];

function Polaroid({
  photo,
  onOpen,
}: {
  photo: SidePhoto;
  onOpen: (src: string) => void;
}) {
  return (
    <div
      className="side-photo"
      onClick={() => onOpen(photo.src)}
      style={{
        position: "absolute",
        [photo.side]: photo.x,
        top: photo.top,
        width: photo.size,
        transform: `rotate(${photo.rotate}deg)`,
        border: "4px solid var(--paper, #fff)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
        pointerEvents: "auto",
        cursor: "pointer",
        transition:
          "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.25s ease",
      }}
    >
      <Image
        src={photo.src}
        alt=""
        width={photo.size}
        height={Math.round((photo.size ?? 280) * 0.7)}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

function PhotoLightbox({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (src) {
      const raf = requestAnimationFrame(() => setVisible(true));
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    setVisible(false);
  }, [src, onClose]);

  if (!mounted || !src) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
        transition: "background 0.25s ease, backdrop-filter 0.25s ease",
        cursor: "zoom-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(90vw, 700px)",
          transform: visible ? "scale(1)" : "scale(0.85)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.25s ease",
          border: "6px solid #fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <Image
          src={src}
          alt=""
          width={900}
          height={630}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>,
    document.body,
  );
}

export function CommunitySection() {
  const [zoomedSrc, setZoomedSrc] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative my-8 min-h-[820px] overflow-x-clip">
      <style>{`
        .side-photo:hover {
          box-shadow: 0 14px 26px rgba(0,0,0,0.28);
          z-index: 10;
        }
        .side-photos { display: block; }
        @media (max-width: 1279px) { .side-photos { display: none; } }
      `}</style>

      <div className="side-photos" aria-hidden="true">
        {PHOTOS.map((p, i) => (
          <Polaroid key={i} photo={p} onOpen={setZoomedSrc} />
        ))}
      </div>

      <PhotoLightbox src={zoomedSrc} onClose={() => setZoomedSrc(null)} />

      <div className="relative z-[5] mx-auto flex h-full w-full max-w-3xl items-center justify-center gap-12 px-4 pt-35 not-lg:flex-col">
        <div className="space-y-8 text-center">
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: "Lexend, Geist, sans-serif" }}
          >
            What is HytaleModding?
          </h1>
          <p className="text-foreground/80 text-lg">
            HytaleModding is the largest community of modders for{" "}
            <TextLink href="https://hytale.com">Hytale</TextLink>. We write
            docs, guides, and tools for modders of every skill level, and run
            community events like ModJams, town halls, and more that bring
            modders together and celebrate what they build.
            <br />
            <br />
            A big part of Hytale is its moddability, and our goal is to empower
            modders of all skill levels to create amazing content for the game.
            <br />
            <br />
            <b style={{ fontFamily: "Lexend, Geist, sans-serif" }}>
              Artists, game developers, or just curious players: everyone's
              welcome, and nobody needs experience to start.
            </b>
            <br />
            <br />
            <div style={{ fontFamily: "Lexend, Geist, sans-serif" }}>
              Join{" "}
              <TextLink
                href="https://discord.gg/hytalemodding"
                className="group text-foreground relative inline-block font-medium"
              >
                <span className="relative z-10">9,800+ modders on Discord</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-0 origin-right scale-x-0 bg-indigo-400 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
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
    </div>
  );
}
