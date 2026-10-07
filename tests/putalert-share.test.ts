import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { buildPutalertReportDeepLink } from "@/lib/putalert/deepLink";
import {
  buildPutalertShareOgImageUrl,
  getAndroidStoreUrl,
  getPutalertSiteBaseUrl,
} from "@/lib/putalert/config";
import { getCategoryIconKey } from "@/lib/putalert/categoryBadge";
import {
  buildShareOgCardContent,
  buildShareSocialDescription,
  buildShareSocialTitle,
  truncateForShare,
} from "@/lib/putalert/sharePresentation";
import { fetchReportShareSnapshot } from "@/lib/putalert/fetchReportShareSnapshot";
import { formatRelativeTimeBs } from "@/lib/putalert/formatRelativeTime";
import {
  formatEventLocation,
  getCategoryLabel,
  getRadarKindLabel,
} from "@/lib/putalert/labels";
import { createPutalertShareMetadata } from "@/lib/putalert/metadata";
import {
  createPutalertAnonClient,
  createPutalertServiceRoleClient,
} from "@/lib/putalert/supabaseServer";
import {
  isValidReportId,
  normalizeReportId,
} from "@/lib/putalert/validateReportId";

vi.mock("@/lib/putalert/supabaseServer", () => ({
  createPutalertAnonClient: vi.fn(),
  createPutalertServiceRoleClient: vi.fn(),
}));

const mockedCreateAnonClient = vi.mocked(createPutalertAnonClient);
const mockedCreateServiceClient = vi.mocked(createPutalertServiceRoleClient);

const VALID_REPORT_ID = "86739283-407c-4416-8aba-c0979306d9df";

function createQueryClient(result: { data: unknown; error?: unknown }) {
  return {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(async () => result),
        })),
      })),
    })),
  };
}

describe("validateReportId", () => {
  it("accepts valid UUIDs", () => {
    expect(isValidReportId(VALID_REPORT_ID)).toBe(true);
    expect(normalizeReportId(VALID_REPORT_ID)).toBe(VALID_REPORT_ID);
  });

  it("rejects invalid IDs", () => {
    expect(isValidReportId("not-a-uuid")).toBe(false);
    expect(normalizeReportId("123")).toBeNull();
    expect(normalizeReportId("")).toBeNull();
  });
});

describe("buildPutalertReportDeepLink", () => {
  it("builds a deep link only from validated UUIDs", () => {
    expect(buildPutalertReportDeepLink(VALID_REPORT_ID)).toBe(
      `patrolebih://report/${VALID_REPORT_ID}`,
    );
    expect(buildPutalertReportDeepLink("bad-id")).toBeNull();
  });
});

describe("labels", () => {
  it("maps category and radar kind labels", () => {
    expect(getCategoryLabel("traffic_control")).toBe("Kontrola saobraćaja");
    expect(getRadarKindLabel("stationary")).toBe("Stacionarni radar");
    expect(getRadarKindLabel("patrol")).toBe("Patrolni radar");
  });

  it("formats road and direction for display", () => {
    expect(
      formatEventLocation("Magistralni put M16", "Banja Luka"),
    ).toEqual({
      primary: "Magistralni put M16",
      secondary: "Banja Luka",
    });
  });
});

describe("formatRelativeTimeBs", () => {
  it("formats recent publish times in Bosnian", () => {
    const now = new Date("2026-09-10T12:00:00.000Z");

    expect(
      formatRelativeTimeBs("2026-09-10T11:48:00.000Z", now),
    ).toBe("Prije 12 min");
  });
});

describe("getAndroidStoreUrl", () => {
  const original = process.env.ANDROID_STORE_URL;

  afterEach(() => {
    process.env.ANDROID_STORE_URL = original;
  });

  it("returns null when the store URL is not configured", () => {
    delete process.env.ANDROID_STORE_URL;
    expect(getAndroidStoreUrl()).toBeNull();
  });

  it("returns the configured store URL", () => {
    process.env.ANDROID_STORE_URL =
      "https://play.google.com/store/apps/details?id=com.example.app";
    expect(getAndroidStoreUrl()).toBe(
      "https://play.google.com/store/apps/details?id=com.example.app",
    );
  });
});

function getFirstOpenGraphImageUrl(
  metadata: ReturnType<typeof createPutalertShareMetadata>,
): string | undefined {
  const images = metadata.openGraph?.images;

  if (!images) {
    return undefined;
  }

  const first = Array.isArray(images) ? images[0] : images;

  if (!first) {
    return undefined;
  }

  if (typeof first === "string") {
    return first;
  }

  if (first instanceof URL) {
    return first.toString();
  }

  const url = first.url;

  return url instanceof URL ? url.toString() : url;
}

