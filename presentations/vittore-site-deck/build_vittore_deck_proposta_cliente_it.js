"use strict";

const path = require("path");
const pptxgen = require("pptxgenjs");
const {
  imageSizingCrop,
  imageSizingContain,
} = require("./pptxgenjs_helpers/image");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./pptxgenjs_helpers/layout");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Vittore PDR Group";
pptx.subject = "Proposta tecnico-commerciale per cliente";
pptx.title = "Vittore PDR Group - Proposta Tecnico-Commerciale";
pptx.lang = "it-IT";
pptx.theme = {
  headFontFace: "Sora",
  bodyFontFace: "Manrope",
  lang: "it-IT",
};

const deckDir = __dirname;
const rootDir = path.resolve(deckDir, "..", "..");
const image = (...parts) => path.join(rootDir, "assets", "images", ...parts);

const assets = {
  logo: image("logo.png"),
  hero: image("carro-em-reparo.jpg"),
  team: image("equipe-tecnica.jpg"),
  beforeAfter: image("antes-depois-real.png"),
  damaged: image("carro danificado.jpg"),
  brands: image("logo-marcas.jpg"),
};

const colors = {
  navy: "07111F",
  navyCard: "10233F",
  blue: "0057B8",
  blueSoft: "0F4A8B",
  gold: "C9A148",
  text: "F5F8FD",
  muted: "B2BECE",
  line: "294261",
  soft: "0B1B33",
};

function addBackdrop(slide, opts = {}) {
  const title = opts.title;
  const kicker = opts.kicker;
  const footer = opts.footer || "vittorepdr.com";
  const titleW = opts.titleW || 6.2;

  slide.background = { color: colors.navy };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.2,
    fill: { color: colors.blue, transparency: 8 },
    line: { color: colors.blue, transparency: 100 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.62,
    y: 0.68,
    w: 12,
    h: 0,
    line: { color: colors.gold, transparency: 42, pt: 1.2 },
  });
  slide.addImage({
    path: assets.logo,
    ...imageSizingContain(assets.logo, 0.58, 0.22, 1.62, 0.58),
  });
  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: 0.62,
      y: 0.9,
      w: 4.8,
      h: 0.22,
      fontFace: "Manrope",
      fontSize: 9,
      bold: true,
      color: colors.gold,
      charSpace: 1.6,
      margin: 0,
    });
  }
  if (title) {
    slide.addText(title, {
      x: 0.62,
      y: 1.15,
      w: titleW,
      h: 0.9,
      fontFace: "Sora",
      fontSize: 21,
      bold: true,
      color: colors.text,
      margin: 0,
      breakLine: false,
    });
  }
  slide.addText(footer, {
    x: 10.8,
    y: 7.02,
    w: 1.9,
    h: 0.18,
    fontFace: "Manrope",
    fontSize: 8,
    color: colors.muted,
    align: "right",
    margin: 0,
  });
}

function addPageNumber(slide, page) {
  slide.addText(String(page).padStart(2, "0"), {
    x: 12.12,
    y: 0.28,
    w: 0.6,
    h: 0.22,
    fontFace: "Sora",
    fontSize: 9,
    bold: true,
    color: colors.gold,
    align: "right",
    margin: 0,
  });
}

function addChip(slide, text, x, y, w) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.38,
    rectRadius: 0.08,
    fill: { color: colors.blue, transparency: 18 },
    line: { color: colors.gold, transparency: 65, pt: 1 },
  });
  slide.addText(text, {
    x: x + 0.08,
    y: y + 0.08,
    w: w - 0.16,
    h: 0.16,
    fontFace: "Manrope",
    fontSize: 8.2,
    bold: true,
    color: colors.text,
    align: "center",
    margin: 0,
  });
}

