/**
 * Returns the syntax highlighting definition for the Awk programming language.
 *
 * @param {object} hljs - The highlight.js core object containing common language modes and utilities.
 * @returns {object} Awk language definition for highlight.js
 */
function getAwkHighlightingDefinition(hljs) {
  // Variable highlighting: $var, ${var}
  const variableMode = {
    className: "variable",
    variants: [
      {
        begin: /\$[\w\d#@][\w\d_]*/
      },
      {
        begin: /\$\{(.*?)\}/
      }
    ]
  };

  // Awk keywords with relevance boost for 'exit'
  const awkKeywords = "BEGIN END if else while do for in break continue delete next nextfile function func exit|10";

  // String highlighting: supports raw, unicode, byte, triple, and single/double quoted strings
  const stringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /(u|b)?r?'''/,
        end: /'''/,
        relevance: 10
      },
      {
        begin: /(u|b)?r?"""/,
        end: /"""/,
        relevance: 10
      },
      {
        begin: /(u|r|ur)'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /(u|r|ur)"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /(b|br)'/,
        end: /'/
      },
      {
        begin: /(b|br)"/,
        end: /"/
      },
      // Fallback to generic string modes from highlight.js
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
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
      hljs.REGEXP_MODE,
      hljs.HASH_COMMENT_MODE,
      hljs.NUMBER_MODE
    ]
  };
}

module.exports = getAwkHighlightingDefinition;