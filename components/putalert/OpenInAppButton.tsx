"use client";

import { ShareChevronIcon, SharePhoneIcon } from "@/components/putalert/ShareIcons";
import { buildPutalertReportDeepLink } from "@/lib/putalert/deepLink";

interface OpenInAppButtonProps {
  reportId: string;
}

export function OpenInAppButton({ reportId }: OpenInAppButtonProps) {
  const deepLink = buildPutalertReportDeepLink(reportId);

  if (!deepLink) {
    return null;
  }

  return (
    <button
      type="button"
      className="button putalert-share-button putalert-share-button-primary"
      onClick={() => {
        window.location.href = deepLink;
      }}
    >
      <SharePhoneIcon className="putalert-share-button-icon" />
      <span>Otvori u PUTALERT aplikaciji</span>
      <ShareChevronIcon className="putalert-share-button-chevron" />
    </button>
  );
}
