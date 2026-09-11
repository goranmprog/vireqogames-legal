import type { Metadata } from "next";

import {
  buildPutalertShareOgImageUrl,
  buildPutalertSharePageUrl,
  getPutalertSiteBaseUrl,
} from "@/lib/putalert/config";
import {
  buildShareMetadataPaths,
  buildSharePageTitle,
  buildShareSocialDescription,
  buildShareSocialTitle,
  DEFAULT_SHARE_DESCRIPTION,
  DEFAULT_SHARE_TITLE,
} from "@/lib/putalert/sharePresentation";
import type { ReportShareSnapshot } from "@/lib/putalert/types";

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

function buildSharePreviewImage(reportId: string) {
  const url = buildPutalertShareOgImageUrl(reportId);

  return {
    url,
    secureUrl: url,
    alt: "PUTALERT — zajedno za sigurnije puteve",
    type: "image/png",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  };
}

export function createPutalertShareMetadata(
  reportId: string,
  snapshot: ReportShareSnapshot,
  now: Date = new Date(),
): Metadata {
  const socialTitle = buildShareSocialTitle(snapshot);
  const socialDescription = buildShareSocialDescription(snapshot, now);
  const pageTitle = buildSharePageTitle(snapshot);
  const { canonicalPath } = buildShareMetadataPaths(reportId);
  const url = buildPutalertSharePageUrl(reportId);
  const image = buildSharePreviewImage(reportId);

  return {
    title: pageTitle,
    description: socialDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      siteName: "PUTALERT",
      type: "website",
      locale: "bs_BA",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image.url],
    },
    metadataBase: new URL(getPutalertSiteBaseUrl()),
  };
}

export { DEFAULT_SHARE_DESCRIPTION as DEFAULT_DESCRIPTION, DEFAULT_SHARE_TITLE as DEFAULT_TITLE };
