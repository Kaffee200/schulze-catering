import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { anlaesse, getAnlass, picksFor } from "@/data/anlaesse";
import { formatPrice } from "@/data/catalog";
import { anlassFotos } from "@/data/photos";

export function generateStaticParams() {
  return anlaesse.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAnlass(slug);
  if (!a) return {};
  return { title: a.short, description: a.metaDescription };
}

export default async function AnlassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anlass = getAnlass(slug);
  if (!anlass) notFound();

  const picks = picksFor(anlass);
  const foto = anlassFotos[anlass.slug];
  const query = new URLSearchParams({ kategorie: anlass.category });
  if (anlass.formValue) query.set("anlass", anlass.slug);
  const anfrageHref = `/anfrage?${query.toString()}#auswahl`;
  const others = anlaesse.filter((a) => a.slug !== anlass.slug);

  return (
    <div className="container page">
      <nav aria-label="Brotkrumen" className="crumbs">
        <Link href="/anlaesse">Anlässe</Link>
        <span aria-hidden="true">/</span>
        <span>{anlass.short}</span>
      </nav>

      <header className="page-head">
        <h1>{anlass.title}</h1>
        <p className="lead">{anlass.intro}</p>
        <p>
          <Link href={anfrageHref} className="btn">
            Jetzt anfragen
          </Link>
        </p>
      </header>

      {foto && (
        <figure className="anlass-photo">
          <Image src={foto.src} alt={foto.alt} fill priority sizes="(max-width: 1120px) 100vw, 1120px" />
        </figure>
      )}

      <div className="split split-top">
        <div className="prose">
          {anlass.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}

          <h2>Gut zu wissen</h2>
          <dl className="rules">
            {anlass.tips.map((t) => (
              <div key={t.title}>
                <dt>{t.title}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="menucard" aria-label={`Beliebte Speisen: ${anlass.short}`}>
          <h2>Passende Speisen</h2>
          <ul>
            {picks.map((i) => (
              <li key={i.id}>
                <span className="mc-name">{i.name}</span>
                <span className="mc-dots" aria-hidden="true" />
                <span className="mc-price">{formatPrice(i.price, i.unit)}</span>
              </li>
            ))}
          </ul>
          <p className="mc-foot">Alle Preise inkl. 7 % MwSt. Die komplette Auswahl sehen Sie in der Anfrage.</p>
          <p>
            <Link href={anfrageHref} className="btn btn-small">
              Speisen auswählen
            </Link>
          </p>
        </aside>
      </div>

      <section className="more" aria-labelledby="more-h">
        <h2 id="more-h" className="h3">
          Weitere Anlässe
        </h2>
        <ul className="more-list">
          {others.map((a) => (
            <li key={a.slug}>
              <Link href={`/anlaesse/${a.slug}`}>{a.short}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
