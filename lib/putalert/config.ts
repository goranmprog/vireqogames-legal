const DEFAULT_SITE_BASE_URL = "https://putalert.com";

export const PUTALERT_SHARE_OG_IMAGE_PATH =
  "/putalert/putalert-road-background.png";

export const PUTALERT_DEEP_LINK_SCHEME = "patrolebih";

export function getPutalertSiteBaseUrl(): string {
  const configured = process.env.PUTALERT_SITE_BASE_URL?.trim();

  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/+$/, "")}`;
  }

  return DEFAULT_SITE_BASE_URL;
}

export function getPutalertSupabaseUrl(): string | null {
  const value = process.env.PUTALERT_SUPABASE_URL?.trim();
  return value ? value : null;
}

export function getPutalertSupabaseAnonKey(): string | null {
  const value = process.env.PUTALERT_SUPABASE_ANON_KEY?.trim();
  return value ? value : null;
}

export function getPutalertSupabaseServiceRoleKey(): string | null {
  const value = process.env.PUTALERT_SUPABASE_SERVICE_ROLE_KEY?.trim();
  return value ? value : null;
}

export function isPutalertSupabaseConfigured(): boolean {
  return Boolean(getPutalertSupabaseUrl() && getPutalertSupabaseAnonKey());
}

export function getAndroidStoreUrl(): string | null {
  const value = process.env.ANDROID_STORE_URL?.trim();
  return value ? value : null;
}

export function buildPutalertSharePagePath(reportId: string): string {
  return `/r/${reportId}`;
}

export function buildPutalertSharePageUrl(reportId: string): string {
  return `${getPutalertSiteBaseUrl()}${buildPutalertSharePagePath(reportId)}`;
}

export function buildPutalertShareOgImagePath(reportId: string): string {
  return `${buildPutalertSharePagePath(reportId)}/opengraph-image`;
}

export function buildPutalertShareOgImageUrl(reportId: string): string {
  return `${getPutalertSiteBaseUrl()}${buildPutalertShareOgImagePath(reportId)}`;
}

export function getPutalertShareFallbackOgImageUrl(): string {
  return `${getPutalertSiteBaseUrl()}${PUTALERT_SHARE_OG_IMAGE_PATH}`;
}
