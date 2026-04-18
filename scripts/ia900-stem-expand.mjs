/**
 * Enriquece enunciados no estilo típico de certificação Microsoft (cenário + pergunta).
 * Redação original — não reproduz itens oficiais.
 * Se o enunciado já for longo ou tiver bloco duplo (\\n\\n), mantém como está.
 */

const WORKLOAD = [
  "Você apoia uma equipe de arquitetura que está definindo a primeira solução de machine learning da empresa. Os patrocinadores querem alinhar expectativas sobre tipos de problema, dados disponíveis e riscos antes de escolher serviços na nuvem.",
  "Um comitê de governança de dados revisa um projeto de IA que consumirá dados de clientes. A equipe precisa comunicar como o sistema aprende, quais limitações existem e como evitar impactos injustos a grupos específicos.",
  "Durante um workshop interno, você explica aos gestores a diferença entre tarefas em que já existem respostas corretas conhecidas e tarefas em que o sistema deve descobrir estrutura sem rótulos pré-definidos.",
  "A empresa recebeu um relatório de auditoria pedindo mais transparência sobre decisões automatizadas de crédito. Você precisa relacionar práticas técnicas aos pilares de IA responsável discutidos em materiais públicos de referência.",
  "Um produto digital passará a usar modelos preditivos em tempo quase real. O time técnico debate se o problema é melhor formulado como classificação, regressão, agrupamento ou detecção de desvios em relação ao histórico.",
  "Você está preparando material de treinamento para desenvolvedores que nunca trabalharam com ML. O objetivo é situar conceitos básicos antes que a equipe escolha ferramentas ou arquitetura na nuvem.",
  "A diretoria questionou se o uso de um modelo generativo para redigir comunicações externas exige processos adicionais de validação. Você precisa posicionar riscos conhecidos sem prometer comportamento infalível do modelo.",
  "Em uma análise de incidente, observou-se que o modelo performa bem no ambiente de treino, mas degrada fortemente em produção. A discussão gira em torno de sobreajuste, particionamento de dados e métricas adequadas ao negócio.",
  "O jurídico pediu esclarecimento sobre como rastrear qual versão do modelo produziu uma decisão específica e quais dados foram usados naquele treinamento, para eventual contestação por parte do cliente final.",
  "Uma startup deseja priorizar privacidade ao rotular dados sensíveis. O time avalia rotulagem humana, semi-automática e o papel de dados sintéticos, sempre com revisão onde o erro for inaceitável.",
  "Em um curso interno, você usa exemplos de diferentes domínios apenas para ilustrar a diversidade de problemas de IA — sem comprometer ainda escolha de fornecedor ou stack.",
  "Em uma reunião de alinhamento técnico e de negócio, vocês revisam o que significa ‘rótulo’, ‘conjunto de treino’ e ‘métrica de sucesso’ para evitar ambiguidade em documentos formais.",
  "O programa de inovação discute um piloto cujo objetivo de negócio ainda está em definição; a equipe precisa primeiro enquadrar o problema como tarefa de machine learning antes de dimensionar dados e infraestrutura.",
  "Uma ONG quer priorizar equidade ao priorizar beneficiários com um modelo de pontuação. Os revisores externos pediram evidências de que disparidades entre grupos demográficos estão sendo medidas e mitigadas.",
  "Durante due diligence de aquisição, você resume como a empresa alvo usa IA: tipos de modelo, fontes de dados e controles de acesso. Investidores perguntam se há risco reputacional por falta de transparência ao usuário final.",
  "O time de produto compara abordagens com e sem rótulos pré-definidos para o mesmo conjunto de dados; a discussão foca em trade-offs de custo de rotulagem e interpretação dos resultados.",
  "Em um hackathon interno, mentores pedem que as equipes revisem definições de paradigmas de aprendizado antes de escrever código — para alinhar vocabulário, não para impor uma arquitetura vencedora.",
  "A empresa adota um framework de IA responsável com seis pilares. Na retrospectiva trimestral, perguntam qual prática de governança se relaciona a definir donos e responsabilidades por decisões automatizadas.",
  "Um analista de risco pede que vocês expliquem, em uma frase cada, o que o modelo otimiza e qual evidência existe de que isso reduz o risco material — antes de discutir algoritmos.",
  "Você apresenta para o conselho um glossário de termos de IA e machine learning, enfatizando que alinhar vocabulário reduz expectativas irreais sobre o que pode ser automatizado com segurança.",
  "Especialistas em qualidade questionam se o viés dos dados de treino pode explicar erros sistemáticos contra certas regiões. A discussão técnica foca no conceito de viés indesejado no modelo.",
  "A área de compliance incluiu no checklist verificação de que rotuladores humanos tiveram instruções consistentes. Isso impacta diretamente a viabilidade de modelos que dependem de exemplos com saída conhecida.",
  "Um parceiro sugere treinar apenas com dados públicos agregados para evitar LGPD. Você explica trade-offs entre privacidade, utilidade do modelo e necessidade de rótulos para aprendizado supervisionado.",
  "O time de UX estuda como explicar ao usuário final por que uma recomendação foi feita, sem expor segredos comerciais do modelo. A conversa conecta requisitos de UX a pilares de transparência e explicabilidade.",
  "Em uma mesa redonda, executivos misturam ‘automação de processos’, ‘modelos preditivos’ e ‘modelos generativos’. Você organiza o quadro conceitual sem aprofundar marca ou licenciamento de software.",
  "Numa revisão de escopo, o time questiona se há dados rotulados coerentes com o uso pretendido, se as classes cobrem casos reais e se a métrica escolhida reflete o custo de erro para o negócio.",
];

