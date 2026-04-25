/**
 * Banco de questoes de pratica para AI-103 (estudo independente).
 */
(function () {
  "use strict";

  window.AI103_QUESTION_BANK = [
    {
      id: "AI103-001",
      domain: "Planejamento",
      stem: "Voce precisa restringir acesso de um app a um recurso Azure AI sem armazenar chave no codigo. Qual abordagem e mais adequada?",
      options: ["Managed Identity + RBAC", "Chave em variavel global JS", "API key fixa no front-end", "Usuario admin unico para todos"],
      correctIndex: 0,
      explanation: "Managed Identity elimina segredo hardcoded e RBAC controla permissao por identidade."
    },
    {
      id: "AI103-002",
      domain: "Planejamento",
      stem: "Qual acao reduz risco de custo inesperado em um ambiente de estudo AI-103?",
      options: ["Definir alertas de custo e budget", "Criar recursos em todas as regioes", "Usar sempre SKU mais caro", "Desabilitar monitoramento"],
      correctIndex: 0,
      explanation: "Alertas e budget ajudam governanca financeira desde o inicio."
    },
    {
      id: "AI103-003",
      domain: "Vision",
      stem: "Qual servico e mais indicado para extrair texto e campos estruturados de notas fiscais?",
      options: ["Document Intelligence", "Speech Service", "Translator", "Anomaly Detector"],
      correctIndex: 0,
      explanation: "Document Intelligence foi desenhado para processamento de documentos e campos."
    },
    {
      id: "AI103-004",
      domain: "Vision",
      stem: "Seu cenario exige apenas ler texto de imagens escaneadas. Qual capacidade principal voce deve usar?",
      options: ["OCR", "Text-to-Speech", "Intent Classification", "Entity Linking"],
      correctIndex: 0,
      explanation: "OCR e a capacidade especifica para reconhecer texto em imagem."
    },
    {
      id: "AI103-005",
      domain: "Language",
      stem: "Voce quer identificar humor positivo/negativo em avaliacoes de clientes. Qual recurso usar?",
      options: ["Sentiment Analysis", "Face Detection", "Object Detection", "Speech Synthesis"],
      correctIndex: 0,
      explanation: "Sentiment Analysis mede polaridade e opiniao no texto."
    },
    {
      id: "AI103-006",
      domain: "Language",
      stem: "Qual servico se encaixa melhor para classificar intencoes de um chatbot de suporte?",
      options: ["Conversational Language Understanding (CLU)", "OCR", "Custom Vision", "Metrics Advisor"],
      correctIndex: 0,
      explanation: "CLU modela intents e entidades em conversas."
    },
    {
      id: "AI103-007",
      domain: "Speech",
      stem: "Voce precisa gerar audio natural a partir de texto para acessibilidade. O que usar?",
      options: ["Text-to-Speech", "OCR", "Question Answering", "Image Analysis"],
      correctIndex: 0,
      explanation: "Text-to-Speech converte texto para audio sintetizado."
    },
    {
      id: "AI103-008",
      domain: "Speech",
      stem: "Qual e a principal entrada de um fluxo speech-to-text?",
      options: ["Audio", "Imagem", "Tabela SQL", "Prompt sem contexto"],
      correctIndex: 0,
      explanation: "STT transforma sinais de audio em texto."
    },
    {
      id: "AI103-009",
      domain: "OpenAI",
      stem: "Qual pratica reduz alucinacao em respostas generativas para base interna da empresa?",
      options: ["Usar RAG com documentos confiaveis", "Aumentar temperatura ao maximo", "Remover filtros de seguranca", "Evitar contexto"],
      correctIndex: 0,
      explanation: "RAG ancora a resposta em fontes reais do dominio."
    },
    {
      id: "AI103-010",
      domain: "OpenAI",
      stem: "No design de prompt, qual item aumenta previsibilidade da saida?",
      options: ["Definir formato de resposta esperado", "Pedir resposta livre sem restricao", "Omitir objetivo", "Nao informar idioma"],
      correctIndex: 0,
      explanation: "Instrucoes de formato reduzem variacao e ambiguidade."
    },
    {
      id: "AI103-011",
      domain: "KnowledgeMining",
      stem: "Qual etapa e essencial antes de consultar documentos via busca semantica?",
      options: ["Indexacao dos documentos", "Desligar logs", "Excluir metadados", "Forcar cache do navegador"],
      correctIndex: 0,
      explanation: "Sem indexacao nao ha base estruturada para busca eficiente."
    },
    {
      id: "AI103-012",
      domain: "KnowledgeMining",
      stem: "Voce precisa enriquecer documentos com entidades extraidas antes da busca. Isso acontece em qual fase?",
      options: ["Enriquecimento no pipeline de ingestao", "Somente no front-end", "Apos apagar indice", "No DNS da assinatura"],
      correctIndex: 0,
      explanation: "Knowledge mining aplica enriquecimento durante pipeline de indexacao."
    },
    {
      id: "AI103-013",
      domain: "Planejamento",
      stem: "Qual pratica de seguranca e recomendada para ambientes de producao com Azure AI?",
      options: ["Principio do menor privilegio", "Compartilhar credencial admin", "Permitir acesso anonimo irrestrito", "Desabilitar auditoria"],
      correctIndex: 0,
      explanation: "Menor privilegio reduz superficie de ataque e impacto de falhas."
    },
    {
      id: "AI103-014",
      domain: "Planejamento",
      stem: "Qual opcao ajuda a diagnosticar erros de API sem depender de tentativa e erro manual?",
      options: ["Application Insights / logs estruturados", "Desativar metricas", "Nao registrar excecoes", "Ignorar status HTTP"],
      correctIndex: 0,
      explanation: "Observabilidade e essencial para operacao de solucoes AI."
    },
    {
      id: "AI103-015",
      domain: "Vision",
      stem: "Quando voce deve considerar um modelo de visao customizado?",
      options: ["Quando o modelo pronto nao atende o dominio especifico", "Sempre no primeiro dia", "Quando nao existe dado rotulado", "Para evitar validacao"],
      correctIndex: 0,
      explanation: "Customizacao faz sentido quando o contexto de negocio exige especializacao."
    },
    {
      id: "AI103-016",
      domain: "Vision",
      stem: "Uma imagem borrada gera OCR ruim. Qual acao inicial e mais correta?",
      options: ["Melhorar qualidade de captura e preprocessamento", "Trocar para serviço de voz", "Aumentar numero de usuarios", "Ignorar qualidade de entrada"],
      correctIndex: 0,
      explanation: "Qualidade de entrada impacta diretamente acuracia em visao."
    },
    {
      id: "AI103-017",
      domain: "Language",
      stem: "Qual alternativa descreve NER (entidades nomeadas)?",
      options: ["Identificar pessoas, locais, organizacoes e datas no texto", "Traduzir texto para audio", "Detectar objetos em video", "Calcular custo de assinatura"],
      correctIndex: 0,
      explanation: "NER extrai entidades estruturadas a partir de texto livre."
    },
    {
      id: "AI103-018",
      domain: "Language",
      stem: "Qual cenario combina melhor com Question Answering?",
      options: ["Responder duvidas com base em FAQ e documentos oficiais", "Gerar voz sintetizada", "Detectar anomalias de telemetria", "Classificar imagens satelite"],
      correctIndex: 0,
      explanation: "Question Answering busca resposta em base de conhecimento fornecida."
    },
    {
      id: "AI103-019",
      domain: "Speech",
      stem: "Qual fator mais afeta desempenho de reconhecimento de fala em call center?",
      options: ["Ruido e qualidade do audio", "Cor do tema da interface", "Formato do favicon", "Tipo de fonte do dashboard"],
      correctIndex: 0,
      explanation: "Ruido, microfone e ambiente impactam fortemente a transcricao."
    },
    {
      id: "AI103-020",
      domain: "Speech",
      stem: "Para um bot de voz multilíngue, qual estrategia e adequada?",
      options: ["Configurar idioma/regiao corretos por fluxo", "Usar sempre idioma unico", "Ignorar locale do usuario", "Forcar traducao manual"],
      correctIndex: 0,
      explanation: "Locale correto melhora reconhecimento e naturalidade de resposta."
    },
    {
      id: "AI103-021",
      domain: "OpenAI",
      stem: "O que melhor descreve temperatura em modelos generativos?",
      options: ["Controla variabilidade/criatividade da resposta", "Define tamanho do banco SQL", "Configura throughput da VM", "Substitui filtros de seguranca"],
      correctIndex: 0,
      explanation: "Temperatura alta aumenta diversidade; baixa aumenta previsibilidade."
    },
    {
      id: "AI103-022",
      domain: "OpenAI",
      stem: "Qual e um controle importante para uso responsavel de GenAI?",
      options: ["Revisao humana em fluxos de alto risco", "Remover logs de uso", "Ocultar origem de conteudo", "Bloquear feedback dos usuarios"],
      correctIndex: 0,
      explanation: "Human-in-the-loop reduz risco em decisoes sensiveis."
    },
    {
      id: "AI103-023",
      domain: "KnowledgeMining",
      stem: "Qual beneficio principal de adicionar metadados no indice de busca?",
      options: ["Filtrar e refinar resultados por contexto", "Aumentar temperatura do modelo", "Eliminar necessidade de fonte", "Desativar ranking"],
      correctIndex: 0,
      explanation: "Metadados ajudam filtro, ranking e explicabilidade da busca."
    },
    {
      id: "AI103-024",
      domain: "KnowledgeMining",
      stem: "Em RAG, o papel da etapa de retrieval e:",
      options: ["Selecionar trechos relevantes para compor o contexto", "Treinar um modelo do zero em tempo real", "Substituir autenticacao", "Compactar imagens de entrada"],
      correctIndex: 0,
      explanation: "Retrieval traz contexto real para reduzir respostas inventadas."
    },
    {
      id: "AI103-025",
      domain: "Planejamento",
      stem: "Qual indicador mostra saude de operacao de um endpoint AI?",
      options: ["Latencia, erro HTTP e taxa de sucesso", "Numero de abas abertas", "Idioma do navegador", "Tamanho do wallpaper"],
      correctIndex: 0,
      explanation: "SRE basico para APIs inclui latencia, erros e disponibilidade."
    },
    {
      id: "AI103-026",
      domain: "Planejamento",
      stem: "Para separar ambientes de dev e prod em AI, qual pratica e recomendada?",
      options: ["Recursos e chaves separados por ambiente", "Mesmo recurso para tudo", "Compartilhar segredos por chat", "Sem controle de versao"],
      correctIndex: 0,
      explanation: "Isolamento por ambiente melhora seguranca e governanca."
    },
    {
      id: "AI103-027",
      domain: "Vision",
      stem: "Qual servico e mais alinhado para classificar imagens customizadas de defeito industrial?",
      options: ["Custom Vision (ou equivalente custom de visao)", "Speech Recognition", "Translator", "CLU"],
      correctIndex: 0,
      explanation: "Classificacao customizada exige dataset rotulado do dominio."
    },
    {
      id: "AI103-028",
      domain: "Language",
      stem: "Voce quer detectar idioma automaticamente antes de processar texto. Qual capacidade usar?",
      options: ["Language detection", "Face API", "Object Tracking", "Speaker diarization"],
      correctIndex: 0,
      explanation: "Deteccao de idioma e etapa comum em pipelines multilíngues."
    },
    {
      id: "AI103-029",
      domain: "Speech",
      stem: "Para transcricao em tempo real, qual requisito costuma ser importante?",
      options: ["Baixa latencia e streaming continuo", "Processamento apenas offline", "Desligar rede", "Remover timestamps"],
      correctIndex: 0,
      explanation: "Streaming com latencia baixa e crucial para interacao ao vivo."
    },
    {
      id: "AI103-030",
      domain: "OpenAI",
      stem: "Qual acao ajuda a evitar prompt injection em apps com dados externos?",
      options: ["Validar entrada e restringir instrucoes do sistema", "Executar qualquer comando sugerido", "Ignorar delimitadores", "Remover politicas"],
      correctIndex: 0,
      explanation: "Defesa em camadas no prompt e validacao de input sao essenciais."
    },
    {
      id: "AI103-031",
      domain: "KnowledgeMining",
      stem: "Qual estrategia melhora relevancia de busca semantica?",
      options: ["Chunking adequado + embeddings consistentes", "Indexar sem estrutura", "Remover contexto", "Usar apenas busca literal"],
      correctIndex: 0,
      explanation: "Segmentacao e representacao vetorial impactam qualidade da recuperacao."
    },
    {
      id: "AI103-032",
      domain: "Planejamento",
      stem: "Em governanca de IA, qual item e obrigatorio em cenarios regulados?",
      options: ["Rastreabilidade e auditoria de decisoes", "Ausencia de logs", "Sem politica de dados", "Acesso irrestrito a PII"],
      correctIndex: 0,
      explanation: "Rastreabilidade suporta compliance e investigacao de incidentes."
    },
    {
      id: "AI103-033",
      domain: "Vision",
      stem: "Para extrair tabelas de PDF digitalizado, voce deve priorizar:",
      options: ["Document Intelligence com analise de layout", "Speech-to-Text", "CLU", "Anomaly Detector"],
      correctIndex: 0,
      explanation: "Layout/document parsing e o caminho adequado para tabelas em documentos."
    },
    {
      id: "AI103-034",
      domain: "Language",
      stem: "Classificacao de texto em categorias predefinidas e exemplo de:",
      options: ["Supervisionado com rotulos", "Nao supervisionado puro", "Reconhecimento facial", "Renderizacao grafica"],
      correctIndex: 0,
      explanation: "Categorias conhecidas implicam treino supervisionado."
    },
    {
      id: "AI103-035",
      domain: "Speech",
      stem: "Diarizacao em transcricao significa:",
      options: ["Diferenciar falantes na conversa", "Traduzir para codigo Morse", "Classificar imagens por cor", "Extrair campos de formulario"],
      correctIndex: 0,
      explanation: "Diarizacao separa e identifica segmentos por locutor."
    },
    {
      id: "AI103-036",
      domain: "OpenAI",
      stem: "Qual e o objetivo de grounding em uma app corporativa?",
      options: ["Ancorar respostas em fontes confiaveis", "Aumentar aleatoriedade", "Ignorar contexto da empresa", "Remover validacao humana"],
      correctIndex: 0,
      explanation: "Grounding reduz alucinacao e melhora confiabilidade."
    },
    {
      id: "AI103-037",
      domain: "KnowledgeMining",
      stem: "Para atualizar documentos alterados sem reindexar tudo, a melhor abordagem e:",
      options: ["Pipeline incremental de ingestao", "Apagar indice todo dia", "Duplicar cada documento", "Desabilitar controle de versao"],
      correctIndex: 0,
      explanation: "Atualizacao incremental reduz custo e tempo de processamento."
    },
    {
      id: "AI103-038",
      domain: "Planejamento",
      stem: "Qual opcao e mais segura para armazenar segredos de aplicacao?",
      options: ["Azure Key Vault", "Arquivo JS publico", "Planilha compartilhada", "Hardcode em repositorio"],
      correctIndex: 0,
      explanation: "Key Vault e o cofre apropriado para segredos e rotacao."
    },
    {
      id: "AI103-039",
      domain: "Vision",
      stem: "Antes de deploy de modelo visual customizado, qual validacao e obrigatoria?",
      options: ["Avaliar qualidade com conjunto de teste separado", "Somente validar no treino", "Ignorar falso positivo", "Publicar sem medicao"],
      correctIndex: 0,
      explanation: "Teste separado evita ilusao de desempenho por overfitting."
    },
    {
      id: "AI103-040",
      domain: "Language",
      stem: "Qual caso e melhor para extracao de entidades?",
      options: ["Extrair CNPJ, data e valor de mensagens", "Descrever objetos em imagem", "Converter texto em voz", "Determinar bitrate de audio"],
      correctIndex: 0,
      explanation: "Entidades estruturadas em texto sao caso classico de NER."
    }
  ];
})();
