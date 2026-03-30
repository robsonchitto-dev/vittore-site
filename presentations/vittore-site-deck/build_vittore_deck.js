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
const { safeOuterShadow } = require("./pptxgenjs_helpers/util");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Vittore PDR Group";
pptx.subject = "Apresentacao comercial baseada no site institucional";
pptx.title = "Vittore PDR Group";
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
  map: image("mapa-global.jpg"),
  backdrop: image("fundo.png"),
};

const colors = {
  navy: "07111F",
  navySoft: "0B1B33",
  navyCard: "10233F",
  blue: "0057B8",
  blueDeep: "003C79",
  gold: "C9A148",
  goldDeep: "8F7431",
  text: "F5F8FD",
  muted: "B2BECE",
  line: "294261",
  green: "3E926A",
};

function addBackdrop(slide, opts = {}) {
  const title = opts.title;
  const kicker = opts.kicker;
  const light = !!opts.light;
  const footer = opts.footer || "vittorepdr.com";
  const titleW = opts.titleW || 6.25;
  const titleFontSize = opts.titleFontSize || 22;

  slide.background = { color: light ? "F4F7FB" : colors.navy };

  if (!light) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.333,
      h: 0.22,
      fill: { color: colors.blue, transparency: 10 },
      line: { color: colors.blue, transparency: 100 },
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.6,
      y: 0.68,
      w: 12.0,
      h: 0,
      line: { color: colors.gold, transparency: 40, pt: 1.2 },
    });
  } else {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.333,
      h: 0.18,
      fill: { color: colors.blue },
      line: { color: colors.blue, transparency: 100 },
    });
  }

  slide.addImage({
    path: assets.logo,
    ...imageSizingContain(assets.logo, 0.58, 0.22, 1.62, 0.58),
  });

  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: 0.62,
      y: 0.9,
      w: 4.5,
      h: 0.25,
      fontFace: "Manrope",
      fontSize: 9,
      bold: true,
      color: light ? colors.goldDeep : colors.gold,
      charSpace: 1.6,
      margin: 0,
    });
  }

  if (title) {
    slide.addText(title, {
      x: 0.62,
      y: 1.15,
      w: titleW,
      h: 0.85,
      fontFace: "Sora",
      fontSize: titleFontSize,
      bold: true,
      color: light ? colors.navy : colors.text,
      margin: 0,
      breakLine: false,
    });
  }

  slide.addText(footer, {
    x: 10.75,
    y: 7.02,
    w: 1.95,
    h: 0.2,
    fontFace: "Manrope",
    fontSize: 8,
    color: light ? colors.blueDeep : colors.muted,
    align: "right",
    margin: 0,
  });
}

function addPageNumber(slide, page) {
  slide.addText(String(page).padStart(2, "0"), {
    x: 12.12,
    y: 0.28,
    w: 0.6,
    h: 0.24,
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
    line: { color: colors.gold, transparency: 62, pt: 1 },
  });
  slide.addText(text, {
    x: x + 0.08,
    y: y + 0.08,
    w: w - 0.16,
    h: 0.16,
    fontFace: "Manrope",
    fontSize: 8.5,
    color: colors.text,
    bold: true,
    align: "center",
    margin: 0,
  });
}

