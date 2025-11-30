import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/drakon-guide',
        destination: 'https://docs.google.com/document/d/10BTtTlM0KlK18l-hLkU6-eRiWUTFljcvnaqF593cX8E/edit?tab=t.0',
        permanent: false,
      },
      {
        source: '/drakon-guide/:path*',
        destination: 'https://docs.google.com/document/d/10BTtTlM0KlK18l-hLkU6-eRiWUTFljcvnaqF593cX8E/edit?tab=t.0',
        permanent: false,
      },
      {
        source: '/drakon-doc',
        destination: 'https://docs.google.com/document/d/10BTtTlM0KlK18l-hLkU6-eRiWUTFljcvnaqF593cX8E/edit?tab=t.0',
        permanent: false,
      },
      {
        source: '/drakon-doc/:path*',
        destination: 'https://docs.google.com/document/d/10BTtTlM0KlK18l-hLkU6-eRiWUTFljcvnaqF593cX8E/edit?tab=t.0',
        permanent: false,
      },
    ]
  },
};

export default withMDX(config);