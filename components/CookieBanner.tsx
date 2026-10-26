"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "schulze-cookie-consent";

export interface Consent {
  necessary: true;
  /** Für spätere Erweiterungen (z. B. Statistik, eingebettete Karten). Aktuell werden keine solchen Dienste geladen. */
  optional: boolean;
  savedAt: string;
}

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [optional, setOptional] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setOpen(true);
    else setOptional(existing.optional);

    const reopen = () => {
      setOptional(readConsent()?.optional ?? false);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  function save(value: boolean) {
    const consent: Consent = { necessary: true, optional: value, savedAt: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(consent));
    } catch {
      /* Speicher blockiert – Banner trotzdem schließen */
    }
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: consent }));
    setOpen(false);
    setDetails(false);
  }

  if (!open) return null;

  return (
    <div className="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <h2 id="cookie-title">Cookies und Datenschutz</h2>
      <p>
        Diese Seite nutzt nur technisch notwendige Speicherung. Weitere Dienste laden wir erst, wenn Sie zustimmen.
        Mehr dazu in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>

      {details && (
        <fieldset className="cookie-details">
          <legend className="sr-only">Auswahl</legend>
          <label className="check">
            <input type="checkbox" checked disabled />
            <span>
              <strong>Notwendig</strong> – speichert Ihre Cookie-Entscheidung und die Auswahl Ihrer Anfrage.
            </span>
          </label>
          <label className="check">
            <input type="checkbox" checked={optional} onChange={(e) => setOptional(e.target.checked)} />
            <span>
              <strong>Komfort und Statistik</strong> – aktuell nicht im Einsatz, für spätere Erweiterungen vorgesehen.
            </span>
          </label>
        </fieldset>
      )}

      <div className="cookie-actions">
        <button type="button" className="btn btn-ghost" onClick={() => save(false)}>
          Nur notwendige
        </button>
        {details ? (
          <button type="button" className="btn btn-ghost" onClick={() => save(optional)}>
            Auswahl speichern
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={() => setDetails(true)}>
            Einstellungen
          </button>
        )}
        <button type="button" className="btn" onClick={() => save(true)}>
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}
