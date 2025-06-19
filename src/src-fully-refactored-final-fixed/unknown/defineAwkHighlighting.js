/**
 * Defines syntax highlighting configuration for the Awk programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common language modes and utilities.
 * @returns {object} Highlight.js language definition object for Awk.
 */
function defineAwkHighlighting(hljs) {
  // Variable highlighting: $foo, ${bar}, $1, etc.
  const variableMode = {
    className: "variable",
    variants: [
      {
        begin: /\$[\w\d#@][\w\d_]*/ // $var, $1, $foo_bar
      },
      {
        begin: /\$\{(.*?)\}/ // ${var}
      }
    ]
  };

  // Awk keywords with relevance boost for 'exit'
  const awkKeywords = "BEGIN END if else while do for in break continue delete next nextfile function func exit|10";

  // String highlighting: supports Awk'createInteractionAccessor various string literal forms
  const stringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /(u|b)?r?'''/, // Triple single quotes
        end: /'''/,
        relevance: 10
      },
      {
        begin: /(u|b)?r?"""/, // Triple double quotes
        end: /"""/,
        relevance: 10
      },
      {
        begin: /(u|r|ur)'/, // Single quoted with prefixes
        end: /'/,
        relevance: 10
      },
      {
        begin: /(u|r|ur)"/, // Double quoted with prefixes
        end: /"/,
        relevance: 10
      },
      {
        begin: /(b|br)'/, // Single quoted binary/raw
        end: /'/
      },
      {
        begin: /(b|br)"/, // Double quoted binary/raw
        end: /"/
      },
      hljs.APOS_STRING_MODE, // Standard single-quoted string
      hljs.QUOTE_STRING_MODE // Standard double-quoted string
    ]
  };

  return {
    name: "Awk",
    keywords: {
      keyword: awkKeywords
    },
    contains: [
      variableMode,
      stringMode,
      hljs.REGEXP_MODE, // Regular expressions
      hljs.HASH_COMMENT_MODE, // Comments starting with #
      hljs.NUMBER_MODE // Numbers
    ]
  };
}

module.exports = defineAwkHighlighting;