/**
 * Pools revisados (design instrucional): enunciados distintos por item,
 * distratores plausiveis, explicacoes curtas. Uso exclusivo do gerador.
 */

const D = {
  vis: [
    "Apenas indexar filas Service Bus.",
    "Somente configurar VPN site a site.",
    "Gerir apenas contas de armazenamento sem analise de midia.",
  ],
  nlp: [
    "Treinar exclusivamente redes para imagens de microscopia.",
    "Substituir backups de VM sem analise de texto.",
    "Configurar apenas balanceadores de carga.",
  ],
};

function opts(correct, a, b, c) {
  return [correct, a, b, c];
}

/** 30 itens — etica, transparencia, governanca (sem repetir mesmo enunciado) */
export function poolWorkloadTransparency() {
  const rows = [
    [
      "Documentar limitacoes conhecidas do modelo e casos de falha atende principalmente a qual ideia de IA responsavel?",
      0,
      opts(
        "Transparencia e clareza sobre o que o sistema pode e nao pode fazer.",
        "Aumentar o numero de camadas da rede neural sem medicao.",
        "Ocultar metricas de erro para nao alarmar usuarios.",
        "Proibir qualquer teste em dados sinteticos.",
      ),
      "Transparencia inclui comunicar limites e riscos do sistema.",
    ],
    [
      "Permitir que usuarios contestem ou solicitem revisao humana de uma decisao automatizada esta mais ligado a:",
      0,
      opts(
        "Mecanismos de responsabilizacao e correcao (accountability).",
        "Reduzir o tamanho do conjunto de treino.",
        "Trocar GPU por CPU em todo o pipeline.",
        "Remover logs por economia de armazenamento.",
      ),
      "Accountability inclui vias de recurso e responsabilidade pelos efeitos.",
    ],
    [
      "Testar o modelo com subgrupos demograficos para detectar disparidade de desempenho apoia principalmente:",
      0,
      opts(
        "Equidade (fairness) entre grupos comparaveis.",
        "Aumentar latencia de inferencia.",
        "Evitar uso de validacao cruzada.",
        "Substituir metricas por intuicao.",
      ),
      "Avaliacao por grupo ajuda a revelar vies e impacto desigual.",
    ],
    [
      "Criptografar dados em repouso e controlar acesso por papel (RBAC) no pipeline de ML reforca:",
      0,
      opts(
        "Privacidade e seguranca dos dados.",
        "Somente a velocidade de treino.",
        "A escolha exclusiva de algoritmos lineares.",
        "A eliminacao de conjuntos de teste.",
      ),
      "Protecao de dados e acesso sao pilares de privacidade e seguranca.",
    ],
    [
      "Incluir revisao humana quando o modelo tem baixa confianca na predicao e um exemplo de:",
      0,
      opts(
        "Complementar automacao com supervisao onde ha incerteza.",
        "Ignorar completamente o escore de confianca.",
        "Desligar monitoramento em producao.",
        "Treinar somente com um unico epoch.",
      ),
      "Fluxos human-in-the-loop reduzem risco quando o modelo nao e confiavel.",
    ],
    [
      "Publicar notas de versao do modelo e dados usados no treino contribui para:",
      0,
      opts(
        "Rastreabilidade e auditoria do artefato implantado.",
        "Impedir retreinamento futuro.",
        "Eliminar necessidade de ambiente de staging.",
        "Substituir testes A/B.",
      ),
      "Versionamento e documentacao apoiam reproducibilidade e auditoria.",
    ],
    [
      "Ao divulgar que uma imagem foi gerada por IA, qual pilar se fortalece?",
      0,
      opts(
        "Transparencia sobre origem e natureza do conteudo.",
        "Reduzir custo de armazenamento.",
        "Aumentar automaticamente a resolucao.",
        "Eliminar direitos autorais.",
      ),
      "Informar origem sintetica evita engano e apoia uso responsavel.",
    ],
    [
      "Evitar treinar com dados obtidos sem consentimento adequado esta ligado a:",
      0,
      opts(
        "Privacidade e conformidade com base legal e etica.",
        "Maximizar sempre o tamanho do batch.",
        "Usar apenas metricas de treino, nao de validacao.",
        "Eliminar validacao cruzada.",
      ),
      "Consentimento e base legal sao requisitos de dados sensiveis.",
    ],
    [
      "Um painel que mostra drift de dados e degradacao da metrica em producao ajuda:",
      0,
      opts(
        "Confiabilidade e monitoramento continuo do sistema.",
        "Remover necessidade de SLAs internos.",
        "Impedir retreinamento periodico.",
        "Substituir testes de regressao de software.",
      ),
      "Monitorar deriva e queda de qualidade sustenta confiabilidade operacional.",
    ],
    [
      "Garantir que o sistema funcione para pessoas com necessidades diversas (acessibilidade) relaciona-se a:",
      0,
      opts(
        "Inclusao no desenho e validacao com usuarios diversos.",
        "Reduzir numero de idiomas suportados.",
        "Eliminar testes com leitores de tela.",
        "Usar apenas entradas numericas.",
      ),
      "Inclusao considera diferentes habilidades e contextos de uso.",
    ],
    [
      "Quando um modelo de linguagem inventa fatos inexistentes, o fenomeno costuma ser chamado de:",
      0,
      opts(
        "Alucinacao — exige validacao em dominios criticos.",
        "Underfitting estrutural.",
        "Normalizacao excessiva exclusiva.",
        "Clustering hierarquico.",
      ),
      "Alucinacao e geracao plausivel mas incorreta; exige checagem.",
    ],
    [
      "Separar conjuntos de treino, validacao e teste visa principalmente:",
      0,
      opts(
        "Estimar desempenho em dados nao vistos e reduzir sobreajuste aparente.",
        "Duplicar dados sem motivo.",
        "Eliminar a necessidade de metricas.",
        "Impedir uso de validacao cruzada.",
      ),
      "Particionamento honesto mede generalizacao.",
    ],
    [
      "Em IA generativa, manter registro de prompts e respostas em ambientes corporativos ajuda:",
      0,
      opts(
        "Auditoria, conformidade e depuracao de incidentes.",
        "Evitar qualquer retencao por privacidade mal interpretada.",
        "Substituir criptografia.",
        "Eliminar necessidade de classificacao de dados.",
      ),
      "Rastreabilidade de uso e saida apoia governanca.",
    ],
    [
      "Qual pratica reduz risco de vies de amostragem no treino?",
      0,
      opts(
        "Verificar representatividade e possiveis lacunas por segmento.",
        "Usar apenas dados mais faceis de coletar.",
        "Eliminar outliers sem analise.",
        "Treinar somente no ultimo mes selecionado arbitrariamente.",
      ),
      "Amostra nao representativa distorce o modelo.",
    ],
    [
      "Indicar que uma decisao foi assistida por IA, sem sugerir julgamento humano quando nao houve, exemplifica:",
      0,
      opts(
        "Transparencia sobre o papel da automacao.",
        "Marketing agressivo proibido em todos os casos.",
        "Substituicao total de advogados.",
        "Eliminacao de accountability.",
      ),
      "Clareza sobre automacao vs. humano evita expectativa falsa.",
    ],
    [
      "Em sistemas de pontuacao de credito, revisar impacto em grupos protegidos alinha-se a:",
      0,
      opts(
        "Equidade e mitigacao de discriminacao injusta.",
        "Aumentar exclusivamente a complexidade do modelo.",
        "Remover toda explicacao ao usuario final.",
        "Eliminar testes estatisticos.",
      ),
      "Impacto diferenciado injusto viola fairness.",
    ],
    [
      "Qual medida melhora **confiabilidade** percebida em chatbots de suporte?",
      0,
      opts(
        "Indicar fontes ou base de conhecimento quando possivel.",
        "Ocultar sempre a origem das respostas.",
        "Responder com afirmacoes absolutas sem nivel de confianca.",
        "Desativar feedback do usuario.",
      ),
      "Fontes e limites conhecidos aumentam confianca fundamentada.",
    ],
    [
      "O principio de **minimizacao de dados** sugere:",
      0,
      opts(
        "Coletar e ret apenas o necessario para o proposito declarado.",
        "Armazenar todos os campos possiveis por precaucao indefinida.",
        "Compartilhar dados com terceiros sem revisao.",
        "Eliminar criptografia para performance.",
      ),
      "Minimizar dados reduz risco e exposicao.",
    ],
    [
      "Checklist pre-implementacao com impacto ambiental estimado (energia, GPU) apoia:",
      0,
      opts(
        "Sustentabilidade e decisao consciente de recursos.",
        "Ignorar custo de treino.",
        "Proibir qualquer nuvem.",
        "Eliminar metricas de negocio.",
      ),
      "Sustentabilidade e criterio crescente em ML em escala.",
    ],
    [
      "Em visao de computador para vigilancia publica, documentar finalidade e base legal exemplifica:",
      0,
      opts(
        "Transparencia e conformidade em uso sensivel.",
        "Eliminar necessidade de aviso ao publico.",
        "Substituir politicas de privacidade.",
        "Garantir anonimato absoluto sem tecnica adequada.",
      ),
      "Usos sensiveis exigem clareza e amparo legal.",
    ],
    [
      "Qual afirmacao sobre **explicabilidade** e mais adequada?",
      0,
      opts(
        "Pode incluir importancia de features ou regras aproximadas para o usuario.",
        "Exige publicar pesos completos em todos os casos.",
        "Impede uso de modelos nao lineares.",
        "Substitui testes estatisticos.",
      ),
      "Explicabilidade tem varios niveis; importancia de features e comum.",
    ],
    [
      "Um modelo que performa bem no treino e mal na validacao provavelmente apresenta:",
      0,
      opts(
        "Sobreajuste (overfitting) a particuliaridades do treino.",
        "Underfitting severo no treino.",
        "Dados de validacao identicos ao treino.",
        "Metrica inadequada apenas em producao.",
      ),
      "Gap treino-validacao grande sugere memorizacao.",
    ],
    [
      "Politica de retencao e exclusao de dados pessoais apos o fim do contrato reforca:",
      0,
      opts(
        "Privacidade e ciclo de vida dos dados.",
        "Obrigatoriedade de manter dados eternamente.",
        "Eliminacao de backups cifrados.",
        "Impedir auditoria.",
      ),
      "Retencao limitada reduz exposicao.",
    ],
    [
      "Em equipes multidisciplinares, o papel de **revisao etica** antes do deploy busca:",
      0,
      opts(
        "Identificar riscos sociais e mitigacoes antes de liberar.",
        "Substituir testes unitarios de codigo.",
        "Eliminar cientistas de dados do processo.",
        "Garantir aprovacao automatica.",
      ),
      "Revisao etica complementa testes tecnicos.",
    ],
    [
      "Ao usar dados sinteticos para aumentar treino, deve-se:",
      0,
      opts(
        "Validar se preservam estatisticas relevantes e nao introduzem artefatos.",
        "Substituir integralmente dados reais sem checagem.",
        "Ignorar dominio de aplicacao.",
        "Eliminar conjunto de teste.",
      ),
      "Dados sinteticos exigem validacao de fidelidade.",
    ],
    [
      "Qual cenario favorece **inclusao** em interfaces de voz?",
      0,
      opts(
        "Oferecer alternativas textuais e ajuste de velocidade de fala.",
        "Usar apenas comandos em ingles.",
        "Exigir sotaque padrao unico.",
        "Desativar legendas.",
      ),
      "Multiplos modos e idiomas ampliam acessibilidade.",
    ],
    [
      "Registrar decisoes de limiar (threshold) de classificacao e seu impacto em taxas de aprovacao apoia:",
      0,
      opts(
        "Governanca e ajuste consciente de trade-offs.",
        "Eliminar metricas de negocio.",
        "Impedir calibracao futura.",
        "Substituir validacao humana sempre.",
      ),
      "Limiares afetam equidade operacional; documentar e essencial.",
    ],
    [
      "Em IA generativa de codigo, recomenda-se:",
      0,
      opts(
        "Revisar e testar codigo gerado antes de producao.",
        "Implantar direto sem CI/CD.",
        "Confiar cegamente em dependencias sugeridas.",
        "Eliminar analise estatica.",
      ),
      "Codigo sintetizado pode conter falhas; revisao e testes permanecem obrigatorios.",
    ],
    [
      "O que caracteriza **multi-modal** em modelos recentes?",
      0,
      opts(
        "Combinar entradas de tipos distintos (ex.: texto e imagem) em um unico fluxo.",
        "Usar apenas uma modalidade por vez, sempre.",
        "Eliminar embeddings.",
        "Restringir a numeros inteiros.",
      ),
      "Multi-modal integra mais de um tipo de dado.",
    ],
    [
      "Priorizar casos de alto impacto para revisao humana e uma forma de:",
      0,
      opts(
        "Alocar supervisao onde o risco e maior.",
        "Eliminar supervisao em todos os casos.",
        "Ignorar escores de probabilidade.",
        "Reduzir seguranca.",
      ),
      "Triagem por risco e boa pratica operacional.",
    ],
  ];
  return rows.map((r) => ({
    domain: "workload",
    stem: r[0],
    correctIndex: r[1],
    options: r[2],
    explanation: r[3],
  }));
}

