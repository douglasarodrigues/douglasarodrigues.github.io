/* Contador de visitas agregado via CountAPI (spin-off comunitário).
 * O serviço original api.countapi.xyz deixou de responder (DNS/503).
 * Documentação: https://github.com/syntaxerror019/countapi
 */
(function () {
  "use strict";

  var BASE = "https://countapi.mileshilliard.com/api/v1";
  /* Chave única pública; troque se quiser outro contador (contagem recomeça). */
  var KEY = "douglas-portfolio-brad-site-visits";
  var URL = BASE + "/hit/" + encodeURIComponent(KEY);

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

  document.addEventListener("DOMContentLoaded", function () {
    var valEl = document.querySelector("[data-visit-count]");
    if (!valEl) return;

    setValue(valEl, "…");

    fetch(URL, { method: "GET", cache: "no-store", credentials: "omit" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        var raw = data && (data.value !== undefined ? data.value : data.count);
        var n = typeof raw === "string" ? parseInt(raw, 10) : raw;
        if (typeof n !== "number" || !isFinite(n)) throw new Error("invalid payload");
        setValue(valEl, formatNum(n));
      })
      .catch(function () {
        setValue(valEl, "—");
      });
  });
})();
