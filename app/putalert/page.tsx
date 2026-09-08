import type { Metadata } from "next";
import { AppLanding } from "@/components/AppLanding";
import { getApp } from "@/lib/legal/apps";
import { createSiteMetadata } from "@/lib/metadata";

const app = getApp("putalert");

export const metadata: Metadata = createSiteMetadata({
  title: "PUTALERT",
  description: `${app.name} — ${app.description}`,
  path: "/putalert",
});

export default function PutalertPage() {
  return <AppLanding app={app} />;
}
