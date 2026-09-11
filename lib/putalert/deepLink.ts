import { PUTALERT_DEEP_LINK_SCHEME } from "@/lib/putalert/config";
import { normalizeReportId } from "@/lib/putalert/validateReportId";

export function buildPutalertReportDeepLink(reportId: string): string | null {
  const normalized = normalizeReportId(reportId);

  if (!normalized) {
    return null;
  }

  return `${PUTALERT_DEEP_LINK_SCHEME}://report/${normalized}`;
}
