/*
 * SCRIPT.JS - Interatividade da LinkTree Profissional
 * Vanilla JS (ES2020+) - Sem dependências externas
 * Estrutura: CONFIG > Utilidades > Partículas > Cursor (glow + ponteiro)
 * > Clipboard > Init (DOMContentLoaded)
 * ------------------------------------------------------------- */

(() => {
  "use strict";

  /* --- CONFIG ------------------------------------------------- */

  const CONFIG = {
    particles: {
      countDesktop: 20,
      countMobile: 8,
      mobileBreakpoint: 768,
      minRadius: 1,
      maxRadius: 3,
      minSpeed: 0.1,
      maxSpeed: 0.3,
      minOpacity: 0.1,
      maxOpacity: 0.3,
      color: "94, 114, 217", // #5e72d9 - primary
    },
    resize: {
      debounceMs: 250,
    },
    email: {
      address: "douglasr@gmx.us",
      toastDurationMs: 2000,
      toastMessage: "E-mail copiado! Aguardo seu contato.",
    },
    emailSelector: '[data-action="copy-email"]',
  };

  /* --- UTILIDADES --------------------------------------------- */

  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  const prefersReducedMotion = () => reducedMotionQuery.matches;

  const randomBetween = (min, max) => Math.random() * (max - min) + min;

  const debounce = (fn, ms) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  };

  /* --- PARTICULAS (Canvas 2D) --------------------------------- */

  const initParticles = () => {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animFrameId = null;
    let width = 0;
    let height = 0;

    const getCount = () =>
      window.innerWidth < CONFIG.particles.mobileBreakpoint
        ? CONFIG.particles.countMobile
        : CONFIG.particles.countDesktop;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomBetween(
        CONFIG.particles.minSpeed,
        CONFIG.particles.maxSpeed,
      );
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: randomBetween(
          CONFIG.particles.minRadius,
          CONFIG.particles.maxRadius,
        ),
        opacity: randomBetween(
          CONFIG.particles.minOpacity,
          CONFIG.particles.maxOpacity,
        ),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    };

    const populateParticles = () => {
      const count = getCount();
      particles = Array.from({ length: count }, createParticle);
    };

    const wrapAround = (p) => {
      if (p.x < -p.r) p.x = width + p.r;
      else if (p.x > width + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = height + p.r;
      else if (p.y > height + p.r) p.y = -p.r;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        wrapAround(p);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.particles.color}, ${p.opacity})`;
        ctx.fill();
      }
      animFrameId = requestAnimationFrame(draw);
    };

    const handleResize = debounce(() => {
      setCanvasSize();
      // Reajustar quantidade de partículas
      const target = getCount();
      while (particles.length < target) particles.push(createParticle());
      while (particles.length > target) particles.pop();
      // Reposicionar partículas fora dos limites
      for (const p of particles) {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      }
    }, CONFIG.resize.debounceMs);

    // Iniciar
    setCanvasSize();
    populateParticles();
    draw();
    window.addEventListener("resize", handleResize);

    // Retornar cleanup
    return () => {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  };

  /* --- CURSOR GLOW -------------------------------------------- */

  /** Glow + ponteiro custom (UX: microinteração sutil; hover destaca alvos clicáveis). */
  const INTERACTIVE_CURSOR =
    'a[href], button, [role="button"], [role="link"], [role="tab"], input:not([type="hidden"]), textarea, select, label, summary, .link-card, .skill-badge, .i18n-option, [data-action], .lab-card, .lab-tab, .lab-copy-btn, .lab-search-input, .cert-card';

  const initCursorGlow = () => {
    const glow = document.querySelector(".cursor-glow");
    const pointer = document.querySelector(".cursor-pointer");
    if (!glow && !pointer) return null;

    let rafPending = false;
    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = () => {
      if (glow) {
        glow.style.left = mouseX + "px";
        glow.style.top = mouseY + "px";
      }
      if (pointer) {
        pointer.style.left = mouseX + "px";
        pointer.style.top = mouseY + "px";
      }
      rafPending = false;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (glow) glow.style.opacity = "1";
      if (pointer) {
        pointer.style.opacity = "1";
        const hit = e.target.closest(INTERACTIVE_CURSOR);
        pointer.classList.toggle("cursor-pointer--hover", Boolean(hit));
      }

      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updatePosition);
      }
    };

    const onMouseLeave = () => {
      if (glow) glow.style.opacity = "0";
      if (pointer) pointer.style.opacity = "0";
    };

    document.body.classList.add("has-custom-cursor");

    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  };

  /* --- CLIPBOARD (Email) -------------------------------------- */

  const initClipboard = () => {
    const emailCard = document.querySelector(CONFIG.emailSelector);
    if (!emailCard) return null;

    let toastTimeout = null;

    const showToast = (message) => {
      // Remover toast anterior se existir
      const existing = document.querySelector(".copy-toast");
      if (existing) {
        existing.remove();
        clearTimeout(toastTimeout);
      }

      const toast = document.createElement("div");
      toast.className = "copy-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      toast.textContent = message;

      // Estilização via CSS custom properties
      Object.assign(toast.style, {
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%) translateY(10px)",
        background: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
        color: "var(--color-success)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-3) var(--space-6)",
        fontSize: "var(--font-size-small)",
        fontFamily: "var(--font-body)",
        zIndex: "9999",
        opacity: "0",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: "none",
      });

      document.body.appendChild(toast);

      // Trigger reflow para a transição funcionar
      // Trigger reflow para a transição funcionar
      toast.offsetHeight;

      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";

      toastTimeout = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(10px)";
        toast.addEventListener("transitionend", () => toast.remove(), {
          once: true,
        });
      }, CONFIG.email.toastDurationMs);
    };

    const handleClick = (e) => {
      e.preventDefault();
      const toastMsg =
        (window.__i18n && window.__i18n.t("idx.email.toast")) ||
        CONFIG.email.toastMessage;
      navigator.clipboard
        .writeText(CONFIG.email.address)
        .then(() => {
          showToast(toastMsg);
        })
        .catch(() => {
          showToast("Email: " + CONFIG.email.address);
        });
    };

    emailCard.addEventListener("click", handleClick);

    return () => {
      emailCard.removeEventListener("click", handleClick);
      clearTimeout(toastTimeout);
      const leftover = document.querySelector(".copy-toast");
      if (leftover) leftover.remove();
    };
  };

  /* --- INIT --------------------------------------------------- */

  const cleanups = [];

  const init = () => {
    let cleanupParticles = null;
    let cleanupGlow = null;

    const startAnimations = () => {
      if (!prefersReducedMotion() && !cleanupParticles) {
        cleanupParticles = initParticles();
        if (cleanupParticles) cleanups.push(cleanupParticles);
      }
    };

    const stopAnimations = () => {
      if (cleanupParticles) {
        cleanupParticles();
        cleanupParticles = null;
      }
    };

    // React to reduced-motion changes
    reducedMotionQuery.addEventListener("change", (e) => {
      if (e.matches) stopAnimations();
      else startAnimations();
    });

    startAnimations();

    // Cursor (glow + ponteiro) — primeiro mousemove; touch remove e restaura cursor nativo
    const initGlowOnFirstMove = () => {
      if (!prefersReducedMotion()) {
        cleanupGlow = initCursorGlow();
        if (cleanupGlow) cleanups.push(cleanupGlow);
      }
      document.removeEventListener("mousemove", initGlowOnFirstMove);
    };
    document.addEventListener("mousemove", initGlowOnFirstMove);

    // Desabilitar glow se touch detectado após mousemove
    document.addEventListener(
      "touchstart",
      () => {
        if (cleanupGlow) {
          cleanupGlow();
          cleanupGlow = null;
        }
        document.removeEventListener("mousemove", initGlowOnFirstMove);
      },
      { once: true },
    );

    // Clipboard - sempre ativo
    const cleanupClipboard = initClipboard();
    if (cleanupClipboard) cleanups.push(cleanupClipboard);
  };

  document.addEventListener("DOMContentLoaded", init);

  // Cleanup ao sair da página
  window.addEventListener("beforeunload", () => {
    for (const cleanup of cleanups) cleanup();
  });
})();
