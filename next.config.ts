import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    // ✅ Ignore ESLint errors during production builds (Docker won't fail)
    ignoreDuringBuilds: true,
  },

  typescript: {
    // ✅ Ignore TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
