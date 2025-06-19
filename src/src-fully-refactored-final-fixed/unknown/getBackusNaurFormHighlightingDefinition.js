/**
 * Returns a syntax highlighting definition object for Backus–Naur Form (BNF) grammars.
 *
 * This definition is intended for use with syntax highlighters such as highlight.js.
 * It defines rules for highlighting attributes (enclosed in < and >),
 * production rules (::= ...), and supports comments and string modes as provided
 * by the passed-in syntax modes object.
 *
 * @param {object} syntaxModes - An object containing syntax highlighting modes, such as comment and string modes.
 *   Expected properties:
 *     - C_LINE_COMMENT_MODE: Mode for C-style line comments
 *     - C_BLOCK_COMMENT_MODE: Mode for C-style block comments
 *     - APOS_STRING_MODE: Mode for single-quoted strings
 *     - QUOTE_STRING_MODE: Mode for double-quoted strings
 * @returns {object} Highlight.js-compatible language definition for BNF
 */
function getBackusNaurFormHighlightingDefinition(syntaxModes) {
  return {
    name: "Backus–Naur Form",
    contains: [
      // Highlight attributes enclosed in angle brackets, e.g. <attribute>
      {
        className: "attribute",
        begin: /</,
        end: />/
      },
      // Highlight production rules, e.g. ::= ...
      {
        begin: /::=/,
        end: /$/,
        contains: [
          // Nested attribute highlighting within production rules
          {
            begin: /</,
            end: />/
          },
          // Support for comments and string literals within production rules
          syntaxModes.C_LINE_COMMENT_MODE,
          syntaxModes.C_BLOCK_COMMENT_MODE,
          syntaxModes.APOS_STRING_MODE,
          syntaxModes.QUOTE_STRING_MODE
        ]
      }
    ]
  };
}

module.exports = getBackusNaurFormHighlightingDefinition;