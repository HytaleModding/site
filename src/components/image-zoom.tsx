"use client";

import { Image, type ImageProps } from "fumadocs-core/framework";
import type { ComponentProps } from "react";
import Zoom, { type UncontrolledProps } from "react-medium-image-zoom";
import "../styles/image-zoom.css";

export type ImageZoomProps = Omit<ImageProps, "src"> & {
  src?: ComponentProps<"img">["src"] | ImageProps["src"];

  /**
   * Image props when zoom in
   */
  zoomInProps?: ComponentProps<"img">;

  /**
   * Props for `react-medium-image-zoom`
   */
  rmiz?: UncontrolledProps;
};

function isBlobSource(src: ImageZoomProps["src"]): src is Blob {
  return typeof Blob !== "undefined" && src instanceof Blob;
}

function getImageSrc(src: ImageZoomProps["src"]): ComponentProps<"img">["src"] {
  if (typeof src === "string") return src;

  if (isBlobSource(src)) return src;

  if (typeof src === "object") {
    // Next.js
    if ("default" in src)
      return (src as { default: { src: string } }).default.src;
    return src.src;
  }

  return "";
}

export function ImageZoom({
  zoomInProps,
  children,
  rmiz,
  ...props
}: ImageZoomProps) {
  const { src, ...imageProps } = props;

  return (
    <Zoom
      zoomMargin={20}
      wrapElement="span"
      {...rmiz}
      zoomImg={{
        src: getImageSrc(src),
        sizes: undefined,
        ...zoomInProps,
      }}
    >
      {children ?? (
        isBlobSource(src) ? (
          // Blob URLs cannot be passed to the framework image optimizer.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="rounded-lg border"
            {...imageProps}
            src={src}
            alt={imageProps.alt ?? ""}
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            className="rounded-lg border"
            {...imageProps}
            src={src}
          />
        )
      )}
    </Zoom>
  );
}
