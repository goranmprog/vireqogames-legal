const CATEGORY_LABELS: Record<string, string> = {
  traffic_control: "Kontrola saobraćaja",
  accident: "Nezgoda",
  road_work: "Radovi na cesti",
  traffic: "Gužva",
  road_hazard: "Opasnost na cesti",
  weather: "Vrijeme",
  radar: "Radar",
  other: "Ostalo",
};

const RADAR_KIND_LABELS: Record<string, string> = {
  patrol: "Patrolni radar",
  stationary: "Stacionarni radar",
};

export function getCategoryLabel(categorySlug: string | null | undefined): string {
  if (!categorySlug) {
    return "Događaj";
  }

  return CATEGORY_LABELS[categorySlug] ?? "Događaj";
}

export function getRadarKindLabel(
  radarKind: string | null | undefined,
): string | null {
  if (!radarKind) {
    return null;
  }

  return RADAR_KIND_LABELS[radarKind] ?? null;
}

export function formatEventLocation(
  roadName: string | null | undefined,
  direction: string | null | undefined,
): { primary: string; secondary: string | null } {
  const primary = roadName?.trim() || null;
  const secondary = direction?.trim() || null;

  if (primary && secondary && primary !== secondary) {
    return { primary, secondary };
  }

  if (primary) {
    return { primary, secondary: null };
  }

  if (secondary) {
    return { primary: secondary, secondary: null };
  }

  return { primary: "Lokacija nije navedena", secondary: null };
}
