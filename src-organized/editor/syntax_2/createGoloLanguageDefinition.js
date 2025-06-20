/**
 * Factory function that creates a syntax highlighting definition for the Golo programming language.
 *
 * @param {object} syntaxHighlighter - An object containing standard syntax highlighting modes (e.g., HASH_COMMENT_MODE, QUOTE_STRING_MODE, C_NUMBER_MODE).
 * @returns {object} Language definition object for Golo, including keywords, literals, and highlighting rules.
 */
function createGoloLanguageDefinition(syntaxHighlighter) {
  return {
    name: "Golo",
    keywords: {
      // List of Golo language keywords
      keyword:
        "println readln print import module function local return let var while for foreach times in case when match with break continue augment augmentation each find filter reduce if then else otherwise try catch finally raise throw orIfNull DynamicObject|10 DynamicVariable struct Observable map set vector list array",
      // Boolean and null literals
      literal: "true false null"
    },
    contains: [
      // Support for hash comments (e.g., # comment)
      syntaxHighlighter.HASH_COMMENT_MODE,
      // Support for quoted strings
      syntaxHighlighter.QUOTE_STRING_MODE,
      // Support for numeric constants
      syntaxHighlighter.C_NUMBER_MODE,
      {
        // Meta annotations (e.g., @SomeAnnotation)
        className: "meta",
        begin: "@[a-z]+"
      }
    ]
  };
}

module.exports = createGoloLanguageDefinition;