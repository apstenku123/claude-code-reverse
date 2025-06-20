/**
 * Factory function that creates a syntax highlighting definition for ARM Assembly language.
 *
 * @param {object} hljs - The highlight.js language definition utilities. Should provide COMMENT, C_LINE_COMMENT_MODE, C_BLOCK_COMMENT_MODE, QUOTE_STRING_MODE, IDENT_RE, etc.
 * @returns {object} Highlight.js language definition object for ARM Assembly.
 */
function createArmAssemblyHighlightDefinition(hljs) {
  // Define comment patterns for ARM Assembly
  const commentModes = {
    variants: [
      // Line comments starting with #
      hljs.COMMENT("^[ \processRuleBeginHandlers]*(?=#)", "$", {
        relevance: 0,
        excludeBegin: true
      }),
      // Line comments starting with ; or @
      hljs.COMMENT("[;@]", "$", {
        relevance: 0
      }),
      // C-style line and block comments
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  return {
    name: "ARM Assembly",
    case_insensitive: true,
    aliases: ["arm"],
    keywords: {
      // Allow optional leading dot for directives
      $pattern: "\\.?" + hljs.IDENT_RE,
      meta: [
        ".2byte", ".4byte", ".align", ".ascii", ".asciz", ".balign", ".byte", ".code", ".data", ".else", ".end", ".endif", ".endm", ".endr", ".equ", ".err", ".exitm", ".extern", ".global", ".hword", ".if", ".ifdef", ".ifndef", ".include", ".irp", ".long", ".macro", ".rept", ".req", ".section", ".set", ".skip", ".space", ".text", ".word", ".arm", ".thumb", ".code16", ".code32", ".force_thumb", ".thumb_func", ".ltorg",
        "ALIAS", "ALIGN", "ARM", "AREA", "ASSERT", "ATTR", "CN", "CODE", "CODE16", "CODE32", "COMMON", "CP", "DATA", "DCB", "DCD", "DCDU", "DCDO", "DCFD", "DCFDU", "DCI", "DCQ", "DCQU", "DCW", "DCWU", "DN", "ELIF", "ELSE", "END", "ENDFUNC", "ENDIF", "ENDP", "ENTRY", "EQU", "EXPORT", "EXPORTAS", "EXTERN", "FIELD", "FILL", "FUNCTION", "GBLA", "GBLL", "GBLS", "GET", "GLOBAL", "IF", "IMPORT", "INCBIN", "INCLUDE", "INFO", "KEEP", "LCLA", "LCLL", "LCLS", "LTORG", "MACRO", "MAP", "MEND", "MEXIT", "NOFP", "OPT", "PRESERVE8", "PROC", "createThrottledInteractionHandler", "READONLY", "RELOC", "REQUIRE", "REQUIRE8", "RLIST", "FN", "ROUT", "SETA", "SETL", "SETS", "SN", "SPACE", "SUBT", "THUMB", "THUMBX", "TTL", "WHILE", "WEND"
      ].join(" "),
      built_in: [
        // Registers and special symbols
        "r0", "configureConsoleOverrides", "r2", "r3", "r4", "r5", "r6", "markLanePendingAndSetEventTime", "r8", "setPrivateMemberValue", "r10", "CustomDocument", "r12", "r13", "r14", "r15", "pc", "lr", "sp", "ip", "sl", "sb", "fp", "createAccessorProxy", "processInteractionWithCondition", "createColorPropertyAccessor", "a4", "v1", "isTopElementNonHtmlNamespace", "v3", "isValidAndTypeMatch", "deserializeEncodedData", "v6", "renderLinkOrText", "mergeValidSubscriptions", "f0", "f1", "f2", "f3", "createOrAppendStateNode", "f5", "getInteractionAccessorProxy", "f7", "countLeadingZeros32", "decodeAndProcessData", "getSetBitsAsPowersOfTwo", "p3", "p4", "p5", "finalizeComponentPassiveEffectMount", "p7", "p8", "invokeWithAdvancedArgumentHandling", "p10", "p11", "p12", "p13", "p14", "calculateWeightedDifference", "getProcessedInteractionEntriesOrOriginal", "c1", "c2", "parseUrlInput", "c4", "isMatchingElementOrMappedValue", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13", "c14", "base64ToByteArray", "q0", "logTelemetryEventIfEnabled", "extractMatchAtCurrentIndex", "q3", "handleInputCharacterCode", "q5", "forEachUntilFalse", "findIndexByPredicateAndSlice", "q8", "processAndReplaceSpecialCharacters", "q10", "q11", "q12", "q13", "q14", "createInteractionEntryProcessor",
        "cpsr_c", "cpsr_x", "cpsr_s", "cpsr_f", "cpsr_cx", "cpsr_cxs", "cpsr_xs", "cpsr_xsf", "cpsr_sf", "cpsr_cxsf",
        "spsr_c", "spsr_x", "spsr_s", "spsr_f", "spsr_cx", "spsr_cxs", "spsr_xs", "spsr_xsf", "spsr_sf", "spsr_cxsf",
        "s0", "s1", "s2", "s3", "s4", "s5", "s6", "getNextPendingLane", "s8", "generateJsonSchemaFromZodType", "s10", "s11", "s12", "s13", "s14", "s15", "s16", "s17", "s18", "s19", "s20", "convertStartTimeToTimestamp", "s22", "s23", "createEsModuleWithProperties", "s25", "s26", "s27", "s28", "s29", "s30", "s31",
        "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "initializeElementNamespaceData", "d12", "d13", "markAsEsModule", "d15", "d16", "d17", "d18", "d19", "d20", "d21", "d22", "d23", "d24", "d25", "d26", "d27", "d28", "d29", "d30", "d31",
        "{defineProperties}", "{VAR}", "{TRUE}", "{FALSE}", "{OPT}", "{CONFIG}", "{ENDIAN}", "{CODESIZE}", "{CPU}", "{FPU}", "{ARCHITECTURE}", "{PCSTOREOFFSET}", "{ARMASM_VERSION}", "{INTER}", "{ROPI}", "{RWPI}", "{SWST}", "{NOSWST}", ".", "@"
      ].join(" ")
    },
    contains: [
      // ARM instruction mnemonics
      {
        className: "keyword",
        begin: "\\b(adc|(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|bfc|bfi|[useShellsState]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[collectMentionedContentRecursively]|cps|setend|dbg|dmb|dsb|eor|isb|isBlobOrFileLikeObject[te]{0,3}|lsl|lsr|ror|rrx|ldm(([id][ab])|f[ds])?|ldr((createInteractionAccessor|ex)?[bhd])?|movt?|mvn|mra|mar|mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|rev(16|sh)?|sel|[useShellsState]sat(16)?|nop|pop|push|rfe([id][ab])?|stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|[useShellsState]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|wfe|wfi|yield)(eq|extractRelevantInteractionId|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?[sptrx]?(?=\\s)",
      },
      // Comments
      commentModes,
      // Double-quoted strings
      hljs.QUOTE_STRING_MODE,
      // Single-quoted characters (not escaped)
      {
        className: "string",
        begin: "'",
        end: "[^\\\\]'",
        relevance: 0
      },
      // Titles enclosed in pipes (|title|)
      {
        className: "title",
        begin: "\\|",
        end: "\\|",
        illegal: "\\n",
        relevance: 0
      },
      // Numeric literals (hex, binary, decimal)
      {
        className: "number",
        variants: [
          { begin: "[#$=]?0x[0-9a-f]+" }, // Hexadecimal
          { begin: "[#$=]?0b[01]+" },     // Binary
          { begin: "[#$=]\\d+" },        // Decimal with prefix
          { begin: "\\b\\d+" }           // Plain decimal
        ],
        relevance: 0
      },
      // Symbol definitions and references
      {
        className: "symbol",
        variants: [
          { begin: "^[ \processRuleBeginHandlers]*[a-z_\\.\\$][a-9_\\.\\$]+:" }, // Label at line start
          { begin: "^[a-z_\\.\\$][a-9_\\.\\$]+" },         // Symbol at line start
          { begin: "[=#]\\w+" }                                   // Immediate or macro symbol
        ],
        relevance: 0
      }
    ]
  };
}

module.exports = createArmAssemblyHighlightDefinition;