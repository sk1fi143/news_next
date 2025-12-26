import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 64, 128],
  },

  experimental: {
    optimizePackageImports: ["lodash", "date-fns", "react-icons"],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  poweredByHeader: false,

  productionBrowserSourceMaps: false,
};

export default nextConfig;