const AZURE_ML = [
  "Sua equipe adotou o Azure Machine Learning para padronizar experimentos e implantar modelos. Você precisa orientar colegas sobre onde artefatos, execuções e metadados ficam organizados no ecossistema do serviço.",
  "Um cientista de dados prefere arrastar componentes em um canvas em vez de escrever pipelines apenas em código para prototipagem rápida. A liderança quer saber qual recurso do Azure ML melhor se encaixa nesse estilo de trabalho.",
  "O prazo do sprint é curto e o time quer explorar automaticamente algoritmos e hiperparâmetros dentro de limites aprovados, com métrica de sucesso definida pelo negócio.",
  "O modelo de fraude binária está em revisão. Os analistas pediram uma métrica que reflita o trade-off entre alarmes verdadeiros e falsos positivos em diferentes limiares de decisão.",
  "Após um aumento súbito de erros em dados de validação, suspeita-se que o modelo memorizou padrões espúrios do conjunto de treino. A reunião foca em diagnóstico de generalização.",
  "A operação precisa pontuar milhões de registros em arquivo durante a madrugada, sem exigência de resposta interativa por requisição HTTP. A arquitetura deve refletir esse padrão.",
  "Você documenta um pipeline que prepara dados tabulares, treina, registra o modelo e publica um endpoint gerenciado. Colegas novatos perguntam qual componente representa o ‘projeto’ central que agrega esses artefatos.",
  "O time de MLOps exige ambientes reproduzíveis: mesmas bibliotecas e versões entre treino local, CI e o container de inferência. Qual conceito do Azure ML endereça isso diretamente?",
  "Há preocupação com deriva entre o perfil de dados de treino e o tráfego atual em produção. Monitoramento contínuo foi adicionado ao backlog.",
  "A equipe de segurança reforçou que apenas perfis autorizados podem implantar endpoints que acessam dados classificados. A configuração de permissões no workspace é discutida.",
  "Grandes volumes brutos precisam ser agregados e limpos antes do treino; parte do processamento ocorre em cluster de processamento distribuído integrado ao fluxo.",
  "O código de treino e as definições de pipeline devem passar por revisão em branches, com histórico rastreável, antes de promover uma versão do modelo.",
  "Um parceiro de negócio pediu comparar o custo de inferência em batch versus online para o mesmo modelo. A equipe técnica precisa alinhar vocabulário sobre tipos de serviço e quando cada um se aplica.",
  "Durante a migração de um notebook local para o Azure ML, surgem dúvidas sobre onde versionar datasets, como registrar métricas de experimento e como vincular runs a um projeto auditável.",
  "A empresa padronizou métricas de classificação por domínio: churn usa AUC, suporte ao cliente usa F1. Você explica por que uma única métrica genérica não serve a todos os casos de uso.",
  "O time de dados quer executar treinamento distribuído em GPU para um modelo profundo, mas precisa limitar custo com agendamento e tamanho de cluster. A discussão envolve compute targets e quotas.",
  "Após um incidente, descobriu-se que o endpoint em produção não correspondia ao modelo aprovado no último release. O comitê de MLOps reforça rastreabilidade entre artefato registrado e implantação.",
  "Analistas de negócio solicitaram explicar em linguagem simples o que é um ‘experimento’ no Azure ML versus o que é apenas um script Python executado em uma VM sem registro central.",
  "A integração com Azure DevOps deve disparar pipelines de ML quando há merge na branch principal, com testes de qualidade de dados antes do treino. Você posiciona o papel do Azure ML nesse fluxo.",
  "Um modelo de regressão apresenta RMSE baixo no treino, mas predições absurdas em produção. A equipe suspeita de vazamento de informação entre treino e validação ou de features não disponíveis online.",
  "O catálogo de modelos internos cresceu; é preciso padronizar nomes, tags e estágios (desenvolvimento, homologação, produção) para evitar que times chamem endpoints obsoletos.",
  "Você prepara um workshop sobre inferência em tempo real com latência de poucos centésimos de segundo versus jobs assíncronos que podem levar horas. Os gestores querem exemplos concretos do Azure.",
  "A equipe de privacidade exige que dados sensíveis permaneçam em uma região específica e que logs de predição não armazenem identificadores em texto claro. Isso afeta desenho de workspace e armazenamento.",
  "Cientistas pediram ambientes com pacotes pré-instalados para evitar ‘funciona na minha máquina’. O objetivo é alinhar o ambiente de treino ao container de scoring.",
  "Em uma revisão de arquitetura, questionam se o Azure ML substitui totalmente um data warehouse ou se complementa pipelines ETL já existentes no Azure Synapse ou em outros serviços.",
];

