/**
 * Reordena categorias em js/lab-reference.js, remove SQL duplicado "100" (mantém +100),
 * regrava o ficheiro preservando cabeçalho/footer.
 * Executar: node scripts/rebuild-lab-reference-order.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../js/lab-reference.js");

let src = fs.readFileSync(filePath, "utf8");
const parts = src.split("/* Expõe no window");
const tail = parts.length > 1 ? "/* Expõe no window" + parts[1] : "";
let core = parts[0].trimEnd();

if (!core.endsWith("};")) {
  console.error("Ficheiro inesperado: não termina com };");
  process.exit(1);
}

// Evitar ASI: `return` + newline + `{` vira `return;` e o literal vira bloco → undefined.
const assign = "const LAB_REFERENCE = ";
const assignAt = core.indexOf(assign);
if (assignAt < 0) {
  console.error("Ficheiro inesperado: falta", assign);
  process.exit(1);
}
core = core.slice(assignAt + assign.length).trimStart();
if (!core.endsWith(";")) {
  console.error("Ficheiro inesperado: literal não termina com ;");
  process.exit(1);
}
core = core.slice(0, -1); // remove `;` final do statement
const LAB_REFERENCE = new Function(`return (${core});`)();

/* SQL: remover 100 (duplicado de +100) */
LAB_REFERENCE.sqlcodes = LAB_REFERENCE.sqlcodes.filter((e) => e.code !== "100");

const p100 = LAB_REFERENCE.sqlcodes.find((e) => e.code === "+100");
if (p100) {
  p100.meaning =
    "Registro não encontrado ou fim do cursor (SQLCODE +100; em alguns relatórios aparece como 100 sem sinal)";
  if (p100.diagnostic && p100.diagnostic.tip) {
    p100.diagnostic.tip =
      p100.diagnostic.tip +
      " SQLCODE 100 sem '+' é o mesmo estado que +100 — use IF SQLCODE = +100 ou = 100 conforme o compilador.";
  }
}

function sqlSortKey(c) {
  if (c === "0") return 0;
  if (c.startsWith("+")) return parseInt(c.slice(1), 10);
  if (c.startsWith("-")) return parseInt(c, 10);
  return parseInt(c, 10);
}

LAB_REFERENCE.sqlcodes.sort(
  (a, b) => sqlSortKey(a.code) - sqlSortKey(b.code),
);

LAB_REFERENCE.fileStatus.sort((a, b) =>
  a.code.localeCompare(b.code, undefined, { numeric: true }),
);

LAB_REFERENCE.abendCodes.sort((a, b) =>
  a.code.localeCompare(b.code, undefined, { sensitivity: "base" }),
);

LAB_REFERENCE.eibresp.sort((a, b) => a.code.localeCompare(b.code));

const jsonBody = JSON.stringify(LAB_REFERENCE, null, 2);

const out =
  `/* ==========================================================================
   LAB-REFERENCE.JS - Dados de Referência Rápida do Mainframe Lab
   File-Status COBOL, Abend Codes z/OS, SQLCODE DB2, EIBRESP CICS, JCL Tips
   Categorias numéricas: ordenação — File-Status e Abend alfabética por código;
   SQLCODE por valor numérico assinado; EIBRESP alfabética por nome.
   ========================================================================== */

// eslint-disable-next-line no-unused-vars
const LAB_REFERENCE = ` +
  jsonBody +
  `;

` +
  tail;

fs.writeFileSync(filePath, out, "utf8");
console.log(
  "OK:",
  filePath,
  "sqlcodes:",
  LAB_REFERENCE.sqlcodes.length,
  "fileStatus:",
  LAB_REFERENCE.fileStatus.length,
);
