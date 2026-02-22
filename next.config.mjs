import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "opencollective.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "cdn.internal.hytalemodding.dev",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/docs/:path*",
        destination: "/en/docs/:path*",
        permanent: false,
      },
      {
        source:
          "/:lang/docs/official-documentation/worldgen/worldgen-tutorial/world-generation-concepts-1",
        destination:
          "/:lang/docs/official-documentation/worldgen/worldgen-tutorial/materials-generation-concepts",
        permanent: true,
      },
      {
        source:
          "/:lang/docs/official-documentation/worldgen/worldgen-tutorial/world-generation-concepts-2",
        destination:
          "/:lang/docs/official-documentation/worldgen/worldgen-tutorial/prop-generation-concepts",
        permanent: true,
      },
      {
        source:
          "/:lang/docs/official-documentation/worldgen/worldgen-tutorial/world-generation-concepts",
        destination:
          "/:lang/docs/official-documentation/worldgen/worldgen-tutorial/density-generation-concepts",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/en/docs",
        permanent: false,
      },
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/drakon-guide/:path*",
        destination:
          "https://docs.google.com/document/d/10BTtTlM0KlK18l-hLkU6-eRiWUTFljcvnaqF593cX8E/edit?tab=t.0",
        permanent: true,
      },
      {
        source: "/drakon-doc/:path*",
        destination:
          "https://docs.google.com/document/d/10BTtTlM0KlK18l-hLkU6-eRiWUTFljcvnaqF593cX8E/edit?tab=t.0",
        permanent: true,
      },
      {
        source: "/en/docs/guides/ecs/hytale-ecs",
        destination: "/en/docs/guides/ecs/hytale-ecs-theory",
        permanent: true,
      },
    ];
  },
  experimental: {
    viewTransition: true,
  },
  cacheComponents: false, // TODO: Improve caching strategy
};

export default withMDX(config);
