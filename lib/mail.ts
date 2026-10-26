import nodemailer from "nodemailer";

interface MailInput {
  subject: string;
  text: string;
  /** Empfänger. Ohne Angabe geht die Mail an MAIL_TO (also an euch). */
  to?: string;
  replyTo?: string;
  /** Für automatische Antworten, z. B. Bestätigungsmails */
  auto?: boolean;
}

/**
 * Versendet eine E-Mail per SMTP. Ohne SMTP_HOST wird die Nachricht
 * nur in der Server-Konsole ausgegeben (praktisch für die Entwicklung).
 */
export async function sendMail({ subject, text, to, replyTo, auto }: MailInput): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
  const recipient = to ?? MAIL_TO ?? "email@catering-schulze.de";

  if (!SMTP_HOST) {
    console.log("\n--- [DEV] E-Mail (SMTP nicht konfiguriert) ---");
    console.log("An:", recipient);
    console.log("Betreff:", subject);
    console.log(text);
    console.log("--- Ende ---\n");
    return;
  }

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: MAIL_FROM ?? SMTP_USER,
    to: recipient,
    replyTo,
    subject,
    text,
    headers: auto ? { "Auto-Submitted": "auto-generated" } : undefined,
  });
}

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length < 200;
}

export function clean(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.replace(/\r/g, "").trim().slice(0, max) : "";
}