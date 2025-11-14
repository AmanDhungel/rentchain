import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me", "images.unsplash.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
