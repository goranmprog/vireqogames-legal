"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { PutalertDownloadCta } from "@/components/putalert/PutalertDownloadCta";
import { putalertLegalPaths } from "@/lib/legal/constants";

function Brand() {
  return (
    <span className="putalert-home-brand" aria-label="PUTALERT">
      PUT<span>ALERT</span>
    </span>
  );
}

interface PutalertHomeTopbarProps {
  androidStoreUrl: string | null;
  downloadLabel: string;
}

export function PutalertHomeTopbar({
  androidStoreUrl,
  downloadLabel,
}: PutalertHomeTopbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const closeMenuAfterHashNav = useCallback(() => {
    requestAnimationFrame(() => {
      setMenuOpen(false);
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  return (
    <header
      className={`putalert-home-topbar${menuOpen ? " is-menu-open" : ""}`}
    >
      <div className="putalert-home-container putalert-home-topbar-inner">
        <Link
          href="/"
          className="putalert-home-topbar-logo"
          onClick={closeMenu}
        >
          <Brand />
        </Link>

        <nav
          className="putalert-home-topbar-nav putalert-home-topbar-nav--desktop"
          aria-label="Putalert navigacija"
        >
          <Link href="#how-it-works">Kako radi</Link>
          <Link href="#features">Funkcije</Link>
          <Link href={putalertLegalPaths.privacy}>Privatnost</Link>
          <Link href={putalertLegalPaths.terms}>Uslovi</Link>
        </nav>

        <PutalertDownloadCta
          androidStoreUrl={androidStoreUrl}
          className="putalert-home-topbar-download putalert-home-topbar-download--desktop"
        >
          {downloadLabel}
        </PutalertDownloadCta>

        <button
          type="button"
          className="putalert-home-menu-toggle"
          aria-label={menuOpen ? "Zatvori navigaciju" : "Otvori navigaciju"}
          aria-expanded={menuOpen}
          aria-controls="putalert-home-mobile-nav"
          onClick={toggleMenu}
        >
          <span className="putalert-home-menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="putalert-home-mobile-nav"
        className={`putalert-home-mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Putalert mobilna navigacija"
        aria-hidden={!menuOpen}
      >
        <div className="putalert-home-container putalert-home-mobile-nav-inner">
          <Link href="#how-it-works" onClick={closeMenuAfterHashNav}>
            Kako radi
          </Link>
          <Link href="#features" onClick={closeMenuAfterHashNav}>
            Funkcije
          </Link>
          <Link href={putalertLegalPaths.privacy}>Privatnost</Link>
          <Link href={putalertLegalPaths.terms}>Uslovi</Link>
          <PutalertDownloadCta
            androidStoreUrl={androidStoreUrl}
            className="putalert-home-topbar-download putalert-home-mobile-nav-cta"
          >
            {downloadLabel}
          </PutalertDownloadCta>
        </div>
      </nav>
    </header>
  );
}
