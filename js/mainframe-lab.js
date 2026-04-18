/* ==========================================================================
   MAINFRAME-LAB.JS - Engine de renderização dinâmica do Mainframe Lab
   Renderiza tabs, cards, code viewer, referência e accordion a partir
   de LAB_PROGRAMS e LAB_REFERENCE.
   ========================================================================== */

(() => {
  "use strict";

  // ── Config ──────────────────────────────────────────────────────────────

  const TECH_ORDER = ["cobol", "hlasm", "jcl", "cics", "db2", "ims", "vsam"];

  const TECH_META = {
    cobol: { label: "COBOL", icon: "file-code", sectionTitle: "Módulos COBOL", sectionDesc: "Subprogramas reutilizáveis via CALL USING — módulos utilitários que aceleram o desenvolvimento e padronizam rotinas comuns no dia a dia mainframe." },
    hlasm: { label: "HLASM", icon: "cpu", sectionTitle: "Módulos HLASM", sectionDesc: "Rotinas utilitárias em Assembler z/OS — cada módulo demonstra técnicas de base-displacement e endereçamento relativo." },
    jcl:   { label: "JCL", icon: "terminal", sectionTitle: "Templates JCL", sectionDesc: "Jobs prontos para uso — templates de JCL para compilação, sort, utilitários e operações com datasets no dia a dia z/OS." },
    cics:  { label: "CICS", icon: "monitor", sectionTitle: "Programas CICS", sectionDesc: "Programas online CICS — transações, BMS, filas, browse e controle de recursos para o ambiente transacional IBM." },
    db2:   { label: "DB2", icon: "database", sectionTitle: "Programas DB2", sectionDesc: "Programas COBOL com SQL embutido — cursores, SQL dinâmico, controle de locks, savepoints e consultas avançadas em DB2 for z/OS." },
    ims:   { label: "IMS", icon: "git-branch", sectionTitle: "Programas IMS", sectionDesc: "Programas DL/I para IMS — navegação hierárquica, BMP, checkpoint/restart, SSAs qualificadas e transações conversacionais." },
    vsam:  { label: "VSAM", icon: "hard-drive", sectionTitle: "Programas VSAM", sectionDesc: "Programas COBOL para VSAM — KSDS, RRDS, índice alternativo, browse, atualização em lote e backup/restore." },
  };

  const REF_META = {
    fileStatus: { label: "File-Status COBOL", icon: "file-text" },
    abendCodes: { label: "Abend Codes z/OS", icon: "alert-triangle" },
    sqlcodes:   { label: "SQLCODE DB2", icon: "database" },
    eibresp:    { label: "CICS EIBRESP Codes", icon: "monitor" },
    jclTips:    { label: "Dicas Rápidas de JCL", icon: "terminal" },
  };

  const PORTFOLIO_LANG_KEY = "portfolio-lang";
  const SUPPORTED_LANGS = ["pt-BR", "en", "es"];

  function getPortfolioLang() {
    try {
      const saved = localStorage.getItem(PORTFOLIO_LANG_KEY);
      if (saved && SUPPORTED_LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) { /* ignore */ }
    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.startsWith("en")) return "en";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("pt")) return "pt-BR";
    return "en";
  }

  function getLabReferenceForLang(lang) {
    if (typeof getLocalizedLabReference === "function") {
      return getLocalizedLabReference(lang);
    }
    return typeof LAB_REFERENCE !== "undefined" ? LAB_REFERENCE : null;
  }

  const BADGE_MAP = {
    basic: { label: "Básico", cls: "lab-badge-basic" },
    intermediate: { label: "Intermediário", cls: "lab-badge-intermediate" },
    advanced: { label: "Avançado", cls: "lab-badge-advanced" },
  };

  const LANG_MAP = { cobol: "cobol", hlasm: "hlasm", jcl: "jcl", cics: "cobol", db2: "cobol", ims: "cobol", vsam: "cobol" };

  // ── Helpers ─────────────────────────────────────────────────────────────

  const qs  = (s, ctx) => (ctx || document).querySelector(s);
  const qsa = (s, ctx) => Array.from((ctx || document).querySelectorAll(s));
  const el  = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

  function escapeHtml(t) { const d = document.createElement("div"); d.textContent = t; return d.innerHTML; }

  function svgIcon(name) {
    const icons = {
      "file-code": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      "cpu": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/></svg>',
      "terminal": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
      "monitor": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      "database": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
      "git-branch": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
      "hard-drive": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',
      "file-text": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      "alert-triangle": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      "chevron-down": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
      "code": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      "copy": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    };
    return icons[name] || "";
  }

  // ── Syntax Highlighting ─────────────────────────────────────────────────

  function highlightCobol(code) {
    return escapeHtml(code)
      .replace(/^(      \*.*)/gm, '<span class="hl-comment">$1</span>')
      .replace(/\b(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE|DIVISION|SECTION|WORKING-STORAGE|LINKAGE|FILE|COPY|PERFORM|EVALUATE|WHEN|IF|ELSE|END-IF|END-EVALUATE|END-PERFORM|END-READ|END-WRITE|END-SEARCH|END-STRING|END-COMPUTE|MOVE|TO|DISPLAY|STOP\s+RUN|GOBACK|OPEN|CLOSE|READ|WRITE|REWRITE|DELETE|START|RETURN|RELEASE|SORT|MERGE|SEARCH|SET|ADD|SUBTRACT|MULTIPLY|DIVIDE|COMPUTE|STRING|UNSTRING|INSPECT|ACCEPT|INITIALIZE|EXIT|CONTINUE|NOT|AND|OR|VARYING|FROM|BY|UNTIL|INTO|GIVING|AT|END|WITH|ON|ASCENDING|DESCENDING|KEY|INDEXED|THRU|THROUGH|ALSO|OTHER|ALL|TALLYING|REPLACING|LEADING|TRAILING|FIRST|AFTER|BEFORE|INITIAL|DELIMITED|SIZE|FUNCTION|EXEC|END-EXEC)\b/g, '<span class="hl-keyword">$1</span>')
      .replace(/(PIC\s+[^\s.]+)/g, '<span class="hl-pic">$1</span>')
      .replace(/\b(EXEC\s+SQL|END-EXEC|EXEC\s+CICS)\b/g, '<span class="hl-exec">$1</span>')
      .replace(/\b(CALL\s+'[^']*')/g, '<span class="hl-exec">$1</span>')
      .replace(/('[^']*')/g, '<span class="hl-string">$1</span>')
      .replace(/\b(DFHRESP\([A-Z]+\))/g, '<span class="hl-exec">$1</span>');
  }

  function highlightHlasm(code) {
    return escapeHtml(code)
      .replace(/^(\*.*)/gm, '<span class="hl-comment">$1</span>')
      .replace(/^([A-Z@#$][A-Z0-9@#$]*)\s/gm, '<span class="hl-asm-lbl">$1</span> ')
      .replace(/\b(CSECT|DSECT|USING|DROP|ENTRY|END|EQU|DC|DS|LTORG|ORG|YREGS)\b/g, '<span class="hl-keyword">$1</span>')
      .replace(/\b(STM|LM|ST|L|LA|LR|BALR|BAL|BR|BCR|BCT|STMG|LMG|STG|LG|LGR|LARL|BRASL|BASR|SLL|SRL|SRA|SLA|AR|SR|MR|DR|CR|CLR|NR|OR|XR|IC|STC|CH|CLC|MVC|MVI|CLI|XC|OC|NC|MVCL|CLCL|TRT|TR|PACK|UNPK|CVD|CVB|ZAP|AP|SP|MP|DP|CP|EX|BZ|BNZ|BL|BH|BE|BNE|BNL|BNH)\b/g, '<span class="hl-asm-op">$1</span>')
      .replace(/\b(WTO|OPEN|CLOSE|GET|PUT|RETURN|SAVE|LOAD|DELETE|LINK|XCTL|TIME|CALL)\b/g, '<span class="hl-exec">$1</span>')
      .replace(/\b(R[0-9]|R1[0-5])\b/g, '<span class="hl-asm-reg">$1</span>');
  }

  function highlightJcl(code) {
    return escapeHtml(code)
      .replace(/^(\/\/\*.*)/gm, '<span class="hl-comment">$1</span>')
      .replace(/^(\/\/[A-Z0-9@#$]{1,8}\s)/gm, '<span class="hl-label">$1</span>')
      .replace(/\b(JOB|EXEC|DD|PROC|PEND|SET|IF|THEN|ELSE|ENDIF)\b/g, '<span class="hl-jcl-stmt">$1</span>')
      .replace(/\b(PGM|DSN|DISP|SPACE|DCB|SYSOUT|REGION|COND|CLASS|MSGCLASS|MSGLEVEL|NOTIFY|UNIT|VOL|RECFM|LRECL|BLKSIZE)\b/g, '<span class="hl-jcl-dd">$1</span>')
      .replace(/\b(SORT|MERGE|INCLUDE|OMIT|OUTREC|OUTFIL|INREC|SUM|OPTION|JOINKEYS|JOIN|REFORMAT|BUILD|HEADER1|HEADER2|TRAILER1|SECTIONS|DEFINE|DELETE|REPRO|LISTCAT|VERIFY|BLDINDEX|COPY|SELECT|DUMP|RESTORE)\b/g, '<span class="hl-jcl-parm">$1</span>')
      .replace(/(&amp;[A-Z0-9]+)/g, '<span class="hl-string">$1</span>');
  }

  function highlightSource(code, tech) {
    const lang = LANG_MAP[tech] || "cobol";
    if (lang === "hlasm") return highlightHlasm(code);
    if (lang === "jcl") return highlightJcl(code);
    return highlightCobol(code);
  }

  // ── Grouping ────────────────────────────────────────────────────────────

  function groupByTech(programs) {
    const groups = {};
    TECH_ORDER.forEach(t => { groups[t] = []; });
    programs.forEach(p => {
      if (groups[p.tech]) groups[p.tech].push(p);
    });
    return groups;
  }

  // ── Render Tabs ─────────────────────────────────────────────────────────

  function renderTabs(groups) {
    const tablist = qs("#lab-tablist");
    if (!tablist) return;
    tablist.innerHTML = "";

    TECH_ORDER.forEach((tech, i) => {
      const meta = TECH_META[tech];
      const count = groups[tech].length;
      const btn = el("button", "lab-tab");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.setAttribute("tabindex", i === 0 ? "0" : "-1");
      btn.setAttribute("aria-controls", "panel-" + tech);
      btn.id = "tab-" + tech;
      btn.dataset.tech = tech;
      btn.innerHTML =
        `<span class="lab-tab-icon">${svgIcon(meta.icon)}</span>` +
        `${meta.label}` +
        `<span class="lab-tab-count">${count}</span>`;
      tablist.appendChild(btn);
    });

    // Reference tab
    const refBtn = el("button", "lab-tab lab-tab--ref");
    refBtn.setAttribute("role", "tab");
    refBtn.setAttribute("aria-selected", "false");
    refBtn.setAttribute("tabindex", "-1");
    refBtn.setAttribute("aria-controls", "panel-ref");
    refBtn.id = "tab-ref";
    refBtn.dataset.tech = "ref";
    refBtn.innerHTML = `Referência Rápida`;
    tablist.appendChild(refBtn);
  }

  // ── Render Program Cards ────────────────────────────────────────────────

  function renderCard(prog, index) {
    const badge = BADGE_MAP[prog.level] || BADGE_MAP.basic;
    const hasDual = !!(prog.sourceBase && prog.sourceRelative);
    const article = el("article", "lab-card lab-card-reveal");
    article.dataset.search = `${prog.id} ${prog.name} ${prog.desc} ${prog.tech} ${(prog.tags || []).join(" ")}`.toLowerCase();
    article.dataset.tech = prog.tech;
    article.dataset.programId = prog.id;
    article.style.setProperty("--lab-card-index", index);

    const dualBadge = hasDual
      ? `<span class="lab-badge lab-badge-dual" title="Base+Deslocamento e Endereço Relativo">2 Versões</span>`
      : "";

    article.innerHTML =
      `<div class="lab-card-header">
        <div class="lab-card-title-group">
          <p class="lab-card-program-id">${escapeHtml(prog.id)}</p>
          <h2 class="lab-card-name">${escapeHtml(prog.name)}</h2>
        </div>
        <div class="lab-card-badges">
          ${dualBadge}
          <span class="lab-badge ${badge.cls}">${badge.label}</span>
        </div>
      </div>
      <p class="lab-card-desc">${escapeHtml(prog.desc)}</p>
      <footer class="lab-card-footer">
        <div class="lab-card-tags">${(prog.tags || []).map(t => `<span class="lab-tech-badge">${escapeHtml(t)}</span>`).join("")}</div>
        <button class="lab-card-toggle" aria-expanded="false" aria-label="Ver código de ${escapeHtml(prog.name)}">
          ${svgIcon("code")} <span>Ver Código</span>
          <span class="lab-card-toggle-icon">${svgIcon("chevron-down")}</span>
        </button>
      </footer>`;

    return article;
  }

  function renderSourceViewer(prog) {
    const div = el("div", "lab-card-source");
    const hasDual = !!(prog.sourceBase && prog.sourceRelative);

    if (hasDual) {
      const hlBase = highlightHlasm(prog.sourceBase);
      const hlRel  = highlightHlasm(prog.sourceRelative);
      div.innerHTML =
        `<div class="lab-card-source-tabs" role="tablist" aria-label="Versões do código">
          <button class="lab-card-source-tab is-active" role="tab" aria-selected="true" data-src-tab="base">Base + Deslocamento</button>
          <button class="lab-card-source-tab lab-card-source-tab-highlight" role="tab" aria-selected="false" data-src-tab="rel">Endereço Relativo</button>
        </div>
        <div class="lab-card-source-panel is-active" data-src-panel="base">
          <div class="lab-card-source-header">
            <span class="lab-card-source-filename">${escapeHtml(prog.filename)}</span>
            <button class="lab-card-source-copy" aria-label="Copiar código">
              ${svgIcon("copy")} <span class="lab-copy-label">Copiar</span>
            </button>
          </div>
          <pre class="lab-card-source-pre"><code data-language="hlasm">${hlBase}</code></pre>
        </div>
        <div class="lab-card-source-panel" data-src-panel="rel" hidden>
          <div class="lab-card-source-header">
            <span class="lab-card-source-filename">${escapeHtml(prog.filename)}</span>
            <button class="lab-card-source-copy" aria-label="Copiar código">
              ${svgIcon("copy")} <span class="lab-copy-label">Copiar</span>
            </button>
          </div>
          <pre class="lab-card-source-pre"><code data-language="hlasm">${hlRel}</code></pre>
        </div>`;
    } else {
      const src = prog.source || prog.sourceBase || "";
      const highlighted = highlightSource(src, prog.tech);
      div.innerHTML =
        `<div class="lab-card-source-header">
          <span class="lab-card-source-filename">${escapeHtml(prog.filename)}</span>
          <button class="lab-card-source-copy" aria-label="Copiar código">
            ${svgIcon("copy")} <span class="lab-copy-label">Copiar</span>
          </button>
        </div>
        <pre class="lab-card-source-pre"><code data-language="${LANG_MAP[prog.tech] || "cobol"}">${highlighted}</code></pre>`;
    }
    return div;
  }

  // ── Render Panels ───────────────────────────────────────────────────────

  function renderProgramPanels(groups) {
    const container = qs("#lab-panels-container");
    if (!container) return;
    container.innerHTML = "";

    TECH_ORDER.forEach((tech, ti) => {
      const meta = TECH_META[tech];
      const programs = groups[tech];
      const panel = el("section", "lab-tabpanel");
      panel.id = "panel-" + tech;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", "tab-" + tech);
      if (ti > 0) panel.hidden = true;

      const section = el("div", "lab-section");
      section.innerHTML =
        `<h2 class="lab-section-title">${meta.sectionTitle}</h2>
         <p class="lab-section-desc">${meta.sectionDesc}</p>`;

      const grid = el("div", "lab-cards-grid");
      programs.forEach((prog, i) => {
        grid.appendChild(renderCard(prog, i));
      });

      section.appendChild(grid);
      panel.appendChild(section);
      container.appendChild(panel);
    });

    // Reference panel
    renderReferencePanel(container);

    /* Aba inicial: Referência Rápida (quando o painel existir) */
    if (typeof LAB_REFERENCE !== "undefined" && qs("#panel-ref") && qs("#tab-ref")) {
      activateTab(qs("#tab-ref"));
    }
  }

  // ── Render Reference ────────────────────────────────────────────────────

  function injectReferenceNavAndAccordion(section, labRef) {
    const nav = el("nav", "lab-ref-nav");
    nav.setAttribute("aria-label", "Categorias de referência");
    Object.keys(REF_META).forEach((key) => {
      const btn = el("button", "lab-ref-nav-btn");
      btn.textContent = REF_META[key].label;
      btn.addEventListener("click", () => {
        const target = qs("#ref-group-" + key);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      nav.appendChild(btn);
    });
    section.appendChild(nav);

    const accordion = el("div", "lab-ref-accordion");
    const hdr = ["Código", "Significado", "Ação Sugerida"];

    if (labRef.fileStatus) {
      accordion.appendChild(renderRefGroup("fileStatus", labRef.fileStatus, hdr));
    }
    if (labRef.abendCodes) {
      accordion.appendChild(renderRefGroup("abendCodes", labRef.abendCodes, hdr));
    }
    if (labRef.sqlcodes) {
      accordion.appendChild(renderRefGroup("sqlcodes", labRef.sqlcodes, hdr));
    }
    if (labRef.eibresp) {
      accordion.appendChild(renderRefGroup("eibresp", labRef.eibresp, hdr));
    }
    if (labRef.jclTips) {
      accordion.appendChild(renderJclTipsGroup(labRef.jclTips));
    }

    section.appendChild(accordion);
  }

  function renderReferencePanel(container) {
    if (typeof LAB_REFERENCE === "undefined") return;

    const lang = getPortfolioLang();
    const labRef = getLabReferenceForLang(lang);
    if (!labRef) return;

    const panel = el("section", "lab-tabpanel");
    panel.id = "panel-ref";
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "tab-ref");
    panel.hidden = true;

    const section = el("div", "lab-section");
    section.innerHTML =
      `<h2 class="lab-section-title">Referência <span class="text-accent">Rápida</span></h2>
       <p class="lab-section-desc">File-Status, SQLCODE, Abend Codes, EIBRESP e dicas de JCL — a referência que compilei para resolver problemas sem perder tempo.</p>`;

    injectReferenceNavAndAccordion(section, labRef);
    panel.appendChild(section);
    container.appendChild(panel);
  }

  window.refreshLabReferenceTables = function (lang) {
    const panel = document.getElementById("panel-ref");
    if (!panel || typeof LAB_REFERENCE === "undefined") return;
    const section = panel.querySelector(".lab-section");
    if (!section) return;
    const l = lang || getPortfolioLang();
    const labRef = getLabReferenceForLang(l);
    if (!labRef) return;
    const oldNav = section.querySelector(".lab-ref-nav");
    const oldAcc = section.querySelector(".lab-ref-accordion");
    if (oldNav) oldNav.remove();
    if (oldAcc) oldAcc.remove();
    injectReferenceNavAndAccordion(section, labRef);
  };

  function renderRefGroup(key, entries, headers) {
    const meta = REF_META[key];
    const group = el("div", "lab-ref-group");
    group.id = "ref-group-" + key;

    group.innerHTML =
      `<h3>
        <button class="lab-ref-trigger" aria-expanded="false" aria-controls="ref-panel-${key}">
          <span class="lab-ref-trigger-icon">${svgIcon(meta.icon)}</span>
          <span class="lab-ref-trigger-label">${meta.label}</span>
          <span class="lab-ref-trigger-badge">${entries.length}</span>
          <span class="lab-ref-trigger-chevron">${svgIcon("chevron-down")}</span>
        </button>
      </h3>
      <div class="lab-ref-panel" id="ref-panel-${key}">
        <div class="lab-ref-panel-inner">
          <div class="lab-table-section">
            <div class="lab-table-wrapper">
              <table class="lab-table">
                <thead>
                  <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
                </thead>
                <tbody>
                  ${entries.map(e => renderRefRow(e)).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;

    return group;
  }

  function renderRefRow(entry) {
    const sev = entry.severity || "info";
    const hasDetail = entry.diagnostic && (entry.diagnostic.causes || entry.diagnostic.resolution);

    let row = `<tr class="lab-table-severity--${sev}"${hasDetail ? ' aria-expanded="false" tabindex="0"' : ""}>
      <td><code class="lab-code">${escapeHtml(entry.code)}</code></td>
      <td>${escapeHtml(entry.meaning)}</td>
      <td>${escapeHtml(entry.action)}${hasDetail ? ` <span class="lab-diag-toggle">${svgIcon("chevron-down")}</span>` : ""}</td>
    </tr>`;

    if (hasDetail) {
      const d = entry.diagnostic;
      let panelHtml = '<div class="lab-diag-panel">';

      if (d.causes && d.causes.length) {
        panelHtml += '<div class="lab-diag-label" data-i18n="lab.ref.diag.causes">Causas Raiz</div><div class="lab-diag-causes">';
        d.causes.forEach(c => {
          panelHtml += `<div class="lab-diag-cause"><div class="lab-diag-cause-title">${escapeHtml(c.title)}</div><div class="lab-diag-cause-desc">${escapeHtml(c.desc)}</div></div>`;
        });
        panelHtml += "</div>";
      }

      if (d.resolution && d.resolution.length) {
        panelHtml += '<div class="lab-diag-resolve-label" data-i18n="lab.ref.diag.resolution">Resolução</div><ol class="lab-diag-steps">';
        d.resolution.forEach(s => { panelHtml += `<li>${escapeHtml(s)}</li>`; });
        panelHtml += "</ol>";
      }

      if (d.tip) {
        panelHtml += `<div class="lab-diag-tip"><strong data-i18n="lab.ref.diag.tipLabel">Dica:</strong> ${escapeHtml(d.tip)}</div>`;
      }

      panelHtml += "</div>";

      row += `<tr class="lab-diag-row" hidden>
        <td colspan="3">
          <div class="lab-diag-wrapper"><div class="lab-diag-inner">${panelHtml}</div></div>
        </td>
      </tr>`;
    }

    return row;
  }

  function renderJclTipsGroup(tips) {
    const meta = REF_META.jclTips;
    const group = el("div", "lab-ref-group");
    group.id = "ref-group-jclTips";

    let tipsHtml = tips.map(t =>
      `<div class="lab-tip-card">
        <h4 class="lab-tip-title">${escapeHtml(t.title)}</h4>
        <div class="lab-tip-content">${t.content}</div>
      </div>`
    ).join("");

    group.innerHTML =
      `<h3>
        <button class="lab-ref-trigger" aria-expanded="false" aria-controls="ref-panel-jclTips">
          <span class="lab-ref-trigger-icon">${svgIcon(meta.icon)}</span>
          <span class="lab-ref-trigger-label">${meta.label}</span>
          <span class="lab-ref-trigger-badge">${tips.length}</span>
          <span class="lab-ref-trigger-chevron">${svgIcon("chevron-down")}</span>
        </button>
      </h3>
      <div class="lab-ref-panel" id="ref-panel-jclTips">
        <div class="lab-ref-panel-inner">
          <div class="lab-tips-grid-wrap">
            <div class="lab-tips-grid">${tipsHtml}</div>
          </div>
        </div>
      </div>`;

    return group;
  }

  // ── Interactions ────────────────────────────────────────────────────────

  function initTabSwitching() {
    const tablist = qs("#lab-tablist");
    if (!tablist) return;

    tablist.addEventListener("click", (e) => {
      const tab = e.target.closest(".lab-tab");
      if (!tab) return;
      activateTab(tab);
    });

    // ARIA tab keyboard pattern: arrow keys + Home/End
    tablist.addEventListener("keydown", (e) => {
      const tabs = qsa(".lab-tab", tablist);
      const current = tabs.findIndex(t => t.getAttribute("aria-selected") === "true");
      if (current < 0) return;

      let next = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (current + 1) % tabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;

      if (next >= 0) {
        e.preventDefault();
        tabs[next].focus();
        activateTab(tabs[next]);
      }
    });
  }

  function activateTab(button) {
    if (!button) return;
    const tabs = qsa(".lab-tab");
    const panels = qsa(".lab-tabpanel");

    tabs.forEach(t => {
      const isActive = t === button;
      t.setAttribute("aria-selected", String(isActive));
      t.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    const targetId = button.getAttribute("aria-controls");
    panels.forEach(p => {
      const show = p.id === targetId;
      p.hidden = !show;
      if (show) {
        revealCards(p);
      }
    });

    const labContainer = qs(".lab-container");
    if (labContainer && targetId) {
      const short =
        targetId === "panel-ref"
          ? "ref"
          : targetId.replace(/^panel-/, "");
      labContainer.setAttribute("data-lab-active-tab", short);
    }

    // Scroll nav tab into view if needed
    button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

    /* Referência fica abaixo de stats/busca no HTML; sem scroll o utilizador não vê as tabelas */
    if (targetId === "panel-ref") {
      const refPanel = qs("#panel-ref");
      if (refPanel) {
        requestAnimationFrame(() => {
          refPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }

  function revealCards(panel) {
    const cards = qsa(".lab-card-reveal:not(.is-visible)", panel);
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("is-visible"), i * 60);
    });
  }

  function initCodeToggle() {
    document.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest(".lab-card-toggle");
      if (!toggleBtn) return;

      const card = toggleBtn.closest(".lab-card");
      if (!card) return;

      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        const source = qs(".lab-card-source", card);
        if (source) source.remove();
        toggleBtn.setAttribute("aria-expanded", "false");
      } else {
        const progId = card.dataset.programId;
        const prog = (typeof LAB_PROGRAMS !== "undefined" ? LAB_PROGRAMS : []).find(p => p.id === progId);
        if (!prog) return;
        if (!prog.source && !prog.sourceBase) return;

        const viewer = renderSourceViewer(prog);
        card.appendChild(viewer);
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    });

    // Tab switching for dual HLASM source viewers
    document.addEventListener("click", (e) => {
      const tab = e.target.closest(".lab-card-source-tab");
      if (!tab || !tab.dataset.srcTab) return;
      const container = tab.closest(".lab-card-source");
      if (!container) return;

      const targetKey = tab.dataset.srcTab;
      qsa(".lab-card-source-tab", container).forEach(t => {
        if (!t.dataset.srcTab) return;
        const active = t.dataset.srcTab === targetKey;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });
      qsa(".lab-card-source-panel", container).forEach(p => {
        const active = p.dataset.srcPanel === targetKey;
        p.classList.toggle("is-active", active);
        p.hidden = !active;
      });
    });
  }

  function initCopyCode() {
    document.addEventListener("click", (e) => {
      const copyBtn = e.target.closest(".lab-card-source-copy");
      if (!copyBtn) return;

      const pre = copyBtn.closest(".lab-card-source").querySelector("code");
      if (!pre) return;

      navigator.clipboard.writeText(pre.textContent).then(() => {
        const label = qs(".lab-copy-label", copyBtn);
        if (label) {
          const orig = label.textContent;
          label.textContent = "Copiado!";
          setTimeout(() => { label.textContent = orig; }, 2000);
        }
      });
    });
  }

  function initAccordion() {
    function toggleRefTrigger(trigger) {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      const panelId = trigger.getAttribute("aria-controls");
      const panel = qs("#" + panelId);
      if (panel) panel.classList.toggle("is-open", !expanded);
    }

    function toggleDiagRow(row) {
      const expanded = row.getAttribute("aria-expanded") === "true";
      row.setAttribute("aria-expanded", String(!expanded));
      const diagRow = row.nextElementSibling;
      if (diagRow && diagRow.classList.contains("lab-diag-row")) {
        diagRow.hidden = expanded;
        diagRow.classList.toggle("is-open", !expanded);
      }
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".lab-ref-trigger");
      if (trigger) { toggleRefTrigger(trigger); return; }
      const row = e.target.closest("tr[aria-expanded]");
      if (row) toggleDiagRow(row);
    });

    // Keyboard: Enter/Space on expandable rows
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const row = e.target.closest("tr[aria-expanded]");
      if (row) { e.preventDefault(); toggleDiagRow(row); }
    });
  }

  /** Search text from live DOM so i18n updates to names/descriptions stay searchable. */
  function getCardSearchText(card) {
    const id = (qs(".lab-card-program-id", card)?.textContent || "").trim();
    const name = (qs(".lab-card-name", card)?.textContent || "").trim();
    const desc = (qs(".lab-card-desc", card)?.textContent || "").trim();
    const tech = (card.dataset.tech || "").trim();
    const tags = qsa(".lab-tech-badge", card)
      .map((t) => t.textContent.trim())
      .join(" ");
    return `${id} ${name} ${desc} ${tech} ${tags}`.replace(/\s+/g, " ").trim().toLowerCase();
  }

  function initSearch() {
    const input = qs("#lab-search-input");
    const clearBtn = qs(".lab-search-clear");
    const noResults = qs("#lab-no-results");
    if (!input) return;

    const doSearch = () => {
      const query = input.value.trim().toLowerCase();
      const allCards = qsa(".lab-card");
      let visible = 0;

      allCards.forEach((card) => {
        const text = getCardSearchText(card);
        const match = !query || text.includes(query);
        card.hidden = !match;
        if (match) visible++;
      });

      if (noResults) noResults.hidden = visible > 0 || !query;
      if (clearBtn) clearBtn.hidden = !query;

      /* Matches may live only in another tech tab — switch so results are visible */
      if (query.length > 0 && visible > 0) {
        const activePanel = qs(".lab-tabpanel:not([hidden])");
        if (activePanel) {
          const inActive = qsa(".lab-card", activePanel);
          const activeShowsMatch = inActive.some((c) => !c.hidden);
          if (activeShowsMatch) return;
        }
        for (const tech of TECH_ORDER) {
          const panel = qs("#panel-" + tech);
          if (!panel) continue;
          const cardsIn = qsa(".lab-card", panel);
          if (!cardsIn.some((c) => !c.hidden)) continue;
          const tabId = panel.getAttribute("aria-labelledby");
          const tabBtn = tabId ? qs("#" + tabId) : null;
          if (tabBtn) activateTab(tabBtn);
          break;
        }
      }
    };

    input.addEventListener("input", doSearch);
    input.addEventListener("search", doSearch);
    document.addEventListener("langchange", doSearch);
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        input.focus();
        doSearch();
      });
    }
  }

  function initScrollTop() {
    const btn = qs(".lab-scroll-top");
    if (!btn) return;

    const update = () => {
      const show = window.scrollY > 340;
      btn.hidden = !show;
      btn.classList.toggle("is-visible", show);
    };

    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initBootScreen() {
    const boot = qs(".lab-boot-screen");
    if (!boot) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      boot.classList.add("is-hidden");
      return;
    }

    const container = qs("#boot-lines");
    const statusEl = qs("#boot-status");
    if (!container) return;

    const now = new Date();
    const pad = (n, l) => String(n).padStart(l || 2, "0");
    const ts = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const dateStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;

    const JOB_LINES = [
      { text: `${ts}  JOB08421  $HASP373 LABINIT  STARTED - INIT 3  - CLASS A - SYS SYS3900`, cls: "header", delay: 100 },
      { text: `${ts}  JOB08421  IEF403I LABINIT - STARTED - TIME=${ts}  DATE=${dateStr}`, cls: "info", delay: 80 },
      { text: " ", cls: "empty", delay: 30 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
      { text: " STEP01   EXEC PGM=LABLOAD,PARM='DESIGN-TOKENS'", cls: "jcl", delay: 90 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
      { text: `${ts}  JOB08421  IEF236I ALLOC. FOR LABINIT STEP01`, cls: "info", delay: 70 },
      { text: `${ts}  JOB08421  +LABLOAD: LOADING 7 TECHNOLOGY MODULES...`, cls: "process", delay: 120 },
      { text: `${ts}  JOB08421  +LABLOAD: COBOL(13) HLASM(11) JCL(13) CICS(13)`, cls: "process", delay: 100 },
      { text: `${ts}  JOB08421  +LABLOAD: DB2(13)   IMS(11)  VSAM(11)`, cls: "process", delay: 100 },
      { text: `${ts}  JOB08421  +LABLOAD: 97 PROGRAMS CATALOGED RC=0000`, cls: "ok", delay: 80 },
      { text: `${ts}  JOB08421  IEF142I LABINIT STEP01 - STEP WAS EXECUTED - COND CODE 0000`, cls: "ok", delay: 70 },
      { text: " ", cls: "empty", delay: 30 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
      { text: " STEP02   EXEC PGM=REFLOAD,PARM='QUICK-REFERENCE'", cls: "jcl", delay: 90 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
      { text: `${ts}  JOB08421  IEF236I ALLOC. FOR LABINIT STEP02`, cls: "info", delay: 70 },
      { text: `${ts}  JOB08421  +REFLOAD: FILE-STATUS(28) ABEND(24) SQLCODE(22)`, cls: "process", delay: 100 },
      { text: `${ts}  JOB08421  +REFLOAD: EIBRESP(34)     JCL-TIPS(4)`, cls: "process", delay: 100 },
      { text: `${ts}  JOB08421  +REFLOAD: 112 ENTRIES LOADED RC=0000`, cls: "ok", delay: 80 },
      { text: `${ts}  JOB08421  IEF142I LABINIT STEP02 - STEP WAS EXECUTED - COND CODE 0000`, cls: "ok", delay: 70 },
      { text: " ", cls: "empty", delay: 30 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
      { text: " STEP03   EXEC PGM=UIRENDER,PARM='NAVIGATION,SEARCH,VIEWER'", cls: "jcl", delay: 90 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
      { text: `${ts}  JOB08421  IEF236I ALLOC. FOR LABINIT STEP03`, cls: "info", delay: 70 },
      { text: `${ts}  JOB08421  +UIRENDER: STICKY NAV.............. OK`, cls: "process", delay: 90 },
      { text: `${ts}  JOB08421  +UIRENDER: SEARCH ENGINE........... OK`, cls: "process", delay: 80 },
      { text: `${ts}  JOB08421  +UIRENDER: CODE VIEWER + HIGHLIGHT. OK`, cls: "process", delay: 80 },
      { text: `${ts}  JOB08421  +UIRENDER: ACCORDION REFERENCE..... OK`, cls: "process", delay: 80 },
      { text: `${ts}  JOB08421  +UIRENDER: CANVAS PARTICLES........ OK`, cls: "process", delay: 80 },
      { text: `${ts}  JOB08421  IEF142I LABINIT STEP03 - STEP WAS EXECUTED - COND CODE 0000`, cls: "ok", delay: 70 },
      { text: " ", cls: "empty", delay: 30 },
      { text: `${ts}  JOB08421  IEF404I LABINIT - ENDED - TIME=${ts}  DATE=${dateStr}`, cls: "info", delay: 80 },
      { text: `${ts}  JOB08421  $HASP395 LABINIT  ENDED - RC=0000`, cls: "ok-bold", delay: 100 },
      { text: " ", cls: "empty", delay: 30 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
      { text: " MAINFRAME LAB — READY", cls: "ready", delay: 200 },
      { text: "────────────────────────────────────────────────────────────────", cls: "separator", delay: 20 },
    ];

    let total = 0;
    JOB_LINES.forEach(item => {
      total += item.delay;
      setTimeout(() => {
        const span = document.createElement("span");
        span.className = "lab-boot-line lab-boot-line--" + item.cls;
        span.textContent = item.text;
        container.appendChild(span);
        container.scrollTop = container.scrollHeight;
      }, total);
    });

    // Update status bar as job progresses
    const stepTimes = [
      { at: 0, text: "JOB SUBMITTED — EXECUTING STEP01..." },
      { at: Math.round(total * 0.35), text: "STEP01 RC=0000 — EXECUTING STEP02..." },
      { at: Math.round(total * 0.62), text: "STEP02 RC=0000 — EXECUTING STEP03..." },
      { at: Math.round(total * 0.88), text: "STEP03 RC=0000 — JOB ENDED" },
      { at: total, text: "MAXCC=0000 — ENTERING MAINFRAME LAB" },
    ];
    stepTimes.forEach(s => {
      setTimeout(() => { if (statusEl) statusEl.textContent = s.text; }, s.at);
    });

    setTimeout(() => boot.classList.add("is-done"), total + 600);
    setTimeout(() => boot.classList.add("is-hidden"), total + 1400);
  }

  // ── Init ────────────────────────────────────────────────────────────────

  document.addEventListener("DOMContentLoaded", () => {
    const programs = typeof LAB_PROGRAMS !== "undefined" ? LAB_PROGRAMS : [];
    const groups = groupByTech(programs);

    // Update stats
    const statProg = qs("#stat-programs");
    const statTech = qs("#stat-techs");
    if (statProg) statProg.textContent = programs.length;
    if (statTech) statTech.textContent = TECH_ORDER.filter(t => groups[t].length > 0).length;

    renderTabs(groups);
    renderProgramPanels(groups);

    initTabSwitching();
    initCodeToggle();
    initCopyCode();
    initAccordion();
    initSearch();
    initScrollTop();
    initBootScreen();

    // Reveal first panel's cards
    const firstPanel = qs(".lab-tabpanel:not([hidden])");
    if (firstPanel) revealCards(firstPanel);

    /* Aba inicial = Referência Rápida: o handler do i18n.js corre a seguir no mesmo
       DOMContentLoaded e chama refreshLabReferenceTables; em alguns browsers o foco
       ou o estado visual podem ficar na primeira aba técnica. Reaplica a aba Ref
       depois de toda a pilha síncrona (incl. applyLang). */
    setTimeout(() => {
      const refBtn = qs("#tab-ref");
      if (
        typeof LAB_REFERENCE !== "undefined" &&
        refBtn &&
        qs("#panel-ref")
      ) {
        activateTab(refBtn);
        if (typeof refBtn.focus === "function") {
          try {
            refBtn.focus({ preventScroll: true });
          } catch (e) {
            refBtn.focus();
          }
        }
      }
    }, 0);
  });

})();
