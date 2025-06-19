/**
 * Defines the syntax highlighting configuration for the Ruby language.
 *
 * @param {object} hljs - The highlight.js core object, providing helpers for defining language rules.
 * @returns {object} The Ruby language definition object for highlight.js.
 */
function defineRubyHighlighting(hljs) {
  // Define Ruby keywords, built-ins, and literals
  const RUBY_KEYWORDS = {
    keyword:
      "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
    built_in: "proc lambda",
    literal: "true false nil"
  };

  // Ruby documentation tags (e.g., @param)
  const DOC_TAG = {
    className: "doctag",
    begin: "@[A-Za-z_]+"
  };

  // Ruby object reference (e.g., #<Object:0x00007f9c8b0b8a80>)
  const OBJECT_REFERENCE = {
    begin: "#<",
    end: ">"
  };

  // Ruby comments (single-line, block, and __END__)
  const COMMENT_MODES = [
    hljs.COMMENT("#", "$", {
      contains: [DOC_TAG]
    }),
    hljs.COMMENT("^=begin", "^=end", {
      contains: [DOC_TAG],
      relevance: 10
    }),
    hljs.COMMENT("^__END__", "\n")
  ];

  // Ruby string interpolation (#{ ... })
  const STRING_SUBSTITUTION = {
    className: "subst",
    begin: /#\{/, // Start of interpolation
    end: /\}/,   // End of interpolation
    keywords: RUBY_KEYWORDS
  };

  // Ruby string modes (single, double, backtick, percent, heredoc, character, etc.)
  const STRING_MODES = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, STRING_SUBSTITUTION],
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /`/, end: /`/ },
      { begin: /%[qQwWx]?\(/, end: /\)/ },
      { begin: /%[qQwWx]?\[/, end: /\]/ },
      { begin: /%[qQwWx]?\{/, end: /\}/ },
      { begin: /%[qQwWx]?</, end: />/ },
      { begin: /%[qQwWx]?\//, end: /\// },
      { begin: /%[qQwWx]?%/, end: /%/ },
      { begin: /%[qQwWx]?-/, end: /-/ },
      { begin: /%[qQwWx]?\|/, end: /\|/ },
      // Ruby character literals (e.g., ?a, ?\n, ?\xFF, etc.)
      { begin: /\?(\\\d{1,3})/ },
      { begin: /\?\\x[0-9A-Fa-f]{1,2}/ },
      { begin: /\?\\u\{?[0-9A-Fa-f]{1,6}\}?/ },
      { begin: /\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/ },
      { begin: /\?\\(c|C-)[\x20-\x7e]/ },
      { begin: /\?\\?./ },
      // Heredoc (e.g., <<EOF ... EOF)
      {
        begin: /<<[-~]?'?(\w+)\n(?:[^\n]*\n)*?\s*\1\b/,
        returnBegin: true,
        contains: [
          { begin: /<<[-~]?'?/ },
          hljs.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/,
            contains: [hljs.BACKSLASH_ESCAPE, STRING_SUBSTITUTION]
          })
        ]
      }
    ]
  };

  // Ruby number patterns
  const DECIMAL_INTEGER = "[1-9](_?[0-9])*|0";
  const DECIMAL_FRACTION = "[0-9](_?[0-9])*";

  // Ruby number modes (decimal, binary, octal, hex, rational, imaginary)
  const NUMBER_MODES = {
    className: "number",
    relevance: 0,
    variants: [
      {
        begin:
          "\\b([1-9](_?[0-9])*|0)(\\.([0-9](_?[0-9])*))?([eE][+-]?([0-9](_?[0-9])*))?r?i?\\b"
      },
      { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" },
      { begin: "\\b0(_?[0-7])+r?i?\\b" }
    ]
  };

  // Ruby method/function parameters (parentheses)
  const FUNCTION_PARAMS = {
    className: "params",
    begin: "\\(",
    end: "\\)",
    endsParent: true,
    keywords: RUBY_KEYWORDS
  };

  // Main Ruby language constructs (strings, classes, functions, symbols, regexps, variables, etc.)
  const RUBY_CONSTRUCTS = [
    STRING_MODES,
    // Class/module definitions
    {
      className: "class",
      beginKeywords: "class module",
      end: "$|;",
      illegal: /=/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
        }),
        {
          begin: "<\\s*",
          contains: [
            {
              begin: `(${hljs.IDENT_RE}::)?${hljs.IDENT_RE}`,
              relevance: 0
            }
          ]
        },
        ...COMMENT_MODES
      ]
    },
    // Function/method definitions
    {
      className: "function",
      begin: /def\s+([a-zA-Z_]\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\*\*|[-\/+%^&*~`|]|\[\]=?)\s*(\(|;|$)/,
      relevance: 0,
      keywords: "def",
      end: "$|;",
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin:
            "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
        }),
        FUNCTION_PARAMS,
        ...COMMENT_MODES
      ]
    },
    // Namespaced constants (e.g., Foo::Bar)
    {
      begin: hljs.IDENT_RE + "::"
    },
    // Symbols (e.g., :symbol, foo:)
    {
      className: "symbol",
      begin: hljs.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
      relevance: 0
    },
    {
      className: "symbol",
      begin: ":(?!\\s)",
      contains: [
        STRING_MODES,
        {
          begin:
            "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
        }
      ],
      relevance: 0
    },
    NUMBER_MODES,
    // Ruby variables ($global, @@class, @instance)
    {
      className: "variable",
      begin:
        "(\\$\\W)|((\\$|@@?)(\\w+)(?=[^@$?])(?![A-Za-z_])(?![@$?'])"
    },
    // Block parameters (|param|)
    {
      className: "params",
      begin: /\|/,
      end: /\|/,
      relevance: 0,
      keywords: RUBY_KEYWORDS
    },
    // Regular expressions (after certain keywords or unless)
    {
      begin: `(${hljs.RE_STARTERS_RE}|unless)\\s*`,
      keywords: "unless",
      contains: [
        {
          className: "regexp",
          contains: [hljs.BACKSLASH_ESCAPE, STRING_SUBSTITUTION],
          illegal: /\n/,
          variants: [
            { begin: "/", end: "/[a-z]*" },
            { begin: /%r\{/, end: /\}[a-z]*/ },
            { begin: "%r\\(", end: "\\)[a-z]*" },
            { begin: "%r!", end: "![a-z]*" },
            { begin: "%r\\[", end: "\\][a-z]*" }
          ]
        },
        OBJECT_REFERENCE,
        ...COMMENT_MODES
      ],
      relevance: 0
    },
    OBJECT_REFERENCE,
    ...COMMENT_MODES
  ];

  // Allow string interpolation and function params to contain Ruby constructs
  STRING_SUBSTITUTION.contains = RUBY_CONSTRUCTS;
  FUNCTION_PARAMS.contains = RUBY_CONSTRUCTS;

  // Ruby IRB prompt patterns
  const IRB_PROMPT_SIMPLE = "[>?]>";
  const IRB_PROMPT_DETAILED = "[\\w#]+\\(\\w+\\):\\d+:\\d+>";
  const IRB_PROMPT_VERSION = "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>";

  // Ruby IRB prompt meta rules
  const IRB_PROMPT_MODES = [
    {
      begin: /^\s*=>/,
      starts: {
        end: "$",
        contains: RUBY_CONSTRUCTS
      }
    },
    {
      className: "meta",
      begin: `^(${IRB_PROMPT_SIMPLE}|${IRB_PROMPT_DETAILED}|${IRB_PROMPT_VERSION})(?=[ ])`,
      starts: {
        end: "$",
        contains: RUBY_CONSTRUCTS
      }
    }
  ];

  // Insert object reference mode at the start of comments for proper parsing
  COMMENT_MODES.unshift(OBJECT_REFERENCE);

  // Return the full Ruby language definition for highlight.js
  return {
    name: "Ruby",
    aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
    keywords: RUBY_KEYWORDS,
    illegal: /\/\*/,
    contains: [hljs.SHEBANG({ binary: "ruby" })]
      .concat(IRB_PROMPT_MODES)
      .concat(COMMENT_MODES)
      .concat(RUBY_CONSTRUCTS)
  };
}

module.exports = defineRubyHighlighting;