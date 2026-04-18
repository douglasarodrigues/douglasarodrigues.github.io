/**
 * Traduções EN/ES para colunas Significado + Ação das tabelas de referência.
 * Ordem dos arrays = ordem em js/lab-reference.js (PT).
 * Gerar js: node scripts/emit-lab-reference-i18n.mjs
 */

const FS_CODES = [
  "00", "02", "04", "05", "07", "10", "14", "21", "22", "23", "24", "30", "34", "35", "37", "38", "39",
  "41", "42", "43", "44", "46", "47", "48", "49", "90", "91", "93",
];

const ABEND_CODES = [
  "S0C1", "S0C4", "S0C7", "S0CB", "S0C5", "S0C6", "S013", "S013-14", "S001", "S222", "S322", "S422",
  "S806", "S878", "S80A", "U0016", "U1026", "U4038", "S213", "S913", "S522", "S706", "SB37", "SD37",
];

const SQL_CODES = [
  "0", "+100", "100", "-104", "-180", "-181", "-204", "-206", "-302", "-305", "-501", "-803", "-805", "-811",
  "-818", "-904", "-911", "-913", "-922", "-927", "-551", "-530",
];

const EIB_CODES = [
  "NORMAL", "ERROR", "FILENOTFOUND", "NOTFND", "DUPREC", "DUPKEY", "INVREQ", "IOERR", "NOSPACE", "NOTOPEN",
  "ENDFILE", "ILLOGIC", "LENGERR", "QZERO", "SIGNAL", "QBUSY", "ITEMERR", "PGMIDERR", "TRANSIDERR", "ENDDATA",
  "INVTSREQ", "EXPIRED", "RETPAGE", "RTEFAIL", "MAPFAIL", "INVMPSZ", "NOTAUTH", "DISABLED", "ALLOCERR", "INVPARTN",
  "PARTNFAIL", "SYSBUSY", "SYSIDERR", "SUPPRESSED",
];

function pairMap(codes, enRows, esRows) {
  const o = {};
  codes.forEach((c, i) => {
    o[c] = { meaning: enRows[i][0], action: enRows[i][1] };
  });
  const s = {};
  codes.forEach((c, i) => {
    s[c] = { meaning: esRows[i][0], action: esRows[i][1] };
  });
  return { en: o, es: s };
}

/* --- File-Status --- */
const EN_FS = [
  ["Successful operation", "No action required"],
  ["Duplicate key allowed (DUPLICATES)", "Check whether duplicates are expected by design"],
  ["Record read with length different from expected", "Check RECORD LENGTH in FD and VSAM DEFINE"],
  ["OPTIONAL file not found on OPEN", "Verify whether the file should exist in this scenario"],
  ["CLOSE with NO REWIND / FOR REMOVAL on non-reel device", "Check CLOSE clause and device type"],
  ["End of file (EOF) reached", "Normal condition — exit read loop"],
  ["Sequential READ on RRDS — RRN out of range", "Check RRDS record range"],
  ["Key sequence error on sequential WRITE", "Ensure records are in ascending key order"],
  ["Attempt to WRITE with duplicate primary key", "Verify key uniqueness before WRITE"],
  ["Record not found (READ/START/DELETE with missing key)", "Treat as business condition or validate input data"],
  ["Boundary violation — KSDS/RRDS out of space or key out of range", "Check VSAM space and DEFINE CLUSTER"],
  ["Permanent I/O error — unrecoverable failure", "Review system messages and dataset integrity"],
  ["Boundary violation on sequential file (insufficient space)", "Increase dataset space allocation in JCL"],
  ["File not found on OPEN INPUT/I-O", "Verify dataset exists and DD statement in JCL"],
  ["OPEN mode incompatible with device/file type", "Check ACCESS MODE, OPEN mode, and file type"],
  ["File locked — OPEN attempted on a locked dataset", "Check dataset ENQ and concurrent jobs"],
  ["File attributes conflict with program definition", "Align COBOL FD with VSAM DEFINE CLUSTER"],
  ["OPEN on file that is already open", "Fix program logic — avoid duplicate OPEN"],
  ["CLOSE on file that is not open", "Fix program logic — check file state before CLOSE"],
  ["REWRITE without prior READ (sequential mode)", "Issue READ before REWRITE in sequential access"],
  ["REWRITE with record length different from original", "Keep the same length as the record read"],
  ["READ past end of file (after EOF already set)", "Fix loop logic — stop reading after FS 10"],
  ["READ on file not open or not INPUT/I-O", "Verify OPEN before READ and open mode"],
  ["WRITE on file not open or not OUTPUT/I-O/EXTEND", "Verify OPEN before WRITE and open mode"],
  ["DELETE or REWRITE on file not open as I-O", "Ensure file was opened with OPEN I-O"],
  ["Unspecified system error", "Review OS messages and VSAM log"],
  ["Internal VSAM error — password or catalog issue", "Check RACF and VSAM catalog integrity"],
  ["Resource unavailable — VSAM cannot allocate buffers", "Check REGION and system resources"],
];

