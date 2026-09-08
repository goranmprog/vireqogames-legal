import { legalConstants, putalertLegalPaths } from "@/lib/legal/constants";

export const PUTALERT_EFFECTIVE_DATE = "8. septembar 2026.";

export const putalertPrivacyRequiredPhrases = [
  "PUTALERT razvija i njime upravlja",
  legalConstants.operatorName,
  legalConstants.putalertEmail,
  "Brisanje PUTALERT računa",
  putalertLegalPaths.deleteAccount,
  `mlađoj od ${legalConstants.minimumAge} godina`,
] as const;

export const putalertTermsRequiredPhrases = [
  "Uslovima korištenja",
  legalConstants.operatorName,
  legalConstants.putalertEmail,
  putalertLegalPaths.privacy,
  `najmanje ${legalConstants.minimumAge} godina`,
] as const;

export const putalertDeleteAccountRequiredPhrases = [
  "Brisanje PUTALERT računa",
  "PUTALERT → Postavke → Nalog → Obriši račun",
  legalConstants.putalertEmail,
  "Nemojte slati svoju lozinku",
  "Nemojte slati access token ili refresh token",
  "Nemojte slati podatke o platnim karticama",
] as const;