/** 40 itens — Azure ML (conceitos tipicos do exame, sem inventar precos/SLAs) */
export function poolAzureMl40() {
  const rows = [
    [
      "No Azure Machine Learning, um **datastore** representa tipicamente:",
      0,
      opts(
        "Uma referencia a uma fonte de dados (ex.: armazenamento) usada pelo workspace.",
        "Somente uma tabela SQL fixa sem conexao externa.",
        "Um certificado TLS obrigatorio para GPU.",
        "O relatorio de billing mensal fechado.",
      ),
      "Datastore aponta para fontes de dados acessadas pelo workspace.",
    ],
    [
      "Um **compute target** no Azure ML e:",
      0,
      opts(
        "O recurso onde o treino ou a inferencia escalar roda (cluster, instancia, etc.).",
        "Apenas o nome do experimento no portal.",
        "Somente o arquivo requirements.txt local.",
        "Um tipo exclusivo de firewall.",
      ),
      "Compute target e o ambiente de execucao escolhido para o job.",
    ],
    [
      "Registrar um modelo no **model registry** permite:",
      0,
      opts(
        "Versionar artefatos e promover para implantacao com rastreabilidade.",
        "Eliminar necessidade de testes.",
        "Impedir pipelines.",
        "Bloquear endpoints.",
      ),
      "Registro versiona modelos para implantacao controlada.",
    ],
    [
      "Um **pipeline** de ML no Azure costuma ser usado para:",
      0,
      opts(
        "Orquestrar etapas reproduziveis: dados, treino, registro e implantacao.",
        "Substituir qualquer banco de dados.",
        "Gerir apenas DNS.",
        "Executar apenas scripts sem dependencias.",
      ),
      "Pipelines automatizam fluxos repetiveis e auditaveis.",
    ],
    [
      "Um **endpoint** online em geral serve para:",
      0,
      opts(
        "Receber requisicoes HTTP e retornar predicoes em tempo quase real.",
        "Armazenar dados brutos indefinidamente.",
        "Somente agendar jobs batch.",
        "Compilar codigo Java antigo.",
      ),
      "Endpoints online expoem o modelo como servico sincrono.",
    ],
    [
      "Inferencia **batch** e mais indicada quando:",
      0,
      opts(
        "Ha grande volume acumulado e latencia pontual nao e critica.",
        "Cada requisicao exige resposta em milissegundos fixos.",
        "Nao existe armazenamento.",
        "O modelo nao pode ser versionado.",
      ),
      "Batch processa lotes com throughput, nao interativo.",
    ],
    [
      "O **Designer** do Azure ML difere de notebooks principalmente por:",
      0,
      opts(
        "Oferecer composicao visual de fluxos arrastando componentes.",
        "Proibir uso de Python.",
        "Eliminar experimentos.",
        "Nao permitir dados tabulares.",
      ),
      "Designer e fluxo visual low-code para pipelines.",
    ],
    [
      "**Automated ML** e mais util quando:",
      0,
      opts(
        "Quer-se explorar algoritmos e hiperparametros com objetivo e tempo limitados.",
        "Nao existe nenhum dado rotulado.",
        "O problema e apenas de rede TCP.",
        "E proibido medir qualidade.",
      ),
      "AutoML busca candidatos de modelo de forma automatizada.",
    ],
    [
      "Um **ambiente (environment)** no Azure ML define:",
      0,
      opts(
        "Dependencias e runtime para reproduzir treino e inferencia.",
        "Somente a cor do tema do portal.",
        "A senha do administrador.",
        "Endereco fisico do datacenter.",
      ),
      "Ambiente captura pacotes e versoes para reproducibilidade.",
    ],
    [
      "A divisao **treino / validacao / teste** visa:",
      0,
      opts(
        "Avaliar generalizacao sem vazar informacao do teste no ajuste do modelo.",
        "Usar o mesmo conjunto para tudo.",
        "Eliminar validacao.",
        "Treinar apenas no teste.",
      ),
      "Separacao evita vies de avaliacao otimista.",
    ],
    [
      "**Feature engineering** refere-se a:",
      0,
      opts(
        "Criar ou selecionar entradas que facilitem o aprendizado.",
        "Remover todos os outliers sem analise.",
        "Copiar dados sem transformacao.",
        "Substituir metricas por intuição.",
      ),
      "Features melhores costumam melhorar o modelo.",
    ],
    [
      "**Drift** de dados em producao significa:",
      0,
      opts(
        "Mudanca na distribuicao dos dados em relacao ao treino.",
        "Aumento de RAM do servidor web.",
        "Erro de sintaxe em Python.",
        "Backup concluido com sucesso.",
      ),
      "Drift pode degradar o modelo; exige monitoramento.",
    ],
    [
      "Um **experimento** no Azure ML agrupa:",
      0,
      opts(
        "Execucoes relacionadas para comparar metricas e hiperparametros.",
        "Somente usuarios do Active Directory.",
        "Licencas de Office.",
        "Configuracao de roteadores.",
      ),
      "Experimentos organizam runs comparaveis.",
    ],
    [
      "Escolher metrica principal (ex.: AUC, RMSE) cedo no projeto ajuda:",
      0,
      opts(
        "Alinhar otimizacao do modelo ao objetivo de negocio.",
        "Eliminar necessidade de dados de validacao.",
        "Impedir uso de conjunto de teste.",
        "Evitar documentacao.",
      ),
      "Metrica guia selecao e comparacao de modelos.",
    ],
    [
      "**Validacao cruzada** (cross-validation) e util para:",
      0,
      opts(
        "Estimar desempenho com particoes rotativas dos dados disponiveis.",
        "Eliminar conjunto de teste reservado.",
        "Substituir etica.",
        "Garantir overfitting.",
      ),
      "CV reduz dependencia de um unico split aleatorio.",
    ],
    [
      "Implantar modelo em **containers** costuma trazer:",
      0,
      opts(
        "Portabilidade e consistencia entre ambientes de dev e producao.",
        "Impossibilidade de versionar.",
        "Eliminacao de APIs REST.",
        "Proibicao de GPU.",
      ),
      "Containers empacotam dependencias do servico de scoring.",
    ],
    [
      "Um **pipeline de dados** prepara dados antes do treino para:",
      0,
      opts(
        "Limpar, integrar e transformar entradas de forma repetivel.",
        "Eliminar necessidade de datastore.",
        "Substituir modelo.",
        "Remover logs.",
      ),
      "ETL/ELT prepara dados confiaveis para ML.",
    ],
    [
      "**Hiperparametros** diferem de **parametros do modelo** porque:",
      0,
      opts(
        "Sao definidos antes do treino (ex.: taxa de aprendizado), nao aprendidos diretamente pelos dados.",
        "Sao sempre iguais aos pesos da ultima camada.",
        "Nao afetam o resultado.",
        "Sao apenas nomes de colunas.",
      ),
      "Hiperparametros controlam o processo de aprendizado.",
    ],
    [
      "Em implantacao, **teste A/B** entre duas versoes de modelo serve para:",
      0,
      opts(
        "Comparar metricas de negocio em trafego dividido.",
        "Eliminar monitoramento.",
        "Impedir rollback.",
        "Substituir privacidade.",
      ),
      "A/B avalia impacto real de novas versoes.",
    ],
    [
      "**Pontuacao** (scoring) e o termo comum para:",
      0,
      opts(
        "Executar o modelo treinado para obter predicoes.",
        "Apagar dados.",
        "Somente instalar drivers.",
        "Configurar DNS.",
      ),
      "Scoring e inferencia sobre novos dados.",
    ],
    [
      "Um **servico gerenciado de ML** na nuvem tipicamente oferece:",
      0,
      opts(
        "Escalabilidade de computacao e MLOps integrado ao ecossistema do provedor.",
        "Eliminacao de custos variaveis em qualquer cenario.",
        "Garantia de modelo perfeito.",
        "Substituicao de dados reais.",
      ),
      "Nuvem oferece elasticidade e ferramentas; nao garante qualidade magica.",
    ],
    [
      "**Labeling** assistido por ML em projetos de visao ajuda a:",
      0,
      opts(
        "Acelerar anotacao com sugestoes que humanos revisam.",
        "Eliminar revisao humana em qualquer caso.",
        "Substituir armazenamento.",
        "Impedir treino supervisionado.",
      ),
      "Rotulagem assistida combina modelo sugestivo com validacao humana.",
    ],
    [
      "Quando o objetivo e detectar fraude rara, costuma-se:",
      0,
      opts(
        "Tratar desbalanceamento de classes e escolher metricas adequadas (ex.: precisao/recall).",
        "Ignorar a classe minoritaria.",
        "Usar apenas acuracia global.",
        "Eliminar validacao.",
      ),
      "Classes raras exigem metricas e amostragem cuidadosas.",
    ],
    [
      "**Normalizacao** de features numericas pode ajudar a:",
      0,
      opts(
        "Colocar escalas em faixas comparaveis para muitos algoritmos.",
        "Remover variaveis categoricas.",
        "Eliminar necessidade de treino.",
        "Substituir rotulos.",
      ),
      "Escalas comparaveis melhoram convergencia e comparacao.",
    ],
    [
      "Um **run** no Azure ML registra tipicamente:",
      0,
      opts(
        "Metricas, parametros, logs e artefatos gerados na execucao.",
        "Somente o nome do usuario.",
        "Configuracao de impressora.",
        "Lista de sites bloqueados.",
      ),
      "Runs permitem auditoria e reproducao.",
    ],
    [
      "**Seleção de features** visa:",
      0,
      opts(
        "Reduzir dimensionalidade e ruido mantendo sinal util.",
        "Copiar todas as colunas duplicadas.",
        "Eliminar validacao.",
        "Ignorar dominio.",
      ),
      "Menos features irrelevantes pode melhorar generalizacao.",
    ],
    [
      "Em pipelines, **parametrizar** caminhos de dados e hiperparametros permite:",
      0,
      opts(
        "Reexecutar o mesmo fluxo com configuracoes diferentes sem reescrever tudo.",
        "Impedir agendamento.",
        "Eliminar controle de versao.",
        "Substituir testes.",
      ),
      "Parametros tornam pipelines reutilizaveis.",
    ],
    [
      "Um modelo de classificacao retorna **probabilidade** por classe para:",
      0,
      opts(
        "Expressar incerteza e permitir limiares ajustaveis.",
        "Eliminar interpretacao.",
        "Garantir rotulo sempre igual a 1.",
        "Substituir metricas.",
      ),
      "Probabilidades suportam decisao calibrada.",
    ],
    [
      "**Retreinar** periodicamente pode ser necessario quando:",
      0,
      opts(
        "Há drift, novos padroes ou expansao de escopo.",
        "O modelo nunca deve mudar.",
        "Nao existem dados novos.",
        "A acuracia de treino e 100%.",
      ),
      "Mundo muda; modelos podem precisar atualizacao.",
    ],
    [
      "Em MLOps, **CI/CD** para ML estende CI/CD tradicional com:",
      0,
      opts(
        "Validacao de dados, modelo e monitoramento pos-deploy.",
        "Somente compilacao de front-end.",
        "Eliminacao de testes.",
        "Deploy sem ambiente de staging.",
      ),
      "ML exige gates adicionais alem de codigo.",
    ],
    [
      "Um **conjunto de dados (dataset)** no Azure ML costuma referir-se a:",
      0,
      opts(
        "Metadados e referencias para dados usados em treino ou pipelines.",
        "Copia fisica obrigatoria de todo o data lake no disco local.",
        "Somente imagens PNG.",
        "Backup de email.",
      ),
      "Datasets abstraem e versionam referencias a dados.",
    ],
    [
      "**Inferencia em tempo real** exige atencao a:",
      0,
      opts(
        "Latencia, escalabilidade e custo por requisicao.",
        "Eliminar logs.",
        "Proibir autoscaling.",
        "Usar apenas batch.",
      ),
      "SLAs de latencia guiam desenho de endpoint.",
    ],
    [
      "Escolher **tamanho de VM** adequado ao treino influencia:",
      0,
      opts(
        "Tempo de execucao e custo; deve equilibrar com o experimento.",
        "Somente cor do portal.",
        "DNS.",
        "Tipo de SSL do site institucional.",
      ),
      "Compute adequado evita gargalo ou desperdicio.",
    ],
    [
      "**Exportar** modelo para **ONNX** pode facilitar:",
      0,
      opts(
        "Implantacao em runtimes otimizados e interoperabilidade.",
        "Eliminar testes.",
        "Impedir uso em GPU.",
        "Substituir validacao de dados.",
      ),
      "ONNX e formato comum para interoperar entre frameworks.",
    ],
    [
      "Em experimentos, **sementes aleatorias** (random seed) fixas ajudam a:",
      0,
      opts(
        "Reproduzir resultados quando o algoritmo e estocastico.",
        "Garantir dados identicos entre empresas.",
        "Eliminar validacao.",
        "Evitar qualquer aleatoriedade no mundo real.",
      ),
      "Seeds controlam reprodutibilidade parcial.",
    ],
    [
      "**Monitoramento** pos-implantacao deve acompanhar:",
      0,
      opts(
        "Qualidade de predicao, latencia, volume e erros de entrada.",
        "Somente cliques no site institucional.",
        "Apenas temperatura do escritorio.",
        "Lista de compras pessoais.",
      ),
      "Monitoramento operacional detecta degradacao cedo.",
    ],
    [
      "Um **pipeline de re-treino** disparado por drift pode:",
      0,
      opts(
        "Atualizar o modelo quando metricas caem abaixo do limiar.",
        "Eliminar aprovacao humana sempre.",
        "Impedir rollback.",
        "Substituir backups.",
      ),
      "Automacao de retreino exige salvaguardas; drift e gatilho comum.",
    ],
    [
      "**Divisao temporal** em series (treino no passado, teste no futuro) evita:",
      0,
      opts(
        "Vazamento de informacao futura no treino.",
        "Qualquer uso de GPU.",
        "Normalizacao.",
        "Registro de modelo.",
      ),
      "Em series, ordem temporal importa.",
    ],
    [
      "Em projetos colaborativos, **controle de acesso** ao workspace evita:",
      0,
      opts(
        "Exposicao indevida de dados e credenciais.",
        "Versionamento de experimentos.",
        "Uso de notebooks.",
        "Registro de runs.",
      ),
      "RBAC e segredos protegem ativos de ML.",
    ],
    [
      "**Metrica de negocio** (ex.: receita) diferente da metrica tecnica implica:",
      0,
      opts(
        "Alinhar ou traduzir ganhos de ML para o que a empresa otimiza.",
        "Ignorar AUC completamente sempre.",
        "Eliminar dados.",
        "Proibir implantacao.",
      ),
      "Sucesso de ML deve conversar com KPIs reais.",
    ],
    [
      "Um **script de scoring** em container normalmente recebe:",
      0,
      opts(
        "Payload de entrada, executa modelo, retorna predicao.",
        "Somente HTML.",
        "Arquivos de video exclusivamente.",
        "Somente configuracao de DNS.",
      ),
      "Scoring script encapsula inferencia.",
    ],
  ];
  return rows.slice(0, 40).map((r) => ({
    domain: "azure_ml",
    stem: r[0],
    correctIndex: r[1],
    options: r[2],
    explanation: r[3],
  }));
}