const ES_FS = [
  ["Operación correcta", "No se requiere acción"],
  ["Clave duplicada permitida (DUPLICATES)", "Compruebe si las duplicadas son esperadas por diseño"],
  ["Registro leído con longitud distinta de la esperada", "Revise RECORD LENGTH en la FD y en VSAM DEFINE"],
  ["Archivo OPTIONAL no encontrado en OPEN", "Verifique si el archivo debe existir en este escenario"],
  ["CLOSE con NO REWIND / FOR REMOVAL en dispositivo que no es cinta", "Revise la cláusula CLOSE y el tipo de dispositivo"],
  ["Fin de archivo (EOF) alcanzado", "Condición normal — salir del bucle de lectura"],
  ["READ secuencial en RRDS — RRN fuera de rango", "Revise el rango de registros del RRDS"],
  ["Error de secuencia de clave en WRITE secuencial", "Asegure orden creciente de clave"],
  ["Intento de WRITE con clave primaria duplicada", "Verifique unicidad de clave antes del WRITE"],
  ["Registro no encontrado (READ/START/DELETE con clave inexistente)", "Trátelo como negocio o valide datos de entrada"],
  ["Violación de límite — KSDS/RRDS sin espacio o clave fuera de rango", "Revise espacio VSAM y DEFINE CLUSTER"],
  ["Error permanente de E/S", "Analice mensajes del sistema e integridad del dataset"],
  ["Violación de límite en archivo secuencial (sin espacio)", "Aumente la asignación de espacio en el JCL"],
  ["Archivo no encontrado en OPEN INPUT/I-O", "Verifique existencia del dataset y DD en el JCL"],
  ["OPEN incompatible con tipo de dispositivo/archivo", "Revise ACCESS MODE, OPEN y tipo de archivo"],
  ["Archivo bloqueado — OPEN sobre dataset bloqueado", "Revise ENQ del dataset y jobs concurrentes"],
  ["Atributos del archivo en conflicto con el programa", "Alinee la FD COBOL con DEFINE CLUSTER VSAM"],
  ["OPEN en archivo ya abierto", "Corrija la lógica — evite OPEN duplicado"],
  ["CLOSE en archivo no abierto", "Corrija la lógica — compruebe estado antes del CLOSE"],
  ["REWRITE sin READ previo (modo secuencial)", "Ejecute READ antes del REWRITE en acceso secuencial"],
  ["REWRITE con longitud distinta del original", "Mantenga la misma longitud que el registro leído"],
  ["READ más allá del EOF (tras señalar EOF)", "Corrija el bucle — deje de leer tras FS 10"],
  ["READ en archivo no abierto o no INPUT/I-O", "Verifique OPEN antes del READ y el modo"],
  ["WRITE en archivo no abierto o no OUTPUT/I-O/EXTEND", "Verifique OPEN antes del WRITE y el modo"],
  ["DELETE o REWRITE sin archivo abierto como I-O", "Abra el archivo con OPEN I-O"],
  ["Error no especificado del sistema", "Revise mensajes del SO y log VSAM"],
  ["Error interno VSAM — contraseña o catálogo", "Revise RACF e integridad del catálogo VSAM"],
  ["Recurso no disponible — VSAM sin buffers", "Revise REGION y recursos del sistema"],
];

