import {
  getCategoryLabel,
  getRadarKindLabel,
} from "@/lib/putalert/labels";
import { isPutalertSupabaseConfigured } from "@/lib/putalert/config";
import {
  createPutalertAnonClient,
  createPutalertServiceRoleClient,
} from "@/lib/putalert/supabaseServer";
import type {
  PublicReportShare,
  ReportShareSnapshot,
} from "@/lib/putalert/types";
import { normalizeReportId } from "@/lib/putalert/validateReportId";

type ReportCategoryRow = {
  slug: string | null;
};

type ReportRow = {
  id: string;
  road_name: string | null;
  direction: string | null;
  description: string | null;
  created_at: string;
  expires_at: string | null;
  status: string;
  radar_kind: string | null;
  report_categories: ReportCategoryRow | ReportCategoryRow[] | null;
};

type ReportStatusRow = {
  status: string;
  expires_at: string | null;
  radar_kind: string | null;
};

const REPORT_SELECT =
  "id, road_name, direction, description, created_at, expires_at, status, radar_kind, report_categories ( slug )";

const VALID_RADAR_KINDS = new Set(["patrol", "stationary"]);

function categoryFromRow(row: ReportRow): ReportCategoryRow | null {
  if (Array.isArray(row.report_categories)) {
    return row.report_categories[0] ?? null;
  }

  return row.report_categories;
}

function isPubliclyActiveReport(row: ReportStatusRow, now: Date): boolean {
  if (row.status !== "ACTIVE") {
    return false;
  }

  if (row.radar_kind === "stationary") {
    return row.expires_at === null;
  }

  if (!row.expires_at) {
    return false;
  }

  return new Date(row.expires_at).getTime() > now.getTime();
}

function mapPublicReport(row: ReportRow): PublicReportShare | null {
  const categorySlug = categoryFromRow(row)?.slug;

  if (!categorySlug) {
    return null;
  }

  const radarKind =
    row.radar_kind && VALID_RADAR_KINDS.has(row.radar_kind)
      ? (row.radar_kind as "patrol" | "stationary")
      : null;

  return {
    id: row.id,
    categorySlug,
    categoryLabel: getCategoryLabel(categorySlug),
    roadName: row.road_name,
    direction: row.direction,
    description: row.description,
    createdAt: row.created_at,
    radarKind,
    radarKindLabel: getRadarKindLabel(radarKind),
  };
}

async function fetchActiveReportViaAnon(
  reportId: string,
): Promise<PublicReportShare | null> {
  const supabase = createPutalertAnonClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("reports")
    .select(REPORT_SELECT)
    .eq("id", reportId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapPublicReport(data as ReportRow);
}

async function fetchReportStatusViaServiceRole(
  reportId: string,
): Promise<ReportStatusRow | null> {
  const supabase = createPutalertServiceRoleClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("reports")
    .select("status, expires_at, radar_kind")
    .eq("id", reportId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as ReportStatusRow;
}

export async function fetchReportShareSnapshot(
  rawReportId: string,
  now: Date = new Date(),
): Promise<ReportShareSnapshot> {
  const reportId = normalizeReportId(rawReportId);

  if (!reportId) {
    return { status: "invalid_id" };
  }

  if (!isPutalertSupabaseConfigured()) {
    return { status: "not_configured" };
  }

  try {
    const activeReport = await fetchActiveReportViaAnon(reportId);

    if (activeReport) {
      return { status: "active", report: activeReport };
    }

    const statusRow = await fetchReportStatusViaServiceRole(reportId);

    if (statusRow) {
      if (isPubliclyActiveReport(statusRow, now)) {
        const retryReport = await fetchActiveReportViaAnon(reportId);

        if (retryReport) {
          return { status: "active", report: retryReport };
        }
      }

      return { status: "inactive" };
    }

    return { status: "not_found" };
  } catch {
    return { status: "error" };
  }
}
