/**
 * Returns a syntax highlighting definition object for SCSS, suitable for use with a syntax highlighter.
 *
 * @param {object} hljs - The highlight.js core object, providing common modes and utilities.
 * @returns {object} SCSS highlighting definition object.
 */
function getScssHighlightingDefinition(hljs) {
  // Retrieve CSS-specific highlight modes (e.g., !important, hex colors, attribute selectors)
  const cssHighlightModes = getCssHighlightModes(hljs);

  // List of pseudo-element selectors (e.g., 'before', 'after')
  const pseudoElementSelectors = Hi9;

  // List of pseudo-class selectors (e.g., 'hover', 'active')
  const pseudoClassSelectors = Ki9;

  // Pattern for SCSS at-rules (e.g., @media, @import)
  const atRulePattern = "@[a-z-]+";

  // List of at-rule keywords
  const atRuleKeywords = "and or not only";

  // Pattern for attribute names (e.g., 'color', 'background-color')
  const attributeNamePattern = "[a-zA-][a-zA-Z0-9_-]*";

  // Variable mode for SCSS variables (e.g., $primary-color)
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

      // updateSnapshotAndNotify selectors (e.g., #header)
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
        begin: `\\b(${Ci9.join("|")})\\b`,
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
      // Parentheses containing numbers (e.g., rgba(255, 0, 0, 0.5))
      {
        begin: /\(/,
        end: /\)/,
        contains: [hljs.CSS_NUMBER_MODE]
      },
      // CSS attributes (e.g., color, margin)
      {
        className: "attribute",
        begin: `\\b(${zi9.join("|")})\\b`
      },
      // Common CSS values (e.g., block, inline, none, etc.)
      {
        begin: "\\b(whitespace|wait|processWithTransformedObservable-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|findAndProcessLastValidInteraction-resize|super|strict|static|square|solid|small-caps|separate|combineObservablesWithConfig-resize|scroll|createInteractionAccessor-resize|rtl|row-resize|ridge|right|repeat|repeat-mapArraysToObjectWithCallback|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|extractRelevantInteractionId-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
      },
      // Property-value pairs (e.g., color: #fff;)
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
      // At-rules with specific keywords (e.g., @page, @font-face)
      {
        begin: "@(page|font-face)",
        lexemes: atRulePattern,
        keywords: "@page @font-face"
      },
      // General at-rule handling (e.g., @media, @import)
      {
        begin: "@",
        end: "[{;]",
        returnBegin: true,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: atRuleKeywords,
          attribute: Vi9.join(" ")
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

module.exports = getScssHighlightingDefinition;