/* --- Abend --- */
const EN_AB = [
  ["Operation Exception — invalid instruction", "Check CALL/PERFORM target or corrupted load module"],
  ["Protection Exception — unauthorized storage access", "Check pointers, table subscripts, and addressing"],
  ["Data Exception — non-numeric data in numeric field", "INITIALIZE numeric fields and validate input"],
  ["Division by Zero", "Validate divisor before DIVIDE/COMPUTE"],
  ["Addressing Exception — address outside allocated storage", "Check pointers, BLL cells, and dynamic addressing"],
  ["Specification Exception — invalid operand specification", "Check COMP/COMP-1/COMP-2 alignment"],
  ["Error opening dataset — conflicting DCB or dataset missing", "Check JCL DCB, dataset existence, and DD"],
  ["Missing DD statement in JCL", "Add DD matching the program SELECT"],
  ["I/O error — read/write failure", "Check IEC messages in SYSLOG and device integrity"],
  ["Job cancelled by operator or CANCEL command", "Confirm cancellation reason with operations"],
  ["CPU time limit exceeded (TIME exhausted)", "Increase JOB/STEP TIME or optimize logic"],
  ["REGION SIZE limit exceeded for the step", "Increase REGION or reduce memory usage"],
  ["Module not found in STEPLIB/JOBLIB/LINKLIST", "Check module name and load libraries"],
  ["Insufficient virtual storage in the address space", "Check REGION, MEMLIMIT in JCL and system limits"],
  ["Insufficient region — below-the-bar storage exhausted", "Increase REGION or reduce below-the-bar usage"],
  ["Internal COBOL SORT failure", "Check SORT FIELDS, SORTWK DDs, and memory"],
  ["CICS transaction abend — ABEND command", "Review CICS transaction dump and exception logs"],
  ["DB2 call failed — connection or plan error", "Verify plan/package BIND and DB2 connection"],
  ["Dataset not found in catalog or on volume", "Check DSN in JCL and system catalog"],
  ["Security violation — unauthorized access (RACF/ACF2/Top Secret)", "Request access authorization"],
  ["Job waited too long for a resource (WAIT TIME exceeded)", "Check ENQUEUEs, locks, and deadlocks"],
  ["Module found but not executable (invalid or corrupted)", "Recompile and link-edit the module"],
  ["Disk space exhausted — no space on volume", "Increase allocation or add volumes in JCL"],
  ["No eligible volume has space available", "Free space or extend storage group volumes"],
];

const ES_AB = [
  ["Excepción de operación — instrucción inválida", "Revise CALL/PERFORM o módulo de carga dañado"],
  ["Excepción de protección — acceso a almacenamiento no autorizado", "Revise punteros, índices y direccionamiento"],
  ["Excepción de datos — dato no numérico en campo numérico", "INITIALIZE campos numéricos y valide entradas"],
  ["División por cero", "Valide el divisor antes de DIVIDE/COMPUTE"],
  ["Excepción de direccionamiento — dirección fuera del almacenamiento", "Revise punteros, BLL y direccionamiento dinámico"],
  ["Excepción de especificación — operando inválido", "Revise alineación COMP / COMP-1 / COMP-2"],
  ["Error al abrir dataset — DCB o dataset ausente", "Revise DCB del JCL, existencia y DD"],
  ["Falta DD en el JCL", "Añada el DD correspondiente al SELECT"],
  ["Error de E/S en lectura/escritura", "Revise mensajes IEC en SYSLOG y el dispositivo"],
  ["Job cancelado por operador o CANCEL", "Confirme el motivo con operaciones"],
  ["Tiempo de CPU excedido (TIME agotado)", "Aumente TIME en JOB/STEP u optimice"],
  ["Límite de REGION del step excedido", "Aumente REGION o reduzca memoria"],
  ["Módulo no hallado en STEPLIB/JOBLIB/LINKLIST", "Revise nombre y bibliotecas de carga"],
  ["Almacenamiento virtual insuficiente", "Revise REGION, MEMLIMIT y límites del sistema"],
  ["REGION insuficiente (below-the-bar)", "Aumente REGION o reduzca uso bajo la barra"],
  ["Fallo del SORT interno COBOL", "Revise SORT FIELDS, SORTWK y memoria"],
  ["Abend de transacción CICS — ABEND", "Revise volcado y logs de la transacción"],
  ["Fallo de llamada DB2 — plan o conexión", "Verifique BIND del plan/paquete y conexión"],
  ["Dataset no hallado en catálogo o volumen", "Revise DSN en JCL y catálogo"],
  ["Violación de seguridad — acceso no autorizado", "Solicite autorización RACF/ACF2/TSS"],
  ["Espera excesiva por recurso (WAIT TIME)", "Revise ENQUEUE, bloqueos y deadlocks"],
  ["Módulo hallado pero no ejecutable", "Recompile y enlace de nuevo"],
  ["Espacio en disco agotado en el volumen", "Aumente asignación o añada volúmenes"],
  ["Ningún volumen elegible con espacio", "Libere espacio o amplíe el storage group"],
];

