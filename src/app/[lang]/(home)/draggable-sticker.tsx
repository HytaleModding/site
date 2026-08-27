"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";

type DraggableStickerProps = {
  src: string;
  initialLeft?: number | string;
  initialRight?: number | string;
  initialTop: number | string;
  rotate: number;
  width: number | string;
  sizes: string;
};

export function DraggableSticker({
  src,
  initialLeft,
  initialRight,
  initialTop,
  rotate,
  width,
  sizes,
}: DraggableStickerProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragOrigin = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });

  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }
    };
  }, []);

  const handleMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragOrigin.current = {
      mx: e.clientX,
      my: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };

    const onMove = (event: MouseEvent) => {
      setOffset({
        x: dragOrigin.current.ox + (event.clientX - dragOrigin.current.mx),
        y: dragOrigin.current.oy + (event.clientY - dragOrigin.current.my),
      });
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const lifted = isHovered || isDragging;
  const lift = isDragging ? 12 : isHovered ? 5 : 0;
  const scale = isDragging ? 1.08 : isHovered ? 1.04 : 1;
  const extraTilt = isDragging ? 3 : 0;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      onMouseDown={handleMouseDown}
      onMouseEnter={() => {
        hoverTimer.current = setTimeout(() => setIsHovered(true), 120);
      }}
      onMouseLeave={() => {
        if (hoverTimer.current) {
          clearTimeout(hoverTimer.current);
        }

        if (!isDragging) {
          setIsHovered(false);
        }
      }}
      style={{
        position: "absolute",
        left: initialLeft,
        right: initialRight,
        top: initialTop,
        width,
        zIndex: isDragging ? 1000 : 30,
        pointerEvents: "auto",
        cursor: isDragging ? "grabbing" : "grab",
        transform: `translate(${offset.x}px, ${offset.y - lift}px) scale(${scale})`,
        transition: isDragging
          ? "none"
          : "transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.22s ease",
        filter: lifted
          ? `drop-shadow(0 ${lift}px ${lift + 6}px rgba(0,0,0,0.26))`
          : "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
        userSelect: "none",
      }}
    >
      <Image
        src={src}
        alt=""
        draggable={false}
        width={320}
        height={320}
        sizes={sizes}
        quality={85}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transform: `rotate(${rotate + (isDragging ? extraTilt : 0)}deg)`,
          transition: isDragging ? "none" : "transform 0.22s ease",
        }}
      />
    </div>
  );
}
