import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
    ],
    domains: ["images.unsplash.com", "placehold.co"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