/* --- SQL --- */
const EN_SQL = [
  ["SQL statement completed successfully", "No action required"],
  ["No row found or end of cursor", "Handle NOT FOUND or end FETCH loop"],
  ["No row found (same as +100)", "Handle NOT FOUND condition"],
  ["SQL syntax error — invalid token", "Review SQL syntax in the program"],
  ["Invalid datetime value", "Check datetime format and validity"],
  ["Datetime string invalid for specified format", "Correct the datetime string"],
  ["Undefined name — object not found in DB2", "Verify table/view/alias name in catalog"],
  ["Column does not exist in the specified table", "Verify column name in DB2 catalog"],
  ["Host variable assignment error — type/size mismatch", "Align host variable with DB2 column"],
  ["NULL value with no null indicator", "Add a null indicator to the host variable"],
  ["Cursor not open — FETCH without OPEN", "Execute OPEN CURSOR before FETCH"],
  ["Unique key violation — duplicate in unique index", "Ensure uniqueness before INSERT/UPDATE"],
  ["Package or plan not found in DB2 catalog", "Run BIND PACKAGE or BIND PLAN"],
  ["SELECT INTO returned more than one row", "Use a cursor or refine WHERE"],
  ["Precompile timestamp does not match BIND", "Re-precompile and BIND in the same process"],
  ["DB2 resource unavailable — restricted tablespace/index", "Check object status with DISPLAY DATABASE"],
  ["Deadlock or timeout — transaction rolled back", "Add retry logic and review locking"],
  ["Deadlock victim — transaction rolled back", "Retry and reorder table access"],
  ["Authorization failure — insufficient privilege", "Request GRANT from the DBA"],
  ["Language interface error — attachment facility", "Check DB2 connection and DSN interface"],
  ["Specific privilege not granted on table", "Request the required GRANT"],
  ["Foreign key violation — parent row missing", "Ensure parent exists before INSERT/UPDATE"],
];

const ES_SQL = [
  ["Sentencia SQL ejecutada con éxito", "No se requiere acción"],
  ["Sin fila o fin de cursor", "Trate NOT FOUND o cierre el bucle FETCH"],
  ["Sin fila encontrada (igual que +100)", "Trate la condición NOT FOUND"],
  ["Error de sintaxis SQL — token inválido", "Revise la sintaxis SQL"],
  ["Valor de fecha/hora inválido", "Revise formato y validez"],
  ["Cadena de fecha no válida para el formato", "Corrija la cadena datetime"],
  ["Nombre indefinido — objeto no hallado en DB2", "Verifique tabla/vista/alias en el catálogo"],
  ["La columna no existe en la tabla", "Verifique el nombre en el catálogo"],
  ["Error de asignación a variable host — tipo/tamaño", "Alinee variable host con la columna"],
  ["NULL sin indicador", "Añada indicador de nulo"],
  ["Cursor no abierto — FETCH sin OPEN", "Ejecute OPEN CURSOR antes del FETCH"],
  ["Violación de clave única", "Garantice unicidad antes de INSERT/UPDATE"],
  ["Paquete o plan no hallado", "Ejecute BIND PACKAGE o BIND PLAN"],
  ["SELECT INTO devolvió más de una fila", "Use cursor o refine WHERE"],
  ["Marca de tiempo de precompilación no coincide con BIND", "Precompile y BIND en el mismo proceso"],
  ["Recurso DB2 no disponible", "Revise estado con DISPLAY DATABASE"],
  ["Deadlock o timeout — rollback", "Añada reintento y revise bloqueos"],
  ["Víctima de deadlock — rollback", "Reintente y reordene accesos"],
  ["Fallo de autorización", "Solicite GRANT al DBA"],
  ["Error de interfaz de lenguaje", "Revise conexión DB2 y attachment"],
  ["Privilegio específico no concedido", "Solicite el GRANT necesario"],
  ["Violación de clave foránea — falta fila padre", "Inserte primero el padre"],
];

