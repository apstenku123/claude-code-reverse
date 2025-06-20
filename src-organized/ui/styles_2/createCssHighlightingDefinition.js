/**
 * Generates a syntax highlighting definition object for CSS, suitable for use with a syntax highlighter like highlight.js.
 * This function defines the rules for recognizing CSS syntax elements such as selectors, properties, values, at-rules, and more.
 *
 * @param {object} hljs - The highlight.js library instance, providing common modes and utilities.
 * @returns {object} CSS highlighting definition object for highlight.js.
 */
function createCssHighlightingDefinition(hljs) {
  // Get additional CSS modes and helpers from a utility function
  const cssModes = getCssHighlightModes(hljs);

  // Mode for built-in CSS functions (e.g., rgb(), linear-gradient())
  const builtInFunctionMode = {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  };

  // Mode for vendor-prefixed properties (e.g., -webkit-, -moz-)
  const vendorPrefixMode = {
    begin: /-(webkit|moz|ms|processSubLanguageHighlighting)-(?=[a-z])/
  };

  // List of CSS media query keywords
  const mediaQueryKeywords = "and or not only";

  // Regex for matching at-rules (e.g., @media, @keyframes)
  const atRuleRegex = /@-?\w[\w]*(-\w+)*/;

  // Regex for matching CSS identifiers (e.g., property names, class names)
  const cssIdentifier = "[a-zA-][a-zA-Z0-9_-]*";

  // String modes for single and double quoted strings
  const stringModes = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];

  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/, // Illegal characters in CSS outside of strings
    keywords: {
      keyframePosition: "from to"
    },
    classNameAliases: {
      keyframePosition: "selector-tag"
    },
    contains: [
      // Block comments (/* ... */)
      hljs.C_BLOCK_COMMENT_MODE,
      // Vendor prefixes
      vendorPrefixMode,
      // Numbers and units (e.g., 10px, 1.5em)
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
      // Attribute selectors ([type="text"])
      cssModes.ATTRIBUTE_SELECTOR_MODE,
      // Pseudo selectors (:hover, ::before)
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
      // CSS property names (e.g., color, background)
      {
        className: "attribute",
        begin: "\\b(" + au9.join("|") + ")\\b"
      },
      // CSS property value blocks (e.g., : value;)
      {
        begin: ":",
        end: "[;}]",
        contains: [
          cssModes.HEXCOLOR,
          cssModes.IMPORTANT,
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
          builtInFunctionMode
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
            begin: atRuleRegex
          },
          // Media query expressions (e.g., (min-width: 600px))
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

module.exports = createCssHighlightingDefinition;
