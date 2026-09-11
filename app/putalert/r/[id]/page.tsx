import type { Metadata } from "next";

import { ReportShareView } from "@/components/putalert/ReportShareView";
import { fetchReportShareSnapshot } from "@/lib/putalert/fetchReportShareSnapshot";
import {
  createPutalertShareMetadata,
} from "@/lib/putalert/metadata";
import { normalizeReportId } from "@/lib/putalert/validateReportId";

interface ReportSharePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ReportSharePageProps): Promise<Metadata> {
  const { id } = await params;
  const reportId = normalizeReportId(id);

  if (!reportId) {
    return createPutalertShareMetadata(id, { status: "invalid_id" });
  }

  const snapshot = await fetchReportShareSnapshot(reportId);
  return createPutalertShareMetadata(reportId, snapshot);
}

export default async function PutalertReportSharePage({
  params,
}: ReportSharePageProps) {
  const { id } = await params;
  const reportId = normalizeReportId(id) ?? id;
  const snapshot = reportId
    ? await fetchReportShareSnapshot(reportId)
    : { status: "invalid_id" as const };

  return <ReportShareView reportId={reportId} snapshot={snapshot} />;
}
