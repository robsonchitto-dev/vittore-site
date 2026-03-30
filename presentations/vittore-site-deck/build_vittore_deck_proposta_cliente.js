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
pptx.subject = "Proposta tecnico-comercial para cliente";
pptx.title = "Vittore PDR Group - Proposta Tecnico-Comercial";
pptx.lang = "pt-BR";
pptx.theme = {
  headFontFace: "Sora",
  bodyFontFace: "Manrope",
  lang: "pt-BR",
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
cover.addText("PROPOSTA TECNICO-COMERCIAL", {
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
cover.addText("Precisao artesanal em reparacao de mossas sem pintura.", {
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
cover.addText("Do carro individual a operacoes com volume, frotas e picos de procura.", {
  x: 0.76,
  y: 5.28,
  w: 5.7,
  h: 0.34,
  fontFace: "Manrope",
  fontSize: 11.2,
  color: colors.text,
  margin: 0,
});
addChip(cover, "Mossas sem pintura", 0.76, 6.12, 1.78);
addChip(cover, "Detalhe + escala", 2.66, 6.12, 1.62);
cover.addText("Lisboa e grande Lisboa", {
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
  kicker: "Capacidade tecnica",
  title: "Ampliamos capacidade sem perder padrao.",
  titleW: 5.7,
});
addPageNumber(slide1, 1);
slide1.addText("A Vittore amplia a capacidade tecnica do cliente com uma equipa especializada, pronta para actuar com rapidez, controlo e padrao.", {
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
  "Quando fazemos diferenca",
  [
    "Concessionarias e oficinas com fila, prazo apertado ou procura acima do normal",
    "Revendas e rent-a-car que precisam devolver viaturas com mais rapidez",
    "Operacoes de granizo e amassados em que o volume sobe de forma repentina",
    "Estruturas que precisam ganhar capacidade sem perder criterio tecnico",
  ],
  0.62,
  2.82,
  3.45,
  2.96,
  false
);
addBulletCard(
  slide1,
  "O que melhora para o cliente",
  [
    "Mais fluidez de processamento e entrega",
    "Mais previsibilidade no lote de viaturas",
    "Menos retrabalho e mais controlo tecnico",
    "Atuacao discreta, integrada e sem conflito com o cliente final",
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
addChip(slide1, "Menos fila", 0.62, 6.06, 1.2);
addChip(slide1, "Mais previsibilidade", 1.96, 6.06, 1.88);
addChip(slide1, "Operacao sob demanda", 3.98, 6.06, 2.08);
slide1.addText("Entramos para ampliar capacidade com o mesmo cuidado que o cliente espera no carro individual.", {
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
  kicker: "Metodo de atuacao",
  title: "Metodo tecnico com rapidez, controlo e acabamento.",
  titleW: 6.2,
});
addPageNumber(slide3, 2);
slide3.addText("Mostramos um metodo simples, visivel e replicavel para o cliente perceber organizacao, criterio e confianca.", {
  x: 0.62,
  y: 2.16,
  w: 6.9,
  h: 0.32,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addStep(slide3, "01", "Leitura do lote", "Entendemos volume, tipo de dano, prazo e contexto operacional.", 0.62, 2.76, 2.95);
addStep(slide3, "02", "Planeamento", "Definimos equipa, ritmo, escopo e necessidades de apoio.", 3.8, 2.76, 2.95);
addStep(slide3, "03", "Execucao", "Atuacao tecnica com controlo, acabamento e organizacao do fluxo.", 6.98, 2.76, 2.95);
addStep(slide3, "04", "Entrega", "Revisao final e devolucao dentro do combinado.", 10.16, 2.76, 2.55);
addBulletCard(
  slide3,
  "O que sustenta o nosso padrao",
  [
    "Equipa homologada e supervisao ativa",
    "Postura profissional compativel com ambientes exigentes",
    "Entrada rapida e capacidade ajustada ao volume",
    "Produtividade com foco em acabamento e consistencia",
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
slide3.addText("O que o cliente percebe", {
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
slide3.addText("Nao vendemos apenas mao de obra. Entregamos uma operacao que absorve volume com criterio tecnico, previsibilidade e seguranca.", {
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
  kicker: "Proposta comercial",
  title: "Criterio tecnico, proposta clara e condicoes objetivas.",
  titleW: 6.1,
});
addPageNumber(slide4, 3);
slide4.addText("A proposta fica mais facil de aprovar quando o cliente percebe uma logica justa, transparente e simples de acompanhar.", {
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
  "Como formamos a proposta",
  [
    "Cada viatura e avaliada pela quantidade de impactos e pelas pecas envolvidas",
    "A faixa tecnica posiciona o valor base de cada caso",
    "Categoria, capo ALU, pintura e servicos adicionais ajustam o valor final",
    "O cliente recebe uma proposta clara, com condicoes comerciais objetivas",
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
slide4.addText("Exemplo pratico: 1 viatura", {
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
slide4.addText("Categoria A\nCapo ALU com 30 impactos\nTeto com 10 impactos e preparacao para pintura\nTotal: 40 impactos\nFaixa tecnica: 26 a 50 impactos", {
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
slide4.addText("Preco final resumido", {
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
slide4.addText("Faixa 26-50: EUR 520\nCapo ALU: EUR 570\nCategoria A: + EUR 90\nPintura vertical: - EUR 100\nPreco final: EUR 560", {
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
addValueRow(slide4, "Faturamento", "Semanal", 0.62, 6.02, 2.56, false);
addValueRow(slide4, "Pagamento", "28 dias apos faturamento", 3.42, 6.02, 3.46, false);
addValueRow(slide4, "Condições", "Validade 15 dias | Conferencia visual | Seguro de responsabilidade civil", 7.12, 6.02, 5.48, true);
finalizeSlide(slide4);

const slide6 = pptx.addSlide();
addBackdrop(slide6, {
  kicker: "Seguranca operacional",
  title: "Porque o cliente avanca com tranquilidade.",
  titleW: 5.9,
});
addPageNumber(slide6, 4);
slide6.addText("Em vez de pedir um salto de fe, mostramos um modelo que transmite conforto operacional, seguranca e responsabilidade clara.", {
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
  "Conforto operacional",
  [
    "Atuacao complementar a equipa propria, sem conflito interno",
    "Entrada rapida em picos de volume, granizo e lote acumulado",
    "Alinhamento de SLA, capacidade diaria e checkpoints de acompanhamento",
    "Operacao discreta, integrada ao padrao da concessionaria",
    "Mais giro, menos carro parado e menos retrabalho escondido",
  ],
  0.62,
  2.84,
  5.82,
  3.0,
  false
);
addBulletCard(
  slide6,
  "Garantias de confianca",
  [
    "Preco explicado com criterio tecnico, impacto, faixa e ajustes visiveis",
    "Piloto inicial, checklist conjunto e validacao na entrega",
    "Conferencia visual, metodo tecnico e controlo de qualidade",
    "Seguro de responsabilidade civil e assuncao clara da responsabilidade",
    "Em situacoes extremas, tratamento patrimonial da solucao quando aplicavel",
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
slide6.addText("Nao estamos a pedir um ato de fe. Estamos a propor um modelo com metodo, transparencia comercial, seguro e responsabilidade clara.", {
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
  kicker: "Fechamento",
  title: "Do detalhe no carro ao resultado na operacao.",
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
  "Porque esta decisao faz sentido",
  [
    "O cliente percebe ganho operacional e mais capacidade de entrega",
    "O cliente entende uma proposta comercial clara e justificavel",
    "O cliente reconhece um metodo tecnico profissional e seguro",
    "O cliente sente conforto para testar antes de ampliar a parceria",
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
slide7.addText("Simulacao ilustrativa", {
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
slide7.addText("Como mais giro pode melhorar o resultado do mes.", {
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
slide7.addText("Sem pintura", {
  x: 10.48,
  y: 3.26,
  w: 0.78,
  h: 0.14,
  fontFace: "Manrope",
  fontSize: 7.5,
  bold: true,
  color: colors.gold,
  align: "center",
  margin: 0,
});
slide7.addText("Tradicional", {
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
  ["Margem/veiculo", "R$ 1.500", "R$ 2.000"],
  ["Prazo medio", "1 dia", "6 dias"],
  ["Capacidade/mes", "30", "5"],
  ["Resultado/mes", "R$ 45 mil", "R$ 10 mil"],
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
slide7.addText("Exemplo ilustrativo de giro e capacidade mensal.", {
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
slide7.addText("Agende uma demonstracao ou comece com um lote piloto.", {
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
slide7.addText("Se nao gostar, nao paga.", {
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

const outputFile = path.join(deckDir, "vittore_proposta_tecnico_comercial_cliente_v10.pptx");

pptx.writeFile({ fileName: outputFile }).then(() => {
  console.log(`Deck gerado em: ${outputFile}`);
});
