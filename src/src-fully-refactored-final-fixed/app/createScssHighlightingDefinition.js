/**
 * Generates a syntax highlighting definition object for SCSS, suitable for use with a highlighting engine.
 * This function defines SCSS-specific rules, selectors, keywords, and embedded CSS constructs.
 *
 * @param {object} hljs - The highlight.js core object, providing common modes and utilities.
 * @returns {object} SCSS highlighting definition object.
 */
function createScssHighlightingDefinition(hljs) {
  // Get CSS-specific highlighting modes (e.g., !important, hex color, attribute selectors)
  const cssHighlightingModes = getCssHighlightingModes(hljs);

  // List of pseudo-elements for double-colon syntax
  const pseudoElements = Hi9;
  // List of pseudo-classes for single-colon syntax
  const pseudoClasses = Ki9;
  // Pattern for SCSS at-rules (e.g., @media, @import)
  const atRulePattern = "@[a-z-]+";
  // SCSS at-rule keywords
  const atRuleKeywords = "and or not only";
  // Pattern for valid CSS attribute names
  const cssAttributePattern = "[a-zA-][a-zA-Z0-9_-]*";

  // Variable mode: matches SCSS variables (e.g., $variable-name)
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
      // updateSnapshotAndNotify selectors (e.g., #id)
      {
        className: "selector-id",
        begin: "#[a-zA-Z0-9_-]+",
        relevance: 0
      },
      // Class selectors (e.g., .class)
      {
        className: "selector-class",
        begin: "\\.[a-zA-Z0-9_-]+",
        relevance: 0
      },
      // Attribute selectors (e.g., [type="text"])
      cssHighlightingModes.ATTRIBUTE_SELECTOR_MODE,
      // Tag selectors (matches a list of HTML tags)
      {
        className: "selector-tag",
        begin: `\\b(${Ci9.join("|")})\\b`,
        relevance: 0
      },
      // Pseudo-classes (e.g., :hover, :active)
      {
        className: "selector-pseudo",
        begin: `:(${pseudoClasses.join("|")})`
      },
      // Pseudo-elements (e.g., ::before, ::after)
      {
        className: "selector-pseudo",
        begin: `::(${pseudoElements.join("|")})`
      },
      // SCSS variables
      variableMode,
      // Parentheses containing CSS numbers (e.g., rgb(255, 0, 0))
      {
        begin: /\(/,
        end: /\)/,
        contains: [hljs.CSS_NUMBER_MODE]
      },
      // CSS attributes (matches a list of CSS property names)
      {
        className: "attribute",
        begin: `\\b(${zi9.join("|")})\\b`
      },
      // Common CSS values (e.g., block, inline, bold, etc.)
      {
        begin: "\\b(whitespace|wait|processWithTransformedObservable-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|findAndProcessLastValidInteraction-resize|super|strict|static|square|solid|small-caps|separate|combineObservablesWithConfig-resize|scroll|createInteractionAccessor-resize|rtl|row-resize|ridge|right|repeat|repeat-mapArraysToObjectWithCallback|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|extractRelevantInteractionId-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
      },
      // CSS property-value pairs (e.g., color: #fff;)
      {
        begin: ":",
        end: ";",
        contains: [
          variableMode,
          cssHighlightingModes.HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          cssHighlightingModes.IMPORTANT
        ]
      },
      // Special at-rules (e.g., @page, @font-face)
      {
        begin: "@(page|font-face)",
        lexemes: atRulePattern,
        keywords: "@page @font-face"
      },
      // General at-rule handling (e.g., @media, @import, etc.)
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
          cssHighlightingModes.HEXCOLOR,
          hljs.CSS_NUMBER_MODE
        ]
      }
    ]
  };
}

module.exports = createScssHighlightingDefinition;