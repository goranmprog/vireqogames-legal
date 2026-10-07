import type { ReactNode } from "react";

import Link from "next/link";

interface PutalertDownloadCtaProps {
  androidStoreUrl: string | null;
  className?: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function PutalertDownloadCta({
  androidStoreUrl,
  className = "",
  variant = "primary",
  children,
}: PutalertDownloadCtaProps) {
  const classes = [
    "putalert-home-button",
    variant === "primary"
      ? "putalert-home-button-primary"
      : "putalert-home-button-secondary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (androidStoreUrl) {
    return (
      <a
        href={androidStoreUrl}
        className={classes}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <span className={`${classes} putalert-home-button-disabled`} aria-disabled="true">
      {children}
    </span>
  );
}

interface PutalertScrollLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function PutalertScrollLink({
  href,
  className = "",
  children,
}: PutalertScrollLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
