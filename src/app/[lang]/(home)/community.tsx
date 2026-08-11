"use client";

import { TextLink } from "@/components/text-link";
import { DiscordButton } from "@/components/discord-button";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FeranImage from "@/../public/assets/landing/hero/feran.png";
import { DraggableSticker } from "./draggable-sticker";

type SidePhoto = {
  src: string;
  top: string;
  x: number;
  rotate: number;
  side: "left" | "right";
  size?: number;
  user?: string;
};

const PHOTOS: SidePhoto[] = [
  {
    src: "/assets/landing/hero/photo2.png",
    top: "2%",
    x: -70,
    rotate: -8,
    side: "left",
    size: 340,
    user: "hytalemodding",
  },
  {
    src: "/assets/landing/hero/photo6.png",
    top: "27%",
    x: -90,
    rotate: 10,
    side: "left",
    size: 340,
    user: "modjam",
  },
  {
    src: "/assets/landing/hero/photo5.png",
    top: "46%",
    x: -85,
    rotate: -10,
    side: "left",
    size: 340,
    user: "worldsmiths",
  },
  {
    src: "/assets/landing/hero/photo4.png",
    top: "74%",
    x: -65,
    rotate: 9,
    side: "left",
    size: 340,
    user: "creators",
  },
  {
    src: "/assets/landing/hero/photo3.png",
    top: "2%",
    x: -70,
    rotate: 10,
    side: "right",
    size: 340,
    user: "townhall",
  },
  {
    src: "/assets/landing/hero/photo8.png",
    top: "32%",
    x: -90,
    rotate: -10,
    side: "right",
    size: 340,
    user: "buildclub",
  },
  {
    src: "/assets/landing/hero/photo7.png",
    top: "55%",
    x: -85,
    rotate: 8,
    side: "right",
    size: 340,
    user: "artistry",
  },
  {
    src: "/assets/landing/hero/photo1.png",
    top: "74%",
    x: -65,
    rotate: -10,
    side: "right",
    size: 340,
    user: "community",
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
        <InstagramCard
          photo={photo}
          size={size}
          onOpen={onOpen}
          hovered={hovered}
          rotate={photo.rotate}
        />
      </div>
    </div>
  );
}

function InstagramCard({
  photo,
  size,
  onOpen,
  hovered = false,
  rotate = 0,
  fill = false,
}: {
  photo: SidePhoto;
  size: number;
  onOpen: (src: string) => void;
  hovered?: boolean;
  rotate?: number;
  fill?: boolean;
}) {
  return (
    <div
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        height: fill ? "100%" : undefined,
        display: fill ? "flex" : undefined,
        flexDirection: fill ? "column" : undefined,
        boxShadow: hovered
          ? "0 16px 30px rgba(0,0,0,0.30)"
          : "0 5px 16px rgba(0,0,0,0.20)",
        pointerEvents: "auto",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
        color: "#0f172a",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            padding: 2,
            background:
              "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <Image
              src={photo.src}
              alt=""
              width={26}
              height={26}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600 }}>
          {photo.user ?? "hytalemodding"}
        </span>
      </div>

      {/* image */}
      <div
        onClick={() => onOpen(photo.src)}
        style={{ background: "#000", overflow: "hidden" }}
      >
        <Image
          src={photo.src}
          alt=""
          width={size}
          height={Math.round(size * 0.7)}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 10px 4px",
        }}
      >
        <Heart size={20} style={{ fill: "#ed4956", stroke: "#ed4956" }} />
        <MessageCircle size={20} />
        <Send size={20} />
        <Bookmark size={20} style={{ marginLeft: "auto" }} />
      </div>

      {/* likes + caption */}
      <div
        style={{
          padding: "0 10px 10px",
          lineHeight: 1.35,
          flex: fill ? 1 : undefined,
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>
          {1200 + ((((photo.rotate * 137) % 800) + 800) % 800)} likes
        </p>
        <p style={{ fontSize: 12, margin: "2px 0 0" }}>
          <span style={{ fontWeight: 600 }}>
            {photo.user ?? "hytalemodding"}
          </span>{" "}
          building the future of Hytale 🛠️
        </p>
      </div>
    </div>
  );
}

