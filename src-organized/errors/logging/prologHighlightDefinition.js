/**
 * Returns a syntax highlighting definition for the Prolog language.
 *
 * @param {object} hljs - The highlight.js core object, providing common modes and utilities.
 * @returns {object} The Prolog language definition object for highlight.js.
 */
function prologHighlightDefinition(hljs) {
  // Prolog variable/atom identifier: starts with lowercase letter
  const atomIdentifier = {
    begin: /[a-z][a-z0-9_]*/,
    relevance: 0
  };

  // Prolog symbol: either capitalized identifier or underscore-prefixed
  const symbolIdentifier = {
    className: "symbol",
    variants: [
      { begin: /[a-zA][a-zA-Z0-9_]*/ }, // Variable (starts with uppercase)
      { begin: /_[a-z0-9_]*/ }      // Anonymous variable or similar
    ],
    relevance: 0
  };

  // Parentheses group, can contain other Prolog constructs
  const parenthesisGroup = {
    begin: /\(/,
    end: /\)/,
    relevance: 0
  };

  // Bracket group, can contain other Prolog constructs
  const bracketGroup = {
    begin: /\[/,
    end: /\]/
  };

  // Line comment: starts with % and goes to end of line
  const lineComment = {
    className: "comment",
    begin: /%/,
    end: /$/,
    contains: [hljs.PHRASAL_WORDS_MODE]
  };

  // Backtick string (Prolog quasi-quotation)
  const backtickString = {
    className: "string",
    begin: /`/,
    end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  // Character code string: 0'X or 0'\'
  const charCodeString = {
    className: "string",
    begin: /0'(\\'|.)/
  };

  // Special whitespace character string: 0'\s
  const whitespaceCharString = {
    className: "string",
    begin: /0'\\s/
  };

  // All constructs that can appear inside parentheses or brackets
  const prologContainedModes = [
    atomIdentifier,
    symbolIdentifier,
    parenthesisGroup,
    { begin: /:-/ }, // Rule separator
    bracketGroup,
    lineComment,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    backtickString,
    charCodeString,
    whitespaceCharString,
    hljs.C_NUMBER_MODE
  ];

  // Allow parentheses and brackets to contain all Prolog constructs
  parenthesisGroup.contains = prologContainedModes;
  bracketGroup.contains = prologContainedModes;

  return {
    name: "Prolog",
    contains: prologContainedModes.concat([
      {
        begin: /\.$/ // Clause terminator (period at end of line)
      }
    ])
  };
}

module.exports = prologHighlightDefinition;