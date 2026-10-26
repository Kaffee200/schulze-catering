import Link from "next/link";
import Logo from "./Logo";
import CookieSettingsButton from "./CookieSettingsButton";
import { site, nav } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo size={36} />
          <p className="footer-claim">Wir bringen noch mehr.</p>
        </div>

        <div>
          <h2 className="footer-h">Kontakt</h2>
          <address>
            {site.street}
            <br />
            {site.city}
            <br />
            <a href={`tel:${site.telHref}`}>{site.tel}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </address>
          <p className="footer-note">Bitte keine spontanen Besuche ohne telefonische Absprache.</p>
        </div>

        <div>
          <h2 className="footer-h">Seiten</h2>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/faq">Häufige Fragen</Link>
            </li>
            <li>
              <a href="/katalog/Angebot-Schulze-Catering-2026.pdf" target="_blank" rel="noopener">
                Katalog als PDF
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Schulze Catering · Alle Preise inkl. 7 % MwSt.</p>
        <ul className="legal">
          <li>
            <Link href="/impressum">Impressum</Link>
          </li>
          <li>
            <Link href="/datenschutz">Datenschutz</Link>
          </li>
          <li>
            <CookieSettingsButton />
          </li>
        </ul>
      </div>
    </footer>
  );
}
