"use client";

import { TextLink } from "@/components/text-link";
import { DiscordButton, useDiscordStats } from "@/components/discord-button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FeranImage from "@/../public/assets/landing/hero/feran.png";
import BurgerImage from "@/../public/assets/landing/hero/burger.png";
import { DraggableSticker } from "./draggable-sticker";
import { FadeIn } from "@/components/ui/reveal";
import { useMessages } from "@/lib/hooks/useMessages";
import { richText } from "@/lib/rich-text";

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
    x: -90,
    rotate: 10,
    side: "left",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo5.png",
    top: "46%",
    x: -85,
    rotate: -10,
    side: "left",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo4.png",
    top: "74%",
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
    top: "32%",
    x: -90,
    rotate: -10,
    side: "right",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo7.png",
    top: "55%",
    x: -85,
    rotate: 8,
    side: "right",
    size: 340,
  },
  {
    src: "/assets/landing/hero/photo1.png",
    top: "74%",
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
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const size = photo.size ?? 280;
  const edgeStyle: React.CSSProperties =
    photo.side === "right" ? { right: photo.x } : { left: photo.x };

  const REVEAL = 80;
  const MIN_SLIDE = size * 0.9;
  const hidden = Math.abs(photo.x);
  const magnitude = Math.max(hidden + REVEAL, MIN_SLIDE);
  const slideX = photo.side === "left" ? magnitude : -magnitude;

  return (
    <div
      style={{
        position: "absolute",
        ...edgeStyle,
        top: photo.top,
        width: size,
        zIndex: hovered ? 20 : 1,
        pointerEvents: "auto",
      }}
      onMouseEnter={() => {
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        setHovered(true);
      }}
      onMouseLeave={() => {
        leaveTimer.current = setTimeout(() => setHovered(false), 200);
      }}
    >
      <div
        style={{
          width: "100%",
          transform:
            hovered &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? `translateX(${slideX}px)`
              : "none",
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          pointerEvents: "none",
        }}
      >
        <div
          onClick={() => onOpen(photo.src)}
          style={{
            transform: `rotate(${photo.rotate}deg)`,
            border: "4px solid var(--paper, #fff)",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: hovered
              ? "0 14px 26px rgba(0,0,0,0.28)"
              : "0 4px 14px rgba(0,0,0,0.18)",
            pointerEvents: "auto",
            cursor: "pointer",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <Image
            src={photo.src}
            alt=""
            width={size}
            height={Math.round(size * 0.7)}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
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
  const { stats } = useDiscordStats(true);
  const messages = useMessages();
  const t = messages.home.community;

  const discordMemberCount = stats?.total_members ?? 0;
  const clampedDiscordMemberCount = Math.floor(discordMemberCount / 100) * 100;
  // Keep the copy truthful while the client-side Discord request completes.
  const discordMemberCountLabel = stats
    ? `${clampedDiscordMemberCount.toLocaleString()}+`
    : "—";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative my-8 min-h-fit overflow-x-clip xl:min-h-205">
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

      <div className="not-lg:hidden">
        <DraggableSticker
          src={BurgerImage.src}
          initialLeft="calc(1% - 40px)"
          initialTop="calc(100% - 6rem)"
          rotate={12}
          width={160}
          sizes="(max-width: 768px) 120px, 160px"
        />
      </div>

      <PhotoLightbox src={zoomedSrc} onClose={() => setZoomedSrc(null)} />
      <FadeIn className="relative z-5 mx-auto flex h-full w-full max-w-3xl items-center justify-center gap-12 px-4 pt-16 not-lg:flex-col xl:pt-35">
        <div className="space-y-8 text-center">
          <h2 className="font-display text-3xl font-semibold">{t.title}</h2>
          <div className="text-foreground/80 text-lg">
            {richText(t.description, {
              link: (chunks) => (
                <TextLink href="https://hytale.com">{chunks}</TextLink>
              ),
            })}
            <br />
            <br />
            {t.moddability}
            <br />
            <br />
            <b className="font-display">{t.welcome}</b>
            <br />
            <br />
            <div className="font-display">
              {richText(t.join.replace("{count}", discordMemberCountLabel), {
                link: (chunks) => (
                  <TextLink
                    href="https://discord.gg/hytalemodding"
                    className="group text-foreground relative inline-block min-w-[18ch] font-medium"
                  >
                    <span className="relative z-10">{chunks}</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 z-0 origin-right scale-x-0 bg-indigo-400 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                    />
                  </TextLink>
                ),
              })}
            </div>
          </div>
          <div className="relative flex flex-col items-center pb-16 lg:pb-40">
            <DiscordButton showMemberCount />
            <div className="not-lg:hidden">
              <DraggableSticker
                src={FeranImage.src}
                initialLeft="calc(50% - 80px)"
                initialTop="calc(100% - 6rem)"
                rotate={0}
                width={160}
                sizes="(max-width: 768px) 120px, 160px"
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
