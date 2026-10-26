"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), consent: fd.get("consent") === "on" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Senden fehlgeschlagen.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Senden fehlgeschlagen.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="notice notice-ok" role="status">
        <h2>Nachricht gesendet.</h2>
        <p>Wir melden uns so schnell wie möglich bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form-grid">
        <label className="field">
          <span>Name *</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span>E-Mail *</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="field field-wide">
          <span>Telefon</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="field field-wide">
          <span>Nachricht *</span>
          <textarea name="message" rows={6} required />
        </label>
      </div>
      <div className="hp" aria-hidden="true">
        <label>
          Webseite <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>
          Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und bin mit der Verarbeitung meiner
          Angaben zur Beantwortung einverstanden. *
        </span>
      </label>
      {status === "error" && (
        <p className="notice notice-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
        </button>
      </div>
    </form>
  );
}
