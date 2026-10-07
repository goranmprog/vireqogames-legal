import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">PUTALERT</p>
        <p className="footer-copy">© {year} PUTALERT</p>
        <nav className="footer-nav" aria-label="Putalert navigacija">
          <Link href="/">Početna</Link>
          <Link href="/privacy">Politika privatnosti</Link>
          <Link href="/terms">Uslovi korištenja</Link>
          <Link href="/delete-account">Brisanje računa</Link>
        </nav>
      </div>
    </footer>
  );
}
