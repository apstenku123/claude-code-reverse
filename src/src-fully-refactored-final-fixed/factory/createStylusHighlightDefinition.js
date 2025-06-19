/**
 * Generates a syntax highlighting definition for Stylus, suitable for use with highlight.js or similar libraries.
 *
 * @param {object} hljs - The highlight.js instance or a compatible object providing syntax modes.
 * @returns {object} The Stylus language definition object for syntax highlighting.
 */
function createStylusHighlightDefinition(hljs) {
  // Get common CSS highlight modes (important, hex color, attribute selector)
  const cssHighlightModes = getCssHighlightModes(hljs);

  // Stylus-specific keywords for @media queries
  const mediaQueryKeywords = "and or not only";

  // Variable pattern: $ followed by a valid identifier
  const variableMode = {
    className: "variable",
    begin: "\\$" + hljs.IDENT_RE
  };

  // Stylus at-rules (e.g., @import, @media, etc.)
  const stylusAtRules = [
    "charset", "css", "debug", "extend", "font-face", "for", "import", "include",
    "keyframes", "media", "mixin", "page", "warn", "while"
  ];

  // Lookahead for selector endings (space, newline, colon, comma, or parenthesis)
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
      // String and comment modes
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      cssHighlightModes.HEXCOLOR,
      // Class selectors (e.g., .my-class)
      {
        begin: "\\.[a-zA-Z][a-zA-Z0-9_-]*" + selectorEndLookahead,
        className: "selector-class"
      },
      // updateSnapshotAndNotify selectors (e.g., #my-id)
      {
        begin: "#[a-zA-Z][a-zA-Z0-9_-]*" + selectorEndLookahead,
        className: "selector-id"
      },
      // Tag selectors (e.g., div, span)
      {
        begin: "\\b(" + _i9.join("|") + ")" + selectorEndLookahead,
        className: "selector-tag"
      },
      // Pseudo-class selectors (e.g., :hover, :active)
      {
        className: "selector-pseudo",
        begin: "&?:(" + ki9.join("|") + ")" + selectorEndLookahead
      },
      // Pseudo-element selectors (e.g., ::before, ::after)
      {
        className: "selector-pseudo",
        begin: "&?::(" + yi9.join("|") + ")" + selectorEndLookahead
      },
      // Attribute selectors (e.g., [type="text"])
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      // @media queries
      {
        className: "keyword",
        begin: /@media/,
        starts: {
          end: /[{;}]/,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: mediaQueryKeywords,
            attribute: ji9.join(" ")
          },
          contains: [hljs.CSS_NUMBER_MODE]
        }
      },
      // Other Stylus at-rules (e.g., @import, @mixin, etc.)
      {
        className: "keyword",
        begin: "@((-(processSubLanguageHighlighting|moz|ms|webkit)-)?(" + stylusAtRules.join("|") + "))\\b"
      },
      // Variable mode
      variableMode,
      // CSS number mode
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
      // Attribute/property assignments (e.g., color: ...)
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

module.exports = createStylusHighlightDefinition;