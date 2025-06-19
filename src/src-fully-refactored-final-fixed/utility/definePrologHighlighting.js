/**
 * Defines the syntax highlighting rules for the Prolog programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common modes and utilities.
 * @returns {object} Highlight.js language definition object for Prolog.
 */
function definePrologHighlighting(hljs) {
  // Matches lowercase identifiers (atoms, variables)
  const identifier = {
    begin: /[a-z][a-z0-9_]*/,
    relevance: 0
  };

  // Matches symbols: uppercase identifiers (variables) and underscores
  const symbol = {
    className: "symbol",
    variants: [
      { begin: /[a-zA][a-zA-Z0-9_]*/ }, // Variables
      { begin: /_[a-z0-9_]*/ }      // Anonymous variables
    ],
    relevance: 0
  };

  // Matches parentheses (used for grouping)
  const parenthesisGroup = {
    begin: /\(/,
    end: /\)/,
    relevance: 0
  };

  // Matches square brackets (lists)
  const squareBracketGroup = {
    begin: /\[/,
    end: /\]/
  };

  // Matches line comments starting with '%'
  const lineComment = {
    className: "comment",
    begin: /%/,
    end: /$/,
    contains: [hljs.PHRASAL_WORDS_MODE]
  };

  // Matches backtick-quoted strings (Prolog quasi-quotations)
  const quasiQuotationString = {
    className: "string",
    begin: /`/,
    end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  // Matches character codes like 0'a or 0'\'
  const characterCodeString = {
    className: "string",
    begin: /0'(\\'|.)/
  };

  // Matches whitespace character codes like 0'\s
  const whitespaceCharCodeString = {
    className: "string",
    begin: /0'\\s/
  };

  // All top-level modes for Prolog highlighting
  const prologModes = [
    identifier,
    symbol,
    parenthesisGroup,
    { begin: /:-/ }, // Rule separator
    squareBracketGroup,
    lineComment,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    quasiQuotationString,
    characterCodeString,
    whitespaceCharCodeString,
    hljs.C_NUMBER_MODE
  ];

  // Allow nesting of all modes inside parentheses and brackets
  parenthesisGroup.contains = prologModes;
  squareBracketGroup.contains = prologModes;

  return {
    name: "Prolog",
    contains: prologModes.concat([
      {
        begin: /\.$/ // End of clause
      }
    ])
  };
}

module.exports = definePrologHighlighting;