function addStatCard(slide, stat, label, x, y, w, primary) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 1.32,
    rectRadius: 0.08,
    fill: { color: primary ? colors.blue : colors.navyCard, transparency: 4 },
    line: { color: primary ? colors.gold : colors.line, pt: 1.1 },
    shadow: safeOuterShadow("000000", 0.22, 45, 2, 1),
  });
  slide.addText(stat, {
    x: x + 0.18,
    y: y + 0.2,
    w: w - 0.36,
    h: 0.44,
    fontFace: "Sora",
    fontSize: 19,
    bold: true,
    color: primary ? colors.text : colors.gold,
    margin: 0,
    align: "left",
  });
  slide.addText(label, {
    x: x + 0.18,
    y: y + 0.72,
    w: w - 0.36,
    h: 0.32,
    fontFace: "Manrope",
    fontSize: 9.5,
    color: colors.text,
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
    fill: { color: accent ? colors.blue : colors.navyCard, transparency: accent ? 10 : 0 },
    line: { color: accent ? colors.gold : colors.line, pt: 1.1 },
  });
  slide.addText(heading, {
    x: x + 0.18,
    y: y + 0.16,
    w: w - 0.36,
    h: 0.3,
    fontFace: "Sora",
    fontSize: 13,
    bold: true,
    color: colors.text,
    margin: 0,
  });
  const runs = [];
  bullets.forEach((bullet) => {
    runs.push({
      text: bullet,
      options: {
        bullet: { indent: 10 },
        breakLine: true,
      },
    });
  });
  slide.addText(runs, {
    x: x + 0.16,
    y: y + 0.52,
    w: w - 0.32,
    h: h - 0.68,
    fontFace: "Manrope",
    fontSize: 10,
    color: colors.muted,
    margin: 0,
    breakLine: false,
    valign: "top",
    paraSpaceAfterPt: 7,
  });
}

function addStep(slide, number, title, body, x, y, w) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 1.35,
    rectRadius: 0.08,
    fill: { color: colors.navyCard, transparency: 2 },
    line: { color: colors.line, pt: 1 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.18,
    y: y + 0.18,
    w: 0.55,
    h: 0.34,
    rectRadius: 0.07,
    fill: { color: colors.gold },
    line: { color: colors.gold, pt: 1 },
  });
  slide.addText(number, {
    x: x + 0.2,
    y: y + 0.25,
    w: 0.5,
    h: 0.12,
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
    h: 0.26,
    fontFace: "Sora",
    fontSize: 12,
    bold: true,
    color: colors.text,
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.18,
    y: y + 0.94,
    w: w - 0.36,
    h: 0.24,
    fontFace: "Manrope",
    fontSize: 9,
    color: colors.muted,
    margin: 0,
  });
}

