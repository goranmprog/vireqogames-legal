import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
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
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
