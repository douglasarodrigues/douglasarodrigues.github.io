/* Gerado por scripts/generate-ia900-questions.mjs — banco de pratica independente. */
(function (global) {
  "use strict";
  global.IA900_QUESTION_BANK = [
  {
    "id": 1,
    "domain": "workload",
    "stem": "Uma startup deseja priorizar privacidade ao rotular dados sensíveis. O time avalia rotulagem humana, semi-automática e o papel de dados sintéticos, sempre com revisão onde o erro for inaceitável.\n\nQual alternativa descreve melhor **aprendizado supervisionado**?",
    "options": [
      "Treinar apenas com entradas sem rotulos para descobrir grupos.",
      "Reduzir dimensionalidade sem criterio de erro supervisionado.",
      "Otimizar politicas apenas com simulacao fisica sem dados historicos.",
      "Treinar com entradas e rotulos conhecidos para aprender o mapeamento."
    ],
    "correctIndex": 3,
    "explanation": "Supervisionado usa pares (entrada, rotulo) durante o treino."
  },
  {
    "id": 2,
    "domain": "workload",
    "stem": "Durante due diligence de aquisição, você resume como a empresa alvo usa IA: tipos de modelo, fontes de dados e controles de acesso. Investidores perguntam se há risco reputacional por falta de transparência ao usuário final.\n\nQual problema e mais associado a **regressao**?",
    "options": [
      "Prever o valor numerico de uma casa com base em atributos.",
      "Decidir se uma imagem contem um gato ou um cao.",
      "Descobrir topicos principais em uma colecao de documentos sem classes.",
      "Dividir clientes em tres grupos sem rotulos predefinidos."
    ],
    "correctIndex": 0,
    "explanation": "Regressao estima quantidade continua; classificacao usa categorias."
  },
  {
    "id": 3,
    "domain": "workload",
    "stem": "Você apresenta para o conselho um glossário de termos de IA e machine learning, enfatizando que alinhar vocabulário reduz expectativas irreais sobre o que pode ser automatizado com segurança.\n\nO que e **clustering**?",
    "options": [
      "Traduzir frases entre idiomas com pares alinhados.",
      "Prever a probabilidade de churn com historico de saidas.",
      "Agrupar dados sem rotulos com base em similaridade.",
      "Rotular imagens com classes fornecidas por um especialista."
    ],
    "correctIndex": 2,
    "explanation": "Clustering e nao supervisionado: grupos emergem dos dados."
  },
  {
    "id": 4,
    "domain": "workload",
    "stem": "Em uma mesa redonda, executivos misturam ‘automação de processos’, ‘modelos preditivos’ e ‘modelos generativos’. Você organiza o quadro conceitual sem aprofundar marca ou licenciamento de software.\n\nQual cenario ilustra **deteccao de anomalias**?",
    "options": [
      "Classificar digitos manuscritos em 10 classes.",
      "Recomendar filmes com base em avaliacoes de usuarios.",
      "Segmentar mercado em clusters para campanhas.",
      "Alertar quando uma transacao difere fortemente do padrao da conta."
    ],
    "correctIndex": 3,
    "explanation": "Anomalias destoam do comportamento normal esperado ou aprendido."
  },
  {
    "id": 5,
    "domain": "workload",
    "stem": "A empresa recebeu um relatório de auditoria pedindo mais transparência sobre decisões automatizadas de crédito. Você precisa relacionar práticas técnicas aos pilares de IA responsável discutidos em materiais públicos de referência.\n\nEm frameworks de IA responsavel, o pilar de **accountability** (responsabilizacao) enfatiza:",
    "options": [
      "Substituir testes por uma unica amostra aleatoria.",
      "Usar sempre o maior numero possivel de camadas neurais.",
      "Clareza sobre quem responde pelos efeitos do sistema em producao e vias de correcao.",
      "Evitar documentacao para agilizar releases."
    ],
    "correctIndex": 2,
    "explanation": "Accountability liga governanca, papel humano e consequencias do uso do sistema."
  },
  {
    "id": 6,
    "domain": "workload",
    "stem": "O jurídico pediu esclarecimento sobre como rastrear qual versão do modelo produziu uma decisão específica e quais dados foram usados naquele treinamento, para eventual contestação por parte do cliente final.\n\nQual e um exemplo de **carga de trabalho de processamento de linguagem natural**?",
    "options": [
      "Detectar objetos em imagens de seguranca.",
      "Prever vendas mensais em serie temporal.",
      "Extrair entidades nomeadas de contratos em texto livre.",
      "Agrupar sensores IoT por proximidade geografica."
    ],
    "correctIndex": 2,
    "explanation": "NLP trabalha com texto ou fala transcrita; entidades sao um caso tipico."
  },
  {
    "id": 7,
    "domain": "workload",
    "stem": "Uma ONG quer priorizar equidade ao priorizar beneficiários com um modelo de pontuação. Os revisores externos pediram evidências de que disparidades entre grupos demográficos estão sendo medidas e mitigadas.\n\nQual afirmacao sobre **rotulagem** esta mais correta?",
    "options": [
      "Dados rotulados sao necessarios para muitos modelos supervisionados.",
      "Modelos supervisionados nunca precisam de rotulos.",
      "Clustering exige rotulos para cada ponto antes do treino.",
      "Rotulos sao irrelevantes para medir acuracia."
    ],
    "correctIndex": 0,
    "explanation": "Supervisionado aprende de exemplos com saida conhecida."
  },
  {
    "id": 8,
    "domain": "workload",
    "stem": "Um analista de risco pede que vocês expliquem, em uma frase cada, o que o modelo otimiza e qual evidência existe de que isso reduz o risco material — antes de discutir algoritmos.\n\nO que caracteriza **aprendizado por reforco**?",
    "options": [
      "Um agente aprende acoes com base em recompensas e penalidades.",
      "Um algoritmo minimiza apenas a variancia intra-cluster.",
      "Um sistema traduz texto sem nenhum sinal de qualidade.",
      "Um modelo agrupa pixels apenas por cor sem feedback."
    ],
    "correctIndex": 0,
    "explanation": "Reforco usa sinais de recompensa para moldar a politica do agente."
  },
  {
    "id": 9,
    "domain": "workload",
    "stem": "O time de UX estuda como explicar ao usuário final por que uma recomendação foi feita, sem expor segredos comerciais do modelo. A conversa conecta requisitos de UX a pilares de transparência e explicabilidade.\n\nQual e um objetivo tipico de **sumarizacao automatica**?",
    "options": [
      "Rotular cada pixel de uma imagem medica.",
      "Produzir um texto mais curto preservando ideias principais.",
      "Calcular a rota mais curta em um mapa rodoviario.",
      "Detectar placas em video sem contexto linguistico."
    ],
    "correctIndex": 1,
    "explanation": "Sumarizacao comprime informacao textual mantendo o sentido central."
  },
  {
    "id": 10,
    "domain": "workload",
    "stem": "Durante um workshop interno, você explica aos gestores a diferença entre tarefas em que já existem respostas corretas conhecidas e tarefas em que o sistema deve descobrir estrutura sem rótulos pré-definidos.\n\nO que significa **viés (bias)** indesejado em um modelo?",
    "options": [
      "Escolher funcao de ativacao ReLU em redes profundas.",
      "Erros sistematicos que prejudicam grupos ou cenarios especificos.",
      "Ter alta acuracia em dados de teste.",
      "Uso obrigatorio de GPUs em treinamento."
    ],
    "correctIndex": 1,
    "explanation": "Vies injusto viola o pilar de equidade em IA responsavel."
  },
  {
    "id": 11,
    "domain": "workload",
    "stem": "Em uma análise de incidente, observou-se que o modelo performa bem no ambiente de treino, mas degrada fortemente em produção. A discussão gira em torno de sobreajuste, particionamento de dados e métricas adequadas ao negócio.\n\nDocumentar limitacoes conhecidas do modelo e casos de falha atende principalmente a qual ideia de IA responsavel?",
    "options": [
      "Ocultar metricas de erro para nao alarmar usuarios.",
      "Transparencia e clareza sobre o que o sistema pode e nao pode fazer.",
      "Aumentar o numero de camadas da rede neural sem medicao.",
      "Proibir qualquer teste em dados sinteticos."
    ],
    "correctIndex": 1,
    "explanation": "Transparencia inclui comunicar limites e riscos do sistema."
  },
  {
    "id": 12,
    "domain": "workload",
    "stem": "O programa de inovação discute um piloto cujo objetivo de negócio ainda está em definição; a equipe precisa primeiro enquadrar o problema como tarefa de machine learning antes de dimensionar dados e infraestrutura.\n\nPermitir que usuarios contestem ou solicitem revisao humana de uma decisao automatizada esta mais ligado a:",
    "options": [
      "Remover logs por economia de armazenamento.",
      "Mecanismos de responsabilizacao e correcao (accountability).",
      "Reduzir o tamanho do conjunto de treino.",
      "Trocar GPU por CPU em todo o pipeline."
    ],
    "correctIndex": 1,
    "explanation": "Accountability inclui vias de recurso e responsabilidade pelos efeitos."
  },
  {
    "id": 13,
    "domain": "workload",
    "stem": "A empresa adota um framework de IA responsável com seis pilares. Na retrospectiva trimestral, perguntam qual prática de governança se relaciona a definir donos e responsabilidades por decisões automatizadas.\n\nTestar o modelo com subgrupos demograficos para detectar disparidade de desempenho apoia principalmente:",
    "options": [
      "Evitar uso de validacao cruzada.",
      "Equidade (fairness) entre grupos comparaveis.",
      "Aumentar latencia de inferencia.",
      "Substituir metricas por intuicao."
    ],
    "correctIndex": 1,
    "explanation": "Avaliacao por grupo ajuda a revelar vies e impacto desigual."
  },
  {
    "id": 14,
    "domain": "workload",
    "stem": "Um parceiro sugere treinar apenas com dados públicos agregados para evitar LGPD. Você explica trade-offs entre privacidade, utilidade do modelo e necessidade de rótulos para aprendizado supervisionado.\n\nCriptografar dados em repouso e controlar acesso por papel (RBAC) no pipeline de ML reforca:",
    "options": [
      "A eliminacao de conjuntos de teste.",
      "Somente a velocidade de treino.",
      "A escolha exclusiva de algoritmos lineares.",
      "Privacidade e seguranca dos dados."
    ],
    "correctIndex": 3,
    "explanation": "Protecao de dados e acesso sao pilares de privacidade e seguranca."
  },
  {
    "id": 15,
    "domain": "workload",
    "stem": "Um comitê de governança de dados revisa um projeto de IA que consumirá dados de clientes. A equipe precisa comunicar como o sistema aprende, quais limitações existem e como evitar impactos injustos a grupos específicos.\n\nIncluir revisao humana quando o modelo tem baixa confianca na predicao e um exemplo de:",
    "options": [
      "Desligar monitoramento em producao.",
      "Ignorar completamente o escore de confianca.",
      "Treinar somente com um unico epoch.",
      "Complementar automacao com supervisao onde ha incerteza."
    ],
    "correctIndex": 3,
    "explanation": "Fluxos human-in-the-loop reduzem risco quando o modelo nao e confiavel."
  },
  {
    "id": 16,
    "domain": "workload",
    "stem": "A diretoria questionou se o uso de um modelo generativo para redigir comunicações externas exige processos adicionais de validação. Você precisa posicionar riscos conhecidos sem prometer comportamento infalível do modelo.\n\nPublicar notas de versao do modelo e dados usados no treino contribui para:",
    "options": [
      "Substituir testes A/B.",
      "Eliminar necessidade de ambiente de staging.",
      "Rastreabilidade e auditoria do artefato implantado.",
      "Impedir retreinamento futuro."
    ],
    "correctIndex": 2,
    "explanation": "Versionamento e documentacao apoiam reproducibilidade e auditoria."
  },
  {
    "id": 17,
    "domain": "workload",
    "stem": "Em uma reunião de alinhamento técnico e de negócio, vocês revisam o que significa ‘rótulo’, ‘conjunto de treino’ e ‘métrica de sucesso’ para evitar ambiguidade em documentos formais.\n\nAo divulgar que uma imagem foi gerada por IA, qual pilar se fortalece?",
    "options": [
      "Aumentar automaticamente a resolucao.",
      "Transparencia sobre origem e natureza do conteudo.",
      "Eliminar direitos autorais.",
      "Reduzir custo de armazenamento."
    ],
    "correctIndex": 1,
    "explanation": "Informar origem sintetica evita engano e apoia uso responsavel."
  },
  {
    "id": 18,
    "domain": "workload",
    "stem": "Em um hackathon interno, mentores pedem que as equipes revisem definições de paradigmas de aprendizado antes de escrever código — para alinhar vocabulário, não para impor uma arquitetura vencedora.\n\nEvitar treinar com dados obtidos sem consentimento adequado esta ligado a:",
    "options": [
      "Maximizar sempre o tamanho do batch.",
      "Usar apenas metricas de treino, nao de validacao.",
      "Privacidade e conformidade com base legal e etica.",
      "Eliminar validacao cruzada."
    ],
    "correctIndex": 2,
    "explanation": "Consentimento e base legal sao requisitos de dados sensiveis."
  },
  {
    "id": 19,
    "domain": "workload",
    "stem": "A área de compliance incluiu no checklist verificação de que rotuladores humanos tiveram instruções consistentes. Isso impacta diretamente a viabilidade de modelos que dependem de exemplos com saída conhecida.\n\nUm painel que mostra drift de dados e degradacao da metrica em producao ajuda:",
    "options": [
      "Confiabilidade e monitoramento continuo do sistema.",
      "Substituir testes de regressao de software.",
      "Remover necessidade de SLAs internos.",
      "Impedir retreinamento periodico."
    ],
    "correctIndex": 0,
    "explanation": "Monitorar deriva e queda de qualidade sustenta confiabilidade operacional."
  },
  {
    "id": 20,
    "domain": "workload",
    "stem": "Você apoia uma equipe de arquitetura que está definindo a primeira solução de machine learning da empresa. Os patrocinadores querem alinhar expectativas sobre tipos de problema, dados disponíveis e riscos antes de escolher serviços na nuvem.\n\nGarantir que o sistema funcione para pessoas com necessidades diversas (acessibilidade) relaciona-se a:",
    "options": [
      "Reduzir numero de idiomas suportados.",
      "Usar apenas entradas numericas.",
      "Inclusao no desenho e validacao com usuarios diversos.",
      "Eliminar testes com leitores de tela."
    ],
    "correctIndex": 2,
    "explanation": "Inclusao considera diferentes habilidades e contextos de uso."
  },
  {
    "id": 21,
    "domain": "workload",
    "stem": "Você está preparando material de treinamento para desenvolvedores que nunca trabalharam com ML. O objetivo é situar conceitos básicos antes que a equipe escolha ferramentas ou arquitetura na nuvem.\n\nQuando um modelo de linguagem inventa fatos inexistentes, o fenomeno costuma ser chamado de:",
    "options": [
      "Normalizacao excessiva exclusiva.",
      "Alucinacao — exige validacao em dominios criticos.",
      "Underfitting estrutural.",
      "Clustering hierarquico."
    ],
    "correctIndex": 1,
    "explanation": "Alucinacao e geracao plausivel mas incorreta; exige checagem."
  },
  {
    "id": 22,
    "domain": "workload",
    "stem": "Em um curso interno, você usa exemplos de diferentes domínios apenas para ilustrar a diversidade de problemas de IA — sem comprometer ainda escolha de fornecedor ou stack.\n\nSeparar conjuntos de treino, validacao e teste visa principalmente:",
    "options": [
      "Eliminar a necessidade de metricas.",
      "Impedir uso de validacao cruzada.",
      "Duplicar dados sem motivo.",
      "Estimar desempenho em dados nao vistos e reduzir sobreajuste aparente."
    ],
    "correctIndex": 3,
    "explanation": "Particionamento honesto mede generalizacao."
  },
  {
    "id": 23,
    "domain": "workload",
    "stem": "O time de produto compara abordagens com e sem rótulos pré-definidos para o mesmo conjunto de dados; a discussão foca em trade-offs de custo de rotulagem e interpretação dos resultados.\n\nEm IA generativa, manter registro de prompts e respostas em ambientes corporativos ajuda:",
    "options": [
      "Substituir criptografia.",
      "Eliminar necessidade de classificacao de dados.",
      "Evitar qualquer retencao por privacidade mal interpretada.",
      "Auditoria, conformidade e depuracao de incidentes."
    ],
    "correctIndex": 3,
    "explanation": "Rastreabilidade de uso e saida apoia governanca."
  },
  {
    "id": 24,
    "domain": "workload",
    "stem": "Especialistas em qualidade questionam se o viés dos dados de treino pode explicar erros sistemáticos contra certas regiões. A discussão técnica foca no conceito de viés indesejado no modelo.\n\nQual pratica reduz risco de vies de amostragem no treino?",
    "options": [
      "Verificar representatividade e possiveis lacunas por segmento.",
      "Treinar somente no ultimo mes selecionado arbitrariamente.",
      "Usar apenas dados mais faceis de coletar.",
      "Eliminar outliers sem analise."
    ],
    "correctIndex": 0,
    "explanation": "Amostra nao representativa distorce o modelo."
  },
  {
    "id": 25,
    "domain": "workload",
    "stem": "Numa revisão de escopo, o time questiona se há dados rotulados coerentes com o uso pretendido, se as classes cobrem casos reais e se a métrica escolhida reflete o custo de erro para o negócio.\n\nIndicar que uma decisao foi assistida por IA, sem sugerir julgamento humano quando nao houve, exemplifica:",
    "options": [
      "Eliminacao de accountability.",
      "Substituicao total de advogados.",
      "Transparencia sobre o papel da automacao.",
      "Marketing agressivo proibido em todos os casos."
    ],
    "correctIndex": 2,
    "explanation": "Clareza sobre automacao vs. humano evita expectativa falsa."
  },
  {
    "id": 26,
    "domain": "workload",
    "stem": "Um produto digital passará a usar modelos preditivos em tempo quase real. O time técnico debate se o problema é melhor formulado como classificação, regressão, agrupamento ou detecção de desvios em relação ao histórico.\n\nEm sistemas de pontuacao de credito, revisar impacto em grupos protegidos alinha-se a:",
    "options": [
      "Remover toda explicacao ao usuario final.",
      "Equidade e mitigacao de discriminacao injusta.",
      "Eliminar testes estatisticos.",
      "Aumentar exclusivamente a complexidade do modelo."
    ],
    "correctIndex": 1,
    "explanation": "Impacto diferenciado injusto viola fairness."
  },
  {
    "id": 27,
    "domain": "workload",
    "stem": "Uma startup deseja priorizar privacidade ao rotular dados sensíveis. O time avalia rotulagem humana, semi-automática e o papel de dados sintéticos, sempre com revisão onde o erro for inaceitável.\n\nQual medida melhora **confiabilidade** percebida em chatbots de suporte?",
    "options": [
      "Desativar feedback do usuario.",
      "Indicar fontes ou base de conhecimento quando possivel.",
      "Ocultar sempre a origem das respostas.",
      "Responder com afirmacoes absolutas sem nivel de confianca."
    ],
    "correctIndex": 1,
    "explanation": "Fontes e limites conhecidos aumentam confianca fundamentada."
  },
  {
    "id": 28,
    "domain": "workload",
    "stem": "Durante due diligence de aquisição, você resume como a empresa alvo usa IA: tipos de modelo, fontes de dados e controles de acesso. Investidores perguntam se há risco reputacional por falta de transparência ao usuário final.\n\nO principio de **minimizacao de dados** sugere:",
    "options": [
      "Eliminar criptografia para performance.",
      "Coletar e ret apenas o necessario para o proposito declarado.",
      "Compartilhar dados com terceiros sem revisao.",
      "Armazenar todos os campos possiveis por precaucao indefinida."
    ],
    "correctIndex": 1,
    "explanation": "Minimizar dados reduz risco e exposicao."
  },
  {
    "id": 29,
    "domain": "workload",
    "stem": "Você apresenta para o conselho um glossário de termos de IA e machine learning, enfatizando que alinhar vocabulário reduz expectativas irreais sobre o que pode ser automatizado com segurança.\n\nChecklist pre-implementacao com impacto ambiental estimado (energia, GPU) apoia:",
    "options": [
      "Eliminar metricas de negocio.",
      "Proibir qualquer nuvem.",
      "Ignorar custo de treino.",
      "Sustentabilidade e decisao consciente de recursos."
    ],
    "correctIndex": 3,
    "explanation": "Sustentabilidade e criterio crescente em ML em escala."
  },
  {
    "id": 30,
    "domain": "workload",
    "stem": "Em uma mesa redonda, executivos misturam ‘automação de processos’, ‘modelos preditivos’ e ‘modelos generativos’. Você organiza o quadro conceitual sem aprofundar marca ou licenciamento de software.\n\nEm visao de computador para vigilancia publica, documentar finalidade e base legal exemplifica:",
    "options": [
      "Transparencia e conformidade em uso sensivel.",
      "Eliminar necessidade de aviso ao publico.",
      "Garantir anonimato absoluto sem tecnica adequada.",
      "Substituir politicas de privacidade."
    ],
    "correctIndex": 0,
    "explanation": "Usos sensiveis exigem clareza e amparo legal."
  },
  {
    "id": 31,
    "domain": "workload",
    "stem": "A empresa recebeu um relatório de auditoria pedindo mais transparência sobre decisões automatizadas de crédito. Você precisa relacionar práticas técnicas aos pilares de IA responsável discutidos em materiais públicos de referência.\n\nQual afirmacao sobre **explicabilidade** e mais adequada?",
    "options": [
      "Exige publicar pesos completos em todos os casos.",
      "Substitui testes estatisticos.",
      "Impede uso de modelos nao lineares.",
      "Pode incluir importancia de features ou regras aproximadas para o usuario."
    ],
    "correctIndex": 3,
    "explanation": "Explicabilidade tem varios niveis; importancia de features e comum."
  },
  {
    "id": 32,
    "domain": "workload",
    "stem": "O jurídico pediu esclarecimento sobre como rastrear qual versão do modelo produziu uma decisão específica e quais dados foram usados naquele treinamento, para eventual contestação por parte do cliente final.\n\nUm modelo que performa bem no treino e mal na validacao provavelmente apresenta:",
    "options": [
      "Dados de validacao identicos ao treino.",
      "Metrica inadequada apenas em producao.",
      "Underfitting severo no treino.",
      "Sobreajuste (overfitting) a particuliaridades do treino."
    ],
    "correctIndex": 3,
    "explanation": "Gap treino-validacao grande sugere memorizacao."
  },
  {
    "id": 33,
    "domain": "workload",
    "stem": "Uma ONG quer priorizar equidade ao priorizar beneficiários com um modelo de pontuação. Os revisores externos pediram evidências de que disparidades entre grupos demográficos estão sendo medidas e mitigadas.\n\nPolitica de retencao e exclusao de dados pessoais apos o fim do contrato reforca:",
    "options": [
      "Eliminacao de backups cifrados.",
      "Privacidade e ciclo de vida dos dados.",
      "Impedir auditoria.",
      "Obrigatoriedade de manter dados eternamente."
    ],
    "correctIndex": 1,
    "explanation": "Retencao limitada reduz exposicao."
  },
  {
    "id": 34,
    "domain": "workload",
    "stem": "Um analista de risco pede que vocês expliquem, em uma frase cada, o que o modelo otimiza e qual evidência existe de que isso reduz o risco material — antes de discutir algoritmos.\n\nEm equipes multidisciplinares, o papel de **revisao etica** antes do deploy busca:",
    "options": [
      "Identificar riscos sociais e mitigacoes antes de liberar.",
      "Eliminar cientistas de dados do processo.",
      "Garantir aprovacao automatica.",
      "Substituir testes unitarios de codigo."
    ],
    "correctIndex": 0,
    "explanation": "Revisao etica complementa testes tecnicos."
  },
  {
    "id": 35,
    "domain": "workload",
    "stem": "O time de UX estuda como explicar ao usuário final por que uma recomendação foi feita, sem expor segredos comerciais do modelo. A conversa conecta requisitos de UX a pilares de transparência e explicabilidade.\n\nAo usar dados sinteticos para aumentar treino, deve-se:",
    "options": [
      "Validar se preservam estatisticas relevantes e nao introduzem artefatos.",
      "Eliminar conjunto de teste.",
      "Substituir integralmente dados reais sem checagem.",
      "Ignorar dominio de aplicacao."
    ],
    "correctIndex": 0,
    "explanation": "Dados sinteticos exigem validacao de fidelidade."
  },
  {
    "id": 36,
    "domain": "workload",
    "stem": "Durante um workshop interno, você explica aos gestores a diferença entre tarefas em que já existem respostas corretas conhecidas e tarefas em que o sistema deve descobrir estrutura sem rótulos pré-definidos.\n\nQual cenario favorece **inclusao** em interfaces de voz?",
    "options": [
      "Desativar legendas.",
      "Oferecer alternativas textuais e ajuste de velocidade de fala.",
      "Usar apenas comandos em ingles.",
      "Exigir sotaque padrao unico."
    ],
    "correctIndex": 1,
    "explanation": "Multiplos modos e idiomas ampliam acessibilidade."
  },
  {
    "id": 37,
    "domain": "workload",
    "stem": "Em uma análise de incidente, observou-se que o modelo performa bem no ambiente de treino, mas degrada fortemente em produção. A discussão gira em torno de sobreajuste, particionamento de dados e métricas adequadas ao negócio.\n\nRegistrar decisoes de limiar (threshold) de classificacao e seu impacto em taxas de aprovacao apoia:",
    "options": [
      "Substituir validacao humana sempre.",
      "Impedir calibracao futura.",
      "Eliminar metricas de negocio.",
      "Governanca e ajuste consciente de trade-offs."
    ],
    "correctIndex": 3,
    "explanation": "Limiares afetam equidade operacional; documentar e essencial."
  },
  {
    "id": 38,
    "domain": "workload",
    "stem": "O programa de inovação discute um piloto cujo objetivo de negócio ainda está em definição; a equipe precisa primeiro enquadrar o problema como tarefa de machine learning antes de dimensionar dados e infraestrutura.\n\nEm IA generativa de codigo, recomenda-se:",
    "options": [
      "Revisar e testar codigo gerado antes de producao.",
      "Implantar direto sem CI/CD.",
      "Confiar cegamente em dependencias sugeridas.",
      "Eliminar analise estatica."
    ],
    "correctIndex": 0,
    "explanation": "Codigo sintetizado pode conter falhas; revisao e testes permanecem obrigatorios."
  },
  {
    "id": 39,
    "domain": "workload",
    "stem": "A empresa adota um framework de IA responsável com seis pilares. Na retrospectiva trimestral, perguntam qual prática de governança se relaciona a definir donos e responsabilidades por decisões automatizadas.\n\nO que caracteriza **multi-modal** em modelos recentes?",
    "options": [
      "Eliminar embeddings.",
      "Usar apenas uma modalidade por vez, sempre.",
      "Restringir a numeros inteiros.",
      "Combinar entradas de tipos distintos (ex.: texto e imagem) em um unico fluxo."
    ],
    "correctIndex": 3,
    "explanation": "Multi-modal integra mais de um tipo de dado."
  },
  {
    "id": 40,
    "domain": "workload",
    "stem": "Um parceiro sugere treinar apenas com dados públicos agregados para evitar LGPD. Você explica trade-offs entre privacidade, utilidade do modelo e necessidade de rótulos para aprendizado supervisionado.\n\nPriorizar casos de alto impacto para revisao humana e uma forma de:",
    "options": [
      "Alocar supervisao onde o risco e maior.",
      "Ignorar escores de probabilidade.",
      "Reduzir seguranca.",
      "Eliminar supervisao em todos os casos."
    ],
    "correctIndex": 0,
    "explanation": "Triagem por risco e boa pratica operacional."
  },
  {
    "id": 41,
    "domain": "azure_ml",
    "stem": "O prazo do sprint é curto e o time quer explorar automaticamente algoritmos e hiperparâmetros dentro de limites aprovados, com métrica de sucesso definida pelo negócio.\n\nQual componente do **Azure Machine Learning** armazena experimentos, computacao e artefatos de forma centralizada?",
    "options": [
      "Somente Azure DevOps sem integracao com dados.",
      "Apenas Azure DNS.",
      "Apenas uma conta de armazenamento sem metadata de ML.",
      "Workspace."
    ],
    "correctIndex": 3,
    "explanation": "O workspace e o hub de projetos de Azure ML."
  },
  {
    "id": 42,
    "domain": "azure_ml",
    "stem": "Há preocupação com deriva entre o perfil de dados de treino e o tráfego atual em produção. Monitoramento contínuo foi adicionado ao backlog.\n\nO **Azure Machine Learning designer** permite principalmente:",
    "options": [
      "Configurar apenas firewalls de rede.",
      "Construir pipelines de ML de forma visual.",
      "Gerenciar apenas maquinas virtuais Linux sem ML.",
      "Editar codigo COBOL em mainframe."
    ],
    "correctIndex": 1,
    "explanation": "O designer e um fluxo visual para treino e implantacao."
  },
  {
    "id": 43,
    "domain": "azure_ml",
    "stem": "A empresa padronizou métricas de classificação por domínio: churn usa AUC, suporte ao cliente usa F1. Você explica por que uma única métrica genérica não serve a todos os casos de uso.\n\nO que o **Automated ML** automatiza em grande parte?",
    "options": [
      "A aprovacao legal de contratos corporativos.",
      "Selecao de algoritmos e hiperparametros dentro de limites definidos.",
      "A coleta fisica de dados em sensores sem conectividade.",
      "A instalacao de sistemas operacionais em desktops."
    ],
    "correctIndex": 1,
    "explanation": "AutoML busca modelos e hiperparametros com objetivo e metrica definidos."
  },
  {
    "id": 44,
    "domain": "azure_ml",
    "stem": "O catálogo de modelos internos cresceu; é preciso padronizar nomes, tags e estágios (desenvolvimento, homologação, produção) para evitar que times chamem endpoints obsoletos.\n\nQual metrica e comum em problemas de **classificacao binaria**?",
    "options": [
      "AUC-ROC.",
      "Erro quadratico medio exclusivamente.",
      "Perplexidade de linguagem apenas.",
      "Silhueta (silhouette) para clustering."
    ],
    "correctIndex": 0,
    "explanation": "AUC resume trade-off entre verdadeiros positivos e falsos positivos."
  },
  {
    "id": 45,
    "domain": "azure_ml",
    "stem": "Um cientista de dados prefere arrastar componentes em um canvas em vez de escrever pipelines apenas em código para prototipagem rápida. A liderança quer saber qual recurso do Azure ML melhor se encaixa nesse estilo de trabalho.\n\nEm validacao, **overfitting** ocorre quando:",
    "options": [
      "O modelo e simples demais para os dados.",
      "O modelo memoriza o treino e falha em dados novos.",
      "Os dados de teste sao identicos aos de treino por engano.",
      "Ha poucos rotulos apenas em producao."
    ],
    "correctIndex": 1,
    "explanation": "Overfitting ajusta ruido do treino e generaliza mal."
  },
  {
    "id": 46,
    "domain": "azure_ml",
    "stem": "O time de MLOps exige ambientes reproduzíveis: mesmas bibliotecas e versões entre treino local, CI e o container de inferência. Qual conceito do Azure ML endereça isso diretamente?\n\nNo Azure Machine Learning, um **datastore** representa tipicamente:",
    "options": [
      "Um certificado TLS obrigatorio para GPU.",
      "O relatorio de billing mensal fechado.",
      "Uma referencia a uma fonte de dados (ex.: armazenamento) usada pelo workspace.",
      "Somente uma tabela SQL fixa sem conexao externa."
    ],
    "correctIndex": 2,
    "explanation": "Datastore aponta para fontes de dados acessadas pelo workspace."
  },
  {
    "id": 47,
    "domain": "azure_ml",
    "stem": "Durante a migração de um notebook local para o Azure ML, surgem dúvidas sobre onde versionar datasets, como registrar métricas de experimento e como vincular runs a um projeto auditável.\n\nUm **compute target** no Azure ML e:",
    "options": [
      "Apenas o nome do experimento no portal.",
      "O recurso onde o treino ou a inferencia escalar roda (cluster, instancia, etc.).",
      "Um tipo exclusivo de firewall.",
      "Somente o arquivo requirements.txt local."
    ],
    "correctIndex": 1,
    "explanation": "Compute target e o ambiente de execucao escolhido para o job."
  },
  {
    "id": 48,
    "domain": "azure_ml",
    "stem": "Um modelo de regressão apresenta RMSE baixo no treino, mas predições absurdas em produção. A equipe suspeita de vazamento de informação entre treino e validação ou de features não disponíveis online.\n\nRegistrar um modelo no **model registry** permite:",
    "options": [
      "Impedir pipelines.",
      "Versionar artefatos e promover para implantacao com rastreabilidade.",
      "Bloquear endpoints.",
      "Eliminar necessidade de testes."
    ],
    "correctIndex": 1,
    "explanation": "Registro versiona modelos para implantacao controlada."
  },
  {
    "id": 49,
    "domain": "azure_ml",
    "stem": "Sua equipe adotou o Azure Machine Learning para padronizar experimentos e implantar modelos. Você precisa orientar colegas sobre onde artefatos, execuções e metadados ficam organizados no ecossistema do serviço.\n\nUm **pipeline** de ML no Azure costuma ser usado para:",
    "options": [
      "Gerir apenas DNS.",
      "Executar apenas scripts sem dependencias.",
      "Orquestrar etapas reproduziveis: dados, treino, registro e implantacao.",
      "Substituir qualquer banco de dados."
    ],
    "correctIndex": 2,
    "explanation": "Pipelines automatizam fluxos repetiveis e auditaveis."
  },
  {
    "id": 50,
    "domain": "azure_ml",
    "stem": "Você documenta um pipeline que prepara dados tabulares, treina, registra o modelo e publica um endpoint gerenciado. Colegas novatos perguntam qual componente representa o ‘projeto’ central que agrega esses artefatos.\n\nUm **endpoint** online em geral serve para:",
    "options": [
      "Receber requisicoes HTTP e retornar predicoes em tempo quase real.",
      "Somente agendar jobs batch.",
      "Compilar codigo Java antigo.",
      "Armazenar dados brutos indefinidamente."
    ],
    "correctIndex": 0,
    "explanation": "Endpoints online expoem o modelo como servico sincrono."
  },
  {
    "id": 51,
    "domain": "azure_ml",
    "stem": "Um parceiro de negócio pediu comparar o custo de inferência em batch versus online para o mesmo modelo. A equipe técnica precisa alinhar vocabulário sobre tipos de serviço e quando cada um se aplica.\n\nInferencia **batch** e mais indicada quando:",
    "options": [
      "O modelo nao pode ser versionado.",
      "Nao existe armazenamento.",
      "Ha grande volume acumulado e latencia pontual nao e critica.",
      "Cada requisicao exige resposta em milissegundos fixos."
    ],
    "correctIndex": 2,
    "explanation": "Batch processa lotes com throughput, nao interativo."
  },
  {
    "id": 52,
    "domain": "azure_ml",
    "stem": "A integração com Azure DevOps deve disparar pipelines de ML quando há merge na branch principal, com testes de qualidade de dados antes do treino. Você posiciona o papel do Azure ML nesse fluxo.\n\nO **Designer** do Azure ML difere de notebooks principalmente por:",
    "options": [
      "Nao permitir dados tabulares.",
      "Oferecer composicao visual de fluxos arrastando componentes.",
      "Eliminar experimentos.",
      "Proibir uso de Python."
    ],
    "correctIndex": 1,
    "explanation": "Designer e fluxo visual low-code para pipelines."
  },
  {
    "id": 53,
    "domain": "azure_ml",
    "stem": "Em uma revisão de arquitetura, questionam se o Azure ML substitui totalmente um data warehouse ou se complementa pipelines ETL já existentes no Azure Synapse ou em outros serviços.\n\n**Automated ML** e mais util quando:",
    "options": [
      "Quer-se explorar algoritmos e hiperparametros com objetivo e tempo limitados.",
      "O problema e apenas de rede TCP.",
      "E proibido medir qualidade.",
      "Nao existe nenhum dado rotulado."
    ],
    "correctIndex": 0,
    "explanation": "AutoML busca candidatos de modelo de forma automatizada."
  },
  {
    "id": 54,
    "domain": "azure_ml",
    "stem": "A operação precisa pontuar milhões de registros em arquivo durante a madrugada, sem exigência de resposta interativa por requisição HTTP. A arquitetura deve refletir esse padrão.\n\nUm **ambiente (environment)** no Azure ML define:",
    "options": [
      "Somente a cor do tema do portal.",
      "A senha do administrador.",
      "Endereco fisico do datacenter.",
      "Dependencias e runtime para reproduzir treino e inferencia."
    ],
    "correctIndex": 3,
    "explanation": "Ambiente captura pacotes e versoes para reproducibilidade."
  },
  {
    "id": 55,
    "domain": "azure_ml",
    "stem": "O código de treino e as definições de pipeline devem passar por revisão em branches, com histórico rastreável, antes de promover uma versão do modelo.\n\nA divisao **treino / validacao / teste** visa:",
    "options": [
      "Avaliar generalizacao sem vazar informacao do teste no ajuste do modelo.",
      "Treinar apenas no teste.",
      "Eliminar validacao.",
      "Usar o mesmo conjunto para tudo."
    ],
    "correctIndex": 0,
    "explanation": "Separacao evita vies de avaliacao otimista."
  },
  {
    "id": 56,
    "domain": "azure_ml",
    "stem": "Analistas de negócio solicitaram explicar em linguagem simples o que é um ‘experimento’ no Azure ML versus o que é apenas um script Python executado em uma VM sem registro central.\n\n**Feature engineering** refere-se a:",
    "options": [
      "Copiar dados sem transformacao.",
      "Remover todos os outliers sem analise.",
      "Criar ou selecionar entradas que facilitem o aprendizado.",
      "Substituir metricas por intuição."
    ],
    "correctIndex": 2,
    "explanation": "Features melhores costumam melhorar o modelo."
  },
  {
    "id": 57,
    "domain": "azure_ml",
    "stem": "Cientistas pediram ambientes com pacotes pré-instalados para evitar ‘funciona na minha máquina’. O objetivo é alinhar o ambiente de treino ao container de scoring.\n\n**Drift** de dados em producao significa:",
    "options": [
      "Backup concluido com sucesso.",
      "Erro de sintaxe em Python.",
      "Aumento de RAM do servidor web.",
      "Mudanca na distribuicao dos dados em relacao ao treino."
    ],
    "correctIndex": 3,
    "explanation": "Drift pode degradar o modelo; exige monitoramento."
  },
  {
    "id": 58,
    "domain": "azure_ml",
    "stem": "Após um aumento súbito de erros em dados de validação, suspeita-se que o modelo memorizou padrões espúrios do conjunto de treino. A reunião foca em diagnóstico de generalização.\n\nUm **experimento** no Azure ML agrupa:",
    "options": [
      "Somente usuarios do Active Directory.",
      "Execucoes relacionadas para comparar metricas e hiperparametros.",
      "Licencas de Office.",
      "Configuracao de roteadores."
    ],
    "correctIndex": 1,
    "explanation": "Experimentos organizam runs comparaveis."
  },
  {
    "id": 59,
    "domain": "azure_ml",
    "stem": "Grandes volumes brutos precisam ser agregados e limpos antes do treino; parte do processamento ocorre em cluster de processamento distribuído integrado ao fluxo.\n\nEscolher metrica principal (ex.: AUC, RMSE) cedo no projeto ajuda:",
    "options": [
      "Evitar documentacao.",
      "Impedir uso de conjunto de teste.",
      "Alinhar otimizacao do modelo ao objetivo de negocio.",
      "Eliminar necessidade de dados de validacao."
    ],
    "correctIndex": 2,
    "explanation": "Metrica guia selecao e comparacao de modelos."
  },
  {
    "id": 60,
    "domain": "azure_ml",
    "stem": "Após um incidente, descobriu-se que o endpoint em produção não correspondia ao modelo aprovado no último release. O comitê de MLOps reforça rastreabilidade entre artefato registrado e implantação.\n\n**Validacao cruzada** (cross-validation) e util para:",
    "options": [
      "Eliminar conjunto de teste reservado.",
      "Substituir etica.",
      "Garantir overfitting.",
      "Estimar desempenho com particoes rotativas dos dados disponiveis."
    ],
    "correctIndex": 3,
    "explanation": "CV reduz dependencia de um unico split aleatorio."
  },
  {
    "id": 61,
    "domain": "azure_ml",
    "stem": "A equipe de privacidade exige que dados sensíveis permaneçam em uma região específica e que logs de predição não armazenem identificadores em texto claro. Isso afeta desenho de workspace e armazenamento.\n\nImplantar modelo em **containers** costuma trazer:",
    "options": [
      "Proibicao de GPU.",
      "Impossibilidade de versionar.",
      "Portabilidade e consistencia entre ambientes de dev e producao.",
      "Eliminacao de APIs REST."
    ],
    "correctIndex": 2,
    "explanation": "Containers empacotam dependencias do servico de scoring."
  },
  {
    "id": 62,
    "domain": "azure_ml",
    "stem": "O modelo de fraude binária está em revisão. Os analistas pediram uma métrica que reflita o trade-off entre alarmes verdadeiros e falsos positivos em diferentes limiares de decisão.\n\nUm **pipeline de dados** prepara dados antes do treino para:",
    "options": [
      "Remover logs.",
      "Substituir modelo.",
      "Eliminar necessidade de datastore.",
      "Limpar, integrar e transformar entradas de forma repetivel."
    ],
    "correctIndex": 3,
    "explanation": "ETL/ELT prepara dados confiaveis para ML."
  },
  {
    "id": 63,
    "domain": "azure_ml",
    "stem": "A equipe de segurança reforçou que apenas perfis autorizados podem implantar endpoints que acessam dados classificados. A configuração de permissões no workspace é discutida.\n\n**Hiperparametros** diferem de **parametros do modelo** porque:",
    "options": [
      "Sao sempre iguais aos pesos da ultima camada.",
      "Sao apenas nomes de colunas.",
      "Sao definidos antes do treino (ex.: taxa de aprendizado), nao aprendidos diretamente pelos dados.",
      "Nao afetam o resultado."
    ],
    "correctIndex": 2,
    "explanation": "Hiperparametros controlam o processo de aprendizado."
  },
  {
    "id": 64,
    "domain": "azure_ml",
    "stem": "O time de dados quer executar treinamento distribuído em GPU para um modelo profundo, mas precisa limitar custo com agendamento e tamanho de cluster. A discussão envolve compute targets e quotas.\n\nEm implantacao, **teste A/B** entre duas versoes de modelo serve para:",
    "options": [
      "Comparar metricas de negocio em trafego dividido.",
      "Impedir rollback.",
      "Substituir privacidade.",
      "Eliminar monitoramento."
    ],
    "correctIndex": 0,
    "explanation": "A/B avalia impacto real de novas versoes."
  },
  {
    "id": 65,
    "domain": "azure_ml",
    "stem": "Você prepara um workshop sobre inferência em tempo real com latência de poucos centésimos de segundo versus jobs assíncronos que podem levar horas. Os gestores querem exemplos concretos do Azure.\n\n**Pontuacao** (scoring) e o termo comum para:",
    "options": [
      "Configurar DNS.",
      "Apagar dados.",
      "Executar o modelo treinado para obter predicoes.",
      "Somente instalar drivers."
    ],
    "correctIndex": 2,
    "explanation": "Scoring e inferencia sobre novos dados."
  },
  {
    "id": 66,
    "domain": "azure_ml",
    "stem": "O prazo do sprint é curto e o time quer explorar automaticamente algoritmos e hiperparâmetros dentro de limites aprovados, com métrica de sucesso definida pelo negócio.\n\nUm **servico gerenciado de ML** na nuvem tipicamente oferece:",
    "options": [
      "Garantia de modelo perfeito.",
      "Substituicao de dados reais.",
      "Eliminacao de custos variaveis em qualquer cenario.",
      "Escalabilidade de computacao e MLOps integrado ao ecossistema do provedor."
    ],
    "correctIndex": 3,
    "explanation": "Nuvem oferece elasticidade e ferramentas; nao garante qualidade magica."
  },
  {
    "id": 67,
    "domain": "azure_ml",
    "stem": "Há preocupação com deriva entre o perfil de dados de treino e o tráfego atual em produção. Monitoramento contínuo foi adicionado ao backlog.\n\n**Labeling** assistido por ML em projetos de visao ajuda a:",
    "options": [
      "Substituir armazenamento.",
      "Acelerar anotacao com sugestoes que humanos revisam.",
      "Impedir treino supervisionado.",
      "Eliminar revisao humana em qualquer caso."
    ],
    "correctIndex": 1,
    "explanation": "Rotulagem assistida combina modelo sugestivo com validacao humana."
  },
  {
    "id": 68,
    "domain": "azure_ml",
    "stem": "A empresa padronizou métricas de classificação por domínio: churn usa AUC, suporte ao cliente usa F1. Você explica por que uma única métrica genérica não serve a todos os casos de uso.\n\nQuando o objetivo e detectar fraude rara, costuma-se:",
    "options": [
      "Usar apenas acuracia global.",
      "Ignorar a classe minoritaria.",
      "Tratar desbalanceamento de classes e escolher metricas adequadas (ex.: precisao/recall).",
      "Eliminar validacao."
    ],
    "correctIndex": 2,
    "explanation": "Classes raras exigem metricas e amostragem cuidadosas."
  },
  {
    "id": 69,
    "domain": "azure_ml",
    "stem": "O catálogo de modelos internos cresceu; é preciso padronizar nomes, tags e estágios (desenvolvimento, homologação, produção) para evitar que times chamem endpoints obsoletos.\n\n**Normalizacao** de features numericas pode ajudar a:",
    "options": [
      "Substituir rotulos.",
      "Remover variaveis categoricas.",
      "Eliminar necessidade de treino.",
      "Colocar escalas em faixas comparaveis para muitos algoritmos."
    ],
    "correctIndex": 3,
    "explanation": "Escalas comparaveis melhoram convergencia e comparacao."
  },
  {
    "id": 70,
    "domain": "azure_ml",
    "stem": "Um cientista de dados prefere arrastar componentes em um canvas em vez de escrever pipelines apenas em código para prototipagem rápida. A liderança quer saber qual recurso do Azure ML melhor se encaixa nesse estilo de trabalho.\n\nUm **run** no Azure ML registra tipicamente:",
    "options": [
      "Configuracao de impressora.",
      "Metricas, parametros, logs e artefatos gerados na execucao.",
      "Lista de sites bloqueados.",
      "Somente o nome do usuario."
    ],
    "correctIndex": 1,
    "explanation": "Runs permitem auditoria e reproducao."
  },
  {
    "id": 71,
    "domain": "azure_ml",
    "stem": "O time de MLOps exige ambientes reproduzíveis: mesmas bibliotecas e versões entre treino local, CI e o container de inferência. Qual conceito do Azure ML endereça isso diretamente?\n\n**Seleção de features** visa:",
    "options": [
      "Reduzir dimensionalidade e ruido mantendo sinal util.",
      "Copiar todas as colunas duplicadas.",
      "Ignorar dominio.",
      "Eliminar validacao."
    ],
    "correctIndex": 0,
    "explanation": "Menos features irrelevantes pode melhorar generalizacao."
  },
  {
    "id": 72,
    "domain": "azure_ml",
    "stem": "Durante a migração de um notebook local para o Azure ML, surgem dúvidas sobre onde versionar datasets, como registrar métricas de experimento e como vincular runs a um projeto auditável.\n\nEm pipelines, **parametrizar** caminhos de dados e hiperparametros permite:",
    "options": [
      "Eliminar controle de versao.",
      "Reexecutar o mesmo fluxo com configuracoes diferentes sem reescrever tudo.",
      "Substituir testes.",
      "Impedir agendamento."
    ],
    "correctIndex": 1,
    "explanation": "Parametros tornam pipelines reutilizaveis."
  },
  {
    "id": 73,
    "domain": "azure_ml",
    "stem": "Um modelo de regressão apresenta RMSE baixo no treino, mas predições absurdas em produção. A equipe suspeita de vazamento de informação entre treino e validação ou de features não disponíveis online.\n\nUm modelo de classificacao retorna **probabilidade** por classe para:",
    "options": [
      "Substituir metricas.",
      "Garantir rotulo sempre igual a 1.",
      "Expressar incerteza e permitir limiares ajustaveis.",
      "Eliminar interpretacao."
    ],
    "correctIndex": 2,
    "explanation": "Probabilidades suportam decisao calibrada."
  },
  {
    "id": 74,
    "domain": "azure_ml",
    "stem": "Sua equipe adotou o Azure Machine Learning para padronizar experimentos e implantar modelos. Você precisa orientar colegas sobre onde artefatos, execuções e metadados ficam organizados no ecossistema do serviço.\n\n**Retreinar** periodicamente pode ser necessario quando:",
    "options": [
      "A acuracia de treino e 100%.",
      "Há drift, novos padroes ou expansao de escopo.",
      "Nao existem dados novos.",
      "O modelo nunca deve mudar."
    ],
    "correctIndex": 1,
    "explanation": "Mundo muda; modelos podem precisar atualizacao."
  },
  {
    "id": 75,
    "domain": "azure_ml",
    "stem": "Você documenta um pipeline que prepara dados tabulares, treina, registra o modelo e publica um endpoint gerenciado. Colegas novatos perguntam qual componente representa o ‘projeto’ central que agrega esses artefatos.\n\nEm MLOps, **CI/CD** para ML estende CI/CD tradicional com:",
    "options": [
      "Somente compilacao de front-end.",
      "Deploy sem ambiente de staging.",
      "Eliminacao de testes.",
      "Validacao de dados, modelo e monitoramento pos-deploy."
    ],
    "correctIndex": 3,
    "explanation": "ML exige gates adicionais alem de codigo."
  },
  {
    "id": 76,
    "domain": "azure_ml",
    "stem": "Um parceiro de negócio pediu comparar o custo de inferência em batch versus online para o mesmo modelo. A equipe técnica precisa alinhar vocabulário sobre tipos de serviço e quando cada um se aplica.\n\nUm **conjunto de dados (dataset)** no Azure ML costuma referir-se a:",
    "options": [
      "Metadados e referencias para dados usados em treino ou pipelines.",
      "Somente imagens PNG.",
      "Backup de email.",
      "Copia fisica obrigatoria de todo o data lake no disco local."
    ],
    "correctIndex": 0,
    "explanation": "Datasets abstraem e versionam referencias a dados."
  },
  {
    "id": 77,
    "domain": "azure_ml",
    "stem": "A integração com Azure DevOps deve disparar pipelines de ML quando há merge na branch principal, com testes de qualidade de dados antes do treino. Você posiciona o papel do Azure ML nesse fluxo.\n\n**Inferencia em tempo real** exige atencao a:",
    "options": [
      "Proibir autoscaling.",
      "Usar apenas batch.",
      "Latencia, escalabilidade e custo por requisicao.",
      "Eliminar logs."
    ],
    "correctIndex": 2,
    "explanation": "SLAs de latencia guiam desenho de endpoint."
  },
  {
    "id": 78,
    "domain": "azure_ml",
    "stem": "Em uma revisão de arquitetura, questionam se o Azure ML substitui totalmente um data warehouse ou se complementa pipelines ETL já existentes no Azure Synapse ou em outros serviços.\n\nEscolher **tamanho de VM** adequado ao treino influencia:",
    "options": [
      "DNS.",
      "Tipo de SSL do site institucional.",
      "Somente cor do portal.",
      "Tempo de execucao e custo; deve equilibrar com o experimento."
    ],
    "correctIndex": 3,
    "explanation": "Compute adequado evita gargalo ou desperdicio."
  },
  {
    "id": 79,
    "domain": "azure_ml",
    "stem": "A operação precisa pontuar milhões de registros em arquivo durante a madrugada, sem exigência de resposta interativa por requisição HTTP. A arquitetura deve refletir esse padrão.\n\n**Exportar** modelo para **ONNX** pode facilitar:",
    "options": [
      "Substituir validacao de dados.",
      "Impedir uso em GPU.",
      "Eliminar testes.",
      "Implantacao em runtimes otimizados e interoperabilidade."
    ],
    "correctIndex": 3,
    "explanation": "ONNX e formato comum para interoperar entre frameworks."
  },
  {
    "id": 80,
    "domain": "azure_ml",
    "stem": "O código de treino e as definições de pipeline devem passar por revisão em branches, com histórico rastreável, antes de promover uma versão do modelo.\n\nEm experimentos, **sementes aleatorias** (random seed) fixas ajudam a:",
    "options": [
      "Garantir dados identicos entre empresas.",
      "Reproduzir resultados quando o algoritmo e estocastico.",
      "Eliminar validacao.",
      "Evitar qualquer aleatoriedade no mundo real."
    ],
    "correctIndex": 1,
    "explanation": "Seeds controlam reprodutibilidade parcial."
  },
  {
    "id": 81,
    "domain": "azure_ml",
    "stem": "Analistas de negócio solicitaram explicar em linguagem simples o que é um ‘experimento’ no Azure ML versus o que é apenas um script Python executado em uma VM sem registro central.\n\n**Monitoramento** pos-implantacao deve acompanhar:",
    "options": [
      "Qualidade de predicao, latencia, volume e erros de entrada.",
      "Somente cliques no site institucional.",
      "Apenas temperatura do escritorio.",
      "Lista de compras pessoais."
    ],
    "correctIndex": 0,
    "explanation": "Monitoramento operacional detecta degradacao cedo."
  },
  {
    "id": 82,
    "domain": "azure_ml",
    "stem": "Cientistas pediram ambientes com pacotes pré-instalados para evitar ‘funciona na minha máquina’. O objetivo é alinhar o ambiente de treino ao container de scoring.\n\nUm **pipeline de re-treino** disparado por drift pode:",
    "options": [
      "Substituir backups.",
      "Atualizar o modelo quando metricas caem abaixo do limiar.",
      "Impedir rollback.",
      "Eliminar aprovacao humana sempre."
    ],
    "correctIndex": 1,
    "explanation": "Automacao de retreino exige salvaguardas; drift e gatilho comum."
  },
  {
    "id": 83,
    "domain": "azure_ml",
    "stem": "Após um aumento súbito de erros em dados de validação, suspeita-se que o modelo memorizou padrões espúrios do conjunto de treino. A reunião foca em diagnóstico de generalização.\n\n**Divisao temporal** em series (treino no passado, teste no futuro) evita:",
    "options": [
      "Qualquer uso de GPU.",
      "Registro de modelo.",
      "Normalizacao.",
      "Vazamento de informacao futura no treino."
    ],
    "correctIndex": 3,
    "explanation": "Em series, ordem temporal importa."
  },
  {
    "id": 84,
    "domain": "azure_ml",
    "stem": "Grandes volumes brutos precisam ser agregados e limpos antes do treino; parte do processamento ocorre em cluster de processamento distribuído integrado ao fluxo.\n\nEm projetos colaborativos, **controle de acesso** ao workspace evita:",
    "options": [
      "Registro de runs.",
      "Uso de notebooks.",
      "Exposicao indevida de dados e credenciais.",
      "Versionamento de experimentos."
    ],
    "correctIndex": 2,
    "explanation": "RBAC e segredos protegem ativos de ML."
  },
  {
    "id": 85,
    "domain": "azure_ml",
    "stem": "Após um incidente, descobriu-se que o endpoint em produção não correspondia ao modelo aprovado no último release. O comitê de MLOps reforça rastreabilidade entre artefato registrado e implantação.\n\n**Metrica de negocio** (ex.: receita) diferente da metrica tecnica implica:",
    "options": [
      "Proibir implantacao.",
      "Alinhar ou traduzir ganhos de ML para o que a empresa otimiza.",
      "Eliminar dados.",
      "Ignorar AUC completamente sempre."
    ],
    "correctIndex": 1,
    "explanation": "Sucesso de ML deve conversar com KPIs reais."
  },
  {
    "id": 86,
    "domain": "vision",
    "stem": "Um concorrente anunciou ‘IA que entende qualquer imagem’. Você explica limitações conhecidas: conjuntos de treino enviesados, contexto ausente e necessidade de validação humana em domínios críticos.\n\nExtrair texto de boletos fotografados para digitacao assistida usa principalmente:",
    "options": [
      "Gerir apenas contas de armazenamento sem analise de midia.",
      "Somente configurar VPN site a site.",
      "Apenas indexar filas Service Bus.",
      "OCR (reconhecimento optico de caracteres)."
    ],
    "correctIndex": 3,
    "explanation": "OCR converte texto em imagem para texto editavel."
  },
  {
    "id": 87,
    "domain": "vision",
    "stem": "A equipe de e-commerce deseja que compradores encontrem produtos visualmente semelhantes a uma foto enviada, usando representações vetoriais e busca por vizinhos.\n\nClassificar uma foto de produto como 'defeituoso' ou 'ok' e tipicamente:",
    "options": [
      "Classificacao de imagem supervisionada.",
      "Apenas compressao JPEG.",
      "Clustering puro sem rotulos.",
      "Regressao de serie temporal."
    ],
    "correctIndex": 0,
    "explanation": "Duas ou mais classes rotuladas indicam classificacao."
  },
  {
    "id": 88,
    "domain": "vision",
    "stem": "Engenheiros discutem exportar o modelo treinado para um formato interoperável que rode em runtimes otimizados em CPU ou GPU em diferentes ambientes.\n\nLocalizar onde na imagem estao varios objetos (caixas delimitadoras) caracteriza:",
    "options": [
      "Somente OCR.",
      "Somente traducao de idioma.",
      "Apenas reducao de ruido.",
      "Deteccao de objetos."
    ],
    "correctIndex": 3,
    "explanation": "Deteccao retorna classes e posicoes de multiplos objetos."
  },
  {
    "id": 89,
    "domain": "vision",
    "stem": "Crianças usam um app educativo que classifica desenhos feitos à mão. O desafio é lidar com traços irregulares e variedade de cores, não com fotos de objetos reais.\n\nTreinar um classificador com pastas de imagens por classe e cenario tipico de:",
    "options": [
      "Somente firewall.",
      "Somente DNS.",
      "Backup de log.",
      "Custom Vision / modelo customizado de classificacao."
    ],
    "correctIndex": 3,
    "explanation": "Custom Vision costuma usar imagens rotuladas por classe."
  },
  {
    "id": 90,
    "domain": "vision",
    "stem": "Um aplicativo móvel permite que usuários fotografem documentos para digitalização. O backend precisa converter texto impresso ou manuscrito em string editável com boa taxa de acerto em condições variáveis de iluminação.\n\nEm cenarios de analise de video agregada (contagem, movimento), costuma-se:",
    "options": [
      "Eliminar qualquer registro.",
      "Apenas enviar email.",
      "Substituir banco relacional.",
      "Processar fluxo de video e extrair eventos ou metricas (conforme servico e politica)."
    ],
    "correctIndex": 3,
    "explanation": "Video analytics agrega informacao de fluxos de midia."
  },
  {
    "id": 91,
    "domain": "vision",
    "stem": "Para reduzir sobreajuste a rotação e escala, o engenheiro aplica transformações controladas nas imagens de treino antes de alimentar a rede.\n\nComparar similaridade entre duas imagens via vetores pode usar:",
    "options": [
      "Somente CRC32 do arquivo.",
      "Apenas nome do arquivo.",
      "Embeddings de imagem e distancia no espaco vetorial.",
      "Somente tamanho em pixels."
    ],
    "correctIndex": 2,
    "explanation": "Embeddings capturam semantica visual para busca e similaridade."
  },
  {
    "id": 92,
    "domain": "vision",
    "stem": "Em agricultura de precisão, drones capturam plantações inteiras. O agrônomo precisa distinguir tipos de vegetação ou pragas a partir de imagens multiespectrais ou RGB de alta resolução.\n\nModeracao de conteudo visual (adulto, violento) apoia:",
    "options": [
      "Apenas cluster Hadoop.",
      "Somente VPN.",
      "Filtragem e conformidade em plataformas.",
      "Somente OCR."
    ],
    "correctIndex": 2,
    "explanation": "Moderacao usa classificadores de conteudo sensivel."
  },
  {
    "id": 93,
    "domain": "vision",
    "stem": "A startup compara APIs de visão gerenciadas versus treinar um modelo customizado do zero, considerando volume de dados rotulados, SLA e custo de manutenção.\n\nSegmentacao semantica (por pixel) difere de classificacao de imagem inteira porque:",
    "options": [
      "Elimina necessidade de imagem.",
      "Nao usa rede neural.",
      "So funciona em audio.",
      "Atribui classe por regiao ou pixel, nao so um rotulo global."
    ],
    "correctIndex": 3,
    "explanation": "Segmentacao produz mascara fina de classes."
  },
  {
    "id": 94,
    "domain": "vision",
    "stem": "Um fluxo de vídeo de monitoramento urbano deve produzir métricas agregadas (por exemplo, ocupação) sem necessariamente identificar indivíduos, respeitando minimização de dados.\n\nDeteccao facial para **verificar identidade** (cenário sensivel) exige atencao a:",
    "options": [
      "Eliminar logs sempre.",
      "Consentimento, privacidade e conformidade legal.",
      "Apenas aumentar resolucao.",
      "Ignorar politicas de uso."
    ],
    "correctIndex": 1,
    "explanation": "Biometria e dados sensiveis exigem governanca rigorosa."
  },
  {
    "id": 95,
    "domain": "vision",
    "stem": "Em inspeção de danos veiculares, o objetivo é delimitar máscaras finas por objeto, não apenas uma caixa ao redor do veículo inteiro.\n\nConverter fala em texto em tempo real integra visao de conversacao com:",
    "options": [
      "Apenas visao computacional estatica.",
      "Somente deteccao de objetos.",
      "Servicos de fala (speech-to-text), nao visao pura.",
      "OCR."
    ],
    "correctIndex": 2,
    "explanation": "STT e modalidade de audio; distinga de visao."
  },
  {
    "id": 96,
    "domain": "vision",
    "stem": "Em logística, câmeras em docas leem códigos de barras danificados ou parcialmente obstruídos; combinar visão computacional com heurísticas de correção é discutido.\n\nPara ler texto em multiplos idiomas em placas, combina-se frequentemente:",
    "options": [
      "OCR com deteccao ou selecao de idioma.",
      "Somente DNS.",
      "Apenas cluster sem dados.",
      "Somente agendamento batch de SO."
    ],
    "correctIndex": 0,
    "explanation": "Multilingue em OCR exige modelo ou pipeline adequado."
  },
  {
    "id": 97,
    "domain": "vision",
    "stem": "A linha de produção quer classificar peças automaticamente em categorias de qualidade usando imagens rotuladas por inspetores. O modelo será retreinado periodicamente com novas fotos.\n\nDescrever uma imagem com frase em linguagem natural (image captioning) e:",
    "options": [
      "Apenas regressao linear.",
      "Tarefa que cruza visao e NLP.",
      "Somente clustering.",
      "Somente criptografia."
    ],
    "correctIndex": 1,
    "explanation": "Captioning liga representacao visual a linguagem."
  },
  {
    "id": 98,
    "domain": "vision",
    "stem": "A plataforma de mídia precisa moderar automaticamente conteúdo impróprio em uploads de usuários, com políticas configuráveis e revisão humana em casos limítrofes.\n\nDeteccao de pontos de referencia faciais (landmarks) pode apoiar:",
    "options": [
      "Apenas DNS.",
      "Somente backup.",
      "Somente compilacao C.",
      "Alinhamento, filtros e analises geometricas (conforme politica)."
    ],
    "correctIndex": 3,
    "explanation": "Landmarks sao pontos-chave em rostos com usos especificos."
  },
  {
    "id": 99,
    "domain": "vision",
    "stem": "Um museu digitaliza acervo fotográfico antigo com ruído e baixo contraste. O objetivo é melhorar legibilidade para OCR e catalogação, sem alterar o conteúdo histórico de forma enganosa.\n\nUm fluxo de digitalizacao de formularios estruturados costuma usar:",
    "options": [
      "Apenas troca de email.",
      "Somente ping ICMP.",
      "Somente RAID de disco.",
      "Reconhecimento de layout e campos (document intelligence / leitura estruturada)."
    ],
    "correctIndex": 3,
    "explanation": "Formularios misturam OCR e compreensao de layout."
  },
  {
    "id": 100,
    "domain": "vision",
    "stem": "Em videoconferência, o produto quer desfocar fundos automaticamente. O time discute segmentação de pessoa versus fundo em tempo real em hardware variado.\n\nAumentar dados de imagem com rotacao e recorte leve e uma forma de:",
    "options": [
      "Apagar conjunto de teste.",
      "Data augmentation para reduzir overfitting.",
      "Eliminar validacao.",
      "Substituir rotulos."
    ],
    "correctIndex": 1,
    "explanation": "Augmentation artificialmente aumenta diversidade de treino."
  },
  {
    "id": 101,
    "domain": "vision",
    "stem": "O time de saúde reforça que qualquer uso de análise de imagens médicas exige validação clínica e conformidade; a IA é apoio à decisão, não substitui protocolos sem supervisão.\n\nClassificar se uma radiografia mostra anomalia sugere:",
    "options": [
      "Implantacao direta sem revisao.",
      "Supervisao medica, dados sensíveis e validacao clinica rigorosa.",
      "Somente entretenimento.",
      "Eliminar conformidade."
    ],
    "correctIndex": 1,
    "explanation": "Saude exige validacao humana e compliance."
  },
  {
    "id": 102,
    "domain": "vision",
    "stem": "Uma rede de varejo quer contar visitantes em lojas a partir de câmeras existentes, agregando fluxo por corredor sem armazenar imagens faciais identificáveis.\n\nDetectar equipamentos de EPI em canteiro (capacete, colete) e:",
    "options": [
      "Apenas agendamento de reuniao.",
      "Somente OCR de CPF.",
      "Somente DNS.",
      "Deteccao de objetos / classificacao em contexto de seguranca."
    ],
    "correctIndex": 3,
    "explanation": "Visao aplicada a seguranca do trabalho usa deteccao."
  },
  {
    "id": 103,
    "domain": "vision",
    "stem": "O jurídico questionou se modelos de geração de imagens sintéticas para treino podem violar direitos de personalidade; a conversa foca em dados de treino e uso responsável.\n\nEstimar profundidade ou distancia em visao estereo relaciona-se a:",
    "options": [
      "Somente backup.",
      "Geometria multi-view e sensores, alem de classificacao simples.",
      "Somente traducao automatica.",
      "Apenas SQL."
    ],
    "correctIndex": 1,
    "explanation": "Visao 3D vai alem de rotulo unico por imagem."
  },
  {
    "id": 104,
    "domain": "vision",
    "stem": "O sistema de segurança precisa não apenas saber se há um objeto na imagem, mas também localizá-lo com caixas delimitadoras para alertas em tempo quase real.\n\nReconhecer logotipos de marcas em fotos de usuario e:",
    "options": [
      "Apenas roteamento IP.",
      "Somente firewall.",
      "Classificacao ou deteccao treinada com exemplos da marca.",
      "Somente compactacao ZIP."
    ],
    "correctIndex": 2,
    "explanation": "Logotipos sao classes visuais especificas."
  },
  {
    "id": 105,
    "domain": "vision",
    "stem": "Dois fluxos distintos são comparados: processar arquivos de imagem em lote noturno versus analisar quadros de um stream ao vivo com requisito de baixa latência.\n\nConverter diagrama em fluxo editavel pode combinar:",
    "options": [
      "Somente SMTP.",
      "Somente ping.",
      "OCR com deteccao de formas e relacoes (fluxos complexos).",
      "Apenas DHCP."
    ],
    "correctIndex": 2,
    "explanation": "Diagramas misturam texto e estrutura visual."
  },
  {
    "id": 106,
    "domain": "vision",
    "stem": "A equipe de UX debate se mostrar caixas de detecção sobre a interface do usuário ou apenas um ícone discreto quando um objeto é encontrado, equilibrando utilidade e privacidade.\n\nAnalise de expressao facial para humor aproximado (cenario etico) requer:",
    "options": [
      "Implantacao sem aviso.",
      "Uso exclusivo infantil sem supervisao.",
      "Consentimento, contexto e cautela contra uso discriminatorio.",
      "Eliminar privacidade."
    ],
    "correctIndex": 2,
    "explanation": "Atributos sensiveis exigem etica e politica clara."
  },
  {
    "id": 107,
    "domain": "vision",
    "stem": "Inspeção de infraestrutura usa imagens de pontes e torres; o objetivo é destacar fissuras e corrosão em zoom, possivelmente com detecção de objetos ou segmentação semântica.\n\nBusca de imagens por similaridade (reverse image search) usa:",
    "options": [
      "Embeddings e indice de vetores aproximados.",
      "Apenas nome de arquivo.",
      "Somente CRC.",
      "Somente tamanho."
    ],
    "correctIndex": 0,
    "explanation": "Similaridade em grande escala usa vetores e ANN."
  },
  {
    "id": 108,
    "domain": "vision",
    "stem": "Formulários escaneados chegam com tabelas e campos estruturados; extrair apenas texto solto não basta — é preciso entender layout e relações entre blocos.\n\nDeteccao de texto em cena natural (placas, letreiros) difere de documento limpo porque:",
    "options": [
      "Ha ruido, perspectiva e iluminacao variavel.",
      "E identico a PDF texto.",
      "Elimina OCR.",
      "Nao usa camera."
    ],
    "correctIndex": 0,
    "explanation": "Texto em cena e mais dificil que documento digitalizado."
  },
  {
    "id": 109,
    "domain": "vision",
    "stem": "O departamento de marketing testa reconhecimento de logotipos e produtos em fotos de redes sociais para medir presença de marca; a precisão varia com ângulo e oclusão.\n\nClassificar tipo de solo ou cultura em imagens de drone e:",
    "options": [
      "Classificacao de imagem em dominio agricola.",
      "Somente audio.",
      "Apenas SQL.",
      "Somente backup."
    ],
    "correctIndex": 0,
    "explanation": "Visao aerea alimenta modelos de supervisao agricola."
  },
  {
    "id": 110,
    "domain": "vision",
    "stem": "Um concorrente anunciou ‘IA que entende qualquer imagem’. Você explica limitações conhecidas: conjuntos de treino enviesados, contexto ausente e necessidade de validação humana em domínios críticos.\n\nDeteccao de danos em veiculos (amassado, risco) costuma ser:",
    "options": [
      "Somente email.",
      "Classificacao ou deteccao supervisionada com fotos rotuladas.",
      "Somente DHCP.",
      "Apenas OCR de multas."
    ],
    "correctIndex": 1,
    "explanation": "Seguros usam visao para triagem de danos."
  },
  {
    "id": 111,
    "domain": "vision",
    "stem": "A equipe de e-commerce deseja que compradores encontrem produtos visualmente semelhantes a uma foto enviada, usando representações vetoriais e busca por vizinhos.\n\nContagem de pessoas em area (agregado, nao identificacao) visa:",
    "options": [
      "Metricas de ocupacao preservando privacidade quando bem desenhado.",
      "Eliminar qualquer etica.",
      "Identificar nome de cada pessoa sempre.",
      "Substituir CCTV por DNS."
    ],
    "correctIndex": 0,
    "explanation": "Contagem agregada reduz identificacao direta."
  },
  {
    "id": 112,
    "domain": "vision",
    "stem": "Engenheiros discutem exportar o modelo treinado para um formato interoperável que rode em runtimes otimizados em CPU ou GPU em diferentes ambientes.\n\nLeitura de codigos de barras e QR em imagem e:",
    "options": [
      "Somente traducao.",
      "Somente regressao.",
      "Tarefa de deteccao/decodificacao especifica, complementar a OCR geral.",
      "Apenas cluster sem rotulo."
    ],
    "correctIndex": 2,
    "explanation": "Codigos estruturados tem decodificadores dedicados."
  },
  {
    "id": 113,
    "domain": "vision",
    "stem": "Crianças usam um app educativo que classifica desenhos feitos à mão. O desafio é lidar com traços irregulares e variedade de cores, não com fotos de objetos reais.\n\nEstimativa de pose humana (esqueleto) aplica-se a:",
    "options": [
      "Somente backup.",
      "Apenas SMTP.",
      "Interacao, esportes, saude — com requisitos eticos e de privacidade.",
      "Somente OCR."
    ],
    "correctIndex": 2,
    "explanation": "Pose tracking e visao avancada com dados biometricos."
  },
  {
    "id": 114,
    "domain": "vision",
    "stem": "Um aplicativo móvel permite que usuários fotografem documentos para digitalização. O backend precisa converter texto impresso ou manuscrito em string editável com boa taxa de acerto em condições variáveis de iluminação.\n\nSeparar primeiro plano e fundo em video para efeitos e:",
    "options": [
      "Somente OCR.",
      "Apenas DNS.",
      "Segmentacao de video / matting em muitos casos.",
      "Somente RAID."
    ],
    "correctIndex": 2,
    "explanation": "Segmentacao temporal e comum em edicao e conferencia."
  },
  {
    "id": 115,
    "domain": "vision",
    "stem": "Para reduzir sobreajuste a rotação e escala, o engenheiro aplica transformações controladas nas imagens de treino antes de alimentar a rede.\n\nReconhecimento de escrita manuscrita difere de OCR de impresso porque:",
    "options": [
      "Ha maior variabilidade de tracos entre escritores.",
      "E identico a fonte Times New Roman.",
      "Elimina rede neural.",
      "Nao usa imagem."
    ],
    "correctIndex": 0,
    "explanation": "Manuscrito e mais ambiguo que texto impresso."
  },
  {
    "id": 116,
    "domain": "vision",
    "stem": "Em agricultura de precisão, drones capturam plantações inteiras. O agrônomo precisa distinguir tipos de vegetação ou pragas a partir de imagens multiespectrais ou RGB de alta resolução.\n\nDeteccao de placas veiculares para leitura posterior combina:",
    "options": [
      "Apenas audio.",
      "Somente DHCP.",
      "Somente traducao.",
      "Deteccao de regiao e OCR focalizado na placa."
    ],
    "correctIndex": 3,
    "explanation": "Pipeline em duas etapas melhora precisao."
  },
  {
    "id": 117,
    "domain": "vision",
    "stem": "A startup compara APIs de visão gerenciadas versus treinar um modelo customizado do zero, considerando volume de dados rotulados, SLA e custo de manutenção.\n\nClassificar cena indoor vs outdoor e:",
    "options": [
      "Somente regressao.",
      "Segmentacao semantica pixel a pixel obrigatoria.",
      "Classificacao de cena de alto nivel.",
      "Apenas cluster."
    ],
    "correctIndex": 2,
    "explanation": "Cenas globais usam rotulos de imagem inteira."
  },
  {
    "id": 118,
    "domain": "vision",
    "stem": "Um fluxo de vídeo de monitoramento urbano deve produzir métricas agregadas (por exemplo, ocupação) sem necessariamente identificar indivíduos, respeitando minimização de dados.\n\nDeteccao de anomalias em imagens industriais (rachadura) sugere:",
    "options": [
      "Apenas DNS.",
      "Modelos supervisionados com defeitos rotulados ou nao supervisionados com baselines.",
      "Somente SMTP.",
      "Somente backup."
    ],
    "correctIndex": 1,
    "explanation": "Visao industrial combina rotulos e/ou deteccao de novidade."
  },
  {
    "id": 119,
    "domain": "vision",
    "stem": "Em inspeção de danos veiculares, o objetivo é delimitar máscaras finas por objeto, não apenas uma caixa ao redor do veículo inteiro.\n\nConverter mesa em imagem para celulas em Excel costuma envolver:",
    "options": [
      "OCR estruturado com deteccao de tabela.",
      "Somente FTP.",
      "Somente DHCP.",
      "Apenas VPN."
    ],
    "correctIndex": 0,
    "explanation": "Tabelas exigem segmentacao de grade e texto."
  },
  {
    "id": 120,
    "domain": "vision",
    "stem": "Em logística, câmeras em docas leem códigos de barras danificados ou parcialmente obstruídos; combinar visão computacional com heurísticas de correção é discutido.\n\nEmbeddings de imagem para catalogo de e-commerce suportam:",
    "options": [
      "Somente SMTP.",
      "Somente DHCP.",
      "Busca por similaridade de produto.",
      "Apenas log de firewall."
    ],
    "correctIndex": 2,
    "explanation": "RecSys visual usa similaridade entre itens."
  },
  {
    "id": 121,
    "domain": "vision",
    "stem": "A linha de produção quer classificar peças automaticamente em categorias de qualidade usando imagens rotuladas por inspetores. O modelo será retreinado periodicamente com novas fotos.\n\nClassificar se imagem medica precisa revisao urgente (triagem) exige:",
    "options": [
      "Implantacao imediata sem supervisao.",
      "Somente entretenimento.",
      "Validacao clinica; IA e apoio, nao substituto automatico sem protocolo.",
      "Eliminar medico."
    ],
    "correctIndex": 2,
    "explanation": "Saude: uso assistivo com governanca."
  },
  {
    "id": 122,
    "domain": "vision",
    "stem": "A plataforma de mídia precisa moderar automaticamente conteúdo impróprio em uploads de usuários, com políticas configuráveis e revisão humana em casos limítrofes.\n\nDeteccao de objetos pequenos (insects, defects) pode precisar:",
    "options": [
      "Somente DNS.",
      "Imagens de alta resolucao e modelos com boa capacidade local.",
      "Apenas agregacao SQL.",
      "Somente OCR."
    ],
    "correctIndex": 1,
    "explanation": "Objetos pequenos sao mais dificeis; dados e arquitetura importam."
  },
  {
    "id": 123,
    "domain": "vision",
    "stem": "Um museu digitaliza acervo fotográfico antigo com ruído e baixo contraste. O objetivo é melhorar legibilidade para OCR e catalogação, sem alterar o conteúdo histórico de forma enganosa.\n\nFusao de imagens multi-espectral em agricultura pode revelar:",
    "options": [
      "Somente texto.",
      "Estresse hidrico ou nutrientes via indices de vegetacao.",
      "Apenas audio.",
      "Somente SMTP."
    ],
    "correctIndex": 1,
    "explanation": "Sensores multi-espectrais suportam agronomia de precisao."
  },
  {
    "id": 124,
    "domain": "vision",
    "stem": "Em videoconferência, o produto quer desfocar fundos automaticamente. O time discute segmentação de pessoa versus fundo em tempo real em hardware variado.\n\nReidentificacao de pessoas entre cameras (cenario sensivel) exige:",
    "options": [
      "Implantacao livre sem restricao.",
      "Eliminar privacidade.",
      "Base legal, minimizacao e governanca forte.",
      "Somente OCR."
    ],
    "correctIndex": 2,
    "explanation": "ReID e altamente sensivel; compliance e obrigatorio."
  },
  {
    "id": 125,
    "domain": "vision",
    "stem": "O time de saúde reforça que qualquer uso de análise de imagens médicas exige validação clínica e conformidade; a IA é apoio à decisão, não substitui protocolos sem supervisão.\n\nClassificar estilo artistico de pintura e:",
    "options": [
      "Classificacao de dominio especifico com dataset rotulado.",
      "Somente DHCP.",
      "Somente VPN.",
      "Apenas backup."
    ],
    "correctIndex": 0,
    "explanation": "Estilos artisticos sao classes culturais em visao."
  },
  {
    "id": 126,
    "domain": "nlp",
    "stem": "Documentação técnica existe em várias versões; o chatbot deve citar a versão correta do manual conforme o produto que o cliente possui.\n\nIdentificar nomes de empresas e datas em contratos e tarefa de:",
    "options": [
      "Substituir backups de VM sem analise de texto.",
      "Treinar exclusivamente redes para imagens de microscopia.",
      "Configurar apenas balanceadores de carga.",
      "Reconhecimento de entidades nomeadas (NER)."
    ],
    "correctIndex": 3,
    "explanation": "NER extrai entidades estruturadas do texto."
  },
  {
    "id": 127,
    "domain": "nlp",
    "stem": "Aplicações multilíngues exigem detectar o idioma de cada trecho antes de encaminhar o texto ao modelo adequado.\n\nDeterminar se avaliacao de produto e positiva ou negativa e:",
    "options": [
      "Somente DNS.",
      "Analise de sentimento.",
      "Somente OCR.",
      "Apenas cluster de imagens."
    ],
    "correctIndex": 1,
    "explanation": "Sentimento classifica polaridade ou emocao."
  },
  {
    "id": 128,
    "domain": "nlp",
    "stem": "Bots precisam interpretar comandos de voz convertidos em texto e mapear intenções estruturadas para acionar APIs backend.\n\nTraduzir paragrafo do portugues para ingles e:",
    "options": [
      "Somente deteccao de objetos.",
      "Apenas regressao.",
      "Somente DHCP.",
      "Traducao automatica de maquina."
    ],
    "correctIndex": 3,
    "explanation": "MT trabalha com pares de idiomas."
  },
  {
    "id": 129,
    "domain": "nlp",
    "stem": "O time de dados discute embeddings versus TF-IDF para busca semântica interna, considerando corpus em português e vocabulário de domínio.\n\nResponder a pergunta com base apenas em documento fornecido e:",
    "options": [
      "Apenas backup.",
      "Somente ordenacao de IP.",
      "Somente SMTP.",
      "QnA / resposta extrativa ou generativa fundamentada no contexto."
    ],
    "correctIndex": 3,
    "explanation": "RAG e QnA usam contexto textual."
  },
  {
    "id": 130,
    "domain": "nlp",
    "stem": "Um assistente interno deve responder perguntas usando apenas trechos aprovados de manuais técnicos, reduzindo respostas inventadas sem base.\n\nResumir noticia longa em tres bullets e:",
    "options": [
      "Somente OCR de PDF escaneado.",
      "Somente VPN.",
      "Apenas deteccao de rosto.",
      "Sumarizacao de texto."
    ],
    "correctIndex": 3,
    "explanation": "Sumarizacao comprime conteudo mantendo pontos principais."
  },
  {
    "id": 131,
    "domain": "nlp",
    "stem": "Textos sociais misturam dois idiomas na mesma frase; o pipeline deve segmentar e rotear corretamente cada parte.\n\nDetectar idioma de tweet antes de pipeline e:",
    "options": [
      "Somente RAID.",
      "Somente segmentacao de imagem.",
      "Apenas DNS.",
      "Identificacao de idioma."
    ],
    "correctIndex": 3,
    "explanation": "Language ID roteia modelo adequado."
  },
  {
    "id": 132,
    "domain": "nlp",
    "stem": "Redes sociais internas geram sarcasmo e gírias; modelos de sentimento precisam ser calibrados para o contexto organizacional, não apenas notícias gerais.\n\nExtrair palavras-chave de artigo cientifico e:",
    "options": [
      "Extracao de frases-chave / key phrase.",
      "Somente DHCP.",
      "Somente ping.",
      "Apenas FTP."
    ],
    "correctIndex": 0,
    "explanation": "Key phrases destacam termos centrais."
  },
  {
    "id": 133,
    "domain": "nlp",
    "stem": "O produto de podcast precisa gerar legendas sincronizadas a partir do áudio, com possibilidade de revisão humana.\n\nConverter fala ao vivo em texto para legendas e:",
    "options": [
      "Somente SQL.",
      "Apenas deteccao de objeto.",
      "Reconhecimento de fala continuo (speech-to-text).",
      "Somente OCR."
    ],
    "correctIndex": 2,
    "explanation": "STT transforma audio em texto."
  },
  {
    "id": 134,
    "domain": "nlp",
    "stem": "A equipe de suporte quer classificar automaticamente o motivo do contato (faturamento, técnico, cancelamento) a partir de texto livre e campos estruturados opcionais.\n\nSintetizar voz natural para leitor de tela e:",
    "options": [
      "Somente DNS.",
      "Somente OCR.",
      "Apenas clustering.",
      "Text-to-speech."
    ],
    "correctIndex": 3,
    "explanation": "TTS gera audio a partir de texto."
  },
  {
    "id": 135,
    "domain": "nlp",
    "stem": "Um projeto de acessibilidade converte documentos longos em áudio com voz natural, respeitando pronúncia de termos técnicos e siglas.\n\nClassificar ticket de suporte em categorias predefinidas e:",
    "options": [
      "Somente DHCP.",
      "Classificacao de texto.",
      "Somente regressao de precos.",
      "Apenas visao."
    ],
    "correctIndex": 1,
    "explanation": "Text classification rotula documentos inteiros."
  },
  {
    "id": 136,
    "domain": "nlp",
    "stem": "Analistas de RH querem extrair listas de competências de currículos estruturados em texto livre para cruzar com vagas abertas.\n\nEncontrar documentos similares por consulta e texto indexado usa:",
    "options": [
      "Somente CRC de arquivo.",
      "Apenas ping.",
      "Somente SMTP.",
      "Busca semantica ou BM25 + embeddings."
    ],
    "correctIndex": 3,
    "explanation": "Busca combina lexical e semantica."
  },
  {
    "id": 137,
    "domain": "nlp",
    "stem": "Um banco de investimentos analisa notícias e comunicados para sinalizar menções a riscos regulatórios; a precisão do reconhecimento de entidades é crítica.\n\nCorrigir gramatica e estilo em paragrafo e:",
    "options": [
      "Apenas deteccao de anomalia em rede.",
      "Somente OCR.",
      "Geracao/edicao assistida por modelo de linguagem.",
      "Somente DNS."
    ],
    "correctIndex": 2,
    "explanation": "Correcao e tarefa de sequencia a sequencia."
  },
  {
    "id": 138,
    "domain": "nlp",
    "stem": "A fusão de duas empresas exige harmonizar glossários de produto; NLP pode sugerir equivalências, mas decisão final é humana.\n\nExtrair relacao 'empresa X adquiriu empresa Y' e:",
    "options": [
      "Extracao de relacoes / eventos em NLP avancado.",
      "Somente FTP.",
      "Apenas DHCP.",
      "Somente cluster sem rotulo."
    ],
    "correctIndex": 0,
    "explanation": "Relacoes ligam entidades com predicados."
  },
  {
    "id": 139,
    "domain": "nlp",
    "stem": "O time de compliance solicita mascarar CPF, e-mails e telefones em logs de chat antes de armazenamento de longo prazo.\n\nModerar comentarios toxicos antes de publicacao e:",
    "options": [
      "Somente VPN.",
      "Apenas backup.",
      "Classificacao de texto com politicas de conteudo.",
      "Somente OCR."
    ],
    "correctIndex": 2,
    "explanation": "Moderacao usa classificadores de toxicidade."
  },
  {
    "id": 140,
    "domain": "nlp",
    "stem": "O produto editorial propõe gerar rascunhos de posts a partir de tópicos, com revisão humana obrigatória antes da publicação.\n\nGerar pergunta de estudo a partir de paragrafo de livro e:",
    "options": [
      "Geracao de texto condicionada ao conteudo.",
      "Somente RAID.",
      "Somente DHCP.",
      "Apenas DNS."
    ],
    "correctIndex": 0,
    "explanation": "QG cria perguntas para avaliar leitura."
  },
  {
    "id": 141,
    "domain": "nlp",
    "stem": "Em compliance, é preciso detectar dados pessoais em anexos de e-mail antes do arquivamento; falsos negativos são inaceitáveis para o regulador.\n\nSeparar texto em tokens e frases e etapa de:",
    "options": [
      "Apenas SMTP.",
      "Pre-processamento (tokenizacao, sentence segmentation).",
      "Somente ping.",
      "Somente treino de GPU."
    ],
    "correctIndex": 1,
    "explanation": "Tokenizacao e base para modelos de NLP."
  },
  {
    "id": 142,
    "domain": "nlp",
    "stem": "Uma busca no portal corporativo deve encontrar documentos por significado aproximado, não apenas por palavras-chave idênticas.\n\nRepresentar palavra como vetor denso (word embedding) permite:",
    "options": [
      "Similaridade semantica e analogias aproximadas.",
      "Substituir qualquer traducao humana sempre.",
      "Somente ordenar por ordem alfabetica.",
      "Eliminar significado."
    ],
    "correctIndex": 0,
    "explanation": "Embeddings capturam semantica em espaco vetorial."
  },
  {
    "id": 143,
    "domain": "nlp",
    "stem": "Em call center, supervisores precisam de transcrições com marcação de falante e detecção de palavras proibidas para treinamento de qualidade.\n\nModelo de linguagem grande usado com prompts e:",
    "options": [
      "Abordagem prompt-based para tarefas diversas.",
      "Somente RAID.",
      "Apenas OCR.",
      "Somente DHCP."
    ],
    "correctIndex": 0,
    "explanation": "LLMs generalizam via instrucao e contexto."
  },
  {
    "id": 144,
    "domain": "nlp",
    "stem": "Um departamento jurídico recebe contratos em PDF e precisa identificar automaticamente partes, datas e valores para indexação em sistema de gestão documental.\n\nDeteccao de idioma misto em documento bilinique e:",
    "options": [
      "Segmentacao por trechos e ID de idioma por segmento.",
      "Somente visao.",
      "Somente SMTP.",
      "Apenas DNS."
    ],
    "correctIndex": 0,
    "explanation": "Textos reais podem misturar idiomas."
  },
  {
    "id": 145,
    "domain": "nlp",
    "stem": "O roadmap inclui resumir threads longas de e-mail para gestores, preservando decisões e prazos mencionados em várias mensagens encadeadas.\n\nExtrair valor de fatura em texto livre e:",
    "options": [
      "Somente FTP.",
      "NER e possivelmente estruturacao de documento.",
      "Apenas ping.",
      "Somente DHCP."
    ],
    "correctIndex": 1,
    "explanation": "Campos financeiros sao entidades especificas."
  },
  {
    "id": 146,
    "domain": "nlp",
    "stem": "A empresa recebe feedback de clientes em formulários abertos; o time de produto quer agrupar temas emergentes sem rotular manualmente milhares de respostas.\n\nClassificar intencao do usuario em chat ('cancelar pedido') e:",
    "options": [
      "Somente SQL.",
      "Classificacao de intencao em NLP de dialogo.",
      "Somente OCR.",
      "Apenas deteccao de objeto."
    ],
    "correctIndex": 1,
    "explanation": "Intencao direciona fluxo conversacional."
  },
  {
    "id": 147,
    "domain": "nlp",
    "stem": "A central de atendimento quer priorizar tickets urgentos analisando o tom das mensagens dos clientes em vários idiomas.\n\nTraduzir fala diretamente para outro idioma (pipeline) combina:",
    "options": [
      "Apenas DNS.",
      "Somente RAID.",
      "Somente OCR.",
      "STT, traducao e opcionalmente TTS."
    ],
    "correctIndex": 3,
    "explanation": "Sistemas de fala encadeiam modulos."
  },
  {
    "id": 148,
    "domain": "nlp",
    "stem": "Engenheiros avaliam métricas automáticas de qualidade para tradução automática quando há frases de referência aprovadas pelo revisor humano.\n\nDetectar nome de medicamento em prontuario (dado sensivel) exige:",
    "options": [
      "Somente DHCP.",
      "Eliminar criptografia.",
      "Publicar prontuario na web.",
      "NER com governanca e minimizacao de PHI."
    ],
    "correctIndex": 3,
    "explanation": "Saude: privacidade e compliance sao mandatorios."
  },
  {
    "id": 149,
    "domain": "nlp",
    "stem": "Documentação técnica existe em várias versões; o chatbot deve citar a versão correta do manual conforme o produto que o cliente possui.\n\nResumir thread longo de email para decisao rapida e:",
    "options": [
      "Apenas DNS.",
      "Somente SMTP.",
      "Sumarizacao multi-documento ou longo contexto.",
      "Somente ping."
    ],
    "correctIndex": 2,
    "explanation": "Sumarios ajudam consumo de texto longo."
  },
  {
    "id": 150,
    "domain": "nlp",
    "stem": "Aplicações multilíngues exigem detectar o idioma de cada trecho antes de encaminhar o texto ao modelo adequado.\n\nExtrair data limite de proposta em edital e:",
    "options": [
      "Somente VPN.",
      "Somente DHCP.",
      "NER temporal / extracao estruturada.",
      "Apenas RAID."
    ],
    "correctIndex": 2,
    "explanation": "Datas sao entidades temporais comuns."
  },
  {
    "id": 151,
    "domain": "nlp",
    "stem": "Bots precisam interpretar comandos de voz convertidos em texto e mapear intenções estruturadas para acionar APIs backend.\n\nGerar codigo a partir de descricao em linguagem natural e:",
    "options": [
      "Geracao condicionada (pode exigir revisao humana).",
      "Somente FTP.",
      "Apenas DHCP.",
      "Somente OCR."
    ],
    "correctIndex": 0,
    "explanation": "Codigo sintetizado deve ser revisado e testado."
  },
  {
    "id": 152,
    "domain": "nlp",
    "stem": "O time de dados discute embeddings versus TF-IDF para busca semântica interna, considerando corpus em português e vocabulário de domínio.\n\nDetectar ironia ou sarcasmo em texto e:",
    "options": [
      "Tarefa dificil de NLP; contexto e necessario.",
      "Trivial como sentimento simples sempre.",
      "Somente ping.",
      "Somente DNS."
    ],
    "correctIndex": 0,
    "explanation": "Sarcasmo exige modelo e contexto ricos."
  },
  {
    "id": 153,
    "domain": "nlp",
    "stem": "Um assistente interno deve responder perguntas usando apenas trechos aprovados de manuais técnicos, reduzindo respostas inventadas sem base.\n\nConverter audio de reuniao em ata com identificacao de falantes e:",
    "options": [
      "Somente RAID.",
      "Apenas DHCP.",
      "Somente OCR.",
      "STT + diarizacao (quem falou quando)."
    ],
    "correctIndex": 3,
    "explanation": "Diarizacao separa falantes no tempo."
  },
  {
    "id": 154,
    "domain": "nlp",
    "stem": "Textos sociais misturam dois idiomas na mesma frase; o pipeline deve segmentar e rotear corretamente cada parte.\n\nExtrair topico principal de colecao de noticias e:",
    "options": [
      "Modelagem de topicos ou classificacao multi-rotulo.",
      "Somente FTP.",
      "Apenas ping.",
      "Somente DHCP."
    ],
    "correctIndex": 0,
    "explanation": "Topic modeling descobre temas latentes."
  },
  {
    "id": 155,
    "domain": "nlp",
    "stem": "Redes sociais internas geram sarcasmo e gírias; modelos de sentimento precisam ser calibrados para o contexto organizacional, não apenas notícias gerais.\n\nPreencher lacunas em frase (cloze) e exercicio de:",
    "options": [
      "Compreensao de linguagem / modelo de linguagem.",
      "Somente SMTP.",
      "Somente OCR.",
      "Apenas DNS."
    ],
    "correctIndex": 0,
    "explanation": "Cloze testa coerencia e conhecimento linguistico."
  },
  {
    "id": 156,
    "domain": "nlp",
    "stem": "O produto de podcast precisa gerar legendas sincronizadas a partir do áudio, com possibilidade de revisão humana.\n\nDetectar idioma ofensivo sem bloquear criticas legitimas e:",
    "options": [
      "Problema resolvido apenas com lista de palvoes.",
      "Somente RAID.",
      "Somente DHCP.",
      "Desafio de nuance; requer dados rotulados com contexto."
    ],
    "correctIndex": 3,
    "explanation": "Moderacao precisa reduzir falsos positivos."
  },
  {
    "id": 157,
    "domain": "nlp",
    "stem": "A equipe de suporte quer classificar automaticamente o motivo do contato (faturamento, técnico, cancelamento) a partir de texto livre e campos estruturados opcionais.\n\nVectorizar documento inteiro para busca semantica usa:",
    "options": [
      "Embeddings de documento ou pooling de tokens.",
      "Somente CRC.",
      "Somente SMTP.",
      "Apenas ping."
    ],
    "correctIndex": 0,
    "explanation": "Embeddings representam texto longo em vetor."
  },
  {
    "id": 158,
    "domain": "nlp",
    "stem": "Um projeto de acessibilidade converte documentos longos em áudio com voz natural, respeitando pronúncia de termos técnicos e siglas.\n\nExtrair intencao e entidade de 'marcar reuniao amanha as 15h' e:",
    "options": [
      "Somente OCR.",
      "Parsing semantico para agendamento (intencao + tempo).",
      "Apenas DNS.",
      "Somente RAID."
    ],
    "correctIndex": 1,
    "explanation": "Dialogo estrutura intencao e slots."
  },
  {
    "id": 159,
    "domain": "nlp",
    "stem": "Analistas de RH querem extrair listas de competências de currículos estruturados em texto livre para cruzar com vagas abertas.\n\nTraduzir com preservacao de genero gramatical onde aplicavel e:",
    "options": [
      "Somente DHCP.",
      "Apenas ping.",
      "Desafio linguistico para MT; modelos contextuais ajudam.",
      "Somente FTP."
    ],
    "correctIndex": 2,
    "explanation": "Traducao vai alem de substituicao lexical."
  },
  {
    "id": 160,
    "domain": "nlp",
    "stem": "Um banco de investimentos analisa notícias e comunicados para sinalizar menções a riscos regulatórios; a precisão do reconhecimento de entidades é crítica.\n\nClassificar spam vs nao spam em email e:",
    "options": [
      "Apenas deteccao de objeto.",
      "Classificacao binaria de texto classica.",
      "Somente OCR.",
      "Somente VPN."
    ],
    "correctIndex": 1,
    "explanation": "Spam filtering e benchmark de classificacao."
  },
  {
    "id": 161,
    "domain": "nlp",
    "stem": "A fusão de duas empresas exige harmonizar glossários de produto; NLP pode sugerir equivalências, mas decisão final é humana.\n\nExtrair lista de competencias de curriculo em PDF texto e:",
    "options": [
      "NER + possivel segmentacao de secao.",
      "Somente DHCP.",
      "Somente ping.",
      "Apenas RAID."
    ],
    "correctIndex": 0,
    "explanation": "CV estruturado mistura layout e texto."
  },
  {
    "id": 162,
    "domain": "nlp",
    "stem": "O time de compliance solicita mascarar CPF, e-mails e telefones em logs de chat antes de armazenamento de longo prazo.\n\nGerar legenda sincronizada com audio (closed captions) combina:",
    "options": [
      "Somente SMTP.",
      "Apenas DNS.",
      "STT com alinhamento temporal.",
      "Somente OCR."
    ],
    "correctIndex": 2,
    "explanation": "Legendas precisam timestamps."
  },
  {
    "id": 163,
    "domain": "nlp",
    "stem": "O produto editorial propõe gerar rascunhos de posts a partir de tópicos, com revisão humana obrigatória antes da publicação.\n\nDetectar emocao basica em texto curto e:",
    "options": [
      "Somente ping.",
      "Apenas FTP.",
      "Classificacao de emocao / tom.",
      "Somente DHCP."
    ],
    "correctIndex": 2,
    "explanation": "Emocao e rotulo alternativo a sentimento."
  },
  {
    "id": 164,
    "domain": "nlp",
    "stem": "Em compliance, é preciso detectar dados pessoais em anexos de e-mail antes do arquivamento; falsos negativos são inaceitáveis para o regulador.\n\nResponder pergunta sobre manual tecnico exige:",
    "options": [
      "Somente DHCP.",
      "Modelo com contexto longo ou recuperacao de trechos (RAG).",
      "Somente RAID.",
      "Apenas DNS."
    ],
    "correctIndex": 1,
    "explanation": "RAG reduz alucinacao ao ancorar em fontes."
  },
  {
    "id": 165,
    "domain": "nlp",
    "stem": "Uma busca no portal corporativo deve encontrar documentos por significado aproximado, não apenas por palavras-chave idênticas.\n\nConverter comandos de voz para acoes em app e:",
    "options": [
      "Somente SQL.",
      "Somente OCR.",
      "STT + interpretacao de intencao / comando.",
      "Apenas deteccao de objeto."
    ],
    "correctIndex": 2,
    "explanation": "Assistentes de voz encadeiam reconhecimento e NLU."
  },
  {
    "id": 166,
    "domain": "conversational",
    "stem": "Uma empresa implanta um bot em Teams e no site institucional. Os desenvolvedores precisam isolar a lógica de diálogo das particularidades de cada canal de comunicação.\n\nEm compreensao de linguagem natural, **intencao** representa:",
    "options": [
      "O objetivo principal do usuario na mensagem.",
      "Somente o horario do servidor.",
      "A cor do bot no canal.",
      "Um endereco IP."
    ],
    "correctIndex": 0,
    "explanation": "Intencao classifica o que o usuario quer realizar."
  },
  {
    "id": 167,
    "domain": "conversational",
    "stem": "O assistente de voz encadeia reconhecimento de fala, interpretação de linguagem natural e síntese de voz na resposta.\n\n**Entidades** em um utterance capturam:",
    "options": [
      "Somente o tom emocional global.",
      "Apenas o tamanho da mensagem.",
      "Detalhes estruturados como datas, locais ou nomes de produto.",
      "Somente latencia de rede."
    ],
    "correctIndex": 2,
    "explanation": "Entidades preenchem slots do dialogo."
  },
  {
    "id": 168,
    "domain": "conversational",
    "stem": "Product owners pedem A/B test em saudações e tom de voz do bot, medindo conclusão de tarefas e satisfação declarada.\n\nUm **bot** em multiplos canais (web, Teams) usa normalmente:",
    "options": [
      "Somente SMTP.",
      "Somente RAID.",
      "Camada de adaptacao do canal + nucleo de dialogo.",
      "Apenas DHCP."
    ],
    "correctIndex": 2,
    "explanation": "Conectores isolam canal da logica conversacional."
  },
  {
    "id": 169,
    "domain": "conversational",
    "stem": "O FAQ interno foi ingerido em uma base de perguntas e respostas curadas; o bot deve priorizar essas fontes antes de respostas genéricas.\n\nBase de **QnA** a partir de FAQ e util para:",
    "options": [
      "Treinar redes de visao.",
      "Somente DNS.",
      "Somente backup.",
      "Responder perguntas frequentes com pares curados."
    ],
    "correctIndex": 3,
    "explanation": "QnA mapeia perguntas a respostas documentadas."
  },
  {
    "id": 170,
    "domain": "conversational",
    "stem": "O mesmo bot deve adaptar o formato da mensagem quando o canal não suporta recursos avançados disponíveis em outros.\n\nFluxo **multiturmo** mantem contexto com:",
    "options": [
      "Estado de dialogo e historico da conversa.",
      "Somente um turno sem memoria.",
      "Somente ping.",
      "Apenas OCR."
    ],
    "correctIndex": 0,
    "explanation": "Dialogo precisa memoria para coerencia."
  },
  {
    "id": 171,
    "domain": "conversational",
    "stem": "Integrações com ERP falham esporadicamente; o diálogo deve comunicar erro de forma clara e oferecer repetir ou abrir chamado.\n\nConfirmacao explicita antes de acao destrutiva e boa pratica de:",
    "options": [
      "Somente DHCP.",
      "Seguranca e UX conversacional.",
      "Somente FTP.",
      "Eliminar qualquer pergunta ao usuario."
    ],
    "correctIndex": 1,
    "explanation": "Confirmacoes evitam erros irreversiveis."
  },
  {
    "id": 172,
    "domain": "conversational",
    "stem": "Usuários frequentemente mudam de assunto no meio de um fluxo guiado; o sistema deve manter estado e permitir retomada ou escalonamento humano.\n\nFallback quando intencao nao reconhecida deve:",
    "options": [
      "Apagar historico sem aviso.",
      "Pedir esclarecimento ou oferecer menu de ajuda.",
      "Reiniciar servidor.",
      "Encerrar silenciosamente sempre."
    ],
    "correctIndex": 1,
    "explanation": "Fallback gracioso melhora retencao."
  },
  {
    "id": 173,
    "domain": "conversational",
    "stem": "Middleware intercepta mensagens para aplicar locale, registro de auditoria e políticas de conteúdo antes do processamento principal.\n\nIntegrar bot com backend de pedidos exige:",
    "options": [
      "Expor chaves no cliente.",
      "Somente DNS.",
      "Somente SMTP.",
      "APIs seguras e autenticacao do usuario."
    ],
    "correctIndex": 3,
    "explanation": "Integracao precisa seguranca e identidade."
  },
  {
    "id": 174,
    "domain": "conversational",
    "stem": "O bot multilíngue deve negociar idioma com o usuário na primeira interação e lembrar a preferência nas próximas sessões.\n\nTestar dialogo com variacoes linguisticas reduz:",
    "options": [
      "Fragilidade a diferentes formas de pedir a mesma intencao.",
      "Somente custo de GPU.",
      "Somente RAID.",
      "Apenas DHCP."
    ],
    "correctIndex": 0,
    "explanation": "Utterances variados melhoram robustez."
  },
  {
    "id": 175,
    "domain": "conversational",
    "stem": "Para ações que alteram dados sensíveis, o fluxo exige confirmação explícita do usuário antes de executar a operação.\n\nPersonalidade consistente do bot ajuda:",
    "options": [
      "Somente ping.",
      "Expectativa do usuario e confianca na marca.",
      "Somente DHCP.",
      "Confundir proposito do servico."
    ],
    "correctIndex": 1,
    "explanation": "Tom e persona fazem parte do design conversacional."
  },
  {
    "id": 176,
    "domain": "conversational",
    "stem": "Estado de perfil do usuário (preferências persistentes) deve ser separado do estado volátil da conversa atual na sessão.\n\nRegistrar **telemetria** de conversa (sem dados sensiveis) ajuda a:",
    "options": [
      "Eliminar privacidade sempre.",
      "Somente SMTP.",
      "Publicar chats integralmente.",
      "Medir abandono e lacunas de compreensao."
    ],
    "correctIndex": 3,
    "explanation": "Metricas guiam melhoria continua."
  },
  {
    "id": 177,
    "domain": "conversational",
    "stem": "Em ambientes regulados, cada resposta que altera estado deve registrar ID de correlação para auditoria cruzada com sistemas legados.\n\nHandoff para atendente humano e indicado quando:",
    "options": [
      "Nunca.",
      "Sempre no primeiro turno.",
      "Somente DHCP.",
      "Baixa confianca, pedido explicito ou caso sensivel."
    ],
    "correctIndex": 3,
    "explanation": "Escalonamento humano cobre limites do bot."
  },
  {
    "id": 178,
    "domain": "conversational",
    "stem": "Quando a intenção não é reconhecida com confiança suficiente, o bot deve pedir esclarecimento ou oferecer opções em vez de falhar em silêncio.\n\nCartoes adaptativos (rich cards) melhoram:",
    "options": [
      "Somente RAID.",
      "Clareza de opcoes e acoes no canal que suporta.",
      "Somente audio.",
      "Apenas DNS."
    ],
    "correctIndex": 1,
    "explanation": "UI rica complementa texto."
  },
  {
    "id": 179,
    "domain": "conversational",
    "stem": "O help desk quer que o bot reconheça quando o usuário pede para falar com humano e transfira o contexto resumido para o atendente.\n\nDeteccao de idioma no primeiro turno permite:",
    "options": [
      "Somente DHCP.",
      "Carregar modelo de NLU e respostas no idioma correto.",
      "Ignorar preferencia do usuario.",
      "Somente ping."
    ],
    "correctIndex": 1,
    "explanation": "Multilingue comeca pela identificacao de idioma."
  },
  {
    "id": 180,
    "domain": "conversational",
    "stem": "Desenvolvedores discutem separar modelo de linguagem grande de regras de negócio determinísticas que não podem ser ‘alucinadas’.\n\nPadroes de **small talk** devem:",
    "options": [
      "Somente DHCP.",
      "Somente FTP.",
      "Dominar toda a conversa indefinidamente.",
      "Ser limitados para nao competir com o proposito principal."
    ],
    "correctIndex": 3,
    "explanation": "Small talk util mas secundario."
  },
  {
    "id": 181,
    "domain": "conversational",
    "stem": "A integração com APIs corporativas exige que o usuário autentique-se com o provedor de identidade da organização antes de consultar pedidos.\n\nAutenticacao antes de dados da conta protege:",
    "options": [
      "Publicar dados sem login.",
      "Privacidade e conformidade.",
      "Somente SMTP.",
      "Somente DNS."
    ],
    "correctIndex": 1,
    "explanation": "Bots com dados pessoais exigem auth."
  },
  {
    "id": 182,
    "domain": "conversational",
    "stem": "Em horário de pico, o bot deve informar tempos de espera estimados ao escalar para fila humana, sem inventar números.\n\nVersionar fluxos de dialogo em repositorio permite:",
    "options": [
      "Somente DHCP.",
      "Revisao, rollback e testes antes de publicar.",
      "Somente RAID.",
      "Editar so em producao sem controle."
    ],
    "correctIndex": 1,
    "explanation": "DevOps conversacional reduz incidentes."
  },
  {
    "id": 183,
    "domain": "conversational",
    "stem": "O marketing quer personalizar promoções no chat com base no histórico de compras, respeitando opt-in e legislação de privacidade.\n\nMedir **taxa de resolucao** sem handoff indica:",
    "options": [
      "Efetividade do self-service automatizado.",
      "Somente ping.",
      "Somente latencia.",
      "Apenas DHCP."
    ],
    "correctIndex": 0,
    "explanation": "Deflection e KPI comum em bots."
  },
  {
    "id": 184,
    "domain": "conversational",
    "stem": "A telemetria de conversas (sem dados pessoais) será usada para identificar lacunas de compreensão e priorizar novos exemplos de treino.\n\nEvitar linguagem excludente e discriminatoria no bot e:",
    "options": [
      "Somente DHCP.",
      "Parte de inclusao e marca.",
      "Somente FTP.",
      "Irrelevante."
    ],
    "correctIndex": 1,
    "explanation": "Texto do bot deve seguir diretrizes inclusivas."
  },
  {
    "id": 185,
    "domain": "conversational",
    "stem": "Um piloto em WhatsApp exige mensagens curtas e confirmações por botão; o mesmo diálogo no portal web pode usar formulários longos.\n\nIntegrar **LUIS/CLU** tipicamente significa:",
    "options": [
      "Publicar modelo de intencoes e entidades e chamar endpoint de predicao.",
      "Somente instalar antivirus.",
      "Apenas DHCP.",
      "Somente RAID."
    ],
    "correctIndex": 0,
    "explanation": "Servicos de NLU expoem endpoint de scoring de texto."
  },
  {
    "id": 186,
    "domain": "conversational",
    "stem": "Durante incidente, o modo degradação do bot deve informar indisponibilidade parcial e evitar prometer prazos que APIs externas não garantem.\n\nUm **turn** na conversa contem:",
    "options": [
      "Apenas DNS.",
      "Mensagem do usuario e resposta do bot em sequencia.",
      "Somente logs de firewall.",
      "Somente SMTP."
    ],
    "correctIndex": 1,
    "explanation": "Turn estrutura interacao dialogica."
  },
  {
    "id": 187,
    "domain": "conversational",
    "stem": "Em canais que suportam cartões ricos, o time de UX quer botões e imagens estruturadas em vez de apenas texto plano.\n\nDefinir **escopo** do bot evita:",
    "options": [
      "Somente ping.",
      "Somente DHCP.",
      "Qualquer limite util.",
      "Expectativa de resolver tarefas fora do dominio."
    ],
    "correctIndex": 3,
    "explanation": "Escopo claro reduz frustracao."
  },
  {
    "id": 188,
    "domain": "conversational",
    "stem": "A equipe de segurança exige que o bot nunca exponha dados de outros clientes mesmo se o usuário tentar induzir o modelo por engenharia social.\n\nPadronizar formato de data/hora nas entidades evita:",
    "options": [
      "Somente FTP.",
      "Somente DHCP.",
      "Qualquer integracao.",
      "Ambiguidade em agendamentos."
    ],
    "correctIndex": 3,
    "explanation": "Resolver entidades temporais e critico."
  },
  {
    "id": 189,
    "domain": "conversational",
    "stem": "Uma empresa implanta um bot em Teams e no site institucional. Os desenvolvedores precisam isolar a lógica de diálogo das particularidades de cada canal de comunicação.\n\nSimular conversas adversariais em teste ajuda a:",
    "options": [
      "Somente RAID.",
      "Eliminar testes.",
      "Encontrar falhas de seguranca e injecao de prompt (onde aplicavel).",
      "Somente DHCP."
    ],
    "correctIndex": 2,
    "explanation": "Testes adversariais fortalecem robustez."
  },
  {
    "id": 190,
    "domain": "conversational",
    "stem": "O assistente de voz encadeia reconhecimento de fala, interpretação de linguagem natural e síntese de voz na resposta.\n\nEm voz, **barge-in** permite:",
    "options": [
      "Usuario interromper prompt do sistema.",
      "Somente texto.",
      "Apenas DHCP.",
      "Somente ping."
    ],
    "correctIndex": 0,
    "explanation": "IVR moderno suporta interrupcao."
  },
  {
    "id": 191,
    "domain": "conversational",
    "stem": "Product owners pedem A/B test em saudações e tom de voz do bot, medindo conclusão de tarefas e satisfação declarada.\n\nDesambiguacao quando duas intencoes tem score parecido:",
    "options": [
      "Escolher aleatoriamente.",
      "Somente FTP.",
      "Somente DHCP.",
      "Perguntar ao usuario qual interpretacao seguir."
    ],
    "correctIndex": 3,
    "explanation": "Desambiguacao melhora precisao."
  },
  {
    "id": 192,
    "domain": "conversational",
    "stem": "O FAQ interno foi ingerido em uma base de perguntas e respostas curadas; o bot deve priorizar essas fontes antes de respostas genéricas.\n\nCumprimento normativo (LGPD/GDPR) em bot exige:",
    "options": [
      "Somente RAID.",
      "Somente DHCP.",
      "Informar tratamento de dados e obter consentimento quando necessario.",
      "Coletar tudo sem aviso."
    ],
    "correctIndex": 2,
    "explanation": "Privacidade e mandatoria em dados pessoais."
  },
  {
    "id": 193,
    "domain": "conversational",
    "stem": "O mesmo bot deve adaptar o formato da mensagem quando o canal não suporta recursos avançados disponíveis em outros.\n\nUsar **templates** de resposta com slots preenchidos ajuda:",
    "options": [
      "Consistencia e localizacao.",
      "Gerar texto totalmente aleatorio sem revisao.",
      "Somente ping.",
      "Somente DHCP."
    ],
    "correctIndex": 0,
    "explanation": "Templates estruturam linguagem natural controlada."
  },
  {
    "id": 194,
    "domain": "conversational",
    "stem": "Integrações com ERP falham esporadicamente; o diálogo deve comunicar erro de forma clara e oferecer repetir ou abrir chamado.\n\nMonitorar **satisfacao** pos-atendimento (CSAT) em bot:",
    "options": [
      "Somente FTP.",
      "Somente DHCP.",
      "Fornece feedback qualitativo para melhoria.",
      "Substitui toda metrica tecnica."
    ],
    "correctIndex": 2,
    "explanation": "CSAT complementa metricas automaticas."
  },
  {
    "id": 195,
    "domain": "conversational",
    "stem": "Usuários frequentemente mudam de assunto no meio de um fluxo guiado; o sistema deve manter estado e permitir retomada ou escalonamento humano.\n\nEm canais assincronos (email), diferente de chat sincrono:",
    "options": [
      "Sao identicos em todos os aspectos.",
      "Expectativa de tempo de resposta e formato podem diferir.",
      "Somente RAID.",
      "Somente DHCP."
    ],
    "correctIndex": 1,
    "explanation": "Omnichannel exige adaptacao por canal."
  },
  {
    "id": 196,
    "domain": "conversational",
    "stem": "Middleware intercepta mensagens para aplicar locale, registro de auditoria e políticas de conteúdo antes do processamento principal.\n\nDefinir **persona** do bot (formal vs informal) deve alinhar a:",
    "options": [
      "Somente ping.",
      "Publico e marca.",
      "Preferencia exclusiva do desenvolvedor sem revisao.",
      "Somente DHCP."
    ],
    "correctIndex": 1,
    "explanation": "Persona consistente com marca aumenta confianca."
  },
  {
    "id": 197,
    "domain": "conversational",
    "stem": "O bot multilíngue deve negociar idioma com o usuário na primeira interação e lembrar a preferência nas próximas sessões.\n\nRegistrar **intencoes de fallback** negativas melhora:",
    "options": [
      "Somente FTP.",
      "Somente DHCP.",
      "Eliminar necessidade de dados.",
      "Treino ao identificar lacunas de compreensao."
    ],
    "correctIndex": 3,
    "explanation": "Utterances negativas refinam o classificador."
  },
  {
    "id": 198,
    "domain": "conversational",
    "stem": "Para ações que alteram dados sensíveis, o fluxo exige confirmação explícita do usuário antes de executar a operação.\n\nEm Bot Framework, **adapter de canal** traduz:",
    "options": [
      "Somente DNS.",
      "Apenas DHCP.",
      "Mensagens genericas do bot para formato especifico do canal.",
      "Somente RAID."
    ],
    "correctIndex": 2,
    "explanation": "Adaptadores isolam particularidades de Teams, Slack, etc."
  },
  {
    "id": 199,
    "domain": "conversational",
    "stem": "Estado de perfil do usuário (preferências persistentes) deve ser separado do estado volátil da conversa atual na sessão.\n\nEvitar **loops infinitos** de esclarecimento exige:",
    "options": [
      "Somente ping.",
      "Repetir a mesma pergunta para sempre.",
      "Somente DHCP.",
      "Limite de repeticoes e saida para humano."
    ],
    "correctIndex": 3,
    "explanation": "Limites evitam experiencia frustrante."
  },
  {
    "id": 200,
    "domain": "conversational",
    "stem": "Em ambientes regulados, cada resposta que altera estado deve registrar ID de correlação para auditoria cruzada com sistemas legados.\n\nTestes A/B em mensagens do bot podem medir:",
    "options": [
      "Apenas DHCP.",
      "Somente largura de banda.",
      "Somente FTP.",
      "Qual formulacao melhora conversao ou compreensao."
    ],
    "correctIndex": 3,
    "explanation": "Experimentacao melhora copy conversacional."
  },
  {
    "id": 201,
    "domain": "workload",
    "stem": "A área de compliance incluiu no checklist verificação de que rotuladores humanos tiveram instruções consistentes. Isso impacta diretamente a viabilidade de modelos que dependem de exemplos com saída conhecida.\n\nExecutar inferencia proximo a fonte de dados (edge) costuma visar principalmente:",
    "options": [
      "Impedir treino supervisionado.",
      "Eliminar qualquer modelo na nuvem.",
      "Substituir criptografia.",
      "Reduzir latencia e trafego de rede em cenarios adequados."
    ],
    "correctIndex": 3,
    "explanation": "Edge inference aproxima computacao do local onde os dados surgem."
  },
  {
    "id": 202,
    "domain": "workload",
    "stem": "Você apoia uma equipe de arquitetura que está definindo a primeira solução de machine learning da empresa. Os patrocinadores querem alinhar expectativas sobre tipos de problema, dados disponíveis e riscos antes de escolher serviços na nuvem.\n\nAprendizado **federado** (conceito) enfatiza tipicamente:",
    "options": [
      "Treinar sem centralizar dados brutos de todos os participantes.",
      "Eliminar agregacao de modelos.",
      "Substituir criptografia por texto puro.",
      "Impedir validacao."
    ],
    "correctIndex": 0,
    "explanation": "Federado busca colaborar no modelo preservando dados locais."
  },
  {
    "id": 203,
    "domain": "workload",
    "stem": "Você está preparando material de treinamento para desenvolvedores que nunca trabalharam com ML. O objetivo é situar conceitos básicos antes que a equipe escolha ferramentas ou arquitetura na nuvem.\n\nUm **model card** documenta principalmente:",
    "options": [
      "Somente endereco IP fixo.",
      "Somente a senha do administrador.",
      "Apenas o tamanho do logo.",
      "Contexto, dados, limitacoes e metricas do modelo para transparencia."
    ],
    "correctIndex": 3,
    "explanation": "Model cards comunicam escopo e riscos do artefato."
  },
  {
    "id": 204,
    "domain": "workload",
    "stem": "Em um curso interno, você usa exemplos de diferentes domínios apenas para ilustrar a diversidade de problemas de IA — sem comprometer ainda escolha de fornecedor ou stack.\n\nDados **sinteticos** podem ajudar quando:",
    "options": [
      "Eliminam necessidade de privacidade.",
      "Substituem integralmente dados reais sem revisao.",
      "Ha escassez de exemplos e o processo de geracao e validado.",
      "Garantem paridade perfeita com o mundo real sempre."
    ],
    "correctIndex": 2,
    "explanation": "Sintetico complementa treino mas exige validacao de fidelidade."
  },
  {
    "id": 205,
    "domain": "workload",
    "stem": "O time de produto compara abordagens com e sem rótulos pré-definidos para o mesmo conjunto de dados; a discussão foca em trade-offs de custo de rotulagem e interpretação dos resultados.\n\nRotulagem **assistida por modelo** com revisao humana combina:",
    "options": [
      "Somente cluster sem rotulos.",
      "Apenas dados sinteticos.",
      "Eliminacao total de humanos.",
      "Eficiencia da sugestao automatica com controle de qualidade humana."
    ],
    "correctIndex": 3,
    "explanation": "Human-in-the-loop melhora custo e qualidade de rotulos."
  },
  {
    "id": 206,
    "domain": "workload",
    "stem": "Especialistas em qualidade questionam se o viés dos dados de treino pode explicar erros sistemáticos contra certas regiões. A discussão técnica foca no conceito de viés indesejado no modelo.\n\n**Transfer learning** aproveita tipicamente:",
    "options": [
      "Representacoes aprendidas em tarefa grande para tarefa relacionada com menos dados.",
      "Somente dados nao rotulados.",
      "Copiar pesos sem treino fino nunca.",
      "Eliminar validacao."
    ],
    "correctIndex": 0,
    "explanation": "Transferencia reduz dados necessarios em dominios proximos."
  },
  {
    "id": 207,
    "domain": "workload",
    "stem": "Numa revisão de escopo, o time questiona se há dados rotulados coerentes com o uso pretendido, se as classes cobrem casos reais e se a métrica escolhida reflete o custo de erro para o negócio.\n\nAprendizado **semi-supervisionado** mistura:",
    "options": [
      "Exemplos rotulados e nao rotulados na mesma rotina de treino.",
      "Apenas reforco puro.",
      "Somente series temporais.",
      "Somente rotulos falsos."
    ],
    "correctIndex": 0,
    "explanation": "Semi-supervisionado usa rotulos parciais para guiar o restante."
  },
  {
    "id": 208,
    "domain": "workload",
    "stem": "Um produto digital passará a usar modelos preditivos em tempo quase real. O time técnico debate se o problema é melhor formulado como classificação, regressão, agrupamento ou detecção de desvios em relação ao histórico.\n\n**Ensemble** de modelos busca frequentemente:",
    "options": [
      "Sempre aumentar overfitting.",
      "Combinar preditores para reduzir variancia ou erro.",
      "Substituir metricas.",
      "Eliminar conjunto de validacao."
    ],
    "correctIndex": 1,
    "explanation": "Ensembles mediam erros de modelos diversos."
  },
  {
    "id": 209,
    "domain": "workload",
    "stem": "Uma startup deseja priorizar privacidade ao rotular dados sensíveis. O time avalia rotulagem humana, semi-automática e o papel de dados sintéticos, sempre com revisão onde o erro for inaceitável.\n\nEm classificacao binaria, aumentar **recall** costuma implicar:",
    "options": [
      "Garantir precisao 100%.",
      "Trade-off com precisao — mais positivos detectados, possivelmente mais falsos alarmes.",
      "Eliminar matriz de confusao.",
      "Substituir limiar por aleatorio."
    ],
    "correctIndex": 1,
    "explanation": "Recall e precisao competem conforme o limiar."
  },
  {
    "id": 210,
    "domain": "workload",
    "stem": "Durante due diligence de aquisição, você resume como a empresa alvo usa IA: tipos de modelo, fontes de dados e controles de acesso. Investidores perguntam se há risco reputacional por falta de transparência ao usuário final.\n\nA **matriz de confusao** ajuda principalmente a:",
    "options": [
      "Eliminar necessidade de teste.",
      "Substituir dados de treino.",
      "Ver tipos de erro (VP, FP, VN, FN) por classe.",
      "Calcular apenas media de idade."
    ],
    "correctIndex": 2,
    "explanation": "Matriz de confusao destrinha erros por categoria."
  },
  {
    "id": 211,
    "domain": "azure_ml",
    "stem": "A equipe de privacidade exige que dados sensíveis permaneçam em uma região específica e que logs de predição não armazenem identificadores em texto claro. Isso afeta desenho de workspace e armazenamento.\n\nSeparar recursos de **treino** e **inferencia** costuma permitir:",
    "options": [
      "Eliminar endpoints.",
      "Impedir registro de modelo.",
      "Otimizar custo e escala de cada fase separadamente.",
      "Usar o mesmo tamanho de VM sempre sem analise."
    ],
    "correctIndex": 2,
    "explanation": "Treino pesado e inferencia frequente tem perfis diferentes."
  },
  {
    "id": 212,
    "domain": "azure_ml",
    "stem": "O modelo de fraude binária está em revisão. Os analistas pediram uma métrica que reflita o trade-off entre alarmes verdadeiros e falsos positivos em diferentes limiares de decisão.\n\nEmpacotar dependencias do **script de scoring** em container visa:",
    "options": [
      "Substituir modelo por DNS.",
      "Reproducir o ambiente de inferencia entre ambientes.",
      "Impedir HTTPS.",
      "Eliminar testes."
    ],
    "correctIndex": 1,
    "explanation": "Containers fixam versoes de bibliotecas do scoring."
  },
  {
    "id": 213,
    "domain": "azure_ml",
    "stem": "A equipe de segurança reforçou que apenas perfis autorizados podem implantar endpoints que acessam dados classificados. A configuração de permissões no workspace é discutida.\n\nProteger **endpoint** de scoring com autenticacao visa:",
    "options": [
      "Desativar logs.",
      "Restringir chamadas a clientes autorizados.",
      "Publicar chave em repositorio publico.",
      "Eliminar HTTPS."
    ],
    "correctIndex": 1,
    "explanation": "Endpoints expostos precisam controles de acesso."
  },
  {
    "id": 214,
    "domain": "azure_ml",
    "stem": "O time de dados quer executar treinamento distribuído em GPU para um modelo profundo, mas precisa limitar custo com agendamento e tamanho de cluster. A discussão envolve compute targets e quotas.\n\nImplantar nova versao em **slot de staging** antes de producao permite:",
    "options": [
      "Substituir monitoramento.",
      "Eliminar rollback.",
      "Testar comportamento com trafego controlado ou validacao.",
      "Ignorar metricas."
    ],
    "correctIndex": 2,
    "explanation": "Staging reduz risco de regressao em implantacao."
  },
  {
    "id": 215,
    "domain": "azure_ml",
    "stem": "Você prepara um workshop sobre inferência em tempo real com latência de poucos centésimos de segundo versus jobs assíncronos que podem levar horas. Os gestores querem exemplos concretos do Azure.\n\n**Pontuacao em lote** (batch scoring) e adequada quando:",
    "options": [
      "Nao ha armazenamento.",
      "Cada linha precisa latencia minima garantida em milissegundos.",
      "O modelo nao pode ser versionado.",
      "Ha arquivo grande acumulado e o processamento pode ser assincrono."
    ],
    "correctIndex": 3,
    "explanation": "Batch prioriza volume sobre latencia por registro."
  },
  {
    "id": 216,
    "domain": "azure_ml",
    "stem": "O prazo do sprint é curto e o time quer explorar automaticamente algoritmos e hiperparâmetros dentro de limites aprovados, com métrica de sucesso definida pelo negócio.\n\nMonitorar **latencia p95** do endpoint ajuda a:",
    "options": [
      "Substituir testes de carga.",
      "Detectar degradacao perceptivel para parte dos usuarios.",
      "Impedir autoscaling.",
      "Eliminar SLAs internos."
    ],
    "correctIndex": 1,
    "explanation": "Percentis capturam cauda da distribuicao de latencia."
  },
  {
    "id": 217,
    "domain": "azure_ml",
    "stem": "Há preocupação com deriva entre o perfil de dados de treino e o tráfego atual em produção. Monitoramento contínuo foi adicionado ao backlog.\n\nControle de acesso por **papel** no workspace de ML restringe:",
    "options": [
      "Somente cor do tema.",
      "Somente horario de backup.",
      "Apenas DNS publico.",
      "Quem pode criar computacao, implantar ou ver dados."
    ],
    "correctIndex": 3,
    "explanation": "RBAC separa leitura, contribuicao e administracao."
  },
  {
    "id": 218,
    "domain": "azure_ml",
    "stem": "A empresa padronizou métricas de classificação por domínio: churn usa AUC, suporte ao cliente usa F1. Você explica por que uma única métrica genérica não serve a todos os casos de uso.\n\nPreparar dados grandes com **Spark** (quando aplicavel) costuma ocorrer:",
    "options": [
      "Sem qualquer pipeline.",
      "Exclusivamente em disquete.",
      "Somente apos implantacao do endpoint.",
      "Antes do treino, para agregacoes e limpeza em volume."
    ],
    "correctIndex": 3,
    "explanation": "Spark e comum em preparacao de dados massivos."
  },
  {
    "id": 219,
    "domain": "azure_ml",
    "stem": "O catálogo de modelos internos cresceu; é preciso padronizar nomes, tags e estágios (desenvolvimento, homologação, produção) para evitar que times chamem endpoints obsoletos.\n\nIntegrar **Git** ao fluxo de ML facilita:",
    "options": [
      "Eliminar revisao de codigo.",
      "Rastrear mudancas em codigo de treino e pipelines.",
      "Impedir branches.",
      "Substituir dados."
    ],
    "correctIndex": 1,
    "explanation": "Controle de versao aplica-se a codigo e definicoes de pipeline."
  },
  {
    "id": 220,
    "domain": "azure_ml",
    "stem": "Um cientista de dados prefere arrastar componentes em um canvas em vez de escrever pipelines apenas em código para prototipagem rápida. A liderança quer saber qual recurso do Azure ML melhor se encaixa nesse estilo de trabalho.\n\nPainel de **IA responsavel** em ferramentas de ML costuma destacar:",
    "options": [
      "Eliminar necessidade de revisao humana.",
      "Apenas cor de grafico.",
      "Somente faturamento.",
      "Metricas de equidade e interpretabilidade quando disponiveis."
    ],
    "correctIndex": 3,
    "explanation": "Ferramentas de ML podem agregar sinais de RAI; revisao humana continua."
  },
  {
    "id": 221,
    "domain": "vision",
    "stem": "O time de saúde reforça que qualquer uso de análise de imagens médicas exige validação clínica e conformidade; a IA é apoio à decisão, não substitui protocolos sem supervisão.\n\nRotacionar e espelhar imagens no treino e forma de:",
    "options": [
      "Reduzir resolucao obrigatoriamente a 1 pixel.",
      "Substituir rotulos.",
      "Aumentar diversidade artificial (augmentation) para generalizar.",
      "Eliminar validacao."
    ],
    "correctIndex": 2,
    "explanation": "Augmentation reduz overfitting a orientacao."
  },
  {
    "id": 222,
    "domain": "vision",
    "stem": "Uma rede de varejo quer contar visitantes em lojas a partir de câmeras existentes, agregando fluxo por corredor sem armazenar imagens faciais identificáveis.\n\nExtrair **quadros-chave** de video para analise estatica e:",
    "options": [
      "Eliminar codec.",
      "Substituir qualquer analise temporal.",
      "Impedir OCR.",
      "Amostrar frames representativos em vez de processar todos os pixels em todo instante."
    ],
    "correctIndex": 3,
    "explanation": "Keyframe reduz custo de visao em video longo."
  },
  {
    "id": 223,
    "domain": "vision",
    "stem": "O jurídico questionou se modelos de geração de imagens sintéticas para treino podem violar direitos de personalidade; a conversa foca em dados de treino e uso responsável.\n\nBusca visual por **similaridade** em catalogo relaciona-se a:",
    "options": [
      "Somente ordenacao alfabetica de SKU.",
      "Somente DHCP.",
      "Apenas CRC32.",
      "Embeddings e vizinhos mais proximos no espaco vetorial."
    ],
    "correctIndex": 3,
    "explanation": "Similaridade visual usa vetores de imagem."
  },
  {
    "id": 224,
    "domain": "vision",
    "stem": "O sistema de segurança precisa não apenas saber se há um objeto na imagem, mas também localizá-lo com caixas delimitadoras para alertas em tempo quase real.\n\nDetectar **desfoque** excessivo em foto de documento ajuda a:",
    "options": [
      "Solicitar nova captura antes de OCR.",
      "Substituir OCR por adivinhacao.",
      "Somente compactar mais.",
      "Eliminar privacidade."
    ],
    "correctIndex": 0,
    "explanation": "Qualidade de imagem afeta taxa de leitura."
  },
  {
    "id": 225,
    "domain": "vision",
    "stem": "Dois fluxos distintos são comparados: processar arquivos de imagem em lote noturno versus analisar quadros de um stream ao vivo com requisito de baixa latência.\n\nModelos de visao costumam operar em tensores que representam:",
    "options": [
      "Somente strings SQL.",
      "Somente arquivos .wav.",
      "Apenas numeros de telefone.",
      "Pixels e canais (ex.: RGB) em grades."
    ],
    "correctIndex": 3,
    "explanation": "Imagens viram tensores multidimensionais."
  },
  {
    "id": 226,
    "domain": "vision",
    "stem": "A equipe de UX debate se mostrar caixas de detecção sobre a interface do usuário ou apenas um ícone discreto quando um objeto é encontrado, equilibrando utilidade e privacidade.\n\nCaixas **delimitadoras** em deteccao de objetos fornecem tipicamente:",
    "options": [
      "Apenas um rotulo sem posicao.",
      "Texto OCR completo sempre.",
      "Coordenadas aproximadas da regiao do objeto.",
      "Somente cor dominante global."
    ],
    "correctIndex": 2,
    "explanation": "Bounding boxes localizam instancias na imagem."
  },
  {
    "id": 227,
    "domain": "vision",
    "stem": "Inspeção de infraestrutura usa imagens de pontes e torres; o objetivo é destacar fissuras e corrosão em zoom, possivelmente com detecção de objetos ou segmentação semântica.\n\n**Sumarizacao de video** (alto nivel) pode combinar:",
    "options": [
      "Selecao de cenas-chave e geracao de texto descritivo.",
      "Apenas ping.",
      "Somente DNS.",
      "Somente SMTP."
    ],
    "correctIndex": 0,
    "explanation": "Resumo de video cruza visao e linguagem."
  },
  {
    "id": 228,
    "domain": "vision",
    "stem": "Formulários escaneados chegam com tabelas e campos estruturados; extrair apenas texto solto não basta — é preciso entender layout e relações entre blocos.\n\nEntender **layout** de formulario difere de OCR puro porque:",
    "options": [
      "Le apenas caracteres sem estrutura.",
      "Relaciona blocos, tabelas e rotulos estruturalmente.",
      "Somente binariza imagem.",
      "Elimina tabelas."
    ],
    "correctIndex": 1,
    "explanation": "Document intelligence considera estrutura além de texto solto."
  },
  {
    "id": 229,
    "domain": "vision",
    "stem": "O departamento de marketing testa reconhecimento de logotipos e produtos em fotos de redes sociais para medir presença de marca; a precisão varia com ângulo e oclusão.\n\nExportar modelo de visao para **ONNX** pode facilitar:",
    "options": [
      "Eliminar testes.",
      "Implantacao em runtimes otimizados e portaveis.",
      "Substituir metricas.",
      "Impedir GPU."
    ],
    "correctIndex": 1,
    "explanation": "ONNX interoper entre frameworks de inferencia."
  },
  {
    "id": 230,
    "domain": "vision",
    "stem": "Um concorrente anunciou ‘IA que entende qualquer imagem’. Você explica limitações conhecidas: conjuntos de treino enviesados, contexto ausente e necessidade de validação humana em domínios críticos.\n\nJobs de visao em **lote** vs **fluxo** diferem principalmente em:",
    "options": [
      "Latencia esperada e modo de entrada (arquivo vs stream).",
      "Eliminacao de modelo.",
      "Cor do servidor.",
      "Somente DNS."
    ],
    "correctIndex": 0,
    "explanation": "Stream prioriza baixa latencia; batch prioriza throughput."
  },
  {
    "id": 231,
    "domain": "nlp",
    "stem": "O time de compliance solicita mascarar CPF, e-mails e telefones em logs de chat antes de armazenamento de longo prazo.\n\nSegmentar **instancia** (mascara por objeto) difere de deteccao porque:",
    "options": [
      "Elimina classes.",
      "Define contorno fino do objeto, nao so caixa.",
      "Nao usa rede neural.",
      "So funciona em audio."
    ],
    "correctIndex": 1,
    "explanation": "Instance segmentation e mais fina que caixa."
  },
  {
    "id": 232,
    "domain": "nlp",
    "stem": "O produto editorial propõe gerar rascunhos de posts a partir de tópicos, com revisão humana obrigatória antes da publicação.\n\n**Tokenizacao** sublexical (subpalavras) ajuda a:",
    "options": [
      "Somente numeros.",
      "Eliminar embeddings.",
      "Impedir traducao.",
      "Lidar com vocabulario aberto e palavras raras."
    ],
    "correctIndex": 3,
    "explanation": "BPE e similares reduzem UNK em textos diversos."
  },
  {
    "id": 233,
    "domain": "nlp",
    "stem": "Em compliance, é preciso detectar dados pessoais em anexos de e-mail antes do arquivamento; falsos negativos são inaceitáveis para o regulador.\n\nMetrica **BLEU** e mais associada a:",
    "options": [
      "Apenas DNS.",
      "Clustering de imagens.",
      "Avaliacao automatica de traducao com referencias.",
      "Somente regressao de precos."
    ],
    "correctIndex": 2,
    "explanation": "BLEU compara n-grams com traducoes de referencia."
  },
  {
    "id": 234,
    "domain": "nlp",
    "stem": "Uma busca no portal corporativo deve encontrar documentos por significado aproximado, não apenas por palavras-chave idênticas.\n\n**Entity linking** difere de NER porque:",
    "options": [
      "Associa mencao a identidade canonica em base de conhecimento.",
      "Elimina texto.",
      "So detecta se ha entidade sem desambiguacao.",
      "Somente sentimento."
    ],
    "correctIndex": 0,
    "explanation": "Linking resolve qual entidade do mundo e referida."
  },
  {
    "id": 235,
    "domain": "nlp",
    "stem": "Em call center, supervisores precisam de transcrições com marcação de falante e detecção de palavras proibidas para treinamento de qualidade.\n\n**Classificacao de documento** difere de classificacao de frase porque:",
    "options": [
      "Usa apenas um token.",
      "Somente audio.",
      "Elimina embeddings.",
      "Rotula o texto inteiro (ex.: tipo de contrato) em vez de cada sentenca isolada."
    ],
    "correctIndex": 3,
    "explanation": "Document classification agrega evidencia global."
  },
  {
    "id": 236,
    "domain": "nlp",
    "stem": "Um departamento jurídico recebe contratos em PDF e precisa identificar automaticamente partes, datas e valores para indexação em sistema de gestão documental.\n\n**Busca semantica** difere de palavra-chave pura porque:",
    "options": [
      "So coincide literal.",
      "Somente ordena por data.",
      "Usa significado aproximado via vetores ou modelos de linguagem.",
      "Elimina indice."
    ],
    "correctIndex": 2,
    "explanation": "Semantica captura sinonimia e paráfrase."
  },
  {
    "id": 237,
    "domain": "nlp",
    "stem": "O roadmap inclui resumir threads longas de e-mail para gestores, preservando decisões e prazos mencionados em várias mensagens encadeadas.\n\n**Engenharia de prompt** em modelos generativos visa:",
    "options": [
      "Eliminar qualquer revisao humana sempre.",
      "Substituir dados de treino.",
      "Impedir temperatura variavel.",
      "Formular instrucoes e contexto para obter saidas uteis e seguras."
    ],
    "correctIndex": 3,
    "explanation": "Prompts guiam comportamento sem novo treino pesado."
  },
  {
    "id": 238,
    "domain": "nlp",
    "stem": "A empresa recebe feedback de clientes em formulários abertos; o time de produto quer agrupar temas emergentes sem rotular manualmente milhares de respostas.\n\n**Janela de contexto** limita:",
    "options": [
      "Quanto texto o modelo pode considerar de uma vez.",
      "Somente velocidade de CPU.",
      "Eliminacao de embeddings.",
      "Apenas DNS."
    ],
    "correctIndex": 0,
    "explanation": "Modelos de linguagem tem comprimento maximo de entrada."
  },
  {
    "id": 239,
    "domain": "nlp",
    "stem": "A central de atendimento quer priorizar tickets urgentos analisando o tom das mensagens dos clientes em vários idiomas.\n\n**Redacao** de dados (PII) em logs de NLP ajuda a:",
    "options": [
      "Reduzir exposicao de informacao sensivel em texto.",
      "Publicar CPF em claro.",
      "Eliminar conformidade.",
      "Substituir criptografia."
    ],
    "correctIndex": 0,
    "explanation": "Redaction mascara campos sensiveis."
  },
  {
    "id": 240,
    "domain": "nlp",
    "stem": "Engenheiros avaliam métricas automáticas de qualidade para tradução automática quando há frases de referência aprovadas pelo revisor humano.\n\nResumir **multiplos documentos** e mais desafiador que um porque:",
    "options": [
      "Elimina necessidade de alinhamento factual.",
      "Somente OCR.",
      "Usa sempre um unico paragrafo.",
      "Exige coerencia global e possivel remocao de redundancia entre fontes."
    ],
    "correctIndex": 3,
    "explanation": "Multi-doc exige fusao e verificacao cruzada."
  },
  {
    "id": 241,
    "domain": "conversational",
    "stem": "Usuários frequentemente mudam de assunto no meio de um fluxo guiado; o sistema deve manter estado e permitir retomada ou escalonamento humano.\n\nDetectar **code-switching** (dois idiomas na mesma frase) requer:",
    "options": [
      "Eliminar Unicode.",
      "Modelos ou regras que identifiquem segmentos por idioma.",
      "Apenas numeros.",
      "Somente um idioma global."
    ],
    "correctIndex": 1,
    "explanation": "Texto bilinque exige segmentacao linguistica."
  },
  {
    "id": 242,
    "domain": "conversational",
    "stem": "Middleware intercepta mensagens para aplicar locale, registro de auditoria e políticas de conteúdo antes do processamento principal.\n\nMensagens **proativas** do bot sao aquelas que:",
    "options": [
      "Somente SMTP.",
      "Eliminam dialogo.",
      "Somente respondem a ping.",
      "O sistema envia sem entrada imediata do usuario (ex.: lembrete)."
    ],
    "correctIndex": 3,
    "explanation": "Proatividade inicia conteudo pelo sistema dentro de politicas."
  },
  {
    "id": 243,
    "domain": "conversational",
    "stem": "O bot multilíngue deve negociar idioma com o usuário na primeira interação e lembrar a preferência nas próximas sessões.\n\nTratar **interrupcoes** no meio de um fluxo guiado exige:",
    "options": [
      "Salvar estado e permitir retorno ou mudanca de intencao.",
      "Ignorar nova intencao.",
      "Reiniciar servidor a cada turno.",
      "Eliminar historico."
    ],
    "correctIndex": 0,
    "explanation": "Dialogos reais mudam de assunto; estado importa."
  },
  {
    "id": 244,
    "domain": "conversational",
    "stem": "Para ações que alteram dados sensíveis, o fluxo exige confirmação explícita do usuário antes de executar a operação.\n\nFluxo **OAuth** em bot costuma servir para:",
    "options": [
      "Armazenar senha em cookie sem criptografia.",
      "Eliminar HTTPS.",
      "Obter token do usuario para APIs com consentimento.",
      "Somente DNS."
    ],
    "correctIndex": 2,
    "explanation": "OAuth delega autenticacao a provedor confiavel."
  },
  {
    "id": 245,
    "domain": "conversational",
    "stem": "Estado de perfil do usuário (preferências persistentes) deve ser separado do estado volátil da conversa atual na sessão.\n\nO esquema de **atividade** (activity) em bots descreve:",
    "options": [
      "Tipo de mensagem, texto, anexos e metadados do turno.",
      "Apenas temperatura CPU.",
      "Somente IP do roteador.",
      "Somente DHCP."
    ],
    "correctIndex": 0,
    "explanation": "Activities estruturam o que canais trocam."
  },
  {
    "id": 246,
    "domain": "conversational",
    "stem": "Em ambientes regulados, cada resposta que altera estado deve registrar ID de correlação para auditoria cruzada com sistemas legados.\n\n**Middleware** no pipeline do bot permite:",
    "options": [
      "Eliminar handlers.",
      "Substituir canal.",
      "Interceptar mensagens para logging, seguranca ou locale.",
      "Impedir qualquer resposta."
    ],
    "correctIndex": 2,
    "explanation": "Middleware encadeia pre e pos-processamento."
  },
  {
    "id": 247,
    "domain": "conversational",
    "stem": "Quando a intenção não é reconhecida com confiança suficiente, o bot deve pedir esclarecimento ou oferecer opções em vez de falhar em silêncio.\n\nEstado de **usuario** vs **conversa** separa tipicamente:",
    "options": [
      "Preferencias de perfil versus contexto do dialogo atual.",
      "Eliminar persistencia.",
      "Somente IP.",
      "Apenas DNS."
    ],
    "correctIndex": 0,
    "explanation": "User state persiste entre conversas; conversation state e local ao fluxo."
  },
  {
    "id": 248,
    "domain": "conversational",
    "stem": "O help desk quer que o bot reconheça quando o usuário pede para falar com humano e transfira o contexto resumido para o atendente.\n\nCartoes **adaptativos** em canais suportados servem para:",
    "options": [
      "Apenas ICMP.",
      "Eliminar acessibilidade.",
      "Somente texto sem formatacao.",
      "Apresentar botoes, imagens e entradas ricas de forma estruturada."
    ],
    "correctIndex": 3,
    "explanation": "Adaptive Cards melhoram UX em plataformas compatíveis."
  },
  {
    "id": 249,
    "domain": "conversational",
    "stem": "Desenvolvedores discutem separar modelo de linguagem grande de regras de negócio determinísticas que não podem ser ‘alucinadas’.\n\nIntegrar **voz** ao bot costuma encadear:",
    "options": [
      "STT, NLU/dialogo e opcionalmente TTS na resposta.",
      "Apenas SQL.",
      "Somente OCR.",
      "Somente FTP."
    ],
    "correctIndex": 0,
    "explanation": "Bots de voz combinam modulos de fala e linguagem."
  },
  {
    "id": 250,
    "domain": "conversational",
    "stem": "A integração com APIs corporativas exige que o usuário autentique-se com o provedor de identidade da organização antes de consultar pedidos.\n\nPublicar bot em **multiplos canais** exige:",
    "options": [
      "Eliminar testes.",
      "Adaptar formato de mensagem as capacidades de cada canal.",
      "Somente email.",
      "Um unico formato identico em todos sem excecao."
    ],
    "correctIndex": 1,
    "explanation": "Canais tem capacidades diferentes (rich text, botoes)."
  }
];
})(typeof window !== "undefined" ? window : globalThis);
