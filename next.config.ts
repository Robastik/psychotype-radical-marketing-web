import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to support server-side rendering
  // This enables proper routing on Firebase Hosting
};

export default nextConfig;
