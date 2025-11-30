import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/docs/:path*",
        destination: "/en/docs/:path*",
        locale: false,
      },
      {
        source: "/docs",
        destination: "/en/docs",
        locale: false,
      },
      {
        source: "/",
        destination: "/en",
        locale: false,
      },
    ];
  },
};

export default withMDX(config);