function mapPool(domain, rows) {
  return rows.map((r) => ({
    domain,
    stem: r[0],
    correctIndex: r[1],
    options: r[2],
    explanation: r[3],
  }));
}

/** Visao computacional — 40 enunciados distintos */
export function poolVision40() {
  const rows = [
    [
      "Extrair texto de boletos fotografados para digitacao assistida usa principalmente:",
      0,
      opts(
        "OCR (reconhecimento optico de caracteres).",
        ...D.vis,
      ),
      "OCR converte texto em imagem para texto editavel.",
    ],
    [
      "Classificar uma foto de produto como 'defeituoso' ou 'ok' e tipicamente:",
      0,
      opts(
        "Classificacao de imagem supervisionada.",
        "Clustering puro sem rotulos.",
        "Regressao de serie temporal.",
        "Apenas compressao JPEG.",
      ),
      "Duas ou mais classes rotuladas indicam classificacao.",
    ],
    [
      "Localizar onde na imagem estao varios objetos (caixas delimitadoras) caracteriza:",
      0,
      opts(
        "Deteccao de objetos.",
        "Somente OCR.",
        "Somente traducao de idioma.",
        "Apenas reducao de ruido.",
      ),
      "Deteccao retorna classes e posicoes de multiplos objetos.",
    ],
    [
      "Treinar um classificador com pastas de imagens por classe e cenario tipico de:",
      0,
      opts(
        "Custom Vision / modelo customizado de classificacao.",
        "Somente DNS.",
        "Somente firewall.",
        "Backup de log.",
      ),
      "Custom Vision costuma usar imagens rotuladas por classe.",
    ],
    [
      "Em cenarios de analise de video agregada (contagem, movimento), costuma-se:",
      0,
      opts(
        "Processar fluxo de video e extrair eventos ou metricas (conforme servico e politica).",
        "Eliminar qualquer registro.",
        "Substituir banco relacional.",
        "Apenas enviar email.",
      ),
      "Video analytics agrega informacao de fluxos de midia.",
    ],
    [
      "Comparar similaridade entre duas imagens via vetores pode usar:",
      0,
      opts(
        "Embeddings de imagem e distancia no espaco vetorial.",
        "Somente CRC32 do arquivo.",
        "Somente tamanho em pixels.",
        "Apenas nome do arquivo.",
      ),
      "Embeddings capturam semantica visual para busca e similaridade.",
    ],
    [
      "Moderacao de conteudo visual (adulto, violento) apoia:",
      0,
      opts(
        "Filtragem e conformidade em plataformas.",
        "Somente OCR.",
        "Apenas cluster Hadoop.",
        "Somente VPN.",
      ),
      "Moderacao usa classificadores de conteudo sensivel.",
    ],
    [
      "Segmentacao semantica (por pixel) difere de classificacao de imagem inteira porque:",
      0,
      opts(
        "Atribui classe por regiao ou pixel, nao so um rotulo global.",
        "Nao usa rede neural.",
        "So funciona em audio.",
        "Elimina necessidade de imagem.",
      ),
      "Segmentacao produz mascara fina de classes.",
    ],
    [
      "Deteccao facial para **verificar identidade** (cenário sensivel) exige atencao a:",
      0,
      opts(
        "Consentimento, privacidade e conformidade legal.",
        "Apenas aumentar resolucao.",
        "Eliminar logs sempre.",
        "Ignorar politicas de uso.",
      ),
      "Biometria e dados sensiveis exigem governanca rigorosa.",
    ],
    [
      "Converter fala em texto em tempo real integra visao de conversacao com:",
      0,
      opts(
        "Servicos de fala (speech-to-text), nao visao pura.",
        "OCR.",
        "Somente deteccao de objetos.",
        "Apenas visao computacional estatica.",
      ),
      "STT e modalidade de audio; distinga de visao.",
    ],
    [
      "Para ler texto em multiplos idiomas em placas, combina-se frequentemente:",
      0,
      opts(
        "OCR com deteccao ou selecao de idioma.",
        "Somente DNS.",
        "Apenas cluster sem dados.",
        "Somente agendamento batch de SO.",
      ),
      "Multilingue em OCR exige modelo ou pipeline adequado.",
    ],
    [
      "Descrever uma imagem com frase em linguagem natural (image captioning) e:",
      0,
      opts(
        "Tarefa que cruza visao e NLP.",
        "Somente clustering.",
        "Apenas regressao linear.",
        "Somente criptografia.",
      ),
      "Captioning liga representacao visual a linguagem.",
    ],
    [
      "Deteccao de pontos de referencia faciais (landmarks) pode apoiar:",
      0,
      opts(
        "Alinhamento, filtros e analises geometricas (conforme politica).",
        "Somente backup.",
        "Apenas DNS.",
        "Somente compilacao C.",
      ),
      "Landmarks sao pontos-chave em rostos com usos especificos.",
    ],
    [
      "Um fluxo de digitalizacao de formularios estruturados costuma usar:",
      0,
      opts(
        "Reconhecimento de layout e campos (document intelligence / leitura estruturada).",
        "Somente ping ICMP.",
        "Apenas troca de email.",
        "Somente RAID de disco.",
      ),
      "Formularios misturam OCR e compreensao de layout.",
    ],
    [
      "Aumentar dados de imagem com rotacao e recorte leve e uma forma de:",
      0,
      opts(
        "Data augmentation para reduzir overfitting.",
        "Eliminar validacao.",
        "Substituir rotulos.",
        "Apagar conjunto de teste.",
      ),
      "Augmentation artificialmente aumenta diversidade de treino.",
    ],
    [
      "Classificar se uma radiografia mostra anomalia sugere:",
      0,
      opts(
        "Supervisao medica, dados sensíveis e validacao clinica rigorosa.",
        "Implantacao direta sem revisao.",
        "Somente entretenimento.",
        "Eliminar conformidade.",
      ),
      "Saude exige validacao humana e compliance.",
    ],
    [
      "Detectar equipamentos de EPI em canteiro (capacete, colete) e:",
      0,
      opts(
        "Deteccao de objetos / classificacao em contexto de seguranca.",
        "Somente OCR de CPF.",
        "Apenas agendamento de reuniao.",
        "Somente DNS.",
      ),
      "Visao aplicada a seguranca do trabalho usa deteccao.",
    ],
    [
      "Estimar profundidade ou distancia em visao estereo relaciona-se a:",
      0,
      opts(
        "Geometria multi-view e sensores, alem de classificacao simples.",
        "Somente traducao automatica.",
        "Apenas SQL.",
        "Somente backup.",
      ),
      "Visao 3D vai alem de rotulo unico por imagem.",
    ],
    [
      "Reconhecer logotipos de marcas em fotos de usuario e:",
      0,
      opts(
        "Classificacao ou deteccao treinada com exemplos da marca.",
        "Somente compactacao ZIP.",
        "Apenas roteamento IP.",
        "Somente firewall.",
      ),
      "Logotipos sao classes visuais especificas.",
    ],
    [
      "Converter diagrama em fluxo editavel pode combinar:",
      0,
      opts(
        "OCR com deteccao de formas e relacoes (fluxos complexos).",
        "Somente ping.",
        "Apenas DHCP.",
        "Somente SMTP.",
      ),
      "Diagramas misturam texto e estrutura visual.",
    ],
    [
      "Analise de expressao facial para humor aproximado (cenario etico) requer:",
      0,
      opts(
        "Consentimento, contexto e cautela contra uso discriminatorio.",
        "Implantacao sem aviso.",
        "Eliminar privacidade.",
        "Uso exclusivo infantil sem supervisao.",
      ),
      "Atributos sensiveis exigem etica e politica clara.",
    ],
    [
      "Busca de imagens por similaridade (reverse image search) usa:",
      0,
      opts(
        "Embeddings e indice de vetores aproximados.",
        "Somente CRC.",
        "Apenas nome de arquivo.",
        "Somente tamanho.",
      ),
      "Similaridade em grande escala usa vetores e ANN.",
    ],
    [
      "Deteccao de texto em cena natural (placas, letreiros) difere de documento limpo porque:",
      0,
      opts(
        "Ha ruido, perspectiva e iluminacao variavel.",
        "E identico a PDF texto.",
        "Nao usa camera.",
        "Elimina OCR.",
      ),
      "Texto em cena e mais dificil que documento digitalizado.",
    ],
    [
      "Classificar tipo de solo ou cultura em imagens de drone e:",
      0,
      opts(
        "Classificacao de imagem em dominio agricola.",
        "Somente audio.",
        "Apenas SQL.",
        "Somente backup.",
      ),
      "Visao aerea alimenta modelos de supervisao agricola.",
    ],
    [
      "Deteccao de danos em veiculos (amassado, risco) costuma ser:",
      0,
      opts(
        "Classificacao ou deteccao supervisionada com fotos rotuladas.",
        "Somente DHCP.",
        "Apenas OCR de multas.",
        "Somente email.",
      ),
      "Seguros usam visao para triagem de danos.",
    ],
    [
      "Contagem de pessoas em area (agregado, nao identificacao) visa:",
      0,
      opts(
        "Metricas de ocupacao preservando privacidade quando bem desenhado.",
        "Identificar nome de cada pessoa sempre.",
        "Substituir CCTV por DNS.",
        "Eliminar qualquer etica.",
      ),
      "Contagem agregada reduz identificacao direta.",
    ],
    [
      "Leitura de codigos de barras e QR em imagem e:",
      0,
      opts(
        "Tarefa de deteccao/decodificacao especifica, complementar a OCR geral.",
        "Somente traducao.",
        "Apenas cluster sem rotulo.",
        "Somente regressao.",
      ),
      "Codigos estruturados tem decodificadores dedicados.",
    ],
    [
      "Estimativa de pose humana (esqueleto) aplica-se a:",
      0,
      opts(
        "Interacao, esportes, saude — com requisitos eticos e de privacidade.",
        "Somente OCR.",
        "Apenas SMTP.",
        "Somente backup.",
      ),
      "Pose tracking e visao avancada com dados biometricos.",
    ],
    [
      "Separar primeiro plano e fundo em video para efeitos e:",
      0,
      opts(
        "Segmentacao de video / matting em muitos casos.",
        "Somente OCR.",
        "Apenas DNS.",
        "Somente RAID.",
      ),
      "Segmentacao temporal e comum em edicao e conferencia.",
    ],
    [
      "Reconhecimento de escrita manuscrita difere de OCR de impresso porque:",
      0,
      opts(
        "Ha maior variabilidade de tracos entre escritores.",
        "E identico a fonte Times New Roman.",
        "Nao usa imagem.",
        "Elimina rede neural.",
      ),
      "Manuscrito e mais ambiguo que texto impresso.",
    ],
    [
      "Deteccao de placas veiculares para leitura posterior combina:",
      0,
      opts(
        "Deteccao de regiao e OCR focalizado na placa.",
        "Somente traducao.",
        "Apenas audio.",
        "Somente DHCP.",
      ),
      "Pipeline em duas etapas melhora precisao.",
    ],
    [
      "Classificar cena indoor vs outdoor e:",
      0,
      opts(
        "Classificacao de cena de alto nivel.",
        "Segmentacao semantica pixel a pixel obrigatoria.",
        "Somente regressao.",
        "Apenas cluster.",
      ),
      "Cenas globais usam rotulos de imagem inteira.",
    ],
    [
      "Deteccao de anomalias em imagens industriais (rachadura) sugere:",
      0,
      opts(
        "Modelos supervisionados com defeitos rotulados ou nao supervisionados com baselines.",
        "Somente SMTP.",
        "Apenas DNS.",
        "Somente backup.",
      ),
      "Visao industrial combina rotulos e/ou deteccao de novidade.",
    ],
    [
      "Converter mesa em imagem para celulas em Excel costuma envolver:",
      0,
      opts(
        "OCR estruturado com deteccao de tabela.",
        "Somente DHCP.",
        "Apenas VPN.",
        "Somente FTP.",
      ),
      "Tabelas exigem segmentacao de grade e texto.",
    ],
    [
      "Embeddings de imagem para catalogo de e-commerce suportam:",
      0,
      opts(
        "Busca por similaridade de produto.",
        "Somente SMTP.",
        "Apenas log de firewall.",
        "Somente DHCP.",
      ),
      "RecSys visual usa similaridade entre itens.",
    ],
    [
      "Classificar se imagem medica precisa revisao urgente (triagem) exige:",
      0,
      opts(
        "Validacao clinica; IA e apoio, nao substituto automatico sem protocolo.",
        "Implantacao imediata sem supervisao.",
        "Eliminar medico.",
        "Somente entretenimento.",
      ),
      "Saude: uso assistivo com governanca.",
    ],
    [
      "Deteccao de objetos pequenos (insects, defects) pode precisar:",
      0,
      opts(
        "Imagens de alta resolucao e modelos com boa capacidade local.",
        "Somente OCR.",
        "Apenas agregacao SQL.",
        "Somente DNS.",
      ),
      "Objetos pequenos sao mais dificeis; dados e arquitetura importam.",
    ],
    [
      "Fusao de imagens multi-espectral em agricultura pode revelar:",
      0,
      opts(
        "Estresse hidrico ou nutrientes via indices de vegetacao.",
        "Somente texto.",
        "Apenas audio.",
        "Somente SMTP.",
      ),
      "Sensores multi-espectrais suportam agronomia de precisao.",
    ],
    [
      "Reidentificacao de pessoas entre cameras (cenario sensivel) exige:",
      0,
      opts(
        "Base legal, minimizacao e governanca forte.",
        "Implantacao livre sem restricao.",
        "Somente OCR.",
        "Eliminar privacidade.",
      ),
      "ReID e altamente sensivel; compliance e obrigatorio.",
    ],
    [
      "Classificar estilo artistico de pintura e:",
      0,
      opts(
        "Classificacao de dominio especifico com dataset rotulado.",
        "Somente DHCP.",
        "Apenas backup.",
        "Somente VPN.",
      ),
      "Estilos artisticos sao classes culturais em visao.",
    ],
    [
      "Deteccao de mascaras em entrada de predio (pandemia) exemplifica:",
      0,
      opts(
        "Classificacao binaria ou deteccao em fluxo de video.",
        "Somente OCR de livros.",
        "Apenas DNS.",
        "Somente FTP.",
      ),
      "Cenarios de conformidade usam visao em tempo real.",
    ],
  ];
  return mapPool("vision", rows.slice(0, 40));
}

