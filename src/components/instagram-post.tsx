"use client";

import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useRef, useState } from "react";

export type InstagramPostData = {
  /** Image shown in the post (and, by default, in the avatar). */
  src: string;
  /** Account handle rendered in the header and caption. */
  user?: string;
  /** Optional avatar image; falls back to `src`. */
  avatarSrc?: string;
  /** Caption text after the username. */
  caption?: React.ReactNode;
  /** Like count; when omitted a stable value is derived from `rotate`. */
  likes?: number;
  /** Rotation used for the derived like count / deck tilt. */
  rotate?: number;
};

function likeCount(post: InstagramPostData): number {
  if (typeof post.likes === "number") return post.likes;
  const r = post.rotate ?? 0;
  return 1200 + ((((r * 137) % 800) + 800) % 800);
}

export function InstagramPost({
  post,
  size = 480,
  onOpen,
  hovered = false,
  rotate = 0,
  fill = false,
}: {
  post: InstagramPostData;
  size?: number;
  onOpen?: (src: string) => void;
  hovered?: boolean;
  rotate?: number;
  fill?: boolean;
}) {
  const user = post.user ?? "hytalemodding";
  const avatar = post.avatarSrc ?? post.src;

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
        cursor: onOpen ? "pointer" : "default",
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
              src={avatar}
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
        <span style={{ fontSize: 13, fontWeight: 600 }}>{user}</span>
      </div>

      {/* image */}
      <div
        onClick={onOpen ? () => onOpen(post.src) : undefined}
        style={{ background: "#000", overflow: "hidden" }}
      >
        <Image
          src={post.src}
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
          {likeCount(post)} likes
        </p>
        <p style={{ fontSize: 12, margin: "2px 0 0" }}>
          <span style={{ fontWeight: 600 }}>{user}</span>{" "}
          {post.caption ?? "building the future of Hytale 🛠️"}
        </p>
      </div>
    </div>
  );
}

/**
 * A hand-shuffled deck of {@link InstagramPost} cards. Drag the top card
 * sideways to fling it away; it reinserts at the bottom of the deck.
 */
export function InstagramPostDeck({
  posts,
  onOpen,
  size = 480,
  hint = "Swipe a card to shuffle the deck · tap to enlarge",
}: {
  posts: InstagramPostData[];
  onOpen?: (src: string) => void;
  size?: number;
  hint?: string;
}) {
  const [order, setOrder] = useState<number[]>(() => posts.map((_, i) => i));
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [leaving, setLeaving] = useState<1 | -1 | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const movedRef = useRef(false);

  const topPos = order.length - 1;

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
          const post = posts[idx];
          const isTop = pos === topPos;
          const depth = topPos - pos;
          const baseRot = (post.rotate ?? 0) * 0.4 + seedRot(idx);

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
              <InstagramPost post={post} size={size} onOpen={onOpen} fill />
            </div>
          );
        })}
      </div>
      {hint ? (
        <p className="text-foreground/50 font-display mt-4 text-center text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
