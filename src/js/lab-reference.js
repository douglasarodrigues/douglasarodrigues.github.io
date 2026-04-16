/* ==========================================================================
   LAB-REFERENCE.JS - Dados de Referência Rápida do Mainframe Lab
   File-Status COBOL, Abend Codes z/OS, SQLCODE DB2, EIBRESP CICS, JCL Tips
   ========================================================================== */

// eslint-disable-next-line no-unused-vars
const LAB_REFERENCE = {

  /* ========================================================================
     CATEGORY 1 — FILE-STATUS COBOL (28 entries)
     ======================================================================== */
  fileStatus: [
    {
      code: "00",
      meaning: "Operação bem-sucedida",
      action: "Nenhuma ação necessária",
      severity: "success",
      diagnostic: {
        causes: [
          { title: "Operação normal", desc: "O comando de I/O (OPEN, READ, WRITE, CLOSE) foi executado sem erros." }
        ],
        resolution: ["Prossiga com o fluxo normal do programa."],
        tip: "Sempre verifique FILE STATUS após cada operação de I/O, mesmo quando espera sucesso."
      }
    },
    {
      code: "02",
      meaning: "Chave duplicada permitida (DUPLICATES)",
      action: "Verificar se duplicatas são esperadas no design",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "KSDS com DUPLICATES", desc: "Um READ ou WRITE encontrou registro com chave alternada duplicada em um arquivo definido com ALTERNATE KEY WITH DUPLICATES." },
          { title: "READ genérico", desc: "O registro lido possui chave alternada que existe em mais de um registro." }
        ],
        resolution: [
          "Se duplicatas são esperadas, trate normalmente no fluxo.",
          "Se não são esperadas, revise a definição do ALTERNATE KEY no IDCAMS.",
          "Use READ NEXT para percorrer todos os registros com a mesma chave alternada."
        ],
        tip: "FS 02 em WRITE indica que a chave alternada já existe — o registro foi gravado, mas atenção à integridade."
      }
    },
    {
      code: "04",
      meaning: "Registro lido com tamanho diferente do esperado",
      action: "Verificar RECORD LENGTH na FD e no VSAM DEFINE",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "Tamanho variável", desc: "O registro lido tem comprimento diferente do definido na FD do programa COBOL." },
          { title: "Definição inconsistente", desc: "O RECORDSIZE no DEFINE CLUSTER não corresponde ao RECORD CONTAINS da FD." }
        ],
        resolution: [
          "Confira o RECORD CONTAINS na FD — especifique RECORD CONTAINS min TO max para registros variáveis.",
          "Verifique o RECORDSIZE no DEFINE CLUSTER VSAM.",
          "Alinhe a definição entre o programa COBOL e a definição VSAM."
        ],
        tip: "Comum em arquivos de registro variável. Use RECORD CONTAINS ... TO ... com o tamanho correto."
      }
    },
    {
      code: "05",
      meaning: "Arquivo OPTIONAL não encontrado no OPEN",
      action: "Verificar se o arquivo deve existir neste cenário",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "SELECT OPTIONAL", desc: "O arquivo foi declarado como SELECT OPTIONAL e não existe fisicamente no momento do OPEN INPUT." },
          { title: "Dataset não catalogado", desc: "O DD aponta para um dataset que não existe ou não está catalogado." }
        ],
        resolution: [
          "Se o arquivo é realmente opcional, trate a condição no programa e prossiga.",
          "Se deveria existir, verifique o JCL e o catálogo com LISTCAT.",
          "Para criar o arquivo vazio, use OPEN OUTPUT antes de OPEN INPUT."
        ],
        tip: "FS 05 só ocorre com SELECT OPTIONAL. Sem OPTIONAL, a ausência do arquivo gera FS 35."
      }
    },
    {
      code: "07",
      meaning: "CLOSE com NO REWIND / FOR REMOVAL em dispositivo não-reel",
      action: "Verificar cláusula CLOSE e tipo de dispositivo",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "CLOSE inadequado", desc: "O programa executou CLOSE REEL/UNIT em um arquivo que não está em dispositivo de fita multi-reel." },
          { title: "Dispositivo DASD", desc: "Tentou-se CLOSE com opções de fita em um dataset alocado em disco." }
        ],
        resolution: [
          "Remova a cláusula REEL/UNIT se o arquivo está em DASD.",
          "Use CLOSE simples sem qualificadores para datasets em disco."
        ],
        tip: "Este status é informativo — o CLOSE é executado normalmente, apenas a opção de reel é ignorada."
      }
    },
    {
      code: "10",
      meaning: "Fim de arquivo (EOF) atingido",
      action: "Condição normal — encerrar loop de leitura",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Fim dos registros", desc: "Um READ ou READ NEXT atingiu o final do arquivo (não há mais registros para ler)." },
          { title: "OPTIONAL vazio", desc: "Tentativa de READ em arquivo OPTIONAL que não existe ou está vazio." }
        ],
        resolution: [
          "Encerre o loop de leitura e prossiga com o processamento final.",
          "Verifique a flag de EOF no PERFORM UNTIL.",
          "Se inesperado, confirme se todos os registros esperados foram gravados."
        ],
        tip: "Use AT END no READ para tratamento inline, ou verifique FILE STATUS = '10' após cada READ."
      }
    },
    {
      code: "14",
      meaning: "READ sequencial em RRDS — Relative Record Number fora do range",
      action: "Verificar range de registros do RRDS",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Slot vazio", desc: "O READ sequencial tentou acessar um slot de registro relativo que não contém dados." },
          { title: "RRN além do limite", desc: "O RELATIVE KEY especifica um número de registro que excede o range definido para o RRDS." }
        ],
        resolution: [
          "Verifique o RELATIVE KEY antes de cada READ.",
          "Confirme o range de RRNs válidos com LISTCAT ENT(dataset) ALL.",
          "Se percorrendo sequencialmente, trate slots vazios como condição normal."
        ],
        tip: "Em RRDS, nem todos os slots precisam ter registros — trate FS 14 em loops sequenciais."
      }
    },
    {
      code: "21",
      meaning: "Erro de sequência de chave em WRITE sequencial",
      action: "Verificar se registros estão em ordem crescente de chave",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Chave fora de ordem", desc: "Ao gravar um KSDS em modo sequencial (OPEN OUTPUT), a chave do registro atual é menor ou igual à do registro anterior." },
          { title: "Dados não classificados", desc: "O arquivo de entrada não foi SORT antes da carga sequencial no KSDS." }
        ],
        resolution: [
          "Execute SORT nos dados de entrada pela chave primária antes da carga.",
          "Use DFSORT/SYNCSORT no JCL: SORT FIELDS=(pos,len,type,A).",
          "Se precisa gravar fora de ordem, use OPEN I-O com WRITE (acesso randômico)."
        ],
        tip: "KSDS em OPEN OUTPUT exige WRITE em ordem ascendente de chave — sempre SORT antes!"
      }
    },
    {
      code: "22",
      meaning: "Tentativa de WRITE com chave primária duplicada",
      action: "Verificar unicidade da chave antes do WRITE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Chave duplicada", desc: "Tentou-se gravar um registro cuja chave primária já existe no KSDS." },
          { title: "Reprocessamento", desc: "O job está sendo re-executado e os registros já foram gravados na execução anterior." }
        ],
        resolution: [
          "Verifique se o registro já existe com READ antes do WRITE.",
          "Se for atualização, use REWRITE ao invés de WRITE.",
          "Em reprocessamento, faça DELETE + WRITE ou limpe o arquivo antes.",
          "Revise a lógica de geração de chave para evitar colisões."
        ],
        tip: "Diferente do FS 02 (duplicata em chave alternada), FS 22 é erro na chave primária — o registro NÃO foi gravado."
      }
    },
    {
      code: "23",
      meaning: "Registro não encontrado (READ/START/DELETE com chave inexistente)",
      action: "Tratar como condição de negócio ou verificar dados de entrada",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Chave inexistente", desc: "O READ, START ou DELETE por chave não localizou nenhum registro correspondente." },
          { title: "Chave incorreta", desc: "A chave de pesquisa foi montada com dados incorretos (espaços, lixo de memória)." },
          { title: "Arquivo vazio", desc: "O arquivo VSAM existe mas não contém registros." }
        ],
        resolution: [
          "Verifique o conteúdo da chave de pesquisa com DISPLAY antes do READ.",
          "Confirme se o registro existe usando IDCAMS PRINT com a chave.",
          "Verifique se houve INITIALIZE/MOVE correto no campo de chave.",
          "Trate FS 23 como condição válida de negócio quando aplicável."
        ],
        tip: "FS 23 é o 'NOT FOUND' do mainframe — em muitos casos é condição esperada, não erro."
      }
    },
    {
      code: "24",
      meaning: "Violação de limite — KSDS ou RRDS sem espaço ou chave fora do range",
      action: "Verificar espaço no VSAM e definição do DEFINE CLUSTER",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "KSDS cheio", desc: "Não há mais espaço disponível (CI/CA splits esgotados) para inserir novos registros." },
          { title: "RRDS overflow", desc: "A Relative Record Number excede o número máximo de slots definidos no RRDS." },
          { title: "Registro muito grande", desc: "O tamanho do registro excede o RECORDSIZE máximo definido." }
        ],
        resolution: [
          "Para KSDS: aumente o FREESPACE ou faça REPRO + DELETE + DEFINE + REPRO.",
          "Para RRDS: redefina o cluster com mais RECORDS.",
          "Verifique com LISTCAT ENT(dataset) ALL o espaço utilizado.",
          "Considere definir SHAREOPTIONS adequadas para concorrência."
        ],
        tip: "FS 24 em KSDS quase sempre é falta de FREESPACE — planeje CA/CI splits adequados."
      }
    },
    {
      code: "30",
      meaning: "Erro permanente de I/O — falha irrecuperável",
      action: "Analisar mensagens do sistema e verificar integridade do dataset",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Erro de hardware", desc: "Falha de leitura/gravação no dispositivo de armazenamento (DASD ou fita)." },
          { title: "Dataset corrompido", desc: "A estrutura do VSAM foi danificada por abend anterior sem CLOSE adequado." },
          { title: "Conflict de acesso", desc: "Outro job ou CICS mantém lock exclusivo no dataset." }
        ],
        resolution: [
          "Verifique as mensagens IEC do system log (SYSLOG).",
          "Execute VERIFY no VSAM com IDCAMS: VERIFY DS(nome.do.dataset).",
          "Se corrompido, tente REPRO para recuperar dados e redefina o cluster.",
          "Verifique se há ENQUEUE/DEQUEUE pendente com operador."
        ],
        tip: "FS 30 requer investigação de sistemas — verifique SYSLOG e contate operação se necessário."
      }
    },
    {
      code: "34",
      meaning: "Violação de limite em arquivo sequencial (espaço insuficiente)",
      action: "Aumentar alocação de espaço do dataset no JCL",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Espaço esgotado", desc: "O dataset sequencial (QSAM) atingiu o limite de espaço alocado (extents esgotados)." },
          { title: "Sem extensões", desc: "Já foram alocados o máximo de 16 extents (ou limite do volume)." }
        ],
        resolution: [
          "Aumente SPACE=(unit,(primary,secondary)) no DD do JCL.",
          "Considere usar SPACE=(unit,(primary,secondary),RLSE) para liberar espaço não usado.",
          "Verifique se o volume tem espaço disponível.",
          "Para datasets SMS, verifique a STORAGE CLASS e DATA CLASS."
        ],
        tip: "Regra prática: secondary = 10-20% do primary. Use RLSE para liberar espaço alocado mas não usado."
      }
    },
    {
      code: "35",
      meaning: "Arquivo não encontrado no OPEN INPUT/I-O",
      action: "Verificar existência do dataset e DD statement no JCL",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Dataset inexistente", desc: "O dataset referenciado no DD não existe no catálogo." },
          { title: "Nome incorreto", desc: "O DSN no JCL está com erro de digitação ou qualificador errado." },
          { title: "Volume errado", desc: "O dataset existe mas em volume diferente do especificado." }
        ],
        resolution: [
          "Verifique o DSN no JCL com LISTCAT ENT(nome.dataset) ALL.",
          "Confira se o DD statement existe no JCL e o ASSIGN no SELECT.",
          "Se o arquivo deveria existir, investigue o step anterior (pode ter falhado).",
          "Para arquivos opcionais, use SELECT OPTIONAL no programa."
        ],
        tip: "FS 35 vs FS 05: FS 35 é erro (arquivo deveria existir); FS 05 é info (arquivo é OPTIONAL)."
      }
    },
    {
      code: "37",
      meaning: "OPEN com modo incompatível para o tipo de dispositivo/arquivo",
      action: "Verificar compatibilidade entre ACCESS MODE, OPEN e tipo do arquivo",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Modo conflitante", desc: "Tentou-se OPEN I-O em arquivo sequencial de fita, ou OPEN EXTEND em KSDS." },
          { title: "ESDS e I-O", desc: "OPEN I-O não é válido para ESDS (Entry-Sequenced) sem acesso randômico." },
          { title: "Fita e RANDOM", desc: "Tentou-se acesso randômico em dispositivo de fita (tape)." }
        ],
        resolution: [
          "Revise a combinação de ORGANIZATION, ACCESS MODE e OPEN MODE no programa.",
          "Para ESDS: use OPEN INPUT (leitura) ou OPEN EXTEND (append).",
          "Para fita: use apenas OPEN INPUT ou OPEN OUTPUT sequencial."
        ],
        tip: "Consulte a matriz de compatibilidade: KSDS suporta todos os modos; ESDS não suporta I-O com REWRITE."
      }
    },
    {
      code: "38",
      meaning: "Arquivo travado — OPEN tentado em arquivo previamente bloqueado",
      action: "Verificar LOCK no dataset e status de jobs concorrentes",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Dataset em uso", desc: "Outro job ou região CICS mantém o dataset com DISP=OLD (lock exclusivo)." },
          { title: "Lock órfão", desc: "Um abend anterior deixou o dataset em estado de lock sem CLOSE adequado." }
        ],
        resolution: [
          "Verifique se há outro job usando o dataset com 'D GRS,RES=(dsname)'.",
          "Aguarde a conclusão do job concorrente.",
          "Se lock órfão, execute IDCAMS VERIFY para liberar.",
          "Considere usar DISP=SHR no JCL se leitura é suficiente."
        ],
        tip: "Use DISP=SHR para leitura compartilhada; DISP=OLD apenas quando WRITE/REWRITE for necessário."
      }
    },
    {
      code: "39",
      meaning: "Atributos do arquivo conflitam com a definição do programa",
      action: "Alinhar FD do programa com DEFINE CLUSTER do VSAM",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "RECFM incompatível", desc: "O RECORD CONTAINS da FD não corresponde ao RECORDSIZE do VSAM ou RECFM do JCL." },
          { title: "ORGANIZATION errada", desc: "O programa define ORGANIZATION INDEXED mas o dataset é ESDS (sequencial)." },
          { title: "Tamanho de chave", desc: "O RECORD KEY no programa tem tamanho diferente do KEYS no DEFINE CLUSTER." }
        ],
        resolution: [
          "Compare SELECT/FD no COBOL com LISTCAT do dataset.",
          "Verifique: ORGANIZATION, KEY LENGTH, KEY POSITION, RECORD SIZE.",
          "Use IDCAMS LISTCAT ENT(dataset) ALL para ver atributos reais.",
          "Ajuste o programa ou redefina o cluster conforme necessário."
        ],
        tip: "FS 39 é o 'desalinhamento' mais comum — sempre compare FD + SELECT com LISTCAT antes do deploy."
      }
    },
    {
      code: "41",
      meaning: "OPEN em arquivo que já está aberto",
      action: "Corrigir lógica do programa — evitar OPEN duplicado",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "OPEN duplicado", desc: "O programa executou OPEN em um arquivo que já estava aberto (sem CLOSE intermediário)." },
          { title: "Fluxo de controle", desc: "Um PERFORM ou GO TO levou ao OPEN sem passar pelo CLOSE esperado." }
        ],
        resolution: [
          "Revise o fluxo do programa para garantir que CLOSE preceda qualquer re-OPEN.",
          "Use uma flag (WS-FILE-OPEN) para rastrear o estado do arquivo.",
          "Verifique todos os caminhos de execução com PERFORM e GO TO."
        ],
        tip: "Padrão defensivo: antes de OPEN, verifique uma flag de status. IF WS-FILE-OPEN = 'N' OPEN..."
      }
    },
    {
      code: "42",
      meaning: "CLOSE em arquivo que não está aberto",
      action: "Corrigir lógica do programa — verificar estado do arquivo antes de CLOSE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "CLOSE sem OPEN", desc: "O programa executou CLOSE em um arquivo que nunca foi aberto ou já foi fechado." },
          { title: "OPEN falhou", desc: "O OPEN anterior falhou (ex: FS 35) mas o programa continuou até o CLOSE." }
        ],
        resolution: [
          "Verifique o FILE STATUS do OPEN antes de prosseguir.",
          "Adicione verificação: IF WS-FILE-STATUS = '00' CLOSE arquivo.",
          "Garanta que CLOSE não é executado se OPEN falhar."
        ],
        tip: "Trate OPEN com IF FILE-STATUS NOT = '00' — desvie para tratamento de erro, não para CLOSE."
      }
    },
    {
      code: "43",
      meaning: "REWRITE sem READ prévio (modo sequencial)",
      action: "Executar READ antes de REWRITE no acesso sequencial",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "REWRITE sem posição", desc: "Em ACCESS MODE SEQUENTIAL, REWRITE exige que o último I/O bem-sucedido tenha sido um READ no mesmo arquivo." },
          { title: "READ falhou", desc: "O READ anterior retornou erro (ex: FS 23), invalidando a posição para REWRITE." }
        ],
        resolution: [
          "Garanta um READ bem-sucedido (FS 00) imediatamente antes do REWRITE.",
          "Se precisa atualizar sem READ prévio, use ACCESS MODE RANDOM.",
          "Verifique se não há outro I/O entre o READ e o REWRITE."
        ],
        tip: "Em ACCESS MODE RANDOM, REWRITE não exige READ prévio — considere mudar o ACCESS MODE."
      }
    },
    {
      code: "44",
      meaning: "REWRITE com registro de tamanho diferente do original",
      action: "Manter o mesmo tamanho do registro lido no REWRITE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Tamanho alterado", desc: "Em arquivo de registro fixo, o REWRITE tentou gravar um registro com tamanho diferente do lido pelo READ." },
          { title: "MOVE truncado", desc: "O MOVE para o registro alterou campos além do tamanho esperado." }
        ],
        resolution: [
          "Verifique se o tamanho do registro no REWRITE é idêntico ao do READ.",
          "Para registros variáveis, use RECORD CONTAINS min TO max e ajuste adequadamente.",
          "Evite MOVE ALL ou operações que alterem o comprimento implícito."
        ],
        tip: "Em registros fixos (RECFM=FB), o REWRITE DEVE manter exatamente o mesmo tamanho."
      }
    },
    {
      code: "46",
      meaning: "READ além do fim do arquivo (após EOF já sinalizado)",
      action: "Corrigir lógica do loop — parar de ler após FS 10",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Leitura após EOF", desc: "O programa continuou lendo após o FILE STATUS 10 (EOF) já ter sido retornado." },
          { title: "Flag não verificada", desc: "A condição de parada do PERFORM UNTIL não foi atualizada após o EOF." }
        ],
        resolution: [
          "Verifique a flag de EOF imediatamente após cada READ.",
          "Use PERFORM UNTIL WS-EOF = 'S' com o SET correto no AT END.",
          "Garanta que o READ está DENTRO do PERFORM, não antes/depois."
        ],
        tip: "Padrão correto: READ... AT END SET WS-EOF TO TRUE END-READ. PERFORM UNTIL WS-EOF."
      }
    },
    {
      code: "47",
      meaning: "READ em arquivo que não está aberto ou não aberto como INPUT/I-O",
      action: "Verificar OPEN antes do READ e o modo de abertura",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Arquivo fechado", desc: "Tentou-se READ em um arquivo que não foi aberto ou já foi fechado." },
          { title: "Modo errado", desc: "O arquivo foi aberto com OPEN OUTPUT (somente gravação)." }
        ],
        resolution: [
          "Execute OPEN INPUT ou OPEN I-O antes do READ.",
          "Verifique o FILE STATUS do OPEN — se falhou, não tente READ.",
          "Revise o fluxo para garantir que CLOSE não ocorre antes do último READ."
        ],
        tip: "READ requer OPEN INPUT ou OPEN I-O. OPEN OUTPUT e OPEN EXTEND não permitem READ."
      }
    },
    {
      code: "48",
      meaning: "WRITE em arquivo que não está aberto ou não aberto como OUTPUT/I-O/EXTEND",
      action: "Verificar OPEN antes do WRITE e o modo de abertura",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Arquivo fechado", desc: "Tentou-se WRITE em um arquivo que não foi aberto." },
          { title: "Modo errado", desc: "O arquivo foi aberto com OPEN INPUT (somente leitura)." }
        ],
        resolution: [
          "Execute OPEN OUTPUT, OPEN I-O ou OPEN EXTEND antes do WRITE.",
          "Verifique o FILE STATUS do OPEN antes de prosseguir.",
          "OPEN OUTPUT cria novo/substitui; OPEN EXTEND adiciona ao final."
        ],
        tip: "Para adicionar registros sem apagar os existentes, use OPEN EXTEND (ESDS) ou OPEN I-O (KSDS)."
      }
    },
    {
      code: "49",
      meaning: "DELETE ou REWRITE em arquivo que não está aberto como I-O",
      action: "Verificar se o arquivo foi aberto com OPEN I-O",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Modo insuficiente", desc: "DELETE e REWRITE exigem OPEN I-O, mas o arquivo está com OPEN INPUT ou OUTPUT." },
          { title: "Arquivo fechado", desc: "O arquivo já foi fechado quando a operação foi tentada." }
        ],
        resolution: [
          "Mude o OPEN para I-O: OPEN I-O nome-arquivo.",
          "Verifique o FILE STATUS do OPEN I-O antes de prosseguir.",
          "Confirme que o dataset VSAM permite atualização (SHAREOPTIONS)."
        ],
        tip: "DELETE e REWRITE SEMPRE exigem OPEN I-O — nenhum outro modo é válido para essas operações."
      }
    },
    {
      code: "90",
      meaning: "Erro não especificado do sistema",
      action: "Analisar mensagens do sistema operacional e log do VSAM",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Erro de runtime", desc: "Um erro de sistema não mapeado para nenhum FILE STATUS específico ocorreu." },
          { title: "Problema ambiental", desc: "Falha de infraestrutura, problema de catálogo ou erro de subsistema." }
        ],
        resolution: [
          "Consulte as mensagens IGZ e IEC no SYSOUT/SYSLOG.",
          "Verifique o catálogo do dataset com LISTCAT.",
          "Contate a equipe de suporte de sistemas com o dump e as mensagens.",
          "Reproduza o problema em ambiente de teste com FILE STATUS expandido."
        ],
        tip: "FS 90 é genérico — a informação real está nas mensagens do sistema (IGZ/IEC). Sempre consulte o SYSLOG."
      }
    },
    {
      code: "91",
      meaning: "Erro interno do VSAM — senha ou catálogo corrompido",
      action: "Verificar segurança RACF e integridade do catálogo VSAM",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Catálogo danificado", desc: "O catálogo VSAM (ICF) está com inconsistências internas." },
          { title: "Segurança", desc: "O RACF/ACF2/Top Secret está bloqueando o acesso com erro de validação." },
          { title: "Password inválida", desc: "Em sistemas legados com VSAM PASSWORD, a senha está incorreta." }
        ],
        resolution: [
          "Verifique permissões RACF: LISTDSD DA(dataset) ALL.",
          "Execute VERIFY no catálogo VSAM.",
          "Se catálogo corrompido, pode ser necessário EXPORT/IMPORT do cluster.",
          "Escale para equipe de suporte de catálogo/storage."
        ],
        tip: "FS 91 é raro em sistemas modernos — geralmente indica problema sério de catálogo ou segurança."
      }
    },
    {
      code: "93",
      meaning: "Recurso indisponível — VSAM não pode alocar buffers ou recursos",
      action: "Verificar REGION size e disponibilidade de recursos do sistema",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Memória insuficiente", desc: "A região do job não tem memória suficiente para os buffers VSAM (BUFND/BUFNI)." },
          { title: "Recurso bloqueado", desc: "O dataset está alocado exclusivamente por outro job ou recurso do sistema indisponível." },
          { title: "Limite de tarefas", desc: "O sistema atingiu o limite de tarefas ou recursos de I/O." }
        ],
        resolution: [
          "Aumente REGION no JCL: //jobname JOB ...,REGION=0M.",
          "Reduza BUFND/BUFNI nos parâmetros AMP do DD.",
          "Verifique se outro job não tem lock exclusivo no dataset.",
          "Consulte operação sobre disponibilidade de recursos do sistema."
        ],
        tip: "REGION=0M dá toda a memória disponível ao job — use para diagnóstico, ajuste depois."
      }
    }
  ],

  /* ========================================================================
     CATEGORY 2 — ABEND CODES z/OS (24 entries)
     ======================================================================== */
  abendCodes: [
    {
      code: "S0C1",
      meaning: "Operation Exception — instrução inválida",
      action: "Verificar CALL/PERFORM para endereço inválido ou módulo corrompido",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Instrução inválida", desc: "O processador tentou executar uma instrução com código de operação inválido." },
          { title: "Branch para dados", desc: "Um PERFORM ou CALL desviou para uma área de dados ao invés de código executável." },
          { title: "Overlay de código", desc: "O programa ou um CALL sobrescreveu área de instruções com dados." }
        ],
        resolution: [
          "Verifique o CEEDUMP — localize o offset do PSW no listing compilado.",
          "Confirme que todos os módulos em CALL existem e estão corretos.",
          "Revise POINTER e ADDRESS OF em programas que usam ponteiros.",
          "Recompile o programa e faça bind novamente."
        ],
        tip: "S0C1 frequentemente é CALL para módulo não encontrado ou tabela de endereços corrompida."
      }
    },
    {
      code: "S0C4",
      meaning: "Protection Exception — acesso a memória não autorizada",
      action: "Verificar ponteiros, subscritos de tabela e endereçamento",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Subscrito fora do range", desc: "Acesso a uma tabela COBOL com índice além do OCCURS — ex: OCCURS 100, subscrito = 150." },
          { title: "Ponteiro inválido", desc: "SET ADDRESS OF aponta para memória não alocada ou liberada." },
          { title: "CALL com parâmetros errados", desc: "O programa chamado espera parâmetros diferentes dos passados pelo CALL USING." },
          { title: "LINKAGE SECTION", desc: "Referência a campo da LINKAGE SECTION sem SET ADDRESS ou sem parâmetro no CALL." }
        ],
        resolution: [
          "Ative SSRANGE na compilação para detectar subscritos fora do range.",
          "Verifique todos os CALL USING — quantidade e tipo de parâmetros.",
          "Analise o CEEDUMP — registradores e PSW indicam o endereço do erro.",
          "Revise tabelas com OCCURS DEPENDING ON — o ODO pode estar com valor incorreto."
        ],
        tip: "Compile com CBL SSRANGE para detectar subscritos inválidos em teste. Remova em produção por performance."
      }
    },
    {
      code: "S0C7",
      meaning: "Data Exception — dados não numéricos em campo numérico",
      action: "Verificar INITIALIZE de campos numéricos e dados de entrada",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Campo não inicializado", desc: "Campo PIC 9 ou COMP-3 contém espaços ou lixo — não foi inicializado." },
          { title: "Dados inválidos", desc: "Registro lido de arquivo ou DB2 contém dados não numéricos em campo numérico." },
          { title: "REDEFINES conflitante", desc: "REDEFINES de campo alfanumérico usado como numérico sem validação." },
          { title: "MOVE incorreto", desc: "MOVE de campo alfanumérico para numérico sem verificação prévia." }
        ],
        resolution: [
          "Execute INITIALIZE nos campos de WORKING-STORAGE antes do uso.",
          "Use IF campo IS NUMERIC antes de operações aritméticas.",
          "Compile com ON SIZE ERROR para capturar overflows.",
          "Valide dados de entrada antes de processamento: IF WS-CAMPO IS NUMERIC."
        ],
        tip: "S0C7 é o abend mais comum em COBOL. SEMPRE faça INITIALIZE e valide dados com IS NUMERIC."
      }
    },
    {
      code: "S0CB",
      meaning: "Division by Zero — divisão por zero",
      action: "Validar divisor antes da operação DIVIDE/COMPUTE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Divisor zero", desc: "Uma instrução DIVIDE ou COMPUTE com divisão tem o divisor igual a zero." },
          { title: "Campo não inicializado", desc: "O campo divisor não foi populado antes da operação de divisão." }
        ],
        resolution: [
          "Adicione: IF WS-DIVISOR NOT = ZERO DIVIDE ... ELSE MOVE ZERO TO resultado.",
          "Use ON SIZE ERROR no DIVIDE/COMPUTE para capturar a condição.",
          "Verifique se dados de entrada populam corretamente o campo divisor."
        ],
        tip: "Padrão defensivo: COMPUTE resultado = dividendo / divisor ON SIZE ERROR PERFORM erro-divisao."
      }
    },
    {
      code: "S0C5",
      meaning: "Addressing Exception — endereçamento fora da memória alocada",
      action: "Verificar ponteiros, BLL cells e endereçamento dinâmico",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Endereço inválido", desc: "Uma instrução referenciou endereço de memória que não existe (acima de MEMLIMIT)." },
          { title: "Ponteiro nulo", desc: "SET ADDRESS OF com ponteiro zerado ou não inicializado." },
          { title: "GETMAIN falhou", desc: "A alocação dinâmica de memória falhou mas o ponteiro foi usado mesmo assim." }
        ],
        resolution: [
          "Verifique se SET ADDRESS foi executado antes do uso da LINKAGE SECTION.",
          "Confirme que GETMAIN/CEEGTST retornou com sucesso antes de usar a memória.",
          "Analise o CEEDUMP — o endereço no PSW indica a instrução que falhou."
        ],
        tip: "S0C5 vs S0C4: S0C5 é endereço inexistente; S0C4 é endereço existente mas sem permissão."
      }
    },
    {
      code: "S0C6",
      meaning: "Specification Exception — especificação incorreta de instrução",
      action: "Verificar alinhamento de campos COMP e COMP-1/COMP-2",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Alinhamento incorreto", desc: "Campo COMP (binário) ou COMP-1/COMP-2 (ponto flutuante) não está em boundary alinhado." },
          { title: "Instrução inválida", desc: "Operando de instrução em endereço ímpar quando deveria ser par." },
          { title: "OCCURS com subscrito", desc: "Subscrito de tabela contém valor que gera endereço desalinhado." }
        ],
        resolution: [
          "Use SYNCHRONIZED (SYNC) em campos COMP dentro de estruturas.",
          "Verifique se REDEFINES mantém alinhamento adequado.",
          "Compile com opção TRUNC(BIN) se necessário.",
          "Revise o offset dos campos no listing de compilação."
        ],
        tip: "S0C6 é mais raro em COBOL moderno — geralmente ocorre com REDEFINES ou CALL para Assembler."
      }
    },
    {
      code: "S013",
      meaning: "Erro ao abrir dataset — DCB conflitante ou dataset não encontrado",
      action: "Verificar DCB do JCL, existência do dataset e DD statement",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "DCB incompatível", desc: "Os atributos DCB (RECFM, LRECL, BLKSIZE) do JCL conflitam com o dataset existente." },
          { title: "DD ausente", desc: "O programa referencia um DD que não existe no JCL." },
          { title: "Concatenação inválida", desc: "Datasets concatenados têm atributos de registro incompatíveis." }
        ],
        resolution: [
          "Remova DCB do JCL se o dataset já existe — deixe o sistema usar os atributos catalogados.",
          "Verifique ISPF 3.4 ou LISTCAT para os atributos reais do dataset.",
          "Para concatenação, garanta que todos os datasets tenham mesmo RECFM e LRECL.",
          "Verifique a mensagem IEC141I para detalhes do motivo (reason code)."
        ],
        tip: "O reason code S013-xx é crucial: S013-14 = DD missing, S013-34 = DCB conflict, S013-60 = DUMMY conflict."
      }
    },
    {
      code: "S013-14",
      meaning: "DD statement ausente no JCL",
      action: "Adicionar DD statement correspondente ao SELECT do programa",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "DD faltando", desc: "O programa COBOL executa OPEN em arquivo cujo ASSIGN TO não possui DD correspondente no JCL." },
          { title: "Nome incorreto", desc: "O nome no ASSIGN TO do SELECT não corresponde ao nome do DD no JCL." }
        ],
        resolution: [
          "Adicione o DD statement no JCL: //ddname DD DSN=...,DISP=SHR.",
          "Confira a correspondência: SELECT arq ASSIGN TO ddname → //ddname DD ...",
          "Verifique se o DD não foi removido ou comentado acidentalmente."
        ],
        tip: "SELECT arq ASSIGN TO DDNAME01 exige //DDNAME01 DD no JCL — nomes devem ser idênticos."
      }
    },
    {
      code: "S001",
      meaning: "Erro de I/O — falha na leitura ou gravação",
      action: "Verificar mensagens IEC do SYSLOG e integridade do dispositivo",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Erro de dispositivo", desc: "Falha física de leitura ou gravação no DASD ou fita." },
          { title: "Block inválido", desc: "O bloco lido está corrompido ou tem formato inesperado." },
          { title: "BLKSIZE inconsistente", desc: "O BLKSIZE no JCL não é múltiplo do LRECL para registros fixos (FB)." }
        ],
        resolution: [
          "Verifique mensagem IEC no SYSLOG para o reason code específico.",
          "Para registros FB: BLKSIZE deve ser múltiplo exato de LRECL.",
          "Se fita, tente reler ou use cópia de backup.",
          "Para DASD, pode ser necessário ICKDSF INSPECT no volume."
        ],
        tip: "S001 com reason 0004 = BLKSIZE inconsistente — regra: BLKSIZE = n × LRECL para RECFM=FB."
      }
    },
    {
      code: "S222",
      meaning: "Job cancelado pelo operador ou CANCEL command",
      action: "Verificar com operação o motivo do cancelamento",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "Cancelamento manual", desc: "O operador emitiu CANCEL jobname ou P jobname para encerrar o job." },
          { title: "Política de operação", desc: "O job excedeu tempo de espera definido na política da instalação." }
        ],
        resolution: [
          "Verifique com a equipe de operação o motivo do CANCEL.",
          "Se o job estava em loop, corrija a lógica antes de re-submeter.",
          "Se foi por política de tempo, otimize ou aumente o limite com operação."
        ],
        tip: "S222 = cancelamento intencional (operador). S122 = cancelamento pelo próprio usuário."
      }
    },
    {
      code: "S322",
      meaning: "Tempo de CPU excedido (TIME parameter esgotado)",
      action: "Aumentar TIME no JOB/STEP ou otimizar lógica do programa",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Loop infinito", desc: "O programa entrou em loop infinito consumindo todo o tempo de CPU alocado." },
          { title: "TIME insuficiente", desc: "O TIME no JCL é muito baixo para o volume de processamento." },
          { title: "Volume inesperado", desc: "O volume de dados de entrada é muito maior que o esperado." }
        ],
        resolution: [
          "Primeiro verifique se há loop infinito — analise a lógica do programa.",
          "Aumente TIME no JOB ou STEP: // JOB ...,TIME=(mm,ss).",
          "Para diagnóstico, use TIME=1440 (sem limite) em teste — NUNCA em produção.",
          "Otimize: revise PERFORM, reduza I/O desnecessário, use tabelas em memória."
        ],
        tip: "Regra: resolva o loop ANTES de aumentar o TIME. TIME maior só mascara o problema real."
      }
    },
    {
      code: "S422",
      meaning: "Excedido limite de REGION SIZE para o step",
      action: "Aumentar REGION ou otimizar uso de memória",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Tabelas grandes", desc: "O programa aloca tabelas OCCURS com muitos elementos consumindo toda a REGION." },
          { title: "REGION insuficiente", desc: "O parâmetro REGION no JCL está abaixo do necessário para buffers de I/O e WORKING-STORAGE." }
        ],
        resolution: [
          "Aumente REGION no STEP ou JOB: REGION=0M para teste.",
          "Revise tabelas grandes — considere usar arquivos ao invés de tabelas em memória.",
          "Reduza BUFNO nos DD statements para diminuir uso de memória.",
          "Analise o CEEDUMP para ver uso de memória por componente."
        ],
        tip: "REGION=0M usa toda memória disponível. Em produção, defina valor adequado após teste."
      }
    },
    {
      code: "S806",
      meaning: "Módulo não encontrado na STEPLIB/JOBLIB/LINKLIST",
      action: "Verificar nome do módulo e bibliotecas de carga",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Load module ausente", desc: "O programa chamado via CALL ou o módulo executável (PGM=) não existe nas bibliotecas." },
          { title: "Nome incorreto", desc: "O nome no CALL ou PGM está com erro de digitação." },
          { title: "Biblioteca errada", desc: "O load module está em biblioteca que não está na concatenação STEPLIB/JOBLIB." }
        ],
        resolution: [
          "Verifique o nome exato do módulo com ISPF 3.4 na load library.",
          "Adicione a biblioteca correta ao STEPLIB: //STEPLIB DD DSN=lib,DISP=SHR.",
          "Compile e linkedite o módulo se ainda não foi feito.",
          "Para CALL dinâmico em COBOL, o módulo deve estar em STEPLIB em runtime."
        ],
        tip: "S806-04 = módulo não encontrado; S806-0C = módulo encontrado mas com erro no load."
      }
    },
    {
      code: "S878",
      meaning: "Memória virtual insuficiente no address space",
      action: "Verificar REGION e MEMLIMIT no JCL e nos parâmetros do sistema",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Alocação excessiva", desc: "O programa ou subsistema tentou alocar mais memória acima da barra do que o permitido." },
          { title: "MEMLIMIT", desc: "O MEMLIMIT do JCL ou default do sistema restringe a memória 64-bit disponível." }
        ],
        resolution: [
          "Adicione ou aumente MEMLIMIT: // JOB ...,MEMLIMIT=4G.",
          "Verifique o default de MEMLIMIT na SMFPRMxx do sistema.",
          "Se o programa usa AMODE 64, otimize alocações acima da barra."
        ],
        tip: "S878 é para memória acima da barra (64-bit). Para memória abaixo da barra, o abend é S80A."
      }
    },
    {
      code: "S80A",
      meaning: "Região insuficiente — REGION abaixo da barra esgotada",
      action: "Aumentar REGION ou reduzir uso de memória abaixo da barra",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "REGION pequena", desc: "O valor de REGION no JCL é insuficiente para a WORKING-STORAGE e buffers." },
          { title: "GETMAIN excessivo", desc: "O programa faz muitas alocações dinâmicas de memória sem FREEMAIN." }
        ],
        resolution: [
          "Aumente REGION no JCL: REGION=0M para usar toda memória disponível.",
          "Revise WORKING-STORAGE — tabelas grandes podem ser movidas para arquivo.",
          "Em CICS: verifique o DSA size e ajuste na definição do programa.",
          "Verifique se FREEMAIN é feito após cada GETMAIN."
        ],
        tip: "S80A vs S878: S80A = abaixo da barra (31-bit, REGION); S878 = acima da barra (64-bit, MEMLIMIT)."
      }
    },
    {
      code: "U0016",
      meaning: "Erro na execução de SORT interno do COBOL",
      action: "Verificar SORT FIELDS, SORTWK DDs e memória",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "SORTWK ausente", desc: "Os DD statements SORTWK01, SORTWK02, etc. não estão definidos no JCL." },
          { title: "Memória insuficiente", desc: "Não há memória suficiente para o workspace do SORT interno." },
          { title: "SORT error", desc: "Erro nos parâmetros de SORT (campos, sequência, tamanho de registro)." }
        ],
        resolution: [
          "Adicione DDs de trabalho: //SORTWK01 DD UNIT=SYSDA,SPACE=(CYL,(5,5)).",
          "Aumente REGION para dar mais memória ao SORT.",
          "Verifique a SORT SECTION no programa — SD e SORT FIELDS estão corretos?",
          "Consulte a mensagem do DFSORT/SYNCSORT para o erro específico."
        ],
        tip: "Regra prática: defina pelo menos 3 SORTWKs (01-03) com espaço adequado ao volume de dados."
      }
    },
    {
      code: "U1026",
      meaning: "CICS Transaction Abend — programa encerrado por ABEND command",
      action: "Verificar CICS transaction dump e logs de exceção",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "EXEC CICS ABEND", desc: "O programa emitiu EXEC CICS ABEND ABCODE('1026') propositalmente ou via handler." },
          { title: "Exceção não tratada", desc: "Uma condição CICS não foi tratada pelo programa (HANDLE/RESP)." }
        ],
        resolution: [
          "Consulte o CICS transaction dump (CEDF ou CICS log).",
          "Verifique se RESP e RESP2 estão sendo verificados após cada EXEC CICS.",
          "Revise os HANDLE CONDITION no programa.",
          "Teste com CEDF (CICS Execution Diagnostic Facility)."
        ],
        tip: "Em CICS, SEMPRE use RESP(WS-RESP) em cada EXEC CICS e trate os retornos possíveis."
      }
    },
    {
      code: "U4038",
      meaning: "Falha na chamada ao DB2 — connection ou plan error",
      action: "Verificar BIND do plan/package e conexão DB2",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "PLAN não encontrado", desc: "O PLAN ou PACKAGE DB2 não foi encontrado ou não está bound." },
          { title: "Conexão perdida", desc: "A conexão com o subsistema DB2 foi interrompida durante a execução." },
          { title: "BIND desatualizado", desc: "O programa foi recompilado mas o BIND PLAN/PACKAGE não foi refeito." }
        ],
        resolution: [
          "Execute BIND PLAN ou BIND PACKAGE para o programa.",
          "Verifique se o DBRM está na biblioteca correta.",
          "Confirme que o subsistema DB2 está ativo e acessível.",
          "Verifique o SYSPRINT do pré-compilador DB2 para erros."
        ],
        tip: "Fluxo obrigatório: Pré-compile → Compile → Linkedit → BIND. Pular o BIND causa U4038."
      }
    },
    {
      code: "S213",
      meaning: "Dataset não encontrado no catálogo ou volume especificado",
      action: "Verificar DSN no JCL e catálogo do sistema",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "DSN inexistente", desc: "O dataset especificado no JCL não existe no catálogo do sistema." },
          { title: "Nome incorreto", desc: "Erro de digitação no DSN, HLQ (High Level Qualifier) ou qualificador." },
          { title: "Catálogo errado", desc: "O dataset está catalogado em catálogo diferente do esperado." }
        ],
        resolution: [
          "Verifique com LISTCAT ENT(dataset) ALL a existência do dataset.",
          "Confira cada qualificador do DSN — HLQ, projeto, tipo, membro.",
          "Se dataset é temporário, use referência por && no JCL.",
          "Verifique se o step anterior que cria o dataset executou com sucesso."
        ],
        tip: "Diferença: S013 = erro ao ABRIR o dataset; S213 = dataset não ENCONTRADO no catálogo."
      }
    },
    {
      code: "S913",
      meaning: "Violação de segurança — acesso não autorizado (RACF/ACF2/TopSecret)",
      action: "Solicitar autorização de acesso ao dataset ou recurso",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Sem permissão", desc: "O userid do job não tem autorização RACF para acessar o dataset no nível requerido." },
          { title: "Nível insuficiente", desc: "Tem READ mas precisa de UPDATE; tem UPDATE mas precisa de ALTER." },
          { title: "Grupo protegido", desc: "O dataset pertence a grupo RACF que não inclui o userid." }
        ],
        resolution: [
          "Solicite acesso via RACF: PERMIT dataset ID(userid) ACCESS(UPDATE).",
          "Verifique o nível necessário: READ, UPDATE ou ALTER.",
          "Contate o administrador de segurança com o DSN e o userid.",
          "Verifique a mensagem ICH408I no SYSLOG para detalhes da violação."
        ],
        tip: "Sempre solicite o MÍNIMO de acesso necessário — READ se só precisa ler, UPDATE se precisa gravar."
      }
    },
    {
      code: "S522",
      meaning: "Job aguardando recurso por tempo excessivo (WAIT TIME exceeded)",
      action: "Verificar ENQUEUEs, recursos bloqueados e deadlocks",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Deadlock de recursos", desc: "O job está esperando um recurso que nunca será liberado (deadlock)." },
          { title: "Dataset em uso", desc: "O dataset está alocado com DISP=OLD por outro job de longa duração." },
          { title: "Wait em WTOR", desc: "O job está esperando uma resposta do operador que não foi dada." }
        ],
        resolution: [
          "Verifique com 'D GRS,C' os recursos com contention.",
          "Identifique o job que detém o recurso e resolva o deadlock.",
          "Se WTOR, responda a mensagem pendente na console.",
          "Considere usar DISP=SHR onde possível para reduzir contention."
        ],
        tip: "S522 é o timeout de WAIT — diferente de S322 (CPU). S522 = esperando recurso; S322 = processando demais."
      }
    },
    {
      code: "S706",
      meaning: "Módulo encontrado mas não executável (formato inválido ou corrompido)",
      action: "Recompilar e fazer linkedit do módulo",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Linkedit incompleto", desc: "O módulo não passou por linkedit corretamente — está como object module." },
          { title: "Módulo corrompido", desc: "O load module na biblioteca está danificado ou truncado." },
          { title: "Formato incompatível", desc: "O módulo é AMODE/RMODE incompatível com o ambiente de execução." }
        ],
        resolution: [
          "Recompile e refaça o linkedit (IEWL) do módulo.",
          "Verifique se a load library não está corrompida — IEBCOPY COPY pode testar.",
          "Confirme AMODE/RMODE adequados para o ambiente (31-bit vs 24-bit).",
          "Se módulo compartilhado, verifique se outro processo não corrompeu durante copy."
        ],
        tip: "S706 vs S806: S806 = não encontrou; S706 = encontrou mas não conseguiu carregar."
      }
    },
    {
      code: "SB37",
      meaning: "Espaço em disco esgotado — não há mais espaço no volume",
      action: "Aumentar alocação de espaço ou volume no JCL",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Extents esgotados", desc: "O dataset atingiu o limite de extensões secundárias (máximo 16 por volume)." },
          { title: "Volume cheio", desc: "Não há mais espaço livre no volume DASD para extensão." },
          { title: "Secondary insuficiente", desc: "O secondary allocation é muito pequeno para o volume de dados." }
        ],
        resolution: [
          "Aumente SPACE=(unit,(primary,secondary)) no JCL.",
          "Use SPACE=(unit,(primary,secondary,,ROUND)) para cilindros completos.",
          "Adicione mais volumes: VOL=SER=(vol1,vol2).",
          "Para SMS, verifique se a storage group tem espaço disponível.",
          "Considere comprimir dados ou usar DFSMS data class com extensão automática."
        ],
        tip: "SB37 = fim do espaço no volume; SD37 = sem volume adicional disponível. Ambos = mais espaço necessário."
      }
    },
    {
      code: "SD37",
      meaning: "Sem espaço disponível em nenhum volume elegível",
      action: "Liberar espaço nos volumes ou adicionar volumes ao storage group",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Volumes cheios", desc: "Nenhum volume elegível no storage group tem espaço suficiente para extensão." },
          { title: "Secondary = 0", desc: "O dataset foi definido sem secondary allocation (secondary = 0)." },
          { title: "Sem multi-volume", desc: "O dataset não permite extensão para volumes adicionais." }
        ],
        resolution: [
          "Defina secondary allocation: SPACE=(unit,(primary,secondary)).",
          "Verifique se o storage group tem volumes com espaço.",
          "Solicite à equipe de storage a adição de volumes ao storage group.",
          "Considere fazer housekeeping para liberar espaço em volumes existentes."
        ],
        tip: "SEMPRE defina secondary allocation > 0. Regra: secondary = 10-20% do primary para a maioria dos casos."
      }
    }
  ],

  /* ========================================================================
     CATEGORY 3 — SQLCODE DB2 (22 entries)
     ======================================================================== */
  sqlcodes: [
    {
      code: "0",
      meaning: "Operação SQL executada com sucesso",
      action: "Nenhuma ação necessária",
      severity: "success",
      diagnostic: {
        causes: [
          { title: "Execução normal", desc: "O comando SQL foi executado sem erros ou condições especiais." }
        ],
        resolution: ["Prossiga com o fluxo normal do programa."],
        tip: "Sempre verifique SQLCODE após cada EXEC SQL — mesmo SQLCODE 0 deve ser verificado."
      }
    },
    {
      code: "+100",
      meaning: "Registro não encontrado ou fim do cursor",
      action: "Tratar condição de 'not found' ou encerrar loop de FETCH",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "SELECT sem resultado", desc: "A query SELECT INTO não encontrou nenhuma linha correspondente." },
          { title: "Fim do cursor", desc: "O FETCH atingiu o fim do result set — não há mais linhas." },
          { title: "UPDATE/DELETE vazio", desc: "O UPDATE ou DELETE WHERE não encontrou linhas para atualizar/excluir." }
        ],
        resolution: [
          "Para FETCH: encerre o loop de leitura e prossiga com CLOSE CURSOR.",
          "Para SELECT INTO: trate como condição de negócio — registro não existe.",
          "Para UPDATE/DELETE: decida se a ausência de linhas afetadas é aceitável."
        ],
        tip: "+100 em FETCH é condição normal de fim. Em SELECT INTO pode indicar dados faltantes — trate adequadamente."
      }
    },
    {
      code: "100",
      meaning: "Registro não encontrado (mesmo que +100)",
      action: "Tratar condição de 'not found'",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Not found", desc: "Equivalente ao +100 — nenhuma linha satisfaz a condição WHERE." }
        ],
        resolution: [
          "Verifique a cláusula WHERE — os valores de filtro estão corretos?",
          "Confirme se os dados esperados existem na tabela.",
          "Em loops de FETCH, use como condição de saída."
        ],
        tip: "SQLCODE 100 e +100 são idênticos. Padrão: IF SQLCODE = 100 SET WS-NOT-FOUND TO TRUE."
      }
    },
    {
      code: "-104",
      meaning: "Erro de sintaxe SQL — token inválido",
      action: "Revisar sintaxe do SQL no programa",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Sintaxe incorreta", desc: "O pré-compilador DB2 encontrou um token inesperado no comando SQL." },
          { title: "Palavra reservada", desc: "Um nome de coluna ou variável é palavra reservada do DB2 sem delimitador." },
          { title: "Vírgula faltando", desc: "Falta vírgula, parêntese ou outro delimitador na sintaxe SQL." }
        ],
        resolution: [
          "Verifique a mensagem DSNT408I — ela indica exatamente o token inválido.",
          "Revise parênteses, vírgulas e aspas no comando SQL.",
          "Se usar palavra reservada como nome de coluna, delimite com aspas duplas.",
          "Teste o SQL no SPUFI antes de embutir no programa."
        ],
        tip: "Teste SEMPRE o SQL no SPUFI ou QMF antes de colocar no programa COBOL. Economiza ciclos de compilação."
      }
    },
    {
      code: "-180",
      meaning: "Valor de data/hora (datetime) inválido",
      action: "Verificar formato e validade do dado datetime",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Formato inválido", desc: "O valor passado para coluna DATE, TIME ou TIMESTAMP não está no formato esperado pelo DB2." },
          { title: "Data inexistente", desc: "A data informada não existe — ex: 2025-02-30 (fevereiro não tem dia 30)." },
          { title: "Host variable", desc: "A variável host COBOL está com formato incorreto para o tipo datetime." }
        ],
        resolution: [
          "Use formato ISO para DATE: 'YYYY-MM-DD', TIME: 'HH.MM.SS', TIMESTAMP: 'YYYY-MM-DD-HH.MM.SS.NNNNNN'.",
          "Valide a data no programa antes do INSERT/UPDATE.",
          "Verifique se a variável host está definida como PIC X(10) para DATE, PIC X(26) para TIMESTAMP."
        ],
        tip: "Formato DB2 para TIMESTAMP: 'YYYY-MM-DD-HH.MM.SS.NNNNNN' — note os hifens e pontos."
      }
    },
    {
      code: "-181",
      meaning: "String de data não é válida para o formato especificado",
      action: "Corrigir o valor da string datetime",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Mês inválido", desc: "O mês está fora do range 01-12." },
          { title: "Dia inválido", desc: "O dia está fora do range válido para o mês/ano (ex: 31 para mês de 30 dias)." },
          { title: "Hora inválida", desc: "Hora, minuto ou segundo fora do range (hora: 00-24, minuto/segundo: 00-59)." }
        ],
        resolution: [
          "Valide cada componente: ano (0001-9999), mês (01-12), dia (01-28/29/30/31).",
          "Use FUNCTION CURRENT-DATE do COBOL para obter data válida.",
          "Considere usar CURRENT DATE ou CURRENT TIMESTAMP do DB2 ao invés de host variables."
        ],
        tip: "-180 = formato errado (ex: 'ABC'); -181 = formato correto mas valor inválido (ex: '2025-13-01')."
      }
    },
    {
      code: "-204",
      meaning: "Nome indefinido — objeto não encontrado no DB2",
      action: "Verificar nome de tabela, view ou alias no catálogo DB2",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Tabela inexistente", desc: "A tabela, view ou alias referenciado no SQL não existe no schema especificado." },
          { title: "Schema incorreto", desc: "O qualificador de schema (owner) está errado — ex: SCHEMA1.TABELA vs SCHEMA2.TABELA." },
          { title: "Não autorizado", desc: "A tabela existe mas o userid não tem SELECT no catálogo para vê-la." }
        ],
        resolution: [
          "Verifique o nome exato: SELECT * FROM SYSIBM.SYSTABLES WHERE NAME = 'tabela'.",
          "Confira o schema/owner: SET CURRENT SQLID = 'owner' antes da query.",
          "Se tabela nova, verifique se o DDL CREATE TABLE foi executado com sucesso."
        ],
        tip: "Prefixe a tabela com o schema: SELECT * FROM SCHEMA.TABELA. Evite depender do CURRENT SQLID."
      }
    },
    {
      code: "-206",
      meaning: "Coluna não existe na tabela especificada",
      action: "Verificar nome da coluna no catálogo DB2",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Nome incorreto", desc: "A coluna referenciada no SQL não existe na tabela." },
          { title: "Erro de digitação", desc: "Typo no nome da coluna — ex: NOME_CLENTE ao invés de NOME_CLIENTE." },
          { title: "DDL pendente", desc: "A coluna foi adicionada por ALTER TABLE mas o BIND não foi refeito." }
        ],
        resolution: [
          "Consulte o catálogo: SELECT COLNAME FROM SYSIBM.SYSCOLUMNS WHERE TBNAME = 'tabela'.",
          "Confira a DCLGEN — se desatualizada, regenere com opção DCLGEN do DB2I.",
          "Se a coluna foi adicionada recentemente, refaça o BIND do package/plan."
        ],
        tip: "Mantenha a DCLGEN sincronizada com a tabela. Regra: ALTER TABLE → DCLGEN → Pré-compile → BIND."
      }
    },
    {
      code: "-302",
      meaning: "Erro de atribuição de variável host — tipo ou tamanho incompatível",
      action: "Verificar correspondência entre host variable e coluna DB2",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Tipo incompatível", desc: "A variável host COBOL não é compatível com o tipo da coluna DB2." },
          { title: "Truncamento", desc: "O valor da coluna é maior que a variável host definida no programa." },
          { title: "DCLGEN desatualizada", desc: "A definição da coluna mudou mas a DCLGEN no programa não foi atualizada." }
        ],
        resolution: [
          "Regenere a DCLGEN e substitua no programa.",
          "Verifique correspondência: CHAR(n) → PIC X(n), INTEGER → PIC S9(9) COMP, DECIMAL(p,s) → PIC S9(p-s)V9(s) COMP-3.",
          "Se truncamento é esperado, use SUBSTRING no SQL para limitar o tamanho."
        ],
        tip: "DCLGEN gera a correspondência perfeita. SEMPRE use DCLGEN ao invés de definir variáveis manualmente."
      }
    },
    {
      code: "-305",
      meaning: "Valor NULL encontrado sem indicador de null",
      action: "Adicionar variável indicadora de null na host variable",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "NULL sem indicador", desc: "A coluna contém NULL mas a variável host não tem indicador associado para receber o NULL." },
          { title: "DCLGEN sem indicator", desc: "A DCLGEN não gerou variáveis indicadoras ou elas não foram incluídas no SQL." }
        ],
        resolution: [
          "Adicione indicador: :WS-COLUNA:WS-COLUNA-IND no SELECT INTO.",
          "Defina indicador como PIC S9(4) COMP (SMALLINT).",
          "Verifique: se indicador < 0, o valor é NULL.",
          "Ou use COALESCE(coluna, valor_default) no SQL para evitar NULLs."
        ],
        tip: "Padrão defensivo: use COALESCE(col, default) no SQL para colunas nullable, evitando -305."
      }
    },
    {
      code: "-501",
      meaning: "Cursor não aberto — FETCH sem OPEN CURSOR prévio",
      action: "Executar OPEN CURSOR antes do FETCH",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "OPEN ausente", desc: "O FETCH foi executado antes do OPEN CURSOR." },
          { title: "CLOSE prematuro", desc: "O cursor foi fechado (CLOSE) mas o FETCH continuou tentando ler." },
          { title: "Commit fechou cursor", desc: "Um COMMIT fechou o cursor que não foi declarado WITH HOLD." }
        ],
        resolution: [
          "Garanta: OPEN → FETCH (loop) → CLOSE, nesta ordem.",
          "Se faz COMMIT no loop, declare o cursor WITH HOLD.",
          "Verifique se um error handler não executou CLOSE prematuramente."
        ],
        tip: "DECLARE CURSOR ... WITH HOLD mantém o cursor aberto após COMMIT — essencial para batch com commits."
      }
    },
    {
      code: "-803",
      meaning: "Violação de chave única — INSERT/UPDATE duplicou valor em índice unique",
      action: "Verificar unicidade do valor antes de INSERT/UPDATE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Chave duplicada", desc: "O INSERT ou UPDATE resultaria em valor duplicado em coluna (ou combinação) com constraint UNIQUE." },
          { title: "Reprocessamento", desc: "O registro já foi inserido em execução anterior e o job está sendo re-executado." }
        ],
        resolution: [
          "Verifique se o registro existe antes do INSERT: SELECT ... WHERE chave = :valor.",
          "Use MERGE (INSERT/UPDATE condicional) quando disponível.",
          "Para reprocessamento, DELETE antes do INSERT ou use lógica de upsert.",
          "A SQLERRD(3) contém o número do índice que causou a violação."
        ],
        tip: "SQLERRD(3) no SQLCA indica qual índice (unique) foi violado — útil quando a tabela tem múltiplos."
      }
    },
    {
      code: "-805",
      meaning: "Package ou plan não encontrado no catálogo DB2",
      action: "Executar BIND PACKAGE ou BIND PLAN",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "BIND não executado", desc: "O programa foi compilado mas o BIND PLAN/PACKAGE não foi executado." },
          { title: "Nome incorreto", desc: "O nome do plan/package no BIND não corresponde ao esperado pelo programa." },
          { title: "DBRM ausente", desc: "O DBRM gerado na pré-compilação não está na biblioteca especificada no BIND." }
        ],
        resolution: [
          "Execute BIND PLAN ou BIND PACKAGE com o DBRM correto.",
          "Verifique se o DBRM está na DBRM library: DSN.DBRMLIB.",
          "Confira o nome do plan na RCT (CICS) ou no parâmetro RUN do batch.",
          "Verifique SYSIBM.SYSPACKAGE para packages existentes."
        ],
        tip: "Fluxo: DCLGEN → Pré-compile (gera DBRM) → Compile → Linkedit → BIND (usa DBRM). Sem BIND = -805."
      }
    },
    {
      code: "-811",
      meaning: "SELECT INTO retornou mais de uma linha",
      action: "Usar cursor para múltiplas linhas ou refinar WHERE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Múltiplas linhas", desc: "O SELECT INTO (singleton select) retornou mais de um registro." },
          { title: "WHERE insuficiente", desc: "A cláusula WHERE não é restritiva o bastante para garantir unicidade." },
          { title: "Dados duplicados", desc: "A tabela contém registros duplicados que deveriam ser únicos." }
        ],
        resolution: [
          "Refine a WHERE para garantir no máximo 1 linha retornada.",
          "Use FETCH FIRST 1 ROW ONLY se apenas o primeiro registro é necessário.",
          "Para múltiplas linhas, declare CURSOR e use FETCH em loop.",
          "Verifique se falta índice UNIQUE na tabela para a chave de busca."
        ],
        tip: "SELECT INTO = 0 ou 1 linha. Para 0: SQLCODE +100. Para >1: SQLCODE -811. Use cursor para N linhas."
      }
    },
    {
      code: "-818",
      meaning: "Timestamp de pré-compilação não corresponde ao BIND",
      action: "Refazer pré-compilação e BIND juntos no mesmo processo",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "DBRM desatualizado", desc: "O DBRM usado no BIND é de uma pré-compilação anterior ao programa atual." },
          { title: "BIND parcial", desc: "O programa foi pré-compilado novamente mas o BIND não foi refeito." },
          { title: "Biblioteca errada", desc: "O BIND usou DBRM de biblioteca incorreta (ex: teste ao invés de produção)." }
        ],
        resolution: [
          "Refaça todo o fluxo: Pré-compile → Compile → Linkedit → BIND (todos no mesmo processo).",
          "Nunca faça BIND com DBRM de outra versão do programa.",
          "Use um JCL integrado que execute todos os passos sequencialmente.",
          "Verifique o consistency token com -DIS PLAN ou consulte SYSPACKAGE."
        ],
        tip: "Regra de ouro: NUNCA faça pré-compilação sem BIND na sequência. Use JCL integrado com todos os steps."
      }
    },
    {
      code: "-904",
      meaning: "Recurso DB2 indisponível — tablespace ou index em estado restrito",
      action: "Verificar status do tablespace/index com DISPLAY DATABASE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "STOP pendente", desc: "O tablespace ou index está em status STOP (parado pelo DBA)." },
          { title: "Utility em execução", desc: "Um utilitário DB2 (REORG, LOAD, RECOVER) está executando no objeto." },
          { title: "CHECK pending", desc: "O tablespace está em estado de CHECK PENDING após LOAD com erro de RI." }
        ],
        resolution: [
          "Verifique: -DIS DATABASE(dbname) SPACE(tsname).",
          "Se STOP: -START DATABASE(dbname) SPACE(tsname) ACCESS(RW).",
          "Se CHECK PENDING: execute CHECK DATA no tablespace.",
          "Se utility ativa: aguarde conclusão ou cancele o utilitário."
        ],
        tip: "SQLCODE -904 com reason 00C90097 = lock timeout. Com 00C90088 = resource unavailable."
      }
    },
    {
      code: "-911",
      meaning: "Deadlock ou timeout — transação foi rolled back",
      action: "Implementar retry logic e revisar estratégia de locking",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Deadlock", desc: "Duas ou mais transações bloquearam-se mutuamente em recursos diferentes." },
          { title: "Lock timeout", desc: "A transação esperou mais tempo que o LOCKTIME permite para obter lock." },
          { title: "Contenção alta", desc: "Muitas transações acessando as mesmas páginas simultaneamente." }
        ],
        resolution: [
          "Implemente retry logic: IF SQLCODE = -911 PERFORM RETRY (3 tentativas com delay).",
          "Acesse tabelas na mesma ordem em todos os programas para evitar deadlock.",
          "Reduza o tempo da Unit of Work — COMMIT mais frequente.",
          "Considere ISOLATION(UR) para queries de leitura que toleram dirty reads."
        ],
        tip: "Padrão retry: PERFORM VARYING WS-RETRY FROM 1 BY 1 UNTIL WS-RETRY > 3 OR SQLCODE = 0."
      }
    },
    {
      code: "-913",
      meaning: "Deadlock detectado — transação vítima de deadlock",
      action: "Implementar retry logic e reordenar acessos às tabelas",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Deadlock puro", desc: "Ao contrário do -911 (que pode ser timeout), -913 é especificamente deadlock detectado pelo DB2." },
          { title: "Recursos cruzados", desc: "Duas transações bloqueiam recursos na ordem inversa: A→B vs B→A." }
        ],
        resolution: [
          "Implemente retry com ROLLBACK antes de re-tentar.",
          "Padronize a ordem de acesso às tabelas em todos os programas.",
          "Reduza o escopo do COMMIT — menos registros por Unit of Work.",
          "Analise IFCID 0172 para identificar os recursos envolvidos no deadlock."
        ],
        tip: "-911 = deadlock OU timeout; -913 = apenas deadlock. Para ambos, retry logic é a solução padrão."
      }
    },
    {
      code: "-922",
      meaning: "Falha de autorização — userid sem privilégio para a operação",
      action: "Solicitar GRANT do privilégio necessário ao DBA",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Sem GRANT", desc: "O userid/plan não tem o privilégio necessário (SELECT, INSERT, UPDATE, DELETE, EXECUTE)." },
          { title: "BIND authority", desc: "O userid não tem autoridade para fazer BIND do package/plan." }
        ],
        resolution: [
          "Solicite: GRANT SELECT, INSERT, UPDATE, DELETE ON tabela TO userid.",
          "Para packages: GRANT EXECUTE ON PACKAGE package TO userid.",
          "Verifique SYSIBM.SYSTABAUTH para autorizações existentes.",
          "Se usa BIND com VALIDATE(BIND), o GRANT deve existir no momento do BIND."
        ],
        tip: "Em CICS, o userid da transação precisa dos GRANTs. Em batch, é o userid do JOB."
      }
    },
    {
      code: "-927",
      meaning: "Erro de interface de linguagem — attachment facility problem",
      action: "Verificar conexão com DB2 e attachment facility",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "DB2 indisponível", desc: "O subsistema DB2 não está ativo ou perdeu a conexão durante a execução." },
          { title: "Attachment facility", desc: "O call attachment facility (CAF) ou RRSAF não está corretamente inicializado." },
          { title: "IMS/CICS disconnect", desc: "A conexão entre IMS/CICS e o DB2 foi perdida." }
        ],
        resolution: [
          "Verifique se o subsistema DB2 está ativo: -DIS DDF.",
          "Para batch: verifique o //DSNHLI DD no JCL.",
          "Para CICS: verifique a conexão DB2CONN com CEMT INQ DB2CONN.",
          "Contate DBA para verificar status do subsistema."
        ],
        tip: "-927 geralmente é problema de infraestrutura, não do programa. Verifique status do DB2 primeiro."
      }
    },
    {
      code: "-551",
      meaning: "Privilégio específico não concedido para a operação na tabela",
      action: "Solicitar GRANT do privilégio específico ao DBA",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Sem privilégio DML", desc: "O userid não tem SELECT, INSERT, UPDATE ou DELETE na tabela específica." },
          { title: "Schema diferente", desc: "A tabela pertence a outro schema e o userid não tem GRANT nesse schema." }
        ],
        resolution: [
          "Solicite ao DBA: GRANT operação ON schema.tabela TO userid.",
          "A mensagem indica exatamente qual privilégio falta e em qual tabela.",
          "Para múltiplas tabelas, solicite GRANTs para todas as tabelas referenciadas."
        ],
        tip: "-551 indica exatamente o que falta: 'userid DOES NOT HAVE privilege ON table'. Use essa info na solicitação."
      }
    },
    {
      code: "-530",
      meaning: "Violação de foreign key — parent row não encontrada",
      action: "Verificar existência do registro pai antes do INSERT/UPDATE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Parent inexistente", desc: "O INSERT ou UPDATE referencia um valor de foreign key que não existe na tabela pai." },
          { title: "Ordem errada", desc: "O registro filho está sendo inserido antes do registro pai." },
          { title: "FK incorreta", desc: "O valor da foreign key está errado ou com formato incorreto." }
        ],
        resolution: [
          "Insira o registro na tabela pai ANTES do filho.",
          "Verifique se o valor da FK existe na tabela pai: SELECT * FROM pai WHERE pk = :fk.",
          "Revise a lógica de ordem de INSERT entre tabelas relacionadas.",
          "Consulte SYSIBM.SYSRELS para ver os relacionamentos da tabela."
        ],
        tip: "Em batch com múltiplas tabelas: ordene os INSERTs — pai primeiro, filhos depois. DELETEs na ordem inversa."
      }
    }
  ],

  /* ========================================================================
     CATEGORY 4 — EIBRESP CICS (34 entries)
     ======================================================================== */
  eibresp: [
    {
      code: "NORMAL",
      numericCode: 0,
      meaning: "Operação CICS executada com sucesso",
      action: "Nenhuma ação necessária",
      severity: "success",
      diagnostic: {
        causes: [
          { title: "Execução normal", desc: "O comando EXEC CICS foi executado sem erros." }
        ],
        resolution: ["Prossiga com o fluxo normal da transação."],
        tip: "SEMPRE verifique EIBRESP após cada EXEC CICS — mesmo quando espera sucesso."
      }
    },
    {
      code: "ERROR",
      numericCode: 1,
      meaning: "Erro genérico — verifique EIBRESP2 para detalhes",
      action: "Analisar EIBRESP2 para identificar o erro específico",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Erro genérico", desc: "Uma condição de erro ocorreu que não se enquadra em nenhuma resposta específica." },
          { title: "Programa chamado", desc: "O programa chamado via LINK retornou com erro não tratado." }
        ],
        resolution: [
          "Verifique EIBRESP2 — contém o código de razão detalhado.",
          "Consulte a documentação CICS para a combinação EIBRESP/EIBRESP2.",
          "Teste com CEDF para rastrear o comando que falhou."
        ],
        tip: "EIBRESP = tipo de erro; EIBRESP2 = detalhe. SEMPRE registre ambos no log de erro."
      }
    },
    {
      code: "FILENOTFOUND",
      numericCode: 12,
      meaning: "Arquivo (FCT entry) não definido no CICS",
      action: "Verificar definição do arquivo na FCT ou CSD",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "FCT ausente", desc: "O nome do arquivo usado no EXEC CICS READ/WRITE não tem entry na File Control Table." },
          { title: "Nome incorreto", desc: "O nome do arquivo no programa não corresponde ao definido na FCT/CSD." },
          { title: "CSD não atualizado", desc: "O arquivo foi definido mas o CICS não foi atualizado (NEWCOPY/INSTALL)." }
        ],
        resolution: [
          "Verifique com CEMT INQ FILE(nome) se o arquivo está definido.",
          "Confirme o nome no programa com a definição na CSD.",
          "Se novo, instale com CEDA INSTALL FILE(nome) GROUP(grupo).",
          "Nomes de arquivo CICS têm máximo 8 caracteres."
        ],
        tip: "Diferença: FILENOTFOUND(12) = arquivo não definido no CICS. NOTFND(13) = registro não encontrado no arquivo."
      }
    },
    {
      code: "NOTFND",
      numericCode: 13,
      meaning: "Registro não encontrado no arquivo VSAM via CICS",
      action: "Tratar como condição de negócio ou verificar chave",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "Chave inexistente", desc: "O READ com chave especificada não localizou registro correspondente no VSAM." },
          { title: "Arquivo vazio", desc: "O arquivo VSAM não contém registros." }
        ],
        resolution: [
          "Trate como condição esperada quando aplicável: IF WS-RESP = DFHRESP(NOTFND).",
          "Verifique o conteúdo e tamanho da chave de pesquisa.",
          "Confirme que o registro existe com CECI READ FILE(nome) RIDFLD(chave)."
        ],
        tip: "NOTFND é o EIBRESP mais comum — trate-o como condição de negócio, não como erro fatal."
      }
    },
    {
      code: "DUPREC",
      numericCode: 14,
      meaning: "Tentativa de WRITE com chave primária duplicada no VSAM",
      action: "Verificar unicidade da chave antes do WRITE",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Chave duplicada", desc: "O EXEC CICS WRITE tentou inserir registro com chave primária que já existe no KSDS." }
        ],
        resolution: [
          "Verifique se o registro existe com READ antes do WRITE.",
          "Se for atualização, use REWRITE ao invés de WRITE.",
          "Revise a geração de chave para garantir unicidade."
        ],
        tip: "Padrão: READ (se NOTFND → WRITE, se NORMAL → REWRITE). Evita DUPREC e NOTFND no REWRITE."
      }
    },
    {
      code: "DUPKEY",
      numericCode: 15,
      meaning: "Chave alternada duplicada encontrada durante READ/BROWSE",
      action: "Verificar se duplicatas em AIX são esperadas",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "AIX com duplicatas", desc: "O arquivo tem Alternate Index definido com NONUNIQUEKEY e registros duplicados para a chave alternada." }
        ],
        resolution: [
          "Se esperado, use READNEXT para percorrer todas as duplicatas.",
          "Se não esperado, revise a definição do AIX.",
          "DUPKEY não impede a operação — é informativo."
        ],
        tip: "DUPKEY é informativo — indica que existem mais registros com a mesma chave alternada. Use BROWSE para ler todos."
      }
    },
    {
      code: "INVREQ",
      numericCode: 16,
      meaning: "Requisição inválida — comando CICS usado incorretamente",
      action: "Verificar parâmetros e pré-condições do comando EXEC CICS",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Parâmetro inválido", desc: "Um parâmetro do comando EXEC CICS tem valor inválido ou combinação incompatível." },
          { title: "Estado incorreto", desc: "O comando foi emitido em momento inadequado (ex: REWRITE sem READ prévio)." },
          { title: "Tipo de arquivo", desc: "A operação não é suportada pelo tipo de arquivo (ex: DELETE em ESDS)." }
        ],
        resolution: [
          "Verifique EIBRESP2 para o motivo específico.",
          "Revise os parâmetros do comando na documentação CICS.",
          "Confirme pré-condições: READ antes de REWRITE, cursor aberto para FETCH.",
          "Teste com CEDF passo a passo."
        ],
        tip: "INVREQ é amplo — EIBRESP2 é essencial para diagnóstico. Documente a combinação EIBRESP/EIBRESP2."
      }
    },
    {
      code: "IOERR",
      numericCode: 17,
      meaning: "Erro de I/O no acesso ao arquivo VSAM via CICS",
      action: "Verificar integridade do arquivo VSAM e SYSLOG do CICS",
      severity: "critical",
      diagnostic: {
        causes: [
          { title: "Erro de I/O", desc: "Falha irrecuperável de leitura/gravação no dataset VSAM subjacente." },
          { title: "VSAM corrompido", desc: "O dataset VSAM está com erro de estrutura (índice ou dados danificados)." }
        ],
        resolution: [
          "Feche o arquivo no CICS: CEMT SET FILE(nome) CLOSED.",
          "Execute IDCAMS VERIFY no dataset VSAM.",
          "Se corrompido, faça REPRO + DELETE + DEFINE + REPRO.",
          "Reabra: CEMT SET FILE(nome) OPEN ENABLED."
        ],
        tip: "Para IOERR, verifique a mensagem DFHFC no CICS log — ela contém o VSAM return code detalhado."
      }
    },
    {
      code: "NOSPACE",
      numericCode: 18,
      meaning: "Sem espaço disponível no arquivo VSAM para WRITE",
      action: "Aumentar espaço do VSAM ou reorganizar (REPRO)",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "VSAM cheio", desc: "O dataset VSAM não tem mais espaço para CI/CA splits." },
          { title: "Extents esgotados", desc: "O número máximo de extents foi atingido." }
        ],
        resolution: [
          "Feche o arquivo no CICS, aumente o espaço e reabra.",
          "Faça REPRO + DELETE + DEFINE (com mais espaço) + REPRO.",
          "Ajuste FREESPACE (CI%, CA%) para reduzir splits futuros.",
          "Monitore crescimento com LISTCAT — planeje manutenção periódica."
        ],
        tip: "Monitore VSAM com LISTCAT regularmente. FREESPACE(20 10) = 20% CI livre, 10% CA livre — bom para arquivos com inserções."
      }
    },
    {
      code: "NOTOPEN",
      numericCode: 19,
      meaning: "Arquivo não está aberto no CICS",
      action: "Abrir o arquivo via CEMT ou verificar definição na CSD",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Arquivo fechado", desc: "O arquivo está definido no CICS mas está em status CLOSED." },
          { title: "DISABLED", desc: "O arquivo está DISABLED na FCT — não aceita operações." },
          { title: "Erro anterior", desc: "Um erro anterior causou o fechamento automático do arquivo." }
        ],
        resolution: [
          "Verifique status: CEMT INQ FILE(nome).",
          "Abra: CEMT SET FILE(nome) OPEN ENABLED.",
          "Se falhar ao abrir, verifique o dataset VSAM subjacente.",
          "Se após CICS restart, verifique se o arquivo tem OPENTIME(FIRSTREF) ou (STARTUP)."
        ],
        tip: "OPENTIME(FIRSTREF) = abre no primeiro acesso; OPENTIME(STARTUP) = abre no startup do CICS."
      }
    },
    {
      code: "ENDFILE",
      numericCode: 20,
      meaning: "Fim do browse — não há mais registros",
      action: "Encerrar BROWSE com ENDBR",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Fim do browse", desc: "O READNEXT ou READPREV atingiu o fim (ou início) do arquivo durante BROWSE." }
        ],
        resolution: [
          "Execute EXEC CICS ENDBR FILE(nome) para encerrar o browse.",
          "Prossiga com o processamento dos dados já lidos."
        ],
        tip: "ENDFILE é o 'EOF' do CICS BROWSE. SEMPRE execute ENDBR após receber ENDFILE."
      }
    },
    {
      code: "ILLOGIC",
      numericCode: 21,
      meaning: "Erro lógico do VSAM — verifique EIBRESP2 para VSAM return code",
      action: "Analisar EIBRESP2 como VSAM return code/reason code",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Erro VSAM", desc: "O VSAM retornou um erro que o CICS mapeia como ILLOGIC." },
          { title: "Estado inconsistente", desc: "O arquivo VSAM está em estado lógico inconsistente." }
        ],
        resolution: [
          "EIBRESP2 contém o VSAM feedback code — consulte documentação VSAM.",
          "Execute VERIFY no dataset.",
          "Se catálogo corrompido, EXPORT/IMPORT pode ser necessário.",
          "Registre EIBRESP2 no log para diagnóstico detalhado."
        ],
        tip: "ILLOGIC é o 'catch-all' de erros VSAM no CICS. EIBRESP2 é a chave do diagnóstico."
      }
    },
    {
      code: "LENGERR",
      numericCode: 22,
      meaning: "Erro de comprimento — tamanho do registro diferente do esperado",
      action: "Verificar LENGTH no comando e tamanho do registro VSAM",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "LENGTH incorreto", desc: "O LENGTH especificado no EXEC CICS READ/WRITE não corresponde ao tamanho real do registro." },
          { title: "Buffer pequeno", desc: "A área de dados (COMMAREA ou buffer) é menor que o registro retornado." }
        ],
        resolution: [
          "Use LENGTH(registro-len) SET(ADDRESS OF registro) para receber o tamanho correto.",
          "Para registros variáveis, use FLENGTH para obter o tamanho real.",
          "Verifique o RECORDSIZE no DEFINE CLUSTER do VSAM."
        ],
        tip: "Use SET(ADDRESS OF) ao invés de INTO para evitar LENGERR em registros de tamanho variável."
      }
    },
    {
      code: "QZERO",
      numericCode: 23,
      meaning: "Fila Temporary Storage (TS) está vazia",
      action: "Verificar se dados foram gravados na fila antes do READ",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "TS vazia", desc: "A fila TS que o programa tenta ler não contém itens (está vazia ou nunca foi criada)." }
        ],
        resolution: [
          "Verifique se o WRITEQ TS anterior foi executado com sucesso.",
          "Confirme o nome da fila — nomes são case-sensitive.",
          "Considere tratar QZERO como condição esperada (fila sem dados para processar)."
        ],
        tip: "Nomes de filas TS são case-sensitive e limitados a 16 caracteres no CICS TS 5.x."
      }
    },
    {
      code: "SIGNAL",
      numericCode: 24,
      meaning: "Sinal recebido do terminal — função especial ativada",
      action: "Tratar o sinal conforme a lógica da transação",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Tecla especial", desc: "O usuário ativou uma função de sinal (ex: ATTN key em terminal 3270)." }
        ],
        resolution: [
          "Verifique EIBSIG para determinar o tipo de sinal recebido.",
          "Trate conforme a lógica da aplicação (cancelamento, interrupção, etc.)."
        ],
        tip: "SIGNAL é raro em aplicações modernas — ocorre principalmente com terminais 3270 físicos."
      }
    },
    {
      code: "QBUSY",
      numericCode: 25,
      meaning: "Fila TS/TD está em uso por outra transação",
      action: "Implementar retry ou aguardar liberação da fila",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "Contenção", desc: "Outra transação está acessando a mesma fila TS ou TD com lock exclusivo." }
        ],
        resolution: [
          "Implemente retry com pequeno delay: EXEC CICS DELAY FOR SECONDS(1).",
          "Considere usar filas TS com nomes únicos por transação para evitar contenção.",
          "Revise se NOSUSPEND está especificado — sem ele, o CICS aguarda automaticamente."
        ],
        tip: "Para evitar QBUSY, use nomes de fila TS únicos por terminal: CONCAT EIBTRMID + prefixo."
      }
    },
    {
      code: "ITEMERR",
      numericCode: 26,
      meaning: "Item number especificado na fila TS é inválido",
      action: "Verificar o número do item e quantidade de itens na fila",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Item inexistente", desc: "O ITEM number especificado no READQ TS é maior que o número de itens na fila." },
          { title: "Item zero", desc: "Foi especificado ITEM(0) — itens são numerados a partir de 1." }
        ],
        resolution: [
          "Use NUMITEMS em READQ TS para obter a quantidade de itens antes de ler por número.",
          "Garanta que ITEM está entre 1 e NUMITEMS.",
          "Se não precisa de acesso por número, omita ITEM para ler sequencialmente."
        ],
        tip: "READQ TS sem ITEM lê o próximo. Com ITEM(n) lê o específico. Com NEXT lê sequencialmente."
      }
    },
    {
      code: "PGMIDERR",
      numericCode: 27,
      meaning: "Programa chamado por LINK/XCTL não encontrado",
      action: "Verificar instalação do programa no CSD e load library",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Programa não definido", desc: "O programa referenciado em LINK/XCTL não está definido na PPT (Processing Program Table) ou CSD." },
          { title: "Load module ausente", desc: "A definição existe mas o load module não está na DFHRPL (concatenação de bibliotecas)." },
          { title: "NEWCOPY necessário", desc: "O módulo foi reinstalado mas CICS ainda usa a versão antiga em memória." }
        ],
        resolution: [
          "Verifique definição: CEMT INQ PROGRAM(nome).",
          "Se não existe: CEDA INSTALL PROGRAM(nome) GROUP(grupo).",
          "Se existe mas não carrega: verifique se o load module está na DFHRPL.",
          "Após reinstalar: CEMT SET PROGRAM(nome) NEWCOPY."
        ],
        tip: "Após COMPILE + LINKEDIT, sempre faça CEMT SET PROG(nome) NEWCOPY para carregar a versão nova."
      }
    },
    {
      code: "TRANSIDERR",
      numericCode: 28,
      meaning: "Transação não definida na PCT (Program Control Table)",
      action: "Definir a transação na CSD ou verificar o transaction ID",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Transação não definida", desc: "O transaction ID usado em START, RETURN TRANSID ou digitado no terminal não está na PCT/CSD." },
          { title: "ID incorreto", desc: "O transaction ID tem erro de digitação (IDs são de 1-4 caracteres)." }
        ],
        resolution: [
          "Verifique com CEMT INQ TRANSACTION(txid).",
          "Defina na CSD: CEDA DEF TRANSACTION(txid) GROUP(grupo) PROGRAM(pgm).",
          "Instale: CEDA INSTALL TRANSACTION(txid) GROUP(grupo).",
          "Transaction IDs são de 1 a 4 caracteres — verifique o tamanho."
        ],
        tip: "Transaction ID = 4 caracteres máximo. Convenção: primeiro caractere indica o subsistema (ex: T=teste)."
      }
    },
    {
      code: "ENDDATA",
      numericCode: 29,
      meaning: "Sem mais dados na fila TD (Transient Data) para leitura",
      action: "Encerrar loop de leitura da fila TD",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Fila TD vazia", desc: "Todos os registros da fila Transient Data foram lidos (fila vazia)." }
        ],
        resolution: [
          "Encerre o loop de leitura ao receber ENDDATA.",
          "Se fila deveria ter dados, verifique o WRITEQ TD que a popula."
        ],
        tip: "ENDDATA para TD é equivalente ao ENDFILE para FILE — indica fim dos dados disponíveis."
      }
    },
    {
      code: "INVTSREQ",
      numericCode: 30,
      meaning: "Requisição inválida de Temporary Storage",
      action: "Verificar parâmetros do READQ/WRITEQ/DELETEQ TS",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Operação inválida", desc: "A combinação de parâmetros no READQ/WRITEQ/DELETEQ TS é inválida." },
          { title: "Fila inexistente", desc: "Tentou-se operação em fila TS que não existe (para algumas operações)." }
        ],
        resolution: [
          "Verifique a combinação de parâmetros — nem todas as opções são compatíveis.",
          "Consulte EIBRESP2 para o motivo específico.",
          "Teste com CECI para validar o comando."
        ],
        tip: "Use CECI para testar comandos TS antes de codificar no programa: CECI READQ TS QUEUE(nome)."
      }
    },
    {
      code: "EXPIRED",
      numericCode: 31,
      meaning: "Tempo expirado em DELAY ou POST — interval timer disparou",
      action: "Condição esperada — prosseguir com lógica pós-timer",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Timer expirado", desc: "O intervalo especificado em DELAY, POST ou RETRIEVE com WAIT expirou normalmente." }
        ],
        resolution: [
          "Trate como condição normal — o timer completou o período especificado.",
          "Prossiga com a lógica que deveria executar após o delay."
        ],
        tip: "EXPIRED em POST é a condição NORMAL de conclusão — indica que o tempo esperado passou."
      }
    },
    {
      code: "RETPAGE",
      numericCode: 32,
      meaning: "Retorno de página em BMS (Basic Mapping Support)",
      action: "Tratar paginação de tela conforme design da transação",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Paginação", desc: "O terminal retornou condição de paging em operação de BMS multi-página." }
        ],
        resolution: [
          "Trate conforme a lógica de paginação da sua transação.",
          "Se não usa paginação BMS, esta condição não deveria ocorrer — revise o mapset."
        ],
        tip: "Paginação BMS é complexa. Considere usar lógica de paginação programática ao invés de BMS autopage."
      }
    },
    {
      code: "RTEFAIL",
      numericCode: 33,
      meaning: "Falha no route de transação para outro sistema/região",
      action: "Verificar conectividade entre regiões CICS (MRO/ISC)",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Sistema remoto indisponível", desc: "O sistema CICS remoto definido no ROUTE não está acessível." },
          { title: "MRO/ISC", desc: "A conexão Multi-Region Operation ou Inter-System Communication falhou." }
        ],
        resolution: [
          "Verifique a conectividade com CEMT INQ CONNECTION.",
          "Confirme se o sistema remoto está ativo.",
          "Revise a definição de CONNECTION e SESSIONS na CSD."
        ],
        tip: "Para MRO: verifique DFHIR (interregion) links. Para ISC: verifique VTAM e conexões SNA/IP."
      }
    },
    {
      code: "MAPFAIL",
      numericCode: 36,
      meaning: "Falha ao receber dados do mapa BMS — mapa vazio ou AID key sem dados",
      action: "Verificar se o usuário enviou dados ou se usou CLEAR/PA key",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "RECEIVE MAP sem dados", desc: "O EXEC CICS RECEIVE MAP não encontrou dados no buffer de entrada do terminal." },
          { title: "CLEAR key", desc: "O usuário pressionou CLEAR, que limpa a tela sem enviar dados." },
          { title: "PA key", desc: "As teclas PA1/PA2/PA3 geram AID mas não enviam dados do mapa." }
        ],
        resolution: [
          "Verifique EIBAID antes do RECEIVE MAP — se CLEAR ou PA, não faça RECEIVE.",
          "Trate MAPFAIL: IF WS-RESP = DFHRESP(MAPFAIL) → tela vazia, envie mapa inicial.",
          "Use HANDLE CONDITION MAPFAIL ou RESP(WS-RESP) para capturar."
        ],
        tip: "Padrão: verifique EIBAID primeiro. Se DFHCLEAR, envie mapa limpo. Se ENTER/PF, faça RECEIVE MAP."
      }
    },
    {
      code: "INVMPSZ",
      numericCode: 38,
      meaning: "Tamanho do mapa BMS incompatível com o terminal",
      action: "Verificar definição do mapset (linhas × colunas) vs modelo do terminal",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Mapa grande demais", desc: "O mapa BMS define mais linhas ou colunas do que o terminal suporta." },
          { title: "Terminal incompatível", desc: "O terminal é modelo 2 (24×80) mas o mapa foi desenhado para modelo 4 (43×80) ou 5 (27×132)." }
        ],
        resolution: [
          "Verifique o TERM no mapset: DFHMSD TYPE=MAP,MODE=INOUT,TERM=3270-2.",
          "Ajuste o mapa para o menor modelo de terminal que será usado.",
          "Use TIOAPFX=YES no mapset para cálculo correto de tamanho."
        ],
        tip: "Modelo 2 = 24×80 (padrão). Modelo 3 = 32×80. Modelo 4 = 43×80. Modelo 5 = 27×132."
      }
    },
    {
      code: "NOTAUTH",
      numericCode: 70,
      meaning: "Usuário não autorizado para o recurso CICS (RACF/security)",
      action: "Solicitar autorização de segurança para o recurso",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Sem permissão CICS", desc: "O userid da transação não tem autorização de segurança (ESM/RACF) para o recurso." },
          { title: "Resource security", desc: "A segurança de recursos CICS (RESSEC) está ativa e o userid não tem acesso." }
        ],
        resolution: [
          "Solicite ao administrador de segurança RACF o acesso ao recurso CICS.",
          "Verifique: CEMT INQ PROGRAM(pgm) — veja se SEC(YES) está ativo.",
          "Para transação: PERMIT CICSTRN.txid CLASS(TCICSTRN) ID(userid) ACCESS(READ).",
          "Para programa: PERMIT CICSPGM.pgm CLASS(CCICSPGM) ID(userid) ACCESS(READ)."
        ],
        tip: "NOTAUTH(70) em transação = RACF TCICSTRN class. Em programa = CCICSPGM class. Em arquivo = FCICSFCT class."
      }
    },
    {
      code: "DISABLED",
      numericCode: 84,
      meaning: "Arquivo ou transação está DISABLED no CICS",
      action: "Habilitar o recurso via CEMT ou CSD",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Recurso desabilitado", desc: "O arquivo, transação ou programa foi explicitamente desabilitado pelo administrador CICS." },
          { title: "Auto-disable", desc: "O CICS desabilitou o recurso automaticamente após erros repetidos." }
        ],
        resolution: [
          "Habilite: CEMT SET FILE(nome) ENABLED ou CEMT SET TRANS(txid) ENABLED.",
          "Verifique se há erro subjacente que causou o auto-disable.",
          "Resolva o erro antes de re-habilitar para evitar novo disable."
        ],
        tip: "Antes de re-habilitar, investigue o motivo do DISABLE — re-habilitar sem corrigir causa o mesmo problema."
      }
    },
    {
      code: "ALLOCERR",
      numericCode: 85,
      meaning: "Erro ao alocar sessão para comunicação remota",
      action: "Verificar definição de conexões e sessões no CSD",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Sem sessão disponível", desc: "Não há sessão livre para comunicação com o sistema remoto." },
          { title: "Conexão inativa", desc: "A conexão com o sistema remoto não está ACQUIRED." }
        ],
        resolution: [
          "Verifique: CEMT INQ CONNECTION — confirme status ACQUIRED.",
          "Aumente SESSIONS na definição da conexão.",
          "Se conexão perdida: CEMT SET CONNECTION(nome) ACQUIRED."
        ],
        tip: "ALLOCERR geralmente indica problema de conectividade MRO/ISC — verifique as conexões primeiro."
      }
    },
    {
      code: "INVPARTN",
      numericCode: 100,
      meaning: "Partição especificada é inválida para o terminal",
      action: "Verificar definição de partitions no BMS",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Partition inexistente", desc: "O nome de partition especificado no comando BMS não existe na definição do partitionset." },
          { title: "Terminal sem suporte", desc: "O terminal não suporta partitioned screens." }
        ],
        resolution: [
          "Verifique a definição do partitionset no BMS.",
          "Confirme se o tipo de terminal suporta partitions.",
          "Se não precisa de partitions, remova a referência."
        ],
        tip: "Partitions BMS são raras em aplicações modernas. Considere usar mapas multi-região ao invés de partitions."
      }
    },
    {
      code: "PARTNFAIL",
      numericCode: 101,
      meaning: "Falha no partitionset do terminal",
      action: "Verificar definição e integridade do partitionset",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "Partitionset corrompido", desc: "A definição do partitionset está inválida ou corrompida." },
          { title: "Incompatibilidade", desc: "O partitionset não é compatível com o modelo de terminal em uso." }
        ],
        resolution: [
          "Revise a definição do partitionset no BMS macro.",
          "Recompile o mapset com o partitionset.",
          "Teste com terminal que suporta partitions."
        ],
        tip: "Se não precisa de partitions, simplifique removendo-as do design da tela."
      }
    },
    {
      code: "SYSBUSY",
      numericCode: 112,
      meaning: "Sistema CICS está sobrecarregado — Max Task atingido",
      action: "Aguardar e re-tentar ou aumentar MAXTASK na SIT",
      severity: "warning",
      diagnostic: {
        causes: [
          { title: "MAXTASK atingido", desc: "O número máximo de tasks simultâneas no CICS foi atingido." },
          { title: "Pico de carga", desc: "Muitas transações sendo executadas simultaneamente." }
        ],
        resolution: [
          "Implemente retry com delay para o START que falhou.",
          "Solicite ao sysprog CICS o aumento de MXT na SIT.",
          "Investigue se há transações em loop consumindo tasks.",
          "Considere distribuição de carga entre múltiplas regiões CICS."
        ],
        tip: "SYSBUSY indica alta carga no CICS. Se frequente, revise dimensionamento da região ou distribua com Sysplex."
      }
    },
    {
      code: "SYSIDERR",
      numericCode: 53,
      meaning: "System ID especificado não está definido ou não está acessível",
      action: "Verificar definição do remote system no CSD",
      severity: "error",
      diagnostic: {
        causes: [
          { title: "SYSID não definido", desc: "O SYSID referenciado no comando (ex: LINK SYSID('xxxx')) não está definido na CONNECTION." },
          { title: "Sistema offline", desc: "O sistema remoto está definido mas a conexão não está ativa." }
        ],
        resolution: [
          "Verifique com CEMT INQ CONNECTION o SYSID disponível.",
          "Se não definido: CEDA DEF CONNECTION(nome) GROUP(grupo) ACCESSMETHOD(VTAM) NETNAME(nn).",
          "Se offline: CEMT SET CONNECTION(nome) ACQUIRED."
        ],
        tip: "SYSID = identificador de 4 caracteres do sistema CICS. Verifique na SIT do sistema remoto."
      }
    },
    {
      code: "SUPPRESSED",
      numericCode: 72,
      meaning: "Condição de exceção foi suprimida por HANDLE/IGNORE CONDITION",
      action: "Revisar HANDLE CONDITION e IGNORE CONDITION no programa",
      severity: "info",
      diagnostic: {
        causes: [
          { title: "Condição ignorada", desc: "O programa tem IGNORE CONDITION para esta exceção — a condição ocorreu mas foi suprimida." },
          { title: "NOHANDLE", desc: "O comando foi emitido com NOHANDLE — todas as condições são suprimidas." }
        ],
        resolution: [
          "Se RESP foi especificado, verifique EIBRESP e EIBRESP2 para a condição original.",
          "Se não esperado, revise HANDLE CONDITION e IGNORE CONDITION no programa.",
          "Use RESP(WS-RESP) ao invés de HANDLE/IGNORE para controle mais explícito."
        ],
        tip: "SUPPRESSED indica que VOCÊ suprimiu a condição (via IGNORE/NOHANDLE). Use RESP() para melhor controle."
      }
    }
  ],

  /* ========================================================================
     CATEGORY 5 — JCL TIPS (4 entries - formato diferente)
     ======================================================================== */
  jclTips: [
    {
      id: "tip-dd",
      title: "Parâmetros DD Essenciais",
      content: "<dl>" +
        "<dt>DSN=</dt><dd>Nome do dataset (até 44 caracteres). Use <code>&amp;&amp;TEMP</code> para temporários e <code>*.stepname.ddname</code> para referência retroativa.</dd>" +
        "<dt>DISP=(status,normal,abend)</dt><dd><strong>status:</strong> NEW (criar), OLD (exclusivo), SHR (compartilhado), MOD (append). <strong>normal/abend:</strong> KEEP, DELETE, CATLG, UNCATLG, PASS.</dd>" +
        "<dt>SPACE=(unit,(prim,sec,dir))</dt><dd><strong>unit:</strong> TRK (trilhas), CYL (cilindros), bytes. <strong>prim:</strong> alocação primária. <strong>sec:</strong> secundária (até 15 extensões). <strong>dir:</strong> blocos de diretório para PDS.</dd>" +
        "<dt>DCB=(RECFM=,LRECL=,BLKSIZE=)</dt><dd><strong>RECFM:</strong> FB (fixo blocado), VB (variável blocado), FBA (fixo com ASA). <strong>LRECL:</strong> tamanho do registro lógico. <strong>BLKSIZE:</strong> tamanho do bloco (0 = sistema define).</dd>" +
        "<dt>UNIT= / VOL=SER=</dt><dd>Dispositivo (SYSDA para disco, TAPE para fita) e volume serial específico. Em ambientes SMS, geralmente gerenciado automaticamente.</dd>" +
        "<dt>SYSOUT=</dt><dd>Classe de saída para spool (impressão). <code>SYSOUT=*</code> usa a classe do MSGCLASS do JOB. <code>SYSOUT=A</code> especifica classe A.</dd>" +
        "</dl>"
    },
    {
      id: "tip-rc",
      title: "Return Codes e Tratamento de Erros",
      content: "<dl>" +
        "<dt>RC = 0</dt><dd>Execução bem-sucedida. Todas as operações completaram sem erros ou avisos.</dd>" +
        "<dt>RC = 4</dt><dd>Aviso (warning). O step executou com sucesso mas há alertas que devem ser revisados — ex: compilação com warnings.</dd>" +
        "<dt>RC = 8</dt><dd>Erro recuperável. Resultados podem estar incompletos ou com problemas. Investigar sysprint/sysout.</dd>" +
        "<dt>RC = 12</dt><dd>Erro severo. O step completou mas com falhas significativas. Resultados não são confiáveis.</dd>" +
        "<dt>RC = 16</dt><dd>Erro terminal. O step não conseguiu completar a operação principal. Requer correção imediata.</dd>" +
        "<dt>RC > 16</dt><dd>Erro crítico. Condição excepcional — geralmente indica abend controlado ou falha de sistema.</dd>" +
        "<dt>MAXCC</dt><dd>No JES2, MAXCC mostra o maior return code entre todos os steps. Verifique cada step individual para localizar o erro.</dd>" +
        "</dl>"
    },
    {
      id: "tip-util",
      title: "Utilitários z/OS Essenciais",
      content: "<dl>" +
        "<dt>IEBGENER</dt><dd>Cópia simples de datasets sequenciais. <code>SYSUT1</code> = entrada, <code>SYSUT2</code> = saída. Para cópia direta sem alteração, use <code>SYSIN DD DUMMY</code>.</dd>" +
        "<dt>IEBCOPY</dt><dd>Cópia, compressão e merge de PDSs (Partitioned Data Sets). Essencial para deploy de load modules e copybooks entre bibliotecas.</dd>" +
        "<dt>IEFBR14</dt><dd>Programa 'no-op' — não faz nada, mas executa o JCL. Usado para criar/deletar datasets via DISP=(NEW,CATLG) ou DISP=(OLD,DELETE).</dd>" +
        "<dt>IDCAMS</dt><dd>Utilitário multi-função para VSAM: DEFINE CLUSTER, DELETE, REPRO, PRINT, VERIFY, LISTCAT, ALTER. Indispensável para administração VSAM.</dd>" +
        "<dt>DFSORT / SYNCSORT</dt><dd>Classificação (SORT), merge e cópia de datasets. Suporta INCLUDE/OMIT (filtro), INREC/OUTREC (reformatação) e OUTFIL (múltiplas saídas).</dd>" +
        "<dt>IKJEFT01</dt><dd>Executor de comandos TSO em batch. Usado para executar REXX, CLIST, DSN (DB2) e outros comandos TSO dentro de um JCL.</dd>" +
        "</dl>"
    },
    {
      id: "tip-cond",
      title: "COND vs IF/THEN/ELSE — Execução Condicional",
      content: "<dl>" +
        "<dt>COND (legado)</dt><dd><code>COND=(4,LT)</code> significa: NÃO execute este step se 4 é MENOR QUE o return code de algum step anterior. Leitura invertida: o step é PULADO se a condição é verdadeira. <strong>Dica:</strong> <code>COND=(0,NE)</code> = execute somente se todos os steps anteriores retornaram 0.</dd>" +
        "<dt>COND com step</dt><dd><code>COND=(8,LE,STEP01)</code> = pule se 8 ≤ RC do STEP01. Permite testar return code de step específico.</dd>" +
        "<dt>COND=EVEN</dt><dd>Execute este step MESMO se um step anterior abendou. Útil para steps de cleanup e finalização.</dd>" +
        "<dt>COND=ONLY</dt><dd>Execute este step SOMENTE se um step anterior abendou. Ideal para tratamento de erro e notificação.</dd>" +
        "<dt>IF/THEN/ELSE (moderno)</dt><dd><code>// IF STEP01.RC &lt;= 4 THEN</code> — sintaxe direta e legível. Suporta AND, OR, NOT. <strong>Sempre prefira IF/THEN/ELSE sobre COND</strong> por clareza.</dd>" +
        "<dt>IF com ABEND</dt><dd><code>// IF STEP01.ABEND THEN</code> — testa se step específico abendou. Também aceita <code>ABENDCC</code> para testar o código do abend.</dd>" +
        "</dl>"
    }
  ]

};