function addBulletCard(slide, heading, bullets, x, y, w, h, accent) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: accent ? colors.blueSoft : colors.navyCard, transparency: accent ? 8 : 0 },
    line: { color: accent ? colors.gold : colors.line, pt: 1.05 },
  });
  slide.addText(heading, {
    x: x + 0.18,
    y: y + 0.16,
    w: w - 0.36,
    h: 0.22,
    fontFace: "Sora",
    fontSize: 12.5,
    bold: true,
    color: colors.text,
    margin: 0,
  });
  const runs = [];
  bullets.forEach((bullet) => {
    runs.push({
      text: bullet,
      options: { bullet: { indent: 10 }, breakLine: true },
    });
  });
  slide.addText(runs, {
    x: x + 0.16,
    y: y + 0.48,
    w: w - 0.32,
    h: h - 0.62,
    fontFace: "Manrope",
    fontSize: 9.3,
    color: colors.muted,
    margin: 0,
    breakLine: false,
    valign: "top",
    paraSpaceAfterPt: 6,
  });
}

function addStep(slide, number, title, body, x, y, w) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 1.35,
    rectRadius: 0.08,
    fill: { color: colors.navyCard, transparency: 0 },
    line: { color: colors.line, pt: 1 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.18,
    y: y + 0.18,
    w: 0.56,
    h: 0.34,
    rectRadius: 0.06,
    fill: { color: colors.gold },
    line: { color: colors.gold, pt: 1 },
  });
  slide.addText(number, {
    x: x + 0.2,
    y: y + 0.25,
    w: 0.5,
    h: 0.1,
    fontFace: "Sora",
    fontSize: 9,
    bold: true,
    color: colors.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(title, {
    x: x + 0.18,
    y: y + 0.64,
    w: w - 0.36,
    h: 0.18,
    fontFace: "Sora",
    fontSize: 11.2,
    bold: true,
    color: colors.text,
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.18,
    y: y + 0.9,
    w: w - 0.36,
    h: 0.24,
    fontFace: "Manrope",
    fontSize: 8.8,
    color: colors.muted,
    margin: 0,
  });
}

function addValueRow(slide, label, value, x, y, w, accent) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.68,
    rectRadius: 0.05,
    fill: { color: accent ? colors.blueSoft : colors.navyCard, transparency: accent ? 8 : 0 },
    line: { color: accent ? colors.gold : colors.line, pt: 1 },
  });
  slide.addText(label, {
    x: x + 0.16,
    y: y + 0.14,
    w: 1.9,
    h: 0.14,
    fontFace: "Manrope",
    fontSize: 8.2,
    bold: true,
    color: accent ? colors.gold : colors.muted,
    margin: 0,
  });
  slide.addText(value, {
    x: x + 0.16,
    y: y + 0.32,
    w: w - 0.32,
    h: 0.16,
    fontFace: "Sora",
    fontSize: 11,
    bold: true,
    color: colors.text,
    margin: 0,
  });
}

function finalizeSlide(slide) {
  warnIfSlideHasOverlaps(slide, pptx, {
    muteContainment: true,
    ignoreDecorativeShapes: true,
    ignoreLines: true,
  });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

const cover = pptx.addSlide();
cover.background = { color: colors.navy };
cover.addImage({
  path: assets.hero,
  ...imageSizingCrop(assets.hero, 0, 0, 13.333, 7.5),
});
cover.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 13.333,
  h: 7.5,
  fill: { color: colors.navy, transparency: 42 },
  line: { color: colors.navy, transparency: 100 },
});
cover.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 5.48,
  w: 13.333,
  h: 2.02,
  fill: { color: colors.navy, transparency: 6 },
  line: { color: colors.navy, transparency: 100 },
});
cover.addShape(pptx.ShapeType.line, {
  x: 0.76,
  y: 1.04,
  w: 12,
  h: 0,
  line: { color: colors.gold, transparency: 38, pt: 1.2 },
});
cover.addImage({
  path: assets.logo,
  ...imageSizingContain(assets.logo, 0.76, 0.28, 1.82, 0.64),
});
cover.addText("PROPOSTA TECNICO-COMMERCIALE", {
  x: 0.76,
  y: 4.18,
  w: 4.9,
  h: 0.2,
  fontFace: "Manrope",
  fontSize: 9,
  bold: true,
  color: colors.gold,
  charSpace: 1.7,
  margin: 0,
});
cover.addText("Precisione artigianale nella riparazione delle ammaccature senza verniciatura.", {
  x: 0.76,
  y: 4.56,
  w: 6.8,
  h: 0.82,
  fontFace: "Sora",
  fontSize: 22,
  bold: true,
  color: colors.text,
  margin: 0,
});
cover.addText("Dalla singola vettura alle operazioni con volume, flotte e picchi di domanda.", {
  x: 0.76,
  y: 5.28,
  w: 5.7,
  h: 0.34,
  fontFace: "Manrope",
  fontSize: 11.2,
  color: colors.text,
  margin: 0,
});
addChip(cover, "Senza verniciatura", 0.76, 6.12, 1.92);
addChip(cover, "Dettaglio + scala", 2.82, 6.12, 1.78);
cover.addText("Lisbona e area metropolitana", {
  x: 9.24,
  y: 6.2,
  w: 2.6,
  h: 0.18,
  fontFace: "Manrope",
  fontSize: 8.8,
  bold: false,
  color: colors.text,
  align: "right",
  margin: 0,
});
// A capa usa sobreposicoes intencionais entre imagem, velatura e faixas de fundo.

