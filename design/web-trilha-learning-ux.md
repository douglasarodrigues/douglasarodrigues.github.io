# Trilha Web do portfólio — experiência de aprendizagem (UX)

Especificação para a trilha `estudos/web/`: leitor com base em POO e programação estruturada, iniciante em HTML/CSS/JS, usando o **código real deste repositório** como texto didático.

## Propósito emocional

- **Segurança cognitiva**: o aluno reconhece o próprio projeto; reduz ansiedade de “teoria abstrata”.
- **Recompensa frequente**: cada capítulo termina com um check-in curto — sensação de progresso.
- **Curiosidade técnica**: microinterações (quiz) levam a reabrir o arquivo citado no VS Code ou no GitHub.

## Hierarquia visual (por capítulo)

1. Título do capítulo e navegação (anterior / hub / próximo).
2. Blocos curtos de texto (2–4 parágrafos ou lista) antes de qualquer exercício.
3. Diagrama Mermaid ou lista quando ajudar (não substituir o texto).
4. Secção **Check-in** ao final: título claro, número limitado de questões (3–5).

## Princípios de retenção

- **Carga cognitiva**: no máximo uma ideia nova por bloco; evitar parede de texto antes do check-in.
- **Recuperação ativa**: perguntas que exigem lembrar *onde* no repo (arquivo/caminho), não só copiar definição.
- **Feedback imediato**: após escolher alternativa, mostrar correto/incorreto e uma frase de explicação ligada ao arquivo real.
- **Ritmo**: 3–5 questões por capítulo; sem timer na v1 (reduz pressão desnecessária).

## Formato do check-in

- Predominantemente **múltipla escolha** (4 alternativas), alinhado a `js/web-trilha-questions.js`.
- Distratores plausíveis (ex.: confundir `tokens.css` com `style.css`).
- Opcional futuro: ordenar passos (carregamento de assets); manter fora do escopo mínimo se atrasar release.

## Acessibilidade

- Pergunta com `aria-labelledby`; opções em botões ou radios com rótulo associado.
- Foco visível após feedback; não depender só de cor para certo/errado (ícone ou texto).

## Métricas de sucesso (qualitativas)

- Leitor consegue abrir `index.html` e apontar o papel de `<main>` e de um `<link rel="stylesheet">`.
- Leitor explica em uma frase o que é uma variável CSS em `:root` neste projeto.

## Co-criação (Psicólogo UX + expert-educacao-tech)

Alterações de ritmo (número de questões, presença de diagrama, tom) devem ser decididas em conjunto com o agente de **educação em tecnologia**, que garante fidelidade ao código e qualidade dos enunciados.
