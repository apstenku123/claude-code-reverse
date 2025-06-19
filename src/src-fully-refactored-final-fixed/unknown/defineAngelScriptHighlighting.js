/**
 * Defines syntax highlighting rules for the AngelScript language for use in a highlighting library.
 *
 * @param {object} hljs - The highlighting library instance, providing common modes and utilities.
 * @returns {object} AngelScript language definition object for the highlighting library.
 */
function defineAngelScriptHighlighting(hljs) {
  // Built-in types pattern
  const builtInType = {
    className: "built_in",
    begin: "\\b(void|bool|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|string|ref|array|double|float|auto|dictionary)"
  };

  // Symbol pattern (e.g., variable@)
  const symbolWithAt = {
    className: "symbol",
    begin: "[a-zA-Z0-9_]+@"
  };

  // Generic type pattern (e.g., <int, string>)
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
    keywords: "for in|0 break continue while do|0 return if else case switch namespace is cast or and xor not get|0 in inout|10 out override set|0 private public const default|0 final shared external mixin|10 enum typedef funcdef this super import from interface abstract|0 try catch protected explicit property",
    // Illegal patterns: using statement or function keyword not followed by '('
    illegal: "(^using\\s+[a-9_\\.]+;$|\\bfunction\\s*[^\\(])",
    contains: [
      // Single-quoted string
      {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      // Triple-quoted string
      {
        className: "string",
        begin: '"""',
        end: '"""'
      },
      // Double-quoted string
      {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      // Single-line comment
      hljs.C_LINE_COMMENT_MODE,
      // Multi-line comment
      hljs.C_BLOCK_COMMENT_MODE,
      // Attribute-like string at line start
      {
        className: "string",
        begin: "^\\s*\\[",
        end: "\\]"
      },
      // Interface or namespace declaration
      {
        beginKeywords: "interface namespace",
        end: /\{/, // End at opening brace
        illegal: "[;.\\-]",
        contains: [
          {
            className: "symbol",
            begin: "[a-zA-Z0-9_]+"
          }
        ]
      },
      // Class declaration with optional inheritance
      {
        beginKeywords: "class",
        end: /\{/, // End at opening brace
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
      // Built-in types
      builtInType,
      // Symbol with '@'
      symbolWithAt,
      // Literals
      {
        className: "literal",
        begin: "\\b(null|true|false)"
      },
      // Numbers (integer, float, hex, binary, etc.)
      {
        className: "number",
        relevance: 0,
        begin: "(-?)(\\b0[xXbBoOdD][a-F0-9]+|(\\b\\d+(\\.\\d*)?f?|\\.\\d+f?)([eE][-+]?\\d+f?)?)"
      }
    ]
  };
}

module.exports = defineAngelScriptHighlighting;