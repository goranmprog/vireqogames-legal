import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { PutalertTermsContent } from "@/lib/legal/content/putalert/terms";
import { PUTALERT_EFFECTIVE_DATE } from "@/lib/legal/content/putalert/content-checks";
import { putalertLegalPaths } from "@/lib/legal/constants";
import { getApp, requireLegalDocument } from "@/lib/legal/apps";
import { createSiteMetadata } from "@/lib/metadata";

const app = getApp("putalert");
const document = requireLegalDocument("putalert", "terms");

export const metadata: Metadata = createSiteMetadata({
  title: "PUTALERT – Uslovi korištenja",
  description: "Uslovi korištenja aplikacije PUTALERT.",
  path: document.path,
  exactTitle: true,
});

export default function PutalertTermsPage() {
  return (
    <LegalDocumentPage
      appName={app.name}
      title="Uslovi korištenja"
      effectiveDate={PUTALERT_EFFECTIVE_DATE}
      backHref="/"
      backLabel="PUTALERT"
      relatedLinks={[
        {
          href: putalertLegalPaths.privacy,
          label: "Politika privatnosti",
        },
        {
          href: putalertLegalPaths.deleteAccount,
          label: "Brisanje računa",
        },
      ]}
    >
      <PutalertTermsContent />
    </LegalDocumentPage>
  );
}
