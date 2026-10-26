import { NextResponse } from "next/server";
import { clean, isEmail, sendMail } from "@/lib/mail";
import { formatQty, itemsById, eur } from "@/data/catalog";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: echte Besucher lassen dieses Feld leer
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  const date = clean(body.date, 40);
  const time = clean(body.time, 40);
  const guests = clean(body.guests, 10);
  const location = clean(body.location, 300);
  const occasion = clean(body.occasion, 120);
  const delivery = clean(body.delivery, 60);
  const message = clean(body.message, 3000);

  if (!name || !isEmail(email) || body.consent !== true) {
    return NextResponse.json(
      { error: "Bitte Name, gültige E-Mail-Adresse und die Datenschutz-Einwilligung angeben." },
      { status: 422 }
    );
  }

  const selection = (typeof body.selection === "object" && body.selection ? body.selection : {}) as Record<string, unknown>;
  let total = 0;
  const lines: string[] = [];
  for (const [id, rawQty] of Object.entries(selection)) {
    const item = itemsById[id];
    const qty = Number(rawQty);
    if (!item || !Number.isFinite(qty) || qty <= 0 || qty > 10000) continue;
    const sum = item.price * qty;
    total += sum;
    lines.push(`- ${item.name} (${item.category}): ${formatQty(qty, item.unit)} ≈ ${eur.format(sum)}`);
  }

  const text = [
    `Neue Catering-Anfrage über die Webseite`,
    ``,
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || "–"}`,
    ``,
    `Anlass: ${occasion || "–"}`,
    `Datum: ${date || "–"}   Uhrzeit: ${time || "–"}`,
    `Personenzahl: ${guests || "–"}`,
    `Ort: ${location || "–"}`,
    `Lieferung/Abholung: ${delivery || "–"}`,
    ``,
    `Gewählte Speisen aus dem Katalog:`,
    lines.length ? lines.join("\n") : "(keine Auswahl)",
    lines.length ? `\nRichtwert (unverbindlich, inkl. 7 % MwSt.): ${eur.format(total)}` : "",
    ``,
    `Nachricht:`,
    message || "–",
  ].join("\n");

    // 1. Anfrage an euch. Scheitert das, bekommt der Kunde eine Fehlermeldung.
  try {
    await sendMail({ subject: `Catering-Anfrage von ${name}`, text, replyTo: email });
  } catch (err) {
    console.error("Mailversand fehlgeschlagen", err);
    return NextResponse.json(
      { error: "Die Anfrage konnte gerade nicht gesendet werden. Bitte rufen Sie uns an: (0345) 202 11 42." },
      { status: 500 }
    );
  }

  // 2. Bestätigung an den Kunden. Ein Fehler hier darf die Anfrage nicht scheitern lassen.
  try {
    const confirmation = [
      `Guten Tag ${name},`,
      ``,
      `vielen Dank für Ihre Catering-Anfrage. Wir haben sie erhalten und melden uns mit einem Angebot bei Ihnen.`,
      ``,
      `Ihre Angaben:`,
      occasion ? `Anlass: ${occasion}` : "",
      date ? `Datum: ${date}${time ? `, ${time} Uhr` : ""}` : "",
      guests ? `Personenzahl: ${guests}` : "",
      location ? `Ort: ${location}` : "",
      delivery ? `Lieferung/Abholung: ${delivery}` : "",
      ``,
      lines.length ? `Ihre Auswahl aus dem Katalog:\n${lines.join("\n")}` : `Sie haben keine Speisen aus dem Katalog gewählt.`,
      lines.length
        ? `\nRichtwert: ${eur.format(total)} (inkl. 7 % MwSt., ohne Lieferung, unverbindlich). Das verbindliche Angebot erhalten Sie von uns.`
        : "",
      message ? `\nIhre Nachricht:\n${message}` : "",
      ``,
      `Rückfragen erreichen Sie unter (0345) 202 11 42 oder email@catering-schulze.de.`,
      ``,
      `Freundliche Grüße`,
      `Ihr Team von Schulze Catering`,
      `Ernst-Toller-Straße 11, 06110 Halle (Saale)`,
      ``,
      `Diese Nachricht wurde automatisch erstellt, weil Sie über catering-schulze.de eine Anfrage gesendet haben.`,
    ]
      .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
      .join("\n");

    await sendMail({
      to: email,
      subject: "Ihre Catering-Anfrage bei Schulze Catering",
      text: confirmation,
      replyTo: process.env.MAIL_TO ?? "email@catering-schulze.de",
      auto: true,
    });
  } catch (err) {
    console.error("Bestätigungsmail fehlgeschlagen", err);
  }

  return NextResponse.json({ ok: true });

}
