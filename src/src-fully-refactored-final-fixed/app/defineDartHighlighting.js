/**
 * Defines the syntax highlighting configuration for the Dart programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and helpers.
 * @returns {object} The Dart language definition object for highlight.js.
 */
function defineDartHighlighting(hljs) {
  // Simple variable substitution: $identifier
  const simpleSubstitution = {
    className: "subst",
    variants: [
      {
        begin: "\\$[a-z0-9_]+"
      }
    ]
  };

  // Complex substitution: ${...}
  const complexSubstitution = {
    className: "subst",
    variants: [
      {
        begin: /\$\{/,
        end: /\}/
      }
    ],
    keywords: "true false null this is new super"
  };

  // String modes, including raw and multi-line strings
  const stringModes = {
    className: "string",
    variants: [
      // Raw multi-line single quote
      {
        begin: "r'''",
        end: "'''"
      },
      // Raw multi-line double quote
      {
        begin: 'r"""',
        end: '"""'
      },
      // Raw single quote
      {
        begin: "r'",
        end: "'",
        illegal: "\\n"
      },
      // Raw double quote
      {
        begin: 'r"',
        end: '"',
        illegal: "\\n"
      },
      // Multi-line single quote
      {
        begin: "'''",
        end: "'''",
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      },
      // Multi-line double quote
      {
        begin: '"""',
        end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      },
      // Single quote
      {
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      },
      // Double quote
      {
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      }
    ]
  };

  // Allow number and string interpolation inside complex substitution
  complexSubstitution.contains = [hljs.C_NUMBER_MODE, stringModes];

  // List of Dart built-in types and classes
  const dartBuiltInTypes = [
    "Comparable", "DateTime", "Duration", "Function", "Iterable", "Iterator", "List", "Map", "Match", "Object", "Pattern", "RegExp", "Set", "Stopwatch", "String", "StringBuffer", "StringSink", "Symbol", "Type", "Uri", "bool", "double", "int", "num", "Element", "ElementList"
  ];

  // Add nullable versions of built-in types (e.g., String?)
  const dartNullableTypes = dartBuiltInTypes.map(type => `${type}?`);

  return {
    name: "Dart",
    keywords: {
      keyword:
        "abstract as assert async await break case catch class const continue covariant default deferred do dynamic else enum export extends extension external factory false final finally for Function get hide if implements import in inferface is late library mixin new null on operator part required rethrow return set show static super switch sync this throw true try typedef var void while with yield",
      built_in: dartBuiltInTypes
        .concat(dartNullableTypes)
        .concat([
          "Never",
          "Null",
          "dynamic",
          "print",
          "document",
          "querySelector",
          "querySelectorAll",
          "window"
        ]),
      $pattern: /[A-Za-z_$][A-Za-z0-9_$]*\??/
    },
    contains: [
      stringModes,
      // Dart doc comments /** ... */
      hljs.COMMENT(/\/\*\*(?!\/)/, /\*\//, {
        subLanguage: "markdown",
        relevance: 0
      }),
      // Dart doc line comments /// ...
      hljs.COMMENT(/\/{3,} ?/, /$/, {
        contains: [
          {
            subLanguage: "markdown",
            begin: ".",
            end: "$",
            relevance: 0
          }
        ]
      }),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Class and interface definitions
      {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/,
        excludeEnd: true,
        contains: [
          {
            beginKeywords: "extends implements"
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      hljs.C_NUMBER_MODE,
      // Metadata annotations
      {
        className: "meta",
        begin: "@[a-z]+"
      },
      // Arrow function syntax
      {
        begin: "=>"
      }
    ]
  };
}

module.exports = defineDartHighlighting;
