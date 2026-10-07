import type { MetadataRoute } from "next";

import { getPutalertSiteBaseUrl } from "@/lib/putalert/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getPutalertSiteBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
