/**
 * Returns a syntax highlighting definition object for Stylus language for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js instance, providing common modes and regexes.
 * @returns {object} Stylus language definition for highlight.js.
 */
function stylusHighlightDefinitionFactory(hljs) {
  // Get CSS-specific highlight modes (e.g., !important, hex colors, attribute selectors)
  const cssHighlightModes = getCssHighlightModes(hljs);

  // Stylus-specific logical operators for @media queries
  const mediaQueryLogicalOperators = "and or not only";

  // Variable definition: $variableName
  const stylusVariableMode = {
    className: "variable",
    begin: "\\$" + hljs.IDENT_RE
  };

  // Stylus at-rules (directives)
  const stylusAtRules = [
    "charset", "css", "debug", "extend", "font-face", "for", "import", "include", "keyframes",
    "media", "mixin", "page", "warn", "while"
  ];

  // Regex lookahead for selector endings
  const selectorEndLookahead = "(?=[.\\s\\n[:,(])";

  return {
    name: "Stylus",
    aliases: ["styl"],
    case_insensitive: false,
    keywords: "if else for in",
    // Illegal patterns for Stylus (to avoid false positives)
    illegal: "(" + [
      "\\?", "(\\bReturn\\b)", "(\\bEnd\\b)", "(\\bend\\b)", "(\\bdef\\b)", ";", "#\\s", "\\*\\s", "===\\s", "\\|", "%"
    ].join("|") + ")",
    contains: [
      // String modes
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      // Comment modes
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Hex color mode
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
      // :pseudo-class selectors (from ki9)
      {
        className: "selector-pseudo",
        begin: "&?:(" + ki9.join("|") + ")" + selectorEndLookahead
      },
      // ::pseudo-element selectors (from yi9)
      {
        className: "selector-pseudo",
        begin: "&?::(" + yi9.join("|") + ")" + selectorEndLookahead
      },
      // Attribute selector mode
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      // @media queries with logical operators and attributes
      {
        className: "keyword",
        begin: /@media/,
        starts: {
          end: /[{;}]/,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: mediaQueryLogicalOperators,
            attribute: ji9.join(" ")
          },
          contains: [hljs.CSS_NUMBER_MODE]
        }
      },
      // Other at-rules (e.g., @import, @mixin, etc.)
      {
        className: "keyword",
        begin: "@((-(processSubLanguageHighlighting|moz|ms|webkit)-)?(" + stylusAtRules.join("|") + "))\\b"
      },
      // Variable mode
      stylusVariableMode,
      // Numbers (with units)
      hljs.CSS_NUMBER_MODE,
      // Function definitions (e.g., myFunc(param1, param2))
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
              stylusVariableMode,
              hljs.APOS_STRING_MODE,
              hljs.CSS_NUMBER_MODE,
              hljs.QUOTE_STRING_MODE
            ]
          }
        ]
      },
      // Attribute/property assignments (from xi9)
      {
        className: "attribute",
        begin: "\\b(" + xi9.join("|") + ")\\b",
        starts: {
          end: /;|$/,
          contains: [
            cssHighlightModes.HEXCOLOR,
            stylusVariableMode,
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

module.exports = stylusHighlightDefinitionFactory;