# Guia Completo de Desenvolvimento - Portfólio Douglas Assumpção Rodrigues

Elaborado por Douglas Assumpção Rodrigues

## PARTE 3 - VISÃO GERAL E ESTRUTURA DO PROJETO

### 3.1 O que é este projeto

Um portfólio profissional estilo LinkTree, focado em um desenvolvedor Mainframe sênior. O site possui:

- Página principal (`index.html`) — estilo link-tree com avatar, bio, links de contato e skills
- Mainframe lab (`mainframe-lab.html`) — vitrine de 18 programas mainframe organizados por tecnologia com viewer de código
- Currículo (`curriculo.html`) — página single-page do CV profissional
- Certificações (`certificacoes.html`) — cards com certificações profissionais
- Internacionalização (`i18n.js`) — suporte a `pt-BR` (padrão), `EN` e `ES`

### 3.2 Stack tecnológica

- Linguagem: HTML5, CSS3, JavaScript ES2020+ (Vanilla)
- Fontes: Google Fonts — Inter (body) e Space Grotesk (headings)
- Dependências externas: ZERO — nenhum framework, nenhuma biblioteca
- Ícones: SVG inline (Feather Icons style)
- Build: Nenhuma — arquivos servidos diretamente
- Server local: Live Server (VS Code) ou `python -m http.server 8080`

### 3.3 Estrutura de diretórios

O site estático fica na **raiz do repositório** (compatível com GitHub Pages em `/`).

```
Portifólio/
├── index.html                # Página principal (LinkTree)
├── mainframe-lab.html        # Vitrine dos programas Mainframe
├── curriculo.html            # Currículo profissional
├── certificacoes.html        # Certificações
├── favicon.svg
├── css/
│   ├── tokens.css            # Design tokens (variáveis CSS)
│   ├── style.css             # Estilos globais + index
│   ├── mainframe-lab.css     # Estilos do Lab (tokens + componentes)
│   ├── mainframe-lab-boot.css# Boot screen do Lab
│   ├── mainframe-lab-reference.css # Tabelas de referência do Lab
│   ├── certificacoes.css     # Estilos das certificações
│   └── curriculo.css         # Estilos do currículo
├── js/
│   ├── script.js             # JS da página principal
│   ├── i18n.js               # Internacionalização
│   └── ...                   # Demais módulos
├── assets/
│   ├── images/               # Imagens (ex.: profile.jpg)
│   └── fonts/
├── mainframe/                # Artefatos mainframe (showcase / referência)
└── design/                   # Diretrizes UX e decisões
```

### 3.4 Ordem de carregamento CSS (TODAS as páginas)

Toda página utiliza uma ordem de carregamento CSS consistente para garantir que:

- os tokens de design sejam aplicados primeiro
- os estilos globais sejam carregados em seguida
- os estilos específicos de cada página sejam aplicados por último
