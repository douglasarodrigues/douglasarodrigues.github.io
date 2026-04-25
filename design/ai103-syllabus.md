# AI-103 Complete Guide (Syllabus de aprovacao)

## Objetivo geral
Cobrir o necessario para passar no AI-103 com dominio pratico de:
- planejamento de solucoes;
- implementacao dos servicos Azure AI;
- operacao, seguranca, custo e qualidade.

## Mapa de dominio (o que saber e decidir)

## 1) Planejar e gerenciar Azure AI solutions
**Conceitos cobrados:** provisionamento, auth (keys, managed identity, RBAC), networking basico, monitoramento, custo.  
**Quando usar:** sempre como camada inicial de qualquer solucao AI.  
**Nao usar como atalho:** hardcode de segredo ou permissao admin ampla.  
**Erros classicos de prova:** confundir API key com identidade gerenciada; ignorar observabilidade.  
**Mini roteiro pratico:** criar recurso -> configurar auth segura -> validar metricas e alertas.

## 2) Vision (AI Vision + Document Intelligence)
**Conceitos cobrados:** OCR, analise de imagem, extração de campos/tabelas em documentos.  
**Quando usar:** imagem/documento como fonte principal.  
**Nao usar:** para tarefas de audio ou NLP puro.  
**Erros classicos:** escolher OCR simples para documento complexo com layout tabular.  
**Mini roteiro pratico:** upload doc -> extrair campos -> validar confianca -> tratar excecoes.

## 3) Language (Text Analytics, CLU, Question Answering)
**Conceitos cobrados:** sentimento, entidades, intents, QA sobre base de conhecimento.  
**Quando usar:** texto natural e interacao conversacional textual.  
**Nao usar:** para deteccao de objetos ou transcricao de fala.  
**Erros classicos:** trocar CLU por Question Answering.  
**Mini roteiro pratico:** classificar intencao -> extrair entidade -> retornar resposta de FAQ.

## 4) Speech
**Conceitos cobrados:** speech-to-text, text-to-speech, latencia e qualidade de audio.  
**Quando usar:** interfaces por voz e acessibilidade.  
**Nao usar:** quando entrada ja e texto.  
**Erros classicos:** ignorar idioma/regiao e ruido do ambiente.  
**Mini roteiro pratico:** transcrever audio curto -> gerar resposta falada -> avaliar qualidade.

## 5) Knowledge Mining / Search
**Conceitos cobrados:** ingestao, enriquecimento, indexacao, consulta semantica.  
**Quando usar:** base documental grande com busca inteligente.  
**Nao usar:** sem pipeline de atualizacao e sem metadados.  
**Erros classicos:** tentar consultar sem indexar; nao planejar atualizacao incremental.  
**Mini roteiro pratico:** indexar docs -> enriquecer -> buscar com filtros.

## 6) Azure OpenAI / Generative AI
**Conceitos cobrados:** prompt design, grounding, RAG, mitigacao de alucinacao.  
**Quando usar:** geracao/assistencia com contexto empresarial.  
**Nao usar:** para decisao critica sem revisao humana.  
**Erros classicos:** prompt sem contexto e sem formato de saida.  
**Mini roteiro pratico:** prompt estruturado -> retrieval de contexto -> resposta com fonte.

## 7) Responsible AI e operacao continua
**Conceitos cobrados:** seguranca, transparencia, rastreabilidade, revisao humana, melhoria continua.  
**Quando usar:** em toda solucao, especialmente alto risco.  
**Nao usar:** modelo sem monitoramento em producao.  
**Erros classicos:** tratar Responsible AI como etapa separada e final.  
**Mini roteiro pratico:** definir risco -> aplicar guardrails -> monitorar -> iterar.

## Plano semanal (6 semanas base)
### Semana 1
- Fundacao Azure, seguranca e operacao.
- Meta: 50 questoes de base + 1 mini simulado.
### Semana 2
- Vision + Document Intelligence.
- Meta: >= 60% nesse dominio.
### Semana 3
- Language.
- Meta: >= 65% no conjunto NLP.
### Semana 4
- Speech + Knowledge Mining.
- Meta: >= 70% no checkpoint integrado.
### Semana 5
- Azure OpenAI + RAG + Responsible AI.
- Meta: >= 75% em simulado misto.
### Semana 6
- Prova completa em ciclos + revisão de gaps.
- Meta: 3 simulados consecutivos >= 80%.

## Trilha diaria (60-90 min)
- 10 min revisao ativa de erros anteriores.
- 30 min estudo guiado do topico do dia.
- 20 min treino por dominio.
- 15 min mini cenario de decisao + anotacao de gaps.

## Mapa de decisao rapido (when to use)
- **OCR/Document:** dados em imagem ou arquivo.
- **Language/CLU/QA:** dados textuais e intencao/pergunta.
- **Speech:** entrada ou saida em voz.
- **Search/Knowledge:** recuperacao de conteudo empresarial.
- **OpenAI/RAG:** geracao com contexto controlado.

## Indicadores de prontidao
- Media global >= 80%.
- Nenhum dominio < 70%.
- Erro reincidente <= 20% das questoes erradas.
- Consistencia em 3 simulados completos consecutivos.
