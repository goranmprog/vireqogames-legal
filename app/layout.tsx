import type { Metadata } from "next";
import { ConditionalSiteLayout } from "@/components/ConditionalSiteLayout";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConditionalSiteLayout>{children}</ConditionalSiteLayout>
      </body>
    </html>
  );
}
