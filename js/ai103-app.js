/**
 * AI-103 Study Engine
 * - Modo prova completa (mixed)
 * - Modo treino por dominio
 * - Revisao espacada D+1/D+3/D+7
 * - Prontidao objetiva para agendamento
 */
(function () {
  "use strict";

  var FULL_EXAM_SIZE = 35;
  var DOMAIN_EXAM_SIZE = 20;
  var HISTORY_KEY = "douglas-portfolio-ai103-history";
  var REVIEW_KEY = "douglas-portfolio-ai103-review";
  var HISTORY_MAX = 50;
  var SESSION_KEY = "douglas-portfolio-ai103-session";
  var REVIEW_STEPS_DAYS = [1, 3, 7];
  var READY_GLOBAL = 80;
  var READY_DOMAIN = 70;
  var READY_STREAK = 3;

  function getBank() {
    var b = typeof window !== "undefined" && window.AI103_QUESTION_BANK ? window.AI103_QUESTION_BANK : [];
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

  function loadJSON(storage, key, fallback) {
    try {
      var raw = storage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function saveJSON(storage, key, value) {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function loadHistory() {
    var v = loadJSON(window.localStorage, HISTORY_KEY, []);
    return Array.isArray(v) ? v : [];
  }

  function saveHistory(v) {
    saveJSON(window.localStorage, HISTORY_KEY, v);
  }

  function loadReview() {
    var v = loadJSON(window.localStorage, REVIEW_KEY, {});
    return v && typeof v === "object" ? v : {};
  }

  function saveReview(v) {
    saveJSON(window.localStorage, REVIEW_KEY, v);
  }

  function loadSession() {
    return loadJSON(window.sessionStorage, SESSION_KEY, null);
  }

  function saveSession(v) {
    saveJSON(window.sessionStorage, SESSION_KEY, v);
  }

  function clearSession() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  function renderReadiness(bank, history, el) {
    if (!el) return;
    var domains = {};
    bank.forEach(function (q) {
      domains[q.domain] = { total: 0, correct: 0 };
    });

    var lastThree = history.slice(0, 3);
    lastThree.forEach(function (attempt) {
      var byQuestion = attempt.byQuestion || [];
      byQuestion.forEach(function (row) {
        if (!domains[row.domain]) domains[row.domain] = { total: 0, correct: 0 };
        domains[row.domain].total++;
        if (row.correct) domains[row.domain].correct++;
      });
    });

    var html = [];
    Object.keys(domains).sort().forEach(function (domain) {
      var data = domains[domain];
      var pct = data.total ? Math.round((data.correct / data.total) * 100) : 0;
      html.push(
        '<div class="ai103-readiness-item">' +
          '<div class="ai103-readiness-label"><span>' + escapeHtml(domain) + "</span><strong>" + pct + "%</strong></div>" +
          '<div class="ai103-readiness-bar"><span style="width:' + pct + '%"></span></div>' +
        "</div>"
      );
    });
    el.innerHTML = html.join("");
  }

  function renderReviewList(bank, reviewState, target) {
    if (!target) return;
    var byId = {};
    bank.forEach(function (q) {
      byId[q.id] = q;
    });

    var now = Date.now();
    var due = Object.keys(reviewState).map(function (id) {
      return { id: id, data: reviewState[id] };
    }).filter(function (x) {
      return x.data && x.data.nextReviewAt && x.data.nextReviewAt <= now;
    });

    if (!due.length) {
      target.innerHTML = "<li>Nenhuma revisão pendente hoje. Faça um mini simulado para manter o ritmo.</li>";
      return;
    }

    due.sort(function (a, b) {
      return a.data.nextReviewAt - b.data.nextReviewAt;
    });

    target.innerHTML = due.slice(0, 10).map(function (row) {
      var q = byId[row.id];
      if (!q) return "";
      return "<li><strong>" + escapeHtml(q.domain) + ":</strong> " + escapeHtml(q.stem) + "</li>";
    }).join("");
  }

  function getDomains(bank) {
    var seen = {};
    var list = [];
    bank.forEach(function (q) {
      if (!seen[q.domain]) {
        seen[q.domain] = true;
        list.push(q.domain);
      }
    });
    list.sort();
    return list;
  }

  function init() {
    var bank = getBank();
    var root = document.getElementById("ai103-quiz-root");
    if (!root || !bank.length) return;

    var elStart = document.getElementById("ai103-quiz-start");
    var elActive = document.getElementById("ai103-quiz-active");
    var elResults = document.getElementById("ai103-quiz-results");
    var elMeta = document.getElementById("ai103-quiz-meta");
    var btnStart = document.getElementById("ai103-btn-start");
    var btnPrev = document.getElementById("ai103-btn-prev");
    var btnNext = document.getElementById("ai103-btn-next");
    var btnFinish = document.getElementById("ai103-btn-finish");
    var btnRetry = document.getElementById("ai103-btn-retry");
    var btnClear = document.getElementById("ai103-btn-clear-history");
    var modeSelect = document.getElementById("ai103-mode-select");
    var domainSelect = document.getElementById("ai103-domain-select");
    var stemEl = document.getElementById("ai103-question-stem");
    var optsEl = document.getElementById("ai103-options");
    var progEl = document.getElementById("ai103-quiz-progress");
    var scoreEl = document.getElementById("ai103-result-score");
    var detailEl = document.getElementById("ai103-result-detail");
    var wrongEl = document.getElementById("ai103-wrong-list");
    var historyBody = document.getElementById("ai103-history-body");
    var readinessEl = document.getElementById("ai103-readiness-list");
    var reviewEl = document.getElementById("ai103-review-list");
    var readyBadge = document.getElementById("ai103-ready-badge");

    var state = { order: [], answers: {}, index: 0, startedAt: null, mode: "full", domain: "all" };

    var domains = getDomains(bank);
    domains.forEach(function (d) {
      var opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      domainSelect.appendChild(opt);
    });

    function currentQ() {
      return state.order[state.index];
    }

    function persistSession() {
      saveSession({
        order: state.order.map(function (x) { return x.id; }),
        answers: state.answers,
        index: state.index,
        startedAt: state.startedAt,
        mode: state.mode,
        domain: state.domain
      });
    }

    function renderHistory() {
      if (!historyBody) return;
      historyBody.innerHTML = "";
      var hist = loadHistory();
      if (!hist.length) {
        historyBody.innerHTML = '<tr><td colspan="3">Nenhuma tentativa ainda.</td></tr>';
        return;
      }
      hist.forEach(function (row) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" + new Date(row.finishedAt).toLocaleString() + "</td>" +
          "<td>" + row.scorePercent + "%</td>" +
          "<td>" + row.correct + "/" + row.total + "</td>";
        historyBody.appendChild(tr);
      });
    }

    function computeReadinessSummary(history) {
      var lastThreeFull = history.filter(function (h) {
        return h.mode === "full";
      }).slice(0, READY_STREAK);
      var streakOk = lastThreeFull.length === READY_STREAK && lastThreeFull.every(function (x) {
        return x.scorePercent >= READY_GLOBAL;
      });
      return { streakOk: streakOk, count: lastThreeFull.length };
    }

    function renderDashboards() {
      var history = loadHistory();
      var review = loadReview();
      renderReadiness(bank, history, readinessEl);
      renderReviewList(bank, review, reviewEl);

      var summary = computeReadinessSummary(history);
      var domainsData = {};
      history.slice(0, 5).forEach(function (attempt) {
        (attempt.byQuestion || []).forEach(function (row) {
          if (!domainsData[row.domain]) domainsData[row.domain] = { total: 0, correct: 0 };
          domainsData[row.domain].total++;
          if (row.correct) domainsData[row.domain].correct++;
        });
      });
      var allDomainsOk = Object.keys(domainsData).every(function (d) {
        var info = domainsData[d];
        return info.total && (info.correct / info.total) * 100 >= READY_DOMAIN;
      });
      if (!readyBadge) return;
      if (summary.streakOk && allDomainsOk) {
        readyBadge.textContent = "Status: PRONTO PARA PROVA (3 simulados full >= 80% e dominios >= 70%).";
      } else {
        readyBadge.textContent = "Status: Em preparação. Meta: 3 simulados full >= 80% e todos os domínios >= 70%.";
      }
    }

    function renderQuestion() {
      var q = currentQ();
      if (!q) return;
      stemEl.textContent = (state.index + 1) + "/" + state.order.length + " - [" + q.domain + "] " + q.stem;
      optsEl.innerHTML = "";
      var gname = "ai103-q-" + state.index;
      q.options.forEach(function (opt, i) {
        var id = gname + "-" + i;
        var label = document.createElement("label");
        label.className = "study-quiz-option";
        label.setAttribute("for", id);
        label.innerHTML =
          '<input type="radio" name="' + gname + '" id="' + id + '" value="' + i + '">' +
          "<span>" + escapeHtml(opt) + "</span>";
        var inp = label.querySelector("input");
        if (state.answers[state.index] === i) inp.checked = true;
        inp.addEventListener("change", function () {
          state.answers[state.index] = i;
          persistSession();
        });
        optsEl.appendChild(label);
      });

      btnPrev.disabled = state.index === 0;
      var last = state.index === state.order.length - 1;
      btnNext.hidden = last;
      btnFinish.hidden = !last;
      if (elMeta) {
        elMeta.hidden = false;
        progEl.textContent = "Progresso: " + (state.index + 1) + " / " + state.order.length;
      }
    }

    function showStart() {
      elStart.hidden = false;
      elActive.hidden = true;
      elResults.hidden = true;
      if (elMeta) elMeta.hidden = true;
      renderDashboards();
    }

    function showActive() {
      elStart.hidden = true;
      elActive.hidden = false;
      elResults.hidden = true;
      renderQuestion();
    }

    function updateReviewFromResult(wrongRows) {
      var review = loadReview();
      var now = Date.now();

      wrongRows.forEach(function (row) {
        var existing = review[row.q.id] || { level: 0 };
        var level = Math.max(0, Math.min(REVIEW_STEPS_DAYS.length - 1, existing.level));
        var days = REVIEW_STEPS_DAYS[level];
        review[row.q.id] = {
          level: Math.min(level + 1, REVIEW_STEPS_DAYS.length - 1),
          domain: row.q.domain,
          nextReviewAt: now + days * 24 * 60 * 60 * 1000
        };
      });
      saveReview(review);
    }

    function showResults() {
      var correct = 0;
      var wrong = [];
      var byQuestion = [];
      state.order.forEach(function (q, idx) {
        var sel = state.answers[idx];
        var ok = sel === q.correctIndex;
        if (ok) correct++;
        if (!ok) wrong.push({ q: q, chosen: sel });
        byQuestion.push({ id: q.id, domain: q.domain, correct: ok });
      });

      var pct = state.order.length ? Math.round((correct / state.order.length) * 1000) / 10 : 0;

      elStart.hidden = true;
      elActive.hidden = true;
      elResults.hidden = false;
      if (elMeta) elMeta.hidden = true;

      scoreEl.textContent = "Nota: " + pct + "% (" + correct + "/" + state.order.length + ")";
      detailEl.textContent = pct >= READY_GLOBAL
        ? "Excelente. Continue com revisão espaçada dos erros antigos."
        : "Revise os erros abaixo e repita o simulado em 24h.";

      wrongEl.innerHTML = "";
      if (!wrong.length) {
        wrongEl.innerHTML = '<p class="study-hub-lead">Nenhum erro neste simulado.</p>';
      } else {
        wrong.forEach(function (item) {
          var marked = item.chosen !== undefined && item.chosen !== null ? item.q.options[item.chosen] : "(em branco)";
          var div = document.createElement("div");
          div.className = "study-quiz-wrong-item";
          div.innerHTML =
            '<p class="study-quiz-wrong-q"><strong>[' + escapeHtml(item.q.domain) + "]</strong> " + escapeHtml(item.q.stem) +
            "<br><strong>Sua resposta:</strong> " + escapeHtml(marked) +
            " &mdash; <strong>Correta:</strong> " + escapeHtml(item.q.options[item.q.correctIndex]) + "</p>" +
            '<p class="study-quiz-wrong-expl">' + escapeHtml(item.q.explanation) + "</p>";
          wrongEl.appendChild(div);
        });
      }

      updateReviewFromResult(wrong);

      var hist = loadHistory();
      hist.unshift({
        finishedAt: Date.now(),
        startedAt: state.startedAt || Date.now(),
        scorePercent: pct,
        correct: correct,
        total: state.order.length,
        byQuestion: byQuestion,
        mode: state.mode,
        domain: state.domain
      });
      if (hist.length > HISTORY_MAX) hist = hist.slice(0, HISTORY_MAX);
      saveHistory(hist);
      renderHistory();
      renderDashboards();
      clearSession();
      elResults.focus();
    }

    function beginExam() {
      state.mode = modeSelect && modeSelect.value ? modeSelect.value : "full";
      state.domain = domainSelect && domainSelect.value ? domainSelect.value : "all";
      var selectedBank = bank;
      var qSize = FULL_EXAM_SIZE;
      if (state.mode === "domain" && state.domain !== "all") {
        selectedBank = bank.filter(function (q) { return q.domain === state.domain; });
        qSize = DOMAIN_EXAM_SIZE;
      }
      state.order = pickQuestions(selectedBank, qSize, Math.random);
      state.answers = {};
      state.index = 0;
      state.startedAt = Date.now();
      clearSession();
      showActive();
    }

    function resumeFromSession(sess) {
      if (!sess || !sess.order || !sess.order.length) return false;
      var byId = {};
      bank.forEach(function (q) { byId[q.id] = q; });
      var ord = [];
      for (var i = 0; i < sess.order.length; i++) {
        if (!byId[sess.order[i]]) return false;
        ord.push(byId[sess.order[i]]);
      }
      state.order = ord;
      state.answers = sess.answers || {};
      state.index = typeof sess.index === "number" ? sess.index : 0;
      state.startedAt = sess.startedAt || Date.now();
      state.mode = sess.mode || "full";
      state.domain = sess.domain || "all";
      if (modeSelect) modeSelect.value = state.mode;
      if (domainSelect && state.domain) domainSelect.value = state.domain;
      showActive();
      return true;
    }

    btnStart.addEventListener("click", beginExam);
    if (modeSelect && domainSelect) {
      modeSelect.addEventListener("change", function () {
        domainSelect.disabled = modeSelect.value !== "domain";
      });
      domainSelect.disabled = modeSelect.value !== "domain";
    }
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
    btnRetry.addEventListener("click", showStart);

    if (btnClear) {
      btnClear.addEventListener("click", function () {
        if (window.confirm("Limpar todo o histórico de tentativas neste navegador?")) {
          saveHistory([]);
          saveReview({});
          renderHistory();
          renderDashboards();
        }
      });
    }

    renderHistory();
    renderDashboards();

    var sess = loadSession();
    if (!resumeFromSession(sess)) showStart();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
