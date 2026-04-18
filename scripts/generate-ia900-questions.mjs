/**
 * Gera js/ia900-questions.js — 250 itens de pratica (conteudo original).
 * node scripts/generate-ia900-questions.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  poolWorkloadTransparency,
  poolAzureMl40,
  poolVision40,
  poolNlp40,
  poolConversational35,
  poolExtension50,
} from "./ia900-pools.mjs";
import { expandOfficialStyleStem } from "./ia900-stem-expand.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "js", "ia900-questions.js");

function shuffleOptions(stem, options, correctIndex, explanation, id, domain) {
  const idxs = [0, 1, 2, 3];
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  const newOpts = idxs.map((i) => options[i]);
  const newCorrect = idxs.indexOf(correctIndex);
  return {
    id,
    domain,
    stem,
    options: newOpts,
    correctIndex: newCorrect,
    explanation,
  };
}

/** @type {{stem:string,correctIndex:number,options:[string,string,string,string],explanation:string,domain:string}[]} */
const raw = [];

function add(domain, stem, correctIndex, options, explanation) {
  raw.push({ domain, stem, correctIndex, options, explanation });
}

function pushPool(items) {
  for (const x of items) {
    add(x.domain, x.stem, x.correctIndex, x.options, x.explanation);
  }
}

// --- Conteudo por dominio (revisao pedagogica — enunciados distintos) ---

// Workload / fundamentos IA (40)
const wl = [
  [
    "Qual alternativa descreve melhor **aprendizado supervisionado**?",
    0,
    [
      "Treinar com entradas e rotulos conhecidos para aprender o mapeamento.",
      "Treinar apenas com entradas sem rotulos para descobrir grupos.",
      "Otimizar politicas apenas com simulacao fisica sem dados historicos.",
      "Reduzir dimensionalidade sem criterio de erro supervisionado.",
    ],
    "Supervisionado usa pares (entrada, rotulo) durante o treino.",
  ],
  [
    "Qual problema e mais associado a **regressao**?",
    0,
    [
      "Prever o valor numerico de uma casa com base em atributos.",
      "Decidir se uma imagem contem um gato ou um cao.",
      "Dividir clientes em tres grupos sem rotulos predefinidos.",
      "Descobrir topicos principais em uma colecao de documentos sem classes.",
    ],
    "Regressao estima quantidade continua; classificacao usa categorias.",
  ],
  [
    "O que e **clustering**?",
    0,
    [
      "Agrupar dados sem rotulos com base em similaridade.",
      "Rotular imagens com classes fornecidas por um especialista.",
      "Prever a probabilidade de churn com historico de saidas.",
      "Traduzir frases entre idiomas com pares alinhados.",
    ],
    "Clustering e nao supervisionado: grupos emergem dos dados.",
  ],
  [
    "Qual cenario ilustra **deteccao de anomalias**?",
    0,
    [
      "Alertar quando uma transacao difere fortemente do padrao da conta.",
      "Classificar digitos manuscritos em 10 classes.",
      "Recomendar filmes com base em avaliacoes de usuarios.",
      "Segmentar mercado em clusters para campanhas.",
    ],
    "Anomalias destoam do comportamento normal esperado ou aprendido.",
  ],
  [
    "Em frameworks de IA responsavel, o pilar de **accountability** (responsabilizacao) enfatiza:",
    0,
    [
      "Clareza sobre quem responde pelos efeitos do sistema em producao e vias de correcao.",
      "Usar sempre o maior numero possivel de camadas neurais.",
      "Evitar documentacao para agilizar releases.",
      "Substituir testes por uma unica amostra aleatoria.",
    ],
    "Accountability liga governanca, papel humano e consequencias do uso do sistema.",
  ],
  [
    "Qual e um exemplo de **carga de trabalho de processamento de linguagem natural**?",
    0,
    [
      "Extrair entidades nomeadas de contratos em texto livre.",
      "Detectar objetos em imagens de seguranca.",
      "Prever vendas mensais em serie temporal.",
      "Agrupar sensores IoT por proximidade geografica.",
    ],
    "NLP trabalha com texto ou fala transcrita; entidades sao um caso tipico.",
  ],
  [
    "Qual afirmacao sobre **rotulagem** esta mais correta?",
    0,
    [
      "Dados rotulados sao necessarios para muitos modelos supervisionados.",
      "Modelos supervisionados nunca precisam de rotulos.",
      "Clustering exige rotulos para cada ponto antes do treino.",
      "Rotulos sao irrelevantes para medir acuracia.",
    ],
    "Supervisionado aprende de exemplos com saida conhecida.",
  ],
  [
    "O que caracteriza **aprendizado por reforco**?",
    0,
    [
      "Um agente aprende acoes com base em recompensas e penalidades.",
      "Um modelo agrupa pixels apenas por cor sem feedback.",
      "Um algoritmo minimiza apenas a variancia intra-cluster.",
      "Um sistema traduz texto sem nenhum sinal de qualidade.",
    ],
    "Reforco usa sinais de recompensa para moldar a politica do agente.",
  ],
  [
    "Qual e um objetivo tipico de **sumarizacao automatica**?",
    0,
    [
      "Produzir um texto mais curto preservando ideias principais.",
      "Rotular cada pixel de uma imagem medica.",
      "Calcular a rota mais curta em um mapa rodoviario.",
      "Detectar placas em video sem contexto linguistico.",
    ],
    "Sumarizacao comprime informacao textual mantendo o sentido central.",
  ],
  [
    "O que significa **viés (bias)** indesejado em um modelo?",
    0,
    [
      "Erros sistematicos que prejudicam grupos ou cenarios especificos.",
      "Uso obrigatorio de GPUs em treinamento.",
      "Ter alta acuracia em dados de teste.",
      "Escolher funcao de ativacao ReLU em redes profundas.",
    ],
    "Vies injusto viola o pilar de equidade em IA responsavel.",
  ],
];

