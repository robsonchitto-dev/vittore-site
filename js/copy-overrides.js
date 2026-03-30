document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  const pageLang = (document.documentElement.lang || '').toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const currentLang = path.endsWith('italiano.html') || langParam === 'it' || pageLang === 'it'
    ? 'it'
    : (path.endsWith('english.html') || langParam === 'en' || pageLang === 'en'
      ? 'en'
      : (path.endsWith('portugal.html') || langParam === 'pt-pt' || langParam === 'ptpt' || pageLang === 'pt-pt'
        ? 'pt-pt'
          : (langParam === 'es' || pageLang === 'es'
            ? 'es'
          : (langParam === 'fr' || pageLang === 'fr'
            ? 'fr'
            : (langParam === 'de' || pageLang === 'de' ? 'de' : 'pt')))));
  const selectors = 'h1,h2,h3,h4,p,span,strong,small,li,a,button,label';

  const ptReplacements = new Map([]);

  const itReplacements = new Map([
    ['PDR', 'PDR'],
    ['Modelo', 'Modello'],
    ['Time', 'Team'],
    ['Fluxo', 'Flusso'],
    ['Clientes', 'Clienti'],
    ['Presença', 'Presenza'],
    ['Presenca', 'Presenza'],
    ['Carreiras', 'Carriere'],
    ['Governança', 'Governance'],
    ['Governanca', 'Governance'],
    ['Contato', 'Contatto'],
    ['Fale conosco', 'Contattaci'],
    ['APOIO OPERACIONAL PARA OFICINAS, CONCESSIONÁRIAS E ALTA DEMANDA', 'SUPPORTO OPERATIVO PER OFFICINE, CONCESSIONARIE E PICCHI DI DOMANDA'],
    ['APOIO OPERACIONAL PARA OFICINAS, CONCESSIONARIAS E ALTA DEMANDA', 'SUPPORTO OPERATIVO PER OFFICINE, CONCESSIONARIE E PICCHI DI DOMANDA'],
    ['Mantemos sua operação fluindo no dia a dia e reforçamos sua capacidade quando a demanda aumenta.', 'Manteniamo la tua operazione in movimento ogni giorno e rafforziamo la tua capacità quando la domanda aumenta.'],
    ['Equipe especializada em PDR para atuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar padrão de entrega.', 'Squadra specializzata in PDR pronta ad operare all interno della tua struttura per ridurre le code, proteggere i tempi e preservare lo standard di consegna.'],
    ['Clareza para quem precisa manter a operação rodando, reduzir atraso e evitar retrabalho.', 'Chiarezza per chi ha bisogno di mantenere l operazione in movimento, ridurre i ritardi ed evitare rilavorazioni.'],
    ['Preciso de apoio na operação', 'Ho bisogno di supporto operativo'],
    ['Entender o PDR', 'Capire il PDR'],
    ['Indicadores que ajudam o cliente a confiar antes do primeiro contato.', 'Indicatori che aiutano il cliente a fidarsi prima del primo contatto.'],
    ['Quando você precisa da Vittore', 'Alcuni segnali mostrano che la tua operazione ha bisogno di rinforzo tecnico.'],
    ['Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.', 'Quando la coda cresce, la consegna ritarda o manca manodopera specializzata, il problema appare prima di tutto nel flusso operativo.'],
    ['Fila acumulando', 'Coda in aumento'],
    ['Entrega atrasando', 'Consegne in ritardo'],
    ['Falta de equipe especializada', 'Mancanza di squadra specializzata'],
    ['Aumento repentino de demanda', 'Aumento improvviso della domanda'],
    ['Remoção de amassados sem pintura, com preservação da peça original e menor tempo de entrega.', 'Rimozione delle ammaccature senza verniciatura, con preservazione del pezzo originale e tempi di consegna ridotti.'],
    ['Quando o dano permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.', 'Quando il danno lo consente, il PDR evita riverniciature inutili, riduce il tempo di fermo e protegge l originalità del veicolo.'],
    ['Atuamos como apoio técnico dentro da sua operação.', 'Operiamo come supporto tecnico all interno della tua operazione.'],
    ['Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.', 'Entriamo nel flusso del partner per rafforzare la capacità, mantenere i tempi e sostenere lo standard tecnico senza interferire con il servizio.'],
    ['Somos extensão técnica da sua operação quando sua capacidade não acompanha a demanda.', 'Siamo un estensione tecnica della tua operazione quando la capacità interna non segue la domanda.'],
    ['O modelo se adapta ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.', 'Il modello si adatta all ambiente del partner con velocità, responsabilità operativa e non concorrenza.'],
    ['Concessionárias', 'Concessionarie'],
    ['Mais velocidade de entrega, menor fila e preservação de valor em veículos novos, seminovos e estoque.', 'Più velocità di consegna, meno coda e maggiore preservazione del valore su veicoli nuovi, usati e stock.'],
    ['Oficinas', 'Officine'],
    ['Reforço técnico especializado para absorver picos, manter prazo e elevar o nível de serviço sem inflar a estrutura.', 'Rinforzo tecnico specializzato per assorbire i picchi, mantenere i tempi ed elevare il livello di servizio senza appesantire la struttura.'],
    ['Revendas', 'Rivenditori'],
    ['Recuperação rápida de estoque, preservação de valor e maior velocidade de disponibilização para venda.', 'Recupero rapido dello stock, preservazione del valore e maggiore velocità nella messa in vendita.'],
    ['Parceiros PDR', 'Partner PDR'],
    ['Apoio de capacidade, mobilização e execução in-company para ampliar entrega sem concorrer com a carteira do parceiro.', 'Supporto di capacità, mobilitazione ed esecuzione in house per aumentare la consegna senza competere con il portafoglio del partner.'],
    ['Estrutura preparada para escala', 'Struttura pronta per la scala'],
    ['Projetos locais, regionais ou internacionais com a mesma disciplina de execução.', 'Progetti locali, regionali o internazionali con la stessa disciplina esecutiva.'],
    ['Nossa proposta une mobilidade, padronização e capacidade de adaptação para operações em mercados maduros ou em expansão, sem perder critério técnico e disciplina de entrega.', 'La nostra proposta unisce mobilità, standardizzazione e capacità di adattamento per operazioni in mercati maturi o in espansione, senza perdere criterio tecnico e disciplina di consegna.'],
    ['Mobilidade', 'Mobilità'],
    ['Atuação no espaço do cliente e em projetos especiais com entrada sob demanda.', 'Operatività nello spazio del cliente e in progetti speciali con ingresso on demand.'],
    ['Padronização', 'Standardizzazione'],
    ['Método replicável para proteger consistência mesmo quando o volume cresce rápido.', 'Metodo replicabile per proteggere la coerenza anche quando il volume cresce rapidamente.'],
    ['Visão corporativa', 'Visione aziendale'],
    ['Governança, apresentação profissional e alinhamento com a reputação do parceiro.', 'Governance, presentazione professionale e allineamento con la reputazione del partner.'],
    ['Expansão', 'Espansione'],
    ['Modelo desenhado para apoiar operações locais e internacionais sem perder fluidez.', 'Modello progettato per supportare operazioni locali e internazionali senza perdere fluidità.'],
    ['Onde atuamos', 'Dove operiamo'],
    ['Presença internacional com mobilização adaptada a contextos locais e projetos multi-país.', 'Presenza internazionale con mobilitazione adattata a contesti locali e progetti multi paese.'],
    ['A Vittore já operou em mercados da América, Europa e África, mantendo o mesmo padrão técnico, a mesma apresentação profissional e a mesma disciplina de execução.', 'Vittore ha già operato in mercati dell America, dell Europa e dell Africa, mantenendo lo stesso standard tecnico, la stessa presentazione professionale e la stessa disciplina esecutiva.'],
    ['Países com atuação Vittore', 'Paesi in cui Vittore ha già operato'],
    ['Mapa global de atuação internacional Vittore', 'Mappa globale della presenza internazionale di Vittore'],
    ['Presença internacional com mobilização adaptada para apoiar o parceiro com segurança e tranquilidade.', 'Presenza internazionale con mobilitazione adattata per supportare il partner con sicurezza e tranquillità.'],
    ['Percepção de autoridade', 'Percezione di autorevolezza'],
    ['Apresentação, acabamento e disciplina compatíveis com operações de alta exigência.', 'Presentazione, finitura e disciplina compatibili con operazioni ad alta esigenza.'],
    ['Projetos de alto valor exigem equipe que sabe entrar, executar e sair sem ruído. A linguagem visual e o padrão de entrega precisam acompanhar esse nível de exigência.', 'I progetti di alto valore richiedono una squadra che sappia entrare, eseguire e uscire senza rumore. Il linguaggio visivo e lo standard di consegna devono accompagnare questo livello di esigenza.'],
    ['Por que trabalhar conosco', 'Perché lavorare con noi'],
    ['Diferenciais concretos para quem precisa contratar com segurança.', 'Differenziali concreti per chi ha bisogno di assumere con sicurezza.'],
    ['Experiência real de campo, técnicos homologados, seguro de responsabilidade civil e atuação profissional dentro do ambiente do cliente.', 'Esperienza reale sul campo, tecnici omologati, assicurazione di responsabilità civile e presenza professionale all interno dell ambiente del cliente.'],
    ['Perguntas que normalmente aparecem', 'Domande che normalmente emergono'],
    ['Suporte ao cliente e pós-venda', 'Supporto al cliente e post vendita'],
    ['Trabalhe conosco', 'Lavora con noi'],
    ['Quero me apresentar', 'Voglio presentarmi'],
    ['Contato rápido', 'Contatto rapido'],
    ['Vamos entender sua operação', 'Cerchiamo di capire la tua operazione'],
    ['Governança', 'Governance'],
    ['Nossa origem', 'La nostra origine'],
    ['© 2026 Vittore PDR Group. Todos os direitos reservados.', '© 2026 Vittore PDR Group. Tutti i diritti riservati.']
  ]);

  const ptPtReplacements = new Map([
    ['Time', 'Equipa'],
    ['Contato', 'Contacto'],
    ['Fale conosco', 'Fale connosco'],
    ['Especialistas em PDR atuam na sua estrutura para resolver granizo e amassados, acelerar prazos e manter o padrão de qualidade.', 'Especialistas em PDR atuam na sua estrutura para resolver danos de granizo e mossas, acelerar prazos e manter o padrão de qualidade.'],
    ['Seu carro reparado com os mais altos padrões de qualidade.', 'O seu carro reparado com os mais altos padrões de qualidade.'],
    ['Mantemos sua operação fluindo no dia a dia e reforçamos sua capacidade quando a demanda aumenta.', 'Mantemos a sua operação a fluir no dia a dia e reforçamos a sua capacidade quando a procura aumenta.'],
    ['Equipe especializada em PDR para atuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar padrão de entrega.', 'Equipa especializada em PDR para actuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar o padrão de entrega.'],
    ['Clareza para quem precisa manter a operação rodando, reduzir atraso e evitar retrabalho.', 'Clareza para quem precisa de manter a operação a funcionar, reduzir atrasos e evitar retrabalho.'],
    ['Preciso de apoio na operação', 'Preciso de apoio na operação'],
    ['Entender o PDR', 'Compreender o PDR'],
    ['Indicadores que ajudam o cliente a confiar antes do primeiro contato.', 'Indicadores que ajudam o cliente a confiar antes do primeiro contacto.'],
    ['Quando você precisa da Vittore', 'Quando precisa da Vittore'],
    ['Alguns sinais mostram que sua operação precisa de reforço técnico.', 'Alguns sinais mostram que a sua operação precisa de reforço técnico.'],
    ['Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.', 'Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.'],
    ['Fila acumulando', 'Fila a acumular'],
    ['Entrega atrasando', 'Entrega em atraso'],
    ['Falta de equipe especializada', 'Falta de equipa especializada'],
    ['Aumento repentino de demanda', 'Aumento repentino da procura'],
    ['Remoção de amassados sem pintura, com preservação da peça original e menor tempo de entrega.', 'Remoção de mossas sem pintura, com preservação da peça original e menor tempo de entrega.'],
    ['Reparação de amassados sem pintura.', 'Reparação de mossas sem pintura.'],
    ['Quando o dano permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.', 'Quando o dano o permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.'],
    ['Atuamos como apoio técnico dentro da sua operação.', 'Actuamos como apoio técnico dentro da sua operação.'],
    ['Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.', 'Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.'],
    ['Somos extensão técnica da sua operação quando sua capacidade não acompanha a demanda.', 'Somos extensão técnica da sua operação quando a sua capacidade não acompanha a procura.'],
    ['O modelo se adapta ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.', 'O modelo adapta-se ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.'],
    ['Concessionárias', 'Concessionários'],
    ['Mais velocidade de entrega, menor fila e preservação de valor em veículos novos, seminovos e estoque.', 'Mais velocidade de entrega, menor fila e preservação de valor em veículos novos, seminovos e stock.'],
    ['Oficinas', 'Oficinas'],
    ['Reforço técnico especializado para absorver picos, manter prazo e elevar o nível de serviço sem inflar a estrutura.', 'Reforço técnico especializado para absorver picos, manter prazo e elevar o nível de serviço sem aumentar a estrutura.'],
    ['Revendas', 'Revendas'],
    ['Recuperação rápida de estoque, preservação de valor e maior velocidade de disponibilização para venda.', 'Recuperação rápida de stock, preservação de valor e maior velocidade de disponibilização para venda.'],
    ['Parceiros PDR', 'Parceiros PDR'],
    ['Apoio de capacidade, mobilização e execução in-company para ampliar entrega sem concorrer com a carteira do parceiro.', 'Apoio de capacidade, mobilização e execução in-company para ampliar entrega sem concorrer com a carteira do parceiro.'],
    ['Estrutura preparada para escala', 'Estrutura preparada para escala'],
    ['Projetos locais, regionais ou internacionais com a mesma disciplina de execução.', 'Projectos locais, regionais ou internacionais com a mesma disciplina de execução.'],
    ['Nossa proposta une mobilidade, padronização e capacidade de adaptação para operações em mercados maduros ou em expansão, sem perder critério técnico e disciplina de entrega.', 'A nossa proposta junta mobilidade, padronização e capacidade de adaptação para operações em mercados maduros ou em expansão, sem perder critério técnico e disciplina de entrega.'],
    ['Mobilidade', 'Mobilidade'],
    ['Atuação no espaço do cliente e em projetos especiais com entrada sob demanda.', 'Actuação no espaço do cliente e em projectos especiais com entrada sob procura.'],
    ['Padronização', 'Padronização'],
    ['Método replicável para proteger consistência mesmo quando o volume cresce rápido.', 'Método replicável para proteger consistência mesmo quando o volume cresce depressa.'],
    ['Visão corporativa', 'Visão corporativa'],
    ['Governança, apresentação profissional e alinhamento com a reputação do parceiro.', 'Governação, apresentação profissional e alinhamento com a reputação do parceiro.'],
    ['Expansão', 'Expansão'],
    ['Modelo desenhado para apoiar operações locais e internacionais sem perder fluidez.', 'Modelo desenhado para apoiar operações locais e internacionais sem perder fluidez.'],
    ['Onde atuamos', 'Onde actuamos'],
    ['Presença internacional com mobilização adaptada a contextos locais e projetos multi-país.', 'Presença internacional com mobilização adaptada a contextos locais e projectos multi-país.'],
    ['A Vittore já operou em mercados da América, Europa e África, mantendo o mesmo padrão técnico, a mesma apresentação profissional e a mesma disciplina de execução.', 'A Vittore já operou em mercados da América, Europa e África, mantendo o mesmo padrão técnico, a mesma apresentação profissional e a mesma disciplina de execução.'],
    ['Percepção de autoridade', 'Percepção de autoridade'],
    ['Apresentação, acabamento e disciplina compatíveis com operações de alta exigência.', 'Apresentação, acabamento e disciplina compatíveis com operações de elevada exigência.'],
    ['Por que trabalhar conosco', 'Porque trabalhar connosco'],
    ['Diferenciais concretos para quem precisa contratar com segurança.', 'Diferenciais concretos para quem precisa de contratar com segurança.'],
    ['Experiência real de campo, técnicos homologados, seguro de responsabilidade civil e atuação profissional dentro do ambiente do cliente.', 'Experiência real de campo, técnicos homologados, seguro de responsabilidade civil e actuação profissional dentro do ambiente do cliente.'],
    ['Perguntas que normalmente aparecem', 'Perguntas que normalmente surgem'],
    ['Suporte ao cliente e pós-venda', 'Suporte ao cliente e pós-venda'],
    ['Trabalhe conosco', 'Trabalhe connosco'],
    ['Quero me apresentar', 'Quero apresentar-me'],
    ['Contato rápido', 'Contacto rápido'],
    ['Vamos entender sua operação', 'Vamos perceber a sua operação'],
    ['Empresa', 'Empresa'],
    ['Volume', 'Volume'],
    ['Contexto', 'Contexto'],
    ['Falar no WhatsApp', 'Falar no WhatsApp'],
    ['Governança', 'Governação'],
    ['Nossa origem', 'A nossa origem'],
    ['Propósito', 'Propósito'],
    ['Valores', 'Valores'],
    ['Mapa do site', 'Mapa do site'],
    ['O que é PDR', 'O que é PDR'],
    ['Público', 'Público'],
    ['WhatsApp comercial', 'WhatsApp comercial'],
    ['Acessar intranet', 'Aceder à intranet'],
    ['Institucional', 'Institucional'],
    ['Autoridade', 'Autoridade'],
    ['Diferenciais', 'Diferenciais'],
    ['Sede administrativa', 'Sede administrativa'],
    ['© 2026 Vittore PDR Group. Todos os direitos reservados.', '© 2026 Vittore PDR Group. Todos os direitos reservados.']
  ]);

  const esReplacements = new Map([
    ['PDR', 'PDR'],
    ['Modelo', 'Modelo'],
    ['Time', 'Equipo'],
    ['Fluxo', 'Flujo'],
    ['Clientes', 'Clientes'],
    ['Presença', 'Presencia'],
    ['Presenca', 'Presencia'],
    ['Carreiras', 'Carreras'],
    ['Governança', 'Gobernanza'],
    ['Governanca', 'Gobernanza'],
    ['Contato', 'Contacto'],
    ['Fale conosco', 'Habla con nosotros'],
    ['APOIO OPERACIONAL PARA OFICINAS, CONCESSIONÁRIAS E ALTA DEMANDA', 'APOYO OPERATIVO PARA TALLERES, CONCESIONARIOS Y ALTA DEMANDA'],
    ['Mantemos sua operação fluindo no dia a dia e reforçamos sua capacidade quando a demanda aumenta.', 'Mantenemos tu operación en marcha en el día a día y reforzamos tu capacidad cuando la demanda aumenta.'],
    ['Equipe especializada em PDR para atuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar padrão de entrega.', 'Equipo especializado en PDR para actuar dentro de tu estructura, reducir la cola, proteger los plazos y preservar el nivel de entrega.'],
    ['Clareza para quem precisa manter a operação rodando, reduzir atraso e evitar retrabalho.', 'Claridad para quien necesita mantener la operación en marcha, reducir retrasos y evitar retrabajos.'],
    ['Preciso de apoio na operação', 'Necesito apoyo en la operación'],
    ['Entender o PDR', 'Entender el PDR'],
    ['Indicadores que ajudam o cliente a confiar antes do primeiro contato.', 'Indicadores que ayudan al cliente a confiar antes del primer contacto.'],
    ['Quando você precisa da Vittore', 'Cuando necesitas a Vittore'],
    ['Alguns sinais mostram que sua operação precisa de reforço técnico.', 'Algunas señales muestran que tu operación necesita refuerzo técnico.'],
    ['Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.', 'Cuando la cola crece, la entrega se retrasa o falta mano de obra especializada, el problema aparece primero en el flujo.'],
    ['Fila acumulando', 'Cola acumulándose'],
    ['Entrega atrasando', 'Entrega retrasándose'],
    ['Falta de equipe especializada', 'Falta de equipo especializado'],
    ['Aumento repentino de demanda', 'Aumento repentino de demanda'],
    ['Remoção de amassados sem pintura, com preservação da peça original e menor tempo de entrega.', 'Eliminación de abolladuras sin pintura, preservando la pieza original y con menor tiempo de entrega.'],
    ['Quando o dano permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.', 'Cuando el daño lo permite, el PDR evita repintado innecesario, reduce el tiempo de inmovilización y protege la originalidad del vehículo.'],
    ['Atuamos como apoio técnico dentro da sua operação.', 'Actuamos como apoyo técnico dentro de tu operación.'],
    ['Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.', 'Entramos en el flujo del socio para reforzar capacidad, mantener plazos y sostener el nivel técnico sin interferir en la atención.'],
    ['Somos extensão técnica da sua operação quando sua capacidade não acompanha a demanda.', 'Somos una extensión técnica de tu operación cuando tu capacidad no acompaña la demanda.'],
    ['O modelo se adapta ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.', 'El modelo se adapta al entorno del socio con velocidad, responsabilidad operativa y no competencia.'],
    ['Concessionárias', 'Concesionarios'],
    ['Mais velocidade de entrega, menor fila e preservação de valor em veículos novos, seminovos e estoque.', 'Más velocidad de entrega, menos cola y preservación de valor en vehículos nuevos, seminuevos y stock.'],
    ['Oficinas', 'Talleres'],
    ['Reforço técnico especializado para absorver picos, manter prazo e elevar o nível de serviço sem inflar a estrutura.', 'Refuerzo técnico especializado para absorber picos, mantener plazos y elevar el nivel de servicio sin inflar la estructura.'],
    ['Revendas', 'Reventas'],
    ['Recuperação rápida de estoque, preservação de valor e maior velocidade de disponibilização para venda.', 'Recuperación rápida de stock, preservación de valor y mayor velocidad de disponibilidad para la venta.'],
    ['Parceiros PDR', 'Socios PDR'],
    ['Apoio de capacidade, mobilização e execução in-company para ampliar entrega sem concorrer com a carteira do parceiro.', 'Apoyo de capacidad, movilización y ejecución in-company para ampliar la entrega sin competir con la cartera del socio.'],
    ['Estrutura preparada para escala', 'Estructura preparada para escala'],
    ['Onde atuamos', 'Dónde operamos'],
    ['Presença internacional com mobilização adaptada a contextos locais e projetos multi-país.', 'Presencia internacional con movilización adaptada a contextos locales y proyectos multipaís.'],
    ['Países com atuação Vittore', 'Países con actuación de Vittore'],
    ['Percepção de autoridade', 'Percepción de autoridad'],
    ['Por que trabalhar conosco', 'Por qué trabajar con nosotros'],
    ['Diferenciais concretos para quem precisa contratar com segurança.', 'Diferenciales concretos para quien necesita contratar con seguridad.'],
    ['Perguntas que normalmente aparecem', 'Preguntas que suelen aparecer'],
    ['Suporte ao cliente e pós-venda', 'Soporte al cliente y posventa'],
    ['Trabalhe conosco', 'Trabaja con nosotros'],
    ['Contato rápido', 'Contacto rápido'],
    ['Vamos entender sua operação', 'Vamos a entender tu operación'],
    ['Governança', 'Gobernanza'],
    ['Nossa origem', 'Nuestro origen'],
    ['Mapa do site', 'Mapa del sitio'],
    ['O que é PDR', 'Qué es el PDR'],
    ['Público', 'Público'],
    ['Sede administrativa', 'Sede administrativa'],
    ['© 2026 Vittore PDR Group. Todos os direitos reservados.', '© 2026 Vittore PDR Group. Todos los derechos reservados.']
  ]);

  const frReplacements = new Map([
    ['PDR', 'PDR'],
    ['Modelo', 'Modèle'],
    ['Time', 'Équipe'],
    ['Fluxo', 'Flux'],
    ['Clientes', 'Clients'],
    ['Presença', 'Présence'],
    ['Presenca', 'Présence'],
    ['Carreiras', 'Carrières'],
    ['Governança', 'Gouvernance'],
    ['Governanca', 'Gouvernance'],
    ['Contato', 'Contact'],
    ['Fale conosco', 'Parlez-nous'],
    ['APOIO OPERACIONAL PARA OFICINAS, CONCESSIONÁRIAS E ALTA DEMANDA', 'SUPPORT OPÉRATIONNEL POUR ATELIERS, CONCESSIONNAIRES ET FORTE DEMANDE'],
    ['Mantemos sua operação fluindo no dia a dia e reforçamos sua capacidade quando a demanda aumenta.', 'Nous maintenons votre opération fluide au quotidien et renforçons votre capacité lorsque la demande augmente.'],
    ['Equipe especializada em PDR para atuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar padrão de entrega.', 'Équipe spécialisée en PDR pour intervenir au sein de votre structure, réduire la file d attente, protéger les délais et préserver le niveau de livraison.'],
    ['Clareza para quem precisa manter a operação rodando, reduzir atraso e evitar retrabalho.', 'De la clarté pour ceux qui doivent maintenir l opération en mouvement, réduire les retards et éviter les reprises.'],
    ['Preciso de apoio na operação', 'J ai besoin d un appui opérationnel'],
    ['Entender o PDR', 'Comprendre le PDR'],
    ['Indicadores que ajudam o cliente a confiar antes do primeiro contato.', 'Des indicateurs qui aident le client à faire confiance avant le premier contact.'],
    ['Quando você precisa da Vittore', 'Quand vous avez besoin de Vittore'],
    ['Alguns sinais mostram que sua operação precisa de reforço técnico.', 'Certains signes montrent que votre opération a besoin de renfort technique.'],
    ['Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.', 'Lorsque la file s allonge, que la livraison se retarde ou qu il manque de main-d œuvre spécialisée, le problème apparaît d abord dans le flux.'],
    ['Fila acumulando', 'File en hausse'],
    ['Entrega atrasando', 'Livraison en retard'],
    ['Falta de equipe especializada', 'Manque d équipe spécialisée'],
    ['Aumento repentino de demanda', 'Hausse soudaine de la demande'],
    ['Remoção de amassados sem pintura, com preservação da peça original e menor tempo de entrega.', 'Suppression des bosses sans peinture, avec préservation de la pièce d origine et délai de livraison réduit.'],
    ['Quando o dano permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.', 'Lorsque le dommage le permet, le PDR évite une remise en peinture inutile, réduit le temps d immobilisation et protège l originalité du véhicule.'],
    ['Atuamos como apoio técnico dentro da sua operação.', 'Nous intervenons comme appui technique au sein de votre opération.'],
    ['Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.', 'Nous entrons dans le flux du partenaire pour renforcer la capacité, tenir les délais et soutenir le niveau technique sans perturber le service.'],
    ['Somos extensão técnica da sua operação quando sua capacidade não acompanha a demanda.', 'Nous sommes une extension technique de votre opération lorsque votre capacité ne suit pas la demande.'],
    ['O modelo se adapta ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.', 'Le modèle s adapte à l environnement du partenaire avec rapidité, responsabilité opérationnelle et non-concurrence.'],
    ['Concessionárias', 'Concessionnaires'],
    ['Mais velocidade de entrega, menor fila e preservação de valor em veículos novos, seminovos e estoque.', 'Plus de vitesse de livraison, moins de file et meilleure préservation de valeur sur véhicules neufs, d occasion et stock.'],
    ['Oficinas', 'Ateliers'],
    ['Reforço técnico especializado para absorver picos, manter prazo e elevar o nível de serviço sem inflar a estrutura.', 'Renfort technique spécialisé pour absorber les pics, tenir les délais et élever le niveau de service sans alourdir la structure.'],
    ['Revendas', 'Revendeurs'],
    ['Recuperação rápida de estoque, preservação de valor e maior velocidade de disponibilização para venda.', 'Récupération rapide du stock, préservation de la valeur et mise à disposition plus rapide pour la vente.'],
    ['Parceiros PDR', 'Partenaires PDR'],
    ['Apoio de capacidade, mobilização e execução in-company para ampliar entrega sem concorrer com a carteira do parceiro.', 'Appui de capacité, mobilisation et exécution in-company pour augmenter la livraison sans concurrencer le portefeuille du partenaire.'],
    ['Estrutura preparada para escala', 'Structure préparée pour l échelle'],
    ['Onde atuamos', 'Où nous opérons'],
    ['Presença internacional com mobilização adaptada a contextos locais e projetos multi-país.', 'Présence internationale avec mobilisation adaptée aux contextes locaux et aux projets multi-pays.'],
    ['Países com atuação Vittore', 'Pays où Vittore est déjà intervenue'],
    ['Percepção de autoridade', 'Perception d autorité'],
    ['Por que trabalhar conosco', 'Pourquoi travailler avec nous'],
    ['Diferenciais concretos para quem precisa contratar com segurança.', 'Des atouts concrets pour ceux qui doivent engager avec sécurité.'],
    ['Perguntas que normalmente aparecem', 'Questions qui reviennent souvent'],
    ['Suporte ao cliente e pós-venda', 'Support client et après-vente'],
    ['Trabalhe conosco', 'Travaillez avec nous'],
    ['Contato rápido', 'Contact rapide'],
    ['Vamos entender sua operação', 'Comprenons votre opération'],
    ['Governança', 'Gouvernance'],
    ['Nossa origem', 'Notre origine'],
    ['Mapa do site', 'Plan du site'],
    ['O que é PDR', 'Qu est-ce que le PDR'],
    ['Público', 'Public'],
    ['Sede administrativa', 'Siège administratif'],
    ['© 2026 Vittore PDR Group. Todos os direitos reservados.', '© 2026 Vittore PDR Group. Tous droits réservés.']
  ]);

  const enReplacements = new Map([
    ['PDR', 'PDR'],
    ['Modelo', 'Model'],
    ['Time', 'Team'],
    ['Fluxo', 'Flow'],
    ['Clientes', 'Clients'],
    ['Presença', 'Presence'],
    ['Presenca', 'Presence'],
    ['Carreiras', 'Careers'],
    ['Governança', 'Governance'],
    ['Governanca', 'Governance'],
    ['Contato', 'Contact'],
    ['Fale conosco', 'Talk to us'],
    ['APOIO OPERACIONAL PARA OFICINAS, CONCESSIONÁRIAS E ALTA DEMANDA', 'OPERATIONAL SUPPORT FOR WORKSHOPS, DEALERSHIPS AND HIGH DEMAND'],
    ['Mantemos sua operação fluindo no dia a dia e reforçamos sua capacidade quando a demanda aumenta.', 'We keep your operation moving day to day and reinforce your capacity when demand rises.'],
    ['Equipe especializada em PDR para atuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar padrão de entrega.', 'A PDR-focused team ready to work inside your structure, reduce backlog, protect deadlines and preserve delivery standards.'],
    ['Clareza para quem precisa manter a operação rodando, reduzir atraso e evitar retrabalho.', 'Clarity for those who need to keep operations running, reduce delays and avoid rework.'],
    ['Preciso de apoio na operação', 'I need operational support'],
    ['Entender o PDR', 'Understand PDR'],
    ['Indicadores que ajudam o cliente a confiar antes do primeiro contato.', 'Indicators that help the client trust before the first contact.'],
    ['Quando você precisa da Vittore', 'When you need Vittore'],
    ['Alguns sinais mostram que sua operação precisa de reforço técnico.', 'Some signs show that your operation needs technical reinforcement.'],
    ['Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.', 'When the queue grows, delivery slips or skilled labor is missing, the problem shows up first in the operational flow.'],
    ['Fila acumulando', 'Backlog building up'],
    ['Entrega atrasando', 'Delivery falling behind'],
    ['Falta de equipe especializada', 'Lack of specialized team'],
    ['Aumento repentino de demanda', 'Sudden increase in demand'],
    ['Remoção de amassados sem pintura, com preservação da peça original e menor tempo de entrega.', 'Dent removal without painting, preserving the original panel and shortening delivery time.'],
    ['Quando o dano permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.', 'When the damage allows it, PDR avoids unnecessary repainting, reduces downtime and protects vehicle originality.'],
    ['Atuamos como apoio técnico dentro da sua operação.', 'We act as technical support inside your operation.'],
    ['Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.', 'We enter the partner s workflow to reinforce capacity, keep deadlines and sustain technical standards without interfering with customer service.'],
    ['Somos extensão técnica da sua operação quando sua capacidade não acompanha a demanda.', 'We are a technical extension of your operation when your capacity does not keep up with demand.'],
    ['O modelo se adapta ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.', 'The model adapts to the partner environment with speed, operational responsibility and non-competition.'],
    ['Concessionárias', 'Dealerships'],
    ['Oficinas', 'Workshops'],
    ['Revendas', 'Resellers'],
    ['Parceiros PDR', 'PDR partners'],
    ['Estrutura preparada para escala', 'Structure prepared for scale'],
    ['Onde atuamos', 'Where we operate'],
    ['Percepção de autoridade', 'Perception of authority'],
    ['Por que trabalhar conosco', 'Why work with us'],
    ['Perguntas que normalmente aparecem', 'Questions that usually come up'],
    ['Suporte ao cliente e pós-venda', 'Customer support and after-sales'],
    ['Trabalhe conosco', 'Work with us'],
    ['Contato rápido', 'Quick contact'],
    ['Vamos entender sua operação', 'Let us understand your operation'],
    ['Nossa origem', 'Our origin'],
    ['Mapa do site', 'Site map'],
    ['O que é PDR', 'What is PDR'],
    ['Público', 'Audience'],
    ['Sede administrativa', 'Administrative headquarters'],
    ['© 2026 Vittore PDR Group. Todos os direitos reservados.', '© 2026 Vittore PDR Group. All rights reserved.']
  ]);

  const deReplacements = new Map([
    ['PDR', 'PDR'],
    ['Modelo', 'Modell'],
    ['Time', 'Team'],
    ['Fluxo', 'Ablauf'],
    ['Clientes', 'Kunden'],
    ['Presença', 'Präsenz'],
    ['Presenca', 'Präsenz'],
    ['Carreiras', 'Karriere'],
    ['Governança', 'Governance'],
    ['Governanca', 'Governance'],
    ['Contato', 'Kontakt'],
    ['Fale conosco', 'Kontaktieren Sie uns'],
    ['APOIO OPERACIONAL PARA OFICINAS, CONCESSIONÁRIAS E ALTA DEMANDA', 'OPERATIVE UNTERSTÜTZUNG FÜR WERKSTÄTTEN, HÄNDLER UND HOHE NACHFRAGE'],
    ['Mantemos sua operação fluindo no dia a dia e reforçamos sua capacidade quando a demanda aumenta.', 'Wir halten Ihren Betrieb im Alltag in Bewegung und stärken Ihre Kapazität, wenn die Nachfrage steigt.'],
    ['Equipe especializada em PDR para atuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar padrão de entrega.', 'Ein auf PDR spezialisiertes Team, das in Ihrer Struktur arbeitet, Rückstände reduziert, Fristen schützt und den Lieferstandard wahrt.'],
    ['Clareza para quem precisa manter a operação rodando, reduzir atraso e evitar retrabalho.', 'Klarheit für alle, die den Betrieb am Laufen halten, Verzögerungen reduzieren und Nacharbeit vermeiden müssen.'],
    ['Preciso de apoio na operação', 'Ich brauche operative Unterstützung'],
    ['Entender o PDR', 'PDR verstehen'],
    ['Indicadores que ajudam o cliente a confiar antes do primeiro contato.', 'Kennzahlen, die dem Kunden schon vor dem ersten Kontakt Vertrauen geben.'],
    ['Quando você precisa da Vittore', 'Wann Sie Vittore brauchen'],
    ['Alguns sinais mostram que sua operação precisa de reforço técnico.', 'Einige Anzeichen zeigen, dass Ihr Betrieb technische Verstärkung braucht.'],
    ['Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.', 'Wenn die Warteschlange wächst, Lieferungen sich verzögern oder spezialisierte Fachkräfte fehlen, zeigt sich das Problem zuerst im Ablauf.'],
    ['Fila acumulando', 'Rückstand wächst'],
    ['Entrega atrasando', 'Lieferung verzögert sich'],
    ['Falta de equipe especializada', 'Mangel an spezialisiertem Team'],
    ['Aumento repentino de demanda', 'Plötzlicher Nachfrageanstieg'],
    ['Remoção de amassados sem pintura, com preservação da peça original e menor tempo de entrega.', 'Dellenentfernung ohne Lackierung, mit Erhalt des Originalteils und kürzerer Lieferzeit.'],
    ['Quando o dano permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.', 'Wenn der Schaden es zulässt, vermeidet PDR unnötiges Lackieren, reduziert die Standzeit und schützt die Originalität des Fahrzeugs.'],
    ['Atuamos como apoio técnico dentro da sua operação.', 'Wir arbeiten als technische Unterstützung innerhalb Ihres Betriebs.'],
    ['Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.', 'Wir gehen in den Ablauf des Partners, um Kapazität zu verstärken, Fristen einzuhalten und technische Standards zu sichern, ohne den Service zu stören.'],
    ['Somos extensão técnica da sua operação quando sua capacidade não acompanha a demanda.', 'Wir sind eine technische Erweiterung Ihres Betriebs, wenn Ihre Kapazität der Nachfrage nicht folgt.'],
    ['O modelo se adapta ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.', 'Das Modell passt sich der Umgebung des Partners mit Geschwindigkeit, operativer Verantwortung und ohne Konkurrenz an.'],
    ['Concessionárias', 'Händler'],
    ['Oficinas', 'Werkstätten'],
    ['Revendas', 'Wiederverkäufer'],
    ['Parceiros PDR', 'PDR-Partner'],
    ['Onde atuamos', 'Wo wir tätig sind'],
    ['Percepção de autoridade', 'Wahrnehmung von Autorität'],
    ['Por que trabalhar conosco', 'Warum mit uns arbeiten'],
    ['Suporte ao cliente e pós-venda', 'Kundensupport und After-Sales'],
    ['Trabalhe conosco', 'Arbeiten Sie mit uns'],
    ['Contato rápido', 'Schnellkontakt'],
    ['Nossa origem', 'Unsere Herkunft'],
    ['Mapa do site', 'Sitemap'],
    ['O que é PDR', 'Was ist PDR'],
    ['Público', 'Zielgruppen'],
    ['Sede administrativa', 'Verwaltungssitz'],
    ['© 2026 Vittore PDR Group. Todos os direitos reservados.', '© 2026 Vittore PDR Group. Alle Rechte vorbehalten.']
  ]);

  const activeMapByLang = {
    'pt': ptReplacements,
    'pt-pt': ptPtReplacements,
    'it': itReplacements,
    'es': esReplacements,
    'fr': frReplacements,
    'en': enReplacements,
    'de': deReplacements
  };

  const activeMap = activeMapByLang[currentLang] || ptReplacements;

  const normalizeText = (value) => (value || '').replace(/\s+/g, ' ').trim();
  const shouldIgnoreTranslationTarget = (element) => {
    return Boolean(element.closest('.site-header, .language-switches, .language-switch-slot, .header-tools'));
  };
  const normalizedActiveMap = new Map(
    Array.from(activeMap.entries()).map(([key, value]) => [normalizeText(key), value])
  );

  document.querySelectorAll(selectors).forEach((element) => {
    if (shouldIgnoreTranslationTarget(element)) return;
    const text = normalizeText(element.textContent);
    if (!text || !normalizedActiveMap.has(text)) return;
    element.textContent = normalizedActiveMap.get(text);
  });

  const applyPhraseTranslations = (translations) => {
    document.querySelectorAll(selectors).forEach((element) => {
      if (shouldIgnoreTranslationTarget(element)) return;
      if (!element.childElementCount && element.textContent) {
        let nextText = element.textContent;
        translations.forEach(([from, to]) => {
          if (nextText.includes(from)) {
            nextText = nextText.split(from).join(to);
          }
        });
        if (nextText !== element.textContent) {
          element.textContent = nextText;
        }
      }
    });
  };

  if (currentLang === 'it') {
    applyPhraseTranslations([
      ['Mantemos sua operação fluindo no dia a dia e reforçamos sua capacidade quando a demanda aumenta.', 'Manteniamo la tua operazione in movimento ogni giorno e rafforziamo la tua capacità quando la domanda aumenta.'],
      ['Equipe especializada em PDR para atuar dentro da sua estrutura, reduzir fila, proteger prazo e preservar padrão de entrega.', 'Squadra specializzata in PDR pronta ad operare all interno della tua struttura per ridurre le code, proteggere i tempi e preservare lo standard di consegna.'],
      ['Clareza para quem precisa manter a operação rodando, reduzir atraso e evitar retrabalho.', 'Chiarezza per chi ha bisogno di mantenere l operazione in movimento, ridurre i ritardi ed evitare rilavorazioni.'],
      ['Indicadores que ajudam o cliente a confiar antes do primeiro contato.', 'Indicatori che aiutano il cliente a fidarsi prima del primo contatto.'],
      ['Alguns sinais mostram que sua operação precisa de reforço técnico.', 'Alcuni segnali mostrano che la tua operazione ha bisogno di rinforzo tecnico.'],
      ['Quando a fila cresce, a entrega atrasa ou falta mão de obra especializada, o problema aparece primeiro no fluxo.', 'Quando la coda cresce, la consegna ritarda o manca manodopera specializzata, il problema appare prima di tutto nel flusso operativo.'],
      ['Fila acumulando', 'Coda in aumento'],
      ['Entrega atrasando', 'Consegne in ritardo'],
      ['Falta de equipe especializada', 'Mancanza di squadra specializzata'],
      ['Aumento repentino de demanda', 'Aumento improvviso della domanda'],
      ['Remoção de amassados sem pintura, com preservação da peça original e menor tempo de entrega.', 'Rimozione delle ammaccature senza verniciatura, con preservazione del pezzo originale e tempi di consegna ridotti.'],
      ['Quando o dano permite, o PDR evita repintura desnecessária, reduz o tempo de imobilização e protege a originalidade do veículo.', 'Quando il danno lo consente, il PDR evita riverniciature inutili, riduce il tempo di fermo e protegge l originalità del veicolo.'],
      ['Atuamos como apoio técnico dentro da sua operação.', 'Operiamo come supporto tecnico all interno della tua operazione.'],
      ['Entramos no fluxo do parceiro para reforçar capacidade, manter prazo e sustentar padrão técnico sem interferir no atendimento.', 'Entriamo nel flusso del partner per rafforzare la capacità, mantenere i tempi e sostenere lo standard tecnico senza interferire con il servizio.'],
      ['Somos extensão técnica da sua operação quando sua capacidade não acompanha a demanda.', 'Siamo un estensione tecnica della tua operazione quando la capacità interna non segue la domanda.'],
      ['O modelo se adapta ao ambiente do parceiro com velocidade, responsabilidade operacional e não concorrência.', 'Il modello si adatta all ambiente del partner con velocità, responsabilità operativa e non concorrenza.'],
      ['Concessionárias', 'Concessionarie'],
      ['Mais velocidade de entrega, menor fila e preservação de valor em veículos novos, seminovos e estoque.', 'Più velocità di consegna, meno coda e maggiore preservazione del valore su veicoli nuovi, usati e stock.'],
      ['Oficinas', 'Officine'],
      ['Reforço técnico especializado para absorver picos, manter prazo e elevar o nível de serviço sem inflar a estrutura.', 'Rinforzo tecnico specializzato per assorbire i picchi, mantenere i tempi ed elevare il livello di servizio senza appesantire la struttura.'],
      ['Revendas', 'Rivenditori'],
      ['Recuperação rápida de estoque, preservação de valor e maior velocidade de disponibilização para venda.', 'Recupero rapido dello stock, preservazione del valore e maggiore velocità nella messa in vendita.'],
      ['Parceiros PDR', 'Partner PDR'],
      ['Apoio de capacidade, mobilização e execução in-company para ampliar entrega sem concorrer com a carteira do parceiro.', 'Supporto di capacità, mobilitazione ed esecuzione in house per aumentare la consegna senza competere con il portafoglio del partner.'],
      ['Estrutura preparada para escala', 'Struttura pronta per la scala'],
      ['Projetos locais, regionais ou internacionais com a mesma disciplina de execução.', 'Progetti locali, regionali o internazionali con la stessa disciplina esecutiva.'],
      ['Nossa proposta une mobilidade, padronização e capacidade de adaptação para operações em mercados maduros ou em expansão, sem perder critério técnico e disciplina de entrega.', 'La nostra proposta unisce mobilità, standardizzazione e capacità di adattamento per operazioni in mercati maturi o in espansione, senza perdere criterio tecnico e disciplina di consegna.'],
      ['Mobilidade', 'Mobilità'],
      ['Atuação no espaço do cliente e em projetos especiais com entrada sob demanda.', 'Operatività nello spazio del cliente e in progetti speciali con ingresso on demand.'],
      ['Padronização', 'Standardizzazione'],
      ['Método replicável para proteger consistência mesmo quando o volume cresce rápido.', 'Metodo replicabile per proteggere la coerenza anche quando il volume cresce rapidamente.'],
      ['Visão corporativa', 'Visione aziendale'],
      ['Governança, apresentação profissional e alinhamento com a reputação do parceiro.', 'Governance, presentazione professionale e allineamento con la reputazione del partner.'],
      ['Expansão', 'Espansione'],
      ['Modelo desenhado para apoiar operações locais e internacionais sem perder fluidez.', 'Modello progettato per supportare operazioni locali e internazionali senza perdere fluidità.'],
      ['Onde atuamos', 'Dove operiamo'],
      ['Presença internacional com mobilização adaptada a contextos locais e projetos multi-país.', 'Presenza internazionale con mobilitazione adattata a contesti locali e progetti multi paese.'],
      ['A Vittore já operou em mercados da América, Europa e África, mantendo o mesmo padrão técnico, a mesma apresentação profissional e a mesma disciplina de execução.', 'Vittore ha già operato in mercati dell America, dell Europa e dell Africa, mantenendo lo stesso standard tecnico, la stessa presentazione professionale e la stessa disciplina esecutiva.'],
      ['Países com atuação Vittore', 'Paesi in cui Vittore ha già operato'],
      ['Mapa global de atuação internacional Vittore', 'Mappa globale della presenza internazionale di Vittore'],
      ['Presença internacional com mobilização adaptada para apoiar o parceiro com segurança e tranquilidade.', 'Presenza internazionale con mobilitazione adattata per supportare il partner con sicurezza e tranquillità.'],
      ['Percepção de autoridade', 'Percezione di autorevolezza'],
      ['Apresentação, acabamento e disciplina compatíveis com operações de alta exigência.', 'Presentazione, finitura e disciplina compatibili con operazioni ad alta esigenza.'],
      ['Projetos de alto valor exigem equipe que sabe entrar, executar e sair sem ruído. A linguagem visual e o padrão de entrega precisam acompanhar esse nível de exigência.', 'I progetti di alto valore richiedono una squadra che sappia entrare, eseguire e uscire senza rumore. Il linguaggio visivo e lo standard di consegna devono accompagnare questo livello di esigenza.'],
      ['Por que trabalhar conosco', 'Perché lavorare con noi'],
      ['Diferenciais concretos para quem precisa contratar com segurança.', 'Differenziali concreti per chi ha bisogno di assumere con sicurezza.'],
      ['Experiência real de campo, técnicos homologados, seguro de responsabilidade civil e atuação profissional dentro do ambiente do cliente.', 'Esperienza reale sul campo, tecnici omologati, assicurazione di responsabilità civile e presenza professionale all interno dell ambiente del cliente.'],
      ['Perguntas que normalmente aparecem', 'Domande che normalmente emergono'],
      ['Explicar bem também faz parte da venda.', 'Spiegare bene fa parte anche della vendita.'],
      ['Suporte ao cliente e pós-venda', 'Supporto al cliente e post vendita'],
      ['Trabalhe conosco', 'Lavora con noi'],
      ['Contato rápido', 'Contatto rapido'],
      ['Vamos entender sua operação', 'Cerchiamo di capire la tua operazione'],
      ['Governança', 'Governance'],
      ['Nossa origem', 'La nostra origine']
    ]);
  }

  const setTextIfFound = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  const setNavText = (labels, selector = '.site-nav [data-nav]') => {
    document.querySelectorAll(selector).forEach((link) => {
      const key = link.getAttribute('data-nav');
      if (!key) return;
      if (key === 'how') link.textContent = labels.modelo;
      else if (key === 'team') link.textContent = labels.time;
      else if (key === 'flow') link.textContent = labels.fluxo || labels.modelo;
      else if (key === 'clients') link.textContent = labels.publico;
      else if (key === 'advantages') link.textContent = labels.diferenciais || link.textContent;
      else if (key === 'support') link.textContent = labels.suporte || link.textContent;
      else if (key === 'presence') link.textContent = labels.presenca;
      else if (key === 'careers') link.textContent = labels.carreiras;
      else if (key === 'governance') link.textContent = labels.governanca;
      else if (key === 'contact') link.textContent = labels.contato;
      else if (key === 'pdr') link.textContent = labels.pdr;
      else if (key === 'pdr-footer') link.textContent = labels.pdrFooter || labels.pdr;
    });
  };

  const setFooterMapText = (labels) => {
    setNavText(labels, 'footer [data-nav]');
  };

  const applyLanguageBySelectors = () => {
    if (currentLang === 'it') {
      setNavText({
        pdr: 'PDR',
        modelo: 'Come lavoriamo',
        time: 'Team',
        fluxo: 'Flusso',
        publico: 'Clienti',
        diferenciais: 'Vantaggi',
        suporte: 'Supporto',
        presenca: 'Presenza',
        carreiras: 'Carriere',
        governanca: 'Governance',
        contato: 'Contatto'
      });
      setFooterMapText({
        pdr: 'PDR',
        pdrFooter: 'Scopri il PDR',
        modelo: 'Come lavoriamo',
        time: 'Team',
        fluxo: 'Come lavoriamo',
        publico: 'Clienti',
        diferenciais: 'Vantaggi',
        suporte: 'Supporto',
        presenca: 'Presenza',
        carreiras: 'Carriere',
        governanca: 'Governance',
        contato: 'Contatto'
      });

      setTextIfFound('.hero .eyebrow, .hero-copy .eyebrow, .hero .section-kicker, .hero-copy .section-kicker, .hero-kicker', 'SQUADRA SPECIALIZZATA IN PDR');
      setTextIfFound('.hero h1, .hero-copy h1', 'Soluzioni concrete, anche dove gli altri non arrivano.');
      setTextIfFound('.hero .lead, .hero-copy .lead', 'Specialisti PDR operano nella tua struttura per gestire grandine e ammaccature, accelerare i tempi e mantenere lo standard di qualità.');

      const heroProof = document.querySelectorAll('.hero-proof span');
      if (heroProof[0]) heroProof[0].textContent = 'Meno vernice';
      if (heroProof[1]) heroProof[1].textContent = 'Meno tempo senza auto';
      if (heroProof[2]) heroProof[2].textContent = 'Più produttività';

      document.querySelectorAll('[data-open-contact-modal]').forEach((button) => {
        if (button.textContent?.trim().length) {
          button.textContent = 'Parla con un esperto';
        }
      });

      document.querySelectorAll('a[href="#pdr"], a[href="#o-que-e-pdr"]').forEach((link) => {
        if (link.textContent?.trim().length) {
          link.textContent = 'Scopri il PDR';
        }
      });

      setTextIfFound('#desafio .section-kicker', 'Quando serve');
      setTextIfFound('#desafio h2', 'Quando l’operatività si blocca');
      const problemCards = document.querySelectorAll('#desafio .feature-card');
      if (problemCards[0]) {
        problemCards[0].querySelector('h3').textContent = 'Accumulo di veicoli';
        problemCards[0].querySelector('p').textContent = 'Più auto ferme, più pressione su tempi e team.';
      }
      if (problemCards[1]) {
        problemCards[1].querySelector('h3').textContent = 'Ritardi nelle consegne';
        problemCards[1].querySelector('p').textContent = 'Perdita di ritmo e clienti insoddisfatti.';
      }
      if (problemCards[2]) {
        problemCards[2].querySelector('h3').textContent = 'Mancanza di tecnici specializzati';
        problemCards[2].querySelector('p').textContent = 'Più casi finiscono in verniciatura senza necessità.';
      }
      if (problemCards[3]) {
        problemCards[3].querySelector('h3').textContent = 'Picchi dopo grandine';
        problemCards[3].querySelector('p').textContent = 'Serve una risposta veloce e organizzata.';
      }

      setTextIfFound('#como .section-kicker', 'Come lavoriamo');
      setTextIfFound('#como h2', 'Come lavoriamo');
      setTextIfFound('#como .section-intro', 'Quattro passaggi per lavorare con metodo, ritmo e puntualità.');
      const timelineSteps = document.querySelectorAll('#como .timeline-step');
      if (timelineSteps[0]) {
        timelineSteps[0].querySelector('h3').textContent = 'Analisi';
        timelineSteps[0].querySelector('p').textContent = 'Valutiamo volume, tempi e tipo di danno.';
      }
      if (timelineSteps[1]) {
        timelineSteps[1].querySelector('h3').textContent = 'Attivazione';
        timelineSteps[1].querySelector('p').textContent = 'Costruiamo il team in base alla necessità.';
      }
      if (timelineSteps[2]) {
        timelineSteps[2].querySelector('h3').textContent = 'Esecuzione';
        timelineSteps[2].querySelector('p').textContent = 'Intervento tecnico con ritmo, controllo e qualità.';
      }
      if (timelineSteps[3]) {
        timelineSteps[3].querySelector('h3').textContent = 'Consegna';
        timelineSteps[3].querySelector('p').textContent = 'Verifica finale e rispetto delle tempistiche.';
      }
      setTextIfFound('#como .timeline-support p', 'Non siamo una carrozzeria. Siamo un’estensione della tua capacità produttiva.');
      const trustTags = document.querySelectorAll('#como .trust-tags span');
      if (trustTags[0]) trustTags[0].textContent = 'Team adattato al volume';
      if (trustTags[1]) trustTags[1].textContent = 'Nessuna competizione con il cliente finale';
      if (trustTags[2]) trustTags[2].textContent = 'Tecnici qualificati';
      if (trustTags[3]) trustTags[3].textContent = 'Operatività direttamente in sede';

      setTextIfFound('#time .section-kicker', 'Team');
      setTextIfFound('#time h2', 'Un team pronto a garantire risultato');
      setTextIfFound('#time .section-intro', 'Criterio tecnico, presenza professionale e attenzione al risultato.');
      const proofPoints = document.querySelectorAll('#time .proof-point');
      if (proofPoints[0]) {
        proofPoints[0].querySelector('strong').textContent = 'Tecnici qualificati';
        proofPoints[0].querySelector('span').textContent = 'Selezionati per competenza e affidabilità.';
      }
      if (proofPoints[1]) {
        proofPoints[1].querySelector('strong').textContent = 'Supervisione attiva';
        proofPoints[1].querySelector('span').textContent = 'Controllo costante e interventi rapidi.';
      }
      if (proofPoints[2]) {
        proofPoints[2].querySelector('strong').textContent = 'Immagine professionale';
        proofPoints[2].querySelector('span').textContent = 'Ordine, DPI e rispetto dell’ambiente di lavoro.';
      }
      if (proofPoints[3]) {
        proofPoints[3].querySelector('strong').textContent = 'Strumenti e sistema';
        proofPoints[3].querySelector('span').textContent = 'Controllo, tracciamento e organizzazione.';
      }
      const teamMedia = document.querySelector('#time .proof-media img');
      const teamCaption = document.querySelector('#time .proof-caption');
      if (teamMedia) teamMedia.alt = 'Squadra tecnica preparata per operazioni specializzate di PDR';
      if (teamCaption) teamCaption.textContent = 'Una squadra preparata per entrare, eseguire e sostenere lo standard in ambienti ad alta esigenza.';
      const teamCards = document.querySelectorAll('#time .team-card');
      if (teamCards[0]) {
        teamCards[0].querySelector('h3').textContent = 'Più riparazioni';
        teamCards[0].querySelector('p').textContent = 'Meno verniciatura quando non serve.';
      }
      if (teamCards[1]) {
        teamCards[1].querySelector('h3').textContent = 'Più velocità';
        teamCards[1].querySelector('p').textContent = 'Processo più diretto e fluido.';
      }
      if (teamCards[2]) {
        teamCards[2].querySelector('h3').textContent = 'Meno errori';
        teamCards[2].querySelector('p').textContent = 'Scelte tecniche che evitano ritardi.';
      }
      if (teamCards[3]) {
        teamCards[3].querySelector('h3').textContent = 'Ritmo con qualità';
        teamCards[3].querySelector('p').textContent = 'Velocità senza perdere lo standard.';
      }

      setTextIfFound('#diferenciais .section-kicker', 'Vantaggi');
      setTextIfFound('#diferenciais h2', 'Indicatori e vantaggi per decidere con sicurezza.');
      setTextIfFound('#diferenciais .section-intro', 'Team tecnico, scala e criteri chiari per rispondere quando la domanda aumenta.');
      const impactCards = document.querySelectorAll('#diferenciais .impact-card');
      if (impactCards[0]) impactCards[0].querySelector('span').textContent = 'anni di esperienza';
      if (impactCards[1]) impactCards[1].querySelector('span').textContent = 'veicoli riparati';
      if (impactCards[2]) impactCards[2].querySelector('span').textContent = 'tecnici disponibili';
      if (impactCards[3]) {
        impactCards[3].querySelector('strong').textContent = 'In sede';
        impactCards[3].querySelector('span').textContent = 'Intervento direttamente nella tua struttura';
      }
      const diffCards = document.querySelectorAll('#diferenciais .feature-card');
      if (diffCards[0]) {
        diffCards[0].querySelector('h3').textContent = 'Assicurazione responsabilità civile';
        diffCards[0].querySelector('p').textContent = 'Copertura e sicurezza durante l’intervento del team.';
      }
      if (diffCards[1]) {
        diffCards[1].querySelector('h3').textContent = 'Team scalabile';
        diffCards[1].querySelector('p').textContent = 'Team adattato al volume.';
      }
      if (diffCards[2]) {
        diffCards[2].querySelector('h3').textContent = 'Nessun conflitto commerciale';
        diffCards[2].querySelector('p').textContent = 'Nessuna competizione con il cliente finale.';
      }
      if (diffCards[3]) {
        diffCards[3].querySelector('h3').textContent = 'Standard professionale elevato';
        diffCards[3].querySelector('p').textContent = 'Postura compatibile con il contesto del cliente.';
      }
      setTextIfFound('#diferenciais .feature-proof-heading .section-kicker', 'Marchi già riparati');
      setTextIfFound('#diferenciais .feature-proof-heading .section-intro', 'Riferimenti di marchi già seguiti in diversi contesti di riparazione.');
      const brandSheet = document.querySelector('#diferenciais .brand-sheet');
      if (brandSheet) {
        const brandImg = brandSheet.querySelector('img');
        const brandCaption = brandSheet.querySelector('figcaption');
        if (brandImg) brandImg.alt = 'Marchi già riparati da Vittore';
        if (brandCaption) brandCaption.textContent = 'Marchi seguiti in diversi contesti di riparazione e alta domanda.';
      }

      setTextIfFound('#publico .section-kicker', 'Clienti');
      setTextIfFound('#publico h2', 'Dove creiamo valore');
      setTextIfFound('#publico .section-intro', 'Per strutture che hanno bisogno di risposta rapida senza perdere controllo.');
      const audienceCards = document.querySelectorAll('#publico .audience-card');
      if (audienceCards[0]) {
        audienceCards[0].querySelector('h3').textContent = 'Concessionarie';
        audienceCards[0].querySelector('p').textContent = 'Maggiore controllo sulle consegne.';
      }
      if (audienceCards[1]) {
        audienceCards[1].querySelector('h3').textContent = 'Carrozzerie';
        audienceCards[1].querySelector('p').textContent = 'Supporto nei momenti di sovraccarico.';
      }
      if (audienceCards[2]) {
        audienceCards[2].querySelector('h3').textContent = 'Rivenditori';
        audienceCards[2].querySelector('p').textContent = 'Veicoli pronti più velocemente.';
      }
      if (audienceCards[3]) {
        audienceCards[3].querySelector('h3').textContent = 'Noleggio auto';
        audienceCards[3].querySelector('p').textContent = 'Maggiore disponibilità della flotta.';
      }
      if (audienceCards[4]) {
        audienceCards[4].querySelector('h3').textContent = 'Assicurazioni';
        audienceCards[4].querySelector('p').textContent = 'Risposta tecnica in scenari di volume e alta domanda.';
      }

      setTextIfFound('#suporte .section-kicker', 'Supporto');
      setTextIfFound('#suporte h2', 'Restiamo al tuo fianco');
      setTextIfFound('#suporte .section-intro', 'Verifica, orientamento e nuovi interventi con risposta rapida.');
      const supportItems = document.querySelectorAll('#suporte .support-item');
      if (supportItems[0]) {
        supportItems[0].querySelector('strong').textContent = 'Post-vendita';
        supportItems[0].querySelector('small').textContent = 'Verifica e continuità.';
      }
      if (supportItems[1]) {
        supportItems[1].querySelector('strong').textContent = 'Supporto diretto';
        supportItems[1].querySelector('small').textContent = 'Risposte rapide quando serve.';
      }
      if (supportItems[2]) {
        supportItems[2].querySelector('strong').textContent = 'Nuovi interventi';
        supportItems[2].querySelector('small').textContent = 'Valutazione e attivazione veloce.';
      }

      setTextIfFound('#onde-atuamos .section-kicker', 'Presenza');
      setTextIfFound('#onde-atuamos h2', 'Operatività internazionale, stesso standard');
      setTextIfFound('#onde-atuamos .section-intro', 'Stesso metodo. Stesso livello.');
      setTextIfFound('#onde-atuamos .global-presence-label', 'Paesi serviti da Vittore');
      const countryRibbon = document.querySelectorAll('#onde-atuamos .country-ribbon span');
      const countriesIt = ['Portogallo', 'Inghilterra', 'Italia', 'Germania', 'Francia', 'Spagna', 'Belgio', 'Svizzera', 'Grecia', 'Slovenia', 'Messico', 'Brasile'];
      countryRibbon.forEach((item, index) => {
        if (countriesIt[index]) item.textContent = countriesIt[index];
      });
      const mapDots = document.querySelectorAll('#onde-atuamos .map-dot');
      const mapDotsIt = ['Canada', 'USA', 'Messico', 'Brasile', 'Portogallo', 'Spagna', 'Francia', 'Germania', 'Italia', 'Sudafrica'];
      mapDots.forEach((item, index) => {
        if (mapDotsIt[index]) item.textContent = mapDotsIt[index];
      });
      const presenceMap = document.querySelector('#onde-atuamos .presence-map');
      if (presenceMap) presenceMap.setAttribute('aria-label', 'Mappa di operatività internazionale');

      setTextIfFound('.faq-section .section-kicker', 'FAQ');
      setTextIfFound('.faq-section h2', 'Domande frequenti');
      const faqCards = document.querySelectorAll('.faq-section .faq-card');
      if (faqCards[0]) {
        faqCards[0].querySelector('h3').textContent = 'Il PDR sostituisce sempre la carrozzeria?';
        faqCards[0].querySelector('p').textContent = 'No. Dipende dal danno. La valutazione è tecnica.';
      }
      if (faqCards[1]) {
        faqCards[1].querySelector('h3').textContent = 'Qual è il vantaggio?';
        faqCards[1].querySelector('p').textContent = 'Meno fermo, più produttività.';
      }
      if (faqCards[2]) {
        faqCards[2].querySelector('h3').textContent = 'Lavorate solo sulla grandine?';
        faqCards[2].querySelector('p').textContent = 'No. Interveniamo su ammaccature semplici e complesse, con volumi bassi o alti, sempre per aziende e partner professionali.';
      }
      if (faqCards[3]) {
        faqCards[3].querySelector('h3').textContent = 'Entrate in contatto con il cliente finale?';
        faqCards[3].querySelector('p').textContent = 'No. Operiamo come supporto interno.';
      }

      setTextIfFound('#trabalhe-conosco .section-kicker', 'Carriere');
      setTextIfFound('#trabalhe-conosco h2', 'Lavora con Vittore');
      setTextIfFound('#trabalhe-conosco .section-intro', 'Cerchiamo tecnici con esperienza, disciplina e professionalità.');
      const careersCards = document.querySelectorAll('#trabalhe-conosco .careers-card');
      if (careersCards[0]) {
        careersCards[0].querySelector('h3').textContent = 'Valorizziamo';
        careersCards[0].querySelector('p').textContent = 'Competenza, qualità e responsabilità.';
      }
      if (careersCards[1]) {
        careersCards[1].querySelector('h3').textContent = 'Candidati ora';
        careersCards[1].querySelector('p').textContent = 'Presenta il tuo profilo per opportunità attuali o future.';
      }
      document.querySelectorAll('#trabalhe-conosco .btn.btn-secondary').forEach((button) => {
        button.textContent = 'Candidati ora';
      });

      setTextIfFound('#contato .section-kicker', 'Contatto');
      setTextIfFound('#contato h2', 'Hai bisogno di sbloccare la tua operatività?');
      setTextIfFound('#contato .section-intro', 'Descrivi la situazione. Valutiamo e rispondiamo rapidamente.');
      setTextIfFound('#contato .contact-priority-note strong', 'Primo contatto');
      setTextIfFound('#contato .contact-priority-note span', 'Nome, azienda, volume e contesto bastano per iniziare.');
      setTextIfFound('#contato .priority-form-kicker', 'Contatto rapido');
      setTextIfFound('#contato .priority-form-head h3', 'Descrivi la situazione');
      setTextIfFound('#contato .priority-form-head p', 'Valutiamo e rispondiamo rapidamente.');
      const quickPoints = document.querySelectorAll('#contato .contact-quick-points span');
      if (quickPoints[0]) quickPoints[0].textContent = 'Nome';
      if (quickPoints[1]) quickPoints[1].textContent = 'Azienda';
      if (quickPoints[2]) quickPoints[2].textContent = 'Volume';
      if (quickPoints[3]) quickPoints[3].textContent = 'Contesto';
      document.querySelectorAll('#contato .btn.btn-secondary').forEach((button) => {
        if (/whatsapp/i.test(button.textContent || '')) button.textContent = 'Contattaci su WhatsApp';
      });
      setTextIfFound('#contato .contact-note', 'Parla con il team per rinforzo tecnico o nuovi progetti.');

      setTextIfFound('#pdr .section-kicker', 'Cos’è il PDR');
      setTextIfFound('#pdr h2', 'Riparazione delle ammaccature senza verniciatura.');
      setTextIfFound('#pdr .section-intro', 'Meno interventi, meno tempo senza auto e più conservazione del veicolo.');
      const pdrCards = document.querySelectorAll('#pdr .pdr-compare-card');
      if (pdrCards[0]) {
        pdrCards[0].querySelector('h3').textContent = 'PDR';
        const items = pdrCards[0].querySelectorAll('li');
        if (items[0]) items[0].textContent = 'Meno interventi';
      if (items[1]) items[1].textContent = 'Meno tempo senza auto';
        if (items[2]) items[2].textContent = 'Più conservazione del veicolo';
        if (items[3]) items[3].textContent = 'Più produttività';
      }
      if (pdrCards[1]) {
        pdrCards[1].querySelector('h3').textContent = 'Nella pratica';
        const items = pdrCards[1].querySelectorAll('li');
        if (items[0]) items[0].textContent = 'Meno verniciatura quando non serve';
        if (items[1]) items[1].textContent = 'Meno passaggi nel processo';
        if (items[2]) items[2].textContent = 'Riconsegna più veloce';
        if (items[3]) items[3].textContent = 'Più fluidità nel lavoro';
      }
      const comparisonCards = document.querySelectorAll('#pdr .comparison-card');
      if (comparisonCards[0]) {
        const tag = comparisonCards[0].querySelector('.comparison-tag');
        const img = comparisonCards[0].querySelector('img');
        const strong = comparisonCards[0].querySelector('strong');
        const text = comparisonCards[0].querySelector('p');
        if (tag) tag.textContent = 'Danneggiato';
        if (img) img.alt = 'Area danneggiata prima della correzione con PDR';
        if (strong) strong.textContent = 'Area danneggiata';
        if (text) text.textContent = 'Lettura visiva della deformazione prima della correzione.';
      }
      if (comparisonCards[1]) {
        const tag = comparisonCards[1].querySelector('.comparison-tag');
        const img = comparisonCards[1].querySelector('img');
        const strong = comparisonCards[1].querySelector('strong');
        const text = comparisonCards[1].querySelector('p');
        if (tag) tag.textContent = 'Recuperato';
        if (img) img.alt = 'Area recuperata dopo la correzione con PDR';
        if (strong) strong.textContent = 'Area recuperata';
        if (text) text.textContent = 'Confronto visivo tra il danno e il ripristino della forma originale.';
      }
      const criteriaCards = document.querySelectorAll('#pdr .criteria-card');
      if (criteriaCards[0]) {
        criteriaCards[0].querySelector('h3').textContent = 'Meno passaggi';
        criteriaCards[0].querySelector('p').textContent = 'Quando il danno lo consente, il processo diventa più leggero e più diretto.';
      }
      if (criteriaCards[1]) {
        criteriaCards[1].querySelector('h3').textContent = 'Più rapidità';
        criteriaCards[1].querySelector('p').textContent = 'Meno tempo senza auto significa più fluidità nella riconsegna.';
      }
      if (criteriaCards[2]) {
        criteriaCards[2].querySelector('h3').textContent = 'Più conservazione';
        criteriaCards[2].querySelector('p').textContent = 'Preservare il pezzo originale aiuta a proteggere il valore e ridurre l’intervento.';
      }

      setTextIfFound('#governanca .section-kicker', 'Governance');
      setTextIfFound('#governanca h2', 'Struttura pensata per crescere');
      setTextIfFound('#governanca .section-intro', 'Struttura per crescere con standard e coerenza.');
      setTextIfFound('#governanca .governance-purpose .governance-label', 'Obiettivo');
      setTextIfFound('#governanca .governance-statement', 'Rendere la riparazione più efficiente e meno invasiva.');
      setTextIfFound('#governanca .governance-values .governance-label', 'Valori');
      const governanceValues = document.querySelectorAll('#governanca .governance-values-grid span');
      if (governanceValues[0]) governanceValues[0].textContent = 'Persone al centro';
      if (governanceValues[1]) governanceValues[1].textContent = 'Rispetto per il tecnico';
      if (governanceValues[2]) governanceValues[2].textContent = 'Fiducia del cliente';
      if (governanceValues[3]) governanceValues[3].textContent = 'Professionalità';
      if (governanceValues[4]) governanceValues[4].textContent = 'Rispetto delle regole';
      if (governanceValues[5]) governanceValues[5].remove();
      setTextIfFound('#governanca .governance-assurance > .governance-label', 'Responsabilità e gestione del rischio');
      const governanceCards = document.querySelectorAll('#governanca .governance-assurance-card');
      if (governanceCards[0]) {
        governanceCards[0].querySelector('.governance-assurance-tag').textContent = 'Responsabilità sociale';
        governanceCards[0].querySelector('h3').textContent = 'Meno vernice significa meno passaggi, meno residui e un processo più leggero.';
        governanceCards[0].querySelector('p').textContent = 'Quando il danno lo consente, Vittore riduce verniciatura, preparazione e residui legati al processo tradizionale.';
      }
      if (governanceCards[1]) {
        governanceCards[1].querySelector('.governance-assurance-tag').textContent = 'Gestione del rischio';
        governanceCards[1].querySelector('h3').textContent = 'Copertura per dare tranquillità al partner.';
        governanceCards[1].querySelector('p').textContent = 'Vittore opera con assicurazione di responsabilità civile ogni volta che il team interviene.';
      }
      const governanceTop = document.querySelectorAll('#governanca .governance-top span');
      if (governanceTop[1]) governanceTop[1].textContent = 'Compliance e legale';
      const governanceColumns = document.querySelectorAll('#governanca .governance-column');
      if (governanceColumns[0]) {
        governanceColumns[0].querySelector('h3').textContent = 'Direzione commerciale';
        const li = governanceColumns[0].querySelectorAll('li');
        if (li[0]) li[0].textContent = 'Marketing';
        if (li[1]) li[1].textContent = 'Vendite';
        if (li[2]) li[2].textContent = 'Consulenza tecnica';
        if (li[3]) li[3].textContent = 'Prospezione e conversione';
        if (li[4]) li[4].textContent = 'Post-vendita';
      }
      if (governanceColumns[1]) {
        governanceColumns[1].querySelector('h3').textContent = 'Direzione tecnica';
        const li = governanceColumns[1].querySelectorAll('li');
        if (li[0]) li[0].textContent = 'Controllo qualità';
        if (li[1]) li[1].textContent = 'Laboratorio tecnico';
        if (li[2]) li[2].textContent = 'Formazione e training';
        if (li[3]) li[3].textContent = 'Omologazione';
        if (li[4]) li[4].textContent = 'Unità mobili e progetti personalizzati';
      }
      if (governanceColumns[2]) {
        governanceColumns[2].querySelector('h3').textContent = 'Servizi condivisi';
        const li = governanceColumns[2].querySelectorAll('li');
        if (li[0]) li[0].textContent = 'Persone e cultura';
        if (li[1]) li[1].textContent = 'Finanza';
        if (li[2]) li[2].textContent = 'Amministrazione';
        if (li[3]) li[3].textContent = 'Regolarizzazione e integrazione';
        if (li[4]) li[4].textContent = 'Servizi al tecnico';
      }
      setTextIfFound('.footer-brandline-copy', 'Meno vernice. Meno tempo senza auto. Più produttività.');
      const utilityItems = document.querySelectorAll('.utility-item');
      if (utilityItems[0]) {
        utilityItems[0].querySelector('strong').textContent = 'WhatsApp diretto';
        utilityItems[0].querySelector('small').textContent = 'Contatta il team subito.';
      }
      if (utilityItems[1]) {
        utilityItems[1].querySelector('strong').textContent = 'Accedi all’intranet';
        utilityItems[1].querySelector('small').textContent = 'MGOLD e monitoraggio del lavoro.';
      }
      if (utilityItems[2]) {
        utilityItems[2].querySelector('strong').textContent = 'Supporto al cliente';
        utilityItems[2].querySelector('small').textContent = 'Orientamenti e supporto operativo.';
      }
      if (utilityItems[3]) {
        utilityItems[3].querySelector('strong').textContent = 'Post-vendita';
        utilityItems[3].querySelector('small').textContent = 'Continuità del progetto e supporto.';
      }
      setTextIfFound('.footer-title', document.querySelector('.footer-title')?.textContent || '');
      const footerTitles = document.querySelectorAll('.footer-title');
      if (footerTitles[0]) footerTitles[0].textContent = 'Mappa del sito';
      if (footerTitles[1]) footerTitles[1].textContent = 'Contatto';
      if (footerTitles[2]) footerTitles[2].textContent = 'Istituzionale';
      if (footerTitles[3]) footerTitles[3].textContent = 'Portogallo';
      const footerMapLinks = document.querySelectorAll('.footer-column nav .footer-links a, .footer-column[aria-label="Mapa do site"] .footer-links a');
      const footerLinks = document.querySelectorAll('.footer-columns .footer-column:first-child .footer-links a');
      const mapTexts = ['Scopri il PDR', 'Come lavoriamo', 'Team', 'Flusso', 'Clienti', 'Presenza', 'Carriere', 'Governance'];
      footerLinks.forEach((link, index) => {
        if (mapTexts[index]) link.textContent = mapTexts[index];
      });
      const contactColumnLinks = document.querySelectorAll('.footer-column-contact .footer-links a');
      if (contactColumnLinks[0]) contactColumnLinks[0].textContent = 'WhatsApp commerciale';
          if (contactColumnLinks[1]) contactColumnLinks[1].textContent = 'contact@vittorepdr.com';
      if (contactColumnLinks[2]) contactColumnLinks[2].textContent = 'Parla con un esperto';
      if (contactColumnLinks[3]) contactColumnLinks[3].textContent = 'Accedi all’intranet';
      const institutionalLinks = document.querySelectorAll('.footer-columns .footer-column:nth-child(3) .footer-links a');
      if (institutionalLinks[0]) institutionalLinks[0].textContent = 'Vantaggi';
      if (institutionalLinks[1]) institutionalLinks[1].textContent = 'Supporto al cliente';
      if (institutionalLinks[2]) institutionalLinks[2].textContent = 'Lavora con noi';
      const officeStrong = document.querySelector('.footer-office strong');
      const officeText = document.querySelector('.footer-office p');
      // The Italian page already ships the full administrative-office block in HTML.
      // Avoid re-writing it here, which can duplicate or inject the long text in the wrong node.
      const footerBottom = document.querySelectorAll('.footer-bottom p');
      if (footerBottom[1]) footerBottom[1].textContent = 'Canali istituzionali pronti a ricevere i link ufficiali del marchio.';
    } else if (currentLang === 'en') {
      setNavText({
        pdr: 'PDR',
        modelo: 'How we work',
        time: 'Team',
        fluxo: 'Flow',
        publico: 'Clients',
        diferenciais: 'Advantages',
        suporte: 'Support',
        presenca: 'Presence',
        carreiras: 'Careers',
        governanca: 'Governance',
        contato: 'Contact'
      });

      setTextIfFound('.hero .eyebrow, .hero-copy .eyebrow, .hero .section-kicker, .hero-copy .section-kicker, .hero-kicker', 'SPECIALIZED PDR TEAM');
      setTextIfFound('.hero h1, .hero-copy h1', 'Concrete solutions, even where others can’t reach.');
      setTextIfFound('.hero .lead, .hero-copy .lead', 'PDR specialists work inside your structure to handle hail and dents, speed up deadlines, and maintain quality standards.');

      const heroProof = document.querySelectorAll('.hero-proof span');
      if (heroProof[0]) heroProof[0].textContent = 'Less paint';
      if (heroProof[1]) heroProof[1].textContent = 'Less downtime';
      if (heroProof[2]) heroProof[2].textContent = 'More productivity';

      document.querySelectorAll('[data-open-contact-modal]').forEach((button) => {
        if (button.textContent?.trim().length) {
          button.textContent = 'Talk to a specialist';
        }
      });

      document.querySelectorAll('a[href="#pdr"], a[href="#o-que-e-pdr"]').forEach((link) => {
        if (link.textContent?.trim().length) {
          link.textContent = 'Understand PDR';
        }
      });

      setTextIfFound('#desafio .section-kicker', 'Pain points');
      setTextIfFound('#desafio h2', 'When your operation starts to slow down');
      const problemCards = document.querySelectorAll('#desafio .feature-card');
      if (problemCards[0]) {
        problemCards[0].querySelector('h3').textContent = 'Backlog building up';
        problemCards[0].querySelector('p').textContent = 'More vehicles waiting, more pressure on your team.';
      }
      if (problemCards[1]) {
        problemCards[1].querySelector('h3').textContent = 'Missed deadlines';
        problemCards[1].querySelector('p').textContent = 'Loss of pace, customer frustration, rework.';
      }
      if (problemCards[2]) {
        problemCards[2].querySelector('h3').textContent = 'Lack of skilled technicians';
        problemCards[2].querySelector('p').textContent = 'More jobs going to paint unnecessarily.';
      }
      if (problemCards[3]) {
        problemCards[3].querySelector('h3').textContent = 'Post-hail peaks';
        problemCards[3].querySelector('p').textContent = 'High demand requires fast, structured response.';
      }

      setTextIfFound('#como .section-kicker', 'How we work');
      setTextIfFound('#como h2', 'How we work');
      setTextIfFound('#como .section-intro', 'Four steps to work with method, pace, and punctuality.');
      const timelineSteps = document.querySelectorAll('#como .timeline-step');
      if (timelineSteps[0]) {
        timelineSteps[0].querySelector('h3').textContent = 'Assessment';
        timelineSteps[0].querySelector('p').textContent = 'We analyze volume, deadlines, and damage.';
      }
      if (timelineSteps[1]) {
        timelineSteps[1].querySelector('h3').textContent = 'Deployment';
        timelineSteps[1].querySelector('p').textContent = 'We scale the team based on your needs.';
      }
      if (timelineSteps[2]) {
        timelineSteps[2].querySelector('h3').textContent = 'Execution';
        timelineSteps[2].querySelector('p').textContent = 'Technical work with speed, control, and quality.';
      }
      if (timelineSteps[3]) {
        timelineSteps[3].querySelector('h3').textContent = 'Delivery';
        timelineSteps[3].querySelector('p').textContent = 'Final check and on-time return.';
      }
      setTextIfFound('#como .timeline-support p', 'We are not a body shop. We are an extension of your production capacity.');
      const trustTags = document.querySelectorAll('#como .trust-tags span');
      if (trustTags[0]) trustTags[0].textContent = 'Team scaled to your demand';
      if (trustTags[1]) trustTags[1].textContent = 'No competition with your end customer';
      if (trustTags[2]) trustTags[2].textContent = 'Certified technicians';
      if (trustTags[3]) trustTags[3].textContent = 'On-site operation';

      setTextIfFound('#time .section-kicker', 'Team');
      setTextIfFound('#time h2', 'A team built to deliver');
      setTextIfFound('#time .section-intro', 'Technical criteria, professional presence, and attention to results.');
      const proofPoints = document.querySelectorAll('#time .proof-point');
      if (proofPoints[0]) {
        proofPoints[0].querySelector('strong').textContent = 'Certified technicians';
        proofPoints[0].querySelector('span').textContent = 'Selected for skill and professionalism.';
      }
      if (proofPoints[1]) {
        proofPoints[1].querySelector('strong').textContent = 'Active supervision';
        proofPoints[1].querySelector('span').textContent = 'On-site control and quick adjustments.';
      }
      if (proofPoints[2]) {
        proofPoints[2].querySelector('strong').textContent = 'Professional image';
        proofPoints[2].querySelector('span').textContent = 'Clean, organized, and respectful of your environment.';
      }
      if (proofPoints[3]) {
        proofPoints[3].querySelector('strong').textContent = 'Tools and system';
        proofPoints[3].querySelector('span').textContent = 'Tracking, reporting, and workflow control.';
      }
      const teamMedia = document.querySelector('#time .proof-media img');
      const teamCaption = document.querySelector('#time .proof-caption');
      if (teamMedia) teamMedia.alt = 'Technical team prepared for specialized PDR work';
      if (teamCaption) teamCaption.textContent = 'A team prepared to execute and maintain standards in demanding environments.';
      const teamCards = document.querySelectorAll('#time .team-card');
      if (teamCards[0]) {
        teamCards[0].querySelector('h3').textContent = 'More repairs';
        teamCards[0].querySelector('p').textContent = 'Less paint when avoidable.';
      }
      if (teamCards[1]) {
        teamCards[1].querySelector('h3').textContent = 'Faster turnaround';
        teamCards[1].querySelector('p').textContent = 'Fewer steps, smoother workflow.';
      }
      if (teamCards[2]) {
        teamCards[2].querySelector('h3').textContent = 'Less rework';
        teamCards[2].querySelector('p').textContent = 'Better decisions from the start.';
      }
      if (teamCards[3]) {
        teamCards[3].querySelector('h3').textContent = 'Speed with consistency';
        teamCards[3].querySelector('p').textContent = 'Fast, without losing quality.';
      }

      setTextIfFound('#diferenciais .section-kicker', 'Advantages');
      setTextIfFound('#diferenciais h2', 'Advantages and indicators to decide with confidence.');
      setTextIfFound('#diferenciais .section-intro', 'Technical team, scale, and clear criteria to respond when demand rises.');
      const impactCards = document.querySelectorAll('#diferenciais .impact-card');
      if (impactCards[0]) impactCards[0].querySelector('span').textContent = 'years of experience';
      if (impactCards[1]) impactCards[1].querySelector('span').textContent = 'vehicles repaired';
      if (impactCards[2]) impactCards[2].querySelector('span').textContent = 'technicians available';
      if (impactCards[3]) {
        impactCards[3].querySelector('strong').textContent = 'On-site';
        impactCards[3].querySelector('span').textContent = 'Support inside your operation';
      }
      const diffCards = document.querySelectorAll('#diferenciais .feature-card');
      if (diffCards[0]) {
        diffCards[0].querySelector('h3').textContent = 'Liability insurance';
        diffCards[0].querySelector('p').textContent = 'Coverage and safety during team intervention.';
      }
      if (diffCards[1]) {
        diffCards[1].querySelector('h3').textContent = 'Scalable team';
        diffCards[1].querySelector('p').textContent = 'Team scaled to your demand.';
      }
      if (diffCards[2]) {
        diffCards[2].querySelector('h3').textContent = 'No commercial conflict';
        diffCards[2].querySelector('p').textContent = 'No competition with your end customer.';
      }
      if (diffCards[3]) {
        diffCards[3].querySelector('h3').textContent = 'Professional standards';
        diffCards[3].querySelector('p').textContent = 'Professional standards aligned with your environment.';
      }
      setTextIfFound('#diferenciais .feature-proof-heading .section-kicker', 'Brands already repaired');
      setTextIfFound('#diferenciais .feature-proof-heading .section-intro', 'Brand references from different repair contexts.');
      const brandSheet = document.querySelector('#diferenciais .brand-sheet');
      if (brandSheet) {
        const brandImg = brandSheet.querySelector('img');
        const brandCaption = brandSheet.querySelector('figcaption');
        if (brandImg) brandImg.alt = 'Brands already repaired by Vittore';
        if (brandCaption) brandCaption.textContent = 'Brands served in different repair and high-demand contexts.';
      }

      setTextIfFound('#publico .section-kicker', 'Clients');
      setTextIfFound('#publico h2', 'Where we create value');
      setTextIfFound('#publico .section-intro', 'For structures that need fast response without losing control.');
      const audienceCards = document.querySelectorAll('#publico .audience-card');
      if (audienceCards[0]) {
        audienceCards[0].querySelector('h3').textContent = 'Dealerships';
        audienceCards[0].querySelector('p').textContent = 'Better control over delivery timelines.';
      }
      if (audienceCards[1]) {
        audienceCards[1].querySelector('h3').textContent = 'Body shops';
        audienceCards[1].querySelector('p').textContent = 'Support during overload.';
      }
      if (audienceCards[2]) {
        audienceCards[2].querySelector('h3').textContent = 'Resellers';
        audienceCards[2].querySelector('p').textContent = 'Faster turnaround to sales.';
      }
      if (audienceCards[3]) {
        audienceCards[3].querySelector('h3').textContent = 'Rent-a-car';
        audienceCards[3].querySelector('p').textContent = 'Higher fleet availability.';
      }
      if (audienceCards[4]) {
        audienceCards[4].querySelector('h3').textContent = 'Insurance companies';
        audienceCards[4].querySelector('p').textContent = 'Technical response in high-volume scenarios.';
      }

      setTextIfFound('#suporte .section-kicker', 'Support');
      setTextIfFound('#suporte h2', 'We stay after delivery');
      setTextIfFound('#suporte .section-intro', 'Follow-up, guidance, and new requests with fast response.');
      const supportItems = document.querySelectorAll('#suporte .support-item');
      if (supportItems[0]) {
        supportItems[0].querySelector('strong').textContent = 'After-sales';
        supportItems[0].querySelector('small').textContent = 'Follow-up and alignment.';
      }
      if (supportItems[1]) {
        supportItems[1].querySelector('strong').textContent = 'Direct support';
        supportItems[1].querySelector('small').textContent = 'Fast response when needed.';
      }
      if (supportItems[2]) {
        supportItems[2].querySelector('strong').textContent = 'New requests';
        supportItems[2].querySelector('small').textContent = 'Quick evaluation and deployment.';
      }

      setTextIfFound('#onde-atuamos .section-kicker', 'Presence');
      setTextIfFound('#onde-atuamos h2', 'International operations, same standard');
      setTextIfFound('#onde-atuamos .section-intro', 'Same method. Same level.');
      setTextIfFound('#onde-atuamos .global-presence-label', 'Countries served by Vittore');
      const countryRibbon = document.querySelectorAll('#onde-atuamos .country-ribbon span');
      const countriesEn = ['Portugal', 'England', 'Italy', 'Germany', 'France', 'Spain', 'Belgium', 'Switzerland', 'Greece', 'Slovenia', 'Mexico', 'Brazil'];
      countryRibbon.forEach((item, index) => {
        if (countriesEn[index]) item.textContent = countriesEn[index];
      });
      const mapDots = document.querySelectorAll('#onde-atuamos .map-dot');
      const mapDotsEn = ['Canada', 'USA', 'Mexico', 'Brazil', 'Portugal', 'Spain', 'France', 'Germany', 'Italy', 'South Africa'];
      mapDots.forEach((item, index) => {
        if (mapDotsEn[index]) item.textContent = mapDotsEn[index];
      });
      const presenceMap = document.querySelector('#onde-atuamos .presence-map');
      if (presenceMap) presenceMap.setAttribute('aria-label', 'International operations map');

      setTextIfFound('.faq-section .section-kicker', 'FAQ');
      setTextIfFound('.faq-section h2', 'Frequently asked questions');
      const faqCards = document.querySelectorAll('.faq-section .faq-card');
      if (faqCards[0]) {
        faqCards[0].querySelector('h3').textContent = 'Does PDR replace traditional body repair?';
        faqCards[0].querySelector('p').textContent = 'Not always. It depends on the damage. Evaluation is technical.';
      }
      if (faqCards[1]) {
        faqCards[1].querySelector('h3').textContent = 'What’s the benefit?';
        faqCards[1].querySelector('p').textContent = 'Less downtime and higher productivity.';
      }
      if (faqCards[2]) {
        faqCards[2].querySelector('h3').textContent = 'Do you only handle hail damage?';
        faqCards[2].querySelector('p').textContent = 'No. We work with simple and complex dents, in low- and high-volume scenarios, always for companies and professional partners.';
      }
      if (faqCards[3]) {
        faqCards[3].querySelector('h3').textContent = 'Do you interact with the end customer?';
        faqCards[3].querySelector('p').textContent = 'No. We work as an internal extension of your operation.';
      }

      setTextIfFound('#trabalhe-conosco .section-kicker', 'Careers');
      setTextIfFound('#trabalhe-conosco h2', 'Work with Vittore');
      setTextIfFound('#trabalhe-conosco .section-intro', 'We look for technicians with experience, discipline, and professionalism.');
      const careersCards = document.querySelectorAll('#trabalhe-conosco .careers-card');
      if (careersCards[0]) {
        careersCards[0].querySelector('h3').textContent = 'We value';
        careersCards[0].querySelector('p').textContent = 'Skill, quality, and responsibility.';
      }
      if (careersCards[1]) {
        careersCards[1].querySelector('h3').textContent = 'Apply now';
        careersCards[1].querySelector('p').textContent = 'Present your profile for current or future opportunities.';
      }
      document.querySelectorAll('#trabalhe-conosco .btn.btn-secondary').forEach((button) => {
        button.textContent = 'Apply now';
      });

      setTextIfFound('#contato .section-kicker', 'Contact');
      setTextIfFound('#contato h2', 'Need to unlock your operation?');
      setTextIfFound('#contato .section-intro', 'Describe your scenario. We evaluate and respond quickly.');
      setTextIfFound('#contato .contact-priority-note strong', 'First contact');
      setTextIfFound('#contato .contact-priority-note span', 'Name, company, volume, and context are enough to start.');
      setTextIfFound('#contato .priority-form-kicker', 'Quick contact');
      setTextIfFound('#contato .priority-form-head h3', 'Describe your scenario');
      setTextIfFound('#contato .priority-form-head p', 'We evaluate and respond quickly.');
      const quickPoints = document.querySelectorAll('#contato .contact-quick-points span');
      if (quickPoints[0]) quickPoints[0].textContent = 'Name';
      if (quickPoints[1]) quickPoints[1].textContent = 'Company';
      if (quickPoints[2]) quickPoints[2].textContent = 'Volume';
      if (quickPoints[3]) quickPoints[3].textContent = 'Context';
      document.querySelectorAll('#contato .btn.btn-secondary').forEach((button) => {
        if (/whatsapp/i.test(button.textContent || '')) button.textContent = 'Message us on WhatsApp';
      });
      setTextIfFound('#contato .contact-note', 'Talk to the team for technical support or new projects.');

      setTextIfFound('#pdr .section-kicker', 'What is PDR');
      setTextIfFound('#pdr h2', 'Paintless Dent Repair.');
      setTextIfFound('#pdr .section-intro', 'Fewer steps, less downtime, and more preservation of the original panel.');
      const pdrCards = document.querySelectorAll('#pdr .pdr-compare-card');
      if (pdrCards[0]) {
        pdrCards[0].querySelector('h3').textContent = 'PDR';
        const items = pdrCards[0].querySelectorAll('li');
        if (items[0]) items[0].textContent = 'Fewer steps';
        if (items[1]) items[1].textContent = 'Less downtime';
        if (items[2]) items[2].textContent = 'Preserves the original panel';
        if (items[3]) items[3].textContent = 'Improves productivity';
      }
      if (pdrCards[1]) {
        pdrCards[1].querySelector('h3').textContent = 'In practice';
        const items = pdrCards[1].querySelectorAll('li');
        if (items[0]) items[0].textContent = 'Less paint when avoidable';
        if (items[1]) items[1].textContent = 'Fewer process steps';
        if (items[2]) items[2].textContent = 'Faster return';
        if (items[3]) items[3].textContent = 'Smoother workflow';
      }
      const comparisonCards = document.querySelectorAll('#pdr .comparison-card');
      if (comparisonCards[0]) {
        const tag = comparisonCards[0].querySelector('.comparison-tag');
        const img = comparisonCards[0].querySelector('img');
        const strong = comparisonCards[0].querySelector('strong');
        const text = comparisonCards[0].querySelector('p');
        if (tag) tag.textContent = 'Damaged';
        if (img) img.alt = 'Damaged area before PDR correction';
        if (strong) strong.textContent = 'Damaged area';
        if (text) text.textContent = 'Visual reading of the deformation before correction.';
      }
      if (comparisonCards[1]) {
        const tag = comparisonCards[1].querySelector('.comparison-tag');
        const img = comparisonCards[1].querySelector('img');
        const strong = comparisonCards[1].querySelector('strong');
        const text = comparisonCards[1].querySelector('p');
        if (tag) tag.textContent = 'Recovered';
        if (img) img.alt = 'Recovered area after PDR correction';
        if (strong) strong.textContent = 'Recovered area';
        if (text) text.textContent = 'Visual comparison between damage and restored original shape.';
      }
      const criteriaCards = document.querySelectorAll('#pdr .criteria-card');
      if (criteriaCards[0]) {
        criteriaCards[0].querySelector('h3').textContent = 'Fewer steps';
        criteriaCards[0].querySelector('p').textContent = 'When damage allows PDR, the process becomes lighter and more direct.';
      }
      if (criteriaCards[1]) {
        criteriaCards[1].querySelector('h3').textContent = 'More speed';
        criteriaCards[1].querySelector('p').textContent = 'Less downtime means smoother vehicle return.';
      }
      if (criteriaCards[2]) {
        criteriaCards[2].querySelector('h3').textContent = 'More preservation';
        criteriaCards[2].querySelector('p').textContent = 'Preserving the original panel helps protect value and reduce intervention.';
      }

      setTextIfFound('#governanca .section-kicker', 'Governance');
      setTextIfFound('#governanca h2', 'Built to scale with consistency');
      setTextIfFound('#governanca .section-intro', 'Built to grow with standard and consistency.');
      setTextIfFound('#governanca .governance-purpose .governance-label', 'Purpose');
      setTextIfFound('#governanca .governance-statement', 'Make automotive repair more efficient and less invasive.');
      setTextIfFound('#governanca .governance-values .governance-label', 'Values');
      const governanceValues = document.querySelectorAll('#governanca .governance-values-grid span');
      if (governanceValues[0]) governanceValues[0].textContent = 'People first';
      if (governanceValues[1]) governanceValues[1].textContent = 'Respect for technicians';
      if (governanceValues[2]) governanceValues[2].textContent = 'Client trust';
      if (governanceValues[3]) governanceValues[3].textContent = 'Professional conduct';
      if (governanceValues[4]) governanceValues[4].textContent = 'Compliance';
      if (governanceValues[5]) governanceValues[5].remove();
      setTextIfFound('#governanca .governance-assurance > .governance-label', 'Responsibility and risk management');
      const governanceCards = document.querySelectorAll('#governanca .governance-assurance-card');
      if (governanceCards[0]) {
        governanceCards[0].querySelector('.governance-assurance-tag').textContent = 'Social responsibility';
        governanceCards[0].querySelector('h3').textContent = 'Less paint means fewer steps, less waste, and a lighter process.';
        governanceCards[0].querySelector('p').textContent = 'When damage allows PDR, Vittore reduces paint, preparation, and waste linked to the traditional process.';
      }
      if (governanceCards[1]) {
        governanceCards[1].querySelector('.governance-assurance-tag').textContent = 'Risk management';
        governanceCards[1].querySelector('h3').textContent = 'Coverage that gives peace of mind to the partner.';
        governanceCards[1].querySelector('p').textContent = 'Vittore operates with liability insurance whenever the team is involved.';
      }
      const governanceTop = document.querySelectorAll('#governanca .governance-top span');
      if (governanceTop[1]) governanceTop[1].textContent = 'Compliance and legal';
      const governanceColumns = document.querySelectorAll('#governanca .governance-column');
      if (governanceColumns[0]) {
        governanceColumns[0].querySelector('h3').textContent = 'Commercial direction';
        const li = governanceColumns[0].querySelectorAll('li');
        if (li[0]) li[0].textContent = 'Marketing';
        if (li[1]) li[1].textContent = 'Sales';
        if (li[2]) li[2].textContent = 'Technical advisory';
        if (li[3]) li[3].textContent = 'Prospecting and conversion';
        if (li[4]) li[4].textContent = 'After-sales';
      }
      if (governanceColumns[1]) {
        governanceColumns[1].querySelector('h3').textContent = 'Technical direction';
        const li = governanceColumns[1].querySelectorAll('li');
        if (li[0]) li[0].textContent = 'Quality control';
        if (li[1]) li[1].textContent = 'Technical lab';
        if (li[2]) li[2].textContent = 'Training and development';
        if (li[3]) li[3].textContent = 'Certification';
        if (li[4]) li[4].textContent = 'Mobile units and custom projects';
      }
      if (governanceColumns[2]) {
        governanceColumns[2].querySelector('h3').textContent = 'Shared services';
        const li = governanceColumns[2].querySelectorAll('li');
        if (li[0]) li[0].textContent = 'People and culture';
        if (li[1]) li[1].textContent = 'Finance';
        if (li[2]) li[2].textContent = 'Administration';
        if (li[3]) li[3].textContent = 'Legalization and integration';
        if (li[4]) li[4].textContent = 'Technician services';
      }
      setTextIfFound('.footer-brandline-copy', 'Less paint. Less downtime. More productivity.');
      const utilityItems = document.querySelectorAll('.utility-item');
      if (utilityItems[0]) {
        utilityItems[0].querySelector('strong').textContent = 'Direct WhatsApp';
        utilityItems[0].querySelector('small').textContent = 'Reach the team immediately.';
      }
      if (utilityItems[1]) {
        utilityItems[1].querySelector('strong').textContent = 'Access intranet';
        utilityItems[1].querySelector('small').textContent = 'MGOLD and work tracking.';
      }
      if (utilityItems[2]) {
        utilityItems[2].querySelector('strong').textContent = 'Client support';
        utilityItems[2].querySelector('small').textContent = 'Guidance and operational support.';
      }
      if (utilityItems[3]) {
        utilityItems[3].querySelector('strong').textContent = 'After-sales';
        utilityItems[3].querySelector('small').textContent = 'Project continuity and support.';
      }
      const footerTitles = document.querySelectorAll('.footer-title');
      if (footerTitles[0]) footerTitles[0].textContent = 'Site map';
      if (footerTitles[1]) footerTitles[1].textContent = 'Contact';
      if (footerTitles[2]) footerTitles[2].textContent = 'Institutional';
      if (footerTitles[3]) footerTitles[3].textContent = 'Portugal';
      const footerLinks = document.querySelectorAll('.footer-columns .footer-column:first-child .footer-links a');
      const mapTexts = ['Understand PDR', 'How we work', 'Team', 'Flow', 'Clients', 'Presence', 'Careers', 'Governance'];
      footerLinks.forEach((link, index) => {
        if (mapTexts[index]) link.textContent = mapTexts[index];
      });
      const contactColumnLinks = document.querySelectorAll('.footer-column-contact .footer-links a');
      if (contactColumnLinks[0]) contactColumnLinks[0].textContent = 'Commercial WhatsApp';
          if (contactColumnLinks[1]) contactColumnLinks[1].textContent = 'contact@vittorepdr.com';
      if (contactColumnLinks[2]) contactColumnLinks[2].textContent = 'Talk to a specialist';
      if (contactColumnLinks[3]) contactColumnLinks[3].textContent = 'Access intranet';
      const institutionalLinks = document.querySelectorAll('.footer-columns .footer-column:nth-child(3) .footer-links a');
      if (institutionalLinks[0]) institutionalLinks[0].textContent = 'Advantages';
      if (institutionalLinks[1]) institutionalLinks[1].textContent = 'Client support';
      if (institutionalLinks[2]) institutionalLinks[2].textContent = 'Work with us';
      const officeStrong = document.querySelector('.footer-office strong');
      const officeText = document.querySelector('.footer-office p');
      // The English page already ships the full administrative-office block in HTML.
      // Avoid re-writing it here, which can duplicate or inject the long text in the wrong node.
      const footerBottom = document.querySelectorAll('.footer-bottom p');
      if (footerBottom[1]) footerBottom[1].textContent = 'Institutional channels ready to receive the brand’s official links.';
    }
  };

  applyLanguageBySelectors();
  setInterval(applyLanguageBySelectors, 600);

  const captionBySource = currentLang === 'it'
    ? [
    { match: /antes%20familia|antes familia/i, text: 'La tua auto riparata secondo i più alti standard di qualità.' },
        { match: /famila%20feliz|familia%20feliz|famila feliz|familia feliz/i, text: 'Più tranquillità per te.' },
        { match: /3826879935-preview|carro-em-reparo|operacao|reparo/i, text: 'Precisione in ogni dettaglio.' }
      ]
    : (currentLang === 'es'
      ? [
          { match: /antes%20familia|antes familia/i, text: 'Tu coche recuperado con nivel técnico.' },
          { match: /famila%20feliz|familia%20feliz|famila feliz|familia feliz/i, text: 'Más tranquilidad para ti.' },
          { match: /3826879935-preview|carro-em-reparo|operacao|reparo/i, text: 'Precisión en cada detalle.' }
        ]
    : (currentLang === 'fr'
      ? [
          { match: /antes%20familia|antes familia/i, text: 'Votre voiture récupérée avec niveau technique.' },
          { match: /famila%20feliz|familia%20feliz|famila feliz|familia feliz/i, text: 'Plus de sérénité pour vous.' },
          { match: /3826879935-preview|carro-em-reparo|operacao|reparo/i, text: 'Précision dans chaque détail.' }
        ]
    : (currentLang === 'de'
      ? [
          { match: /antes%20familia|antes familia/i, text: 'Ihr Fahrzeug mit technischem Standard instand gesetzt.' },
          { match: /famila%20feliz|familia%20feliz|famila feliz|familia feliz/i, text: 'Mehr Ruhe und Sicherheit für Sie.' },
          { match: /3826879935-preview|carro-em-reparo|operacao|reparo/i, text: 'Präzision in jedem Detail.' }
        ]
    : (currentLang === 'en'
      ? [
    { match: /antes%20familia|antes familia/i, text: 'Your vehicle repaired to the highest quality standards.' },
          { match: /famila%20feliz|familia%20feliz|famila feliz|familia feliz/i, text: 'More peace of mind for you.' },
          { match: /3826879935-preview|carro-em-reparo|operacao|reparo/i, text: 'Precision in every detail.' }
        ]
    : (currentLang === 'pt-pt'
      ? [
    { match: /antes%20familia|antes familia/i, text: 'O seu carro reparado com os mais altos padrões de qualidade.' },
          { match: /famila%20feliz|familia%20feliz|famila feliz|familia feliz/i, text: 'Mais tranquilidade para si.' },
          { match: /3826879935-preview|carro-em-reparo|operacao|reparo/i, text: 'Precisão em cada detalhe.' }
        ]
      : [
    { match: /antes%20familia|antes familia/i, text: 'Seu carro reparado com os mais altos padrões de qualidade.' },
        { match: /famila%20feliz|familia%20feliz|famila feliz|familia feliz/i, text: 'Mais tranquilidade para você.' },
        { match: /3826879935-preview|carro-em-reparo|operacao|reparo/i, text: 'Precisão em cada detalhe.' }
      ])))));

  const getCurrentHeroSource = () => {
    const mediaElements = Array.from(document.querySelectorAll(
      '.hero-media-panel video, .hero-media-panel img, .hero-media video, .hero-media img'
    ));

    for (const media of mediaElements) {
      const style = window.getComputedStyle(media);
      const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      if (!isVisible) continue;
      const src = media.currentSrc || media.getAttribute('src') || '';
      if (src) return src;
    }

    const fallbackMedia = document.querySelector('.hero-media-panel video, .hero-media-panel img, .hero-media video, .hero-media img');
    if (!fallbackMedia) return '';
    return fallbackMedia.currentSrc || fallbackMedia.getAttribute('src') || '';
  };

  const getCaptionForSource = (source) => {
    for (const item of captionBySource) {
      if (item.match.test(source)) return item.text;
    }
    if (currentLang === 'it') return 'Precisione in ogni dettaglio.';
    if (currentLang === 'es') return 'Precisión en cada detalle.';
    if (currentLang === 'fr') return 'Précision dans chaque détail.';
    if (currentLang === 'de') return 'Präzision in jedem Detail.';
    if (currentLang === 'en') return 'Precision in every detail.';
    if (currentLang === 'pt-pt') return 'Precisão em cada detalhe.';
    return 'Precisão em cada detalhe.';
  };

  const syncHeroCaption = () => {
    const caption = document.querySelector('.hero-media-caption');
    if (!caption) return;
    const source = getCurrentHeroSource();
    const nextText = getCaptionForSource(source);
    if (caption.textContent?.trim() !== nextText) {
      caption.textContent = nextText;
    }
  };

  syncHeroCaption();
  setInterval(syncHeroCaption, 300);

  const governanceSection = document.querySelector('#governanca, #governanca-section, .governance-section');
  const governanceValues = governanceSection?.querySelector('.governance-values');

  if (currentLang === 'it' || currentLang === 'en') {
    governanceSection?.querySelector('[data-origin-story="true"]')?.remove();
  }

  if (governanceSection && !governanceSection.querySelector('[data-origin-story="true"]')) {
    const originBlock = document.createElement('div');
    originBlock.className = 'governance-origin';
    originBlock.setAttribute('data-origin-story', 'true');
    originBlock.innerHTML = currentLang === 'it'
      ? `
        <span class="section-kicker">La nostra origine</span>
        <p>
          Ispirata all origine italiana della famiglia Bertuol, Vittore porta con sé una storia che attraversa le generazioni.
          Nel 1896, il bisnonno di Marcelo Bertuol lasciò Belluno, nel borgo di Lentiai, una regione semplice e segnata dalle
          difficoltà del suo tempo, per cercare opportunità in Brasile. Più di un secolo dopo, Marcelo torna in Italia per recuperare
          questa origine e trasformare questo lascito in un marchio riconosciuto nel segmento PDR.
        </p>
      `
      : (currentLang === 'es'
        ? `
        <span class="section-kicker">Nuestro origen</span>
        <p>
          Inspirada en el origen italiano de la familia Bertuol, Vittore lleva una historia que atraviesa generaciones.
          En 1912, el bisabuelo de Marcelo Bertuol dejó Belluno, en el pueblo de Lentiai, una región sencilla y marcada por
          las dificultades de su tiempo, para buscar oportunidades en Brasil. Décadas después, Marcelo vuelve a Italia para
          recuperar este origen y transformar este legado en una marca reconocida en el segmento PDR.
        </p>
      `
      : (currentLang === 'fr'
        ? `
        <span class="section-kicker">Notre origine</span>
        <p>
          Inspirée par l origine italienne de la famille Bertuol, Vittore porte une histoire qui traverse les générations.
          En 1912, l arrière-grand-père de Marcelo Bertuol quitta Belluno, dans le village de Lentiai, une région simple et marquée
          par les difficultés de son époque, pour chercher des opportunités au Brésil. Des décennies plus tard, Marcelo retourne
          en Italie pour retrouver cette origine et transformer cet héritage en une marque reconnue dans le segment PDR.
        </p>
      `
      : (currentLang === 'de'
        ? `
        <span class="section-kicker">Unsere Herkunft</span>
        <p>
          Inspiriert von den italienischen Wurzeln der Familie Bertuol trägt Vittore eine Geschichte, die Generationen verbindet.
          Im Jahr 1912 verließ Marcelo Bertuols Urgroßvater Belluno im Dorf Lentiai, eine einfache Region, geprägt von den
          Schwierigkeiten ihrer Zeit, um in Brasilien eine Chance zu suchen. Jahrzehnte später kehrte Marcelo nach Italien zurück,
          um diesen Ursprung wiederzufinden und dieses Vermächtnis in eine im PDR-Segment anerkannte Marke zu verwandeln.
        </p>
      `
      : (currentLang === 'en'
        ? `
        <span class="section-kicker">Our origin</span>
        <p>
          Inspired by the Italian roots of the Bertuol family, Vittore carries a story that crosses generations.
          In 1896, Marcelo Bertuol s great-grandfather left Belluno, in the village of Lentiai, a simple region marked by
          the hardships of its time, to seek opportunity in Brazil. More than a century later, Marcelo returned to Italy to recover
          that origin and transform this legacy into a brand recognized in the PDR segment.
        </p>
      `
      : (currentLang === 'pt-pt'
        ? `
        <span class="section-kicker">A nossa origem</span>
        <p>
          Inspirada na origem italiana da família Bertuol, Vittore carrega uma história que atravessa gerações. Em 1896,
          o bisavô de Marcelo Bertuol deixou Belluno, no povoado de Lentiai, uma região simples e marcada pelas dificuldades
          de seu tempo, para buscar oportunidade no Brasil. Mais de um século depois, Marcelo retorna à Itália para recuperar essa
          origem e transformar esse legado em uma marca reconhecida no segmento de PDR.
        </p>
      `
        : `
        <span class="section-kicker">Nossa origem</span>
        <p>
          Inspirada na origem italiana da família Bertuol, Vittore carrega uma história que atravessa gerações. Em 1896,
          o bisavô de Marcelo Bertuol deixou Belluno, no povoado de Lentiai, uma região simples e marcada pelas dificuldades
          de seu tempo, para buscar oportunidade no Brasil. Mais de um século depois, Marcelo retorna à Itália para recuperar essa
          origem e transformar esse legado em uma marca reconhecida no segmento de PDR.
        </p>
      `)))));

    if (governanceValues) {
      governanceValues.insertAdjacentElement('beforebegin', originBlock);
    } else {
      governanceSection.appendChild(originBlock);
    }
  }

  // The language switch is managed only by js/language-switch.js.

  const countryGroups = Array.from(document.querySelectorAll('.country-list, .presence-country-list, .presence-tags, .country-tags'));
  countryGroups.forEach((group) => {
    const alreadyHasSpain = /Espanha|España|Spain/i.test(group.textContent || '');
    const alreadyHasGermany = /Alemanha|Deutschland|Germany|Allemagne|Germania|Alemania/i.test(group.textContent || '');

    if (!alreadyHasSpain) {
      const item = document.createElement(group.children.length ? group.children[0].tagName : 'span');
      item.className = group.children[0]?.className || 'presence-tag';
      item.textContent = currentLang === 'it'
        ? '🇪🇸 Spagna'
        : (currentLang === 'es'
          ? '🇪🇸 España'
          : (currentLang === 'fr'
            ? '🇪🇸 Espagne'
            : (currentLang === 'de' ? '🇪🇸 Spanien' : '🇪🇸 Espanha')));
      group.appendChild(item);
    }

    if (!alreadyHasGermany) {
      const item = document.createElement(group.children.length ? group.children[0].tagName : 'span');
      item.className = group.children[0]?.className || 'presence-tag';
      item.textContent = currentLang === 'it'
        ? '🇩🇪 Germania'
        : (currentLang === 'es'
          ? '🇩🇪 Alemania'
          : (currentLang === 'fr'
            ? '🇩🇪 Allemagne'
            : (currentLang === 'de' ? '🇩🇪 Deutschland' : '🇩🇪 Alemanha')));
      group.appendChild(item);
    }
  });
});
