(() => {
  const isItalianPage = () => (document.documentElement.lang || '').toLowerCase() === 'it';
  if (!isItalianPage()) return;

  const textReplacements = new Map([
    ['Soluzioni concrete, anche dove gli altri non arrivano.', 'Soluzioni concrete, anche dove è difficile arrivare'],
    ['Specialisti PDR operano direttamente presso la vostra struttura per gestire grandine, ammaccature e picchi di volume, ridurre i tempi di lavorazione e mantenere elevati standard qualitativi.', 'Operiamo nel settore PDR da oltre 18 anni, affiancando le aziende per gestire grandine, ammaccature e aumenti di volume, mantenendo standard e controllo.'],
    ['Specialisti PDR operano nella tua struttura per gestire grandine e ammaccature, accelerare i tempi e mantenere lo standard di qualità.', 'Operiamo nel settore PDR da oltre 18 anni, affiancando le aziende per gestire grandine, ammaccature e aumenti di volume, mantenendo standard e controllo.'],
    ['Quando l’operatività si blocca.', 'Quando il lavoro aumenta e la capacità interna non è più sufficiente'],
    ["Quando l'operatività si blocca.", 'Quando il lavoro aumenta e la capacità interna non è più sufficiente'],
    ['Accumulo di veicoli', 'Aumento del volume operativo'],
    ['Ritardi nelle consegne', 'Rallentamento del flusso operativo'],
    ['Mancanza di tecnici specializzati', 'Mancanza di capacità tecnica interna'],
    ['Picchi dopo grandine', 'Picchi improvvisi (grandine e alta domanda)'],
    ['Quattro passaggi per lavorare con metodo, ritmo e puntualità.', 'Metodo tecnico che garantisce rapidità e qualità nella gestione dei volumi'],
    ['Analisi', 'Analisi operativa'],
    ['Attivazione', 'Pianificazione'],
    ['Non operiamo come officina. Interveniamo come estensione della vostra capacità produttiva.', 'Non siamo una carrozzeria: siamo un’estensione della capacità operativa del cliente'],
    ['Non siamo una carrozzeria. Siamo un’estensione della tua capacità produttiva.', 'Non siamo una carrozzeria: siamo un’estensione della capacità operativa del cliente'],
    ['Team pronti a operare presso la struttura del cliente per ripristinare la continuità operativa.', 'Squadra selezionata per capacità reale, precisione e controllo'],
    ['Equipe preparada para entrar na estrutura do cliente e devolver fluidez ao trabalho.', 'Squadra pronta a entrare nella struttura del cliente per ripristinare flusso operativo e capacità.'],
    ['Criterio tecnico, presenza professionale e attenzione al risultato sostengono ogni intervento.', 'Affianchiamo il cliente con una squadra selezionata per capacità reale, precisione e controllo'],
    ['Una squadra preparata per entrare, eseguire e sostenere lo standard in ambienti ad alta esigenza.', 'Una squadra selezionata per adattarsi agli standard del cliente'],
    ['Indicatori e vantaggi per decidere con sicurezza.', 'Qualità e performance sono il nostro vero punto di forza'],
    ['Team tecnico, scala e criteri chiari per rispondere quando la domanda aumenta.', 'Qualità, performance e controllo operativo su ogni intervento'],
    ['Capacità operativa scalabile in base al volume', 'Capacità operativa senza perdere controllo'],
    ['Integrazione operativa nel contesto del cliente', 'Adattamento agli standard del cliente'],
    ['Dove il PDR crea valore.', 'Dove facciamo la differenza'],
    ['Per strutture che hanno bisogno di risposta rapida senza perdere il controllo.', 'Quando serve più capacità senza perdere lo standard.'],
    ['Hai bisogno di sbloccare la tua operatività?', 'Serve aumentare la capacità operativa?'],
    ['Descrivi la situazione. Valutiamo e rispondiamo rapidamente.', 'Descrivi il contesto operativo. Valutiamo e rispondiamo rapidamente'],
    ['Nome, azienda, volume e contesto operativo consentono una prima valutazione immediata.', 'Nome, azienda, volume e contesto operativo bastano per iniziare'],
    ['Descrivi la situazione', 'Descrivi il contesto operativo'],
    ['Riparazione delle ammaccature senza verniciatura.', 'Ripristino della forma originale senza verniciatura'],
    ['Meno interventi, meno tempo senza auto e più conservazione del veicolo.', 'Ripristiniamo la forma originale della lamiera anche su danni complessi'],
    ['Menos pintura. Menos tempo parado. Mais produtividade.', 'Meno vernice. Meno tempo senza auto. Più produttività'],
    ['Perguntas frequentes', 'Domande frequenti'],
    ['PDR substitui a funilaria?', 'Il PDR sostituisce sempre la carrozzeria?'],
    ['Não sempre. Depende do dano. A avaliação é técnica.', 'Non sempre. Dipende dal danno. La valutazione è tecnica.'],
    ['Qual o ganho?', 'Qual è il vantaggio?'],
    ['Menos tempo parado e mais produtividade.', 'Meno tempo senza auto e più produttività.'],
    ['Concorre com cliente final?', 'Competiamo con il cliente finale?'],
    ['Não. Atuamos como extensão da sua operação.', 'No. Operiamo come estensione della capacità operativa del cliente.'],
    ['Direcao Comercial', 'Direzione commerciale'],
    ['Vendas', 'Vendite'],
    ['Assessoria tecnica', 'Consulenza tecnica'],
    ['Prospeccao e conversao', 'Prospezione e conversione'],
    ['Direcao Tecnica', 'Direzione tecnica'],
    ['Controle de qualidade', 'Controllo qualità'],
    ['Laboratorio tecnico', 'Laboratorio tecnico'],
    ['Formacao e treinamento', 'Formazione e training'],
    ['Homologacao', 'Omologazione'],
    ['Unidades moveis e projetos personalizados', 'Unità mobili e progetti personalizzati'],
    ['Servicos Compartilhados', 'Servizi condivisi'],
    ['Pessoas e cultura', 'Persone e cultura'],
    ['Financeiro', 'Finanza'],
    ['Administrativo', 'Amministrazione'],
    ['Legalizacao e integracao', 'Legalizzazione e integrazione'],
    ['Servicos ao tecnico', 'Servizi al tecnico'],
    ['Todos os direitos reservados.', 'Tutti i diritti riservati.'],
    ['Canais institucionais preparados para receber os links oficiais da marca.', 'Canali istituzionali pronti a ricevere i link ufficiali del marchio.']
  ]);

  const attributeReplacements = new Map([
    ['Abrir menu rapido', 'Apri menu rapido'],
    ['Falar no WhatsApp', 'Scrivi su WhatsApp'],
    ['Mapa do site', 'Mappa del sito'],
    ['Redes sociais Vittore', 'Canali social Vittore'],
    ['Indicadores de capacidade Vittore', 'Indicatori di capacità Vittore']
  ]);

  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node && node.textContent.trim() !== text) node.textContent = text;
  };

  const setCardText = (selector, index, title, body) => {
    const card = document.querySelectorAll(selector)[index];
    if (!card) return;
    const heading = card.querySelector('h3');
    const paragraph = card.querySelector('p');
    if (heading && heading.textContent.trim() !== title) heading.textContent = title;
    if (paragraph && paragraph.textContent.trim() !== body) paragraph.textContent = body;
  };

  const replaceTextNodes = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const pending = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const raw = node.textContent;
      const trimmed = raw.trim();
      if (!trimmed) continue;

      const replacement = textReplacements.get(trimmed);
      if (!replacement) continue;

      const leading = raw.match(/^\s*/)?.[0] || '';
      const trailing = raw.match(/\s*$/)?.[0] || '';
      pending.push([node, `${leading}${replacement}${trailing}`]);
    }

    pending.forEach(([node, value]) => {
      if (node.textContent !== value) node.textContent = value;
    });
  };

  const replaceAttributes = () => {
    document.querySelectorAll('[aria-label],[title],[placeholder]').forEach((element) => {
      ['aria-label', 'title', 'placeholder'].forEach((attribute) => {
        const current = element.getAttribute(attribute);
        if (!current) return;
        const next = attributeReplacements.get(current.trim());
        if (next && current !== next) element.setAttribute(attribute, next);
      });
    });
  };

  const ensureAudienceDetail = () => {
    const heading = document.querySelector('#publico .section-heading');
    if (!heading) return;

    let detail = heading.querySelector('.audience-intro-detail');
    if (!detail) {
      detail = document.createElement('p');
      detail.className = 'section-intro audience-intro-detail';
      heading.appendChild(detail);
    }

    const text = 'Concessionarie, carrozzerie e rent-a-car con lavoro arretrato, scadenze strette o aumento improvviso dei volumi.';
    if (detail.textContent.trim() !== text) detail.textContent = text;
  };

  const applyItalianFixes = () => {
    if (!isItalianPage()) return;

    setText('.hero h1', 'Soluzioni concrete, anche dove è difficile arrivare');
    setText('.hero .lead', 'Operiamo nel settore PDR da oltre 18 anni, affiancando le aziende per gestire grandine, ammaccature e aumenti di volume, mantenendo standard e controllo.');
    setText('.hero-media-caption', 'Squadra pronta a entrare nella struttura del cliente per ripristinare flusso operativo e capacità.');

    setText('#desafio h2', 'Quando il lavoro aumenta e la capacità interna non è più sufficiente');
    setCardText('#desafio .feature-card', 0, 'Aumento del volume operativo', 'Più veicoli da assorbire e maggiore pressione su tempi, box e organizzazione.');
    setCardText('#desafio .feature-card', 1, 'Rallentamento del flusso operativo', 'Il ritmo cala, i tempi si allungano e la continuità operativa si indebolisce.');
    setCardText('#desafio .feature-card', 2, 'Mancanza di capacità tecnica interna', 'Mantenere standard, tempi e qualità diventa più difficile con le risorse disponibili.');
    setCardText('#desafio .feature-card', 3, 'Picchi improvvisi (grandine e alta domanda)', 'Serve una risposta veloce, tecnica e già pronta a entrare nel flusso del cliente.');

    setText('#como .section-intro', 'Metodo tecnico che garantisce rapidità e qualità nella gestione dei volumi');
    setCardText('#como .timeline-step', 0, 'Analisi operativa', 'Valutiamo volumi, tempi, danni e capacità disponibile prima di attivare il supporto.');
    setCardText('#como .timeline-step', 1, 'Pianificazione', 'Definiamo squadra, priorità e ritmo operativo in base al contesto del cliente.');
    setText('#como .timeline-support p', 'Non siamo una carrozzeria: siamo un’estensione della capacità operativa del cliente');

    setText('#time h2', 'Squadra selezionata per capacità reale, precisione e controllo');
    setText('#time .section-intro', 'Affianchiamo il cliente con una squadra selezionata per capacità reale, precisione e controllo');
    setText('#time .proof-caption', 'Una squadra selezionata per adattarsi agli standard del cliente');

    setText('#diferenciais h2', 'Qualità e performance sono il nostro vero punto di forza');
    setText('#diferenciais .section-intro', 'Qualità, performance e controllo operativo su ogni intervento');
    setCardText('#diferenciais .feature-card', 1, 'Capacità operativa senza perdere controllo', 'Team dimensionato in funzione del volume operativo e della complessità del lavoro.');
    setCardText('#diferenciais .feature-card', 3, 'Adattamento agli standard del cliente', 'Presenza professionale compatibile con processi, spazi e aspettative del partner.');

    setText('#publico h2', 'Dove facciamo la differenza');
    setText('#publico .section-intro', 'Quando serve più capacità senza perdere lo standard.');
    ensureAudienceDetail();

    setText('#contato h2', 'Serve aumentare la capacità operativa?');
    setText('#contato .section-intro', 'Descrivi il contesto operativo. Valutiamo e rispondiamo rapidamente');
    setText('#contato .contact-priority-note span', 'Nome, azienda, volume e contesto operativo bastano per iniziare');
    setText('#contato .priority-form-head h3', 'Descrivi il contesto operativo');
    setText('#contato .contact-note', 'Parla con il team per supporto operativo o nuovi progetti.');
    setText('#contact-modal .priority-form-kicker', 'Contatto rapido');
    setText('#contact-modal-title', 'Descrivi il contesto operativo');

    setText('#pdr h2', 'Ripristino della forma originale senza verniciatura');
    setText('#pdr .section-intro', 'Ripristiniamo la forma originale della lamiera anche su danni complessi');

    replaceTextNodes();
    replaceAttributes();
  };

  document.addEventListener('DOMContentLoaded', applyItalianFixes);
  window.addEventListener('load', applyItalianFixes);

  const observer = new MutationObserver(() => {
    applyItalianFixes();
  });

  document.addEventListener('DOMContentLoaded', () => {
    applyItalianFixes();
    if (document.body) {
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['aria-label', 'title', 'placeholder']
      });
    }
  });

  setInterval(applyItalianFixes, 1500);
})();