/** NLP / fala — 40 itens */
export function poolNlp40() {
  const rows = [
    [
      "Identificar nomes de empresas e datas em contratos e tarefa de:",
      0,
      opts(
        "Reconhecimento de entidades nomeadas (NER).",
        ...D.nlp,
      ),
      "NER extrai entidades estruturadas do texto.",
    ],
    [
      "Determinar se avaliacao de produto e positiva ou negativa e:",
      0,
      opts(
        "Analise de sentimento.",
        "Somente OCR.",
        "Apenas cluster de imagens.",
        "Somente DNS.",
      ),
      "Sentimento classifica polaridade ou emocao.",
    ],
    [
      "Traduzir paragrafo do portugues para ingles e:",
      0,
      opts(
        "Traducao automatica de maquina.",
        "Somente deteccao de objetos.",
        "Apenas regressao.",
        "Somente DHCP.",
      ),
      "MT trabalha com pares de idiomas.",
    ],
    [
      "Responder a pergunta com base apenas em documento fornecido e:",
      0,
      opts(
        "QnA / resposta extrativa ou generativa fundamentada no contexto.",
        "Somente ordenacao de IP.",
        "Apenas backup.",
        "Somente SMTP.",
      ),
      "RAG e QnA usam contexto textual.",
    ],
    [
      "Resumir noticia longa em tres bullets e:",
      0,
      opts(
        "Sumarizacao de texto.",
        "Somente OCR de PDF escaneado.",
        "Apenas deteccao de rosto.",
        "Somente VPN.",
      ),
      "Sumarizacao comprime conteudo mantendo pontos principais.",
    ],
    [
      "Detectar idioma de tweet antes de pipeline e:",
      0,
      opts(
        "Identificacao de idioma.",
        "Somente segmentacao de imagem.",
        "Apenas DNS.",
        "Somente RAID.",
      ),
      "Language ID roteia modelo adequado.",
    ],
    [
      "Extrair palavras-chave de artigo cientifico e:",
      0,
      opts(
        "Extracao de frases-chave / key phrase.",
        "Somente DHCP.",
        "Apenas FTP.",
        "Somente ping.",
      ),
      "Key phrases destacam termos centrais.",
    ],
    [
      "Converter fala ao vivo em texto para legendas e:",
      0,
      opts(
        "Reconhecimento de fala continuo (speech-to-text).",
        "Somente OCR.",
        "Apenas deteccao de objeto.",
        "Somente SQL.",
      ),
      "STT transforma audio em texto.",
    ],
    [
      "Sintetizar voz natural para leitor de tela e:",
      0,
      opts(
        "Text-to-speech.",
        "Somente OCR.",
        "Apenas clustering.",
        "Somente DNS.",
      ),
      "TTS gera audio a partir de texto.",
    ],
    [
      "Classificar ticket de suporte em categorias predefinidas e:",
      0,
      opts(
        "Classificacao de texto.",
        "Somente regressao de precos.",
        "Apenas visao.",
        "Somente DHCP.",
      ),
      "Text classification rotula documentos inteiros.",
    ],
    [
      "Encontrar documentos similares por consulta e texto indexado usa:",
      0,
      opts(
        "Busca semantica ou BM25 + embeddings.",
        "Somente CRC de arquivo.",
        "Apenas ping.",
        "Somente SMTP.",
      ),
      "Busca combina lexical e semantica.",
    ],
    [
      "Corrigir gramatica e estilo em paragrafo e:",
      0,
      opts(
        "Geracao/edicao assistida por modelo de linguagem.",
        "Somente OCR.",
        "Apenas deteccao de anomalia em rede.",
        "Somente DNS.",
      ),
      "Correcao e tarefa de sequencia a sequencia.",
    ],
    [
      "Extrair relacao 'empresa X adquiriu empresa Y' e:",
      0,
      opts(
        "Extracao de relacoes / eventos em NLP avancado.",
        "Somente cluster sem rotulo.",
        "Apenas DHCP.",
        "Somente FTP.",
      ),
      "Relacoes ligam entidades com predicados.",
    ],
    [
      "Moderar comentarios toxicos antes de publicacao e:",
      0,
      opts(
        "Classificacao de texto com politicas de conteudo.",
        "Somente OCR.",
        "Apenas backup.",
        "Somente VPN.",
      ),
      "Moderacao usa classificadores de toxicidade.",
    ],
    [
      "Gerar pergunta de estudo a partir de paragrafo de livro e:",
      0,
      opts(
        "Geracao de texto condicionada ao conteudo.",
        "Somente DHCP.",
        "Apenas DNS.",
        "Somente RAID.",
      ),
      "QG cria perguntas para avaliar leitura.",
    ],
    [
      "Separar texto em tokens e frases e etapa de:",
      0,
      opts(
        "Pre-processamento (tokenizacao, sentence segmentation).",
        "Somente treino de GPU.",
        "Apenas SMTP.",
        "Somente ping.",
      ),
      "Tokenizacao e base para modelos de NLP.",
    ],
    [
      "Representar palavra como vetor denso (word embedding) permite:",
      0,
      opts(
        "Similaridade semantica e analogias aproximadas.",
        "Somente ordenar por ordem alfabetica.",
        "Eliminar significado.",
        "Substituir qualquer traducao humana sempre.",
      ),
      "Embeddings capturam semantica em espaco vetorial.",
    ],
    [
      "Modelo de linguagem grande usado com prompts e:",
      0,
      opts(
        "Abordagem prompt-based para tarefas diversas.",
        "Somente DHCP.",
        "Apenas OCR.",
        "Somente RAID.",
      ),
      "LLMs generalizam via instrucao e contexto.",
    ],
    [
      "Deteccao de idioma misto em documento bilinique e:",
      0,
      opts(
        "Segmentacao por trechos e ID de idioma por segmento.",
        "Somente visao.",
        "Apenas DNS.",
        "Somente SMTP.",
      ),
      "Textos reais podem misturar idiomas.",
    ],
    [
      "Extrair valor de fatura em texto livre e:",
      0,
      opts(
        "NER e possivelmente estruturacao de documento.",
        "Somente DHCP.",
        "Apenas ping.",
        "Somente FTP.",
      ),
      "Campos financeiros sao entidades especificas.",
    ],
    [
      "Classificar intencao do usuario em chat ('cancelar pedido') e:",
      0,
      opts(
        "Classificacao de intencao em NLP de dialogo.",
        "Somente OCR.",
        "Apenas deteccao de objeto.",
        "Somente SQL.",
      ),
      "Intencao direciona fluxo conversacional.",
    ],
    [
      "Traduzir fala diretamente para outro idioma (pipeline) combina:",
      0,
      opts(
        "STT, traducao e opcionalmente TTS.",
        "Somente OCR.",
        "Apenas DNS.",
        "Somente RAID.",
      ),
      "Sistemas de fala encadeiam modulos.",
    ],
    [
      "Detectar nome de medicamento em prontuario (dado sensivel) exige:",
      0,
      opts(
        "NER com governanca e minimizacao de PHI.",
        "Publicar prontuario na web.",
        "Eliminar criptografia.",
        "Somente DHCP.",
      ),
      "Saude: privacidade e compliance sao mandatorios.",
    ],
    [
      "Resumir thread longo de email para decisao rapida e:",
      0,
      opts(
        "Sumarizacao multi-documento ou longo contexto.",
        "Somente ping.",
        "Apenas DNS.",
        "Somente SMTP.",
      ),
      "Sumarios ajudam consumo de texto longo.",
    ],
    [
      "Extrair data limite de proposta em edital e:",
      0,
      opts(
        "NER temporal / extracao estruturada.",
        "Somente DHCP.",
        "Apenas RAID.",
        "Somente VPN.",
      ),
      "Datas sao entidades temporais comuns.",
    ],
    [
      "Gerar codigo a partir de descricao em linguagem natural e:",
      0,
      opts(
        "Geracao condicionada (pode exigir revisao humana).",
        "Somente OCR.",
        "Apenas DHCP.",
        "Somente FTP.",
      ),
      "Codigo sintetizado deve ser revisado e testado.",
    ],
    [
      "Detectar ironia ou sarcasmo em texto e:",
      0,
      opts(
        "Tarefa dificil de NLP; contexto e necessario.",
        "Trivial como sentimento simples sempre.",
        "Somente DNS.",
        "Somente ping.",
      ),
      "Sarcasmo exige modelo e contexto ricos.",
    ],
    [
      "Converter audio de reuniao em ata com identificacao de falantes e:",
      0,
      opts(
        "STT + diarizacao (quem falou quando).",
        "Somente OCR.",
        "Apenas DHCP.",
        "Somente RAID.",
      ),
      "Diarizacao separa falantes no tempo.",
    ],
    [
      "Extrair topico principal de colecao de noticias e:",
      0,
      opts(
        "Modelagem de topicos ou classificacao multi-rotulo.",
        "Somente DHCP.",
        "Apenas ping.",
        "Somente FTP.",
      ),
      "Topic modeling descobre temas latentes.",
    ],
    [
      "Preencher lacunas em frase (cloze) e exercicio de:",
      0,
      opts(
        "Compreensao de linguagem / modelo de linguagem.",
        "Somente OCR.",
        "Apenas DNS.",
        "Somente SMTP.",
      ),
      "Cloze testa coerencia e conhecimento linguistico.",
    ],
    [
      "Detectar idioma ofensivo sem bloquear criticas legitimas e:",
      0,
      opts(
        "Desafio de nuance; requer dados rotulados com contexto.",
        "Problema resolvido apenas com lista de palvoes.",
        "Somente DHCP.",
        "Somente RAID.",
      ),
      "Moderacao precisa reduzir falsos positivos.",
    ],
    [
      "Vectorizar documento inteiro para busca semantica usa:",
      0,
      opts(
        "Embeddings de documento ou pooling de tokens.",
        "Somente CRC.",
        "Apenas ping.",
        "Somente SMTP.",
      ),
      "Embeddings representam texto longo em vetor.",
    ],
    [
      "Extrair intencao e entidade de 'marcar reuniao amanha as 15h' e:",
      0,
      opts(
        "Parsing semantico para agendamento (intencao + tempo).",
        "Somente OCR.",
        "Apenas DNS.",
        "Somente RAID.",
      ),
      "Dialogo estrutura intencao e slots.",
    ],
    [
      "Traduzir com preservacao de genero gramatical onde aplicavel e:",
      0,
      opts(
        "Desafio linguistico para MT; modelos contextuais ajudam.",
        "Somente DHCP.",
        "Apenas ping.",
        "Somente FTP.",
      ),
      "Traducao vai alem de substituicao lexical.",
    ],
    [
      "Classificar spam vs nao spam em email e:",
      0,
      opts(
        "Classificacao binaria de texto classica.",
        "Somente OCR.",
        "Apenas deteccao de objeto.",
        "Somente VPN.",
      ),
      "Spam filtering e benchmark de classificacao.",
    ],
    [
      "Extrair lista de competencias de curriculo em PDF texto e:",
      0,
      opts(
        "NER + possivel segmentacao de secao.",
        "Somente DHCP.",
        "Apenas RAID.",
        "Somente ping.",
      ),
      "CV estruturado mistura layout e texto.",
    ],
    [
      "Gerar legenda sincronizada com audio (closed captions) combina:",
      0,
      opts(
        "STT com alinhamento temporal.",
        "Somente OCR.",
        "Apenas DNS.",
        "Somente SMTP.",
      ),
      "Legendas precisam timestamps.",
    ],
    [
      "Detectar emocao basica em texto curto e:",
      0,
      opts(
        "Classificacao de emocao / tom.",
        "Somente DHCP.",
        "Apenas FTP.",
        "Somente ping.",
      ),
      "Emocao e rotulo alternativo a sentimento.",
    ],
    [
      "Responder pergunta sobre manual tecnico exige:",
      0,
      opts(
        "Modelo com contexto longo ou recuperacao de trechos (RAG).",
        "Somente DHCP.",
        "Apenas DNS.",
        "Somente RAID.",
      ),
      "RAG reduz alucinacao ao ancorar em fontes.",
    ],
    [
      "Converter comandos de voz para acoes em app e:",
      0,
      opts(
        "STT + interpretacao de intencao / comando.",
        "Somente OCR.",
        "Apenas deteccao de objeto.",
        "Somente SQL.",
      ),
      "Assistentes de voz encadeiam reconhecimento e NLU.",
    ],
    [
      "Avaliar fluencia de ensaio em lingua estrangeira e:",
      0,
      opts(
        "Tarefa de scoring linguistico com criterios definidos.",
        "Somente DHCP.",
        "Apenas ping.",
        "Somente FTP.",
      ),
      "Avaliacao automatica de escrita usa rubricas ou modelos.",
    ],
    [
      "Detectar plágio aproximado entre trabalhos e:",
      0,
      opts(
        "Similaridade textual e hashing / embeddings.",
        "Somente OCR.",
        "Apenas DNS.",
        "Somente SMTP.",
      ),
      "Plágio compara documentos inteiros.",
    ],
    [
      "Extrair hashtags e mencoes de post social e:",
      0,
      opts(
        "NER / regras especificas para texto social.",
        "Somente DHCP.",
        "Apenas RAID.",
        "Somente ping.",
      ),
      "Texto social tem padroes proprios.",
    ],
  ];
  return mapPool("nlp", rows.slice(0, 40));
}

