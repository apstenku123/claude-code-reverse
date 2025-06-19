/**
 * Factory function that generates a syntax highlighting definition for MIPS Assembly language.
 *
 * @param {object} syntaxHelpers - An object containing syntax helper definitions and utilities.
 *   Expected to provide IDENT_RE, COMMENT, C_BLOCK_COMMENT_MODE, and QUOTE_STRING_MODE.
 * @returns {object} Highlight.js language definition object for MIPS Assembly.
 */
function createMipsAssemblyHighlightDefinition(syntaxHelpers) {
  return {
    name: "MIPS Assembly",
    case_insensitive: true,
    aliases: ["mips"],
    keywords: {
      // Pattern for identifiers (optionally prefixed with a dot)
      $pattern: `\.?${syntaxHelpers.IDENT_RE}`,
      // MIPS assembler directives (meta keywords)
      meta: [
        ".2byte", ".4byte", ".align", ".ascii", ".asciz", ".balign", ".byte", ".code", ".data", ".else", ".end", ".endif", ".endm", ".endr", ".equ", ".err", ".exitm", ".extern", ".global", ".hword", ".if", ".ifdef", ".ifndef", ".include", ".irp", ".long", ".macro", ".rept", ".req", ".section", ".set", ".skip", ".space", ".text", ".word", ".ltorg"
      ].join(" "),
      // Built-in registers and coprocessor registers
      built_in: [
        "$0", "$1", "$2", "$3", "findInStoreWithCallback", "$5", "$6", "extractSourcesAndResolvedStyles", "$8", "$9", "$10", "$11", "$12", "$13", "$14", "$15", "$16", "$17", "$18", "$19", "$20", "$21", "$22", "$23", "$24", "$25", "ensureHttpAgentKeepAliveOption", "$27", "$28", "$29", "initializeFirstStartTimeIfMissing", "$31",
        "zero", "at", "registerTypeInstance", "v1", "a0", "createAccessorProxy", "processInteractionWithCondition", "createColorPropertyAccessor", "a4", "a5", "a6", "a7", "t0", "t1", "t2", "createAttributeAccessor", "t4", "t5", "t6", "defineOrAssignProperty", "t8", "t9", "s0", "s1", "s2", "s3", "s4", "s5", "s6", "getNextPendingLane", "s8", "k0", "k1", "gp", "sp", "fp", "ra",
        "$f0", "$f1", "$f2", "$f2", "$createOrAppendStateNode", "$f5", "$getInteractionAccessorProxy", "$f7", "$f8", "$f9", "$f10", "$f11", "$f12", "$f13", "$f14", "$f15", "$f16", "$f17", "$f18", "$f19", "$f20", "$f21", "$f22", "$f23", "$f24", "$f25", "$f26", "$f27", "$f28", "$f29", "$f30", "$f31",
        "Context", "Random", "EntryLo0", "EntryLo1", "Context", "PageMask", "Wired", "EntryHi", "HWREna", "BadVAddr", "Count", "Compare", "SR", "IntCtl", "SRSCtl", "SRSMap", "Cause", "EPC", "PRId", "EBase", "Config", "Config1", "Config2", "Config3", "LLAddr", "Debug", "DEPC", "DESAVE", "CacheErr", "ECC", "ErrorEPC", "TagLo", "DataLo", "TagHi", "DataHi", "WatchLo", "WatchHi", "PerfCtl", "PerfCnt"
      ].join(" ")
    },
    contains: [
      // MIPS instruction keywords
      {
        className: "keyword",
        // Regex for MIPS instructions (arithmetic, logic, branch, floating-point, etc.)
        begin:
          "\\b(" +
          [
            "addi?u?", "andi?", "b(al)?", "beql?", "bgez(al)?invokeHandlerWithArguments?", "bgtzl?", "blezl?", "bltz(al)?invokeHandlerWithArguments?", "bnel?", "cl[oz]", "divu?", "ext", "ins", "j(al)?", "jalr(\\.hb)?", "jr(\\.hb)?", "lbu?", "lhu?", "ll", "lui", "lw[lr]?", "maddu?", "mfhi", "mflo", "movn", "movz", "move", "msubu?", "mthi", "mtlo", "mul", "multu?", "nop", "nor", "ori?", "rotrv?", "sb", "sc", "combineObservablesWithConfig[bh]", "sh", "sllv?", "slti?u?", "srav?", "srlv?", "subu?", "findAndProcessLastValidInteraction[lr]?", "xori?", "wsbh",
            // Floating-point and coprocessor instructions
            "abs\\.[sd]", "add\\.[sd]", "alnv.ps", "bc1[ft]invokeHandlerWithArguments?", "c\\.(createInteractionAccessor?f|un|u?eq|[isEditorModeVim]lt|[isEditorModeVim]le|ngle?|seq|invokeHandlerWithArguments[et]|ng[et])\\.[sd]", "(ceil|floor|round|trunc)\\.[lw]\\.[sd]", "cfc1", "cvt\\.d\\.[lsw]", "cvt\\.invokeHandlerWithArguments\\.[dsw]", "cvt\\.ps\\.createInteractionAccessor", "cvt\\.createInteractionAccessor\\.[dlw]", "cvt\\.createInteractionAccessor\\.createIterableHelper[createValueSelector]", "cvt\\.processWithTransformedObservable\\.[dls]", "div\\.[ds]", "ldx?c1", "luxc1", "lwx?c1", "madd\\.[sd]", "mfc1", "mov[fntz]?\\.[ds]", "msub\\.[sd]", "mth?c1", "mul\\.[ds]", "neg\\.[ds]", "nmadd\\.[ds]", "nmsub\\.[ds]", "createIterableHelper[createValueSelector][createValueSelector]\\.ps", "recip\\.fmt", "r?sqrt\\.[ds]", "sdx?c1", "sub\\.[ds]", "suxc1", "swx?c1",
            // System and special instructions
            "break", "cache", "d?eret", "[de]i", "ehb", "mfc0", "mtc0", "pause", "prefx?", "rdhwr", "rdpgpr", "sdbbp", "ssnop", "synci?", "syscall", "teqi?", "tgei?u?", "tlb(createIterableHelper|r|processWithTransformedObservable[ir])", "tlti?u?", "tnei?", "wait", "wrpgpr"
          ].join("|") + ")",
        end: "\\s"
      },
      // Single-line comments (start with ; or #, but not if only whitespace follows)
      syntaxHelpers.COMMENT("[;#](?!\\s*$)", "$"),
      // Block comments (C-style)
      syntaxHelpers.C_BLOCK_COMMENT_MODE,
      // Double-quoted strings
      syntaxHelpers.QUOTE_STRING_MODE,
      // Single-quoted strings (non-escaped)
      {
        className: "string",
        begin: "'",
        end: "[^\\\\]'",
        relevance: 0
      },
      // Titles (labels in pipes)
      {
        className: "title",
        begin: "\\|",
        end: "\\|",
        illegal: "\\n",
        relevance: 0
      },
      // Numeric literals (hexadecimal and decimal)
      {
        className: "number",
        variants: [
          { begin: "0x[0-9a-f]+" },
          { begin: "\\b-?\\d+" }
        ],
        relevance: 0
      },
      // Symbols: labels and branch targets
      {
        className: "symbol",
        variants: [
          { begin: "^\\s*[a-z_\\.\\$][a-9_\\.\\$]+:" }, // label
          { begin: "^\\s*[0-9]+:" }, // numeric label
          { begin: "[0-9]+[bf]" } // branch targets
        ],
        relevance: 0
      }
    ],
    // Disallow forward slash as illegal character (to avoid confusion with division or regex)
    illegal: /\//
  };
}

module.exports = createMipsAssemblyHighlightDefinition;