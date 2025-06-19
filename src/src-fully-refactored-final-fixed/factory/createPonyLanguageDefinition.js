/**
 * Generates a syntax highlighting definition for the Pony programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing regexes and common modes.
 * @returns {object} The Pony language definition object for highlight.js.
 */
function createPonyLanguageDefinition(hljs) {
  // Define Pony language keywords, meta-attributes, and literals
  const ponyKeywords = {
    keyword: "actor addressof and as be break class compile_error compile_intrinsic consume continue delegate digestof do else elseif embed end error for fun if ifdef in interface is isnt lambda let match new not object or primitive recover repeat return struct then trait try type until use var where while with xor",
    meta: "iso val tag trn box ref",
    literal: "this false true"
  };

  // Triple-quoted string (multi-line)
  const tripleQuotedString = {
    className: "string",
    begin: '"""',
    end: '"""',
    relevance: 10
  };

  // Standard double-quoted string
  const doubleQuotedString = {
    className: "string",
    begin: '"',
    end: '"',
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  // Single-quoted string (char literal or similar)
  const singleQuotedString = {
    className: "string",
    begin: "'",
    end: "'",
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  };

  // Type definition: starts with optional underscore, then uppercase letter, then word characters
  const typeDefinition = {
    className: "type",
    begin: "\\b_?[a-zA][\\w]*",
    relevance: 0
  };

  // Identifier followed by a single quote (e.g., for lifetimes or generics)
  const identifierWithQuote = {
    begin: hljs.IDENT_RE + "'",
    relevance: 0
  };

  // Number literal: supports hex, binary, decimal, floats, and scientific notation
  const numberLiteral = {
    className: "number",
    begin: "(-?)(\\b0[xX][a-F0-9]+|\\b0[bB][01]+|(\\b\\d+(_\\d+)?(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
    relevance: 0
  };

  return {
    name: "Pony",
    keywords: ponyKeywords,
    contains: [
      typeDefinition,
      tripleQuotedString,
      doubleQuotedString,
      singleQuotedString,
      identifierWithQuote,
      numberLiteral,
      hljs.C_LINE_COMMENT_MODE, // Single-line comments
      hljs.C_BLOCK_COMMENT_MODE // Multi-line comments
    ]
  };
}

module.exports = createPonyLanguageDefinition;