describe("categoryBadge", () => {
  it("maps category slugs to icon keys", () => {
    expect(getCategoryIconKey("radar")).toBe("radar");
    expect(getCategoryIconKey("traffic_control")).toBe("traffic_control");
    expect(getCategoryIconKey(null)).toBe("other");
  });
});

describe("sharePresentation", () => {
  it("truncates long share text safely", () => {
    expect(truncateForShare("Patrolni radar — Jfjfjfnfnfnfnfnfnfn", 24)).toBe(
      "Patrolni radar — Jfjfjf…",
    );
  });

  it("builds social title and description for active reports", () => {
    const snapshot = {
      status: "active" as const,
      report: {
        id: VALID_REPORT_ID,
        categorySlug: "radar",
        categoryLabel: "Radar",
        roadName: "Jfjfjfnfnfnfn",
        direction: null,
        description: null,
        createdAt: "2026-09-10T07:48:00.000Z",
        radarKind: "patrol" as const,
        radarKindLabel: "Patrolni radar",
      },
    };

    expect(buildShareSocialTitle(snapshot)).toBe(
      "Patrolni radar — Jfjfjfnfnfnfn",
    );
    expect(
      buildShareSocialDescription(
        snapshot,
        new Date("2026-09-10T11:48:00.000Z"),
      ),
    ).toBe("Prije 4 sati · PUTALERT");
  });

  it("builds per-event OG card content", () => {
    const content = buildShareOgCardContent({
      status: "active",
      report: {
        id: VALID_REPORT_ID,
        categorySlug: "radar",
        categoryLabel: "Radar",
        roadName: "Jfjfjfnfnfnfn",
        direction: null,
        description: null,
        createdAt: "2026-09-10T07:48:00.000Z",
        radarKind: "patrol",
        radarKindLabel: "Patrolni radar",
      },
    });

    expect(content.headline).toBe("Patrolni radar");
    expect(content.categoryEmoji).toBe("📡");
    expect(content.isGeneric).toBe(false);
  });
});

describe("createPutalertShareMetadata", () => {
  const originalBaseUrl = process.env.PUTALERT_SITE_BASE_URL;
  const previewImageUrl = buildPutalertShareOgImageUrl(VALID_REPORT_ID);

  beforeEach(() => {
    process.env.PUTALERT_SITE_BASE_URL = "https://putalert.com";
  });

  afterEach(() => {
    process.env.PUTALERT_SITE_BASE_URL = originalBaseUrl;
  });

  it("uses default metadata with generic preview image for unavailable reports", () => {
    const metadata = createPutalertShareMetadata(VALID_REPORT_ID, {
      status: "not_found",
    });

    expect(metadata.title).toBe("PUTALERT — događaj u tvojoj blizini");
    expect(metadata.description).toBe(
      "Provjeri ovaj događaj u PUTALERT aplikaciji.",
    );
    expect(metadata.alternates?.canonical).toBe(`/r/${VALID_REPORT_ID}`);
    expect(metadata.openGraph?.url).toBe(
      `${getPutalertSiteBaseUrl()}/r/${VALID_REPORT_ID}`,
    );
    expect(getFirstOpenGraphImageUrl(metadata)).toBe(previewImageUrl);
    expect(metadata.twitter).toEqual(
      expect.objectContaining({
        card: "summary_large_image",
        images: [previewImageUrl],
      }),
    );
    expect(JSON.stringify(metadata)).not.toContain("service_role");
    expect(JSON.stringify(metadata)).not.toContain("supabase.co");
  });

  it("uses default metadata with generic preview image for invalid IDs", () => {
    const metadata = createPutalertShareMetadata("bad-id", {
      status: "invalid_id",
    });

    expect(metadata.title).toBe("PUTALERT — događaj u tvojoj blizini");
    expect(getFirstOpenGraphImageUrl(metadata)).toBe(
      buildPutalertShareOgImageUrl("bad-id"),
    );
    expect(metadata.twitter?.images).toEqual([
      buildPutalertShareOgImageUrl("bad-id"),
    ]);
  });

  it("builds richer metadata for active reports", () => {
    const metadata = createPutalertShareMetadata(
      VALID_REPORT_ID,
      {
        status: "active",
        report: {
          id: VALID_REPORT_ID,
          categorySlug: "radar",
          categoryLabel: "Radar",
          roadName: "Magistralni put M16",
          direction: "Banja Luka",
          description: "Opis",
          createdAt: "2026-09-10T07:48:00.000Z",
          radarKind: "patrol",
          radarKindLabel: "Patrolni radar",
        },
      },
      new Date("2026-09-10T11:48:00.000Z"),
    );

    expect(metadata.title).toBe(
      "PUTALERT — Patrolni radar — Magistralni put M16",
    );
    expect(metadata.description).toBe("Prije 4 sati · PUTALERT");
    expect(metadata.openGraph?.title).toBe(
      "Patrolni radar — Magistralni put M16",
    );
    expect(metadata.openGraph?.url).toBe(
      `${getPutalertSiteBaseUrl()}/r/${VALID_REPORT_ID}`,
    );
    expect(getFirstOpenGraphImageUrl(metadata)).toBe(previewImageUrl);
    expect(metadata.twitter).toEqual(
      expect.objectContaining({
        card: "summary_large_image",
        title: "Patrolni radar — Magistralni put M16",
        description: "Prije 4 sati · PUTALERT",
        images: [previewImageUrl],
      }),
    );

    const serialized = JSON.stringify(metadata);
    expect(serialized).not.toContain("author");
    expect(serialized).not.toContain("latitude");
    expect(serialized).not.toContain("longitude");
    expect(serialized).not.toContain("token=");
    expect(serialized).not.toContain("Opis");
    expect(serialized).not.toContain("user_id");
    expect(serialized).not.toContain("email");
  });

  it("keeps generic preview metadata for inactive reports without private data", () => {
    const metadata = createPutalertShareMetadata(VALID_REPORT_ID, {
      status: "inactive",
    });

    expect(metadata.title).toBe("PUTALERT — događaj u tvojoj blizini");
    expect(getFirstOpenGraphImageUrl(metadata)).toBe(previewImageUrl);
    expect(JSON.stringify(metadata)).not.toContain("user_id");
    expect(JSON.stringify(metadata)).not.toContain("email");
  });
});

