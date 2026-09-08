import type { Metadata } from "next";
import Link from "next/link";
import { DeleteAccountRequestForm } from "@/components/DeleteAccountRequestForm";
import { LegalRelatedLinks } from "@/components/LegalRelatedLinks";
import { getApp, requireLegalDocument } from "@/lib/legal/apps";
import { legalConstants, putalertLegalPaths } from "@/lib/legal/constants";
import { isAccountDeletionWebFormEnabled } from "@/lib/legal/delete-account-request";
import { createSiteMetadata } from "@/lib/metadata";

const app = getApp("putalert");
const document = requireLegalDocument("putalert", "delete-account");

export const dynamic = "force-dynamic";

export const metadata: Metadata = createSiteMetadata({
  title: "PUTALERT – Brisanje računa",
  description:
    "Informacije i način podnošenja zahtjeva za brisanje PUTALERT računa.",
  path: document.path,
  exactTitle: true,
});

export default function PutalertDeleteAccountPage() {
  const webFormEnabled = isAccountDeletionWebFormEnabled();

  return (
    <article className="container content legal-document delete-account-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/putalert">PUTALERT</Link>
      </nav>
      <header className="page-header">
        <p className="app-label">{app.name}</p>
        <h1>Brisanje PUTALERT računa</h1>
      </header>

      <div className="legal-content legal-prose">
        <p>
          Korisnici PUTALERT-a mogu trajno obrisati svoj račun i povezane lične
          podatke.
        </p>

        <h2>Ako imate pristup aplikaciji</h2>
        <p>Najjednostavniji način je:</p>
        <p>
          <strong>PUTALERT → Postavke → Nalog → Obriši račun</strong>
        </p>
        <p>Aplikacija će tražiti potvrdu prije pokretanja postupka.</p>
        <p>Nakon uspješnog brisanja račun se trajno uklanja.</p>

        <h2>Ako više nemate pristup aplikaciji</h2>
        <p>Možete poslati zahtjev za brisanje računa putem emaila:</p>
        <p>
          <a href={`mailto:${legalConstants.putalertEmail}`}>
            {legalConstants.putalertEmail}
          </a>
        </p>
        <p>
          U zahtjevu navedite email adresu koja je povezana sa vašim PUTALERT
          računom kako bismo mogli provjeriti zahtjev.
        </p>
        <p>Nemojte slati svoju lozinku.</p>
        <p>Nemojte slati access token ili refresh token.</p>
        <p>Nemojte slati podatke o platnim karticama.</p>

        <h2>Šta se briše?</h2>
        <p>
          Brisanjem računa uklanjaju se ili deaktiviraju podaci povezani sa
          vašim korisničkim računom, uključujući:
        </p>
        <ul>
          <li>korisnički račun;</li>
          <li>profil;</li>
          <li>push tokene;</li>
          <li>postavke obavijesti;</li>
          <li>lokaciju koja se koristi za push obavijesti;</li>
          <li>korisničke potvrde i flags;</li>
          <li>fotografije povezane sa vašim računom;</li>
          <li>
            druge podatke koji su isključivo povezani sa vašim računom.
          </li>
        </ul>
        <p>
          Određeni javni community sadržaj, kao što su prijave, pitanja ili
          odgovori, može ostati dostupan ako je potreban za integritet
          zajednice.
        </p>
        <p>
          U tom slučaju identifikaciona veza sa vašim računom uklanja se ili
          anonimizuje.
        </p>

        <h2>Važno</h2>
        <p>
          Brisanje računa je trajna radnja i ne može se poništiti nakon
          završetka postupka.
        </p>
        <p>
          Za pitanja:{" "}
          <a href={`mailto:${legalConstants.putalertEmail}`}>
            {legalConstants.putalertEmail}
          </a>
        </p>
      </div>

      <DeleteAccountRequestForm webFormEnabled={webFormEnabled} />

      <LegalRelatedLinks
        links={[
          {
            href: putalertLegalPaths.privacy,
            label: "Politika privatnosti",
          },
          {
            href: putalertLegalPaths.terms,
            label: "Uslovi korištenja",
          },
        ]}
      />
    </article>
  );
}
