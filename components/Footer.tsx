import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">VireqoGames</p>
        <p className="footer-copy">© {year} VireqoGames</p>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/putalert">PUTALERT</Link>
        </nav>
      </div>
    </footer>
  );
}
