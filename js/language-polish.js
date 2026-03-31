(function () {
  function detectLang() {
    const path = (location.pathname || "").toLowerCase();
    const docLang = (document.documentElement.lang || "").toLowerCase();
    const queryLang = new URLSearchParams(location.search).get("lang");
    const explicit = (docLang || queryLang || "").toLowerCase();

    if (path.endsWith("brasil.html") || explicit === "pt-br" || explicit === "pt") return "pt";
    if (path.endsWith("italiano.html") || explicit === "it") return "it";
    if (path.endsWith("english.html") || explicit === "en") return "en";
    if (path.endsWith("portugal.html") || explicit === "pt-pt") return "pt-pt";
    return "pt";
  }

  const replacements = {
    it: [
      ["Specialisti in PDR operano nella tua struttura per risolvere danni da grandine e ammaccature, accelerare i tempi e mantenere lo standard qualitativo.", "Specialisti PDR operano direttamente presso la vostra struttura per gestire danni da grandine e ammaccature, ridurre i tempi di lavorazione e mantenere elevati standard qualitativi."],
      ["Specialisti PDR operano nella tua struttura per gestire grandine e ammaccature, accelerare i tempi e mantenere lo standard di qualità.", "Specialisti PDR operano direttamente presso la vostra struttura per gestire danni da grandine e ammaccature, ridurre i tempi di lavorazione e mantenere elevati standard qualitativi."],
      ["Team pronto a entrare nella struttura del cliente e ripristinare la fluidità del lavoro.", "Team pronti a operare presso la struttura del cliente per ripristinare la continuità operativa."],
      ["Creiamo il team in base alla necessità.", "Configuriamo il team in base al volume e alla tipologia di intervento."],
      ["Lavoro tecnico con ritmo, controllo e finitura.", "Intervento tecnico eseguito con controllo, continuità operativa e standard qualitativi definiti."],
      ["Non siamo officina. Siamo un'estensione della tua capacità produttiva.", "Non operiamo come officina. Interveniamo come estensione della vostra capacità produttiva."],
      ["Team adattato al volume", "Team dimensionato in funzione del volume operativo"],
      ["Operiamo all'interno della tua struttura", "Interventi eseguiti direttamente presso la vostra struttura"],
      ["Selezionati per criteri tecnici e comportamento.", "Selezionati sulla base di competenze tecniche e standard professionali."],
      ["Selezionati per competenza e affidabilità.", "Selezionati sulla base di competenze tecniche e standard professionali."],
      ["Monitoraggio attivo sul campo e aggiustamenti rapidi.", "Supervisione operativa costante e interventi tempestivi in fase esecutiva."],
      ["Controllo costante e interventi rapidi.", "Supervisione operativa costante e interventi tempestivi in fase esecutiva."],
      ["Strumenti e sistema", "Strumenti, procedure e sistemi di controllo operativi"],
      ["Capacità adattata al volume", "Capacità operativa scalabile in base al volume"],
      ["Team scalabile", "Capacità operativa scalabile in base al volume"],
      ["Comportamento compatibile con l’ambiente", "Integrazione operativa nel contesto del cliente"],
      ["Standard professionale elevato", "Integrazione operativa nel contesto del cliente"],
      ["Maggior controllo sulle consegne", "Maggiore controllo sui tempi di consegna"],
      ["Auto più veloci per la vendita", "Riduzione dei tempi di preparazione del veicolo alla vendita"],
      ["Veicoli pronti più velocemente.", "Riduzione dei tempi di preparazione del veicolo alla vendita."],
      ["Spiega il contesto. Vittore valuta e risponde rapidamente.", "Descrivete il contesto operativo. Il team Vittore valuta e fornisce un riscontro in tempi rapidi."],
      ["Nome, azienda, volume e contesto permettono già di iniziare", "Nome, azienda, volume e contesto operativo consentono una prima valutazione immediata."],
      ["Nome, azienda, volume e contesto bastano per iniziare.", "Nome, azienda, volume e contesto operativo consentono una prima valutazione immediata."],
      ["Meno intervento, più velocità e maggiore conservazione del pezzo originale.", "Minore intervento, tempi ridotti e maggiore conservazione del componente originale."],
      ["Riparazione delle ammaccature senza verniciatura. Meno interventi, meno tempo senza auto e maggiore conservazione del veicolo.", "Riparazione delle ammaccature senza verniciatura. Minore intervento, tempi ridotti e maggiore conservazione del componente originale."],
      ["Meno passaggi nel processo", "Riduzione delle fasi di lavorazione"]
    ],
    pt: [
      ["Especialistas em PDR atuam na sua estrutura para resolver granizo e amassados, acelerar prazos e manter o padrão de qualidade.", "Especialistas em PDR atuam diretamente na sua estrutura para resolver danos de granizo e amassados, reduzir o tempo de reparação e manter elevados padrões de qualidade."],
      ["Equipe preparada para entrar, executar e sustentar padrão em ambientes de alta exigência.", "Equipe preparada para atuar dentro da estrutura do cliente e restabelecer a continuidade operacional."],
      ["Equipe preparada para executar e manter padrão em ambientes de alta exigência.", "Equipe preparada para atuar dentro da estrutura do cliente e restabelecer a continuidade operacional."],
      ["Montamos a equipe conforme a necessidade.", "Configuramos a equipe de acordo com o volume e o tipo de intervenção."],
      ["Trabalho técnico com ritmo, controle e acabamento.", "Intervenção técnica executada com controle, continuidade operacional e padrões de qualidade definidos."],
      ["Não somos oficina. Somos uma extensão da sua capacidade produtiva.", "Não atuamos como oficina. Entramos como extensão da sua capacidade produtiva."],
      ["Equipe ajustada ao volume", "Equipe dimensionada em função do volume operacional"],
      ["Atuação dentro da sua operação", "Intervenções realizadas diretamente dentro da sua estrutura"],
      ["Selecionados por critério técnico e postura.", "Selecionados com base em competências técnicas e padrões profissionais."],
      ["Acompanhamento em campo e ajuste rápido.", "Supervisão operacional constante e intervenções ágeis durante a execução."],
      ["Ferramentas e sistema", "Ferramentas, procedimentos e sistemas de controle operacional"],
      ["Capacidade adaptada ao volume", "Capacidade operacional escalável de acordo com o volume"],
      ["Padrão profissional compatível com o ambiente", "Integração operacional ao contexto do cliente"],
      ["Mais controle de entrega.", "Maior controle sobre os prazos de entrega."],
      ["Veículos mais rápidos para venda.", "Redução do tempo de preparação do veículo para venda."],
      ["Explique o cenário. A Vittore avalia e responde rápido.", "Descreva o contexto operacional. A equipe Vittore avalia e responde com agilidade."],
      ["Nome, empresa, volume e contexto já permitem iniciar.", "Nome, empresa, volume e contexto operacional já permitem uma primeira avaliação imediata."],
      ["Menos intervenção, menos tempo parado e mais preservação da peça original.", "Menor intervenção, tempo reduzido e maior preservação do componente original."],
      ["Menos etapas no processo", "Redução das etapas de reparação"]
    ],
    "pt-pt": [
      ["Especialistas em PDR atuam na sua estrutura para resolver danos de granizo e mossas, acelerar prazos e manter o padrão de qualidade.", "Especialistas em PDR atuam diretamente na sua estrutura para resolver danos de granizo e mossas, reduzir o tempo de reparação e manter elevados padrões de qualidade."],
      ["Equipa preparada para executar e manter padrão.", "Equipa preparada para atuar dentro da estrutura do cliente e restabelecer a continuidade operacional."],
      ["Montamos a equipa conforme a necessidade.", "Configuramos a equipa de acordo com o volume e o tipo de intervenção."],
      ["Trabalho técnico com ritmo, controlo e acabamento.", "Intervenção técnica executada com controlo, continuidade operacional e padrões de qualidade definidos."],
      ["Não somos uma oficina. Somos uma extensão da sua capacidade de resposta.", "Não atuamos como oficina. Entramos como extensão da sua capacidade produtiva."],
      ["Equipa ajustada ao volume", "Equipa dimensionada em função do volume operacional"],
      ["Atuação dentro da estrutura do cliente", "Intervenções realizadas diretamente dentro da sua estrutura"],
      ["Selecionados com critério técnico e postura profissional.", "Selecionados com base em competências técnicas e padrões profissionais."],
      ["Acompanhamento no terreno e ajuste rápido.", "Supervisão operacional constante e intervenções rápidas durante a execução."],
      ["Ferramentas e sistema", "Ferramentas, procedimentos e sistemas de controlo operacional"],
      ["Capacidade adaptada ao volume", "Capacidade operacional escalável de acordo com o volume"],
      ["Padrão profissional compatível com o ambiente do cliente", "Integração operacional no contexto do cliente"],
      ["Mais controlo na entrega.", "Maior controlo sobre os prazos de entrega."],
      ["Viaturas prontas mais depressa para venda.", "Redução do tempo de preparação da viatura para venda."],
      ["Explique o cenário. A Vittore avalia e responde rapidamente.", "Descreva o contexto operacional. A equipa Vittore avalia e responde com rapidez."],
      ["Nome, empresa, volume e contexto bastam para começar.", "Nome, empresa, volume e contexto operacional permitem uma primeira avaliação imediata."],
      ["Menos intervenção, menos tempo parado e mais preservação da peça original.", "Menor intervenção, tempo reduzido e maior preservação do componente original."],
      ["Menos etapas no processo", "Redução das fases de reparação"]
    ],
    en: [
      ["PDR specialists work inside your structure to handle hail and dents, speed up deadlines, and maintain quality standards.", "PDR specialists operate directly within your facility to handle hail damage and dents, reduce repair time, and maintain high quality standards."],
      ["A team prepared to enter, execute, and sustain standards in demanding environments.", "Teams prepared to operate within the client's facility and restore operational continuity."],
      ["We scale the team based on your needs.", "We configure the team according to volume and type of intervention."],
      ["Technical work with speed, control, and quality.", "Technical intervention carried out with control, operational continuity, and defined quality standards."],
      ["We are not a body shop. We are an extension of your production capacity.", "We do not operate as a body shop. We step in as an extension of your production capacity."],
      ["Team scaled to your demand", "Team sized according to operational volume"],
      ["On-site operation", "Interventions carried out directly within your facility"],
      ["Selected for skill and professionalism.", "Selected based on technical competence and professional standards."],
      ["On-site control and quick adjustments.", "Continuous operational supervision and timely interventions during execution."],
      ["Tools and system", "Tools, procedures, and operational control systems"],
      ["Scalable team", "Operational capacity scalable according to volume"],
      ["Professional standards", "Operational integration within the client's environment"],
      ["Better control over delivery timelines.", "Greater control over delivery timelines."],
      ["Faster turnaround to sales.", "Reduced vehicle preparation time for sale."],
      ["Describe your scenario. We evaluate and respond quickly.", "Describe the operational context. The Vittore team assesses it and provides a prompt response."],
      ["Name, company, volume, and context are enough to start.", "Name, company, volume, and operational context are enough for an initial assessment."],
      ["Fewer steps, less downtime, and more preservation of the original panel.", "Less intervention, reduced time, and greater preservation of the original component."],
      ["Fewer process steps", "Reduction in repair stages"]
    ]
  };

  const comparisonCopy = {
    pt: {
      badge: "TECNICA",
      title: "Fase final de reparacao",
      text: "Peca em fase final de reparacao, com aplicacao controlada da tecnica de PDR e atencao ao acabamento.",
      alt: "Peca em fase final de reparacao com aplicacao da tecnica de PDR"
    },
    "pt-pt": {
      badge: "TECNICA",
      title: "Fase final de reparacao",
      text: "Peca em fase final de reparacao, com aplicacao controlada da tecnica de PDR e atencao ao acabamento.",
      alt: "Peca em fase final de reparacao com aplicacao da tecnica de PDR"
    },
    en: {
      badge: "TECHNIQUE",
      title: "Final repair stage",
      text: "Panel in the final repair stage, with controlled application of the PDR technique and attention to finishing.",
      alt: "Panel in the final repair stage with PDR technique being applied"
    },
    it: {
      badge: "TECNICA",
      title: "Fase finale di riparazione",
      text: "Componente nella fase finale di riparazione, con applicazione controllata della tecnica PDR e attenzione alla finitura.",
      alt: "Componente nella fase finale di riparazione con applicazione della tecnica PDR"
    }
  };

  const comparisonImageSrc = "assets/images/carro-reparado.jpeg";
  const brandsImageSrc = "assets/images/logo-marcas.png";

  const brandsCopy = {
    pt: {
      title: "PDR aplicavel em diferentes marcas",
      text: "Compativel com diferentes marcas, desde que o dano e a peca permitam aplicacao tecnica do PDR.",
      alt: "Tecnica PDR aplicavel em diferentes marcas automotivas"
    },
    "pt-pt": {
      title: "PDR aplicavel a diferentes marcas",
      text: "Compativel com diferentes marcas, desde que o dano e a peca permitam aplicacao tecnica do PDR.",
      alt: "Tecnica PDR aplicavel a diferentes marcas automoveis"
    },
    en: {
      title: "PDR applicable across different brands",
      text: "Compatible with different brands whenever the damage and the panel allow technical PDR application.",
      alt: "PDR technique applicable across different automotive brands"
    },
    it: {
      title: "PDR applicabile a diverse marche",
      text: "Compatibile con marche diverse, a condizione che il danno e il componente consentano l'applicazione tecnica del PDR.",
      alt: "Tecnica PDR applicabile a diverse marche automobilistiche"
    }
  };

  function applyTextReplacements(lang) {
    const map = replacements[lang];
    if (!map || !map.length) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let current;
    while ((current = walker.nextNode())) nodes.push(current);

    nodes.forEach((node) => {
      let text = node.nodeValue;
      map.forEach(([from, to]) => {
        if (text.includes(from)) text = text.split(from).join(to);
      });
      if (text !== node.nodeValue) node.nodeValue = text;
    });
  }

  function polishComparisonCard(lang) {
    return;
  }

  function polishBrandsBlock(lang) {
    return;
  }

  function run() {
    const lang = detectLang();
    applyTextReplacements(lang);
    polishComparisonCard(lang);
    polishBrandsBlock(lang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  window.addEventListener("load", run, { once: true });
  setTimeout(run, 200);
  setTimeout(run, 800);
})();
