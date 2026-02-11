import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "absubscriptions.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
    qualities: [60, 75],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
