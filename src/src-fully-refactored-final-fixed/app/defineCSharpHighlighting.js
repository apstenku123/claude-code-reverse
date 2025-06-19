/**
 * Defines syntax highlighting rules for the C# language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing utility methods and regexes.
 * @returns {object} - The language definition object for C# highlighting.
 */
function defineCSharpHighlighting(hljs) {
  // C# built-in types
  const BUILT_IN_TYPES = [
    "bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float", "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong", "uint", "ushort"
  ];

  // C# access modifiers and modifiers
  const MODIFIERS = [
    "public", "private", "protected", "static", "internal", "protected", "abstract", "async", "extern", "override", "unsafe", "virtual", "new", "sealed", "partial"
  ];

  // C# literals
  const LITERALS = ["default", "false", "null", "true"];

  // C# keywords
  const KEYWORDS = [
    "abstract", "as", "base", "break", "case", "class", "const", "continue", "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach", "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace", "new", "operator", "out", "override", "params", "private", "protected", "public", "readonly", "record", "ref", "return", "sealed", "sizeof", "stackalloc", "static", "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe", "using", "virtual", "void", "volatile", "while"
  ];

  // C# contextual keywords
  const CONTEXTUAL_KEYWORDS = [
    "add", "alias", "and", "ascending", "async", "await", "by", "descending", "equals", "from", "get", "global", "group", "init", "into", "join", "let", "nameof", "not", "notnull", "on", "or", "orderby", "partial", "remove", "select", "set", "unmanaged", "value|0", "var", "when", "where", "with", "yield"
  ];

  // Aggregate all keywords for highlighting
  const KEYWORD_DEFINITIONS = {
    keyword: KEYWORDS.concat(CONTEXTUAL_KEYWORDS),
    built_in: BUILT_IN_TYPES,
    literal: LITERALS
  };

  // Identifier (title) mode
  const IDENTIFIER_MODE = hljs.inherit(hljs.TITLE_MODE, {
    begin: "[a-zA-Z](\\.?\\w)*"
  });

  // Number highlighting variants
  const NUMBER_MODE = {
    className: "number",
    variants: [
      { begin: "\\b(0b[01']+)" },
      { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|UL|invokeHandlerWithArguments|createRefCountedMulticastOperator|ul|UL|f|F|b|createPropertyAccessor)" },
      { begin: "(-?)(\\b0[xX][a-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
    ],
    relevance: 0
  };

  // Verbatim string literal (@"...")
  const VERBATIM_STRING_MODE = {
    className: "string",
    begin: '@"',
    end: '"',
    contains: [
      { begin: '""' } // Escaped quote
    ]
  };

  // Regular string mode, illegal to have newlines
  const REGULAR_STRING_MODE = hljs.inherit(VERBATIM_STRING_MODE, {
    illegal: /\n/
  });

  // Interpolated string substitution: { ... }
  const INTERPOLATION_SUBST_MODE = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORD_DEFINITIONS
  };

  // Interpolated string substitution, illegal to have newlines
  const INTERPOLATION_SUBST_MODE_NO_NL = hljs.inherit(INTERPOLATION_SUBST_MODE, {
    illegal: /\n/
  });

  // Interpolated string ($"...")
  const INTERPOLATED_STRING_MODE = {
    className: "string",
    begin: /\$"/,
    end: '"',
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ }, // Escaped {
      { begin: /\}\}/ }, // Escaped }
      hljs.BACKSLASH_ESCAPE,
      INTERPOLATION_SUBST_MODE_NO_NL
    ]
  };

  // Interpolated verbatim string ($@"...")
  const INTERPOLATED_VERBATIM_STRING_MODE = {
    className: "string",
    begin: /\$@"/,
    end: '"',
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      INTERPOLATION_SUBST_MODE
    ]
  };

  // Interpolated verbatim string, illegal to have newlines
  const INTERPOLATED_VERBATIM_STRING_MODE_NO_NL = hljs.inherit(INTERPOLATED_VERBATIM_STRING_MODE, {
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      INTERPOLATION_SUBST_MODE_NO_NL
    ]
  });

  // Set up contains for interpolation substitution
  INTERPOLATION_SUBST_MODE.contains = [
    INTERPOLATED_VERBATIM_STRING_MODE,
    INTERPOLATED_STRING_MODE,
    VERBATIM_STRING_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBER_MODE,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  INTERPOLATION_SUBST_MODE_NO_NL.contains = [
    INTERPOLATED_VERBATIM_STRING_MODE_NO_NL,
    INTERPOLATED_STRING_MODE,
    REGULAR_STRING_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBER_MODE,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })
  ];

  // String variants for function params, etc.
  const STRING_VARIANTS = {
    variants: [
      INTERPOLATED_VERBATIM_STRING_MODE,
      INTERPOLATED_STRING_MODE,
      VERBATIM_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // Generic type parameter highlighting: <BugReportForm, UL>
  const GENERIC_TYPE_MODE = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out" },
      IDENTIFIER_MODE
    ]
  };

  // Type identifier with optional generic and array
  const TYPE_IDENTIFIER =
    hljs.IDENT_RE + "(<" + hljs.IDENT_RE + "(\\s*,\\s*" + hljs.IDENT_RE + ")*>)?(\\[\\])?";

  // Escaped identifier: @foo
  const ESCAPED_IDENTIFIER_MODE = {
    begin: "@" + hljs.IDENT_RE,
    relevance: 0
  };

  return {
    name: "C#",
    aliases: ["cs", "c#"],
    keywords: KEYWORD_DEFINITIONS,
    illegal: /::/,
    contains: [
      // XML documentation comments
      hljs.COMMENT("///", "$", {
        returnBegin: true,
        contains: [
          {
            className: "doctag",
            variants: [
              { begin: "///", relevance: 0 },
              { begin: "<!--|-->" },
              { begin: "</?", end: ">" }
            ]
          }
        ]
      }),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Preprocessor directives
      {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: {
          "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
        }
      },
      STRING_VARIANTS,
      NUMBER_MODE,
      // Class and interface definitions
      {
        beginKeywords: "class interface",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          IDENTIFIER_MODE,
          GENERIC_TYPE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      // Namespace definitions
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          IDENTIFIER_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      // Record definitions
      {
        beginKeywords: "record",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          IDENTIFIER_MODE,
          GENERIC_TYPE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      // Attributes: [Something]
      {
        className: "meta",
        begin: /^\s*\[/,
        excludeBegin: true,
        end: "\]",
        excludeEnd: true,
        contains: [
          {
            className: "meta-string",
            begin: /"/,
            end: /"/
          }
        ]
      },
      // Standalone keywords
      {
        beginKeywords: "new return throw await else",
        relevance: 0
      },
      // Function/method definitions
      {
        className: "function",
        begin: "(" + TYPE_IDENTIFIER + "\\s+)+" + hljs.IDENT_RE + "\\s*(<.+>\\s*)?\\(",
        returnBegin: true,
        end: /\\s*[{;=]/,
        excludeEnd: true,
        keywords: KEYWORD_DEFINITIONS,
        contains: [
          {
            beginKeywords: MODIFIERS.join(" "),
            relevance: 0
          },
          {
            begin: hljs.IDENT_RE + "\\s*(<.+>\\s*)?\\(",
            returnBegin: true,
            contains: [hljs.TITLE_MODE, GENERIC_TYPE_MODE],
            relevance: 0
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORD_DEFINITIONS,
            relevance: 0,
            contains: [STRING_VARIANTS, NUMBER_MODE, hljs.C_BLOCK_COMMENT_MODE]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      ESCAPED_IDENTIFIER_MODE
    ]
  };
}

module.exports = defineCSharpHighlighting;