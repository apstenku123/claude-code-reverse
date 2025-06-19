/**
 * Defines syntax highlighting rules for the Dart programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common language modes and utilities.
 * @returns {object} An object defining Dart language highlighting rules for highlight.js.
 */
function defineDartHighlightingRules(hljs) {
  // Simple variable interpolation: $variableName
  const simpleSubstitution = {
    className: "subst",
    variants: [
      {
        begin: "\\$[a-z0-9_]+"
      }
    ]
  };

  // Complex variable interpolation: ${expression}
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

  // Dart string literal modes, including raw, multi-line, and interpolated strings
  const stringModes = {
    className: "string",
    variants: [
      // Raw multi-line single-quoted string: r'''
      {
        begin: "r'''",
        end: "'''"
      },
      // Raw multi-line double-quoted string: r"""
      {
        begin: 'r"""',
        end: '"""'
      },
      // Raw single-quoted string: r'
      {
        begin: "r'",
        end: "'",
        illegal: "\\n"
      },
      // Raw double-quoted string: r"
      {
        begin: 'r"',
        end: '"',
        illegal: "\\n"
      },
      // Multi-line single-quoted string: ''' ... '''
      {
        begin: "'''",
        end: "'''",
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      },
      // Multi-line double-quoted string: """ ... """
      {
        begin: '"""',
        end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      },
      // Single-quoted string: '...'
      {
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      },
      // Double-quoted string: "..."
      {
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE, simpleSubstitution, complexSubstitution]
      }
    ]
  };

  // Allow number highlighting and string interpolation inside complex substitutions
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
      // Dart doc single-line comments /// ...
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
      // Dart class and interface definitions
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
      // Dart metadata annotations: @Annotation
      {
        className: "meta",
        begin: "@[a-z]+"
      },
      // Dart arrow function syntax: =>
      {
        begin: "=>"
      }
    ]
  };
}

module.exports = defineDartHighlightingRules;