const slide1 = pptx.addSlide();
addBackdrop(slide1, {
  kicker: "Capacita tecnica",
  title: "Aumentiamo la capacita senza perdere standard.",
  titleW: 5.7,
});
addPageNumber(slide1, 1);
slide1.addText("Vittore amplia la capacita tecnica del cliente con una squadra specializzata, pronta a intervenire con rapidita, controllo e standard elevati.", {
  x: 0.62,
  y: 2.16,
  w: 6.65,
  h: 0.38,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addBulletCard(
  slide1,
  "Quando facciamo la differenza",
  [
    "Concessionarie e officine con code, scadenze strette o domanda superiore al normale",
    "Rivenditori e rent-a-car che devono riconsegnare le vetture piu rapidamente",
    "Operazioni grandine e ammaccature in cui il volume cresce all'improvviso",
    "Strutture che hanno bisogno di piu capacita senza perdere criterio tecnico",
  ],
  0.62,
  2.82,
  3.45,
  2.96,
  false
);
addBulletCard(
  slide1,
  "Cosa migliora per il cliente",
  [
    "Maggiore fluidita di lavorazione e consegna",
    "Maggiore prevedibilita nel lotto di vetture",
    "Meno rilavorazioni e piu controllo tecnico",
    "Intervento discreto, integrato e senza attriti con il cliente finale",
  ],
  4.32,
  2.82,
  3.45,
  2.96,
  true
);
slide1.addImage({
  path: assets.team,
  ...imageSizingCrop(assets.team, 8.08, 2.22, 4.48, 3.92),
});
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 8.08,
  y: 2.22,
  w: 4.48,
  h: 3.92,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 100 },
  line: { color: colors.gold, transparency: 55, pt: 1.1 },
});
addChip(slide1, "Meno coda", 0.62, 6.06, 1.2);
addChip(slide1, "Piu prevedibilita", 1.96, 6.06, 1.86);
addChip(slide1, "Operativita su richiesta", 3.96, 6.06, 2.18);
slide1.addText("Interveniamo per aumentare la capacita con la stessa cura che il cliente si aspetta sulla singola vettura.", {
  x: 8.08,
  y: 6.3,
  w: 4.2,
  h: 0.2,
  fontFace: "Manrope",
  fontSize: 8.8,
  color: colors.muted,
  margin: 0,
  align: "center",
});
finalizeSlide(slide1);

