"use client";

import Link from "next/link";
import { useState } from "react";

import { putalertLegalPaths } from "@/lib/legal/constants";

function PutalertBrandMark() {
  return (
    <span className="putalert-home-brand" aria-label="PUTALERT">
      PUT<span className="putalert-home-brand-accent">ALERT</span>
    </span>
  );
}

export function PutalertHomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="putalert-home-topbar">
      <div className="putalert-home-container putalert-home-topbar-inner">
        <Link href="/" className="putalert-home-topbar-logo">
          <PutalertBrandMark />
        </Link>

        <button
          type="button"
          className="putalert-home-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="putalert-home-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="putalert-home-menu-toggle-label">
            {menuOpen ? "Zatvori meni" : "Otvori meni"}
          </span>
          <span className="putalert-home-menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="putalert-home-nav"
          className={`putalert-home-topbar-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Putalert navigacija"
        >
          <Link href="#how-it-works" onClick={() => setMenuOpen(false)}>
            Kako radi
          </Link>
          <Link href="#features" onClick={() => setMenuOpen(false)}>
            Funkcije
          </Link>
          <Link href={putalertLegalPaths.privacy}>Privatnost</Link>
          <Link href={putalertLegalPaths.terms}>Uslovi</Link>
        </nav>
      </div>
    </header>
  );
}
