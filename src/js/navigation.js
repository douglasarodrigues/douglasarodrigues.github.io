/**
 * Navigation module — smooth scroll, mobile menu, active link tracking.
 */
const Navigation = (() => {
  const selectors = {
    nav: '[data-nav]',
    links: '[data-nav-link]',
    toggle: '[data-nav-toggle]',
    list: '[data-nav-list]'
  };

  let elements = {};

  function cacheElements() {
    elements.nav = document.querySelector(selectors.nav);
    elements.links = document.querySelectorAll(selectors.links);
    elements.toggle = document.querySelector(selectors.toggle);
    elements.list = document.querySelector(selectors.list);
  }

  function handleToggle() {
    if (!elements.toggle || !elements.list) return;

    elements.toggle.addEventListener('click', () => {
      const isOpen = elements.list.classList.toggle('is-open');
      elements.toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function handleSmoothScroll() {
    elements.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href.startsWith('#')) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth' });

        if (elements.list) {
          elements.list.classList.remove('is-open');
          elements.toggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function handleActiveLink() {
    const sections = document.querySelectorAll('[data-section]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          elements.links.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  function init() {
    cacheElements();
    handleToggle();
    handleSmoothScroll();
    handleActiveLink();
  }

  function destroy() {
    elements = {};
  }

  return { init, destroy };
})();

export default Navigation;
