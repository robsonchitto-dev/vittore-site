document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.toLowerCase();
  const pageLang = (document.documentElement.lang || '').toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const langParam = (params.get('lang') || '').toLowerCase();
  const currentLang = path.endsWith('italiano.html') || langParam === 'it' || pageLang === 'it'
    ? 'it'
    : (path.endsWith('english.html') || langParam === 'en' || pageLang === 'en'
      ? 'en'
      : ((path.endsWith('portugal.html') || langParam === 'pt-pt' || langParam === 'ptpt' || pageLang === 'pt-pt')
        ? 'pt-pt'
        : 'pt'));

  const presenceMapText = currentLang === 'it'
    ? {
        alt: 'Mappa globale della presenza internazionale di Vittore',
        caption: 'Presenza internazionale con mobilitazione adattata per supportare il partner con sicurezza e tranquillità.'
      }
    : (currentLang === 'en'
      ? {
          alt: 'Vittore global international presence map',
          caption: 'International presence with mobilization adapted to support the partner with safety and peace of mind.'
        }
      : (currentLang === 'pt-pt'
        ? {
            alt: 'Mapa global da presença internacional da Vittore',
            caption: 'Presença internacional com mobilização adaptada para apoiar o parceiro com segurança e tranquilidade.'
          }
      : {
          alt: 'Mapa global de atuacao internacional Vittore',
          caption: 'Presenca internacional com mobilizacao adaptada para apoiar o parceiro com seguranca e tranquilidade.'
        }));

  const mountWhenVisible = (element, render) => {
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      render();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        render();
      });
    }, { rootMargin: "240px 0px" });

    observer.observe(element);
  };

  const presenceSection = document.querySelector("#onde-atuamos .presence-map");
  if (presenceSection) {
    mountWhenVisible(presenceSection, () => {
      const src = "assets/images/mapa-global.jpg";
      presenceSection.classList.add("presence-map--with-image");
      presenceSection.innerHTML = `
        <figure class="section-visual-card">
          <div class="map-visual">
            <img src="${src}" alt="${presenceMapText.alt}" loading="lazy" decoding="async">
          </div>
          <figcaption>${presenceMapText.caption}</figcaption>
        </figure>
      `;
    });
  }

  const authoritySection = document.querySelector("#autoridade .brand-cloud");
  if (authoritySection) {
    mountWhenVisible(authoritySection, () => {
      const src = "assets/images/logo-marcas.jpg";
      const authorityShell = document.querySelector("#autoridade .authority-shell");
      if (authorityShell) {
        authorityShell.classList.add("authority-shell--with-sheet");
      }

      const figure = document.createElement("figure");
      figure.className = "brand-sheet";
      figure.innerHTML = `
        <img src="${src}" alt="Painel visual com marcas automotivas de referencia" loading="lazy" decoding="async">
        <figcaption>Apresentacao e postura compativeis com operacoes em ambientes de alta exigencia.</figcaption>
      `;

      authoritySection.parentNode.insertBefore(figure, authoritySection);
      authoritySection.classList.add("brand-cloud--supporting");
    });
  }
});
