import { NextResponse } from "next/server";
import { clean, isEmail, sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  const message = clean(body.message, 3000);

  if (!name || !isEmail(email) || !message || body.consent !== true) {
    return NextResponse.json(
      { error: "Bitte Name, gültige E-Mail-Adresse, Nachricht und die Datenschutz-Einwilligung angeben." },
      { status: 422 }
    );
  }

  try {
    await sendMail({
      subject: `Kontaktnachricht von ${name}`,
      replyTo: email,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "–"}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mailversand fehlgeschlagen", err);
    return NextResponse.json(
      { error: "Die Nachricht konnte gerade nicht gesendet werden. Bitte rufen Sie uns an: (0345) 202 11 42." },
      { status: 500 }
    );
  }
}