const VISION = [
  "Um aplicativo móvel permite que usuários fotografem documentos para digitalização. O backend precisa converter texto impresso ou manuscrito em string editável com boa taxa de acerto em condições variáveis de iluminação.",
  "A linha de produção quer classificar peças automaticamente em categorias de qualidade usando imagens rotuladas por inspetores. O modelo será retreinado periodicamente com novas fotos.",
  "O sistema de segurança precisa não apenas saber se há um objeto na imagem, mas também localizá-lo com caixas delimitadoras para alertas em tempo quase real.",
  "A equipe de e-commerce deseja que compradores encontrem produtos visualmente semelhantes a uma foto enviada, usando representações vetoriais e busca por vizinhos.",
  "Um fluxo de vídeo de monitoramento urbano deve produzir métricas agregadas (por exemplo, ocupação) sem necessariamente identificar indivíduos, respeitando minimização de dados.",
  "O time de saúde reforça que qualquer uso de análise de imagens médicas exige validação clínica e conformidade; a IA é apoio à decisão, não substitui protocolos sem supervisão.",
  "Formulários escaneados chegam com tabelas e campos estruturados; extrair apenas texto solto não basta — é preciso entender layout e relações entre blocos.",
  "Para reduzir sobreajuste a rotação e escala, o engenheiro aplica transformações controladas nas imagens de treino antes de alimentar a rede.",
  "A plataforma de mídia precisa moderar automaticamente conteúdo impróprio em uploads de usuários, com políticas configuráveis e revisão humana em casos limítrofes.",
  "Dois fluxos distintos são comparados: processar arquivos de imagem em lote noturno versus analisar quadros de um stream ao vivo com requisito de baixa latência.",
  "Engenheiros discutem exportar o modelo treinado para um formato interoperável que rode em runtimes otimizados em CPU ou GPU em diferentes ambientes.",
  "Em inspeção de danos veiculares, o objetivo é delimitar máscaras finas por objeto, não apenas uma caixa ao redor do veículo inteiro.",
  "Uma rede de varejo quer contar visitantes em lojas a partir de câmeras existentes, agregando fluxo por corredor sem armazenar imagens faciais identificáveis.",
  "O departamento de marketing testa reconhecimento de logotipos e produtos em fotos de redes sociais para medir presença de marca; a precisão varia com ângulo e oclusão.",
  "Em agricultura de precisão, drones capturam plantações inteiras. O agrônomo precisa distinguir tipos de vegetação ou pragas a partir de imagens multiespectrais ou RGB de alta resolução.",
  "Um museu digitaliza acervo fotográfico antigo com ruído e baixo contraste. O objetivo é melhorar legibilidade para OCR e catalogação, sem alterar o conteúdo histórico de forma enganosa.",
  "A equipe de UX debate se mostrar caixas de detecção sobre a interface do usuário ou apenas um ícone discreto quando um objeto é encontrado, equilibrando utilidade e privacidade.",
  "Crianças usam um app educativo que classifica desenhos feitos à mão. O desafio é lidar com traços irregulares e variedade de cores, não com fotos de objetos reais.",
  "Em logística, câmeras em docas leem códigos de barras danificados ou parcialmente obstruídos; combinar visão computacional com heurísticas de correção é discutido.",
  "O jurídico questionou se modelos de geração de imagens sintéticas para treino podem violar direitos de personalidade; a conversa foca em dados de treino e uso responsável.",
  "Um concorrente anunciou ‘IA que entende qualquer imagem’. Você explica limitações conhecidas: conjuntos de treino enviesados, contexto ausente e necessidade de validação humana em domínios críticos.",
  "A startup compara APIs de visão gerenciadas versus treinar um modelo customizado do zero, considerando volume de dados rotulados, SLA e custo de manutenção.",
  "Em videoconferência, o produto quer desfocar fundos automaticamente. O time discute segmentação de pessoa versus fundo em tempo real em hardware variado.",
  "Inspeção de infraestrutura usa imagens de pontes e torres; o objetivo é destacar fissuras e corrosão em zoom, possivelmente com detecção de objetos ou segmentação semântica.",
];

