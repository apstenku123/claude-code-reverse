/**
 * Defines the syntax highlighting rules for the Elixir programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility modes and regexes.
 * @returns {object} Highlight.js language definition object for Elixir.
 */
function defineElixirHighlighting(hljs) {
  /**
   * Elixir keywords and identifier pattern.
   */
  const elixirKeywords = {
    $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
    keyword:
      "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote require import with|0"
  };

  /**
   * Interpolation inside strings: #{ ... }
   */
  const interpolation = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: elixirKeywords
  };

  /**
   * Number literal patterns (decimal, binary, octal, hex, float).
   */
  const numberMode = {
    className: "number",
    begin:
      "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
    relevance: 0
  };

  // Used for sigil delimiters
  const sigilDelimiterPattern = `[/|([{<"']`;

  /**
   * Sigil strings with lowercase identifier (interpolated, e.g. ~r/regex/).
   */
  const sigilLowercase = {
    className: "string",
    begin: `~[a-z](?=[/|([{<"'])`,
    contains: [
      {
        endsParent: true,
        contains: [
          {
            contains: [hljs.BACKSLASH_ESCAPE, interpolation],
            variants: [
              { begin: /"/, end: /"/ },
              { begin: /'/, end: /'/ },
              { begin: /\//, end: /\// },
              { begin: /\|/, end: /\|/ },
              { begin: /\(/, end: /\)/ },
              { begin: /\[/, end: /\]/ },
              { begin: /\{/, end: /\}/ },
              { begin: /</, end: />/ }
            ]
          }
        ]
      }
    ]
  };

  /**
   * Sigil strings with uppercase identifier (non-interpolated, e.g. ~s/regex/).
   */
  const sigilUppercase = {
    className: "string",
    begin: `~[a-zA](?=[/|([{<"'])`,
    contains: [
      { begin: /"/, end: /"/ },
      { begin: /'/, end: /'/ },
      { begin: /\//, end: /\// },
      { begin: /\|/, end: /\|/ },
      { begin: /\(/, end: /\)/ },
      { begin: /\[/, end: /\]/ },
      { begin: /\{/, end: /\}/ },
      { begin: /</, end: />/ }
    ]
  };

  /**
   * Standard and triple-quoted strings, including sigil variants.
   */
  const stringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, interpolation],
    variants: [
      { begin: /"""/, end: /"""/ },
      { begin: /'''/, end: /'''/ },
      { begin: /~s"""/, end: /"""/, contains: [] },
      { begin: /~s"/, end: /"/, contains: [] },
      { begin: /~s'''/, end: /'''/, contains: [] },
      { begin: /~s'/, end: /'/, contains: [] },
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ }
    ]
  };

  /**
   * Function definition (def, defp, defmacro).
   */
  const functionDefinition = {
    className: "function",
    beginKeywords: "def defp defmacro",
    end: /\b\b/,
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
        endsParent: true
      })
    ]
  };

  /**
   * Class/module/protocol/record definition (defimpl, defmodule, defprotocol, defrecord).
   */
  const classDefinition = hljs.inherit(functionDefinition, {
    className: "class",
    beginKeywords: "defimpl defmodule defprotocol defrecord",
    end: /\bdo\b|$|;/
  });

  /**
   * Main list of language constructs to highlight.
   */
  const elixirContains = [
    stringMode,
    sigilUppercase,
    sigilLowercase,
    hljs.HASH_COMMENT_MODE,
    classDefinition,
    functionDefinition,
    // Type operator
    { begin: "::" },
    // Symbol (e.g. :foo)
    {
      className: "symbol",
      begin: ":(?![\\s:])",
      contains: [
        stringMode,
        {
          begin:
            "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
        }
      ],
      relevance: 0
    },
    // Symbol with trailing colon (e.g. foo:)
    {
      className: "symbol",
      begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?:(?!:)",
      relevance: 0
    },
    numberMode,
    // Variable (e.g. $var, @@var, @var)
    {
      className: "variable",
      begin: "(\\$\\W)|((\\$|@@?)(\\w+))"
    },
    // Arrow operator
    { begin: "->" },
    // Regex literal or %r[]
    {
      begin: "(" + hljs.RE_STARTERS_RE + ")\\s*",
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          begin: /\/: (?=\d+\s*[,\]])/,
          relevance: 0,
          contains: [numberMode]
        },
        {
          className: "regexp",
          illegal: "\\n",
          contains: [hljs.BACKSLASH_ESCAPE, interpolation],
          variants: [
            { begin: "/", end: "/[a-z]*" },
            { begin: "%r\\[", end: "\\][a-z]*" }
          ]
        }
      ],
      relevance: 0
    }
  ];

  // Allow interpolation to contain all main language constructs
  interpolation.contains = elixirContains;

  return {
    name: "Elixir",
    keywords: elixirKeywords,
    contains: elixirContains
  };
}

module.exports = defineElixirHighlighting;