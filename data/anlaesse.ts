import { allItems, type CatalogItem } from "@/data/catalog";

export interface Anlass {
  slug: string;
  title: string;
  /** Kurztitel für Listen und Menü */
  short: string;
  intro: string;
  /** Titel und Beschreibung für Suchmaschinen */
  metaDescription: string;
  /** Wert im Feld „Anlass“ des Anfrageformulars (leer = keine Vorauswahl) */
  formValue: string;
  /** Katalogkategorie, die die Anfrage-Seite zuerst zeigt */
  category: string;
  paragraphs: string[];
  /** Namen exakt wie in data/catalog.ts */
  picks: string[];
  tips: { title: string; text: string }[];
}

export const anlaesse: Anlass[] = [
  {
    slug: "buffet",
    title: "Büfett für Ihre Feier",
    short: "Büfett",
    intro: "Warm und kalt, nach Gewicht und Portion: Stellen Sie Ihr Büfett aus dem Katalog zusammen.",
    metaDescription:
      "Büfett-Catering in Halle (Saale): warme Gerichte, Kalte Platten, Salate und Desserts von Schulze Catering. Jetzt Büfett anfragen.",
    formValue: "",
    category: "aus-dem-ofen",
    paragraphs: [
      "Ein Büfett lebt von der Mischung: ein Braten oder Auflauf aus dem Ofen, dazu Salate, Beilagen und etwas Süßes zum Schluss. Alle Speisen finden Sie mit Preisen im Katalog, Sie wählen und wir erstellen Ihnen ein Angebot.",
      "Warme Gerichte aus dem Ofen und aus Topf und Pfanne bereiten wir ab 8 Portionen zu. Aufläufe und Gratins kommen im Blech (30 × 50 cm), das für ca. 10 Personen reicht.",
    ],
    picks: [
      "Putenrollbraten",
      "Saftiger Schweinekammbraten",
      "Lasagne",
      "Gemüse-Lasagne",
      "Rosmarinkartoffeln",
      "Marktgemüse",
      "Klassischer Kartoffelsalat",
      "Gartensalat in Essig-Öl-Marinade",
      "Gemischte Aufschnittplatte",
      "Brotsortiment",
      "Rote Grütze mit Vanillesoße",
    ],
    tips: [
      { title: "Menge pro Person", text: "Für Büfetts (kalt und warm) empfehlen wir 500 bis 600 g pro Person, zuzüglich Brot, Brötchen und Butter." },
      { title: "Vegetarisch und vegan", text: "Im Katalog sind alle Speisen markiert, die vegetarisch oder vegan erhältlich sind. Sie können danach filtern." },
      { title: "Geschirr leihen", text: "Auf Wunsch leihen Sie bei uns Geschirr, Gläser und Besteck. Fragen Sie uns nach den Details." },
    ],
  },
  {
    slug: "firmenfeier",
    title: "Catering für Firmenfeiern und Empfänge",
    short: "Firmenfeier",
    intro: "Canapees, belegte Brötchen und Platten für Meetings, Jubiläen und Empfänge.",
    metaDescription:
      "Catering für Firmenfeiern, Empfänge und Tagungen in Halle (Saale): Canapees, belegte Brötchen, Kalte Platten und Suppen von Schulze Catering.",
    formValue: "Firmenfeier",
    category: "canapees",
    paragraphs: [
      "Für Empfänge und Betriebsfeiern eignen sich Speisen, die man gut im Stehen essen kann: Canapees, belegte halbe Brötchen, Spieße und Platten. Für kältere Tage gibt es Eintöpfe und Suppen, für den kleinen Hunger Miniaturen wie Partybulette oder Hähnchenspieße.",
      "Die Canapees gibt es in drei Preisstufen, der Belag reicht von Baguettesalami bis Räucherlachs, auch mit veganem Aufstrich. Belegte Brötchen bestellen Sie ab 4 Stück pro Sorte.",
    ],
    picks: [
      "Canapees I",
      "Canapees II",
      "Belegte halbe Brötchen",
      "Gemischte Aufschnittplatte",
      "Käseplatte Standard",
      "Fischplatte Standard",
      "Hähnchenspieß Sweet Pepper",
      "Mediterraner Nudelsalat",
      "Gemüsesticks mit Kräuterquark",
      "Soljanka",
      "Obstplatte Fingerfood",
    ],
    tips: [
      { title: "Canapees für den Empfang", text: "Wir empfehlen 5 Stück pro Person." },
      { title: "Kalte Platten", text: "Rechnen Sie mit 180 bis 250 g pro Person, zuzüglich Brot, Brötchen und Butter." },
      { title: "Allergien im Team", text: "Sind Unverträglichkeiten oder Allergien zu beachten, gehen wir gern auf Ihre Bedingungen ein. Schreiben Sie es einfach ins Nachrichtenfeld." },
    ],
  },
  {
    slug: "hochzeit",
    title: "Catering für Ihre Hochzeit",
    short: "Hochzeit",
    intro: "Vom Empfang mit Canapees bis zum Dessertbuffet: Wir stellen Ihr Hochzeitsmenü mit Ihnen zusammen.",
    metaDescription:
      "Hochzeitscatering in Halle (Saale): Hochzeitssuppe, Braten, Canapees, Platten und Desserts von Schulze Catering. Jetzt anfragen.",
    formValue: "Hochzeit",
    category: "aus-dem-ofen",
    paragraphs: [
      "Für den Empfang passen Canapees, zur Feier ein Menü oder ein Büfett. Klassisch beginnt es mit einer Hochzeitssuppe, danach folgen zum Beispiel ein zarter Braten mit Beilagen und zum Abschluss ein Dessert im Glas.",
      "Sie haben besondere Wünsche oder möchten Kuchen auf Ihrem Dessertbuffet? Sprechen Sie uns an, wir beraten Sie gern.",
    ],
    picks: [
      "Canapees III",
      "Hochzeitssuppe",
      "Falsches Filet",
      "Keule vom jungen Weideschaf in Thymianjus",
      "Andalusisches Schweinefilet",
      "Rosmarinkartoffeln",
      "Mediterranes Pfannengemüse",
      "Mediterrane Aufschnittplatte",
      "Exklusive Fischvariationen",
      "Pannacotta mit Erdbeersoße",
      "Herrencreme",
    ],
    tips: [
      { title: "Menge beim Menü", text: "Für Menüs rechnen Sie mit 180 g Fleisch pro Person, zuzüglich Gemüse- und Sättigungsbeilagen." },
      { title: "Empfang", text: "Canapees empfehlen wir mit 5 Stück pro Person." },
      { title: "Vegetarische und vegane Gäste", text: "Viele Gerichte gibt es auch vegetarisch oder vegan, zum Beispiel Gemüse-Lasagne, Gemüsecurry oder Chili sin Carne." },
    ],
  },
];

export function getAnlass(slug: string): Anlass | undefined {
  return anlaesse.find((a) => a.slug === slug);
}

export function picksFor(anlass: Anlass): CatalogItem[] {
  return anlass.picks
    .map((name) => allItems.find((i) => i.name === name))
    .filter((i): i is CatalogItem => Boolean(i));
}
