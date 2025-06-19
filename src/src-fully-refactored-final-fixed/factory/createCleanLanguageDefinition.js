/**
 * Factory function that returns the syntax highlighting definition for the 'Clean' programming language.
 *
 * @param {object} syntaxHelpers - An object containing syntax mode definitions and utilities (e.g., comment, string, and number modes).
 * @returns {object} The language definition object for Clean, including keywords, built-ins, literals, and syntax highlighting rules.
 */
function createCleanLanguageDefinition(syntaxHelpers) {
  return {
    name: "Clean",
    aliases: ["icl", "dcl"],
    keywords: {
      keyword:
        "if let in with where case of class instance otherwise implementation definition system module from import qualified as special code inline foreign export ccall stdcall generic derive infix infixl infixr",
      built_in: "Int Real Char Bool",
      literal: "True False"
    },
    contains: [
      // Single-line comments (e.g., // comment)
      syntaxHelpers.C_LINE_COMMENT_MODE,
      // Multi-line comments (e.g., /* comment */)
      syntaxHelpers.C_BLOCK_COMMENT_MODE,
      // Character literals (e.g., 'a')
      syntaxHelpers.APOS_STRING_MODE,
      // String literals (e.g., "text")
      syntaxHelpers.QUOTE_STRING_MODE,
      // Numeric literals
      syntaxHelpers.C_NUMBER_MODE,
      // Special Clean language operators and symbols
      {
        begin: "->|<-[|:]?|#!?|>>=|\\{\\||\\|\\}|:==|=:|<>"
      }
    ]
  };
}

module.exports = createCleanLanguageDefinition;