/* --- EIBRESP --- */
const EN_EIB = [
  ["CICS command completed successfully", "No action required"],
  ["Generic error — check EIBRESP2 for details", "Use EIBRESP2 to identify the specific error"],
  ["File (FCT entry) not defined in CICS", "Verify file definition in FCT/CSD"],
  ["Record not found in VSAM via CICS", "Treat as business condition or check key"],
  ["WRITE attempted with duplicate primary key", "Ensure key uniqueness before WRITE"],
  ["Duplicate alternate key during READ/BROWSE", "Check whether AIX duplicates are expected"],
  ["Invalid request — CICS command misused", "Check parameters and preconditions"],
  ["I/O error accessing VSAM through CICS", "Check VSAM integrity and CICS SYSLOG"],
  ["No space available in VSAM for WRITE", "Increase VSAM space or REPRO/reorg"],
  ["File is not open in CICS", "Open via CEMT or check CSD definition"],
  ["End of browse — no more records", "End BROWSE with ENDBR"],
  ["VSAM logic error — see EIBRESP2", "Interpret EIBRESP2 as VSAM reason code"],
  ["Length error — record length mismatch", "Check LENGTH on command vs VSAM record"],
  ["Temporary Storage queue is empty", "Ensure data was written before READQ"],
  ["Terminal attention (AID) signal received", "Handle the signal per transaction design"],
  ["TS/TD queue busy — held by another transaction", "Retry or wait for the queue"],
  ["Invalid TS item number", "Check item number and queue item count"],
  ["Program not found for LINK/XCTL", "Verify program in CSD and load library"],
  ["Transaction not defined in PCT", "Define transaction in CSD or check transid"],
  ["No more TD data to read", "Exit TD read loop"],
  ["Invalid Temporary Storage request", "Check READQ/WRITEQ/DELETEQ TS parameters"],
  ["Timer expired (DELAY/POST interval)", "Expected — continue post-timer logic"],
  ["BMS page return", "Handle paging per screen design"],
  ["Transaction routing failed (MRO/ISC)", "Check inter-region connectivity"],
  ["BMS map receive failed — empty map or CLEAR/PA", "Check user input and AID"],
  ["BMS map size incompatible with terminal", "Match mapset rows/cols to terminal model"],
  ["User not authorized for CICS resource (security)", "Request RACF/security authorization"],
  ["File or transaction is DISABLED", "Enable via CEMT/CSD after fixing root cause"],
  ["Failed to allocate remote session", "Check CONNECTION/SESSION definitions in CSD"],
  ["Invalid partition for terminal", "Check BMS partition definitions"],
  ["Terminal partitionset failure", "Review/recompile partitionset"],
  ["CICS overloaded — Max Task reached", "Retry or raise MXT with sysprog approval"],
  ["SYSID not defined or not reachable", "Verify CONNECTION and remote system CSD"],
  ["Exception suppressed by HANDLE/IGNORE/NOHANDLE", "Review HANDLE/IGNORE; prefer RESP()"],
];

