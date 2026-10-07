import Link from "next/link";
import {
  PutalertDownloadCta,
  PutalertScrollLink,
} from "@/components/putalert/PutalertDownloadCta";
import { PutalertHomeTopbar } from "@/components/putalert/PutalertHomeTopbar";
import {
  ShareCommunityIcon,
  ShareHeartIcon,
  ShareLocationIcon,
  SharePhoneIcon,
  ShareRadarIcon,
  ShareRoadHazardIcon,
  ShareRoadWorkIcon,
  ShareShieldIcon,
  ShareTrafficControlIcon,
  ShareTrafficIcon,
} from "@/components/putalert/ShareIcons";
import { getPutalertSiteBaseUrl } from "@/lib/putalert/config";
import {
  PUTALERT_HOME_HERO_SUBTITLE,
  PUTALERT_HOME_HERO_SUPPORT,
  PUTALERT_HOME_TAGLINE,
  PUTALERT_SHARE_URL_PATTERN,
} from "@/lib/putalert/homeContent";
import { putalertLegalPaths } from "@/lib/legal/constants";

interface PutalertHomePageProps {
  androidStoreUrl: string | null;
}

const EVENTS = [
  ["Radari i kontrole", ShareRadarIcon],
  ["Radovi na cesti", ShareRoadWorkIcon],
  ["Saobraćajni događaji", ShareTrafficIcon],
  ["Opasnosti", ShareRoadHazardIcon],
  ["Događaji na mapi", ShareLocationIcon],
] as const;

const STEPS = [
  ["01", "Pronađi", "Pregledaj događaje i stanje na putevima u svojoj blizini.", ShareLocationIcon],
  ["02", "Prijavi ili potvrdi", "Prijavi ono što vidiš ili potvrdi informaciju drugog korisnika.", ShareShieldIcon],
  ["03", "Budi obaviješten", "Primaj relevantne obavijesti o događajima u tvojoj blizini.", SharePhoneIcon],
] as const;

const FEATURES = [
  ["Mapa događaja", "Pregledaj prijave i informacije u okolini na mapi.", ShareLocationIcon],
  ["Potvrđivanje informacija", "Potvrdi prijave drugih korisnika kada vidiš da su tačne.", ShareShieldIcon],
  ["Push obavijesti", "Primaj obavijesti o relevantnim događajima blizu tvoje lokacije.", SharePhoneIcon],
  ["Fotografije", "Uz prijavu možeš dodati fotografiju kada aplikacija to podržava.", ShareCommunityIcon],
  ["Dijeljenje događaja", "Podijeli pojedinačni događaj putem direktnog linka s drugima.", ShareHeartIcon],
] as const;

function Brand() {
  return (
    <span className="putalert-home-brand" aria-label="PUTALERT">
      PUT<span>ALERT</span>
    </span>
  );
}

function Icon({ component: Component }: { component: React.ComponentType }) {
  return <Component />;
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="putalert-home-footer">
      <div className="putalert-home-container putalert-home-footer-inner">
        <div>
          <p className="putalert-home-footer-brand"><Brand /></p>
          <p className="putalert-home-footer-copy">© {year} PUTALERT</p>
          <p className="putalert-home-footer-note">
            Informacije u aplikaciji dolaze od korisnika i ne zamjenjuju službene izvore ni hitne službe.
          </p>
        </div>
        <nav className="putalert-home-footer-nav" aria-label="Putalert navigacija">
          <Link href="/">Početna</Link>
          <Link href={putalertLegalPaths.privacy}>Politika privatnosti</Link>
          <Link href={putalertLegalPaths.terms}>Uslovi korištenja</Link>
          <Link href={putalertLegalPaths.deleteAccount}>Brisanje računa</Link>
        </nav>
      </div>
    </footer>
  );
}

