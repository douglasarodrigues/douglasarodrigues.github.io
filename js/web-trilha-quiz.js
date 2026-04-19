/**
 * Check-in minimalista da trilha Web — uma questão por vez, feedback imediato.
 */
(() => {
  "use strict";
  const STORAGE_PREFIX = "webTrilhaCheckin_";
  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }
  function mount(root) {
    const chapterId = root.getAttribute("data-chapter");
    if (!chapterId || typeof WEB_TRILHA_QUESTIONS === "undefined") return;
    const items = WEB_TRILHA_QUESTIONS[chapterId];
    if (!items || !items.length) return;
    let idx = 0;
    let correctCount = 0;
    const meta = document.createElement("p");
    meta.className = "web-trilha-quiz-meta";
    meta.setAttribute("aria-live", "polite");
    const stem = document.createElement("p");
    stem.className = "web-trilha-quiz-stem";
    stem.id = "web-trilha-stem-" + chapterId;
    const opts = document.createElement("div");
    opts.className = "web-trilha-quiz-options";
    opts.setAttribute("role", "group");
    opts.setAttribute("aria-labelledby", stem.id);
    const feedback = document.createElement("div");
    feedback.className = "web-trilha-quiz-feedback";
    feedback.hidden = true;
    const btnNext = document.createElement("button");
    btnNext.type = "button";
    btnNext.className = "study-btn study-btn--primary";
    btnNext.textContent = "Próxima questão";
    btnNext.hidden = true;
    const btnFinish = document.createElement("button");
    btnFinish.type = "button";
    btnFinish.className = "study-btn";
    btnFinish.textContent = "Ver resultado";
    btnFinish.hidden = true;
    function showQuestion() {
      feedback.hidden = true;
      feedback.innerHTML = "";
      btnNext.hidden = true;
      btnFinish.hidden = true;
      opts.innerHTML = "";
      const q = items[idx];
      stem.textContent = q.stem;
      meta.textContent = "Questão " + (idx + 1) + " de " + items.length;
      q.options.forEach((label, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "web-trilha-opt";
        b.textContent = label;
        b.addEventListener("click", () => {
          const ok = i === q.correctIndex;
          if (ok) correctCount++;
          opts.querySelectorAll("button").forEach((x) => { x.disabled = true; });
          feedback.hidden = false;
          feedback.innerHTML = "<p><strong>" + (ok ? "Correto." : "Incorreto.") + "</strong> " + escapeHtml(q.explanation) + "</p>";
          if (idx < items.length - 1) btnNext.hidden = false;
          else btnFinish.hidden = false;
        });
        opts.appendChild(b);
      });
    }
    btnNext.addEventListener("click", () => { idx++; showQuestion(); });
    btnFinish.addEventListener("click", () => {
      const total = items.length;
      const pct = Math.round((100 * correctCount) / total);
      feedback.hidden = false;
      feedback.innerHTML = "<p><strong>Resultado:</strong> " + correctCount + "/" + total + " (" + pct + "%)</p>";
      opts.innerHTML = "";
      stem.textContent = "";
      meta.textContent = "";
      btnNext.hidden = true;
      btnFinish.hidden = true;
      try {
        localStorage.setItem(STORAGE_PREFIX + chapterId, JSON.stringify({ correct: correctCount, total: total, at: new Date().toISOString() }));
      } catch (e) {}
    });
    root.appendChild(meta);
    root.appendChild(stem);
    root.appendChild(opts);
    root.appendChild(feedback);
    const nav = document.createElement("div");
    nav.className = "web-trilha-quiz-nav";
    nav.appendChild(btnNext);
    nav.appendChild(btnFinish);
    root.appendChild(nav);
    showQuestion();
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".web-trilha-quiz-root").forEach(mount);
  });
})();
