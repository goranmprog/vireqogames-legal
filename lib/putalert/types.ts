export type PublicReportShare = {
  id: string;
  categorySlug: string;
  categoryLabel: string;
  roadName: string | null;
  direction: string | null;
  description: string | null;
  createdAt: string;
  radarKind: "patrol" | "stationary" | null;
  radarKindLabel: string | null;
};

export type ReportShareSnapshot =
  | { status: "active"; report: PublicReportShare }
  | { status: "inactive" }
  | { status: "not_found" }
  | { status: "invalid_id" }
  | { status: "not_configured" }
  | { status: "error" };
