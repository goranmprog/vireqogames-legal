"use client";

import { usePathname } from "next/navigation";

import { SiteLayout } from "@/components/SiteLayout";

interface ConditionalSiteLayoutProps {
  children: React.ReactNode;
}

export function ConditionalSiteLayout({ children }: ConditionalSiteLayoutProps) {
  const pathname = usePathname();
  const isSharePage = pathname?.startsWith("/putalert/r/");

  if (isSharePage) {
    return <div className="putalert-share-page">{children}</div>;
  }

  return <SiteLayout>{children}</SiteLayout>;
}
