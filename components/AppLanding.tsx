import Link from "next/link";
import type { AppConfig } from "@/lib/legal/apps";

interface AppLandingProps {
  app: AppConfig;
}

export function AppLanding({ app }: AppLandingProps) {
  const legalLinks = app.legalDocuments.filter(
    (doc) => doc.type === "privacy" || doc.type === "terms" || doc.type === "delete-account",
  );

  return (
    <article className="container content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">VireqoGames</Link>
      </nav>
      <header className="page-header">
        <h1>{app.name}</h1>
        <p className="lead">{app.description}</p>
      </header>
      <section className="link-list-section" aria-labelledby={`${app.slug}-legal-heading`}>
        <h2 id={`${app.slug}-legal-heading`}>Legal</h2>
        <ul className="link-list">
          {legalLinks.map((doc) => (
            <li key={doc.type}>
              <Link href={doc.path}>{doc.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
