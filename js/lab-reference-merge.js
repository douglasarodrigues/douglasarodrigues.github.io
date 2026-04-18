/* ==========================================================================
   LAB-REFERENCE-MERGE.JS - Junta LAB_REFERENCE (pt-BR) com LAB_REFERENCE_I18N
   Carregar depois de lab-reference.js e lab-reference-i18n.js
   ========================================================================== */

(function (global) {
  "use strict";

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function mergeEntry(base, over) {
    if (!over) return base;
    const out = Object.assign({}, base, {
      meaning: over.meaning !== undefined ? over.meaning : base.meaning,
      action: over.action !== undefined ? over.action : base.action,
    });
    if (over.diagnostic !== undefined) {
      out.diagnostic = over.diagnostic;
    }
    return out;
  }

  function mergeByCode(baseArr, overlayMap) {
    if (!overlayMap || !baseArr) return baseArr;
    return baseArr.map(function (entry) {
      const key = entry.code;
      if (!key || !overlayMap[key]) return entry;
      return mergeEntry(entry, overlayMap[key]);
    });
  }

  function mergeJclTips(baseArr, overlayMap) {
    if (!overlayMap || !baseArr) return baseArr;
    return baseArr.map(function (entry) {
      const key = entry.id;
      if (!key || !overlayMap[key]) return entry;
      const o = overlayMap[key];
      return Object.assign({}, entry, {
        title: o.title !== undefined ? o.title : entry.title,
        content: o.content !== undefined ? o.content : entry.content,
      });
    });
  }

  /**
   * @param {string} lang — "pt-BR" | "en" | "es"
   */
  function getLocalizedLabReference(lang) {
    /* const LAB_REFERENCE no script anterior não define window.LAB_REFERENCE (let/const globais) */
    var base = global.LAB_REFERENCE;
    if (base == null && typeof LAB_REFERENCE !== "undefined") {
      base = LAB_REFERENCE;
    }
    if (!base) return null;
    if (!lang || lang === "pt-BR") {
      return deepClone(base);
    }
    var pack =
      global.LAB_REFERENCE_I18N &&
      (lang === "en" || lang === "es")
        ? global.LAB_REFERENCE_I18N[lang]
        : null;
    if (!pack) {
      return deepClone(base);
    }

    var out = deepClone(base);

    if (pack.fileStatus) {
      out.fileStatus = mergeByCode(out.fileStatus, pack.fileStatus);
    }
    if (pack.abendCodes) {
      out.abendCodes = mergeByCode(out.abendCodes, pack.abendCodes);
    }
    if (pack.sqlcodes) {
      out.sqlcodes = mergeByCode(out.sqlcodes, pack.sqlcodes);
    }
    if (pack.eibresp) {
      out.eibresp = mergeByCode(out.eibresp, pack.eibresp);
    }
    if (pack.jclTips) {
      var tipMap = {};
      pack.jclTips.forEach(function (t) {
        tipMap[t.id] = t;
      });
      out.jclTips = mergeJclTips(out.jclTips, tipMap);
    }

    return out;
  }

  global.getLocalizedLabReference = getLocalizedLabReference;
})(typeof window !== "undefined" ? window : global);
