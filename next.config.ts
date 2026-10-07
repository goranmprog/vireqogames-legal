import type { NextConfig } from "next";

import { putalertLegacyRedirects } from "./lib/putalert/legacyRedirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return putalertLegacyRedirects;
  },
  async headers() {
    return [
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/json; charset=utf-8",
          },
        ],
      },
      {
        source: "/r/:id/opengraph-image",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