const NLP = [
  "Um departamento jurídico recebe contratos em PDF e precisa identificar automaticamente partes, datas e valores para indexação em sistema de gestão documental.",
  "A central de atendimento quer priorizar tickets urgentos analisando o tom das mensagens dos clientes em vários idiomas.",
  "Aplicações multilíngues exigem detectar o idioma de cada trecho antes de encaminhar o texto ao modelo adequado.",
  "Um assistente interno deve responder perguntas usando apenas trechos aprovados de manuais técnicos, reduzindo respostas inventadas sem base.",
  "O produto de podcast precisa gerar legendas sincronizadas a partir do áudio, com possibilidade de revisão humana.",
  "Analistas de RH querem extrair listas de competências de currículos estruturados em texto livre para cruzar com vagas abertas.",
  "O time de compliance solicita mascarar CPF, e-mails e telefones em logs de chat antes de armazenamento de longo prazo.",
  "Uma busca no portal corporativo deve encontrar documentos por significado aproximado, não apenas por palavras-chave idênticas.",
  "O roadmap inclui resumir threads longas de e-mail para gestores, preservando decisões e prazos mencionados em várias mensagens encadeadas.",
  "Engenheiros avaliam métricas automáticas de qualidade para tradução automática quando há frases de referência aprovadas pelo revisor humano.",
  "Bots precisam interpretar comandos de voz convertidos em texto e mapear intenções estruturadas para acionar APIs backend.",
  "Textos sociais misturam dois idiomas na mesma frase; o pipeline deve segmentar e rotear corretamente cada parte.",
  "A equipe de suporte quer classificar automaticamente o motivo do contato (faturamento, técnico, cancelamento) a partir de texto livre e campos estruturados opcionais.",
  "Um banco de investimentos analisa notícias e comunicados para sinalizar menções a riscos regulatórios; a precisão do reconhecimento de entidades é crítica.",
  "O produto editorial propõe gerar rascunhos de posts a partir de tópicos, com revisão humana obrigatória antes da publicação.",
  "Em call center, supervisores precisam de transcrições com marcação de falante e detecção de palavras proibidas para treinamento de qualidade.",
  "A empresa recebe feedback de clientes em formulários abertos; o time de produto quer agrupar temas emergentes sem rotular manualmente milhares de respostas.",
  "Documentação técnica existe em várias versões; o chatbot deve citar a versão correta do manual conforme o produto que o cliente possui.",
  "O time de dados discute embeddings versus TF-IDF para busca semântica interna, considerando corpus em português e vocabulário de domínio.",
  "Redes sociais internas geram sarcasmo e gírias; modelos de sentimento precisam ser calibrados para o contexto organizacional, não apenas notícias gerais.",
  "Um projeto de acessibilidade converte documentos longos em áudio com voz natural, respeitando pronúncia de termos técnicos e siglas.",
  "A fusão de duas empresas exige harmonizar glossários de produto; NLP pode sugerir equivalências, mas decisão final é humana.",
  "Em compliance, é preciso detectar dados pessoais em anexos de e-mail antes do arquivamento; falsos negativos são inaceitáveis para o regulador.",
];

