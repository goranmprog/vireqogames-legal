import { afterEach, describe, expect, it } from "vitest";

import { getApp, requireLegalDocument } from "@/lib/legal/apps";
import { putalertLegalPaths } from "@/lib/legal/constants";
import {
  buildPutalertShareOgImagePath,
  buildPutalertShareOgImageUrl,
  buildPutalertSharePagePath,
  buildPutalertSharePageUrl,
  getPutalertSiteBaseUrl,
} from "@/lib/putalert/config";
import { putalertLegacyRedirects } from "@/lib/putalert/legacyRedirects";

const VALID_REPORT_ID = "86739283-407c-4416-8aba-c0979306d9df";

describe("PUTALERT public routes", () => {
  it("exposes root legal paths without /putalert prefix", () => {
    expect(putalertLegalPaths).toEqual({
      privacy: "/privacy",
      terms: "/terms",
      deleteAccount: "/delete-account",
    });
  });

  it("maps PUTALERT legal documents to the new routes", () => {
    const app = getApp("putalert");

    expect(requireLegalDocument("putalert", "privacy").path).toBe("/privacy");
    expect(requireLegalDocument("putalert", "terms").path).toBe("/terms");
    expect(requireLegalDocument("putalert", "delete-account").path).toBe(
      "/delete-account",
    );
    expect(app.legalDocuments.map((doc) => doc.path)).toEqual([
      "/privacy",
      "/terms",
      "/delete-account",
    ]);
  });

  it("builds share and OG paths on /r/{id}", () => {
    expect(buildPutalertSharePagePath(VALID_REPORT_ID)).toBe(
      `/r/${VALID_REPORT_ID}`,
    );
    expect(buildPutalertShareOgImagePath(VALID_REPORT_ID)).toBe(
      `/r/${VALID_REPORT_ID}/opengraph-image`,
    );
  });
});

describe("PUTALERT site base URL", () => {
  const originalBaseUrl = process.env.PUTALERT_SITE_BASE_URL;

  afterEach(() => {
    process.env.PUTALERT_SITE_BASE_URL = originalBaseUrl;
  });

  it("defaults to https://putalert.com when env is unset", () => {
    delete process.env.PUTALERT_SITE_BASE_URL;
    delete process.env.VERCEL_URL;

    expect(getPutalertSiteBaseUrl()).toBe("https://putalert.com");
    expect(buildPutalertSharePageUrl(VALID_REPORT_ID)).toBe(
      `https://putalert.com/r/${VALID_REPORT_ID}`,
    );
    expect(buildPutalertShareOgImageUrl(VALID_REPORT_ID)).toBe(
      `https://putalert.com/r/${VALID_REPORT_ID}/opengraph-image`,
    );
  });
});

describe("PUTALERT legacy redirects", () => {
  it("permanently redirects old /putalert routes to the new structure", () => {
    expect(putalertLegacyRedirects).toEqual([
      {
        source: "/putalert",
        destination: "/",
        permanent: true,
      },
      {
        source: "/putalert/privacy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/putalert/terms",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/putalert/delete-account",
        destination: "/delete-account",
        permanent: true,
      },
      {
        source: "/putalert/r/:id",
        destination: "/r/:id",
        permanent: true,
      },
      {
        source: "/putalert/r/:id/opengraph-image",
        destination: "/r/:id/opengraph-image",
        permanent: true,
      },
    ]);
  });
});
