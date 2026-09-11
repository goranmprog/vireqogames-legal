import {
  buildPutalertShareOgImagePath,
  buildPutalertSharePagePath,
} from "@/lib/putalert/config";
import { getCategoryIconKey } from "@/lib/putalert/categoryBadge";
import { formatRelativeTimeBs } from "@/lib/putalert/formatRelativeTime";
import { formatEventLocation } from "@/lib/putalert/labels";
import type { ReportShareSnapshot } from "@/lib/putalert/types";

export const DEFAULT_SHARE_TITLE = "PUTALERT — događaj u tvojoj blizini";
export const DEFAULT_SHARE_DESCRIPTION =
  "Provjeri ovaj događaj u PUTALERT aplikaciji.";
export const DEFAULT_SHARE_TAGLINE = "Zajedno za sigurnije puteve";

const CATEGORY_EMOJI: Record<string, string> = {
  traffic_control: "🛡️",
  accident: "⚠️",
  road_work: "🚧",
  traffic: "🚗",
  road_hazard: "⚡",
  weather: "🌧️",
  radar: "📡",
  other: "ℹ️",
};

const CATEGORY_ACCENT: Record<string, string> = {
  traffic_control: "#DC2626",
  accident: "#EA580C",
  road_work: "#D97706",
  traffic: "#F97316",
  road_hazard: "#EAB308",
  weather: "#2563EB",
  radar: "#6366F1",
  other: "#64748B",
};

export type ShareOgCardContent = {
  brand: string;
  categoryEmoji: string;
  categoryLabel: string;
  categoryAccent: string;
  headline: string;
  locationLine: string | null;
  freshnessLine: string;
  tagline: string;
  isGeneric: boolean;
};

export function truncateForShare(
  value: string,
  maxLength: number,
): string {
  const trimmed = value.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function getActiveHeadline(snapshot: Extract<ReportShareSnapshot, { status: "active" }>) {
  return snapshot.report.radarKindLabel ?? snapshot.report.categoryLabel;
}

export function buildShareSocialTitle(snapshot: ReportShareSnapshot): string {
  if (snapshot.status !== "active") {
    return DEFAULT_SHARE_TITLE;
  }

  const location = formatEventLocation(
    snapshot.report.roadName,
    snapshot.report.direction,
  );
  const headline = getActiveHeadline(snapshot);

  return `${headline} — ${truncateForShare(location.primary, 72)}`;
}

export function buildShareSocialDescription(
  snapshot: ReportShareSnapshot,
  now: Date = new Date(),
): string {
  if (snapshot.status !== "active") {
    return DEFAULT_SHARE_DESCRIPTION;
  }

  const freshness = formatRelativeTimeBs(snapshot.report.createdAt, now);

  return `${freshness} · PUTALERT`;
}

export function buildSharePageTitle(snapshot: ReportShareSnapshot): string {
  if (snapshot.status !== "active") {
    return DEFAULT_SHARE_TITLE;
  }

  return `PUTALERT — ${buildShareSocialTitle(snapshot)}`;
}

export function buildShareOgCardContent(
  snapshot: ReportShareSnapshot,
  now: Date = new Date(),
): ShareOgCardContent {
  if (snapshot.status !== "active") {
    return {
      brand: "PUTALERT",
      categoryEmoji: "📍",
      categoryLabel: "PUTALERT",
      categoryAccent: "#2563EB",
      headline: DEFAULT_SHARE_TITLE.replace("PUTALERT — ", ""),
      locationLine: null,
      freshnessLine: DEFAULT_SHARE_DESCRIPTION,
      tagline: DEFAULT_SHARE_TAGLINE,
      isGeneric: true,
    };
  }

  const { report } = snapshot;
  const location = formatEventLocation(report.roadName, report.direction);
  const iconKey = getCategoryIconKey(report.categorySlug);
  const headline = getActiveHeadline(snapshot);
  const locationLine =
    location.secondary && location.secondary !== location.primary
      ? truncateForShare(
          `${location.primary} · ${location.secondary}`,
          88,
        )
      : truncateForShare(location.primary, 88);

  return {
    brand: "PUTALERT",
    categoryEmoji: CATEGORY_EMOJI[iconKey] ?? CATEGORY_EMOJI.other,
    categoryLabel: report.categoryLabel,
    categoryAccent: CATEGORY_ACCENT[iconKey] ?? CATEGORY_ACCENT.other,
    headline: truncateForShare(headline, 64),
    locationLine:
      headline !== location.primary ? locationLine : location.secondary
        ? truncateForShare(location.secondary, 72)
        : null,
    freshnessLine: formatRelativeTimeBs(report.createdAt, now),
    tagline: DEFAULT_SHARE_TAGLINE,
    isGeneric: false,
  };
}

export function buildShareMetadataPaths(reportId: string) {
  return {
    canonicalPath: buildPutalertSharePagePath(reportId),
    ogImagePath: buildPutalertShareOgImagePath(reportId),
  };
}
