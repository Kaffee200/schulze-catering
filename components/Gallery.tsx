import Image from "next/image";
import { galerie } from "@/data/photos";

export default function Gallery() {
  if (galerie.length === 0) return null;

  return (
    <section className="section" aria-labelledby="galerie-h">
      <div className="container">
        <h2 id="galerie-h" className="section-title">
          Einblicke
        </h2>
        <ul className="gallery">
          {galerie.map((p, i) => (
            <li key={p.src} className={i === 0 ? "gallery-wide" : undefined}>
              <figure>
                <div className="gallery-frame">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 33vw"}
                  />
                </div>
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