export function PutalertHomePage({ androidStoreUrl }: PutalertHomePageProps) {
  const shareUrl =
    getPutalertSiteBaseUrl() === "https://putalert.com"
      ? PUTALERT_SHARE_URL_PATTERN
      : `${getPutalertSiteBaseUrl()}/r/{id}`;

  const downloadLabel = androidStoreUrl ? "Preuzmi PUTALERT" : "Uskoro na Google Playu";

  return (
    <main className="putalert-home">
      <PutalertHomeTopbar
        androidStoreUrl={androidStoreUrl}
        downloadLabel={downloadLabel}
      />

      <section className="putalert-home-hero" aria-labelledby="putalert-hero-heading">
        <div className="putalert-home-hero-bg" aria-hidden="true" />
        <div className="putalert-home-hero-overlay" aria-hidden="true" />
        <div className="putalert-home-container putalert-home-hero-inner">
          <div className="putalert-home-hero-copy">
            <p className="putalert-home-kicker">INFORMACIJE SA PUTA. OD LJUDI ZA LJUDE.</p>
            <h1 id="putalert-hero-heading">{PUTALERT_HOME_TAGLINE}</h1>
            <p className="putalert-home-hero-lead">{PUTALERT_HOME_HERO_SUBTITLE}</p>
            <p className="putalert-home-hero-support">{PUTALERT_HOME_HERO_SUPPORT}</p>
            <div className="putalert-home-actions">
              <PutalertDownloadCta androidStoreUrl={androidStoreUrl}>
                {downloadLabel}
              </PutalertDownloadCta>
              <PutalertScrollLink href="#how-it-works" className="putalert-home-button putalert-home-button-secondary">
                Saznaj kako radi ↓
              </PutalertScrollLink>
            </div>
            <div className="putalert-home-trust-row">
              <span><ShareCommunityIcon /> Zajednica vozača</span>
              <span><ShareShieldIcon /> Relevantne informacije</span>
              <span><SharePhoneIcon /> Sigurniji putevi</span>
            </div>
          </div>
          <div className="putalert-home-hero-message">
            <span>Manje neizvjesnosti.</span>
            <strong>Više sigurnosti.</strong>
            <i />
          </div>
        </div>
      </section>

      <section className="putalert-home-section putalert-home-events" aria-labelledby="putalert-events-heading">
        <div className="putalert-home-container putalert-home-events-grid">
          <div>
            <p className="putalert-home-kicker">NA PUTU</p>
            <h2 id="putalert-events-heading">Šta se dešava na putu?</h2>
            <p className="putalert-home-section-lead">
              PUTALERT ti pomaže da budeš informisan o svim važnim događajima na putevima —
              od radara i kontrola do radova, saobraćajnih događaja i drugih opasnosti.
            </p>
            <ul className="putalert-home-event-grid">
              {EVENTS.map(([title, component]) => (
                <li key={title}>
                  <span><Icon component={component} /></span>
                  <strong>{title}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="putalert-events-map">
            <picture>
              <source
                srcSet="/putalert/putalert-events-map.webp"
                type="image/webp"
              />
              <img
                src="/putalert/putalert-events-map.png"
                alt=""
                className="putalert-events-map-img"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="putalert-home-section putalert-home-how" aria-labelledby="putalert-how-heading">
        <div className="putalert-home-container">
          <p className="putalert-home-kicker">JEDNOSTAVNO</p>
          <h2 id="putalert-how-heading">Kako radi PUTALERT?</h2>
          <p className="putalert-home-section-lead">Tri jednostavna koraka između tebe i korisnih informacija na putu.</p>
          <ol className="putalert-home-step-grid">
            {STEPS.map(([step, title, description, component], index) => (
              <li key={step}>
                <article>
                  <div className="putalert-home-step-number">{step}</div>
                  <div className="putalert-home-step-icon"><Icon component={component} /></div>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
                {index < STEPS.length - 1 && <span className="putalert-home-step-arrow" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="putalert-home-section putalert-home-features" aria-labelledby="putalert-features-heading">
        <div className="putalert-home-container">
          <p className="putalert-home-kicker">APLIKACIJA</p>
          <h2 id="putalert-features-heading">Ključne funkcije</h2>
          <div className="putalert-home-feature-layout">
            <article className="putalert-home-feature-main">
              <div className="putalert-home-asset-slot feature-image-slot">
                <picture>
                  <source
                    srcSet="/putalert/putalert-app-map-feature.webp"
                    type="image/webp"
                  />
                  <img
                    src="/putalert/putalert-app-map-feature.png"
                    alt="PATROLE BIH aplikacija – mapa događaja i graničnih prelaza"
                    className="putalert-feature-app-map-img"
                    width={852}
                    height={1626}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="putalert-home-feature-main-copy">
                <span className="putalert-home-feature-icon"><ShareTrafficControlIcon /></span>
                <h3>Prijavi događaj</h3>
                <p>Objavi prijavu o događaju na putu i pomozi drugim vozačima da budu spremniji.</p>
                <PutalertScrollLink href="#how-it-works" className="putalert-home-feature-link">Pogledaj kako →</PutalertScrollLink>
              </div>
            </article>

            <ul className="putalert-home-feature-list">
              {FEATURES.map(([title, description, component]) => (
                <li key={title}>
                  <span className="putalert-home-feature-icon"><Icon component={component} /></span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="putalert-home-community" aria-labelledby="putalert-community-heading">
        <div className="putalert-home-community-bg" aria-hidden="true" />
        <div className="putalert-home-community-overlay" aria-hidden="true" />
        <div className="putalert-home-container putalert-home-community-inner">
          <div>
            <p className="putalert-home-kicker">ZAJEDNICA</p>
            <h2 id="putalert-community-heading">Informacije dolaze od ljudi koji su na putu.</h2>
            <p>
              Korisnici prijavljuju događaje, potvrđuju informacije drugih i doprinose zajedničkoj slici na putevima.
            </p>
            <div className="putalert-home-info-note">
              Sadržaj može dolaziti od korisnika i ne predstavlja nužno službene informacije.
            </div>
          </div>
          <div className="putalert-home-community-panel">
            <div className="putalert-home-live-bar"><span /> Aktivni događaji <b>u okolini</b></div>
            <div className="putalert-community-detail">
              <picture>
                <source
                  srcSet="/putalert/putalert-community-detail.webp"
                  type="image/webp"
                />
                <img
                  src="/putalert/putalert-community-detail.png"
                  alt=""
                  className="putalert-community-detail-img"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="putalert-home-signal-list">
              <span><ShareCommunityIcon /> Prijave vozača</span>
              <span><ShareShieldIcon /> Potvrđene informacije</span>
              <span><ShareLocationIcon /> Događaji u blizini</span>
            </div>
          </div>
        </div>
      </section>

      <section className="putalert-home-section putalert-home-share" aria-labelledby="putalert-share-heading">
        <div className="putalert-home-container putalert-home-share-grid">
          <div className="putalert-home-share-copy">
            <p className="putalert-home-kicker">PODIJELI</p>
            <h2 id="putalert-share-heading">Podijeli događaj</h2>
            <p className="putalert-home-section-lead">
              Pojedinačni događaj možeš podijeliti drugima putem direktnog linka — korisno kada želiš da neko brzo vidi šta se dešava na određenom mjestu.
            </p>
            <div
              className="putalert-home-share-link-card"
              aria-label="Primjer formata linka za dijeljenje događaja"
            >
              <p className="putalert-home-share-link-card-label">Direktan link za dijeljenje</p>
              <p className="putalert-home-share-link-card-url">{shareUrl}</p>
              <p className="putalert-home-share-link-card-hint">
                Svaki događaj ima svoj link — pošalji ga porukom ili objavi na društvenim mrežama.
              </p>
              <div className="putalert-home-share-link-affordances" aria-hidden="true">
                <span className="putalert-home-share-link-pill">Link</span>
                <span className="putalert-home-share-link-pill">Poruka</span>
                <span className="putalert-home-share-link-pill">Društvene mreže</span>
              </div>
            </div>
          </div>
          <article
            className="putalert-home-share-preview"
            aria-label="Primjer: kako primatelj vidi dijeljeni događaj"
          >
            <div className="putalert-home-share-preview-stack">
              <p className="putalert-home-share-preview-eyebrow">Kako izgleda primatelju</p>
              <div className="putalert-home-share-preview-shell">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/putalert/putalert-share-page.webp"
                  />
                  <img
                    src="/putalert/putalert-share-page.png"
                    alt="PUTALERT share stranica — prikaz događaja, lokacije i opcija za otvaranje u aplikaciji"
                    className="putalert-home-share-preview-img"
                    width={621}
                    height={1276}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="putalert-home-cta">
        <div className="putalert-home-cta-bg" aria-hidden="true" />
        <div className="putalert-home-cta-overlay" aria-hidden="true" />
        <div className="putalert-home-container">
          <p className="putalert-home-kicker">PUTUJ INFORMISANO</p>
          <h2>Spremi PUTALERT za svoj sljedeći put.</h2>
          <p>Preuzmi aplikaciju i budi informisan prije nego kreneš na put.</p>
          <PutalertDownloadCta androidStoreUrl={androidStoreUrl}>{downloadLabel}</PutalertDownloadCta>
        </div>
      </section>

      <Footer />
    </main>
  );
}
