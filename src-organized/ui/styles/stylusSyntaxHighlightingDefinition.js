/**
 * Returns a syntax highlighting definition object for Stylus language, suitable for use with syntax highlighters.
 *
 * @param {object} hljs - The highlight.js language definition object, providing common modes and regexes.
 * @returns {object} Syntax highlighting definition for Stylus.
 */
function stylusSyntaxHighlightingDefinition(hljs) {
  // Get CSS-specific highlight modes (e.g., !important, hex colors, attribute selectors)
  const cssHighlightModes = getCssHighlightModes(hljs);

  // Stylus logical operators for @media queries
  const mediaLogicalOperators = "and or not only";

  // Variable definition mode (e.g., $variable)
  const variableMode = {
    className: "variable",
    begin: "\\$" + hljs.IDENT_RE
  };

  // Stylus at-rules (e.g., @import, @media, etc.)
  const stylusAtRules = [
    "charset", "css", "debug", "extend", "font-face", "for", "import", "include", "keyframes", "media", "mixin", "page", "warn", "while"
  ];

  // Lookahead for selector endings
  const selectorEndLookahead = "(?=[.\\s\\n[:,(])";

  return {
    name: "Stylus",
    aliases: ["styl"],
    case_insensitive: false,
    keywords: "if else for in",
    // Illegal patterns to avoid false positives
    illegal: "(" + [
      "\\?",
      "(\\bReturn\\b)",
      "(\\bEnd\\b)",
      "(\\bend\\b)",
      "(\\bdef\\b)",
      ";",
      "#\\s",
      "\\*\\s",
      "===\\s",
      "\\|",
      "%"
    ].join("|") + ")",
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      cssHighlightModes.HEXCOLOR,
      // .class selectors
      {
        begin: "\\.[a-zA-Z][a-zA-Z0-9_-]*" + selectorEndLookahead,
        className: "selector-class"
      },
      // #id selectors
      {
        begin: "#[a-zA-Z][a-zA-Z0-9_-]*" + selectorEndLookahead,
        className: "selector-id"
      },
      // Tag selectors (from _i9)
      {
        begin: "\\b(" + _i9.join("|") + ")" + selectorEndLookahead,
        className: "selector-tag"
      },
      // Pseudo-class selectors (from ki9)
      {
        className: "selector-pseudo",
        begin: "&?:(" + ki9.join("|") + ")" + selectorEndLookahead
      },
      // Pseudo-element selectors (from yi9)
      {
        className: "selector-pseudo",
        begin: "&?::(" + yi9.join("|") + ")" + selectorEndLookahead
      },
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      // @media queries with nested keywords and attributes
      {
        className: "keyword",
        begin: /@media/,
        starts: {
          end: /[{;}]/,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: mediaLogicalOperators,
            attribute: ji9.join(" ")
          },
          contains: [hljs.CSS_NUMBER_MODE]
        }
      },
      // Other at-rules (e.g., @import, @keyframes, etc.)
      {
        className: "keyword",
        begin: "@((-(processSubLanguageHighlighting|moz|ms|webkit)-)?(" + stylusAtRules.join("|") + "))\\b"
      },
      variableMode,
      hljs.CSS_NUMBER_MODE,
      // Function definitions (e.g., myFunction(...))
      {
        className: "function",
        begin: "^[a-zA-Z][a-zA-Z0-9_-]*\\(.*\\)",
        illegal: "[\\n]",
        returnBegin: true,
        contains: [
          {
            className: "title",
            begin: "\\b[a-zA-Z][a-zA-Z0-9_-]*"
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            contains: [
              cssHighlightModes.HEXCOLOR,
              variableMode,
              hljs.APOS_STRING_MODE,
              hljs.CSS_NUMBER_MODE,
              hljs.QUOTE_STRING_MODE
            ]
          }
        ]
      },
      // Attribute assignments (from xi9)
      {
        className: "attribute",
        begin: "\\b(" + xi9.join("|") + ")\\b",
        starts: {
          end: /;|$/,
          contains: [
            cssHighlightModes.HEXCOLOR,
            variableMode,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.CSS_NUMBER_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            cssHighlightModes.IMPORTANT
          ],
          illegal: /\./,
          relevance: 0
        }
      }
    ]
  };
}

module.exports = stylusSyntaxHighlightingDefinition;