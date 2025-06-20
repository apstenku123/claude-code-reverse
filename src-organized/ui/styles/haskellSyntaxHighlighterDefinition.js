/**
 * Returns the syntax highlighting definition for the Haskell language.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility methods and modes.
 * @returns {object} The language definition object for Haskell, suitable for highlight.js registration.
 */
function haskellSyntaxHighlighterDefinition(hljs) {
  // Define comment variants: line comments and block comments
  const commentModes = {
    variants: [
      hljs.COMMENT("--", "$"), // Line comment
      hljs.COMMENT(/\{-/ , /-\}/, { contains: ["self"] }) // Nested block comment
    ]
  };

  // Meta annotation block (e.g., {-# ... #-})
  const pragmaBlock = {
    className: "meta",
    begin: /\{-#/,
    end: /#-\}/
  };

  // Meta annotation line (e.g., #! ...)
  const pragmaLine = {
    className: "meta",
    begin: "^#",
    end: "$"
  };

  // Type name (e.g., Maybe, Either, etc.)
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
      pragmaBlock,
      pragmaLine,
      {
        className: "type",
        begin: "\\b[a-zA][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
      },
      hljs.inherit(hljs.TITLE_MODE, {
        begin: "[_a-z][\\w']*"
      }),
      commentModes
    ]
  };

  // Curly-brace block (e.g., record syntax)
  const recordBlock = {
    begin: /\{/,
    end: /\}/,
    contains: parenthesized.contains
  };

  return {
    name: "Haskell",
    aliases: ["hs"],
    keywords: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
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
      // Class/Instance declaration
      {
        className: "class",
        begin: "^(\\s*)?(class|instance)\\b",
        end: "where",
        keywords: "class family instance where",
        contains: [typeName, parenthesized, commentModes]
      },
      // Data/Type/Newtype declaration
      {
        className: "class",
        begin: "\\b(data|(new)?type)\\b",
        end: "$",
        keywords: "data family type newtype deriving",
        contains: [pragmaBlock, typeName, parenthesized, recordBlock, commentModes]
      },
      // Default declaration
      {
        beginKeywords: "default",
        end: "$",
        contains: [typeName, parenthesized, commentModes]
      },
      // Infix declarations
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
        begin: "#!/usr/bin/env runhaskell",
        end: "$"
      },
      pragmaBlock,
      pragmaLine,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      typeName,
      // Function/variable name at start of line
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

module.exports = haskellSyntaxHighlighterDefinition;