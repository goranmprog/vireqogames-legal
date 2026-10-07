import type { Metadata } from "next";

import {
  getPutalertSiteBaseUrl,
  PUTALERT_SHARE_OG_IMAGE_PATH,
} from "@/lib/putalert/config";
import {
  PUTALERT_HOME_DESCRIPTION,
  PUTALERT_HOME_TITLE,
} from "@/lib/putalert/homeContent";

export function createPutalertHomeMetadata(): Metadata {
  const baseUrl = getPutalertSiteBaseUrl();
  const pageUrl = `${baseUrl}/`;
  const ogImageUrl = `${baseUrl}${PUTALERT_SHARE_OG_IMAGE_PATH}`;

  return {
    metadataBase: new URL(baseUrl),
    title: PUTALERT_HOME_TITLE,
    description: PUTALERT_HOME_DESCRIPTION,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: PUTALERT_HOME_TITLE,
      description: PUTALERT_HOME_DESCRIPTION,
      url: pageUrl,
      siteName: "PUTALERT",
      type: "website",
      locale: "bs_BA",
      images: [
        {
          url: ogImageUrl,
          alt: "PUTALERT — zajedno za sigurnije puteve",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: PUTALERT_HOME_TITLE,
      description: PUTALERT_HOME_DESCRIPTION,
      images: [ogImageUrl],
    },
  };
}
