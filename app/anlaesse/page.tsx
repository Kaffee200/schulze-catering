import type { Metadata } from "next";
import Link from "next/link";
import { anlaesse } from "@/data/anlaesse";

export const metadata: Metadata = {
  title: "Anlässe",
  description: "Catering für Büfett, Firmenfeier und Hochzeit in Halle (Saale) – Schulze Catering.",
};

export default function AnlaessePage() {
  return (
    <div className="container page">
      <header className="page-head">
        <h1>Catering für Ihren Anlass</h1>
        <p className="lead">Wählen Sie Ihren Anlass und sehen Sie, welche Speisen dazu passen.</p>
      </header>

      <ul className="areas">
        {anlaesse.map((a) => (
          <li key={a.slug}>
            <Link href={`/anlaesse/${a.slug}`}>
              <span className="area-title">{a.short}</span>
              <span className="area-text">{a.intro}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
