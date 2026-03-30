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
pptx.defineLayout({ name: "A4_TRIFOLD", width: 11.69, height: 8.27 });
pptx.layout = "A4_TRIFOLD";
pptx.author = "OpenAI Codex";
pptx.company = "Vittore PDR Group";
pptx.subject = "Folder tecnico-commerciale pieghevole";
pptx.title = "Vittore - Folder Pieghevole";
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
};

const colors = {
  paper: "F7F3EC",
  navy: "07111F",
  navySoft: "10233F",
  blue: "0057B8",
  blueSoft: "0F4A8B",
  gold: "C9A148",
  textDark: "142235",
  textLight: "F5F8FD",
  muted: "66748A",
  line: "D8C6A1",
  panel: "FDFBF7",
  panelSoft: "F8F1E4",
};

const page = { w: 11.69, h: 8.27 };
const panelX = [0, 3.93, 7.78];
const panelW = [3.93, 3.85, 3.91];

function addBase(slide, title) {
  slide.background = { color: colors.paper };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: page.w,
    h: 0.2,
    fill: { color: colors.blue },
    line: { color: colors.blue, transparency: 100 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.3,
    y: 0.76,
    w: 11.08,
    h: 0,
    line: { color: colors.gold, pt: 1, transparency: 35 },
  });
  slide.addText(title, {
    x: 9.2,
    y: 0.32,
    w: 1.8,
    h: 0.16,
    fontFace: "Manrope",
    fontSize: 8.5,
    bold: true,
    color: colors.gold,
    align: "right",
    margin: 0,
  });
  [3.93, 7.78].forEach((x) => {
    slide.addShape(pptx.ShapeType.line, {
      x,
      y: 0.92,
      w: 0,
      h: 7.02,
      line: { color: colors.line, pt: 0.8, transparency: 45, dash: "dash" },
    });
  });
}

function addPanelLogo(slide, x, y, w = 1.72, h = 0.56) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.05,
    fill: { color: colors.navySoft, transparency: 0 },
    line: { color: colors.gold, pt: 0.7, transparency: 32 },
  });
  slide.addImage({
    path: assets.logo,
    ...imageSizingContain(assets.logo, x + 0.08, y + 0.07, w - 0.16, h - 0.14),
  });
}

function addPanelCard(slide, panelIndex, y, h, opts = {}) {
  const x = panelX[panelIndex] + 0.18;
  const w = panelW[panelIndex] - 0.36;
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.05,
    fill: { color: opts.fill || colors.panel, transparency: opts.transparency || 0 },
    line: { color: opts.line || colors.line, pt: 1 },
  });
  return { x, y, w, h };
}

function addKicker(slide, text, x, y, w, color = colors.gold) {
  slide.addText(text.toUpperCase(), {
    x,
    y,
    w,
    h: 0.18,
    fontFace: "Manrope",
    fontSize: 8,
    bold: true,
    color,
    charSpace: 1.2,
    margin: 0,
  });
}

function addBody(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace: opts.fontFace || "Manrope",
    fontSize: opts.fontSize || 9,
    bold: opts.bold || false,
    color: opts.color || colors.textDark,
    margin: 0,
    align: opts.align || "left",
    valign: opts.valign || "top",
    breakLine: false,
  });
}

function addBulletList(slide, bullets, x, y, w, h, color = colors.textDark, fontSize = 8.6) {
  const runs = bullets.map((bullet) => ({
    text: bullet,
    options: { bullet: { indent: 10 }, breakLine: true },
  }));
  slide.addText(runs, {
    x,
    y,
    w,
    h,
    fontFace: "Manrope",
    fontSize,
    color,
    margin: 0,
    paraSpaceAfterPt: 5,
    breakLine: false,
    valign: "top",
  });
}

function addChip(slide, text, x, y, w) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.3,
    rectRadius: 0.05,
    fill: { color: colors.blueSoft, transparency: 4 },
    line: { color: colors.gold, pt: 0.8, transparency: 35 },
  });
  slide.addText(text, {
    x: x + 0.06,
    y: y + 0.07,
    w: w - 0.12,
    h: 0.12,
    fontFace: "Manrope",
    fontSize: 7.5,
    bold: true,
    color: colors.textLight,
    align: "center",
    margin: 0,
  });
}

