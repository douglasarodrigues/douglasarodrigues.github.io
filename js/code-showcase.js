/**
 * Code Showcase module — tabs, syntax highlighting, copy-to-clipboard.
 * Lightweight custom syntax highlighting for mainframe languages.
 */
const CodeShowcase = (() => {
  const highlighters = {
    cobol: tokenizeCobol,
    hlasm: tokenizeHlasm,
    jcl: tokenizeJcl,
    sql: tokenizeSql
  };

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function wrapToken(text, type) {
    return `<span class="token--${type}">${escapeHtml(text)}</span>`;
  }

  function tokenizeCobol(code) {
    return escapeHtml(code)
      .replace(/\b(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE|DIVISION|SECTION|WORKING-STORAGE|LINKAGE|FILE|COPY|PERFORM|EVALUATE|WHEN|IF|ELSE|END-IF|END-EVALUATE|END-PERFORM|MOVE|TO|DISPLAY|STOP\s+RUN|OPEN|CLOSE|READ|WRITE|EXEC\s+SQL|END-EXEC)\b/g,
        '<span class="token--keyword">$1</span>')
      .replace(/^(\s{6}\*.*)/gm,
        '<span class="token--comment">$1</span>')
      .replace(/(PIC\s+[^\s.]+)/g,
        '<span class="token--type">$1</span>');
  }

  function tokenizeHlasm(code) {
    return escapeHtml(code)
      .replace(/\b(CSECT|DSECT|USING|DROP|ENTRY|END|EQU|DC|DS|LTORG)\b/g,
        '<span class="token--keyword">$1</span>')
      .replace(/\b(STM|LM|ST|L|LA|LR|BALR|BAL|BR|BCR|STMG|LMG|STG|LG|LGR|LARL|BRASL|BASR)\b/g,
        '<span class="token--instruction">$1</span>')
      .replace(/\b(WTO|OPEN|CLOSE|GET|PUT|RETURN|SAVE)\b/g,
        '<span class="token--macro">$1</span>')
      .replace(/^(\*.*)/gm,
        '<span class="token--comment">$1</span>')
      .replace(/\b(R[0-9]|R1[0-5])\b/g,
        '<span class="token--register">$1</span>');
  }

  function tokenizeJcl(code) {
    return escapeHtml(code)
      .replace(/^(\/\/[A-Z0-9#$@]+\s)/gm,
        '<span class="token--label">$1</span>')
      .replace(/\b(JOB|EXEC|DD|PROC|PEND|SET|IF|THEN|ELSE|ENDIF)\b/g,
        '<span class="token--keyword">$1</span>')
      .replace(/\b(PGM|DSN|DISP|SPACE|DCB|SYSOUT|REGION|COND|CLASS)\b/g,
        '<span class="token--param">$1</span>')
      .replace(/^(\/\/\*.*)/gm,
        '<span class="token--comment">$1</span>');
  }

  function tokenizeSql(code) {
    return escapeHtml(code)
      .replace(/\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|DROP|ALTER|JOIN|LEFT|RIGHT|INNER|ON|AND|OR|NOT|IN|BETWEEN|LIKE|ORDER\s+BY|GROUP\s+BY|HAVING|COUNT|SUM|AVG|MAX|MIN|AS|DISTINCT|UNION)\b/gi,
        (match) => `<span class="token--keyword">${match}</span>`)
      .replace(/(--.*)/g,
        '<span class="token--comment">$1</span>')
      .replace(/('[^']*')/g,
        '<span class="token--string">$1</span>');
  }

  function highlight(codeElement) {
    const language = codeElement.dataset.language;
    const strategy = highlighters[language];
    if (!strategy) return;

    const raw = codeElement.textContent;
    codeElement.innerHTML = strategy(raw);
  }

  function handleCopyButtons() {
    document.querySelectorAll('[data-copy-code]').forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.copyCode;
        const codeBlock = document.getElementById(targetId);
        if (!codeBlock) return;

        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          const original = button.textContent;
          button.textContent = 'Copiado!';
          setTimeout(() => { button.textContent = original; }, 2000);
        });
      });
    });
  }

  function handleTabs() {
    document.querySelectorAll('[data-tab-group]').forEach(group => {
      const tabs = group.querySelectorAll('[data-tab]');
      const panels = group.querySelectorAll('[data-tab-panel]');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;

          tabs.forEach(t => t.classList.toggle('is-active', t === tab));
          panels.forEach(p => {
            p.hidden = p.dataset.tabPanel !== target;
          });
        });
      });
    });
  }

  function init() {
    document.querySelectorAll('code[data-language]').forEach(highlight);
    handleCopyButtons();
    handleTabs();
  }

  return { init };
})();

export default CodeShowcase;
