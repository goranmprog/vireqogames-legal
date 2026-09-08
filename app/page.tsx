import Link from "next/link";
import { publishedApps } from "@/lib/legal/apps";

export default function HomePage() {
  return (
    <div className="container content">
      <header className="page-header">
        <h1>VireqoGames</h1>
        <p className="lead">Applications and games by VireqoGames.</p>
      </header>

      <section aria-labelledby="apps-heading">
        <h2 id="apps-heading">Applications</h2>
        {publishedApps.map((app) => (
          <article key={app.slug} className="app-card">
            <h3>
              <Link href={`/${app.slug}`}>{app.name}</Link>
            </h3>
            <p>{app.description}</p>
            <nav className="app-card-links" aria-label={`${app.name} legal documents`}>
              {app.legalDocuments.map((doc) => (
                <Link key={doc.type} href={doc.path}>
                  {doc.title}
                </Link>
              ))}
            </nav>
          </article>
        ))}
      </section>
    </div>
  );
}
