/**
 * Generates a syntax highlighting definition for the Elm programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing syntax highlighting utilities and modes.
 * @returns {object} The highlight.js language definition object for Elm.
 */
function createElmHighlightDefinition(hljs) {
  // Define comment variants: single-line (--) and multi-line ({- -})
  const commentModes = {
    variants: [
      hljs.COMMENT("--", "$"),
      hljs.COMMENT(/\{-/ , /-\}/, {
        contains: ["self"]
      })
    ]
  };

  // Define type names (e.g., Maybe, Result)
  const typeNameMode = {
    className: "type",
    begin: "\\b[a-zA][\\w']*",
    relevance: 0
  };

  // Define parenthesized type signatures (e.g., (a, b) or(..))
  const parenthesizedTypeMode = {
    begin: "\\(",
    end: "\\)",
    illegal: '"',
    contains: [
      {
        className: "type",
        begin: "\\b[a-zA][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
      },
      commentModes
    ]
  };

  // Define record type signatures (e.g., { a : Int, b : String })
  const recordTypeMode = {
    begin: /\{/,
    end: /\}/,
    contains: parenthesizedTypeMode.contains
  };

  // Define character literals (e.g., 'a', '\n')
  const charLiteralMode = {
    className: "string",
    begin: "'\\\\?.",
    end: "'",
    illegal: "."
  };

  return {
    name: "Elm",
    keywords: "let in if then else case of where module import exposing type alias as infix infixl infixr port effect command subscription",
    contains: [
      // Module/effect/port declarations
      {
        beginKeywords: "port effect module",
        end: "exposing",
        keywords: "port effect module where command subscription exposing",
        contains: [parenthesizedTypeMode, commentModes],
        illegal: "\\W\\.|;"
      },
      // Import statements
      {
        begin: "import",
        end: "$",
        keywords: "import as exposing",
        contains: [parenthesizedTypeMode, commentModes],
        illegal: "\\W\\.|;"
      },
      // Type and alias declarations
      {
        begin: "type",
        end: "$",
        keywords: "type alias",
        contains: [typeNameMode, parenthesizedTypeMode, recordTypeMode, commentModes]
      },
      // Infix declarations
      {
        beginKeywords: "infix infixl infixr",
        end: "$",
        contains: [hljs.C_NUMBER_MODE, commentModes]
      },
      // Port declarations
      {
        begin: "port",
        end: "$",
        keywords: "port",
        contains: [commentModes]
      },
      // Character literals
      charLiteralMode,
      // String literals
      hljs.QUOTE_STRING_MODE,
      // Number literals
      hljs.C_NUMBER_MODE,
      // Type names
      typeNameMode,
      // Function/variable names (identifiers)
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
    illegal: /;/
  };
}

module.exports = createElmHighlightDefinition;