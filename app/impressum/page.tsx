import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <div className="container page prose">
      <h1>Impressum</h1>

      <p className="notice notice-warn">
        <strong>Vorlage – bitte vor Veröffentlichung ausfüllen und rechtlich prüfen.</strong> Alle Angaben in eckigen Klammern
        fehlen noch. Diesen Hinweis anschließend löschen.
      </p>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        [Firmenname / Inhaber laut Gewerbeanmeldung, inkl. Rechtsform]
        <br />
        {site.street}
        <br />
        {site.city}
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {site.tel}
        <br />
        E-Mail: {site.email}
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr., falls vorhanden]</p>

      <h2>Registereintrag</h2>
      <p>[Handelsregister / Registernummer, falls vorhanden]</p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>[Name und Anschrift der verantwortlichen Person nach § 18 Abs. 2 MStV]</p>

      <h2>Aufsichtsbehörde / Lebensmittelüberwachung</h2>
      <p>[Zuständige Behörde, falls anzugeben]</p>

      <h2>Streitbeilegung</h2>
      <p>[Hinweis zur Verbraucherstreitbeilegung nach VSBG ergänzen]</p>
    </div>
  );
}
