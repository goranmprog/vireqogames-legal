import Link from "next/link";

export interface RelatedLink {
  href: string;
  label: string;
}

interface LegalRelatedLinksProps {
  links: RelatedLink[];
}

export function LegalRelatedLinks({ links }: LegalRelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <nav className="legal-related-links" aria-label="Povezani dokumenti">
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
