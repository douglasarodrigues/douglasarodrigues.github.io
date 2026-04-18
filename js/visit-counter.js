/* Contador de visitas (agregado via CountAPI — namespace único no serviço).
   Troque NAMESPACE/KEY se quiser separar ambientes ou projetos. */
(function () {
  "use strict";

  var NAMESPACE = "douglas-portfolio-brad";
  var KEY = "site-visits";
  var URL = "https://api.countapi.xyz/hit/" + encodeURIComponent(NAMESPACE) + "/" + encodeURIComponent(KEY);

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
