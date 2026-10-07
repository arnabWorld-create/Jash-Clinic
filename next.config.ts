import type { NextConfig } from "next";
// English is served unprefixed (/about), Gujarati lives at /gu/about. Internally English maps to /en/*.
const config: NextConfig = {
  async redirects() { return [{ source: "/en", destination: "/", permanent: true }, { source: "/en/:path*", destination: "/:path*", permanent: true }]; },
  async rewrites() {
    return { beforeFiles: [
      { source: "/", destination: "/en" },
      { source: "/:path((?!gu(?:/|$)|en(?:/|$)|_next|api)(?!.*\\.).*)", destination: "/en/:path" },
    ] };
  },
  images: { formats: ["image/avif", "image/webp"] },
};
export default config;