const ES_EIB = [
  ["Comando CICS ejecutado con éxito", "No se requiere acción"],
  ["Error genérico — vea EIBRESP2", "Use EIBRESP2 para el detalle"],
  ["Archivo (FCT) no definido en CICS", "Verifique FCT/CSD"],
  ["Registro no hallado en VSAM vía CICS", "Trate como negocio o revise clave"],
  ["WRITE con clave primaria duplicada", "Garantice unicidad antes del WRITE"],
  ["Clave alterna duplicada en READ/BROWSE", "Compruebe si se esperan duplicados en AIX"],
  ["Petición inválida — comando mal usado", "Revise parámetros y precondiciones"],
  ["Error de E/S VSAM vía CICS", "Revise integridad VSAM y SYSLOG CICS"],
  ["Sin espacio VSAM para WRITE", "Aumente espacio o REPRO"],
  ["Archivo no abierto en CICS", "Abra vía CEMT o revise CSD"],
  ["Fin de browse — no hay más registros", "Cierre con ENDBR"],
  ["Error lógico VSAM — vea EIBRESP2", "Interprete EIBRESP2 como código VSAM"],
  ["Error de longitud", "Revise LENGTH vs registro VSAM"],
  ["Cola TS vacía", "Escriba datos antes del READQ"],
  ["Señal de atención del terminal", "Trate según el diseño"],
  ["Cola ocupada por otra transacción", "Reintente o espere"],
  ["Número de ítem TS inválido", "Revise ítem y cantidad"],
  ["Programa no hallado (LINK/XCTL)", "Verifique CSD y loadlib"],
  ["Transacción no definida en PCT", "Defina en CSD o revise transid"],
  ["Sin más datos en TD", "Salga del bucle de lectura"],
  ["Petición TS inválida", "Revise READQ/WRITEQ/DELETEQ"],
  ["Temporizador vencido", "Continúe la lógica posterior"],
  ["Retorno de página BMS", "Trate paginación"],
  ["Fallo de enrutado (MRO/ISC)", "Revise conectividad entre regiones"],
  ["Fallo RECEIVE de mapa BMS", "Revise entrada y AID"],
  ["Tamaño de mapa incompatible con terminal", "Ajuste mapa al modelo de terminal"],
  ["Usuario no autorizado (seguridad)", "Solicite autorización RACF"],
  ["Archivo o transacción DISABLED", "Habilite vía CEMT/CSD"],
  ["Fallo al asignar sesión remota", "Revise CONNECTION/SESSION en CSD"],
  ["Partición inválida", "Revise particiones BMS"],
  ["Fallo del partitionset", "Revise/recompile partitionset"],
  ["CICS saturado — Max Task", "Reintente o aumente MXT con sysprog"],
  ["SYSID no definido o inaccesible", "Revise CONNECTION y sistema remoto"],
  ["Excepción suprimida por HANDLE/IGNORE", "Revise HANDLE/IGNORE; prefiera RESP()"],
];

const fsMaps = pairMap(FS_CODES, EN_FS, ES_FS);
const abMaps = pairMap(ABEND_CODES, EN_AB, ES_AB);
const sqlMaps = pairMap(SQL_CODES, EN_SQL, ES_SQL);
const eibMaps = pairMap(EIB_CODES, EN_EIB, ES_EIB);

