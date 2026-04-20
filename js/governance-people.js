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
      title: 'Pessoas responsáveis',
      selectedLabel: 'Cargo ou área',
      closeLabel: 'Fechar',
      triggerTitle: 'Ver pessoas responsáveis'
    },
    'pt-pt': {
      kicker: 'Pessoas',
      title: 'Pessoas responsáveis',
      selectedLabel: 'Cargo ou área',
      closeLabel: 'Fechar',
      triggerTitle: 'Ver pessoas responsáveis'
    },
    it: {
      kicker: 'Persone',
      title: 'Persone responsabili',
      selectedLabel: 'Ruolo o area',
      closeLabel: 'Chiudi',
      triggerTitle: 'Vedi le persone responsabili'
    },
    en: {
      kicker: 'People',
      title: 'Responsible people',
      selectedLabel: 'Role or area',
      closeLabel: 'Close',
      triggerTitle: 'View responsible people'
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

  const triggerOwners = new Map([
    ['ceo', ['marcelo']],
    ['cfo', ['robson']],
    ['compliance e legal', ['marcelo', 'robson']],
    ['compliance e legale', ['marcelo', 'robson']],
    ['compliance and legal', ['marcelo', 'robson']],
    ['direcao comercial', ['robson']],
    ['direção comercial', ['robson']],
    ['direzione commerciale', ['robson']],
    ['commercial direction', ['robson']],
    ['direcao tecnica', ['marcelo']],
    ['direção técnica', ['marcelo']],
    ['direzione tecnica', ['marcelo']],
    ['technical direction', ['marcelo']],
    ['servicos compartilhados', ['lais']],
    ['serviços partilhados', ['lais']],
    ['servizi condivisi', ['lais']],
    ['shared services', ['lais']]
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
    governanceSection.querySelectorAll('.governance-trigger').forEach((element) => {
      const isActive = element === trigger;
      element.classList.toggle('is-active', isActive);
      element.setAttribute('aria-expanded', String(isActive));
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

  const renderPanel = (label, ownerKeys, trigger) => {
    const panel = createPanel();
    if (!panel) return;

    const selected = panel.querySelector('.governance-people-selected strong');
    const grid = panel.querySelector('.governance-people-grid');
    if (!selected || !grid) return;

    selected.textContent = label;
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
    activeRoleKey = normalize(label);
    activeTrigger = trigger;
    setActiveState(trigger);

    if (window.innerWidth <= 960) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleTrigger = (trigger) => {
    const label = trigger.dataset.roleLabel || '';
    const roleKey = trigger.dataset.roleKey || '';
    const ownerKeys = triggerOwners.get(roleKey);
    if (!label || !ownerKeys) return;

    const panel = createPanel();
    const sameRole = panel && activeRoleKey === roleKey && !panel.hidden;
    if (sameRole) {
      closePanel();
      return;
    }

    renderPanel(label, ownerKeys, trigger);
  };

  const bindTrigger = (element, label, variant) => {
    const roleKey = normalize(label);
    if (!triggerOwners.has(roleKey)) return;

    element.classList.add('governance-trigger', `governance-trigger-${variant}`);
    element.dataset.roleKey = roleKey;
    element.dataset.roleLabel = label;
    element.setAttribute('title', ui.triggerTitle);
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-controls', panelId);
    element.setAttribute('aria-expanded', 'false');

    if (element.dataset.bound === 'true') return;

    element.dataset.bound = 'true';
    element.addEventListener('click', () => handleTrigger(element));
    element.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      handleTrigger(element);
    });
  };

  const wireTriggers = () => {
    governanceSection.querySelectorAll('.governance-list li').forEach((item) => {
      const legacyButton = item.querySelector('.governance-role-button');
      if (legacyButton) {
        item.textContent = legacyButton.textContent.trim();
      }
      item.classList.remove('is-interactive');
    });

    governanceSection.querySelectorAll('.governance-top span').forEach((item) => {
      const label = item.textContent.trim();
      bindTrigger(item, label, 'top');
    });

    governanceSection.querySelectorAll('.governance-column').forEach((column) => {
      const heading = column.querySelector('h3');
      if (!heading) return;
      bindTrigger(column, heading.textContent.trim(), 'card');
    });
  };

  const scheduleWiring = () => {
    wireTriggers();
    window.setTimeout(wireTriggers, 200);
    window.setTimeout(wireTriggers, 800);
    window.setTimeout(wireTriggers, 1600);
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
