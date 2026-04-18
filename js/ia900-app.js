/**
 * Simulado AI-900: sorteio a partir do banco, resultado, histórico local.
 */
(function () {
  "use strict";

  var QUESTIONS_PER_EXAM = 45;
  var HISTORY_KEY = "douglas-portfolio-ia900-history";
  var HISTORY_MAX = 50;
  var SESSION_KEY = "douglas-portfolio-ia900-session";

  function getBank() {
    var b =
      typeof window !== "undefined" && window.IA900_QUESTION_BANK
        ? window.IA900_QUESTION_BANK
        : [];
    return Array.isArray(b) ? b : [];
  }

  function shuffle(arr, rng) {
    var a = arr.slice();
    var random = rng || Math.random;
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function pickQuestions(bank, n, rng) {
    if (bank.length <= n) return shuffle(bank, rng);
    return shuffle(bank, rng).slice(0, n);
  }

  function loadHistory() {
    try {
      var raw = window.localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(entries) {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
    } catch (e) {}
  }

  function loadSession() {
    try {
      var raw = window.sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveSession(data) {
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function clearSession() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }

  function t(key, fallback) {
    if (window.__i18n && typeof window.__i18n.t === "function") {
      var v = window.__i18n.t(key);
      if (v) return v;
    }
    return fallback;
  }

  function init() {
    var bank = getBank();
    var root = document.getElementById("ia900-quiz-root");
    if (!root || !bank.length) {
      if (root) {
        var warn = document.createElement("p");
        warn.className = "study-hub-lead";
        warn.textContent =
          "Banco de questões indisponível. Verifique se ia900-questions.js foi carregado.";
        root.insertBefore(warn, root.firstChild);
      }
      return;
    }

    var elStart = document.getElementById("ia900-quiz-start");
    var elActive = document.getElementById("ia900-quiz-active");
    var elResults = document.getElementById("ia900-quiz-results");
    var elMeta = document.getElementById("ia900-quiz-meta");
    var btnStart = document.getElementById("ia900-btn-start");
    var btnPrev = document.getElementById("ia900-btn-prev");
    var btnNext = document.getElementById("ia900-btn-next");
    var btnFinish = document.getElementById("ia900-btn-finish");
    var btnRetry = document.getElementById("ia900-btn-retry");
    var stemEl = document.getElementById("ia900-question-stem");
    var optsEl = document.getElementById("ia900-options");
    var progEl = document.getElementById("ia900-quiz-progress");
    var scoreEl = document.getElementById("ia900-result-score");
    var detailEl = document.getElementById("ia900-result-detail");
    var wrongEl = document.getElementById("ia900-wrong-list");
    var historyBody = document.getElementById("ia900-history-body");
    var btnClear = document.getElementById("ia900-btn-clear-history");

    var state = {
      order: [],
      answers: {},
      index: 0,
      startedAt: null,
    };

    function currentQ() {
      return state.order[state.index];
    }

    function persistSession() {
      saveSession({
        order: state.order.map(function (x) {
          return x.id;
        }),
        answers: state.answers,
        startedAt: state.startedAt,
      });
    }

    function renderQuestion() {
      var q = currentQ();
      if (!q) return;
      stemEl.textContent =
        (state.index + 1).toString() +
        "/" +
        state.order.length +
        " — " +
        plainStem(q.stem);
      optsEl.innerHTML = "";
      var gname = "ia900-q-" + state.index;
      q.options.forEach(function (opt, i) {
        var id = gname + "-" + i;
        var label = document.createElement("label");
        label.className = "study-quiz-option";
        label.setAttribute("for", id);
        var inp = document.createElement("input");
        inp.type = "radio";
        inp.name = gname;
        inp.id = id;
        inp.value = String(i);
        if (state.answers[state.index] === i) inp.checked = true;
        inp.addEventListener("change", function () {
          state.answers[state.index] = i;
          persistSession();
        });
        var span = document.createElement("span");
        span.textContent = opt;
        label.appendChild(inp);
        label.appendChild(span);
        optsEl.appendChild(label);
      });

      btnPrev.disabled = state.index === 0;
      var last = state.index === state.order.length - 1;
      btnNext.hidden = last;
      btnFinish.hidden = !last;
      if (elMeta) {
        elMeta.hidden = false;
        progEl.textContent =
          t("study.ia900.meta.progress", "Progresso") +
          ": " +
          (state.index + 1) +
          " / " +
          state.order.length;
      }
    }

    function showStart() {
      elStart.hidden = false;
      elActive.hidden = true;
      elResults.hidden = true;
      if (elMeta) elMeta.hidden = true;
    }

    function showActive() {
      elStart.hidden = true;
      elActive.hidden = false;
      elResults.hidden = true;
      renderQuestion();
    }

    function showResults() {
      var correct = 0;
      var wrong = [];
      state.order.forEach(function (q, idx) {
        var sel = state.answers[idx];
        if (sel === undefined || sel === null) {
          wrong.push({ q: q, chosen: null });
          return;
        }
        if (sel === q.correctIndex) correct++;
        else wrong.push({ q: q, chosen: sel });
      });

      var pct = state.order.length
        ? Math.round((correct / state.order.length) * 1000) / 10
        : 0;

      elStart.hidden = true;
      elActive.hidden = true;
      elResults.hidden = false;
      if (elMeta) elMeta.hidden = true;

      scoreEl.textContent =
        t("study.ia900.result.scoreLabel", "Nota") +
        ": " +
        pct +
        "% (" +
        correct +
        "/" +
        state.order.length +
        ")";

      detailEl.textContent =
        t(
          "study.ia900.result.detail",
          "Revise as questões incorretas abaixo. As explicações referem-se à alternativa correta.",
        );

      wrongEl.innerHTML = "";
      if (!wrong.length) {
        var p = document.createElement("p");
        p.className = "study-hub-lead";
        p.textContent = t(
          "study.ia900.result.allCorrect",
          "Nenhum erro — excelente revisão.",
        );
        wrongEl.appendChild(p);
      } else {
        wrong.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "study-quiz-wrong-item";
          var pq = document.createElement("p");
          pq.className = "study-quiz-wrong-q";
          var marked =
            item.chosen !== null && item.chosen !== undefined
              ? item.q.options[item.chosen]
              : "(" + t("study.ia900.result.omitted", "em branco") + ")";
          pq.innerHTML =
            "<strong>Q:</strong> " +
            stemForHtml(item.q.stem) +
            "<br><strong>" +
            t("study.ia900.result.youMarked", "Sua resposta") +
            ":</strong> " +
            escapeHtml(marked) +
            " &mdash; <strong>" +
            t("study.ia900.result.correctIs", "Correta") +
            ":</strong> " +
            escapeHtml(item.q.options[item.q.correctIndex]);
          var pe = document.createElement("p");
          pe.className = "study-quiz-wrong-expl";
          pe.textContent = item.q.explanation;
          div.appendChild(pq);
          div.appendChild(pe);
          wrongEl.appendChild(div);
        });
      }

      var entry = {
        finishedAt: Date.now(),
        startedAt: state.startedAt || Date.now(),
        scorePercent: pct,
        correct: correct,
        total: state.order.length,
        questionIds: state.order.map(function (q) {
          return q.id;
        }),
      };
      var hist = loadHistory();
      hist.unshift(entry);
      if (hist.length > HISTORY_MAX) hist = hist.slice(0, HISTORY_MAX);
      saveHistory(hist);
      renderHistory();
      clearSession();
      elResults.focus();
    }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function plainStem(s) {
    return String(s).replace(/\*\*(.+?)\*\*/g, "$1");
  }

  /** Escapa HTML e preserva quebras de linha do enunciado (cenário + pergunta). */
  function stemForHtml(s) {
    return escapeHtml(plainStem(s)).replace(/\n/g, "<br>");
  }

    function renderHistory() {
      if (!historyBody) return;
      historyBody.innerHTML = "";
      var hist = loadHistory();
      if (!hist.length) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = t("study.ia900.history.empty", "Nenhuma tentativa ainda.");
        tr.appendChild(td);
        historyBody.appendChild(tr);
        return;
      }
      hist.forEach(function (row) {
        var tr = document.createElement("tr");
        var d = new Date(row.finishedAt);
        var td1 = document.createElement("td");
        td1.textContent = d.toLocaleString();
        var td2 = document.createElement("td");
        td2.textContent = row.scorePercent + "%";
        var td3 = document.createElement("td");
        td3.textContent = row.correct + "/" + row.total;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        historyBody.appendChild(tr);
      });
    }

    function beginExam() {
      var rng = Math.random;
      state.order = pickQuestions(bank, QUESTIONS_PER_EXAM, rng);
      state.answers = {};
      state.index = 0;
      state.startedAt = Date.now();
      clearSession();
      showActive();
    }

    function resumeFromSession(sess) {
      if (!sess || !sess.order || !sess.order.length) return false;
      var byId = {};
      bank.forEach(function (q) {
        byId[q.id] = q;
      });
      var ord = [];
      for (var i = 0; i < sess.order.length; i++) {
        var qq = byId[sess.order[i]];
        if (qq) ord.push(qq);
      }
      if (ord.length !== sess.order.length) return false;
      state.order = ord;
      state.answers = sess.answers || {};
      state.startedAt = sess.startedAt || Date.now();
      state.index = 0;
      while (
        state.answers[state.index] !== undefined &&
        state.index < state.order.length - 1
      )
        state.index++;
      showActive();
      return true;
    }

    btnStart.addEventListener("click", beginExam);
    btnPrev.addEventListener("click", function () {
      if (state.index > 0) {
        state.index--;
        persistSession();
        renderQuestion();
      }
    });
    btnNext.addEventListener("click", function () {
      if (state.index < state.order.length - 1) {
        state.index++;
        persistSession();
        renderQuestion();
      }
    });
    btnFinish.addEventListener("click", showResults);
    btnRetry.addEventListener("click", function () {
      showStart();
    });

    if (btnClear) {
      btnClear.addEventListener("click", function () {
        if (
          window.confirm(
            t(
              "study.ia900.history.confirmClear",
              "Limpar todo o histórico de tentativas neste navegador?",
            ),
          )
        ) {
          saveHistory([]);
          renderHistory();
        }
      });
    }

    document.addEventListener("langchange", function () {
      if (!elActive.hidden) renderQuestion();
    });

    renderHistory();

    var sess = loadSession();
    if (
      sess &&
      sess.order &&
      sess.order.length &&
      window.location.hash !== "#novo" &&
      resumeFromSession(sess)
    ) {
      /* sessão retomada */
    } else {
      showStart();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
