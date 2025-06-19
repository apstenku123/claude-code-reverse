/**
 * Factory function that creates a syntax highlighting configuration object for Standard ML (SML).
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide COMMENT, inherit, APOS_STRING_MODE, and QUOTE_STRING_MODE utilities.
 * @returns {object} Highlight.js language definition object for Standard ML.
 */
function createStandardMLHighlightConfig(hljs) {
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
      literal:
        "true false NONE SOME LESS EQUAL GREATER nil"
    },
    // Illegal patterns for SML (e.g., C++/JavaScript style comments, right shift operator)
    illegal: /\/\/|>>/,
    contains: [
      // Match SML literals: empty list, empty tuple
      {
        className: "literal",
        begin: /\[(\|\|)?\]|\(\)/,
        relevance: 0
      },
      // SML block comments (nested)
      hljs.COMMENT("\\(\\*", "\\*\\)", {
        contains: ["self"] // Allow nested comments
      }),
      // SML type variables (e.g., 'a)
      {
        className: "symbol",
        begin: "'[a-z_](?!')[\\w']*"
      },
      // SML polymorphic variants (e.g., `Foo)
      {
        className: "type",
        begin: "`[a-zA][\\w']*"
      },
      // SML type constructors (e.g., List, Option)
      {
        className: "type",
        begin: "\\b[a-zA][\\w']*",
        relevance: 0
      },
      // SML value identifiers with type variables (e.g., foo'bar)
      {
        begin: "[a-z_]\\w*'[\\w']*"
      },
      // SML character literals (apostrophe strings)
      hljs.inherit(hljs.APOS_STRING_MODE, {
        className: "string",
        relevance: 0
      }),
      // SML string literals (double-quoted)
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null // Allow all content inside strings
      }),
      // SML number literals (decimal, hex, octal, binary, with optional suffixes)
      {
        className: "number",
        begin:
          "\\b(0[xX][a-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
        relevance: 0
      },
      // SML function type arrows (->, =>)
      {
        begin: /[-=]>/
      }
    ]
  };
}

module.exports = createStandardMLHighlightConfig;