const JCL_TIPS_EN = [
  {
    id: "tip-dd",
    title: "Essential DD parameters",
    content:
      "<dl>" +
      "<dt>DSN=</dt><dd>Dataset name (up to 44 chars). Use <code>&amp;&amp;TEMP</code> for temporaries and <code>*.stepname.ddname</code> for backward references.</dd>" +
      "<dt>DISP=(status,normal,abend)</dt><dd><strong>status:</strong> NEW, OLD, SHR, MOD. <strong>normal/abend:</strong> KEEP, DELETE, CATLG, UNCATLG, PASS.</dd>" +
      "<dt>SPACE=(unit,(prim,sec,dir))</dt><dd><strong>unit:</strong> TRK, CYL, or bytes. <strong>prim/sec:</strong> primary/secondary allocation. <strong>dir:</strong> directory blocks for PDS.</dd>" +
      "<dt>DCB=(RECFM=,LRECL=,BLKSIZE=)</dt><dd><strong>RECFM:</strong> FB, VB, FBA, etc. <strong>LRECL:</strong> logical record length. <strong>BLKSIZE:</strong> block size (0 = system default).</dd>" +
      "<dt>UNIT= / VOL=SER=</dt><dd>Device (e.g. SYSDA) and specific volume. SMS often assigns this automatically.</dd>" +
      "<dt>SYSOUT=</dt><dd>Spool class. <code>SYSOUT=*</code> uses the job MSGCLASS. <code>SYSOUT=A</code> selects class A.</dd>" +
      "</dl>",
  },
  {
    id: "tip-rc",
    title: "Return codes and error handling",
    content:
      "<dl>" +
      "<dt>RC = 0</dt><dd>Successful completion.</dd>" +
      "<dt>RC = 4</dt><dd>Warning — review compiler/listing messages.</dd>" +
      "<dt>RC = 8</dt><dd>Recoverable error — results may be incomplete.</dd>" +
      "<dt>RC = 12</dt><dd>Severe error — output not reliable.</dd>" +
      "<dt>RC = 16</dt><dd>Step could not complete the main operation.</dd>" +
      "<dt>RC &gt; 16</dt><dd>Critical/abnormal condition.</dd>" +
      "<dt>MAXCC</dt><dd>Highest step return code in JES2 — inspect each step.</dd>" +
      "</dl>",
  },
  {
    id: "tip-util",
    title: "Essential z/OS utilities",
    content:
      "<dl>" +
      "<dt>IEBGENER</dt><dd>Copy sequential datasets — SYSUT1 in, SYSUT2 out; <code>SYSIN DD DUMMY</code> for straight copy.</dd>" +
      "<dt>IEBCOPY</dt><dd>Copy, compress, merge PDS — deploy load modules and copybooks.</dd>" +
      "<dt>IEFBR14</dt><dd>No-op program — drives DISP to create/delete datasets.</dd>" +
      "<dt>IDCAMS</dt><dd>VSAM: DEFINE, DELETE, REPRO, LISTCAT, VERIFY, etc.</dd>" +
      "<dt>DFSORT / SYNCSORT</dt><dd>Sort, merge, INCLUDE/OMIT, INREC/OUTREC, OUTFIL.</dd>" +
      "<dt>IKJEFT01</dt><dd>TSO in batch — DSN, REXX, CLIST.</dd>" +
      "</dl>",
  },
  {
    id: "tip-cond",
    title: "COND vs IF/THEN/ELSE",
    content:
      "<dl>" +
      "<dt>COND (legacy)</dt><dd><code>COND=(4,LT)</code> skips the step when 4 is less than a prior RC (read the manual carefully — easy to misread).</dd>" +
      "<dt>COND with step</dt><dd><code>COND=(8,LE,STEP01)</code> tests a specific step’s RC.</dd>" +
      "<dt>COND=EVEN</dt><dd>Runs even if a prior step abended — cleanup.</dd>" +
      "<dt>COND=ONLY</dt><dd>Runs only if a prior step abended — error handling.</dd>" +
      "<dt>IF/THEN/ELSE</dt><dd><code>// IF STEP01.RC &lt;= 4 THEN</code> — prefer for clarity over COND.</dd>" +
      "<dt>IF ABEND</dt><dd><code>// IF STEP01.ABEND THEN</code> — test abend of a step.</dd>" +
      "</dl>",
  },
];

