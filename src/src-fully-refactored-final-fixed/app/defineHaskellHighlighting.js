/**
 * Defines syntax highlighting rules for the Haskell programming language.
 *
 * @param {object} hljs - The highlight.js instance providing helper methods and modes.
 * @returns {object} An object describing Haskell language highlighting rules for highlight.js.
 */
function defineHaskellHighlighting(hljs) {
  // Block and line comment configuration
  const commentModes = {
    variants: [
      hljs.COMMENT("--", "$"), // Single-line comment
      hljs.COMMENT(/\{\-/, /-\}/, { contains: ["self"] }) // Nested block comment
    ]
  };

  // Pragmas and meta directives (e.g., {-# ... #-})
  const pragmaMeta = {
    className: "meta",
    begin: /\{-#/,
    end: /#-\}/
  };

  // Top-level meta directives (e.g., #! ...)
  const hashMeta = {
    className: "meta",
    begin: "^#",
    end: "$"
  };

  // Type names (e.g., Maybe, Either)
  const typeName = {
    className: "type",
    begin: "\\b[a-zA][\\w']*",
    relevance: 0
  };

  // Parenthesized expressions/types
  const parenthesized = {
    begin: "\\(",
    end: "\\)",
    illegal: '"',
    contains: [
      pragmaMeta,
      hashMeta,
      {
        className: "type",
        begin: "\\b[a-zA][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
      },
      // Lowercase identifiers (variables, constructors)
      hljs.inherit(hljs.TITLE_MODE, {
        begin: "[_a-z][\\w']*"
      }),
      commentModes
    ]
  };

  // Curly-braced expressions/types
  const curlyBraced = {
    begin: /\{/,
    end: /\}/,
    contains: parenthesized.contains
  };

  return {
    name: "Haskell",
    aliases: ["hs"],
    keywords:
      "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
    contains: [
      // Module declaration
      {
        beginKeywords: "module",
        end: "where",
        keywords: "module where",
        contains: [parenthesized, commentModes],
        illegal: "\\W\\.|;"
      },
      // Import statement
      {
        begin: "\\bimport\\b",
        end: "$",
        keywords: "import qualified as hiding",
        contains: [parenthesized, commentModes],
        illegal: "\\W\\.|;"
      },
      // Class and instance declarations
      {
        className: "class",
        begin: "^(\\s*)?(class|instance)\\b",
        end: "where",
        keywords: "class family instance where",
        contains: [typeName, parenthesized, commentModes]
      },
      // Data, newtype, and type declarations
      {
        className: "class",
        begin: "\\b(data|(new)?type)\\b",
        end: "$",
        keywords: "data family type newtype deriving",
        contains: [pragmaMeta, typeName, parenthesized, curlyBraced, commentModes]
      },
      // Default declaration
      {
        beginKeywords: "default",
        end: "$",
        contains: [typeName, parenthesized, commentModes]
      },
      // Infix operator declarations
      {
        beginKeywords: "infix infixl infixr",
        end: "$",
        contains: [hljs.C_NUMBER_MODE, commentModes]
      },
      // Foreign function interface
      {
        begin: "\\bforeign\\b",
        end: "$",
        keywords: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
        contains: [typeName, hljs.QUOTE_STRING_MODE, commentModes]
      },
      // Shebang for runhaskell
      {
        className: "meta",
        begin: "#!\\/usr\\/bin\\/env runhaskell",
        end: "$"
      },
      pragmaMeta,
      hashMeta,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      typeName,
      // Top-level function/variable definitions
      hljs.inherit(hljs.TITLE_MODE, {
        begin: "^[_a-z][\\w']*"
      }),
      commentModes,
      {
        begin: "->|<-"
      }
    ]
  };
}

module.exports = defineHaskellHighlighting;