const CONVERSATIONAL = [
  "Uma empresa implanta um bot em Teams e no site institucional. Os desenvolvedores precisam isolar a lógica de diálogo das particularidades de cada canal de comunicação.",
  "O FAQ interno foi ingerido em uma base de perguntas e respostas curadas; o bot deve priorizar essas fontes antes de respostas genéricas.",
  "Usuários frequentemente mudam de assunto no meio de um fluxo guiado; o sistema deve manter estado e permitir retomada ou escalonamento humano.",
  "Para ações que alteram dados sensíveis, o fluxo exige confirmação explícita do usuário antes de executar a operação.",
  "Quando a intenção não é reconhecida com confiança suficiente, o bot deve pedir esclarecimento ou oferecer opções em vez de falhar em silêncio.",
  "A integração com APIs corporativas exige que o usuário autentique-se com o provedor de identidade da organização antes de consultar pedidos.",
  "A telemetria de conversas (sem dados pessoais) será usada para identificar lacunas de compreensão e priorizar novos exemplos de treino.",
  "Em canais que suportam cartões ricos, o time de UX quer botões e imagens estruturadas em vez de apenas texto plano.",
  "O assistente de voz encadeia reconhecimento de fala, interpretação de linguagem natural e síntese de voz na resposta.",
  "O mesmo bot deve adaptar o formato da mensagem quando o canal não suporta recursos avançados disponíveis em outros.",
  "Middleware intercepta mensagens para aplicar locale, registro de auditoria e políticas de conteúdo antes do processamento principal.",
  "Estado de perfil do usuário (preferências persistentes) deve ser separado do estado volátil da conversa atual na sessão.",
  "O help desk quer que o bot reconheça quando o usuário pede para falar com humano e transfira o contexto resumido para o atendente.",
  "Em horário de pico, o bot deve informar tempos de espera estimados ao escalar para fila humana, sem inventar números.",
  "Um piloto em WhatsApp exige mensagens curtas e confirmações por botão; o mesmo diálogo no portal web pode usar formulários longos.",
  "A equipe de segurança exige que o bot nunca exponha dados de outros clientes mesmo se o usuário tentar induzir o modelo por engenharia social.",
  "Product owners pedem A/B test em saudações e tom de voz do bot, medindo conclusão de tarefas e satisfação declarada.",
  "Integrações com ERP falham esporadicamente; o diálogo deve comunicar erro de forma clara e oferecer repetir ou abrir chamado.",
  "O bot multilíngue deve negociar idioma com o usuário na primeira interação e lembrar a preferência nas próximas sessões.",
  "Em ambientes regulados, cada resposta que altera estado deve registrar ID de correlação para auditoria cruzada com sistemas legados.",
  "Desenvolvedores discutem separar modelo de linguagem grande de regras de negócio determinísticas que não podem ser ‘alucinadas’.",
  "O marketing quer personalizar promoções no chat com base no histórico de compras, respeitando opt-in e legislação de privacidade.",
  "Durante incidente, o modo degradação do bot deve informar indisponibilidade parcial e evitar prometer prazos que APIs externas não garantem.",
];

const BAGS = {
  workload: WORKLOAD,
  azure_ml: AZURE_ML,
  vision: VISION,
  nlp: NLP,
  conversational: CONVERSATIONAL,
};

const MIN_STEM_CHARS = 220;

export function expandOfficialStyleStem(domain, stem, stableId) {
  const s = String(stem || "").trim();
  if (s.length >= MIN_STEM_CHARS) return s;
  if (s.includes("\n\n") && s.length >= 180) return s;

  const bag = BAGS[domain] || BAGS.workload;
  const intro = bag[Math.abs(stableId * 31 + domain.length * 7) % bag.length];
  if (!intro) return s;

  if (s.toLowerCase().startsWith(intro.slice(0, 40).toLowerCase())) return s;

  return `${intro}\n\n${s}`;
}
