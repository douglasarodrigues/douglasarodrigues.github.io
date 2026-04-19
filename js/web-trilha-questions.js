// eslint-disable-next-line no-unused-vars
const WEB_TRILHA_QUESTIONS = {
  "cap-01": [
    {
      "stem": "No index.html da raiz, qual elemento envolve o conteúdo principal acessível pelo skip-link?",
      "options": [
        "<header>",
        "<main id=\"main-content\">",
        "<div class=\"container\">",
        "<body>"
      ],
      "correctIndex": 1,
      "explanation": "O skip-link aponta para #main-content — é o <main>."
    },
    {
      "stem": "O JSON-LD no <head> do index declara principalmente:",
      "options": [
        "Um servidor",
        "ProfilePage / Person (schema.org)",
        "Um formulário",
        "CSS"
      ],
      "correctIndex": 1,
      "explanation": "ld+json descreve a página e a pessoa para buscadores."
    },
    {
      "stem": "Atributo defer em <script> significa:",
      "options": [
        "Bloquear HTML",
        "Executar após parse do DOM, sem bloquear renderização",
        "Desativar JS",
        "Só mobile"
      ],
      "correctIndex": 1,
      "explanation": "defer adia execução até o documento estar parseado."
    },
    {
      "stem": "Qual arquivo define tokens (--variáveis) primeiro na cascata?",
      "options": [
        "style.css",
        "tokens.css",
        "estudos.css",
        "script.js"
      ],
      "correctIndex": 1,
      "explanation": "tokens.css vem antes de style.css nos <link>."
    }
  ],
  "cap-02": [
    {
      "stem": "Variáveis em :root têm escopo:",
      "options": [
        "Só no primeiro filho",
        "Global no documento (salvo sobrescrita)",
        "Só em @import",
        "Só inline"
      ],
      "correctIndex": 1,
      "explanation": ":root é o elemento raiz; --* propagam na cascata."
    },
    {
      "stem": "Analogia: --color-primary é como:",
      "options": [
        "goto",
        "constante / config global",
        "stack overflow",
        "pointer nulo"
      ],
      "correctIndex": 1,
      "explanation": "Um valor central usado com var(--color-primary)."
    },
    {
      "stem": "Uso correto de token:",
      "options": [
        "color: $primary;",
        "color: var(--color-primary);",
        "color: primary();",
        "color: @primary"
      ],
      "correctIndex": 1,
      "explanation": "Sintaxe var(--nome)."
    },
    {
      "stem": "Ordem dos <link rel=stylesheet> importa porque:",
      "options": [
        "Ignora o 2º",
        "Cascata e especificidade",
        "CSS não empilha",
        "Só print"
      ],
      "correctIndex": 1,
      "explanation": "Regras posteriores podem sobrescrever anteriores."
    }
  ],
  "cap-03": [
    {
      "stem": ".link-card no CSS aplica a:",
      "options": [
        "id=link-card",
        "class=\"link-card\" no HTML",
        "tag <link>",
        "comentários"
      ],
      "correctIndex": 1,
      "explanation": "Seletor de classe corresponde ao atributo class."
    },
    {
      "stem": "Cascata resolve conflitos com:",
      "options": [
        "Só ordem alfabética",
        "origem, especificidade e ordem",
        "sorte",
        "tamanho do arquivo"
      ],
      "correctIndex": 1,
      "explanation": "Modelo de cascata do CSS."
    },
    {
      "stem": "@media (min-width: ...) serve para:",
      "options": [
        "Desligar CSS",
        "estilos responsivos por largura",
        "SQL",
        "JCL"
      ],
      "correctIndex": 1,
      "explanation": "Breakpoints ajustam layout por viewport."
    },
    {
      "stem": "Efeito \"glass\" usa tipicamente:",
      "options": [
        "#fff sólido",
        "transparência + blur + borda",
        "iframe",
        "canvas obrigatório"
      ],
      "correctIndex": 1,
      "explanation": "backdrop-filter e fundo translúcido."
    }
  ],
  "cap-04": [
    {
      "stem": "script.js executa em:",
      "options": [
        "z/OS",
        "navegador do visitante",
        "DB2",
        "somente build"
      ],
      "correctIndex": 1,
      "explanation": "JavaScript front-end roda no cliente."
    },
    {
      "stem": "Canvas 2D: contexto obtido com",
      "options": [
        "getContext('2d')",
        "EXEC SQL",
        "OPEN FILE",
        "LOAD PAR"
      ],
      "correctIndex": 0,
      "explanation": "API Canvas padrão."
    },
    {
      "stem": "DOMContentLoaded indica:",
      "options": [
        "DOM pronto para scripts manipularem",
        "fim de vídeo",
        "CSS carregado 100%",
        "erro"
      ],
      "correctIndex": 0,
      "explanation": "HTML parseado; árvore disponível."
    },
    {
      "stem": "localStorage persiste:",
      "options": [
        "no servidor",
        "no navegador por origem",
        "em cookie HTTP sempre",
        "no Git"
      ],
      "correctIndex": 1,
      "explanation": "Storage Web API local ao origin."
    }
  ],
  "cap-05": [
    {
      "stem": "Objeto `en` no i18n.js é:",
      "options": [
        "tabela DB2",
        "mapa chave → texto",
        "bytecode",
        "JCL"
      ],
      "correctIndex": 1,
      "explanation": "Dicionário de traduções."
    },
    {
      "stem": "Alterar document.documentElement.lang serve para:",
      "options": [
        "bug",
        "idioma do doc (leitores de tela / SEO)",
        "desligar CSS",
        "pixels"
      ],
      "correctIndex": 1,
      "explanation": "Alinha lang ao idioma ativo."
    },
    {
      "stem": "Elementos traduzidos são marcados com:",
      "options": [
        "data-i18n",
        "data-abend",
        "class=SQL",
        "id=DD"
      ],
      "correctIndex": 0,
      "explanation": "data-i18n guarda a chave."
    },
    {
      "stem": "Ao voltar para pt-BR, o texto original vem de:",
      "options": [
        "servidor",
        "cache Map em memória (originals)",
        "sessionStorage obrigatório",
        "COBOL"
      ],
      "correctIndex": 1,
      "explanation": "i18n guarda HTML inicial para restaurar."
    }
  ]
};
