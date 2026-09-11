export const REPORT_CATEGORY_SLUGS = [
  "traffic_control",
  "accident",
  "road_work",
  "traffic",
  "road_hazard",
  "weather",
  "radar",
  "other",
] as const;

export type ReportCategorySlug = (typeof REPORT_CATEGORY_SLUGS)[number];

export type CategoryIconKey = ReportCategorySlug;

export function getCategoryBadgeModifier(
  categorySlug: string | null | undefined,
): string {
  if (!categorySlug) {
    return "default";
  }

  const normalized = categorySlug.replace(/[^a-z0-9_-]/gi, "");

  if (
    REPORT_CATEGORY_SLUGS.includes(normalized as ReportCategorySlug)
  ) {
    return normalized;
  }

  return "default";
}

export function getCategoryIconKey(
  categorySlug: string | null | undefined,
): CategoryIconKey {
  const modifier = getCategoryBadgeModifier(categorySlug);

  if (modifier === "default") {
    return "other";
  }

  return modifier as CategoryIconKey;
}
