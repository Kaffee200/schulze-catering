/**
 * Katalog "Angebot Schulze Catering 2026" – Preise inkl. 7 % MwSt.
 * Hier pflegen: Neue Gerichte als Eintrag in `items` ergänzen, Preise anpassen.
 */

export type Unit = "Portion" | "Blech" | "Stück" | "Person" | "100 g" | "kg" | "Glas";
export type Diet = "vegan" | "vegetarisch";

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  unit: Unit;
  desc?: string;
  /** vegan = vegan erhältlich bzw. zubereitbar, vegetarisch = vegetarisch erhältlich bzw. zubereitbar */
  diet?: Diet;
}

export interface CatalogCategory {
  slug: string;
  title: string;
  note?: string;
  items: CatalogItem[];
}

type Raw = [name: string, price: number, unit: Unit, desc?: string, diet?: Diet];

function build(slug: string, title: string, rows: Raw[], note?: string): CatalogCategory {
  return {
    slug,
    title,
    note,
    items: rows.map(([name, price, unit, desc, diet], i) => ({
      id: `${slug}-${i + 1}`,
      name,
      price,
      unit,
      desc,
      diet,
    })),
  };
}

export const catalog: CatalogCategory[] = [
  build(
    "eintoepfe",
    "Eintöpfe",
    [
      ["Kesselgulasch", 6.0, "Portion", "Herzhafter Eintopf aus Schweinefleisch, Champignons, Paprika, Zwiebeln und Kartoffeln"],
      ["Soljanka", 5.5, "Portion", "Pikanter Eintopf mit Wurst und Fleisch, Paprika, Zwiebeln, Gewürzgurken und Tomaten"],
      ["Käse-Lauch-Suppe", 5.0, "Portion", "Lauch, Kartoffeln und Käse – mit gebratenem Hackfleisch", "vegetarisch"],
      ["Kichererbseneintopf", 5.0, "Portion", "Mit Blattspinat und Kidneybohnen", "vegan"],
      ["Deftige Kartoffelsuppe", 5.0, "Portion", "Mit Zwiebeln, ausgebratenem Speck und Wurstscheiben", "vegan"],
    ],
    "ca. 300 ml pro Portion"
  ),
  build(
    "suppen",
    "Suppen",
    [
      ["Hochzeitssuppe", 5.0, "Portion", "Klare Rinderkraftbrühe mit Eierstich, Fleischklößchen und Gemüsestreifen"],
      ["Spargelcremesuppe", 4.4, "Portion", "Aus weißem Spargel", "vegetarisch"],
      ["Tomatencremesuppe", 4.4, "Portion", "Mit Sahne verfeinert", "vegetarisch"],
      ["Rote-Linsen-Suppe mit Kokosmilch", 4.4, "Portion", "Ingwer, Kurkuma und Lauchzwiebeln", "vegan"],
      ["Tomatensuppe mit Parmesanklößchen", 5.0, "Portion", undefined, "vegetarisch"],
      ["Kürbis-Apfel-Ingwer-Suppe", 5.0, "Portion", undefined, "vegan"],
      ["Geeiste Gurken-Wasabi-Suppe", 4.65, "Portion", "Der Frischekick auf dem Sommer-Buffet", "vegetarisch"],
      ["Gazpacho", 5.0, "Portion", "Kalte Gemüsesuppe aus Tomate, Gurke und Paprika", "vegan"],
    ],
    "ca. 300 ml pro Portion"
  ),
  build(
    "aus-dem-ofen",
    "Aus dem Ofen",
    [
      ["Putenrollbraten", 9.5, "Portion"],
      ["Keule vom jungen Weideschaf in Thymianjus", 11.0, "Portion", "Mit feiner Knoblauchnote"],
      ["Falsches Filet", 11.0, "Portion", "Zarter Rinderbraten in Rotweinsoße"],
      ["Saftiger Schweinekammbraten", 8.25, "Portion"],
      ["Schweinelendenbraten", 10.5, "Portion", "Zarter Braten in Pfefferrahmsoße"],
      ["Andalusisches Schweinefilet", 11.0, "Portion", "Mit Schalotten und frischen Champignons geschmort"],
      ["Kasslerkammbraten", 8.25, "Portion", "Ein Klassiker zum rustikalen Anlass"],
      ["Kasslerrückenbraten", 8.25, "Portion", "Die fettarme Alternative"],
      ["Lasagne", 75.9, "Blech", "Mit Sauce Bolognese und Béchamelsauce"],
      ["Rahmnudelgratin mit Hackfleisch und Gemüsestreifen", 69.5, "Blech"],
      ["Gartengemüse-Kartoffel-Auflauf", 69.5, "Blech"],
      ["Blattspinat-Kartoffel-Auflauf", 69.5, "Blech", undefined, "vegetarisch"],
      ["Gemüse-Lasagne", 75.9, "Blech", "Buntes Marktgemüse mit Béchamelsauce und Käse", "vegetarisch"],
    ],
    "Mindestens 8 Portionen · 1 Portion = ca. 180 g Rohgewicht · Aufläufe und Gratins im Blech 30 × 50 cm, ausreichend für ca. 10 Personen"
  ),
  build(
    "topf-und-pfanne",
    "Aus Topf und Pfanne",
    [
      ["Putengeschnetzeltes „Chinatown“", 8.7, "Portion", "Mit knackigem Asiagemüse"],
      ["Gebratene Hähnchenbrustfilets in Gorgonzolasauce", 8.25, "Portion"],
      ["Putengeschnetzeltes mit Champignons", 8.7, "Portion"],
      ["Puteninvoltinis alla Romana", 10.0, "Stück", "Putenrouladen, gefüllt mit luftgetrocknetem Schinken und Salbei"],
      ["Saftiger Rindergulasch in Rotweinsoße", 11.0, "Portion"],
      ["Geschnetzeltes vom Schwein mit Champignons", 8.0, "Portion"],
      ["Im Schinkenmantel gebratenes Schweinemedaillon", 4.4, "Stück", "Mit Rahmsauce"],
      ["Rahmschnitzel mit grünem Pfeffer", 8.8, "Portion", "Naturschnitzel aus dem mageren Schweinerücken in Pfefferrahmsauce"],
      ["Szegediner Gulasch", 8.25, "Portion", "Gulasch aus Schweinefleisch und Sauerkraut"],
      ["Hackfleischpfanne „Chili con Carne“", 7.2, "Portion", "Gehacktes vom Schwein, geschmort mit Zwiebeln, Kidneybohnen und Mais"],
      ["Gedünstetes Lachsfilet auf Blattspinat", 10.5, "Portion"],
      ["Chili sin Carne", 7.7, "Portion", "Sojagranulat, geschmort mit Zwiebeln, Kidneybohnen und Mais · Glutenfrei möglich", "vegan"],
      ["Vegane Sauce Bolognese", 7.7, "Portion", "Sojagranulat, geschmort mit Tomaten, Zwiebeln, Karottenstreifen · Glutenfrei möglich", "vegan"],
      ["Gemüsecurry mit Kokosmilch", 7.7, "Portion", undefined, "vegan"],
    ],
    "Mindestens 8 Portionen · 1 Portion = ca. 150 g Fleischeinwaage (Rohgewicht)"
  ),
  build(
    "miniaturen",
    "Miniaturen heiß & kalt",
    [
      ["Kleine Schnitzel (100 g)", 3.3, "Stück"],
      ["Partybulette (50 g)", 2.0, "Stück"],
      ["Gebratenes Schweinefiletmedaillon (70 g)", 3.55, "Stück"],
      ["Chicken Wings", 1.1, "Stück"],
      ["Hähnchenunterschenkel", 2.9, "Stück"],
      ["Gegrillter Hähnchenbrustspieß", 2.2, "Stück"],
      ["Hähnchenspieß Sweet Pepper", 2.2, "Stück", "Mit gelber, roter und grüner Paprika"],
      ["Mini-Bratwürstchen (25 g)", 1.1, "Stück"],
      ["Cevapcici aus Rindfleisch", 1.65, "Stück"],
      ["Gebackene Gemüse-Köttbullar (ca. 15 g)", 0.3, "Stück", "Mindestens 25 Stück", "vegetarisch"],
    ]
  ),
  build(
    "saettigungsbeilagen",
    "Sättigungsbeilagen",
    [
      ["Salzkartoffeln", 2.75, "Portion", undefined, "vegan"],
      ["Kartoffelklöße (100 g)", 1.65, "Stück", undefined, "vegan"],
      ["Böhmische Knödel", 2.4, "Portion"],
      ["Rosmarinkartoffeln", 3.85, "Portion", "Festkochende Kartoffeln, mit Rosmarin und Olivenöl im Ofen gebacken", "vegan"],
      ["Nudeln", 2.75, "Portion", "Spaghetti oder Penne", "vegan"],
      ["Spätzle", 3.1, "Portion", undefined, "vegetarisch"],
      ["Basmatireis", 3.0, "Portion", "Der Duftreis aus dem Himalaja", "vegan"],
      ["Reis", 2.6, "Portion", "Spitzenlangkornreis, verfeinert mit Butter", "vegan"],
      ["Brotsortiment", 2.2, "Person", "120 g pro Person: Baguette, Ciabatta-, Vollkorn-, Misch- und Weißbrot"],
      ["Baguette zur Suppe", 0.7, "Person", "40 g pro Person: helle und dunkle Baguettebrötchen, geschnitten"],
    ]
  ),
  build(
    "gemuesebeilagen",
    "Gemüsebeilagen",
    [
      ["Sauerkraut", 3.3, "Portion", undefined, "vegetarisch"],
      ["Rotkraut", 3.3, "Portion", undefined, "vegetarisch"],
      ["Marktgemüse", 4.0, "Portion", "Gelbe und rote Karotten, Brokkoli, Bohnen", "vegan"],
      ["Kaisergemüse", 4.0, "Portion", "Blumenkohl, Brokkoli, Karotten", "vegan"],
      ["Buttergemüse", 4.0, "Portion", "Sorte wählbar: Brechbohnen, Erbsen, Fingermöhrchen, Kohlrabi, Mais", "vegan"],
      ["Rahmchampignons", 4.0, "Portion"],
      ["Blumenkohl mit Semmelbutter", 4.4, "Portion", undefined, "vegetarisch"],
      ["Mediterranes Pfannengemüse", 5.5, "Portion", "Zucchini, Paprika, Aubergine, Zwiebel", "vegan"],
      ["Bohnenbündchen", 5.5, "Portion", "Prinzessbohnen im Schinkenmantel"],
      ["Pilzpfanne von frischen Champignons", 5.5, "Portion", "Mit Zwiebeln, Schinkenspeck und frischer Petersilie", "vegan"],
    ],
    "ca. 200 g pro Portion"
  ),
  build(
    "kalte-platten",
    "Kalte Platten",
    [
      ["Schlachteplatte", 6.05, "100 g", "Rotwurst, Leberwurst, Schwartenwurst, Knackwurst, Schweineschmalz, Gewürzgurken, Senf"],
      ["Salami-Schinken-Platte", 7.7, "100 g", "Kochschinken, Lachsschinken, Serranoschinken, Baguettesalami, Chorizo, Salami im Pfeffermantel, geräuchertes Putenfleisch"],
      ["Gemischte Aufschnittplatte", 6.6, "100 g", "z. B. Schweinerückenbraten, Kasslerbraten, Hähnchenbrust-Hauchschnitt, Kochschinken, verschiedene Salami, Lachsschinken"],
      ["Hackepeter, frisch gewolft", 13.2, "kg", "Dazu Zwiebelwürfel"],
      ["Käseplatte Standard", 6.6, "100 g", "Verschiedene Sorten Schnittkäse, Camembert, Blauschimmelkäse, verschiedene Frischkäse", "vegetarisch"],
      ["Exklusive Käsevariationen", 8.25, "100 g", "Ein ausgesuchtes Sortiment internationaler Käsespezialitäten", "vegetarisch"],
      ["Leicht & Lecker", 6.6, "100 g", "z. B. Hähnchenbrustfiletroulade, Kräuterlachsschinken, Hähnchen in Aspik, Frischkäse, fettarmer Schnittkäse – mit knackigem Gemüse garniert"],
      ["Mediterrane Aufschnittplatte", 8.8, "100 g", "Schinken, Wurst- und Käsesorten aus Europas Süden, garniert mit Honigmelone, mariniertem Gemüse und Oliven"],
      ["Fischplatte Standard", 7.15, "100 g", "Geräucherter Lachs, Makrelenfilet, Forelle, Surimi, Kräuterheringshappen, dazu Zitrone und Soßen"],
      ["Exklusive Fischvariationen", 9.9, "100 g", "Hochwertige Fischsorten, Garnelen, mit Kaviar garnierte Eier, Meerrettich, Zitrone"],
      ["Butter (250 g) oder Margarine (225 g)", 2.5, "Stück"],
    ],
    "Mengenempfehlung: 180 – 250 g pro Person, zuzüglich Brot/Brötchen und Butter"
  ),
  build(
    "canapees",
    "Canapees",
    [
      [
        "Canapees I",
        2.4,
        "Stück",
        "Baguettesalami, Lachsschinken, Schweinebraten, Kaßlerbraten, Schnittkäse, Kochschinken, Ziegenfrischkäse und Mango, Tomate und Mozzarella, Feta und getrocknete Tomate, Frischkäserolle, veganer Aufstrich",
      ],
      [
        "Canapees II",
        2.7,
        "Stück",
        "Räucherlachs, Hähnchenbrust, Chorizo, Camembert, geräucherter Käse, Tomatenmark mit Rucola und Parmesanflakes, Tomate mit Ei und Sardelle, Räucherforellentartar, Serranoschinken, Blauschimmelkäse",
      ],
      [
        "Canapees III",
        3.0,
        "Stück",
        "Lachsforelle, Tête-de-Moine-Blüten, Parmaschinken, Forellenkaviar, Rinderschinken, Ungarische Salami, Räucherlendchen, Pastrami",
      ],
      ["Belegte halbe Brötchen", 2.45, "Stück", "Mindestens 4 Stück pro Sorte (Hackepeter ab 10). Mehrkorn- oder Roggenbrötchen +0,25 € je ½ Brötchen"],
    ],
    "Der kleine exklusive Happen für Ihren Empfang – wir empfehlen 5 Stück pro Person"
  ),
  build(
    "aufstriche-und-feinkost",
    "Aufstriche & Feinkostsalate",
    [
      ["Hausgemachte Tomatenbutter", 2.5, "100 g", "Auch vegan möglich", "vegan"],
      ["Hausgemachte Kräuterbutter", 2.5, "100 g", "Auch vegan möglich", "vegan"],
      ["Geflügelsalat im Glas", 3.3, "Glas"],
      ["Shrimpscocktail im Glas", 3.3, "Glas"],
      ["Eiersalat im Glas", 3.1, "Glas", undefined, "vegetarisch"],
      ["Käsesalat im Glas", 3.1, "Glas", "Edamer, Mandarinen, Walnuss und ein Schuss Weinbrand", "vegetarisch"],
      ["Heringssalat im Glas", 3.3, "Glas", "Nach Omas Rezept: fein gewürfelt und pikant abgeschmeckt"],
      ["Steirischer Rindfleischsalat im Glas", 3.9, "Glas", "Mit dreierlei Paprika, Zwiebeln und einer Marinade aus Rotweinessig und Kürbiskernöl"],
      ["Mit pikanter Eicreme gefüllte Eier", 1.65, "Stück", "Ab 10 Stück", "vegetarisch"],
      ["Gefüllte Eier mit Kaviar oder Sardelle", 1.9, "Stück", undefined, "vegetarisch"],
      ["Mit Geflügelsalat gefüllte Pfirsiche", 2.2, "Stück", "Ab 5 Stück"],
      ["Mit Waldorfsalat gefüllte Birne", 2.2, "Stück", "Ab 5 Stück · Sellerie, Apfel, Karotte, Walnuss", "vegetarisch"],
    ],
    "Feinkostsalate im Glas: mindestens 8 Stück je Sorte"
  ),
  build(
    "salate",
    "Salate, allein und dazu",
    [
      ["Klassischer Kartoffelsalat", 12.1, "kg", "Mit Mayonnaise, Gewürzgurke, Zwiebel"],
      ["Mediterraner Nudelsalat", 14.3, "kg", "Penne mit getrockneten Tomaten und schwarzen Oliven", "vegan"],
      ["Kartoffelsalat ohne Mayo", 13.5, "kg", "Mit Gurke oder verschiedenen Blattsalaten", "vegan"],
      ["Glasnudelsalat", 17.5, "kg", "Mit knackigem Asiagemüse, Zitronengras und frischem Ingwer", "vegan"],
      ["Bulgursalat", 17.5, "kg", "Mit Gurke, Radieschen, Lauchzwiebel, Petersilie, Minze und Zitrone", "vegan"],
      ["Gurkensalat", 13.5, "kg", undefined, "vegan"],
      ["Tomaten-Mozzarella-Salat", 18.7, "kg", "Mit frischem Basilikum und Balsamico-Dressing", "vegetarisch"],
      ["Gartensalat in Essig-Öl-Marinade", 18.0, "kg", "Blattsalate, Gurke, Paprika, Mais, Tomate, Karotte, rote Zwiebel", "vegan"],
      ["Gartensalat mit Hirtenkäse", 18.0, "kg", undefined, "vegetarisch"],
      ["Gartensalat mit Ziegenfrischkäse und Mangodressing", 19.0, "kg", undefined, "vegetarisch"],
      ["Vitalsalat", 18.0, "kg", "Linsen, Karotten, Stangensellerie, Lauchzwiebeln und Rucola", "vegan"],
      ["Vitalsalat mit Gouda", 18.0, "kg", undefined, "vegetarisch"],
      ["Vitalsalat mit Kasslerstreifen", 19.0, "kg"],
      ["Hausgemachter Rotkrautsalat", 13.2, "kg", undefined, "vegan"],
      ["Rucolasalat mit Parmesanflakes und Kirschtomaten", 6.6, "100 g", "Zitronen-Olivenöl-Dressing · Empfehlung: 350 g für 10–15 Personen", "vegetarisch"],
      ["Antipasti", 6.6, "100 g", "Oliven, gegrillte Zucchini, gefüllte Minigemüse, Paprika-Käse-Päckchen, gegrillte Auberginen, getrocknete Tomaten", "vegan"],
      ["Saures Fingerfood", 8.8, "kg", "Gewürzgurken, Perlzwiebeln, Maiskölbchen"],
      ["Gemüsesticks mit Kräuterquark", 19.8, "kg", "z. B. Gurke, Möhre, Rettich, Stangensellerie und Paprika", "vegan"],
    ]
  ),
  build(
    "spiesse-und-desserts",
    "Spieße & Desserts",
    [
      ["Käse-Trauben-Spieß", 1.25, "Stück", undefined, "vegetarisch"],
      ["Tomaten-Mozzarella-Spieß", 1.25, "Stück", undefined, "vegetarisch"],
      ["Tricolore-Spieß", 1.25, "Stück", "Tomate, Mozzarella, Olive", "vegetarisch"],
      ["Cocktailwürstchen-Paprika-Spieß", 1.45, "Stück"],
      ["Serranoschinken-Melonen-Spieß", 1.65, "Stück"],
      ["Mini-Salami-Spieß", 1.65, "Stück"],
      ["Hackbällchen mit Cornichon", 1.9, "Stück"],
      ["Joghurt auf Erdbeeren", 2.5, "Glas", undefined, "vegetarisch"],
      ["Mousse au Chocolat", 2.5, "Glas", undefined, "vegetarisch"],
      ["Duett von Vanille- und Schokoladenpudding", 2.5, "Glas", undefined, "vegetarisch"],
      ["Stracciatella-Quarkcreme", 2.5, "Glas", undefined, "vegetarisch"],
      ["Pannacotta mit Erdbeersoße", 2.5, "Glas", "Enthält Gelatine"],
      ["Zitronencreme", 2.5, "Glas", undefined, "vegetarisch"],
      ["Rote Grütze mit Vanillesoße", 2.5, "Glas", "Auch mit Hafer-Vanille-Soße (vegan)", "vegan"],
      ["Karamellcreme", 2.5, "Glas", undefined, "vegetarisch"],
      ["Herrencreme", 2.5, "Glas", "Feine Creme aus Vanillepudding, Weinbrand, geschlagener Sahne und Schokolade", "vegetarisch"],
      ["Obstplatte Fingerfood", 2.5, "100 g", "Obst der Saison, geschält und in mundgerechte Stücke geschnitten", "vegan"],
    ],
    "Spieße: mindestens 8 Stück je Sorte · Desserts im Glas: mindestens 8 Stück je Sorte"
  ),
];

