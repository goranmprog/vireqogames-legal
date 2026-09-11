import type { ComponentType, ReactNode } from "react";

import Link from "next/link";

import { OpenInAppButton } from "@/components/putalert/OpenInAppButton";
import {
  ShareAccidentIcon,
  ShareCalendarIcon,
  ShareClockIcon,
  ShareCommunityIcon,
  ShareHeartIcon,
  ShareLocationIcon,
  ShareOtherIcon,
  ShareRadarIcon,
  ShareRoadHazardIcon,
  ShareRoadWorkIcon,
  ShareShieldIcon,
  ShareTrafficControlIcon,
  ShareTrafficIcon,
  ShareWeatherIcon,
} from "@/components/putalert/ShareIcons";
import { getAndroidStoreUrl } from "@/lib/putalert/config";
import {
  getCategoryBadgeModifier,
  getCategoryIconKey,
  type CategoryIconKey,
} from "@/lib/putalert/categoryBadge";
import { formatEventLocation } from "@/lib/putalert/labels";
import {
  formatPublishedAtBs,
  formatRelativeTimeBs,
} from "@/lib/putalert/formatRelativeTime";
import type { PublicReportShare, ReportShareSnapshot } from "@/lib/putalert/types";

interface ReportShareViewProps {
  reportId: string;
  snapshot: ReportShareSnapshot;
}

function formatLocationMetaLine(report: PublicReportShare): string | null {
  const road = report.roadName?.trim();
  const direction = report.direction?.trim();

  if (road && direction && road !== direction) {
    return `${road} · ${direction}`;
  }

  if (road) {
    return road;
  }

  if (direction) {
    return direction;
  }

  return null;
}

const CATEGORY_BADGE_ICONS: Record<
  CategoryIconKey,
  ComponentType<{ className?: string }>
> = {
  traffic_control: ShareTrafficControlIcon,
  accident: ShareAccidentIcon,
  road_work: ShareRoadWorkIcon,
  traffic: ShareTrafficIcon,
  road_hazard: ShareRoadHazardIcon,
  weather: ShareWeatherIcon,
  radar: ShareRadarIcon,
  other: ShareOtherIcon,
};

function CategoryBadgeIcon({ categorySlug }: { categorySlug: string }) {
  const Icon = CATEGORY_BADGE_ICONS[getCategoryIconKey(categorySlug)];

  return <Icon className="putalert-share-badge-icon" />;
}

function ShareActions({ reportId }: { reportId: string }) {
  const androidStoreUrl = getAndroidStoreUrl();

  return (
    <div className="putalert-share-actions">
      <OpenInAppButton reportId={reportId} />
      <div className="putalert-share-store">
        <p className="putalert-share-store-prompt">Nemaš još aplikaciju?</p>
        {androidStoreUrl ? (
          <a
            href={androidStoreUrl}
            className="putalert-share-store-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            Preuzmi PUTALERT na Google Play
          </a>
        ) : (
          <p className="putalert-share-store-placeholder">
            PUTALERT uskoro na Google Play
          </p>
        )}
      </div>
    </div>
  );
}

function ShareCommunityBlocks() {
  return (
    <section className="putalert-share-community" aria-label="PUTALERT zajednica">
      <div className="putalert-share-community-item">
        <ShareCommunityIcon className="putalert-share-community-icon" />
        <p>Zajednica vozača</p>
      </div>
      <div className="putalert-share-community-item">
        <ShareShieldIcon className="putalert-share-community-icon" />
        <p>Sigurniji putevi</p>
      </div>
      <div className="putalert-share-community-item">
        <ShareHeartIcon className="putalert-share-community-icon" />
        <p>Bolja Bosna i Hercegovina</p>
      </div>
    </section>
  );
}