/** Conversacional — 35 itens */
export function poolConversational35() {
  const rows = [
    [
      "Em compreensao de linguagem natural, **intencao** representa:",
      0,
      opts(
        "O objetivo principal do usuario na mensagem.",
        "Um endereco IP.",
        "A cor do bot no canal.",
        "Somente o horario do servidor.",
      ),
      "Intencao classifica o que o usuario quer realizar.",
    ],
    [
      "**Entidades** em um utterance capturam:",
      0,
      opts(
        "Detalhes estruturados como datas, locais ou nomes de produto.",
        "Somente o tom emocional global.",
        "Apenas o tamanho da mensagem.",
        "Somente latencia de rede.",
      ),
      "Entidades preenchem slots do dialogo.",
    ],
    [
      "Um **bot** em multiplos canais (web, Teams) usa normalmente:",
      0,
      opts(
        "Camada de adaptacao do canal + nucleo de dialogo.",
        "Somente SMTP.",
        "Apenas DHCP.",
        "Somente RAID.",
      ),
      "Conectores isolam canal da logica conversacional.",
    ],
    [
      "Base de **QnA** a partir de FAQ e util para:",
      0,
      opts(
        "Responder perguntas frequentes com pares curados.",
        "Treinar redes de visao.",
        "Somente DNS.",
        "Somente backup.",
      ),
      "QnA mapeia perguntas a respostas documentadas.",
    ],
    [
      "Fluxo **multiturmo** mantem contexto com:",
      0,
      opts(
        "Estado de dialogo e historico da conversa.",
        "Somente um turno sem memoria.",
        "Apenas OCR.",
        "Somente ping.",
      ),
      "Dialogo precisa memoria para coerencia.",
    ],
    [
      "Confirmacao explicita antes de acao destrutiva e boa pratica de:",
      0,
      opts(
        "Seguranca e UX conversacional.",
        "Eliminar qualquer pergunta ao usuario.",
        "Somente DHCP.",
        "Somente FTP.",
      ),
      "Confirmacoes evitam erros irreversiveis.",
    ],
    [
      "Fallback quando intencao nao reconhecida deve:",
      0,
      opts(
        "Pedir esclarecimento ou oferecer menu de ajuda.",
        "Encerrar silenciosamente sempre.",
        "Reiniciar servidor.",
        "Apagar historico sem aviso.",
      ),
      "Fallback gracioso melhora retencao.",
    ],
    [
      "Integrar bot com backend de pedidos exige:",
      0,
      opts(
        "APIs seguras e autenticacao do usuario.",
        "Expor chaves no cliente.",
        "Somente DNS.",
        "Somente SMTP.",
      ),
      "Integracao precisa seguranca e identidade.",
    ],
    [
      "Testar dialogo com variacoes linguisticas reduz:",
      0,
      opts(
        "Fragilidade a diferentes formas de pedir a mesma intencao.",
        "Somente custo de GPU.",
        "Apenas DHCP.",
        "Somente RAID.",
      ),
      "Utterances variados melhoram robustez.",
    ],
    [
      "Personalidade consistente do bot ajuda:",
      0,
      opts(
        "Expectativa do usuario e confianca na marca.",
        "Confundir proposito do servico.",
        "Somente DHCP.",
        "Somente ping.",
      ),
      "Tom e persona fazem parte do design conversacional.",
    ],
    [
      "Registrar **telemetria** de conversa (sem dados sensiveis) ajuda a:",
      0,
      opts(
        "Medir abandono e lacunas de compreensao.",
        "Eliminar privacidade sempre.",
        "Publicar chats integralmente.",
        "Somente SMTP.",
      ),
      "Metricas guiam melhoria continua.",
    ],
    [
      "Handoff para atendente humano e indicado quando:",
      0,
      opts(
        "Baixa confianca, pedido explicito ou caso sensivel.",
        "Sempre no primeiro turno.",
        "Nunca.",
        "Somente DHCP.",
      ),
      "Escalonamento humano cobre limites do bot.",
    ],
    [
      "Cartoes adaptativos (rich cards) melhoram:",
      0,
      opts(
        "Clareza de opcoes e acoes no canal que suporta.",
        "Somente audio.",
        "Apenas DNS.",
        "Somente RAID.",
      ),
      "UI rica complementa texto.",
    ],
    [
      "Deteccao de idioma no primeiro turno permite:",
      0,
      opts(
        "Carregar modelo de NLU e respostas no idioma correto.",
        "Ignorar preferencia do usuario.",
        "Somente DHCP.",
        "Somente ping.",
      ),
      "Multilingue comeca pela identificacao de idioma.",
    ],
    [
      "Padroes de **small talk** devem:",
      0,
      opts(
        "Ser limitados para nao competir com o proposito principal.",
        "Dominar toda a conversa indefinidamente.",
        "Somente DHCP.",
        "Somente FTP.",
      ),
      "Small talk util mas secundario.",
    ],
    [
      "Autenticacao antes de dados da conta protege:",
      0,
      opts(
        "Privacidade e conformidade.",
        "Publicar dados sem login.",
        "Somente DNS.",
        "Somente SMTP.",
      ),
      "Bots com dados pessoais exigem auth.",
    ],
    [
      "Versionar fluxos de dialogo em repositorio permite:",
      0,
      opts(
        "Revisao, rollback e testes antes de publicar.",
        "Editar so em producao sem controle.",
        "Somente DHCP.",
        "Somente RAID.",
      ),
      "DevOps conversacional reduz incidentes.",
    ],
    [
      "Medir **taxa de resolucao** sem handoff indica:",
      0,
      opts(
        "Efetividade do self-service automatizado.",
        "Somente latencia.",
        "Apenas DHCP.",
        "Somente ping.",
      ),
      "Deflection e KPI comum em bots.",
    ],
    [
      "Evitar linguagem excludente e discriminatoria no bot e:",
      0,
      opts(
        "Parte de inclusao e marca.",
        "Irrelevante.",
        "Somente DHCP.",
        "Somente FTP.",
      ),
      "Texto do bot deve seguir diretrizes inclusivas.",
    ],
    [
      "Integrar **LUIS/CLU** tipicamente significa:",
      0,
      opts(
        "Publicar modelo de intencoes e entidades e chamar endpoint de predicao.",
        "Somente instalar antivirus.",
        "Apenas DHCP.",
        "Somente RAID.",
      ),
      "Servicos de NLU expoem endpoint de scoring de texto.",
    ],
    [
      "Um **turn** na conversa contem:",
      0,
      opts(
        "Mensagem do usuario e resposta do bot em sequencia.",
        "Somente logs de firewall.",
        "Apenas DNS.",
        "Somente SMTP.",
      ),
      "Turn estrutura interacao dialogica.",
    ],
    [
      "Definir **escopo** do bot evita:",
      0,
      opts(
        "Expectativa de resolver tarefas fora do dominio.",
        "Qualquer limite util.",
        "Somente DHCP.",
        "Somente ping.",
      ),
      "Escopo claro reduz frustracao.",
    ],
    [
      "Padronizar formato de data/hora nas entidades evita:",
      0,
      opts(
        "Ambiguidade em agendamentos.",
        "Qualquer integracao.",
        "Somente DHCP.",
        "Somente FTP.",
      ),
      "Resolver entidades temporais e critico.",
    ],
    [
      "Simular conversas adversariais em teste ajuda a:",
      0,
      opts(
        "Encontrar falhas de seguranca e injecao de prompt (onde aplicavel).",
        "Eliminar testes.",
        "Somente DHCP.",
        "Somente RAID.",
      ),
      "Testes adversariais fortalecem robustez.",
    ],
    [
      "Em voz, **barge-in** permite:",
      0,
      opts(
        "Usuario interromper prompt do sistema.",
        "Somente texto.",
        "Apenas DHCP.",
        "Somente ping.",
      ),
      "IVR moderno suporta interrupcao.",
    ],
    [
      "Desambiguacao quando duas intencoes tem score parecido:",
      0,
      opts(
        "Perguntar ao usuario qual interpretacao seguir.",
        "Escolher aleatoriamente.",
        "Somente DHCP.",
        "Somente FTP.",
      ),
      "Desambiguacao melhora precisao.",
    ],
    [
      "Cumprimento normativo (LGPD/GDPR) em bot exige:",
      0,
      opts(
        "Informar tratamento de dados e obter consentimento quando necessario.",
        "Coletar tudo sem aviso.",
        "Somente DHCP.",
        "Somente RAID.",
      ),
      "Privacidade e mandatoria em dados pessoais.",
    ],
    [
      "Usar **templates** de resposta com slots preenchidos ajuda:",
      0,
      opts(
        "Consistencia e localizacao.",
        "Gerar texto totalmente aleatorio sem revisao.",
        "Somente DHCP.",
        "Somente ping.",
      ),
      "Templates estruturam linguagem natural controlada.",
    ],
    [
      "Monitorar **satisfacao** pos-atendimento (CSAT) em bot:",
      0,
      opts(
        "Fornece feedback qualitativo para melhoria.",
        "Substitui toda metrica tecnica.",
        "Somente DHCP.",
        "Somente FTP.",
      ),
      "CSAT complementa metricas automaticas.",
    ],
    [
      "Em canais assincronos (email), diferente de chat sincrono:",
      0,
      opts(
        "Expectativa de tempo de resposta e formato podem diferir.",
        "Sao identicos em todos os aspectos.",
        "Somente DHCP.",
        "Somente RAID.",
      ),
      "Omnichannel exige adaptacao por canal.",
    ],
    [
      "Definir **persona** do bot (formal vs informal) deve alinhar a:",
      0,
      opts(
        "Publico e marca.",
        "Preferencia exclusiva do desenvolvedor sem revisao.",
        "Somente DHCP.",
        "Somente ping.",
      ),
      "Persona consistente com marca aumenta confianca.",
    ],
    [
      "Registrar **intencoes de fallback** negativas melhora:",
      0,
      opts(
        "Treino ao identificar lacunas de compreensao.",
        "Eliminar necessidade de dados.",
        "Somente DHCP.",
        "Somente FTP.",
      ),
      "Utterances negativas refinam o classificador.",
    ],
    [
      "Em Bot Framework, **adapter de canal** traduz:",
      0,
      opts(
        "Mensagens genericas do bot para formato especifico do canal.",
        "Somente DNS.",
        "Apenas DHCP.",
        "Somente RAID.",
      ),
      "Adaptadores isolam particularidades de Teams, Slack, etc.",
    ],
    [
      "Evitar **loops infinitos** de esclarecimento exige:",
      0,
      opts(
        "Limite de repeticoes e saida para humano.",
        "Repetir a mesma pergunta para sempre.",
        "Somente DHCP.",
        "Somente ping.",
      ),
      "Limites evitam experiencia frustrante.",
    ],
    [
      "Testes A/B em mensagens do bot podem medir:",
      0,
      opts(
        "Qual formulacao melhora conversao ou compreensao.",
        "Somente largura de banda.",
        "Apenas DHCP.",
        "Somente FTP.",
      ),
      "Experimentacao melhora copy conversacional.",
    ],
    [
      "Integrar **Knowledge base** com busca semantica melhora:",
      0,
      opts(
        "Respostas fundamentadas em documentos atualizados.",
        "Eliminar revisao humana de conteudo.",
        "Somente DHCP.",
        "Somente RAID.",
      ),
      "Base de conhecimento alimenta respostas factuais.",
    ],
  ];
  return mapPool("conversational", rows.slice(0, 35));
}

