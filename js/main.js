document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  const siteHeader = document.querySelector(".site-header");
  const siteNav = document.querySelector(".site-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  const closeMobileNav = () => {
    if (!siteHeader || !navToggle) return;
    siteHeader.classList.remove("is-nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle && siteHeader && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteHeader.classList.toggle("is-nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", event => {
      if (!mobileQuery.matches || !siteHeader.classList.contains("is-nav-open")) return;
      if (siteHeader.contains(event.target)) return;
      closeMobileNav();
    });

    window.addEventListener("resize", () => {
      if (!mobileQuery.matches) {
        closeMobileNav();
      }
    });
  }

  links.forEach(link => {
    link.addEventListener("click", event => {
      if (link.hasAttribute("data-open-contact-modal")) {
        return;
      }

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      if (mobileQuery.matches) {
        closeMobileNav();
      }
    });
  });
});
