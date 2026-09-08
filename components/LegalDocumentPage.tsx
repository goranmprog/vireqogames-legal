import Link from "next/link";
import { LegalRelatedLinks, type RelatedLink } from "./LegalRelatedLinks";

interface LegalDocumentPageProps {
  appName: string;
  title: string;
  effectiveDate?: string;
  backHref: string;
  backLabel: string;
  relatedLinks?: RelatedLink[];
  children: React.ReactNode;
}

export function LegalDocumentPage({
  appName,
  title,
  effectiveDate,
  backHref,
  backLabel,
  relatedLinks = [],
  children,
}: LegalDocumentPageProps) {
  return (
    <article className="container content legal-document">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href={backHref}>{backLabel}</Link>
      </nav>
      <header className="page-header">
        <p className="app-label">{appName}</p>
        <h1>{title}</h1>
        {effectiveDate ? (
          <p className="legal-effective-date">
            Datum stupanja na snagu: {effectiveDate}
          </p>
        ) : null}
      </header>
      <div className="legal-content legal-prose">{children}</div>
      <LegalRelatedLinks links={relatedLinks} />
    </article>
  );
}
