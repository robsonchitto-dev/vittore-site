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
pptx.subject = "Apresentacao tecnico-comercial baseada no site e no fluxo mgold";
pptx.title = "Vittore PDR Group - Versao Tecnico-Comercial";
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
  brands: image("logo-marcas.jpg"),
};

const colors = {
  navy: "07111F",
  navySoft: "0B1B33",
  navyCard: "10233F",
  blue: "0057B8",
  blueSoft: "0F4A8B",
  gold: "C9A148",
  goldDeep: "8F7431",
  text: "F5F8FD",
  muted: "B2BECE",
  line: "294261",
  paper: "F4F7FB",
};

function addBackdrop(slide, opts = {}) {
  const title = opts.title;
  const kicker = opts.kicker;
  const footer = opts.footer || "vittorepdr.com + fluxo mgold";
  const titleW = opts.titleW || 6.1;

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
    w: 12.0,
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
      w: 4.6,
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
      h: 0.85,
      fontFace: "Sora",
      fontSize: 21,
      bold: true,
      color: colors.text,
      margin: 0,
      breakLine: false,
    });
  }
  slide.addText(footer, {
    x: 9.9,
    y: 7.02,
    w: 2.8,
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
    y: y + 0.5,
    w: w - 0.32,
    h: h - 0.64,
    fontFace: "Manrope",
    fontSize: 9.4,
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
    h: 1.38,
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
    h: 0.26,
    fontFace: "Manrope",
    fontSize: 8.8,
    color: colors.muted,
    margin: 0,
  });
}

function addSectionLabel(slide, label, x, y, w) {
  slide.addText(label.toUpperCase(), {
    x,
    y,
    w,
    h: 0.18,
    fontFace: "Manrope",
    fontSize: 8.2,
    bold: true,
    color: colors.gold,
    charSpace: 1.2,
    margin: 0,
  });
}

