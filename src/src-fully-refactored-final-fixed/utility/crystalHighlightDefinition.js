/**
 * Returns the syntax highlighting definition for the Crystal programming language for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility regexes and modes.
 * @returns {object} The language definition object for Crystal highlighting.
 */
function crystalHighlightDefinition(hljs) {
  /**
   * Crystal language keywords and literals
   */
  const CRYSTAL_KEYWORDS = {
    $pattern: "[a-zA-Z_]\\w*[!?=]?",
    keyword:
      "abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__",
    literal: "false nil true"
  };

  /**
   * Interpolated expression inside strings: #{ ... }
   */
  const INTERPOLATION = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: CRYSTAL_KEYWORDS
  };

  /**
   * Template variables for embedded expressions: {{ ... }} and {% ... %}
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
   * Helper to generate a bracketed region for strings/regexps
   * @param {string|RegExp} begin - The opening delimiter
   * @param {string|RegExp} end - The closing delimiter
   * @returns {Array} Array containing a single mode with recursive contains
   */
  function bracketedRegion(begin, end) {
    const region = [{ begin, end }];
    // Allow nesting of the same region
    region[0].contains = region;
    return region;
  }

  /**
   * Crystal string literal modes (double, single, backtick, percent, heredoc)
   */
  const CRYSTAL_STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION],
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
        begin: "%[Qwi]?\\(",
        end: "\\)",
        contains: bracketedRegion("\\(", "\\)")
      },
      {
        begin: "%[Qwi]?\\[",
        end: "\\]",
        contains: bracketedRegion("\\[", "\\]")
      },
      {
        begin: "%[Qwi]?\\{",
        end: /\}/,
        contains: bracketedRegion(/\{/, /\}/)
      },
      {
        begin: "%[Qwi]?<",
        end: ">",
        contains: bracketedRegion("<", ">")
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
   * Crystal single-quoted percent strings
   */
  const CRYSTAL_SINGLE_QUOTED_STRING = {
    className: "string",
    variants: [
      {
        begin: "%q\\(",
        end: "\\)",
        contains: bracketedRegion("\\(", "\\)")
      },
      {
        begin: "%q\\[",
        end: "\\]",
        contains: bracketedRegion("\\[", "\\]")
      },
      {
        begin: "%q\\{",
        end: /\}/,
        contains: bracketedRegion(/\{/, /\}/)
      },
      {
        begin: "%q<",
        end: ">",
        contains: bracketedRegion("<", ">")
      },
      {
        begin: "%q\\|",
        end: "\\|"
      },
      {
        // Heredoc single-quoted
        begin: /<<-'\w+'$/,
        end: /^\s*\w+$/
      }
    ],
    relevance: 0
  };

  /**
   * Crystal regexp literal after certain keywords or at line start
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
        contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION],
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
   * Crystal regexp literal with percent notation
   */
  const CRYSTAL_REGEXP = {
    className: "regexp",
    contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION],
    variants: [
      {
        begin: "%r\\(",
        end: "\\)",
        contains: bracketedRegion("\\(", "\\)")
      },
      {
        begin: "%r\\[",
        end: "\\]",
        contains: bracketedRegion("\\[", "\\]")
      },
      {
        begin: "%r\\{",
        end: /\}/,
        contains: bracketedRegion(/\{/, /\}/)
      },
      {
        begin: "%r<",
        end: ">",
        contains: bracketedRegion("<", ">")
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
   * The main list of modes for Crystal highlighting
   */
  const CRYSTAL_CONTAINS = [
    TEMPLATE_VARIABLE,
    CRYSTAL_STRING,
    CRYSTAL_SINGLE_QUOTED_STRING,
    CRYSTAL_REGEXP,
    CRYSTAL_REGEXP_AFTER_KEYWORD,
    CRYSTAL_ANNOTATION_META,
    hljs.HASH_COMMENT_MODE,
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
    // Annotation definition
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
    // Symbol with trailing colon
    {
      className: "symbol",
      begin: hljs.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
      relevance: 0
    },
    // Symbol with leading colon
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
    // Numbers
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

  // Allow interpolation to contain all language constructs
  INTERPOLATION.contains = CRYSTAL_CONTAINS;
  // Template variables do not allow themselves recursively
  TEMPLATE_VARIABLE.contains = CRYSTAL_CONTAINS.slice(1);

  return {
    name: "Crystal",
    aliases: ["cr"],
    keywords: CRYSTAL_KEYWORDS,
    contains: CRYSTAL_CONTAINS
  };
}

module.exports = crystalHighlightDefinition;
