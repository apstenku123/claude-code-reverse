/**
 * Returns a syntax highlighting definition object for the Erlang REPL.
 *
 * @param {object} syntaxHelpers - An object containing syntax helper definitions and functions (e.g., COMMENT, APOS_STRING_MODE, QUOTE_STRING_MODE).
 * @returns {object} Syntax highlighting definition for Erlang REPL.
 */
function erlangReplSyntaxDefinition(syntaxHelpers) {
  return {
    name: "Erlang REPL",
    keywords: {
      built_in: "spawn spawn_link self",
      keyword:
        "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
    },
    contains: [
      // Match the Erlang REPL prompt (e.g., '1> ')
      {
        className: "meta",
        begin: "^[0-9]+> ",
        relevance: 10
      },
      // Erlang comments (from '%' to end of line)
      syntaxHelpers.COMMENT("%", "$"),
      // Erlang numbers (integers, floats, base notation)
      {
        className: "number",
        begin:
          "\\b(\\d+(_\\d+)*#[a-F0-9]+(_[a-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
        relevance: 0
      },
      // Erlang single-quoted atoms
      syntaxHelpers.APOS_STRING_MODE,
      // Erlang double-quoted strings
      syntaxHelpers.QUOTE_STRING_MODE,
      // Erlang type/record specifications (e.g., ?MODULE, ?::Type)
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
      // Erlang atoms (with or without module prefix)
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

module.exports = erlangReplSyntaxDefinition;