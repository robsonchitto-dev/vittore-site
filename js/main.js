document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  const siteHeader = document.querySelector(".site-header");

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
    });
  });
});
