import Image from "next/image";
import Link from "next/link";
import { allItems, catalog, formatPrice, mengenempfehlungen } from "@/data/catalog";
import { site } from "@/data/site";
import Gallery from "@/components/Gallery";

const picks = [
  "Hochzeitssuppe",
  "Kesselgulasch",
  "Putenrollbraten",
  "Gedünstetes Lachsfilet auf Blattspinat",
  "Canapees II",
  "Steirischer Rindfleischsalat im Glas",
  "Herrencreme",
]
  .map((name) => allItems.find((i) => i.name === name))
  .filter((i): i is NonNullable<typeof i> => Boolean(i));

const bereiche = [
  { slug: "kalte-platten", text: "Schlachteplatte, Aufschnitt, Käse und Fisch – nach Gewicht, für Büfett oder Platte." },
  { slug: "canapees", text: "Der kleine exklusive Happen für den Empfang, in drei Preisstufen." },
  { slug: "aus-dem-ofen", text: "Braten, Lasagne und Aufläufe, ab 8 Portionen." },
  { slug: "topf-und-pfanne", text: "Geschnetzeltes, Gulasch, Schnitzel und Lachs, dazu vegane Pfannengerichte." },
  { slug: "eintoepfe", text: "Soljanka, Kesselgulasch und Kichererbseneintopf, je ca. 300 ml pro Portion." },
  { slug: "spiesse-und-desserts", text: "Spieße zum Naschen und Desserts im Glas." },
];

const schritte = [
  { title: "Anfrage senden", text: "Speisen aus dem Katalog wählen, Termin und Personenzahl angeben. Auch eine formlose Nachricht genügt." },
  { title: "Angebot erhalten", text: "Wir melden uns mit einem Angebot und besprechen Mengen, Allergien und Sonderwünsche." },
  { title: "Genießen", text: "Wir liefern oder Sie holen ab. Geschirr, Gläser und Besteck können Sie bei uns leihen." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Catering aus Halle für Feiern, Empfänge und Firmenevents</h1>
            <p className="lead">
              Büfetts, Kalte Platten, Canapees und Menüs – frisch zubereitet in unserer Produktion in der Ernst-Toller-Straße.
              Vegetarisch und vegan auf Wunsch.
            </p>
            <div className="hero-actions">
              <Link href="/anfrage" className="btn">
                Catering anfragen
              </Link>
              <a href="/katalog/Angebot-Schulze-Catering-2026.pdf" className="btn btn-ghost" target="_blank" rel="noopener">
                Katalog als PDF
              </a>
            </div>
          </div>

          <aside className="menucard" aria-label="Auszug aus dem Katalog">
            <h2>Aus unserem Katalog</h2>
            <ul>
              {picks.map((i) => (
                <li key={i.id}>
                  <span className="mc-name">{i.name}</span>
                  <span className="mc-dots" aria-hidden="true" />
                  <span className="mc-price">{formatPrice(i.price, i.unit)}</span>
                </li>
              ))}
            </ul>
            <p className="mc-foot">Alle Preise inkl. 7 % MwSt. · {catalog.reduce((n, c) => n + c.items.length, 0)} Positionen im Katalog</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Was wir für Ihren Anlass bringen</h2>
          <ul className="areas">
            {bereiche.map((b) => {
              const cat = catalog.find((c) => c.slug === b.slug)!;
              return (
                <li key={b.slug}>
                  <Link href={`/anfrage?kategorie=${b.slug}#auswahl`}>
                    <span className="area-title">{cat.title}</span>
                    <span className="area-text">{b.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Gallery />    
      <section className="section section-tint">
        <div className="container split">
          <figure className="photo">
            <Image
              src="/images/logo-banner.jpg"
              alt="Geräucherter Lachs und Forelle, garniert mit Dill – Schulze Catering"
              width={908}
              height={202}
              priority={false}
            />
            <figcaption>Fischplatte, Lachs und Forelle – Platten berechnen wir nach Gewicht.</figcaption>
          </figure>
          <div>
            <h2 className="section-title">So viel brauchen Sie pro Person</h2>
            <dl className="rules">
              {mengenempfehlungen.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.text}</dd>
                </div>
              ))}
            </dl>
            <p>Canapees empfehlen wir mit 5 Stück pro Person.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Von der Anfrage bis zum Büfett</h2>
          <ol className="steps">
            {schritte.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container split">
          <div>
            <h2 className="section-title">Vegan, vegetarisch, glutenfrei</h2>
            <p>
              Im Katalog sind alle Speisen markiert, die vegan oder vegetarisch erhältlich sind. Chili sin Carne und die vegane
              Sauce Bolognese gibt es auch glutenfrei. Bei Allergien und Unverträglichkeiten gehen wir gern auf Ihre
              Bedingungen ein.
            </p>
            <Link href="/anfrage#auswahl" className="btn btn-ghost">
              Auswahl ansehen
            </Link>
          </div>
          <div>
            <h2 className="section-title">Wir bringen noch mehr</h2>
            <p>
              Nicht das Passende gefunden? Sprechen Sie uns an. Auf Wunsch leihen Sie bei uns auch Geschirr, Gläser und Besteck.
              Kuchen für Ihr Dessertbuffet beraten wir gern.
            </p>
            <p>
              <a href={`tel:${site.telHref}`}>{site.tel}</a>
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <h2>Wann feiern Sie?</h2>
          <Link href="/anfrage" className="btn btn-light">
            Anfrage starten
          </Link>
        </div>
      </section>
    </>
  );
}
