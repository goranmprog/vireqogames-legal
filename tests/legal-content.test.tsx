import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { legalConstants, putalertLegalPaths } from "@/lib/legal/constants";
import {
  putalertDeleteAccountRequiredPhrases,
  putalertPrivacyRequiredPhrases,
  putalertTermsRequiredPhrases,
} from "@/lib/legal/content/putalert/content-checks";
import { PutalertPrivacyContent } from "@/lib/legal/content/putalert/privacy";
import { PutalertTermsContent } from "@/lib/legal/content/putalert/terms";
import {
  buildDeleteAccountMailtoUrl,
  isAccountDeletionWebFormEnabled,
  validateDeleteAccountRequest,
} from "@/lib/legal/delete-account-request";

describe("legal constants", () => {
  it("exposes operator and contact values", () => {
    expect(legalConstants.operatorName).toBe("Goran Malbašić");
    expect(legalConstants.operatorType).toBe("fizičko lice");
    expect(legalConstants.country).toBe("Bosna i Hercegovina");
    expect(legalConstants.putalertEmail).toBe("putalert.app@gmail.com");
    expect(legalConstants.vireqoGamesEmail).toBe("vireqogames@gmail.com");
    expect(legalConstants.minimumAge).toBe(16);
  });
});

describe("PUTALERT privacy policy content", () => {
  const html = renderToStaticMarkup(<PutalertPrivacyContent />);

  it("includes required legal phrases", () => {
    for (const phrase of putalertPrivacyRequiredPhrases) {
      expect(html).toContain(phrase);
    }
  });

  it("links to delete account page", () => {
    expect(html).toContain(`href="${putalertLegalPaths.deleteAccount}"`);
    expect(html).toContain("Brisanje PUTALERT računa");
  });
});

describe("PUTALERT terms content", () => {
  const html = renderToStaticMarkup(<PutalertTermsContent />);

  it("includes required legal phrases", () => {
    for (const phrase of putalertTermsRequiredPhrases) {
      expect(html).toContain(phrase);
    }
  });

  it("links to privacy page", () => {
    expect(html).toContain(`href="${putalertLegalPaths.privacy}"`);
    expect(html).toContain("Politikom privatnosti");
  });
});

describe("delete account request validation", () => {
  it("rejects empty email", () => {
    const result = validateDeleteAccountRequest({
      email: "",
      confirmed: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it("rejects invalid email", () => {
    const result = validateDeleteAccountRequest({
      email: "not-an-email",
      confirmed: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it("requires confirmation checkbox", () => {
    const result = validateDeleteAccountRequest({
      email: "user@example.com",
      confirmed: false,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.confirmed).toBeTruthy();
  });

  it("accepts valid request input", () => {
    const result = validateDeleteAccountRequest({
      email: "user@example.com",
      confirmed: true,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe("delete account web form availability", () => {
  const originalApiKey = process.env.ACCOUNT_DELETION_RESEND_API_KEY;
  const originalFromEmail = process.env.ACCOUNT_DELETION_FROM_EMAIL;

  it("is disabled without server-side email configuration", () => {
    delete process.env.ACCOUNT_DELETION_RESEND_API_KEY;
    delete process.env.ACCOUNT_DELETION_FROM_EMAIL;

    expect(isAccountDeletionWebFormEnabled()).toBe(false);
  });

  it("is enabled only when both secrets are configured", () => {
    process.env.ACCOUNT_DELETION_RESEND_API_KEY = "test-key";
    process.env.ACCOUNT_DELETION_FROM_EMAIL = "noreply@example.com";

    expect(isAccountDeletionWebFormEnabled()).toBe(true);

    process.env.ACCOUNT_DELETION_RESEND_API_KEY = originalApiKey;
    process.env.ACCOUNT_DELETION_FROM_EMAIL = originalFromEmail;
  });
});

describe("delete account mailto fallback", () => {
  it("builds a mailto link to the PUTALERT email", () => {
    const url = buildDeleteAccountMailtoUrl("user@example.com");

    expect(url.startsWith(`mailto:${legalConstants.putalertEmail}`)).toBe(true);
    expect(url).toContain("user%40example.com");
  });
});

describe("PUTALERT delete account required phrases", () => {
  it("documents in-app and email instructions", () => {
    for (const phrase of putalertDeleteAccountRequiredPhrases) {
      expect(phrase.length).toBeGreaterThan(0);
    }

    expect(putalertDeleteAccountRequiredPhrases).toContain(
      legalConstants.putalertEmail,
    );
    expect(putalertDeleteAccountRequiredPhrases).toContain(
      "PUTALERT → Postavke → Nalog → Obriši račun",
    );
  });
});
