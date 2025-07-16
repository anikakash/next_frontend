import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "balanced-luck-2608809e66.media.strapiapp.com",
        port: "",
      }
    ],
  },
};

export default nextConfig;