const slide3 = pptx.addSlide();
addBackdrop(slide3, {
  kicker: "Metodo operativo",
  title: "Metodo tecnico con rapidita, controllo e finitura.",
  titleW: 6.2,
});
addPageNumber(slide3, 2);
slide3.addText("Presentiamo un metodo semplice, visibile e replicabile, cosi il cliente percepisce organizzazione, criterio e affidabilita.", {
  x: 0.62,
  y: 2.16,
  w: 6.9,
  h: 0.32,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addStep(slide3, "01", "Analisi del lotto", "Valutiamo volume, tipologia del danno, tempi e contesto operativo.", 0.62, 2.76, 2.95);
addStep(slide3, "02", "Pianificazione", "Definiamo squadra, ritmo, perimetro e necessita di supporto.", 3.8, 2.76, 2.95);
addStep(slide3, "03", "Esecuzione", "Intervento tecnico con controllo, finitura e organizzazione del flusso.", 6.98, 2.76, 2.95);
addStep(slide3, "04", "Consegna", "Verifica finale e restituzione nei tempi concordati.", 10.16, 2.76, 2.55);
addBulletCard(
  slide3,
  "Cosa sostiene il nostro standard",
  [
    "Squadra qualificata e supervisione attiva",
    "Approccio professionale compatibile con contesti esigenti",
    "Ingresso rapido e capacita calibrata sul volume",
    "Produttivita con focus su finitura e coerenza",
  ],
  0.62,
  4.74,
  5.2,
  1.7,
  false
);
slide3.addShape(pptx.ShapeType.roundRect, {
  x: 6.08,
  y: 4.74,
  w: 6.52,
  h: 1.7,
  rectRadius: 0.08,
  fill: { color: colors.blueSoft, transparency: 8 },
  line: { color: colors.gold, pt: 1.05 },
});
slide3.addText("Cosa percepisce il cliente", {
  x: 6.34,
  y: 5.02,
  w: 2.1,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide3.addText("Non vendiamo soltanto manodopera. Offriamo un'operazione capace di assorbire volume con criterio tecnico, prevedibilita e sicurezza.", {
  x: 6.34,
  y: 5.3,
  w: 5.44,
  h: 0.4,
  fontFace: "Sora",
  fontSize: 13.2,
  bold: true,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide3);

const slide4 = pptx.addSlide();
addBackdrop(slide4, {
  kicker: "Proposta commerciale",
  title: "Criterio tecnico, proposta chiara e condizioni oggettive.",
  titleW: 6.1,
});
addPageNumber(slide4, 3);
slide4.addText("La proposta diventa piu facile da approvare quando il cliente percepisce una logica equa, trasparente e semplice da seguire.", {
  x: 0.62,
  y: 2.16,
  w: 6.8,
  h: 0.38,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addBulletCard(
  slide4,
  "Come costruiamo la proposta",
  [
    "Ogni vettura viene valutata in base al numero di impatti e ai pannelli coinvolti",
    "La fascia tecnica definisce il valore base di ogni caso",
    "Categoria, cofano ALU, verniciatura e servizi aggiuntivi regolano il valore finale",
    "Il cliente riceve una proposta chiara, con condizioni commerciali oggettive",
  ],
  0.62,
  2.82,
  3.82,
  2.92,
  false
);
slide4.addShape(pptx.ShapeType.roundRect, {
  x: 4.7,
  y: 2.82,
  w: 3.9,
  h: 2.92,
  rectRadius: 0.08,
  fill: { color: colors.blueSoft, transparency: 8 },
  line: { color: colors.gold, pt: 1.05 },
});
slide4.addText("Esempio pratico: 1 vettura", {
  x: 4.94,
  y: 3.08,
  w: 2.1,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide4.addText("Categoria A\nCofano ALU con 30 impatti\nTetto con 10 impatti e preparazione per verniciatura\nTotale: 40 impatti\nFascia tecnica: 26-50 impatti", {
  x: 4.94,
  y: 3.36,
  w: 3.16,
  h: 1.24,
  fontFace: "Manrope",
  fontSize: 9.2,
  color: colors.text,
  margin: 0,
});
slide4.addShape(pptx.ShapeType.roundRect, {
  x: 8.88,
  y: 2.82,
  w: 3.72,
  h: 2.92,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1.05 },
});
slide4.addText("Prezzo finale riepilogato", {
  x: 9.12,
  y: 3.08,
  w: 1.7,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide4.addText("Fascia 26-50: EUR 520\nCofano ALU: EUR 570\nCategoria A: + EUR 90\nLavorazione verticale: - EUR 100\nPrezzo finale: EUR 560", {
  x: 9.12,
  y: 3.36,
  w: 2.86,
  h: 1.26,
  fontFace: "Sora",
  fontSize: 10.5,
  bold: true,
  color: colors.text,
  margin: 0,
});
addValueRow(slide4, "Fatturazione", "Settimanale", 0.62, 6.02, 2.56, false);
addValueRow(slide4, "Pagamento", "28 giorni data fattura", 3.42, 6.02, 3.46, false);
addValueRow(slide4, "Condizioni", "Validita 15 giorni | Controllo visivo | Assicurazione RC", 7.12, 6.02, 5.48, true);
finalizeSlide(slide4);

const slide6 = pptx.addSlide();
addBackdrop(slide6, {
  kicker: "Sicurezza operativa",
  title: "Perche il cliente procede con tranquillita.",
  titleW: 5.9,
});
addPageNumber(slide6, 4);
slide6.addText("Invece di chiedere un atto di fiducia, presentiamo un modello che trasmette comfort operativo, sicurezza e responsabilita chiara.", {
  x: 0.62,
  y: 2.16,
  w: 7.2,
  h: 0.38,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addBulletCard(
  slide6,
  "Comfort operativo",
  [
    "Intervento complementare alla squadra interna, senza conflitti",
    "Ingresso rapido nei picchi di volume, grandine e lotti accumulati",
    "Allineamento su SLA, capacita giornaliera e checkpoint di monitoraggio",
    "Operazione discreta, integrata allo standard della concessionaria",
    "Piu rotazione, meno vetture ferme e meno rilavorazioni nascoste",
  ],
  0.62,
  2.84,
  5.82,
  3.0,
  false
);
addBulletCard(
  slide6,
  "Garanzie di fiducia",
  [
    "Prezzo spiegato con criterio tecnico, impatti, fascia e regolazioni visibili",
    "Progetto pilota iniziale, checklist congiunta e validazione alla consegna",
    "Controllo visivo, metodo tecnico e controllo qualita",
    "Assicurazione di responsabilita civile e assunzione chiara della responsabilita",
    "Nei casi estremi, gestione patrimoniale della soluzione quando applicabile",
  ],
  6.72,
  2.84,
  5.88,
  3.0,
  true
);
slide6.addShape(pptx.ShapeType.roundRect, {
  x: 0.62,
  y: 6.02,
  w: 11.98,
  h: 0.72,
  rectRadius: 0.08,
  fill: { color: colors.blueSoft, transparency: 8 },
  line: { color: colors.gold, pt: 1.05 },
});
slide6.addText("Non stiamo chiedendo un atto di fede. Stiamo proponendo un modello con metodo, trasparenza commerciale, assicurazione e responsabilita chiara.", {
  x: 0.88,
  y: 6.24,
  w: 11.4,
  h: 0.22,
  fontFace: "Sora",
  fontSize: 11.4,
  bold: true,
  color: colors.text,
  margin: 0,
  align: "center",
});
finalizeSlide(slide6);

const slide7 = pptx.addSlide();
addBackdrop(slide7, {
  kicker: "Chiusura",
  title: "Dal dettaglio sulla vettura al risultato operativo.",
  titleW: 5.8,
});
addPageNumber(slide7, 5);
slide7.addImage({
  path: assets.beforeAfter,
  ...imageSizingCrop(assets.beforeAfter, 0.62, 2.06, 4.2, 3.62),
});
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 0.62,
  y: 2.06,
  w: 4.2,
  h: 3.62,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 100 },
  line: { color: colors.gold, transparency: 50, pt: 1.1 },
});
addBulletCard(
  slide7,
  "Perche questa decisione ha senso",
  [
    "Il cliente percepisce beneficio operativo e maggiore capacita di consegna",
    "Il cliente comprende una proposta commerciale chiara e giustificabile",
    "Il cliente riconosce un metodo tecnico professionale e sicuro",
    "Il cliente si sente tranquillo nel testare prima di ampliare la partnership",
  ],
  5.18,
  2.06,
  3.35,
  3.62,
  false
);
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 8.82,
  y: 2.06,
  w: 3.78,
  h: 3.62,
  rectRadius: 0.08,
  fill: { color: colors.blueSoft, transparency: 8 },
  line: { color: colors.gold, pt: 1.05 },
});
slide7.addText("Simulazione illustrativa", {
  x: 9.12,
  y: 2.36,
  w: 1.8,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide7.addText("Come una maggiore rotazione puo migliorare il risultato mensile.", {
  x: 9.12,
  y: 2.64,
  w: 2.9,
  h: 0.52,
  fontFace: "Sora",
  fontSize: 12.1,
  bold: true,
  color: colors.text,
  margin: 0,
});
slide7.addText("Senza verniciatura", {
  x: 10.32,
  y: 3.26,
  w: 1.1,
  h: 0.14,
  fontFace: "Manrope",
  fontSize: 7.5,
  bold: true,
  color: colors.gold,
  align: "center",
  margin: 0,
});
slide7.addText("Tradizionale", {
  x: 11.42,
  y: 3.26,
  w: 0.86,
  h: 0.14,
  fontFace: "Manrope",
  fontSize: 7.5,
  bold: true,
  color: colors.gold,
  align: "center",
  margin: 0,
});
[
  ["Margine/vettura", "R$ 1.500", "R$ 2.000"],
  ["Tempo medio", "1 giorno", "6 giorni"],
  ["Capacita/mese", "30", "5"],
  ["Risultato/mese", "R$ 45 mil", "R$ 10 mil"],
].forEach((row, index) => {
  const y = 3.56 + index * 0.42;
  slide7.addShape(pptx.ShapeType.line, {
    x: 9.12,
    y: y - 0.06,
    w: 3.18,
    h: 0,
    line: { color: colors.line, pt: 1 },
  });
  slide7.addText(row[0], {
    x: 9.12,
    y,
    w: 1.18,
    h: 0.14,
    fontFace: "Manrope",
    fontSize: 7.8,
    color: colors.text,
    margin: 0,
  });
  slide7.addText(row[1], {
    x: 10.36,
    y,
    w: 0.98,
    h: 0.14,
    fontFace: "Sora",
    fontSize: 8.2,
    bold: true,
    color: colors.text,
    align: "center",
    margin: 0,
  });
  slide7.addText(row[2], {
    x: 11.34,
    y,
    w: 0.98,
    h: 0.14,
    fontFace: "Sora",
    fontSize: 8.2,
    bold: true,
    color: colors.text,
    align: "center",
    margin: 0,
  });
});
slide7.addText("Esempio illustrativo di rotazione e capacita mensile.", {
  x: 9.12,
  y: 5.18,
  w: 3.04,
  h: 0.22,
  fontFace: "Manrope",
  fontSize: 7.8,
  color: colors.muted,
  margin: 0,
});
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 0.62,
  y: 6.08,
  w: 11.98,
  h: 0.72,
  rectRadius: 0.08,
  fill: { color: colors.gold, transparency: 0 },
  line: { color: colors.gold, pt: 1.05 },
});
slide7.addText("Prenota una dimostrazione o inizia con un lotto pilota.", {
  x: 0.96,
  y: 6.25,
  w: 11.3,
  h: 0.18,
  fontFace: "Sora",
  fontSize: 13.4,
  bold: true,
  color: colors.navy,
  margin: 0,
  align: "center",
});
slide7.addText("Se non ti convince, non paghi.", {
  x: 0.96,
  y: 6.53,
  w: 11.3,
  h: 0.14,
  fontFace: "Manrope",
  fontSize: 9.2,
  bold: true,
  color: colors.navy,
  margin: 0,
  align: "center",
});
finalizeSlide(slide7);

const outputFile = path.join(deckDir, "vittore_proposta_tecnico_commerciale_cliente_it_v1.pptx");

pptx.writeFile({ fileName: outputFile }).then(() => {
  console.log(`Deck gerado em: ${outputFile}`);
});
