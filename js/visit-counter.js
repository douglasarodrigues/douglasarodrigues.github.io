/* Contadores no rodapé via CountAPI (https://github.com/syntaxerror019/countapi)
 *
 * 1) Acessos únicos (KEY_UNIQUE): incrementa só na primeira visita deste navegador;
 *    depois só GET.
 * 2) Visualizações / navegação (KEY_VIEWS): hit a cada carregamento de página —
 *    acompanha cliques, rotas e atualizações.
 */
(function () {
  "use strict";

  var BASE = "https://countapi.mileshilliard.com/api/v1";
  var KEY_UNIQUE = "douglas-portfolio-brad-acessos-unicos-2026-04";
  var KEY_VIEWS = "douglas-portfolio-brad-site-visits";
  var STORAGE_KEY = "douglas-portfolio-unique-visit-" + KEY_UNIQUE;

  var fetchOpts = { method: "GET", cache: "no-store", credentials: "omit" };

  function apiUrl(endpoint, key) {
    return BASE + "/" + endpoint + "/" + encodeURIComponent(key);
  }

  function hasCountedThisBrowser() {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return true;
    } catch (e) {}
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return true;
    } catch (e) {}
    return false;
  }

  function markCountedThisBrowser() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
      return;
    } catch (e) {}
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
  }

  function setValue(el, text) {
    if (!el) return;
    el.textContent = text;
  }

  function formatNum(n) {
    if (typeof n !== "number" || !isFinite(n)) return String(n);
    try {
      return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
    } catch (e) {
      return String(n);
    }
  }

  function parseCount(data) {
    var raw = data && (data.value !== undefined ? data.value : data.count);
    var n = typeof raw === "string" ? parseInt(raw, 10) : raw;
    if (typeof n !== "number" || !isFinite(n)) return null;
    return n;
  }

  function fetchJson(url) {
    return fetch(url, fetchOpts).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
  }

  function runUniqueCounter() {
    var alreadyCounted = hasCountedThisBrowser();
    var done = alreadyCounted
      ? fetchJson(apiUrl("get", KEY_UNIQUE))
      : fetchJson(apiUrl("hit", KEY_UNIQUE));
    return done.then(function (data) {
      var n = parseCount(data);
      if (n === null) throw new Error("invalid payload");
      if (!alreadyCounted) {
        markCountedThisBrowser();
      }
      return n;
    });
  }

  function runViewsCounter() {
    return fetchJson(apiUrl("hit", KEY_VIEWS)).then(function (data) {
      var n = parseCount(data);
      if (n === null) throw new Error("invalid payload");
      return n;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var uniqueEl = document.querySelector("[data-visit-unique]");
    var viewsEl = document.querySelector("[data-visit-views]");
    if (!uniqueEl && !viewsEl) return;

    if (uniqueEl) setValue(uniqueEl, "…");
    if (viewsEl) setValue(viewsEl, "…");

    if (uniqueEl) {
      runUniqueCounter()
        .then(function (n) {
          setValue(uniqueEl, formatNum(n));
        })
        .catch(function () {
          setValue(uniqueEl, "—");
        });
    }

    if (viewsEl) {
      runViewsCounter()
        .then(function (n) {
          setValue(viewsEl, formatNum(n));
        })
        .catch(function () {
          setValue(viewsEl, "—");
        });
    }
  });
})();
