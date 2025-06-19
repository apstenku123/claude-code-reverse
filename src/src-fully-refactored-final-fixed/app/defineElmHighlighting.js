/**
 * Defines syntax highlighting rules for the Elm programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing utilities and common modes.
 * @returns {object} Highlight.js language definition object for Elm.
 */
function defineElmHighlighting(hljs) {
  // Define comment variants: single-line (--) and multi-line ({- -})
  const commentModes = {
    variants: [
      hljs.COMMENT("--", "$"),
      hljs.COMMENT(/\{-/ , /-\}/, {
        contains: ["self"] // Allow nested multi-line comments
      })
    ]
  };

  // Type names: Capitalized identifiers (e.g., Maybe, List)
  const typeNameMode = {
    className: "type",
    begin: "\\b[a-zA][\\w']*",
    relevance: 0
  };

  // Type annotation parentheses (e.g., (a, b) -> c)
  const typeParenMode = {
    begin: "\\(",
    end: "\\)",
    illegal: '"', // Disallow double quotes inside type parens
    contains: [
      {
        className: "type",
        begin: "\\b[a-zA][\\w]*(\\((\\.\\.|,|\\w+)\\))?" // e.g., Maybe(..), Result a b
      },
      commentModes
    ]
  };

  // Type annotation curly braces (e.g., { a | b : Int })
  const typeCurlyMode = {
    begin: /\{/,
    end: /\}/,
    contains: typeParenMode.contains
  };

  // Character literal (e.g., 'a', '\n')
  const charLiteralMode = {
    className: "string",
    begin: "'\\\\?.", // Single quote, optional backslash, any char
    end: "'",
    illegal: "." // Disallow multi-character char literals
  };

  return {
    name: "Elm",
    keywords: "let in if then else case of where module import exposing type alias as infix infixl infixr port effect command subscription",
    contains: [
      // Module/effect/port declaration block
      {
        beginKeywords: "port effect module",
        end: "exposing",
        keywords: "port effect module where command subscription exposing",
        contains: [typeParenMode, commentModes],
        illegal: "\\W\\.|;"
      },
      // Import statement
      {
        begin: "import",
        end: "$",
        keywords: "import as exposing",
        contains: [typeParenMode, commentModes],
        illegal: "\\W\\.|;"
      },
      // Type/alias declaration
      {
        begin: "type",
        end: "$",
        keywords: "type alias",
        contains: [typeNameMode, typeParenMode, typeCurlyMode, commentModes]
      },
      // Infix operator declaration
      {
        beginKeywords: "infix infixl infixr",
        end: "$",
        contains: [hljs.C_NUMBER_MODE, commentModes]
      },
      // Port declaration
      {
        begin: "port",
        end: "$",
        keywords: "port",
        contains: [commentModes]
      },
      // Character literal
      charLiteralMode,
      // String literal
      hljs.QUOTE_STRING_MODE,
      // Number literal
      hljs.C_NUMBER_MODE,
      // Type name
      typeNameMode,
      // Function/variable name (lowercase identifier at start of line)
      hljs.inherit(hljs.TITLE_MODE, {
        begin: "^[_a-z][\\w']*"
      }),
      // Comments
      commentModes,
      // Arrow operators
      {
        begin: "->|<-"
      }
    ],
    illegal: /;/ // Disallow semicolons (not valid in Elm)
  };
}

module.exports = defineElmHighlighting;