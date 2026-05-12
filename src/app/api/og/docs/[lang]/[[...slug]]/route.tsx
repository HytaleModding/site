/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { source } from "@/lib/source";
import { NextRequest } from "next/server";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import { ogLanguageBlacklist } from "@/lib/i18n";

const promises: Promise<Buffer>[] = [];

// prettier-ignore
{
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-Thin.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-ThinItalic.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-ExtraLight.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-ExtraLightItalic.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-Light.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-LightItalic.otf")));
  promises.push(readFile(join(process.cwd(), "assets/geist/Geist-Regular.otf")));
  promises.push(readFile(join(process.cwd(), "assets/geist/Geist-RegularItalic.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-Medium.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-MediumItalic.otf")));
  promises.push(readFile(join(process.cwd(), "assets/geist/Geist-SemiBold.otf")));
  promises.push(readFile(join(process.cwd(), "assets/geist/Geist-SemiBoldItalic.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-Bold.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-BoldItalic.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-ExtraBold.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-ExtraBoldItalic.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-Black.otf")));
  // promises.push(readFile(join(process.cwd(), "assets/geist/Geist-BlackItalic.otf")));

  promises.push(readFile(join(process.cwd(), "public/branding/logo-light-348.png")));
  promises.push(readFile(join(process.cwd(), "public/assets/official-documentation/background/content-lower.png")));
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ lang: string; slug?: string[] }> },
) {
  const { lang, slug = [] } = await params;

  if (ogLanguageBlacklist.includes(lang)) {
    return notFound();
  }

  const page = source.getPage(slug, lang);

  if (!page) {
    return notFound();
  }

  const [
    // Thin,
    // ThinItalic,
    // ExtraLight,
    // ExtraLightItalic,
    // Light,
    // LightItalic,
    Regular,
    RegularItalic,
    // Medium,
    // MediumItalic,
    SemiBold,
    SemiBoldItalic,
    // Bold,
    // BoldItalic,
    // ExtraBold,
    // ExtraBoldItalic,
    // Black,
    // BlackItalic,

    logoImage,
    contentLowerImage,
  ] = await Promise.all(promises);

  const isOfficialDocumentation = slug.includes("official-documentation");
  const backgroundImage = isOfficialDocumentation
    ? `data:image/png;base64,${Buffer.from(contentLowerImage).toString("base64")}`
    : undefined;

  const containerStyle = {
    backgroundColor: isOfficialDocumentation ? "#162039" : "#0a0a0a",
    color: isOfficialDocumentation ? "#b7cedd" : "white",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "96px",
    position: "relative",
    overflow: "hidden",
  } as const;

  const titleStyle = isOfficialDocumentation
    ? {
        fontSize: 64,
        fontWeight: 600,
        color: "#0000",
        backgroundImage: "linear-gradient(#ffe98d, #e19f27)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
      }
    : {
        fontSize: 64,
        fontWeight: 600,
        color: "white",
      };

  const descriptionStyle = {
    fontSize: 40,
    fontWeight: 400,
    color: isOfficialDocumentation ? "#9eb2c0" : "lightgray",
  } as const;

  const footerStyle = {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    fontSize: 48,
    fontWeight: 600,
    color: isOfficialDocumentation ? "#ffffff" : "white",
    position: "relative",
    zIndex: 1,
  } as const;

  return new ImageResponse(
    <div
      style={containerStyle}
    >
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 1200,
            height: 630,
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transform: "scale(1.02)",
            zIndex: 0,
          }}
        />
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={titleStyle}
        >
          {page.data.title}
        </span>
        <span
          style={descriptionStyle}
        >
          {page.data.description}
        </span>
      </div>
      <div
        style={footerStyle}
      >
        <img
          src={`data:image/png;base64,${Buffer.from(logoImage).toString("base64")}`}
          alt="Logo"
          width={64}
          height={64}
        />
        <span>HytaleModding</span>
      </div>
    </div>,
    {
      fonts: [
        // { name: "Geist", data: Thin, weight: 100, style: "normal" },
        // { name: "Geist", data: ThinItalic, weight: 100, style: "italic" },
        // { name: "Geist", data: ExtraLight, weight: 200, style: "normal" },
        // { name: "Geist", data: ExtraLightItalic, weight: 200, style: "italic" },
        // { name: "Geist", data: Light, weight: 300, style: "normal" },
        // { name: "Geist", data: LightItalic, weight: 300, style: "italic" },
        { name: "Geist", data: Regular, weight: 400, style: "normal" },
        { name: "Geist", data: RegularItalic, weight: 400, style: "italic" },
        // { name: "Geist", data: Medium, weight: 500, style: "normal" },
        // { name: "Geist", data: MediumItalic, weight: 500, style: "italic" },
        { name: "Geist", data: SemiBold, weight: 600, style: "normal" },
        { name: "Geist", data: SemiBoldItalic, weight: 600, style: "italic" },
        // { name: "Geist", data: Bold, weight: 700, style: "normal" },
        // { name: "Geist", data: BoldItalic, weight: 700, style: "italic" },
        // { name: "Geist", data: ExtraBold, weight: 800, style: "normal" },
        // { name: "Geist", data: ExtraBoldItalic, weight: 800, style: "italic" },
        // { name: "Geist", data: Black, weight: 900, style: "normal" },
        // { name: "Geist", data: BlackItalic, weight: 900, style: "italic" },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
