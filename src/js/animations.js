/**
 * Animations module — IntersectionObserver-based reveal on scroll.
 */
const Animations = (() => {
  let observer = null;

  function init() {
    const targets = document.querySelectorAll('[data-animate]');
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(el => observer.observe(el));
  }

  function destroy() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  return { init, destroy };
})();

export default Animations;
