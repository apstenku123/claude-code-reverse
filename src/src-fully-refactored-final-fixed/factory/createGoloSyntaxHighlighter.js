/**
 * Factory function that creates a syntax highlighting definition for the Golo programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common language modes.
 * @returns {object} Syntax highlighting definition for Golo, including keywords, literals, and comment/string/number modes.
 */
function createGoloSyntaxHighlighter(hljs) {
  return {
    name: "Golo",
    keywords: {
      keyword:
        "println readln print import module function local return let var while for foreach times in case when match with break continue augment augmentation each find filter reduce if then else otherwise try catch finally raise throw orIfNull DynamicObject|10 DynamicVariable struct Observable map set vector list array",
      literal: "true false null"
    },
    contains: [
      // Single-line hash comments
      hljs.HASH_COMMENT_MODE,
      // Quoted strings
      hljs.QUOTE_STRING_MODE,
      // Numeric literals
      hljs.C_NUMBER_MODE,
      // Meta annotations (e.g., @Test)
      {
        className: "meta",
        begin: "@[a-z]+"
      }
    ]
  };
}

module.exports = createGoloSyntaxHighlighter;