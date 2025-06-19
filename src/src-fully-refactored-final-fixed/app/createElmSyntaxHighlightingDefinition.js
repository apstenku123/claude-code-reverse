/**
 * Generates a syntax highlighting definition object for the Elm programming language.
 *
 * @param {object} highlighter - The syntax highlighter utility object, expected to provide COMMENT, QUOTE_STRING_MODE, C_NUMBER_MODE, TITLE_MODE, and inherit methods.
 * @returns {object} a configuration object defining Elm syntax highlighting rules.
 */
function createElmSyntaxHighlightingDefinition(highlighter) {
  // Comment modes: single-line (--) and multi-line ({- -})
  const commentModes = {
    variants: [
      highlighter.COMMENT("--", "$"),
      highlighter.COMMENT(/\{-/, /-\}/, {
        contains: ["self"]
      })
    ]
  };

  // Type name pattern: Capitalized identifier
  const typeNameMode = {
    className: "type",
    begin: "\\b[a-zA][\\w']*",
    relevance: 0
  };

  // Parentheses group: used for types and imports
  const parenthesesGroupMode = {
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

  // Curly braces group: used for records
  const curlyBracesGroupMode = {
    begin: /\{/,
    end: /\}/,
    contains: parenthesesGroupMode.contains
  };

  // Character literal mode
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
        contains: [parenthesesGroupMode, commentModes],
        illegal: "\\W\\.|;"
      },
      // Import statements
      {
        begin: "import",
        end: "$",
        keywords: "import as exposing",
        contains: [parenthesesGroupMode, commentModes],
        illegal: "\\W\\.|;"
      },
      // Type and alias declarations
      {
        begin: "type",
        end: "$",
        keywords: "type alias",
        contains: [typeNameMode, parenthesesGroupMode, curlyBracesGroupMode, commentModes]
      },
      // Infix declarations
      {
        beginKeywords: "infix infixl infixr",
        end: "$",
        contains: [highlighter.C_NUMBER_MODE, commentModes]
      },
      // Port declarations
      {
        begin: "port",
        end: "$",
        keywords: "port",
        contains: [commentModes]
      },
      // Character literal
      charLiteralMode,
      // String literal
      highlighter.QUOTE_STRING_MODE,
      // Number literal
      highlighter.C_NUMBER_MODE,
      // Type name
      typeNameMode,
      // Function/variable name (lowercase identifier at line start)
      highlighter.inherit(highlighter.TITLE_MODE, {
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

module.exports = createElmSyntaxHighlightingDefinition;