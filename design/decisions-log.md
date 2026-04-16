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

---

*Novas decisoes devem ser adicionadas acima desta linha seguindo o formato ADR.*