/** Extensao: +50 itens (10 por dominio) — revisao pedagogica alinhada ao AI-900 */
export function poolExtension50() {
  const rows = [
    // workload (10)
    [
      "Executar inferencia proximo a fonte de dados (edge) costuma visar principalmente:",
      0,
      opts(
        "Reduzir latencia e trafego de rede em cenarios adequados.",
        "Eliminar qualquer modelo na nuvem.",
        "Substituir criptografia.",
        "Impedir treino supervisionado.",
      ),
      "Edge inference aproxima computacao do local onde os dados surgem.",
    ],
    [
      "Aprendizado **federado** (conceito) enfatiza tipicamente:",
      0,
      opts(
        "Treinar sem centralizar dados brutos de todos os participantes.",
        "Eliminar agregacao de modelos.",
        "Substituir criptografia por texto puro.",
        "Impedir validacao.",
      ),
      "Federado busca colaborar no modelo preservando dados locais.",
    ],
    [
      "Um **model card** documenta principalmente:",
      0,
      opts(
        "Contexto, dados, limitacoes e metricas do modelo para transparencia.",
        "Somente a senha do administrador.",
        "Apenas o tamanho do logo.",
        "Somente endereco IP fixo.",
      ),
      "Model cards comunicam escopo e riscos do artefato.",
    ],
    [
      "Dados **sinteticos** podem ajudar quando:",
      0,
      opts(
        "Ha escassez de exemplos e o processo de geracao e validado.",
        "Substituem integralmente dados reais sem revisao.",
        "Eliminam necessidade de privacidade.",
        "Garantem paridade perfeita com o mundo real sempre.",
      ),
      "Sintetico complementa treino mas exige validacao de fidelidade.",
    ],
    [
      "Rotulagem **assistida por modelo** com revisao humana combina:",
      0,
      opts(
        "Eficiencia da sugestao automatica com controle de qualidade humana.",
        "Eliminacao total de humanos.",
        "Somente cluster sem rotulos.",
        "Apenas dados sinteticos.",
      ),
      "Human-in-the-loop melhora custo e qualidade de rotulos.",
    ],
    [
      "**Transfer learning** aproveita tipicamente:",
      0,
      opts(
        "Representacoes aprendidas em tarefa grande para tarefa relacionada com menos dados.",
        "Copiar pesos sem treino fino nunca.",
        "Eliminar validacao.",
        "Somente dados nao rotulados.",
      ),
      "Transferencia reduz dados necessarios em dominios proximos.",
    ],
    [
      "Aprendizado **semi-supervisionado** mistura:",
      0,
      opts(
        "Exemplos rotulados e nao rotulados na mesma rotina de treino.",
        "Somente rotulos falsos.",
        "Apenas reforco puro.",
        "Somente series temporais.",
      ),
      "Semi-supervisionado usa rotulos parciais para guiar o restante.",
    ],
    [
      "**Ensemble** de modelos busca frequentemente:",
      0,
      opts(
        "Combinar preditores para reduzir variancia ou erro.",
        "Sempre aumentar overfitting.",
        "Eliminar conjunto de validacao.",
        "Substituir metricas.",
      ),
      "Ensembles mediam erros de modelos diversos.",
    ],
    [
      "Em classificacao binaria, aumentar **recall** costuma implicar:",
      0,
      opts(
        "Trade-off com precisao — mais positivos detectados, possivelmente mais falsos alarmes.",
        "Eliminar matriz de confusao.",
        "Garantir precisao 100%.",
        "Substituir limiar por aleatorio.",
      ),
      "Recall e precisao competem conforme o limiar.",
    ],
    [
      "A **matriz de confusao** ajuda principalmente a:",
      0,
      opts(
        "Ver tipos de erro (VP, FP, VN, FN) por classe.",
        "Substituir dados de treino.",
        "Eliminar necessidade de teste.",
        "Calcular apenas media de idade.",
      ),
      "Matriz de confusao destrinha erros por categoria.",
    ],
    // azure_ml (10)
    [
      "Separar recursos de **treino** e **inferencia** costuma permitir:",
      0,
      opts(
        "Otimizar custo e escala de cada fase separadamente.",
        "Usar o mesmo tamanho de VM sempre sem analise.",
        "Eliminar endpoints.",
        "Impedir registro de modelo.",
      ),
      "Treino pesado e inferencia frequente tem perfis diferentes.",
    ],
    [
      "Empacotar dependencias do **script de scoring** em container visa:",
      0,
      opts(
        "Reproducir o ambiente de inferencia entre ambientes.",
        "Eliminar testes.",
        "Substituir modelo por DNS.",
        "Impedir HTTPS.",
      ),
      "Containers fixam versoes de bibliotecas do scoring.",
    ],
    [
      "Proteger **endpoint** de scoring com autenticacao visa:",
      0,
      opts(
        "Restringir chamadas a clientes autorizados.",
        "Publicar chave em repositorio publico.",
        "Eliminar HTTPS.",
        "Desativar logs.",
      ),
      "Endpoints expostos precisam controles de acesso.",
    ],
    [
      "Implantar nova versao em **slot de staging** antes de producao permite:",
      0,
      opts(
        "Testar comportamento com trafego controlado ou validacao.",
        "Eliminar rollback.",
        "Substituir monitoramento.",
        "Ignorar metricas.",
      ),
      "Staging reduz risco de regressao em implantacao.",
    ],
    [
      "**Pontuacao em lote** (batch scoring) e adequada quando:",
      0,
      opts(
        "Ha arquivo grande acumulado e o processamento pode ser assincrono.",
        "Cada linha precisa latencia minima garantida em milissegundos.",
        "Nao ha armazenamento.",
        "O modelo nao pode ser versionado.",
      ),
      "Batch prioriza volume sobre latencia por registro.",
    ],
    [
      "Monitorar **latencia p95** do endpoint ajuda a:",
      0,
      opts(
        "Detectar degradacao perceptivel para parte dos usuarios.",
        "Eliminar SLAs internos.",
        "Substituir testes de carga.",
        "Impedir autoscaling.",
      ),
      "Percentis capturam cauda da distribuicao de latencia.",
    ],
    [
      "Controle de acesso por **papel** no workspace de ML restringe:",
      0,
      opts(
        "Quem pode criar computacao, implantar ou ver dados.",
        "Somente cor do tema.",
        "Apenas DNS publico.",
        "Somente horario de backup.",
      ),
      "RBAC separa leitura, contribuicao e administracao.",
    ],
    [
      "Preparar dados grandes com **Spark** (quando aplicavel) costuma ocorrer:",
      0,
      opts(
        "Antes do treino, para agregacoes e limpeza em volume.",
        "Somente apos implantacao do endpoint.",
        "Sem qualquer pipeline.",
        "Exclusivamente em disquete.",
      ),
      "Spark e comum em preparacao de dados massivos.",
    ],
    [
      "Integrar **Git** ao fluxo de ML facilita:",
      0,
      opts(
        "Rastrear mudancas em codigo de treino e pipelines.",
        "Eliminar revisao de codigo.",
        "Substituir dados.",
        "Impedir branches.",
      ),
      "Controle de versao aplica-se a codigo e definicoes de pipeline.",
    ],
    [
      "Painel de **IA responsavel** em ferramentas de ML costuma destacar:",
      0,
      opts(
        "Metricas de equidade e interpretabilidade quando disponiveis.",
        "Somente faturamento.",
        "Apenas cor de grafico.",
        "Eliminar necessidade de revisao humana.",
      ),
      "Ferramentas de ML podem agregar sinais de RAI; revisao humana continua.",
    ],
    // vision (10)
    [
      "Rotacionar e espelhar imagens no treino e forma de:",
      0,
      opts(
        "Aumentar diversidade artificial (augmentation) para generalizar.",
        "Eliminar validacao.",
        "Substituir rotulos.",
        "Reduzir resolucao obrigatoriamente a 1 pixel.",
      ),
      "Augmentation reduz overfitting a orientacao.",
    ],
    [
      "Extrair **quadros-chave** de video para analise estatica e:",
      0,
      opts(
        "Amostrar frames representativos em vez de processar todos os pixels em todo instante.",
        "Substituir qualquer analise temporal.",
        "Eliminar codec.",
        "Impedir OCR.",
      ),
      "Keyframe reduz custo de visao em video longo.",
    ],
    [
      "Busca visual por **similaridade** em catalogo relaciona-se a:",
      0,
      opts(
        "Embeddings e vizinhos mais proximos no espaco vetorial.",
        "Somente ordenacao alfabetica de SKU.",
        "Apenas CRC32.",
        "Somente DHCP.",
      ),
      "Similaridade visual usa vetores de imagem.",
    ],
    [
      "Detectar **desfoque** excessivo em foto de documento ajuda a:",
      0,
      opts(
        "Solicitar nova captura antes de OCR.",
        "Substituir OCR por adivinhacao.",
        "Eliminar privacidade.",
        "Somente compactar mais.",
      ),
      "Qualidade de imagem afeta taxa de leitura.",
    ],
    [
      "Modelos de visao costumam operar em tensores que representam:",
      0,
      opts(
        "Pixels e canais (ex.: RGB) em grades.",
        "Somente strings SQL.",
        "Apenas numeros de telefone.",
        "Somente arquivos .wav.",
      ),
      "Imagens viram tensores multidimensionais.",
    ],
    [
      "Caixas **delimitadoras** em deteccao de objetos fornecem tipicamente:",
      0,
      opts(
        "Coordenadas aproximadas da regiao do objeto.",
        "Somente cor dominante global.",
        "Apenas um rotulo sem posicao.",
        "Texto OCR completo sempre.",
      ),
      "Bounding boxes localizam instancias na imagem.",
    ],
    [
      "**Sumarizacao de video** (alto nivel) pode combinar:",
      0,
      opts(
        "Selecao de cenas-chave e geracao de texto descritivo.",
        "Somente DNS.",
        "Apenas ping.",
        "Somente SMTP.",
      ),
      "Resumo de video cruza visao e linguagem.",
    ],
    [
      "Entender **layout** de formulario difere de OCR puro porque:",
      0,
      opts(
        "Relaciona blocos, tabelas e rotulos estruturalmente.",
        "Le apenas caracteres sem estrutura.",
        "Elimina tabelas.",
        "Somente binariza imagem.",
      ),
      "Document intelligence considera estrutura além de texto solto.",
    ],
    [
      "Exportar modelo de visao para **ONNX** pode facilitar:",
      0,
      opts(
        "Implantacao em runtimes otimizados e portaveis.",
        "Eliminar testes.",
        "Substituir metricas.",
        "Impedir GPU.",
      ),
      "ONNX interoper entre frameworks de inferencia.",
    ],
    [
      "Jobs de visao em **lote** vs **fluxo** diferem principalmente em:",
      0,
      opts(
        "Latencia esperada e modo de entrada (arquivo vs stream).",
        "Cor do servidor.",
        "Somente DNS.",
        "Eliminacao de modelo.",
      ),
      "Stream prioriza baixa latencia; batch prioriza throughput.",
    ],
    [
      "Segmentar **instancia** (mascara por objeto) difere de deteccao porque:",
      0,
      opts(
        "Define contorno fino do objeto, nao so caixa.",
        "Nao usa rede neural.",
        "So funciona em audio.",
        "Elimina classes.",
      ),
      "Instance segmentation e mais fina que caixa.",
    ],
    // nlp (10)
    [
      "**Tokenizacao** sublexical (subpalavras) ajuda a:",
      0,
      opts(
        "Lidar com vocabulario aberto e palavras raras.",
        "Eliminar embeddings.",
        "Somente numeros.",
        "Impedir traducao.",
      ),
      "BPE e similares reduzem UNK em textos diversos.",
    ],
    [
      "Metrica **BLEU** e mais associada a:",
      0,
      opts(
        "Avaliacao automatica de traducao com referencias.",
        "Clustering de imagens.",
        "Somente regressao de precos.",
        "Apenas DNS.",
      ),
      "BLEU compara n-grams com traducoes de referencia.",
    ],
    [
      "**Entity linking** difere de NER porque:",
      0,
      opts(
        "Associa mencao a identidade canonica em base de conhecimento.",
        "So detecta se ha entidade sem desambiguacao.",
        "Elimina texto.",
        "Somente sentimento.",
      ),
      "Linking resolve qual entidade do mundo e referida.",
    ],
    [
      "**Classificacao de documento** difere de classificacao de frase porque:",
      0,
      opts(
        "Rotula o texto inteiro (ex.: tipo de contrato) em vez de cada sentenca isolada.",
        "Usa apenas um token.",
        "Elimina embeddings.",
        "Somente audio.",
      ),
      "Document classification agrega evidencia global.",
    ],
    [
      "**Busca semantica** difere de palavra-chave pura porque:",
      0,
      opts(
        "Usa significado aproximado via vetores ou modelos de linguagem.",
        "So coincide literal.",
        "Elimina indice.",
        "Somente ordena por data.",
      ),
      "Semantica captura sinonimia e paráfrase.",
    ],
    [
      "**Engenharia de prompt** em modelos generativos visa:",
      0,
      opts(
        "Formular instrucoes e contexto para obter saidas uteis e seguras.",
        "Eliminar qualquer revisao humana sempre.",
        "Substituir dados de treino.",
        "Impedir temperatura variavel.",
      ),
      "Prompts guiam comportamento sem novo treino pesado.",
    ],
    [
      "**Janela de contexto** limita:",
      0,
      opts(
        "Quanto texto o modelo pode considerar de uma vez.",
        "Somente velocidade de CPU.",
        "Apenas DNS.",
        "Eliminacao de embeddings.",
      ),
      "Modelos de linguagem tem comprimento maximo de entrada.",
    ],
    [
      "**Redacao** de dados (PII) em logs de NLP ajuda a:",
      0,
      opts(
        "Reduzir exposicao de informacao sensivel em texto.",
        "Publicar CPF em claro.",
        "Eliminar conformidade.",
        "Substituir criptografia.",
      ),
      "Redaction mascara campos sensiveis.",
    ],
    [
      "Resumir **multiplos documentos** e mais desafiador que um porque:",
      0,
      opts(
        "Exige coerencia global e possivel remocao de redundancia entre fontes.",
        "Usa sempre um unico paragrafo.",
        "Elimina necessidade de alinhamento factual.",
        "Somente OCR.",
      ),
      "Multi-doc exige fusao e verificacao cruzada.",
    ],
    [
      "Detectar **code-switching** (dois idiomas na mesma frase) requer:",
      0,
      opts(
        "Modelos ou regras que identifiquem segmentos por idioma.",
        "Somente um idioma global.",
        "Eliminar Unicode.",
        "Apenas numeros.",
      ),
      "Texto bilinque exige segmentacao linguistica.",
    ],
    // conversational (10)
    [
      "Mensagens **proativas** do bot sao aquelas que:",
      0,
      opts(
        "O sistema envia sem entrada imediata do usuario (ex.: lembrete).",
        "Somente respondem a ping.",
        "Eliminam dialogo.",
        "Somente SMTP.",
      ),
      "Proatividade inicia conteudo pelo sistema dentro de politicas.",
    ],
    [
      "Tratar **interrupcoes** no meio de um fluxo guiado exige:",
      0,
      opts(
        "Salvar estado e permitir retorno ou mudanca de intencao.",
        "Ignorar nova intencao.",
        "Reiniciar servidor a cada turno.",
        "Eliminar historico.",
      ),
      "Dialogos reais mudam de assunto; estado importa.",
    ],
    [
      "Fluxo **OAuth** em bot costuma servir para:",
      0,
      opts(
        "Obter token do usuario para APIs com consentimento.",
        "Armazenar senha em cookie sem criptografia.",
        "Eliminar HTTPS.",
        "Somente DNS.",
      ),
      "OAuth delega autenticacao a provedor confiavel.",
    ],
    [
      "O esquema de **atividade** (activity) em bots descreve:",
      0,
      opts(
        "Tipo de mensagem, texto, anexos e metadados do turno.",
        "Somente IP do roteador.",
        "Apenas temperatura CPU.",
        "Somente DHCP.",
      ),
      "Activities estruturam o que canais trocam.",
    ],
    [
      "**Middleware** no pipeline do bot permite:",
      0,
      opts(
        "Interceptar mensagens para logging, seguranca ou locale.",
        "Eliminar handlers.",
        "Substituir canal.",
        "Impedir qualquer resposta.",
      ),
      "Middleware encadeia pre e pos-processamento.",
    ],
    [
      "Estado de **usuario** vs **conversa** separa tipicamente:",
      0,
      opts(
        "Preferencias de perfil versus contexto do dialogo atual.",
        "Somente IP.",
        "Eliminar persistencia.",
        "Apenas DNS.",
      ),
      "User state persiste entre conversas; conversation state e local ao fluxo.",
    ],
    [
      "Cartoes **adaptativos** em canais suportados servem para:",
      0,
      opts(
        "Apresentar botoes, imagens e entradas ricas de forma estruturada.",
        "Somente texto sem formatacao.",
        "Eliminar acessibilidade.",
        "Apenas ICMP.",
      ),
      "Adaptive Cards melhoram UX em plataformas compatíveis.",
    ],
    [
      "Integrar **voz** ao bot costuma encadear:",
      0,
      opts(
        "STT, NLU/dialogo e opcionalmente TTS na resposta.",
        "Somente OCR.",
        "Apenas SQL.",
        "Somente FTP.",
      ),
      "Bots de voz combinam modulos de fala e linguagem.",
    ],
    [
      "Publicar bot em **multiplos canais** exige:",
      0,
      opts(
        "Adaptar formato de mensagem as capacidades de cada canal.",
        "Um unico formato identico em todos sem excecao.",
        "Eliminar testes.",
        "Somente email.",
      ),
      "Canais tem capacidades diferentes (rich text, botoes).",
    ],
    [
      "Registrar **telemetria** de falhas de compreensao (sem PII) ajuda a:",
      0,
      opts(
        "Priorizar novos utterances para treino do classificador.",
        "Publicar conversas integralmente.",
        "Eliminar LGPD.",
        "Somente DHCP.",
      ),
      "Utterances nao entendidos guiam melhoria do modelo de NLU.",
    ],
  ];
  const trimmed = rows.slice(0, 50);
  return trimmed.map((r, i) => ({
    domain:
      i < 10
        ? "workload"
        : i < 20
          ? "azure_ml"
          : i < 30
            ? "vision"
            : i < 40
              ? "nlp"
              : "conversational",
    stem: r[0],
    correctIndex: r[1],
    options: r[2],
    explanation: r[3],
  }));
}