function ShareShell({
  reportId,
  children,
}: {
  reportId: string;
  children: ReactNode;
}) {
  return (
    <article className="putalert-share">
      <header className="putalert-share-header">
        <p className="putalert-share-brand" aria-label="PUTALERT">
          PUT<span className="putalert-share-brand-accent">ALERT</span>
        </p>
        <p className="putalert-share-tagline">Zajedno za sigurnije puteve</p>
        <div className="putalert-share-brand-rule" aria-hidden="true" />
      </header>

      <div className="putalert-share-card">{children}</div>

      <ShareActions reportId={reportId} />
      <ShareCommunityBlocks />

      <footer className="putalert-share-footer">
        <nav className="putalert-share-footer-links" aria-label="Legal">
          <Link href="/putalert/privacy">Politika privatnosti</Link>
          <span aria-hidden="true">|</span>
          <Link href="/putalert/terms">Uslovi korištenja</Link>
        </nav>
        <p className="putalert-share-copyright">
          © 2026 PUTALERT. Sva prava zadržana.
        </p>
      </footer>
    </article>
  );
}

function ShareMetaRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="putalert-share-meta-row">
      <div className="putalert-share-meta-label">
        <span className="putalert-share-meta-icon">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="putalert-share-meta-value">{value}</span>
    </div>
  );
}

export function ReportShareView({ reportId, snapshot }: ReportShareViewProps) {
  if (snapshot.status === "invalid_id") {
    return (
      <ShareShell reportId={reportId}>
        <h1 className="putalert-share-title">Događaj nije pronađen</h1>
        <p className="putalert-share-lead">
          Link nije ispravan. Provjeri da li si dobio/la cijeli link iz
          PUTALERT aplikacije.
        </p>
      </ShareShell>
    );
  }

  if (snapshot.status === "not_configured" || snapshot.status === "error") {
    return (
      <ShareShell reportId={reportId}>
        <h1 className="putalert-share-title">Događaj trenutno nije dostupan</h1>
        <p className="putalert-share-lead">
          Trenutno ne možemo učitati detalje ovog događaja. Pokušaj ponovo
          kasnije ili otvori PUTALERT aplikaciju.
        </p>
      </ShareShell>
    );
  }

  if (snapshot.status === "not_found") {
    return (
      <ShareShell reportId={reportId}>
        <h1 className="putalert-share-title">Događaj nije pronađen</h1>
        <p className="putalert-share-lead">
          Možda je uklonjen ili više nije dostupan.
        </p>
      </ShareShell>
    );
  }

  if (snapshot.status === "inactive") {
    return (
      <ShareShell reportId={reportId}>
        <h1 className="putalert-share-title">Ovaj događaj više nije aktivan</h1>
        <p className="putalert-share-lead">
          Prijava je istekla ili više nije dostupna u PUTALERT mreži.
        </p>
      </ShareShell>
    );
  }

  const { report } = snapshot;
  const location = formatEventLocation(report.roadName, report.direction);
  const locationMeta = formatLocationMetaLine(report);
  const badgeModifier = getCategoryBadgeModifier(report.categorySlug);

  return (
    <ShareShell reportId={reportId}>
      <span
        className={`putalert-share-badge putalert-share-badge--${badgeModifier}`}
      >
        <CategoryBadgeIcon categorySlug={report.categorySlug} />
        {report.categoryLabel}
      </span>

      <h1 className="putalert-share-title">{location.primary}</h1>

      {report.description?.trim() ? (
        <p className="putalert-share-description">{report.description.trim()}</p>
      ) : null}

      {location.secondary ? (
        <p className="putalert-share-direction">Smjer: {location.secondary}</p>
      ) : null}

      {report.radarKindLabel ? (
        <p className="putalert-share-radar-kind">
          <ShareRadarIcon className="putalert-share-badge-icon" />
          {report.radarKindLabel}
        </p>
      ) : null}

      <div className="putalert-share-meta">
        <ShareMetaRow
          icon={<ShareClockIcon />}
          label="Objavljeno"
          value={formatRelativeTimeBs(report.createdAt)}
        />
        <ShareMetaRow
          icon={<ShareCalendarIcon />}
          label="Datum"
          value={formatPublishedAtBs(report.createdAt)}
        />
        {locationMeta ? (
          <ShareMetaRow
            icon={<ShareLocationIcon />}
            label="Lokacija"
            value={locationMeta}
          />
        ) : null}
      </div>
    </ShareShell>
  );
}
