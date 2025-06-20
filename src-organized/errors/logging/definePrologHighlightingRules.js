/**
 * Defines syntax highlighting rules for the Prolog programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common modes and utilities.
 * @returns {object} An object describing the Prolog language highlighting rules for highlight.js.
 */
function definePrologHighlightingRules(hljs) {
  // Matches lowercase identifiers (atoms, variables)
  const atomIdentifier = {
    begin: /[a-z][a-z0-9_]*/,
    relevance: 0
  };

  // Matches symbols: uppercase identifiers (variables) and underscores
  const symbolIdentifier = {
    className: "symbol",
    variants: [
      { begin: /[a-zA][a-zA-Z0-9_]*/ }, // Variable names
      { begin: /_[a-z0-9_]*/ }       // Anonymous variables
    ],
    relevance: 0
  };

  // Matches parentheses (used for grouping and arguments)
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

  // Matches character code strings like 0'a
  const charCodeString = {
    className: "string",
    begin: /0'(\\'|.)/
  };

  // Matches whitespace character code string like 0'\s
  const whitespaceCharCodeString = {
    className: "string",
    begin: /0'\\s/
  };

  // List of all Prolog syntax highlighting rules
  const prologSyntaxRules = [
    atomIdentifier,
    symbolIdentifier,
    parenthesisGroup,
    { begin: /:-/ }, // Rule/Fact separator
    squareBracketGroup,
    lineComment,
    hljs.C_BLOCK_COMMENT_MODE, // C-style block comments
    hljs.QUOTE_STRING_MODE,    // Double-quoted strings
    hljs.APOS_STRING_MODE,     // Single-quoted strings
    quasiQuotationString,
    charCodeString,
    whitespaceCharCodeString,
    hljs.C_NUMBER_MODE         // Numbers
  ];

  // Allow nested highlighting inside parentheses and brackets
  parenthesisGroup.contains = prologSyntaxRules;
  squareBracketGroup.contains = prologSyntaxRules;

  return {
    name: "Prolog",
    contains: prologSyntaxRules.concat([
      { begin: /\.$/ } // End of clause
    ])
  };
}

module.exports = definePrologHighlightingRules;
