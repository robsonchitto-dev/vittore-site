document.addEventListener('DOMContentLoaded', () => {
  const assetVersion = '20260511-1';
  const existing = document.querySelector('.language-switches');
  if (existing) existing.remove();

  const params = new URLSearchParams(window.location.search);
  const langParam = (params.get('lang') || '').toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const pageLang = (document.documentElement.lang || '').toLowerCase();

  let currentLang = 'pt-pt';
  if (path.endsWith('/brasil.html') || path.endsWith('brasil.html')) {
    currentLang = 'pt';
  } else if (path.endsWith('/english.html') || path.endsWith('english.html')) {
    currentLang = 'en';
  } else if (path.endsWith('/portugal.html') || path.endsWith('portugal.html')) {
    currentLang = 'pt-pt';
  } else if (path === '/' || path.endsWith('/index.html') || path.endsWith('index.html')) {
    currentLang = 'pt-pt';
  } else if (pageLang.startsWith('en') || langParam === 'en') {
    currentLang = 'en';
  } else if (pageLang === 'pt-pt' || langParam === 'pt-pt' || langParam === 'ptpt') {
    currentLang = 'pt-pt';
  } else if (pageLang === 'pt-br' || pageLang === 'pt' || langParam === 'pt' || langParam === 'pt-br') {
    currentLang = 'pt';
  } else if (pageLang === 'it' || langParam === 'it') {
    currentLang = 'it';
  }

  const links = [
    { href: 'italiano.html', flag: 'fi-it', label: 'IT', active: currentLang === 'it' },
    { href: './', flag: 'fi-pt', label: 'PT', active: currentLang === 'pt-pt' },
    { href: 'english.html', flag: 'fi-gb', label: 'EN', active: currentLang === 'en' }
  ];

  const wrapper = document.createElement('div');
  wrapper.className = 'language-switches';

  links.forEach((item) => {
    const link = document.createElement('a');
    const targetUrl = new URL(item.href, window.location.href);
    targetUrl.searchParams.set('v', assetVersion);
    link.className = `language-switch${item.active ? ' is-active' : ''}`;
    link.href = window.location.protocol === 'file:'
      ? `${item.href}${targetUrl.search}${targetUrl.hash}`
      : `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
    link.innerHTML = `<span class="language-switch-flag fi ${item.flag}" aria-hidden="true"></span><span class="language-switch-label">${item.label}</span>`;
    link.setAttribute('aria-label', item.label);
    wrapper.appendChild(link);
  });

  const slot = document.querySelector('.language-switch-slot');
  if (slot) {
    slot.replaceChildren(wrapper);
  } else {
    document.body.appendChild(wrapper);
  }
});
