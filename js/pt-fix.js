document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const lang = (params.get('lang') || '').toLowerCase();
  const pageLang = (document.documentElement.lang || '').toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const isBrazil = (
    path.endsWith('brasil.html') ||
    pageLang === 'pt-br' ||
    pageLang === 'pt'
  );

  if (!isBrazil) return;

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  setText('.hero .eyebrow', 'REFORÇO TÉCNICO PDR PARA OPERAÇÕES AUTOMOTIVAS');
  const heroTitle = document.querySelector('.hero h1, .hero-copy h1');
  if (heroTitle) heroTitle.textContent = 'Reduza fila e proteja o prazo da sua operação com especialistas em PDR.';

  const heroLeads = document.querySelectorAll('.hero .lead, .hero-copy .lead');
  if (heroLeads[0]) {
    heroLeads[0].textContent = 'A Vittore atua ao lado de oficinas, concessionárias, revendas, rent-a-car e seguradoras para absorver amassados, granizo e picos de volume, aliviar a fila e manter o padrão de entrega sem inflar a estrutura fixa.';
  }
  if (heroLeads[1]) {
    heroLeads[1].remove();
  }

  document.querySelectorAll('[data-open-contact-modal]').forEach((button) => {
    const text = button.textContent?.trim();
    if (!text) return;
    if (/apoio|support|supporto|appui|refuerzo|reinforzo/i.test(text)) {
      button.textContent = 'Falar com especialista';
    }
  });
});
