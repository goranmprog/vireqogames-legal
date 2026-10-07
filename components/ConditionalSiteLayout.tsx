"use client";

import { usePathname } from "next/navigation";

import { SiteLayout } from "@/components/SiteLayout";

interface ConditionalSiteLayoutProps {
  children: React.ReactNode;
}

export function ConditionalSiteLayout({ children }: ConditionalSiteLayoutProps) {
  const pathname = usePathname();
  const isSharePage = pathname?.startsWith("/r/");
  const isHomePage = pathname === "/";

  if (isSharePage) {
    return <div className="putalert-share-page">{children}</div>;
  }

  if (isHomePage) {
    return <>{children}</>;
  }

  return <SiteLayout>{children}</SiteLayout>;
}
