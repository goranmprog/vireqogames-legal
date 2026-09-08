import { legalConstants } from "@/lib/legal/constants";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface DeleteAccountRequestInput {
  email: string;
  confirmed: boolean;
}

export interface DeleteAccountRequestValidationResult {
  valid: boolean;
  errors: {
    email?: string;
    confirmed?: string;
  };
}

export function validateDeleteAccountRequest(
  input: DeleteAccountRequestInput,
): DeleteAccountRequestValidationResult {
  const errors: DeleteAccountRequestValidationResult["errors"] = {};
  const email = input.email.trim();

  if (!email) {
    errors.email = "Unesite email adresu vašeg PUTALERT računa.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Unesite ispravnu email adresu.";
  }

  if (!input.confirmed) {
    errors.confirmed =
      "Potvrdite da želite zatražiti brisanje svog PUTALERT računa.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function isAccountDeletionWebFormEnabled(): boolean {
  const apiKey = process.env.ACCOUNT_DELETION_RESEND_API_KEY?.trim();
  const fromEmail = process.env.ACCOUNT_DELETION_FROM_EMAIL?.trim();

  return Boolean(apiKey && fromEmail);
}

export function buildDeleteAccountMailtoUrl(accountEmail?: string): string {
  const subject = encodeURIComponent("PUTALERT – Zahtjev za brisanje računa");
  const bodyLines = [
    "Zahtjev za brisanje PUTALERT računa",
    "",
    "Email adresa PUTALERT računa:",
    accountEmail?.trim() || "[unesite email adresu]",
    "",
    "Napomena: Nemojte slati lozinku, access token, refresh token niti podatke o platnim karticama.",
  ];
  const body = encodeURIComponent(bodyLines.join("\n"));

  return `mailto:${legalConstants.putalertEmail}?subject=${subject}&body=${body}`;
}
