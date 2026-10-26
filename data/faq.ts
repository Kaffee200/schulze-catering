/**
 * Häufige Fragen. Hier pflegen: Gruppe oder Frage ergänzen, Text anpassen.
 * Nur Antworten eintragen, die stimmen – sie erscheinen auch in den Suchergebnissen von Google.
 *
 * Vorlage für einen neuen Eintrag:
 *   { q: "Frage?", a: ["Erster Absatz.", "Zweiter Absatz (optional)."] },
 */

export interface FaqItem {
  q: string;
  a: string[];
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const faq: FaqGroup[] = [
  {
    title: "Mengen und Portionen",
    items: [
      {
        q: "Wie viel sollte ich pro Person bestellen?",
        a: [
          "Für Büfetts (kalt und warm) empfehlen wir 500 bis 600 g pro Person, für Kalte Platten 180 bis 250 g pro Person, jeweils zuzüglich Brot, Brötchen und Butter.",
          "Für Menüs rechnen Sie mit 180 g Fleisch pro Person, zuzüglich Gemüse- und Sättigungsbeilagen. Canapees empfehlen wir mit 5 Stück pro Person.",
        ],
      },
      {
        q: "Was ist eine Portion?",
        a: [
          "Bei Speisen „Aus dem Ofen“ sind das, wenn nicht anders angegeben, ca. 180 g Rohgewicht. Bei Speisen „Aus Topf und Pfanne“ sind es ca. 150 g Fleischeinwaage (Rohgewicht).",
          "Eintöpfe und Suppen rechnen wir mit ca. 300 ml pro Portion, Gemüsebeilagen mit ca. 200 g. Aufläufe und Gratins kommen im Blech (30 × 50 cm), das für ca. 10 Personen reicht.",
        ],
      },
      {
        q: "Gibt es Mindestmengen?",
        a: [
          "Gerichte „Aus dem Ofen“ und „Aus Topf und Pfanne“ bereiten wir ab 8 Portionen zu. Feinkostsalate im Glas, Spieße und Desserts im Glas bestellen Sie ab 8 Stück je Sorte.",
          "Belegte halbe Brötchen gibt es ab 4 Stück pro Sorte, Hackepeter-Brötchen ab 10 Stück. Weitere Mindestmengen stehen direkt beim jeweiligen Gericht im Katalog, zum Beispiel bei den gebackenen Gemüse-Köttbullar (ab 25 Stück) oder den gefüllten Eiern (ab 10 Stück).",
        ],
      },
    ],
  },
  {
    title: "Ernährung und Allergien",
    items: [
      {
        q: "Haben Sie vegetarische und vegane Gerichte?",
        a: [
          "Ja. Im Katalog sind alle Speisen markiert, die vegetarisch oder vegan erhältlich sind. In der Anfrage können Sie danach filtern.",
          "Hausgemachte Tomaten- und Kräuterbutter gibt es auch vegan, die Rote Grütze mit Hafer-Vanille-Soße. Chili sin Carne und die vegane Sauce Bolognese sind auf Wunsch auch glutenfrei möglich.",
        ],
      },
      {
        q: "Was gilt bei Allergien und Unverträglichkeiten?",
        a: [
          "Sind bei Ihren Gästen Nahrungsmittelunverträglichkeiten oder Allergien zu beachten, gehen wir gern auf Ihre speziellen Bedingungen und Vorstellungen ein.",
          "Bitte nennen Sie uns diese schon bei der Anfrage, am einfachsten im Nachrichtenfeld. Die Pannacotta enthält Gelatine.",
        ],
      },
    ],
  },
  {
    title: "Anfrage und Preise",
    items: [
      {
        q: "Wie läuft eine Anfrage ab?",
        a: [
          "Sie wählen Speisen aus dem Katalog, nennen Termin und Personenzahl und senden die Anfrage ab. Sie erhalten eine Bestätigung per E-Mail.",
          "Danach melden wir uns mit einem Angebot und besprechen Mengen, Allergien und Sonderwünsche mit Ihnen. Auch eine formlose Nachricht ohne Katalogauswahl genügt.",
        ],
      },
      {
        q: "Sind die Preise im Katalog verbindlich?",
        a: [
          "Alle Preise sind inklusive 7 % Mehrwertsteuer. Der Richtwert in der Anfrage ist eine unverbindliche Orientierung ohne Lieferung. Das verbindliche Angebot erhalten Sie von uns.",
        ],
      },
      {
        q: "Wo finde ich die Bestell- und Lieferbedingungen?",
        a: ["Die Bestell- und Lieferbedingungen finden Sie auf www.catering-schulze.de."],
      },
      {
        q: "Ich finde das Passende nicht im Katalog. Was nun?",
        a: [
          "Sprechen Sie uns bitte an. Auch Kuchen für Ihr Dessertbuffet beraten wir gern.",
        ],
      },
    ],
  },
  {
    title: "Service und Kontakt",
    items: [
      {
        q: "Kann ich Geschirr, Gläser und Besteck leihen?",
        a: [
          "Ja, auf Wunsch leihen Sie bei uns Geschirr, Gläser und Besteck. Bitte beachten Sie, dass dabei bezüglich der Mehrwertsteuer Vorgaben des Gesetzgebers gelten. Fragen Sie uns nach den Details.",
        ],
      },
      {
        q: "Kann ich bei Ihnen vorbeikommen?",
        a: [
          "Unsere Produktion finden Sie in der Ernst-Toller-Straße 11 in 06110 Halle (Saale). Bitte sehen Sie von spontanen Besuchen ohne telefonische Absprache ab und rufen Sie vorher an: (0345) 202 11 42.",
        ],
      },
    ],
  },
];

export const faqItems: FaqItem[] = faq.flatMap((g) => g.items);
