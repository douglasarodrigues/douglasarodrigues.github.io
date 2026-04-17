/* ==========================================================================
   LAB-PROGRAMS.JS - Catalogo dos 97 programas do Mainframe Lab
   Cada entrada: id, tech, name, desc, level, filename, tags, source
   ========================================================================== */

// eslint-disable-next-line no-unused-vars
const LAB_PROGRAMS = [

  // ========================================================================
  // COBOL (13 programas)
  // ========================================================================

  {
    id: "COB01001",
    tech: "cobol",
    name: "Formatador de Campos",
    desc: "Subprograma para LTRIM, RTRIM, LPAD, RPAD e CENTER de campos alfanuméricos via LINKAGE SECTION.",
    level: "basic",
    filename: "COBFMT01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBFMT01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : FORMATADOR DE CAMPOS ALFANUMERICOS
      *            OPERACOES: LTRIM, RTRIM, LPAD, RPAD, CENTER
      * INTERFACE: CALL 'COBFMT01' USING LS-OPERACAO
      *                                  LS-CAMPO-ENTRADA
      *                                  LS-CAMPO-SAIDA
      *                                  LS-CHAR-PAD
      *                                  LS-TAMANHO
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBFMT01.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-INDEX           PIC 9(04) COMP.
       01  WS-LENGTH          PIC 9(04) COMP.
       01  WS-START           PIC 9(04) COMP.
       01  WS-END             PIC 9(04) COMP.
       01  WS-PAD-COUNT       PIC 9(04) COMP.
       01  WS-TEMP            PIC X(256).

       LINKAGE SECTION.
       01  LS-OPERACAO        PIC X(06).
           88 LS-LTRIM        VALUE 'LTRIM '.
           88 LS-RTRIM        VALUE 'RTRIM '.
           88 LS-LPAD         VALUE 'LPAD  '.
           88 LS-RPAD         VALUE 'RPAD  '.
           88 LS-CENTER       VALUE 'CENTER'.
       01  LS-CAMPO-ENTRADA   PIC X(256).
       01  LS-CAMPO-SAIDA     PIC X(256).
       01  LS-CHAR-PAD        PIC X(01).
       01  LS-TAMANHO         PIC 9(04) COMP.

       PROCEDURE DIVISION USING LS-OPERACAO
                                LS-CAMPO-ENTRADA
                                LS-CAMPO-SAIDA
                                LS-CHAR-PAD
                                LS-TAMANHO.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           INITIALIZE LS-CAMPO-SAIDA
           MOVE FUNCTION LENGTH(LS-CAMPO-ENTRADA)
                                  TO WS-LENGTH
           EVALUATE TRUE
               WHEN LS-LTRIM     PERFORM 1000-LTRIM
               WHEN LS-RTRIM     PERFORM 2000-RTRIM
               WHEN LS-LPAD      PERFORM 3000-LPAD
               WHEN LS-RPAD      PERFORM 4000-RPAD
               WHEN LS-CENTER    PERFORM 5000-CENTER
           END-EVALUATE
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-LTRIM SECTION
      *==========================================================*
       1000-LTRIM SECTION.
           MOVE 1 TO WS-START
           INSPECT LS-CAMPO-ENTRADA TALLYING WS-START
                   FOR LEADING SPACES
           MOVE LS-CAMPO-ENTRADA(WS-START:) TO LS-CAMPO-SAIDA
           .
       1000-LTRIM-EXIT.
           EXIT.
      *==========================================================*
      * 2000-RTRIM SECTION
      *==========================================================*
       2000-RTRIM SECTION.
           MOVE LS-CAMPO-ENTRADA TO WS-TEMP
           MOVE FUNCTION LENGTH(FUNCTION TRIM(WS-TEMP
                TRAILING)) TO WS-END
           MOVE LS-CAMPO-ENTRADA(1:WS-END) TO LS-CAMPO-SAIDA
           .
       2000-RTRIM-EXIT.
           EXIT.
      *==========================================================*
      * 3000-LPAD SECTION
      *==========================================================*
       3000-LPAD SECTION.
           MOVE FUNCTION TRIM(LS-CAMPO-ENTRADA)
                TO WS-TEMP
           MOVE FUNCTION LENGTH(FUNCTION TRIM(WS-TEMP))
                TO WS-LENGTH
           COMPUTE WS-PAD-COUNT = LS-TAMANHO - WS-LENGTH
           IF WS-PAD-COUNT > 0
               MOVE ALL LS-CHAR-PAD TO LS-CAMPO-SAIDA
               MOVE WS-TEMP TO
                    LS-CAMPO-SAIDA(WS-PAD-COUNT + 1:WS-LENGTH)
           ELSE
               MOVE WS-TEMP TO LS-CAMPO-SAIDA
           END-IF
           .
       3000-LPAD-EXIT.
           EXIT.
      *==========================================================*
      * 4000-RPAD SECTION
      *==========================================================*
       4000-RPAD SECTION.
           MOVE FUNCTION TRIM(LS-CAMPO-ENTRADA)
                TO LS-CAMPO-SAIDA
           MOVE FUNCTION LENGTH(FUNCTION TRIM(LS-CAMPO-SAIDA))
                TO WS-LENGTH
           IF WS-LENGTH < LS-TAMANHO
               MOVE ALL LS-CHAR-PAD
                    TO LS-CAMPO-SAIDA(WS-LENGTH + 1:
                       LS-TAMANHO - WS-LENGTH)
           END-IF
           .
       4000-RPAD-EXIT.
           EXIT.
      *==========================================================*
      * 5000-CENTER SECTION
      *==========================================================*
       5000-CENTER SECTION.
           MOVE FUNCTION TRIM(LS-CAMPO-ENTRADA)
                TO WS-TEMP
           MOVE FUNCTION LENGTH(FUNCTION TRIM(WS-TEMP))
                TO WS-LENGTH
           COMPUTE WS-PAD-COUNT =
                   (LS-TAMANHO - WS-LENGTH) / 2
           MOVE ALL LS-CHAR-PAD TO LS-CAMPO-SAIDA
           MOVE WS-TEMP TO
                LS-CAMPO-SAIDA(WS-PAD-COUNT + 1:WS-LENGTH)
           .
       5000-CENTER-EXIT.
           EXIT.`
  },

  {
    id: "COB01002",
    tech: "cobol",
    name: "Conversor de Datas",
    desc: "Converte entre GREGORIANO, JULIANO, YYYY-MM-DD e CYYDDD com validação e dia da semana.",
    level: "intermediate",
    filename: "COBDAT01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBDAT01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONVERSOR DE DATAS MULTIFORMATO
      *            GREGORIANO <-> JULIANO <-> YYYY-MM-DD <-> CYYDDD
      * INTERFACE: CALL 'COBDAT01' USING LS-FUNCAO
      *                                  LS-DATA-ENTRADA
      *                                  LS-DATA-SAIDA
      *                                  LS-DIA-SEMANA
      *                                  LS-RETORNO
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBDAT01.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DATA-INT        PIC 9(08).
       01  WS-DATA-INT-R REDEFINES WS-DATA-INT.
           05 WS-ANO          PIC 9(04).
           05 WS-MES          PIC 9(02).
           05 WS-DIA          PIC 9(02).
       01  WS-JULIAN          PIC 9(07).
       01  WS-JULIAN-R REDEFINES WS-JULIAN.
           05 WS-JUL-ANO      PIC 9(04).
           05 WS-JUL-DDD      PIC 9(03).
       01  WS-CYYDDD          PIC 9(05).
       01  WS-CYYDDD-R REDEFINES WS-CYYDDD.
           05 WS-CYY-C        PIC 9(01).
           05 WS-CYY-AA       PIC 9(02).
           05 WS-CYY-DDD      PIC 9(03).
       01  WS-INTEGER-DATE    PIC 9(08) COMP.
       01  WS-DAY-OF-WEEK     PIC 9(01).
       01  WS-DIAS-MES.
           05 FILLER           PIC 9(02) VALUE 31.
           05 FILLER           PIC 9(02) VALUE 28.
           05 FILLER           PIC 9(02) VALUE 31.
           05 FILLER           PIC 9(02) VALUE 30.
           05 FILLER           PIC 9(02) VALUE 31.
           05 FILLER           PIC 9(02) VALUE 30.
           05 FILLER           PIC 9(02) VALUE 31.
           05 FILLER           PIC 9(02) VALUE 31.
           05 FILLER           PIC 9(02) VALUE 30.
           05 FILLER           PIC 9(02) VALUE 31.
           05 FILLER           PIC 9(02) VALUE 30.
           05 FILLER           PIC 9(02) VALUE 31.
       01  WS-DIAS-TAB REDEFINES WS-DIAS-MES.
           05 WS-MAX-DIA      PIC 9(02) OCCURS 12.
       01  WS-BISSEXTO        PIC 9(01).
           88 WS-EH-BISSEXTO  VALUE 1.
       01  WS-NOMES-DIA.
           05 FILLER PIC X(10) VALUE 'SEGUNDA   '.
           05 FILLER PIC X(10) VALUE 'TERCA     '.
           05 FILLER PIC X(10) VALUE 'QUARTA    '.
           05 FILLER PIC X(10) VALUE 'QUINTA    '.
           05 FILLER PIC X(10) VALUE 'SEXTA     '.
           05 FILLER PIC X(10) VALUE 'SABADO    '.
           05 FILLER PIC X(10) VALUE 'DOMINGO   '.
       01  WS-NOME-DIA-TAB REDEFINES WS-NOMES-DIA.
           05 WS-NOME-DIA     PIC X(10) OCCURS 7.

       LINKAGE SECTION.
       01  LS-FUNCAO          PIC X(08).
           88 LS-GREG-PARA-JUL VALUE 'GREGJUL '.
           88 LS-JUL-PARA-GREG VALUE 'JULGREG '.
           88 LS-GREG-PARA-ISO VALUE 'GREGISO '.
           88 LS-ISO-PARA-GREG VALUE 'ISOGREG '.
           88 LS-GREG-PARA-CYY VALUE 'GREGCYY '.
       01  LS-DATA-ENTRADA    PIC X(10).
       01  LS-DATA-SAIDA      PIC X(10).
       01  LS-DIA-SEMANA      PIC X(10).
       01  LS-RETORNO         PIC 9(02).

       PROCEDURE DIVISION USING LS-FUNCAO
                                LS-DATA-ENTRADA
                                LS-DATA-SAIDA
                                LS-DIA-SEMANA
                                LS-RETORNO.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE ZEROS TO LS-RETORNO
           EVALUATE TRUE
               WHEN LS-GREG-PARA-JUL PERFORM 1000-GREG-JUL
               WHEN LS-JUL-PARA-GREG PERFORM 2000-JUL-GREG
               WHEN LS-GREG-PARA-ISO PERFORM 3000-GREG-ISO
               WHEN LS-ISO-PARA-GREG PERFORM 4000-ISO-GREG
               WHEN LS-GREG-PARA-CYY PERFORM 5000-GREG-CYY
               WHEN OTHER            MOVE 99 TO LS-RETORNO
           END-EVALUATE
           IF LS-RETORNO = ZEROS
               PERFORM 8000-DIA-SEMANA
           END-IF
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-GREG-JUL SECTION
      *==========================================================*
       1000-GREG-JUL SECTION.
           MOVE LS-DATA-ENTRADA(1:8) TO WS-DATA-INT
           PERFORM 7000-VALIDAR
           IF LS-RETORNO = ZEROS
               COMPUTE WS-INTEGER-DATE =
                   FUNCTION INTEGER-OF-DATE(WS-DATA-INT)
               COMPUTE WS-JULIAN =
                   FUNCTION DAY-OF-INTEGER(WS-INTEGER-DATE)
               MOVE WS-JULIAN TO LS-DATA-SAIDA
           END-IF
           .
       1000-GREG-JUL-EXIT.
           EXIT.
      *==========================================================*
      * 2000-JUL-GREG SECTION
      *==========================================================*
       2000-JUL-GREG SECTION.
           MOVE LS-DATA-ENTRADA(1:7) TO WS-JULIAN
           COMPUTE WS-INTEGER-DATE =
               FUNCTION INTEGER-OF-DAY(WS-JULIAN)
           COMPUTE WS-DATA-INT =
               FUNCTION DATE-OF-INTEGER(WS-INTEGER-DATE)
           MOVE WS-DATA-INT TO LS-DATA-SAIDA
           .
       2000-JUL-GREG-EXIT.
           EXIT.
      *==========================================================*
      * 3000-GREG-ISO SECTION
      *==========================================================*
       3000-GREG-ISO SECTION.
           MOVE LS-DATA-ENTRADA(1:8) TO WS-DATA-INT
           PERFORM 7000-VALIDAR
           IF LS-RETORNO = ZEROS
               STRING WS-ANO '-' WS-MES '-' WS-DIA
                   DELIMITED SIZE INTO LS-DATA-SAIDA
           END-IF
           .
       3000-GREG-ISO-EXIT.
           EXIT.
      *==========================================================*
      * 4000-ISO-GREG SECTION
      *==========================================================*
       4000-ISO-GREG SECTION.
           MOVE LS-DATA-ENTRADA(1:4)  TO WS-ANO
           MOVE LS-DATA-ENTRADA(6:2)  TO WS-MES
           MOVE LS-DATA-ENTRADA(9:2)  TO WS-DIA
           MOVE WS-DATA-INT TO LS-DATA-SAIDA
           .
       4000-ISO-GREG-EXIT.
           EXIT.
      *==========================================================*
      * 5000-GREG-CYY SECTION
      *==========================================================*
       5000-GREG-CYY SECTION.
           MOVE LS-DATA-ENTRADA(1:8) TO WS-DATA-INT
           IF WS-ANO >= 2000
               COMPUTE WS-CYY-C = 1
               COMPUTE WS-CYY-AA = WS-ANO - 2000
           ELSE
               COMPUTE WS-CYY-C = 0
               COMPUTE WS-CYY-AA = WS-ANO - 1900
           END-IF
           COMPUTE WS-INTEGER-DATE =
               FUNCTION INTEGER-OF-DATE(WS-DATA-INT)
           COMPUTE WS-JULIAN =
               FUNCTION DAY-OF-INTEGER(WS-INTEGER-DATE)
           MOVE WS-JUL-DDD TO WS-CYY-DDD
           MOVE WS-CYYDDD TO LS-DATA-SAIDA
           .
       5000-GREG-CYY-EXIT.
           EXIT.
      *==========================================================*
      * 7000-VALIDAR SECTION
      *==========================================================*
       7000-VALIDAR SECTION.
           IF WS-MES < 1 OR WS-MES > 12
               MOVE 01 TO LS-RETORNO
           ELSE
               PERFORM 7500-VERIFICAR-BISSEXTO
               IF WS-EH-BISSEXTO AND WS-MES = 2
                   IF WS-DIA < 1 OR WS-DIA > 29
                       MOVE 02 TO LS-RETORNO
                   END-IF
               ELSE
                   IF WS-DIA < 1 OR
                      WS-DIA > WS-MAX-DIA(WS-MES)
                       MOVE 02 TO LS-RETORNO
                   END-IF
               END-IF
           END-IF
           .
       7000-VALIDAR-EXIT.
           EXIT.
      *==========================================================*
      * 7500-VERIFICAR-BISSEXTO SECTION
      *==========================================================*
       7500-VERIFICAR-BISSEXTO SECTION.
           MOVE 0 TO WS-BISSEXTO
           IF FUNCTION MOD(WS-ANO 4) = 0
               IF FUNCTION MOD(WS-ANO 100) NOT = 0
                  OR FUNCTION MOD(WS-ANO 400) = 0
                   MOVE 1 TO WS-BISSEXTO
               END-IF
           END-IF
           .
       7500-VERIFICAR-BISSEXTO-EXIT.
           EXIT.
      *==========================================================*
      * 8000-DIA-SEMANA SECTION
      *==========================================================*
       8000-DIA-SEMANA SECTION.
           MOVE WS-DATA-INT TO WS-DATA-INT
           ACCEPT WS-DAY-OF-WEEK FROM DAY-OF-WEEK
           IF WS-DAY-OF-WEEK >= 1 AND <= 7
               MOVE WS-NOME-DIA(WS-DAY-OF-WEEK)
                    TO LS-DIA-SEMANA
           END-IF
           .
       8000-DIA-SEMANA-EXIT.
           EXIT.`
  },

  {
    id: "COB01003",
    tech: "cobol",
    name: "Logger Estruturado",
    desc: "Grava log com timestamp, severidade e módulo de origem a arquivo sequencial.",
    level: "intermediate",
    filename: "COBLOG01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBLOG01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : LOGGER ESTRUTURADO COM TIMESTAMP E SEVERIDADE
      * INTERFACE: CALL 'COBLOG01' USING LS-ACAO
      *                                  LS-SEVERIDADE
      *                                  LS-MODULO
      *                                  LS-MENSAGEM
      *                                  LS-RETORNO
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBLOG01.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT LOG-FILE ASSIGN TO LOGFILE
               FILE STATUS IS WS-FILE-STATUS.

       DATA DIVISION.
       FILE SECTION.
       FD  LOG-FILE RECORDING MODE F.
       01  LOG-RECORD          PIC X(200).

       WORKING-STORAGE SECTION.
       01  WS-FILE-STATUS      PIC XX.
       01  WS-FILE-OPEN        PIC 9 VALUE 0.
           88 WS-IS-OPEN       VALUE 1.
       01  WS-TIMESTAMP.
           05 WS-TS-DATE       PIC X(10).
           05 FILLER           PIC X VALUE ' '.
           05 WS-TS-TIME       PIC X(08).
       01  WS-CURRENT-DATE.
           05 WS-CD-YYYY       PIC 9(04).
           05 WS-CD-MM         PIC 9(02).
           05 WS-CD-DD         PIC 9(02).
           05 WS-CD-HH         PIC 9(02).
           05 WS-CD-MN         PIC 9(02).
           05 WS-CD-SS         PIC 9(02).
           05 WS-CD-HS         PIC 9(02).
       01  WS-LOG-LINE.
           05 WS-LL-TIMESTAMP  PIC X(19).
           05 FILLER           PIC X VALUE '|'.
           05 WS-LL-SEVERITY   PIC X(08).
           05 FILLER           PIC X VALUE '|'.
           05 WS-LL-MODULE     PIC X(10).
           05 FILLER           PIC X VALUE '|'.
           05 WS-LL-MESSAGE    PIC X(160).
       01  WS-SEV-TABLE.
           05 FILLER PIC X(08) VALUE 'DEBUG   '.
           05 FILLER PIC X(08) VALUE 'INFO    '.
           05 FILLER PIC X(08) VALUE 'WARN    '.
           05 FILLER PIC X(08) VALUE 'ERROR   '.
           05 FILLER PIC X(08) VALUE 'FATAL   '.
       01  WS-SEV-TAB REDEFINES WS-SEV-TABLE.
           05 WS-SEV-ENTRY     PIC X(08) OCCURS 5.

       LINKAGE SECTION.
       01  LS-ACAO             PIC X(05).
           88 LS-OPEN          VALUE 'OPEN '.
           88 LS-WRITE         VALUE 'WRITE'.
           88 LS-CLOSE         VALUE 'CLOSE'.
       01  LS-SEVERIDADE       PIC 9(01).
       01  LS-MODULO           PIC X(10).
       01  LS-MENSAGEM         PIC X(160).
       01  LS-RETORNO          PIC 9(02).

       PROCEDURE DIVISION USING LS-ACAO
                                LS-SEVERIDADE
                                LS-MODULO
                                LS-MENSAGEM
                                LS-RETORNO.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE ZEROS TO LS-RETORNO
           EVALUATE TRUE
               WHEN LS-OPEN   PERFORM 1000-OPEN-LOG
               WHEN LS-WRITE  PERFORM 2000-WRITE-LOG
               WHEN LS-CLOSE  PERFORM 3000-CLOSE-LOG
               WHEN OTHER     MOVE 99 TO LS-RETORNO
           END-EVALUATE
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-OPEN-LOG SECTION
      *==========================================================*
       1000-OPEN-LOG SECTION.
           IF NOT WS-IS-OPEN
               OPEN EXTEND LOG-FILE
               IF WS-FILE-STATUS NOT = '00'
                   OPEN OUTPUT LOG-FILE
               END-IF
               IF WS-FILE-STATUS = '00'
                   MOVE 1 TO WS-FILE-OPEN
               ELSE
                   MOVE WS-FILE-STATUS TO LS-RETORNO
               END-IF
           END-IF
           .
       1000-OPEN-LOG-EXIT.
           EXIT.
      *==========================================================*
      * 2000-WRITE-LOG SECTION
      *==========================================================*
       2000-WRITE-LOG SECTION.
           IF NOT WS-IS-OPEN
               MOVE 90 TO LS-RETORNO
               GOBACK
           END-IF
           PERFORM 2100-BUILD-TIMESTAMP
           INITIALIZE WS-LOG-LINE
           MOVE WS-TIMESTAMP       TO WS-LL-TIMESTAMP
           IF LS-SEVERIDADE >= 1 AND <= 5
               MOVE WS-SEV-ENTRY(LS-SEVERIDADE)
                                   TO WS-LL-SEVERITY
           ELSE
               MOVE 'UNKNOWN ' TO WS-LL-SEVERITY
           END-IF
           MOVE LS-MODULO          TO WS-LL-MODULE
           MOVE LS-MENSAGEM        TO WS-LL-MESSAGE
           WRITE LOG-RECORD FROM WS-LOG-LINE
           IF WS-FILE-STATUS NOT = '00'
               MOVE WS-FILE-STATUS TO LS-RETORNO
           END-IF
           .
       2000-WRITE-LOG-EXIT.
           EXIT.
      *==========================================================*
      * 2100-BUILD-TIMESTAMP SECTION
      *==========================================================*
       2100-BUILD-TIMESTAMP SECTION.
           MOVE FUNCTION CURRENT-DATE TO WS-CURRENT-DATE
           STRING WS-CD-YYYY '-' WS-CD-MM '-' WS-CD-DD
               DELIMITED SIZE INTO WS-TS-DATE
           STRING WS-CD-HH ':' WS-CD-MN ':' WS-CD-SS
               DELIMITED SIZE INTO WS-TS-TIME
           .
       2100-BUILD-TIMESTAMP-EXIT.
           EXIT.
      *==========================================================*
      * 3000-CLOSE-LOG SECTION
      *==========================================================*
       3000-CLOSE-LOG SECTION.
           IF WS-IS-OPEN
               CLOSE LOG-FILE
               MOVE 0 TO WS-FILE-OPEN
           END-IF
           .
       3000-CLOSE-LOG-EXIT.
           EXIT.`
  },

  {
    id: "COB01004",
    tech: "cobol",
    name: "Parser CSV",
    desc: "Deparse uma linha CSV em campos individuais com delimitador configurável e suporte a campos entre aspas.",
    level: "intermediate",
    filename: "COBCSV01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBCSV01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : PARSER CSV COM DELIMITADOR CONFIGURAVEL
      *            SUPORTA CAMPOS ENTRE ASPAS E ESCAPE
      * INTERFACE: CALL 'COBCSV01' USING LS-LINHA-CSV
      *                                  LS-DELIMITADOR
      *                                  LS-CAMPOS
      *                                  LS-QTD-CAMPOS
      *                                  LS-RETORNO
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBCSV01.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-POS             PIC 9(04) COMP.
       01  WS-CAMPO-IDX       PIC 9(04) COMP.
       01  WS-CHAR            PIC X(01).
       01  WS-DENTRO-ASPAS    PIC 9(01).
           88 WS-EM-ASPAS     VALUE 1.
           88 WS-FORA-ASPAS   VALUE 0.
       01  WS-CAMPO-TEMP      PIC X(200).
       01  WS-CAMPO-POS       PIC 9(04) COMP.
       01  WS-LEN-LINHA       PIC 9(04) COMP.
       01  WS-MAX-CAMPOS      PIC 9(04) COMP VALUE 50.

       LINKAGE SECTION.
       01  LS-LINHA-CSV       PIC X(2000).
       01  LS-DELIMITADOR     PIC X(01).
       01  LS-CAMPOS.
           05 LS-CAMPO        PIC X(200) OCCURS 50.
       01  LS-QTD-CAMPOS      PIC 9(04) COMP.
       01  LS-RETORNO         PIC 9(02).

       PROCEDURE DIVISION USING LS-LINHA-CSV
                                LS-DELIMITADOR
                                LS-CAMPOS
                                LS-QTD-CAMPOS
                                LS-RETORNO.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE ZEROS TO LS-RETORNO
           MOVE ZEROS TO LS-QTD-CAMPOS
           INITIALIZE LS-CAMPOS
           MOVE FUNCTION LENGTH(
               FUNCTION TRIM(LS-LINHA-CSV TRAILING))
               TO WS-LEN-LINHA
           IF WS-LEN-LINHA = 0
               GOBACK
           END-IF
           MOVE 1 TO WS-POS
           MOVE 1 TO WS-CAMPO-IDX
           MOVE 1 TO WS-CAMPO-POS
           MOVE 0 TO WS-DENTRO-ASPAS
           INITIALIZE WS-CAMPO-TEMP
           PERFORM UNTIL WS-POS > WS-LEN-LINHA
               MOVE LS-LINHA-CSV(WS-POS:1) TO WS-CHAR
               EVALUATE TRUE
                   WHEN WS-CHAR = '"' AND WS-FORA-ASPAS
                       SET WS-EM-ASPAS TO TRUE
                   WHEN WS-CHAR = '"' AND WS-EM-ASPAS
                       SET WS-FORA-ASPAS TO TRUE
                   WHEN WS-CHAR = LS-DELIMITADOR
                        AND WS-FORA-ASPAS
                       PERFORM 1000-SALVAR-CAMPO
                   WHEN OTHER
                       MOVE WS-CHAR TO
                           WS-CAMPO-TEMP(WS-CAMPO-POS:1)
                       ADD 1 TO WS-CAMPO-POS
               END-EVALUATE
               ADD 1 TO WS-POS
           END-PERFORM
           PERFORM 1000-SALVAR-CAMPO
           MOVE WS-CAMPO-IDX TO LS-QTD-CAMPOS
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-SALVAR-CAMPO SECTION
      *==========================================================*
       1000-SALVAR-CAMPO SECTION.
           IF WS-CAMPO-IDX <= WS-MAX-CAMPOS
               MOVE WS-CAMPO-TEMP TO
                   LS-CAMPO(WS-CAMPO-IDX)
               ADD 1 TO WS-CAMPO-IDX
           ELSE
               MOVE 01 TO LS-RETORNO
           END-IF
           INITIALIZE WS-CAMPO-TEMP
           MOVE 1 TO WS-CAMPO-POS
           .
       1000-SALVAR-CAMPO-EXIT.
           EXIT.`
  },

  {
    id: "COB01005",
    tech: "cobol",
    name: "Interceptação Mestre-Trans",
    desc: "Match/merge master-transaction com operações I/O, sentinela HIGH-VALUES e relatório de exceções.",
    level: "advanced",
    filename: "COBCFG01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBCFG01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : LEITOR DE CONFIGURACAO - CARREGA PARES
      *            CHAVE-VALOR DE ARQUIVO SEQUENCIAL DE PARAMETROS
      *            PARA TABELA INTERNA PESQUISAVEL EM MEMORIA.
      * INTERFACE CALL:
      *   CALL 'COBCFG01' USING LS-CFG-ACAO
      *                         LS-CFG-CHAVE
      *                         LS-CFG-VALOR
      *                         LS-CFG-RETORNO
      * ACOES VALIDAS:
      *   CARGA  - CARREGA ARQUIVO DE CONFIGURACAO NA TABELA
      *   BUSCA  - PESQUISA VALOR POR CHAVE COM TRIM
      *   CONTAP - RETORNA QUANTIDADE DE ENTRADAS CARREGADAS
      * OBSERVACOES:
      *   - LINHAS EM BRANCO E COMENTARIOS (#) SAO IGNORADOS
      *   - SEPARADOR DE CHAVE/VALOR EN O CARACTERE '='
      *   - CAPACIDADE MAXIMA: 200 ENTRADAS
      *   - RETORNOS: 0=OK, 4=AVISO, 8=ERRO
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBCFG01.

       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SPECIAL-NAMES.
           DECIMAL-POINT IS COMMA.

       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-CONFIGURACAO ASSIGN TO CFGFILE
               FILE STATUS IS WS-ESTADO-ARQUIVO.

       DATA DIVISION.
       FILE SECTION.
       FD  ARQ-CONFIGURACAO
           RECORDING MODE IS F
           RECORD CONTAINS 80 CHARACTERS.
       01  REG-CONFIGURACAO    PIC X(80).

       WORKING-STORAGE SECTION.
       01  WS-ESTADO-ARQUIVO   PIC XX.

       01  WS-TABELA-CONFIGURACAO.
           05 WS-TOTAL-ENTRADAS PIC 9(03) COMP VALUE 0.
           05 WS-ENTRADA        OCCURS 200
                                INDEXED BY WS-IDX-BUSCA.
              10 WS-ENT-CHAVE   PIC X(30).
              10 WS-ENT-VALOR   PIC X(50).

       01  WS-REGISTRO-TRABALHO.
           05 WS-REG-CHAR1      PIC X(01).
           05 FILLER             PIC X(79).

       01  WS-POSICAO-IGUAL     PIC 9(03) COMP.
       01  WS-CHAVE-TEMP        PIC X(30).
       01  WS-VALOR-TEMP        PIC X(50).
       01  WS-LINHA-VAZIA       PIC X(80) VALUE SPACES.

       LINKAGE SECTION.
       01  LS-CFG-ACAO          PIC X(06).
           88 LS-ACAO-CARGA     VALUE 'CARGA '.
           88 LS-ACAO-BUSCA     VALUE 'BUSCA '.
           88 LS-ACAO-CONTAP    VALUE 'CONTAP'.
       01  LS-CFG-CHAVE         PIC X(30).
       01  LS-CFG-VALOR         PIC X(50).
       01  LS-CFG-RETORNO       PIC 9(02).

       PROCEDURE DIVISION USING LS-CFG-ACAO
                                LS-CFG-CHAVE
                                LS-CFG-VALOR
                                LS-CFG-RETORNO.
      *==========================================================*
      * 0000-PRINCIPAL SECTION
      *==========================================================*
       0000-PRINCIPAL SECTION.
           MOVE ZEROS TO LS-CFG-RETORNO
           EVALUATE TRUE
               WHEN LS-ACAO-CARGA
                   PERFORM 1000-CARREGAR-ARQUIVO
               WHEN LS-ACAO-BUSCA
                   PERFORM 2000-BUSCAR-CHAVE
               WHEN LS-ACAO-CONTAP
                   MOVE WS-TOTAL-ENTRADAS TO LS-CFG-VALOR
               WHEN OTHER
                   MOVE 08 TO LS-CFG-RETORNO
           END-EVALUATE
           GOBACK
           .
       0000-PRINCIPAL-EXIT.
           EXIT.
      *==========================================================*
      * 1000-CARREGAR-ARQUIVO SECTION
      *==========================================================*
       1000-CARREGAR-ARQUIVO SECTION.
           OPEN INPUT ARQ-CONFIGURACAO
           IF WS-ESTADO-ARQUIVO NOT = '00'
               MOVE 08 TO LS-CFG-RETORNO
               GOBACK
           END-IF
           MOVE ZEROS TO WS-TOTAL-ENTRADAS
           PERFORM UNTIL WS-ESTADO-ARQUIVO NOT = '00'
               READ ARQ-CONFIGURACAO
                   INTO WS-REGISTRO-TRABALHO
                   AT END EXIT PERFORM
               END-READ
               IF WS-REGISTRO-TRABALHO NOT = WS-LINHA-VAZIA
                  AND WS-REG-CHAR1 NOT = '#'
                   PERFORM 1100-PROCESSAR-LINHA
               END-IF
           END-PERFORM
           CLOSE ARQ-CONFIGURACAO
           .
       1000-CARREGAR-ARQUIVO-EXIT.
           EXIT.
      *==========================================================*
      * 1100-PROCESSAR-LINHA SECTION
      *==========================================================*
       1100-PROCESSAR-LINHA SECTION.
           MOVE ZERO TO WS-POSICAO-IGUAL
           INSPECT WS-REGISTRO-TRABALHO
               TALLYING WS-POSICAO-IGUAL
               FOR CHARACTERS BEFORE INITIAL '='
           IF WS-POSICAO-IGUAL > 0 AND < 80
               ADD 1 TO WS-TOTAL-ENTRADAS
               MOVE FUNCTION TRIM(
                   WS-REGISTRO-TRABALHO(1:WS-POSICAO-IGUAL))
                   TO WS-ENT-CHAVE(WS-TOTAL-ENTRADAS)
               ADD 1 TO WS-POSICAO-IGUAL
               MOVE FUNCTION TRIM(
                   WS-REGISTRO-TRABALHO(
                       WS-POSICAO-IGUAL + 1:))
                   TO WS-ENT-VALOR(WS-TOTAL-ENTRADAS)
           END-IF
           .
       1100-PROCESSAR-LINHA-EXIT.
           EXIT.
      *==========================================================*
      * 2000-BUSCAR-CHAVE SECTION
      *==========================================================*
       2000-BUSCAR-CHAVE SECTION.
           MOVE FUNCTION UPPER-CASE(
               FUNCTION TRIM(LS-CFG-CHAVE))
               TO WS-CHAVE-TEMP
           SET WS-IDX-BUSCA TO 1
           SEARCH WS-ENTRADA
               AT END
                   MOVE 04 TO LS-CFG-RETORNO
                   MOVE SPACES TO LS-CFG-VALOR
               WHEN FUNCTION UPPER-CASE(
                   FUNCTION TRIM(
                       WS-ENT-CHAVE(WS-IDX-BUSCA)))
                   = WS-CHAVE-TEMP
                   MOVE WS-ENT-VALOR(WS-IDX-BUSCA)
                       TO LS-CFG-VALOR
           END-SEARCH
           .
       2000-BUSCAR-CHAVE-EXIT.
           EXIT.`
  },

  {
    id: "COB01006",
    tech: "cobol",
    name: "Mascaramento de Dados",
    desc: "Mascara campos sensíveis com estratégias TOTAL, PARCIAL, HASH, EMAIL e TELEFONE.",
    level: "advanced",
    filename: "COBMSK01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBMSK01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : MASCARAMENTO DE DADOS SENSIVEIS (LGPD)
      *            ESTRATEGIAS: TOTAL, PARCIAL, HASH, EMAIL, FONE
      * INTERFACE: CALL 'COBMSK01' USING LS-ESTRATEGIA
      *                                  LS-DADO-ORIGINAL
      *                                  LS-DADO-MASCARADO
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBMSK01.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-LEN              PIC 9(04) COMP.
       01  WS-POS              PIC 9(04) COMP.
       01  WS-ARROBA-POS       PIC 9(04) COMP.
       01  WS-HASH-ACUM        PIC 9(10) COMP.
       01  WS-HASH-STR         PIC X(10).
       01  WS-CHAR             PIC X(01).
       01  WS-VISIVEL          PIC 9(04) COMP.

       LINKAGE SECTION.
       01  LS-ESTRATEGIA       PIC X(08).
           88 LS-TOTAL         VALUE 'TOTAL   '.
           88 LS-PARCIAL       VALUE 'PARCIAL '.
           88 LS-HASH          VALUE 'HASH    '.
           88 LS-EMAIL         VALUE 'EMAIL   '.
           88 LS-FONE          VALUE 'FONE    '.
       01  LS-DADO-ORIGINAL    PIC X(100).
       01  LS-DADO-MASCARADO   PIC X(100).

       PROCEDURE DIVISION USING LS-ESTRATEGIA
                                LS-DADO-ORIGINAL
                                LS-DADO-MASCARADO.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE FUNCTION LENGTH(
               FUNCTION TRIM(LS-DADO-ORIGINAL TRAILING))
               TO WS-LEN
           INITIALIZE LS-DADO-MASCARADO
           EVALUATE TRUE
               WHEN LS-TOTAL   PERFORM 1000-MASK-TOTAL
               WHEN LS-PARCIAL PERFORM 2000-MASK-PARCIAL
               WHEN LS-HASH    PERFORM 3000-MASK-HASH
               WHEN LS-EMAIL   PERFORM 4000-MASK-EMAIL
               WHEN LS-FONE    PERFORM 5000-MASK-FONE
           END-EVALUATE
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-MASK-TOTAL SECTION
      *==========================================================*
       1000-MASK-TOTAL SECTION.
           MOVE ALL '*' TO LS-DADO-MASCARADO(1:WS-LEN)
           .
       1000-MASK-TOTAL-EXIT.
           EXIT.
      *==========================================================*
      * 2000-MASK-PARCIAL SECTION
      *==========================================================*
       2000-MASK-PARCIAL SECTION.
           MOVE LS-DADO-ORIGINAL TO LS-DADO-MASCARADO
           COMPUTE WS-VISIVEL = WS-LEN / 4
           IF WS-VISIVEL < 2
               MOVE 2 TO WS-VISIVEL
           END-IF
           PERFORM VARYING WS-POS
               FROM WS-VISIVEL + 1 BY 1
               UNTIL WS-POS > WS-LEN - WS-VISIVEL
               MOVE '*' TO LS-DADO-MASCARADO(WS-POS:1)
           END-PERFORM
           .
       2000-MASK-PARCIAL-EXIT.
           EXIT.
      *==========================================================*
      * 3000-MASK-HASH SECTION
      *==========================================================*
       3000-MASK-HASH SECTION.
           MOVE ZEROS TO WS-HASH-ACUM
           PERFORM VARYING WS-POS FROM 1 BY 1
               UNTIL WS-POS > WS-LEN
               MOVE LS-DADO-ORIGINAL(WS-POS:1)
                   TO WS-CHAR
               COMPUTE WS-HASH-ACUM =
                   WS-HASH-ACUM * 31 +
                   FUNCTION ORD(WS-CHAR)
               IF WS-HASH-ACUM > 999999999
                   COMPUTE WS-HASH-ACUM =
                       FUNCTION MOD(WS-HASH-ACUM
                                    999999999)
               END-IF
           END-PERFORM
           MOVE WS-HASH-ACUM TO WS-HASH-STR
           STRING 'HASH:' WS-HASH-STR
               DELIMITED SIZE INTO LS-DADO-MASCARADO
           .
       3000-MASK-HASH-EXIT.
           EXIT.
      *==========================================================*
      * 4000-MASK-EMAIL SECTION
      *==========================================================*
       4000-MASK-EMAIL SECTION.
           MOVE ZEROS TO WS-ARROBA-POS
           INSPECT LS-DADO-ORIGINAL
               TALLYING WS-ARROBA-POS
               FOR CHARACTERS BEFORE INITIAL '@'
           IF WS-ARROBA-POS > 0
               MOVE LS-DADO-ORIGINAL(1:1)
                   TO LS-DADO-MASCARADO(1:1)
               MOVE ALL '*'
                   TO LS-DADO-MASCARADO(2:WS-ARROBA-POS - 1)
               MOVE LS-DADO-ORIGINAL(
                   WS-ARROBA-POS + 1:)
                   TO LS-DADO-MASCARADO(
                       WS-ARROBA-POS + 1:)
           END-IF
           .
       4000-MASK-EMAIL-EXIT.
           EXIT.
      *==========================================================*
      * 5000-MASK-FONE SECTION
      *==========================================================*
       5000-MASK-FONE SECTION.
           MOVE LS-DADO-ORIGINAL TO LS-DADO-MASCARADO
           IF WS-LEN >= 8
               MOVE ALL '*'
                   TO LS-DADO-MASCARADO(1:WS-LEN - 4)
           END-IF
           .
       5000-MASK-FONE-EXIT.
           EXIT.`
  },

  {
    id: "COB01007",
    tech: "cobol",
    name: "Ordenação e Intercalação",
    desc: "SORT com INPUT/OUTPUT PROCEDURE, validação de registros e remoção de duplicatas por chave.",
    level: "advanced",
    filename: "COBSRT01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBSRT01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : SORT COM INPUT/OUTPUT PROCEDURE
      *            VALIDA REGISTROS NA ENTRADA, REMOVE DUPLICATAS
      *            NA SAIDA POR CHAVE PRIMARIA
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBSRT01.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-ENTRADA ASSIGN TO ENTRADA
               FILE STATUS IS WS-FS-ENT.
           SELECT ARQ-SAIDA ASSIGN TO SAIDA
               FILE STATUS IS WS-FS-SAI.
           SELECT ARQ-SORT ASSIGN TO SORTWORK.

       DATA DIVISION.
       FILE SECTION.
       FD  ARQ-ENTRADA.
       01  REG-ENTRADA.
           05 RE-CHAVE         PIC X(10).
           05 RE-TIPO          PIC X(01).
           05 RE-VALOR         PIC 9(09)V99.
           05 RE-DESCRICAO     PIC X(58).
       SD  ARQ-SORT.
       01  REG-SORT.
           05 RS-CHAVE         PIC X(10).
           05 RS-TIPO          PIC X(01).
           05 RS-VALOR         PIC 9(09)V99.
           05 RS-DESCRICAO     PIC X(58).
       FD  ARQ-SAIDA.
       01  REG-SAIDA           PIC X(80).

       WORKING-STORAGE SECTION.
       01  WS-FS-ENT           PIC XX.
       01  WS-FS-SAI           PIC XX.
       01  WS-EOF              PIC 9 VALUE 0.
       01  WS-LIDOS            PIC 9(07) COMP VALUE 0.
       01  WS-REJEITADOS       PIC 9(07) COMP VALUE 0.
       01  WS-GRAVADOS         PIC 9(07) COMP VALUE 0.
       01  WS-DUPLICATAS       PIC 9(07) COMP VALUE 0.
       01  WS-CHAVE-ANT        PIC X(10) VALUE LOW-VALUES.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-PRINCIPAL SECTION
      *==========================================================*
       0000-PRINCIPAL SECTION.
           SORT ARQ-SORT
               ON ASCENDING KEY RS-CHAVE
               INPUT PROCEDURE IS 1000-INPUT-PROC
               OUTPUT PROCEDURE IS 2000-OUTPUT-PROC
           DISPLAY 'COBSRT01 - REGISTROS LIDOS:     '
                   WS-LIDOS
           DISPLAY 'COBSRT01 - REJEITADOS:           '
                   WS-REJEITADOS
           DISPLAY 'COBSRT01 - DUPLICATAS REMOVIDAS: '
                   WS-DUPLICATAS
           DISPLAY 'COBSRT01 - GRAVADOS NA SAIDA:   '
                   WS-GRAVADOS
           STOP RUN
           .
       0000-PRINCIPAL-EXIT.
           EXIT.
      *==========================================================*
      * 1000-INPUT-PROC SECTION
      *==========================================================*
       1000-INPUT-PROC SECTION.
           OPEN INPUT ARQ-ENTRADA
           IF WS-FS-ENT NOT = '00'
               DISPLAY 'ERRO OPEN ENTRADA: ' WS-FS-ENT
               STOP RUN
           END-IF
           PERFORM UNTIL WS-EOF = 1
               READ ARQ-ENTRADA
                   AT END MOVE 1 TO WS-EOF
               END-READ
               IF WS-EOF = 0
                   ADD 1 TO WS-LIDOS
                   IF RE-CHAVE NOT = SPACES AND
                      RE-TIPO = 'C' OR 'D' OR 'T'
                       MOVE REG-ENTRADA TO REG-SORT
                       RELEASE REG-SORT
                   ELSE
                       ADD 1 TO WS-REJEITADOS
                   END-IF
               END-IF
           END-PERFORM
           CLOSE ARQ-ENTRADA
           .
       1000-INPUT-PROC-EXIT.
           EXIT.
      *==========================================================*
      * 2000-OUTPUT-PROC SECTION
      *==========================================================*
       2000-OUTPUT-PROC SECTION.
           OPEN OUTPUT ARQ-SAIDA
           IF WS-FS-SAI NOT = '00'
               DISPLAY 'ERRO OPEN SAIDA: ' WS-FS-SAI
               STOP RUN
           END-IF
           PERFORM UNTIL EXIT
               RETURN ARQ-SORT
                   AT END EXIT PERFORM
               END-RETURN
               IF RS-CHAVE = WS-CHAVE-ANT
                   ADD 1 TO WS-DUPLICATAS
               ELSE
                   WRITE REG-SAIDA FROM REG-SORT
                   ADD 1 TO WS-GRAVADOS
                   MOVE RS-CHAVE TO WS-CHAVE-ANT
               END-IF
           END-PERFORM
           CLOSE ARQ-SAIDA
           .
       2000-OUTPUT-PROC-EXIT.
           EXIT.`
  },

  {
    id: "COB01008",
    tech: "cobol",
    name: "Relatório com Quebra",
    desc: "Control break em 3 níveis (filial/depto/func) com subtotais, cabeçalho de página e ASA.",
    level: "advanced",
    filename: "COBRPT01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBRPT01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : RELATORIO COM CONTROL BREAK EM 3 NIVEIS
      *            FILIAL > DEPARTAMENTO > FUNCIONARIO
      *            SUBTOTAIS POR NIVEL + TOTAL GERAL
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBRPT01.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-ENTRADA ASSIGN TO ENTRADA
               FILE STATUS IS WS-FS-ENT.
           SELECT ARQ-RELATORIO ASSIGN TO RELAT
               FILE STATUS IS WS-FS-REL.

       DATA DIVISION.
       FILE SECTION.
       FD  ARQ-ENTRADA.
       01  REG-ENTRADA.
           05 RE-FILIAL        PIC X(04).
           05 RE-DEPTO         PIC X(06).
           05 RE-FUNC          PIC X(30).
           05 RE-VALOR         PIC 9(07)V99.
           05 FILLER           PIC X(33).
       FD  ARQ-RELATORIO.
       01  REG-RELATORIO       PIC X(132).

       WORKING-STORAGE SECTION.
       01  WS-FS-ENT           PIC XX.
       01  WS-FS-REL           PIC XX.
       01  WS-EOF              PIC 9 VALUE 0.
       01  WS-PAGINA           PIC 9(04) VALUE 0.
       01  WS-LINHAS           PIC 9(02) VALUE 99.
       01  WS-MAX-LINHAS       PIC 9(02) VALUE 55.
       01  WS-FILIAL-ANT       PIC X(04) VALUE LOW-VALUES.
       01  WS-DEPTO-ANT        PIC X(06) VALUE LOW-VALUES.
       01  WS-TOT-FUNC         PIC 9(09)V99 VALUE 0.
       01  WS-TOT-DEPTO        PIC 9(09)V99 VALUE 0.
       01  WS-TOT-FILIAL       PIC 9(09)V99 VALUE 0.
       01  WS-TOT-GERAL        PIC 9(11)V99 VALUE 0.
       01  WS-CABECALHO-1.
           05 FILLER PIC X(01) VALUE '1'.
           05 FILLER PIC X(50)
              VALUE 'RELATORIO DE VALORES POR FILIAL/DEPTO'.
           05 FILLER PIC X(60) VALUE SPACES.
           05 FILLER PIC X(07) VALUE 'PAGINA '.
           05 WS-CB1-PAG PIC Z.ZZ9.
       01  WS-CABECALHO-2.
           05 FILLER PIC X(01) VALUE ' '.
           05 FILLER PIC X(04) VALUE 'FIL '.
           05 FILLER PIC X(08) VALUE 'DEPTO   '.
           05 FILLER PIC X(32) VALUE 'FUNCIONARIO'.
           05 FILLER PIC X(15) VALUE '        VALOR'.
       01  WS-DETALHE.
           05 FILLER           PIC X(01) VALUE ' '.
           05 WS-DET-FIL       PIC X(04).
           05 FILLER           PIC X(01) VALUE ' '.
           05 WS-DET-DEPTO     PIC X(06).
           05 FILLER           PIC X(02) VALUE SPACES.
           05 WS-DET-FUNC      PIC X(30).
           05 FILLER           PIC X(02) VALUE SPACES.
           05 WS-DET-VALOR     PIC ZZZ.ZZZ.ZZ9,99.
       01  WS-SUBTOTAL.
           05 FILLER           PIC X(01) VALUE ' '.
           05 WS-SUB-LABEL     PIC X(40).
           05 WS-SUB-VALOR     PIC ZZZ.ZZZ.ZZ9,99.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           OPEN INPUT ARQ-ENTRADA OUTPUT ARQ-RELATORIO
           READ ARQ-ENTRADA AT END MOVE 1 TO WS-EOF
           PERFORM UNTIL WS-EOF = 1
               IF WS-LINHAS >= WS-MAX-LINHAS
                   PERFORM 1000-CABECALHO
               END-IF
               IF RE-FILIAL NOT = WS-FILIAL-ANT
                  AND WS-FILIAL-ANT NOT = LOW-VALUES
                   PERFORM 3000-QUEBRA-FILIAL
               END-IF
               IF RE-DEPTO NOT = WS-DEPTO-ANT
                  AND WS-DEPTO-ANT NOT = LOW-VALUES
                   PERFORM 2000-QUEBRA-DEPTO
               END-IF
               MOVE RE-FILIAL TO WS-DET-FIL
                                 WS-FILIAL-ANT
               MOVE RE-DEPTO  TO WS-DET-DEPTO
                                 WS-DEPTO-ANT
               MOVE RE-FUNC   TO WS-DET-FUNC
               MOVE RE-VALOR  TO WS-DET-VALOR
               WRITE REG-RELATORIO FROM WS-DETALHE
               ADD RE-VALOR TO WS-TOT-DEPTO
                               WS-TOT-FILIAL
                               WS-TOT-GERAL
               ADD 1 TO WS-LINHAS
               READ ARQ-ENTRADA AT END MOVE 1 TO WS-EOF
           END-PERFORM
           IF WS-DEPTO-ANT NOT = LOW-VALUES
               PERFORM 2000-QUEBRA-DEPTO
               PERFORM 3000-QUEBRA-FILIAL
           END-IF
           MOVE '*** TOTAL GERAL ***' TO WS-SUB-LABEL
           MOVE WS-TOT-GERAL TO WS-SUB-VALOR
           WRITE REG-RELATORIO FROM WS-SUBTOTAL
           CLOSE ARQ-ENTRADA ARQ-RELATORIO
           STOP RUN
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-CABECALHO SECTION
      *==========================================================*
       1000-CABECALHO SECTION.
           ADD 1 TO WS-PAGINA
           MOVE WS-PAGINA TO WS-CB1-PAG
           WRITE REG-RELATORIO FROM WS-CABECALHO-1
           WRITE REG-RELATORIO FROM WS-CABECALHO-2
           MOVE 3 TO WS-LINHAS
           .
       1000-CABECALHO-EXIT.
           EXIT.
      *==========================================================*
      * 2000-QUEBRA-DEPTO SECTION
      *==========================================================*
       2000-QUEBRA-DEPTO SECTION.
           MOVE SPACES TO WS-SUB-LABEL
           STRING '  TOTAL DEPTO ' WS-DEPTO-ANT
               DELIMITED SIZE INTO WS-SUB-LABEL
           MOVE WS-TOT-DEPTO TO WS-SUB-VALOR
           WRITE REG-RELATORIO FROM WS-SUBTOTAL
           MOVE ZEROS TO WS-TOT-DEPTO
           ADD 1 TO WS-LINHAS
           .
       2000-QUEBRA-DEPTO-EXIT.
           EXIT.
      *==========================================================*
      * 3000-QUEBRA-FILIAL SECTION
      *==========================================================*
       3000-QUEBRA-FILIAL SECTION.
           MOVE SPACES TO WS-SUB-LABEL
           STRING ' TOTAL FILIAL ' WS-FILIAL-ANT
               DELIMITED SIZE INTO WS-SUB-LABEL
           MOVE WS-TOT-FILIAL TO WS-SUB-VALOR
           WRITE REG-RELATORIO FROM WS-SUBTOTAL
           MOVE ZEROS TO WS-TOT-FILIAL
           ADD 2 TO WS-LINHAS
           .
       3000-QUEBRA-FILIAL-EXIT.
           EXIT.`
  },

  {
    id: "COB01009",
    tech: "cobol",
    name: "Gerenciador de Tabelas",
    desc: "Tabela interna com SEARCH ALL (binária) e SEARCH sequencial, inserção e remoção com manutenção de ordem.",
    level: "advanced",
    filename: "COBTBL01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBTBL01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : GERENCIADOR DE TABELA INTERNA EM MEMORIA
      *            SEARCH ALL (BINARIA) E SEARCH SEQUENCIAL
      *            INSERCAO ORDENADA E REMOCAO COM SHIFT
      * INTERFACE: CALL 'COBTBL01' USING LS-ACAO
      *                                  LS-CHAVE
      *                                  LS-VALOR
      *                                  LS-RETORNO
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBTBL01.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-MAX-ENTRADAS     PIC 9(04) COMP VALUE 500.
       01  WS-TOTAL            PIC 9(04) COMP VALUE 0.
       01  WS-TABELA.
           05 WS-ENTRY OCCURS 500
              ASCENDING KEY IS WS-TBL-CHAVE
              INDEXED BY WS-IDX.
              10 WS-TBL-CHAVE  PIC X(20).
              10 WS-TBL-VALOR  PIC X(50).
       01  WS-POS-INSERT       PIC 9(04) COMP.
       01  WS-I                PIC 9(04) COMP.

       LINKAGE SECTION.
       01  LS-ACAO             PIC X(06).
           88 LS-INSERT        VALUE 'INSERT'.
           88 LS-DELETE        VALUE 'DELETE'.
           88 LS-SEARCH        VALUE 'SEARCH'.
           88 LS-SCAN          VALUE 'SCAN  '.
           88 LS-COUNT         VALUE 'COUNT '.
       01  LS-CHAVE            PIC X(20).
       01  LS-VALOR            PIC X(50).
       01  LS-RETORNO          PIC 9(02).

       PROCEDURE DIVISION USING LS-ACAO LS-CHAVE
                                LS-VALOR LS-RETORNO.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE ZEROS TO LS-RETORNO
           EVALUATE TRUE
               WHEN LS-INSERT PERFORM 1000-INSERIR
               WHEN LS-DELETE PERFORM 2000-REMOVER
               WHEN LS-SEARCH PERFORM 3000-BUSCA-BINARIA
               WHEN LS-SCAN   PERFORM 4000-BUSCA-SEQUENCIAL
               WHEN LS-COUNT  MOVE WS-TOTAL TO LS-VALOR
               WHEN OTHER     MOVE 99 TO LS-RETORNO
           END-EVALUATE
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-INSERIR SECTION
      *==========================================================*
       1000-INSERIR SECTION.
           IF WS-TOTAL >= WS-MAX-ENTRADAS
               MOVE 08 TO LS-RETORNO
               GOBACK
           END-IF
           PERFORM 1100-ENCONTRAR-POSICAO
           PERFORM VARYING WS-I
               FROM WS-TOTAL BY -1
               UNTIL WS-I < WS-POS-INSERT
               MOVE WS-ENTRY(WS-I)
                   TO WS-ENTRY(WS-I + 1)
           END-PERFORM
           MOVE LS-CHAVE TO WS-TBL-CHAVE(WS-POS-INSERT)
           MOVE LS-VALOR TO WS-TBL-VALOR(WS-POS-INSERT)
           ADD 1 TO WS-TOTAL
           .
       1000-INSERIR-EXIT.
           EXIT.
      *==========================================================*
      * 1100-ENCONTRAR-POSICAO SECTION
      *==========================================================*
       1100-ENCONTRAR-POSICAO SECTION.
           MOVE 1 TO WS-POS-INSERT
           PERFORM VARYING WS-I FROM 1 BY 1
               UNTIL WS-I > WS-TOTAL
               IF LS-CHAVE < WS-TBL-CHAVE(WS-I)
                   MOVE WS-I TO WS-POS-INSERT
                   EXIT PERFORM
               END-IF
               MOVE WS-I TO WS-POS-INSERT
               ADD 1 TO WS-POS-INSERT
           END-PERFORM
           .
       1100-ENCONTRAR-POSICAO-EXIT.
           EXIT.
      *==========================================================*
      * 2000-REMOVER SECTION
      *==========================================================*
       2000-REMOVER SECTION.
           PERFORM 3000-BUSCA-BINARIA
           IF LS-RETORNO NOT = ZEROS
               GOBACK
           END-IF
           SET WS-I TO WS-IDX
           PERFORM VARYING WS-I FROM WS-I BY 1
               UNTIL WS-I >= WS-TOTAL
               MOVE WS-ENTRY(WS-I + 1)
                   TO WS-ENTRY(WS-I)
           END-PERFORM
           INITIALIZE WS-ENTRY(WS-TOTAL)
           SUBTRACT 1 FROM WS-TOTAL
           .
       2000-REMOVER-EXIT.
           EXIT.
      *==========================================================*
      * 3000-BUSCA-BINARIA SECTION
      *==========================================================*
       3000-BUSCA-BINARIA SECTION.
           IF WS-TOTAL = 0
               MOVE 04 TO LS-RETORNO
               GOBACK
           END-IF
           SET WS-IDX TO 1
           SEARCH ALL WS-ENTRY
               AT END
                   MOVE 04 TO LS-RETORNO
               WHEN WS-TBL-CHAVE(WS-IDX) = LS-CHAVE
                   MOVE WS-TBL-VALOR(WS-IDX)
                       TO LS-VALOR
           END-SEARCH
           .
       3000-BUSCA-BINARIA-EXIT.
           EXIT.
      *==========================================================*
      * 4000-BUSCA-SEQUENCIAL SECTION
      *==========================================================*
       4000-BUSCA-SEQUENCIAL SECTION.
           SET WS-IDX TO 1
           SEARCH WS-ENTRY
               AT END
                   MOVE 04 TO LS-RETORNO
               WHEN WS-TBL-VALOR(WS-IDX)(1:
                   FUNCTION LENGTH(
                       FUNCTION TRIM(LS-VALOR)))
                   = FUNCTION TRIM(LS-VALOR)
                   MOVE WS-TBL-CHAVE(WS-IDX)
                       TO LS-CHAVE
           END-SEARCH
           .
       4000-BUSCA-SEQUENCIAL-EXIT.
           EXIT.`
  },

  {
    id: "COB01010",
    tech: "cobol",
    name: "Conversor Numérico",
    desc: "Converte números para extenso em português, formata moeda (R$), calcula porcentagem e arredonda.",
    level: "intermediate",
    filename: "COBNUM01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBNUM01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONVERSOR NUMERICO - EXTENSO PT-BR, MOEDA,
      *            PORCENTAGEM E ARREDONDAMENTO
      * INTERFACE: CALL 'COBNUM01' USING LS-FUNCAO
      *                                  LS-NUMERO
      *                                  LS-RESULTADO
      *                                  LS-CASAS-DEC
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBNUM01.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-UNIDADES.
           05 FILLER PIC X(15) VALUE 'ZERO           '.
           05 FILLER PIC X(15) VALUE 'UM             '.
           05 FILLER PIC X(15) VALUE 'DOIS           '.
           05 FILLER PIC X(15) VALUE 'TRES           '.
           05 FILLER PIC X(15) VALUE 'QUATRO         '.
           05 FILLER PIC X(15) VALUE 'CINCO          '.
           05 FILLER PIC X(15) VALUE 'SEIS           '.
           05 FILLER PIC X(15) VALUE 'SETE           '.
           05 FILLER PIC X(15) VALUE 'OITO           '.
           05 FILLER PIC X(15) VALUE 'NOVE           '.
       01  WS-UNI-TAB REDEFINES WS-UNIDADES.
           05 WS-UNI           PIC X(15) OCCURS 10.
       01  WS-DEZENAS.
           05 FILLER PIC X(15) VALUE 'DEZ            '.
           05 FILLER PIC X(15) VALUE 'VINTE          '.
           05 FILLER PIC X(15) VALUE 'TRINTA         '.
           05 FILLER PIC X(15) VALUE 'QUARENTA       '.
           05 FILLER PIC X(15) VALUE 'CINQUENTA      '.
           05 FILLER PIC X(15) VALUE 'SESSENTA       '.
           05 FILLER PIC X(15) VALUE 'SETENTA        '.
           05 FILLER PIC X(15) VALUE 'OITENTA        '.
           05 FILLER PIC X(15) VALUE 'NOVENTA        '.
       01  WS-DEZ-TAB REDEFINES WS-DEZENAS.
           05 WS-DEZ           PIC X(15) OCCURS 9.
       01  WS-CENTENAS.
           05 FILLER PIC X(15) VALUE 'CENTO          '.
           05 FILLER PIC X(15) VALUE 'DUZENTOS       '.
           05 FILLER PIC X(15) VALUE 'TREZENTOS      '.
           05 FILLER PIC X(15) VALUE 'QUATROCENTOS   '.
           05 FILLER PIC X(15) VALUE 'QUINHENTOS     '.
           05 FILLER PIC X(15) VALUE 'SEISCENTOS     '.
           05 FILLER PIC X(15) VALUE 'SETECENTOS     '.
           05 FILLER PIC X(15) VALUE 'OITOCENTOS     '.
           05 FILLER PIC X(15) VALUE 'NOVECENTOS     '.
       01  WS-CEN-TAB REDEFINES WS-CENTENAS.
           05 WS-CEN           PIC X(15) OCCURS 9.
       01  WS-NUMERO-INT       PIC 9(09) COMP.
       01  WS-CENTENA          PIC 9(01).
       01  WS-DEZENA           PIC 9(01).
       01  WS-UNIDADE          PIC 9(01).
       01  WS-GRUPO            PIC 9(03).
       01  WS-RESULTADO-TEMP   PIC X(200).
       01  WS-MOEDA-FMT        PIC $$$.$$$.$$$,99.
       01  WS-NUM-EDIT         PIC 9(09)V99.

       LINKAGE SECTION.
       01  LS-FUNCAO           PIC X(06).
           88 LS-EXTENSO       VALUE 'EXTENS'.
           88 LS-MOEDA         VALUE 'MOEDA '.
           88 LS-PORCNT        VALUE 'PORCNT'.
           88 LS-REDOND        VALUE 'REDOND'.
       01  LS-NUMERO           PIC 9(09)V99.
       01  LS-RESULTADO        PIC X(200).
       01  LS-CASAS-DEC        PIC 9(01).

       PROCEDURE DIVISION USING LS-FUNCAO LS-NUMERO
                                LS-RESULTADO LS-CASAS-DEC.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           INITIALIZE LS-RESULTADO
           EVALUATE TRUE
               WHEN LS-EXTENSO  PERFORM 1000-EXTENSO
               WHEN LS-MOEDA    PERFORM 2000-MOEDA
               WHEN LS-PORCNT   PERFORM 3000-PORCENTAGEM
               WHEN LS-REDOND   PERFORM 4000-ARREDONDAR
           END-EVALUATE
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-EXTENSO SECTION
      *==========================================================*
       1000-EXTENSO SECTION.
           MOVE LS-NUMERO TO WS-NUMERO-INT
           IF WS-NUMERO-INT = 0
               MOVE 'ZERO' TO LS-RESULTADO
               GOBACK
           END-IF
           MOVE SPACES TO WS-RESULTADO-TEMP
           COMPUTE WS-GRUPO =
               FUNCTION MOD(WS-NUMERO-INT 1000)
           COMPUTE WS-CENTENA = WS-GRUPO / 100
           COMPUTE WS-DEZENA =
               FUNCTION MOD(WS-GRUPO 100) / 10
           COMPUTE WS-UNIDADE =
               FUNCTION MOD(WS-GRUPO 10)
           IF WS-CENTENA > 0
               IF WS-GRUPO = 100
                   MOVE 'CEM' TO WS-RESULTADO-TEMP
               ELSE
                   MOVE WS-CEN(WS-CENTENA)
                       TO WS-RESULTADO-TEMP
               END-IF
           END-IF
           IF WS-DEZENA > 0
               STRING FUNCTION TRIM(WS-RESULTADO-TEMP)
                      ' E ' WS-DEZ(WS-DEZENA)
                   DELIMITED SIZE INTO WS-RESULTADO-TEMP
           END-IF
           IF WS-UNIDADE > 0 AND WS-DEZENA NOT = 1
               STRING FUNCTION TRIM(WS-RESULTADO-TEMP)
                      ' E '
                      WS-UNI(WS-UNIDADE + 1)
                   DELIMITED SIZE INTO WS-RESULTADO-TEMP
           END-IF
           MOVE WS-RESULTADO-TEMP TO LS-RESULTADO
           .
       1000-EXTENSO-EXIT.
           EXIT.
      *==========================================================*
      * 2000-MOEDA SECTION
      *==========================================================*
       2000-MOEDA SECTION.
           MOVE LS-NUMERO TO WS-MOEDA-FMT
           STRING 'R$ '
                  FUNCTION TRIM(WS-MOEDA-FMT)
               DELIMITED SIZE INTO LS-RESULTADO
           .
       2000-MOEDA-EXIT.
           EXIT.
      *==========================================================*
      * 3000-PORCENTAGEM SECTION
      *==========================================================*
       3000-PORCENTAGEM SECTION.
           COMPUTE WS-NUM-EDIT = LS-NUMERO * 100
           STRING FUNCTION TRIM(WS-NUM-EDIT) '%'
               DELIMITED SIZE INTO LS-RESULTADO
           .
       3000-PORCENTAGEM-EXIT.
           EXIT.
      *==========================================================*
      * 4000-ARREDONDAR SECTION
      *==========================================================*
       4000-ARREDONDAR SECTION.
           EVALUATE LS-CASAS-DEC
               WHEN 0
                   COMPUTE LS-NUMERO ROUNDED =
                       LS-NUMERO
               WHEN 1
                   COMPUTE LS-NUMERO ROUNDED =
                       FUNCTION INTEGER(
                           LS-NUMERO * 10 + 0.5) / 10
               WHEN OTHER
                   CONTINUE
           END-EVALUATE
           MOVE LS-NUMERO TO LS-RESULTADO
           .
       4000-ARREDONDAR-EXIT.
           EXIT.`
  },

  {
    id: "COB01011",
    tech: "cobol",
    name: "Motor de Relatório",
    desc: "Gerador de relatório com cabeçalho, rodapé, overflow de página, acumuladores e controle ASA.",
    level: "advanced",
    filename: "COBRPE01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBRPE01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : MOTOR DE RELATORIO REUTILIZAVEL
      *            CABECALHO, RODAPE, OVERFLOW, ACUMULADORES, ASA
      * INTERFACE: CALL 'COBRPE01' USING LS-COMANDO
      *                                  LS-LINHA
      *                                  LS-PAGINA-ATUAL
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBRPE01.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT RPT-FILE ASSIGN TO RPTFILE
               FILE STATUS IS WS-FS.

       DATA DIVISION.
       FILE SECTION.
       FD  RPT-FILE RECORDING MODE F.
       01  RPT-RECORD          PIC X(133).

       WORKING-STORAGE SECTION.
       01  WS-FS              PIC XX.
       01  WS-ABERTO          PIC 9 VALUE 0.
       01  WS-PAGINA          PIC 9(05) VALUE 0.
       01  WS-LINHA-ATUAL     PIC 9(02) VALUE 99.
       01  WS-MAX-LINHAS      PIC 9(02) VALUE 56.
       01  WS-ASA-CHAR        PIC X(01).
       01  WS-DATA-RPT        PIC X(10).
       01  WS-HORA-RPT        PIC X(08).
       01  WS-CURRENT-DT.
           05 WS-DT-YYYY      PIC 9(04).
           05 WS-DT-MM        PIC 9(02).
           05 WS-DT-DD        PIC 9(02).
           05 WS-DT-HH        PIC 9(02).
           05 WS-DT-MN        PIC 9(02).
           05 WS-DT-SS        PIC 9(02).
           05 FILLER           PIC X(07).
       01  WS-HEADER-1.
           05 FILLER       PIC X(01) VALUE '1'.
           05 FILLER       PIC X(05) VALUE SPACES.
           05 WS-H1-TITULO PIC X(80).
           05 FILLER       PIC X(20) VALUE SPACES.
           05 FILLER       PIC X(06) VALUE 'DATA: '.
           05 WS-H1-DATA   PIC X(10).
           05 FILLER       PIC X(02) VALUE SPACES.
           05 FILLER       PIC X(04) VALUE 'PAG '.
           05 WS-H1-PAG    PIC Z.ZZ9.
       01  WS-FOOTER-1.
           05 FILLER       PIC X(01) VALUE '-'.
           05 FILLER       PIC X(50)
               VALUE '*** CONTINUA NA PROXIMA PAGINA ***'.
       01  WS-ACUMULADORES.
           05 WS-TOT-LINHAS   PIC 9(07) COMP VALUE 0.
           05 WS-TOT-PAGINAS  PIC 9(05) COMP VALUE 0.

       LINKAGE SECTION.
       01  LS-COMANDO          PIC X(05).
           88 LS-INIT          VALUE 'INIT '.
           88 LS-PRINT         VALUE 'PRINT'.
           88 LS-SKIP          VALUE 'SKIP '.
           88 LS-CLOSE         VALUE 'CLOSE'.
       01  LS-LINHA            PIC X(133).
       01  LS-PAGINA-ATUAL     PIC 9(05).

       PROCEDURE DIVISION USING LS-COMANDO
                                LS-LINHA
                                LS-PAGINA-ATUAL.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           EVALUATE TRUE
               WHEN LS-INIT   PERFORM 1000-INICIALIZAR
               WHEN LS-PRINT  PERFORM 2000-IMPRIMIR
               WHEN LS-SKIP   PERFORM 3000-NOVA-PAGINA
               WHEN LS-CLOSE  PERFORM 4000-FECHAR
           END-EVALUATE
           MOVE WS-PAGINA TO LS-PAGINA-ATUAL
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-INICIALIZAR SECTION
      *==========================================================*
       1000-INICIALIZAR SECTION.
           OPEN OUTPUT RPT-FILE
           MOVE 1 TO WS-ABERTO
           MOVE FUNCTION CURRENT-DATE TO WS-CURRENT-DT
           STRING WS-DT-DD '/' WS-DT-MM '/' WS-DT-YYYY
               DELIMITED SIZE INTO WS-DATA-RPT
           PERFORM 3000-NOVA-PAGINA
           .
       1000-INICIALIZAR-EXIT.
           EXIT.
      *==========================================================*
      * 2000-IMPRIMIR SECTION
      *==========================================================*
       2000-IMPRIMIR SECTION.
           IF WS-LINHA-ATUAL >= WS-MAX-LINHAS
               PERFORM 2500-RODAPE
               PERFORM 3000-NOVA-PAGINA
           END-IF
           WRITE RPT-RECORD FROM LS-LINHA
           ADD 1 TO WS-LINHA-ATUAL
           ADD 1 TO WS-TOT-LINHAS
           .
       2000-IMPRIMIR-EXIT.
           EXIT.
      *==========================================================*
      * 2500-RODAPE SECTION
      *==========================================================*
       2500-RODAPE SECTION.
           WRITE RPT-RECORD FROM WS-FOOTER-1
           .
       2500-RODAPE-EXIT.
           EXIT.
      *==========================================================*
      * 3000-NOVA-PAGINA SECTION
      *==========================================================*
       3000-NOVA-PAGINA SECTION.
           ADD 1 TO WS-PAGINA
           ADD 1 TO WS-TOT-PAGINAS
           MOVE WS-PAGINA TO WS-H1-PAG
           MOVE WS-DATA-RPT TO WS-H1-DATA
           WRITE RPT-RECORD FROM WS-HEADER-1
           MOVE 2 TO WS-LINHA-ATUAL
           .
       3000-NOVA-PAGINA-EXIT.
           EXIT.
      *==========================================================*
      * 4000-FECHAR SECTION
      *==========================================================*
       4000-FECHAR SECTION.
           IF WS-ABERTO = 1
               PERFORM 2500-RODAPE
               CLOSE RPT-FILE
               MOVE 0 TO WS-ABERTO
           END-IF
           .
       4000-FECHAR-EXIT.
           EXIT.`
  },

  {
    id: "COB01012",
    tech: "cobol",
    name: "Interceptação Mestre-Trans",
    desc: "Watch/merge master-transaction com operações I/O, sentinela HIGH-VALUES e relatório de exceções.",
    level: "advanced",
    filename: "COBMTX01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBMTX01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : MATCH/MERGE MESTRE-TRANSACAO
      *            ATUALIZA MESTRE COM TRANSACOES (I/U/D)
      *            SENTINELA HIGH-VALUES, RELATORIO DE EXCECOES
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBMTX01.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-MESTRE ASSIGN TO MESTRE
               FILE STATUS IS WS-FS-MST.
           SELECT ARQ-TRANS  ASSIGN TO TRANS
               FILE STATUS IS WS-FS-TRN.
           SELECT ARQ-SAIDA  ASSIGN TO MSTNOVO
               FILE STATUS IS WS-FS-SAI.
           SELECT ARQ-EXCEPT ASSIGN TO EXCECAO
               FILE STATUS IS WS-FS-EXC.

       DATA DIVISION.
       FILE SECTION.
       FD  ARQ-MESTRE.
       01  REG-MESTRE.
           05 RM-CHAVE        PIC X(10).
           05 RM-DADOS        PIC X(70).
       FD  ARQ-TRANS.
       01  REG-TRANS.
           05 RT-CHAVE        PIC X(10).
           05 RT-TIPO         PIC X(01).
              88 RT-INSERT    VALUE 'I'.
              88 RT-UPDATE    VALUE 'U'.
              88 RT-DELETE    VALUE 'D'.
           05 RT-DADOS        PIC X(69).
       FD  ARQ-SAIDA.
       01  REG-SAIDA          PIC X(80).
       FD  ARQ-EXCEPT.
       01  REG-EXCEPT         PIC X(100).

       WORKING-STORAGE SECTION.
       01  WS-FS-MST          PIC XX.
       01  WS-FS-TRN          PIC XX.
       01  WS-FS-SAI          PIC XX.
       01  WS-FS-EXC          PIC XX.
       01  WS-EOF-MST         PIC 9 VALUE 0.
       01  WS-EOF-TRN         PIC 9 VALUE 0.
       01  WS-CTR-INS         PIC 9(06) COMP VALUE 0.
       01  WS-CTR-UPD         PIC 9(06) COMP VALUE 0.
       01  WS-CTR-DEL         PIC 9(06) COMP VALUE 0.
       01  WS-CTR-EXC         PIC 9(06) COMP VALUE 0.
       01  WS-CTR-CPY         PIC 9(06) COMP VALUE 0.
       01  WS-EXCEPT-LINE     PIC X(100).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           OPEN INPUT  ARQ-MESTRE ARQ-TRANS
                OUTPUT ARQ-SAIDA  ARQ-EXCEPT
           PERFORM 1000-READ-MESTRE
           PERFORM 1100-READ-TRANS
           PERFORM UNTIL RM-CHAVE = HIGH-VALUES
                     AND RT-CHAVE = HIGH-VALUES
               EVALUATE TRUE
                   WHEN RM-CHAVE < RT-CHAVE
                       WRITE REG-SAIDA FROM REG-MESTRE
                       ADD 1 TO WS-CTR-CPY
                       PERFORM 1000-READ-MESTRE
                   WHEN RM-CHAVE = RT-CHAVE
                       PERFORM 2000-MATCH
                   WHEN RM-CHAVE > RT-CHAVE
                       PERFORM 3000-NO-MATCH
               END-EVALUATE
           END-PERFORM
           PERFORM 9000-FECHAR
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-READ-MESTRE SECTION
      *==========================================================*
       1000-READ-MESTRE SECTION.
           READ ARQ-MESTRE
               AT END MOVE HIGH-VALUES TO RM-CHAVE
                      MOVE 1 TO WS-EOF-MST
           END-READ
           .
       1000-READ-MESTRE-EXIT.
           EXIT.
      *==========================================================*
      * 1100-READ-TRANS SECTION
      *==========================================================*
       1100-READ-TRANS SECTION.
           READ ARQ-TRANS
               AT END MOVE HIGH-VALUES TO RT-CHAVE
                      MOVE 1 TO WS-EOF-TRN
           END-READ
           .
       1100-READ-TRANS-EXIT.
           EXIT.
      *==========================================================*
      * 2000-MATCH SECTION
      *==========================================================*
       2000-MATCH SECTION.
           EVALUATE TRUE
               WHEN RT-UPDATE
                   MOVE RT-DADOS TO RM-DADOS
                   WRITE REG-SAIDA FROM REG-MESTRE
                   ADD 1 TO WS-CTR-UPD
               WHEN RT-DELETE
                   ADD 1 TO WS-CTR-DEL
               WHEN RT-INSERT
                   STRING 'DUP INSERT KEY=' RT-CHAVE
                       DELIMITED SIZE INTO WS-EXCEPT-LINE
                   WRITE REG-EXCEPT FROM WS-EXCEPT-LINE
                   ADD 1 TO WS-CTR-EXC
                   WRITE REG-SAIDA FROM REG-MESTRE
               WHEN OTHER
                   STRING 'INVALID TYPE=' RT-TIPO
                          ' KEY=' RT-CHAVE
                       DELIMITED SIZE INTO WS-EXCEPT-LINE
                   WRITE REG-EXCEPT FROM WS-EXCEPT-LINE
                   ADD 1 TO WS-CTR-EXC
                   WRITE REG-SAIDA FROM REG-MESTRE
           END-EVALUATE
           PERFORM 1000-READ-MESTRE
           PERFORM 1100-READ-TRANS
           .
       2000-MATCH-EXIT.
           EXIT.
      *==========================================================*
      * 3000-NO-MATCH SECTION
      *==========================================================*
       3000-NO-MATCH SECTION.
           IF RT-INSERT
               MOVE RT-CHAVE TO RM-CHAVE
               MOVE RT-DADOS TO RM-DADOS
               WRITE REG-SAIDA FROM REG-MESTRE
               ADD 1 TO WS-CTR-INS
           ELSE
               STRING 'NOT FOUND TYPE=' RT-TIPO
                      ' KEY=' RT-CHAVE
                   DELIMITED SIZE INTO WS-EXCEPT-LINE
               WRITE REG-EXCEPT FROM WS-EXCEPT-LINE
               ADD 1 TO WS-CTR-EXC
           END-IF
           PERFORM 1100-READ-TRANS
           .
       3000-NO-MATCH-EXIT.
           EXIT.
      *==========================================================*
      * 9000-FECHAR SECTION
      *==========================================================*
       9000-FECHAR SECTION.
           CLOSE ARQ-MESTRE ARQ-TRANS ARQ-SAIDA ARQ-EXCEPT
           DISPLAY 'COBMTX01 - COPIADOS:  ' WS-CTR-CPY
           DISPLAY 'COBMTX01 - INSERIDOS: ' WS-CTR-INS
           DISPLAY 'COBMTX01 - ATUALIZ:   ' WS-CTR-UPD
           DISPLAY 'COBMTX01 - DELETADOS: ' WS-CTR-DEL
           DISPLAY 'COBMTX01 - EXCECOES:  ' WS-CTR-EXC
           STOP RUN
           .
       9000-FECHAR-EXIT.
           EXIT.`
  },

  {
    id: "COB01013",
    tech: "cobol",
    name: "Processador de Strings",
    desc: "Subprograma para LTRIM, RTRIM, LPAD, RPAD e CENTER de campos alfanuméricos via LINKAGE SECTION.",
    level: "basic",
    filename: "COBSTR01.cbl",
    tags: ["COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : COBSTR01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : PROCESSADOR DE STRINGS - OPERACOES DIVERSAS
      *            UPPER, LOWER, SPLIT, JOIN, SUBSTR, CONTA E TROCA
      * INTERFACE: CALL 'COBSTR01' USING LS-OPERACAO
      *                                  LS-ENTRADA
      *                                  LS-PARAM
      *                                  LS-SAIDA
      *                                  LS-CONTAGEM
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBSTR01.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-POS             PIC 9(04) COMP.
       01  WS-LEN             PIC 9(04) COMP.
       01  WS-COUNT           PIC 9(04) COMP.
       01  WS-TEMP            PIC X(500).
       01  WS-DELIM           PIC X(01).
       01  WS-CAMPO-IDX       PIC 9(04) COMP.

       LINKAGE SECTION.
       01  LS-OPERACAO        PIC X(06).
           88 LS-UPPER        VALUE 'UPPER '.
           88 LS-LOWER        VALUE 'LOWER '.
           88 LS-SPLIT        VALUE 'SPLIT '.
           88 LS-JOIN         VALUE 'JOIN  '.
           88 LS-SUBSTR       VALUE 'SUBSTR'.
           88 LS-CONTA        VALUE 'CONTA '.
           88 LS-TROCA        VALUE 'TROCA '.
       01  LS-ENTRADA         PIC X(500).
       01  LS-PARAM           PIC X(100).
       01  LS-SAIDA           PIC X(500).
       01  LS-CONTAGEM        PIC 9(04) COMP.

       PROCEDURE DIVISION USING LS-OPERACAO LS-ENTRADA
                                LS-PARAM LS-SAIDA
                                LS-CONTAGEM.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE ZEROS TO LS-CONTAGEM
           EVALUATE TRUE
               WHEN LS-UPPER  PERFORM 1000-UPPER
               WHEN LS-LOWER  PERFORM 2000-LOWER
               WHEN LS-CONTA  PERFORM 3000-CONTAR
               WHEN LS-TROCA  PERFORM 4000-TROCAR
               WHEN LS-SUBSTR PERFORM 5000-SUBSTRING
           END-EVALUATE
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-UPPER SECTION
      *==========================================================*
       1000-UPPER SECTION.
           MOVE FUNCTION UPPER-CASE(LS-ENTRADA)
               TO LS-SAIDA
           .
       1000-UPPER-EXIT.
           EXIT.
      *==========================================================*
      * 2000-LOWER SECTION
      *==========================================================*
       2000-LOWER SECTION.
           MOVE FUNCTION LOWER-CASE(LS-ENTRADA)
               TO LS-SAIDA
           .
       2000-LOWER-EXIT.
           EXIT.
      *==========================================================*
      * 3000-CONTAR SECTION
      *==========================================================*
       3000-CONTAR SECTION.
           MOVE ZEROS TO WS-COUNT
           INSPECT LS-ENTRADA TALLYING WS-COUNT
               FOR ALL LS-PARAM(1:
                   FUNCTION LENGTH(
                       FUNCTION TRIM(LS-PARAM)))
           MOVE WS-COUNT TO LS-CONTAGEM
           .
       3000-CONTAR-EXIT.
           EXIT.
      *==========================================================*
      * 4000-TROCAR SECTION
      *==========================================================*
       4000-TROCAR SECTION.
           MOVE LS-ENTRADA TO WS-TEMP
           INSPECT WS-TEMP REPLACING ALL
               LS-PARAM(1:FUNCTION LENGTH(
                   FUNCTION TRIM(LS-PARAM)))
               BY LS-SAIDA(1:FUNCTION LENGTH(
                   FUNCTION TRIM(LS-PARAM)))
           MOVE WS-TEMP TO LS-SAIDA
           .
       4000-TROCAR-EXIT.
           EXIT.
      *==========================================================*
      * 5000-SUBSTRING SECTION
      *==========================================================*
       5000-SUBSTRING SECTION.
           MOVE LS-PARAM(1:4) TO WS-POS
           MOVE LS-PARAM(5:4) TO WS-LEN
           IF WS-POS > 0 AND WS-LEN > 0
               MOVE LS-ENTRADA(WS-POS:WS-LEN)
                   TO LS-SAIDA
           END-IF
           .
       5000-SUBSTRING-EXIT.
           EXIT.`
  },

  // ========================================================================
  // HLASM (11 programas)
  // ========================================================================

  {
    id: "ASM01001",
    tech: "hlasm",
    name: "Hex Dump Utility",
    desc: "Rotina para dump hexadecimal de áreas de memória - essencial para debugging de baixo nível.",
    level: "advanced",
    filename: "ASMHXD01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMHXD01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : HEX DUMP DE AREA DE MEMORIA
*            GERA SAIDA FORMATADA COM OFFSET, HEX E EBCDIC
* REGISTRADORES:
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*   R1  = ENDERECO DA AREA
*   R2  = TAMANHO EM BYTES
*   R15 = RETURN CODE (0=OK)
*================================================================*
ASMHXD01 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVEAREA+4       CHAIN SAVE AREAS
         LA    R13,SAVEAREA
*
         L     R3,0(R1)            LOAD BUFFER ADDRESS
         L     R4,4(R1)            LOAD LENGTH
         LR    R5,R3               SAVE START ADDR
         SR    R6,R6               OFFSET = 0
*
LOOP     CR    R6,R4               CHECK IF DONE
         BNL   EXIT                YES - EXIT
         MVC   OUTLINE,BLANKS      CLEAR OUTPUT LINE
*-- FORMAT OFFSET
         LR    R7,R6               COPY OFFSET
         CVD   R7,DWORK            CONVERT TO PACKED
         UNPK  OUTLINE(8),DWORK    UNPACK OFFSET
         OI    OUTLINE+7,X'F0'     FIX SIGN
*-- FORMAT HEX BYTES (16 PER LINE)
         LA    R8,OUTLINE+10       POINT TO HEX AREA
         LA    R9,OUTLINE+60       POINT TO CHAR AREA
         LA    R10,16              BYTES PER LINE
HEXLOOP  CR    R6,R4               PAST END?
         BNL   PRNTLINE            YES - PRINT WHAT WE HAVE
         IC    R7,0(R3)            GET BYTE
         STC   R7,HEXWORK          STORE BYTE
         UNPK  HEXWORK2(3),HEXWORK(2) CONVERT TO HEX
         TR    HEXWORK2(2),HEXTAB  TRANSLATE TO PRINTABLE
         MVC   0(2,R8),HEXWORK2    MOVE HEX TO OUTPUT
*-- PRINTABLE CHARACTER
         CLI   0(R3),X'40'         PRINTABLE RANGE?
         BL    NOTPRINT
         CLI   0(R3),X'FE'
         BH    NOTPRINT
         MVC   0(1,R9),0(R3)       COPY AS-IS
         B     NEXTBYTE
NOTPRINT MVI   0(R9),C'.'          USE DOT FOR NON-PRINT
NEXTBYTE LA    R3,1(R3)            NEXT BYTE
         LA    R6,1(R6)            INCREMENT OFFSET
         LA    R8,3(R8)            NEXT HEX POSITION
         LA    R9,1(R9)            NEXT CHAR POSITION
         BCT   R10,HEXLOOP         LOOP 16 BYTES
*
PRNTLINE WTO   MF=(E,WTOMSG)       WRITE OUTPUT LINE
         B     LOOP                NEXT 16-BYTE GROUP
*
EXIT     SR    R15,R15             RC = 0
         L     R13,SAVEAREA+4      RESTORE SAVE AREA
         LM    R14,R12,12(R13)     RESTORE REGISTERS
         BR    R14                 RETURN
*
SAVEAREA DS    18F
DWORK    DS    D
HEXWORK  DS    XL2
HEXWORK2 DS    CL3
OUTLINE  DS    CL80
BLANKS   DC    CL80' '
HEXTAB   DC    C'0123456789ABCDEF'
WTOMSG   WTO   ' ',MF=L
         YREGS
         END   ASMHXD01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMHXD01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : HEX DUMP DE AREA DE MEMORIA
*            GERA SAIDA FORMATADA COM OFFSET, HEX E EBCDIC
* REGISTRADORES:
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*   R1  = ENDERECO DA AREA
*   R2  = TAMANHO EM BYTES
*   R15 = RETURN CODE (0=OK)
*================================================================*
ASMHXD01 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMHXD01         SET BASE (RELATIVE)
         USING ASMHXD01,R12
         ST    R13,SAVEAREA+4       CHAIN SAVE AREAS
         LA    R13,SAVEAREA
*
         L     R3,0(R1)            LOAD BUFFER ADDRESS
         L     R4,4(R1)            LOAD LENGTH
         LR    R5,R3               SAVE START ADDR
         SR    R6,R6               OFFSET = 0
*
LOOP     CR    R6,R4               CHECK IF DONE
         JNL   EXIT                 YES - EXIT
         MVC   OUTLINE,BLANKS      CLEAR OUTPUT LINE
*-- FORMAT OFFSET
         LR    R7,R6               COPY OFFSET
         CVD   R7,DWORK            CONVERT TO PACKED
         UNPK  OUTLINE(8),DWORK    UNPACK OFFSET
         OI    OUTLINE+7,X'F0'     FIX SIGN
*-- FORMAT HEX BYTES (16 PER LINE)
         LA    R8,OUTLINE+10       POINT TO HEX AREA
         LA    R9,OUTLINE+60       POINT TO CHAR AREA
         LA    R10,16              BYTES PER LINE
HEXLOOP  CR    R6,R4               PAST END?
         JNL   PRNTLINE             YES - PRINT WHAT WE HAVE
         IC    R7,0(R3)            GET BYTE
         STC   R7,HEXWORK          STORE BYTE
         UNPK  HEXWORK2(3),HEXWORK(2) CONVERT TO HEX
         TR    HEXWORK2(2),HEXTAB  TRANSLATE TO PRINTABLE
         MVC   0(2,R8),HEXWORK2    MOVE HEX TO OUTPUT
*-- PRINTABLE CHARACTER
         CLI   0(R3),X'40'         PRINTABLE RANGE?
         JL    NOTPRINT
         CLI   0(R3),X'FE'
         JH    NOTPRINT
         MVC   0(1,R9),0(R3)       COPY AS-IS
         J     NEXTBYTE
NOTPRINT MVI   0(R9),C'.'          USE DOT FOR NON-PRINT
NEXTBYTE LA    R3,1(R3)            NEXT BYTE
         LA    R6,1(R6)            INCREMENT OFFSET
         LA    R8,3(R8)            NEXT HEX POSITION
         LA    R9,1(R9)            NEXT CHAR POSITION
         BCT   R10,HEXLOOP         LOOP 16 BYTES
*
PRNTLINE WTO   MF=(E,WTOMSG)       WRITE OUTPUT LINE
         J     LOOP                 NEXT 16-BYTE GROUP
*
EXIT     SR    R15,R15             RC = 0
         L     R13,SAVEAREA+4      RESTORE SAVE AREA
         LM    R14,R12,12(R13)     RESTORE REGISTERS
         BR    R14                 RETURN
*
SAVEAREA DS    18F
DWORK    DS    D
HEXWORK  DS    XL2
HEXWORK2 DS    CL3
OUTLINE  DS    CL80
BLANKS   DC    CL80' '
HEXTAB   DC    C'0123456789ABCDEF'
WTOMSG   WTO   ' ',MF=L
         YREGS
         END   ASMHXD01`
  },

  {
    id: "ASM01002",
    tech: "hlasm",
    name: "Return Code Logger",
    desc: "Loga RC do programa no WTO com nome do step e indicador de severidade.",
    level: "intermediate",
    filename: "ASMRCL01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMRCL01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : LOG DE RETURN CODE VIA WTO
*            FORMATA: STEP=xxxxxxxx RC=nnnn SEV=ssssss
* R1 -> PARMLIST: @STEPNAME(8), @RC(FULLWORD)
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMRCL01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            ADDR OF STEPNAME
         L     R3,4(R1)            ADDR OF RC
         L     R4,0(R3)            LOAD RC VALUE
*
         MVC   MSGTEXT,PATTERN     INIT MESSAGE
         MVC   MSGTEXT+5(8),0(R2)  MOVE STEPNAME
*
         CVD   R4,DWORK            CONVERT RC
         UNPK  MSGTEXT+17(4),DWORK+6(2)
         OI    MSGTEXT+20,X'F0'    FIX SIGN
*
* DETERMINE SEVERITY
         CH    R4,=H'0'
         BE    SEVOK
         CH    R4,=H'4'
         BE    SEVWARN
         CH    R4,=H'8'
         BE    SEVERR
         B     SEVCRIT
*
SEVOK    MVC   MSGTEXT+26(8),=CL8'SUCCESS '
         B     DOMSG
SEVWARN  MVC   MSGTEXT+26(8),=CL8'WARNING '
         B     DOMSG
SEVERR   MVC   MSGTEXT+26(8),=CL8'ERROR   '
         B     DOMSG
SEVCRIT  MVC   MSGTEXT+26(8),=CL8'CRITICAL'
*
DOMSG    WTO   MF=(E,WTOMSG)
*
         LR    R15,R4              PROPAGATE RC
         L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
PATTERN  DC    CL40'STEP=........ RC=.... SEV=........'
MSGTEXT  DS    CL40
WTOMSG   WTO   ' ',MF=L
         YREGS
         END   ASMRCL01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMRCL01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : LOG DE RETURN CODE VIA WTO
*            FORMATA: STEP=xxxxxxxx RC=nnnn SEV=ssssss
* R1 -> PARMLIST: @STEPNAME(8), @RC(FULLWORD)
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMRCL01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMRCL01         
         USING ASMRCL01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            ADDR OF STEPNAME
         L     R3,4(R1)            ADDR OF RC
         L     R4,0(R3)            LOAD RC VALUE
*
         MVC   MSGTEXT,PATTERN     INIT MESSAGE
         MVC   MSGTEXT+5(8),0(R2)  MOVE STEPNAME
*
         CVD   R4,DWORK            CONVERT RC
         UNPK  MSGTEXT+17(4),DWORK+6(2)
         OI    MSGTEXT+20,X'F0'    FIX SIGN
*
* DETERMINE SEVERITY
         CH    R4,=H'0'
         JE    SEVOK
         CH    R4,=H'4'
         JE    SEVWARN
         CH    R4,=H'8'
         JE    SEVERR
         J     SEVCRIT
*
SEVOK    MVC   MSGTEXT+26(8),=CL8'SUCCESS '
         J     DOMSG
SEVWARN  MVC   MSGTEXT+26(8),=CL8'WARNING '
         J     DOMSG
SEVERR   MVC   MSGTEXT+26(8),=CL8'ERROR   '
         J     DOMSG
SEVCRIT  MVC   MSGTEXT+26(8),=CL8'CRITICAL'
*
DOMSG    WTO   MF=(E,WTOMSG)
*
         LR    R15,R4              PROPAGATE RC
         L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
PATTERN  DC    CL40'STEP=........ RC=.... SEV=........'
MSGTEXT  DS    CL40
WTOMSG   WTO   ' ',MF=L
         YREGS
         END   ASMRCL01`
  },

  {
    id: "ASM01003",
    tech: "hlasm",
    name: "Timestamp Formatter",
    desc: "Obtém o relógio TOD do sistema e converte para formato legível YYYY-MM-DD HH:MM:SS.",
    level: "intermediate",
    filename: "ASMTMS01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMTMS01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : OBTEM TOD CLOCK E FORMATA TIMESTAMP LEGIVEL
*            FORMATO: YYYY-MM-DD HH:MM:SS
* R1 -> @OUTPUT(19 BYTES)
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMTMS01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            ADDR OUTPUT BUFFER
*
* GET CURRENT DATE/TIME VIA TIME MACRO
         TIME  DEC,DATETIME,LINKAGE=SYSTEM,DATETYPE=YYYYMMDD
*
* FORMAT DATE: YYYY-MM-DD
         MVC   WORK(4),DATETIME+8  YYYY
         MVI   WORK+4,C'-'
         MVC   WORK+5(2),DATETIME+12 MM
         MVI   WORK+7,C'-'
         MVC   WORK+8(2),DATETIME+14 DD
*
* FORMAT TIME: HH:MM:SS
         MVI   WORK+10,C' '
         UNPK  TIMEWORK(7),DATETIME(4)
         OI    TIMEWORK+6,X'F0'
         MVC   WORK+11(2),TIMEWORK   HH
         MVI   WORK+13,C':'
         MVC   WORK+14(2),TIMEWORK+2 MM
         MVI   WORK+16,C':'
         MVC   WORK+17(2),TIMEWORK+4 SS
*
         MVC   0(19,R2),WORK      COPY TO OUTPUT
*
         SR    R15,R15             RC=0
         L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DATETIME DS    4F
TIMEWORK DS    CL8
WORK     DS    CL19
         YREGS
         END   ASMTMS01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMTMS01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : OBTEM TOD CLOCK E FORMATA TIMESTAMP LEGIVEL
*            FORMATO: YYYY-MM-DD HH:MM:SS
* R1 -> @OUTPUT(19 BYTES)
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMTMS01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMTMS01         
         USING ASMTMS01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            ADDR OUTPUT BUFFER
*
* GET CURRENT DATE/TIME VIA TIME MACRO
         TIME  DEC,DATETIME,LINKAGE=SYSTEM,DATETYPE=YYYYMMDD
*
* FORMAT DATE: YYYY-MM-DD
         MVC   WORK(4),DATETIME+8  YYYY
         MVI   WORK+4,C'-'
         MVC   WORK+5(2),DATETIME+12 MM
         MVI   WORK+7,C'-'
         MVC   WORK+8(2),DATETIME+14 DD
*
* FORMAT TIME: HH:MM:SS
         MVI   WORK+10,C' '
         UNPK  TIMEWORK(7),DATETIME(4)
         OI    TIMEWORK+6,X'F0'
         MVC   WORK+11(2),TIMEWORK   HH
         MVI   WORK+13,C':'
         MVC   WORK+14(2),TIMEWORK+2 MM
         MVI   WORK+16,C':'
         MVC   WORK+17(2),TIMEWORK+4 SS
*
         MVC   0(19,R2),WORK      COPY TO OUTPUT
*
         SR    R15,R15             RC=0
         L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DATETIME DS    4F
TIMEWORK DS    CL8
WORK     DS    CL19
         YREGS
         END   ASMTMS01`
  },

  {
    id: "ASM01004",
    tech: "hlasm",
    name: "Conversor EBCDIC/ASCII",
    desc: "Converte buffers entre EBCDIC e ASCII usando tabelas de translação TR de 256 bytes.",
    level: "advanced",
    filename: "ASMCNV01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMCNV01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CONVERSAO EBCDIC <-> ASCII VIA TR TABLE
* R1 -> PARMLIST: @BUFFER, @LENGTH(FW), @DIRECTION(C'E'|C'A')
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
* DIRECTION: 'A' = EBCDIC->ASCII, 'E' = ASCII->EBCDIC
*================================================================*
ASMCNV01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            BUFFER ADDRESS
         L     R3,4(R1)            LENGTH ADDRESS
         L     R3,0(R3)            ACTUAL LENGTH
         L     R4,8(R1)            DIRECTION ADDRESS
         CLI   0(R4),C'A'          EBCDIC TO ASCII?
         BE    TOASCII
         CLI   0(R4),C'E'          ASCII TO EBCDIC?
         BE    TOEBCDIC
         LA    R15,8               INVALID DIRECTION
         B     EXIT
*
TOASCII  BCTR  R3,0                LENGTH-1 FOR EX
         EX    R3,TRASC            TRANSLATE TO ASCII
         B     DONE
TOEBCDIC BCTR  R3,0
         EX    R3,TREBC            TRANSLATE TO EBCDIC
         B     DONE
*
TRASC    TR    0(0,R2),E2ATAB      EXECUTED
TREBC    TR    0(0,R2),A2ETAB      EXECUTED
*
DONE     SR    R15,R15             RC=0
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
*
* EBCDIC TO ASCII TRANSLATION TABLE (PARTIAL - KEY VALUES)
E2ATAB   DC    256X'2E'            DEFAULT TO '.'
         ORG   E2ATAB+X'40'
         DC    X'20'               SPACE
         ORG   E2ATAB+X'C1'
         DC    X'41424344454647484950'  A-I (PARTIAL)
         ORG   E2ATAB+X'F0'
         DC    X'30313233343536373839'  0-9
         ORG   ,
* ASCII TO EBCDIC TRANSLATION TABLE (PARTIAL)
A2ETAB   DC    256X'40'            DEFAULT TO SPACE
         ORG   A2ETAB+X'20'
         DC    X'40'               SPACE
         ORG   A2ETAB+X'30'
         DC    X'F0F1F2F3F4F5F6F7F8F9'  0-9
         ORG   A2ETAB+X'41'
         DC    X'C1C2C3C4C5C6C7C8C9'   A-I
         ORG   ,
         YREGS
         END   ASMCNV01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMCNV01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CONVERSAO EBCDIC <-> ASCII VIA TR TABLE
* R1 -> PARMLIST: @BUFFER, @LENGTH(FW), @DIRECTION(C'E'|C'A')
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
* DIRECTION: 'A' = EBCDIC->ASCII, 'E' = ASCII->EBCDIC
*================================================================*
ASMCNV01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMCNV01         
         USING ASMCNV01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            BUFFER ADDRESS
         L     R3,4(R1)            LENGTH ADDRESS
         L     R3,0(R3)            ACTUAL LENGTH
         L     R4,8(R1)            DIRECTION ADDRESS
         CLI   0(R4),C'A'          EBCDIC TO ASCII?
         JE    TOASCII
         CLI   0(R4),C'E'          ASCII TO EBCDIC?
         JE    TOEBCDIC
         LA    R15,8               INVALID DIRECTION
         J     EXIT
*
TOASCII  BCTR  R3,0                LENGTH-1 FOR EX
         EX    R3,TRASC            TRANSLATE TO ASCII
         J     DONE
TOEBCDIC BCTR  R3,0
         EX    R3,TREBC            TRANSLATE TO EBCDIC
         J     DONE
*
TRASC    TR    0(0,R2),E2ATAB      EXECUTED
TREBC    TR    0(0,R2),A2ETAB      EXECUTED
*
DONE     SR    R15,R15             RC=0
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
*
* EBCDIC TO ASCII TRANSLATION TABLE (PARTIAL - KEY VALUES)
E2ATAB   DC    256X'2E'            DEFAULT TO '.'
         ORG   E2ATAB+X'40'
         DC    X'20'               SPACE
         ORG   E2ATAB+X'C1'
         DC    X'41424344454647484950'  A-I (PARTIAL)
         ORG   E2ATAB+X'F0'
         DC    X'30313233343536373839'  0-9
         ORG   ,
* ASCII TO EBCDIC TRANSLATION TABLE (PARTIAL)
A2ETAB   DC    256X'40'            DEFAULT TO SPACE
         ORG   A2ETAB+X'20'
         DC    X'40'               SPACE
         ORG   A2ETAB+X'30'
         DC    X'F0F1F2F3F4F5F6F7F8F9'  0-9
         ORG   A2ETAB+X'41'
         DC    X'C1C2C3C4C5C6C7C8C9'   A-I
         ORG   ,
         YREGS
         END   ASMCNV01`
  },

  {
    id: "ASM01005",
    tech: "hlasm",
    name: "Operações Bitwise",
    desc: "Rotina para testar, setar, limpar e inverter bits individuais usando NI, OI, XI e TM.",
    level: "intermediate",
    filename: "ASMBIT01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMBIT01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : OPERACOES BITWISE EM BYTE
*            TEST, SET, CLEAR, TOGGLE VIA TM, OI, NI, XI
* R1 -> PARMLIST: @BYTE, @BITNUM(0-7), @OPERATION(C'T/S/C/X')
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
* R15: TEST -> 0=OFF,4=ON | OTHERS -> 0=OK
*================================================================*
ASMBIT01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            BYTE ADDRESS
         L     R3,4(R1)            BIT NUMBER ADDRESS
         L     R3,0(R3)            ACTUAL BIT (0-7)
         L     R4,8(R1)            OPERATION ADDRESS
*
* BUILD BIT MASK (BIT 0 = X'80', BIT 7 = X'01')
         LA    R5,7
         SR    R5,R3               7 - BITNUM
         LA    R6,1
         SLL   R6,0(R5)            SHIFT 1 LEFT BY (7-N)
         STC   R6,MASK             STORE MASK BYTE
*
         CLI   0(R4),C'T'          TEST?
         BE    DOTEST
         CLI   0(R4),C'S'          SET?
         BE    DOSET
         CLI   0(R4),C'C'          CLEAR?
         BE    DOCLEAR
         CLI   0(R4),C'X'          TOGGLE?
         BE    DOTOGGLE
         LA    R15,8               INVALID OP
         B     EXIT
*
DOTEST   EX    R6,EXTM             TM 0(R2),MASK
         BZ    BITOFF
         LA    R15,4               BIT IS ON
         B     EXIT
BITOFF   SR    R15,R15             BIT IS OFF
         B     EXIT
*
DOSET    IC    R7,0(R2)            LOAD BYTE
         IC    R8,MASK             LOAD MASK
         OR    R7,R8               OR = SET
         STC   R7,0(R2)            STORE BACK
         SR    R15,R15
         B     EXIT
*
DOCLEAR  IC    R7,0(R2)            LOAD BYTE
         IC    R8,MASK
         X     R8,=F'-1'           COMPLEMENT MASK
         NR    R7,R8               AND = CLEAR
         STC   R7,0(R2)
         SR    R15,R15
         B     EXIT
*
DOTOGGLE IC    R7,0(R2)            LOAD BYTE
         IC    R8,MASK
         XR    R7,R8               XOR = TOGGLE
         STC   R7,0(R2)
         SR    R15,R15
         B     EXIT
*
EXTM     TM    0(R2),0             EXECUTED INSTRUCTION
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
MASK     DS    X
         YREGS
         END   ASMBIT01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMBIT01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : OPERACOES BITWISE EM BYTE
*            TEST, SET, CLEAR, TOGGLE VIA TM, OI, NI, XI
* R1 -> PARMLIST: @BYTE, @BITNUM(0-7), @OPERATION(C'T/S/C/X')
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
* R15: TEST -> 0=OFF,4=ON | OTHERS -> 0=OK
*================================================================*
ASMBIT01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMBIT01         
         USING ASMBIT01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            BYTE ADDRESS
         L     R3,4(R1)            BIT NUMBER ADDRESS
         L     R3,0(R3)            ACTUAL BIT (0-7)
         L     R4,8(R1)            OPERATION ADDRESS
*
* BUILD BIT MASK (BIT 0 = X'80', BIT 7 = X'01')
         LA    R5,7
         SR    R5,R3               7 - BITNUM
         LA    R6,1
         SLL   R6,0(R5)            SHIFT 1 LEFT BY (7-N)
         STC   R6,MASK             STORE MASK BYTE
*
         CLI   0(R4),C'T'          TEST?
         JE    DOTEST
         CLI   0(R4),C'S'          SET?
         JE    DOSET
         CLI   0(R4),C'C'          CLEAR?
         JE    DOCLEAR
         CLI   0(R4),C'X'          TOGGLE?
         JE    DOTOGGLE
         LA    R15,8               INVALID OP
         J     EXIT
*
DOTEST   EX    R6,EXTM             TM 0(R2),MASK
         JZ    BITOFF
         LA    R15,4               BIT IS ON
         J     EXIT
BITOFF   SR    R15,R15             BIT IS OFF
         J     EXIT
*
DOSET    IC    R7,0(R2)            LOAD BYTE
         IC    R8,MASK             LOAD MASK
         OR    R7,R8               OR = SET
         STC   R7,0(R2)            STORE BACK
         SR    R15,R15
         J     EXIT
*
DOCLEAR  IC    R7,0(R2)            LOAD BYTE
         IC    R8,MASK
         X     R8,=F'-1'           COMPLEMENT MASK
         NR    R7,R8               AND = CLEAR
         STC   R7,0(R2)
         SR    R15,R15
         J     EXIT
*
DOTOGGLE IC    R7,0(R2)            LOAD BYTE
         IC    R8,MASK
         XR    R7,R8               XOR = TOGGLE
         STC   R7,0(R2)
         SR    R15,R15
         J     EXIT
*
EXTM     TM    0(R2),0             EXECUTED INSTRUCTION
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
MASK     DS    X
         YREGS
         END   ASMBIT01`
  },

  {
    id: "ASM01006",
    tech: "hlasm",
    name: "Busca Binária em Tabela",
    desc: "Busca binária otimizada em tabela com comparação CLC e divisão via SRL.",
    level: "advanced",
    filename: "ASMBSR01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMBSR01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : BUSCA BINARIA EM TABELA ORDENADA
*            CLC PARA COMPARACAO, SRL PARA DIVISAO
* R1 -> PARMLIST: @TABLE, @ENTRIES(FW), @KEYLEN(FW),
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*                 @ENTRYLEN(FW), @SEARCHKEY
* R15: 0=FOUND (R1->ENTRY), 4=NOT FOUND
*================================================================*
ASMBSR01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            TABLE START
         L     R3,4(R1)            NUM ENTRIES ADDR
         L     R3,0(R3)            NUM ENTRIES
         L     R4,8(R1)            KEY LENGTH ADDR
         L     R4,0(R4)            KEY LENGTH
         L     R5,12(R1)           ENTRY LENGTH ADDR
         L     R5,0(R5)            ENTRY LENGTH
         L     R6,16(R1)           SEARCH KEY ADDR
*
         SR    R7,R7               LOW = 0
         LR    R8,R3               HIGH = N
         BCTR  R8,0                HIGH = N-1
*
BSLOOP   CR    R7,R8               LOW > HIGH?
         BH    NOTFND              YES - NOT FOUND
*
         LR    R9,R7               MID = LOW
         AR    R9,R8               MID = LOW + HIGH
         SRL   R9,1                MID = (LOW+HIGH)/2
*
         LR    R10,R9              COPY MID
         MR    R10,R5              MID * ENTRYLEN (USE R11)
         LA    R10,0(R11,R2)       ADDR OF MID ENTRY
*
         BCTR  R4,0                KEYLEN-1 FOR EX
         EX    R4,EXCLC            COMPARE KEYS
         BE    FOUND
         BH    GOHIGH
*
* SEARCH KEY < MID KEY -> HIGH = MID - 1
         LR    R8,R9
         BCTR  R8,0
         B     BSLOOP
*
GOHIGH   LR    R7,R9               LOW = MID + 1
         LA    R7,1(R7)
         B     BSLOOP
*
EXCLC    CLC   0(0,R6),0(R10)      EXECUTED COMPARE
*
FOUND    LR    R1,R10              R1 -> FOUND ENTRY
         SR    R15,R15             RC=0 FOUND
         B     EXIT
*
NOTFND   LA    R15,4               RC=4 NOT FOUND
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
         YREGS
         END   ASMBSR01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMBSR01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : BUSCA BINARIA EM TABELA ORDENADA
*            CLC PARA COMPARACAO, SRL PARA DIVISAO
* R1 -> PARMLIST: @TABLE, @ENTRIES(FW), @KEYLEN(FW),
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*                 @ENTRYLEN(FW), @SEARCHKEY
* R15: 0=FOUND (R1->ENTRY), 4=NOT FOUND
*================================================================*
ASMBSR01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMBSR01         
         USING ASMBSR01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            TABLE START
         L     R3,4(R1)            NUM ENTRIES ADDR
         L     R3,0(R3)            NUM ENTRIES
         L     R4,8(R1)            KEY LENGTH ADDR
         L     R4,0(R4)            KEY LENGTH
         L     R5,12(R1)           ENTRY LENGTH ADDR
         L     R5,0(R5)            ENTRY LENGTH
         L     R6,16(R1)           SEARCH KEY ADDR
*
         SR    R7,R7               LOW = 0
         LR    R8,R3               HIGH = N
         BCTR  R8,0                HIGH = N-1
*
BSLOOP   CR    R7,R8               LOW > HIGH?
         JH    NOTFND               YES - NOT FOUND
*
         LR    R9,R7               MID = LOW
         AR    R9,R8               MID = LOW + HIGH
         SRL   R9,1                MID = (LOW+HIGH)/2
*
         LR    R10,R9              COPY MID
         MR    R10,R5              MID * ENTRYLEN (USE R11)
         LA    R10,0(R11,R2)       ADDR OF MID ENTRY
*
         BCTR  R4,0                KEYLEN-1 FOR EX
         EX    R4,EXCLC            COMPARE KEYS
         JE    FOUND
         JH    GOHIGH
*
* SEARCH KEY < MID KEY -> HIGH = MID - 1
         LR    R8,R9
         BCTR  R8,0
         J     BSLOOP
*
GOHIGH   LR    R7,R9               LOW = MID + 1
         LA    R7,1(R7)
         J     BSLOOP
*
EXCLC    CLC   0(0,R6),0(R10)      EXECUTED COMPARE
*
FOUND    LR    R1,R10              R1 -> FOUND ENTRY
         SR    R15,R15             RC=0 FOUND
         J     EXIT
*
NOTFND   LA    R15,4               RC=4 NOT FOUND
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
         YREGS
         END   ASMBSR01`
  },

  {
    id: "ASM01007",
    tech: "hlasm",
    name: "Conversor Pack/Unpack",
    desc: "Converte entre formatos zoned, packed e binário usando PACK, UNPK, CVD e CVB.",
    level: "intermediate",
    filename: "ASMPCK01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMPCK01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CONVERSAO ENTRE FORMATOS NUMERICOS
*            ZONED <-> PACKED <-> BINARIO
* R1 -> PARMLIST: @INPUT, @OUTPUT, @INLEN(FW), @CONV_TYPE
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
* CONV_TYPE: 'ZP'=ZONED->PACKED, 'PZ'=PACKED->ZONED,
*            'PB'=PACKED->BINARY, 'BP'=BINARY->PACKED,
*            'ZB'=ZONED->BINARY,  'BZ'=BINARY->ZONED
*================================================================*
ASMPCK01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            INPUT ADDR
         L     R3,4(R1)            OUTPUT ADDR
         L     R4,8(R1)            LENGTH ADDR
         L     R4,0(R4)            ACTUAL LENGTH
         L     R5,12(R1)           CONV TYPE ADDR
*
         CLC   0(2,R5),=C'ZP'     ZONED TO PACKED
         BE    ZTOP
         CLC   0(2,R5),=C'PZ'     PACKED TO ZONED
         BE    PTOZ
         CLC   0(2,R5),=C'PB'     PACKED TO BINARY
         BE    PTOB
         CLC   0(2,R5),=C'BP'     BINARY TO PACKED
         BE    BTOP
         CLC   0(2,R5),=C'ZB'     ZONED TO BINARY
         BE    ZTOB
         CLC   0(2,R5),=C'BZ'     BINARY TO ZONED
         BE    BTOZ
         LA    R15,8               INVALID TYPE
         B     EXIT
*
ZTOP     BCTR  R4,0                LEN-1
         EX    R4,EXPACK           PACK OUTPUT,INPUT
         B     DONE
PTOZ     BCTR  R4,0
         EX    R4,EXUNPK           UNPK OUTPUT,INPUT
         OI    0(R3),X'F0'         FIX SIGN
         B     DONE
PTOB     ZAP   DWORK,0(8,R2)      MOVE PACKED TO DWORK
         CVB   R6,DWORK            CONVERT TO BINARY
         ST    R6,0(R3)            STORE BINARY
         B     DONE
BTOP     L     R6,0(R2)            LOAD BINARY
         CVD   R6,DWORK            CONVERT TO PACKED
         ZAP   0(8,R3),DWORK      STORE PACKED
         B     DONE
ZTOB     BCTR  R4,0
         EX    R4,EXPACK           PACK TO DWORK
         CVB   R6,DWORK
         ST    R6,0(R3)
         B     DONE
BTOZ     L     R6,0(R2)
         CVD   R6,DWORK
         UNPK  0(16,R3),DWORK
         OI    15(R3),X'F0'
         B     DONE
*
EXPACK   PACK  DWORK,0(0,R2)
EXUNPK   UNPK  0(0,R3),0(8,R2)
*
DONE     SR    R15,R15
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
         YREGS
         END   ASMPCK01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMPCK01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CONVERSAO ENTRE FORMATOS NUMERICOS
*            ZONED <-> PACKED <-> BINARIO
* R1 -> PARMLIST: @INPUT, @OUTPUT, @INLEN(FW), @CONV_TYPE
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
* CONV_TYPE: 'ZP'=ZONED->PACKED, 'PZ'=PACKED->ZONED,
*            'PB'=PACKED->BINARY, 'BP'=BINARY->PACKED,
*            'ZB'=ZONED->BINARY,  'BZ'=BINARY->ZONED
*================================================================*
ASMPCK01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMPCK01         
         USING ASMPCK01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            INPUT ADDR
         L     R3,4(R1)            OUTPUT ADDR
         L     R4,8(R1)            LENGTH ADDR
         L     R4,0(R4)            ACTUAL LENGTH
         L     R5,12(R1)           CONV TYPE ADDR
*
         CLC   0(2,R5),=C'ZP'     ZONED TO PACKED
         JE    ZTOP
         CLC   0(2,R5),=C'PZ'     PACKED TO ZONED
         JE    PTOZ
         CLC   0(2,R5),=C'PB'     PACKED TO BINARY
         JE    PTOB
         CLC   0(2,R5),=C'BP'     BINARY TO PACKED
         JE    BTOP
         CLC   0(2,R5),=C'ZB'     ZONED TO BINARY
         JE    ZTOB
         CLC   0(2,R5),=C'BZ'     BINARY TO ZONED
         JE    BTOZ
         LA    R15,8               INVALID TYPE
         J     EXIT
*
ZTOP     BCTR  R4,0                LEN-1
         EX    R4,EXPACK           PACK OUTPUT,INPUT
         J     DONE
PTOZ     BCTR  R4,0
         EX    R4,EXUNPK           UNPK OUTPUT,INPUT
         OI    0(R3),X'F0'         FIX SIGN
         J     DONE
PTOB     ZAP   DWORK,0(8,R2)      MOVE PACKED TO DWORK
         CVB   R6,DWORK            CONVERT TO BINARY
         ST    R6,0(R3)            STORE BINARY
         J     DONE
BTOP     L     R6,0(R2)            LOAD BINARY
         CVD   R6,DWORK            CONVERT TO PACKED
         ZAP   0(8,R3),DWORK      STORE PACKED
         J     DONE
ZTOB     BCTR  R4,0
         EX    R4,EXPACK           PACK TO DWORK
         CVB   R6,DWORK
         ST    R6,0(R3)
         J     DONE
BTOZ     L     R6,0(R2)
         CVD   R6,DWORK
         UNPK  0(16,R3),DWORK
         OI    15(R3),X'F0'
         J     DONE
*
EXPACK   PACK  DWORK,0(0,R2)
EXUNPK   UNPK  0(0,R3),0(8,R2)
*
DONE     SR    R15,R15
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
         YREGS
         END   ASMPCK01`
  },

  {
    id: "ASM01008",
    tech: "hlasm",
    name: "Comparação de Buffers",
    desc: "Move e compara blocos longos com MVCL, CLCL e técnica de propagação MVC.",
    level: "advanced",
    filename: "ASMBUF01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMBUF01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : OPERACOES COM BUFFERS LONGOS
*            MVCL (MOVE), CLCL (COMPARE), MVC PROPAGATION
* R1 -> PARMLIST: @OP(1), @BUF1, @BUF2, @LEN(FW), @PAD(1)
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
* OP: 'M'=MOVE, 'C'=COMPARE, 'F'=FILL(PROPAGATION)
* R15: COMPARE->0=EQUAL,1=B1<B2,2=B1>B2 | OTHERS->0=OK
*================================================================*
ASMBUF01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R5,0(R1)            OP ADDRESS
         L     R2,4(R1)            BUF1 ADDRESS
         L     R3,8(R1)            BUF2 ADDRESS
         L     R4,12(R1)           LENGTH ADDRESS
         L     R4,0(R4)            ACTUAL LENGTH
         L     R6,16(R1)           PAD ADDRESS
*
         CLI   0(R5),C'M'          MOVE?
         BE    DOMOVE
         CLI   0(R5),C'C'          COMPARE?
         BE    DOCOMP
         CLI   0(R5),C'F'          FILL?
         BE    DOFILL
         LA    R15,8
         B     EXIT
*
DOMOVE   LR    R0,R2               TARGET = BUF1
         LR    R1,R4               TARGET LEN
         LR    R14,R3              SOURCE = BUF2
         LR    R15,R4              SOURCE LEN
         MVCL  R0,R14              LONG MOVE
         SR    R15,R15
         B     EXIT
*
DOCOMP   LR    R0,R2               BUF1
         LR    R1,R4               LEN1
         LR    R14,R3              BUF2
         LR    R15,R4              LEN2
         CLCL  R0,R14              LONG COMPARE
         BE    CMPEQ
         BL    CMPLT
         LA    R15,2               BUF1 > BUF2
         B     EXIT
CMPEQ    SR    R15,R15             EQUAL
         B     EXIT
CMPLT    LA    R15,1               BUF1 < BUF2
         B     EXIT
*
* FILL VIA MVC PROPAGATION: SET FIRST BYTE, MVC REST
DOFILL   MVC   0(1,R2),0(R6)       SET FIRST BYTE = PAD
         BCTR  R4,0                LEN-1
         BCTR  R4,0                LEN-2
         EX    R4,EXMVC            MVC 1(LEN-1,BUF1),0(BUF1)
         SR    R15,R15
         B     EXIT
*
EXMVC    MVC   1(0,R2),0(R2)       EXECUTED PROPAGATION
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
         YREGS
         END   ASMBUF01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMBUF01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : OPERACOES COM BUFFERS LONGOS
*            MVCL (MOVE), CLCL (COMPARE), MVC PROPAGATION
* R1 -> PARMLIST: @OP(1), @BUF1, @BUF2, @LEN(FW), @PAD(1)
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
* OP: 'M'=MOVE, 'C'=COMPARE, 'F'=FILL(PROPAGATION)
* R15: COMPARE->0=EQUAL,1=B1<B2,2=B1>B2 | OTHERS->0=OK
*================================================================*
ASMBUF01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMBUF01         
         USING ASMBUF01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R5,0(R1)            OP ADDRESS
         L     R2,4(R1)            BUF1 ADDRESS
         L     R3,8(R1)            BUF2 ADDRESS
         L     R4,12(R1)           LENGTH ADDRESS
         L     R4,0(R4)            ACTUAL LENGTH
         L     R6,16(R1)           PAD ADDRESS
*
         CLI   0(R5),C'M'          MOVE?
         JE    DOMOVE
         CLI   0(R5),C'C'          COMPARE?
         JE    DOCOMP
         CLI   0(R5),C'F'          FILL?
         JE    DOFILL
         LA    R15,8
         J     EXIT
*
DOMOVE   LR    R0,R2               TARGET = BUF1
         LR    R1,R4               TARGET LEN
         LR    R14,R3              SOURCE = BUF2
         LR    R15,R4              SOURCE LEN
         MVCL  R0,R14              LONG MOVE
         SR    R15,R15
         J     EXIT
*
DOCOMP   LR    R0,R2               BUF1
         LR    R1,R4               LEN1
         LR    R14,R3              BUF2
         LR    R15,R4              LEN2
         CLCL  R0,R14              LONG COMPARE
         JE    CMPEQ
         JL    CMPLT
         LA    R15,2               BUF1 > BUF2
         J     EXIT
CMPEQ    SR    R15,R15             EQUAL
         J     EXIT
CMPLT    LA    R15,1               BUF1 < BUF2
         J     EXIT
*
* FILL VIA MVC PROPAGATION: SET FIRST BYTE, MVC REST
DOFILL   MVC   0(1,R2),0(R6)       SET FIRST BYTE = PAD
         BCTR  R4,0                LEN-1
         BCTR  R4,0                LEN-2
         EX    R4,EXMVC            MVC 1(LEN-1,BUF1),0(BUF1)
         SR    R15,R15
         J     EXIT
*
EXMVC    MVC   1(0,R2),0(R2)       EXECUTED PROPAGATION
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
         YREGS
         END   ASMBUF01`
  },

  {
    id: "ASM01009",
    tech: "hlasm",
    name: "Translação de Caracteres",
    desc: "Três técnicas de busca em tabela: TRT (translate and test), BALR e BAS.",
    level: "intermediate",
    filename: "ASMTRT01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMTRT01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : DEMONSTRA TRT (TRANSLATE AND TEST) PARA
*            BUSCA DE CARACTERES ESPECIAIS EM BUFFER
* R1 -> @BUFFER, @LEN(FW)
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
* R15: 0=NENHUM ESPECIAL, 4=ENCONTRADO (R1->POSICAO)
*================================================================*
ASMTRT01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            BUFFER ADDR
         L     R3,4(R1)            LENGTH ADDR
         L     R3,0(R3)            ACTUAL LENGTH
*
* BUILD TRT TABLE - ZEROS EXCEPT FOR SPECIAL CHARS
         XC    TRTTAB,TRTTAB       CLEAR TABLE
         MVI   TRTTAB+C'<',X'01'  FLAG '<'
         MVI   TRTTAB+C'>',X'02'  FLAG '>'
         MVI   TRTTAB+C'&',X'03'  FLAG '&'
         MVI   TRTTAB+C'''',X'04' FLAG QUOTE
*
         BCTR  R3,0                LEN-1
         EX    R3,EXTRT            TRT BUFFER
         BZ    NOTFOUND            CC=0, NO MATCH
*
* R1 -> FIRST SPECIAL, R2 = FUNCTION BYTE
         LA    R15,4               FOUND
         B     EXIT
*
NOTFOUND SR    R15,R15             NOT FOUND
*
EXTRT    TRT   0(0,R2),TRTTAB     EXECUTED TRT
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
TRTTAB   DS    XL256
         YREGS
         END   ASMTRT01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMTRT01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : DEMONSTRA TRT (TRANSLATE AND TEST) PARA
*            BUSCA DE CARACTERES ESPECIAIS EM BUFFER
* R1 -> @BUFFER, @LEN(FW)
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
* R15: 0=NENHUM ESPECIAL, 4=ENCONTRADO (R1->POSICAO)
*================================================================*
ASMTRT01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMTRT01         
         USING ASMTRT01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R2,0(R1)            BUFFER ADDR
         L     R3,4(R1)            LENGTH ADDR
         L     R3,0(R3)            ACTUAL LENGTH
*
* BUILD TRT TABLE - ZEROS EXCEPT FOR SPECIAL CHARS
         XC    TRTTAB,TRTTAB       CLEAR TABLE
         MVI   TRTTAB+C'<',X'01'  FLAG '<'
         MVI   TRTTAB+C'>',X'02'  FLAG '>'
         MVI   TRTTAB+C'&',X'03'  FLAG '&'
         MVI   TRTTAB+C'''',X'04' FLAG QUOTE
*
         BCTR  R3,0                LEN-1
         EX    R3,EXTRT            TRT BUFFER
         JZ    NOTFOUND             CC=0, NO MATCH
*
* R1 -> FIRST SPECIAL, R2 = FUNCTION BYTE
         LA    R15,4               FOUND
         J     EXIT
*
NOTFOUND SR    R15,R15             NOT FOUND
*
EXTRT    TRT   0(0,R2),TRTTAB     EXECUTED TRT
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
TRTTAB   DS    XL256
         YREGS
         END   ASMTRT01`
  },

  {
    id: "ASM01010",
    tech: "hlasm",
    name: "Linkage de Sub-rotinas",
    desc: "Save area padrão, lista de parâmetros e CALL para sub-rotinas internas e externas.",
    level: "basic",
    filename: "ASMLNK01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMLNK01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : DEMONSTRA LINKAGE CONVENTIONS DO Z/OS
*            SAVE AREA 18F, PARM LIST, CALL INTERNO/EXTERNO
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMLNK01 CSECT
         STM   R14,R12,12(R13)     SAVE CALLER REGS
         BALR  R12,0                ESTABLISH BASE
         USING *,R12
         LA    R11,SAVE             MY SAVE AREA
         ST    R13,SAVE+4           BACKWARD CHAIN
         ST    R11,8(R13)           FORWARD CHAIN
         LR    R13,R11              ACTIVATE MY SAVE
*
* CALL INTERNAL SUBROUTINE VIA BAL
         LA    R1,PARM1             LOAD PARM ADDRESS
         BAL   R14,INTSUB           BRANCH AND LINK
*
* CALL EXTERNAL PROGRAM VIA CALL MACRO
         LA    R1,EXTPARMS          PARM LIST
         L     R15,=V(EXTPROG)      LOAD EPA
         BALR  R14,R15              BRANCH TO EXTERNAL
*
* RETURN TO CALLER
         L     R13,SAVE+4           RESTORE CALLER SAVE
         LM    R14,R12,12(R13)      RESTORE REGS
         SR    R15,R15              RC=0
         BR    R14                  RETURN
*
*--- INTERNAL SUBROUTINE ---
INTSUB   ST    R14,INTRET           SAVE RETURN ADDR
         L     R2,0(R1)             GET PARM
         WTO   'INTERNAL SUB CALLED'
         L     R14,INTRET           RESTORE RETURN
         BR    R14                  RETURN
*
INTRET   DS    F
SAVE     DS    18F
PARM1    DC    A(DATA1)
EXTPARMS DC    A(DATA1)
         DC    X'80'
         DC    AL3(DATA2)
DATA1    DC    CL20'HELLO FROM ASMLNK01'
DATA2    DC    F'42'
         LTORG
         YREGS
         END   ASMLNK01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMLNK01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : DEMONSTRA LINKAGE CONVENTIONS DO Z/OS
*            SAVE AREA 18F, PARM LIST, CALL INTERNO/EXTERNO
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMLNK01 CSECT
         STM   R14,R12,12(R13)     SAVE CALLER REGS
         LARL  R12,ASMLNK01         ESTABLISH BASE
         USING ASMLNK01,R12
         LA    R11,SAVE             MY SAVE AREA
         ST    R13,SAVE+4           BACKWARD CHAIN
         ST    R11,8(R13)           FORWARD CHAIN
         LR    R13,R11              ACTIVATE MY SAVE
*
* CALL INTERNAL SUBROUTINE VIA BAL
         LA    R1,PARM1             LOAD PARM ADDRESS
         BAL   R14,INTSUB           BRANCH AND LINK
*
* CALL EXTERNAL PROGRAM VIA CALL MACRO
         LA    R1,EXTPARMS          PARM LIST
         L     R15,=V(EXTPROG)      LOAD EPA
         BALR  R14,R15              BRANCH TO EXTERNAL
*
* RETURN TO CALLER
         L     R13,SAVE+4           RESTORE CALLER SAVE
         LM    R14,R12,12(R13)      RESTORE REGS
         SR    R15,R15              RC=0
         BR    R14                  RETURN
*
*--- INTERNAL SUBROUTINE ---
INTSUB   ST    R14,INTRET           SAVE RETURN ADDR
         L     R2,0(R1)             GET PARM
         WTO   'INTERNAL SUB CALLED'
         L     R14,INTRET           RESTORE RETURN
         BR    R14                  RETURN
*
INTRET   DS    F
SAVE     DS    18F
PARM1    DC    A(DATA1)
EXTPARMS DC    A(DATA1)
         DC    X'80'
         DC    AL3(DATA2)
DATA1    DC    CL20'HELLO FROM ASMLNK01'
DATA2    DC    F'42'
         LTORG
         YREGS
         END   ASMLNK01`
  },

  {
    id: "ASM01011",
    tech: "hlasm",
    name: "Carga Dinâmica de Programas",
    desc: "Usa LOAD, DELETE, LINK e XCTL para manipulação dinâmica de load modules.",
    level: "advanced",
    filename: "ASMDYN01.hlasm",
    tags: ["HLASM"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMDYN01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CARGA DINAMICA DE MODULOS
*            LOAD, DELETE, LINK, XCTL
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMDYN01 CSECT
         STM   R14,R12,12(R13)
         BALR  R12,0
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
* LOAD - CARREGA MODULO NA MEMORIA SEM EXECUTAR
         LOAD  EP=UTILPGM
         LR    R2,R0               ENTRY POINT
         LR    R3,R1               LENGTH/AUTH
         ST    R2,EPADDR            SAVE EP ADDR
         WTO   'ASMDYN01: MODULE LOADED'
*
* CALL VIA SAVED EP
         L     R15,EPADDR
         LA    R1,PARMS
         BALR  R14,R15             CALL LOADED MODULE
*
* DELETE - REMOVE DA MEMORIA
         DELETE EP=UTILPGM
         WTO   'ASMDYN01: MODULE DELETED'
*
* LINK - CARREGA, EXECUTA E RETORNA
         LINK  EP=UTILPGM,PARAM=(PARMDATA),VL=1
         LR    R4,R15              SAVE RC
         WTO   'ASMDYN01: LINK RETURNED'
*
* XCTL - TRANSFERE CONTROLE (SEM RETORNO)
*        COMENTADO PARA NAO PERDER CONTROLE EM DEMO
*        XCTL  EP=NEXTPGM,PARAM=(PARMDATA),VL=1
*
         SR    R15,R15
         L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
EPADDR   DS    F
PARMS    DC    X'80'
         DC    AL3(PARMDATA)
PARMDATA DC    CL20'DYNAMIC CALL DATA'
         LTORG
         YREGS
         END   ASMDYN01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMDYN01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CARGA DINAMICA DE MODULOS
*            LOAD, DELETE, LINK, XCTL
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMDYN01 CSECT
         STM   R14,R12,12(R13)
         LARL  R12,ASMDYN01         
         USING ASMDYN01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
* LOAD - CARREGA MODULO NA MEMORIA SEM EXECUTAR
         LOAD  EP=UTILPGM
         LR    R2,R0               ENTRY POINT
         LR    R3,R1               LENGTH/AUTH
         ST    R2,EPADDR            SAVE EP ADDR
         WTO   'ASMDYN01: MODULE LOADED'
*
* CALL VIA SAVED EP
         L     R15,EPADDR
         LA    R1,PARMS
         BALR  R14,R15             CALL LOADED MODULE
*
* DELETE - REMOVE DA MEMORIA
         DELETE EP=UTILPGM
         WTO   'ASMDYN01: MODULE DELETED'
*
* LINK - CARREGA, EXECUTA E RETORNA
         LINK  EP=UTILPGM,PARAM=(PARMDATA),VL=1
         LR    R4,R15              SAVE RC
         WTO   'ASMDYN01: LINK RETURNED'
*
* XCTL - TRANSFERE CONTROLE (SEM RETORNO)
*        COMENTADO PARA NAO PERDER CONTROLE EM DEMO
*        XCTL  EP=NEXTPGM,PARAM=(PARMDATA),VL=1
*
         SR    R15,R15
         L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
EPADDR   DS    F
PARMS    DC    X'80'
         DC    AL3(PARMDATA)
PARMDATA DC    CL20'DYNAMIC CALL DATA'
         LTORG
         YREGS
         END   ASMDYN01`
  },

  // ========================================================================
  // JCL (13 programas)
  // ========================================================================

  {
    id: "JCL01001",
    tech: "jcl",
    name: "Compile-Link-Go",
    desc: "JCL padrão para compilar fonte COBOL, linkeditar objetos e executar load module em um job.",
    level: "basic",
    filename: "JCLCOMP1.jcl",
    tags: ["JCL"],
    source:
`//JCLCOMP1 JOB (ACCT),'COMPILE LINK GO',
//JCLCOMP1 JOB (ACCT),'COMPILE LINK GO',
//             CLASS=A,MSGCLASS=X,MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID
//*================================================================*
//* JCL: COMPILE-LINK-GO PARA COBOL
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//* STEP1: COMPILACAO COBOL (IGYCRCTL)
//* STEP2: LINKEDIT (IEWL)
//* STEP3: EXECUCAO DO LOAD MODULE
//*================================================================*
//*
//COMPILE  EXEC PGM=IGYCRCTL,
//             PARM='RENT,APOST,MAP,XREF,OFFSET,FLAG(I,E)'
//STEPLIB  DD  DSN=IGY.V6R4M0.SIGYCOMP,DISP=SHR
//SYSIN    DD  DSN=&SYSUID..COBOL.SOURCE(MYPROG),DISP=SHR
//SYSLIB   DD  DSN=&SYSUID..COBOL.COPYLIB,DISP=SHR
//SYSLIN   DD  DSN=&&OBJMOD,DISP=(MOD,PASS),
//             SPACE=(TRK,(5,5)),UNIT=SYSDA
//SYSPRINT DD  SYSOUT=*
//SYSUT1   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT2   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT3   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT4   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT5   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT6   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT7   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//*
//LKED     EXEC PGM=IEWL,COND=(4,LT),
//             PARM='LIST,XREF,LET,RENT'
//SYSLIN   DD  DSN=&&OBJMOD,DISP=(OLD,DELETE)
//SYSLMOD  DD  DSN=&SYSUID..LOAD(MYPROG),DISP=SHR
//SYSPRINT DD  SYSOUT=*
//SYSUT1   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//*
//GO       EXEC PGM=*.LKED.SYSLMOD,COND=(4,LT)
//STEPLIB  DD  DSN=&SYSUID..LOAD,DISP=SHR
//SYSOUT   DD  SYSOUT=*
//ENTRADA  DD  DSN=&SYSUID..DATA.INPUT,DISP=SHR
//SAIDA    DD  DSN=&SYSUID..DATA.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(10,5)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*`
  },

  {
    id: "JCL01002",
    tech: "jcl",
    name: "Cópia de Datasets",
    desc: "Copia datasets sequenciais e membros PDS usando IEBGENER e IEBCOPY com exemplos práticos.",
    level: "basic",
    filename: "JCLCOPY1.jcl",
    tags: ["JCL"],
    source:
`//JCLCOPY1 JOB (ACCT),'DATASET COPY',
//JCLCOPY1 JOB (ACCT),'DATASET COPY',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: COPIA DE DATASETS COM IEBGENER E IEBCOPY
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//*================================================================*
//*--- STEP 1: IEBGENER - COPIA SEQUENCIAL ---
//GENCOPY  EXEC PGM=IEBGENER
//SYSUT1   DD  DSN=&SYSUID..DATA.ORIGINAL,DISP=SHR
//SYSUT2   DD  DSN=&SYSUID..DATA.BACKUP,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(50,10)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)
//SYSIN    DD  DUMMY
//SYSPRINT DD  SYSOUT=*
//*
//*--- STEP 2: IEBCOPY - COPIA DE MEMBROS PDS ---
//PDSCOPY  EXEC PGM=IEBCOPY,COND=(0,NE)
//SYSUT3   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT4   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//INPDS    DD  DSN=&SYSUID..SOURCE.PDS,DISP=SHR
//OUTPDS   DD  DSN=&SYSUID..BACKUP.PDS,DISP=SHR
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  COPY OUTDD=OUTPDS,INDD=INPDS
  SELECT MEMBER=(PROG001,PROG002,PROG003)
/*
//*
//*--- STEP 3: IEBCOPY - COPIA PDS COMPLETO (COMPRESS) ---
//FULLCOPY EXEC PGM=IEBCOPY,COND=(0,NE)
//SYSUT3   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SYSUT4   DD  SPACE=(CYL,(1,1)),UNIT=SYSDA
//SOURCE   DD  DSN=&SYSUID..COBOL.SOURCE,DISP=SHR
//TARGET   DD  DSN=&SYSUID..COBOL.BKPSRC,DISP=SHR
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  COPY OUTDD=TARGET,INDD=SOURCE
/*`
  },

  {
    id: "JCL01003",
    tech: "jcl",
    name: "Definição KSDS IDCAMS",
    desc: "Define e inicializa um VSAM KSDS com parâmetros específicos de dimensionamento e indexação.",
    level: "intermediate",
    filename: "JCLVSAM1.jcl",
    tags: ["JCL"],
    source:
`//JCLVSAM1 JOB (ACCT),'DEFINE KSDS',
//JCLVSAM1 JOB (ACCT),'DEFINE KSDS',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: DEFINE VSAM KSDS COM IDCAMS
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//* DEFINE CLUSTER + REPRO INITIAL LOAD
//*================================================================*
//*--- STEP 1: DELETE EXISTING (IF ANY) ---
//DELETE   EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  DELETE &SYSUID..VSAM.CLIENTES.KSDS -
         CLUSTER -
         PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//*
//*--- STEP 2: DEFINE CLUSTER ---
//DEFINE   EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  DEFINE CLUSTER( -
         NAME(&SYSUID..VSAM.CLIENTES.KSDS) -
         INDEXED -
         RECORDS(10000 2000) -
         RECORDSIZE(200 200) -
         FREESPACE(20 10) -
         SHAREOPTIONS(2 3) -
         SPEED -
         REUSE -
       ) -
       DATA( -
         NAME(&SYSUID..VSAM.CLIENTES.KSDS.DATA) -
         CONTROLINTERVALSIZE(4096) -
       ) -
       INDEX( -
         NAME(&SYSUID..VSAM.CLIENTES.KSDS.INDEX) -
         CONTROLINTERVALSIZE(2048) -
       )
/*
//*
//*--- STEP 3: INITIAL LOAD VIA REPRO ---
//LOAD     EXEC PGM=IDCAMS,COND=(0,NE)
//INFILE   DD  DSN=&SYSUID..DATA.CLIENTES.SEQ,DISP=SHR
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  REPRO INFILE(INFILE) -
        OUTDATASET(&SYSUID..VSAM.CLIENTES.KSDS)
/*
//*
//*--- STEP 4: VERIFY AND LISTCAT ---
//VERIFY   EXEC PGM=IDCAMS,COND=(0,NE)
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  VERIFY DATASET(&SYSUID..VSAM.CLIENTES.KSDS)
  LISTCAT ENT(&SYSUID..VSAM.CLIENTES.KSDS) ALL
/*`
  },

  {
    id: "JCL01004",
    tech: "jcl",
    name: "Formatação DFSORT",
    desc: "Gera relatório formatado a partir de arquivo de entrada usando DFSORT com OUTFIL e HEADER/TRAILER.",
    level: "intermediate",
    filename: "JCLSORT1.jcl",
    tags: ["JCL"],
    source:
`//JCLSORT1 JOB (ACCT),'DFSORT FORMAT',
//JCLSORT1 JOB (ACCT),'DFSORT FORMAT',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: DFSORT COM OUTFIL FORMATADO
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//* GERA RELATORIO COM HEADER, DETALHE E TRAILER
//*================================================================*
//SORT     EXEC PGM=SORT
//SORTIN   DD  DSN=&SYSUID..DATA.VENDAS,DISP=SHR
//SORTOUT  DD  DSN=&SYSUID..DATA.VENDAS.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(20,5)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//REPORT   DD  DSN=&SYSUID..REPORT.VENDAS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(30,10)),UNIT=SYSDA,
//             DCB=(RECFM=FBA,LRECL=133,BLKSIZE=0)
//SYSOUT   DD  SYSOUT=*
//SYSIN    DD  *
  SORT FIELDS=(1,10,CH,A,11,6,CH,A)
  INCLUDE COND=(30,1,CH,NE,C'X')
*
  OUTFIL FNAMES=REPORT,
    HEADER1=(5:'RELATORIO DE VENDAS POR FILIAL',
             80:'DATA: ',&DATE,
             110:'PAG ',&PAGE),
    HEADER2=(5:'FILIAL',16:'DEPTO',
             30:'DESCRICAO',
             70:'VALOR',
             90:'STATUS'),
    LINES=55,
    TRAILER1=(5:'*** TOTAL DE REGISTROS: ',
              COUNT,
              40:'***')
/*`
  },

  {
    id: "JCL01005",
    tech: "jcl",
    name: "Estatísticas ICETOOL",
    desc: "Demonstra operações ICETOOL: SELECT, SORT, SPLICE, DISPLAY, STATS e OCCUR.",
    level: "advanced",
    filename: "JCLICE01.jcl",
    tags: ["JCL"],
    source:
`//JCLICE01 JOB (ACCT),'ICETOOL STATS',
//JCLICE01 JOB (ACCT),'ICETOOL STATS',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: ICETOOL - OPERACOES AVANCADAS
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//*================================================================*
//STEP01   EXEC PGM=ICETOOL
//TOOLMSG  DD  SYSOUT=*
//DFSMSG   DD  SYSOUT=*
//INDD1    DD  DSN=&SYSUID..DATA.TRANSACOES,DISP=SHR
//OUTDD1   DD  DSN=&SYSUID..DATA.TRANS.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(20,5)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//OUTDD2   DD  DSN=&SYSUID..DATA.TRANS.STATS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(5,2)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//OUTDD3   DD  DSN=&SYSUID..DATA.TRANS.OCCUR,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(5,2)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//TOOLIN   DD  *
* SORT INPUT BY KEY
  SORT FROM(INDD1) TO(OUTDD1) USING(SRT1)
* GENERATE STATISTICS
  STATS FROM(OUTDD1) ON(50,9,ZD) TITLE('VALOR STATS')
* OCCURRENCE COUNT
  OCCUR FROM(OUTDD1) LIST(OUTDD3) -
        ON(1,10,CH) TITLE('OCORRENCIAS POR FILIAL')
* DISPLAY FIRST 20 RECORDS
  DISPLAY FROM(OUTDD1) LIST(OUTDD2) -
          ON(1,10,CH) ON(11,8,CH) ON(50,9,ZD) -
          HEADER('FILIAL','DATA','VALOR') -
          LIMIT(20)
/*
//SRT1CNTL DD  *
  SORT FIELDS=(1,10,CH,A,50,9,ZD,D)
  INCLUDE COND=(50,9,ZD,GT,0)
/*`
  },

  {
    id: "JCL01006",
    tech: "jcl",
    name: "Backup/Restore",
    desc: "Usa ADRDSSU para backup (DUMP) de datasets e verificação pós-restore.",
    level: "intermediate",
    filename: "JCLBKP01.jcl",
    tags: ["JCL"],
    source:
`//JCLBKP01 JOB (ACCT),'BACKUP RESTORE',
//JCLBKP01 JOB (ACCT),'BACKUP RESTORE',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: BACKUP E RESTORE COM ADRDSSU
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//*================================================================*
//*--- STEP 1: DUMP (BACKUP) ---
//BACKUP   EXEC PGM=ADRDSSU,REGION=0M
//SYSPRINT DD  SYSOUT=*
//DASD1    DD  VOL=SER=VOL001,UNIT=3390,DISP=SHR
//TAPE1    DD  DSN=&SYSUID..BACKUP.DUMP01,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             SPACE=(CYL,(100,20),RLSE)
//SYSIN    DD  *
  DUMP DATASET( -
         INCLUDE(&SYSUID..PROD.**) -
       ) -
       OUTDDNAME(TAPE1) -
       OPTIMIZE(4) -
       TOLERATE(ENQFAILURE) -
       SPHERE -
       COMPRESS
/*
//*
//*--- STEP 2: RESTORE (COM RENAME) ---
//RESTORE  EXEC PGM=ADRDSSU,REGION=0M,COND=(0,NE)
//SYSPRINT DD  SYSOUT=*
//TAPE2    DD  DSN=&SYSUID..BACKUP.DUMP01,DISP=SHR
//SYSIN    DD  *
  RESTORE DATASET( -
            INCLUDE(&SYSUID..PROD.**) -
          ) -
          INDDNAME(TAPE2) -
          RENAMEUNCONDITIONAL( -
            (&SYSUID..PROD.**, -
             &SYSUID..RESTORE.**) -
          ) -
          REPLACE -
          CATALOG
/*`
  },

  {
    id: "JCL01007",
    tech: "jcl",
    name: "Gerenciamento GDG",
    desc: "Define base GDG, cria gerações (+1), copia dados e lista com IDCAMS LISTCAT.",
    level: "intermediate",
    filename: "JCLGDG01.jcl",
    tags: ["JCL"],
    source:
`//JCLGDG01 JOB (ACCT),'GDG MANAGEMENT',
//JCLGDG01 JOB (ACCT),'GDG MANAGEMENT',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: GERENCIAMENTO DE GDG (GENERATION DATA GROUP)
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//*================================================================*
//*--- STEP 1: DEFINE GDG BASE ---
//DEFGDG   EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  DEFINE GDG( -
         NAME(&SYSUID..BACKUP.DIARIO) -
         LIMIT(7) -
         NOEMPTY -
         SCRATCH)
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//*
//*--- STEP 2: CREATE NEW GENERATION (+1) ---
//NEWGEN   EXEC PGM=IEBGENER
//SYSUT1   DD  DSN=&SYSUID..DATA.CORRENTE,DISP=SHR
//SYSUT2   DD  DSN=&SYSUID..BACKUP.DIARIO(+1),
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,2)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//SYSIN    DD  DUMMY
//SYSPRINT DD  SYSOUT=*
//*
//*--- STEP 3: LIST ALL GENERATIONS ---
//LISTGDG  EXEC PGM=IDCAMS,COND=(0,NE)
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  LISTCAT ENT(&SYSUID..BACKUP.DIARIO) ALL GDG
/*
//*
//*--- STEP 4: READ CURRENT (0) AND PREVIOUS (-1) ---
//READGEN  EXEC PGM=MYPROG,COND=(0,NE)
//STEPLIB  DD  DSN=&SYSUID..LOAD,DISP=SHR
//CURRENT  DD  DSN=&SYSUID..BACKUP.DIARIO(0),DISP=SHR
//PREVIOUS DD  DSN=&SYSUID..BACKUP.DIARIO(-1),DISP=SHR
//SYSOUT   DD  SYSOUT=*`
  },

  {
    id: "JCL01008",
    tech: "jcl",
    name: "Opções SORT/MERGE",
    desc: "Ordenação avançada usando PARM, DYNALLOC e várias opções de controle.",
    level: "intermediate",
    filename: "JCLSRT02.jcl",
    tags: ["JCL"],
    source:
`//JCLSRT02 JOB (ACCT),'SORT MERGE OPT',
//JCLSRT02 JOB (ACCT),'SORT MERGE OPT',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: SORT/MERGE COM OPCOES AVANCADAS
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//*================================================================*
//*--- STEP 1: SORT COM INCLUDE E OUTREC ---
//SORT1    EXEC PGM=SORT,
//             PARM='MSGPRT=ALL,DYNALLOC,LIST'
//SORTIN   DD  DSN=&SYSUID..DATA.MOVIMENTOS,DISP=SHR
//SORTOUT  DD  DSN=&SYSUID..DATA.MOV.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(50,10)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=120,BLKSIZE=0)
//SYSOUT   DD  SYSOUT=*
//SYSIN    DD  *
  SORT FIELDS=(1,8,CH,A,9,6,PD,D)
  INCLUDE COND=(20,2,CH,EQ,C'SP',OR,
                20,2,CH,EQ,C'RJ')
  OUTREC FIELDS=(1,8,
                 9,6,
                 20,2,
                 30,40,
                 SEQNUM,8,ZD,START=1)
  SUM FIELDS=(9,6,PD)
  OPTION EQUALS,DYNALLOC=(SYSDA,5)
/*
//*
//*--- STEP 2: MERGE DE 3 ARQUIVOS ---
//MERGE1   EXEC PGM=SORT,COND=(4,LT)
//SORTIN01 DD  DSN=&SYSUID..DATA.FILIAL01,DISP=SHR
//SORTIN02 DD  DSN=&SYSUID..DATA.FILIAL02,DISP=SHR
//SORTIN03 DD  DSN=&SYSUID..DATA.FILIAL03,DISP=SHR
//SORTOUT  DD  DSN=&SYSUID..DATA.CONSOLIDADO,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,5)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//SYSOUT   DD  SYSOUT=*
//SYSIN    DD  *
  MERGE FIELDS=(1,10,CH,A)
  OPTION VLSHRT
/*`
  },

  {
    id: "JCL01009",
    tech: "jcl",
    name: "Joins DFSORT",
    desc: "JOINKEYS avançado: junta dois arquivos por chave com JOIN UNPAIRED e REFORMAT.",
    level: "advanced",
    filename: "JCLJOIN1.jcl",
    tags: ["JCL"],
    source:
`//JCLJOIN1 JOB (ACCT),'DFSORT JOINS',
//JCLJOIN1 JOB (ACCT),'DFSORT JOINS',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: JOINKEYS - JOIN DE DOIS ARQUIVOS
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//* F1=CLIENTES (CHAVE POS 1-10)
//* F2=PEDIDOS (CHAVE POS 1-10)
//*================================================================*
//JOIN     EXEC PGM=SORT
//SORTJNF1 DD  DSN=&SYSUID..DATA.CLIENTES,DISP=SHR
//SORTJNF2 DD  DSN=&SYSUID..DATA.PEDIDOS,DISP=SHR
//SORTOUT  DD  DSN=&SYSUID..DATA.MERGED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//NOMATCH  DD  DSN=&SYSUID..DATA.ORPHANS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(5,2)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//SYSOUT   DD  SYSOUT=*
//SYSIN    DD  *
* JOIN TWO FILES ON KEY POSITIONS 1-10
  JOINKEYS FILE=F1,FIELDS=(1,10,A)
  JOINKEYS FILE=F2,FIELDS=(1,10,A)
  JOIN UNPAIRED,F1,F2
  REFORMAT FIELDS=(F1:1,100,F2:11,50,?)
*
* ? = MATCH INDICATOR: B=BOTH, 1=F1 ONLY, 2=F2 ONLY
  SORT FIELDS=COPY
*
* MATCHED RECORDS TO SORTOUT
  OUTFIL FNAMES=SORTOUT,
         INCLUDE=(151,1,CH,EQ,C'B'),
         BUILD=(1,100,101,50)
*
* UNMATCHED TO NOMATCH
  OUTFIL FNAMES=NOMATCH,
         INCLUDE=(151,1,CH,NE,C'B'),
         BUILD=(1,100)
/*`
  },

  {
    id: "JCL01010",
    tech: "jcl",
    name: "Execução Condicional",
    desc: "IF/THEN/ELSE/ENDIF para controle avançado de fluxo com SET de variáveis simbólicas.",
    level: "intermediate",
    filename: "JCLCOND1.jcl",
    tags: ["JCL"],
    source:
`//JCLCOND1 JOB (ACCT),'CONDITIONAL EXEC',
//JCLCOND1 JOB (ACCT),'CONDITIONAL EXEC',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: EXECUCAO CONDICIONAL COM IF/THEN/ELSE
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//* DEMONSTRA: SET, IF/THEN/ELSE, COND PARAMETER
//*================================================================*
//*
//         SET ENV=PROD
//         SET HLQ=&SYSUID
//         SET MAXRC=4
//*
//*--- STEP 1: VALIDACAO ---
//VALIDA   EXEC PGM=VALIDATOR
//STEPLIB  DD  DSN=&HLQ..LOAD,DISP=SHR
//INPUT    DD  DSN=&HLQ..&ENV..DATA.INPUT,DISP=SHR
//SYSOUT   DD  SYSOUT=*
//*
//*--- CONDICIONAL: SO PROCESSA SE VALIDACAO OK ---
//         IF (VALIDA.RC <= &MAXRC) THEN
//*
//PROCESS  EXEC PGM=MAINPROG
//STEPLIB  DD  DSN=&HLQ..LOAD,DISP=SHR
//INPUT    DD  DSN=&HLQ..&ENV..DATA.INPUT,DISP=SHR
//OUTPUT   DD  DSN=&HLQ..&ENV..DATA.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),UNIT=SYSDA
//SYSOUT   DD  SYSOUT=*
//*
//         ELSE
//*
//NOTIFY   EXEC PGM=IEBGENER
//SYSUT1   DD  *
ERRO: VALIDACAO FALHOU - PROCESSAMENTO CANCELADO
RC DO STEP VALIDA EXCEDEU O LIMITE CONFIGURADO.
VERIFIQUE O LOG DO STEP VALIDA PARA DETALHES.
/*
//SYSUT2   DD  SYSOUT=*
//SYSIN    DD  DUMMY
//SYSPRINT DD  SYSOUT=*
//*
//         ENDIF
//*
//*--- STEP FINAL: CLEANUP (SEMPRE EXECUTA) ---
//CLEANUP  EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  DELETE &HLQ..TEMP.** PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*`
  },

  {
    id: "JCLSORT02",
    tech: "jcl",
    name: "DFSORT com OUTFIL",
    desc: "SORT avançado com múltiplos OUTFIL, INCLUDE/OMIT, BUILD, SECTIONS e TRAILER para subtotais.",
    level: "advanced",
    filename: "JCLSRT03.jcl",
    tags: ["JCL"],
    source:
`//JCLSRT03 JOB (ACCT),'SORT OUTFIL ADV',
//JCLSRT03 JOB (ACCT),'SORT OUTFIL ADV',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: DFSORT - MULTIPLOS OUTFIL COM SUBTOTAIS
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//*================================================================*
//SORT     EXEC PGM=SORT
//SORTIN   DD  DSN=&SYSUID..DATA.TRANSACOES,DISP=SHR
//OUT1     DD  DSN=&SYSUID..REPORT.CREDITO,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(20,5)),UNIT=SYSDA,
//             DCB=(RECFM=FBA,LRECL=133,BLKSIZE=0)
//OUT2     DD  DSN=&SYSUID..REPORT.DEBITO,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(20,5)),UNIT=SYSDA,
//             DCB=(RECFM=FBA,LRECL=133,BLKSIZE=0)
//OUT3     DD  DSN=&SYSUID..DATA.RESUMO,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(5,2)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//SYSOUT   DD  SYSOUT=*
//SYSIN    DD  *
  SORT FIELDS=(1,8,CH,A,20,6,PD,D)
*
* OUTFIL 1: SOMENTE CREDITOS COM RELATORIO
  OUTFIL FNAMES=OUT1,
    INCLUDE=(15,1,CH,EQ,C'C'),
    HEADER1=(1:'=',132:'=',
             /,5:'RELATORIO DE CREDITOS',
             80:'DATA: ',&DATE),
    BUILD=(5:1,8,15:20,6,PD,EDIT=(TTTTTT.TT),
           30:30,40),
    SECTIONS=(1,4,
      TRAILER3=(5:'SUBTOTAL FILIAL ',1,4,': ',
                15:20,6,PD,EDIT=(TTTTTT.TT),M11,
                40:'QTD=',COUNT)),
    TRAILER1=(/,5:'*** TOTAL GERAL: ',
              20,6,PD,EDIT=(TTTTTT.TT),M11,
              40:'REGISTROS: ',COUNT)
*
* OUTFIL 2: SOMENTE DEBITOS
  OUTFIL FNAMES=OUT2,
    INCLUDE=(15,1,CH,EQ,C'D'),
    BUILD=(1,80)
*
* OUTFIL 3: RESUMO POR FILIAL
  OUTFIL FNAMES=OUT3,
    BUILD=(1,4,5:20,6,PD,EDIT=(TTTTTTTTT),
           20:C'REGISTROS=',COUNT=(M10,LENGTH=8))
/*`
  },

  {
    id: "JCLPROC02",
    tech: "jcl",
    name: "Procedure com Overrides",
    desc: "Define PROC catalogada com simbólicos, executa com override de DD e parâmetros.",
    level: "intermediate",
    filename: "JCLPRC02.jcl",
    tags: ["JCL"],
    source:
`//JCLPRC02 JOB (ACCT),'PROC OVERRIDES',
//JCLPRC02 JOB (ACCT),'PROC OVERRIDES',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: PROCEDURE COM OVERRIDES
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//* DEMONSTRA: PROC CATALOGADA, SYMBOLICS, DD OVERRIDE
//*================================================================*
//*
//*--- INSTREAM PROC DEFINITION ---
//MYPROC   PROC HLQ=&SYSUID,
//              ENV=TEST,
//              PGMNAME=MYPROG,
//              REGION=64M
//*
//STEP1    EXEC PGM=&PGMNAME,REGION=&REGION
//STEPLIB  DD  DSN=&HLQ..&ENV..LOAD,DISP=SHR
//INPUT    DD  DSN=&HLQ..&ENV..DATA.INPUT,DISP=SHR
//OUTPUT   DD  DSN=&HLQ..&ENV..DATA.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//SYSOUT   DD  SYSOUT=*
//SYSPRINT DD  SYSOUT=*
//*
//STEP2    EXEC PGM=SORT,COND=(4,LT,STEP1)
//SORTIN   DD  DSN=&HLQ..&ENV..DATA.OUTPUT,DISP=SHR
//SORTOUT  DD  DSN=&HLQ..&ENV..DATA.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2)),UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//SYSOUT   DD  SYSOUT=*
//SYSIN    DD  DSN=&HLQ..PARM(SORTCARD),DISP=SHR
//*
//MYPROC   PEND
//*
//*--- EXEC 1: DEFAULT PARAMETERS ---
//RUN1     EXEC MYPROC
//*
//*--- EXEC 2: OVERRIDE SYMBOLICS + DD ---
//RUN2     EXEC MYPROC,ENV=PROD,REGION=128M
//RUN2.STEP1.INPUT DD  DSN=&SYSUID..PROD.DATA.INPUT,
//                     DISP=SHR
//RUN2.STEP2.SYSIN DD  *
  SORT FIELDS=(1,10,CH,A)
  INCLUDE COND=(20,2,CH,EQ,C'SP')
/*`
  },

  {
    id: "JCLIDCAM2",
    tech: "jcl",
    name: "IDCAMS Multi-Ops",
    desc: "IDCAMS com DELETE/DEFINE CLUSTER/AIX/PATH, REPRO, LISTCAT e VERIFY em um único step.",
    level: "advanced",
    filename: "JCLIDCM2.jcl",
    tags: ["JCL"],
    source:
`//JCLIDCM2 JOB (ACCT),'IDCAMS MULTI-OPS',
//JCLIDCM2 JOB (ACCT),'IDCAMS MULTI-OPS',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*================================================================*
//* JCL: IDCAMS - OPERACOES MULTIPLAS EM UM STEP
//* AUTOR: DOUGLAS ASSUMPCAO RODRIGUES
//* DELETE + DEFINE CLUSTER + AIX + PATH + REPRO + VERIFY
//*================================================================*
//IDCAMS   EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//INFILE   DD  DSN=&SYSUID..DATA.PRODUTOS.SEQ,DISP=SHR
//SYSIN    DD  *
*--- DELETE PREVIOUS ---
  DELETE &SYSUID..VSAM.PRODUTOS.KSDS CLUSTER PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0

  DELETE &SYSUID..VSAM.PRODUTOS.AIX.NOME PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0

  DELETE &SYSUID..VSAM.PRODUTOS.PATH.NOME PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
*
*--- DEFINE CLUSTER ---
  DEFINE CLUSTER( -
         NAME(&SYSUID..VSAM.PRODUTOS.KSDS) -
         INDEXED -
         RECORDS(5000 1000) -
         RECORDSIZE(150 150) -
         KEYS(10 0) -
         FREESPACE(15 7) -
         SHAREOPTIONS(2 3) -
       ) -
       DATA(NAME(&SYSUID..VSAM.PRODUTOS.KSDS.DATA)) -
       INDEX(NAME(&SYSUID..VSAM.PRODUTOS.KSDS.INDEX))
*
*--- LOAD DATA ---
  REPRO INFILE(INFILE) -
        OUTDATASET(&SYSUID..VSAM.PRODUTOS.KSDS)
*
*--- DEFINE ALTERNATE INDEX (BY NAME) ---
  DEFINE ALTERNATEINDEX( -
         NAME(&SYSUID..VSAM.PRODUTOS.AIX.NOME) -
         RELATE(&SYSUID..VSAM.PRODUTOS.KSDS) -
         KEYS(30 10) -
         RECORDSIZE(60 100) -
         UNIQUEKEY -
         UPGRADE -
       ) -
       DATA(NAME(&SYSUID..VSAM.PRODUTOS.AIX.NOME.DATA)) -
       INDEX(NAME(&SYSUID..VSAM.PRODUTOS.AIX.NOME.IDX))
*
*--- BUILD AIX ---
  BLDINDEX INDATASET(&SYSUID..VSAM.PRODUTOS.KSDS) -
           OUTDATASET(&SYSUID..VSAM.PRODUTOS.AIX.NOME)
*
*--- DEFINE PATH ---
  DEFINE PATH( -
         NAME(&SYSUID..VSAM.PRODUTOS.PATH.NOME) -
         PATHENTRY(&SYSUID..VSAM.PRODUTOS.AIX.NOME))
*
*--- VERIFY ---
  VERIFY DATASET(&SYSUID..VSAM.PRODUTOS.KSDS)
  LISTCAT ENT(&SYSUID..VSAM.PRODUTOS.**) ALL
/*`
  },

  // ========================================================================
  // CICS (16 programas — 13 COBOL + 3 HLASM)
  // ========================================================================

  {
    id: "CICSABDL",
    tech: "cics",
    name: "Tratador de Abend",
    desc: "HANDLE ABEND com captura de código, diagnóstico formatado e log em TDQ para recovery.",
    level: "advanced",
    filename: "CICSABDL.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSABDL
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : TRATADOR DE ABEND CICS COM DIAGNOSTICO
      *            HANDLE ABEND -> CAPTURA -> LOG TDQ -> RETURN
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSABDL.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-RESP2            PIC S9(08) COMP.
       01  WS-ABCODE           PIC X(04).
       01  WS-TRANSID          PIC X(04).
       01  WS-USERID           PIC X(08).
       01  WS-TERMID           PIC X(04).
       01  WS-ABSTIME          PIC S9(15) COMP-3.
       01  WS-TIMESTAMP        PIC X(26).
       01  WS-LOG-MSG.
           05 WS-LM-TS         PIC X(26).
           05 FILLER            PIC X VALUE '|'.
           05 WS-LM-TRAN       PIC X(04).
           05 FILLER            PIC X VALUE '|'.
           05 WS-LM-USER       PIC X(08).
           05 FILLER            PIC X VALUE '|'.
           05 WS-LM-ABCD       PIC X(04).
           05 FILLER            PIC X VALUE '|'.
           05 WS-LM-DESC       PIC X(50).
       01  WS-MSG-LEN          PIC S9(04) COMP.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           EXEC CICS HANDLE ABEND
               LABEL(9000-ABEND-HANDLER)
           END-EXEC

           EXEC CICS ASSIGN
               USERID(WS-USERID)
               FACILITY(WS-TERMID)
           END-EXEC
           MOVE EIBTRNID TO WS-TRANSID

           PERFORM 1000-BUSINESS-LOGIC
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-BUSINESS-LOGIC SECTION
      *==========================================================*
       1000-BUSINESS-LOGIC SECTION.
           CONTINUE
           .
       1000-BUSINESS-LOGIC-EXIT.
           EXIT.
      *==========================================================*
      * 9000-ABEND-HANDLER SECTION
      *==========================================================*
       9000-ABEND-HANDLER SECTION.
           EXEC CICS ASSIGN ABCODE(WS-ABCODE)
               RESP(WS-RESP)
           END-EXEC

           EXEC CICS ASKTIME ABSTIME(WS-ABSTIME)
           END-EXEC
           EXEC CICS FORMATTIME ABSTIME(WS-ABSTIME)
               DATESEP('/') TIMESEP(':')
               DDMMYYYY(WS-TIMESTAMP)
               TIME(WS-TIMESTAMP(12:8))
           END-EXEC

           INITIALIZE WS-LOG-MSG
           MOVE WS-TIMESTAMP TO WS-LM-TS
           MOVE WS-TRANSID   TO WS-LM-TRAN
           MOVE WS-USERID    TO WS-LM-USER
           MOVE WS-ABCODE    TO WS-LM-ABCD
           STRING 'ABEND CAPTURADO EM ' WS-TRANSID
               ' TERMINAL ' WS-TERMID
               DELIMITED SIZE INTO WS-LM-DESC

           COMPUTE WS-MSG-LEN =
               FUNCTION LENGTH(WS-LOG-MSG)
           EXEC CICS WRITEQ TD
               QUEUE('CSML')
               FROM(WS-LOG-MSG)
               LENGTH(WS-MSG-LEN)
               RESP(WS-RESP)
           END-EXEC

           EXEC CICS RETURN END-EXEC
           .
       9000-ABEND-HANDLER-EXIT.
           EXIT.`
  },

  {
    id: "CICSENQM",
    tech: "cics",
    name: "Gerenciador ENQ/DEQ",
    desc: "Controle de acesso concorrente com ENQ/DEQ e detecção de deadlock via EIBRESP.",
    level: "advanced",
    filename: "CICSENQM.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSENQM
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONTROLE DE CONCORRENCIA COM ENQ/DEQ
      *            DETECCAO DE DEADLOCK VIA EIBRESP
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSENQM.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-RESOURCE-NAME    PIC X(30).
       01  WS-RESOURCE-LEN     PIC S9(04) COMP VALUE 30.
       01  WS-RETRY-COUNT      PIC 9(02) VALUE 0.
       01  WS-MAX-RETRIES      PIC 9(02) VALUE 3.
       01  WS-WAIT-SECS        PIC S9(04) COMP VALUE 5.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE 'CONTA-UPDATE-12345' TO WS-RESOURCE-NAME
           PERFORM 1000-ACQUIRE-LOCK
           IF WS-RESP = DFHRESP(NORMAL)
               PERFORM 2000-PROCESS
               PERFORM 3000-RELEASE-LOCK
           ELSE
               PERFORM 9000-LOCK-FAILED
           END-IF
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-ACQUIRE-LOCK SECTION
      *==========================================================*
       1000-ACQUIRE-LOCK SECTION.
           MOVE 0 TO WS-RETRY-COUNT
           PERFORM UNTIL WS-RETRY-COUNT >= WS-MAX-RETRIES
               EXEC CICS ENQ
                   RESOURCE(WS-RESOURCE-NAME)
                   LENGTH(WS-RESOURCE-LEN)
                   RESP(WS-RESP)
               END-EXEC
               IF WS-RESP = DFHRESP(NORMAL)
                   EXIT PERFORM
               END-IF
               IF WS-RESP = DFHRESP(ENQBUSY)
                   ADD 1 TO WS-RETRY-COUNT
                   EXEC CICS DELAY
                       FOR SECONDS(WS-WAIT-SECS)
                   END-EXEC
               ELSE
                   EXIT PERFORM
               END-IF
           END-PERFORM
           .
       1000-ACQUIRE-LOCK-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PROCESS SECTION
      *==========================================================*
       2000-PROCESS SECTION.
           CONTINUE
           .
       2000-PROCESS-EXIT.
           EXIT.
      *==========================================================*
      * 3000-RELEASE-LOCK SECTION
      *==========================================================*
       3000-RELEASE-LOCK SECTION.
           EXEC CICS DEQ
               RESOURCE(WS-RESOURCE-NAME)
               LENGTH(WS-RESOURCE-LEN)
               RESP(WS-RESP)
           END-EXEC
           .
       3000-RELEASE-LOCK-EXIT.
           EXIT.
      *==========================================================*
      * 9000-LOCK-FAILED SECTION
      *==========================================================*
       9000-LOCK-FAILED SECTION.
           EXEC CICS WRITEQ TD
               QUEUE('CSML')
               FROM('ENQ FAILED AFTER MAX RETRIES')
               LENGTH(30)
           END-EXEC
           .
       9000-LOCK-FAILED-EXIT.
           EXIT.`
  },

  {
    id: "CICSENVI",
    tech: "cics",
    name: "Inspetor de Ambiente",
    desc: "Coleta info do ambiente CICS via ASSIGN: terminal, usuário, transação e sistema.",
    level: "basic",
    filename: "CICSENVI.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSENVI
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : COLETA INFORMACOES DO AMBIENTE CICS
      *            VIA EXEC CICS ASSIGN
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSENVI.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-ENV-DATA.
           05 WS-APPLID        PIC X(08).
           05 WS-SYSID         PIC X(04).
           05 WS-USERID        PIC X(08).
           05 WS-TERMID        PIC X(04).
           05 WS-TRANSID       PIC X(04).
           05 WS-NETNAME       PIC X(08).
           05 WS-CICS-REL      PIC X(04).
           05 WS-MAP-HT        PIC S9(04) COMP.
           05 WS-MAP-WD        PIC S9(04) COMP.
       01  WS-MSG              PIC X(80).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           EXEC CICS ASSIGN
               APPLID(WS-APPLID)
               SYSID(WS-SYSID)
               USERID(WS-USERID)
               FACILITY(WS-TERMID)
               NETNAME(WS-NETNAME)
               SCRNHT(WS-MAP-HT)
               SCRNWD(WS-MAP-WD)
               RESP(WS-RESP)
           END-EXEC

           MOVE EIBTRNID TO WS-TRANSID

           IF WS-RESP = DFHRESP(NORMAL)
               STRING 'APPLID=' WS-APPLID
                      ' SYS=' WS-SYSID
                      ' USER=' WS-USERID
                      ' TERM=' WS-TERMID
                   DELIMITED SIZE INTO WS-MSG
               EXEC CICS SEND TEXT
                   FROM(WS-MSG)
                   LENGTH(80)
                   ERASE
               END-EXEC
           END-IF

           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.`
  },

  {
    id: "CICSRESO",
    tech: "cics",
    name: "Descoberta de Recursos",
    desc: "Consulta recursos CICS disponíveis (programas, arquivos, transações) via INQUIRE.",
    level: "intermediate",
    filename: "CICSRESO.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSRESO
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONSULTA RECURSOS CICS VIA INQUIRE
      *            PROGRAMAS, ARQUIVOS E TRANSACOES
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSRESO.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-PGM-NAME         PIC X(08).
       01  WS-PGM-STATUS       PIC S9(08) COMP.
       01  WS-FILE-NAME        PIC X(08).
       01  WS-FILE-STATUS      PIC S9(08) COMP.
       01  WS-FILE-OPEN        PIC S9(08) COMP.
       01  WS-TRAN-ID          PIC X(04).
       01  WS-TRAN-STATUS      PIC S9(08) COMP.
       01  WS-OUTPUT-LINE      PIC X(80).
       01  WS-LINE-LEN         PIC S9(04) COMP VALUE 80.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-INQUIRE-PROGRAM
           PERFORM 2000-INQUIRE-FILE
           PERFORM 3000-INQUIRE-TRANSACTION
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-INQUIRE-PROGRAM SECTION
      *==========================================================*
       1000-INQUIRE-PROGRAM SECTION.
           MOVE 'CICSABDL' TO WS-PGM-NAME
           EXEC CICS INQUIRE PROGRAM(WS-PGM-NAME)
               STATUS(WS-PGM-STATUS)
               RESP(WS-RESP)
           END-EXEC
           IF WS-RESP = DFHRESP(NORMAL)
               STRING 'PGM ' WS-PGM-NAME ' STATUS='
                      WS-PGM-STATUS
                   DELIMITED SIZE INTO WS-OUTPUT-LINE
               EXEC CICS SEND TEXT
                   FROM(WS-OUTPUT-LINE)
                   LENGTH(WS-LINE-LEN)
               END-EXEC
           END-IF
           .
       1000-INQUIRE-PROGRAM-EXIT.
           EXIT.
      *==========================================================*
      * 2000-INQUIRE-FILE SECTION
      *==========================================================*
       2000-INQUIRE-FILE SECTION.
           MOVE 'CUSTFILE' TO WS-FILE-NAME
           EXEC CICS INQUIRE FILE(WS-FILE-NAME)
               ENABLESTATUS(WS-FILE-STATUS)
               OPENSTATUS(WS-FILE-OPEN)
               RESP(WS-RESP)
           END-EXEC
           IF WS-RESP = DFHRESP(NORMAL)
               STRING 'FILE ' WS-FILE-NAME ' OPEN='
                      WS-FILE-OPEN
                   DELIMITED SIZE INTO WS-OUTPUT-LINE
               EXEC CICS SEND TEXT
                   FROM(WS-OUTPUT-LINE)
                   LENGTH(WS-LINE-LEN)
               END-EXEC
           END-IF
           .
       2000-INQUIRE-FILE-EXIT.
           EXIT.
      *==========================================================*
      * 3000-INQUIRE-TRANSACTION SECTION
      *==========================================================*
       3000-INQUIRE-TRANSACTION SECTION.
           MOVE 'TR01' TO WS-TRAN-ID
           EXEC CICS INQUIRE TRANSACTION(WS-TRAN-ID)
               STATUS(WS-TRAN-STATUS)
               RESP(WS-RESP)
           END-EXEC
           .
       3000-INQUIRE-TRANSACTION-EXIT.
           EXIT.`
  },

  {
    id: "CICSTLOG",
    tech: "cics",
    name: "Logger de Transações",
    desc: "Registra eventos de transações em TSQ com timestamp, tipo e dados de contexto.",
    level: "intermediate",
    filename: "CICSTLOG.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSTLOG
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : LOGGER DE TRANSACOES VIA TSQ
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSTLOG.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-ABSTIME          PIC S9(15) COMP-3.
       01  WS-TIMESTAMP        PIC X(26).
       01  WS-LOG-ENTRY.
           05 WS-LE-TS         PIC X(26).
           05 WS-LE-TYPE       PIC X(08).
           05 WS-LE-TRAN       PIC X(04).
           05 WS-LE-USER       PIC X(08).
           05 WS-LE-TERM       PIC X(04).
           05 WS-LE-DATA       PIC X(100).
       01  WS-LE-LEN           PIC S9(04) COMP.
       01  WS-QUEUE-NAME       PIC X(16) VALUE 'TLOG-AUDIT'.
       01  WS-USERID           PIC X(08).
       01  WS-TERMID           PIC X(04).

       LINKAGE SECTION.
       01  LS-EVENT-TYPE       PIC X(08).
       01  LS-EVENT-DATA       PIC X(100).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           EXEC CICS ASKTIME ABSTIME(WS-ABSTIME)
           END-EXEC
           EXEC CICS FORMATTIME
               ABSTIME(WS-ABSTIME)
               DATESEP('/') TIMESEP(':')
               DDMMYYYY(WS-TIMESTAMP)
               TIME(WS-TIMESTAMP(12:8))
           END-EXEC

           EXEC CICS ASSIGN
               USERID(WS-USERID)
               FACILITY(WS-TERMID)
               RESP(WS-RESP)
           END-EXEC

           INITIALIZE WS-LOG-ENTRY
           MOVE WS-TIMESTAMP  TO WS-LE-TS
           MOVE 'START   '    TO WS-LE-TYPE
           MOVE EIBTRNID      TO WS-LE-TRAN
           MOVE WS-USERID     TO WS-LE-USER
           MOVE WS-TERMID     TO WS-LE-TERM
           MOVE 'TRANSACTION INITIATED' TO WS-LE-DATA

           COMPUTE WS-LE-LEN =
               FUNCTION LENGTH(WS-LOG-ENTRY)

           EXEC CICS WRITEQ TS
               QUEUE(WS-QUEUE-NAME)
               FROM(WS-LOG-ENTRY)
               LENGTH(WS-LE-LEN)
               RESP(WS-RESP)
           END-EXEC

           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.`
  },

  {
    id: "CICSTSQM",
    tech: "cics",
    name: "Gerenciador de TSQ",
    desc: "Operações completas de TSQ: WRITEQ TS, READQ TS, DELETEQ TS com controle de itens.",
    level: "intermediate",
    filename: "CICSTSQM.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSTSQM
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : GERENCIADOR DE TSQ (TEMPORARY STORAGE QUEUE)
      *            WRITE, READ, REWRITE, DELETE COM CONTROLE
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSTSQM.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-QUEUE            PIC X(16).
       01  WS-ITEM             PIC S9(04) COMP.
       01  WS-NUMITEMS         PIC S9(04) COMP.
       01  WS-DATA             PIC X(200).
       01  WS-DATA-LEN         PIC S9(04) COMP VALUE 200.
       01  WS-I                PIC S9(04) COMP.
       01  WS-MSG              PIC X(80).

       LINKAGE SECTION.
       01  LS-ACAO             PIC X(06).
       01  LS-QUEUE-NAME       PIC X(16).
       01  LS-DATA-AREA        PIC X(200).
       01  LS-ITEM-NUM         PIC S9(04) COMP.
       01  LS-RETORNO          PIC 9(02).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE 'DEMOQUEUE' TO WS-QUEUE
           PERFORM 1000-WRITE-ITEMS
           PERFORM 2000-READ-ALL
           PERFORM 3000-REWRITE-ITEM
           PERFORM 4000-DELETE-QUEUE
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-WRITE-ITEMS SECTION
      *==========================================================*
       1000-WRITE-ITEMS SECTION.
           PERFORM VARYING WS-I FROM 1 BY 1
               UNTIL WS-I > 5
               STRING 'ITEM-' WS-I '-DATA-CONTENT'
                   DELIMITED SIZE INTO WS-DATA
               EXEC CICS WRITEQ TS
                   QUEUE(WS-QUEUE)
                   FROM(WS-DATA)
                   LENGTH(WS-DATA-LEN)
                   ITEM(WS-ITEM)
                   RESP(WS-RESP)
               END-EXEC
           END-PERFORM
           .
       1000-WRITE-ITEMS-EXIT.
           EXIT.
      *==========================================================*
      * 2000-READ-ALL SECTION
      *==========================================================*
       2000-READ-ALL SECTION.
           EXEC CICS READQ TS
               QUEUE(WS-QUEUE)
               INTO(WS-DATA)
               LENGTH(WS-DATA-LEN)
               ITEM(1)
               NUMITEMS(WS-NUMITEMS)
               RESP(WS-RESP)
           END-EXEC
           IF WS-RESP = DFHRESP(NORMAL)
               PERFORM VARYING WS-I FROM 2 BY 1
                   UNTIL WS-I > WS-NUMITEMS
                   MOVE 200 TO WS-DATA-LEN
                   EXEC CICS READQ TS
                       QUEUE(WS-QUEUE)
                       INTO(WS-DATA)
                       LENGTH(WS-DATA-LEN)
                       ITEM(WS-I)
                       RESP(WS-RESP)
                   END-EXEC
               END-PERFORM
           END-IF
           .
       2000-READ-ALL-EXIT.
           EXIT.
      *==========================================================*
      * 3000-REWRITE-ITEM SECTION
      *==========================================================*
       3000-REWRITE-ITEM SECTION.
           MOVE 'UPDATED-ITEM-3-NEW-DATA' TO WS-DATA
           EXEC CICS WRITEQ TS
               QUEUE(WS-QUEUE)
               FROM(WS-DATA)
               LENGTH(WS-DATA-LEN)
               ITEM(3)
               REWRITE
               RESP(WS-RESP)
           END-EXEC
           .
       3000-REWRITE-ITEM-EXIT.
           EXIT.
      *==========================================================*
      * 4000-DELETE-QUEUE SECTION
      *==========================================================*
       4000-DELETE-QUEUE SECTION.
           EXEC CICS DELETEQ TS
               QUEUE(WS-QUEUE)
               RESP(WS-RESP)
           END-EXEC
           .
       4000-DELETE-QUEUE-EXIT.
           EXIT.`
  },

  {
    id: "CICSBMS01",
    tech: "cics",
    name: "Mapa BMS SEND/RECEIVE",
    desc: "Transação pseudo-conversacional com SEND MAP, RECEIVE MAP e validação de campos.",
    level: "intermediate",
    filename: "CICSBMS1.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSBMS01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : TRANSACAO PSEUDO-CONVERSACIONAL COM BMS
      *            SEND MAP / RECEIVE MAP / VALIDACAO
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSBMS1.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-COMMAREA.
           05 WS-CA-STATE      PIC X(01).
              88 WS-FIRST-TIME VALUE SPACE.
              88 WS-MAP-SENT   VALUE '1'.
       01  WS-MAP-DATA.
           05 WS-MD-NOME       PIC X(30).
           05 WS-MD-CPF        PIC X(11).
           05 WS-MD-VALOR      PIC 9(09)V99.
           05 WS-MD-MSG        PIC X(60).
       01  WS-MAP-LEN          PIC S9(04) COMP.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           IF EIBCALEN = 0
               SET WS-FIRST-TIME TO TRUE
           ELSE
               MOVE DFHCOMMAREA TO WS-COMMAREA
           END-IF

           EVALUATE TRUE
               WHEN WS-FIRST-TIME
                   PERFORM 1000-SEND-MAP
               WHEN WS-MAP-SENT
                   PERFORM 2000-RECEIVE-AND-PROCESS
               WHEN OTHER
                   PERFORM 1000-SEND-MAP
           END-EVALUATE

           EXEC CICS RETURN
               TRANSID(EIBTRNID)
               COMMAREA(WS-COMMAREA)
               LENGTH(LENGTH OF WS-COMMAREA)
           END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-SEND-MAP SECTION
      *==========================================================*
       1000-SEND-MAP SECTION.
           MOVE SPACES TO WS-MD-MSG
           MOVE 'INFORME OS DADOS DO CLIENTE' TO WS-MD-MSG
           EXEC CICS SEND MAP('MAPCLI')
               MAPSET('MSCLI')
               FROM(WS-MAP-DATA)
               ERASE
               RESP(WS-RESP)
           END-EXEC
           SET WS-MAP-SENT TO TRUE
           .
       1000-SEND-MAP-EXIT.
           EXIT.
      *==========================================================*
      * 2000-RECEIVE-AND-PROCESS SECTION
      *==========================================================*
       2000-RECEIVE-AND-PROCESS SECTION.
           EXEC CICS RECEIVE MAP('MAPCLI')
               MAPSET('MSCLI')
               INTO(WS-MAP-DATA)
               RESP(WS-RESP)
           END-EXEC
           IF WS-RESP = DFHRESP(NORMAL)
               PERFORM 3000-VALIDATE
           ELSE
               MOVE 'ERRO AO RECEBER DADOS' TO WS-MD-MSG
               PERFORM 1000-SEND-MAP
           END-IF
           .
       2000-RECEIVE-AND-PROCESS-EXIT.
           EXIT.
      *==========================================================*
      * 3000-VALIDATE SECTION
      *==========================================================*
       3000-VALIDATE SECTION.
           IF WS-MD-NOME = SPACES
               MOVE 'NOME OBRIGATORIO' TO WS-MD-MSG
               PERFORM 1000-SEND-MAP
           ELSE IF WS-MD-CPF = SPACES
               MOVE 'CPF OBRIGATORIO' TO WS-MD-MSG
               PERFORM 1000-SEND-MAP
           ELSE
               MOVE 'DADOS PROCESSADOS COM SUCESSO'
                   TO WS-MD-MSG
               PERFORM 1000-SEND-MAP
           END-IF
           .
       3000-VALIDATE-EXIT.
           EXIT.`
  },

  {
    id: "CICSBROW",
    tech: "cics",
    name: "Browse VSAM via CICS",
    desc: "STARTBR, READNEXT, READPREV e ENDBR para paginação de registros VSAM em CICS.",
    level: "intermediate",
    filename: "CICSBROW.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSBROW
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : BROWSE VSAM VIA CICS
      *            STARTBR/READNEXT/READPREV/ENDBR
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSBROW.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-FILE             PIC X(08) VALUE 'CUSTFILE'.
       01  WS-KEY              PIC X(10).
       01  WS-RECORD           PIC X(200).
       01  WS-REC-LEN          PIC S9(04) COMP VALUE 200.
       01  WS-PAGE-SIZE        PIC 9(02) VALUE 10.
       01  WS-COUNT            PIC 9(04) VALUE 0.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE LOW-VALUES TO WS-KEY
           PERFORM 1000-START-BROWSE
           IF WS-RESP = DFHRESP(NORMAL)
               PERFORM 2000-READ-FORWARD
               PERFORM 3000-END-BROWSE
           END-IF
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-START-BROWSE SECTION
      *==========================================================*
       1000-START-BROWSE SECTION.
           EXEC CICS STARTBR FILE(WS-FILE)
               RIDFLD(WS-KEY)
               GTEQ
               RESP(WS-RESP)
           END-EXEC
           .
       1000-START-BROWSE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-READ-FORWARD SECTION
      *==========================================================*
       2000-READ-FORWARD SECTION.
           MOVE 0 TO WS-COUNT
           PERFORM UNTIL WS-COUNT >= WS-PAGE-SIZE
               MOVE 200 TO WS-REC-LEN
               EXEC CICS READNEXT FILE(WS-FILE)
                   INTO(WS-RECORD)
                   LENGTH(WS-REC-LEN)
                   RIDFLD(WS-KEY)
                   RESP(WS-RESP)
               END-EXEC
               IF WS-RESP = DFHRESP(ENDFILE) OR
                  WS-RESP NOT = DFHRESP(NORMAL)
                   EXIT PERFORM
               END-IF
               ADD 1 TO WS-COUNT
           END-PERFORM
           .
       2000-READ-FORWARD-EXIT.
           EXIT.
      *==========================================================*
      * 3000-END-BROWSE SECTION
      *==========================================================*
       3000-END-BROWSE SECTION.
           EXEC CICS ENDBR FILE(WS-FILE)
               RESP(WS-RESP)
           END-EXEC
           .
       3000-END-BROWSE-EXIT.
           EXIT.`
  },

  {
    id: "CICSCRUD",
    tech: "cics",
    name: "CRUD Completo",
    desc: "READ UPDATE, REWRITE, WRITE e DELETE com tratamento DUPREC, NOSPACE e NOTFND.",
    level: "advanced",
    filename: "CICSCRUD.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSCRUD
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CRUD COMPLETO EM VSAM VIA CICS
      *            CREATE, READ, UPDATE, DELETE
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSCRUD.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-FILE             PIC X(08) VALUE 'CUSTFILE'.
       01  WS-KEY              PIC X(10).
       01  WS-RECORD.
           05 WS-REC-KEY       PIC X(10).
           05 WS-REC-NOME      PIC X(40).
           05 WS-REC-SALDO     PIC S9(09)V99 COMP-3.
           05 WS-REC-STATUS    PIC X(01).
           05 FILLER           PIC X(138).
       01  WS-REC-LEN          PIC S9(04) COMP VALUE 200.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-CREATE
           PERFORM 2000-READ
           PERFORM 3000-UPDATE
           PERFORM 4000-DELETE
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-CREATE SECTION
      *==========================================================*
       1000-CREATE SECTION.
           INITIALIZE WS-RECORD
           MOVE '0000000001' TO WS-REC-KEY
           MOVE 'CLIENTE TESTE' TO WS-REC-NOME
           MOVE 1500.00 TO WS-REC-SALDO
           MOVE 'A' TO WS-REC-STATUS
           EXEC CICS WRITE FILE(WS-FILE)
               FROM(WS-RECORD)
               RIDFLD(WS-REC-KEY)
               LENGTH(WS-REC-LEN)
               RESP(WS-RESP)
           END-EXEC
           EVALUATE WS-RESP
               WHEN DFHRESP(NORMAL)   CONTINUE
               WHEN DFHRESP(DUPREC)
                   CONTINUE
               WHEN DFHRESP(NOSPACE)
                   CONTINUE
           END-EVALUATE
           .
       1000-CREATE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-READ SECTION
      *==========================================================*
       2000-READ SECTION.
           MOVE '0000000001' TO WS-KEY
           EXEC CICS READ FILE(WS-FILE)
               INTO(WS-RECORD)
               RIDFLD(WS-KEY)
               LENGTH(WS-REC-LEN)
               RESP(WS-RESP)
           END-EXEC
           .
       2000-READ-EXIT.
           EXIT.
      *==========================================================*
      * 3000-UPDATE SECTION
      *==========================================================*
       3000-UPDATE SECTION.
           MOVE '0000000001' TO WS-KEY
           EXEC CICS READ FILE(WS-FILE)
               INTO(WS-RECORD)
               RIDFLD(WS-KEY)
               LENGTH(WS-REC-LEN)
               UPDATE
               RESP(WS-RESP)
           END-EXEC
           IF WS-RESP = DFHRESP(NORMAL)
               ADD 500.00 TO WS-REC-SALDO
               EXEC CICS REWRITE FILE(WS-FILE)
                   FROM(WS-RECORD)
                   LENGTH(WS-REC-LEN)
                   RESP(WS-RESP)
               END-EXEC
           END-IF
           .
       3000-UPDATE-EXIT.
           EXIT.
      *==========================================================*
      * 4000-DELETE SECTION
      *==========================================================*
       4000-DELETE SECTION.
           MOVE '0000000001' TO WS-KEY
           EXEC CICS DELETE FILE(WS-FILE)
               RIDFLD(WS-KEY)
               RESP(WS-RESP)
           END-EXEC
           IF WS-RESP = DFHRESP(NOTFND)
               CONTINUE
           END-IF
           .
       4000-DELETE-EXIT.
           EXIT.`
  },

  {
    id: "CICSTDQ01",
    tech: "cics",
    name: "Filas TDQ",
    desc: "WRITEQ TD e READQ TD para filas intra e extrapartição com formatação de mensagens.",
    level: "intermediate",
    filename: "CICSTDQ1.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSTDQ01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : OPERACOES COM TDQ (TRANSIENT DATA QUEUE)
      *            WRITEQ TD E READQ TD
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSTDQ1.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-QUEUE-INTRA      PIC X(04) VALUE 'INTR'.
       01  WS-QUEUE-EXTRA      PIC X(04) VALUE 'CSML'.
       01  WS-MSG              PIC X(100).
       01  WS-MSG-LEN          PIC S9(04) COMP VALUE 100.
       01  WS-READ-DATA        PIC X(100).
       01  WS-READ-LEN         PIC S9(04) COMP.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-WRITE-EXTRA
           PERFORM 2000-WRITE-INTRA
           PERFORM 3000-READ-INTRA
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-WRITE-EXTRA SECTION
      *==========================================================*
       1000-WRITE-EXTRA SECTION.
           MOVE 'LOG: TRANSACAO EXECUTADA COM SUCESSO'
               TO WS-MSG
           EXEC CICS WRITEQ TD
               QUEUE(WS-QUEUE-EXTRA)
               FROM(WS-MSG)
               LENGTH(WS-MSG-LEN)
               RESP(WS-RESP)
           END-EXEC
           .
       1000-WRITE-EXTRA-EXIT.
           EXIT.
      *==========================================================*
      * 2000-WRITE-INTRA SECTION
      *==========================================================*
       2000-WRITE-INTRA SECTION.
           MOVE 'MENSAGEM PARA PROCESSAMENTO POSTERIOR'
               TO WS-MSG
           EXEC CICS WRITEQ TD
               QUEUE(WS-QUEUE-INTRA)
               FROM(WS-MSG)
               LENGTH(WS-MSG-LEN)
               RESP(WS-RESP)
           END-EXEC
           .
       2000-WRITE-INTRA-EXIT.
           EXIT.
      *==========================================================*
      * 3000-READ-INTRA SECTION
      *==========================================================*
       3000-READ-INTRA SECTION.
           MOVE 100 TO WS-READ-LEN
           EXEC CICS READQ TD
               QUEUE(WS-QUEUE-INTRA)
               INTO(WS-READ-DATA)
               LENGTH(WS-READ-LEN)
               RESP(WS-RESP)
           END-EXEC
           .
       3000-READ-INTRA-EXIT.
           EXIT.`
  },

  {
    id: "CICSXCTL",
    tech: "cics",
    name: "XCTL/LINK",
    desc: "Demonstra LINK (com retorno) e XCTL (sem retorno) com COMMAREA entre programas.",
    level: "basic",
    filename: "CICSXCTL.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSXCTL
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : DEMONSTRA LINK E XCTL ENTRE PROGRAMAS
      *            LINK = COM RETORNO, XCTL = SEM RETORNO
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSXCTL.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-COMMAREA.
           05 WS-CA-ACAO       PIC X(01).
           05 WS-CA-CODIGO     PIC X(10).
           05 WS-CA-RESULTADO  PIC X(50).
           05 WS-CA-RC         PIC 9(02).
       01  WS-CA-LEN           PIC S9(04) COMP.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE 'C' TO WS-CA-ACAO
           MOVE '0000000001' TO WS-CA-CODIGO
           COMPUTE WS-CA-LEN =
               FUNCTION LENGTH(WS-COMMAREA)

           EXEC CICS LINK
               PROGRAM('SUBPROG1')
               COMMAREA(WS-COMMAREA)
               LENGTH(WS-CA-LEN)
               RESP(WS-RESP)
           END-EXEC

           IF WS-RESP = DFHRESP(NORMAL)
               IF WS-CA-RC = 0
                   EXEC CICS XCTL
                       PROGRAM('MENUPROG')
                       COMMAREA(WS-COMMAREA)
                       LENGTH(WS-CA-LEN)
                       RESP(WS-RESP)
                   END-EXEC
               END-IF
           END-IF

           IF WS-RESP = DFHRESP(PGMIDERR)
               EXEC CICS SEND TEXT
                   FROM('PROGRAMA NAO ENCONTRADO')
                   LENGTH(23)
                   ERASE
               END-EXEC
           END-IF

           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.`
  },

  {
    id: "CICSJRNL",
    tech: "cics",
    name: "Gerenciador de Journal",
    desc: "WRITE JOURNALNAME para trilha de auditoria com imagens before/after de transações.",
    level: "advanced",
    filename: "CICSJRNL.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSJRNL
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : GERENCIADOR DE JOURNAL PARA AUDITORIA
      *            GRAVA BEFORE/AFTER IMAGE DAS TRANSACOES
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSJRNL.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-JOURNAL          PIC X(08) VALUE 'DFHJ01'.
       01  WS-JTYPEID          PIC X(02) VALUE 'AU'.
       01  WS-PREFIX-DATA.
           05 WS-PF-TRAN       PIC X(04).
           05 WS-PF-USER       PIC X(08).
           05 WS-PF-TERM       PIC X(04).
           05 WS-PF-TYPE       PIC X(06).
       01  WS-PF-LEN           PIC S9(04) COMP.
       01  WS-BEFORE-IMAGE     PIC X(200).
       01  WS-AFTER-IMAGE      PIC X(200).
       01  WS-FROM-LEN         PIC S9(04) COMP VALUE 200.
       01  WS-USERID           PIC X(08).
       01  WS-TERMID           PIC X(04).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           EXEC CICS ASSIGN
               USERID(WS-USERID)
               FACILITY(WS-TERMID)
           END-EXEC
           MOVE EIBTRNID TO WS-PF-TRAN
           MOVE WS-USERID TO WS-PF-USER
           MOVE WS-TERMID TO WS-PF-TERM
           COMPUTE WS-PF-LEN =
               FUNCTION LENGTH(WS-PREFIX-DATA)

           PERFORM 1000-LOG-BEFORE
           PERFORM 2000-LOG-AFTER
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-LOG-BEFORE SECTION
      *==========================================================*
       1000-LOG-BEFORE SECTION.
           MOVE 'BEFORE' TO WS-PF-TYPE
           EXEC CICS WRITE JOURNALNAME(WS-JOURNAL)
               JTYPEID(WS-JTYPEID)
               PREFIX(WS-PREFIX-DATA)
               PFXLENG(WS-PF-LEN)
               FROM(WS-BEFORE-IMAGE)
               FLENGTH(WS-FROM-LEN)
               RESP(WS-RESP)
           END-EXEC
           .
       1000-LOG-BEFORE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-LOG-AFTER SECTION
      *==========================================================*
       2000-LOG-AFTER SECTION.
           MOVE 'AFTER ' TO WS-PF-TYPE
           EXEC CICS WRITE JOURNALNAME(WS-JOURNAL)
               JTYPEID(WS-JTYPEID)
               PREFIX(WS-PREFIX-DATA)
               PFXLENG(WS-PF-LEN)
               FROM(WS-AFTER-IMAGE)
               FLENGTH(WS-FROM-LEN)
               RESP(WS-RESP)
           END-EXEC
           .
       2000-LOG-AFTER-EXIT.
           EXIT.`
  },

  {
    id: "CICSSTRT",
    tech: "cics",
    name: "START/RETRIEVE Async",
    desc: "EXEC CICS START para processamento diferido e RETRIEVE para a transação iniciada.",
    level: "advanced",
    filename: "CICSSTRT.cbl",
    tags: ["CICS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : CICSSTRT
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : START ASSÍNCRONO E RETRIEVE
      *            INICIA TRANSACAO DIFERIDA COM DADOS
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CICSSTRT.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-RESP             PIC S9(08) COMP.
       01  WS-TARGET-TRAN      PIC X(04) VALUE 'ASYN'.
       01  WS-START-DATA.
           05 WS-SD-TIPO       PIC X(01) VALUE 'P'.
           05 WS-SD-CHAVE      PIC X(10).
           05 WS-SD-DADOS      PIC X(100).
       01  WS-SD-LEN           PIC S9(04) COMP.
       01  WS-INTERVAL         PIC S9(07) COMP VALUE 30.
       01  WS-RETRIEVED.
           05 WS-RT-TIPO       PIC X(01).
           05 WS-RT-CHAVE      PIC X(10).
           05 WS-RT-DADOS      PIC X(100).
       01  WS-RT-LEN           PIC S9(04) COMP VALUE 111.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           IF EIBCALEN > 0
               PERFORM 2000-RETRIEVE-AND-PROCESS
           ELSE
               PERFORM 1000-START-ASYNC
           END-IF
           EXEC CICS RETURN END-EXEC
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-START-ASYNC SECTION
      *==========================================================*
       1000-START-ASYNC SECTION.
           MOVE '1234567890' TO WS-SD-CHAVE
           MOVE 'PROCESSAR LOTE NOTURNO' TO WS-SD-DADOS
           COMPUTE WS-SD-LEN =
               FUNCTION LENGTH(WS-START-DATA)

           EXEC CICS START
               TRANSID(WS-TARGET-TRAN)
               FROM(WS-START-DATA)
               LENGTH(WS-SD-LEN)
               INTERVAL(WS-INTERVAL)
               RESP(WS-RESP)
           END-EXEC

           IF WS-RESP = DFHRESP(NORMAL)
               EXEC CICS SEND TEXT
                   FROM('TAREFA AGENDADA COM SUCESSO')
                   LENGTH(27)
                   ERASE
               END-EXEC
           END-IF
           .
       1000-START-ASYNC-EXIT.
           EXIT.
      *==========================================================*
      * 2000-RETRIEVE-AND-PROCESS SECTION
      *==========================================================*
       2000-RETRIEVE-AND-PROCESS SECTION.
           EXEC CICS RETRIEVE
               INTO(WS-RETRIEVED)
               LENGTH(WS-RT-LEN)
               RESP(WS-RESP)
           END-EXEC
           IF WS-RESP = DFHRESP(NORMAL)
               EVALUATE WS-RT-TIPO
                   WHEN 'P' PERFORM 2100-PROCESS-BATCH
                   WHEN 'R' PERFORM 2200-PROCESS-REPORT
               END-EVALUATE
           END-IF
           .
       2000-RETRIEVE-AND-PROCESS-EXIT.
           EXIT.
      *==========================================================*
      * 2100-PROCESS-BATCH SECTION
      *==========================================================*
       2100-PROCESS-BATCH SECTION.
           CONTINUE
           .
       2100-PROCESS-BATCH-EXIT.
           EXIT.
      *==========================================================*
      * 2200-PROCESS-REPORT SECTION
      *==========================================================*
       2200-PROCESS-REPORT SECTION.
           CONTINUE
           .
       2200-PROCESS-REPORT-EXIT.
           EXIT.`
  },


  {
    id: "ASMCENV1",
    tech: "cics",
    name: "Inspetor de Ambiente (ASM)",
    desc: "EXEC CICS ASSIGN em Assembler — coleta usuário, terminal, transação e exibe via SEND TEXT.",
    level: "basic",
    filename: "ASMCENV1.hlasm",
    tags: ["HLASM","CICS"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMCENV1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : INSPETOR DE AMBIENTE CICS EM ASSEMBLER
*            COLETA USERID, TERMINAL, TRANSACAO VIA ASSIGN
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMCENV1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         EXEC CICS ASSIGN                                      X
               USERID(WUSER)                                   X
               FACILITY(WTERM)                                 X
               RESP(WRESP)
*
         CLC   WRESP,DFHRESP(NORMAL)
         BNE   ERRASSN
*
         MVC   WLINE,BLANKS
         MVC   WLINE(5),=C'USER='
         MVC   WLINE+5(8),WUSER
         MVC   WLINE+14(6),=C' TERM='
         MVC   WLINE+20(4),WTERM
         MVC   WLINE+25(6),=C' TRAN='
         MVC   WLINE+31(4),EIBTRNID
*
         EXEC CICS SEND TEXT                                   X
               FROM(WLINE)                                     X
               LENGTH(WLINELN)                                 X
               ERASE                                           X
               FREEKB                                          X
               RESP(WRESP)
*
         EXEC CICS RETURN
*
ERRASSN  MVC   WLINE,BLANKS
         MVC   WLINE(20),=C'ERRO AO LER AMBIENTE'
         EXEC CICS SEND TEXT FROM(WLINE) LENGTH(WLINELN)       X
               ERASE FREEKB
         EXEC CICS RETURN
*
SAVE     DS    18F
WRESP    DS    F
WUSER    DS    CL8
WTERM    DS    CL4
WLINE    DS    CL80
WLINELN  DC    H'80'
BLANKS   DC    CL80' '
         DFHEIBLK
         YREGS
         END   ASMCENV1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMCENV1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : INSPETOR DE AMBIENTE CICS EM ASSEMBLER
*            COLETA USERID, TERMINAL, TRANSACAO VIA ASSIGN
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMCENV1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMCENV1         SET BASE (RELATIVE)
         USING ASMCENV1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         EXEC CICS ASSIGN                                      X
               USERID(WUSER)                                   X
               FACILITY(WTERM)                                 X
               RESP(WRESP)
*
         CLC   WRESP,DFHRESP(NORMAL)
         JNE   ERRASSN
*
         MVC   WLINE,BLANKS
         MVC   WLINE(5),=C'USER='
         MVC   WLINE+5(8),WUSER
         MVC   WLINE+14(6),=C' TERM='
         MVC   WLINE+20(4),WTERM
         MVC   WLINE+25(6),=C' TRAN='
         MVC   WLINE+31(4),EIBTRNID
*
         EXEC CICS SEND TEXT                                   X
               FROM(WLINE)                                     X
               LENGTH(WLINELN)                                 X
               ERASE                                           X
               FREEKB                                          X
               RESP(WRESP)
*
         EXEC CICS RETURN
*
ERRASSN  MVC   WLINE,BLANKS
         MVC   WLINE(20),=C'ERRO AO LER AMBIENTE'
         EXEC CICS SEND TEXT FROM(WLINE) LENGTH(WLINELN)       X
               ERASE FREEKB
         EXEC CICS RETURN
*
SAVE     DS    18F
WRESP    DS    F
WUSER    DS    CL8
WTERM    DS    CL4
WLINE    DS    CL80
WLINELN  DC    H'80'
BLANKS   DC    CL80' '
         DFHEIBLK
         YREGS
         END   ASMCENV1`
  },

  {
    id: "ASMCBMS1",
    tech: "cics",
    name: "BMS SEND/RECEIVE (ASM)",
    desc: "Transação pseudo-conversacional em HLASM — SEND MAP, RECEIVE MAP com validação e RETURN TRANSID.",
    level: "intermediate",
    filename: "ASMCBMS1.hlasm",
    tags: ["HLASM","CICS","BMS"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMCBMS1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : TRANSACAO PSEUDO-CONVERSACIONAL COM BMS EM ASSEMBLER
*            SEND MAP / RECEIVE MAP / RETURN TRANSID
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMCBMS1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         CLC   EIBCALEN,=H'0'
         BE    PRIMVEZ
*
         EXEC CICS RECEIVE MAP('MAPINQ')                      X
               MAPSET('MSINQ')                                 X
               INTO(MAPAREA)                                   X
               RESP(WRESP)
*
         CLC   WRESP,DFHRESP(NORMAL)
         BNE   MAPERR
*
         CLC   MAPKEY,BLANKS
         BE    SENDERR
*
         MVC   MAPOUT,=CL40'REGISTRO ENCONTRADO COM SUCESSO'
         B     SENDMAP
*
SENDERR  MVC   MAPOUT,=CL40'ERRO: CHAVE NAO INFORMADA'
*
SENDMAP  EXEC CICS SEND MAP('MAPINQ')                         X
               MAPSET('MSINQ')                                 X
               FROM(MAPAREA)                                   X
               ERASE FREEKB                                    X
               RESP(WRESP)
*
         EXEC CICS RETURN                                      X
               TRANSID('INQ1')                                 X
               COMMAREA(WCOMM)                                 X
               LENGTH(WCOMMLN)
*
PRIMVEZ  XC    MAPAREA,MAPAREA
         MVC   MAPOUT,=CL40'INFORME A CHAVE DE CONSULTA'
         B     SENDMAP
*
MAPERR   MVC   MAPOUT,=CL40'ERRO AO RECEBER MAPA'
         B     SENDMAP
*
SAVE     DS    18F
WRESP    DS    F
WCOMM    DS    CL8
WCOMMLN  DC    H'8'
MAPAREA  DS    0CL256
MAPKEY   DS    CL10
         DS    CL206
MAPOUT   DS    CL40
BLANKS   DC    CL10' '
         DFHEIBLK
         YREGS
         END   ASMCBMS1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMCBMS1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : TRANSACAO PSEUDO-CONVERSACIONAL COM BMS EM ASSEMBLER
*            SEND MAP / RECEIVE MAP / RETURN TRANSID
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMCBMS1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMCBMS1         SET BASE (RELATIVE)
         USING ASMCBMS1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         CLC   EIBCALEN,=H'0'
         JE    PRIMVEZ
*
         EXEC CICS RECEIVE MAP('MAPINQ')                      X
               MAPSET('MSINQ')                                 X
               INTO(MAPAREA)                                   X
               RESP(WRESP)
*
         CLC   WRESP,DFHRESP(NORMAL)
         JNE   MAPERR
*
         CLC   MAPKEY,BLANKS
         JE    SENDERR
*
         MVC   MAPOUT,=CL40'REGISTRO ENCONTRADO COM SUCESSO'
         J     SENDMAP
*
SENDERR  MVC   MAPOUT,=CL40'ERRO: CHAVE NAO INFORMADA'
*
SENDMAP  EXEC CICS SEND MAP('MAPINQ')                         X
               MAPSET('MSINQ')                                 X
               FROM(MAPAREA)                                   X
               ERASE FREEKB                                    X
               RESP(WRESP)
*
         EXEC CICS RETURN                                      X
               TRANSID('INQ1')                                 X
               COMMAREA(WCOMM)                                 X
               LENGTH(WCOMMLN)
*
PRIMVEZ  XC    MAPAREA,MAPAREA
         MVC   MAPOUT,=CL40'INFORME A CHAVE DE CONSULTA'
         J     SENDMAP
*
MAPERR   MVC   MAPOUT,=CL40'ERRO AO RECEBER MAPA'
         J     SENDMAP
*
SAVE     DS    18F
WRESP    DS    F
WCOMM    DS    CL8
WCOMMLN  DC    H'8'
MAPAREA  DS    0CL256
MAPKEY   DS    CL10
         DS    CL206
MAPOUT   DS    CL40
BLANKS   DC    CL10' '
         DFHEIBLK
         YREGS
         END   ASMCBMS1`
  },

  {
    id: "ASMCABD1",
    tech: "cics",
    name: "Tratador de Abend (ASM)",
    desc: "HANDLE ABEND em HLASM — captura código, formata diagnóstico, grava log em TDQ e retorna.",
    level: "advanced",
    filename: "ASMCABD1.hlasm",
    tags: ["HLASM","CICS","ABEND"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMCABD1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : TRATADOR DE ABEND CICS EM ASSEMBLER
*            HANDLE ABEND -> CAPTURA -> LOG TDQ -> RETURN
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMCABD1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         EXEC CICS HANDLE ABEND                                X
               LABEL(ABDHAND)
*
         EXEC CICS ASSIGN                                      X
               USERID(WUSER)                                   X
               FACILITY(WTERM)                                 X
               RESP(WRESP)
*
         EXEC CICS READ FILE('CADMSTR')                        X
               INTO(WREC)                                      X
               RIDFLD(WKEY)                                    X
               LENGTH(WRECLN)                                  X
               RESP(WRESP)
*
         EXEC CICS RETURN
*
ABDHAND  DS    0H
         EXEC CICS ASSIGN ABCODE(WABCD)                       X
               RESP(WRESP)
*
         EXEC CICS ASKTIME ABSTIME(WABSTM)
         EXEC CICS FORMATTIME ABSTIME(WABSTM)                 X
               DATESEP('/') TIMESEP(':')                       X
               DDMMYYYY(WTSTAMP)                               X
               TIME(WTSTAMP+12)
*
         MVC   WLOGMSG,BLANKS
         MVC   WLOGMSG(19),WTSTAMP
         MVI   WLOGMSG+19,C'|'
         MVC   WLOGMSG+20(4),EIBTRNID
         MVI   WLOGMSG+24,C'|'
         MVC   WLOGMSG+25(8),WUSER
         MVI   WLOGMSG+33,C'|'
         MVC   WLOGMSG+34(4),WABCD
         MVI   WLOGMSG+38,C'|'
         MVC   WLOGMSG+39(20),=CL20'ABEND CAPTURADO ASM'
*
         EXEC CICS WRITEQ TD                                   X
               QUEUE('CSML')                                   X
               FROM(WLOGMSG)                                   X
               LENGTH(WLOGLN)                                  X
               RESP(WRESP)
*
         EXEC CICS RETURN
*
SAVE     DS    18F
WRESP    DS    F
WABSTM   DS    PL8
WUSER    DS    CL8
WTERM    DS    CL4
WABCD    DS    CL4
WTSTAMP  DS    CL26
WLOGMSG  DS    CL80
WLOGLN   DC    H'80'
WKEY     DS    CL10
WREC     DS    CL200
WRECLN   DC    H'200'
BLANKS   DC    CL80' '
         DFHEIBLK
         YREGS
         END   ASMCABD1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMCABD1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : TRATADOR DE ABEND CICS EM ASSEMBLER
*            HANDLE ABEND -> CAPTURA -> LOG TDQ -> RETURN
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMCABD1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMCABD1         SET BASE (RELATIVE)
         USING ASMCABD1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         EXEC CICS HANDLE ABEND                                X
               LABEL(ABDHAND)
*
         EXEC CICS ASSIGN                                      X
               USERID(WUSER)                                   X
               FACILITY(WTERM)                                 X
               RESP(WRESP)
*
         EXEC CICS READ FILE('CADMSTR')                        X
               INTO(WREC)                                      X
               RIDFLD(WKEY)                                    X
               LENGTH(WRECLN)                                  X
               RESP(WRESP)
*
         EXEC CICS RETURN
*
ABDHAND  DS    0H
         EXEC CICS ASSIGN ABCODE(WABCD)                       X
               RESP(WRESP)
*
         EXEC CICS ASKTIME ABSTIME(WABSTM)
         EXEC CICS FORMATTIME ABSTIME(WABSTM)                 X
               DATESEP('/') TIMESEP(':')                       X
               DDMMYYYY(WTSTAMP)                               X
               TIME(WTSTAMP+12)
*
         MVC   WLOGMSG,BLANKS
         MVC   WLOGMSG(19),WTSTAMP
         MVI   WLOGMSG+19,C'|'
         MVC   WLOGMSG+20(4),EIBTRNID
         MVI   WLOGMSG+24,C'|'
         MVC   WLOGMSG+25(8),WUSER
         MVI   WLOGMSG+33,C'|'
         MVC   WLOGMSG+34(4),WABCD
         MVI   WLOGMSG+38,C'|'
         MVC   WLOGMSG+39(20),=CL20'ABEND CAPTURADO ASM'
*
         EXEC CICS WRITEQ TD                                   X
               QUEUE('CSML')                                   X
               FROM(WLOGMSG)                                   X
               LENGTH(WLOGLN)                                  X
               RESP(WRESP)
*
         EXEC CICS RETURN
*
SAVE     DS    18F
WRESP    DS    F
WABSTM   DS    PL8
WUSER    DS    CL8
WTERM    DS    CL4
WABCD    DS    CL4
WTSTAMP  DS    CL26
WLOGMSG  DS    CL80
WLOGLN   DC    H'80'
WKEY     DS    CL10
WREC     DS    CL200
WRECLN   DC    H'200'
BLANKS   DC    CL80' '
         DFHEIBLK
         YREGS
         END   ASMCABD1`
  },
  // ========================================================================
  // DB2 (16 programas — 13 COBOL + 3 HLASM)
  // ========================================================================

  {
    id: "DB2CATIQ",
    tech: "db2",
    name: "Inspetor de Catálogo",
    desc: "Consulta SYSIBM.SYSTABLES, SYSCOLUMNS e SYSINDEXES para metadados de objetos DB2.",
    level: "intermediate",
    filename: "DB2CTIQ.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2CTIQ
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : INSPETOR DE CATALOGO DB2
      *            CONSULTA METADADOS DE TABELAS, COLUNAS E INDICES
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2CTIQ.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-SCHEMA          PIC X(08) VALUE 'PRODDB'.
       01  WS-TABLE-NAME      PIC X(18).
       01  WS-COL-NAME        PIC X(18).
       01  WS-COL-TYPE        PIC X(08).
       01  WS-COL-LEN         PIC S9(04) COMP.
       01  WS-IX-NAME         PIC X(18).
       01  WS-IX-UNIQUE       PIC X(01).
       01  WS-TABLE-COUNT     PIC S9(08) COMP VALUE 0.
       01  WS-COL-COUNT       PIC S9(08) COMP VALUE 0.
       01  WS-IX-COUNT        PIC S9(08) COMP VALUE 0.
       01  WS-MSG             PIC X(80).

           EXEC SQL DECLARE CSR-TABLES CURSOR FOR
               SELECT NAME
               FROM   SYSIBM.SYSTABLES
               WHERE  CREATOR = :WS-SCHEMA
                 AND  TYPE    = 'T'
               ORDER BY NAME
           END-EXEC.

           EXEC SQL DECLARE CSR-COLUMNS CURSOR FOR
               SELECT NAME, COLTYPE, LENGTH
               FROM   SYSIBM.SYSCOLUMNS
               WHERE  TBCREATOR = :WS-SCHEMA
                 AND  TBNAME    = :WS-TABLE-NAME
               ORDER BY COLNO
           END-EXEC.

           EXEC SQL DECLARE CSR-INDEXES CURSOR FOR
               SELECT NAME, UNIQUERULE
               FROM   SYSIBM.SYSINDEXES
               WHERE  TBCREATOR = :WS-SCHEMA
                 AND  TBNAME    = :WS-TABLE-NAME
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-LIST-TABLES
           DISPLAY 'CATALOGO: ' WS-TABLE-COUNT ' TABELAS'
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-LIST-TABLES SECTION
      *==========================================================*
       1000-LIST-TABLES SECTION.
           EXEC SQL OPEN CSR-TABLES END-EXEC
           PERFORM 1100-FETCH-TABLE UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-TABLES END-EXEC.

       1000-LIST-TABLES-EXIT.
           EXIT.
      *==========================================================*
      * 1100-FETCH-TABLE SECTION
      *==========================================================*
       1100-FETCH-TABLE SECTION.
           EXEC SQL FETCH CSR-TABLES
               INTO :WS-TABLE-NAME
           END-EXEC
           IF SQLCODE = 0
               ADD 1 TO WS-TABLE-COUNT
               DISPLAY 'TABELA: ' WS-TABLE-NAME
               PERFORM 2000-LIST-COLUMNS
               PERFORM 3000-LIST-INDEXES
           END-IF.

       1100-FETCH-TABLE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-LIST-COLUMNS SECTION
      *==========================================================*
       2000-LIST-COLUMNS SECTION.
           EXEC SQL OPEN CSR-COLUMNS END-EXEC
           PERFORM 2100-FETCH-COL UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-COLUMNS END-EXEC.

       2000-LIST-COLUMNS-EXIT.
           EXIT.
      *==========================================================*
      * 2100-FETCH-COL SECTION
      *==========================================================*
       2100-FETCH-COL SECTION.
           EXEC SQL FETCH CSR-COLUMNS
               INTO :WS-COL-NAME,
                    :WS-COL-TYPE,
                    :WS-COL-LEN
           END-EXEC
           IF SQLCODE = 0
               ADD 1 TO WS-COL-COUNT
               DISPLAY '  COL: ' WS-COL-NAME
                       ' TIPO=' WS-COL-TYPE
                       ' LEN=' WS-COL-LEN
           END-IF.

       2100-FETCH-COL-EXIT.
           EXIT.
      *==========================================================*
      * 3000-LIST-INDEXES SECTION
      *==========================================================*
       3000-LIST-INDEXES SECTION.
           EXEC SQL OPEN CSR-INDEXES END-EXEC
           PERFORM 3100-FETCH-IX UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-INDEXES END-EXEC.

       3000-LIST-INDEXES-EXIT.
           EXIT.
      *==========================================================*
      * 3100-FETCH-IX SECTION
      *==========================================================*
       3100-FETCH-IX SECTION.
           EXEC SQL FETCH CSR-INDEXES
               INTO :WS-IX-NAME,
                    :WS-IX-UNIQUE
           END-EXEC
           IF SQLCODE = 0
               ADD 1 TO WS-IX-COUNT
               DISPLAY '  IDX: ' WS-IX-NAME
                       ' UNIQUE=' WS-IX-UNIQUE
           END-IF.
       3100-FETCH-IX-EXIT.
           EXIT.`
  },

  {
    id: "DB2CMTBH",
    tech: "db2",
    name: "Commit Batch Handler",
    desc: "Processamento batch com COMMIT periódico e ponto de restart para recuperação.",
    level: "advanced",
    filename: "DB2CMTB.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2CMTB
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : COMMIT BATCH HANDLER
      *            BATCH COM COMMIT PERIODICO E RESTART POINT
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2CMTB.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT RESTART-FILE ASSIGN TO RSTFILE
               ORGANIZATION IS SEQUENTIAL.

       DATA DIVISION.
       FILE SECTION.
       FD  RESTART-FILE.
       01  RST-RECORD.
           05 RST-LAST-KEY     PIC X(10).
           05 RST-COMMIT-COUNT PIC 9(08).

       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-COMMIT-FREQ      PIC S9(08) COMP VALUE 500.
       01  WS-PROC-COUNT       PIC S9(08) COMP VALUE 0.
       01  WS-COMMIT-COUNT     PIC S9(08) COMP VALUE 0.
       01  WS-RESTART-KEY      PIC X(10) VALUE SPACES.
       01  WS-IS-RESTART       PIC X(01) VALUE 'N'.
       01  WS-ACCT-KEY         PIC X(10).
       01  WS-BALANCE          PIC S9(13)V99 COMP-3.
       01  WS-NEW-BALANCE      PIC S9(13)V99 COMP-3.

           EXEC SQL DECLARE CSR-ACCOUNTS CURSOR WITH HOLD FOR
               SELECT ACCT_KEY, BALANCE
               FROM   TBACCOUNTS
               WHERE  ACCT_KEY > :WS-RESTART-KEY
               ORDER BY ACCT_KEY
               FOR UPDATE OF BALANCE
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 0100-CHECK-RESTART
           PERFORM 1000-PROCESS-BATCH
           PERFORM 9000-FINAL-COMMIT
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 0100-CHECK-RESTART SECTION
      *==========================================================*
       0100-CHECK-RESTART SECTION.
           OPEN INPUT RESTART-FILE
           READ RESTART-FILE
               AT END MOVE 'N' TO WS-IS-RESTART
               NOT AT END
                   MOVE RST-LAST-KEY TO WS-RESTART-KEY
                   MOVE 'Y' TO WS-IS-RESTART
           END-READ
           CLOSE RESTART-FILE.

       0100-CHECK-RESTART-EXIT.
           EXIT.
      *==========================================================*
      * 1000-PROCESS-BATCH SECTION
      *==========================================================*
       1000-PROCESS-BATCH SECTION.
           EXEC SQL OPEN CSR-ACCOUNTS END-EXEC
           PERFORM 1100-FETCH-AND-UPDATE UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-ACCOUNTS END-EXEC.

       1000-PROCESS-BATCH-EXIT.
           EXIT.
      *==========================================================*
      * 1100-FETCH-AND-UPDATE SECTION
      *==========================================================*
       1100-FETCH-AND-UPDATE SECTION.
           EXEC SQL FETCH CSR-ACCOUNTS
               INTO :WS-ACCT-KEY, :WS-BALANCE
           END-EXEC
           IF SQLCODE = 0
               COMPUTE WS-NEW-BALANCE =
                   WS-BALANCE * 1.005
               EXEC SQL UPDATE TBACCOUNTS
                   SET BALANCE = :WS-NEW-BALANCE
                   WHERE CURRENT OF CSR-ACCOUNTS
               END-EXEC
               ADD 1 TO WS-PROC-COUNT
               IF FUNCTION MOD(WS-PROC-COUNT, WS-COMMIT-FREQ)
                  = 0
                   PERFORM 2000-COMMIT-AND-SAVE
               END-IF
           END-IF.

       1100-FETCH-AND-UPDATE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-COMMIT-AND-SAVE SECTION
      *==========================================================*
       2000-COMMIT-AND-SAVE SECTION.
           EXEC SQL COMMIT END-EXEC
           ADD 1 TO WS-COMMIT-COUNT
           OPEN OUTPUT RESTART-FILE
           MOVE WS-ACCT-KEY TO RST-LAST-KEY
           MOVE WS-COMMIT-COUNT TO RST-COMMIT-COUNT
           WRITE RST-RECORD
           CLOSE RESTART-FILE
           DISPLAY 'COMMIT #' WS-COMMIT-COUNT
                   ' KEY=' WS-ACCT-KEY.

       2000-COMMIT-AND-SAVE-EXIT.
           EXIT.
      *==========================================================*
      * 9000-FINAL-COMMIT SECTION
      *==========================================================*
       9000-FINAL-COMMIT SECTION.
           EXEC SQL COMMIT END-EXEC
           ADD 1 TO WS-COMMIT-COUNT
           DISPLAY 'BATCH COMPLETO: '
                   WS-PROC-COUNT ' REGISTROS, '
                   WS-COMMIT-COUNT ' COMMITS'.
       9000-FINAL-COMMIT-EXIT.
           EXIT.`
  },

  {
    id: "DB2RETR",
    tech: "db2",
    name: "Data Retrieval",
    desc: "SELECT com múltiplas condições e cursor para navegação em result set.",
    level: "basic",
    filename: "DB2RETR.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2RETR
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : DATA RETRIEVAL
      *            SELECT COM MULTIPLAS CONDICOES E CURSOR
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2RETR.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-PARAMS.
           05 WS-P-REGION      PIC X(02) VALUE 'SP'.
           05 WS-P-MIN-BAL     PIC S9(13)V99 COMP-3 VALUE 1000.
           05 WS-P-STATUS      PIC X(01) VALUE 'A'.
       01  WS-RESULT.
           05 WS-R-ACCT-ID     PIC X(10).
           05 WS-R-NAME        PIC X(40).
           05 WS-R-BALANCE     PIC S9(13)V99 COMP-3.
           05 WS-R-OPEN-DATE   PIC X(10).
           05 WS-R-BRANCH      PIC X(04).
       01  WS-TOTAL-BAL        PIC S9(15)V99 COMP-3 VALUE 0.
       01  WS-REC-COUNT        PIC S9(08) COMP VALUE 0.
       01  WS-FMT-BAL          PIC Z(12)9.99.

           EXEC SQL DECLARE CSR-CLIENTS CURSOR FOR
               SELECT A.ACCT_ID,
                      C.CLIENT_NAME,
                      A.BALANCE,
                      A.OPEN_DATE,
                      A.BRANCH_CODE
               FROM   TBACCOUNTS  A,
                      TBCLIENTS   C
               WHERE  A.CLIENT_ID = C.CLIENT_ID
                 AND  A.REGION    = :WS-P-REGION
                 AND  A.BALANCE  >= :WS-P-MIN-BAL
                 AND  A.STATUS    = :WS-P-STATUS
               ORDER BY A.BALANCE DESC
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-OPEN-CURSOR
           PERFORM 2000-PROCESS-ROWS
           PERFORM 3000-CLOSE-CURSOR
           PERFORM 4000-DISPLAY-TOTALS
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-OPEN-CURSOR SECTION
      *==========================================================*
       1000-OPEN-CURSOR SECTION.
           EXEC SQL OPEN CSR-CLIENTS END-EXEC
           IF SQLCODE NOT = 0
               DISPLAY 'ERRO OPEN CURSOR: ' SQLCODE
               STOP RUN
           END-IF.

       1000-OPEN-CURSOR-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PROCESS-ROWS SECTION
      *==========================================================*
       2000-PROCESS-ROWS SECTION.
           PERFORM 2100-FETCH-ROW UNTIL SQLCODE NOT = 0.

       2000-PROCESS-ROWS-EXIT.
           EXIT.
      *==========================================================*
      * 2100-FETCH-ROW SECTION
      *==========================================================*
       2100-FETCH-ROW SECTION.
           EXEC SQL FETCH CSR-CLIENTS
               INTO :WS-R-ACCT-ID,
                    :WS-R-NAME,
                    :WS-R-BALANCE,
                    :WS-R-OPEN-DATE,
                    :WS-R-BRANCH
           END-EXEC
           IF SQLCODE = 0
               ADD 1 TO WS-REC-COUNT
               ADD WS-R-BALANCE TO WS-TOTAL-BAL
               MOVE WS-R-BALANCE TO WS-FMT-BAL
               DISPLAY WS-R-ACCT-ID ' '
                       WS-R-NAME ' '
                       WS-FMT-BAL
           END-IF.

       2100-FETCH-ROW-EXIT.
           EXIT.
      *==========================================================*
      * 3000-CLOSE-CURSOR SECTION
      *==========================================================*
       3000-CLOSE-CURSOR SECTION.
           EXEC SQL CLOSE CSR-CLIENTS END-EXEC.

       3000-CLOSE-CURSOR-EXIT.
           EXIT.
      *==========================================================*
      * 4000-DISPLAY-TOTALS SECTION
      *==========================================================*
       4000-DISPLAY-TOTALS SECTION.
           MOVE WS-TOTAL-BAL TO WS-FMT-BAL
           DISPLAY '================================='
           DISPLAY 'REGISTROS: ' WS-REC-COUNT
           DISPLAY 'SALDO TOTAL: ' WS-FMT-BAL
           DISPLAY '================================='.
       4000-DISPLAY-TOTALS-EXIT.
           EXIT.`
  },

  {
    id: "DB2DYNEX",
    tech: "db2",
    name: "Dynamic SQL Executor",
    desc: "PREPARE e EXECUTE de SQL dinâmico com parameter markers e DESCRIBE para metadados.",
    level: "advanced",
    filename: "DB2DYNE.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2DYNE
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : DYNAMIC SQL EXECUTOR
      *            PREPARE, DESCRIBE E EXECUTE COM MARKERS
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2DYNE.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA  END-EXEC.
           EXEC SQL INCLUDE SQLDA  END-EXEC.

       01  WS-DYN-SQL          PIC X(500).
       01  WS-STMT-NAME        PIC X(18) VALUE 'DYNSTMT'.
       01  WS-PARAM-REGION     PIC X(02).
       01  WS-PARAM-STATUS     PIC X(01).
       01  WS-RESULT-NAME      PIC X(40).
       01  WS-RESULT-BAL       PIC S9(13)V99 COMP-3.
       01  WS-NUM-COLS         PIC S9(04) COMP.
       01  WS-COL-IDX          PIC S9(04) COMP.
       01  WS-COL-NAME         PIC X(18).
       01  WS-COL-TYPE         PIC S9(04) COMP.
       01  WS-REC-COUNT        PIC S9(08) COMP VALUE 0.

           EXEC SQL DECLARE DYN-CURSOR CURSOR FOR DYNSTMT
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-BUILD-SQL
           PERFORM 2000-PREPARE-STMT
           PERFORM 3000-DESCRIBE-STMT
           PERFORM 4000-EXECUTE-QUERY
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-BUILD-SQL SECTION
      *==========================================================*
       1000-BUILD-SQL SECTION.
           STRING
               'SELECT CLIENT_NAME, BALANCE'
               ' FROM TBACCOUNTS A, TBCLIENTS C'
               ' WHERE A.CLIENT_ID = C.CLIENT_ID'
               ' AND A.REGION = ?'
               ' AND A.STATUS = ?'
               DELIMITED BY SIZE INTO WS-DYN-SQL
           END-STRING
           MOVE 'SP' TO WS-PARAM-REGION
           MOVE 'A'  TO WS-PARAM-STATUS.

       1000-BUILD-SQL-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PREPARE-STMT SECTION
      *==========================================================*
       2000-PREPARE-STMT SECTION.
           EXEC SQL PREPARE DYNSTMT FROM :WS-DYN-SQL
           END-EXEC
           IF SQLCODE NOT = 0
               DISPLAY 'ERRO PREPARE: ' SQLCODE
               STOP RUN
           END-IF.

       2000-PREPARE-STMT-EXIT.
           EXIT.
      *==========================================================*
      * 3000-DESCRIBE-STMT SECTION
      *==========================================================*
       3000-DESCRIBE-STMT SECTION.
           EXEC SQL DESCRIBE DYNSTMT INTO :SQLDA
           END-EXEC
           IF SQLCODE = 0
               MOVE SQLD TO WS-NUM-COLS
               DISPLAY 'COLUNAS NO RESULT SET: '
                       WS-NUM-COLS
           END-IF.

       3000-DESCRIBE-STMT-EXIT.
           EXIT.
      *==========================================================*
      * 4000-EXECUTE-QUERY SECTION
      *==========================================================*
       4000-EXECUTE-QUERY SECTION.
           EXEC SQL OPEN DYN-CURSOR
               USING :WS-PARAM-REGION,
                     :WS-PARAM-STATUS
           END-EXEC
           PERFORM 4100-FETCH-DYN UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE DYN-CURSOR END-EXEC
           DISPLAY 'TOTAL REGISTROS: ' WS-REC-COUNT.

       4000-EXECUTE-QUERY-EXIT.
           EXIT.
      *==========================================================*
      * 4100-FETCH-DYN SECTION
      *==========================================================*
       4100-FETCH-DYN SECTION.
           EXEC SQL FETCH DYN-CURSOR
               INTO :WS-RESULT-NAME,
                    :WS-RESULT-BAL
           END-EXEC
           IF SQLCODE = 0
               ADD 1 TO WS-REC-COUNT
               DISPLAY WS-RESULT-NAME ' SALDO='
                       WS-RESULT-BAL
           END-IF.
       4100-FETCH-DYN-EXIT.
           EXIT.`
  },

  {
    id: "DB2HLTH",
    tech: "db2",
    name: "Health Check DB2",
    desc: "Verifica status de tablespaces, necessidade de RUNSTATS e REORG pending.",
    level: "intermediate",
    filename: "DB2HLTH.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2HLTH
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : HEALTH CHECK DB2
      *            VERIFICA TABLESPACE STATUS, RUNSTATS, REORG
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2HLTH.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-DB-NAME          PIC X(08) VALUE 'PRODDB'.
       01  WS-TS-NAME          PIC X(08).
       01  WS-TS-STATUS        PIC X(08).
       01  WS-TS-TYPE          PIC X(08).
       01  WS-NACTIVE          PIC S9(08) COMP.
       01  WS-STATS-TIME       PIC X(26).
       01  WS-REORG-PEND       PIC X(01).
       01  WS-CHECK-COUNT      PIC S9(04) COMP VALUE 0.
       01  WS-WARN-COUNT       PIC S9(04) COMP VALUE 0.
       01  WS-MSG              PIC X(80).

           EXEC SQL DECLARE CSR-TS-STATUS CURSOR FOR
               SELECT TS.NAME,
                      TS.STATUS,
                      TS.TYPE,
                      TS.NACTIVE,
                      CHAR(TS.STATSTIME),
                      CASE WHEN TS.STATUS = 'REORP'
                           THEN 'Y' ELSE 'N'
                      END
               FROM   SYSIBM.SYSTABLESPACE TS
               WHERE  TS.DBNAME = :WS-DB-NAME
               ORDER BY TS.NAME
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           DISPLAY '=== DB2 HEALTH CHECK ==='
           DISPLAY 'DATABASE: ' WS-DB-NAME
           PERFORM 1000-CHECK-TABLESPACES
           PERFORM 9000-SUMMARY
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-CHECK-TABLESPACES SECTION
      *==========================================================*
       1000-CHECK-TABLESPACES SECTION.
           EXEC SQL OPEN CSR-TS-STATUS END-EXEC
           PERFORM 1100-FETCH-TS UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-TS-STATUS END-EXEC.

       1000-CHECK-TABLESPACES-EXIT.
           EXIT.
      *==========================================================*
      * 1100-FETCH-TS SECTION
      *==========================================================*
       1100-FETCH-TS SECTION.
           EXEC SQL FETCH CSR-TS-STATUS
               INTO :WS-TS-NAME,
                    :WS-TS-STATUS,
                    :WS-TS-TYPE,
                    :WS-NACTIVE,
                    :WS-STATS-TIME,
                    :WS-REORG-PEND
           END-EXEC
           IF SQLCODE = 0
               ADD 1 TO WS-CHECK-COUNT
               PERFORM 1200-EVALUATE-TS
           END-IF.

       1100-FETCH-TS-EXIT.
           EXIT.
      *==========================================================*
      * 1200-EVALUATE-TS SECTION
      *==========================================================*
       1200-EVALUATE-TS SECTION.
           DISPLAY 'TS: ' WS-TS-NAME
                   ' STATUS=' WS-TS-STATUS
                   ' TYPE=' WS-TS-TYPE
           IF WS-TS-STATUS NOT = 'RW'
               ADD 1 TO WS-WARN-COUNT
               DISPLAY '  *** ATENCAO: STATUS NAO-RW ***'
           END-IF
           IF WS-REORG-PEND = 'Y'
               ADD 1 TO WS-WARN-COUNT
               DISPLAY '  *** REORG PENDING ***'
           END-IF
           IF WS-STATS-TIME = SPACES
               ADD 1 TO WS-WARN-COUNT
               DISPLAY '  *** RUNSTATS NUNCA EXECUTADO ***'
           END-IF.

       1200-EVALUATE-TS-EXIT.
           EXIT.
      *==========================================================*
      * 9000-SUMMARY SECTION
      *==========================================================*
       9000-SUMMARY SECTION.
           DISPLAY '========================='
           DISPLAY 'TABLESPACES VERIFICADOS: '
                   WS-CHECK-COUNT
           DISPLAY 'ALERTAS ENCONTRADOS:    '
                   WS-WARN-COUNT
           DISPLAY '========================='.
       9000-SUMMARY-EXIT.
           EXIT.`
  },

  {
    id: "DB2SQLCD",
    tech: "db2",
    name: "SQLCODE Decoder",
    desc: "Recebe SQLCODE e retorna mensagem descritiva via tabela de referência.",
    level: "basic",
    filename: "DB2SQCD.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2SQCD
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : SQLCODE DECODER
      *            CONVERTE SQLCODE EM MENSAGEM DESCRITIVA
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2SQCD.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-INPUT-SQLCODE    PIC S9(08) COMP.
       01  WS-OUTPUT-MSG       PIC X(80).
       01  WS-SEVERITY         PIC X(10).

       LINKAGE SECTION.
       01  LS-SQLCODE          PIC S9(08) COMP.
       01  LS-MESSAGE          PIC X(80).
       01  LS-SEVERITY         PIC X(10).

       PROCEDURE DIVISION USING LS-SQLCODE
                                LS-MESSAGE
                                LS-SEVERITY.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           MOVE LS-SQLCODE TO WS-INPUT-SQLCODE
           PERFORM 1000-DECODE-SQLCODE
           MOVE WS-OUTPUT-MSG TO LS-MESSAGE
           MOVE WS-SEVERITY TO LS-SEVERITY
           GOBACK.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-DECODE-SQLCODE SECTION
      *==========================================================*
       1000-DECODE-SQLCODE SECTION.
           EVALUATE TRUE
               WHEN WS-INPUT-SQLCODE = 0
                   MOVE 'SUCESSO - EXECUCAO NORMAL'
                       TO WS-OUTPUT-MSG
                   MOVE 'INFO' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = 100
                   MOVE 'ROW NOT FOUND OU END OF CURSOR'
                       TO WS-OUTPUT-MSG
                   MOVE 'WARNING' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -180
                   MOVE 'STRING DATETIME INVALIDA'
                       TO WS-OUTPUT-MSG
                   MOVE 'ERROR' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -204
                   MOVE 'OBJETO NAO DEFINIDO NO DB2'
                       TO WS-OUTPUT-MSG
                   MOVE 'ERROR' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -305
                   MOVE 'NULL VALUE SEM INDICADOR'
                       TO WS-OUTPUT-MSG
                   MOVE 'ERROR' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -803
                   MOVE 'VIOLACAO DE UNIQUE INDEX'
                       TO WS-OUTPUT-MSG
                   MOVE 'ERROR' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -811
                   MOVE 'SELECT RETORNOU MAIS DE 1 ROW'
                       TO WS-OUTPUT-MSG
                   MOVE 'ERROR' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -818
                   MOVE 'TIMESTAMP MISMATCH - REBIND'
                       TO WS-OUTPUT-MSG
                   MOVE 'CRITICAL' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -904
                   MOVE 'RECURSO INDISPONIVEL'
                       TO WS-OUTPUT-MSG
                   MOVE 'CRITICAL' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -911
                   MOVE 'DEADLOCK OU TIMEOUT - ROLLBACK'
                       TO WS-OUTPUT-MSG
                   MOVE 'CRITICAL' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE = -913
                   MOVE 'DEADLOCK VITIMA - RETRY'
                       TO WS-OUTPUT-MSG
                   MOVE 'CRITICAL' TO WS-SEVERITY
               WHEN WS-INPUT-SQLCODE < 0
                   MOVE 'SQLCODE NEGATIVO NAO CATALOGADO'
                       TO WS-OUTPUT-MSG
                   MOVE 'ERROR' TO WS-SEVERITY
               WHEN OTHER
                   MOVE 'SQLCODE POSITIVO NAO CATALOGADO'
                       TO WS-OUTPUT-MSG
                   MOVE 'WARNING' TO WS-SEVERITY
           END-EVALUATE.
       1000-DECODE-SQLCODE-EXIT.
           EXIT.`
  },

  {
    id: "DB2CURS01",
    tech: "db2",
    name: "Cursores Múltiplos",
    desc: "Cursores mestre-detalhe aninhados com WITH HOLD e FOR UPDATE.",
    level: "advanced",
    filename: "DB2CRS01.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2CRS01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CURSORES MULTIPLOS MESTRE-DETALHE
      *            WITH HOLD E FOR UPDATE
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2CRS01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-MASTER.
           05 WS-M-ORDER-ID    PIC S9(08) COMP.
           05 WS-M-CLIENT-ID   PIC S9(08) COMP.
           05 WS-M-STATUS      PIC X(01).
           05 WS-M-TOTAL       PIC S9(11)V99 COMP-3.
       01  WS-DETAIL.
           05 WS-D-LINE-NO     PIC S9(04) COMP.
           05 WS-D-PRODUCT     PIC X(10).
           05 WS-D-QTY         PIC S9(05) COMP.
           05 WS-D-PRICE       PIC S9(09)V99 COMP-3.
           05 WS-D-SUBTOTAL    PIC S9(11)V99 COMP-3.
       01  WS-CALC-TOTAL       PIC S9(11)V99 COMP-3.
       01  WS-ORDER-COUNT      PIC S9(08) COMP VALUE 0.

           EXEC SQL DECLARE CSR-ORDERS CURSOR WITH HOLD FOR
               SELECT ORDER_ID, CLIENT_ID, STATUS, TOTAL_AMT
               FROM   TBORDERS
               WHERE  STATUS = 'P'
               ORDER BY ORDER_ID
               FOR UPDATE OF TOTAL_AMT, STATUS
           END-EXEC.

           EXEC SQL DECLARE CSR-ITEMS CURSOR FOR
               SELECT LINE_NO, PRODUCT_CODE, QTY,
                      UNIT_PRICE, QTY * UNIT_PRICE
               FROM   TBORDER_ITEMS
               WHERE  ORDER_ID = :WS-M-ORDER-ID
               ORDER BY LINE_NO
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-PROCESS-ORDERS
           DISPLAY 'PEDIDOS PROCESSADOS: ' WS-ORDER-COUNT
           EXEC SQL COMMIT END-EXEC
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-PROCESS-ORDERS SECTION
      *==========================================================*
       1000-PROCESS-ORDERS SECTION.
           EXEC SQL OPEN CSR-ORDERS END-EXEC
           PERFORM 1100-FETCH-ORDER UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-ORDERS END-EXEC.

       1000-PROCESS-ORDERS-EXIT.
           EXIT.
      *==========================================================*
      * 1100-FETCH-ORDER SECTION
      *==========================================================*
       1100-FETCH-ORDER SECTION.
           EXEC SQL FETCH CSR-ORDERS
               INTO :WS-M-ORDER-ID,
                    :WS-M-CLIENT-ID,
                    :WS-M-STATUS,
                    :WS-M-TOTAL
           END-EXEC
           IF SQLCODE = 0
               MOVE 0 TO WS-CALC-TOTAL
               PERFORM 2000-PROCESS-ITEMS
               PERFORM 3000-UPDATE-ORDER
               ADD 1 TO WS-ORDER-COUNT
           END-IF.

       1100-FETCH-ORDER-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PROCESS-ITEMS SECTION
      *==========================================================*
       2000-PROCESS-ITEMS SECTION.
           EXEC SQL OPEN CSR-ITEMS END-EXEC
           PERFORM 2100-FETCH-ITEM UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-ITEMS END-EXEC.

       2000-PROCESS-ITEMS-EXIT.
           EXIT.
      *==========================================================*
      * 2100-FETCH-ITEM SECTION
      *==========================================================*
       2100-FETCH-ITEM SECTION.
           EXEC SQL FETCH CSR-ITEMS
               INTO :WS-D-LINE-NO,
                    :WS-D-PRODUCT,
                    :WS-D-QTY,
                    :WS-D-PRICE,
                    :WS-D-SUBTOTAL
           END-EXEC
           IF SQLCODE = 0
               ADD WS-D-SUBTOTAL TO WS-CALC-TOTAL
           END-IF.

       2100-FETCH-ITEM-EXIT.
           EXIT.
      *==========================================================*
      * 3000-UPDATE-ORDER SECTION
      *==========================================================*
       3000-UPDATE-ORDER SECTION.
           EXEC SQL UPDATE TBORDERS
               SET TOTAL_AMT = :WS-CALC-TOTAL,
                   STATUS    = 'C'
               WHERE CURRENT OF CSR-ORDERS
           END-EXEC
           IF SQLCODE NOT = 0
               DISPLAY 'ERRO UPDATE ORDER '
                       WS-M-ORDER-ID ': ' SQLCODE
           END-IF.
       3000-UPDATE-ORDER-EXIT.
           EXIT.`
  },

  {
    id: "DB2BULK01",
    tech: "db2",
    name: "Bulk Load DB2",
    desc: "INSERT em lote com COMMIT a cada N registros e controle de erros.",
    level: "intermediate",
    filename: "DB2BLK01.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2BLK01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : BULK LOAD DB2
      *            INSERT EM LOTE COM COMMIT PERIODICO
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2BLK01.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT INPUT-FILE ASSIGN TO INPFILE
               ORGANIZATION IS SEQUENTIAL.

       DATA DIVISION.
       FILE SECTION.
       FD  INPUT-FILE.
       01  INP-RECORD.
           05 INP-ACCT-ID      PIC X(10).
           05 INP-NAME         PIC X(40).
           05 INP-REGION       PIC X(02).
           05 INP-BALANCE      PIC S9(13)V99.
           05 INP-STATUS       PIC X(01).
           05 FILLER           PIC X(14).

       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-COMMIT-FREQ      PIC S9(08) COMP VALUE 1000.
       01  WS-INSERT-COUNT     PIC S9(08) COMP VALUE 0.
       01  WS-ERROR-COUNT      PIC S9(08) COMP VALUE 0.
       01  WS-COMMIT-COUNT     PIC S9(08) COMP VALUE 0.
       01  WS-EOF              PIC X(01) VALUE 'N'.
       01  WS-DB2-BALANCE      PIC S9(13)V99 COMP-3.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           OPEN INPUT INPUT-FILE
           PERFORM 1000-LOAD-RECORDS
           PERFORM 9000-FINAL-COMMIT
           CLOSE INPUT-FILE
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-LOAD-RECORDS SECTION
      *==========================================================*
       1000-LOAD-RECORDS SECTION.
           PERFORM 1100-READ-AND-INSERT
               UNTIL WS-EOF = 'Y'.

       1000-LOAD-RECORDS-EXIT.
           EXIT.
      *==========================================================*
      * 1100-READ-AND-INSERT SECTION
      *==========================================================*
       1100-READ-AND-INSERT SECTION.
           READ INPUT-FILE
               AT END MOVE 'Y' TO WS-EOF
               NOT AT END PERFORM 2000-INSERT-ROW
           END-READ.

       1100-READ-AND-INSERT-EXIT.
           EXIT.
      *==========================================================*
      * 2000-INSERT-ROW SECTION
      *==========================================================*
       2000-INSERT-ROW SECTION.
           MOVE INP-BALANCE TO WS-DB2-BALANCE
           EXEC SQL INSERT INTO TBACCOUNTS
               (ACCT_ID, CLIENT_NAME, REGION,
                BALANCE, STATUS)
               VALUES
               (:INP-ACCT-ID,
                :INP-NAME,
                :INP-REGION,
                :WS-DB2-BALANCE,
                :INP-STATUS)
           END-EXEC
           EVALUATE SQLCODE
               WHEN 0
                   ADD 1 TO WS-INSERT-COUNT
                   IF FUNCTION MOD(WS-INSERT-COUNT,
                      WS-COMMIT-FREQ) = 0
                       PERFORM 3000-COMMIT-BATCH
                   END-IF
               WHEN -803
                   ADD 1 TO WS-ERROR-COUNT
                   DISPLAY 'DUPLICADO: ' INP-ACCT-ID
               WHEN OTHER
                   ADD 1 TO WS-ERROR-COUNT
                   DISPLAY 'ERRO INSERT ' INP-ACCT-ID
                           ' SQLCODE=' SQLCODE
           END-EVALUATE.

       2000-INSERT-ROW-EXIT.
           EXIT.
      *==========================================================*
      * 3000-COMMIT-BATCH SECTION
      *==========================================================*
       3000-COMMIT-BATCH SECTION.
           EXEC SQL COMMIT END-EXEC
           ADD 1 TO WS-COMMIT-COUNT
           DISPLAY 'COMMIT #' WS-COMMIT-COUNT
                   ' INSERTS=' WS-INSERT-COUNT.

       3000-COMMIT-BATCH-EXIT.
           EXIT.
      *==========================================================*
      * 9000-FINAL-COMMIT SECTION
      *==========================================================*
       9000-FINAL-COMMIT SECTION.
           EXEC SQL COMMIT END-EXEC
           ADD 1 TO WS-COMMIT-COUNT
           DISPLAY 'CARGA FINALIZADA'
           DISPLAY '  INSERIDOS: ' WS-INSERT-COUNT
           DISPLAY '  ERROS:     ' WS-ERROR-COUNT
           DISPLAY '  COMMITS:   ' WS-COMMIT-COUNT.
       9000-FINAL-COMMIT-EXIT.
           EXIT.`
  },

  {
    id: "DB2TEMP01",
    tech: "db2",
    name: "Tabelas Temporárias",
    desc: "DECLARE GLOBAL TEMPORARY TABLE com INSERT, SELECT e limpeza automática.",
    level: "intermediate",
    filename: "DB2TMP01.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2TMP01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : TABELAS TEMPORARIAS GLOBAIS DB2
      *            DECLARE GLOBAL TEMPORARY TABLE, INSERT E SELECT
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2TMP01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-REGION           PIC X(02).
       01  WS-TMP-ACCT-ID     PIC X(10).
       01  WS-TMP-NAME        PIC X(40).
       01  WS-TMP-BALANCE     PIC S9(13)V99 COMP-3.
       01  WS-TMP-RANK        PIC S9(08) COMP.
       01  WS-REC-COUNT        PIC S9(08) COMP VALUE 0.
       01  WS-FMT-BAL          PIC Z(12)9.99.

           EXEC SQL DECLARE CSR-TMP CURSOR FOR
               SELECT ACCT_ID, CLIENT_NAME,
                      BALANCE, RANKING
               FROM   SESSION.TOP_ACCOUNTS
               ORDER BY RANKING
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-CREATE-TEMP-TABLE
           MOVE 'SP' TO WS-REGION
           PERFORM 2000-POPULATE-TEMP
           MOVE 'RJ' TO WS-REGION
           PERFORM 2000-POPULATE-TEMP
           PERFORM 3000-READ-RESULTS
           DISPLAY 'REGISTROS NA TEMP: ' WS-REC-COUNT
           EXEC SQL COMMIT END-EXEC
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-CREATE-TEMP-TABLE SECTION
      *==========================================================*
       1000-CREATE-TEMP-TABLE SECTION.
           EXEC SQL
               DECLARE GLOBAL TEMPORARY TABLE
                   SESSION.TOP_ACCOUNTS
               (ACCT_ID      CHAR(10)     NOT NULL,
                CLIENT_NAME  CHAR(40)     NOT NULL,
                BALANCE      DECIMAL(15,2),
                RANKING      INTEGER)
               ON COMMIT PRESERVE ROWS
           END-EXEC
           IF SQLCODE NOT = 0
               DISPLAY 'ERRO CREATE TEMP: ' SQLCODE
               STOP RUN
           END-IF.

       1000-CREATE-TEMP-TABLE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-POPULATE-TEMP SECTION
      *==========================================================*
       2000-POPULATE-TEMP SECTION.
           EXEC SQL
               INSERT INTO SESSION.TOP_ACCOUNTS
               SELECT A.ACCT_ID,
                      C.CLIENT_NAME,
                      A.BALANCE,
                      ROW_NUMBER() OVER(
                          ORDER BY A.BALANCE DESC)
               FROM   TBACCOUNTS A,
                      TBCLIENTS  C
               WHERE  A.CLIENT_ID = C.CLIENT_ID
                 AND  A.REGION    = :WS-REGION
                 AND  A.STATUS    = 'A'
               FETCH FIRST 100 ROWS ONLY
           END-EXEC
           IF SQLCODE NOT = 0 AND SQLCODE NOT = 100
               DISPLAY 'ERRO POPULATE TEMP: ' SQLCODE
           END-IF.

       2000-POPULATE-TEMP-EXIT.
           EXIT.
      *==========================================================*
      * 3000-READ-RESULTS SECTION
      *==========================================================*
       3000-READ-RESULTS SECTION.
           EXEC SQL OPEN CSR-TMP END-EXEC
           PERFORM 3100-FETCH-TMP UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-TMP END-EXEC.

       3000-READ-RESULTS-EXIT.
           EXIT.
      *==========================================================*
      * 3100-FETCH-TMP SECTION
      *==========================================================*
       3100-FETCH-TMP SECTION.
           EXEC SQL FETCH CSR-TMP
               INTO :WS-TMP-ACCT-ID,
                    :WS-TMP-NAME,
                    :WS-TMP-BALANCE,
                    :WS-TMP-RANK
           END-EXEC
           IF SQLCODE = 0
               ADD 1 TO WS-REC-COUNT
               MOVE WS-TMP-BALANCE TO WS-FMT-BAL
               DISPLAY WS-TMP-RANK '. '
                       WS-TMP-ACCT-ID ' '
                       WS-TMP-NAME ' '
                       WS-FMT-BAL
           END-IF.
       3100-FETCH-TMP-EXIT.
           EXIT.`
  },

  {
    id: "DB2LOCK01",
    tech: "db2",
    name: "Controle de Concorrência",
    desc: "FOR UPDATE com isolamento RS/RR e detecção de deadlock (-911/-913).",
    level: "advanced",
    filename: "DB2LCK01.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2LCK01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONTROLE DE CONCORRENCIA DB2
      *            FOR UPDATE, ISOLAMENTO RS/RR, DEADLOCK
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2LCK01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-ACCT-ID          PIC X(10).
       01  WS-BALANCE          PIC S9(13)V99 COMP-3.
       01  WS-NEW-BALANCE      PIC S9(13)V99 COMP-3.
       01  WS-TRANSFER-AMT     PIC S9(13)V99 COMP-3
                                VALUE 500.00.
       01  WS-RETRY-COUNT      PIC S9(04) COMP VALUE 0.
       01  WS-MAX-RETRIES      PIC S9(04) COMP VALUE 3.
       01  WS-LOCK-OK          PIC X(01) VALUE 'N'.
       01  WS-FROM-ACCT        PIC X(10) VALUE '0000000001'.
       01  WS-TO-ACCT          PIC X(10) VALUE '0000000002'.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-TRANSFER-WITH-RETRY
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-TRANSFER-WITH-RETRY SECTION
      *==========================================================*
       1000-TRANSFER-WITH-RETRY SECTION.
           MOVE 0 TO WS-RETRY-COUNT
           MOVE 'N' TO WS-LOCK-OK
           PERFORM 1100-ATTEMPT-TRANSFER
               UNTIL WS-LOCK-OK = 'Y'
                  OR WS-RETRY-COUNT >= WS-MAX-RETRIES
           IF WS-LOCK-OK = 'N'
               DISPLAY 'TRANSFER FALHOU APOS '
                       WS-MAX-RETRIES ' TENTATIVAS'
           END-IF.

       1000-TRANSFER-WITH-RETRY-EXIT.
           EXIT.
      *==========================================================*
      * 1100-ATTEMPT-TRANSFER SECTION
      *==========================================================*
       1100-ATTEMPT-TRANSFER SECTION.
           ADD 1 TO WS-RETRY-COUNT
           PERFORM 2000-DEBIT-ACCOUNT
           IF WS-LOCK-OK = 'Y'
               PERFORM 3000-CREDIT-ACCOUNT
               IF WS-LOCK-OK = 'Y'
                   EXEC SQL COMMIT END-EXEC
                   DISPLAY 'TRANSFERENCIA OK'
               ELSE
                   EXEC SQL ROLLBACK END-EXEC
               END-IF
           ELSE
               EXEC SQL ROLLBACK END-EXEC
           END-IF.

       1100-ATTEMPT-TRANSFER-EXIT.
           EXIT.
      *==========================================================*
      * 2000-DEBIT-ACCOUNT SECTION
      *==========================================================*
       2000-DEBIT-ACCOUNT SECTION.
           EXEC SQL
               SELECT BALANCE INTO :WS-BALANCE
               FROM   TBACCOUNTS
               WHERE  ACCT_ID = :WS-FROM-ACCT
               WITH RS USE AND KEEP EXCLUSIVE LOCKS
           END-EXEC
           EVALUATE SQLCODE
               WHEN 0
                   IF WS-BALANCE >= WS-TRANSFER-AMT
                       COMPUTE WS-NEW-BALANCE =
                           WS-BALANCE - WS-TRANSFER-AMT
                       EXEC SQL UPDATE TBACCOUNTS
                           SET BALANCE = :WS-NEW-BALANCE
                           WHERE ACCT_ID = :WS-FROM-ACCT
                       END-EXEC
                       MOVE 'Y' TO WS-LOCK-OK
                   ELSE
                       DISPLAY 'SALDO INSUFICIENTE'
                       MOVE 'N' TO WS-LOCK-OK
                       MOVE WS-MAX-RETRIES
                           TO WS-RETRY-COUNT
                   END-IF
               WHEN -911
                   DISPLAY 'DEADLOCK DETECTADO - RETRY '
                           WS-RETRY-COUNT
                   MOVE 'N' TO WS-LOCK-OK
               WHEN -913
                   DISPLAY 'TIMEOUT DE LOCK - RETRY '
                           WS-RETRY-COUNT
                   MOVE 'N' TO WS-LOCK-OK
               WHEN OTHER
                   DISPLAY 'ERRO DEBIT: ' SQLCODE
                   MOVE 'N' TO WS-LOCK-OK
                   MOVE WS-MAX-RETRIES TO WS-RETRY-COUNT
           END-EVALUATE.

       2000-DEBIT-ACCOUNT-EXIT.
           EXIT.
      *==========================================================*
      * 3000-CREDIT-ACCOUNT SECTION
      *==========================================================*
       3000-CREDIT-ACCOUNT SECTION.
           EXEC SQL
               SELECT BALANCE INTO :WS-BALANCE
               FROM   TBACCOUNTS
               WHERE  ACCT_ID = :WS-TO-ACCT
               WITH RS USE AND KEEP EXCLUSIVE LOCKS
           END-EXEC
           EVALUATE SQLCODE
               WHEN 0
                   COMPUTE WS-NEW-BALANCE =
                       WS-BALANCE + WS-TRANSFER-AMT
                   EXEC SQL UPDATE TBACCOUNTS
                       SET BALANCE = :WS-NEW-BALANCE
                       WHERE ACCT_ID = :WS-TO-ACCT
                   END-EXEC
                   MOVE 'Y' TO WS-LOCK-OK
               WHEN -911
                   DISPLAY 'DEADLOCK CREDIT - RETRY'
                   MOVE 'N' TO WS-LOCK-OK
               WHEN -913
                   DISPLAY 'TIMEOUT CREDIT - RETRY'
                   MOVE 'N' TO WS-LOCK-OK
               WHEN OTHER
                   DISPLAY 'ERRO CREDIT: ' SQLCODE
                   MOVE 'N' TO WS-LOCK-OK
                   MOVE WS-MAX-RETRIES TO WS-RETRY-COUNT
           END-EVALUATE.
       3000-CREDIT-ACCOUNT-EXIT.
           EXIT.`
  },

  {
    id: "DB2SPRC01",
    tech: "db2",
    name: "Stored Procedure Call",
    desc: "CALL de stored procedure com parâmetros IN, OUT e INOUT.",
    level: "intermediate",
    filename: "DB2SPC01.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2SPC01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : STORED PROCEDURE CALL
      *            CALL COM PARAMETROS IN, OUT E INOUT
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2SPC01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-IN-ACCT-ID      PIC X(10) VALUE '0000000001'.
       01  WS-IN-OPER         PIC X(01) VALUE 'C'.
       01  WS-INOUT-AMOUNT    PIC S9(13)V99 COMP-3
                               VALUE 250.00.
       01  WS-OUT-NEW-BAL     PIC S9(13)V99 COMP-3.
       01  WS-OUT-RETURN-CD   PIC S9(04) COMP.
       01  WS-OUT-MSG         PIC X(80).
       01  WS-FMT-AMT         PIC Z(12)9.99.
       01  WS-FMT-BAL         PIC Z(12)9.99.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-CALL-CREDIT-PROC
           PERFORM 2000-CALL-DEBIT-PROC
           PERFORM 3000-CALL-BALANCE-PROC
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-CALL-CREDIT-PROC SECTION
      *==========================================================*
       1000-CALL-CREDIT-PROC SECTION.
           MOVE 'C' TO WS-IN-OPER
           MOVE 250.00 TO WS-INOUT-AMOUNT
           EXEC SQL
               CALL SYSPROC.ACCT_OPERATION
                   (:WS-IN-ACCT-ID,
                    :WS-IN-OPER,
                    :WS-INOUT-AMOUNT,
                    :WS-OUT-NEW-BAL,
                    :WS-OUT-RETURN-CD,
                    :WS-OUT-MSG)
           END-EXEC
           IF SQLCODE = 0
               MOVE WS-OUT-NEW-BAL TO WS-FMT-BAL
               DISPLAY 'CREDITO OK - NOVO SALDO: '
                       WS-FMT-BAL
               DISPLAY 'RETURN CODE: '
                       WS-OUT-RETURN-CD
               DISPLAY 'MENSAGEM: ' WS-OUT-MSG
           ELSE
               DISPLAY 'ERRO CALL CREDIT: ' SQLCODE
           END-IF.

       1000-CALL-CREDIT-PROC-EXIT.
           EXIT.
      *==========================================================*
      * 2000-CALL-DEBIT-PROC SECTION
      *==========================================================*
       2000-CALL-DEBIT-PROC SECTION.
           MOVE 'D' TO WS-IN-OPER
           MOVE 100.00 TO WS-INOUT-AMOUNT
           EXEC SQL
               CALL SYSPROC.ACCT_OPERATION
                   (:WS-IN-ACCT-ID,
                    :WS-IN-OPER,
                    :WS-INOUT-AMOUNT,
                    :WS-OUT-NEW-BAL,
                    :WS-OUT-RETURN-CD,
                    :WS-OUT-MSG)
           END-EXEC
           IF SQLCODE = 0
               MOVE WS-OUT-NEW-BAL TO WS-FMT-BAL
               DISPLAY 'DEBITO OK - NOVO SALDO: '
                       WS-FMT-BAL
           ELSE
               DISPLAY 'ERRO CALL DEBIT: ' SQLCODE
           END-IF.

       2000-CALL-DEBIT-PROC-EXIT.
           EXIT.
      *==========================================================*
      * 3000-CALL-BALANCE-PROC SECTION
      *==========================================================*
       3000-CALL-BALANCE-PROC SECTION.
           MOVE 'Q' TO WS-IN-OPER
           MOVE 0 TO WS-INOUT-AMOUNT
           EXEC SQL
               CALL SYSPROC.ACCT_OPERATION
                   (:WS-IN-ACCT-ID,
                    :WS-IN-OPER,
                    :WS-INOUT-AMOUNT,
                    :WS-OUT-NEW-BAL,
                    :WS-OUT-RETURN-CD,
                    :WS-OUT-MSG)
           END-EXEC
           IF SQLCODE = 0
               MOVE WS-OUT-NEW-BAL TO WS-FMT-BAL
               MOVE WS-INOUT-AMOUNT TO WS-FMT-AMT
               DISPLAY 'CONSULTA SALDO: ' WS-FMT-BAL
               DISPLAY 'ULTIMA MOVIMENTACAO: '
                       WS-FMT-AMT
           ELSE
               DISPLAY 'ERRO CALL QUERY: ' SQLCODE
           END-IF.
       3000-CALL-BALANCE-PROC-EXIT.
           EXIT.`
  },

  {
    id: "DB2ROLL01",
    tech: "db2",
    name: "Savepoint & Rollback",
    desc: "SAVEPOINT, ROLLBACK TO SAVEPOINT e RELEASE para controle transacional granular.",
    level: "intermediate",
    filename: "DB2RLL01.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2RLL01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : SAVEPOINT E ROLLBACK
      *            CONTROLE TRANSACIONAL GRANULAR COM SAVEPOINTS
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2RLL01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-ORDER-ID         PIC S9(08) COMP VALUE 5001.
       01  WS-ACCT-ID          PIC X(10) VALUE '0000000001'.
       01  WS-BALANCE          PIC S9(13)V99 COMP-3.
       01  WS-ORDER-TOTAL      PIC S9(11)V99 COMP-3
                                VALUE 750.00.
       01  WS-SHIP-OK          PIC X(01) VALUE 'Y'.
       01  WS-FMT-BAL          PIC Z(12)9.99.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-BEGIN-TRANSACTION
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-BEGIN-TRANSACTION SECTION
      *==========================================================*
       1000-BEGIN-TRANSACTION SECTION.
           EXEC SQL SAVEPOINT SP_ORDER ON ROLLBACK
               RETAIN CURSORS
           END-EXEC

           PERFORM 2000-CREATE-ORDER
           IF SQLCODE NOT = 0
               PERFORM 8000-ROLLBACK-ORDER
               GOBACK
           END-IF

           EXEC SQL SAVEPOINT SP_PAYMENT ON ROLLBACK
               RETAIN CURSORS
           END-EXEC

           PERFORM 3000-PROCESS-PAYMENT
           IF SQLCODE NOT = 0
               PERFORM 8100-ROLLBACK-PAYMENT
               PERFORM 8000-ROLLBACK-ORDER
               GOBACK
           END-IF

           EXEC SQL SAVEPOINT SP_SHIPPING ON ROLLBACK
               RETAIN CURSORS
           END-EXEC

           PERFORM 4000-SCHEDULE-SHIPPING
           IF WS-SHIP-OK = 'N'
               PERFORM 8200-ROLLBACK-SHIPPING
               DISPLAY 'ENVIO CANCELADO, PEDIDO MANTIDO'
           END-IF

           EXEC SQL RELEASE SAVEPOINT SP_ORDER END-EXEC
           EXEC SQL COMMIT END-EXEC
           DISPLAY 'TRANSACAO COMPLETA COM SUCESSO'.

       1000-BEGIN-TRANSACTION-EXIT.
           EXIT.
      *==========================================================*
      * 2000-CREATE-ORDER SECTION
      *==========================================================*
       2000-CREATE-ORDER SECTION.
           EXEC SQL INSERT INTO TBORDERS
               (ORDER_ID, CLIENT_ACCT, TOTAL_AMT,
                STATUS, ORDER_DATE)
               VALUES
               (:WS-ORDER-ID, :WS-ACCT-ID,
                :WS-ORDER-TOTAL, 'N',
                CURRENT TIMESTAMP)
           END-EXEC
           IF SQLCODE = 0
               DISPLAY 'PEDIDO CRIADO: ' WS-ORDER-ID
           END-IF.

       2000-CREATE-ORDER-EXIT.
           EXIT.
      *==========================================================*
      * 3000-PROCESS-PAYMENT SECTION
      *==========================================================*
       3000-PROCESS-PAYMENT SECTION.
           EXEC SQL
               SELECT BALANCE INTO :WS-BALANCE
               FROM   TBACCOUNTS
               WHERE  ACCT_ID = :WS-ACCT-ID
           END-EXEC
           IF SQLCODE = 0 AND WS-BALANCE >= WS-ORDER-TOTAL
               COMPUTE WS-BALANCE =
                   WS-BALANCE - WS-ORDER-TOTAL
               EXEC SQL UPDATE TBACCOUNTS
                   SET BALANCE = :WS-BALANCE
                   WHERE ACCT_ID = :WS-ACCT-ID
               END-EXEC
               MOVE WS-BALANCE TO WS-FMT-BAL
               DISPLAY 'PAGAMENTO OK - SALDO: '
                       WS-FMT-BAL
           ELSE
               DISPLAY 'SALDO INSUFICIENTE'
               MOVE -1 TO SQLCODE
           END-IF.

       3000-PROCESS-PAYMENT-EXIT.
           EXIT.
      *==========================================================*
      * 4000-SCHEDULE-SHIPPING SECTION
      *==========================================================*
       4000-SCHEDULE-SHIPPING SECTION.
           EXEC SQL UPDATE TBORDERS
               SET STATUS = 'S'
               WHERE ORDER_ID = :WS-ORDER-ID
           END-EXEC
           IF SQLCODE NOT = 0
               MOVE 'N' TO WS-SHIP-OK
           ELSE
               DISPLAY 'ENVIO AGENDADO'
           END-IF.

       4000-SCHEDULE-SHIPPING-EXIT.
           EXIT.
      *==========================================================*
      * 8000-ROLLBACK-ORDER SECTION
      *==========================================================*
       8000-ROLLBACK-ORDER SECTION.
           EXEC SQL ROLLBACK TO SAVEPOINT SP_ORDER
           END-EXEC
           DISPLAY 'ROLLBACK: PEDIDO CANCELADO'.

       8000-ROLLBACK-ORDER-EXIT.
           EXIT.
      *==========================================================*
      * 8100-ROLLBACK-PAYMENT SECTION
      *==========================================================*
       8100-ROLLBACK-PAYMENT SECTION.
           EXEC SQL ROLLBACK TO SAVEPOINT SP_PAYMENT
           END-EXEC
           DISPLAY 'ROLLBACK: PAGAMENTO DESFEITO'.

       8100-ROLLBACK-PAYMENT-EXIT.
           EXIT.
      *==========================================================*
      * 8200-ROLLBACK-SHIPPING SECTION
      *==========================================================*
       8200-ROLLBACK-SHIPPING SECTION.
           EXEC SQL ROLLBACK TO SAVEPOINT SP_SHIPPING
           END-EXEC
           DISPLAY 'ROLLBACK: ENVIO CANCELADO'.
       8200-ROLLBACK-SHIPPING-EXIT.
           EXIT.`
  },

  {
    id: "DB2XREF01",
    tech: "db2",
    name: "Consultas Cruzadas",
    desc: "Subselect, EXISTS, UNION ALL, CASE WHEN, GROUP BY e HAVING em consultas analíticas.",
    level: "advanced",
    filename: "DB2XRF01.cbl",
    tags: ["DB2", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : DB2XRF01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONSULTAS CRUZADAS AVANCADAS
      *            SUBSELECT, EXISTS, UNION ALL, CASE WHEN,
      *            GROUP BY, HAVING
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DB2XRF01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

           EXEC SQL INCLUDE SQLCA END-EXEC.

       01  WS-RPT-REGION       PIC X(02).
       01  WS-RPT-CATEGORY     PIC X(15).
       01  WS-RPT-ACCT-QTY     PIC S9(08) COMP.
       01  WS-RPT-TOTAL-BAL    PIC S9(15)V99 COMP-3.
       01  WS-RPT-AVG-BAL      PIC S9(13)V99 COMP-3.
       01  WS-ORPHAN-ID        PIC X(10).
       01  WS-UNI-REGION       PIC X(02).
       01  WS-UNI-SOURCE       PIC X(10).
       01  WS-UNI-COUNT        PIC S9(08) COMP.
       01  WS-FMT-BAL          PIC Z(12)9.99.
       01  WS-FMT-AVG          PIC Z(12)9.99.

           EXEC SQL DECLARE CSR-SUMMARY CURSOR FOR
               SELECT A.REGION,
                      CASE
                          WHEN A.BALANCE >= 100000
                              THEN 'PREMIUM'
                          WHEN A.BALANCE >= 10000
                              THEN 'STANDARD'
                          ELSE 'BASIC'
                      END AS CATEGORY,
                      COUNT(*) AS QTY,
                      SUM(A.BALANCE) AS TOTAL_BAL,
                      AVG(A.BALANCE) AS AVG_BAL
               FROM   TBACCOUNTS A
               WHERE  A.STATUS = 'A'
               GROUP BY A.REGION,
                      CASE
                          WHEN A.BALANCE >= 100000
                              THEN 'PREMIUM'
                          WHEN A.BALANCE >= 10000
                              THEN 'STANDARD'
                          ELSE 'BASIC'
                      END
               HAVING COUNT(*) > 5
               ORDER BY A.REGION, TOTAL_BAL DESC
           END-EXEC.

           EXEC SQL DECLARE CSR-ORPHANS CURSOR FOR
               SELECT A.ACCT_ID
               FROM   TBACCOUNTS A
               WHERE  NOT EXISTS
                   (SELECT 1
                    FROM   TBCLIENTS C
                    WHERE  C.CLIENT_ID = A.CLIENT_ID)
           END-EXEC.

           EXEC SQL DECLARE CSR-UNION CURSOR FOR
               SELECT REGION, 'ATIVA' AS SOURCE,
                      COUNT(*) AS QTY
               FROM   TBACCOUNTS
               WHERE  STATUS = 'A'
               GROUP BY REGION
               UNION ALL
               SELECT REGION, 'INATIVA' AS SOURCE,
                      COUNT(*) AS QTY
               FROM   TBACCOUNTS
               WHERE  STATUS = 'I'
               GROUP BY REGION
               ORDER BY 1, 2
           END-EXEC.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           DISPLAY '=== RELATORIO ANALITICO DB2 ==='
           PERFORM 1000-SUMMARY-REPORT
           PERFORM 2000-ORPHAN-CHECK
           PERFORM 3000-UNION-REPORT
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-SUMMARY-REPORT SECTION
      *==========================================================*
       1000-SUMMARY-REPORT SECTION.
           DISPLAY '--- RESUMO POR REGIAO/CATEGORIA ---'
           EXEC SQL OPEN CSR-SUMMARY END-EXEC
           PERFORM 1100-FETCH-SUMMARY
               UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-SUMMARY END-EXEC.

       1000-SUMMARY-REPORT-EXIT.
           EXIT.
      *==========================================================*
      * 1100-FETCH-SUMMARY SECTION
      *==========================================================*
       1100-FETCH-SUMMARY SECTION.
           EXEC SQL FETCH CSR-SUMMARY
               INTO :WS-RPT-REGION,
                    :WS-RPT-CATEGORY,
                    :WS-RPT-ACCT-QTY,
                    :WS-RPT-TOTAL-BAL,
                    :WS-RPT-AVG-BAL
           END-EXEC
           IF SQLCODE = 0
               MOVE WS-RPT-TOTAL-BAL TO WS-FMT-BAL
               MOVE WS-RPT-AVG-BAL TO WS-FMT-AVG
               DISPLAY WS-RPT-REGION ' '
                       WS-RPT-CATEGORY ' '
                       'QTD=' WS-RPT-ACCT-QTY ' '
                       'TOT=' WS-FMT-BAL ' '
                       'MED=' WS-FMT-AVG
           END-IF.

       1100-FETCH-SUMMARY-EXIT.
           EXIT.
      *==========================================================*
      * 2000-ORPHAN-CHECK SECTION
      *==========================================================*
       2000-ORPHAN-CHECK SECTION.
           DISPLAY '--- CONTAS SEM CLIENTE (EXISTS) ---'
           EXEC SQL OPEN CSR-ORPHANS END-EXEC
           PERFORM 2100-FETCH-ORPHAN
               UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-ORPHANS END-EXEC.

       2000-ORPHAN-CHECK-EXIT.
           EXIT.
      *==========================================================*
      * 2100-FETCH-ORPHAN SECTION
      *==========================================================*
       2100-FETCH-ORPHAN SECTION.
           EXEC SQL FETCH CSR-ORPHANS
               INTO :WS-ORPHAN-ID
           END-EXEC
           IF SQLCODE = 0
               DISPLAY '  ORFA: ' WS-ORPHAN-ID
           END-IF.

       2100-FETCH-ORPHAN-EXIT.
           EXIT.
      *==========================================================*
      * 3000-UNION-REPORT SECTION
      *==========================================================*
       3000-UNION-REPORT SECTION.
           DISPLAY '--- ATIVAS vs INATIVAS (UNION) ---'
           EXEC SQL OPEN CSR-UNION END-EXEC
           PERFORM 3100-FETCH-UNION
               UNTIL SQLCODE NOT = 0
           EXEC SQL CLOSE CSR-UNION END-EXEC.

       3000-UNION-REPORT-EXIT.
           EXIT.
      *==========================================================*
      * 3100-FETCH-UNION SECTION
      *==========================================================*
       3100-FETCH-UNION SECTION.
           EXEC SQL FETCH CSR-UNION
               INTO :WS-UNI-REGION,
                    :WS-UNI-SOURCE,
                    :WS-UNI-COUNT
           END-EXEC
           IF SQLCODE = 0
               DISPLAY '  ' WS-UNI-REGION ' '
                       WS-UNI-SOURCE ' '
                       'QTD=' WS-UNI-COUNT
           END-IF.
       3100-FETCH-UNION-EXIT.
           EXIT.`
  },


  {
    id: "ASMDSEL1",
    tech: "db2",
    name: "SELECT INTO (ASM)",
    desc: "SELECT INTO em Assembler com EXEC SQL, verificação de SQLCODE e WTO de resultado.",
    level: "basic",
    filename: "ASMDSEL1.hlasm",
    tags: ["HLASM","DB2"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMDSEL1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : SELECT INTO EM ASSEMBLER COM DB2
*            BUSCA REGISTRO POR CHAVE E EXIBE VIA WTO
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMDSEL1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         MVC   HCHAVE,=CL10'EMP0001   '
*
         EXEC SQL SELECT NOME, DEPTO, SALARIO                 X
               INTO :HNOME, :HDEPTO, :HSAL                    X
               FROM EMPREGADOS                                 X
               WHERE CHAVE = :HCHAVE
*
         CLC   SQLCODE,=F'0'
         BNE   SQLERR
*
         MVC   WMSG(6),=C'NOME= '
         MVC   WMSG+6(30),HNOME
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         B     EXIT
*
SQLERR   MVC   WMSG(16),=C'SQLCODE ERRO:   '
         L     R3,SQLCODE
         CVD   R3,DWORK
         UNPK  WMSG+14(6),DWORK+5(3)
         OI    WMSG+19,X'F0'
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
HCHAVE   DS    CL10
HNOME    DS    CL30
HDEPTO   DS    CL6
HSAL     DS    PL8
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         EXEC SQL INCLUDE SQLCA
         YREGS
         END   ASMDSEL1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMDSEL1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : SELECT INTO EM ASSEMBLER COM DB2
*            BUSCA REGISTRO POR CHAVE E EXIBE VIA WTO
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMDSEL1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMDSEL1         SET BASE (RELATIVE)
         USING ASMDSEL1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         MVC   HCHAVE,=CL10'EMP0001   '
*
         EXEC SQL SELECT NOME, DEPTO, SALARIO                 X
               INTO :HNOME, :HDEPTO, :HSAL                    X
               FROM EMPREGADOS                                 X
               WHERE CHAVE = :HCHAVE
*
         CLC   SQLCODE,=F'0'
         JNE   SQLERR
*
         MVC   WMSG(6),=C'NOME= '
         MVC   WMSG+6(30),HNOME
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         J     EXIT
*
SQLERR   MVC   WMSG(16),=C'SQLCODE ERRO:   '
         L     R3,SQLCODE
         CVD   R3,DWORK
         UNPK  WMSG+14(6),DWORK+5(3)
         OI    WMSG+19,X'F0'
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
HCHAVE   DS    CL10
HNOME    DS    CL30
HDEPTO   DS    CL6
HSAL     DS    PL8
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         EXEC SQL INCLUDE SQLCA
         YREGS
         END   ASMDSEL1`
  },

  {
    id: "ASMDCUR1",
    tech: "db2",
    name: "Cursor Processing (ASM)",
    desc: "DECLARE CURSOR, OPEN, FETCH em loop e CLOSE em Assembler com contagem e COMMIT periódico.",
    level: "intermediate",
    filename: "ASMDCUR1.hlasm",
    tags: ["HLASM","DB2","CURSOR"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMDCUR1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : PROCESSAMENTO DE CURSOR DB2 EM ASSEMBLER
*            DECLARE, OPEN, FETCH LOOP, CLOSE COM COMMIT
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMDCUR1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         EXEC SQL DECLARE CSR1 CURSOR FOR                      X
               SELECT CHAVE, NOME, DEPTO                       X
               FROM EMPREGADOS                                 X
               WHERE DEPTO = :HDEPTO                           X
               ORDER BY CHAVE
*
         MVC   HDEPTO,=CL6'FIN   '
         SR    R5,R5
*
         EXEC SQL OPEN CSR1
         CLC   SQLCODE,=F'0'
         BNE   OPENERR
*
FLOOP    EXEC SQL FETCH CSR1                                   X
               INTO :HCHAVE, :HNOME, :HDEPTO
*
         CLC   SQLCODE,=F'0'
         BNE   ENDFTCH
*
         LA    R5,1(R5)
*
         LR    R6,R5
         N     R6,=F'127'
         BNZ   FLOOP
         EXEC SQL COMMIT
         B     FLOOP
*
ENDFTCH  CLC   SQLCODE,=F'100'
         BNE   FTCHERR
*
         EXEC SQL CLOSE CSR1
*
         CVD   R5,DWORK
         UNPK  WMSG+12(6),DWORK+5(3)
         OI    WMSG+17,X'F0'
         MVC   WMSG(12),=C'PROCESSADOS='
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         B     EXIT
*
OPENERR  LA    R15,8
         B     EXIT
FTCHERR  LA    R15,12
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
HCHAVE   DS    CL10
HNOME    DS    CL30
HDEPTO   DS    CL6
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         EXEC SQL INCLUDE SQLCA
         YREGS
         END   ASMDCUR1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMDCUR1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : PROCESSAMENTO DE CURSOR DB2 EM ASSEMBLER
*            DECLARE, OPEN, FETCH LOOP, CLOSE COM COMMIT
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMDCUR1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMDCUR1         SET BASE (RELATIVE)
         USING ASMDCUR1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         EXEC SQL DECLARE CSR1 CURSOR FOR                      X
               SELECT CHAVE, NOME, DEPTO                       X
               FROM EMPREGADOS                                 X
               WHERE DEPTO = :HDEPTO                           X
               ORDER BY CHAVE
*
         MVC   HDEPTO,=CL6'FIN   '
         SR    R5,R5
*
         EXEC SQL OPEN CSR1
         CLC   SQLCODE,=F'0'
         JNE   OPENERR
*
FLOOP    EXEC SQL FETCH CSR1                                   X
               INTO :HCHAVE, :HNOME, :HDEPTO
*
         CLC   SQLCODE,=F'0'
         JNE   ENDFTCH
*
         LA    R5,1(R5)
*
         LR    R6,R5
         N     R6,=F'127'
         JNZ   FLOOP
         EXEC SQL COMMIT
         J     FLOOP
*
ENDFTCH  CLC   SQLCODE,=F'100'
         JNE   FTCHERR
*
         EXEC SQL CLOSE CSR1
*
         CVD   R5,DWORK
         UNPK  WMSG+12(6),DWORK+5(3)
         OI    WMSG+17,X'F0'
         MVC   WMSG(12),=C'PROCESSADOS='
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         J     EXIT
*
OPENERR  LA    R15,8
         J     EXIT
FTCHERR  LA    R15,12
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
HCHAVE   DS    CL10
HNOME    DS    CL30
HDEPTO   DS    CL6
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         EXEC SQL INCLUDE SQLCA
         YREGS
         END   ASMDCUR1`
  },

  {
    id: "ASMDDYN1",
    tech: "db2",
    name: "SQL Dinâmico (ASM)",
    desc: "PREPARE, EXECUTE e EXECUTE IMMEDIATE em HLASM para SQL dinâmico com parameter markers.",
    level: "advanced",
    filename: "ASMDDYN1.hlasm",
    tags: ["HLASM","DB2","DYNAMIC SQL"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMDDYN1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : SQL DINAMICO EM ASSEMBLER
*            PREPARE + EXECUTE COM PARAMETER MARKERS
*            EXECUTE IMMEDIATE PARA DDL
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMDDYN1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         MVC   WSQL,BLANKS
         MVC   WSQL(L'CRETMP),CRETMP
*
         EXEC SQL EXECUTE IMMEDIATE :WSQL
         CLC   SQLCODE,=F'0'
         BNE   SQLERR
*
         MVC   WSQL,BLANKS
         MVC   WSQL(L'INSSQL),INSSQL
*
         EXEC SQL PREPARE STMT1 FROM :WSQL
         CLC   SQLCODE,=F'0'
         BNE   SQLERR
*
         MVC   HCHAVE,=CL10'K001      '
         MVC   HDESC,=CL30'PRIMEIRO REGISTRO DINAMICO    '
         EXEC SQL EXECUTE STMT1 USING :HCHAVE, :HDESC
*
         MVC   HCHAVE,=CL10'K002      '
         MVC   HDESC,=CL30'SEGUNDO REGISTRO DINAMICO     '
         EXEC SQL EXECUTE STMT1 USING :HCHAVE, :HDESC
*
         MVC   HCHAVE,=CL10'K003      '
         MVC   HDESC,=CL30'TERCEIRO REGISTRO DINAMICO    '
         EXEC SQL EXECUTE STMT1 USING :HCHAVE, :HDESC
*
         CLC   SQLCODE,=F'0'
         BNE   SQLERR
*
         MVC   WSQL,BLANKS
         MVC   WSQL(L'SELSQL),SELSQL
*
         EXEC SQL PREPARE STMT2 FROM :WSQL
         EXEC SQL DECLARE DCSR CURSOR FOR STMT2
         EXEC SQL OPEN DCSR
*
DLOOP    EXEC SQL FETCH DCSR INTO :HCHAVE, :HDESC
         CLC   SQLCODE,=F'0'
         BNE   DENDLP
         MVC   WMSG(10),HCHAVE
         MVC   WMSG+11(30),HDESC
         WTO   MF=(E,WTOMSG)
         B     DLOOP
*
DENDLP   EXEC SQL CLOSE DCSR
         EXEC SQL COMMIT
*
         SR    R15,R15
         B     EXIT
*
SQLERR   L     R3,SQLCODE
         CVD   R3,DWORK
         UNPK  WMSG(8),DWORK+4(4)
         OI    WMSG+7,X'F0'
         MVC   WMSG+9(10),=C'SQLCODE ER'
         WTO   MF=(E,WTOMSG)
         EXEC SQL ROLLBACK
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
CRETMP   DC    C'DECLARE GLOBAL TEMPORARY TABLE SESSION.TMPDYN X
               (CHAVE CHAR(10), DESCR CHAR(30))'
INSSQL   DC    C'INSERT INTO SESSION.TMPDYN VALUES (?, ?)'
SELSQL   DC    C'SELECT CHAVE, DESCR FROM SESSION.TMPDYN ORDERX
                BY CHAVE'
SAVE     DS    18F
DWORK    DS    D
HCHAVE   DS    CL10
HDESC    DS    CL30
WSQL     DS    CL256
WMSG     DS    CL60
BLANKS   DC    CL256' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         EXEC SQL INCLUDE SQLCA
         YREGS
         END   ASMDDYN1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMDDYN1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : SQL DINAMICO EM ASSEMBLER
*            PREPARE + EXECUTE COM PARAMETER MARKERS
*            EXECUTE IMMEDIATE PARA DDL
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMDDYN1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMDDYN1         SET BASE (RELATIVE)
         USING ASMDDYN1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         MVC   WSQL,BLANKS
         MVC   WSQL(L'CRETMP),CRETMP
*
         EXEC SQL EXECUTE IMMEDIATE :WSQL
         CLC   SQLCODE,=F'0'
         JNE   SQLERR
*
         MVC   WSQL,BLANKS
         MVC   WSQL(L'INSSQL),INSSQL
*
         EXEC SQL PREPARE STMT1 FROM :WSQL
         CLC   SQLCODE,=F'0'
         JNE   SQLERR
*
         MVC   HCHAVE,=CL10'K001      '
         MVC   HDESC,=CL30'PRIMEIRO REGISTRO DINAMICO    '
         EXEC SQL EXECUTE STMT1 USING :HCHAVE, :HDESC
*
         MVC   HCHAVE,=CL10'K002      '
         MVC   HDESC,=CL30'SEGUNDO REGISTRO DINAMICO     '
         EXEC SQL EXECUTE STMT1 USING :HCHAVE, :HDESC
*
         MVC   HCHAVE,=CL10'K003      '
         MVC   HDESC,=CL30'TERCEIRO REGISTRO DINAMICO    '
         EXEC SQL EXECUTE STMT1 USING :HCHAVE, :HDESC
*
         CLC   SQLCODE,=F'0'
         JNE   SQLERR
*
         MVC   WSQL,BLANKS
         MVC   WSQL(L'SELSQL),SELSQL
*
         EXEC SQL PREPARE STMT2 FROM :WSQL
         EXEC SQL DECLARE DCSR CURSOR FOR STMT2
         EXEC SQL OPEN DCSR
*
DLOOP    EXEC SQL FETCH DCSR INTO :HCHAVE, :HDESC
         CLC   SQLCODE,=F'0'
         JNE   DENDLP
         MVC   WMSG(10),HCHAVE
         MVC   WMSG+11(30),HDESC
         WTO   MF=(E,WTOMSG)
         J     DLOOP
*
DENDLP   EXEC SQL CLOSE DCSR
         EXEC SQL COMMIT
*
         SR    R15,R15
         J     EXIT
*
SQLERR   L     R3,SQLCODE
         CVD   R3,DWORK
         UNPK  WMSG(8),DWORK+4(4)
         OI    WMSG+7,X'F0'
         MVC   WMSG+9(10),=C'SQLCODE ER'
         WTO   MF=(E,WTOMSG)
         EXEC SQL ROLLBACK
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
CRETMP   DC    C'DECLARE GLOBAL TEMPORARY TABLE SESSION.TMPDYN X
               (CHAVE CHAR(10), DESCR CHAR(30))'
INSSQL   DC    C'INSERT INTO SESSION.TMPDYN VALUES (?, ?)'
SELSQL   DC    C'SELECT CHAVE, DESCR FROM SESSION.TMPDYN ORDERX
                BY CHAVE'
SAVE     DS    18F
DWORK    DS    D
HCHAVE   DS    CL10
HDESC    DS    CL30
WSQL     DS    CL256
WMSG     DS    CL60
BLANKS   DC    CL256' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         EXEC SQL INCLUDE SQLCA
         YREGS
         END   ASMDDYN1`
  },
  // ========================================================================
  // IMS (14 programas — 11 COBOL + 3 HLASM)
  // ========================================================================

  {
    id: "IMSCHK01",
    tech: "ims",
    name: "Checkpoint/Restart",
    desc: "Gerencia CHKP/XRST para BMP batch com frequência e rastreamento de posição configuráveis.",
    level: "advanced",
    filename: "IMSCHK01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSCHK01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CHECKPOINT/RESTART PARA BMP BATCH
      *            GERENCIA CHKP E XRST COM FREQUENCIA
      *            CONFIGURAVEL E RASTREAMENTO DE POSICAO
      * DL/I     : CHKP, XRST
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSCHK01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-CHKP       PIC X(04) VALUE 'CHKP'.
           05 WS-FUNC-XRST       PIC X(04) VALUE 'XRST'.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
       01  WS-CHECKPOINT-AREA.
           05 WS-CHKP-ID         PIC X(08) VALUE SPACES.
           05 WS-CHKP-COUNTER    PIC 9(08) COMP VALUE 0.
           05 WS-CHKP-FREQUENCY  PIC 9(05) COMP VALUE 500.
           05 WS-RECORDS-SINCE   PIC 9(08) COMP VALUE 0.
       01  WS-RESTART-AREA.
           05 WS-RESTART-TOKEN   PIC X(08) VALUE SPACES.
           05 WS-RESTART-FLAG    PIC X(01) VALUE 'N'.
              88 WS-IS-RESTART   VALUE 'Y'.
              88 WS-NOT-RESTART  VALUE 'N'.
       01  WS-IO-AREA            PIC X(500).
       01  WS-STATUS-CODE        PIC XX.
       01  WS-RECORD-COUNT       PIC 9(08) COMP VALUE 0.
       01  WS-TOTAL-PROCESSED    PIC 9(08) COMP VALUE 0.

       LINKAGE SECTION.
       01  LS-PCB-MASK.
           05 LS-PCB-DBD-NAME    PIC X(08).
           05 LS-PCB-SEG-LEVEL   PIC XX.
           05 LS-PCB-STATUS      PIC XX.
           05 LS-PCB-PROC-OPT    PIC X(04).
           05 LS-PCB-RESERVED    PIC S9(05) COMP.
           05 LS-PCB-SEG-NAME    PIC X(08).
           05 LS-PCB-KEY-LENGTH  PIC S9(05) COMP.
           05 LS-PCB-SENSEG-CNT  PIC S9(05) COMP.
           05 LS-PCB-KEY-AREA    PIC X(50).
       01  LS-IO-PCB.
           05 LS-IO-LTERM        PIC X(08).
           05 LS-IO-RESERVED     PIC X(02).
           05 LS-IO-STATUS       PIC XX.

       PROCEDURE DIVISION USING LS-IO-PCB LS-PCB-MASK.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-ATTEMPT-RESTART
           PERFORM 2000-PROCESS-LOOP
              UNTIL LS-PCB-STATUS = 'GB'
                 OR LS-PCB-STATUS = 'QC'
           PERFORM 3000-FINAL-CHECKPOINT
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-ATTEMPT-RESTART SECTION
      *==========================================================*
       1000-ATTEMPT-RESTART SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-XRST
                                LS-IO-PCB
                                WS-IO-AREA
                                WS-RESTART-AREA
           IF LS-IO-STATUS = SPACES
              SET WS-IS-RESTART TO TRUE
              MOVE WS-RESTART-TOKEN TO WS-CHKP-ID
           ELSE
              SET WS-NOT-RESTART TO TRUE
              MOVE 'CHKP0001' TO WS-CHKP-ID
           END-IF
           .
       1000-ATTEMPT-RESTART-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PROCESS-LOOP SECTION
      *==========================================================*
       2000-PROCESS-LOOP SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GN
                                LS-PCB-MASK
                                WS-IO-AREA
           EVALUATE LS-PCB-STATUS
              WHEN SPACES
                 ADD 1 TO WS-RECORD-COUNT
                 ADD 1 TO WS-RECORDS-SINCE
                 ADD 1 TO WS-TOTAL-PROCESSED
                 IF WS-RECORDS-SINCE >= WS-CHKP-FREQUENCY
                    PERFORM 2500-TAKE-CHECKPOINT
                 END-IF
              WHEN 'GB'
                 CONTINUE
              WHEN 'QC'
                 CONTINUE
              WHEN OTHER
                 DISPLAY 'IMSCHK01: DL/I ERROR ' LS-PCB-STATUS
           END-EVALUATE
           .
       2000-PROCESS-LOOP-EXIT.
           EXIT.
      *==========================================================*
      * 2500-TAKE-CHECKPOINT SECTION
      *==========================================================*
       2500-TAKE-CHECKPOINT SECTION.
           ADD 1 TO WS-CHKP-COUNTER
           MOVE WS-CHKP-ID TO WS-RESTART-TOKEN
           CALL 'CBLTDLI' USING WS-FUNC-CHKP
                                LS-IO-PCB
                                WS-IO-AREA
                                WS-RESTART-AREA
           IF LS-IO-STATUS = SPACES
              MOVE 0 TO WS-RECORDS-SINCE
              DISPLAY 'IMSCHK01: CHECKPOINT '
                      WS-CHKP-COUNTER ' TAKEN'
           ELSE
              DISPLAY 'IMSCHK01: CHKP FAILED ' LS-IO-STATUS
           END-IF
           .
       2500-TAKE-CHECKPOINT-EXIT.
           EXIT.
      *==========================================================*
      * 3000-FINAL-CHECKPOINT SECTION
      *==========================================================*
       3000-FINAL-CHECKPOINT SECTION.
           PERFORM 2500-TAKE-CHECKPOINT
           DISPLAY 'IMSCHK01: TOTAL PROCESSED='
                   WS-TOTAL-PROCESSED
                   ' CHECKPOINTS=' WS-CHKP-COUNTER
           .
       3000-FINAL-CHECKPOINT-EXIT.
           EXIT.`
  },

  {
    id: "IMSHNAV01",
    tech: "ims",
    name: "Hierarchy Navigator",
    desc: "Navega hierarquia IMS com GU, GN e GNP demonstrando caminhos pai-filho entre segmentos.",
    level: "intermediate",
    filename: "IMSNAV01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSNAV01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : NAVEGACAO HIERARQUICA IMS
      *            DEMONSTRA GU, GN, GNP COM CAMINHOS
      *            PAI-FILHO ENTRE SEGMENTOS
      * DL/I     : GU, GN, GNP
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSNAV01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
           05 WS-FUNC-GNP        PIC X(04) VALUE 'GNP '.
       01  WS-SSA-PARENT.
           05 FILLER             PIC X(08) VALUE 'CUSTOMER'.
           05 FILLER             PIC X(01) VALUE '('.
           05 FILLER             PIC X(08) VALUE 'CUSTID  '.
           05 FILLER             PIC X(02) VALUE ' ='.
           05 WS-SSA-CUSTID      PIC X(10) VALUE SPACES.
           05 FILLER             PIC X(01) VALUE ')'.
       01  WS-SSA-UNQUAL-ORDER.
           05 FILLER             PIC X(08) VALUE 'ORDER   '.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-SSA-UNQUAL-ITEM.
           05 FILLER             PIC X(08) VALUE 'ITEM    '.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-IO-AREA            PIC X(500).
       01  WS-PARENT-KEY         PIC X(10).
       01  WS-NAV-MODE           PIC X(01).
           88 WS-MODE-ROOT       VALUE 'R'.
           88 WS-MODE-CHILD      VALUE 'C'.
           88 WS-MODE-DEPENDENT  VALUE 'D'.
       01  WS-SEG-COUNT          PIC 9(05) COMP VALUE 0.
       01  WS-LEVEL-INDICATOR    PIC 9(02) COMP VALUE 0.

       LINKAGE SECTION.
       01  LS-PCB-MASK.
           05 LS-PCB-DBD-NAME    PIC X(08).
           05 LS-PCB-SEG-LEVEL   PIC XX.
           05 LS-PCB-STATUS      PIC XX.
           05 LS-PCB-PROC-OPT    PIC X(04).
           05 LS-PCB-RESERVED    PIC S9(05) COMP.
           05 LS-PCB-SEG-NAME    PIC X(08).
           05 LS-PCB-KEY-LENGTH  PIC S9(05) COMP.
           05 LS-PCB-SENSEG-CNT  PIC S9(05) COMP.
           05 LS-PCB-KEY-AREA    PIC X(50).

       PROCEDURE DIVISION USING LS-PCB-MASK.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-NAVIGATE-ROOT
           PERFORM 2000-NAVIGATE-CHILDREN
           PERFORM 3000-NAVIGATE-DEPENDENTS
           DISPLAY 'IMSNAV01: TOTAL SEGMENTS=' WS-SEG-COUNT
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-NAVIGATE-ROOT SECTION
      *==========================================================*
       1000-NAVIGATE-ROOT SECTION.
           SET WS-MODE-ROOT TO TRUE
           MOVE 'CUST000001' TO WS-SSA-CUSTID
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-PARENT
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-SEG-COUNT
              MOVE WS-SSA-CUSTID TO WS-PARENT-KEY
              DISPLAY 'IMSNAV01: ROOT FOUND '
                      LS-PCB-SEG-NAME
                      ' KEY=' WS-PARENT-KEY
           ELSE
              DISPLAY 'IMSNAV01: ROOT NOT FOUND '
                      LS-PCB-STATUS
           END-IF
           .
       1000-NAVIGATE-ROOT-EXIT.
           EXIT.
      *==========================================================*
      * 2000-NAVIGATE-CHILDREN SECTION
      *==========================================================*
       2000-NAVIGATE-CHILDREN SECTION.
           SET WS-MODE-CHILD TO TRUE
           PERFORM UNTIL LS-PCB-STATUS NOT = SPACES
              CALL 'CBLTDLI' USING WS-FUNC-GN
                                   LS-PCB-MASK
                                   WS-IO-AREA
                                   WS-SSA-UNQUAL-ORDER
              IF LS-PCB-STATUS = SPACES
                 ADD 1 TO WS-SEG-COUNT
                 DISPLAY 'IMSNAV01:   CHILD '
                         LS-PCB-SEG-NAME
                         ' LEVEL=' LS-PCB-SEG-LEVEL
              END-IF
           END-PERFORM
           .
       2000-NAVIGATE-CHILDREN-EXIT.
           EXIT.
      *==========================================================*
      * 3000-NAVIGATE-DEPENDENTS SECTION
      *==========================================================*
       3000-NAVIGATE-DEPENDENTS SECTION.
           SET WS-MODE-DEPENDENT TO TRUE
           MOVE 'CUST000001' TO WS-SSA-CUSTID
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-PARENT
           IF LS-PCB-STATUS = SPACES
              PERFORM 3100-GET-DEPENDENT-ITEMS
           END-IF
           .
       3000-NAVIGATE-DEPENDENTS-EXIT.
           EXIT.
      *==========================================================*
      * 3100-GET-DEPENDENT-ITEMS SECTION
      *==========================================================*
       3100-GET-DEPENDENT-ITEMS SECTION.
           PERFORM UNTIL LS-PCB-STATUS NOT = SPACES
              CALL 'CBLTDLI' USING WS-FUNC-GNP
                                   LS-PCB-MASK
                                   WS-IO-AREA
                                   WS-SSA-UNQUAL-ITEM
              IF LS-PCB-STATUS = SPACES
                 ADD 1 TO WS-SEG-COUNT
                 DISPLAY 'IMSNAV01:     DEPENDENT '
                         LS-PCB-SEG-NAME
              ELSE IF LS-PCB-STATUS = 'GE'
                 DISPLAY 'IMSNAV01: NO MORE DEPENDENTS'
              END-IF
           END-PERFORM
           .
       3100-GET-DEPENDENT-ITEMS-EXIT.
           EXIT.`
  },

  {
    id: "IMSSSA01",
    tech: "ims",
    name: "SSA Builder",
    desc: "Constrói SSAs qualificadas e não-qualificadas dinamicamente com operadores booleanos.",
    level: "advanced",
    filename: "IMSSSA01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSSSA01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONSTRUTOR DINAMICO DE SSAs
      *            QUALIFICADAS/NAO-QUALIFICADAS COM
      *            OPERADORES BOOLEANOS (AND, OR)
      * DL/I     : GU COM SSAs DINAMICAS
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSSSA01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
       01  WS-SSA-BUFFER          PIC X(256) VALUE SPACES.
       01  WS-SSA-WORK-AREA.
           05 WS-SSA-SEG-NAME    PIC X(08) VALUE SPACES.
           05 WS-SSA-QUAL-CHAR   PIC X(01) VALUE SPACES.
              88 WS-SSA-QUALIFIED   VALUE '('.
              88 WS-SSA-UNQUALIFIED VALUE ' '.
           05 WS-SSA-FIELD-NAME  PIC X(08) VALUE SPACES.
           05 WS-SSA-OPERATOR    PIC X(02) VALUE SPACES.
              88 WS-OP-EQUAL     VALUE ' ='.
              88 WS-OP-GREATER   VALUE ' >'.
              88 WS-OP-LESS      VALUE ' <'.
              88 WS-OP-GE        VALUE '>='.
              88 WS-OP-LE        VALUE '<='.
              88 WS-OP-NE        VALUE '!='.
           05 WS-SSA-VALUE       PIC X(40) VALUE SPACES.
           05 WS-SSA-BOOLEAN     PIC X(04) VALUE SPACES.
              88 WS-BOOL-AND     VALUE ' AND'.
              88 WS-BOOL-OR      VALUE '  OR'.
              88 WS-BOOL-NONE    VALUE '    '.
       01  WS-SSA-STACK.
           05 WS-SSA-ENTRY       OCCURS 10 TIMES.
              10 WS-SSE-SEGMENT  PIC X(08).
              10 WS-SSE-FIELD    PIC X(08).
              10 WS-SSE-OPER     PIC X(02).
              10 WS-SSE-VALUE    PIC X(40).
              10 WS-SSE-BOOL     PIC X(04).
       01  WS-SSA-STACK-PTR      PIC 9(02) COMP VALUE 0.
       01  WS-IO-AREA            PIC X(500).
       01  WS-IDX                PIC 9(02) COMP.
       01  WS-BUILT-SSA          PIC X(256).

       LINKAGE SECTION.
       01  LS-PCB-MASK.
           05 LS-PCB-DBD-NAME    PIC X(08).
           05 LS-PCB-SEG-LEVEL   PIC XX.
           05 LS-PCB-STATUS      PIC XX.
           05 LS-PCB-PROC-OPT    PIC X(04).
           05 LS-PCB-RESERVED    PIC S9(05) COMP.
           05 LS-PCB-SEG-NAME    PIC X(08).
           05 LS-PCB-KEY-LENGTH  PIC S9(05) COMP.
           05 LS-PCB-SENSEG-CNT  PIC S9(05) COMP.
           05 LS-PCB-KEY-AREA    PIC X(50).

       PROCEDURE DIVISION USING LS-PCB-MASK.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-BUILD-SIMPLE-SSA
           PERFORM 2000-BUILD-BOOLEAN-SSA
           PERFORM 3000-BUILD-MULTI-LEVEL-SSA
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-BUILD-SIMPLE-SSA SECTION
      *==========================================================*
       1000-BUILD-SIMPLE-SSA SECTION.
           INITIALIZE WS-SSA-BUFFER
           MOVE 'CUSTOMER' TO WS-SSA-SEG-NAME
           SET WS-SSA-QUALIFIED TO TRUE
           MOVE 'CUSTID  ' TO WS-SSA-FIELD-NAME
           SET WS-OP-EQUAL TO TRUE
           MOVE 'CUST000001' TO WS-SSA-VALUE
           PERFORM 8000-ASSEMBLE-SSA
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-BUILT-SSA
           DISPLAY 'IMSSSA01: SIMPLE SSA STATUS='
                   LS-PCB-STATUS
           .
       1000-BUILD-SIMPLE-SSA-EXIT.
           EXIT.
      *==========================================================*
      * 2000-BUILD-BOOLEAN-SSA SECTION
      *==========================================================*
       2000-BUILD-BOOLEAN-SSA SECTION.
           INITIALIZE WS-SSA-BUFFER
           MOVE 0 TO WS-SSA-STACK-PTR
           PERFORM 7000-PUSH-CONDITION
           MOVE 'ORDER   ' TO WS-SSA-SEG-NAME
           MOVE 'STATUS  ' TO WS-SSA-FIELD-NAME
           SET WS-OP-EQUAL TO TRUE
           MOVE 'ACTIVE' TO WS-SSA-VALUE
           SET WS-BOOL-AND TO TRUE
           PERFORM 7000-PUSH-CONDITION
           MOVE 'ORDER   ' TO WS-SSA-SEG-NAME
           MOVE 'AMOUNT  ' TO WS-SSA-FIELD-NAME
           SET WS-OP-GREATER TO TRUE
           MOVE '00100000' TO WS-SSA-VALUE
           SET WS-BOOL-NONE TO TRUE
           PERFORM 7000-PUSH-CONDITION
           PERFORM 8100-ASSEMBLE-BOOLEAN-SSA
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-BUILT-SSA
           DISPLAY 'IMSSSA01: BOOLEAN SSA STATUS='
                   LS-PCB-STATUS
           .
       2000-BUILD-BOOLEAN-SSA-EXIT.
           EXIT.
      *==========================================================*
      * 3000-BUILD-MULTI-LEVEL-SSA SECTION
      *==========================================================*
       3000-BUILD-MULTI-LEVEL-SSA SECTION.
           INITIALIZE WS-SSA-BUFFER
           MOVE 'CUSTOMER' TO WS-SSA-SEG-NAME
           SET WS-SSA-UNQUALIFIED TO TRUE
           PERFORM 8000-ASSEMBLE-SSA
           MOVE WS-BUILT-SSA TO WS-SSA-BUFFER
           MOVE 'ORDER   ' TO WS-SSA-SEG-NAME
           SET WS-SSA-QUALIFIED TO TRUE
           MOVE 'ORDDATE ' TO WS-SSA-FIELD-NAME
           SET WS-OP-GE TO TRUE
           MOVE '20260101' TO WS-SSA-VALUE
           PERFORM 8000-ASSEMBLE-SSA
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-BUFFER
                                WS-BUILT-SSA
           DISPLAY 'IMSSSA01: MULTI-LEVEL STATUS='
                   LS-PCB-STATUS
           .
       3000-BUILD-MULTI-LEVEL-SSA-EXIT.
           EXIT.
      *==========================================================*
      * 7000-PUSH-CONDITION SECTION
      *==========================================================*
       7000-PUSH-CONDITION SECTION.
           ADD 1 TO WS-SSA-STACK-PTR
           MOVE WS-SSA-SEG-NAME
              TO WS-SSE-SEGMENT(WS-SSA-STACK-PTR)
           MOVE WS-SSA-FIELD-NAME
              TO WS-SSE-FIELD(WS-SSA-STACK-PTR)
           MOVE WS-SSA-OPERATOR
              TO WS-SSE-OPER(WS-SSA-STACK-PTR)
           MOVE WS-SSA-VALUE
              TO WS-SSE-VALUE(WS-SSA-STACK-PTR)
           MOVE WS-SSA-BOOLEAN
              TO WS-SSE-BOOL(WS-SSA-STACK-PTR)
           .
       7000-PUSH-CONDITION-EXIT.
           EXIT.
      *==========================================================*
      * 8000-ASSEMBLE-SSA SECTION
      *==========================================================*
       8000-ASSEMBLE-SSA SECTION.
           INITIALIZE WS-BUILT-SSA
           STRING WS-SSA-SEG-NAME DELIMITED SIZE
                  WS-SSA-QUAL-CHAR DELIMITED SIZE
                  WS-SSA-FIELD-NAME DELIMITED SIZE
                  WS-SSA-OPERATOR  DELIMITED SIZE
                  WS-SSA-VALUE     DELIMITED SPACES
                  ')' DELIMITED SIZE
                  INTO WS-BUILT-SSA
           .
       8000-ASSEMBLE-SSA-EXIT.
           EXIT.
      *==========================================================*
      * 8100-ASSEMBLE-BOOLEAN-SSA SECTION
      *==========================================================*
       8100-ASSEMBLE-BOOLEAN-SSA SECTION.
           INITIALIZE WS-BUILT-SSA
           PERFORM VARYING WS-IDX FROM 1 BY 1
              UNTIL WS-IDX > WS-SSA-STACK-PTR
              STRING WS-SSE-FIELD(WS-IDX) DELIMITED SIZE
                     WS-SSE-OPER(WS-IDX)  DELIMITED SIZE
                     WS-SSE-VALUE(WS-IDX) DELIMITED SPACES
                     WS-SSE-BOOL(WS-IDX)  DELIMITED SPACES
                     INTO WS-BUILT-SSA
           END-PERFORM
           .
       8100-ASSEMBLE-BOOLEAN-SSA-EXIT.
           EXIT.`
  },

  {
    id: "IMSSTDC01",
    tech: "ims",
    name: "Status Decoder",
    desc: "Traduz códigos de status DL/I em mensagens descritivas para diagnóstico e logging.",
    level: "basic",
    filename: "IMSSTD01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSSTD01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : DECODIFICADOR DE STATUS CODES DL/I
      *            TRADUZ CODIGOS EM MENSAGENS DESCRITIVAS
      *            PARA DIAGNOSTICO E LOGGING
      * INTERFACE: CALL 'IMSSTD01' USING WS-STATUS WS-MESSAGE
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSSTD01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-STATUS-TABLE.
           05 FILLER PIC X(52) VALUE
              '  SUCCESSFUL COMPLETION                             '.
           05 FILLER PIC X(52) VALUE
              'GASEGMENT NOT FOUND                                 '.
           05 FILLER PIC X(52) VALUE
              'GBEND OF DATABASE                                   '.
           05 FILLER PIC X(52) VALUE
              'GCCHANGE IN SEGMENT TYPE DURING GN                  '.
           05 FILLER PIC X(52) VALUE
              'GEDLI CALL AGAINST SEQUENTIAL SEGMENTS              '.
           05 FILLER PIC X(52) VALUE
              'GKSSEGMENT KEY OUT OF SEQUENCE                      '.
           05 FILLER PIC X(52) VALUE
              'IIDUPLICATE KEY ON INSERT                           '.
           05 FILLER PIC X(52) VALUE
              'IXVIOLATION OF INSERT RULE                          '.
           05 FILLER PIC X(52) VALUE
              'DJSEGMENT NOT FOUND FOR DELETE                      '.
           05 FILLER PIC X(52) VALUE
              'DAREPLACE/DELETE RULE VIOLATION                     '.
           05 FILLER PIC X(52) VALUE
              'QCNO MORE MESSAGES IN QUEUE                        '.
           05 FILLER PIC X(52) VALUE
              'QDDEAD LETTER QUEUE OVERFLOW                       '.
           05 FILLER PIC X(52) VALUE
              'AHINVALID FUNCTION CODE                             '.
           05 FILLER PIC X(52) VALUE
              'AJINVALID SSA QUALIFICATION                         '.
           05 FILLER PIC X(52) VALUE
              'AKINVALID PCB REFERENCE                             '.
       01  WS-STATUS-REDEF REDEFINES WS-STATUS-TABLE.
           05 WS-ST-ENTRY       OCCURS 15 TIMES.
              10 WS-ST-CODE     PIC X(02).
              10 WS-ST-MESSAGE  PIC X(50).
       01  WS-SEARCH-IDX        PIC 9(02) COMP.
       01  WS-FOUND-FLAG        PIC X(01) VALUE 'N'.
           88 WS-FOUND          VALUE 'Y'.
           88 WS-NOT-FOUND      VALUE 'N'.

       LINKAGE SECTION.
       01  LS-STATUS-CODE       PIC X(02).
       01  LS-OUTPUT-MESSAGE    PIC X(80).

       PROCEDURE DIVISION USING LS-STATUS-CODE
                                LS-OUTPUT-MESSAGE.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           INITIALIZE LS-OUTPUT-MESSAGE
           SET WS-NOT-FOUND TO TRUE
           PERFORM VARYING WS-SEARCH-IDX FROM 1 BY 1
              UNTIL WS-SEARCH-IDX > 15
                 OR WS-FOUND
              IF WS-ST-CODE(WS-SEARCH-IDX) =
                 LS-STATUS-CODE
                 SET WS-FOUND TO TRUE
                 STRING 'DL/I STATUS '
                        DELIMITED SIZE
                        LS-STATUS-CODE
                        DELIMITED SIZE
                        ': '
                        DELIMITED SIZE
                        WS-ST-MESSAGE(WS-SEARCH-IDX)
                        DELIMITED SPACES
                        INTO LS-OUTPUT-MESSAGE
              END-IF
           END-PERFORM
           IF WS-NOT-FOUND
              STRING 'DL/I STATUS '
                     DELIMITED SIZE
                     LS-STATUS-CODE
                     DELIMITED SIZE
                     ': UNKNOWN STATUS CODE'
                     DELIMITED SIZE
                     INTO LS-OUTPUT-MESSAGE
           END-IF
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.`
  },

  {
    id: "IMSDLIO2",
    tech: "ims",
    name: "Advanced DL/I with SSA",
    desc: "Operações GU/GN/GNP com SSA qualificada, ISRT multi-nível e DLET com posicionamento.",
    level: "advanced",
    filename: "IMSDLI02.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSDLI02
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : OPERACOES DL/I AVANCADAS COM SSA
      *            GU/GN/GNP COM SSA QUALIFICADA
      *            ISRT MULTI-NIVEL E DLET
      * DL/I     : GU, GN, GNP, GHU, ISRT, DLET
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSDLI02.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
           05 WS-FUNC-GNP        PIC X(04) VALUE 'GNP '.
           05 WS-FUNC-GHU        PIC X(04) VALUE 'GHU '.
           05 WS-FUNC-ISRT       PIC X(04) VALUE 'ISRT'.
           05 WS-FUNC-DLET       PIC X(04) VALUE 'DLET'.
       01  WS-SSA-CUSTOMER.
           05 FILLER             PIC X(08) VALUE 'CUSTOMER'.
           05 FILLER             PIC X(01) VALUE '('.
           05 FILLER             PIC X(08) VALUE 'CUSTID  '.
           05 FILLER             PIC X(02) VALUE ' ='.
           05 WS-SSA-CUSTID      PIC X(10) VALUE SPACES.
           05 FILLER             PIC X(01) VALUE ')'.
       01  WS-SSA-ORDER-QUAL.
           05 FILLER             PIC X(08) VALUE 'ORDER   '.
           05 FILLER             PIC X(01) VALUE '('.
           05 FILLER             PIC X(08) VALUE 'ORDERID '.
           05 FILLER             PIC X(02) VALUE ' ='.
           05 WS-SSA-ORDERID     PIC X(10) VALUE SPACES.
           05 FILLER             PIC X(01) VALUE ')'.
       01  WS-SSA-ITEM-UNQUAL.
           05 FILLER             PIC X(08) VALUE 'ITEM    '.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-IO-AREA            PIC X(500).
       01  WS-NEW-ORDER.
           05 WS-NO-ORDERID     PIC X(10).
           05 WS-NO-DATE        PIC X(08).
           05 WS-NO-STATUS      PIC X(06).
           05 WS-NO-AMOUNT      PIC 9(07)V99.
       01  WS-NEW-ITEM.
           05 WS-NI-ITEMID      PIC X(10).
           05 WS-NI-DESC        PIC X(30).
           05 WS-NI-QTY         PIC 9(05).
           05 WS-NI-PRICE       PIC 9(05)V99.
       01  WS-OP-COUNT          PIC 9(05) COMP VALUE 0.

       LINKAGE SECTION.
       01  LS-PCB-MASK.
           05 LS-PCB-DBD-NAME    PIC X(08).
           05 LS-PCB-SEG-LEVEL   PIC XX.
           05 LS-PCB-STATUS      PIC XX.
           05 LS-PCB-PROC-OPT    PIC X(04).
           05 LS-PCB-RESERVED    PIC S9(05) COMP.
           05 LS-PCB-SEG-NAME    PIC X(08).
           05 LS-PCB-KEY-LENGTH  PIC S9(05) COMP.
           05 LS-PCB-SENSEG-CNT  PIC S9(05) COMP.
           05 LS-PCB-KEY-AREA    PIC X(50).

       PROCEDURE DIVISION USING LS-PCB-MASK.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-QUALIFIED-RETRIEVE
           PERFORM 2000-MULTI-LEVEL-INSERT
           PERFORM 3000-POSITION-AND-DELETE
           DISPLAY 'IMSDLI02: OPERATIONS=' WS-OP-COUNT
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-QUALIFIED-RETRIEVE SECTION
      *==========================================================*
       1000-QUALIFIED-RETRIEVE SECTION.
           MOVE 'CUST000001' TO WS-SSA-CUSTID
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-CUSTOMER
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-OP-COUNT
              DISPLAY 'IMSDLI02: CUSTOMER FOUND'
              PERFORM 1100-GET-CHILD-ORDERS
           END-IF
           .
       1000-QUALIFIED-RETRIEVE-EXIT.
           EXIT.
      *==========================================================*
      * 1100-GET-CHILD-ORDERS SECTION
      *==========================================================*
       1100-GET-CHILD-ORDERS SECTION.
           PERFORM UNTIL LS-PCB-STATUS NOT = SPACES
              CALL 'CBLTDLI' USING WS-FUNC-GNP
                                   LS-PCB-MASK
                                   WS-IO-AREA
                                   WS-SSA-ITEM-UNQUAL
              IF LS-PCB-STATUS = SPACES
                 ADD 1 TO WS-OP-COUNT
              END-IF
           END-PERFORM
           .
       1100-GET-CHILD-ORDERS-EXIT.
           EXIT.
      *==========================================================*
      * 2000-MULTI-LEVEL-INSERT SECTION
      *==========================================================*
       2000-MULTI-LEVEL-INSERT SECTION.
           MOVE 'CUST000001' TO WS-SSA-CUSTID
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-CUSTOMER
           IF LS-PCB-STATUS = SPACES
              INITIALIZE WS-NEW-ORDER
              MOVE 'ORD0000099' TO WS-NO-ORDERID
              MOVE '20260415' TO WS-NO-DATE
              MOVE 'NEW   ' TO WS-NO-STATUS
              MOVE 0001500.00 TO WS-NO-AMOUNT
              MOVE WS-NEW-ORDER TO WS-IO-AREA
              CALL 'CBLTDLI' USING WS-FUNC-ISRT
                                   LS-PCB-MASK
                                   WS-IO-AREA
                                   WS-SSA-CUSTOMER
              IF LS-PCB-STATUS = SPACES
                 ADD 1 TO WS-OP-COUNT
                 PERFORM 2100-INSERT-ITEM
              END-IF
           END-IF
           .
       2000-MULTI-LEVEL-INSERT-EXIT.
           EXIT.
      *==========================================================*
      * 2100-INSERT-ITEM SECTION
      *==========================================================*
       2100-INSERT-ITEM SECTION.
           INITIALIZE WS-NEW-ITEM
           MOVE 'ITEM000001' TO WS-NI-ITEMID
           MOVE 'WIDGET TYPE A' TO WS-NI-DESC
           MOVE 10 TO WS-NI-QTY
           MOVE 00150.00 TO WS-NI-PRICE
           MOVE WS-NEW-ITEM TO WS-IO-AREA
           MOVE 'ORD0000099' TO WS-SSA-ORDERID
           CALL 'CBLTDLI' USING WS-FUNC-ISRT
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-CUSTOMER
                                WS-SSA-ORDER-QUAL
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-OP-COUNT
              DISPLAY 'IMSDLI02: ITEM INSERTED'
           END-IF
           .
       2100-INSERT-ITEM-EXIT.
           EXIT.
      *==========================================================*
      * 3000-POSITION-AND-DELETE SECTION
      *==========================================================*
       3000-POSITION-AND-DELETE SECTION.
           MOVE 'CUST000001' TO WS-SSA-CUSTID
           MOVE 'ORD0000099' TO WS-SSA-ORDERID
           CALL 'CBLTDLI' USING WS-FUNC-GHU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-CUSTOMER
                                WS-SSA-ORDER-QUAL
           IF LS-PCB-STATUS = SPACES
              CALL 'CBLTDLI' USING WS-FUNC-DLET
                                   LS-PCB-MASK
                                   WS-IO-AREA
              IF LS-PCB-STATUS = SPACES
                 ADD 1 TO WS-OP-COUNT
                 DISPLAY 'IMSDLI02: ORDER DELETED'
              END-IF
           END-IF
           .
       3000-POSITION-AND-DELETE-EXIT.
           EXIT.`
  },

  {
    id: "IMSBMP02",
    tech: "ims",
    name: "BMP with Messages",
    desc: "BMP com GU/GN no IO PCB para mensagens, ISRT de resposta e CHKP periódico.",
    level: "advanced",
    filename: "IMSBMP02.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSBMP02
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : BMP COM PROCESSAMENTO DE MENSAGENS
      *            GU/GN NO IO PCB, ISRT RESPOSTA, CHKP
      * DL/I     : GU, GN, ISRT, CHKP (IO PCB + DB PCB)
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSBMP02.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
           05 WS-FUNC-ISRT       PIC X(04) VALUE 'ISRT'.
           05 WS-FUNC-CHKP       PIC X(04) VALUE 'CHKP'.
       01  WS-MSG-IN-AREA.
           05 WS-MI-LL           PIC S9(04) COMP VALUE 0.
           05 WS-MI-ZZ           PIC S9(04) COMP VALUE 0.
           05 WS-MI-TRANCODE     PIC X(08) VALUE SPACES.
           05 WS-MI-DATA         PIC X(200) VALUE SPACES.
       01  WS-MSG-OUT-AREA.
           05 WS-MO-LL           PIC S9(04) COMP VALUE 0.
           05 WS-MO-ZZ           PIC S9(04) COMP VALUE 0.
           05 WS-MO-DATA         PIC X(200) VALUE SPACES.
       01  WS-IO-AREA            PIC X(500).
       01  WS-MSG-COUNT          PIC 9(08) COMP VALUE 0.
       01  WS-CHKP-FREQ         PIC 9(05) COMP VALUE 100.
       01  WS-SINCE-CHKP        PIC 9(08) COMP VALUE 0.
       01  WS-CONTINUE-FLAG      PIC X(01) VALUE 'Y'.
           88 WS-CONTINUE        VALUE 'Y'.
           88 WS-STOP            VALUE 'N'.
       01  WS-CHKP-AREA         PIC X(08) VALUE SPACES.

       LINKAGE SECTION.
       01  LS-IO-PCB.
           05 LS-IO-LTERM        PIC X(08).
           05 LS-IO-RESERVED     PIC X(02).
           05 LS-IO-STATUS       PIC XX.
       01  LS-ALT-PCB.
           05 LS-ALT-LTERM       PIC X(08).
           05 LS-ALT-RESERVED    PIC X(02).
           05 LS-ALT-STATUS      PIC XX.
       01  LS-DB-PCB.
           05 LS-DB-DBD-NAME     PIC X(08).
           05 LS-DB-SEG-LEVEL    PIC XX.
           05 LS-DB-STATUS       PIC XX.
           05 LS-DB-PROC-OPT     PIC X(04).
           05 LS-DB-RESERVED     PIC S9(05) COMP.
           05 LS-DB-SEG-NAME     PIC X(08).
           05 LS-DB-KEY-LENGTH   PIC S9(05) COMP.
           05 LS-DB-SENSEG-CNT   PIC S9(05) COMP.
           05 LS-DB-KEY-AREA     PIC X(50).

       PROCEDURE DIVISION USING LS-IO-PCB
                                LS-ALT-PCB
                                LS-DB-PCB.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           SET WS-CONTINUE TO TRUE
           PERFORM 1000-GET-MESSAGE
           PERFORM UNTIL WS-STOP
              PERFORM 2000-PROCESS-MESSAGE
              PERFORM 3000-SEND-RESPONSE
              PERFORM 4000-CHECK-CHECKPOINT
              PERFORM 1000-GET-MESSAGE
           END-PERFORM
           PERFORM 5000-FINAL-CHECKPOINT
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-GET-MESSAGE SECTION
      *==========================================================*
       1000-GET-MESSAGE SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-IO-PCB
                                WS-MSG-IN-AREA
           EVALUATE LS-IO-STATUS
              WHEN SPACES
                 ADD 1 TO WS-MSG-COUNT
              WHEN 'QC'
                 SET WS-STOP TO TRUE
              WHEN OTHER
                 DISPLAY 'IMSBMP02: GU IO ERR='
                         LS-IO-STATUS
                 SET WS-STOP TO TRUE
           END-EVALUATE
           IF WS-CONTINUE
              PERFORM 1100-GET-SEGMENTS
           END-IF
           .
       1000-GET-MESSAGE-EXIT.
           EXIT.
      *==========================================================*
      * 1100-GET-SEGMENTS SECTION
      *==========================================================*
       1100-GET-SEGMENTS SECTION.
           PERFORM UNTIL LS-IO-STATUS NOT = SPACES
              CALL 'CBLTDLI' USING WS-FUNC-GN
                                   LS-IO-PCB
                                   WS-MSG-IN-AREA
           END-PERFORM
           .
       1100-GET-SEGMENTS-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PROCESS-MESSAGE SECTION
      *==========================================================*
       2000-PROCESS-MESSAGE SECTION.
           EVALUATE WS-MI-TRANCODE
              WHEN 'INQUIRY '
                 PERFORM 2100-DB-LOOKUP
              WHEN 'UPDATE  '
                 PERFORM 2200-DB-UPDATE
              WHEN OTHER
                 MOVE 'UNKNOWN TRANSACTION' TO WS-MO-DATA
           END-EVALUATE
           .
       2000-PROCESS-MESSAGE-EXIT.
           EXIT.
      *==========================================================*
      * 2100-DB-LOOKUP SECTION
      *==========================================================*
       2100-DB-LOOKUP SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-DB-PCB
                                WS-IO-AREA
           IF LS-DB-STATUS = SPACES
              MOVE WS-IO-AREA TO WS-MO-DATA
           ELSE
              MOVE 'RECORD NOT FOUND' TO WS-MO-DATA
           END-IF
           .
       2100-DB-LOOKUP-EXIT.
           EXIT.
      *==========================================================*
      * 2200-DB-UPDATE SECTION
      *==========================================================*
       2200-DB-UPDATE SECTION.
           MOVE 'UPDATE PROCESSED' TO WS-MO-DATA
           .
       2200-DB-UPDATE-EXIT.
           EXIT.
      *==========================================================*
      * 3000-SEND-RESPONSE SECTION
      *==========================================================*
       3000-SEND-RESPONSE SECTION.
           MOVE 212 TO WS-MO-LL
           MOVE 0   TO WS-MO-ZZ
           CALL 'CBLTDLI' USING WS-FUNC-ISRT
                                LS-IO-PCB
                                WS-MSG-OUT-AREA
           IF LS-IO-STATUS NOT = SPACES
              DISPLAY 'IMSBMP02: ISRT IO ERR='
                      LS-IO-STATUS
           END-IF
           .
       3000-SEND-RESPONSE-EXIT.
           EXIT.
      *==========================================================*
      * 4000-CHECK-CHECKPOINT SECTION
      *==========================================================*
       4000-CHECK-CHECKPOINT SECTION.
           ADD 1 TO WS-SINCE-CHKP
           IF WS-SINCE-CHKP >= WS-CHKP-FREQ
              CALL 'CBLTDLI' USING WS-FUNC-CHKP
                                   LS-IO-PCB
                                   WS-CHKP-AREA
              IF LS-IO-STATUS = SPACES
                 MOVE 0 TO WS-SINCE-CHKP
              END-IF
           END-IF
           .
       4000-CHECK-CHECKPOINT-EXIT.
           EXIT.
      *==========================================================*
      * 5000-FINAL-CHECKPOINT SECTION
      *==========================================================*
       5000-FINAL-CHECKPOINT SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-CHKP
                                LS-IO-PCB
                                WS-CHKP-AREA
           DISPLAY 'IMSBMP02: MSGS=' WS-MSG-COUNT
           .
       5000-FINAL-CHECKPOINT-EXIT.
           EXIT.`
  },

  {
    id: "IMSCMD01",
    tech: "ims",
    name: "IMS Commands",
    desc: "Emite comandos IMS via ICMD e processa respostas com RCMD para automação operacional.",
    level: "advanced",
    filename: "IMSCMD01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSCMD01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : EMISSAO DE COMANDOS IMS VIA DL/I
      *            ICMD PARA ENVIO, RCMD PARA RESPOSTA
      * DL/I     : ICMD, RCMD
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSCMD01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-ICMD       PIC X(04) VALUE 'ICMD'.
           05 WS-FUNC-RCMD       PIC X(04) VALUE 'RCMD'.
       01  WS-CMD-AREA.
           05 WS-CMD-LL          PIC S9(04) COMP VALUE 0.
           05 WS-CMD-ZZ          PIC S9(04) COMP VALUE 0.
           05 WS-CMD-TEXT        PIC X(256) VALUE SPACES.
       01  WS-RSP-AREA.
           05 WS-RSP-LL          PIC S9(04) COMP VALUE 0.
           05 WS-RSP-ZZ          PIC S9(04) COMP VALUE 0.
           05 WS-RSP-TEXT        PIC X(256) VALUE SPACES.
       01  WS-CMD-TABLE.
           05 FILLER PIC X(40) VALUE
              '/DISPLAY ACTIVE REGION               '.
           05 FILLER PIC X(40) VALUE
              '/DISPLAY TRAN MYTRN1                  '.
           05 FILLER PIC X(40) VALUE
              '/DISPLAY DATABASE MYDB01              '.
       01  WS-CMD-TABLE-R REDEFINES WS-CMD-TABLE.
           05 WS-CMD-ENTRY       PIC X(40) OCCURS 3 TIMES.
       01  WS-CMD-IDX            PIC 9(02) COMP.
       01  WS-RSP-MORE           PIC X(01) VALUE 'N'.
           88 WS-MORE-RESPONSES  VALUE 'Y'.
           88 WS-NO-MORE         VALUE 'N'.

       LINKAGE SECTION.
       01  LS-IO-PCB.
           05 LS-IO-LTERM        PIC X(08).
           05 LS-IO-RESERVED     PIC X(02).
           05 LS-IO-STATUS       PIC XX.

       PROCEDURE DIVISION USING LS-IO-PCB.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM VARYING WS-CMD-IDX FROM 1 BY 1
              UNTIL WS-CMD-IDX > 3
              PERFORM 1000-ISSUE-COMMAND
              PERFORM 2000-RETRIEVE-RESPONSES
           END-PERFORM
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-ISSUE-COMMAND SECTION
      *==========================================================*
       1000-ISSUE-COMMAND SECTION.
           INITIALIZE WS-CMD-AREA
           MOVE WS-CMD-ENTRY(WS-CMD-IDX)
              TO WS-CMD-TEXT
           MOVE 260 TO WS-CMD-LL
           MOVE 0   TO WS-CMD-ZZ
           CALL 'CBLTDLI' USING WS-FUNC-ICMD
                                LS-IO-PCB
                                WS-CMD-AREA
           EVALUATE LS-IO-STATUS
              WHEN SPACES
                 DISPLAY 'IMSCMD01: CMD ACCEPTED='
                         WS-CMD-TEXT
                 SET WS-MORE-RESPONSES TO TRUE
              WHEN 'CC'
                 DISPLAY 'IMSCMD01: CMD ACCEPTED '
                         'MORE RESPONSES'
                 SET WS-MORE-RESPONSES TO TRUE
              WHEN OTHER
                 DISPLAY 'IMSCMD01: CMD FAILED='
                         LS-IO-STATUS
                 SET WS-NO-MORE TO TRUE
           END-EVALUATE
           .
       1000-ISSUE-COMMAND-EXIT.
           EXIT.
      *==========================================================*
      * 2000-RETRIEVE-RESPONSES SECTION
      *==========================================================*
       2000-RETRIEVE-RESPONSES SECTION.
           PERFORM UNTIL WS-NO-MORE
              INITIALIZE WS-RSP-AREA
              CALL 'CBLTDLI' USING WS-FUNC-RCMD
                                   LS-IO-PCB
                                   WS-RSP-AREA
              EVALUATE LS-IO-STATUS
                 WHEN SPACES
                    DISPLAY 'IMSCMD01: RSP='
                            WS-RSP-TEXT
                 WHEN 'CC'
                    DISPLAY 'IMSCMD01: RSP='
                            WS-RSP-TEXT
                    DISPLAY 'IMSCMD01: MORE...'
                 WHEN 'QC'
                    SET WS-NO-MORE TO TRUE
                 WHEN OTHER
                    DISPLAY 'IMSCMD01: RCMD ERR='
                            LS-IO-STATUS
                    SET WS-NO-MORE TO TRUE
              END-EVALUATE
           END-PERFORM
           .
       2000-RETRIEVE-RESPONSES-EXIT.
           EXIT.`
  },

  {
    id: "IMSSEG01",
    tech: "ims",
    name: "Multi-Segment Navigation",
    desc: "Navegação em 3 níveis hierárquicos com operações específicas por segmento.",
    level: "intermediate",
    filename: "IMSSEG01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSSEG01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : NAVEGACAO MULTI-SEGMENTO EM 3 NIVEIS
      *            OPERACOES ESPECIFICAS POR SEGMENTO
      * DL/I     : GU, GN, GNP, ISRT, REPL
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSSEG01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
           05 WS-FUNC-GNP        PIC X(04) VALUE 'GNP '.
           05 WS-FUNC-GHU        PIC X(04) VALUE 'GHU '.
           05 WS-FUNC-ISRT       PIC X(04) VALUE 'ISRT'.
           05 WS-FUNC-REPL       PIC X(04) VALUE 'REPL'.
       01  WS-SSA-DEPT.
           05 FILLER             PIC X(08) VALUE 'DEPARTMT'.
           05 FILLER             PIC X(01) VALUE '('.
           05 FILLER             PIC X(08) VALUE 'DEPTID  '.
           05 FILLER             PIC X(02) VALUE ' ='.
           05 WS-SSA-DEPTID      PIC X(06) VALUE SPACES.
           05 FILLER             PIC X(01) VALUE ')'.
       01  WS-SSA-EMP-UNQUAL.
           05 FILLER             PIC X(08) VALUE 'EMPLOYEE'.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-SSA-SKILL-UNQUAL.
           05 FILLER             PIC X(08) VALUE 'SKILL   '.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-IO-AREA            PIC X(500).
       01  WS-DEPT-SEGMENT.
           05 WS-DS-DEPTID      PIC X(06).
           05 WS-DS-NAME        PIC X(30).
           05 WS-DS-MANAGER     PIC X(20).
           05 WS-DS-BUDGET      PIC 9(09)V99.
       01  WS-EMP-SEGMENT.
           05 WS-ES-EMPID       PIC X(08).
           05 WS-ES-NAME        PIC X(30).
           05 WS-ES-TITLE       PIC X(20).
           05 WS-ES-SALARY      PIC 9(07)V99.
       01  WS-SKILL-SEGMENT.
           05 WS-SK-CODE        PIC X(06).
           05 WS-SK-DESC        PIC X(30).
           05 WS-SK-LEVEL       PIC 9(02).
       01  WS-COUNTS.
           05 WS-DEPT-COUNT     PIC 9(05) COMP VALUE 0.
           05 WS-EMP-COUNT      PIC 9(05) COMP VALUE 0.
           05 WS-SKILL-COUNT    PIC 9(05) COMP VALUE 0.

       LINKAGE SECTION.
       01  LS-PCB-MASK.
           05 LS-PCB-DBD-NAME    PIC X(08).
           05 LS-PCB-SEG-LEVEL   PIC XX.
           05 LS-PCB-STATUS      PIC XX.
           05 LS-PCB-PROC-OPT    PIC X(04).
           05 LS-PCB-RESERVED    PIC S9(05) COMP.
           05 LS-PCB-SEG-NAME    PIC X(08).
           05 LS-PCB-KEY-LENGTH  PIC S9(05) COMP.
           05 LS-PCB-SENSEG-CNT  PIC S9(05) COMP.
           05 LS-PCB-KEY-AREA    PIC X(50).

       PROCEDURE DIVISION USING LS-PCB-MASK.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-PROCESS-DEPARTMENTS
           DISPLAY 'IMSSEG01: DEPTS=' WS-DEPT-COUNT
                   ' EMPS=' WS-EMP-COUNT
                   ' SKILLS=' WS-SKILL-COUNT
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-PROCESS-DEPARTMENTS SECTION
      *==========================================================*
       1000-PROCESS-DEPARTMENTS SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-DEPT
           PERFORM UNTIL LS-PCB-STATUS NOT = SPACES
              MOVE WS-IO-AREA TO WS-DEPT-SEGMENT
              ADD 1 TO WS-DEPT-COUNT
              DISPLAY 'IMSSEG01: DEPT='
                      WS-DS-DEPTID ' ' WS-DS-NAME
              PERFORM 2000-PROCESS-EMPLOYEES
              CALL 'CBLTDLI' USING WS-FUNC-GN
                                   LS-PCB-MASK
                                   WS-IO-AREA
           END-PERFORM
           .
       1000-PROCESS-DEPARTMENTS-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PROCESS-EMPLOYEES SECTION
      *==========================================================*
       2000-PROCESS-EMPLOYEES SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GNP
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-EMP-UNQUAL
           PERFORM UNTIL LS-PCB-STATUS NOT = SPACES
              MOVE WS-IO-AREA TO WS-EMP-SEGMENT
              ADD 1 TO WS-EMP-COUNT
              DISPLAY 'IMSSEG01:   EMP='
                      WS-ES-EMPID ' ' WS-ES-NAME
              PERFORM 3000-PROCESS-SKILLS
              CALL 'CBLTDLI' USING WS-FUNC-GNP
                                   LS-PCB-MASK
                                   WS-IO-AREA
                                   WS-SSA-EMP-UNQUAL
           END-PERFORM
           .
       2000-PROCESS-EMPLOYEES-EXIT.
           EXIT.
      *==========================================================*
      * 3000-PROCESS-SKILLS SECTION
      *==========================================================*
       3000-PROCESS-SKILLS SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GNP
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-SKILL-UNQUAL
           PERFORM UNTIL LS-PCB-STATUS NOT = SPACES
              MOVE WS-IO-AREA TO WS-SKILL-SEGMENT
              ADD 1 TO WS-SKILL-COUNT
              DISPLAY 'IMSSEG01:     SKILL='
                      WS-SK-CODE ' LVL=' WS-SK-LEVEL
              CALL 'CBLTDLI' USING WS-FUNC-GNP
                                   LS-PCB-MASK
                                   WS-IO-AREA
                                   WS-SSA-SKILL-UNQUAL
           END-PERFORM
           .
       3000-PROCESS-SKILLS-EXIT.
           EXIT.`
  },

  {
    id: "IMSALT01",
    tech: "ims",
    name: "Alternate PCB",
    desc: "Utiliza múltiplos PCBs no PSB para diferentes visões de banco de dados.",
    level: "intermediate",
    filename: "IMSALT01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSALT01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : USO DE PCBS ALTERNADOS NO PSB
      *            MULTIPLOS PCBS PARA DIFERENTES VISOES
      *            DE BANCO DE DADOS
      * DL/I     : GU, GN (MULTIPLOS PCBs)
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSALT01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
       01  WS-SSA-UNQUAL-CUST.
           05 FILLER             PIC X(08) VALUE 'CUSTOMER'.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-SSA-UNQUAL-PROD.
           05 FILLER             PIC X(08) VALUE 'PRODUCT '.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-IO-AREA-1          PIC X(500).
       01  WS-IO-AREA-2          PIC X(500).
       01  WS-CUSTOMER-DATA.
           05 WS-CD-CUSTID      PIC X(10).
           05 WS-CD-NAME        PIC X(30).
           05 WS-CD-STATUS      PIC X(06).
       01  WS-PRODUCT-DATA.
           05 WS-PD-PRODID      PIC X(10).
           05 WS-PD-DESC        PIC X(30).
           05 WS-PD-PRICE       PIC 9(07)V99.
       01  WS-CUST-COUNT        PIC 9(05) COMP VALUE 0.
       01  WS-PROD-COUNT        PIC 9(05) COMP VALUE 0.
       01  WS-ACTIVE-PCB        PIC X(08) VALUE SPACES.

       LINKAGE SECTION.
       01  LS-IO-PCB.
           05 LS-IO-LTERM        PIC X(08).
           05 LS-IO-RESERVED     PIC X(02).
           05 LS-IO-STATUS       PIC XX.
       01  LS-PCB-CUSTDB.
           05 LS-C-DBD-NAME     PIC X(08).
           05 LS-C-SEG-LEVEL    PIC XX.
           05 LS-C-STATUS       PIC XX.
           05 LS-C-PROC-OPT     PIC X(04).
           05 LS-C-RESERVED     PIC S9(05) COMP.
           05 LS-C-SEG-NAME     PIC X(08).
           05 LS-C-KEY-LENGTH   PIC S9(05) COMP.
           05 LS-C-SENSEG-CNT   PIC S9(05) COMP.
           05 LS-C-KEY-AREA     PIC X(50).
       01  LS-PCB-PRODDB.
           05 LS-P-DBD-NAME     PIC X(08).
           05 LS-P-SEG-LEVEL    PIC XX.
           05 LS-P-STATUS       PIC XX.
           05 LS-P-PROC-OPT     PIC X(04).
           05 LS-P-RESERVED     PIC S9(05) COMP.
           05 LS-P-SEG-NAME     PIC X(08).
           05 LS-P-KEY-LENGTH   PIC S9(05) COMP.
           05 LS-P-SENSEG-CNT   PIC S9(05) COMP.
           05 LS-P-KEY-AREA     PIC X(50).

       PROCEDURE DIVISION USING LS-IO-PCB
                                LS-PCB-CUSTDB
                                LS-PCB-PRODDB.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-QUERY-CUSTOMER-DB
           PERFORM 2000-QUERY-PRODUCT-DB
           PERFORM 3000-CROSS-REFERENCE
           DISPLAY 'IMSALT01: CUSTOMERS=' WS-CUST-COUNT
                   ' PRODUCTS=' WS-PROD-COUNT
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-QUERY-CUSTOMER-DB SECTION
      *==========================================================*
       1000-QUERY-CUSTOMER-DB SECTION.
           MOVE 'CUSTDB' TO WS-ACTIVE-PCB
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-CUSTDB
                                WS-IO-AREA-1
                                WS-SSA-UNQUAL-CUST
           PERFORM UNTIL LS-C-STATUS NOT = SPACES
              MOVE WS-IO-AREA-1 TO WS-CUSTOMER-DATA
              ADD 1 TO WS-CUST-COUNT
              DISPLAY 'IMSALT01: [CUSTDB] '
                      WS-CD-CUSTID ' ' WS-CD-NAME
              CALL 'CBLTDLI' USING WS-FUNC-GN
                                   LS-PCB-CUSTDB
                                   WS-IO-AREA-1
                                   WS-SSA-UNQUAL-CUST
           END-PERFORM
           .
       1000-QUERY-CUSTOMER-DB-EXIT.
           EXIT.
      *==========================================================*
      * 2000-QUERY-PRODUCT-DB SECTION
      *==========================================================*
       2000-QUERY-PRODUCT-DB SECTION.
           MOVE 'PRODDB' TO WS-ACTIVE-PCB
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-PRODDB
                                WS-IO-AREA-2
                                WS-SSA-UNQUAL-PROD
           PERFORM UNTIL LS-P-STATUS NOT = SPACES
              MOVE WS-IO-AREA-2 TO WS-PRODUCT-DATA
              ADD 1 TO WS-PROD-COUNT
              DISPLAY 'IMSALT01: [PRODDB] '
                      WS-PD-PRODID ' ' WS-PD-DESC
              CALL 'CBLTDLI' USING WS-FUNC-GN
                                   LS-PCB-PRODDB
                                   WS-IO-AREA-2
                                   WS-SSA-UNQUAL-PROD
           END-PERFORM
           .
       2000-QUERY-PRODUCT-DB-EXIT.
           EXIT.
      *==========================================================*
      * 3000-CROSS-REFERENCE SECTION
      *==========================================================*
       3000-CROSS-REFERENCE SECTION.
           DISPLAY 'IMSALT01: CROSS-REF COMPLETE'
           DISPLAY 'IMSALT01: CUSTDB SENS='
                   LS-C-SENSEG-CNT
                   ' PRODDB SENS='
                   LS-P-SENSEG-CNT
           .
       3000-CROSS-REFERENCE-EXIT.
           EXIT.`
  },

  {
    id: "IMSCONV01",
    tech: "ims",
    name: "Conversational Transaction",
    desc: "Transação conversacional IMS com SPA para máquina de estados entre iterações.",
    level: "advanced",
    filename: "IMSCON01.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSCON01
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : TRANSACAO CONVERSACIONAL IMS
      *            SPA PARA MAQUINA DE ESTADOS ENTRE
      *            ITERACOES DE CONVERSA
      * DL/I     : GU, ISRT (IO PCB COM SPA)
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSCON01.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-ISRT       PIC X(04) VALUE 'ISRT'.
       01  WS-SPA-AREA.
           05 WS-SPA-LL          PIC S9(04) COMP VALUE 128.
           05 WS-SPA-ZZ          PIC S9(04) COMP VALUE 0.
           05 WS-SPA-TRANCODE    PIC X(08) VALUE SPACES.
           05 WS-SPA-STATE       PIC X(02) VALUE '00'.
              88 WS-STATE-INIT       VALUE '00'.
              88 WS-STATE-MENU       VALUE '01'.
              88 WS-STATE-CUSTSEL    VALUE '02'.
              88 WS-STATE-DETAIL     VALUE '03'.
              88 WS-STATE-CONFIRM    VALUE '04'.
              88 WS-STATE-COMPLETE   VALUE '99'.
           05 WS-SPA-CUSTID      PIC X(10) VALUE SPACES.
           05 WS-SPA-ACTION      PIC X(08) VALUE SPACES.
           05 WS-SPA-DATA        PIC X(94) VALUE SPACES.
       01  WS-MSG-IN.
           05 WS-MI-LL           PIC S9(04) COMP VALUE 0.
           05 WS-MI-ZZ           PIC S9(04) COMP VALUE 0.
           05 WS-MI-TRANCODE     PIC X(08) VALUE SPACES.
           05 WS-MI-INPUT        PIC X(200) VALUE SPACES.
       01  WS-MSG-OUT.
           05 WS-MO-LL           PIC S9(04) COMP VALUE 0.
           05 WS-MO-ZZ           PIC S9(04) COMP VALUE 0.
           05 WS-MO-OUTPUT       PIC X(200) VALUE SPACES.

       LINKAGE SECTION.
       01  LS-IO-PCB.
           05 LS-IO-LTERM        PIC X(08).
           05 LS-IO-RESERVED     PIC X(02).
           05 LS-IO-STATUS       PIC XX.

       PROCEDURE DIVISION USING LS-IO-PCB.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-READ-SPA
           PERFORM 2000-READ-INPUT
           PERFORM 3000-PROCESS-STATE
           PERFORM 4000-WRITE-SPA
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-READ-SPA SECTION
      *==========================================================*
       1000-READ-SPA SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-IO-PCB
                                WS-SPA-AREA
           IF LS-IO-STATUS NOT = SPACES
              DISPLAY 'IMSCON01: SPA READ ERR='
                      LS-IO-STATUS
           END-IF
           .
       1000-READ-SPA-EXIT.
           EXIT.
      *==========================================================*
      * 2000-READ-INPUT SECTION
      *==========================================================*
       2000-READ-INPUT SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-IO-PCB
                                WS-MSG-IN
           IF LS-IO-STATUS NOT = SPACES
              DISPLAY 'IMSCON01: MSG READ ERR='
                      LS-IO-STATUS
           END-IF
           .
       2000-READ-INPUT-EXIT.
           EXIT.
      *==========================================================*
      * 3000-PROCESS-STATE SECTION
      *==========================================================*
       3000-PROCESS-STATE SECTION.
           EVALUATE TRUE
              WHEN WS-STATE-INIT
                 PERFORM 3100-SHOW-MENU
                 SET WS-STATE-MENU TO TRUE
              WHEN WS-STATE-MENU
                 PERFORM 3200-PROCESS-MENU-CHOICE
              WHEN WS-STATE-CUSTSEL
                 PERFORM 3300-PROCESS-CUSTOMER-SELECT
              WHEN WS-STATE-DETAIL
                 PERFORM 3400-PROCESS-DETAIL-ACTION
              WHEN WS-STATE-CONFIRM
                 PERFORM 3500-PROCESS-CONFIRMATION
              WHEN WS-STATE-COMPLETE
                 PERFORM 3600-SHOW-COMPLETION
           END-EVALUATE
           .
       3000-PROCESS-STATE-EXIT.
           EXIT.
      *==========================================================*
      * 3100-SHOW-MENU SECTION
      *==========================================================*
       3100-SHOW-MENU SECTION.
           MOVE 'MENU: 1=INQUIRY 2=UPDATE 3=EXIT'
              TO WS-MO-OUTPUT
           PERFORM 5000-SEND-OUTPUT
           .
       3100-SHOW-MENU-EXIT.
           EXIT.
      *==========================================================*
      * 3200-PROCESS-MENU-CHOICE SECTION
      *==========================================================*
       3200-PROCESS-MENU-CHOICE SECTION.
           EVALUATE WS-MI-INPUT(1:1)
              WHEN '1'
                 MOVE 'ENTER CUSTOMER ID:'
                    TO WS-MO-OUTPUT
                 MOVE 'INQUIRY' TO WS-SPA-ACTION
                 SET WS-STATE-CUSTSEL TO TRUE
              WHEN '2'
                 MOVE 'ENTER CUSTOMER ID:'
                    TO WS-MO-OUTPUT
                 MOVE 'UPDATE' TO WS-SPA-ACTION
                 SET WS-STATE-CUSTSEL TO TRUE
              WHEN '3'
                 MOVE 'SESSION ENDED. GOODBYE.'
                    TO WS-MO-OUTPUT
                 SET WS-STATE-COMPLETE TO TRUE
              WHEN OTHER
                 MOVE 'INVALID CHOICE. TRY AGAIN.'
                    TO WS-MO-OUTPUT
           END-EVALUATE
           PERFORM 5000-SEND-OUTPUT
           .
       3200-PROCESS-MENU-CHOICE-EXIT.
           EXIT.
      *==========================================================*
      * 3300-PROCESS-CUSTOMER-SELECT SECTION
      *==========================================================*
       3300-PROCESS-CUSTOMER-SELECT SECTION.
           MOVE WS-MI-INPUT(1:10) TO WS-SPA-CUSTID
           MOVE 'CUSTOMER LOADED. CHOOSE ACTION:'
              TO WS-MO-OUTPUT
           SET WS-STATE-DETAIL TO TRUE
           PERFORM 5000-SEND-OUTPUT
           .
       3300-PROCESS-CUSTOMER-SELECT-EXIT.
           EXIT.
      *==========================================================*
      * 3400-PROCESS-DETAIL-ACTION SECTION
      *==========================================================*
       3400-PROCESS-DETAIL-ACTION SECTION.
           STRING 'CONFIRM ' DELIMITED SIZE
                  WS-SPA-ACTION DELIMITED SPACES
                  ' FOR ' DELIMITED SIZE
                  WS-SPA-CUSTID DELIMITED SPACES
                  '? (Y/N)' DELIMITED SIZE
                  INTO WS-MO-OUTPUT
           SET WS-STATE-CONFIRM TO TRUE
           PERFORM 5000-SEND-OUTPUT
           .
       3400-PROCESS-DETAIL-ACTION-EXIT.
           EXIT.
      *==========================================================*
      * 3500-PROCESS-CONFIRMATION SECTION
      *==========================================================*
       3500-PROCESS-CONFIRMATION SECTION.
           IF WS-MI-INPUT(1:1) = 'Y'
              STRING WS-SPA-ACTION DELIMITED SPACES
                     ' COMPLETED FOR ' DELIMITED SIZE
                     WS-SPA-CUSTID DELIMITED SPACES
                     INTO WS-MO-OUTPUT
              SET WS-STATE-COMPLETE TO TRUE
           ELSE
              MOVE 'CANCELLED. RETURNING TO MENU.'
                 TO WS-MO-OUTPUT
              SET WS-STATE-MENU TO TRUE
           END-IF
           PERFORM 5000-SEND-OUTPUT
           .
       3500-PROCESS-CONFIRMATION-EXIT.
           EXIT.
      *==========================================================*
      * 3600-SHOW-COMPLETION SECTION
      *==========================================================*
       3600-SHOW-COMPLETION SECTION.
           MOVE SPACES TO WS-SPA-STATE
           MOVE 'TRANSACTION COMPLETE.' TO WS-MO-OUTPUT
           PERFORM 5000-SEND-OUTPUT
           .
       3600-SHOW-COMPLETION-EXIT.
           EXIT.
      *==========================================================*
      * 4000-WRITE-SPA SECTION
      *==========================================================*
       4000-WRITE-SPA SECTION.
           CALL 'CBLTDLI' USING WS-FUNC-ISRT
                                LS-IO-PCB
                                WS-SPA-AREA
           IF LS-IO-STATUS NOT = SPACES
              DISPLAY 'IMSCON01: SPA WRITE ERR='
                      LS-IO-STATUS
           END-IF
           .
       4000-WRITE-SPA-EXIT.
           EXIT.
      *==========================================================*
      * 5000-SEND-OUTPUT SECTION
      *==========================================================*
       5000-SEND-OUTPUT SECTION.
           MOVE 212 TO WS-MO-LL
           MOVE 0   TO WS-MO-ZZ
           CALL 'CBLTDLI' USING WS-FUNC-ISRT
                                LS-IO-PCB
                                WS-MSG-OUT
           .
       5000-SEND-OUTPUT-EXIT.
           EXIT.`
  },

  {
    id: "IMSQRY03",
    tech: "ims",
    name: "Hierarchical Query",
    desc: "Consulta hierárquica com SSAs booleanas e command codes (D, F, L, N, U) para navegação avançada.",
    level: "advanced",
    filename: "IMSQRY03.cbl",
    tags: ["IMS", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : IMSQRY03
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CONSULTA HIERARQUICA AVANCADA
      *            SSAs COM OPERADORES BOOLEANOS E
      *            COMMAND CODES (D, F, L, N, U)
      * DL/I     : GU, GN, GNP COM COMMAND CODES
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. IMSQRY03.

       ENVIRONMENT DIVISION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-DLI-FUNCTIONS.
           05 WS-FUNC-GU         PIC X(04) VALUE 'GU  '.
           05 WS-FUNC-GN         PIC X(04) VALUE 'GN  '.
           05 WS-FUNC-GNP        PIC X(04) VALUE 'GNP '.
       01  WS-SSA-WITH-CMD-D.
           05 FILLER             PIC X(08) VALUE 'CUSTOMER'.
           05 FILLER             PIC X(01) VALUE '*'.
           05 FILLER             PIC X(01) VALUE 'D'.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-SSA-WITH-CMD-F.
           05 FILLER             PIC X(08) VALUE 'ORDER   '.
           05 FILLER             PIC X(01) VALUE '*'.
           05 FILLER             PIC X(01) VALUE 'F'.
           05 FILLER             PIC X(01) VALUE '('.
           05 FILLER             PIC X(08) VALUE 'STATUS  '.
           05 FILLER             PIC X(02) VALUE ' ='.
           05 WS-SSA-F-STATUS    PIC X(06) VALUE 'ACTIVE'.
           05 FILLER             PIC X(01) VALUE ')'.
       01  WS-SSA-WITH-CMD-L.
           05 FILLER             PIC X(08) VALUE 'ITEM    '.
           05 FILLER             PIC X(01) VALUE '*'.
           05 FILLER             PIC X(01) VALUE 'L'.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-SSA-WITH-CMD-N.
           05 FILLER             PIC X(08) VALUE 'ORDER   '.
           05 FILLER             PIC X(01) VALUE '*'.
           05 FILLER             PIC X(01) VALUE 'N'.
           05 FILLER             PIC X(01) VALUE ' '.
       01  WS-SSA-WITH-CMD-U.
           05 FILLER             PIC X(08) VALUE 'CUSTOMER'.
           05 FILLER             PIC X(01) VALUE '*'.
           05 FILLER             PIC X(01) VALUE 'U'.
           05 FILLER             PIC X(01) VALUE '('.
           05 FILLER             PIC X(08) VALUE 'REGION  '.
           05 FILLER             PIC X(02) VALUE ' ='.
           05 WS-SSA-U-REGION    PIC X(10) VALUE 'SOUTHEAST '.
           05 FILLER             PIC X(01) VALUE ')'.
       01  WS-SSA-BOOLEAN-QUAL.
           05 FILLER             PIC X(08) VALUE 'ORDER   '.
           05 FILLER             PIC X(01) VALUE '('.
           05 FILLER             PIC X(08) VALUE 'AMOUNT  '.
           05 FILLER             PIC X(02) VALUE '>='.
           05 WS-SSA-B-MIN-AMT   PIC X(10) VALUE '0000100000'.
           05 FILLER             PIC X(01) VALUE '&'.
           05 FILLER             PIC X(08) VALUE 'STATUS  '.
           05 FILLER             PIC X(02) VALUE ' ='.
           05 WS-SSA-B-STATUS    PIC X(06) VALUE 'ACTIVE'.
           05 FILLER             PIC X(01) VALUE ')'.
       01  WS-IO-AREA            PIC X(500).
       01  WS-MULTI-IO-AREAS.
           05 WS-MIO-CUST       PIC X(200).
           05 WS-MIO-ORDER      PIC X(200).
           05 WS-MIO-ITEM       PIC X(200).
       01  WS-QUERY-COUNT       PIC 9(05) COMP VALUE 0.
       01  WS-HIT-COUNT         PIC 9(05) COMP VALUE 0.

       LINKAGE SECTION.
       01  LS-PCB-MASK.
           05 LS-PCB-DBD-NAME    PIC X(08).
           05 LS-PCB-SEG-LEVEL   PIC XX.
           05 LS-PCB-STATUS      PIC XX.
           05 LS-PCB-PROC-OPT    PIC X(04).
           05 LS-PCB-RESERVED    PIC S9(05) COMP.
           05 LS-PCB-SEG-NAME    PIC X(08).
           05 LS-PCB-KEY-LENGTH  PIC S9(05) COMP.
           05 LS-PCB-SENSEG-CNT  PIC S9(05) COMP.
           05 LS-PCB-KEY-AREA    PIC X(50).

       PROCEDURE DIVISION USING LS-PCB-MASK.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-CMD-D-PATH-CALL
           PERFORM 2000-CMD-F-FIRST-OCCUR
           PERFORM 3000-CMD-L-LAST-OCCUR
           PERFORM 4000-CMD-N-IGNORE-PATH
           PERFORM 5000-CMD-U-MAINTAIN-POS
           PERFORM 6000-BOOLEAN-SSA-QUERY
           DISPLAY 'IMSQRY03: QUERIES=' WS-QUERY-COUNT
                   ' HITS=' WS-HIT-COUNT
           GOBACK
           .
       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-CMD-D-PATH-CALL SECTION
      *==========================================================*
       1000-CMD-D-PATH-CALL SECTION.
           ADD 1 TO WS-QUERY-COUNT
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-WITH-CMD-D
                                WS-SSA-WITH-CMD-F
                                WS-SSA-WITH-CMD-L
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-HIT-COUNT
              DISPLAY 'IMSQRY03: D-PATH OK '
                      LS-PCB-SEG-NAME
           ELSE
              DISPLAY 'IMSQRY03: D-PATH STATUS='
                      LS-PCB-STATUS
           END-IF
           .
       1000-CMD-D-PATH-CALL-EXIT.
           EXIT.
      *==========================================================*
      * 2000-CMD-F-FIRST-OCCUR SECTION
      *==========================================================*
       2000-CMD-F-FIRST-OCCUR SECTION.
           ADD 1 TO WS-QUERY-COUNT
           MOVE 'ACTIVE' TO WS-SSA-F-STATUS
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-WITH-CMD-F
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-HIT-COUNT
              DISPLAY 'IMSQRY03: F-FIRST OK '
                      LS-PCB-SEG-NAME
           END-IF
           .
       2000-CMD-F-FIRST-OCCUR-EXIT.
           EXIT.
      *==========================================================*
      * 3000-CMD-L-LAST-OCCUR SECTION
      *==========================================================*
       3000-CMD-L-LAST-OCCUR SECTION.
           ADD 1 TO WS-QUERY-COUNT
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-WITH-CMD-L
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-HIT-COUNT
              DISPLAY 'IMSQRY03: L-LAST OK '
                      LS-PCB-SEG-NAME
           END-IF
           .
       3000-CMD-L-LAST-OCCUR-EXIT.
           EXIT.
      *==========================================================*
      * 4000-CMD-N-IGNORE-PATH SECTION
      *==========================================================*
       4000-CMD-N-IGNORE-PATH SECTION.
           ADD 1 TO WS-QUERY-COUNT
           CALL 'CBLTDLI' USING WS-FUNC-GN
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-WITH-CMD-N
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-HIT-COUNT
              DISPLAY 'IMSQRY03: N-IGNORE OK '
                      LS-PCB-SEG-NAME
           END-IF
           .
       4000-CMD-N-IGNORE-PATH-EXIT.
           EXIT.
      *==========================================================*
      * 5000-CMD-U-MAINTAIN-POS SECTION
      *==========================================================*
       5000-CMD-U-MAINTAIN-POS SECTION.
           ADD 1 TO WS-QUERY-COUNT
           MOVE 'SOUTHEAST ' TO WS-SSA-U-REGION
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-WITH-CMD-U
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-HIT-COUNT
              DISPLAY 'IMSQRY03: U-MAINTAIN OK '
                      LS-PCB-SEG-NAME
           END-IF
           .
       5000-CMD-U-MAINTAIN-POS-EXIT.
           EXIT.
      *==========================================================*
      * 6000-BOOLEAN-SSA-QUERY SECTION
      *==========================================================*
       6000-BOOLEAN-SSA-QUERY SECTION.
           ADD 1 TO WS-QUERY-COUNT
           CALL 'CBLTDLI' USING WS-FUNC-GU
                                LS-PCB-MASK
                                WS-IO-AREA
                                WS-SSA-BOOLEAN-QUAL
           IF LS-PCB-STATUS = SPACES
              ADD 1 TO WS-HIT-COUNT
              DISPLAY 'IMSQRY03: BOOLEAN OK '
                      LS-PCB-SEG-NAME
           ELSE
              DISPLAY 'IMSQRY03: BOOLEAN STATUS='
                      LS-PCB-STATUS
           END-IF
           .
       6000-BOOLEAN-SSA-QUERY-EXIT.
           EXIT.`
  },


  {
    id: "ASMIGN01",
    tech: "ims",
    name: "GU/GN Básico (ASM)",
    desc: "Chamadas DL/I GU e GN em Assembler via ASMTDLI — leitura única e sequencial de segmentos.",
    level: "basic",
    filename: "ASMIGN01.hlasm",
    tags: ["HLASM","IMS","DL/I"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMIGN01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : DL/I GU E GN BASICO EM ASSEMBLER
*            ASMTDLI PARA LEITURA UNICA E SEQUENCIAL
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMIGN01 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R9,0(R1)             DB PCB ADDRESS
*
         MVC   FUNC,=CL4'GU  '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'SEGROOT '
         MVI   SSA1+9,C'('
         MVC   SSA1+10(7),=C'KEYROOT'
         MVC   SSA1+17(2),=C'= '
         MVC   SSA1+19(10),=CL10'EMP001    '
         MVI   SSA1+29,C')'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREA,SSA1)
*
         CLC   0(2,R9),=C'  '
         BNE   STERR
*
         MVC   WMSG(6),=C'GU OK='
         MVC   WMSG+6(30),IOAREA
         WTO   MF=(E,WTOMSG)
*
         MVC   FUNC,=CL4'GN  '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'SEGROOT '
         SR    R5,R5
*
GNLOOP   CALL  ASMTDLI,(FUNC,R9,IOAREA,SSA1)
         CLC   0(2,R9),=C'  '
         BNE   GNEND
         LA    R5,1(R5)
         B     GNLOOP
*
GNEND    CLC   0(2,R9),=C'GB'
         BNE   STERR
*
         CVD   R5,DWORK
         UNPK  WMSG+4(4),DWORK+6(2)
         OI    WMSG+7,X'F0'
         MVC   WMSG(4),=C'GN= '
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         B     EXIT
*
STERR    MVC   WMSG(8),=C'DLI ERR='
         MVC   WMSG+8(2),0(R9)
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
FUNC     DS    CL4
IOAREA   DS    CL500
SSA1     DS    CL40
WMSG     DS    CL60
BLANKS   DC    CL40' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMIGN01`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMIGN01
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : DL/I GU E GN BASICO EM ASSEMBLER
*            ASMTDLI PARA LEITURA UNICA E SEQUENCIAL
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMIGN01 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMIGN01         SET BASE (RELATIVE)
         USING ASMIGN01,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R9,0(R1)             DB PCB ADDRESS
*
         MVC   FUNC,=CL4'GU  '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'SEGROOT '
         MVI   SSA1+9,C'('
         MVC   SSA1+10(7),=C'KEYROOT'
         MVC   SSA1+17(2),=C'= '
         MVC   SSA1+19(10),=CL10'EMP001    '
         MVI   SSA1+29,C')'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREA,SSA1)
*
         CLC   0(2,R9),=C'  '
         JNE   STERR
*
         MVC   WMSG(6),=C'GU OK='
         MVC   WMSG+6(30),IOAREA
         WTO   MF=(E,WTOMSG)
*
         MVC   FUNC,=CL4'GN  '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'SEGROOT '
         SR    R5,R5
*
GNLOOP   CALL  ASMTDLI,(FUNC,R9,IOAREA,SSA1)
         CLC   0(2,R9),=C'  '
         JNE   GNEND
         LA    R5,1(R5)
         J     GNLOOP
*
GNEND    CLC   0(2,R9),=C'GB'
         JNE   STERR
*
         CVD   R5,DWORK
         UNPK  WMSG+4(4),DWORK+6(2)
         OI    WMSG+7,X'F0'
         MVC   WMSG(4),=C'GN= '
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         J     EXIT
*
STERR    MVC   WMSG(8),=C'DLI ERR='
         MVC   WMSG+8(2),0(R9)
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
FUNC     DS    CL4
IOAREA   DS    CL500
SSA1     DS    CL40
WMSG     DS    CL60
BLANKS   DC    CL40' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMIGN01`
  },

  {
    id: "ASMIHNV1",
    tech: "ims",
    name: "Hierarquia Multi-Nível (ASM)",
    desc: "Navegação pai-filho com GU, GN e GNP em HLASM — percorre 3 níveis hierárquicos do IMS.",
    level: "intermediate",
    filename: "ASMIHNV1.hlasm",
    tags: ["HLASM","IMS","DL/I","GNP"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMIHNV1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : NAVEGACAO HIERARQUICA IMS EM ASSEMBLER
*            GU ROOT -> GNP CHILD -> GNP GRANDCHILD (3 NIVEIS)
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMIHNV1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R9,0(R1)             DB PCB ADDRESS
*
         MVC   FUNC,=CL4'GU  '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'CLIENTE '
         MVI   SSA1+9,C'('
         MVC   SSA1+10(6),=C'NUMCLI'
         MVC   SSA1+16(2),=C'= '
         MVC   SSA1+18(10),=CL10'CLI00100  '
         MVI   SSA1+28,C')'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREAP,SSA1)
         CLC   0(2,R9),=C'  '
         BNE   STERR
*
         MVC   WMSG(10),=C'CLIENTE:  '
         MVC   WMSG+10(30),IOAREAP
         WTO   MF=(E,WTOMSG)
*
         MVC   FUNC,=CL4'GNP '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'CONTA   '
         SR    R5,R5
*
LPCONTA  CALL  ASMTDLI,(FUNC,R9,IOAREAF,SSA1)
         CLC   0(2,R9),=C'  '
         BNE   CNTEND
*
         LA    R5,1(R5)
*
         MVC   FUNCN,=CL4'GNP '
         MVC   SSA2,BLANKS
         MVC   SSA2(9),=C'MOVIMENT'
         SR    R6,R6
*
LPMOV    CALL  ASMTDLI,(FUNCN,R9,IOAREAN,SSA2)
         CLC   0(2,R9),=C'  '
         BNE   MOVEND
         LA    R6,1(R6)
         B     LPMOV
*
MOVEND   CLC   0(2,R9),=C'GE'
         BE    LPCONTA
         B     CNTEND
*
CNTEND   CVD   R5,DWORK
         UNPK  WMSG+8(4),DWORK+6(2)
         OI    WMSG+11,X'F0'
         MVC   WMSG(8),=C'CONTAS= '
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         B     EXIT
*
STERR    MVC   WMSG(8),=C'DLI ERR='
         MVC   WMSG+8(2),0(R9)
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
FUNC     DS    CL4
FUNCN    DS    CL4
IOAREAP  DS    CL200
IOAREAF  DS    CL200
IOAREAN  DS    CL200
SSA1     DS    CL40
SSA2     DS    CL40
WMSG     DS    CL60
BLANKS   DC    CL40' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMIHNV1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMIHNV1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : NAVEGACAO HIERARQUICA IMS EM ASSEMBLER
*            GU ROOT -> GNP CHILD -> GNP GRANDCHILD (3 NIVEIS)
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMIHNV1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMIHNV1         SET BASE (RELATIVE)
         USING ASMIHNV1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R9,0(R1)             DB PCB ADDRESS
*
         MVC   FUNC,=CL4'GU  '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'CLIENTE '
         MVI   SSA1+9,C'('
         MVC   SSA1+10(6),=C'NUMCLI'
         MVC   SSA1+16(2),=C'= '
         MVC   SSA1+18(10),=CL10'CLI00100  '
         MVI   SSA1+28,C')'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREAP,SSA1)
         CLC   0(2,R9),=C'  '
         JNE   STERR
*
         MVC   WMSG(10),=C'CLIENTE:  '
         MVC   WMSG+10(30),IOAREAP
         WTO   MF=(E,WTOMSG)
*
         MVC   FUNC,=CL4'GNP '
         MVC   SSA1,BLANKS
         MVC   SSA1(9),=C'CONTA   '
         SR    R5,R5
*
LPCONTA  CALL  ASMTDLI,(FUNC,R9,IOAREAF,SSA1)
         CLC   0(2,R9),=C'  '
         JNE   CNTEND
*
         LA    R5,1(R5)
*
         MVC   FUNCN,=CL4'GNP '
         MVC   SSA2,BLANKS
         MVC   SSA2(9),=C'MOVIMENT'
         SR    R6,R6
*
LPMOV    CALL  ASMTDLI,(FUNCN,R9,IOAREAN,SSA2)
         CLC   0(2,R9),=C'  '
         JNE   MOVEND
         LA    R6,1(R6)
         J     LPMOV
*
MOVEND   CLC   0(2,R9),=C'GE'
         JE    LPCONTA
         J     CNTEND
*
CNTEND   CVD   R5,DWORK
         UNPK  WMSG+8(4),DWORK+6(2)
         OI    WMSG+11,X'F0'
         MVC   WMSG(8),=C'CONTAS= '
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         J     EXIT
*
STERR    MVC   WMSG(8),=C'DLI ERR='
         MVC   WMSG+8(2),0(R9)
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
FUNC     DS    CL4
FUNCN    DS    CL4
IOAREAP  DS    CL200
IOAREAF  DS    CL200
IOAREAN  DS    CL200
SSA1     DS    CL40
SSA2     DS    CL40
WMSG     DS    CL60
BLANKS   DC    CL40' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMIHNV1`
  },

  {
    id: "ASMICHK1",
    tech: "ims",
    name: "BMP com Checkpoint (ASM)",
    desc: "BMP batch em HLASM com CHKP/XRST para checkpoint/restart e processamento com contagem.",
    level: "advanced",
    filename: "ASMICHK1.hlasm",
    tags: ["HLASM","IMS","BMP","CHKP"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMICHK1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : BMP BATCH COM CHECKPOINT/RESTART EM ASSEMBLER
*            CHKP PERIODICO + XRST PARA RECUPERACAO
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMICHK1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R9,0(R1)             IO PCB
         L     R10,4(R1)            DB PCB
*
         MVC   FUNC,=CL4'XRST'
         MVC   IOAREA,BLANKS250
         MVC   RSTID,=CL8'ASMICHK1'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREA,RSTID)
         CLC   0(2,R9),=C'  '
         BE    RESTARTED
*
         SR    R5,R5
         B     PROCESS
*
RESTARTED DS   0H
         L     R5,SVCOUNT
*
PROCESS  MVC   FUNC,=CL4'GN  '
         MVC   SSA1,BLANKS40
         MVC   SSA1(9),=C'TRANSACT'
*
MAINLP   CALL  ASMTDLI,(FUNC,R10,IOAREA,SSA1)
         CLC   0(2,R10),=C'  '
         BNE   ENDPROC
*
         LA    R5,1(R5)
*
         LR    R6,R5
         N     R6,=F'511'
         BNZ   MAINLP
*
         ST    R5,SVCOUNT
         MVC   FUNC,=CL4'CHKP'
         MVC   RSTID,=CL8'ASMICHK1'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREA,RSTID)
         CLC   0(2,R9),=C'  '
         BNE   CHKERR
*
         MVC   FUNC,=CL4'GN  '
         B     MAINLP
*
ENDPROC  CLC   0(2,R10),=C'QC'
         BNE   STERR
*
         ST    R5,SVCOUNT
         MVC   FUNC,=CL4'CHKP'
         CALL  ASMTDLI,(FUNC,R9,IOAREA,RSTID)
*
         CVD   R5,DWORK
         UNPK  WMSG+12(8),DWORK
         OI    WMSG+19,X'F0'
         MVC   WMSG(12),=C'PROCESSADOS='
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         B     EXIT
*
CHKERR   MVC   WMSG(10),=C'CHKP ERRO='
         MVC   WMSG+10(2),0(R9)
         WTO   MF=(E,WTOMSG)
         LA    R15,12
         B     EXIT
*
STERR    MVC   WMSG(10),=C'DLI  ERRO='
         MVC   WMSG+10(2),0(R10)
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
SVCOUNT  DS    F
FUNC     DS    CL4
RSTID    DS    CL8
IOAREA   DS    CL500
SSA1     DS    CL40
WMSG     DS    CL60
BLANKS40 DC    CL40' '
BLANKS250 DC   CL250' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMICHK1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMICHK1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : BMP BATCH COM CHECKPOINT/RESTART EM ASSEMBLER
*            CHKP PERIODICO + XRST PARA RECUPERACAO
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMICHK1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMICHK1         SET BASE (RELATIVE)
         USING ASMICHK1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         L     R9,0(R1)             IO PCB
         L     R10,4(R1)            DB PCB
*
         MVC   FUNC,=CL4'XRST'
         MVC   IOAREA,BLANKS250
         MVC   RSTID,=CL8'ASMICHK1'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREA,RSTID)
         CLC   0(2,R9),=C'  '
         JE    RESTARTED
*
         SR    R5,R5
         J     PROCESS
*
RESTARTED DS   0H
         L     R5,SVCOUNT
*
PROCESS  MVC   FUNC,=CL4'GN  '
         MVC   SSA1,BLANKS40
         MVC   SSA1(9),=C'TRANSACT'
*
MAINLP   CALL  ASMTDLI,(FUNC,R10,IOAREA,SSA1)
         CLC   0(2,R10),=C'  '
         JNE   ENDPROC
*
         LA    R5,1(R5)
*
         LR    R6,R5
         N     R6,=F'511'
         JNZ   MAINLP
*
         ST    R5,SVCOUNT
         MVC   FUNC,=CL4'CHKP'
         MVC   RSTID,=CL8'ASMICHK1'
*
         CALL  ASMTDLI,(FUNC,R9,IOAREA,RSTID)
         CLC   0(2,R9),=C'  '
         JNE   CHKERR
*
         MVC   FUNC,=CL4'GN  '
         J     MAINLP
*
ENDPROC  CLC   0(2,R10),=C'QC'
         JNE   STERR
*
         ST    R5,SVCOUNT
         MVC   FUNC,=CL4'CHKP'
         CALL  ASMTDLI,(FUNC,R9,IOAREA,RSTID)
*
         CVD   R5,DWORK
         UNPK  WMSG+12(8),DWORK
         OI    WMSG+19,X'F0'
         MVC   WMSG(12),=C'PROCESSADOS='
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         J     EXIT
*
CHKERR   MVC   WMSG(10),=C'CHKP ERRO='
         MVC   WMSG+10(2),0(R9)
         WTO   MF=(E,WTOMSG)
         LA    R15,12
         J     EXIT
*
STERR    MVC   WMSG(10),=C'DLI  ERRO='
         MVC   WMSG+10(2),0(R10)
         WTO   MF=(E,WTOMSG)
         LA    R15,8
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
SAVE     DS    18F
DWORK    DS    D
SVCOUNT  DS    F
FUNC     DS    CL4
RSTID    DS    CL8
IOAREA   DS    CL500
SSA1     DS    CL40
WMSG     DS    CL60
BLANKS40 DC    CL40' '
BLANKS250 DC   CL250' '
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMICHK1`
  },
  // ========================================================================
  // VSAM (14 programas — 11 COBOL + 3 HLASM)
  // ========================================================================

  {
    id: "VSAMCMP",
    tech: "vsam",
    name: "Comparador de Arquivos",
    desc: "Compara dois arquivos KSDS registro a registro, reportando inclusões, exclusões e alterações.",
    level: "intermediate",
    filename: "VSAMCMP.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMCMP
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : COMPARADOR DE ARQUIVOS VSAM KSDS
      *            LE DOIS KSDS EM PARALELO POR CHAVE,
      *            REPORTA INCLUSOES, EXCLUSOES E ALTERACOES
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMCMP.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT MASTER-FILE ASSIGN TO VSAMOLD
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS SEQUENTIAL
               RECORD KEY   IS MF-KEY
               FILE STATUS  IS WS-FS-MASTER.

           SELECT COMPARE-FILE ASSIGN TO VSAMNEW
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS SEQUENTIAL
               RECORD KEY   IS CF-KEY
               FILE STATUS  IS WS-FS-COMPARE.

           SELECT REPORT-FILE ASSIGN TO RPTOUT
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS  IS WS-FS-REPORT.

       DATA DIVISION.
       FILE SECTION.
       FD  MASTER-FILE.
       01  MASTER-REC.
           05 MF-KEY              PIC X(10).
           05 MF-DATA             PIC X(190).
       FD  COMPARE-FILE.
       01  COMPARE-REC.
           05 CF-KEY              PIC X(10).
           05 CF-DATA             PIC X(190).
       FD  REPORT-FILE.
       01  REPORT-REC             PIC X(132).

       WORKING-STORAGE SECTION.
       01  WS-FS-MASTER           PIC X(02).
       01  WS-FS-COMPARE          PIC X(02).
       01  WS-FS-REPORT           PIC X(02).
       01  WS-EOF-MASTER          PIC X(01) VALUE 'N'.
           88 EOF-MASTER          VALUE 'Y'.
       01  WS-EOF-COMPARE         PIC X(01) VALUE 'N'.
           88 EOF-COMPARE         VALUE 'Y'.
       01  WS-CTR-ADD             PIC 9(07) VALUE ZERO.
       01  WS-CTR-DEL             PIC 9(07) VALUE ZERO.
       01  WS-CTR-CHG             PIC 9(07) VALUE ZERO.
       01  WS-CTR-EQ              PIC 9(07) VALUE ZERO.
       01  WS-RPT-LINE            PIC X(132).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-OPEN-FILES
           PERFORM 1100-READ-MASTER
           PERFORM 1200-READ-COMPARE
           PERFORM 2000-COMPARE-LOOP
               UNTIL EOF-MASTER AND EOF-COMPARE
           PERFORM 3000-WRITE-SUMMARY
           PERFORM 9000-CLOSE-FILES
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-OPEN-FILES SECTION
      *==========================================================*
       1000-OPEN-FILES SECTION.
           OPEN INPUT  MASTER-FILE
           IF WS-FS-MASTER NOT = '00'
               DISPLAY 'ERRO OPEN MASTER: ' WS-FS-MASTER
               STOP RUN
           END-IF
           OPEN INPUT  COMPARE-FILE
           OPEN OUTPUT REPORT-FILE.

       1000-OPEN-FILES-EXIT.
           EXIT.
      *==========================================================*
      * 1100-READ-MASTER SECTION
      *==========================================================*
       1100-READ-MASTER SECTION.
           READ MASTER-FILE
           IF WS-FS-MASTER = '10'
               SET EOF-MASTER TO TRUE
           END-IF.

       1100-READ-MASTER-EXIT.
           EXIT.
      *==========================================================*
      * 1200-READ-COMPARE SECTION
      *==========================================================*
       1200-READ-COMPARE SECTION.
           READ COMPARE-FILE
           IF WS-FS-COMPARE = '10'
               SET EOF-COMPARE TO TRUE
           END-IF.

       1200-READ-COMPARE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-COMPARE-LOOP SECTION
      *==========================================================*
       2000-COMPARE-LOOP SECTION.
           EVALUATE TRUE
               WHEN EOF-MASTER AND NOT EOF-COMPARE
                   ADD 1 TO WS-CTR-ADD
                   STRING 'ADD ' CF-KEY DELIMITED SIZE
                       INTO WS-RPT-LINE
                   WRITE REPORT-REC FROM WS-RPT-LINE
                   PERFORM 1200-READ-COMPARE
               WHEN NOT EOF-MASTER AND EOF-COMPARE
                   ADD 1 TO WS-CTR-DEL
                   STRING 'DEL ' MF-KEY DELIMITED SIZE
                       INTO WS-RPT-LINE
                   WRITE REPORT-REC FROM WS-RPT-LINE
                   PERFORM 1100-READ-MASTER
               WHEN MF-KEY < CF-KEY
                   ADD 1 TO WS-CTR-DEL
                   STRING 'DEL ' MF-KEY DELIMITED SIZE
                       INTO WS-RPT-LINE
                   WRITE REPORT-REC FROM WS-RPT-LINE
                   PERFORM 1100-READ-MASTER
               WHEN MF-KEY > CF-KEY
                   ADD 1 TO WS-CTR-ADD
                   STRING 'ADD ' CF-KEY DELIMITED SIZE
                       INTO WS-RPT-LINE
                   WRITE REPORT-REC FROM WS-RPT-LINE
                   PERFORM 1200-READ-COMPARE
               WHEN MF-KEY = CF-KEY
                   IF MF-DATA NOT = CF-DATA
                       ADD 1 TO WS-CTR-CHG
                       STRING 'CHG ' MF-KEY DELIMITED SIZE
                           INTO WS-RPT-LINE
                       WRITE REPORT-REC FROM WS-RPT-LINE
                   ELSE
                       ADD 1 TO WS-CTR-EQ
                   END-IF
                   PERFORM 1100-READ-MASTER
                   PERFORM 1200-READ-COMPARE
           END-EVALUATE.

       2000-COMPARE-LOOP-EXIT.
           EXIT.
      *==========================================================*
      * 3000-WRITE-SUMMARY SECTION
      *==========================================================*
       3000-WRITE-SUMMARY SECTION.
           STRING 'RESUMO: ADD=' WS-CTR-ADD
                  ' DEL=' WS-CTR-DEL
                  ' CHG=' WS-CTR-CHG
                  ' EQ='  WS-CTR-EQ
                  DELIMITED SIZE INTO WS-RPT-LINE
           WRITE REPORT-REC FROM WS-RPT-LINE.

       3000-WRITE-SUMMARY-EXIT.
           EXIT.
      *==========================================================*
      * 9000-CLOSE-FILES SECTION
      *==========================================================*
       9000-CLOSE-FILES SECTION.
           CLOSE MASTER-FILE COMPARE-FILE REPORT-FILE.
       9000-CLOSE-FILES-EXIT.
           EXIT.`
  },

  {
    id: "VSAMEXT",
    tech: "vsam",
    name: "Extrator de Dados",
    desc: "Lê e extrai registros com filtros por faixa de chave e conteúdo de campos específicos.",
    level: "intermediate",
    filename: "VSAMEXT.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMEXT
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : EXTRATOR DE DADOS VSAM COM FILTROS
      *            SELECIONA POR FAIXA DE CHAVE E CONTEUDO
      *            DE CAMPOS, GRAVANDO EM ARQUIVO SEQUENCIAL
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMEXT.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT VSAM-INPUT ASSIGN TO VSAMIN
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS DYNAMIC
               RECORD KEY   IS VI-KEY
               FILE STATUS  IS WS-FS-VSAM.

           SELECT SEQ-OUTPUT ASSIGN TO SEQOUT
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS  IS WS-FS-SEQ.

       DATA DIVISION.
       FILE SECTION.
       FD  VSAM-INPUT.
       01  VSAM-REC.
           05 VI-KEY              PIC X(10).
           05 VI-NOME             PIC X(40).
           05 VI-TIPO             PIC X(02).
           05 VI-STATUS           PIC X(01).
           05 VI-VALOR            PIC S9(09)V99 COMP-3.
           05 VI-DATA-ULT         PIC X(10).
           05 FILLER              PIC X(127).
       FD  SEQ-OUTPUT.
       01  SEQ-REC                PIC X(200).

       WORKING-STORAGE SECTION.
       01  WS-FS-VSAM             PIC X(02).
       01  WS-FS-SEQ              PIC X(02).
       01  WS-EOF                 PIC X(01) VALUE 'N'.
           88 END-OF-FILE         VALUE 'Y'.
       01  WS-PARMS.
           05 WS-KEY-FROM         PIC X(10).
           05 WS-KEY-TO           PIC X(10).
           05 WS-FILTER-TIPO      PIC X(02).
           05 WS-FILTER-STATUS    PIC X(01).
           05 WS-FILTER-VAL-MIN   PIC S9(09)V99 COMP-3.
       01  WS-CTR-READ            PIC 9(09) VALUE ZERO.
       01  WS-CTR-EXTRACT         PIC 9(09) VALUE ZERO.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-INITIALIZE
           PERFORM 2000-POSITION-START
           PERFORM 3000-EXTRACT-LOOP
               UNTIL END-OF-FILE
           PERFORM 9000-FINALIZE
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-INITIALIZE SECTION
      *==========================================================*
       1000-INITIALIZE SECTION.
           MOVE 'CLI0001000' TO WS-KEY-FROM
           MOVE 'CLI0009999' TO WS-KEY-TO
           MOVE 'PF'         TO WS-FILTER-TIPO
           MOVE 'A'          TO WS-FILTER-STATUS
           MOVE 1000.00      TO WS-FILTER-VAL-MIN
           OPEN INPUT  VSAM-INPUT
           IF WS-FS-VSAM NOT = '00'
               DISPLAY 'ERRO OPEN VSAM: ' WS-FS-VSAM
               STOP RUN
           END-IF
           OPEN OUTPUT SEQ-OUTPUT.

       1000-INITIALIZE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-POSITION-START SECTION
      *==========================================================*
       2000-POSITION-START SECTION.
           MOVE WS-KEY-FROM TO VI-KEY
           START VSAM-INPUT
               KEY IS NOT LESS THAN VI-KEY
           IF WS-FS-VSAM NOT = '00'
               IF WS-FS-VSAM = '23'
                   SET END-OF-FILE TO TRUE
               ELSE
                   DISPLAY 'ERRO START: ' WS-FS-VSAM
                   STOP RUN
               END-IF
           END-IF.

       2000-POSITION-START-EXIT.
           EXIT.
      *==========================================================*
      * 3000-EXTRACT-LOOP SECTION
      *==========================================================*
       3000-EXTRACT-LOOP SECTION.
           READ VSAM-INPUT NEXT
           EVALUATE WS-FS-VSAM
               WHEN '00'
                   ADD 1 TO WS-CTR-READ
                   IF VI-KEY > WS-KEY-TO
                       SET END-OF-FILE TO TRUE
                   ELSE
                       PERFORM 3100-APPLY-FILTERS
                   END-IF
               WHEN '10'
                   SET END-OF-FILE TO TRUE
               WHEN OTHER
                   DISPLAY 'ERRO READ NEXT: ' WS-FS-VSAM
                   SET END-OF-FILE TO TRUE
           END-EVALUATE.

       3000-EXTRACT-LOOP-EXIT.
           EXIT.
      *==========================================================*
      * 3100-APPLY-FILTERS SECTION
      *==========================================================*
       3100-APPLY-FILTERS SECTION.
           IF (WS-FILTER-TIPO = SPACES
               OR VI-TIPO = WS-FILTER-TIPO)
             AND (WS-FILTER-STATUS = SPACES
               OR VI-STATUS = WS-FILTER-STATUS)
             AND VI-VALOR >= WS-FILTER-VAL-MIN
               ADD 1 TO WS-CTR-EXTRACT
               WRITE SEQ-REC FROM VSAM-REC
           END-IF.

       3100-APPLY-FILTERS-EXIT.
           EXIT.
      *==========================================================*
      * 9000-FINALIZE SECTION
      *==========================================================*
       9000-FINALIZE SECTION.
           DISPLAY 'REGISTROS LIDOS    : ' WS-CTR-READ
           DISPLAY 'REGISTROS EXTRAIDOS: ' WS-CTR-EXTRACT
           CLOSE VSAM-INPUT SEQ-OUTPUT.
       9000-FINALIZE-EXIT.
           EXIT.`
  },

  {
    id: "VSAMFSD",
    tech: "vsam",
    name: "Decodificador de File-Status",
    desc: "Traduz códigos FILE STATUS do VSAM em mensagens descritivas legíveis.",
    level: "basic",
    filename: "VSAMFSD.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMFSD
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : DECODIFICADOR DE FILE STATUS VSAM
      *            RECEBE CODIGO FILE STATUS E RETORNA
      *            MENSAGEM DESCRITIVA VIA LINKAGE
      * NIVEL    : BASICO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMFSD.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-MSG-TABLE.
           05 FILLER PIC X(52) VALUE
              '00OPERACAO BEM SUCEDIDA                          '.
           05 FILLER PIC X(52) VALUE
              '02CHAVE DUPLICADA - ALTERNATE KEY                '.
           05 FILLER PIC X(52) VALUE
              '10FIM DE ARQUIVO ATINGIDO                        '.
           05 FILLER PIC X(52) VALUE
              '22CHAVE DUPLICADA NA GRAVACAO                    '.
           05 FILLER PIC X(52) VALUE
              '23REGISTRO NAO ENCONTRADO                        '.
           05 FILLER PIC X(52) VALUE
              '24LIMITE DE ESPACO ATINGIDO NO CLUSTER            '.
           05 FILLER PIC X(52) VALUE
              '35ARQUIVO NAO ENCONTRADO (OPEN)                  '.
           05 FILLER PIC X(52) VALUE
              '39CONFLITO DE ATRIBUTOS NO OPEN                  '.
           05 FILLER PIC X(52) VALUE
              '41ARQUIVO JA ESTA ABERTO                         '.
           05 FILLER PIC X(52) VALUE
              '42ARQUIVO JA ESTA FECHADO                        '.
           05 FILLER PIC X(52) VALUE
              '46READ SEQUENCIAL SEM POSICAO VALIDA             '.
           05 FILLER PIC X(52) VALUE
              '47READ NAO PERMITIDO NESTE MODO                  '.
           05 FILLER PIC X(52) VALUE
              '48WRITE NAO PERMITIDO NESTE MODO                 '.
           05 FILLER PIC X(52) VALUE
              '49REWRITE/DELETE SEM READ PREVIO                 '.
           05 FILLER PIC X(52) VALUE
              '68RECORD LOCK - REGISTRO EM USO                  '.
           05 FILLER PIC X(52) VALUE
              '92ERRO DE LOGICA - ACESSO INVALIDO               '.
           05 FILLER PIC X(52) VALUE
              '93RECURSO VSAM NAO DISPONIVEL                    '.
       01  WS-MSG-REDEF REDEFINES WS-MSG-TABLE.
           05 WS-MSG-ENTRY OCCURS 17.
               10 WS-MSG-CODE      PIC X(02).
               10 WS-MSG-TEXT      PIC X(50).
       01  WS-IDX                  PIC 9(02).
       01  WS-FOUND                PIC X(01).

       LINKAGE SECTION.
       01  LS-FILE-STATUS          PIC X(02).
       01  LS-MENSAGEM             PIC X(50).
       01  LS-SEVERIDADE           PIC X(01).
           88 LS-SEV-INFO          VALUE 'I'.
           88 LS-SEV-WARNING       VALUE 'W'.
           88 LS-SEV-ERROR         VALUE 'E'.

       PROCEDURE DIVISION USING LS-FILE-STATUS
                                  LS-MENSAGEM
                                  LS-SEVERIDADE.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-DECODE-STATUS
           GOBACK.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-DECODE-STATUS SECTION
      *==========================================================*
       1000-DECODE-STATUS SECTION.
           MOVE 'N' TO WS-FOUND
           PERFORM VARYING WS-IDX FROM 1 BY 1
               UNTIL WS-IDX > 17 OR WS-FOUND = 'Y'
               IF WS-MSG-CODE(WS-IDX) = LS-FILE-STATUS
                   MOVE WS-MSG-TEXT(WS-IDX) TO LS-MENSAGEM
                   MOVE 'Y' TO WS-FOUND
               END-IF
           END-PERFORM
           IF WS-FOUND = 'N'
               STRING 'FILE STATUS DESCONHECIDO: '
                      LS-FILE-STATUS
                      DELIMITED SIZE INTO LS-MENSAGEM
           END-IF
           PERFORM 2000-SET-SEVERITY.

       1000-DECODE-STATUS-EXIT.
           EXIT.
      *==========================================================*
      * 2000-SET-SEVERITY SECTION
      *==========================================================*
       2000-SET-SEVERITY SECTION.
           EVALUATE LS-FILE-STATUS
               WHEN '00'
               WHEN '02'
                   SET LS-SEV-INFO    TO TRUE
               WHEN '10'
               WHEN '23'
                   SET LS-SEV-WARNING TO TRUE
               WHEN OTHER
                   SET LS-SEV-ERROR   TO TRUE
           END-EVALUATE.
       2000-SET-SEVERITY-EXIT.
           EXIT.`
  },

  {
    id: "VSAMSTAT",
    tech: "vsam",
    name: "Estatísticas VSAM",
    desc: "Coleta estatísticas de um KSDS — total de registros, chave mínima/máxima e tamanho acumulado.",
    level: "intermediate",
    filename: "VSAMSTAT.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMSTAT
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : COLETOR DE ESTATISTICAS VSAM
      *            PERCORRE KSDS SEQUENCIALMENTE E COLETA:
      *            TOTAL REGISTROS, CHAVE MIN/MAX, TAMANHO
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMSTAT.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT VSAM-FILE ASSIGN TO VSAMFL
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS SEQUENTIAL
               RECORD KEY   IS VF-KEY
               FILE STATUS  IS WS-FS.

       DATA DIVISION.
       FILE SECTION.
       FD  VSAM-FILE.
       01  VSAM-REC.
           05 VF-KEY              PIC X(10).
           05 VF-DATA             PIC X(190).

       WORKING-STORAGE SECTION.
       01  WS-FS                  PIC X(02).
       01  WS-EOF                 PIC X(01) VALUE 'N'.
           88 END-OF-FILE         VALUE 'Y'.
       01  WS-STATS.
           05 WS-TOTAL-RECS      PIC 9(09) VALUE ZERO.
           05 WS-MIN-KEY          PIC X(10) VALUE HIGH-VALUES.
           05 WS-MAX-KEY          PIC X(10) VALUE LOW-VALUES.
           05 WS-TOTAL-SIZE       PIC 9(12) VALUE ZERO.
           05 WS-REC-LEN          PIC 9(05) VALUE 200.
       01  WS-RPT-LINE            PIC X(80).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-OPEN-FILE
           PERFORM 2000-COLLECT-STATS
               UNTIL END-OF-FILE
           PERFORM 3000-PRINT-REPORT
           PERFORM 9000-CLOSE-FILE
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-OPEN-FILE SECTION
      *==========================================================*
       1000-OPEN-FILE SECTION.
           OPEN INPUT VSAM-FILE
           IF WS-FS NOT = '00'
               DISPLAY 'ERRO OPEN: ' WS-FS
               STOP RUN
           END-IF.

       1000-OPEN-FILE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-COLLECT-STATS SECTION
      *==========================================================*
       2000-COLLECT-STATS SECTION.
           READ VSAM-FILE
           EVALUATE WS-FS
               WHEN '00'
                   ADD 1 TO WS-TOTAL-RECS
                   ADD WS-REC-LEN TO WS-TOTAL-SIZE
                   IF VF-KEY < WS-MIN-KEY
                       MOVE VF-KEY TO WS-MIN-KEY
                   END-IF
                   IF VF-KEY > WS-MAX-KEY
                       MOVE VF-KEY TO WS-MAX-KEY
                   END-IF
               WHEN '10'
                   SET END-OF-FILE TO TRUE
               WHEN OTHER
                   DISPLAY 'ERRO READ: ' WS-FS
                   SET END-OF-FILE TO TRUE
           END-EVALUATE.

       2000-COLLECT-STATS-EXIT.
           EXIT.
      *==========================================================*
      * 3000-PRINT-REPORT SECTION
      *==========================================================*
       3000-PRINT-REPORT SECTION.
           DISPLAY '======================================'
           DISPLAY ' ESTATISTICAS DO ARQUIVO VSAM'
           DISPLAY '======================================'
           DISPLAY ' TOTAL REGISTROS : ' WS-TOTAL-RECS
           DISPLAY ' CHAVE MINIMA    : ' WS-MIN-KEY
           DISPLAY ' CHAVE MAXIMA    : ' WS-MAX-KEY
           DISPLAY ' TAMANHO TOTAL   : ' WS-TOTAL-SIZE
                   ' BYTES'
           DISPLAY '======================================'.

       3000-PRINT-REPORT-EXIT.
           EXIT.
      *==========================================================*
      * 9000-CLOSE-FILE SECTION
      *==========================================================*
       9000-CLOSE-FILE SECTION.
           CLOSE VSAM-FILE.
       9000-CLOSE-FILE-EXIT.
           EXIT.`
  },

  {
    id: "VSAMKSDS",
    tech: "vsam",
    name: "Operações KSDS",
    desc: "CRUD completo em KSDS com ACCESS MODE DYNAMIC — leitura randômica, sequencial, inclusão, alteração e exclusão.",
    level: "intermediate",
    filename: "VSAMKSDS.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMKSDS
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : CRUD COMPLETO EM VSAM KSDS
      *            ACCESS MODE DYNAMIC PARA ACESSO RANDOMICO
      *            E SEQUENCIAL NO MESMO PROGRAMA
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMKSDS.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT KSDS-FILE ASSIGN TO VSAMKSDS
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS DYNAMIC
               RECORD KEY   IS KF-KEY
               FILE STATUS  IS WS-FS.

       DATA DIVISION.
       FILE SECTION.
       FD  KSDS-FILE.
       01  KSDS-REC.
           05 KF-KEY              PIC X(08).
           05 KF-NOME             PIC X(40).
           05 KF-SALDO            PIC S9(11)V99 COMP-3.
           05 KF-STATUS           PIC X(01).
           05 KF-DT-ULT-MOV      PIC X(10).
           05 FILLER              PIC X(133).

       WORKING-STORAGE SECTION.
       01  WS-FS                  PIC X(02).
       01  WS-OPERACAO            PIC X(01).
           88 OP-READ             VALUE 'R'.
           88 OP-WRITE            VALUE 'W'.
           88 OP-REWRITE          VALUE 'U'.
           88 OP-DELETE            VALUE 'D'.
           88 OP-BROWSE           VALUE 'B'.
       01  WS-MSG                 PIC X(50).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           OPEN I-O KSDS-FILE
           IF WS-FS NOT = '00'
               DISPLAY 'ERRO OPEN I-O: ' WS-FS
               STOP RUN
           END-IF
           PERFORM 1000-INSERT-REC
           PERFORM 2000-READ-RANDOM
           PERFORM 3000-UPDATE-REC
           PERFORM 4000-BROWSE-SEQUENTIAL
           PERFORM 5000-DELETE-REC
           CLOSE KSDS-FILE
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-INSERT-REC SECTION
      *==========================================================*
       1000-INSERT-REC SECTION.
           INITIALIZE KSDS-REC
           MOVE 'ACC00001' TO KF-KEY
           MOVE 'JOAO DA SILVA' TO KF-NOME
           MOVE 15000.50 TO KF-SALDO
           MOVE 'A'       TO KF-STATUS
           MOVE '2026-04-15' TO KF-DT-ULT-MOV
           WRITE KSDS-REC
           EVALUATE WS-FS
               WHEN '00'
                   DISPLAY 'INSERT OK: ' KF-KEY
               WHEN '22'
                   DISPLAY 'CHAVE DUPLICADA: ' KF-KEY
               WHEN OTHER
                   DISPLAY 'ERRO WRITE: ' WS-FS
           END-EVALUATE.

       1000-INSERT-REC-EXIT.
           EXIT.
      *==========================================================*
      * 2000-READ-RANDOM SECTION
      *==========================================================*
       2000-READ-RANDOM SECTION.
           MOVE 'ACC00001' TO KF-KEY
           READ KSDS-FILE
           EVALUATE WS-FS
               WHEN '00'
                   DISPLAY 'READ OK: ' KF-NOME
                           ' SALDO=' KF-SALDO
               WHEN '23'
                   DISPLAY 'NAO ENCONTRADO: ' KF-KEY
               WHEN OTHER
                   DISPLAY 'ERRO READ: ' WS-FS
           END-EVALUATE.

       2000-READ-RANDOM-EXIT.
           EXIT.
      *==========================================================*
      * 3000-UPDATE-REC SECTION
      *==========================================================*
       3000-UPDATE-REC SECTION.
           MOVE 'ACC00001' TO KF-KEY
           READ KSDS-FILE
           IF WS-FS = '00'
               ADD 500.00 TO KF-SALDO
               MOVE '2026-04-15' TO KF-DT-ULT-MOV
               REWRITE KSDS-REC
               IF WS-FS = '00'
                   DISPLAY 'UPDATE OK: ' KF-KEY
               ELSE
                   DISPLAY 'ERRO REWRITE: ' WS-FS
               END-IF
           END-IF.

       3000-UPDATE-REC-EXIT.
           EXIT.
      *==========================================================*
      * 4000-BROWSE-SEQUENTIAL SECTION
      *==========================================================*
       4000-BROWSE-SEQUENTIAL SECTION.
           MOVE LOW-VALUES TO KF-KEY
           START KSDS-FILE KEY NOT LESS THAN KF-KEY
           IF WS-FS NOT = '00'
               DISPLAY 'ERRO START: ' WS-FS
           ELSE
               PERFORM 4100-READ-NEXT 5 TIMES
           END-IF.

       4000-BROWSE-SEQUENTIAL-EXIT.
           EXIT.
      *==========================================================*
      * 4100-READ-NEXT SECTION
      *==========================================================*
       4100-READ-NEXT SECTION.
           READ KSDS-FILE NEXT
           IF WS-FS = '00'
               DISPLAY 'BROWSE: ' KF-KEY ' ' KF-NOME
           END-IF.

       4100-READ-NEXT-EXIT.
           EXIT.
      *==========================================================*
      * 5000-DELETE-REC SECTION
      *==========================================================*
       5000-DELETE-REC SECTION.
           MOVE 'ACC00001' TO KF-KEY
           READ KSDS-FILE
           IF WS-FS = '00'
               DELETE KSDS-FILE
               IF WS-FS = '00'
                   DISPLAY 'DELETE OK: ' KF-KEY
               ELSE
                   DISPLAY 'ERRO DELETE: ' WS-FS
               END-IF
           END-IF.
       5000-DELETE-REC-EXIT.
           EXIT.`
  },

  {
    id: "VSAMRRDS",
    tech: "vsam",
    name: "Gerenciador RRDS",
    desc: "ORGANIZATION RELATIVE com leitura e gravação por número relativo de registro.",
    level: "intermediate",
    filename: "VSAMRRDS.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMRRDS
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : GERENCIADOR DE ARQUIVO VSAM RRDS
      *            ORGANIZATION RELATIVE COM ACESSO POR
      *            NUMERO RELATIVO DE REGISTRO (SLOT)
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMRRDS.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT RRDS-FILE ASSIGN TO VSAMRRDS
               ORGANIZATION IS RELATIVE
               ACCESS MODE  IS DYNAMIC
               RELATIVE KEY IS WS-REL-KEY
               FILE STATUS  IS WS-FS.

       DATA DIVISION.
       FILE SECTION.
       FD  RRDS-FILE.
       01  RRDS-REC.
           05 RR-SLOT-ID          PIC 9(06).
           05 RR-DESCRICAO        PIC X(50).
           05 RR-VALOR            PIC S9(09)V99 COMP-3.
           05 RR-FLAG             PIC X(01).
           05 FILLER              PIC X(137).

       WORKING-STORAGE SECTION.
       01  WS-FS                  PIC X(02).
       01  WS-REL-KEY             PIC 9(08).
       01  WS-IDX                 PIC 9(08).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           OPEN I-O RRDS-FILE
           IF WS-FS NOT = '00' AND WS-FS NOT = '05'
               DISPLAY 'ERRO OPEN: ' WS-FS
               STOP RUN
           END-IF
           PERFORM 1000-WRITE-BY-SLOT
           PERFORM 2000-READ-BY-SLOT
           PERFORM 3000-UPDATE-SLOT
           PERFORM 4000-SEQUENTIAL-READ
           PERFORM 5000-DELETE-SLOT
           CLOSE RRDS-FILE
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-WRITE-BY-SLOT SECTION
      *==========================================================*
       1000-WRITE-BY-SLOT SECTION.
           PERFORM VARYING WS-IDX FROM 1 BY 1
               UNTIL WS-IDX > 5
               MOVE WS-IDX TO WS-REL-KEY
               INITIALIZE RRDS-REC
               MOVE WS-IDX TO RR-SLOT-ID
               STRING 'ITEM SLOT ' WS-IDX
                   DELIMITED SIZE INTO RR-DESCRICAO
               MOVE WS-IDX TO RR-VALOR
               MULTIPLY 100.50 BY RR-VALOR
               MOVE 'A' TO RR-FLAG
               WRITE RRDS-REC
               IF WS-FS = '00'
                   DISPLAY 'WRITE SLOT ' WS-REL-KEY ' OK'
               ELSE
                   DISPLAY 'WRITE SLOT ' WS-REL-KEY
                           ' FS=' WS-FS
               END-IF
           END-PERFORM.

       1000-WRITE-BY-SLOT-EXIT.
           EXIT.
      *==========================================================*
      * 2000-READ-BY-SLOT SECTION
      *==========================================================*
       2000-READ-BY-SLOT SECTION.
           MOVE 3 TO WS-REL-KEY
           READ RRDS-FILE
           EVALUATE WS-FS
               WHEN '00'
                   DISPLAY 'READ SLOT 3: ' RR-DESCRICAO
               WHEN '23'
                   DISPLAY 'SLOT 3 VAZIO'
               WHEN OTHER
                   DISPLAY 'ERRO READ: ' WS-FS
           END-EVALUATE.

       2000-READ-BY-SLOT-EXIT.
           EXIT.
      *==========================================================*
      * 3000-UPDATE-SLOT SECTION
      *==========================================================*
       3000-UPDATE-SLOT SECTION.
           MOVE 3 TO WS-REL-KEY
           READ RRDS-FILE
           IF WS-FS = '00'
               MOVE 'ITEM ATUALIZADO SLOT 3' TO RR-DESCRICAO
               MOVE 999.99 TO RR-VALOR
               REWRITE RRDS-REC
               IF WS-FS = '00'
                   DISPLAY 'UPDATE SLOT 3 OK'
               ELSE
                   DISPLAY 'ERRO REWRITE: ' WS-FS
               END-IF
           END-IF.

       3000-UPDATE-SLOT-EXIT.
           EXIT.
      *==========================================================*
      * 4000-SEQUENTIAL-READ SECTION
      *==========================================================*
       4000-SEQUENTIAL-READ SECTION.
           MOVE 1 TO WS-REL-KEY
           START RRDS-FILE KEY NOT LESS THAN WS-REL-KEY
           IF WS-FS = '00'
               PERFORM UNTIL WS-FS NOT = '00'
                   READ RRDS-FILE NEXT
                   IF WS-FS = '00'
                       DISPLAY 'SEQ SLOT ' WS-REL-KEY
                               ': ' RR-DESCRICAO
                   END-IF
               END-PERFORM
           END-IF.

       4000-SEQUENTIAL-READ-EXIT.
           EXIT.
      *==========================================================*
      * 5000-DELETE-SLOT SECTION
      *==========================================================*
       5000-DELETE-SLOT SECTION.
           MOVE 2 TO WS-REL-KEY
           READ RRDS-FILE
           IF WS-FS = '00'
               DELETE RRDS-FILE
               IF WS-FS = '00'
                   DISPLAY 'DELETE SLOT 2 OK'
               ELSE
                   DISPLAY 'ERRO DELETE: ' WS-FS
               END-IF
           END-IF.
       5000-DELETE-SLOT-EXIT.
           EXIT.`
  },

  {
    id: "VSAMAIX",
    tech: "vsam",
    name: "Índice Alternativo",
    desc: "Acesso via PATH com leitura por chave alternativa (ALTERNATE RECORD KEY) sobre KSDS.",
    level: "advanced",
    filename: "VSAMAIX.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMAIX
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : ACESSO VIA INDICE ALTERNATIVO (AIX)
      *            LE KSDS PELA CHAVE PRIMARIA E TAMBEM
      *            VIA PATH DO ALTERNATE INDEX
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMAIX.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT KSDS-BASE ASSIGN TO VSAMBASE
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS DYNAMIC
               RECORD KEY   IS KB-KEY-PRI
               ALTERNATE RECORD KEY IS KB-KEY-CPF
                   WITH DUPLICATES
               FILE STATUS  IS WS-FS-BASE.

           SELECT KSDS-PATH ASSIGN TO VSAMPATH
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS DYNAMIC
               RECORD KEY   IS KP-KEY-CPF
               FILE STATUS  IS WS-FS-PATH.

       DATA DIVISION.
       FILE SECTION.
       FD  KSDS-BASE.
       01  BASE-REC.
           05 KB-KEY-PRI          PIC X(08).
           05 KB-NOME             PIC X(40).
           05 KB-KEY-CPF          PIC X(11).
           05 KB-CIDADE           PIC X(30).
           05 KB-UF               PIC X(02).
           05 FILLER              PIC X(109).
       FD  KSDS-PATH.
       01  PATH-REC.
           05 KP-KEY-PRI          PIC X(08).
           05 KP-NOME             PIC X(40).
           05 KP-KEY-CPF          PIC X(11).
           05 KP-CIDADE           PIC X(30).
           05 KP-UF               PIC X(02).
           05 FILLER              PIC X(109).

       WORKING-STORAGE SECTION.
       01  WS-FS-BASE             PIC X(02).
       01  WS-FS-PATH             PIC X(02).
       01  WS-SEARCH-CPF          PIC X(11).
       01  WS-CTR                 PIC 9(03) VALUE ZERO.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-OPEN-FILES
           PERFORM 2000-READ-BY-PRIMARY
           PERFORM 3000-READ-BY-AIX
           PERFORM 4000-BROWSE-BY-AIX
           PERFORM 9000-CLOSE-FILES
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-OPEN-FILES SECTION
      *==========================================================*
       1000-OPEN-FILES SECTION.
           OPEN INPUT KSDS-BASE
           IF WS-FS-BASE NOT = '00'
               DISPLAY 'ERRO OPEN BASE: ' WS-FS-BASE
               STOP RUN
           END-IF
           OPEN INPUT KSDS-PATH
           IF WS-FS-PATH NOT = '00'
               DISPLAY 'ERRO OPEN PATH: ' WS-FS-PATH
               STOP RUN
           END-IF.

       1000-OPEN-FILES-EXIT.
           EXIT.
      *==========================================================*
      * 2000-READ-BY-PRIMARY SECTION
      *==========================================================*
       2000-READ-BY-PRIMARY SECTION.
           MOVE 'CLI00001' TO KB-KEY-PRI
           READ KSDS-BASE
           EVALUATE WS-FS-BASE
               WHEN '00'
                   DISPLAY 'PRI: ' KB-KEY-PRI
                           ' CPF=' KB-KEY-CPF
                           ' '     KB-NOME
               WHEN '23'
                   DISPLAY 'NAO ENCONTRADO POR PRI'
               WHEN OTHER
                   DISPLAY 'ERRO READ BASE: ' WS-FS-BASE
           END-EVALUATE.

       2000-READ-BY-PRIMARY-EXIT.
           EXIT.
      *==========================================================*
      * 3000-READ-BY-AIX SECTION
      *==========================================================*
       3000-READ-BY-AIX SECTION.
           MOVE '12345678901' TO KP-KEY-CPF
           READ KSDS-PATH
           EVALUATE WS-FS-PATH
               WHEN '00'
                   DISPLAY 'AIX: CPF=' KP-KEY-CPF
                           ' PRI=' KP-KEY-PRI
                           ' '     KP-NOME
               WHEN '02'
                   DISPLAY 'AIX: DUPLICATA CPF=' KP-KEY-CPF
                           ' PRI=' KP-KEY-PRI
               WHEN '23'
                   DISPLAY 'NAO ENCONTRADO POR AIX'
               WHEN OTHER
                   DISPLAY 'ERRO READ PATH: ' WS-FS-PATH
           END-EVALUATE.

       3000-READ-BY-AIX-EXIT.
           EXIT.
      *==========================================================*
      * 4000-BROWSE-BY-AIX SECTION
      *==========================================================*
       4000-BROWSE-BY-AIX SECTION.
           MOVE '12345678901' TO KP-KEY-CPF
           START KSDS-PATH KEY NOT LESS THAN KP-KEY-CPF
           IF WS-FS-PATH = '00'
               MOVE ZERO TO WS-CTR
               PERFORM UNTIL WS-FS-PATH NOT = '00'
                          OR WS-CTR >= 10
                   READ KSDS-PATH NEXT
                   IF WS-FS-PATH = '00'
                       ADD 1 TO WS-CTR
                       DISPLAY 'BROWSE AIX ' WS-CTR ': '
                               KP-KEY-CPF ' ' KP-NOME
                   END-IF
               END-PERFORM
           END-IF.

       4000-BROWSE-BY-AIX-EXIT.
           EXIT.
      *==========================================================*
      * 9000-CLOSE-FILES SECTION
      *==========================================================*
       9000-CLOSE-FILES SECTION.
           CLOSE KSDS-BASE KSDS-PATH.
       9000-CLOSE-FILES-EXIT.
           EXIT.`
  },

  {
    id: "VSAMSEQ",
    tech: "vsam",
    name: "Processamento Sequencial",
    desc: "START com KEY GREATER THAN, READ NEXT com skip lógico para varredura parcial de KSDS.",
    level: "intermediate",
    filename: "VSAMSEQ.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMSEQ
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : PROCESSAMENTO SEQUENCIAL AVANCADO
      *            START COM KEY GREATER THAN E READ NEXT
      *            COM SKIP LOGICO POR CRITERIO DE CAMPO
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMSEQ.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT VSAM-FILE ASSIGN TO VSAMFL
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS DYNAMIC
               RECORD KEY   IS VF-KEY
               FILE STATUS  IS WS-FS.

       DATA DIVISION.
       FILE SECTION.
       FD  VSAM-FILE.
       01  VSAM-REC.
           05 VF-KEY.
               10 VF-KEY-PREFIX    PIC X(03).
               10 VF-KEY-SEQ       PIC 9(05).
           05 VF-TIPO             PIC X(02).
           05 VF-NOME             PIC X(40).
           05 VF-VALOR            PIC S9(09)V99 COMP-3.
           05 VF-STATUS           PIC X(01).
           05 FILLER              PIC X(138).

       WORKING-STORAGE SECTION.
       01  WS-FS                  PIC X(02).
       01  WS-EOF                 PIC X(01) VALUE 'N'.
           88 END-OF-FILE         VALUE 'Y'.
       01  WS-START-KEY           PIC X(08).
       01  WS-END-PREFIX          PIC X(03).
       01  WS-SKIP-STATUS         PIC X(01).
       01  WS-CTR-PROC            PIC 9(07) VALUE ZERO.
       01  WS-CTR-SKIP            PIC 9(07) VALUE ZERO.
       01  WS-PREV-KEY            PIC X(08).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-INITIALIZE
           PERFORM 2000-START-BROWSE
           PERFORM 3000-PROCESS-LOOP
               UNTIL END-OF-FILE
           PERFORM 9000-FINALIZE
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-INITIALIZE SECTION
      *==========================================================*
       1000-INITIALIZE SECTION.
           MOVE 'ACC00100' TO WS-START-KEY
           MOVE 'ACC'      TO WS-END-PREFIX
           MOVE 'X'        TO WS-SKIP-STATUS
           OPEN INPUT VSAM-FILE
           IF WS-FS NOT = '00'
               DISPLAY 'ERRO OPEN: ' WS-FS
               STOP RUN
           END-IF.

       1000-INITIALIZE-EXIT.
           EXIT.
      *==========================================================*
      * 2000-START-BROWSE SECTION
      *==========================================================*
       2000-START-BROWSE SECTION.
           MOVE WS-START-KEY TO VF-KEY
           START VSAM-FILE
               KEY IS GREATER THAN VF-KEY
           EVALUATE WS-FS
               WHEN '00'
                   CONTINUE
               WHEN '23'
                   SET END-OF-FILE TO TRUE
                   DISPLAY 'NENHUM REGISTRO APOS ' WS-START-KEY
               WHEN OTHER
                   DISPLAY 'ERRO START: ' WS-FS
                   SET END-OF-FILE TO TRUE
           END-EVALUATE.

       2000-START-BROWSE-EXIT.
           EXIT.
      *==========================================================*
      * 3000-PROCESS-LOOP SECTION
      *==========================================================*
       3000-PROCESS-LOOP SECTION.
           READ VSAM-FILE NEXT
           EVALUATE WS-FS
               WHEN '00'
                   IF VF-KEY-PREFIX NOT = WS-END-PREFIX
                       SET END-OF-FILE TO TRUE
                   ELSE
                       PERFORM 3100-CHECK-AND-PROCESS
                   END-IF
               WHEN '10'
                   SET END-OF-FILE TO TRUE
               WHEN OTHER
                   DISPLAY 'ERRO READ NEXT: ' WS-FS
                   SET END-OF-FILE TO TRUE
           END-EVALUATE.

       3000-PROCESS-LOOP-EXIT.
           EXIT.
      *==========================================================*
      * 3100-CHECK-AND-PROCESS SECTION
      *==========================================================*
       3100-CHECK-AND-PROCESS SECTION.
           IF VF-STATUS = WS-SKIP-STATUS
               ADD 1 TO WS-CTR-SKIP
           ELSE
               ADD 1 TO WS-CTR-PROC
               DISPLAY VF-KEY ' ' VF-TIPO ' '
                       VF-NOME ' ' VF-VALOR
           END-IF
           MOVE VF-KEY TO WS-PREV-KEY.

       3100-CHECK-AND-PROCESS-EXIT.
           EXIT.
      *==========================================================*
      * 9000-FINALIZE SECTION
      *==========================================================*
       9000-FINALIZE SECTION.
           DISPLAY 'PROCESSADOS: ' WS-CTR-PROC
           DISPLAY 'IGNORADOS  : ' WS-CTR-SKIP
           CLOSE VSAM-FILE.
       9000-FINALIZE-EXIT.
           EXIT.`
  },

  {
    id: "VSAMUPD",
    tech: "vsam",
    name: "Atualização Batch",
    desc: "Lê arquivo de transações e aplica inserções, alterações e exclusões em KSDS master.",
    level: "advanced",
    filename: "VSAMUPD.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMUPD
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : ATUALIZACAO BATCH DE VSAM KSDS
      *            LE TRANSACOES (I=INSERT U=UPDATE D=DELETE)
      *            E APLICA NO MASTER KSDS
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMUPD.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT MASTER-KSDS ASSIGN TO VSAMMAS
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS DYNAMIC
               RECORD KEY   IS MK-KEY
               FILE STATUS  IS WS-FS-MAS.

           SELECT TRANS-FILE ASSIGN TO TRANSIN
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS  IS WS-FS-TRN.

           SELECT ERROR-FILE ASSIGN TO ERROUT
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS  IS WS-FS-ERR.

       DATA DIVISION.
       FILE SECTION.
       FD  MASTER-KSDS.
       01  MASTER-REC.
           05 MK-KEY              PIC X(10).
           05 MK-NOME             PIC X(40).
           05 MK-VALOR            PIC S9(09)V99 COMP-3.
           05 MK-STATUS           PIC X(01).
           05 FILLER              PIC X(139).
       FD  TRANS-FILE.
       01  TRANS-REC.
           05 TR-OPER             PIC X(01).
               88 TR-INSERT       VALUE 'I'.
               88 TR-UPDATE       VALUE 'U'.
               88 TR-DELETE       VALUE 'D'.
           05 TR-KEY              PIC X(10).
           05 TR-NOME             PIC X(40).
           05 TR-VALOR            PIC S9(09)V99 COMP-3.
           05 TR-STATUS           PIC X(01).
           05 FILLER              PIC X(138).
       FD  ERROR-FILE.
       01  ERROR-REC              PIC X(200).

       WORKING-STORAGE SECTION.
       01  WS-FS-MAS              PIC X(02).
       01  WS-FS-TRN              PIC X(02).
       01  WS-FS-ERR              PIC X(02).
       01  WS-EOF-TRN             PIC X(01) VALUE 'N'.
           88 END-OF-TRANS        VALUE 'Y'.
       01  WS-COUNTERS.
           05 WS-CTR-READ         PIC 9(07) VALUE ZERO.
           05 WS-CTR-INS          PIC 9(07) VALUE ZERO.
           05 WS-CTR-UPD          PIC 9(07) VALUE ZERO.
           05 WS-CTR-DEL          PIC 9(07) VALUE ZERO.
           05 WS-CTR-ERR          PIC 9(07) VALUE ZERO.
       01  WS-ERR-LINE            PIC X(200).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-OPEN-FILES
           PERFORM 2000-PROCESS-TRANS
               UNTIL END-OF-TRANS
           PERFORM 3000-PRINT-SUMMARY
           PERFORM 9000-CLOSE-FILES
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-OPEN-FILES SECTION
      *==========================================================*
       1000-OPEN-FILES SECTION.
           OPEN I-O    MASTER-KSDS
           IF WS-FS-MAS NOT = '00'
               DISPLAY 'ERRO OPEN MASTER: ' WS-FS-MAS
               STOP RUN
           END-IF
           OPEN INPUT  TRANS-FILE
           OPEN OUTPUT ERROR-FILE.

       1000-OPEN-FILES-EXIT.
           EXIT.
      *==========================================================*
      * 2000-PROCESS-TRANS SECTION
      *==========================================================*
       2000-PROCESS-TRANS SECTION.
           READ TRANS-FILE
           IF WS-FS-TRN = '10'
               SET END-OF-TRANS TO TRUE
           ELSE
               ADD 1 TO WS-CTR-READ
               EVALUATE TRUE
                   WHEN TR-INSERT
                       PERFORM 2100-DO-INSERT
                   WHEN TR-UPDATE
                       PERFORM 2200-DO-UPDATE
                   WHEN TR-DELETE
                       PERFORM 2300-DO-DELETE
                   WHEN OTHER
                       PERFORM 2900-LOG-ERROR
               END-EVALUATE
           END-IF.

       2000-PROCESS-TRANS-EXIT.
           EXIT.
      *==========================================================*
      * 2100-DO-INSERT SECTION
      *==========================================================*
       2100-DO-INSERT SECTION.
           MOVE TR-KEY    TO MK-KEY
           MOVE TR-NOME   TO MK-NOME
           MOVE TR-VALOR  TO MK-VALOR
           MOVE TR-STATUS TO MK-STATUS
           WRITE MASTER-REC
           IF WS-FS-MAS = '00'
               ADD 1 TO WS-CTR-INS
           ELSE
               STRING 'INS FAIL FS=' WS-FS-MAS
                      ' KEY=' TR-KEY
                      DELIMITED SIZE INTO WS-ERR-LINE
               WRITE ERROR-REC FROM WS-ERR-LINE
               ADD 1 TO WS-CTR-ERR
           END-IF.

       2100-DO-INSERT-EXIT.
           EXIT.
      *==========================================================*
      * 2200-DO-UPDATE SECTION
      *==========================================================*
       2200-DO-UPDATE SECTION.
           MOVE TR-KEY TO MK-KEY
           READ MASTER-KSDS
           IF WS-FS-MAS = '00'
               IF TR-NOME NOT = SPACES
                   MOVE TR-NOME TO MK-NOME
               END-IF
               IF TR-VALOR NOT = ZERO
                   MOVE TR-VALOR TO MK-VALOR
               END-IF
               IF TR-STATUS NOT = SPACES
                   MOVE TR-STATUS TO MK-STATUS
               END-IF
               REWRITE MASTER-REC
               IF WS-FS-MAS = '00'
                   ADD 1 TO WS-CTR-UPD
               ELSE
                   STRING 'UPD REWRITE FS=' WS-FS-MAS
                          ' KEY=' TR-KEY
                          DELIMITED SIZE INTO WS-ERR-LINE
                   WRITE ERROR-REC FROM WS-ERR-LINE
                   ADD 1 TO WS-CTR-ERR
               END-IF
           ELSE
               STRING 'UPD NOTFOUND FS=' WS-FS-MAS
                      ' KEY=' TR-KEY
                      DELIMITED SIZE INTO WS-ERR-LINE
               WRITE ERROR-REC FROM WS-ERR-LINE
               ADD 1 TO WS-CTR-ERR
           END-IF.

       2200-DO-UPDATE-EXIT.
           EXIT.
      *==========================================================*
      * 2300-DO-DELETE SECTION
      *==========================================================*
       2300-DO-DELETE SECTION.
           MOVE TR-KEY TO MK-KEY
           READ MASTER-KSDS
           IF WS-FS-MAS = '00'
               DELETE MASTER-KSDS
               IF WS-FS-MAS = '00'
                   ADD 1 TO WS-CTR-DEL
               ELSE
                   STRING 'DEL FAIL FS=' WS-FS-MAS
                          ' KEY=' TR-KEY
                          DELIMITED SIZE INTO WS-ERR-LINE
                   WRITE ERROR-REC FROM WS-ERR-LINE
                   ADD 1 TO WS-CTR-ERR
               END-IF
           ELSE
               STRING 'DEL NOTFOUND FS=' WS-FS-MAS
                      ' KEY=' TR-KEY
                      DELIMITED SIZE INTO WS-ERR-LINE
               WRITE ERROR-REC FROM WS-ERR-LINE
               ADD 1 TO WS-CTR-ERR
           END-IF.

       2300-DO-DELETE-EXIT.
           EXIT.
      *==========================================================*
      * 2900-LOG-ERROR SECTION
      *==========================================================*
       2900-LOG-ERROR SECTION.
           STRING 'OPER INVALIDA=' TR-OPER
                  ' KEY=' TR-KEY
                  DELIMITED SIZE INTO WS-ERR-LINE
           WRITE ERROR-REC FROM WS-ERR-LINE
           ADD 1 TO WS-CTR-ERR.

       2900-LOG-ERROR-EXIT.
           EXIT.
      *==========================================================*
      * 3000-PRINT-SUMMARY SECTION
      *==========================================================*
       3000-PRINT-SUMMARY SECTION.
           DISPLAY '======================================'
           DISPLAY ' RESUMO ATUALIZACAO BATCH'
           DISPLAY '======================================'
           DISPLAY ' TRANSACOES LIDAS : ' WS-CTR-READ
           DISPLAY ' INSERCOES        : ' WS-CTR-INS
           DISPLAY ' ATUALIZACOES     : ' WS-CTR-UPD
           DISPLAY ' EXCLUSOES        : ' WS-CTR-DEL
           DISPLAY ' ERROS            : ' WS-CTR-ERR
           DISPLAY '======================================'.

       3000-PRINT-SUMMARY-EXIT.
           EXIT.
      *==========================================================*
      * 9000-CLOSE-FILES SECTION
      *==========================================================*
       9000-CLOSE-FILES SECTION.
           CLOSE MASTER-KSDS TRANS-FILE ERROR-FILE.
       9000-CLOSE-FILES-EXIT.
           EXIT.`
  },

  {
    id: "VSAMLSL",
    tech: "vsam",
    name: "Record Level Sharing",
    desc: "RLS com READ WITH LOCK, UNLOCK e retry para FILE STATUS 68 (registro em uso).",
    level: "advanced",
    filename: "VSAMLSL.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMLSL
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : RECORD LEVEL SHARING (RLS)
      *            DEMONSTRA READ WITH LOCK, UNLOCK E
      *            TRATAMENTO DE STATUS 68 COM RETRY
      * NIVEL    : AVANCADO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMLSL.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT VSAM-RLS ASSIGN TO VSAMRLS
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS DYNAMIC
               RECORD KEY   IS VR-KEY
               FILE STATUS  IS WS-FS.

       DATA DIVISION.
       FILE SECTION.
       FD  VSAM-RLS.
       01  VSAM-REC.
           05 VR-KEY              PIC X(10).
           05 VR-NOME             PIC X(40).
           05 VR-SALDO            PIC S9(11)V99 COMP-3.
           05 VR-ULT-ACESS       PIC X(26).
           05 FILLER              PIC X(117).

       WORKING-STORAGE SECTION.
       01  WS-FS                  PIC X(02).
       01  WS-RETRY-COUNT         PIC 9(02) VALUE ZERO.
       01  WS-MAX-RETRIES         PIC 9(02) VALUE 05.
       01  WS-WAIT-SECONDS        PIC 9(02) VALUE 02.
       01  WS-LOCK-OBTAINED       PIC X(01) VALUE 'N'.
           88 LOCK-OK             VALUE 'Y'.
           88 LOCK-FAIL           VALUE 'N'.
       01  WS-TIMESTAMP           PIC X(26).
       01  WS-DEBIT-AMT          PIC S9(11)V99 COMP-3
                                  VALUE 250.00.

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           OPEN I-O VSAM-RLS
           IF WS-FS NOT = '00'
               DISPLAY 'ERRO OPEN: ' WS-FS
               STOP RUN
           END-IF
           PERFORM 1000-READ-WITH-LOCK
           IF LOCK-OK
               PERFORM 2000-UPDATE-AND-UNLOCK
           ELSE
               DISPLAY 'FALHA: NAO OBTEVE LOCK APOS '
                       WS-MAX-RETRIES ' TENTATIVAS'
           END-IF
           CLOSE VSAM-RLS
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-READ-WITH-LOCK SECTION
      *==========================================================*
       1000-READ-WITH-LOCK SECTION.
           MOVE 'CLI0000001' TO VR-KEY
           MOVE ZERO TO WS-RETRY-COUNT
           SET LOCK-FAIL TO TRUE
           PERFORM 1100-TRY-LOCK
               UNTIL LOCK-OK
                  OR WS-RETRY-COUNT >= WS-MAX-RETRIES.

       1000-READ-WITH-LOCK-EXIT.
           EXIT.
      *==========================================================*
      * 1100-TRY-LOCK SECTION
      *==========================================================*
       1100-TRY-LOCK SECTION.
           READ VSAM-RLS WITH LOCK
           EVALUATE WS-FS
               WHEN '00'
                   SET LOCK-OK TO TRUE
                   DISPLAY 'LOCK OBTIDO: ' VR-KEY
               WHEN '68'
                   ADD 1 TO WS-RETRY-COUNT
                   DISPLAY 'STATUS 68 - RETRY '
                           WS-RETRY-COUNT '/'
                           WS-MAX-RETRIES
                   PERFORM 1200-WAIT
               WHEN '23'
                   DISPLAY 'REGISTRO NAO ENCONTRADO'
                   MOVE WS-MAX-RETRIES TO WS-RETRY-COUNT
               WHEN OTHER
                   DISPLAY 'ERRO READ LOCK: ' WS-FS
                   MOVE WS-MAX-RETRIES TO WS-RETRY-COUNT
           END-EVALUATE.

       1100-TRY-LOCK-EXIT.
           EXIT.
      *==========================================================*
      * 1200-WAIT SECTION
      *==========================================================*
       1200-WAIT SECTION.
           DISPLAY 'AGUARDANDO ' WS-WAIT-SECONDS 's...'
           CONTINUE.

       1200-WAIT-EXIT.
           EXIT.
      *==========================================================*
      * 2000-UPDATE-AND-UNLOCK SECTION
      *==========================================================*
       2000-UPDATE-AND-UNLOCK SECTION.
           IF VR-SALDO >= WS-DEBIT-AMT
               SUBTRACT WS-DEBIT-AMT FROM VR-SALDO
               MOVE FUNCTION CURRENT-DATE TO WS-TIMESTAMP
               MOVE WS-TIMESTAMP TO VR-ULT-ACESS
               REWRITE VSAM-REC
               IF WS-FS = '00'
                   DISPLAY 'UPDATE OK - NOVO SALDO: '
                           VR-SALDO
               ELSE
                   DISPLAY 'ERRO REWRITE: ' WS-FS
                   PERFORM 2100-UNLOCK-RECORD
               END-IF
           ELSE
               DISPLAY 'SALDO INSUFICIENTE: ' VR-SALDO
               PERFORM 2100-UNLOCK-RECORD
           END-IF.

       2000-UPDATE-AND-UNLOCK-EXIT.
           EXIT.
      *==========================================================*
      * 2100-UNLOCK-RECORD SECTION
      *==========================================================*
       2100-UNLOCK-RECORD SECTION.
           UNLOCK VSAM-RLS
           IF WS-FS = '00'
               DISPLAY 'UNLOCK OK'
           ELSE
               DISPLAY 'ERRO UNLOCK: ' WS-FS
           END-IF.
       2100-UNLOCK-RECORD-EXIT.
           EXIT.`
  },

  {
    id: "VSAMBKP",
    tech: "vsam",
    name: "Backup e Restore",
    desc: "Leitura sequencial para backup com header e trailer de controle, verificação de integridade.",
    level: "intermediate",
    filename: "VSAMBKP.cbl",
    tags: ["VSAM", "COBOL"],
    source:
`      *================================================================*
      *================================================================*
      * PROGRAMA : VSAMBKP
      * AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
      * OBJETIVO : BACKUP E RESTORE DE VSAM KSDS
      *            LEITURA SEQUENCIAL COM HEADER/TRAILER
      *            DE CONTROLE E VERIFICACAO DE INTEGRIDADE
      * NIVEL    : INTERMEDIARIO
      *================================================================*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAMBKP.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT VSAM-SOURCE ASSIGN TO VSAMSRC
               ORGANIZATION IS INDEXED
               ACCESS MODE  IS SEQUENTIAL
               RECORD KEY   IS VS-KEY
               FILE STATUS  IS WS-FS-VSAM.

           SELECT BACKUP-FILE ASSIGN TO BKPOUT
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS  IS WS-FS-BKP.

       DATA DIVISION.
       FILE SECTION.
       FD  VSAM-SOURCE.
       01  VSAM-REC.
           05 VS-KEY              PIC X(10).
           05 VS-DATA             PIC X(190).
       FD  BACKUP-FILE.
       01  BACKUP-REC             PIC X(200).

       WORKING-STORAGE SECTION.
       01  WS-FS-VSAM             PIC X(02).
       01  WS-FS-BKP              PIC X(02).
       01  WS-EOF                 PIC X(01) VALUE 'N'.
           88 END-OF-FILE         VALUE 'Y'.
       01  WS-HEADER-REC.
           05 WH-TIPO             PIC X(03) VALUE 'HDR'.
           05 WH-PROGRAMA         PIC X(08) VALUE 'VSAMBKP '.
           05 WH-DATA             PIC X(10).
           05 WH-HORA             PIC X(08).
           05 WH-DSNAME           PIC X(44).
           05 FILLER              PIC X(127).
       01  WS-TRAILER-REC.
           05 WT-TIPO             PIC X(03) VALUE 'TRL'.
           05 WT-PROGRAMA         PIC X(08) VALUE 'VSAMBKP '.
           05 WT-TOTAL-RECS       PIC 9(09).
           05 WT-FIRST-KEY        PIC X(10).
           05 WT-LAST-KEY         PIC X(10).
           05 WT-CHECKSUM         PIC 9(18).
           05 FILLER              PIC X(142).
       01  WS-CTR-RECS            PIC 9(09) VALUE ZERO.
       01  WS-FIRST-KEY           PIC X(10) VALUE SPACES.
       01  WS-LAST-KEY            PIC X(10) VALUE SPACES.
       01  WS-CHECKSUM            PIC 9(18) VALUE ZERO.
       01  WS-CURRENT-DATE.
           05 WS-CD-YEAR          PIC 9(04).
           05 WS-CD-MONTH         PIC 9(02).
           05 WS-CD-DAY           PIC 9(02).
           05 WS-CD-HOUR          PIC 9(02).
           05 WS-CD-MIN           PIC 9(02).
           05 WS-CD-SEC           PIC 9(02).
           05 FILLER              PIC X(07).
       01  WS-DISPLAY-DATE        PIC X(10).
       01  WS-DISPLAY-TIME        PIC X(08).
       01  WS-HASH-WORK           PIC 9(18).

       PROCEDURE DIVISION.
      *==========================================================*
      * 0000-MAIN SECTION
      *==========================================================*
       0000-MAIN SECTION.
           PERFORM 1000-OPEN-FILES
           PERFORM 2000-WRITE-HEADER
           PERFORM 3000-BACKUP-LOOP
               UNTIL END-OF-FILE
           PERFORM 4000-WRITE-TRAILER
           PERFORM 9000-CLOSE-FILES
           STOP RUN.

       0000-MAIN-EXIT.
           EXIT.
      *==========================================================*
      * 1000-OPEN-FILES SECTION
      *==========================================================*
       1000-OPEN-FILES SECTION.
           OPEN INPUT  VSAM-SOURCE
           IF WS-FS-VSAM NOT = '00'
               DISPLAY 'ERRO OPEN VSAM: ' WS-FS-VSAM
               STOP RUN
           END-IF
           OPEN OUTPUT BACKUP-FILE.

       1000-OPEN-FILES-EXIT.
           EXIT.
      *==========================================================*
      * 2000-WRITE-HEADER SECTION
      *==========================================================*
       2000-WRITE-HEADER SECTION.
           MOVE FUNCTION CURRENT-DATE
               TO WS-CURRENT-DATE
           STRING WS-CD-YEAR '-' WS-CD-MONTH '-'
                  WS-CD-DAY DELIMITED SIZE
                  INTO WS-DISPLAY-DATE
           STRING WS-CD-HOUR ':' WS-CD-MIN ':'
                  WS-CD-SEC DELIMITED SIZE
                  INTO WS-DISPLAY-TIME
           MOVE WS-DISPLAY-DATE TO WH-DATA
           MOVE WS-DISPLAY-TIME TO WH-HORA
           MOVE 'CLUSTER.PRODUCAO.CLIENTES'
               TO WH-DSNAME
           WRITE BACKUP-REC FROM WS-HEADER-REC.

       2000-WRITE-HEADER-EXIT.
           EXIT.
      *==========================================================*
      * 3000-BACKUP-LOOP SECTION
      *==========================================================*
       3000-BACKUP-LOOP SECTION.
           READ VSAM-SOURCE
           EVALUATE WS-FS-VSAM
               WHEN '00'
                   ADD 1 TO WS-CTR-RECS
                   IF WS-CTR-RECS = 1
                       MOVE VS-KEY TO WS-FIRST-KEY
                   END-IF
                   MOVE VS-KEY TO WS-LAST-KEY
                   PERFORM 3100-UPDATE-CHECKSUM
                   WRITE BACKUP-REC FROM VSAM-REC
               WHEN '10'
                   SET END-OF-FILE TO TRUE
               WHEN OTHER
                   DISPLAY 'ERRO READ: ' WS-FS-VSAM
                   SET END-OF-FILE TO TRUE
           END-EVALUATE.

       3000-BACKUP-LOOP-EXIT.
           EXIT.
      *==========================================================*
      * 3100-UPDATE-CHECKSUM SECTION
      *==========================================================*
       3100-UPDATE-CHECKSUM SECTION.
           COMPUTE WS-HASH-WORK =
               FUNCTION ORD(VS-KEY(1:1)) *
               FUNCTION ORD(VS-KEY(2:1)) +
               WS-CTR-RECS
           ADD WS-HASH-WORK TO WS-CHECKSUM.

       3100-UPDATE-CHECKSUM-EXIT.
           EXIT.
      *==========================================================*
      * 4000-WRITE-TRAILER SECTION
      *==========================================================*
       4000-WRITE-TRAILER SECTION.
           MOVE WS-CTR-RECS  TO WT-TOTAL-RECS
           MOVE WS-FIRST-KEY TO WT-FIRST-KEY
           MOVE WS-LAST-KEY  TO WT-LAST-KEY
           MOVE WS-CHECKSUM  TO WT-CHECKSUM
           WRITE BACKUP-REC FROM WS-TRAILER-REC
           DISPLAY '======================================'
           DISPLAY ' BACKUP CONCLUIDO'
           DISPLAY ' REGISTROS: ' WS-CTR-RECS
           DISPLAY ' PRIMEIRA : ' WS-FIRST-KEY
           DISPLAY ' ULTIMA   : ' WS-LAST-KEY
           DISPLAY ' CHECKSUM : ' WS-CHECKSUM
           DISPLAY '======================================'.

       4000-WRITE-TRAILER-EXIT.
           EXIT.
      *==========================================================*
      * 9000-CLOSE-FILES SECTION
      *==========================================================*
       9000-CLOSE-FILES SECTION.
           CLOSE VSAM-SOURCE BACKUP-FILE.
       9000-CLOSE-FILES-EXIT.
           EXIT.`
  },

  {
    id: "ASMVSRD1",
    tech: "vsam",
    name: "Leitura Sequencial (ASM)",
    desc: "VSAM nativo em Assembler — ACB, RPL, OPEN, GET sequencial e CLOSE com contagem de registros.",
    level: "basic",
    filename: "ASMVSRD1.hlasm",
    tags: ["HLASM","VSAM","KSDS"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMVSRD1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : LEITURA SEQUENCIAL VSAM EM ASSEMBLER
*            ACB + RPL + OPEN + GET SEQ + CLOSE
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMVSRD1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         OPEN  (VSAMACB)
         LTR   R15,R15
         BNZ   OPENERR
*
         SR    R5,R5
*
GETLOOP  GET   RPL=VSAMRPL
         LTR   R15,R15
         BNZ   GETEND
*
         LA    R5,1(R5)
         B     GETLOOP
*
GETEND   CH    R15,=H'8'
         BNE   GETERR
         SHOWCB RPL=VSAMRPL,FIELDS=FDBK,AREA=FDBKAREA,        X
               LENGTH=4
         CLC   FDBKAREA,=F'4'
         BNE   GETERR
*
         CLOSE (VSAMACB)
*
         CVD   R5,DWORK
         UNPK  WMSG+5(8),DWORK
         OI    WMSG+12,X'F0'
         MVC   WMSG(5),=C'REGS='
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         B     EXIT
*
OPENERR  MVC   WMSG(10),=C'OPEN ERRO '
         WTO   MF=(E,WTOMSG)
         LA    R15,8
         B     EXIT
GETERR   MVC   WMSG(10),=C'GET  ERRO '
         WTO   MF=(E,WTOMSG)
         LA    R15,12
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
VSAMACB  ACB   DDNAME=VSAMDD,MACRF=(SEQ,IN)
VSAMRPL  RPL   ACB=VSAMACB,AREA=RECAREA,AREALEN=200,          X
               OPTCD=(SEQ,MVE)
*
SAVE     DS    18F
DWORK    DS    D
FDBKAREA DS    F
RECAREA  DS    CL200
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMVSRD1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMVSRD1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : LEITURA SEQUENCIAL VSAM EM ASSEMBLER
*            ACB + RPL + OPEN + GET SEQ + CLOSE
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMVSRD1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMVSRD1         SET BASE (RELATIVE)
         USING ASMVSRD1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         OPEN  (VSAMACB)
         LTR   R15,R15
         JNZ   OPENERR
*
         SR    R5,R5
*
GETLOOP  GET   RPL=VSAMRPL
         LTR   R15,R15
         JNZ   GETEND
*
         LA    R5,1(R5)
         J     GETLOOP
*
GETEND   CH    R15,=H'8'
         JNE   GETERR
         SHOWCB RPL=VSAMRPL,FIELDS=FDBK,AREA=FDBKAREA,        X
               LENGTH=4
         CLC   FDBKAREA,=F'4'
         JNE   GETERR
*
         CLOSE (VSAMACB)
*
         CVD   R5,DWORK
         UNPK  WMSG+5(8),DWORK
         OI    WMSG+12,X'F0'
         MVC   WMSG(5),=C'REGS='
         WTO   MF=(E,WTOMSG)
*
         SR    R15,R15
         J     EXIT
*
OPENERR  MVC   WMSG(10),=C'OPEN ERRO '
         WTO   MF=(E,WTOMSG)
         LA    R15,8
         J     EXIT
GETERR   MVC   WMSG(10),=C'GET  ERRO '
         WTO   MF=(E,WTOMSG)
         LA    R15,12
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
VSAMACB  ACB   DDNAME=VSAMDD,MACRF=(SEQ,IN)
VSAMRPL  RPL   ACB=VSAMACB,AREA=RECAREA,AREALEN=200,          X
               OPTCD=(SEQ,MVE)
*
SAVE     DS    18F
DWORK    DS    D
FDBKAREA DS    F
RECAREA  DS    CL200
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMVSRD1`
  },

  {
    id: "ASMVKSD1",
    tech: "vsam",
    name: "KSDS Random I/O (ASM)",
    desc: "VSAM KSDS em Assembler — GET por chave, PUT para inserção, PUT para update e ERASE.",
    level: "intermediate",
    filename: "ASMVKSD1.hlasm",
    tags: ["HLASM","VSAM","KSDS","CRUD"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMVKSD1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CRUD KSDS EM ASSEMBLER VIA MACROS VSAM
*            GET/PUT/ERASE COM RPL OPTCD KEY,DIR
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMVKSD1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         OPEN  (VSAMACB)
         LTR   R15,R15
         BNZ   OPENERR
*
         MVC   KEYAREA,=CL10'KEY00100  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE,UPD),           X
               ARG=KEYAREA
         GET   RPL=VSAMRPL
         LTR   R15,R15
         BNZ   RDERR
*
         MVC   WMSG(5),=C'READ='
         MVC   WMSG+5(20),RECAREA
         WTO   MF=(E,WTOMSG)
*
         MVC   RECAREA+10(20),=CL20'ATUALIZADO VIA ASM  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE,UPD)
         PUT   RPL=VSAMRPL
         LTR   R15,R15
         BNZ   UPDERR
*
         MVC   KEYAREA,=CL10'KEY09999  '
         MVC   RECAREA(10),KEYAREA
         MVC   RECAREA+10(20),=CL20'NOVO REGISTRO ASM   '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE),               X
               ARG=KEYAREA
         PUT   RPL=VSAMRPL
         LTR   R15,R15
         BNZ   INSERR
*
         MVC   KEYAREA,=CL10'KEY09999  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE,UPD),           X
               ARG=KEYAREA
         GET   RPL=VSAMRPL
         LTR   R15,R15
         BNZ   DELERR
         ERASE RPL=VSAMRPL
         LTR   R15,R15
         BNZ   DELERR
*
         CLOSE (VSAMACB)
         SR    R15,R15
         B     EXIT
*
OPENERR  LA    R15,8
         B     EXIT
RDERR    LA    R15,12
         B     CLOSEX
UPDERR   LA    R15,16
         B     CLOSEX
INSERR   LA    R15,20
         B     CLOSEX
DELERR   LA    R15,24
CLOSEX   CLOSE (VSAMACB)
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
VSAMACB  ACB   DDNAME=VSAMDD,MACRF=(KEY,DIR,SEQ,OUT,IN)
VSAMRPL  RPL   ACB=VSAMACB,AREA=RECAREA,AREALEN=200,          X
               KEYLEN=10,OPTCD=(KEY,DIR,MVE)
*
SAVE     DS    18F
KEYAREA  DS    CL10
RECAREA  DS    CL200
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMVKSD1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMVKSD1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : CRUD KSDS EM ASSEMBLER VIA MACROS VSAM
*            GET/PUT/ERASE COM RPL OPTCD KEY,DIR
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMVKSD1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMVKSD1         SET BASE (RELATIVE)
         USING ASMVKSD1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         OPEN  (VSAMACB)
         LTR   R15,R15
         JNZ   OPENERR
*
         MVC   KEYAREA,=CL10'KEY00100  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE,UPD),           X
               ARG=KEYAREA
         GET   RPL=VSAMRPL
         LTR   R15,R15
         JNZ   RDERR
*
         MVC   WMSG(5),=C'READ='
         MVC   WMSG+5(20),RECAREA
         WTO   MF=(E,WTOMSG)
*
         MVC   RECAREA+10(20),=CL20'ATUALIZADO VIA ASM  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE,UPD)
         PUT   RPL=VSAMRPL
         LTR   R15,R15
         JNZ   UPDERR
*
         MVC   KEYAREA,=CL10'KEY09999  '
         MVC   RECAREA(10),KEYAREA
         MVC   RECAREA+10(20),=CL20'NOVO REGISTRO ASM   '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE),               X
               ARG=KEYAREA
         PUT   RPL=VSAMRPL
         LTR   R15,R15
         JNZ   INSERR
*
         MVC   KEYAREA,=CL10'KEY09999  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,DIR,MVE,UPD),           X
               ARG=KEYAREA
         GET   RPL=VSAMRPL
         LTR   R15,R15
         JNZ   DELERR
         ERASE RPL=VSAMRPL
         LTR   R15,R15
         JNZ   DELERR
*
         CLOSE (VSAMACB)
         SR    R15,R15
         J     EXIT
*
OPENERR  LA    R15,8
         J     EXIT
RDERR    LA    R15,12
         J     CLOSEX
UPDERR   LA    R15,16
         J     CLOSEX
INSERR   LA    R15,20
         J     CLOSEX
DELERR   LA    R15,24
CLOSEX   CLOSE (VSAMACB)
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
VSAMACB  ACB   DDNAME=VSAMDD,MACRF=(KEY,DIR,SEQ,OUT,IN)
VSAMRPL  RPL   ACB=VSAMACB,AREA=RECAREA,AREALEN=200,          X
               KEYLEN=10,OPTCD=(KEY,DIR,MVE)
*
SAVE     DS    18F
KEYAREA  DS    CL10
RECAREA  DS    CL200
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMVKSD1`
  },

  {
    id: "ASMVBRW1",
    tech: "vsam",
    name: "Browse com POINT (ASM)",
    desc: "POINT + GET SEQ para browse posicional em VSAM KSDS — forward/backward com SHOWCB feedback.",
    level: "advanced",
    filename: "ASMVBRW1.hlasm",
    tags: ["HLASM","VSAM","KSDS","BROWSE"],
    sourceBase:
`*================================================================*
* PROGRAMA : ASMVBRW1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : BROWSE POSICIONAL VSAM EM ASSEMBLER
*            POINT + GET SEQ FWD + GET SEQ BWD + SHOWCB
* VERSAO  : BASE + DESLOCAMENTO (BALR/USING)
*================================================================*
ASMVBRW1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         BALR  R12,0                SET BASE
         USING *,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         OPEN  (VSAMACB)
         LTR   R15,R15
         BNZ   OPENERR
*
         MVC   KEYAREA,=CL10'KEY00500  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,SEQ,MVE),               X
               ARG=KEYAREA
         POINT RPL=VSAMRPL
         LTR   R15,R15
         BNZ   PNTERR
*
         MODCB RPL=VSAMRPL,OPTCD=(KEY,SEQ,MVE,FWD)
         SR    R5,R5
         LA    R6,10
*
FWDLOOP  GET   RPL=VSAMRPL
         LTR   R15,R15
         BNZ   FWDEND
*
         LA    R5,1(R5)
         CR    R5,R6
         BNL   FWDEND
         B     FWDLOOP
*
FWDEND   DS    0H
         CVD   R5,DWORK
         UNPK  WMSG+4(4),DWORK+6(2)
         OI    WMSG+7,X'F0'
         MVC   WMSG(4),=C'FWD='
         WTO   MF=(E,WTOMSG)
*
         MODCB RPL=VSAMRPL,OPTCD=(KEY,SEQ,MVE,BWD)
         SR    R5,R5
         LA    R6,5
*
BWDLOOP  GET   RPL=VSAMRPL
         LTR   R15,R15
         BNZ   BWDEND
*
         LA    R5,1(R5)
         CR    R5,R6
         BNL   BWDEND
         B     BWDLOOP
*
BWDEND   DS    0H
         CVD   R5,DWORK
         UNPK  WMSG+4(4),DWORK+6(2)
         OI    WMSG+7,X'F0'
         MVC   WMSG(4),=C'BWD='
         WTO   MF=(E,WTOMSG)
*
         SHOWCB RPL=VSAMRPL,                                   X
               FIELDS=(FDBK,RBA,KEYLEN),                       X
               AREA=CBAREA,LENGTH=12
         MVC   WMSG(6),=C'FDBK= '
         L     R3,CBAREA
         CVD   R3,DWORK
         UNPK  WMSG+5(4),DWORK+6(2)
         OI    WMSG+8,X'F0'
         WTO   MF=(E,WTOMSG)
*
         CLOSE (VSAMACB)
         SR    R15,R15
         B     EXIT
*
OPENERR  LA    R15,8
         B     EXIT
PNTERR   LA    R15,12
         CLOSE (VSAMACB)
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
VSAMACB  ACB   DDNAME=VSAMDD,MACRF=(KEY,SEQ,DIR,IN)
VSAMRPL  RPL   ACB=VSAMACB,AREA=RECAREA,AREALEN=200,          X
               KEYLEN=10,OPTCD=(KEY,SEQ,MVE)
*
SAVE     DS    18F
DWORK    DS    D
CBAREA   DS    3F
KEYAREA  DS    CL10
RECAREA  DS    CL200
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMVBRW1`,
    sourceRelative:
`*================================================================*
* PROGRAMA : ASMVBRW1
* AUTOR    : DOUGLAS ASSUMPCAO RODRIGUES
* OBJETIVO : BROWSE POSICIONAL VSAM EM ASSEMBLER
*            POINT + GET SEQ FWD + GET SEQ BWD + SHOWCB
* VERSAO  : ENDERECO RELATIVO (LARL/J-FORM)
*================================================================*
ASMVBRW1 CSECT
         STM   R14,R12,12(R13)     SAVE REGISTERS
         LARL  R12,ASMVBRW1         SET BASE (RELATIVE)
         USING ASMVBRW1,R12
         ST    R13,SAVE+4
         LA    R13,SAVE
*
         OPEN  (VSAMACB)
         LTR   R15,R15
         JNZ   OPENERR
*
         MVC   KEYAREA,=CL10'KEY00500  '
         MODCB RPL=VSAMRPL,OPTCD=(KEY,SEQ,MVE),               X
               ARG=KEYAREA
         POINT RPL=VSAMRPL
         LTR   R15,R15
         JNZ   PNTERR
*
         MODCB RPL=VSAMRPL,OPTCD=(KEY,SEQ,MVE,FWD)
         SR    R5,R5
         LA    R6,10
*
FWDLOOP  GET   RPL=VSAMRPL
         LTR   R15,R15
         JNZ   FWDEND
*
         LA    R5,1(R5)
         CR    R5,R6
         JNL   FWDEND
         J     FWDLOOP
*
FWDEND   DS    0H
         CVD   R5,DWORK
         UNPK  WMSG+4(4),DWORK+6(2)
         OI    WMSG+7,X'F0'
         MVC   WMSG(4),=C'FWD='
         WTO   MF=(E,WTOMSG)
*
         MODCB RPL=VSAMRPL,OPTCD=(KEY,SEQ,MVE,BWD)
         SR    R5,R5
         LA    R6,5
*
BWDLOOP  GET   RPL=VSAMRPL
         LTR   R15,R15
         JNZ   BWDEND
*
         LA    R5,1(R5)
         CR    R5,R6
         JNL   BWDEND
         J     BWDLOOP
*
BWDEND   DS    0H
         CVD   R5,DWORK
         UNPK  WMSG+4(4),DWORK+6(2)
         OI    WMSG+7,X'F0'
         MVC   WMSG(4),=C'BWD='
         WTO   MF=(E,WTOMSG)
*
         SHOWCB RPL=VSAMRPL,                                   X
               FIELDS=(FDBK,RBA,KEYLEN),                       X
               AREA=CBAREA,LENGTH=12
         MVC   WMSG(6),=C'FDBK= '
         L     R3,CBAREA
         CVD   R3,DWORK
         UNPK  WMSG+5(4),DWORK+6(2)
         OI    WMSG+8,X'F0'
         WTO   MF=(E,WTOMSG)
*
         CLOSE (VSAMACB)
         SR    R15,R15
         J     EXIT
*
OPENERR  LA    R15,8
         J     EXIT
PNTERR   LA    R15,12
         CLOSE (VSAMACB)
*
EXIT     L     R13,SAVE+4
         LM    R14,R12,12(R13)
         BR    R14
*
VSAMACB  ACB   DDNAME=VSAMDD,MACRF=(KEY,SEQ,DIR,IN)
VSAMRPL  RPL   ACB=VSAMACB,AREA=RECAREA,AREALEN=200,          X
               KEYLEN=10,OPTCD=(KEY,SEQ,MVE)
*
SAVE     DS    18F
DWORK    DS    D
CBAREA   DS    3F
KEYAREA  DS    CL10
RECAREA  DS    CL200
WMSG     DS    CL60
WTOMSG   WTO   '                                              X
                                              ',MF=L
         YREGS
         END   ASMVBRW1`
  },

];
