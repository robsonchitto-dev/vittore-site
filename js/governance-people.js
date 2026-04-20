(() => {
  const governanceSection = document.querySelector('#governanca');
  if (!governanceSection) return;

  const path = window.location.pathname.toLowerCase();
  const htmlLang = (document.documentElement.lang || '').toLowerCase();

  const pageLang = (() => {
    if (path.endsWith('english.html') || htmlLang.startsWith('en')) return 'en';
    if (path.endsWith('portugal.html') || htmlLang === 'pt-pt') return 'pt-pt';
    if (path.endsWith('index.html') || path === '/' || htmlLang.startsWith('it')) return 'it';
    return 'pt';
  })();

  const uiByLang = {
    pt: {
      kicker: 'Pessoas',
      title: 'Responsáveis por esta função',
      selectedLabel: 'Função selecionada',
      closeLabel: 'Fechar',
      triggerTitle: 'Ver responsável por esta função'
    },
    'pt-pt': {
      kicker: 'Pessoas',
      title: 'Responsáveis por esta função',
      selectedLabel: 'Função selecionada',
      closeLabel: 'Fechar',
      triggerTitle: 'Ver responsável por esta função'
    },
    it: {
      kicker: 'Persone',
      title: 'Responsabili di questa funzione',
      selectedLabel: 'Funzione selezionata',
      closeLabel: 'Chiudi',
      triggerTitle: 'Vedi il responsabile di questa funzione'
    },
    en: {
      kicker: 'People',
      title: 'People responsible for this function',
      selectedLabel: 'Selected function',
      closeLabel: 'Close',
      triggerTitle: 'View the person responsible for this function'
    }
  };

  const peopleByLang = {
    pt: {
      marcelo: {
        name: 'Marcelo Bertuol',
        role: 'CEO & COO',
        bio: 'Mais de 18 anos de experiência no setor. Responsável pela liderança estratégica e operacional do grupo, com atuação direta na execução e gestão das operações.'
      },
      robson: {
        name: 'Robson Claudir Luiz Chitto',
        role: 'CFO & VP Comercial',
        bio: 'Pós-graduado em Gestão Empresarial e MBA em Gestão Comercial. Atuou em empresas de capital aberto em posições de destaque. Responsável pelo planejamento estratégico, financeiro e comercial, incluindo expansão de mercado.'
      },
      lais: {
        name: 'Lais Bertuol',
        role: 'VP - Serviços Compartilhados',
        bio: 'Especializada em design, com atuação focada em marketing e comunicação. Responsável pela gestão dos serviços compartilhados, branding e posicionamento institucional da empresa.'
      }
    },
    'pt-pt': {
      marcelo: {
        name: 'Marcelo Bertuol',
        role: 'CEO & COO',
        bio: 'Mais de 18 anos de experiência no setor. Responsável pela liderança estratégica e operacional do grupo, com intervenção direta na execução e gestão das operações.'
      },
      robson: {
        name: 'Robson Claudir Luiz Chitto',
        role: 'CFO & VP Comercial',
        bio: 'Pós-graduado em Gestão Empresarial e MBA em Gestão Comercial. Exerceu funções de relevo em empresas de capital aberto. Responsável pelo planeamento estratégico, financeiro e comercial, incluindo expansão de mercado.'
      },
      lais: {
        name: 'Lais Bertuol',
        role: 'VP - Serviços Partilhados',
        bio: 'Especializada em design, com foco em marketing e comunicação. Responsável pela gestão dos serviços partilhados, branding e posicionamento institucional da empresa.'
      }
    },
    it: {
      marcelo: {
        name: 'Marcelo Bertuol',
        role: 'CEO & COO',
        bio: 'Oltre 18 anni di esperienza nel settore. Responsabile della leadership strategica e operativa del gruppo, con coinvolgimento diretto nell esecuzione e nella gestione delle operazioni.'
      },
      robson: {
        name: 'Robson Claudir Luiz Chitto',
        role: 'CFO & VP Commerciale',
        bio: 'Formazione post-laurea in Gestione d Impresa e MBA in Gestione Commerciale. Ha ricoperto ruoli di rilievo in società quotate. Responsabile della pianificazione strategica, finanziaria e commerciale, inclusa l espansione di mercato.'
      },
      lais: {
        name: 'Lais Bertuol',
        role: 'VP Servizi condivisi',
        bio: 'Specializzata in design, con focus su marketing e comunicazione. Responsabile della gestione dei servizi condivisi, del branding e del posizionamento istituzionale dell azienda.'
      }
    },
    en: {
      marcelo: {
        name: 'Marcelo Bertuol',
        role: 'CEO & COO',
        bio: 'More than 18 years of experience in the sector. Responsible for the group s strategic and operational leadership, with direct involvement in execution and operations management.'
      },
      robson: {
        name: 'Robson Claudir Luiz Chitto',
        role: 'CFO & VP Commercial',
        bio: 'Postgraduate degree in Business Management and MBA in Commercial Management. Held senior roles in publicly traded companies. Responsible for strategic, financial, and commercial planning, including market expansion.'
      },
      lais: {
        name: 'Lais Bertuol',
        role: 'VP Shared Services',
        bio: 'Specialized in design, with a focus on marketing and communication. Responsible for shared services management, branding, and the company s institutional positioning.'
      }
    }
  };

  const roleOwners = new Map([
    ['vendas', ['robson']],
    ['sales', ['robson']],
    ['vendite', ['robson']],
    ['assessoria tecnica', ['robson']],
    ['assessoria técnica', ['robson']],
    ['technical advisory', ['robson']],
    ['consulenza tecnica', ['robson']],
    ['prospeccao e conversao', ['robson']],
    ['prospeção e conversão', ['robson']],
    ['prospecting and conversion', ['robson']],
    ['prospezione e conversione', ['robson']],
    ['pos-venda', ['robson']],
    ['pós-venda', ['robson']],
    ['after-sales', ['robson']],
    ['post-vendita', ['robson']],
    ['controle de qualidade', ['marcelo']],
    ['controlo de qualidade', ['marcelo']],
    ['quality control', ['marcelo']],
    ['controllo qualita', ['marcelo']],
    ['laboratorio tecnico', ['marcelo']],
    ['laboratório técnico', ['marcelo']],
    ['technical lab', ['marcelo']],
    ['laboratorio tecnico', ['marcelo']],
    ['formacao e treinamento', ['marcelo']],
    ['formação e treino', ['marcelo']],
    ['training and development', ['marcelo']],
    ['formazione e training', ['marcelo']],
    ['homologacao', ['marcelo']],
    ['homologação', ['marcelo']],
    ['certification', ['marcelo']],
    ['omologazione', ['marcelo']],
    ['unidades moveis e projetos personalizados', ['marcelo']],
    ['unidades móveis e projetos personalizados', ['marcelo']],
    ['mobile units and custom projects', ['marcelo']],
    ['unita mobili e progetti personalizzati', ['marcelo']],
    ['marketing', ['lais']],
    ['pessoas e cultura', ['lais']],
    ['people and culture', ['lais']],
    ['persone e cultura', ['lais']],
    ['financeiro', ['lais']],
    ['finance', ['lais']],
    ['finanza', ['lais']],
    ['administrativo', ['lais']],
    ['administration', ['lais']],
    ['amministrazione', ['lais']],
    ['legalizacao e integracao', ['lais']],
    ['legalização e integração', ['lais']],
    ['legalization and integration', ['lais']],
    ['legalizzazione e integrazione', ['lais']],
    ['regolarizzazione e integrazione', ['lais']],
    ['servicos ao tecnico', ['lais']],
    ['serviços ao técnico', ['lais']],
    ['technician services', ['lais']],
    ['servizi al tecnico', ['lais']]
  ]);

  const ui = uiByLang[pageLang] || uiByLang.pt;
  const people = peopleByLang[pageLang] || peopleByLang.pt;
  const panelId = 'governance-people-panel';
  let activeTrigger = null;
  let activeRoleKey = '';

  const normalize = (value) => (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const createPanel = () => {
    const flow = governanceSection.querySelector('.governance-flow');
    if (!flow) return null;

    let panel = flow.querySelector(`#${panelId}`);
    if (panel) return panel;

    panel = document.createElement('aside');
    panel.id = panelId;
    panel.className = 'governance-people-panel';
    panel.hidden = true;
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="governance-people-head">
        <div>
          <p class="governance-people-kicker">${ui.kicker}</p>
          <h3>${ui.title}</h3>
          <p class="governance-people-selected">
            <span>${ui.selectedLabel}</span>
            <strong></strong>
          </p>
        </div>
        <button type="button" class="governance-people-close" aria-label="${ui.closeLabel}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="governance-people-grid"></div>
    `;

    flow.appendChild(panel);

    panel.querySelector('.governance-people-close')?.addEventListener('click', () => {
      closePanel();
    });

    return panel;
  };

  const setActiveState = (trigger) => {
    governanceSection.querySelectorAll('.governance-role-button').forEach((button) => {
      const isActive = button === trigger;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-expanded', String(isActive));
    });
  };

  const closePanel = () => {
    const panel = createPanel();
    if (!panel) return;

    panel.hidden = true;
    panel.setAttribute('aria-hidden', 'true');
    activeRoleKey = '';
    setActiveState(null);

    if (activeTrigger) {
      activeTrigger.focus();
    }
  };

  const renderPanel = (roleLabel, ownerKeys, trigger) => {
    const panel = createPanel();
    if (!panel) return;

    const selected = panel.querySelector('.governance-people-selected strong');
    const grid = panel.querySelector('.governance-people-grid');
    if (!selected || !grid) return;

    selected.textContent = roleLabel;
    grid.innerHTML = '';

    ownerKeys.forEach((ownerKey) => {
      const person = people[ownerKey];
      if (!person) return;

      const card = document.createElement('article');
      card.className = 'governance-person-card';
      card.innerHTML = `
        <strong class="governance-person-name">${person.name}</strong>
        <p class="governance-person-role">${person.role}</p>
        <p class="governance-person-bio">${person.bio}</p>
      `;
      grid.appendChild(card);
    });

    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    activeRoleKey = normalize(roleLabel);
    activeTrigger = trigger;
    setActiveState(trigger);

    if (window.innerWidth <= 960) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const wireRoleButtons = () => {
    governanceSection.querySelectorAll('.governance-list li').forEach((item) => {
      const existingButton = item.querySelector('.governance-role-button');
      const label = existingButton ? existingButton.textContent.trim() : item.textContent.trim();
      const ownerKeys = roleOwners.get(normalize(label));

      if (!ownerKeys) return;

      let button = existingButton;
      if (!button) {
        item.classList.add('is-interactive');
        item.textContent = '';
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'governance-role-button';
        item.appendChild(button);
      }

      button.textContent = label;
      button.setAttribute('title', ui.triggerTitle);
      button.setAttribute('aria-controls', panelId);
      button.setAttribute('aria-expanded', 'false');
      button.dataset.roleKey = normalize(label);

      if (button.dataset.bound === 'true') return;

      button.dataset.bound = 'true';
      button.addEventListener('click', () => {
        const panel = createPanel();
        const sameRole = panel && activeRoleKey === button.dataset.roleKey && !panel.hidden;
        if (sameRole) {
          closePanel();
          return;
        }

        renderPanel(label, ownerKeys, button);
      });
    });
  };

  const scheduleWiring = () => {
    wireRoleButtons();
    window.setTimeout(wireRoleButtons, 200);
    window.setTimeout(wireRoleButtons, 800);
    window.setTimeout(wireRoleButtons, 1600);
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleWiring, { once: true });
  } else {
    scheduleWiring();
  }

  window.addEventListener('load', scheduleWiring, { once: true });
})();