const JCL_TIPS_ES = [
  {
    id: "tip-dd",
    title: "Parámetros DD esenciales",
    content:
      "<dl>" +
      "<dt>DSN=</dt><dd>Nombre del dataset (hasta 44 caracteres). Use <code>&amp;&amp;TEMP</code> para temporales y <code>*.stepname.ddname</code> para referencia hacia atrás.</dd>" +
      "<dt>DISP=(estado,normal,abend)</dt><dd><strong>estado:</strong> NEW, OLD, SHR, MOD. <strong>normal/abend:</strong> KEEP, DELETE, CATLG, UNCATLG, PASS.</dd>" +
      "<dt>SPACE=(unidad,(prim,sec,dir))</dt><dd><strong>unidad:</strong> TRK, CYL o bytes. <strong>prim/sec:</strong> asignación primaria/secundaria. <strong>dir:</strong> bloques de directorio en PDS.</dd>" +
      "<dt>DCB=(RECFM=,LRECL=,BLKSIZE=)</dt><dd><strong>RECFM:</strong> FB, VB, FBA, etc. <strong>LRECL:</strong> longitud lógica. <strong>BLKSIZE:</strong> tamaño de bloque (0 = por defecto).</dd>" +
      "<dt>UNIT= / VOL=SER=</dt><dd>Dispositivo (p. ej. SYSDA) y volumen. SMS suele asignarlo automáticamente.</dd>" +
      "<dt>SYSOUT=</dt><dd>Clase de spool. <code>SYSOUT=*</code> usa MSGCLASS del JOB. <code>SYSOUT=A</code> elige clase A.</dd>" +
      "</dl>",
  },
  {
    id: "tip-rc",
    title: "Códigos de retorno y errores",
    content:
      "<dl>" +
      "<dt>RC = 0</dt><dd>Ejecución correcta.</dd>" +
      "<dt>RC = 4</dt><dd>Advertencia — revise listados.</dd>" +
      "<dt>RC = 8</dt><dd>Error recuperable — resultados pueden estar incompletos.</dd>" +
      "<dt>RC = 12</dt><dd>Error grave — salida no fiable.</dd>" +
      "<dt>RC = 16</dt><dd>El paso no completó la operación principal.</dd>" +
      "<dt>RC &gt; 16</dt><dd>Condición crítica o anómala.</dd>" +
      "<dt>MAXCC</dt><dd>Mayor RC entre pasos en JES2 — revise cada paso.</dd>" +
      "</dl>",
  },
  {
    id: "tip-util",
    title: "Utilidades z/OS esenciales",
    content:
      "<dl>" +
      "<dt>IEBGENER</dt><dd>Copia secuencial — SYSUT1 entrada, SYSUT2 salida; <code>SYSIN DD DUMMY</code> para copia directa.</dd>" +
      "<dt>IEBCOPY</dt><dd>Copia, compresión y merge de PDS.</dd>" +
      "<dt>IEFBR14</dt><dd>Programa vacío — usa DISP para crear/borrar datasets.</dd>" +
      "<dt>IDCAMS</dt><dd>VSAM: DEFINE, DELETE, REPRO, LISTCAT, VERIFY, etc.</dd>" +
      "<dt>DFSORT / SYNCSORT</dt><dd>Sort, merge, INCLUDE/OMIT, INREC/OUTREC, OUTFIL.</dd>" +
      "<dt>IKJEFT01</dt><dd>TSO en batch — DSN, REXX, CLIST.</dd>" +
      "</dl>",
  },
  {
    id: "tip-cond",
    title: "COND frente a IF/THEN/ELSE",
    content:
      "<dl>" +
      "<dt>COND (legado)</dt><dd><code>COND=(4,LT)</code> omite el paso según comparación con RC anterior (léase el manual; es fácil equivocarse).</dd>" +
      "<dt>COND con paso</dt><dd><code>COND=(8,LE,STEP01)</code> prueba un paso concreto.</dd>" +
      "<dt>COND=EVEN</dt><dd>Ejecuta aunque un paso anterior haya hecho abend — limpieza.</dd>" +
      "<dt>COND=ONLY</dt><dd>Solo si hubo abend — tratamiento de error.</dd>" +
      "<dt>IF/THEN/ELSE</dt><dd><code>// IF STEP01.RC &lt;= 4 THEN</code> — preferible por claridad.</dd>" +
      "<dt>IF ABEND</dt><dd><code>// IF STEP01.ABEND THEN</code> — prueba abend de un paso.</dd>" +
      "</dl>",
  },
];

export const OVERLAYS = {
  en: {
    fileStatus: fsMaps.en,
    abendCodes: abMaps.en,
    sqlcodes: sqlMaps.en,
    eibresp: eibMaps.en,
    jclTips: JCL_TIPS_EN,
  },
  es: {
    fileStatus: fsMaps.es,
    abendCodes: abMaps.es,
    sqlcodes: sqlMaps.es,
    eibresp: eibMaps.es,
    jclTips: JCL_TIPS_ES,
  },
};
