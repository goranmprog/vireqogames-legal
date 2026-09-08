import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { PutalertPrivacyContent } from "@/lib/legal/content/putalert/privacy";
import { PUTALERT_EFFECTIVE_DATE } from "@/lib/legal/content/putalert/content-checks";
import { putalertLegalPaths } from "@/lib/legal/constants";
import { getApp, requireLegalDocument } from "@/lib/legal/apps";
import { createSiteMetadata } from "@/lib/metadata";

const app = getApp("putalert");
const document = requireLegalDocument("putalert", "privacy");

export const metadata: Metadata = createSiteMetadata({
  title: "PUTALERT – Politika privatnosti",
  description: "Politika privatnosti aplikacije PUTALERT.",
  path: document.path,
  exactTitle: true,
});

export default function PutalertPrivacyPage() {
  return (
    <LegalDocumentPage
      appName={app.name}
      title="Politika privatnosti"
      effectiveDate={PUTALERT_EFFECTIVE_DATE}
      backHref="/putalert"
      backLabel="PUTALERT"
      relatedLinks={[
        {
          href: putalertLegalPaths.deleteAccount,
          label: "Brisanje računa",
        },
      ]}
    >
      <PutalertPrivacyContent />
    </LegalDocumentPage>
  );
}
