import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERLAYS } from "./lab-ref-overlays.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const payload = JSON.stringify(OVERLAYS);
const src =
  "/* Auto-generated from scripts/lab-ref-overlays.mjs — run: node scripts/emit-lab-reference-i18n.mjs */\n" +
  '(function (global) {\n  "use strict";\n  global.LAB_REFERENCE_I18N = ' +
  payload +
  ";\n})(typeof window !== \"undefined\" ? window : global);\n";

fs.writeFileSync(path.join(__dirname, "../js/lab-reference-i18n.js"), src, "utf8");
console.log("Wrote js/lab-reference-i18n.js (" + payload.length + " bytes JSON)");
