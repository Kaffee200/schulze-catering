"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  catalog,
  defaultQty,
  eur,
  formatPrice,
  formatQty,
  itemsById,
  stepFor,
  type CatalogItem,
  type Diet,
} from "@/data/catalog";

const STORAGE_KEY = "schulze-anfrage-auswahl";

type Selection = Record<string, number>;
type Status = "idle" | "sending" | "done" | "error";

function round(n: number) {
  return Math.round(n * 100) / 100;
}

export default function InquiryForm({
  initialCategory,
  initialOccasion,
}: {
  initialCategory?: string;
  initialOccasion?: string;
}) {
  const firstSlug = catalog.some((c) => c.slug === initialCategory) ? (initialCategory as string) : catalog[0].slug;
  const [active, setActive] = useState(firstSlug);
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<"alle" | Diet>("alle");
  const [selection, setSelection] = useState<Selection>({});
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Auswahl aus dem Browser wiederherstellen
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSelection(JSON.parse(raw));
    } catch {
      /* ignorieren */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (initialCategory && catalog.some((c) => c.slug === initialCategory)) setActive(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {
      /* ignorieren */
    }
  }, [selection, loaded]);

  const category = catalog.find((c) => c.slug === active) ?? catalog[0];
  const searching = query.trim().length > 0;

  const visible: (CatalogItem & { category?: string })[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = searching
      ? catalog.flatMap((c) => c.items.map((i) => ({ ...i, category: c.title })))
      : category.items;
    return pool.filter((i) => {
      if (diet === "vegan" && i.diet !== "vegan") return false;
      if (diet === "vegetarisch" && i.diet !== "vegan" && i.diet !== "vegetarisch") return false;
      if (q && !`${i.name} ${i.desc ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, diet, category, searching]);

  const chosen = Object.entries(selection)
    .map(([id, qty]) => ({ item: itemsById[id], qty }))
    .filter((x) => x.item && x.qty > 0);
  const total = chosen.reduce((sum, x) => sum + x.item.price * x.qty, 0);

  function setQty(item: CatalogItem, qty: number) {
    setSelection((prev) => {
      const next = { ...prev };
      if (!Number.isFinite(qty) || qty <= 0) delete next[item.id];
      else next[item.id] = round(qty);
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(fd.entries()),
      consent: fd.get("consent") === "on",
      selection,
    };
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Senden fehlgeschlagen.");
      setStatus("done");
      setSelection({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignorieren */
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Senden fehlgeschlagen.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="notice notice-ok" role="status">
        <h2>Danke, Ihre Anfrage ist bei uns.</h2>
        <p>
          Wir melden uns mit einem Angebot per E-Mail oder Telefon. Bei Rückfragen erreichen Sie uns unter{" "}
          <a href="tel:+493452021142">(0345) 202 11 42</a>.
        </p>
        <Link className="btn" href="/">
          Zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <>
      <section id="auswahl" className="picker" aria-labelledby="auswahl-h">
        <div className="picker-head">
          <h2 id="auswahl-h">1. Speisen aus dem Katalog wählen</h2>
          <p>
            Alles optional: Sie können auch nur Ihre Wünsche beschreiben. Die Auswahl ist ein Richtwert, das verbindliche
            Angebot erhalten Sie von uns.
          </p>
        </div>

        <div className="picker-layout">
          <div className="picker-main">
            <div className="picker-tools">
              <label className="field">
                <span>Suchen</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="z. B. Lachs, Gulasch, Tiramisu"
                />
              </label>
              <label className="field">
                <span>Ernährung</span>
                <select value={diet} onChange={(e) => setDiet(e.target.value as "alle" | Diet)}>
                  <option value="alle">Alle Gerichte</option>
                  <option value="vegetarisch">Vegetarisch (inkl. vegan)</option>
                  <option value="vegan">Vegan</option>
                </select>
              </label>
            </div>

            <div className="tabs" role="tablist" aria-label="Katalogkategorien">
              {catalog.map((c) => {
                const count = c.items.filter((i) => selection[i.id]).length;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    role="tab"
                    id={`tab-${c.slug}`}
                    aria-selected={!searching && c.slug === active}
                    aria-controls="panel"
                    className="tab"
                    onClick={() => {
                      setQuery("");
                      setActive(c.slug);
                    }}
                  >
                    {c.title}
                    {count > 0 && <span className="tab-badge">{count}</span>}
                  </button>
                );
              })}
            </div>

            <div id="panel" role="tabpanel" aria-labelledby={`tab-${category.slug}`} className="panel">
              {!searching && category.note && <p className="panel-note">{category.note}</p>}
              {searching && <p className="panel-note">Suchergebnisse in allen Kategorien</p>}

              {visible.length === 0 ? (
                <p className="empty">
                  Nichts gefunden. Passen Sie Suche oder Filter an – oder beschreiben Sie Ihren Wunsch im Textfeld unten, wir
                  beraten Sie gern.
                </p>
              ) : (
                <ul className="items">
                  {visible.map((item) => {
                    const qty = selection[item.id] ?? 0;
                    const step = stepFor(item.unit);
                    return (
                      <li key={item.id} className="item" data-selected={qty > 0}>
                        <div className="item-text">
                          <p className="item-name">
                            {item.name}
                            {item.diet && <span className={`diet diet-${item.diet}`}>{item.diet}</span>}
                          </p>
                          {item.desc && <p className="item-desc">{item.desc}</p>}
                          {item.category && <p className="item-desc">{item.category}</p>}
                        </div>
                        <p className="item-price">{formatPrice(item.price, item.unit)}</p>
                        <div className="item-action">
                          {qty === 0 ? (
                            <button type="button" className="btn btn-small btn-ghost" onClick={() => setQty(item, defaultQty(item.unit))}>
                              Hinzufügen
                            </button>
                          ) : (
                            <div className="stepper" role="group" aria-label={`Menge ${item.name}`}>
                              <button type="button" onClick={() => setQty(item, qty - step)} aria-label="Weniger">
                                −
                              </button>
                              <input
                                type="number"
                                inputMode="decimal"
                                min={0}
                                step={step}
                                value={qty}
                                onChange={(e) => setQty(item, Number(e.target.value))}
                                aria-label={`Menge in ${item.unit}`}
                              />
                              <button type="button" onClick={() => setQty(item, qty + step)} aria-label="Mehr">
                                +
                              </button>
                            </div>
                          )}
                          {qty > 0 && <p className="item-qty">{formatQty(qty, item.unit)}</p>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <aside className="summary" aria-labelledby="summary-h">
            <h3 id="summary-h">Ihre Auswahl</h3>
            {chosen.length === 0 ? (
              <p className="empty">Noch nichts gewählt.</p>
            ) : (
              <>
                <ul className="summary-list">
                  {chosen.map(({ item, qty }) => (
                    <li key={item.id}>
                      <span>
                        {item.name}
                        <small>{formatQty(qty, item.unit)}</small>
                      </span>
                      <span className="summary-sum">{eur.format(item.price * qty)}</span>
                      <button type="button" className="icon-btn" onClick={() => setQty(item, 0)} aria-label={`${item.name} entfernen`}>
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="summary-total">
                  <span>Richtwert gesamt</span>
                  <strong>{eur.format(total)}</strong>
                </p>
                <p className="summary-hint">Inkl. 7 % MwSt., ohne Lieferung. Unverbindlich.</p>
                <button type="button" className="link-button" onClick={() => setSelection({})}>
                  Auswahl leeren
                </button>
              </>
            )}
            <a className="btn btn-small summary-go" href="#angaben">
              Weiter zu Ihren Angaben
            </a>
          </aside>
        </div>
      </section>

      <section id="angaben" className="details" aria-labelledby="angaben-h">
        <h2 id="angaben-h">2. Ihre Angaben</h2>
        <form onSubmit={onSubmit} className="form" noValidate={false}>
          <div className="form-grid">
            <label className="field">
              <span>Name *</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span>E-Mail *</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label className="field">
              <span>Telefon</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label className="field">
              <span>Anlass</span>
              <select name="occasion" defaultValue={initialOccasion ?? ""}>
                <option value="">Bitte wählen</option>
                <option>Geburtstag</option>
                <option>Hochzeit</option>
                <option>Firmenfeier</option>
                <option>Empfang</option>
                <option>Trauerfeier</option>
                <option>Sonstiges</option>
              </select>
            </label>
            <label className="field">
              <span>Datum der Veranstaltung</span>
              <input name="date" type="date" />
            </label>
            <label className="field">
              <span>Uhrzeit</span>
              <input name="time" type="time" />
            </label>
            <label className="field">
              <span>Personenzahl</span>
              <input name="guests" type="number" min={1} inputMode="numeric" />
            </label>
            <label className="field">
              <span>Lieferung oder Abholung</span>
              <select name="delivery" defaultValue="">
                <option value="">Noch offen</option>
                <option>Lieferung</option>
                <option>Abholung</option>
              </select>
            </label>
            <label className="field field-wide">
              <span>Veranstaltungsort (Adresse)</span>
              <input name="location" autoComplete="street-address" />
            </label>
            <label className="field field-wide">
              <span>Nachricht</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Allergien, Unverträglichkeiten, Geschirr und Besteck zum Leihen, besondere Wünsche …"
              />
            </label>
          </div>

          {/* Honeypot gegen Spam: für Besucher unsichtbar */}
          <div className="hp" aria-hidden="true">
            <label>
              Webseite <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <label className="check">
            <input type="checkbox" name="consent" required />
            <span>
              Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und bin einverstanden, dass meine
              Angaben zur Bearbeitung der Anfrage gespeichert und verarbeitet werden. *
            </span>
          </label>

          {status === "error" && (
            <p className="notice notice-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button type="submit" className="btn" disabled={status === "sending"}>
              {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
            </button>
            <p className="form-hint">
              {chosen.length > 0 ? `${chosen.length} Position${chosen.length === 1 ? "" : "en"} aus dem Katalog gewählt.` : "Ohne Katalogauswahl, nur mit Ihrer Nachricht."}
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
