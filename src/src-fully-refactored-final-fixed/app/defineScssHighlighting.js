/**
 * Defines the syntax highlighting configuration for SCSS language.
 *
 * @param {object} hljs - The highlight.js instance providing common modes and utilities.
 * @returns {object} SCSS language definition object for highlight.js
 */
function defineScssHighlighting(hljs) {
  // Get CSS-related highlighting modes (e.g., !important, hex color, attribute selectors)
  const cssHighlightModes = getCssHighlightModes(hljs);

  // List of pseudo-element selectors (e.g., 'before', 'after')
  const pseudoElementSelectors = Hi9;

  // List of pseudo-class selectors (e.g., 'hover', 'active')
  const pseudoClassSelectors = Ki9;

  // List of tag names for selector highlighting
  const tagNames = Ci9;

  // List of attribute names for property highlighting
  const attributeNames = zi9;

  // List of at-rule keywords (e.g., 'media', 'import')
  const atRuleKeywords = Vi9;

  // Regex for matching SCSS variables (e.g., $color-primary)
  const variableMode = {
    className: "variable",
    begin: "(\\$[a-zA-][a-zA-Z0-9_-]*)\\b"
  };

  return {
    name: "SCSS",
    case_insensitive: true,
    illegal: "[=/|']",
    contains: [
      // Single-line and block comments
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // updateSnapshotAndNotify selectors (e.g., #main)
      {
        className: "selector-id",
        begin: "#[a-zA-Z0-9_-]+",
        relevance: 0
      },
      // Class selectors (e.g., .container)
      {
        className: "selector-class",
        begin: "\\.[a-zA-Z0-9_-]+",
        relevance: 0
      },
      // Attribute selectors (e.g., [type="text"])
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      // Tag selectors (e.g., div, span)
      {
        className: "selector-tag",
        begin: `\\b(${tagNames.join("|")})\\b`,
        relevance: 0
      },
      // Pseudo-class selectors (e.g., :hover, :active)
      {
        className: "selector-pseudo",
        begin: `:(${pseudoClassSelectors.join("|")})`
      },
      // Pseudo-element selectors (e.g., ::before, ::after)
      {
        className: "selector-pseudo",
        begin: `::(${pseudoElementSelectors.join("|")})`
      },
      // SCSS variable
      variableMode,
      // Parentheses containing CSS numbers (e.g., rgb(255, 0, 0))
      {
        begin: /\(/,
        end: /\)/,
        contains: [hljs.CSS_NUMBER_MODE]
      },
      // CSS attribute/property names
      {
        className: "attribute",
        begin: `\\b(${attributeNames.join("|")})\\b`
      },
      // Common CSS values (e.g., 'block', 'inline', 'absolute', etc.)
      {
        begin: "\\b(whitespace|wait|processWithTransformedObservable-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|findAndProcessLastValidInteraction-resize|super|strict|static|square|solid|small-caps|separate|combineObservablesWithConfig-resize|scroll|createInteractionAccessor-resize|rtl|row-resize|ridge|right|repeat|repeat-mapArraysToObjectWithCallback|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|extractRelevantInteractionId-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
      },
      // CSS property value assignment (e.g., color: #fff;)
      {
        begin: ":",
        end: ";",
        contains: [
          variableMode,
          cssHighlightModes.HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          cssHighlightModes.IMPORTANT
        ]
      },
      // Special at-rules (e.g., @page, @font-face)
      {
        begin: "@(page|font-face)",
        lexemes: "@[a-z-]+",
        keywords: "@page @font-face"
      },
      // General at-rules (e.g., @media, @import, etc.)
      {
        begin: "@",
        end: "[{;]",
        returnBegin: true,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: "and or not only",
          attribute: atRuleKeywords.join(" ")
        },
        contains: [
          {
            begin: "@[a-z-]+",
            className: "keyword"
          },
          {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          },
          variableMode,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          cssHighlightModes.HEXCOLOR,
          hljs.CSS_NUMBER_MODE
        ]
      }
    ]
  };
}

module.exports = defineScssHighlighting;