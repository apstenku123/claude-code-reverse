/**
 * Generates a syntax highlighting definition object for CSS, suitable for use in a syntax highlighter.
 *
 * @param {object} hljs - The highlight.js core object, providing language modes and helpers.
 * @returns {object} CSS language definition for syntax highlighting.
 */
function createCssHighlightDefinition(hljs) {
  // Get the base CSS configuration from a helper (likely includes attribute selectors, colors, etc.)
  const cssConfig = getCssHighlightModes(hljs);

  // Built-in function highlighting (e.g., url(), rgb(), etc.)
  const builtInFunction = {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  };

  // Vendor-prefixed property highlighting (e.g., -webkit-, -moz-, etc.)
  const vendorPrefix = {
    begin: /-(webkit|moz|ms|processSubLanguageHighlighting)-(?=[a-z])/ // Matches vendor prefixes at the start of property names
  };

  // CSS media query keywords
  const mediaQueryKeywords = "and or not only";

  // At-rule regex (e.g., @media, @import, etc.)
  const atRulePattern = /@-?\w[\w]*(-\w+)*/;

  // CSS identifier pattern (for classes, ids, etc.)
  const cssIdentifier = "[a-zA-][a-zA-Z0-9_-]*";

  // String modes (single and double quotes)
  const stringModes = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];

  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/, // Disallow =, |, ', $
    keywords: {
      keyframePosition: "from to"
    },
    classNameAliases: {
      keyframePosition: "selector-tag"
    },
    contains: [
      // Block comments
      hljs.C_BLOCK_COMMENT_MODE,
      // Vendor prefixes
      vendorPrefix,
      // Numbers (e.g., 10px, 1.5em)
      hljs.CSS_NUMBER_MODE,
      // updateSnapshotAndNotify selectors (e.g., #main)
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      // Class selectors (e.g., .container)
      {
        className: "selector-class",
        begin: "\\." + cssIdentifier,
        relevance: 0
      },
      // Attribute selectors (e.g., [type="text"])
      cssConfig.ATTRIBUTE_SELECTOR_MODE,
      // Pseudo selectors (e.g., :hover, ::before)
      {
        className: "selector-pseudo",
        variants: [
          {
            begin: ":(" + iu9.join("|") + ")"
          },
          {
            begin: "::(" + nu9.join("|") + ")"
          }
        ]
      },
      // Attribute names (e.g., color, background)
      {
        className: "attribute",
        begin: "\\b(" + au9.join("|") + ")\\b"
      },
      // Property values (e.g., color: red;)
      {
        begin: ":",
        end: "[;}]",
        contains: [
          cssConfig.HEXCOLOR,
          cssConfig.IMPORTANT,
          hljs.CSS_NUMBER_MODE,
          ...stringModes,
          // url() and data-uri() functions
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            keywords: {
              built_in: "url data-uri"
            },
            contains: [
              {
                className: "string",
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          builtInFunction
        ]
      },
      // At-rules (e.g., @media, @import)
      {
        begin: ru9(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        contains: [
          // At-rule keyword (e.g., @media)
          {
            className: "keyword",
            begin: atRulePattern
          },
          // Media query expressions (e.g., screen and (max-width: 600px))
          {
            begin: /\\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: mediaQueryKeywords,
              attribute: lu9.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...stringModes,
              hljs.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      // Tag selectors (e.g., div, span, h1)
      {
        className: "selector-tag",
        begin: "\\b(" + cu9.join("|") + ")\\b"
      }
    ]
  };
}

module.exports = createCssHighlightDefinition;