function MobileDeck({
  photos,
  onOpen,
}: {
  photos: SidePhoto[];
  onOpen: (src: string) => void;
}) {
  const [order, setOrder] = useState<number[]>(() => photos.map((_, i) => i));
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [leaving, setLeaving] = useState<1 | -1 | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const movedRef = useRef(false);

  const topPos = order.length - 1;
  const topIdx = order[topPos];

  // make the deck look hand-shuffled
  const seedX = (i: number) => ((i * 53) % 15) - 7;
  const seedY = (i: number) => ((i * 29) % 9) - 4;
  const seedRot = (i: number) => ((i * 37) % 9) - 4;

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    movedRef.current = false;
    setDrag({ x: 0, y: 0 });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) movedRef.current = true;
    setDrag({ x: dx, y: dy });
  };

  const endDrag = () => {
    if (!drag) return;
    if (Math.abs(drag.x) > 90) {
      const dir: 1 | -1 = drag.x > 0 ? 1 : -1;
      setLeaving(dir);
      window.setTimeout(() => {
        setOrder((o) => [o[o.length - 1], ...o.slice(0, o.length - 1)]);
        setLeaving(null);
        setDrag(null);
        startRef.current = null;
      }, 300);
    } else {
      setDrag(null);
      startRef.current = null;
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    // swallow the click that follows a drag so it doesn't open the lightbox
    if (movedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="mx-auto w-full">
      <div style={{ display: "grid", touchAction: "pan-y" }}>
        {order.map((idx, pos) => {
          const photo = photos[idx];
          const isTop = pos === topPos;
          const depth = topPos - pos;
          const baseRot = photo.rotate * 0.4 + seedRot(idx);

          let transform = `translate(${seedX(idx)}px, ${
            depth * 4 + seedY(idx)
          }px) rotate(${baseRot}deg) scale(${1 - depth * 0.02})`;
          let transition = "transform 0.3s ease";

          if (isTop && leaving !== null) {
            transform = `translate(${leaving * 140}%, ${
              drag?.y ?? 0
            }px) rotate(${baseRot + leaving * 18}deg)`;
          } else if (isTop && drag) {
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${
              baseRot + drag.x * 0.04
            }deg)`;
            transition = "none";
          }

          return (
            <div
              key={idx}
              style={{
                gridArea: "1 / 1",
                zIndex: pos,
                transform,
                transition,
                pointerEvents: isTop ? "auto" : "none",
                cursor: isTop ? "grab" : "default",
                filter:
                  depth > 0 ? `brightness(${1 - depth * 0.03})` : undefined,
                userSelect: "none",
              }}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? endDrag : undefined}
              onPointerCancel={isTop ? endDrag : undefined}
              onClickCapture={isTop ? onClickCapture : undefined}
            >
              <InstagramCard photo={photo} size={480} onOpen={onOpen} fill />
            </div>
          );
        })}
      </div>
      <p
        className="text-foreground/50 mt-4 text-center text-xs"
        style={{ fontFamily: "Lexend, Geist, sans-serif" }}
      >
        Swipe a card to shuffle the deck · tap to enlarge
      </p>
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
    <div className="relative my-8 min-h-fit overflow-x-clip xl:min-h-205">
      <style>{`
        .side-photo:hover {
          box-shadow: 0 14px 26px rgba(0,0,0,0.28);
          z-index: 10;
        }
        .side-photos { display: block; }
        @media (max-width: 1279px) { .side-photos { display: none; } }
        .mobile-feed { display: none; }
        @media (max-width: 1279px) { .mobile-feed { display: block; } }
      `}</style>

      <div className="side-photos" aria-hidden="true">
        {PHOTOS.map((p, i) => (
          <Polaroid key={i} photo={p} onOpen={setZoomedSrc} />
        ))}
      </div>

      <PhotoLightbox src={zoomedSrc} onClose={() => setZoomedSrc(null)} />

      <div className="relative z-5 mx-auto flex h-full w-full max-w-3xl items-center justify-center gap-12 px-4 pt-16 not-lg:flex-col xl:pt-35">
        <div className="space-y-8 text-center">
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: "Lexend, Geist, sans-serif" }}
          >
            What is HytaleModding?
          </h1>
          <div className="text-foreground/80 text-lg">
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
                  className="absolute inset-0 z-0 origin-right scale-x-0 bg-indigo-400 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                />
              </TextLink>{" "}
              and start building.
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
      </div>

      {/* mobile feed: shown only where the side photos are hidden */}
      <div className="mobile-feed relative z-5 mx-auto w-full max-w-md px-4 pb-16">
        <MobileDeck photos={PHOTOS} onOpen={setZoomedSrc} />
      </div>
    </div>
  );
}
