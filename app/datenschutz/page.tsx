import type { Metadata } from "next";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <div className="container page prose">
      <h1>Datenschutzerklärung</h1>

      <p className="notice notice-warn">
        <strong>Vorlage – bitte vor Veröffentlichung an Ihr Hosting und Ihre Dienste anpassen und rechtlich prüfen.</strong>{" "}
        Angaben in eckigen Klammern fehlen noch. Diesen Hinweis anschließend löschen.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        [Firmenname / Inhaber]
        <br />
        {site.street}, {site.city}
        <br />
        Telefon: {site.tel} · E-Mail: {site.email}
      </p>

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Beim Aufruf dieser Seite verarbeitet der Hosting-Anbieter technisch notwendige Daten (z. B. IP-Adresse, Datum und
        Uhrzeit, aufgerufene Seite, Browsertyp). Hosting-Anbieter: [Name, Sitz, Speicherdauer der Logfiles ergänzen].
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Betrieb und Sicherheit der Webseite).
      </p>

      <h2>3. Catering-Anfrage und Kontaktformular</h2>
      <p>
        Wenn Sie uns über die Anfrage oder das Kontaktformular schreiben, verarbeiten wir Ihre Angaben (Name, E-Mail,
        Telefon, Veranstaltungsdaten, gewählte Speisen und Nachricht), um Ihre Anfrage zu beantworten und ein Angebot zu
        erstellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Ihre Einwilligung nach
        Art. 6 Abs. 1 lit. a DSGVO. Die Übermittlung erfolgt per E-Mail an uns. Wir löschen die Daten, sobald sie für den
        Zweck nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2>4. Lokale Speicherung im Browser</h2>
      <p>
        Wir speichern in Ihrem Browser (Local Storage) Ihre Cookie-Entscheidung sowie – nur zur Komfortfunktion – Ihre noch
        nicht gesendete Speisenauswahl der Anfrage. Diese Daten verlassen Ihr Gerät nicht und werden erst mit dem Absenden
        der Anfrage an uns übertragen. Sie können sie jederzeit über die Browsereinstellungen löschen. Rechtsgrundlage ist § 25
        Abs. 2 Nr. 2 TDDDG.
      </p>
      <p>
        Ihre Auswahl können Sie hier ändern: <CookieSettingsButton />
      </p>

      <h2>5. Weitere Dienste</h2>
      <p>
        [Falls später Statistik, Karten, YouTube o. Ä. eingebunden werden: Dienst, Anbieter, Zweck, Rechtsgrundlage und
        Drittlandübermittlung ergänzen und erst nach Einwilligung laden.]
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
        Widerspruch. Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem können Sie
        sich bei einer Datenschutz-Aufsichtsbehörde beschweren, in Sachsen-Anhalt beim Landesbeauftragten für den Datenschutz.
      </p>
    </div>
  );
}
