import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { PutalertHomePage } from "@/components/putalert/PutalertHomePage";
import { createPutalertHomeMetadata } from "@/lib/putalert/homeMetadata";
import {
  PUTALERT_HOME_DESCRIPTION,
  PUTALERT_HOME_TITLE,
} from "@/lib/putalert/homeContent";
import { putalertLegalPaths } from "@/lib/legal/constants";

describe("PutalertHomePage", () => {
  it("renders PUTALERT branding and Bosnian homepage copy", () => {
    const html = renderToStaticMarkup(
      <PutalertHomePage androidStoreUrl={null} />,
    );

    expect(html).toContain("PUT");
    expect(html).toContain("ALERT");
    expect(html).toContain("Zajedno za sigurnije puteve.");
    expect(html).toContain("Šta se dešava na putu?");
    expect(html).toContain("Kako radi PUTALERT?");
    expect(html).toContain("Ključne funkcije");
    expect(html).toContain("Podijeli događaj");
    expect(html).toContain('href="#how-it-works"');
    expect(html).toContain('href="#features"');
    expect(html).toContain("putalert-home-menu-toggle");
    expect(html).toContain('id="putalert-home-mobile-nav"');
    expect(html).toContain('aria-controls="putalert-home-mobile-nav"');
    expect(html).toContain("putalert-home-asset-slot feature-image-slot");
    expect(html).toContain("/putalert/putalert-app-map-feature.png");
    expect(html).toContain(
      "PATROLE BIH aplikacija – mapa događaja i graničnih prelaza",
    );
    expect(html).toContain("/putalert/putalert-share-page.png");
    expect(html).not.toContain("VireqoGames");
    expect(html).not.toContain("Mobile application by VireqoGames");
    expect(html).not.toContain(">Legal<");
    expect(html).not.toContain(">Home<");
  });

  it("links to privacy, terms, and delete-account pages", () => {
    const html = renderToStaticMarkup(
      <PutalertHomePage androidStoreUrl={null} />,
    );

    expect(html).toContain(`href="${putalertLegalPaths.privacy}"`);
    expect(html).toContain(`href="${putalertLegalPaths.terms}"`);
    expect(html).toContain(`href="${putalertLegalPaths.deleteAccount}"`);
    expect(html).toContain("Politika privatnosti");
    expect(html).toContain("Uslovi korištenja");
    expect(html).toContain("Brisanje računa");
  });

  it("shows disabled Play placeholder when store URL is missing", () => {
    const html = renderToStaticMarkup(
      <PutalertHomePage androidStoreUrl={null} />,
    );

    expect(html).toContain("Uskoro na Google Playu");
    expect(html).toContain("putalert-home-button-disabled");
    expect(html).not.toContain('target="_blank"');
  });

  it("uses Google Play URL when configured", () => {
    const html = renderToStaticMarkup(
      <PutalertHomePage
        androidStoreUrl="https://play.google.com/store/apps/details?id=example"
      />,
    );

    expect(html).toContain("Preuzmi PUTALERT");
    expect(html).toContain(
      'href="https://play.google.com/store/apps/details?id=example"',
    );
    expect(html).toContain('target="_blank"');
  });

  it("shows share URL pattern without a fake report id", () => {
    const html = renderToStaticMarkup(
      <PutalertHomePage androidStoreUrl={null} />,
    );

    expect(html).toContain("https://putalert.com/r/{id}");
    expect(html).not.toMatch(/\/r\/[0-9a-f-]{36}/i);
  });
});

describe("createPutalertHomeMetadata", () => {
  const originalBaseUrl = process.env.PUTALERT_SITE_BASE_URL;

  afterEach(() => {
    process.env.PUTALERT_SITE_BASE_URL = originalBaseUrl;
  });

  it("sets production-oriented title, description, canonical, and OG", () => {
    process.env.PUTALERT_SITE_BASE_URL = "https://putalert.com";

    const metadata = createPutalertHomeMetadata();

    expect(metadata.title).toBe(PUTALERT_HOME_TITLE);
    expect(metadata.description).toBe(PUTALERT_HOME_DESCRIPTION);
    expect(metadata.description).not.toContain("VireqoGames");
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.metadataBase?.toString()).toBe("https://putalert.com/");
    expect(metadata.openGraph?.url).toBe("https://putalert.com/");
    expect(metadata.openGraph?.siteName).toBe("PUTALERT");
    expect(metadata.openGraph?.locale).toBe("bs_BA");
    expect(metadata.twitter).toEqual(
      expect.objectContaining({
        card: "summary_large_image",
      }),
    );
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "https://putalert.com/putalert/putalert-road-background.png",
        alt: "PUTALERT — zajedno za sigurnije puteve",
      },
    ]);
  });
});
