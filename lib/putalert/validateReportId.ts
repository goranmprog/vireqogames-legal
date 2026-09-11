const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidReportId(value: string): boolean {
  return UUID_PATTERN.test(value.trim());
}

export function normalizeReportId(value: string): string | null {
  const trimmed = value.trim().toLowerCase();

  if (!isValidReportId(trimmed)) {
    return null;
  }

  return trimmed;
}
