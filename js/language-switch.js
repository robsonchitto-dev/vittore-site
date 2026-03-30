document.addEventListener('DOMContentLoaded', () => {
  const existing = document.querySelector('.language-switches');
  if (existing) existing.remove();

  const params = new URLSearchParams(window.location.search);
  const langParam = (params.get('lang') || '').toLowerCase();
  const path = window.location.pathname.toLowerCase();

  let currentLang = 'pt';
  if (path.endsWith('/italiano.html') || path.endsWith('italiano.html') || langParam === 'it') currentLang = 'it';
  if (path.endsWith('/english.html') || path.endsWith('english.html') || langParam === 'en') currentLang = 'en';
  if (path.endsWith('/portugal.html') || path.endsWith('portugal.html') || langParam === 'pt-pt' || langParam === 'ptpt') currentLang = 'pt-pt';

  const links = [
    { href: 'italiano.html', flag: 'fi-it', label: 'IT', active: currentLang === 'it' },
    { href: 'portugal.html', flag: 'fi-pt', label: 'PT', active: currentLang === 'pt-pt' },
    { href: 'english.html', flag: 'fi-gb', label: 'EN', active: currentLang === 'en' }
  ];

  const wrapper = document.createElement('div');
  wrapper.className = 'language-switches';

  links.forEach((item) => {
    const link = document.createElement('a');
    link.className = `language-switch${item.active ? ' is-active' : ''}`;
    link.href = item.href;
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
