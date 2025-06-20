/**
 * Returns a syntax highlighting definition for Extended Backus-Naur Form (EBNF).
 *
 * @param {object} hljs - The highlight.js instance, providing syntax modes and helpers.
 * @returns {object} Syntax highlighting definition for EBNF.
 */
function ebnfSyntaxHighlighterDefinition(hljs) {
  // Define comment mode for EBNF: comments are enclosed in ( * ... * )
  const ebnfCommentMode = hljs.COMMENT(/\(\*/, /\*\)/);

  // Define attribute mode: matches rule names (identifiers) at the start of a line
  const ebnfAttributeMode = {
    className: "attribute",
    begin: /^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/
  };

  // Define value mode: matches the right-hand side of a rule, including strings and meta
  const ebnfValueMode = {
    begin: /=/, // Start after '='
    end: /[.;]/, // End at '.' or ';'
    contains: [
      ebnfCommentMode, // Allow comments inside rule definitions
      {
        className: "meta",
        begin: /\?.*\?/ // Meta information enclosed in ? ... ?
      },
      {
        className: "string",
        variants: [
          hljs.APOS_STRING_MODE, // Single-quoted strings
          hljs.QUOTE_STRING_MODE, // Double-quoted strings
          {
            begin: "`",
            end: "`" // Backtick-quoted strings
          }
        ]
      }
    ]
  };

  return {
    name: "Extended Backus-Naur Form",
    illegal: /\s/, // Illegal any non-whitespace at the root level
    contains: [ebnfCommentMode, ebnfAttributeMode, ebnfValueMode]
  };
}

module.exports = ebnfSyntaxHighlighterDefinition;