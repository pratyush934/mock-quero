import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["assets.aceternity.com", "images.unsplash.com"], // Correctly add the domain without "https://"
  },
  // experimental: {
  //   middlewarePrefetch: "flexible", // Enable middleware prefetching (optional)
  // },
};

export default nextConfig;