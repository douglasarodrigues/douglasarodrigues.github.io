# Diretrizes de UX/UI

> Este documento deve ser preenchido pelo Agente Psicologo UX/UI.
> Contem as especificacoes visuais e emocionais que guiam todo o Squad Frontend.

## Publico-Alvo

1. **Headhunters/Recrutadores de TI** — Pouco tempo, buscam sinais rapidos de senioridade
2. **Tech Leads/Gestores** — Avaliam competencia tecnica real
3. **Colegas de area / Curiosos** — Querem aprender e se inspirar

## Emocoes-Alvo por Secao

| Secao | Emocao Desejada | Proposito |
|-------|-----------------|-----------|
| Hero | Impacto, confianca | Capturar atencao em 3-7 segundos |
| Sobre | Conexao, humanidade | Criar empatia e identificacao |
| Skills | Respeito, credibilidade | Provar profundidade tecnica |
| Showcases | Admiracao, curiosidade | Demonstrar maestria com codigo real |
| Experiencia | Confianca, solidez | Timeline de carreira consistente |
| Contato | Acessibilidade | Call-to-action natural e nao invasivo |

## Hero — Retrato (elemento dominante da pagina)

**Proposito emocional:** impacto imediato, confianca e presenca profissional.

O rosto humano e o estimulo visual mais poderoso que o cerebro processa — ativa a area fusiforme facial em <170ms. Num portfolio profissional, o retrato deve ser o **primeiro e maior** elemento que o visitante ve. Headhunters decidem em 3-7 segundos; um rosto claro, grande e bem enquadrado comunica "este profissional e real, acessivel e confiante".

**Hierarquia visual:** (1) rosto no avatar circular, (2) nome, (3) headline, (4) status e bio.

### Analise da foto original (`perfil-favorito.jpg`)

| Zona da imagem | Conteudo | % vertical aprox. |
|----------------|----------|-------------------|
| Topo (~0-10%) | Cabelo + testa | Inicio do rosto |
| Centro-alto (~10-35%) | Olhos, nariz, sorriso | **Zona focal ideal** |
| Centro (~35-55%) | Ombros + peito (polo preto) | Contexto profissional |
| Inferior (~55-100%) | Bracos cruzados, mesa, copos | Ruido — deve ser cortado |

### Decisoes de enquadramento (Calibracao 2 — dominancia real)

> **Historico:** a calibracao inicial (`clamp(10rem, 38vw, 14rem)` = 160-224px) ficou timida.
> O retrato ocupava ~46% do container e nao funcionava como ancora visual dominante.
> Em mobile 320px, os 38vw entregavam apenas 122px — muito menor que o recomendado
> para ativar a area fusiforme facial com impacto em <170ms.

- **Tamanho:** `--avatar-size: clamp(14rem, 64vw, 22rem)` (224-352px).
  - Mobile 320px: 64vw = 205px (ainda legivel, floor em 14rem/224px).
  - Mobile 425px: 64vw = 272px.
  - Desktop container 480px: teto 22rem = 352px (**73% do container**).
  - Justificativa: em portfolios profissionais (Stripe Teams, Linear, Vercel About),
    hero photos dominantes ficam entre 280-360px. Abaixo disso, parece "avatar de chat".

- **Crop vertical:** `--avatar-object-position: center 20%`.
  Com `object-fit: cover` num quadrado, a imagem retrato e cortada vertical. `center 20%` posiciona a janela visivel na zona olhos/sorriso, eliminando bracos e mesa. Resultado: rosto + topo dos ombros.

- **Anel gradiente:** 4px (proporcional ao tamanho maior) — moldura premium que separa a foto do fundo escuro.

- **Gap interno:** 4px entre anel e foto — respira visualmente no tamanho maior.

- **Glow:** raios 48-96px normal / 64-120px hover — aureola que magnetiza o olhar sem competir com o conteudo abaixo.

- **Filtros de imagem:**
  - Normal: `brightness(1.06) contrast(1.04) saturate(1.05)` — compensa fundo escuro, realca tons de pele.
  - Hover: `brightness(1.10) contrast(1.06) saturate(1.08)` — feedback visual sutil.

- **Hover scale:** 1.03 (em retrato grande, escalas acima de 1.05 parecem inquietas).

- **Espacamento apos o avatar:** `.avatar-wrapper { margin-block-end: var(--space-2) }` + `profile-header { gap: var(--space-6) }` = respiro visual para o nome nao encostar no anel gradiente.

### Como ajustar se o crop nao parecer ideal

Editar APENAS em `css/tokens.css`:

| Problema | Solucao |
|----------|---------|
| Rosto cortado em cima (testa) | Aumentar para `center 25%` ou `center 28%` |
| Mostrando ombro demais | Diminuir para `center 15%` ou `center 18%` |
| Rosto descentralizado na horizontal | Mudar primeiro valor: `48% 20%` ou `52% 20%` |

**Microinteracoes:** hover suave (escala 1.04 + glow ampliado).

---

## Principios Gerais

- [x] Definir paleta de cores (ver `color-palette.md`)
- [x] Definir tipografia (ver `typography.md`)
- [ ] Definir espacamento e grid
- [ ] Definir microinteracoes por secao
- [x] Definir hierarquia visual (o que o olho ve primeiro)

---

*Preencher com especificacoes detalhadas conforme o Agente Psicologo UX atuar.*
