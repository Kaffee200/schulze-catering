/**
 * Fotos und Logo der Webseite.
 *
 * So geht's:
 *  1. Bilddatei nach public/images/ kopieren (z. B. public/images/galerie/buffet.jpg).
 *  2. Hier einen Eintrag ergänzen. Der Pfad beginnt mit /images/ (ohne "public").
 *  3. alt = kurze Beschreibung, was auf dem Foto zu sehen ist (wichtig für Barrierefreiheit und Google).
 *
 * Solange eine Liste leer ist, wird der jeweilige Bereich nicht angezeigt.
 */

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

/** Galerie auf der Startseite. Empfehlung: 3, 6 oder 9 Fotos, Querformat. Das erste wird groß dargestellt. */
export const galerie: Photo[] = [
   { src: "/images/galerie/buffet.jpg", alt: "Warmes und kaltes Büfett mit Braten und Salaten", caption: "Büfett für 60 Personen" },
   { src: "/images/galerie/canapees.jpg", alt: "Canapees mit Räucherlachs, Salami und Käse auf einer Platte" },
   { src: "/images/galerie/dessert.jpg", alt: "Desserts im Glas" },
];

/** Ein Foto je Anlass-Seite, Schlüssel = Adresse der Seite (buffet, firmenfeier, hochzeit). Breites Format, ab 1600 px. */
export const anlassFotos: Record<string, Photo> = {
   buffet: { src: "/images/anlaesse/buffet.jpg", alt: "Büfett mit Platten und Salaten" },
   firmenfeier: { src: "/images/anlaesse/firmenfeier.jpg", alt: "Canapees und belegte Brötchen" },
   hochzeit: { src: "/images/anlaesse/hochzeit.jpg", alt: "Festlich angerichtete Hochzeitstafel" },
};

/**
 * Freigestelltes Logo (PNG mit transparentem Hintergrund oder SVG) für Header und Footer.
 * width/height = Originalmaße der Datei in Pixel (bestimmt nur das Seitenverhältnis).
 * Ohne Eintrag (null) wird das Platzhalter-Logo aus Symbol und Text angezeigt.
 */
export const logoImage: { src: string; width: number; height: number } | null = null;
// Beispiel: export const logoImage = { src: "/images/logo.png", width: 600, height: 200 };
