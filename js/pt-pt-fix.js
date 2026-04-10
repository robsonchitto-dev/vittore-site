(() => {
  const isPortugalPage = () => {
    const lang = (document.documentElement.lang || '').toLowerCase();
    const path = window.location.pathname.toLowerCase();
    return lang === 'pt-pt' || path.endsWith('portugal.html');
  };

  if (!isPortugalPage()) return;

  const textReplacements = new Map([
    ['APOIO TÉCNICO EM PDR PARA GRANIZO E MOSSAS', 'EQUIPA ESPECIALIZADA EM PDR'],
    ['Soluções concretas, mesmo onde os outros não chegam.', 'Mais capacidade sem aumentar a estrutura.'],
    ['Especialistas em PDR atuam na sua estrutura para tratar danos de granizo, mossas e picos de volume, acelerar prazos e manter o padrão de qualidade.', 'Apoiamos empresas na reparação de viaturas, na preparação de usados e na resposta a picos de volume, reduzindo o tempo de reparação e evitando pintura sempre que o dano o permite, sempre com padrão e controlo.'],
    ['Especialistas em PDR atuam diretamente na sua estrutura para resolver danos de granizo e mossas, reduzir o tempo de reparação e manter elevados padrões de qualidade.', 'Apoiamos empresas na reparação de viaturas, na preparação de usados e na resposta a picos de volume, reduzindo o tempo de reparação e evitando pintura sempre que o dano o permite, sempre com padrão e controlo.'],
    ['Quando a estrutura começa a perder ritmo.', 'Quando o volume aumenta e a estrutura deixa de acompanhar.'],
    ['Volume acumulado', 'Viaturas acumuladas'],
    ['Atraso nas entregas', 'Prazos em risco'],
    ['Falta de equipa especializada', 'Falta de capacidade técnica'],
    ['Picos após granizo', 'Picos de volume'],
    ['Quatro etapas para trabalhar com método, agilidade e pontualidade.', 'Método técnico que garante rapidez e qualidade na gestão de volumes.'],
    ['Diagnóstico', 'Análise operacional'],
    ['Analisamos o volume, o prazo e o tipo de dano.', 'Avaliamos volume, prazo, tipo de dano e capacidade disponível.'],
    ['Mobilização', 'Planeamento'],
    ['Montamos a equipa conforme a necessidade.', 'Definimos equipa, prioridades e ritmo operativo.'],
    ['Configuramos a equipa de acordo com o volume e o tipo de intervenção.', 'Definimos equipa, prioridades e ritmo operativo.'],
    ['Trabalho técnico com ritmo, controlo e acabamento.', 'Intervenção técnica com ritmo, controlo e qualidade.'],
    ['Intervenção técnica executada com controlo, continuidade operacional e padrões de qualidade definidos.', 'Intervenção técnica com ritmo, controlo e qualidade.'],
    ['Revisão final e entrega dentro do prazo.', 'Verificação final e cumprimento dos prazos.'],
    ['Não somos uma oficina. Somos uma extensão da sua capacidade produtiva.', 'Não somos uma oficina: somos uma extensão da capacidade operacional do cliente.'],
    ['Não atuamos como oficina. Entramos como extensão da sua capacidade produtiva.', 'Não somos uma oficina: somos uma extensão da capacidade operacional do cliente.'],
    ['Equipa preparada para executar e manter padrão.', 'Equipa selecionada por capacidade real, precisão e controlo.'],
    ['Equipa preparada para atuar dentro da estrutura do cliente e restabelecer a continuidade operacional.', 'Equipa selecionada por capacidade real, precisão e controlo.'],
    ['Critério técnico, postura profissional e atenção ao acabamento sustentam cada entrega.', 'Apoiamos o cliente com uma equipa selecionada por capacidade real, precisão e controlo.'],
    ['Equipa preparada para entrar, executar e sustentar padrão em ambientes exigentes.', 'Uma equipa selecionada para se adaptar aos padrões do cliente.'],
    ['Indicadores e diferenciais para decidir com segurança.', 'Qualidade e desempenho são o nosso verdadeiro ponto forte.'],
    ['Equipa técnica, escala e critérios claros para responder quando a procura aumenta.', 'Menos tempo de reparação, menos pintura desnecessária e mais controlo em cada intervenção.'],
    ['Capacidade ajustada ao volume', 'Capacidade operacional sem perder controlo'],
    ['Equipa ajustada ao volume.', 'Equipa dimensionada em função do volume operacional e da complexidade do trabalho.'],
    ['Postura compatível com o ambiente', 'Adaptação aos padrões do cliente'],
    ['Postura compatível com o ambiente.', 'Presença profissional compatível com processos, espaços e expectativas.'],
    ['Onde o PDR gera valor.', 'Onde fazemos a diferença.'],
    ['Para estruturas que precisam de resposta rápida sem perder o controle.', 'Quando é necessária mais capacidade sem perder o padrão.'],
    ['Concessionárias', 'Concessionários'],
    ['Mais controle de entrega.', 'Preparação de usados e viaturas de exposição com mais rapidez.'],
    ['Alívio de volume e menos dependência da pintura.', 'Reforço de capacidade sem comprometer a operação do dia a dia.'],
    ['Veículos mais rápidos para venda.', 'Viaturas prontas mais depressa para venda.'],
    ['Frota disponível mais depressa.', 'Menos tempo parado na devolução e preparação de viaturas.'],
    ['Resposta técnica em cenários de volume e alta demanda.', 'Resposta técnica em cenários de maior volume.'],
    ['Pós-venda, orientações e novos pedidos com resposta rápida.', 'Acompanhamento, esclarecimentos e novos pedidos com resposta rápida.'],
    ['Acompanhamento e alinhamento.', 'Acompanhamento e continuidade.'],
    ['Resposta rápida sempre que necessário.', 'Resposta rápida quando necessário.'],
    ['Novo atendimento', 'Novo pedido'],
    ['Atuação internacional, com o mesmo padrão.', 'Operação internacional, mesmo padrão.'],
    ['Mesmo padrão técnico, a mesma forma de atuar.', 'Mesmo método. Mesmo nível de exigência.'],
    ['PDR substitui a funilaria?', 'O PDR substitui sempre a reparação tradicional?'],
    ['Não sempre. Depende do dano. A avaliação é técnica.', 'Não. Depende do dano. A avaliação é sempre técnica.'],
    ['Qual o ganho?', 'Qual é o ganho?'],
    ['Menos tempo parado e mais produtividade.', 'Menos tempo de reparação, menos pintura desnecessária e mais produtividade.'],
    ['Só atende granizo?', 'Trabalham só com grandes volumes?'],
    ['Não. Atuamos com amassados simples e complexos, em cenários de baixo e alto volume, sempre para empresas e parceiros profissionais.', 'Não. Atuamos em volumes baixos e altos, sempre para empresas e parceiros profissionais.'],
    ['Concorre com cliente final?', 'Entram em contacto com o cliente final?'],
    ['Não. Atuamos como extensão da sua operação.', 'Não. Entramos como apoio interno à operação do cliente.'],
    ['Precisa de desbloquear a sua operação?', 'Precisa de reforçar a sua capacidade operacional?'],
    ['Explique o cenário. A Vittore avalia e responde rapidamente.', 'Descreva o contexto. Avaliamos com rapidez e indicamos o próximo passo.'],
    ['Descreva o contexto operacional. A equipa Vittore avalia e responde com rapidez.', 'Descreva o contexto. Avaliamos com rapidez e indicamos o próximo passo.'],
    ['Nome, empresa, volume e contexto operacional permitem uma primeira avaliação imediata.', 'Nome, empresa, volume e contexto operacional bastam para começar.'],
    ['Explique o cenário', 'Descreva o contexto'],
    ['A Vittore avalia e responde rapidamente.', 'A Vittore analisa o cenário e indica o próximo passo.'],
    ['Explique o essencial', 'Descreva o contexto'],
    ['A Vittore avalia o cenário e avança para a próxima etapa comercial.', 'A Vittore analisa o cenário e indica o próximo passo.'],
    ['Fale com a equipa para reforço técnico ou novos projectos.', 'Fale com a equipa para reforço técnico, preparação de usados ou novos projectos.'],
    ['Reparação de mossas sem pintura.', 'Recuperação da forma original sem pintura.'],
    ['Menos intervenção, mais rapidez e mais preservação da peça original.', 'Recuperamos a forma original da chapa, reduzindo intervenção e tempo de reparação sempre que o dano o permite.'],
    ['Técnica', 'Recuperado'],
    ['Aplicação da técnica', 'Área recuperada'],
    ['Fase de reparação com ferramenta de PDR, leitura controlada da peça e atenção ao acabamento.', 'Comparação visual entre o dano e a recuperação da forma original.'],
    ['Estrutura para crescer com padrão e consistência.', 'Estrutura pensada para crescer.'],
    ['Direcao Comercial', 'Direção Comercial'],
    ['Assessoria tecnica', 'Assessoria técnica'],
    ['Prospeccao e conversao', 'Prospeção e conversão'],
    ['Direcao Tecnica', 'Direção Técnica'],
    ['Controle de qualidade', 'Controlo de qualidade'],
    ['Laboratorio tecnico', 'Laboratório técnico'],
    ['Formacao e treinamento', 'Formação e treino'],
    ['Homologacao', 'Homologação'],
    ['Unidades moveis e projetos personalizados', 'Unidades móveis e projetos personalizados'],
    ['Servicos Compartilhados', 'Serviços Partilhados'],
    ['Legalizacao e integracao', 'Legalização e integração'],
    ['Servicos ao tecnico', 'Serviços ao técnico'],
    ['Eslovênia', 'Eslovénia'],
    ['Diferenciais', 'Vantagens'],
    ['Canais institucionais preparados para receber os links oficiais da marca.', 'Canais institucionais preparados para receber as ligações oficiais da marca.'],
    ['Inspirada na origem italiana da família Bertuol, Vittore carrega uma história que atravessa gerações. Em 1896, o bisavô de Marcelo Bertuol deixou Belluno, no povoado de Lentiai, uma região simples e marcada pelas dificuldades de seu tempo, para buscar oportunidade no Brasil. Mais de um século depois, Marcelo retorna à Itália para recuperar essa origem e transformar esse legado em uma marca reconhecida no segmento de PDR.', 'Inspirada na origem italiana da família Bertuol, Vittore carrega uma história que atravessa gerações. Em 1896, o bisavô de Marcelo Bertuol deixou Belluno, no povoado de Lentiai, uma região simples e marcada pelas dificuldades do seu tempo, para procurar oportunidade no Brasil. Mais de um século depois, Marcelo regressa a Itália para recuperar essa origem e transformar esse legado numa marca reconhecida no segmento PDR.']
  ]);

  const attributeReplacements = new Map([
    ['Redes sociais Vittore', 'Canais sociais Vittore'],
    ['Abrir menu rapido', 'Abrir menu rápido']
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
    const updates = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const raw = node.textContent;
      const trimmed = raw.trim();
      if (!trimmed) continue;

      const replacement = textReplacements.get(trimmed);
      if (!replacement) continue;

      const leading = raw.match(/^\s*/)?.[0] || '';
      const trailing = raw.match(/\s*$/)?.[0] || '';
      updates.push([node, `${leading}${replacement}${trailing}`]);
    }

    updates.forEach(([node, value]) => {
      if (node.textContent !== value) node.textContent = value;
    });
  };

  const replaceAttributes = () => {
    document.querySelectorAll('[aria-label],[title],[placeholder]').forEach((element) => {
      ['aria-label', 'title', 'placeholder'].forEach((attribute) => {
        const current = element.getAttribute(attribute);
        if (!current) return;
        const replacement = attributeReplacements.get(current.trim());
        if (replacement && current !== replacement) {
          element.setAttribute(attribute, replacement);
        }
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

    const text = 'Concessionários, oficinas, revendedores, rent-a-car e seguradoras com trabalho acumulado, prazos apertados ou aumento repentino de volume.';
    if (detail.textContent.trim() !== text) detail.textContent = text;
  };

  const applyPortugalFixes = () => {
    if (!isPortugalPage()) return;

    setText('.hero .eyebrow', 'EQUIPA ESPECIALIZADA EM PDR');
    setText('.hero h1', 'Mais capacidade sem aumentar a estrutura.');
    setText('.hero .lead', 'Apoiamos empresas na reparação de viaturas, na preparação de usados e na resposta a picos de volume, reduzindo o tempo de reparação e evitando pintura sempre que o dano o permite, sempre com padrão e controlo.');
    setText('.hero-media-caption', 'Equipa pronta para integrar-se na sua operação e recuperar fluidez.');

    document.querySelectorAll('[data-open-contact-modal]').forEach((button) => {
      if (button.textContent.trim() !== 'Falar com um especialista') {
        button.textContent = 'Falar com um especialista';
      }
    });

    setText('#desafio h2', 'Quando o volume aumenta e a estrutura deixa de acompanhar.');
    setText('#desafio .section-intro', 'Quando o trabalho aumenta e a capacidade interna deixa de ser suficiente.');
    setCardText('#desafio .feature-card', 0, 'Viaturas acumuladas', 'Mais viaturas pendentes e maior pressão sobre prazos, box e equipa.');
    setCardText('#desafio .feature-card', 1, 'Prazos em risco', 'O atraso cresce, a entrega perde ritmo e o retrabalho aumenta.');
    setCardText('#desafio .feature-card', 2, 'Falta de capacidade técnica', 'Mais casos seguem para pintura sem necessidade e o controlo fica mais difícil.');
    setCardText('#desafio .feature-card', 3, 'Picos de volume', 'A procura sobe e a estrutura não acompanha com a rapidez necessária.');

    setText('#como .section-intro', 'Método técnico que garante rapidez e qualidade na gestão de volumes.');
    setCardText('#como .timeline-step', 0, 'Análise operacional', 'Avaliamos volume, prazo, tipo de dano e capacidade disponível.');
    setCardText('#como .timeline-step', 1, 'Planeamento', 'Definimos equipa, prioridades e ritmo operativo.');
    setCardText('#como .timeline-step', 2, 'Execução', 'Intervenção técnica com ritmo, controlo e qualidade.');
    setCardText('#como .timeline-step', 3, 'Entrega', 'Verificação final e cumprimento dos prazos.');
    setText('#como .timeline-support p', 'Não somos uma oficina: somos uma extensão da capacidade operacional do cliente.');

    setText('#time h2', 'Equipa selecionada por capacidade real, precisão e controlo.');
    setText('#time .section-intro', 'Apoiamos o cliente com uma equipa selecionada por capacidade real, precisão e controlo.');
    setText('#time .proof-caption', 'Uma equipa selecionada para se adaptar aos padrões do cliente.');

    setText('#diferenciais .section-kicker', 'Vantagens');
    setText('#diferenciais h2', 'Qualidade e desempenho são o nosso verdadeiro ponto forte.');
    setText('#diferenciais .section-intro', 'Menos tempo de reparação, menos pintura desnecessária e mais controlo em cada intervenção.');
    setCardText('#diferenciais .feature-card', 1, 'Capacidade operacional sem perder controlo', 'Equipa dimensionada em função do volume operacional e da complexidade do trabalho.');
    setCardText('#diferenciais .feature-card', 3, 'Adaptação aos padrões do cliente', 'Presença profissional compatível com processos, espaços e expectativas.');

    setText('#publico h2', 'Onde fazemos a diferença.');
    setText('#publico .section-intro', 'Quando é necessária mais capacidade sem perder o padrão.');
    ensureAudienceDetail();

    setText('#suporte .section-intro', 'Acompanhamento, esclarecimentos e novos pedidos com resposta rápida.');
    setText('#onde-atuamos h2', 'Operação internacional, mesmo padrão.');
    setText('#onde-atuamos .section-intro', 'Mesmo método. Mesmo nível de exigência.');

    setText('.faq-section h2', 'Perguntas frequentes');
    setCardText('.faq-section .faq-card', 0, 'O PDR substitui sempre a reparação tradicional?', 'Não. Depende do dano. A avaliação é sempre técnica.');
    setCardText('.faq-section .faq-card', 1, 'Qual é o ganho?', 'Menos tempo de reparação, menos pintura desnecessária e mais produtividade.');
    setCardText('.faq-section .faq-card', 2, 'Trabalham só com grandes volumes?', 'Não. Atuamos em volumes baixos e altos, sempre para empresas e parceiros profissionais.');
    setCardText('.faq-section .faq-card', 3, 'Entram em contacto com o cliente final?', 'Não. Entramos como apoio interno à operação do cliente.');

    setText('#contato h2', 'Precisa de reforçar a sua capacidade operacional?');
    setText('#contato .section-intro', 'Descreva o contexto. Avaliamos com rapidez e indicamos o próximo passo.');
    setText('#contato .contact-priority-note span', 'Nome, empresa, volume e contexto operacional bastam para começar.');
    setText('#contato .priority-form-head h3', 'Descreva o contexto');
    setText('#contato .priority-form-head p', 'A Vittore analisa o cenário e indica o próximo passo.');
    setText('#contato .contact-note', 'Fale com a equipa para reforço técnico, preparação de usados ou novos projectos.');

    setText('#pdr h2', 'Recuperação da forma original sem pintura.');
    setText('#pdr .section-intro', 'Recuperamos a forma original da chapa, reduzindo intervenção e tempo de reparação sempre que o dano o permite.');
    const comparisonCard = document.querySelectorAll('#pdr .comparison-card')[1];
    if (comparisonCard) {
      const tag = comparisonCard.querySelector('.comparison-tag');
      const strong = comparisonCard.querySelector('strong');
      const paragraph = comparisonCard.querySelector('p');
      const image = comparisonCard.querySelector('img');
      if (tag) tag.textContent = 'Recuperado';
      if (strong) strong.textContent = 'Área recuperada';
      if (paragraph) paragraph.textContent = 'Comparação visual entre o dano e a recuperação da forma original.';
      if (image) image.alt = 'Área recuperada após correção por PDR';
    }

    setText('#governanca h2', 'Estrutura pensada para crescer.');
    setText('#contact-modal-title', 'Descreva o contexto');
    setText('#contact-modal .contact-modal-head p:last-child', 'A Vittore analisa o cenário e indica o próximo passo.');
    setText('.footer-columns .footer-column:nth-child(3) .footer-links a:first-child', 'Vantagens');
    setText('.footer-bottom p:last-child', 'Canais institucionais preparados para receber as ligações oficiais da marca.');

    replaceTextNodes();
    replaceAttributes();
  };

  document.addEventListener('DOMContentLoaded', applyPortugalFixes);
  window.addEventListener('load', applyPortugalFixes);

  const observer = new MutationObserver(() => {
    applyPortugalFixes();
  });

  document.addEventListener('DOMContentLoaded', () => {
    applyPortugalFixes();
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

  setInterval(applyPortugalFixes, 1500);
})();