function addSupportItem(slide, number, title, body, x, y, w) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.8,
    rectRadius: 0.06,
    fill: { color: colors.navySoft, transparency: 0 },
    line: { color: colors.line, pt: 1 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.16,
    y: y + 0.14,
    w: 0.44,
    h: 0.26,
    rectRadius: 0.05,
    fill: { color: colors.gold },
    line: { color: colors.gold, pt: 1 },
  });
  slide.addText(number, {
    x: x + 0.18,
    y: y + 0.18,
    w: 0.4,
    h: 0.1,
    fontFace: "Sora",
    fontSize: 8,
    bold: true,
    color: colors.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(title, {
    x: x + 0.72,
    y: y + 0.13,
    w: w - 0.92,
    h: 0.16,
    fontFace: "Sora",
    fontSize: 10.2,
    bold: true,
    color: colors.text,
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.72,
    y: y + 0.36,
    w: w - 0.92,
    h: 0.18,
    fontFace: "Manrope",
    fontSize: 8.4,
    color: colors.muted,
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

const slide1 = pptx.addSlide();
addBackdrop(slide1);
addPageNumber(slide1, 1);
slide1.addText("APRESENTACAO COMERCIAL", {
  x: 0.62,
  y: 1.08,
  w: 3.4,
  h: 0.22,
  fontFace: "Manrope",
  fontSize: 9,
  bold: true,
  color: colors.gold,
  charSpace: 1.6,
  margin: 0,
});
slide1.addText("Soluções concretas, mesmo onde os outros não chegam.", {
  x: 0.62,
  y: 1.46,
  w: 5.55,
  h: 1.22,
  fontFace: "Sora",
  fontSize: 28,
  bold: true,
  color: colors.text,
  margin: 0,
  breakLine: false,
});
slide1.addText(
  "Operação B2B de PDR, granizo e alta demanda com equipes homologadas para atuar dentro da estrutura do cliente, acelerar prazos e manter o padrão de qualidade.",
  {
    x: 0.62,
    y: 2.92,
    w: 5.2,
    h: 0.92,
    fontFace: "Manrope",
    fontSize: 11.5,
    color: colors.muted,
    margin: 0,
    valign: "top",
  }
);
addChip(slide1, "Menos pintura", 0.62, 4.14, 1.5);
addChip(slide1, "Menos tempo parado", 2.26, 4.14, 2.02);
addChip(slide1, "Mais produtividade", 4.42, 4.14, 1.92);
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 7.0,
  y: 1.08,
  w: 5.56,
  h: 4.32,
  rectRadius: 0.1,
  fill: { color: colors.navyCard, transparency: 100 },
  line: { color: colors.gold, transparency: 50, pt: 1.2 },
});
slide1.addImage({
  path: assets.hero,
  ...imageSizingCrop(assets.hero, 7.12, 1.2, 5.32, 4.08),
});
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 8.0,
  y: 5.48,
  w: 4.1,
  h: 0.94,
  rectRadius: 0.08,
  fill: { color: colors.navy, transparency: 8 },
  line: { color: colors.line, pt: 1 },
});
slide1.addText("Presença em campo", {
  x: 8.18,
  y: 5.62,
  w: 1.7,
  h: 0.18,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide1.addText("Equipe preparada para entrar na operação do cliente e devolver fluidez ao trabalho.", {
  x: 8.18,
  y: 5.86,
  w: 3.58,
  h: 0.32,
  fontFace: "Manrope",
  fontSize: 8.9,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide1);

const slide2 = pptx.addSlide();
addBackdrop(slide2, {
  kicker: "Contexto",
  title: "Quando a operação começa a travar.",
});
addPageNumber(slide2, 2);
slide2.addText(
  "A Vittore entra quando o volume cresce, o prazo aperta e a estrutura precisa de reforço técnico sem abrir mão do acabamento.",
  {
    x: 0.62,
    y: 2.16,
    w: 6.0,
    h: 0.52,
    fontFace: "Manrope",
    fontSize: 11,
    color: colors.muted,
    margin: 0,
  }
);
addBulletCard(
  slide2,
  "Sinais de gargalo",
  [
    "Volume acumulado e mais veículos pendentes",
    "Atraso nas entregas e pressão sobre o time",
    "Falta de equipe especializada",
    "Picos de demanda após granizo",
  ],
  0.62,
  2.92,
  3.05,
  2.52,
  false
);
addBulletCard(
  slide2,
  "Como a Vittore responde",
  [
    "Equipe ajustada ao volume da operação",
    "Atuação in loco na estrutura do cliente",
    "Técnicos homologados e supervisão ativa",
    "Mais fluidez sem concorrer com o cliente final",
  ],
  3.9,
  2.92,
  3.2,
  2.52,
  true
);
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 7.45,
  y: 1.58,
  w: 5.15,
  h: 4.8,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1 },
});
slide2.addText("Valor percebido pelo parceiro", {
  x: 7.7,
  y: 1.9,
  w: 2.7,
  h: 0.2,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide2.addText("Não somos oficina. Somos uma extensão da sua capacidade produtiva.", {
  x: 7.7,
  y: 2.18,
  w: 4.25,
  h: 0.64,
  fontFace: "Sora",
  fontSize: 18,
  bold: true,
  color: colors.text,
  margin: 0,
});
slide2.addText(
  "O site posiciona a marca como uma operação B2B que entra rápido, organiza a execução e ajuda o cliente a recuperar ritmo com menos etapas, menos pintura e mais produtividade.",
  {
    x: 7.7,
    y: 3.04,
    w: 4.3,
    h: 0.74,
    fontFace: "Manrope",
    fontSize: 9.6,
    color: colors.muted,
    margin: 0,
  }
);
addChip(slide2, "Sem conflito comercial", 7.7, 4.45, 1.94);
addChip(slide2, "Entrada rápida", 9.8, 4.45, 1.55);
addChip(slide2, "Ritmo com padrão", 7.7, 4.95, 1.7);
addChip(slide2, "Resposta sob demanda", 9.55, 4.95, 2.12);
finalizeSlide(slide2);

const slide3 = pptx.addSlide();
addBackdrop(slide3, {
  kicker: "Atuação",
  title: "Método de execução em quatro etapas.",
});
addPageNumber(slide3, 3);
slide3.addText("Quatro etapas para trabalhar com método, agilidade e pontualidade.", {
  x: 0.62,
  y: 2.16,
  w: 5.3,
  h: 0.28,
  fontFace: "Manrope",
  fontSize: 11,
  color: colors.muted,
  margin: 0,
});
addStep(slide3, "01", "Diagnóstico", "Leitura de volume, prazo e tipo de dano.", 0.62, 2.6, 2.9);
addStep(slide3, "02", "Mobilização", "Equipe montada conforme a necessidade.", 3.75, 2.6, 2.9);
addStep(slide3, "03", "Execução", "Ritmo técnico com controle e acabamento.", 6.88, 2.6, 2.9);
addStep(slide3, "04", "Entrega", "Revisão final e devolução dentro do prazo.", 10.01, 2.6, 2.7);
slide3.addShape(pptx.ShapeType.line, {
  x: 1.4,
  y: 3.28,
  w: 9.35,
  h: 0,
  line: { color: colors.gold, transparency: 30, pt: 1.4, beginArrowType: "none", endArrowType: "triangle" },
});
addBulletCard(
  slide3,
  "Princípios operacionais",
  [
    "Equipe ajustada ao volume",
    "Atuação dentro da estrutura do cliente",
    "Sem concorrência com o cliente final",
    "Técnicos homologados e postura compatível com o ambiente",
  ],
  0.62,
  4.72,
  5.55,
  1.76,
  false
);
slide3.addShape(pptx.ShapeType.roundRect, {
  x: 6.52,
  y: 4.72,
  w: 6.08,
  h: 1.95,
  rectRadius: 0.08,
  fill: { color: colors.blue, transparency: 10 },
  line: { color: colors.gold, pt: 1 },
});
slide3.addText("Mensagem-chave", {
  x: 6.76,
  y: 4.95,
  w: 1.6,
  h: 0.18,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide3.addText("A Vittore entra para destravar a operação com método, equipe especializada e ritmo de execução.", {
  x: 6.76,
  y: 5.22,
  w: 5.25,
  h: 0.52,
  fontFace: "Sora",
  fontSize: 15.5,
  bold: true,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide3);

const slide4 = pptx.addSlide();
addBackdrop(slide4, {
  kicker: "Escala e time",
  title: "Diferenciais para decidir com segurança.",
});
addPageNumber(slide4, 4);
addStatCard(slide4, "+18", "anos de experiência", 0.62, 2.28, 2.8, true);
addStatCard(slide4, "+10.000", "veículos reparados", 3.64, 2.28, 2.8, false);
addStatCard(slide4, "+100", "técnicos mobilizáveis", 6.66, 2.28, 2.8, false);
addStatCard(slide4, "In loco", "atuação dentro da estrutura do cliente", 9.68, 2.28, 2.65, false);
slide4.addImage({
  path: assets.team,
  ...imageSizingCrop(assets.team, 0.62, 3.9, 4.2, 2.4),
});
slide4.addShape(pptx.ShapeType.roundRect, {
  x: 0.62,
  y: 3.9,
  w: 4.2,
  h: 2.4,
  rectRadius: 0.06,
  line: { color: colors.gold, transparency: 55, pt: 1.1 },
    fill: { color: colors.navyCard, transparency: 100 },
});
addBulletCard(
  slide4,
  "Estrutura de entrega",
  [
    "Técnicos homologados por critério técnico e postura",
    "Supervisão ativa e ajuste rápido em campo",
    "Organização, uniforme e imagem profissional",
    "Ferramentas e sistema para controle do trabalho",
  ],
  5.12,
  3.9,
  3.45,
  2.4,
  false
);
addBulletCard(
  slide4,
  "Impacto operacional",
  [
    "Mais peças recuperadas",
    "Mais velocidade no processo",
    "Menos retrabalho",
    "Ritmo com padrão e acabamento",
  ],
  8.82,
  3.9,
  3.5,
  2.4,
  true
);
finalizeSlide(slide4);

const slide5 = pptx.addSlide();
addBackdrop(slide5, {
  kicker: "Clientes",
  title: "Onde a Vittore gera valor.",
});
addPageNumber(slide5, 5);
slide5.addText("Para estruturas que precisam de resposta rápida sem perder o controle.", {
  x: 0.62,
  y: 2.16,
  w: 5.8,
  h: 0.28,
  fontFace: "Manrope",
  fontSize: 11,
  color: colors.muted,
  margin: 0,
});
const audienceCards = [
  ["Concessionárias", "Mais controle de entrega."],
  ["Oficinas", "Alívio de volume e menos dependência da pintura."],
  ["Revendas", "Veículos mais rápidos para venda."],
  ["Rent-a-car", "Frota disponível mais rápido."],
  ["Seguradoras", "Resposta técnica em cenários de alta demanda."],
];
let ax = 0.62;
let ay = 2.5;
audienceCards.forEach((card, index) => {
  slide5.addShape(pptx.ShapeType.roundRect, {
    x: ax,
    y: ay,
    w: 2.32,
    h: 1.2,
    rectRadius: 0.07,
    fill: { color: index === 0 ? colors.blue : colors.navyCard, transparency: index === 0 ? 8 : 0 },
    line: { color: index === 0 ? colors.gold : colors.line, pt: 1 },
  });
  slide5.addText(card[0], {
    x: ax + 0.16,
    y: ay + 0.18,
    w: 2.0,
    h: 0.22,
    fontFace: "Sora",
    fontSize: 11,
    bold: true,
    color: colors.text,
    margin: 0,
  });
  slide5.addText(card[1], {
    x: ax + 0.16,
    y: ay + 0.52,
    w: 2.0,
    h: 0.42,
    fontFace: "Manrope",
    fontSize: 8.8,
    color: colors.muted,
    margin: 0,
  });
  ax += 2.48;
  if (index === 2) {
    ax = 1.88;
    ay = 3.92;
  }
});
slide5.addShape(pptx.ShapeType.roundRect, {
  x: 8.05,
  y: 2.42,
  w: 4.55,
  h: 4.3,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1.1 },
});
slide5.addText("Suporte depois da entrega", {
  x: 8.32,
  y: 2.7,
  w: 2.25,
  h: 0.18,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide5.addText("A jornada continua no pós-venda, no suporte direto e em novos projetos.", {
  x: 8.32,
  y: 2.98,
  w: 3.82,
  h: 0.52,
  fontFace: "Sora",
  fontSize: 15,
  bold: true,
  color: colors.text,
  margin: 0,
});
addSupportItem(slide5, "01", "Pós-venda", "Acompanhamento e alinhamento.", 8.28, 3.92, 3.95);
addSupportItem(slide5, "02", "Suporte direto", "Resposta rápida sempre que necessário.", 8.28, 4.88, 3.95);
addSupportItem(slide5, "03", "Novo atendimento", "Reforço técnico e novos projetos.", 8.28, 5.84, 3.95);
finalizeSlide(slide5);

const slide6 = pptx.addSlide();
addBackdrop(slide6, {
  kicker: "Presença",
  title: "Atuação internacional com padrão único.",
});
addPageNumber(slide6, 6);
slide6.addText("Mesmo padrão técnico, mesma forma de atuar.", {
  x: 0.62,
  y: 2.16,
  w: 4.8,
  h: 0.26,
  fontFace: "Manrope",
  fontSize: 11,
  color: colors.muted,
  margin: 0,
});
slide6.addImage({
  path: assets.map,
  ...imageSizingContain(assets.map, 6.25, 1.4, 6.05, 4.8),
});
slide6.addShape(pptx.ShapeType.roundRect, {
  x: 6.16,
  y: 1.32,
  w: 6.2,
  h: 4.96,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 100 },
  line: { color: colors.line, pt: 1 },
});
addBulletCard(
  slide6,
  "Países citados no site",
  [
    "Portugal, Inglaterra, Itália e Alemanha",
    "França, Espanha, Bélgica e Suíça",
    "Grécia, Eslovênia e México",
    "Brasil como base de operação",
  ],
  0.62,
  2.5,
  4.8,
  2.12,
  true
);
slide6.addShape(pptx.ShapeType.roundRect, {
  x: 0.62,
  y: 4.95,
  w: 4.8,
  h: 1.18,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1 },
});
slide6.addText("Leitura comercial", {
  x: 0.86,
  y: 5.2,
  w: 1.3,
  h: 0.18,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide6.addText("A presença internacional reforça capacidade de mobilização, adaptação e consistência operacional.", {
  x: 0.86,
  y: 5.46,
  w: 3.98,
  h: 0.42,
  fontFace: "Manrope",
  fontSize: 9.5,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide6);

const slide7 = pptx.addSlide();
addBackdrop(slide7, {
  kicker: "PDR",
  title: "Reparação de amassados sem pintura.",
});
addPageNumber(slide7, 7);
slide7.addText("Menos intervenção, mais rapidez e mais preservação da peça original.", {
  x: 0.62,
  y: 2.16,
  w: 5.9,
  h: 0.28,
  fontFace: "Manrope",
  fontSize: 11,
  color: colors.muted,
  margin: 0,
});
addBulletCard(
  slide7,
  "PDR",
  [
    "Menos intervenção",
    "Menos tempo parado",
    "Mais preservação da peça original",
    "Mais produtividade",
  ],
  0.62,
  2.45,
  2.75,
  2.2,
  true
);
addBulletCard(
  slide7,
  "Na prática",
  [
    "Menos pintura quando o dano permite",
    "Menos etapas no processo",
    "Mais rapidez na devolução",
    "Mais fluidez no trabalho",
  ],
  3.6,
  2.45,
  2.75,
  2.2,
  false
);
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 6.7,
  y: 2.28,
  w: 2.9,
  h: 3.7,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1 },
});
slide7.addImage({
  path: assets.damaged,
  ...imageSizingCrop(assets.damaged, 6.83, 2.44, 2.64, 2.22),
});
slide7.addText("Danificado", {
  x: 6.95,
  y: 4.9,
  w: 1.2,
  h: 0.18,
  fontFace: "Sora",
  fontSize: 10,
  bold: true,
  color: colors.text,
  margin: 0,
});
slide7.addText("Leitura visual da deformação antes da correção.", {
  x: 6.95,
  y: 5.18,
  w: 2.3,
  h: 0.34,
  fontFace: "Manrope",
  fontSize: 8.8,
  color: colors.muted,
  margin: 0,
});
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 9.78,
  y: 2.28,
  w: 2.9,
  h: 3.7,
  rectRadius: 0.08,
  fill: { color: colors.blue, transparency: 8 },
  line: { color: colors.gold, pt: 1.1 },
});
slide7.addImage({
  path: assets.beforeAfter,
  ...imageSizingCrop(assets.beforeAfter, 9.91, 2.44, 2.64, 2.22),
});
slide7.addText("Recuperado", {
  x: 10.03,
  y: 4.9,
  w: 1.35,
  h: 0.18,
  fontFace: "Sora",
  fontSize: 10,
  bold: true,
  color: colors.text,
  margin: 0,
});
slide7.addText("Comparação visual entre o dano e a restituição da forma original.", {
  x: 10.03,
  y: 5.18,
  w: 2.25,
  h: 0.46,
  fontFace: "Manrope",
  fontSize: 8.8,
  color: colors.muted,
  margin: 0,
});
addChip(slide7, "Menos etapas", 0.62, 5.2, 1.45);
addChip(slide7, "Mais rapidez", 2.22, 5.2, 1.42);
addChip(slide7, "Mais preservação", 3.79, 5.2, 1.76);
slide7.addText("Sempre que o dano permite PDR, o processo fica mais leve, rápido e eficiente.", {
  x: 0.62,
  y: 5.78,
  w: 4.95,
  h: 0.36,
  fontFace: "Manrope",
  fontSize: 9.8,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide7);

const slide8 = pptx.addSlide();
addBackdrop(slide8, {
  kicker: "Governança",
  title: "Estrutura para crescer com padrão e consistência.",
  titleW: 4.35,
});
addPageNumber(slide8, 8);
addBulletCard(
  slide8,
  "Propósito e valores",
  [
    "Promover uma reparação mais inteligente",
    "Pessoas primeiro e respeito ao técnico",
    "Confiança do cliente e postura profissional",
    "Compromisso com a entrega e cumprimento das leis",
  ],
  0.62,
  2.14,
  4.1,
  2.45,
  true
);
addBulletCard(
  slide8,
  "Responsabilidade e risco",
  [
    "Menos pintura pode significar menos etapas e menos resíduos",
    "Seguro de responsabilidade civil durante a intervenção da equipe",
    "Estrutura pensada para crescer com consistência operacional",
  ],
  0.62,
  4.84,
  4.1,
  1.7,
  false
);
slide8.addShape(pptx.ShapeType.roundRect, {
  x: 5.12,
  y: 1.92,
  w: 3.45,
  h: 4.4,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1 },
});
slide8.addText("Estrutura organizacional", {
  x: 5.36,
  y: 2.18,
  w: 1.95,
  h: 0.18,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide8.addText("CEO\nCompliance e Legal\nCFO", {
  x: 5.36,
  y: 2.48,
  w: 2.4,
  h: 0.65,
  fontFace: "Sora",
  fontSize: 11,
  bold: true,
  color: colors.text,
  margin: 0,
  breakLine: false,
});
slide8.addText("Direção Comercial\nMarketing, vendas, assessoria técnica, prospecção e pós-venda", {
  x: 5.36,
  y: 3.38,
  w: 2.55,
  h: 0.88,
  fontFace: "Manrope",
  fontSize: 9.2,
  color: colors.muted,
  margin: 0,
  breakLine: false,
});
slide8.addText("Direção Técnica\nControle de qualidade, laboratório técnico, formação, homologação e projetos personalizados", {
  x: 5.36,
  y: 4.42,
  w: 2.55,
  h: 1.05,
  fontFace: "Manrope",
  fontSize: 9.2,
  color: colors.muted,
  margin: 0,
  breakLine: false,
});
slide8.addText("Serviços Compartilhados\nPessoas e cultura, financeiro, administrativo, legalização e integração", {
  x: 5.36,
  y: 5.58,
  w: 2.55,
  h: 0.6,
  fontFace: "Manrope",
  fontSize: 9.2,
  color: colors.muted,
  margin: 0,
  breakLine: false,
});
slide8.addShape(pptx.ShapeType.roundRect, {
  x: 8.9,
  y: 1.92,
  w: 3.7,
  h: 4.4,
  rectRadius: 0.08,
  fill: { color: colors.blue, transparency: 8 },
  line: { color: colors.gold, pt: 1.1 },
});
slide8.addImage({
  path: assets.brands,
  ...imageSizingContain(assets.brands, 9.12, 2.18, 3.28, 1.7),
});
slide8.addText("Marcas já reparadas", {
  x: 9.16,
  y: 4.1,
  w: 1.8,
  h: 0.18,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide8.addText("Referências de marcas atendidas em diferentes contextos de reparação e alta demanda.", {
  x: 9.16,
  y: 4.38,
  w: 3.0,
  h: 0.42,
  fontFace: "Manrope",
  fontSize: 9.4,
  color: colors.text,
  margin: 0,
});
slide8.addText("Contato comercial", {
  x: 9.16,
  y: 5.12,
  w: 1.5,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.5,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide8.addText("Explique o cenário: nome, empresa, volume e contexto. A Vittore avalia e responde rápido.", {
  x: 9.16,
  y: 5.38,
  w: 2.95,
  h: 0.56,
  fontFace: "Manrope",
  fontSize: 9.2,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide8);

const outputFile = path.join(deckDir, "vittore_apresentacao_comercial.pptx");

pptx.writeFile({ fileName: outputFile }).then(() => {
  console.log(`Deck gerado em: ${outputFile}`);
});
