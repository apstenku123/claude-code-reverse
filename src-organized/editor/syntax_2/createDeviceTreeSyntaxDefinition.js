/**
 * Generates a syntax highlighting definition for Device Tree files.
 *
 * @param {object} syntaxHelpers - An object containing helper functions and constants for syntax highlighting.
 * @returns {object} a syntax definition object for Device Tree language highlighting.
 */
function createDeviceTreeSyntaxDefinition(syntaxHelpers) {
  // String literal modes for Device Tree (handles quoted strings, raw strings, and character literals)
  const stringMode = {
    className: "string",
    variants: [
      // Inherit QUOTE_STRING_MODE and override the 'begin' regex for C-style strings
      syntaxHelpers.inherit(syntaxHelpers.QUOTE_STRING_MODE, {
        begin: '((u8?|UL)|createRefCountedMulticastOperator)?"'
      }),
      // Raw string literal mode
      {
        begin: '(u8?|UL)?isWildcardOrX"',
        end: '"',
        contains: [syntaxHelpers.BACKSLASH_ESCAPE]
      },
      // Character literal mode
      {
        begin: "'\\?.",
        end: "'",
        illegal: "."
      }
    ]
  };

  // Number literal modes (handles integer, float, and C-style number suffixes)
  const numberMode = {
    className: "number",
    variants: [
      {
        begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|UL|invokeHandlerWithArguments|createRefCountedMulticastOperator|ul|UL|f|F)"
      },
      {
        begin: syntaxHelpers.C_NUMBER_RE
      }
    ],
    relevance: 0
  };

  // Meta directive mode (handles preprocessor-like lines such as #define, #include, etc.)
  const metaMode = {
    className: "meta",
    begin: "#",
    end: "$",
    keywords: {
      "meta-keyword": "if else elif endif define undef ifdef ifndef"
    },
    contains: [
      // Line continuation (backslash + newline)
      {
        begin: /\\\n/,
        relevance: 0
      },
      // #include directive with string or angle-bracketed path
      {
        beginKeywords: "include",
        end: "$",
        keywords: {
          "meta-keyword": "include"
        },
        contains: [
          syntaxHelpers.inherit(stringMode, {
            className: "meta-string"
          }),
          {
            className: "meta-string",
            begin: "<",
            end: ">",
            illegal: "\\n"
          }
        ]
      },
      stringMode,
      syntaxHelpers.C_LINE_COMMENT_MODE,
      syntaxHelpers.C_BLOCK_COMMENT_MODE
    ]
  };

  // Variable mode (matches variables starting with &)
  const variableMode = {
    className: "variable",
    begin: /&[a-z\d_]*\b/
  };

  // Meta-keyword mode (matches /foo-bar/ style meta keywords)
  const metaKeywordMode = {
    className: "meta-keyword",
    begin: "/[a-z][a-z\d-]*/"
  };

  // Symbol mode (matches label definitions at the start of a line)
  const symbolMode = {
    className: "symbol",
    begin: "^\\s*[a-zA-Z_][a-zA\d_]*:"
  };

  // Params mode (matches angle-bracketed parameter lists)
  const paramsMode = {
    className: "params",
    begin: "<",
    end: ">",
    contains: [numberMode, variableMode]
  };

  // Class mode (matches node names with optional @unit-address)
  const classMode = {
    className: "class",
    begin: /[a-zA-Z_][a-zA\d_@]*\s\{/, // Node name followed by '{'
    end: /[{;=]/, // End at '{', ';', or '='
    returnBegin: true,
    excludeEnd: true
  };

  return {
    name: "Device Tree",
    keywords: "",
    contains: [
      // Top-level node block (high relevance)
      {
        className: "class",
        begin: "/\s*\\{",
        end: /\};/,
        relevance: 10,
        contains: [
          variableMode,
          metaKeywordMode,
          symbolMode,
          classMode,
          paramsMode,
          syntaxHelpers.C_LINE_COMMENT_MODE,
          syntaxHelpers.C_BLOCK_COMMENT_MODE,
          numberMode,
          stringMode
        ]
      },
      variableMode,
      metaKeywordMode,
      symbolMode,
      classMode,
      paramsMode,
      syntaxHelpers.C_LINE_COMMENT_MODE,
      syntaxHelpers.C_BLOCK_COMMENT_MODE,
      numberMode,
      stringMode,
      metaMode,
      // Double colon scope resolution (for completeness)
      {
        begin: syntaxHelpers.IDENT_RE + "::",
        keywords: ""
      }
    ]
  };
}

module.exports = createDeviceTreeSyntaxDefinition;