describe("fetchReportShareSnapshot", () => {
  const originalUrl = process.env.PUTALERT_SUPABASE_URL;
  const originalAnon = process.env.PUTALERT_SUPABASE_ANON_KEY;
  const originalService = process.env.PUTALERT_SUPABASE_SERVICE_ROLE_KEY;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PUTALERT_SUPABASE_URL = "https://example.supabase.co";
    process.env.PUTALERT_SUPABASE_ANON_KEY = "anon-key";
    delete process.env.PUTALERT_SUPABASE_SERVICE_ROLE_KEY;
  });

  afterEach(() => {
    process.env.PUTALERT_SUPABASE_URL = originalUrl;
    process.env.PUTALERT_SUPABASE_ANON_KEY = originalAnon;
    process.env.PUTALERT_SUPABASE_SERVICE_ROLE_KEY = originalService;
  });

  it("returns invalid_id for malformed IDs", async () => {
    await expect(fetchReportShareSnapshot("bad-id")).resolves.toEqual({
      status: "invalid_id",
    });
  });

  it("returns not_configured when Supabase env is missing", async () => {
    delete process.env.PUTALERT_SUPABASE_URL;

    await expect(fetchReportShareSnapshot(VALID_REPORT_ID)).resolves.toEqual({
      status: "not_configured",
    });
  });

  it("returns active report data from anon-accessible rows", async () => {
    mockedCreateAnonClient.mockReturnValue(
      createQueryClient({
        data: {
          id: VALID_REPORT_ID,
          road_name: "Magistralni put M16",
          direction: "Banja Luka",
          description: "Opis događaja",
          created_at: "2026-09-10T11:48:00.000Z",
          expires_at: "2026-09-11T11:48:00.000Z",
          status: "ACTIVE",
          radar_kind: "stationary",
          report_categories: { slug: "radar" },
        },
      }) as never,
    );
    mockedCreateServiceClient.mockReturnValue(null);

    const result = await fetchReportShareSnapshot(VALID_REPORT_ID);

    expect(result).toEqual({
      status: "active",
      report: expect.objectContaining({
        id: VALID_REPORT_ID,
        categoryLabel: "Radar",
        radarKindLabel: "Stacionarni radar",
        roadName: "Magistralni put M16",
        direction: "Banja Luka",
        description: "Opis događaja",
      }),
    });
  });

  it("returns not_found when anon and service role cannot find a report", async () => {
    mockedCreateAnonClient.mockReturnValue(
      createQueryClient({ data: null }) as never,
    );
    mockedCreateServiceClient.mockReturnValue(null);

    await expect(fetchReportShareSnapshot(VALID_REPORT_ID)).resolves.toEqual({
      status: "not_found",
    });
  });

  it("returns inactive when service role finds a non-public report", async () => {
    mockedCreateAnonClient.mockReturnValue(
      createQueryClient({ data: null }) as never,
    );
    mockedCreateServiceClient.mockReturnValue(
      createQueryClient({
        data: {
          status: "EXPIRED",
          expires_at: "2026-09-09T11:48:00.000Z",
          radar_kind: "patrol",
        },
      }) as never,
    );

    await expect(fetchReportShareSnapshot(VALID_REPORT_ID)).resolves.toEqual({
      status: "inactive",
    });
  });
});
