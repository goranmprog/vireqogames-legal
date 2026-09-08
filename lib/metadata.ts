import type { Metadata } from "next";

const siteName = "VireqoGames";

export function createSiteMetadata({
  title,
  description,
  path,
  exactTitle = false,
}: {
  title: string;
  description: string;
  path?: string;
  exactTitle?: boolean;
}): Metadata {
  const fullTitle = exactTitle
    ? title
    : title === siteName
      ? siteName
      : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    ...(path
      ? {
          alternates: {
            canonical: path,
          },
        }
      : {}),
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      type: "website",
    },
  };
}

export const siteMetadata = createSiteMetadata({
  title: siteName,
  description: "Applications and games by VireqoGames.",
  path: "/",
});
