/**
 * Returns the syntax highlighting definition for the X++ programming language.
 *
 * This function is intended for use with syntax highlighters (such as highlight.js).
 * It defines the keywords, built-in types, literals, and language constructs for X++.
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide language modes (e.g., comment, string, number modes).
 * @returns {object} The language definition object for X++ syntax highlighting.
 */
function getXPlusPlusHighlightDefinition(hljs) {
  return {
    name: "X++",
    aliases: ["x++"],
    keywords: {
      keyword: [
        "abstract", "as", "asc", "avg", "break", "breakpoint", "by", "byref", "case", "catch",
        "changecompany", "class", "client", "common", "const", "continue", "count", "crosscompany",
        "delegate", "delete_from", "desc", "display", "div", "do", "edit", "else", "eventhandler",
        "exists", "extends", "final", "finally", "firstfast", "firstonly", "firstonly1", "firstonly10",
        "firstonly100", "firstonly1000", "flush", "for", "forceliterals", "forcenestedloop",
        "forceplaceholders", "forceselectorder", "forupdate", "from", "generateonly", "group", "hint",
        "if", "implements", "in", "index", "insert_recordset", "interface", "internal", "is", "join",
        "like", "maxof", "minof", "mod", "namespace", "new", "next", "nofetch", "notexists",
        "optimisticlock", "order", "outer", "pessimisticlock", "print", "private", "protected",
        "public", "readonly", "repeatableread", "retry", "return", "reverse", "select", "server",
        "setting", "static", "sum", "super", "switch", "this", "throw", "try", "ttsabort", "ttsbegin",
        "ttscommit", "unchecked", "update_recordset", "using", "validtimestate", "void", "where", "while"
      ],
      built_in: [
        "anytype", "boolean", "byte", "char", "container", "date", "double", "enum", "guid", "int",
        "int64", "long", "real", "short", "str", "utcdatetime", "var"
      ],
      literal: ["default", "false", "null", "true"]
    },
    contains: [
      // Single-line comments
      hljs.C_LINE_COMMENT_MODE,
      // Multi-line comments
      hljs.C_BLOCK_COMMENT_MODE,
      // Single-quoted strings
      hljs.APOS_STRING_MODE,
      // Double-quoted strings
      hljs.QUOTE_STRING_MODE,
      // Numbers
      hljs.C_NUMBER_MODE,
      // Preprocessor/meta lines (e.g., #define)
      {
        className: "meta",
        begin: "#",
        end: "$"
      },
      // Class and interface definitions
      {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/, // End at opening brace
        excludeEnd: true, // normalizeToError not include the brace in the match
        illegal: ":", // Disallow colon in class/interface declaration
        contains: [
          {
            beginKeywords: "extends implements" // Inheritance/implementation
          },
          hljs.UNDERSCORE_TITLE_MODE // Class/interface name
        ]
      }
    ]
  };
}

module.exports = getXPlusPlusHighlightDefinition;