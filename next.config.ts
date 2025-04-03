import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["assets.aceternity.com", "images.unsplash.com", "img.clerk.com"], // Correctly add the domain without "https://"
  },
  // experimental: {
  //   middlewarePrefetch: "flexible", // Enable middleware prefetching (optional)
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
