import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "https://st2.depositphotos.com",
      "st2.depositphotos.com",
      // ... add more domains as needed
    ],
  },
};

export default nextConfig;
