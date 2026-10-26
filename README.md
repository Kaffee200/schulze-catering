# Schulze Catering – Webseite

Next.js (App Router) · React · TypeScript. Läuft in Visual Studio Code.

## Start

```bash
npm install
cp .env.example .env.local   # SMTP-Zugang eintragen (optional für die Entwicklung)
npm run dev                   # http://localhost:3000
```

Ohne SMTP-Daten werden Anfragen im Terminal ausgegeben statt per E-Mail verschickt.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `app/layout.tsx` | `html` → `body` → Header, `main`, Footer, Cookie-Banner |
| `app/page.tsx` | Startseite |
| `app/anfrage/page.tsx` | Catering Anfrage mit Katalogauswahl |
| `app/kontakt/page.tsx` | Kontakt und Formular |
| `app/impressum`, `app/datenschutz` | Rechtstexte (Vorlagen, bitte ausfüllen) |
| `app/api/anfrage`, `app/api/kontakt` | Mailversand per SMTP (nodemailer) |
| `components/Header.tsx` | Menü, Untermenü „Aus dem Katalog anfragen“ |
| `components/InquiryForm.tsx` | Auswahl aus dem Katalog, Mengen, Richtwert, Formular |
| `components/CookieBanner.tsx` | Cookie-Banner, speichert die Entscheidung im Browser |
| `data/catalog.ts` | **Katalog mit allen Preisen** – hier pflegen |
| `data/site.ts` | Adresse, Telefon, Menüpunkte |
| `public/katalog/` | PDF-Katalog zum Download |

## Katalog pflegen

In `data/catalog.ts` Zeilen ergänzen oder Preise ändern. Menü, Auswahl und Startseite passen sich automatisch an.

## Vor dem Livegang

1. Impressum und Datenschutz ausfüllen und prüfen lassen.
2. `public/images/logo-banner.jpg` durch hochauflösende Fotos und ein freigestelltes Logo (SVG/PNG) ersetzen, dann `components/Logo.tsx` anpassen.
3. SMTP-Zugang in den Umgebungsvariablen des Hosters hinterlegen.
4. Optional: Spam-Schutz (z. B. Rate-Limit oder CAPTCHA) vor die API-Routen setzen.

## Deployment

`npm run build && npm start` oder z. B. auf Vercel. Umgebungsvariablen aus `.env.example` im Hosting eintragen.
