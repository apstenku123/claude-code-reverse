/**
 * Returns a syntax highlighting definition object for the Erlang REPL.
 *
 * This function defines the syntax rules, keywords, and patterns used to highlight
 * Erlang REPL code blocks. It leverages helper methods from the provided syntaxHighlighter object.
 *
 * @param {object} syntaxHighlighter - An object providing syntax highlighting helpers (e.g., COMMENT, APOS_STRING_MODE, QUOTE_STRING_MODE).
 * @returns {object} Syntax highlighting definition for Erlang REPL.
 */
function getErlangReplSyntaxDefinition(syntaxHighlighter) {
  return {
    name: "Erlang REPL",
    keywords: {
      built_in: "spawn spawn_link self",
      keyword:
        "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
    },
    contains: [
      // Match the REPL prompt, e.g., '1> '
      {
        className: "meta",
        begin: "^[0-9]+> ",
        relevance: 10
      },
      // Erlang comments start with '%'
      syntaxHighlighter.COMMENT("%", "$"),
      // Erlang numbers (integers, floats, base notation)
      {
        className: "number",
        begin:
          "\\b(\\d+(_\\d+)*#[a-F0-9]+(_[a-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
        relevance: 0
      },
      // Erlang single-quoted atoms
      syntaxHighlighter.APOS_STRING_MODE,
      // Erlang double-quoted strings
      syntaxHighlighter.QUOTE_STRING_MODE,
      // Erlang type specifications and module attributes (complex pattern)
      {
        begin: $invokeWithAdvancedArgumentHandling(/\?(::)?/, /([a-zA]\w*)/, /((::)[a-zA]\w*)*/)
      },
      // Erlang function arrow
      {
        begin: "->"
      },
      // Erlang 'ok' atom
      {
        begin: "ok"
      },
      // Erlang message send operator
      {
        begin: "!"
      },
      // Erlang atoms and module:function patterns
      {
        begin:
          "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
        relevance: 0
      },
      // Erlang variables (start with uppercase)
      {
        begin: "[a-zA][a-zA-Z0-9_']*",
        relevance: 0
      }
    ]
  };
}

module.exports = getErlangReplSyntaxDefinition;