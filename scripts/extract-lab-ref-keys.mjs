import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../js/lab-reference.js");
const s = fs.readFileSync(filePath, "utf8");

function unescapeJsString(inner) {
  return JSON.parse('"' + inner.replace(/\r\n/g, "\n") + '"');
}

const rowRe =
  /code:\s*"([^"]+)"[\s\S]*?meaning:\s*"((?:\\.|[^"\\])*)"[\s\S]*?action:\s*"((?:\\.|[^"\\])*)"/g;

const bySection = {
  fileStatus: [],
  abendCodes: [],
  sqlcodes: [],
  eibresp: [],
};

const markers = [
  { name: "fileStatus", start: /CATEGORY 1 — FILE-STATUS/ },
  { name: "abendCodes", start: /CATEGORY 2 — ABEND/ },
  { name: "sqlcodes", start: /CATEGORY 3 — SQLCODE/ },
  { name: "eibresp", start: /CATEGORY 4 — EIBRESP/ },
];

function sectionForIndex(pos) {
  let sec = "fileStatus";
  for (let i = 1; i < markers.length; i++) {
    const idx = s.search(markers[i].start);
    if (idx >= 0 && pos >= idx) sec = markers[i].name;
  }
  return sec;
}

let m;
while ((m = rowRe.exec(s))) {
  const pos = m.index;
  const sec = sectionForIndex(pos);
  bySection[sec].push({
    code: m[1],
    meaning: unescapeJsString(m[2]),
    action: unescapeJsString(m[3]),
  });
}

const total =
  bySection.fileStatus.length +
  bySection.abendCodes.length +
  bySection.sqlcodes.length +
  bySection.eibresp.length;

console.log(JSON.stringify({ counts: Object.fromEntries(Object.entries(bySection).map(([k, v]) => [k, v.length])), total }, null, 2));

const outPath = path.join(__dirname, "lab-ref-pt-extracted.json");
fs.writeFileSync(outPath, JSON.stringify(bySection, null, 2), "utf8");
console.log("wrote", outPath);
