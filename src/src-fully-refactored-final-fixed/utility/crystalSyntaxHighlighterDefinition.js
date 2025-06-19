/**
 * Returns a syntax highlighting definition object for the Crystal programming language.
 *
 * @param {object} hljs - The highlight.js core object, providing language utilities and modes.
 * @returns {object} The Crystal language definition for highlight.js, including keywords, patterns, and parsing rules.
 */
function crystalSyntaxHighlighterDefinition(hljs) {
  /**
   * Crystal language keywords and literals.
   */
  const CRYSTAL_KEYWORDS = {
    $pattern: "[a-zA-Z_]\\w*[!?=]?",
    keyword:
      "abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__",
    literal: "false nil true"
  };

  /**
   * Substitution/interpolation inside strings: #{...}
   */
  const SUBSTITUTION = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: CRYSTAL_KEYWORDS
  };

  /**
   * Template variables for embedded expressions, e.g., {{ ... }} or {% ... %}
   */
  const TEMPLATE_VARIABLE = {
    className: "template-variable",
    variants: [
      {
        begin: "\\{\\{",
        end: "\\}\\}"
      },
      {
        begin: "\\{%",
        end: "%\\}"
      }
    ],
    keywords: CRYSTAL_KEYWORDS
  };

  /**
   * Helper to create a contains array for nested delimiters (e.g., %deepCloneWithCycleDetection(...))
   * @param {RegExp|string} beginDelimiter
   * @param {RegExp|string} endDelimiter
   * @returns {Array} Contains array for nested delimiters
   */
  function nestedDelimiterContains(beginDelimiter, endDelimiter) {
    const containsArr = [
      {
        begin: beginDelimiter,
        end: endDelimiter
      }
    ];
    // Self-reference for recursive nesting
    containsArr[0].contains = containsArr;
    return containsArr;
  }

  /**
   * Crystal string literal variants, including interpolation and heredocs.
   */
  const CRYSTAL_STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, SUBSTITUTION],
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /`/,
        end: /`/
      },
      {
        // %deepCloneWithCycleDetection(...) and similar
        begin: "%[Qwi]?\\(",
        end: "\\)",
        contains: nestedDelimiterContains("\\(", "\\)")
      },
      {
        begin: "%[Qwi]?\\[",
        end: "\\]",
        contains: nestedDelimiterContains("\\[", "\\]")
      },
      {
        begin: "%[Qwi]?\\{",
        end: /\}/,
        contains: nestedDelimiterContains(/\{/, /\}/)
      },
      {
        begin: "%[Qwi]?<",
        end: ">",
        contains: nestedDelimiterContains("<", ">")
      },
      {
        begin: "%[Qwi]?\\|",
        end: "\\|"
      },
      {
        // Heredoc
        begin: /<<-\w+$/,
        end: /^\s*\w+$/
      }
    ],
    relevance: 0
  };

  /**
   * Non-interpolated string literal variants (%q, heredoc with single quotes).
   */
  const CRYSTAL_STRING_NO_INTERP = {
    className: "string",
    variants: [
      {
        begin: "%q\\(",
        end: "\\)",
        contains: nestedDelimiterContains("\\(", "\\)")
      },
      {
        begin: "%q\\[",
        end: "\\]",
        contains: nestedDelimiterContains("\\[", "\\]")
      },
      {
        begin: "%q\\{",
        end: /\}/,
        contains: nestedDelimiterContains(/\{/, /\}/)
      },
      {
        begin: "%q<",
        end: ">",
        contains: nestedDelimiterContains("<", ">")
      },
      {
        begin: "%q\\|",
        end: "\\|"
      },
      {
        // Heredoc (single quoted)
        begin: /<<-'\w+'$/,
        end: /^\s*\w+$/
      }
    ],
    relevance: 0
  };

  /**
   * Regular expression literal, only allowed after certain keywords or at line start.
   */
  const CRYSTAL_REGEXP_AFTER_KEYWORD = {
    begin:
      "(?!%\\})(" +
      hljs.RE_STARTERS_RE +
      "|\\n|\\b(case|if|select|unless|until|when|while)\\b)\\s*",
    keywords: "case if select unless until when while",
    contains: [
      {
        className: "regexp",
        contains: [hljs.BACKSLASH_ESCAPE, SUBSTITUTION],
        variants: [
          {
            begin: "//[a-z]*",
            relevance: 0
          },
          {
            begin: "/(?!\/)",
            end: "/[a-z]*"
          }
        ]
      }
    ],
    relevance: 0
  };

  /**
   * Regular expression literal variants: %r(...), etc.
   */
  const CRYSTAL_REGEXP = {
    className: "regexp",
    contains: [hljs.BACKSLASH_ESCAPE, SUBSTITUTION],
    variants: [
      {
        begin: "%r\\(",
        end: "\\)",
        contains: nestedDelimiterContains("\\(", "\\)")
      },
      {
        begin: "%r\\[",
        end: "\\]",
        contains: nestedDelimiterContains("\\[", "\\]")
      },
      {
        begin: "%r\\{",
        end: /\}/,
        contains: nestedDelimiterContains(/\{/, /\}/)
      },
      {
        begin: "%r<",
        end: ">",
        contains: nestedDelimiterContains("<", ">")
      },
      {
        begin: "%r\\|",
        end: "\\|"
      }
    ],
    relevance: 0
  };

  /**
   * Crystal annotation meta block: @[ ... ]
   */
  const CRYSTAL_ANNOTATION_META = {
    className: "meta",
    begin: "@\\[",
    end: "\\]",
    contains: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        className: "meta-string"
      })
    ]
  };

  /**
   * All top-level contains for the Crystal language definition.
   */
  const CRYSTAL_CONTAINS = [
    TEMPLATE_VARIABLE, // Embedded template variables
    CRYSTAL_STRING,    // Interpolated strings
    CRYSTAL_STRING_NO_INTERP, // Non-interpolated strings
    CRYSTAL_REGEXP,    // Regex literals
    CRYSTAL_REGEXP_AFTER_KEYWORD, // Regex after keywords
    CRYSTAL_ANNOTATION_META, // Annotation meta
    hljs.HASH_COMMENT_MODE, // Comments
    // Class/module/struct definitions
    {
      className: "class",
      beginKeywords: "class module struct",
      end: "$|;",
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {
          begin: "[a-z_]\\w*(::\\w+)*(\\?|!)?"
        }),
        {
          begin: "<"
        }
      ]
    },
    // Lib/enum/union definitions
    {
      className: "class",
      beginKeywords: "lib enum union",
      end: "$|;",
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {
          begin: "[a-z_]\\w*(::\\w+)*(\\?|!)?"
        })
      ]
    },
    // Annotation definitions
    {
      beginKeywords: "annotation",
      end: "$|;",
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {
          begin: "[a-z_]\\w*(::\\w+)*(\\?|!)?"
        })
      ],
      relevance: 2
    },
    // Function definitions (def)
    {
      className: "function",
      beginKeywords: "def",
      end: /\b\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin:
            "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",
          endsParent: true
        })
      ]
    },
    // Function definitions (fun, macro)
    {
      className: "function",
      beginKeywords: "fun macro",
      end: /\b\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin:
            "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",
          endsParent: true
        })
      ],
      relevance: 2
    },
    // Symbols with trailing ! or ?
    {
      className: "symbol",
      begin: hljs.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
      relevance: 0
    },
    // Symbols
    {
      className: "symbol",
      begin: ":",
      contains: [
        CRYSTAL_STRING,
        {
          begin:
            "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?"
        }
      ],
      relevance: 0
    },
    // Number literals
    {
      className: "number",
      variants: [
        {
          begin: "\\b0b([01_]+)(_?[ui](8|16|32|64|128))?"
        },
        {
          begin: "\\b0o([0-7_]+)(_?[ui](8|16|32|64|128))?"
        },
        {
          begin: "\\b0x([a-f0-9_]+)(_?[ui](8|16|32|64|128))?"
        },
        {
          begin:
            "\\b([1-9][0-9_]*[0-9]|[0-9])(\\.[0-9][0-9_]*)?([eE]_?[-+]?[0-9_]*)?(_?f(32|64))?(?!_)"
        },
        {
          begin: "\\b([1-9][0-9_]*|0)(_?[ui](8|16|32|64|128))?"
        }
      ],
      relevance: 0
    }
  ];

  // Allow interpolation inside substitution, but not recursively inside itself
  SUBSTITUTION.contains = CRYSTAL_CONTAINS;
  // Template variables do not allow themselves recursively
  TEMPLATE_VARIABLE.contains = CRYSTAL_CONTAINS.slice(1);

  return {
    name: "Crystal",
    aliases: ["cr"],
    keywords: CRYSTAL_KEYWORDS,
    contains: CRYSTAL_CONTAINS
  };
}

module.exports = crystalSyntaxHighlighterDefinition;
