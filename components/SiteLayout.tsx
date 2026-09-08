import Link from "next/link";
import { Footer } from "./Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="site-logo">
            VireqoGames
          </Link>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
}