function addValueRow(slide, label, value, x, y, w, accent) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.66,
    rectRadius: 0.05,
    fill: { color: accent ? colors.blueSoft : colors.navyCard, transparency: accent ? 8 : 0 },
    line: { color: accent ? colors.gold : colors.line, pt: 1 },
  });
  slide.addText(label, {
    x: x + 0.16,
    y: y + 0.14,
    w: 1.8,
    h: 0.14,
    fontFace: "Manrope",
    fontSize: 8.2,
    bold: true,
    color: accent ? colors.gold : colors.muted,
    margin: 0,
  });
  slide.addText(value, {
    x: x + 0.16,
    y: y + 0.31,
    w: w - 0.32,
    h: 0.16,
    fontFace: "Sora",
    fontSize: 11.2,
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

const slide1 = pptx.addSlide();
addBackdrop(slide1);
addPageNumber(slide1, 1);
slide1.addText("VERSAO TECNICO-COMERCIAL", {
  x: 0.62,
  y: 1.08,
  w: 4.25,
  h: 0.2,
  fontFace: "Manrope",
  fontSize: 9,
  bold: true,
  color: colors.gold,
  charSpace: 1.6,
  margin: 0,
});
slide1.addText("Como a Vittore estrutura escopo, calculo e condicoes da proposta.", {
  x: 0.62,
  y: 1.46,
  w: 5.7,
  h: 1.0,
  fontFace: "Sora",
  fontSize: 24,
  bold: true,
  color: colors.text,
  margin: 0,
});
slide1.addText(
  "Esta versao combina a mensagem institucional do site com o fluxo real do mgold: qualificacao do caso, calculo por impactos, resumo financeiro, condicoes gerais e envio da proposta ao cliente.",
  {
    x: 0.62,
    y: 2.7,
    w: 5.45,
    h: 0.9,
    fontFace: "Manrope",
    fontSize: 10.8,
    color: colors.muted,
    margin: 0,
  }
);
addChip(slide1, "Faixa de impactos", 0.62, 3.92, 1.82);
addChip(slide1, "Servicos adicionais", 2.58, 3.92, 2.06);
addChip(slide1, "Condicoes gerais", 4.78, 3.92, 1.9);
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 7.0,
  y: 1.08,
  w: 5.56,
  h: 4.1,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 100 },
  line: { color: colors.gold, transparency: 48, pt: 1.2 },
  shadow: safeOuterShadow("000000", 0.2, 45, 2, 1),
});
slide1.addImage({
  path: assets.hero,
  ...imageSizingCrop(assets.hero, 7.12, 1.2, 5.32, 3.86),
});
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 8.0,
  y: 5.38,
  w: 4.15,
  h: 1.04,
  rectRadius: 0.08,
  fill: { color: colors.navySoft, transparency: 0 },
  line: { color: colors.line, pt: 1 },
});
slide1.addText("Base desta leitura", {
  x: 8.18,
  y: 5.56,
  w: 1.5,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide1.addText("Site Vittore + mgold (orcamento, proposta e envio ao cliente).", {
  x: 8.18,
  y: 5.8,
  w: 3.58,
  h: 0.24,
  fontFace: "Manrope",
  fontSize: 8.8,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide1);

const slide2 = pptx.addSlide();
addBackdrop(slide2, {
  kicker: "Base operacional",
  title: "O que o fluxo tecnico-comercial ja sustenta.",
});
addPageNumber(slide2, 2);
slide2.addText("A proposta nasce de uma leitura tecnica organizada e so depois vira discurso comercial.", {
  x: 0.62,
  y: 2.16,
  w: 5.9,
  h: 0.34,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addBulletCard(
  slide2,
  "Entradas do orcamento",
  [
    "Qualificacao do cliente, contrato, marca, modelo, placa e tipo de servico",
    "Escolha da tabela de preco e validacao da categoria do veiculo",
    "Registro dos impactos por peca e da intervencao prevista",
    "Pergunta obrigatoria sobre porte da montagem/desmontagem e responsavel",
  ],
  0.62,
  2.78,
  3.45,
  2.9,
  false
);
addBulletCard(
  slide2,
  "Saidas para o PDF",
  [
    "Informacao do cliente e do veiculo",
    "Tabela por peca, intervencao, impactos e valor",
    "Resumo financeiro com bruto, extras, desconto e total",
    "Condicoes gerais, validade da proposta e link de aceitacao",
  ],
  4.32,
  2.78,
  3.45,
  2.9,
  true
);
slide2.addImage({
  path: assets.team,
  ...imageSizingCrop(assets.team, 8.08, 2.02, 4.48, 4.3),
});
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 8.08,
  y: 2.02,
  w: 4.48,
  h: 4.3,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 100 },
  line: { color: colors.gold, transparency: 55, pt: 1.1 },
});
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 8.46,
  y: 5.08,
  w: 3.72,
  h: 0.94,
  rectRadius: 0.08,
  fill: { color: colors.navySoft, transparency: 0 },
  line: { color: colors.line, pt: 1 },
});
slide2.addText("Leitura comercial", {
  x: 8.66,
  y: 5.26,
  w: 1.45,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide2.addText("O discurso ganha forca quando mostra de onde sai o preco e como o servico sera controlado.", {
  x: 8.66,
  y: 5.5,
  w: 3.1,
  h: 0.24,
  fontFace: "Manrope",
  fontSize: 8.8,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide2);

const slide3 = pptx.addSlide();
addBackdrop(slide3, {
  kicker: "Calculo",
  title: "Como calculamos a proposta no mgold.",
});
addPageNumber(slide3, 3);
slide3.addText("No modelo atual, o calculo identificado no codigo e o modelo ITALIA.", {
  x: 0.62,
  y: 2.16,
  w: 5.5,
  h: 0.28,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addStep(slide3, "01", "Faixa de impactos", "Soma todos os impactos detalhados e localiza a faixa_min/faixa_max na tabela.", 0.62, 2.72, 3.0);
addStep(slide3, "02", "Coluna base", "Usa valor padrao, capo_adicional ou alu_adicional conforme a peca e o material.", 3.9, 2.72, 3.0);
addStep(slide3, "03", "Ajustes tecnicos", "Aplica acrescimo por categoria e descontos horizontal/vertical quando ha pintura sem troca.", 7.18, 2.72, 3.0);
addStep(slide3, "04", "Fechamento", "Soma extras, aplica desconto em % ou valor e grava subtotal, valor bruto e valor total.", 10.46, 2.72, 2.2);
addBulletCard(
  slide3,
  "O que pode entrar como extra",
  [
    "Montagem/desmontagem quando o campo estiver ativo e com valor",
    "Outros servicos com descricao e valor",
    "Responsavel pela desmontagem: tecnico, montador ou cliente",
  ],
  0.62,
  4.7,
  5.15,
  1.72,
  false
);
addBulletCard(
  slide3,
  "Campos financeiros que saem do calculo",
  [
    "faixaDescricao e colunaUtilizada",
    "valorFaixa, acrescimo, subtotalServicos",
    "valorDesconto, valor_bruto e valor_total",
  ],
  6.05,
  4.7,
  3.12,
  1.72,
  true
);
slide3.addShape(pptx.ShapeType.roundRect, {
  x: 9.45,
  y: 4.7,
  w: 3.15,
  h: 1.72,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1 },
});
addSectionLabel(slide3, "Leitura para venda", 9.65, 4.92, 1.5);
slide3.addText("O preco nao e arbitrario: ele nasce de regra tecnica, faixa, categoria, extras e desconto documentado.", {
  x: 9.65,
  y: 5.22,
  w: 2.58,
  h: 0.48,
  fontFace: "Manrope",
  fontSize: 8.9,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide3);

const slide4 = pptx.addSlide();
addBackdrop(slide4, {
  kicker: "Resumo financeiro",
  title: "Como a proposta apresenta o valor ao cliente.",
});
addPageNumber(slide4, 4);
slide4.addText("O documento comercial do mgold organiza o valor em camadas simples e auditaveis.", {
  x: 0.62,
  y: 2.16,
  w: 6.1,
  h: 0.28,
  fontFace: "Manrope",
  fontSize: 10.8,
  color: colors.muted,
  margin: 0,
});
addValueRow(slide4, "Valor bruto", "Base do servico calculado", 0.62, 2.76, 3.22, false);
addValueRow(slide4, "Servicos adicionais", "Montagem/desmontagem + outros servicos", 0.62, 3.54, 3.22, false);
addValueRow(slide4, "Desconto", "Percentual ou valor fixo", 0.62, 4.32, 3.22, false);
addValueRow(slide4, "Total", "valor_total apresentado no PDF", 0.62, 5.1, 3.22, true);
addBulletCard(
  slide4,
  "Estrutura do PDF",
  [
    "Hero com valor total da proposta",
    "Tabela itemizada por peca, intervencao, impactos e valor",
    "Resumo financeiro com bruto, extras, desconto e total",
    "Condicoes gerais, aceite e link da proposta completa",
  ],
  4.18,
  2.76,
  3.7,
  3.0,
  true
);
slide4.addShape(pptx.ShapeType.roundRect, {
  x: 8.18,
  y: 2.76,
  w: 4.4,
  h: 3.6,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1.05 },
});
slide4.addImage({
  path: assets.beforeAfter,
  ...imageSizingContain(assets.beforeAfter, 8.42, 3.0, 3.92, 1.9),
});
addSectionLabel(slide4, "Mensagem comercial", 8.42, 5.16, 1.8);
slide4.addText("A proposta fica mais forte quando liga evidencia tecnica, composicao financeira e facilidade de aceite.", {
  x: 8.42,
  y: 5.46,
  w: 3.42,
  h: 0.42,
  fontFace: "Manrope",
  fontSize: 8.9,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide4);

const slide5 = pptx.addSlide();
addBackdrop(slide5, {
  kicker: "Condicoes",
  title: "Condicoes gerais de fornecimento e pagamento.",
});
addPageNumber(slide5, 5);
slide5.addText("Aqui esta o ponto-chave para a versao tecnico-comercial: o fluxo ja cobre as condicoes gerais e permite personalizacao antes do envio.", {
  x: 0.62,
  y: 2.16,
  w: 6.5,
  h: 0.46,
  fontFace: "Manrope",
  fontSize: 10.6,
  color: colors.muted,
  margin: 0,
});
addBulletCard(
  slide5,
  "Condicoes gerais padrao no PDF",
  [
    "Servicos executados por tecnicos treinados com controle interno de qualidade",
    "Rececao e entrega com conferencia visual conjunta do estado do veiculo",
    "Cobertura de responsabilidade civil conforme apolice e servico contratado",
    "Validade da proposta: 15 dias a contar da emissao",
  ],
  0.62,
  2.9,
  4.1,
  2.9,
  true
);
addBulletCard(
  slide5,
  "Pagamento no fluxo atual",
  [
    "Nao encontrei campo estruturado de forma de pagamento no documento",
    "O admin possui um campo generico de Condicoes gerais antes de abrir/enviar o PDF",
    "E nesse texto personalizado que a regra comercial de pagamento deve entrar",
    "Ou seja: prazo, vencimento, adiantamento e observacoes precisam ser descritos ali",
  ],
  4.98,
  2.9,
  4.18,
  2.9,
  false
);
slide5.addShape(pptx.ShapeType.roundRect, {
  x: 9.46,
  y: 2.9,
  w: 3.14,
  h: 2.9,
  rectRadius: 0.08,
  fill: { color: colors.navyCard, transparency: 0 },
  line: { color: colors.line, pt: 1.05 },
});
addSectionLabel(slide5, "Leitura recomendada", 9.66, 3.12, 1.7);
slide5.addText("Separar o que e calculo tecnico do que e condicao de faturamento deixa a negociacao mais clara e reduz ambiguidade.", {
  x: 9.66,
  y: 3.42,
  w: 2.6,
  h: 0.66,
  fontFace: "Sora",
  fontSize: 12.4,
  bold: true,
  color: colors.text,
  margin: 0,
});
slide5.addText("Para a proposta sair redonda, vale transformar esse texto em um padrao comercial por tipo de operacao.", {
  x: 9.66,
  y: 4.3,
  w: 2.56,
  h: 0.52,
  fontFace: "Manrope",
  fontSize: 8.8,
  color: colors.muted,
  margin: 0,
});
finalizeSlide(slide5);

const slide6 = pptx.addSlide();
addBackdrop(slide6, {
  kicker: "Fechamento",
  title: "Estrutura recomendada para a proposta tecnico-comercial.",
  titleW: 5.2,
});
addPageNumber(slide6, 6);
addStep(slide6, "01", "Abertura institucional", "Apresentar Vittore, escopo e contexto operacional do cliente.", 0.62, 2.2, 2.95);
addStep(slide6, "02", "Logica de calculo", "Explicar faixa de impactos, categoria, extras e desconto.", 3.82, 2.2, 2.95);
addStep(slide6, "03", "Condicoes gerais", "Registrar qualidade, conferencia visual, seguro e validade.", 7.02, 2.2, 2.95);
addStep(slide6, "04", "Pagamento e aceite", "Formalizar forma de pagamento nas condicoes e usar o link de aceitacao.", 10.22, 2.2, 2.48);
addBulletCard(
  slide6,
  "O que esta pronto para virar narrativa comercial",
  [
    "O site ja sustenta posicionamento, autoridade e diferenciais",
    "O mgold ja sustenta calculo, resumo financeiro e documento formal",
    "O que falta consolidar e um template padrao de pagamento por tipo de proposta",
  ],
  0.62,
  4.36,
  5.62,
  1.94,
  false
);
slide6.addShape(pptx.ShapeType.roundRect, {
  x: 6.54,
  y: 4.36,
  w: 6.06,
  h: 1.94,
  rectRadius: 0.08,
  fill: { color: colors.blueSoft, transparency: 8 },
  line: { color: colors.gold, pt: 1.05 },
});
slide6.addImage({
  path: assets.brands,
  ...imageSizingContain(assets.brands, 6.8, 4.6, 2.4, 1.16),
});
slide6.addText("Mensagem final", {
  x: 9.52,
  y: 4.66,
  w: 1.5,
  h: 0.16,
  fontFace: "Manrope",
  fontSize: 8.2,
  bold: true,
  color: colors.gold,
  margin: 0,
});
slide6.addText("A proposta tecnico-comercial ideal da Vittore mostra de onde sai o valor, como o servico sera entregue e sob quais condicoes o cliente avanca.", {
  x: 9.52,
  y: 4.94,
  w: 2.56,
  h: 0.58,
  fontFace: "Sora",
  fontSize: 12.6,
  bold: true,
  color: colors.text,
  margin: 0,
});
finalizeSlide(slide6);

const outputFile = path.join(deckDir, "vittore_apresentacao_tecnico_comercial.pptx");

pptx.writeFile({ fileName: outputFile }).then(() => {
  console.log(`Deck gerado em: ${outputFile}`);
});
