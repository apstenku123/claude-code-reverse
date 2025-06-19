/**
 * Factory function that creates a syntax highlighting definition for Standard ML (SML).
 * This definition is intended for use with syntax highlighting libraries such as highlight.js.
 *
 * @param {object} syntaxHelpers - An object containing helper methods and modes for syntax highlighting (e.g., COMMENT, inherit, APOS_STRING_MODE, QUOTE_STRING_MODE).
 * @returns {object} Highlighting definition object for Standard ML.
 */
function createStandardMLHighlightDefinition(syntaxHelpers) {
  return {
    name: "SML (Standard ML)",
    aliases: ["ml"],
    keywords: {
      // Pattern for matching keywords, built-ins, and literals
      $pattern: "[a-z_]\\w*!?",
      keyword:
        "abstype and andalso as case datatype do else end eqtype exception fn fun functor handle if in include infix infixr let local nonfix of op open orelse raise rec sharing sig signature struct structure then type val with withtype where while",
      built_in:
        "array bool char exn int list option order real ref string substring vector unit word",
      literal: "true false NONE SOME LESS EQUAL GREATER nil"
    },
    // Illegal patterns (e.g., C++ style comments or '>>' operator)
    illegal: /\/\/|>>/,
    contains: [
      {
        className: "literal",
        // Matches empty list [||], empty list [], or empty tuple ()
        begin: /\[(\|\|)?\]|\(\)/,
        relevance: 0
      },
      // Block comments: (* ... *)
      syntaxHelpers.COMMENT("\\(\\*", "\\*\\)", {
        contains: ["self"] // Allow nested comments
      }),
      {
        className: "symbol",
        // Matches type variables: e.g., 'a, 'foo
        begin: "'[a-z_](?!')[\\w']*"
      },
      {
        className: "type",
        // Matches backtick type names: `TypeName
        begin: "`[a-zA][\\w']*"
      },
      {
        className: "type",
        // Matches type names starting with uppercase: TypeName
        begin: "\\b[a-zA][\\w']*",
        relevance: 0
      },
      {
        // Matches identifiers with type variable suffix: foo'bar
        begin: "[a-z_]\\w*'[\\w']*"
      },
      // Single-quoted string mode (character literals)
      syntaxHelpers.inherit(syntaxHelpers.APOS_STRING_MODE, {
        className: "string",
        relevance: 0
      }),
      // Double-quoted string mode
      syntaxHelpers.inherit(syntaxHelpers.QUOTE_STRING_MODE, {
        illegal: null // Allow all contents
      }),
      {
        className: "number",
        // Matches SML number literals (decimal, hex, octal, binary, with optional suffixes)
        begin:
          "\\b(0[xX][a-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
        relevance: 0
      },
      {
        // Matches arrow operators (->, =>, etc.)
        begin: /[-=]>/
      }
    ]
  };
}

module.exports = createStandardMLHighlightDefinition;