export const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

export function formatPrice(price: number, unit: Unit): string {
  return `${eur.format(price)} / ${unit}`;
}

export const allItems: CatalogItem[] = catalog.flatMap((c) => c.items);
export const itemsById: Record<string, CatalogItem & { category: string }> = Object.fromEntries(
  catalog.flatMap((c) => c.items.map((i) => [i.id, { ...i, category: c.title }]))
);

/** Schrittweite für die Mengenauswahl je Einheit */
export function stepFor(unit: Unit): number {
  return unit === "kg" ? 0.5 : 1;
}

/** Lesbare Menge, z. B. "500 g", "1,5 kg", "12 Portionen" */
export function formatQty(qty: number, unit: Unit): string {
  if (unit === "100 g") return `${Math.round(qty * 100)} g`;
  if (unit === "kg") return `${qty.toLocaleString("de-DE")} kg`;
  if (unit === "Portion") return `${qty} ${qty === 1 ? "Portion" : "Portionen"}`;
  if (unit === "Blech") return `${qty} ${qty === 1 ? "Blech" : "Bleche"}`;
  if (unit === "Glas") return `${qty} ${qty === 1 ? "Glas" : "Gläser"}`;
  if (unit === "Person") return `${qty} ${qty === 1 ? "Person" : "Personen"}`;
  return `${qty} Stück`;
}

/** Startmenge beim ersten Hinzufügen */
export function defaultQty(unit: Unit): number {
  if (unit === "100 g") return 5;
  if (unit === "kg") return 1;
  return 1;
}

export const mengenempfehlungen = [
  { label: "Büfett (kalt und warm)", text: "500–600 g pro Person, zuzüglich Brot/Brötchen und Butter" },
  { label: "Kalte Platten", text: "180–250 g pro Person, zuzüglich Brot/Brötchen und Butter" },
  { label: "Menü", text: "180 g Fleisch pro Person, zuzüglich Gemüse- und Sättigungsbeilagen" },
];