wl.forEach((row) => add("workload", row[0], row[1], row[2], row[3]));

pushPool(poolWorkloadTransparency());

// ML no Azure / conceitos (45)
const mlz = [
  [
    "Qual componente do **Azure Machine Learning** armazena experimentos, computacao e artefatos de forma centralizada?",
    0,
    [
      "Workspace.",
      "Apenas uma conta de armazenamento sem metadata de ML.",
      "Somente Azure DevOps sem integracao com dados.",
      "Apenas Azure DNS.",
    ],
    "O workspace e o hub de projetos de Azure ML.",
  ],
  [
    "O **Azure Machine Learning designer** permite principalmente:",
    0,
    [
      "Construir pipelines de ML de forma visual.",
      "Gerenciar apenas maquinas virtuais Linux sem ML.",
      "Editar codigo COBOL em mainframe.",
      "Configurar apenas firewalls de rede.",
    ],
    "O designer e um fluxo visual para treino e implantacao.",
  ],
  [
    "O que o **Automated ML** automatiza em grande parte?",
    0,
    [
      "Selecao de algoritmos e hiperparametros dentro de limites definidos.",
      "A coleta fisica de dados em sensores sem conectividade.",
      "A aprovacao legal de contratos corporativos.",
      "A instalacao de sistemas operacionais em desktops.",
    ],
    "AutoML busca modelos e hiperparametros com objetivo e metrica definidos.",
  ],
  [
    "Qual metrica e comum em problemas de **classificacao binaria**?",
    0,
    [
      "AUC-ROC.",
      "Silhueta (silhouette) para clustering.",
      "Erro quadratico medio exclusivamente.",
      "Perplexidade de linguagem apenas.",
    ],
    "AUC resume trade-off entre verdadeiros positivos e falsos positivos.",
  ],
  [
    "Em validacao, **overfitting** ocorre quando:",
    0,
    [
      "O modelo memoriza o treino e falha em dados novos.",
      "O modelo e simples demais para os dados.",
      "Os dados de teste sao identicos aos de treino por engano.",
      "Ha poucos rotulos apenas em producao.",
    ],
    "Overfitting ajusta ruido do treino e generaliza mal.",
  ],
];

mlz.forEach((row) => add("azure_ml", row[0], row[1], row[2], row[3]));

pushPool(poolAzureMl40());
pushPool(poolVision40());
pushPool(poolNlp40());
pushPool(poolConversational35());
pushPool(poolExtension50());

if (raw.length !== 250) {
  console.error("Esperado 250 questoes, obtido:", raw.length);
  process.exit(1);
}

const bank = [];
let id = 1;
for (const r of raw.slice(0, 250)) {
  const stem = expandOfficialStyleStem(r.domain, r.stem, id);
  bank.push(
    shuffleOptions(
      stem,
      r.options,
      r.correctIndex,
      r.explanation,
      id,
      r.domain,
    ),
  );
  id++;
}

const header = `/* Gerado por scripts/generate-ia900-questions.mjs — banco de pratica independente. */
(function (global) {
  "use strict";
  global.IA900_QUESTION_BANK = `;

const footer = `;
})(typeof window !== "undefined" ? window : globalThis);
`;

fs.writeFileSync(
  outPath,
  header + JSON.stringify(bank, null, 2).replace(/</g, "\\u003c") + footer,
  "utf8",
);
console.log("Wrote", bank.length, "questions to", outPath);
