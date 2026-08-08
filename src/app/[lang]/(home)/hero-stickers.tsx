"use client";

import MascotImage from "@/../public/assets/landing/hero/mascot.png";
import ChestImage from "@/../public/assets/landing/hero/chest.png";
import { DraggableSticker } from "./draggable-sticker";

export function HeroStickers() {
  return (
    <>
      <DraggableSticker
        src={MascotImage.src}
        initialRight={14}
        initialTop={34}
        rotate={-12}
        width={180}
        sizes="(max-width: 768px) 92px, 180px"
      />
      <DraggableSticker
        src={ChestImage.src}
        initialLeft={10}
        initialTop="calc(100% - 8rem)"
        rotate={8}
        width={112}
        sizes="(max-width: 768px) 78px, 112px"
      />
    </>
  );
}
