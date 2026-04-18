/* -------------------------------------------------------------------------
   I18N.JS - Sistema de Internacionalização do Portfólio
   Detecção automática de idioma + switcher manual
   Idiomas: pt-BR (padrão/HTML), en, es
   Vanilla JS - Sem dependências - Sem modificação no HTML
-------------------------------------------------------------------------- */

(() => {
  "use strict";

  const SUPPORTED = ["pt-BR", "en", "es"];
  const DEFAULT_LANG = "pt-BR";
  const STORAGE_KEY = "portfolio-lang";

  /* -- TRADUÇÕES --------------------------------------------------------- */

  const en = {
    // - Shared -
    skip: "Skip to main content",

    // -- Index page --
    "idx.title": "Douglas Assumpção Rodrigues | Mainframe Developer",
    "idx.meta.desc":
      "18+ years in mission-critical financial systems. Specialist in COBOL, DB2, CICS, and JCL. Career, certifications, and contact.",
    "idx.headline":
      'Mainframe <span class="text-accent">Developer</span> | Banking systems that can\'t stop',
    "idx.status": "Open to Opportunities",
    "idx.bio":
      "90% of banking transactions in Brazil run on mainframes.<br>I write, optimize, and support the COBOL, DB2, and CICS code behind them.<br>Want to know how? It's all in the links below.",
    "idx.section.links": "Next Steps",
    "idx.skills.extra.title": "Complementary Skills",
    "idx.heroStat.years": "Years of experience",
    "idx.heroStat.programs": "Authored programs",
    "idx.heroStat.incidents": "Incidents resolved",
    "idx.link1.title": "Mainframe Lab",
    "idx.link1.desc": "97 original programs - see in practice what I master",
    "idx.link2.title": "My Full Journey",
    "idx.link2.desc":
      "Experience, recommendations, and what doesn't fit on a résumé",
    "idx.link3.title": "Résumé - Straight to the Point",
    "idx.link3.desc": "One page with what truly matters for your position",
    "idx.link4.title": "Validated Certifications",
    "idx.link4.desc": "Credentials that speak for me when I'm not in the room",
    "idx.link5.title": "Send Your Proposal",
    "idx.link5.desc": "I reply within 24h - no forms, no bots",
    "idx.link6.title": "Quick Chat",
    "idx.link6.desc": "Good opportunities don't wait - let's talk now",
    "idx.skills.title": "Technical Expertise",
    "idx.footer": "Built with the same precision as a mission-critical system.",
    "idx.email.toast": "Email copied! I look forward to hearing from you.",
    "visit.label": "Visits",

    // -- Lab page --
    "lab.title":
      "Mainframe Lab | Douglas Assumpção Rodrigues - COBOL, JCL, DB2, CICS Programs & Quick Reference",
    "lab.meta.desc":
      "Douglas Assumpção Rodrigues's technical portfolio: 97 reusable mainframe modules in COBOL, HLASM, JCL, CICS, DB2, IMS, and VSAM - utility tools for the mainframe developer.",
    "lab.back": "Back to Home",
    "lab.breadcrumb.current": "Mainframe Lab",
    "lab.header.desc":
      "97 reusable modules I wrote, tested, and refined. Browse the code and see, in practice, utility tools that accelerate mainframe development.",
    "lab.stat.programs": "Programs in Lab",
    "lab.stat.techs": "Technologies",
    "lab.stat.years": "Years of experience",
    "lab.stat.incidents": "Incidents resolved",
    "lab.search.placeholder": "Search by name, technology, or description...",
    "lab.tab.ref": "Quick Reference",
    "lab.footer": "Mainframe Lab - Code, reference, and precision.",
    "lab.scrolltop": "Back to top",

    // Badges & status
    "badge.basic": "Basic",
    "badge.intermediate": "Intermediate",
    "badge.advanced": "Advanced",
    "status.dev": "Coming Soon",

    // Section titles & descriptions
    "lab.cobol.title": "COBOL Programs",
    "lab.cobol.desc":
      "Reusable subprograms via CALL USING - utility modules that speed up development and standardize common routines in day-to-day mainframe work.",
    "lab.hlasm.title": "HLASM Modules",
    "lab.hlasm.desc":
      "Utility routines in z/OS Assembler - each module includes two versions: base-displacement and relative addressing (z/Architecture).",
    "lab.jcl.title": "JCL Templates",
    "lab.jcl.desc":
      "Ready-to-use jobs - JCL templates for compilation, sort, utilities, and dataset operations in day-to-day z/OS.",
    "lab.cics.title": "CICS Programs",
    "lab.cics.desc":
      "CICS online programs - transactions, BMS, queues, browse, and resource control for the IBM transactional environment.",
    "lab.db2.title": "DB2 Programs",
    "lab.db2.desc":
      "COBOL programs with embedded SQL - cursors, dynamic SQL, lock control, savepoints, and advanced queries in DB2 for z/OS.",
    "lab.ims.title": "IMS Programs",
    "lab.ims.desc":
      "DL/I programs for IMS - hierarchical navigation, BMP, checkpoint/restart, qualified SSAs, and conversational transactions.",
    "lab.vsam.title": "VSAM Programs",
    "lab.vsam.desc":
      "COBOL programs for VSAM - KSDS, RRDS, alternate index, browse, batch update, and backup/restore.",
    "lab.ref.title": "Quick Reference",
    "lab.ref.desc":
      "File-Status, SQLCODEs, Abend Codes, EIBRESP, and JCL tips - the reference I compiled to solve problems without wasting time.",

    // Reference sub-sections
    "lab.ref.fs.title": "COBOL File-Status",
    "lab.ref.fs.desc": "Return codes from I/O operations on COBOL files.",
    "lab.ref.abend.title": "z/OS Abend Codes",
    "lab.ref.abend.desc": "Abnormal termination codes for z/OS programs.",
    "lab.ref.sql.title": "DB2 SQLCODEs",
    "lab.ref.sql.desc": "Return codes from SQL operations in DB2 for z/OS.",
    "lab.ref.eib.title": "CICS EIBRESP Codes",
    "lab.ref.eib.desc":
      "EIBRESP response codes returned by EXEC CICS commands.",
    "lab.ref.tips.title": "Quick JCL Tips",
    "lab.ref.tips.desc":
      "Practical reference for the day-to-day mainframe developer.",

    // Table headers
    "th.code": "Code",
    "th.meaning": "Meaning",
    "th.action": "Suggested Action",
    "th.name": "Name",

    // JCL tip titles
    "tip.dd": "Essential DD Parameters",
    "tip.rc": "Standard Return Codes",
    "tip.util": "Most Used Utilities",
    "tip.cond": "COND vs IF/THEN/ELSE",

    // Certifications page --
    "cert.title":
      "Certifications | Douglas Assumpção Rodrigues - Validated Credentials",
    "cert.meta.desc":
      "Professional certifications from Douglas Assumpção Rodrigues: Azure AZ-900 and validated credentials proving technical expertise in mission-critical technologies.",
    "cert.back": "Back to Home",
    "cert.breadcrumb.current": "Certifications",
    "cert.header.desc":
      "Credentials that validate my technical knowledge. Each certification was earned through dedicated study and represents proven mastery in the field.",
    "cert.az900.title": "Azure Fundamentals",
    "cert.az900.desc":
      "Cloud computing fundamentals, Azure services, security, privacy, compliance, and pricing models.",
    "cert.btn.view": "View Certificate",
    "cert.btn.verify": "Verify on Credly",
    "cert.scjp.title": "Oracle Certified Java Programmer (SCJP)",
    "cert.scjp.desc":
      "Certification validating advanced Java SE 6 proficiency: object-oriented programming, collections, threads, generics, I/O, and exception handling.",
    "cert.note":
      "New certifications in progress. This page is updated as new credentials are earned.",
    "cert.footer": "Credentials that prove - not just claim.",

    // Curriculum page
    "cv.title":
      "Résumé | Douglas Assumpção Rodrigues - Software Engineer III Mainframe",
    "cv.meta.desc":
      "Résumé of Douglas Assumpção Rodrigues: 18+ years in Mainframe software engineering for mission-critical financial systems. Assembler z/OS, COBOL, DB2, CICS specialist.",
    "cv.back": "Back to Home",
    "cv.breadcrumb.current": "Résumé",
    "cv.subtitle": "Software Engineer III - Mainframe",
    "cv.summary":
      "Mainframe Software Engineer with 18+ years of experience in mission-critical financial systems. Specialist in Assembler z/OS, COBOL, DB2, and CICS, with a proven track record of reducing incident resolution time and driving revenue growth. Deep expertise in VISA and Elo card systems based on ISO 8583, operating in high-availability, high-volume environments.",
    "cv.section.exp": "Professional Experience",
    "cv.current": "Present",

    // Job 0 - Banco Bradesco (Apr 2024 - Present)
    "cv.job0.role": "Software Engineer III",
    "cv.job0.company":
      "One of the largest private banks in Latin America, with over 70 million customers and mission-critical Mainframe infrastructure.",
    "cv.job0.h1":
      "Ensures the stability of the Current Accounts system, safeguarding operations that impact millions of customers daily.",
    "cv.job0.h2":
      "Responsible for analysis, diagnosis, and resolution of P3 and P4 incidents in high-volume Mainframe z/OS environments.",
    "cv.job0.h3":
      "Technical reference in Assembler z/OS within the team, serving as focal point for low-level analysis and complex ABEND debugging.",
    "cv.job0.h4":
      "Created automation macros for repetitive team tasks, significantly reducing time spent on recurring operational activities.",
    "cv.job0.h5":
      "Developed an AI multi-agent system to optimize development and analysis workflow, reducing delivery time by up to 40%.",

    // Job 1 - Capgemini (Nov 2023 - Apr 2024)
    "cv.job1.role": "Solutions Consultant IV",
    "cv.job1.company":
      "Leading multinational consultancy in digital transformation, present in 50+ countries with a focus on technology solutions for the financial sector.",
    "cv.job1.h1":
      "Assigned to Banco Bradesco as a senior consultant for Accounts System sustainability, handling critical incidents under strict SLAs.",
    "cv.job1.h2":
      "Recognized as the Assembler z/OS reference in the team, performing deep dump and trace analysis for hard-to-diagnose issues.",
    "cv.job1.h3":
      "Productivity index 22% above team average: 19.52h per incident (avg: 25h), focused on root cause analysis and recurrence prevention.",

    // Job 2 - Prover Solucoes (Oct 2010 - Nov 2023)
    "cv.job2.role":
      "Project Manager / Systems Analyst / Mainframe Developer",
    "cv.job2.company":
      "Technology company specialized in financial systems for card processors and banking institutions.",
    "cv.job2.h1":
      "Architected and developed Mainframe financial systems that drove company revenue growth by approximately 10% per year for 13 consecutive years.",
    "cv.job2.h2":
      "Led the adoption of Agile methodologies (Scrum) in the Mainframe team, optimizing deliveries and saving around R$20,000 per year in rework hours.",
    "cv.job2.h3":
      "Hands-on involvement in the full development lifecycle: requirements gathering, analysis, coding, testing, and production deployment.",

    // Job 3 - INFOserver (Jul 2007 - Oct 2010)
    "cv.job3.role": "Systems Analyst and Developer",
    "cv.job3.company":
      "Technology company specialized in solutions for the financial market and electronic transaction processing.",
    "cv.job3.h1":
      "Developed and maintained Mainframe systems for credit and debit card transaction processing (VISA/ELO).",
    "cv.job3.h2":
      "Implemented financial reconciliation routines and payment network interfaces based on ISO 8583.",

    "cv.section.skills": "Technical Skills",
    "cv.skills.dev": "Development",
    "cv.skills.tools": "Tools & Methods",
    "cv.section.edu": "Education",
    "cv.edu0.degree": "Postgraduate in IT Management and Governance",
    "cv.edu1.degree": "Technologist in IT Management",
    "cv.section.certs": "Certifications",
    "cv.section.lang": "Languages",
    "cv.lang.pt": "Portuguese",
    "cv.lang.pt.level": "Native",
    "cv.lang.en": "English",
    "cv.lang.en.level":
      "Advanced (reading/writing), Intermediate (speaking)",
    "cv.footer": "One page with what truly matters.",
    "cv.cta.print": "Print / Save as PDF",

    // -- Card names & descriptions (97 cards) --
    // COBOL (13)
    "card.COB01001.name": "Field Formatter",
    "card.COB01001.desc":
      "Subprogram for LTRIM, RTRIM, LPAD, RPAD, and CENTER of alphanumeric fields via LINKAGE SECTION.",
    "card.COB01002.name": "Date Converter",
    "card.COB01002.desc":
      "Converts between GREGORIAN, JULIAN, YYYY-MM-DD, and Julian CYYDDD with validation and day-of-week.",
    "card.COB01003.name": "Structured Logger",
    "card.COB01003.desc":
      "Writes timestamp, severity, and source module to sequential file via OPEN/WRITE/CLOSE.",
    "card.COB01004.name": "CSV Parser",
    "card.COB01004.desc":
      "Splits a CSV line into individual fields with configurable delimiter and quoted field support.",
    "card.COB01005.name": "In-Memory Table Search",
    "card.COB01005.desc":
      "Loads key-value pairs from a parameter file into a searchable internal table (LOAD/FIND/COUNT).",
    "card.COB01006.name": "Data Masking",
    "card.COB01006.desc":
      "Anonymizes sensitive fields using TOTAL, PARTIAL, HASH, EMAIL, and PHONE strategies for LGPD compliance.",
    "card.COB01007.name": "Sort & Merge",
    "card.COB01007.desc":
      "SORT with INPUT/OUTPUT PROCEDURE, record validation, and duplicate removal by key.",
    "card.COB01008.name": "Control Break Report",
    "card.COB01008.desc":
      "Control break at 3 levels (branch/dept/employee) with subtotals, page header, and ASA.",
    "card.COB01009.name": "Table Management",
    "card.COB01009.desc":
      "Internal table with SEARCH ALL (binary) and sequential SEARCH, insert/remove with order maintenance.",
    "card.COB01010.name": "Numeric Converter",
    "card.COB01010.desc":
      "Converts numbers to words in Portuguese, formats currency (R$), calculates percentage, and rounds.",
    "card.COB01011.name": "Report Engine",
    "card.COB01011.desc":
      "Report generator with header, footer, page overflow, accumulators, and ASA carriage control.",
    "card.COB01012.name": "Transaction Watchdog",
    "card.COB01012.desc":
      "Watch/merge master-transaction with I/O operations, HIGH-VALUES sentinel, and exception report.",
    "card.COB01013.name": "String Manipulation",
    "card.COB01013.desc":
      "UPPER, LOWER, SPLIT, JOIN, SUBSTR, COUNT, and REPLACE operations using INSPECT/STRING/UNSTRING.",
    // HLASM (15)
    "card.ASM01001.name": "Hex Dump Utility",
    "card.ASM01001.desc":
      "Routine for hexadecimal dump of memory areas - essential for low-level debugging.",
    "card.ASM01002.name": "Return Code Logger",
    "card.ASM01002.desc":
      "Logs program RC to WTO with step name and severity indicator.",
    "card.ASM01003.name": "Timestamp Formatter",
    "card.ASM01003.desc":
      "Gets the system TOD clock and converts to readable YYYY-MM-DD HH:MM:SS format.",
    "card.ASM01004.name": "EBCDIC to ASCII Converter",
    "card.ASM01004.desc":
      "Converts buffers between EBCDIC and ASCII using 256-byte TR translation tables.",
    "card.ASM01005.name": "Bitwise Operations",
    "card.ASM01005.desc":
      "Routine to test, set, clear, and toggle individual bits using NI, OI, XI, and TM.",
    "card.ASM01006.name": "Binary Table Search",
    "card.ASM01006.desc":
      "Optimized binary search table with CLC comparison and SRL division.",
    "card.ASM01007.name": "Pack/Unpack Converter",
    "card.ASM01007.desc":
      "Converts between zoned, packed, and binary formats using PACK, UNPK, CVD, and CVB.",
    "card.ASM01008.name": "Buffer Comparison",
    "card.ASM01008.desc":
      "Moves and compares long blocks with MVCL, CLCL, and MVC propagation technique.",
    "card.ASM01009.name": "Character Translation",
    "card.ASM01009.desc":
      "Three table search techniques: TRT (translate and test), BALR, and BAS.",
    "card.ASM01010.name": "Subroutine Linkage",
    "card.ASM01010.desc":
      "Standard save area, parameter list, and CALL for internal and external subroutines.",
    "card.ASM01011.name": "Dynamic Program Load",
    "card.ASM01011.desc":
      "Uses LOAD, DELETE, LINK, and XCTL for dynamic manipulation of load modules.",
    // HLASM-CICS hybrid (3)
    "card.ASMCENV1.name": "CICS Environment Inspector (HLASM)",
    "card.ASMCENV1.desc":
      "HLASM routine that inspects the CICS environment via EXEC CICS ASSIGN in Assembler.",
    "card.ASMCBMS1.name": "CICS BMS Map (HLASM)",
    "card.ASMCBMS1.desc":
      "BMS map handling in Assembler with SEND MAP/RECEIVE MAP and attribute byte manipulation.",
    "card.ASMCABD1.name": "CICS Abend Handler (HLASM)",
    "card.ASMCABD1.desc":
      "HANDLE ABEND in Assembler with formatted diagnostic capture for low-level recovery.",
    // HLASM-DB2 hybrid (3)
    "card.ASMDSEL1.name": "DB2 SELECT (HLASM)",
    "card.ASMDSEL1.desc":
      "Static SQL SELECT in Assembler with SQLCA processing and result handling.",
    "card.ASMDCUR1.name": "DB2 Cursor (HLASM)",
    "card.ASMDCUR1.desc":
      "Cursor DECLARE/OPEN/FETCH/CLOSE in Assembler with positioned UPDATE.",
    "card.ASMDDYN1.name": "DB2 Dynamic SQL (HLASM)",
    "card.ASMDDYN1.desc":
      "PREPARE and EXECUTE of dynamic SQL in Assembler with parameter markers.",
    // HLASM-IMS hybrid (3)
    "card.ASMIGN01.name": "IMS GN/GU (HLASM)",
    "card.ASMIGN01.desc":
      "IMS GU/GN in Assembler with SSA construction and PCB processing.",
    "card.ASMIHNV1.name": "IMS Hierarchy Navigator (HLASM)",
    "card.ASMIHNV1.desc":
      "Navigates IMS hierarchical levels in Assembler with command code handling.",
    "card.ASMICHK1.name": "IMS Checkpoint (HLASM)",
    "card.ASMICHK1.desc":
      "CHKP/XRST in Assembler for BMP restart with position control.",
    // HLASM-VSAM hybrid (3)
    "card.ASMVSRD1.name": "VSAM Sequential Read (HLASM)",
    "card.ASMVSRD1.desc":
      "Sequential VSAM read in Assembler with ACB/RPL and feedback decoding.",
    "card.ASMVKSD1.name": "VSAM KSDS (HLASM)",
    "card.ASMVKSD1.desc":
      "KSDS operations in Assembler: keyed GET/PUT/ERASE via ACB and RPL.",
    "card.ASMVBRW1.name": "VSAM Browse (HLASM)",
    "card.ASMVBRW1.desc":
      "VSAM browse in Assembler with positioning (POINT) and sequential scan.",
    // JCL (13)
    "card.JCL01001.name": "Compile-Link-Go",
    "card.JCL01001.desc":
      "Standard JCL to compile COBOL source, link-edit objects, and execute load module in one job.",
    "card.JCL01002.name": "Dataset Copy",
    "card.JCL01002.desc":
      "Copies sequential datasets and PDS members using IEBGENER and IEBCOPY with practical examples.",
    "card.JCL01003.name": "IDCAMS KSDS Definition",
    "card.JCL01003.desc":
      "Defines and initializes a VSAM KSDS with specific sizing and indexing parameters.",
    "card.JCL01004.name": "DFSORT Formatting",
    "card.JCL01004.desc":
      "Generates formatted report from input file using DFSORT with OUTFIL and HEADER/TRAILER.",
    "card.JCL01005.name": "ICETOOL Statistics",
    "card.JCL01005.desc":
      "Demonstrates ICETOOL operations: SELECT, SORT, SPLICE, DISPLAY, STATS, and OCCUR.",
    "card.JCL01006.name": "Backup/Restore",
    "card.JCL01006.desc":
      "Uses ADRDSSU for dataset backup (DUMP) and post-restore verification.",
    "card.JCL01007.name": "GDG Management",
    "card.JCL01007.desc": "Defines and manages GDG bases using IDCAMS.",
    "card.JCL01008.name": "SORT/MERGE Options",
    "card.JCL01008.desc":
      "Advanced sorting using PARM='MSGPRT=ALL, DYNALLOC, LIST' and various options.",
    "card.JCL01009.name": "DFSORT Joins",
    "card.JCL01009.desc":
      "Advanced JOINKEYS: Joins two files by key with JOIN UNPAIRED and REFORMAT fields.",
    "card.JCL01010.name": "Conditional Execution",
    "card.JCL01010.desc":
      "IF/THEN/ELSE/ENDIF for advanced flow control with SET of symbolic variables.",
    "card.JCLSORT02.name": "DFSORT with OUTFIL",
    "card.JCLSORT02.desc":
      "Advanced SORT with multiple OUTFIL, INCLUDE/OMIT, BUILD, SECTIONS, and TRAILER for subtotals.",
    "card.JCLPROC02.name": "Procedure with Overrides",
    "card.JCLPROC02.desc":
      "Defines cataloged PROC with symbolics, executes with DD and parameter overrides.",
    "card.JCLIDCAM2.name": "IDCAMS Multi-Ops",
    "card.JCLIDCAM2.desc":
      "IDCAMS with DELETE/DEFINE CLUSTER/AIX/PATH, REPRO, LISTCAT, and VERIFY in a single step.",
    // CICS (13)
    "card.CICSABDL.name": "Abend Handler",
    "card.CICSABDL.desc":
      "HANDLE ABEND with code capture, formatted diagnostics, and TDQ logging for recovery.",
    "card.CICSENQM.name": "ENQ/DEQ Manager",
    "card.CICSENQM.desc":
      "Concurrent access control with ENQ/DEQ and deadlock detection via EIBRESP.",
    "card.CICSENVI.name": "Environment Inspector",
    "card.CICSENVI.desc":
      "Collects CICS environment info via ASSIGN: terminal, user, transaction, system.",
    "card.CICSRESO.name": "Resource Discovery",
    "card.CICSRESO.desc":
      "Queries available CICS resources (programs, files, transactions) via INQUIRE.",
    "card.CICSTLOG.name": "Transaction Logger",
    "card.CICSTLOG.desc":
      "Records transaction events to TSQ with timestamp, type, and context data.",
    "card.CICSTSQM.name": "TSQ Manager",
    "card.CICSTSQM.desc":
      "Full TSQ operations: WRITEQ TS, READQ TS, DELETEQ TS with item control.",
    "card.CICSBMS01.name": "BMS SEND/RECEIVE Map",
    "card.CICSBMS01.desc":
      "Pseudo-conversational transaction with SEND MAP, RECEIVE MAP and field validation.",
    "card.CICSBROW.name": "VSAM Browse via CICS",
    "card.CICSBROW.desc":
      "STARTBR, READNEXT, READPREV, and ENDBR for VSAM record pagination in CICS.",
    "card.CICSCRUD.name": "Full CRUD",
    "card.CICSCRUD.desc":
      "READ UPDATE, REWRITE, WRITE, and DELETE with DUPREC, NOSPACE, and NOTFND handling.",
    "card.CICSTDQ01.name": "TDQ Queues",
    "card.CICSTDQ01.desc":
      "WRITEQ TD and READQ TD for intra and extrapartition queues with message formatting.",
    "card.CICSXCTL.name": "XCTL/LINK",
    "card.CICSXCTL.desc":
      "Demonstrates LINK (with return) and XCTL (no return) with COMMAREA between programs.",
    "card.CICSJRNL.name": "Journal Manager",
    "card.CICSJRNL.desc":
      "WRITE JOURNALNAME for audit trail with before/after images of transactions.",
    "card.CICSSTRT.name": "Async START/RETRIEVE",
    "card.CICSSTRT.desc":
      "EXEC CICS START for deferred processing and RETRIEVE for the initiated transaction.",
    // DB2 (13)
    "card.DB2CATIQ.name": "Catalog Inspector",
    "card.DB2CATIQ.desc":
      "Queries SYSIBM.SYSTABLES, SYSCOLUMNS, and SYSINDEXES for DB2 object metadata.",
    "card.DB2CMTBH.name": "Commit Batch Handler",
    "card.DB2CMTBH.desc":
      "Batch processing with configurable periodic COMMIT and restart point control.",
    "card.DB2RETR.name": "Data Retrieval",
    "card.DB2RETR.desc":
      "SELECT with multiple conditions, cursor for result set, and output formatting.",
    "card.DB2DYNEX.name": "Dynamic SQL",
    "card.DB2DYNEX.desc":
      "PREPARE and EXECUTE of dynamic SQL with parameter markers and DESCRIBE for metadata.",
    "card.DB2HLTH.name": "Health Check",
    "card.DB2HLTH.desc":
      "Checks DB2 object health: tablespace status, RUNSTATS, REORG pending.",
    "card.DB2SQLCD.name": "SQLCODE Decoder",
    "card.DB2SQLCD.desc":
      "Receives SQLCODE and returns descriptive message, severity, and recommended action.",
    "card.DB2CURS01.name": "Multiple Cursors",
    "card.DB2CURS01.desc":
      "Nested master-detail cursor, with HOLD and FOR UPDATE with positioned UPDATE/DELETE.",
    "card.DB2BULK01.name": "Bulk Load",
    "card.DB2BULK01.desc":
      "BATCH INSERT with COMMIT every N records, duplicate control, and statistics.",
    "card.DB2TEMP01.name": "Temporary Tables",
    "card.DB2TEMP01.desc":
      "DECLARE GLOBAL TEMPORARY TABLE with INSERT and SELECT JOIN for session data.",
    "card.DB2LOCK01.name": "Concurrency Control",
    "card.DB2LOCK01.desc":
      "FOR UPDATE with RS/RR isolation, deadlock detection (-911/-913) and retry.",
    "card.DB2SPRC01.name": "Stored Procedure",
    "card.DB2SPRC01.desc":
      "CALL stored procedure with IN/OUT/INOUT parameters and result set processing.",
    "card.DB2ROLL01.name": "Savepoint & Rollback",
    "card.DB2ROLL01.desc":
      "SAVEPOINT, ROLLBACK TO SAVEPOINT, and RELEASE for partial transaction rollback.",
    "card.DB2XREF01.name": "Cross Queries",
    "card.DB2XREF01.desc":
      "Subselect, EXISTS, UNION ALL, CASE WHEN, and GROUP BY HAVING in advanced queries.",
    // IMS (11)
    "card.IMSCHK01.name": "Checkpoint/Restart",
    "card.IMSCHK01.desc":
      "Manages CHKP/XRST for BMP batch with configurable frequency and position tracking.",
    "card.IMSHNAV01.name": "Hierarchy Navigator",
    "card.IMSHNAV01.desc":
      "Navigates IMS hierarchy with GU, GN, and GNP showing parent-child-grandchild path.",
    "card.IMSSSA01.name": "SSA Builder",
    "card.IMSSSA01.desc":
      "Dynamically builds qualified and unqualified SSAs with boolean operators.",
    "card.IMSSTDC01.name": "Status Decoder",
    "card.IMSSTDC01.desc":
      "Translates DL/I status codes into descriptive messages with severity and action.",
    "card.IMSDLIO2.name": "Advanced DL/I with SSA",
    "card.IMSDLIO2.desc":
      "GU/GN/GNP with qualified SSA, multi-level ISRT, and DLET with full path.",
    "card.IMSBMP02.name": "BMP with Messages",
    "card.IMSBMP02.desc":
      "BMP with GU/GN on IO PCB for messages, ISRT response, and periodic CHKP.",
    "card.IMSCMD01.name": "IMS Commands",
    "card.IMSCMD01.desc":
      "ICMD for issuing IMS commands and RCMD for response retrieval.",
    "card.IMSSEG01.name": "Multi-Segment",
    "card.IMSSEG01.desc":
      "Navigation across 3 hierarchical levels with per-segment operations and path call.",
    "card.IMSALT01.name": "Alternate PCB",
    "card.IMSALT01.desc":
      "Operates with multiple PCBs in the PSB for different database views.",
    "card.IMSCONV01.name": "Conversational Transaction",
    "card.IMSCONV01.desc":
      "SPA (Scratchpad Area) for conversational state with state machine.",
    "card.IMSQRY03.name": "Hierarchical Query",
    "card.IMSQRY03.desc":
      "SSA with boolean operators, range queries, and command codes (D, F, L, N, U).",
    // VSAM (11)
    "card.VSAMCMP.name": "File Comparator",
    "card.VSAMCMP.desc":
      "Compares two KSDS files record by record, reporting additions, deletions, and modifications.",
    "card.VSAMEXT.name": "Data Extractor",
    "card.VSAMEXT.desc":
      "Reads and extracts records with filters by key range and field content.",
    "card.VSAMFSD.name": "File-Status Decoder",
    "card.VSAMFSD.desc":
      "Translates VSAM FILE STATUS codes into descriptive messages with recommended action.",
    "card.VSAMSTAT.name": "VSAM Statistics",
    "card.VSAMSTAT.desc":
      "Collects VSAM file statistics: total records, min/max key, and size.",
    "card.VSAMKSDS.name": "KSDS Operations",
    "card.VSAMKSDS.desc":
      "Full CRUD on KSDS with ACCESS MODE DYNAMIC: read, write, rewrite, delete, and browse.",
    "card.VSAMRRDS.name": "RRDS Manager",
    "card.VSAMRRDS.desc":
      "ORGANIZATION RELATIVE with read/write by relative number and sequential scan.",
    "card.VSAMAIX.name": "Alternate Index",
    "card.VSAMAIX.desc":
      "Access via alternate index PATH with alternate key read and duplicate handling.",
    "card.VSAMSEQ.name": "Sequential Processing",
    "card.VSAMSEQ.desc":
      "START with KEY GREATER THAN, READ NEXT with skip logic and repositioning.",
    "card.VSAMUPD.name": "Batch Update",
    "card.VSAMUPD.desc":
      "Reads transactions, updates master KSDS with insert/update/delete and error report.",
    "card.VSAMLSL.name": "Record Level Sharing",
    "card.VSAMLSL.desc":
      "RLS patterns with READ WITH LOCK, UNLOCK, and retry for record-in-use (status 68).",
    "card.VSAMBKP.name": "Backup & Restore",
    "card.VSAMBKP.desc":
      "Sequential VSAM read for backup with header/trailer control and restore mode.",
  };

  const es = {
    // -- Shared --
    skip: "Saltar al contenido principal",

    // -- Index page --
    "idx.title": "Douglas Assumpção Rodrigues | Desarrollador Mainframe",
    "idx.meta.desc":
      "Más de 18 años en sistemas financieros de misión crítica. Especialista en COBOL, DB2, CICS y JCL. Trayectoria, certificaciones y contacto.",
    "idx.headline":
      'Desarrollador <span class="text-accent">Mainframe</span> | Sistemas bancarios que no pueden parar',
    "idx.status": "Abierto a Propuestas",
    "idx.bio":
      "El 90% de las transacciones bancarias en Brasil pasan por mainframes.<br>Yo escribo, optimizo y mantengo el código COBOL, DB2 y CICS detrás de ellos.<br>¿Quiere saber cómo? Todo está en los enlaces abajo.",
    "idx.section.links": "Próximos Pasos",
    "idx.skills.extra.title": "Conocimientos Complementarios",
    "idx.cta.cv": "Ver Currículum",
    "idx.cta.linkedin": "LinkedIn",
    "idx.heroStat.years": "Años de experiencia",
    "idx.heroStat.programs": "Programas autorales",
    "idx.heroStat.incidents": "Incidentes resueltos",
    "idx.link1.title": "Mainframe Lab",
    "idx.link1.desc":
      "97 programas originales - vea en la práctica lo que domino",
    "idx.link2.title": "Mi Trayectoria Completa",
    "idx.link2.desc":
      "Experiencia, recomendaciones y lo que no cabe en un currículum",
    "idx.link3.title": "Currículum - Directo al Punto",
    "idx.link3.desc": "Una página con lo que realmente importa para su vacante",
    "idx.link4.title": "Certificaciones Validadas",
    "idx.link4.desc":
      "Credenciales que hablan por mí cuando no estoy en la sala",
    "idx.link5.title": "Envíe Su Propuesta",
    "idx.link5.desc": "Respondo en hasta 24h - sin formularios, sin robots",
    "idx.link6.title": "Conversación Rápida",
    "idx.link6.desc": "Las buenas oportunidades no esperan - hablemos ahora",
    "idx.skills.title": "Experiencia Técnica",
    "idx.footer":
      "Hecho con la misma precisión de un sistema de misión crítica.",
    "idx.email.toast": "¡Email copiado! Espero su contacto.",
    "visit.label": "Visitas",

    // -- Lab page --
    "lab.title":
      "Mainframe Lab | Douglas Assumpção Rodrigues - Programas COBOL, JCL, DB2, CICS y Referencia Rápida",
    "lab.meta.desc":
      "Portafolio técnico de Douglas Assumpção Rodrigues: 97 módulos mainframe reutilizables en COBOL, HLASM, JCL, CICS, DB2, IMS y VSAM - herramientas utilitarias para el desarrollador mainframe.",
    "lab.back": "Volver al Inicio",
    "lab.breadcrumb.current": "Mainframe Lab",
    "lab.header.desc":
      "97 módulos reutilizables que escribí, probé y refiné. Navegue por el código y vea, en la práctica, herramientas utilitarias que aceleran el desarrollo mainframe.",
    "lab.stat.programs": "Programas en Lab",
    "lab.stat.techs": "Tecnologías",
    "lab.stat.years": "Años de experiencia",
    "lab.stat.incidents": "Incidentes resueltos",
    "lab.search.placeholder": "Buscar por nombre, tecnología o descripción...",
    "lab.tab.ref": "Referencia Rápida",
    "lab.footer": "Mainframe Lab - Código, referencia y precisión.",
    "lab.scrolltop": "Volver arriba",

    // Badges & status
    "badge.basic": "Básico",
    "badge.intermediate": "Intermedio",
    "badge.advanced": "Avanzado",
    "status.dev": "Próximamente",

    // Section titles & descriptions
    "lab.cobol.title": "Programas COBOL",
    "lab.cobol.desc":
      "Subprogramas reutilizables vía CALL USING - módulos utilitarios que aceleran el desarrollo y estandarizan rutinas comunes en el día a día mainframe.",
    "lab.hlasm.title": "Módulos HLASM",
    "lab.hlasm.desc":
      "Rutinas utilitarias en Assembler z/OS - cada módulo incluye dos versiones: base-desplazamiento y direccionamiento relativo (z/Architecture).",
    "lab.jcl.title": "Templates JCL",
    "lab.jcl.desc":
      "Jobs listos para uso - templates de JCL para compilación, sort, utilitarios y operaciones con datasets en el día a día z/OS.",
    "lab.cics.title": "Programas CICS",
    "lab.cics.desc":
      "Programas online CICS - transacciones, BMS, colas, browse y control de recursos para el ambiente transaccional IBM.",
    "lab.db2.title": "Programas DB2",
    "lab.db2.desc":
      "Programas COBOL com SQL embebido - cursores, SQL dinámico, control de locks, savepoints y consultas avanzadas en DB2 for z/OS.",
    "lab.ims.title": "Programas IMS",
    "lab.ims.desc":
      "Programas DL/I para IMS - navegación jerárquica, BMP, checkpoint/restart, SSAs cualificadas y transacciones conversacionales.",
    "lab.vsam.title": "Programas VSAM",
    "lab.vsam.desc":
      "Programas COBOL para VSAM - KSDS, RRDS, índice alternativo, browse, actualización en lote y backup/restore.",
    "lab.ref.title": "Referencia Rápida",
    "lab.ref.desc":
      "File-Status, SQLCODEs, Abend Codes, EIBRESP y tips de JCL - la referencia que compilé para resolver problemas sin perder tiempo.",

    // Reference sub-sections
    "lab.ref.fs.title": "File-Status COBOL",
    "lab.ref.fs.desc":
      "Códigos de retorno de operaciones de I/O en archivos COBOL.",
    "lab.ref.abend.title": "Abend Codes z/OS",
    "lab.ref.abend.desc":
      "Códigos de terminación anormal de programas en z/OS.",
    "lab.ref.sql.title": "SQLCODEs de DB2",
    "lab.ref.sql.desc":
      "Códigos de retorno de operaciones SQL en DB2 para z/OS.",
    "lab.ref.eib.title": "Códigos EIBRESP CICS",
    "lab.ref.eib.desc":
      "Códigos de respuesta EIBRESP retornados por comandos EXEC CICS.",
    "lab.ref.tips.title": "Tips Rápidos de JCL",
    "lab.ref.tips.desc":
      "Referencia práctica para el día a día del desarrollador mainframe.",

    // Table headers
    "th.code": "Código",
    "th.meaning": "Significado",
    "th.action": "Acción Sugerida",
    "th.name": "Nombre",

    // JCL tip titles
    "tip.dd": "Parámetros DD Esenciales",
    "tip.rc": "Return Codes Estándar",
    "tip.util": "Utilitarios Más Usados",
    "tip.cond": "COND vs IF/THEN/ELSE",

    // Certifications page --
    "cert.title":
      "Certificaciones | Douglas Assumpção Rodrigues - Credenciales Validadas",
    "cert.meta.desc":
      "Certificaciones profesionales de Douglas Assumpção Rodrigues: Azure AZ-900 y credenciales validadas que comprueban dominio técnico en tecnologías de misión crítica.",
    "cert.back": "Volver al Inicio",
    "cert.breadcrumb.current": "Certificaciones",
    "cert.header.desc":
      "Credenciales que validan mi conocimiento técnico. Cada certificación fue conquistada con estudio dedicado y representa dominio comprobado en el área.",
    "cert.az900.title": "Azure Fundamentals",
    "cert.az900.desc":
      "Fundamentos de computación en nube, servicios Azure, seguridad, privacidad, cumplimiento y modelos de precios.",
    "cert.btn.view": "Ver Certificado",
    "cert.btn.verify": "Verificar en Credly",
    "cert.scjp.title": "Oracle Certified Java Programmer (SCJP)",
    "cert.scjp.desc":
      "Certificación que valida dominio avanzado del lenguaje Java SE 6: orientación a objetos, collections, threads, generics, I/O y manejo de excepciones.",
    "cert.note":
      "Nuevas certificaciones en curso. Esta página se actualiza conforme se obtienen nuevas credenciales.",
    "cert.footer": "Credenciales que comprueban - no solo afirman.",

    // -- Curriculum page --
    "cv.title":
      "Currículum | Douglas Assumpção Rodrigues - Software Engineer III Mainframe",
    "cv.meta.desc":
      "Currículum de Douglas Assumpção Rodrigues: más de 18 años en ingeniería de software Mainframe para sistemas financieros de misión crítica. Especialista en Assembler z/OS, COBOL, DB2, CICS.",
    "cv.back": "Volver al Inicio",
    "cv.breadcrumb.current": "Currículum",
    "cv.subtitle": "Software Engineer III - Mainframe",
    "cv.summary":
      "Ingeniero de Software Mainframe con más de 18 años de experiencia en sistemas financieros de misión crítica. Especialista en Assembler z/OS, COBOL, DB2 y CICS, con historial comprobado de reducción de tiempo de resolución de incidentes y crecimiento de ingresos. Profundo dominio de sistemas de tarjetas VISA y Elo basados en ISO 8583, operando en entornos de alta disponibilidad y volumen.",
    "cv.section.exp": "Experiencia Profesional",
    "cv.current": "Actual",

    // Job 0 - Banco Bradesco (Abr 2024 - Actual)
    "cv.job0.role": "Software Engineer III",
    "cv.job0.company":
      "Uno de los mayores bancos privados de América Latina, con más de 70 millones de clientes e infraestructura Mainframe de misión crítica.",
    "cv.job0.h1":
      "Garantiza la estabilidad del sistema de Cuentas Corrientes, asegurando operaciones que impactan a millones de clientes diariamente.",
    "cv.job0.h2":
      "Responsable del análisis, diagnóstico y resolución de incidentes P3 y P4 en entornos Mainframe z/OS de alto volumen.",
    "cv.job0.h3":
      "Referencia técnica en Assembler z/OS en el equipo, actuando como punto focal para análisis de bajo nivel y debugging de ABENDs complejos.",
    "cv.job0.h4":
      "Creó macros de automatización para tareas repetitivas del equipo, reduciendo significativamente el tiempo dedicado a actividades operativas recurrentes.",
    "cv.job0.h5":
      "Desarrolló un sistema multiagente de IA para optimizar el flujo de desarrollo y análisis, reduciendo el tiempo de entrega en hasta 40%.",

    // Job 1 - Capgemini (Nov 2023 - Abr 2024)
    "cv.job1.role": "Consultor de Soluciones IV",
    "cv.job1.company":
      "Consultora multinacional líder en transformación digital, con presencia en más de 50 países y foco en soluciones tecnológicas para el sector financiero.",
    "cv.job1.h1":
      "Asignado al Banco Bradesco como consultor sénior para sustentabilidad del sistema de Cuentas, actuando en incidentes críticos con SLA estrictos.",
    "cv.job1.h2":
      "Reconocido como referencia en Assembler z/OS en el equipo, realizando análisis de dumps y traces para resolución de problemas de difícil diagnóstico.",
    "cv.job1.h3":
      "Índice de productividad 22% por encima del promedio del equipo: 19,52h por incidente (promedio: 25h), con enfoque en análisis de causa raíz y prevención de recurrencia.",

    // Job 2 - Prover Soluciones (Oct 2010 - Nov 2023)
    "cv.job2.role":
      "Gerente de Proyectos / Analista de Sistemas / Desarrollador Mainframe",
    "cv.job2.company":
      "Empresa de tecnología especializada en sistemas financieros para procesadoras de tarjetas e instituciones bancarias.",
    "cv.job2.h1":
      "Arquitectó y desarrolló sistemas financieros Mainframe que impulsaron los ingresos de la empresa aproximadamente 10% al año durante 13 años consecutivos.",
    "cv.job2.h2":
      "Lideró la implementación de metodologías ágiles (Scrum) en el equipo Mainframe, optimizando entregas y ahorrando cerca de R$ 20.000 anuales en horas de retrabajo.",
    "cv.job2.h3":
      "Actuación hands-on en el ciclo completo de desarrollo: levantamiento de requisitos, análisis, codificación, pruebas e implementación en producción.",

    // Job 3 - INFOserver (Jul 2007 - Oct 2010)
    "cv.job3.role": "Analista y Desarrollador de Sistemas",
    "cv.job3.company":
      "Empresa de tecnología especializada en soluciones para el mercado financiero y procesamiento de transacciones electrónicas.",
    "cv.job3.h1":
      "Desarrollo y mantenimiento de sistemas Mainframe para procesamiento de transacciones de tarjetas de crédito y débito (VISA/ELO).",
    "cv.job3.h2":
      "Implementación de rutinas de conciliación financiera e interfaces con redes de pagos basadas en ISO 8583.",

    "cv.section.skills": "Habilidades Técnicas",
    "cv.skills.dev": "Desarrollo",
    "cv.skills.tools": "Herramientas y Métodos",
    "cv.section.edu": "Formación Académica",
    "cv.edu0.degree": "Postgrado en Gestión y Gobernanza de TI",
    "cv.edu1.degree": "Tecnólogo en Gestión de TI",
    "cv.section.certs": "Certificaciones",
    "cv.section.lang": "Idiomas",
    "cv.lang.pt": "Portugués",
    "cv.lang.pt.level": "Nativo",
    "cv.lang.en": "Inglés",
    "cv.lang.en.level":
      "Avanzado (lectura/escritura), Intermedio (habla)",
    "cv.footer": "Una página con lo que realmente importa.",
    "cv.cta.print": "Imprimir / Guardar como PDF",

    // -- Card names & descriptions (97 cards) --
    // COBOL (13)
    "card.COB01001.name": "Formateador de Campos",
    "card.COB01001.desc":
      "Subprograma para LTRIM, RTRIM, LPAD, RPAD y CENTER de campos alfanuméricos vía LINKAGE SECTION.",
    "card.COB01002.name": "Conversor de Fechas",
    "card.COB01002.desc":
      "Convierte entre GREGORIAN, JULIAN, YYYY-MM-DD y juliano CYYDDD con validación y día de la semana.",
    "card.COB01003.name": "Logger Estructurado",
    "card.COB01003.desc":
      "Escribe timestamp, severidad y módulo de origen en archivo secuencial vía OPEN/WRITE/CLOSE.",
    "card.COB01004.name": "Parser CSV",
    "card.COB01004.desc":
      "Separa una línea CSV en campos individuales con delimitador configurable y soporte a campos entre comillas.",
    "card.COB01005.name": "Búsqueda en Tabla en Memoria",
    "card.COB01005.desc":
      "Carga pares clave-valor de un archivo de parámetros en una tabla interna consultable (LOAD/FIND/COUNT).",
    "card.COB01006.name": "Enmascaramiento de Datos",
    "card.COB01006.desc":
      "Anonimiza campos sensibles usando estrategias TOTAL, PARTIAL, HASH, EMAIL y PHONE para cumplimiento LGPD.",
    "card.COB01007.name": "Sort y Merge",
    "card.COB01007.desc":
      "SORT con INPUT/OUTPUT PROCEDURE, validación de registros y eliminación de duplicados por clave.",
    "card.COB01008.name": "Reporte con Control Break",
    "card.COB01008.desc":
      "Control break en 3 niveles (sucursal/depto/empleado) con subtotales, cabecera de página y ASA.",
    "card.COB01009.name": "Gestión de Tablas",
    "card.COB01009.desc":
      "Tabla interna con SEARCH ALL (binaria) y SEARCH secuencial, inserción/remoción con mantenimiento de orden.",
    "card.COB01010.name": "Conversor Numérico",
    "card.COB01010.desc":
      "Convierte números a palabras en portugués, formatea moneda (R$), calcula porcentajes y redondea.",
    "card.COB01011.name": "Motor de Reportes",
    "card.COB01011.desc":
      "Generador de reportes con cabecera, pie, page overflow, acumuladores y control de carro ASA.",
    "card.COB01012.name": "Transaction Watchdog",
    "card.COB01012.desc":
      "Watch/merge master-transacción con operaciones de I/O, centinela HIGH-VALUES y reporte de excepciones.",
    "card.COB01013.name": "Manipulación de Strings",
    "card.COB01013.desc":
      "Operaciones UPPER, LOWER, SPLIT, JOIN, SUBSTR, COUNT y REPLACE usando INSPECT/STRING/UNSTRING.",

    // HLASM (11 base)
    "card.ASM01001.name": "Utilidad de Hex Dump",
    "card.ASM01001.desc":
      "Rutina para dump hexadecimal de áreas de memoria - esencial para debugging de bajo nivel.",
    "card.ASM01002.name": "Logger de Return Code",
    "card.ASM01002.desc":
      "Registra el RC del programa en WTO con nombre del step e indicador de severidad.",
    "card.ASM01003.name": "Formateador de Timestamp",
    "card.ASM01003.desc":
      "Obtiene el TOD clock del sistema y convierte al formato legible YYYY-MM-DD HH:MM:SS.",
    "card.ASM01004.name": "Conversor EBCDIC a ASCII",
    "card.ASM01004.desc":
      "Convierte buffers entre EBCDIC y ASCII usando tablas de traducción TR de 256 bytes.",
    "card.ASM01005.name": "Operaciones Bit a Bit",
    "card.ASM01005.desc":
      "Rutina para testear, setear, limpiar y alternar bits individuales usando NI, OI, XI y TM.",
    "card.ASM01006.name": "Búsqueda Binaria en Tabla",
    "card.ASM01006.desc":
      "Tabla de búsqueda binaria optimizada con comparación CLC y división SRL.",
    "card.ASM01007.name": "Conversor Pack/Unpack",
    "card.ASM01007.desc":
      "Convierte entre formatos zoned, packed y binario usando PACK, UNPK, CVD y CVB.",
    "card.ASM01008.name": "Comparación de Buffers",
    "card.ASM01008.desc":
      "Mueve y compara bloques largos con MVCL, CLCL y técnica de propagación MVC.",
    "card.ASM01009.name": "Traducción de Caracteres",
    "card.ASM01009.desc":
      "Tres técnicas de búsqueda en tabla: TRT (translate and test), BALR y BAS.",
    "card.ASM01010.name": "Linkage de Subrutinas",
    "card.ASM01010.desc":
      "Save area estándar, lista de parámetros y CALL para subrutinas internas y externas.",
    "card.ASM01011.name": "Carga Dinámica de Programas",
    "card.ASM01011.desc":
      "Usa LOAD, DELETE, LINK y XCTL para manipulación dinámica de load modules.",

    // HLASM-CICS híbrido (3)
    "card.ASMCENV1.name": "Inspector de Ambiente CICS (HLASM)",
    "card.ASMCENV1.desc":
      "Rutina HLASM que inspecciona el ambiente CICS vía EXEC CICS ASSIGN en Assembler.",
    "card.ASMCBMS1.name": "Mapa BMS CICS (HLASM)",
    "card.ASMCBMS1.desc":
      "Manipulación de mapas BMS en Assembler con SEND MAP/RECEIVE MAP y manejo de bytes de atributo.",
    "card.ASMCABD1.name": "Manejador de Abend CICS (HLASM)",
    "card.ASMCABD1.desc":
      "HANDLE ABEND en Assembler con captura de diagnóstico formateado para recovery de bajo nivel.",

    // HLASM-DB2 híbrido (3)
    "card.ASMDSEL1.name": "DB2 SELECT (HLASM)",
    "card.ASMDSEL1.desc":
      "SELECT SQL estático en Assembler con procesamiento de SQLCA y manejo de resultados.",
    "card.ASMDCUR1.name": "Cursor DB2 (HLASM)",
    "card.ASMDCUR1.desc":
      "Cursor DECLARE/OPEN/FETCH/CLOSE en Assembler con UPDATE posicionado.",
    "card.ASMDDYN1.name": "SQL Dinámico DB2 (HLASM)",
    "card.ASMDDYN1.desc":
      "PREPARE y EXECUTE de SQL dinámico en Assembler con marcadores de parámetros.",

    // HLASM-IMS híbrido (3)
    "card.ASMIGN01.name": "IMS GN/GU (HLASM)",
    "card.ASMIGN01.desc":
      "IMS GU/GN en Assembler con construcción de SSA y procesamiento de PCB.",
    "card.ASMIHNV1.name": "Navegador de Jerarquía IMS (HLASM)",
    "card.ASMIHNV1.desc":
      "Navega niveles jerárquicos de IMS en Assembler con manejo de command codes.",
    "card.ASMICHK1.name": "Checkpoint IMS (HLASM)",
    "card.ASMICHK1.desc":
      "CHKP/XRST en Assembler para reinicio de BMP con control de posición.",

    // HLASM-VSAM híbrido (3)
    "card.ASMVSRD1.name": "Lectura Secuencial VSAM (HLASM)",
    "card.ASMVSRD1.desc":
      "Lectura secuencial VSAM en Assembler con ACB/RPL y decodificación de feedback.",
    "card.ASMVKSD1.name": "VSAM KSDS (HLASM)",
    "card.ASMVKSD1.desc":
      "Operaciones KSDS en Assembler: GET/PUT/ERASE con clave vía ACB y RPL.",
    "card.ASMVBRW1.name": "Browse VSAM (HLASM)",
    "card.ASMVBRW1.desc":
      "Browse VSAM en Assembler con posicionamiento (POINT) y scan secuencial.",

    // JCL (13)
    "card.JCL01001.name": "Compile-Link-Go",
    "card.JCL01001.desc":
      "JCL estándar para compilar fuente COBOL, link-editar objetos y ejecutar el load module en un único job.",
    "card.JCL01002.name": "Copia de Dataset",
    "card.JCL01002.desc":
      "Copia datasets secuenciales y miembros de PDS usando IEBGENER e IEBCOPY con ejemplos prácticos.",
    "card.JCL01003.name": "Definición KSDS con IDCAMS",
    "card.JCL01003.desc":
      "Define e inicializa un VSAM KSDS con parámetros específicos de dimensionamiento e indexación.",
    "card.JCL01004.name": "Formateo con DFSORT",
    "card.JCL01004.desc":
      "Genera reporte formateado a partir de archivo de entrada usando DFSORT con OUTFIL y HEADER/TRAILER.",
    "card.JCL01005.name": "Estadísticas con ICETOOL",
    "card.JCL01005.desc":
      "Demuestra operaciones ICETOOL: SELECT, SORT, SPLICE, DISPLAY, STATS y OCCUR.",
    "card.JCL01006.name": "Backup/Restore",
    "card.JCL01006.desc":
      "Usa ADRDSSU para backup (DUMP) de datasets y verificación post-restauración.",
    "card.JCL01007.name": "Gestión de GDG",
    "card.JCL01007.desc":
      "Define y gestiona bases GDG usando IDCAMS.",
    "card.JCL01008.name": "Opciones SORT/MERGE",
    "card.JCL01008.desc":
      "Ordenación avanzada usando PARM='MSGPRT=ALL, DYNALLOC, LIST' y diversas opciones.",
    "card.JCL01009.name": "Joins con DFSORT",
    "card.JCL01009.desc":
      "JOINKEYS avanzado: une dos archivos por clave con JOIN UNPAIRED y campos REFORMAT.",
    "card.JCL01010.name": "Ejecución Condicional",
    "card.JCL01010.desc":
      "IF/THEN/ELSE/ENDIF para control de flujo avanzado con SET de variables simbólicas.",
    "card.JCLSORT02.name": "DFSORT con OUTFIL",
    "card.JCLSORT02.desc":
      "SORT avanzado con múltiples OUTFIL, INCLUDE/OMIT, BUILD, SECTIONS y TRAILER para subtotales.",
    "card.JCLPROC02.name": "Procedure con Overrides",
    "card.JCLPROC02.desc":
      "Define PROC catalogada con simbólicos, ejecuta con overrides de DD y parámetros.",
    "card.JCLIDCAM2.name": "IDCAMS Multi-Operaciones",
    "card.JCLIDCAM2.desc":
      "IDCAMS con DELETE/DEFINE CLUSTER/AIX/PATH, REPRO, LISTCAT y VERIFY en un único step.",

    // CICS (13)
    "card.CICSABDL.name": "Manejador de Abend",
    "card.CICSABDL.desc":
      "HANDLE ABEND con captura de código, diagnóstico formateado y log en TDQ para recovery.",
    "card.CICSENQM.name": "Gestor ENQ/DEQ",
    "card.CICSENQM.desc":
      "Control de acceso concurrente con ENQ/DEQ y detección de deadlock vía EIBRESP.",
    "card.CICSENVI.name": "Inspector de Ambiente",
    "card.CICSENVI.desc":
      "Colecta información del ambiente CICS vía ASSIGN: terminal, usuario, transacción, sistema.",
    "card.CICSRESO.name": "Descubrimiento de Recursos",
    "card.CICSRESO.desc":
      "Consulta recursos CICS disponibles (programas, archivos, transacciones) vía INQUIRE.",
    "card.CICSTLOG.name": "Logger de Transacciones",
    "card.CICSTLOG.desc":
      "Registra eventos de transacciones en TSQ con timestamp, tipo y datos de contexto.",
    "card.CICSTSQM.name": "Gestor de TSQ",
    "card.CICSTSQM.desc":
      "Operaciones completas de TSQ: WRITEQ TS, READQ TS, DELETEQ TS con control de items.",
    "card.CICSBMS01.name": "Mapa BMS SEND/RECEIVE",
    "card.CICSBMS01.desc":
      "Transacción pseudo-conversacional con SEND MAP, RECEIVE MAP y validación de campos.",
    "card.CICSBROW.name": "Navegación VSAM vía CICS",
    "card.CICSBROW.desc":
      "STARTBR, READNEXT, READPREV y ENDBR para paginación de registros VSAM en CICS.",
    "card.CICSCRUD.name": "CRUD Completo",
    "card.CICSCRUD.desc":
      "READ UPDATE, REWRITE, WRITE y DELETE con manejo de DUPREC, NOSPACE y NOTFND.",
    "card.CICSTDQ01.name": "Colas TDQ",
    "card.CICSTDQ01.desc":
      "WRITEQ TD y READQ TD para colas intra y extrapartición con formateo de mensajes.",
    "card.CICSXCTL.name": "XCTL/LINK",
    "card.CICSXCTL.desc":
      "Demuestra LINK (con retorno) y XCTL (sin retorno) con COMMAREA entre programas.",
    "card.CICSJRNL.name": "Gestor de Journal",
    "card.CICSJRNL.desc":
      "WRITE JOURNALNAME para pista de auditoría con imágenes before/after de transacciones.",
    "card.CICSSTRT.name": "START/RETRIEVE Async",
    "card.CICSSTRT.desc":
      "EXEC CICS START para procesamiento diferido y RETRIEVE para la transacción iniciada.",
    // DB2 (13)
    "card.DB2CATIQ.name": "Inspector de Catálogo",
    "card.DB2CATIQ.desc":
      "Consulta SYSIBM.SYSTABLES, SYSCOLUMNS e SYSINDEXES para metadatos de objetos DB2.",
    "card.DB2CMTBH.name": "Manejador de Commit Batch",
    "card.DB2CMTBH.desc":
      "Procesamiento batch con control de COMMIT periódico y punto de reinicio configurable.",
    "card.DB2RETR.name": "Recuperación de Datos",
    "card.DB2RETR.desc":
      "SELECT con múltiples condiciones, cursor para result set y formateo de salida.",
    "card.DB2DYNEX.name": "SQL Dinámico",
    "card.DB2DYNEX.desc":
      "PREPARE y EXECUTE de SQL dinámico con marcadores de parámetros y DESCRIBE para metadatos.",
    "card.DB2HLTH.name": "Chequeo de Salud",
    "card.DB2HLTH.desc":
      "Verifica salud de objetos DB2: estado de tablespace, RUNSTATS, REORG pending.",
    "card.DB2SQLCD.name": "Decodificador SQLCODE",
    "card.DB2SQLCD.desc":
      "Recibe SQLCODE y retorna mensaje descriptivo, severidad y acción recomendada.",
    "card.DB2CURS01.name": "Cursores Múltiples",
    "card.DB2CURS01.desc":
      "Cursor anidado maestro-detalle, con HOLD y FOR UPDATE con UPDATE/DELETE posicionado.",
    "card.DB2BULK01.name": "Carga Masiva",
    "card.DB2BULK01.desc":
      "INSERT en lote con COMMIT cada N registros, control de duplicados y estadísticas.",
    "card.DB2TEMP01.name": "Tablas Temporales",
    "card.DB2TEMP01.desc":
      "DECLARE GLOBAL TEMPORARY TABLE con INSERT y SELECT JOIN para datos de sesión.",
    "card.DB2LOCK01.name": "Control de Concurrencia",
    "card.DB2LOCK01.desc":
      "FOR UPDATE con aislamiento RS/RR, detección de deadlock (-911/-913) y reintento.",
    "card.DB2SPRC01.name": "Stored Procedure",
    "card.DB2SPRC01.desc":
      "CALL de stored procedure con parámetros IN/OUT/INOUT y procesamiento de result sets.",
    "card.DB2ROLL01.name": "Savepoint & Rollback",
    "card.DB2ROLL01.desc":
      "SAVEPOINT, ROLLBACK TO SAVEPOINT y RELEASE para rollback parcial de transacción.",
    "card.DB2XREF01.name": "Consultas Cruzadas",
    "card.DB2XREF01.desc":
      "Subselect, EXISTS, UNION ALL, CASE WHEN y GROUP BY HAVING en consultas avanzadas.",
    // IMS (11)
    "card.IMSCHK01.name": "Checkpoint/Restart",
    "card.IMSCHK01.desc":
      "Gestiona CHKP/XRST para BMP batch con frecuencia y seguimiento de posición configurables.",
    "card.IMSHNAV01.name": "Navegador de Jerarquía",
    "card.IMSHNAV01.desc":
      "Navega la jerarquía IMS con GU, GN e GNP mostrando el camino padre-hijo-nieto.",
    "card.IMSSSA01.name": "Constructor de SSA",
    "card.IMSSSA01.desc":
      "Construye SSAs cualificados y no cualificados dinámicamente com operadores booleanos.",
    "card.IMSSTDC01.name": "Decodificador de Status",
    "card.IMSSTDC01.desc":
      "Traduce códigos de status DL/I en mensajes descriptivos con severidad y acción.",
    "card.IMSDLIO2.name": "DL/I Avanzado con SSA",
    "card.IMSDLIO2.desc":
      "GU/GN/GNP con SSA cualificado, ISRT multinivel y DLET con camino completo.",
    "card.IMSBMP02.name": "BMP con Mensajes",
    "card.IMSBMP02.desc":
      "BMP con GU/GN en IO PCB para mensajes, respuesta ISRT e CHKP periódico.",
    "card.IMSCMD01.name": "Comandos IMS",
    "card.IMSCMD01.desc":
      "ICMD para emitir comandos IMS y RCMD para recuperación de respuestas.",
    "card.IMSSEG01.name": "Multisegmento",
    "card.IMSSEG01.desc":
      "Navegación en 3 niveles jerárquicos con operaciones por segmento y path call.",
    "card.IMSALT01.name": "PCB Alternativo",
    "card.IMSALT01.desc":
      "Opera con múltiples PCBs en el PSB para diferentes vistas de base de datos.",
    "card.IMSCONV01.name": "Transacción Conversacional",
    "card.IMSCONV01.desc":
      "SPA (Scratchpad Area) para estado conversacional con máquina de estados.",
    "card.IMSQRY03.name": "Consulta Jerárquica",
    "card.IMSQRY03.desc":
      "SSA con operadores booleanos, consultas de rango y códigos de comando (D, F, L, N, U).",
    // VSAM (11)
    "card.VSAMCMP.name": "Comparador de Archivos",
    "card.VSAMCMP.desc":
      "Compara dos archivos KSDS registro a registro, reportando inclusiones, exclusiones y cambios.",
    "card.VSAMEXT.name": "Extractor de Datos",
    "card.VSAMEXT.desc":
      "Lee e extrae registros con filtros por rango de clave y contenido de campos.",
    "card.VSAMFSD.name": "Decodificador File-Status",
    "card.VSAMFSD.desc":
      "Traduce códigos de VSAM FILE STATUS en mensajes descriptivos con acción recomendada.",
    "card.VSAMSTAT.name": "Estadísticas VSAM",
    "card.VSAMSTAT.desc":
      "Colecta estadísticas de archivos VSAM: total registros, clave min/max y tamaño.",
    "card.VSAMKSDS.name": "Operaciones KSDS",
    "card.VSAMKSDS.desc":
      "CRUD completo en KSDS con ACCESS MODE DYNAMIC: read, write, rewrite, delete e browse.",
    "card.VSAMRRDS.name": "Gestor de RRDS",
    "card.VSAMRRDS.desc":
      "ORGANIZATION RELATIVE con lectura/escritura por número relativo y scan secuencial.",
    "card.VSAMAIX.name": "Índice Alternativo",
    "card.VSAMAIX.desc":
      "Acceso vía PATH de índice alternativo con lectura por clave alterna y manejo de duplicados.",
    "card.VSAMSEQ.name": "Procesamiento Secuencial",
    "card.VSAMSEQ.desc":
      "START con KEY GREATER THAN, READ NEXT con lógica de skip y reposicionamiento.",
    "card.VSAMUPD.name": "Actualización Batch",
    "card.VSAMUPD.desc":
      "Lee transacciones, actualiza maestro KSDS con insert/update/delete y reporte de errores.",
    "card.VSAMLSL.name": "Record Level Sharing",
    "card.VSAMLSL.desc":
      "Patrones RLS con READ WITH LOCK, UNLOCK y reintento para registro en uso (status 68).",
    "card.VSAMBKP.name": "Backup y Restauro",
    "card.VSAMBKP.desc":
      "Lectura secuencial VSAM para backup con control de cabecera/trailer y modo de restauración.",
  };

  const dicts = { en, es };

  /* -- ENGINE ----------------------------------------------------------- */

  const originals = new Map();

  function storeAndReplace(el, text) {
    if (!el) return;
    if (!originals.has(el)) originals.set(el, el.innerHTML);
    el.innerHTML = text;
  }

  function restore(el) {
    if (!el || !originals.has(el)) return;
    el.innerHTML = originals.get(el);
  }

  function t(el, key, dict) {
    if (!el) return;
    if (dict && dict[key]) {
      storeAndReplace(el, dict[key]);
    } else {
      restore(el);
    }
  }

  function tAttr(el, attr, key, dict) {
    if (!el) return;
    const origKey = `__i18n_${attr}`;
    if (!el[origKey]) el[origKey] = el.getAttribute(attr);
    if (dict && dict[key]) {
      el.setAttribute(attr, dict[key]);
    } else if (el[origKey]) {
      el.setAttribute(attr, el[origKey]);
    }
  }

  function q(selector) {
    return document.querySelector(selector);
  }
  function qa(selector) {
    return document.querySelectorAll(selector);
  }

  /* -- TRANSLATION MAP --------------------------------------------------- */

  function applyLang(lang) {
    const dict = lang === DEFAULT_LANG ? null : dicts[lang];

    // HTML lang attribute
    document.documentElement.lang = lang;

    // Page title & meta (detect which page we're on)
    const isLab = !!q(".lab-container");
    const isCert = !!q(".cert-container");
    const isCv = !!q(".cv-container");

    if (isLab) {
      tAttr(document.documentElement, "data-page-title", "lab.title", dict);
      if (dict && dict["lab.title"]) document.title = dict["lab.title"];
      else if (originals.has("lab.title"))
        document.title = originals.get("lab.title");
      if (!originals.has("lab.title"))
        originals.set("lab.title", document.title);

      const metaDesc = q('meta[name="description"]');
      tAttr(metaDesc, "content", "lab.meta.desc", dict);
    } else if (isCert) {
      if (!originals.has("cert.title"))
        originals.set("cert.title", document.title);
      if (dict && dict["cert.title"]) document.title = dict["cert.title"];
      else if (originals.has("cert.title"))
        document.title = originals.get("cert.title");

      const metaDesc = q('meta[name="description"]');
      tAttr(metaDesc, "content", "cert.meta.desc", dict);
    } else if (isCv) {
      if (!originals.has("cv.title")) originals.set("cv.title", document.title);
      if (dict && dict["cv.title"]) document.title = dict["cv.title"];
      else if (originals.has("cv.title"))
        document.title = originals.get("cv.title");

      const metaDesc = q('meta[name="description"]');
      tAttr(metaDesc, "content", "cv.meta.desc", dict);
    } else {
      if (!originals.has("idx.title"))
        originals.set("idx.title", document.title);
      if (dict && dict["idx.title"]) document.title = dict["idx.title"];
      else if (originals.has("idx.title"))
        document.title = originals.get("idx.title");

      const metaDesc = q('meta[name="description"]');
      tAttr(metaDesc, "content", "idx.meta.desc", dict);
    }

    // -- SHARED ELEMENTS --
    t(q(".skip-link"), "skip", dict);

    // -- INDEX PAGE ELEMENTS --
    t(q(".profile-headline"), "idx.headline", dict);
    t(q(".status-badge"), "idx.status", dict);
    const statusBadge = q(".status-badge");
    if (statusBadge && dict && dict["idx.status"]) {
      // Preserve the dot span
      storeAndReplace(
        statusBadge,
        `<span class="status-dot" aria-hidden="true"></span> ${dict["idx.status"]}`,
      );
    } else if (statusBadge) {
      restore(statusBadge);
    }
    t(q(".profile-bio"), "idx.bio", dict);

    // Index section titles (Proximos Passos / Dominio Tecnico / Conhecimentos Complementares)
    const idxSectionTitles = qa(".container > section .section-title");
    const idxSectionKeys = [
      "idx.section.links",
      "idx.skills.title",
      "idx.skills.extra.title",
    ];
    idxSectionTitles.forEach((el, i) => {
      if (idxSectionKeys[i]) t(el, idxSectionKeys[i], dict);
    });

    // Index Link cards (ordered)
    const linkCards = qa(".links-list .link-card");
    const linkKeys = [
      "idx.link1",
      "idx.link2",
      "idx.link3",
      "idx.link4",
      "idx.link5",
      "idx.link6",
    ];
    linkCards.forEach((card, i) => {
      if (!linkKeys[i]) return;
      t(card.querySelector(".link-title"), linkKeys[i] + ".title", dict);
      t(card.querySelector(".link-desc"), linkKeys[i] + ".desc", dict);
    });

    // Index footer
    const idxFooter = q(".container .site-footer p");
    if (idxFooter) {
      if (dict && dict["idx.footer"]) {
        storeAndReplace(
          idxFooter,
          `&copy; 2026 Douglas Assumpção Rodrigues &middot; ` +
            dict["idx.footer"],
        );
      } else {
        restore(idxFooter);
      }
    }

    // -- LAB PAGE ELEMENTS --
    // Lab breadcrumb home link
    const labHome = q(".lab-breadcrumb-link");
    if (labHome) {
      t(labHome, "lab.back", dict);
    }

    t(q(".lab-breadcrumb-current"), "lab.breadcrumb.current", dict);
    t(q(".lab-header-desc"), "lab.header.desc", dict);

    // Stats labels (ordered to match the four cards in mainframe-lab.html:
    // 1) Programas  2) Tecnologias  3) Anos de experiencia  4) Incidentes 100+)
    const statLabels = qa(".lab-stat-label");
    const statKeys = [
      "lab.stat.programs",
      "lab.stat.techs",
      "lab.stat.years",
      "lab.stat.incidents",
    ];
    statLabels.forEach((el, i) => {
      if (statKeys[i]) t(el, statKeys[i], dict);
    });

    // Search placeholder
    const searchInput = q("#lab-search-input");
    tAttr(searchInput, "placeholder", "lab.search.placeholder", dict);

    // Tab: Referência Rápida
    const refTab = q("#tab-ref");
    if (refTab) {
      // Only translate the text, not the whole button
      if (!originals.has(refTab)) originals.set(refTab, refTab.innerHTML);
      if (dict && dict["lab.tab.ref"]) {
        refTab.textContent = dict["lab.tab.ref"];
      } else {
        refTab.innerHTML = originals.get(refTab);
      }
    }

    // Scroll-to-top aria
    tAttr(q(".lab-scroll-top"), "aria-label", "lab.scrolltop", dict);

    // Lab footer
    const labFooter = q(".lab-container .site-footer p");
    if (labFooter) {
      if (dict && dict["lab.footer"]) {
        storeAndReplace(
          labFooter,
          `&copy; 2026 Douglas Assumpção Rodrigues &middot; ` +
            dict["lab.footer"],
        );
      } else {
        restore(labFooter);
      }
    }

    // -- CERTIFICATIONS PAGE ELEMENTS --
    t(q(".cert-breadcrumb-current"), "cert.breadcrumb.current", dict);
    t(q(".cert-header-desc"), "cert.header.desc", dict);

    // Cert back link
    const certBackLink = q(".cert-back-link");
    if (certBackLink) {
      if (dict && dict["cert.back"]) {
        storeAndReplace(
          certBackLink,
          `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> ` +
            dict["cert.back"],
        );
      } else {
        restore(certBackLink);
      }
    }

    // Generic data-i18n elements (cert.*, cv.*, idx.*, visit.*)
    qa("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      if (
        key.startsWith("cert.") ||
        key.startsWith("cv.") ||
        key.startsWith("idx.") ||
        key.startsWith("visit.")
      ) {
        t(el, key, dict);
      }
    });

    // Cert footer
    const certFooter = q(".cert-container .site-footer p");
    if (certFooter) {
      if (dict && dict["cert.footer"]) {
        storeAndReplace(
          certFooter,
          `&copy; 2026 Douglas Assumpção Rodrigues &middot; ` +
            dict["cert.footer"],
        );
      } else {
        restore(certFooter);
      }
    }

    // -- CURRICULUM PAGE ELEMENTS --
    t(q(".cv-breadcrumb-current"), "cv.breadcrumb.current", dict);
    // .cv-header-desc: traduzido só via data-i18n="cv.summary" no loop acima.
    // Não chamar t() com outra chave aqui — "cv.header.desc" não existe no dict e
    // fazia restore() apagar o texto já aplicado por cv.summary.

    // CV back link
    const cvBackLink = q(".cv-back-link");
    if (cvBackLink) {
      if (dict && dict["cv.back"]) {
        storeAndReplace(
          cvBackLink,
          `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> ` +
            dict["cv.back"],
        );
      } else {
        restore(cvBackLink);
      }
    }

    // CV footer
    const cvFooter = q(".cv-container .site-footer p");
    if (cvFooter) {
      if (dict && dict["cv.footer"]) {
        storeAndReplace(
          cvFooter,
          `&copy; 2026 Douglas Assumpção Rodrigues &middot; ` +
            dict["cv.footer"],
        );
      } else {
        restore(cvFooter);
      }
    }

    // -- SECTION TITLES & DESCRIPTIONS --
    const panels = [
      { id: "panel-cobol", key: "lab.cobol" },
      { id: "panel-hlasm", key: "lab.hlasm" },
      { id: "panel-jcl", key: "lab.jcl" },
      { id: "panel-cics", key: "lab.cics" },
      { id: "panel-db2", key: "lab.db2" },
      { id: "panel-ims", key: "lab.ims" },
      { id: "panel-vsam", key: "lab.vsam" },
    ];

    panels.forEach(({ id, key }) => {
      const panel = q("#" + id);
      if (!panel) return;
      const titleEl = panel.querySelector(".lab-section > .lab-section-title");
      const descEl = panel.querySelector(".lab-section > .lab-section-desc");
      t(titleEl, key + ".title", dict);
      t(descEl, key + ".desc", dict);
    });

    // Reference panel (top-level title + desc)
    const refPanel = q("#panel-ref");
    if (refPanel) {
      const refTitle = refPanel.querySelector(
        ".lab-section > .lab-section-title",
      );
      const refDesc = refPanel.querySelector(
        ".lab-section > .lab-section-desc",
      );
      t(refTitle, "lab.ref.title", dict);
      t(refDesc, "lab.ref.desc", dict);
    }

    // Sub-section titles & descs (ordered)
    if (refPanel) {
      const subSections = refPanel.querySelectorAll(".lab-table-section");
      const subKeys = [
        "lab.ref.fs",
        "lab.ref.abend",
        "lab.ref.sql",
        "lab.ref.eib",
        "lab.ref.tips",
      ];
      subSections.forEach((section, i) => {
        if (!subKeys[i]) return;
        t(
          section.querySelector(".lab-section-title"),
          subKeys[i] + ".title",
          dict,
        );
        t(section.querySelector(".lab-section-desc"), subKeys[i] + ".desc", dict);
      });

      // Table headers
      refPanel.querySelectorAll(".lab-table thead th").forEach((th) => {
        const text = (
          originals.has(th) ? originals.get(th) : th.textContent
        ).trim();
        if (text === "Código" || text === "Code") t(th, "th.code", dict);
        else if (text === "Significado" || text === "Meaning")
          t(th, "th.meaning", dict);
        else if (text === "Ação Sugerida" || text === "Suggested Action")
          t(th, "th.action", dict);
        else if (text === "Nome" || text === "Name") t(th, "th.name", dict);
      });

      // JCL tip card titles
      const tipCards = refPanel.querySelectorAll(".lab-tip-card");
      const tipKeys = ["tip.dd", "tip.rc", "tip.util", "tip.cond"];
      tipCards.forEach((card, i) => {
        if (!tipKeys[i]) return;
        t(card.querySelector(".lab-tip-title"), tipKeys[i], dict);
      });
    }

    // -- PROGRAM CARDS (97 cards) --
    qa(".lab-card-program-id").forEach((idEl) => {
      const id = idEl.textContent.trim();
      const card = idEl.closest(".lab-card");
      if (!card) return;
      t(card.querySelector(".lab-card-name"), "card." + id + ".name", dict);
      t(card.querySelector(".lab-card-desc"), "card." + id + ".desc", dict);
    });

    // Badges (repeated)
    qa(".lab-badge-basic").forEach((el) => t(el, "badge.basic", dict));
    qa(".lab-badge-intermediate").forEach((el) =>
      t(el, "badge.intermediate", dict),
    );
    qa(".lab-badge-advanced").forEach((el) => t(el, "badge.advanced", dict));

    // Status badges on cards
    qa(".lab-status--dev").forEach((el) => {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      if (dict && dict["status.dev"]) {
        el.innerHTML = `<span class="lab-status-dot"></span> ${dict["status.dev"]}`;
      } else {
        restore(el);
      }
    });

    // -- UPDATE SWITCHER ACTIVE STATE --
    qa(".i18n-option").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    localStorage.setItem(STORAGE_KEY, lang);

    // Dispatch event for other scripts (e.g., toast messages)
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  /* -- LANGUAGE SWITCHER UI ---------------------------------------------- */

  function createSwitcher() {
    const switcher = document.createElement("div");
    switcher.className = "i18n-switcher glass";
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Language / Idioma");

    const langs = [
      { code: "pt-BR", label: "PT", title: "Português" },
      { code: "en", label: "EN", title: "English" },
      { code: "es", label: "ES", title: "Español" },
    ];

    langs.forEach(l => {
      const btn = document.createElement('button');
      btn.className = 'i18n-option';
      btn.type = 'button';
      btn.dataset.lang = l.code;
      btn.setAttribute('aria-label', l.title);
      btn.setAttribute('aria-pressed', 'false');
      btn.title = l.title;
      btn.textContent = l.label;
      btn.addEventListener('click', () => applyLang(l.code));
      switcher.appendChild(btn);
    });

    document.body.appendChild(switcher);
  }

  /* -- PUBLIC API (for toast i18n) --------------------------------------- */

  window.__i18n = {
    getLang: () => localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG,
    t: (key) => {
      const lang = window.__i18n.getLang();
      if (lang === DEFAULT_LANG) return null;
      const dict = dicts[lang];
      return dict ? dict[key] || null : null;
    },
  };

  /* -- INIT -------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    createSwitcher();
    const lang = detectLang();
    applyLang(lang);
  });

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (
      navigator.language ||
      navigator.userLanguage ||
      ""
    ).toLowerCase();
    if (nav.startsWith("en")) return "en";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("pt")) return DEFAULT_LANG;
    // Default to English for other languages
    return "en";
  }
})();
