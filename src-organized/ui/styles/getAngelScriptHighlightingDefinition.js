/**
 * Returns the syntax highlighting definition for AngelScript for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library object, providing standard modes and utilities.
 * @returns {object} The AngelScript language definition object for highlight.js.
 */
function getAngelScriptHighlightingDefinition(hljs) {
  // Built-in types definition
  const builtInType = {
    className: "built_in",
    begin: "\\b(void|bool|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|string|ref|array|double|float|auto|dictionary)"
  };

  // Symbol definition (e.g., variable@)
  const symbolWithAt = {
    className: "symbol",
    begin: "[a-zA-Z0-9_]+@"
  };

  // Generic type parameter definition (e.g., <int>)
  const genericType = {
    className: "keyword",
    begin: "<",
    end: ">",
    contains: [builtInType, symbolWithAt]
  };

  // Allow generics inside built-in types and symbols
  builtInType.contains = [genericType];
  symbolWithAt.contains = [genericType];

  return {
    name: "AngelScript",
    aliases: ["asc"],
    keywords:
      "for in|0 break continue while do|0 return if else case switch namespace is cast or and xor not get|0 in inout|10 out override set|0 private public const default|0 final shared external mixin|10 enum typedef funcdef this super import from interface abstract|0 try catch protected explicit property",
    illegal: "(^using\\s+[a-9_\\.]+;$|\\bfunction\\s*[^\\(])",
    contains: [
      // Single-quoted strings (no newlines)
      {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      // Triple-quoted strings
      {
        className: "string",
        begin: '"""',
        end: '"""'
      },
      // Double-quoted strings (no newlines)
      {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      // Line and block comments (from highlight.js common modes)
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Attribute-style strings (e.g., [Attribute])
      {
        className: "string",
        begin: "^\\s*\\[",
        end: "\\]"
      },
      // Interface and namespace declarations
      {
        beginKeywords: "interface namespace",
        end: /\{/,
        illegal: "[;.\\-]",
        contains: [
          {
            className: "symbol",
            begin: "[a-zA-Z0-9_]+"
          }
        ]
      },
      // Class declarations with optional inheritance/implementation
      {
        beginKeywords: "class",
        end: /\{/,
        illegal: "[;.\\-]",
        contains: [
          {
            className: "symbol",
            begin: "[a-zA-Z0-9_]+",
            contains: [
              {
                begin: "[:,]\\s*",
                contains: [
                  {
                    className: "symbol",
                    begin: "[a-zA-Z0-9_]+"
                  }
                ]
              }
            ]
          }
        ]
      },
      // Built-in types and symbols
      builtInType,
      symbolWithAt,
      // Literals
      {
        className: "literal",
        begin: "\\b(null|true|false)"
      },
      // Numbers (hex, binary, octal, decimal, floats)
      {
        className: "number",
        relevance: 0,
        begin:
          "(-?)(\\b0[xXbBoOdD][a-F0-9]+|(\\b\\d+(\\.\\d*)?f?|\\.\\d+f?)([eE][-+]?\\d+f?)?)"
      }
    ]
  };
}

module.exports = getAngelScriptHighlightingDefinition;