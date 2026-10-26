import type { Metadata } from "next";
import Link from "next/link";
import { faq, faqItems } from "@/data/faq";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Antworten zu Mengen, Portionen, Mindestmengen, vegetarischen und veganen Speisen, Allergien und Geschirr leihen bei Schulze Catering in Halle (Saale).",
};

export default function FaqPage() {
  // Strukturierte Daten für Suchmaschinen. "<" wird maskiert, damit nichts den Script-Block verlassen kann.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a.join(" ") },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <div className="container page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="page-head">
        <h1>Häufige Fragen</h1>
        <p className="lead">Mengen, Allergien, Geschirr und mehr. Hier finden Sie die Antworten auf die häufigsten Fragen.</p>
      </header>

      <div className="faq">
        {faq.map((group) => (
          <section key={group.title} aria-labelledby={`faq-${group.title}`}>
            <h2 id={`faq-${group.title}`} className="h3">
              {group.title}
            </h2>
            {group.items.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="faq-answer">
                  {item.a.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </section>
        ))}
      </div>

      <aside className="faq-more">
        <h2 className="h3">Ihre Frage ist nicht dabei?</h2>
        <p>
          Rufen Sie uns an unter <a href={`tel:${site.telHref}`}>{site.tel}</a> oder schreiben Sie uns über das{" "}
          <Link href="/kontakt">Kontaktformular</Link>.
        </p>
        <Link href="/anfrage" className="btn">
          Catering anfragen
        </Link>
      </aside>
    </div>
  );
}
