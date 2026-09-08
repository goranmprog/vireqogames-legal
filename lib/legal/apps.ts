export type LegalDocumentType = "privacy" | "terms" | "delete-account";

export type AppSlug = "putalert" | "dailybeauty" | "games";

export interface LegalDocumentConfig {
  type: LegalDocumentType;
  title: string;
  path: string;
  placeholder: string;
}

export interface AppConfig {
  slug: AppSlug;
  name: string;
  description: string;
  /** Set to true when the app has published legal pages and a landing route. */
  published: boolean;
  legalDocuments: LegalDocumentConfig[];
}

const putalertLegalDocuments: LegalDocumentConfig[] = [
  {
    type: "privacy",
    title: "Politika privatnosti",
    path: "/putalert/privacy",
    placeholder: "Privacy Policy will be published here.",
  },
  {
    type: "terms",
    title: "Uslovi korištenja",
    path: "/putalert/terms",
    placeholder: "Terms of Use will be published here.",
  },
  {
    type: "delete-account",
    title: "Brisanje računa",
    path: "/putalert/delete-account",
    placeholder:
      "The account deletion request process will be defined here.",
  },
];

const dailybeautyLegalDocuments: LegalDocumentConfig[] = [
  {
    type: "privacy",
    title: "Privacy Policy",
    path: "/dailybeauty/privacy",
    placeholder: "Privacy Policy will be published here.",
  },
  {
    type: "terms",
    title: "Terms of Use",
    path: "/dailybeauty/terms",
    placeholder: "Terms of Use will be published here.",
  },
];

const gamesLegalDocuments: LegalDocumentConfig[] = [
  {
    type: "privacy",
    title: "Privacy Policy",
    path: "/games/privacy",
    placeholder: "Privacy Policy will be published here.",
  },
  {
    type: "terms",
    title: "Terms of Use",
    path: "/games/terms",
    placeholder: "Terms of Use will be published here.",
  },
];

export const apps: Record<AppSlug, AppConfig> = {
  putalert: {
    slug: "putalert",
    name: "PUTALERT",
    description: "Mobile application by VireqoGames.",
    published: true,
    legalDocuments: putalertLegalDocuments,
  },
  dailybeauty: {
    slug: "dailybeauty",
    name: "DailyBeauty",
    description: "Mobile application by VireqoGames.",
    published: false,
    legalDocuments: dailybeautyLegalDocuments,
  },
  games: {
    slug: "games",
    name: "Games",
    description: "Games by VireqoGames.",
    published: false,
    legalDocuments: gamesLegalDocuments,
  },
};

export const publishedApps = Object.values(apps).filter((app) => app.published);

export function getApp(slug: AppSlug): AppConfig {
  return apps[slug];
}

export function getLegalDocument(
  appSlug: AppSlug,
  type: LegalDocumentType,
): LegalDocumentConfig | undefined {
  return apps[appSlug].legalDocuments.find((doc) => doc.type === type);
}

export function requireLegalDocument(
  appSlug: AppSlug,
  type: LegalDocumentType,
): LegalDocumentConfig {
  const document = getLegalDocument(appSlug, type);

  if (!document) {
    throw new Error(
      `Legal document "${type}" is not configured for app "${appSlug}".`,
    );
  }

  return document;
}
