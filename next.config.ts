import withPWA from "./src/lib/next-pwa-wrapper.cjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: { removeConsole: process.env.NODE_ENV !== "development" },
  reactStrictMode: true,
  images: { domains: ["img.clerk.com", "utfs.io"] },
  async redirects() {
    return [{ source: "/", destination: "/conversations", permanent: true }];
  },
};

const PWAWrapper = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

export default PWAWrapper(nextConfig);
