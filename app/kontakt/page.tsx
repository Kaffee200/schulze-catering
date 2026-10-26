import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt zu Schulze Catering in Halle (Saale): Telefon, E-Mail und Kontaktformular.",
};

export default function KontaktPage() {
  return (
    <div className="container page">
      <header className="page-head">
        <h1>Kontakt</h1>
        <p className="lead">Fragen zu Ihrer Feier? Rufen Sie an oder schreiben Sie uns.</p>
      </header>

      <div className="split split-top">
        <div>
          <h2 className="h3">So erreichen Sie uns</h2>
          <address className="contact-list">
            <p>
              <strong>Telefon</strong>
              <br />
              <a href={`tel:${site.telHref}`}>{site.tel}</a>
            </p>
            <p>
              <strong>E-Mail</strong>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <strong>Produktion</strong>
              <br />
              Schulze Catering
              <br />
              {site.street}
              <br />
              {site.city}
            </p>
          </address>
          <p className="muted">Bitte sehen Sie von spontanen Besuchen ohne telefonische Absprache ab.</p>
          <p>
            Für Menüs und Büfetts wählen Sie Ihre Speisen am einfachsten über die{" "}
            <a href="/anfrage">Catering Anfrage</a>. Die Bestell- und Lieferbedingungen finden Sie auf{" "}
            <a href={site.url} target="_blank" rel="noopener">
              catering-schulze.de
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="h3">Nachricht schreiben</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
