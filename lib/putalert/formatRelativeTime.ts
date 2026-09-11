const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

export function formatRelativeTimeBs(
  createdAtIso: string,
  now: Date = new Date(),
): string {
  const createdAt = new Date(createdAtIso);

  if (Number.isNaN(createdAt.getTime())) {
    return "Datum nije dostupan";
  }

  const diffMs = Math.max(0, now.getTime() - createdAt.getTime());

  if (diffMs < MINUTE_MS) {
    return "Upravo objavljeno";
  }

  const minutes = Math.floor(diffMs / MINUTE_MS);

  if (minutes < 60) {
    return `Prije ${minutes} min`;
  }

  const hours = Math.floor(diffMs / HOUR_MS);

  if (hours < 24) {
    return hours === 1 ? "Prije 1 sat" : `Prije ${hours} sati`;
  }

  const days = Math.floor(diffMs / DAY_MS);
  return days === 1 ? "Prije 1 dan" : `Prije ${days} dana`;
}

export function formatPublishedAtBs(createdAtIso: string): string {
  const createdAt = new Date(createdAtIso);

  if (Number.isNaN(createdAt.getTime())) {
    return "Datum nije dostupan";
  }

  return new Intl.DateTimeFormat("bs-BA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(createdAt);
}
