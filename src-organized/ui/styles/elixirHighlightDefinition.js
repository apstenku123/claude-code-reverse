/**
 * Generates a syntax highlighting definition for the Elixir programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common modes and utilities.
 * @returns {object} The syntax highlighting definition object for Elixir.
 */
function elixirHighlightDefinition(hljs) {
  /**
   * Elixir language keywords and identifier pattern.
   */
  const elixirKeywords = {
    $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
    keyword:
      "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote require import with|0"
  };

  /**
   * Substitution mode for string interpolation (#{ ... }).
   * This is used inside strings to highlight interpolated expressions.
   */
  const substitutionMode = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: elixirKeywords
  };

  /**
   * Number literal matching for integers, floats, binary, octal, and hex numbers.
   */
  const numberMode = {
    className: "number",
    begin:
      "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
    relevance: 0
  };

  // Delimiter characters for sigils
  const sigilDelimiters = "[/|([{<\"']";

  /**
   * Sigil string mode for lowercase sigils (e.g., ~r, ~createInteractionAccessor, ~c, etc.).
   * Handles interpolation and escape sequences.
   */
  const sigilLowercaseMode = {
    className: "string",
    begin: `~[a-z](?=[/|([{<\"'])`,
    contains: [
      {
        endsParent: true,
        contains: [
          {
            contains: [hljs.BACKSLASH_ESCAPE, substitutionMode],
            variants: [
              { begin: /\\"/, end: /\\"/ },
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
   * Sigil string mode for uppercase sigils (e.g., ~s, ~C, etc.).
   * No interpolation or escapes.
   */
  const sigilUppercaseMode = {
    className: "string",
    begin: `~[a-zA](?=[/|([{<\"'])`,
    contains: [
      { begin: /\\"/, end: /\\"/ },
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
   * Standard string mode for Elixir, including heredocs and sigil s variants.
   * Handles interpolation and escape sequences.
   */
  const stringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, substitutionMode],
    variants: [
      { begin: /"""/, end: /"""/ }, // Triple double-quoted heredoc
      { begin: /'''/, end: /'''/ },   // Triple single-quoted heredoc
      { begin: /~s"""/, end: /"""/, contains: [] },
      { begin: /~s"/, end: /"/, contains: [] },
      { begin: /~s'''/, end: /'''/, contains: [] },
      { begin: /~s'/, end: /'/, contains: [] },
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ }
    ]
  };

  /**
   * Function definition mode for def, defp, defmacro.
   * Highlights function names.
   */
  const functionMode = {
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
   * Class/module/protocol/record definition mode.
   * Highlights names of modules, protocols, etc.
   */
  const classMode = hljs.inherit(functionMode, {
    className: "class",
    beginKeywords: "defimpl defmodule defprotocol defrecord",
    end: /\bdo\b|$|;/
  });

  /**
   * The main list of modes for Elixir highlighting.
   */
  const elixirModes = [
    stringMode,
    sigilUppercaseMode,
    sigilLowercaseMode,
    hljs.HASH_COMMENT_MODE,
    classMode,
    functionMode,
    // Double colon operator
    { begin: "::" },
    // Symbol mode (e.g., :foo, :bar)
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
    // Symbol with trailing colon (e.g., foo:)
    {
      className: "symbol",
      begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?:(?!:)",
      relevance: 0
    },
    numberMode,
    // Variable mode (e.g., $foo, @@bar, @baz)
    {
      className: "variable",
      begin: "(\\$\\W)|((\\$|@@?)(\\w+))"
    },
    // Arrow operator
    { begin: "->" },
    // Regular expression mode
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
          contains: [hljs.BACKSLASH_ESCAPE, substitutionMode],
          variants: [
            { begin: "/", end: "/[a-z]*" },
            { begin: "%r\\[", end: "\\][a-z]*" }
          ]
        }
      ],
      relevance: 0
    }
  ];

  // Allow interpolation mode to recursively contain all Elixir modes
  substitutionMode.contains = elixirModes;

  return {
    name: "Elixir",
    keywords: elixirKeywords,
    contains: elixirModes
  };
}

module.exports = elixirHighlightDefinition;