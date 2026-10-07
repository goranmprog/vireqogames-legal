import type { MetadataRoute } from "next";

import { getPutalertSiteBaseUrl } from "@/lib/putalert/config";
import { putalertLegalPaths } from "@/lib/legal/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getPutalertSiteBaseUrl();
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}${putalertLegalPaths.privacy}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${putalertLegalPaths.terms}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${putalertLegalPaths.deleteAccount}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
