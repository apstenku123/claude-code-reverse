/**
 * Returns the syntax highlighting definition for the Elixir programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility modes and regexes.
 * @returns {object} The Elixir language definition object for highlight.js.
 */
function elixirSyntaxHighlighterDefinition(hljs) {
  // Define Elixir keywords and identifier pattern
  const elixirKeywords = {
    $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
    keyword:
      "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote require import with|0"
  };

  // Interpolation inside strings: #{...}
  const interpolation = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: elixirKeywords
  };

  // Numeric literals: binary, octal, hex, decimal, floats
  const numberMode = {
    className: "number",
    begin:
      "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
    relevance: 0
  };

  // Characters that can start a sigil
  const sigilDelimiterPattern = `[/|([{<"']`;

  // Lowercase sigils (interpolated)
  const interpolatedSigil = {
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

  // Uppercase sigils (non-interpolated)
  const nonInterpolatedSigil = {
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

  // String modes (including heredocs and sigils)
  const stringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, interpolation],
    variants: [
      { begin: /"""/, end: /"""/ }, // triple double-quoted heredoc
      { begin: /'''/, end: /'''/ },   // triple single-quoted heredoc
      { begin: /~s"""/, end: /"""/, contains: [] },
      { begin: /~s"/, end: /"/, contains: [] },
      { begin: /~s'''/, end: /'''/, contains: [] },
      { begin: /~s'/, end: /'/, contains: [] },
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ }
    ]
  };

  // Function definition (def, defp, defmacro)
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

  // Module/class-like definitions (defimpl, defmodule, defprotocol, defrecord)
  const moduleDefinition = hljs.inherit(functionDefinition, {
    className: "class",
    beginKeywords: "defimpl defmodule defprotocol defrecord",
    end: /\bdo\b|$|;/
  });

  // Main list of language constructs to highlight
  const elixirContains = [
    stringMode,
    nonInterpolatedSigil,
    interpolatedSigil,
    hljs.HASH_COMMENT_MODE,
    moduleDefinition,
    functionDefinition,
    { begin: "::" },
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
    {
      className: "symbol",
      begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?:(?!:)",
      relevance: 0
    },
    numberMode,
    {
      className: "variable",
      begin: "(\\$\\W)|((\\$|@@?)(\\w+))"
    },
    { begin: "->" },
    {
      // Regex literal or %r[]
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

module.exports = elixirSyntaxHighlighterDefinition;