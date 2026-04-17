# Registro de Decisoes Arquiteturais

Este documento e mantido pelo Agente Arquiteto de Agentes. Registra todas as decisoes relevantes sobre a arquitetura do sistema de agentes e do portfolio.

---

## ADR-001: Sistema de Agentes como Cursor Rules

**Data**: 2026-04-15
**Status**: Aceita
**Contexto**: Necessidade de um sistema de agentes especializados para construir o portfolio mainframe.
**Decisao**: Implementar cada agente como um Cursor Rule (`.mdc`) com ativacao por glob pattern.
**Consequencias**: Agentes sao ativados automaticamente pelo contexto de arquivo, sem necessidade de invocacao manual.

## ADR-002: Organizacao em 3 Squads

**Data**: 2026-04-15
**Status**: Aceita
**Contexto**: 11 agentes precisam de organizacao hierarquica clara.
**Decisao**: Organizar em Governanca (2), Frontend (4) e Mainframe (5).
**Consequencias**: Fluxo de trabalho previsivel com dependencias claras entre squads.

## ADR-003: Recalibracao do Avatar Hero (Calibracao 2)

**Data**: 2026-04-16
**Status**: Aceita
**Contexto**: Apos a primeira implementacao (`clamp(10rem, 38vw, 14rem)` = 160-224px), o
usuario reportou que o retrato estava "extremamente pequeno, nao obedecendo o conselho
do psicologo UX". A diretriz original dizia "elemento dominante da pagina", mas 46% do
container nao ativa o impacto de <170ms necessario para headhunters.
**Decisao**: Aumentar para `clamp(14rem, 64vw, 22rem)` (224-352px) — 73% do container
no desktop. Anel 4px, gap 4px, glow 48-96px, hover scale 1.03. Adicionar `.avatar-wrapper`
com `margin-block-end: var(--space-2)` para respiro.
**Consequencias**: Retrato agora funciona como ancora visual real. Atualizadas as
diretrizes em `design/ux-guidelines.md` com justificativa comparativa (Stripe Teams,
Linear, Vercel About usam 280-360px para hero photos).

---

*Novas decisoes devem ser adicionadas acima desta linha seguindo o formato ADR.*