function finalize(slide) {
  warnIfSlideHasOverlaps(slide, pptx, {
    muteContainment: true,
    ignoreDecorativeShapes: true,
    ignoreLines: true,
  });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

const outer = pptx.addSlide();
addBase(outer, "LATO ESTERNO");

// Back cover
outer.addShape(pptx.ShapeType.roundRect, {
  x: panelX[0] + 0.18,
  y: 1.02,
  w: panelW[0] - 0.36,
  h: 6.9,
  rectRadius: 0.06,
  fill: { color: colors.navySoft },
  line: { color: colors.gold, pt: 1 },
});
addKicker(outer, "Chi Siamo", panelX[0] + 0.42, 1.28, 1.4, colors.gold);
addBody(
  outer,
  "Vittore amplia la capacita tecnica del cliente con una squadra specializzata, pronta a intervenire con rapidita, controllo e standard elevati.",
  panelX[0] + 0.42,
  1.62,
  2.9,
  1.02,
  { color: colors.textLight, fontSize: 9.5 }
);
outer.addShape(pptx.ShapeType.line, {
  x: panelX[0] + 0.42,
  y: 2.58,
  w: 1.24,
  h: 0,
  line: { color: colors.gold, pt: 1.1 },
});
addBulletList(
  outer,
  [
    "Squadra pronta a integrarsi nella struttura del cliente",
    "Intervento discreto e allineato al flusso esistente",
    "Controllo visivo e assicurazione di responsabilita civile",
  ],
  panelX[0] + 0.4,
  2.9,
  2.96,
  1.36,
  colors.textLight,
  8.8
);
outer.addShape(pptx.ShapeType.line, {
  x: panelX[0] + 0.42,
  y: 4.84,
  w: 2.72,
  h: 0,
  line: { color: colors.line, pt: 0.9, transparency: 40 },
});
addBody(outer, "Contatti", panelX[0] + 0.42, 5.06, 1.1, 0.14, {
  fontFace: "Sora",
  fontSize: 11,
  bold: true,
  color: colors.textLight,
});
addBody(outer, "contato@vittorepdr.com\nvittorepdr.com\nLisbona e area metropolitana", panelX[0] + 0.42, 5.34, 2.5, 0.9, {
  color: colors.textLight,
  fontSize: 8.8,
});
outer.addShape(pptx.ShapeType.roundRect, {
  x: panelX[0] + 0.34,
  y: 6.42,
  w: 2.92,
  h: 0.96,
  rectRadius: 0.06,
  fill: { color: colors.navy, transparency: 100 },
  line: { color: colors.gold, pt: 1 },
});
addBody(outer, "Prenota una dimostrazione.", panelX[0] + 0.52, 6.62, 2.5, 0.22, {
  fontFace: "Sora",
  fontSize: 12.2,
  bold: true,
  color: colors.gold,
});
addBody(outer, "Se non ti convince, non paghi.", panelX[0] + 0.52, 6.98, 2.5, 0.14, {
  fontFace: "Manrope",
  fontSize: 8.8,
  bold: true,
  color: colors.textLight,
});

// Fold-in flap
const flap = addPanelCard(outer, 1, 1.02, 6.9, { fill: colors.panel, line: colors.line });
addKicker(outer, "Che Cosa Facciamo", flap.x + 0.18, 1.28, 2.1);
addBody(outer, "Riparazione delle ammaccature senza verniciatura.", flap.x + 0.18, 1.62, flap.w - 0.36, 0.72, {
  fontFace: "Sora",
  fontSize: 15.9,
  bold: true,
  color: colors.textDark,
});
outer.addShape(pptx.ShapeType.line, {
  x: flap.x + 0.18,
  y: 2.24,
  w: 1.32,
  h: 0,
  line: { color: colors.gold, pt: 1.1 },
});
addBody(
  outer,
  "Applichiamo la riparazione senza verniciatura con criterio tecnico per preservare il pezzo originale, ridurre il fermo vettura ed evitare verniciature inutili.",
  flap.x + 0.18,
  2.3,
  flap.w - 0.36,
  0.72,
  { color: colors.textDark, fontSize: 9.3 }
);
addBulletList(
  outer,
  [
    "Preserva il pezzo originale quando il danno lo consente",
    "Riduce i tempi di fermo e le fasi non necessarie",
    "Aiuta il cliente a guadagnare velocita senza perdere dettaglio",
  ],
  flap.x + 0.16,
  3.18,
  flap.w - 0.32,
  1.08,
  colors.textDark,
  8.8
);
outer.addShape(pptx.ShapeType.roundRect, {
  x: flap.x + 0.18,
  y: 4.54,
  w: flap.w - 0.36,
  h: 2.28,
  rectRadius: 0.05,
  fill: { color: colors.panelSoft, transparency: 0 },
  line: { color: colors.line, pt: 0.8 },
});
outer.addImage({
  path: assets.beforeAfter,
  ...imageSizingCrop(assets.beforeAfter, flap.x + 0.26, 4.72, flap.w - 0.52, 1.92),
});
outer.addShape(pptx.ShapeType.roundRect, {
  x: flap.x + 0.26,
  y: 4.72,
  w: flap.w - 0.52,
  h: 1.92,
  rectRadius: 0.05,
  fill: { color: colors.navy, transparency: 100 },
  line: { color: colors.gold, pt: 0.8, transparency: 45 },
});
addBody(outer, "Prima e dopo reali di una riparazione senza verniciatura.", flap.x + 0.2, 6.94, flap.w - 0.4, 0.14, {
  fontSize: 7.6,
  color: colors.muted,
  align: "center",
});

// Front cover
outer.addShape(pptx.ShapeType.roundRect, {
  x: panelX[2] + 0.08,
  y: 1.02,
  w: panelW[2] - 0.16,
  h: 6.9,
  rectRadius: 0.06,
  fill: { color: colors.navy, transparency: 0 },
  line: { color: colors.gold, pt: 1 },
});
addPanelLogo(outer, panelX[2] + 0.34, 1.16, 1.72, 0.56);
outer.addShape(pptx.ShapeType.line, {
  x: panelX[2] + 0.34,
  y: 1.92,
  w: 1.18,
  h: 0,
  line: { color: colors.gold, pt: 1.2 },
});
outer.addShape(pptx.ShapeType.line, {
  x: panelX[2] + 0.34,
  y: 5.72,
  w: 2.9,
  h: 0,
  line: { color: colors.line, pt: 0.8, transparency: 40 },
});
addKicker(outer, "Folder Tecnico-Commerciale", panelX[2] + 0.34, 2.08, 2.7, colors.gold);
addBody(outer, "Precisione artigianale nella riparazione delle ammaccature senza verniciatura.", panelX[2] + 0.34, 2.42, 2.98, 1.48, {
  fontFace: "Sora",
  fontSize: 15.3,
  bold: true,
  color: colors.textLight,
});
addBody(
  outer,
  "Curiamo ogni vettura con attenzione al dettaglio e portiamo lo stesso standard nelle operazioni con volume, flotte e picchi di domanda.",
  panelX[2] + 0.34,
  4.02,
  2.92,
  0.92,
  { color: colors.textLight, fontSize: 9.3 }
);
[
  { t: "Precisione", x: panelX[2] + 0.36, w: 0.98 },
  { t: "Dettaglio", x: panelX[2] + 1.5, w: 0.98 },
  { t: "Scala", x: panelX[2] + 2.64, w: 0.86 },
].forEach((item) => {
  outer.addShape(pptx.ShapeType.roundRect, {
    x: item.x,
    y: 5.18,
    w: item.w,
    h: 0.3,
    rectRadius: 0.05,
    fill: { color: colors.blueSoft, transparency: 4 },
    line: { color: colors.gold, pt: 0.9 },
  });
  addBody(outer, item.t, item.x + 0.06, 5.25, item.w - 0.12, 0.12, {
    fontFace: "Manrope",
    fontSize: 7.2,
    bold: true,
    color: colors.textLight,
    align: "center",
  });
});
outer.addShape(pptx.ShapeType.roundRect, {
  x: panelX[2] + 0.34,
  y: 6.08,
  w: 2.56,
  h: 0.98,
  rectRadius: 0.06,
  fill: { color: colors.navy, transparency: 100 },
  line: { color: colors.gold, pt: 1 },
});
addBody(outer, "Prenota una dimostrazione.", panelX[2] + 0.52, 6.26, 2.3, 0.2, {
  fontFace: "Sora",
  fontSize: 11.2,
  bold: true,
  color: colors.gold,
});
addBody(outer, "Se non ti convince, non paghi.", panelX[2] + 0.52, 6.66, 2.3, 0.14, {
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.textLight,
});

const inner = pptx.addSlide();
addBase(inner, "LATO INTERNO");

// Inner left
const left = addPanelCard(inner, 0, 1.02, 6.9, { fill: colors.panel, line: colors.line });
addKicker(inner, "Dove Entriamo", left.x + 0.18, 1.28, 1.7);
addBody(inner, "Quando l'operazione comincia a rallentare.", left.x + 0.18, 1.62, left.w - 0.36, 0.74, {
  fontFace: "Sora",
  fontSize: 15.2,
  bold: true,
  color: colors.textDark,
});
addBulletList(
  inner,
  [
    "Coda accumulata e pressione sulle scadenze",
    "Picchi dopo grandine o volume straordinario",
    "Mancanza di squadra specializzata nel momento critico",
    "Necessita di mantenere lo standard senza allungare il fermo vettura",
  ],
  left.x + 0.16,
  2.52,
  left.w - 0.32,
  1.7,
  colors.textDark,
  8.9
);
inner.addShape(pptx.ShapeType.line, {
  x: left.x + 0.18,
  y: 4.24,
  w: left.w - 0.36,
  h: 0,
  line: { color: colors.line, pt: 0.8, transparency: 35 },
});
inner.addImage({
  path: assets.hero,
  ...imageSizingCrop(assets.hero, left.x + 0.18, 4.46, left.w - 0.36, 2.1),
});
inner.addShape(pptx.ShapeType.roundRect, {
  x: left.x + 0.18,
  y: 4.46,
  w: left.w - 0.36,
  h: 2.1,
  rectRadius: 0.05,
  fill: { color: colors.navy, transparency: 100 },
  line: { color: colors.gold, pt: 0.8, transparency: 45 },
});
addBody(inner, "Ingresso tecnico in ambiente controllato.", left.x + 0.22, 6.76, left.w - 0.44, 0.14, {
  fontSize: 7.6,
  color: colors.muted,
  align: "center",
});

// Inner middle
const middle = addPanelCard(inner, 1, 1.02, 6.9, { fill: colors.navySoft, line: colors.gold });
addPanelLogo(inner, middle.x + 0.18, 1.16, 1.72, 0.56);
addKicker(inner, "Como Actuamos", middle.x + 0.18, 2.0, 1.8, colors.gold);
addBody(inner, "Metodo tecnico que sustenta rapidez e qualidade.", middle.x + 0.18, 2.34, middle.w - 0.36, 0.72, {
  fontFace: "Sora",
  fontSize: 15,
  bold: true,
  color: colors.textLight,
});
[
  { n: "01", t: "Leitura tecnica", b: "Avaliamos dano, volume e prioridade." , x: middle.x + 0.18, y: 3.18 },
  { n: "02", t: "Planeamento", b: "Ajustamos equipa e ritmo ao prazo." , x: middle.x + 1.88, y: 3.18 },
  { n: "03", t: "Execucao", b: "Trabalho preciso, artesanal e controlado." , x: middle.x + 0.18, y: 4.64 },
  { n: "04", t: "Entrega", b: "Revisao final e devolucao dentro do combinado." , x: middle.x + 1.88, y: 4.64 },
].forEach((step) => {
  inner.addShape(pptx.ShapeType.roundRect, {
    x: step.x,
    y: step.y,
    w: 1.46,
    h: 1.18,
    rectRadius: 0.05,
    fill: { color: colors.blueSoft, transparency: 6 },
    line: { color: colors.line, pt: 0.9 },
  });
  inner.addShape(pptx.ShapeType.roundRect, {
    x: step.x + 0.12,
    y: step.y + 0.12,
    w: 0.42,
    h: 0.24,
    rectRadius: 0.04,
    fill: { color: colors.gold },
    line: { color: colors.gold, pt: 0.8 },
  });
  addBody(inner, step.n, step.x + 0.14, step.y + 0.17, 0.38, 0.1, {
    fontFace: "Sora",
    fontSize: 7.8,
    bold: true,
    color: colors.navy,
    align: "center",
  });
  addBody(inner, step.t, step.x + 0.12, step.y + 0.46, 1.18, 0.18, {
    fontFace: "Sora",
    fontSize: 8.7,
    bold: true,
    color: colors.textLight,
  });
  addBody(inner, step.b, step.x + 0.12, step.y + 0.68, 1.18, 0.3, {
    fontSize: 7.8,
    color: colors.textLight,
  });
});
addBody(inner, "O que isto protege na operacao", middle.x + 0.18, 5.98, 2.1, 0.16, {
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
});
addChip(inner, "Precisao", middle.x + 0.18, 6.56, 0.86);
addChip(inner, "Padrao", middle.x + 1.12, 6.56, 0.86);
addChip(inner, "Escala", middle.x + 2.06, 6.56, 0.86);

// Inner right
const right = addPanelCard(inner, 2, 1.02, 6.9, { fill: colors.panel, line: colors.line });
addKicker(inner, "Do Detalhe A Escala", right.x + 0.18, 1.28, 2);
addBody(inner, "Tratamos bem um unico carro e conseguimos sustentar esse padrao quando o volume cresce.", right.x + 0.18, 1.62, right.w - 0.36, 0.9, {
  fontFace: "Sora",
  fontSize: 14,
  bold: true,
  color: colors.textDark,
});
[
  {
    title: "Precisao artesanal",
    body: "Cada intervencao e tratada com detalhe, leitura tecnica e foco no acabamento.",
    y: 2.84,
  },
  {
    title: "Padrao replicavel",
    body: "O metodo permite repetir qualidade e controlo em cada carro que entra.",
    y: 4.02,
  },
  {
    title: "Escala controlada",
    body: "Quando o volume cresce, ampliamos capacidade sem perder criterio tecnico.",
    y: 5.2,
  },
].forEach((card) => {
  inner.addShape(pptx.ShapeType.roundRect, {
    x: right.x + 0.18,
    y: card.y,
    w: right.w - 0.36,
    h: 0.9,
    rectRadius: 0.05,
    fill: { color: colors.panel, transparency: 0 },
    line: { color: colors.line, pt: 0.9 },
  });
  inner.addShape(pptx.ShapeType.ellipse, {
    x: right.x + 0.3,
    y: card.y + 0.2,
    w: 0.34,
    h: 0.34,
    fill: { color: colors.blueSoft, transparency: 8 },
    line: { color: colors.gold, pt: 0.8 },
  });
  addBody(inner, card.title, right.x + 0.76, card.y + 0.18, 1.9, 0.16, {
    fontFace: "Sora",
    fontSize: 8.9,
    bold: true,
    color: colors.textDark,
  });
  addBody(inner, card.body, right.x + 0.76, card.y + 0.42, 2.2, 0.24, {
    fontSize: 7.9,
    color: colors.textDark,
  });
});
addBody(
  inner,
  "O cliente percebe mais seguranca, mais fluidez operacional e mais confianca para entregar bem, mesmo em picos de procura.",
  right.x + 0.18,
  6.3,
  right.w - 0.36,
  0.48,
  { color: colors.muted, fontSize: 8.2 }
);
inner.addShape(pptx.ShapeType.line, {
  x: right.x + 0.18,
  y: 6.94,
  w: 1.36,
  h: 0,
  line: { color: colors.gold, pt: 1 },
});
addBody(inner, "Agende uma demonstracao.", right.x + 0.18, 7.06, 2.2, 0.18, {
  fontFace: "Sora",
  fontSize: 11.8,
  bold: true,
  color: colors.navy,
});
addBody(inner, "Se nao gostar, nao paga.", right.x + 0.18, 7.3, 2.2, 0.12, {
  fontFace: "Manrope",
  fontSize: 8.3,
  bold: true,
  color: colors.blue,
});

// A face externa usa composicao tipografica com elementos decorativos intencionais.
finalize(inner);

const outputFile = path.join(deckDir, "vittore_folder_triptico_v15.pptx");

pptx.writeFile({ fileName: outputFile }).then(() => {
  console.log(`Folder gerado em: ${outputFile}`);
});
