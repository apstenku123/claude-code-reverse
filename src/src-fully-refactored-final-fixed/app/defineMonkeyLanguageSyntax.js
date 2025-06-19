/**
 * Defines the syntax highlighting configuration for the Monkey programming language.
 *
 * @param {object} syntaxHelpers - An object providing syntax highlighting helper modes and utilities.
 * @param {object} syntaxHelpers.NUMBER_MODE - Helper for number highlighting.
 * @param {function} syntaxHelpers.COMMENT - Helper for comment highlighting.
 * @param {object} syntaxHelpers.UNDERSCORE_TITLE_MODE - Helper for identifiers with underscores.
 * @param {object} syntaxHelpers.QUOTE_STRING_MODE - Helper for string highlighting.
 * @returns {object} The syntax highlighting definition for Monkey language.
 */
function defineMonkeyLanguageSyntax(syntaxHelpers) {
  // Configuration for number highlighting, including hexadecimal numbers
  const numberHighlightConfig = {
    className: "number",
    relevance: 0,
    variants: [
      { begin: "[$][a-F0-9]+" }, // Hexadecimal numbers starting with $
      syntaxHelpers.NUMBER_MODE // Standard number mode from helpers
    ]
  };

  return {
    name: "Monkey",
    case_insensitive: true,
    keywords: {
      keyword: "public private property continue exit extern new try catch eachin not abstract final select case default const local global field end if then else elseif endif while wend repeat until forever for to step next return module inline throw import",
      built_in: "DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed handleHeadElementStartTag HALFPI TWOPI",
      literal: "true false null and or shl shr mod"
    },
    illegal: /\/\*/, // Illegal pattern: block comments
    contains: [
      // Block comments: #rem ... #end
      syntaxHelpers.COMMENT("#rem", "#end"),
      // Single-line comments: ' ... (to end of line)
      syntaxHelpers.COMMENT("'", "$", { relevance: 0 }),
      // Function/method definitions
      {
        className: "function",
        beginKeywords: "function method",
        end: "[(=:]|$",
        illegal: /\n/,
        contains: [syntaxHelpers.UNDERSCORE_TITLE_MODE]
      },
      // Class/interface definitions
      {
        className: "class",
        beginKeywords: "class interface",
        end: "$",
        contains: [
          { beginKeywords: "extends implements" },
          syntaxHelpers.UNDERSCORE_TITLE_MODE
        ]
      },
      // Built-in references: self, super
      {
        className: "built_in",
        begin: "\\b(self|super)\\b"
      },
      // Meta directives starting with #
      {
        className: "meta",
        begin: "\\s*#",
        end: "$",
        keywords: {
          "meta-keyword": "if else elseif endif end then"
        }
      },
      // Strict mode directive
      {
        className: "meta",
        begin: "^\\s*strict\\b"
      },
      // Alias definitions
      {
        beginKeywords: "alias",
        end: "=",
        contains: [syntaxHelpers.UNDERSCORE_TITLE_MODE]
      },
      // String literals
      syntaxHelpers.QUOTE_STRING_MODE,
      // Number literals
      numberHighlightConfig
    ]
  };
}

module.exports = defineMonkeyLanguageSyntax;