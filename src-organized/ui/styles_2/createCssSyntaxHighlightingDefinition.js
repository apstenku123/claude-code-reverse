/**
 * Generates a syntax highlighting definition object for CSS, suitable for use with a syntax highlighter.
 *
 * @param {object} hljs - The highlight.js core object, providing string modes and helpers.
 * @returns {object} a syntax highlighting definition for CSS.
 */
function createCssSyntaxHighlightingDefinition(hljs) {
  // Generate CSS-specific highlight modes (e.g., !important, hex colors, attribute selectors)
  const cssHighlightModes = createCssHighlightModes(hljs);

  // Built-in function highlighting (e.g., url(), rgb())
  const builtInFunctionMode = {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  };

  // Vendor-prefixed property highlighting (e.g., -webkit-, -moz-)
  const vendorPrefixMode = {
    begin: /-(webkit|moz|ms|processSubLanguageHighlighting)-(?=[a-z])/ // Matches vendor prefixes
  };

  // Media query keywords
  const mediaQueryKeywords = "and or not only";

  // At-rule regex (e.g., @media, @import)
  const atRuleRegex = /@-?\w[\w]*(-\w+)*/;

  // CSS identifier regex (for class/updateSnapshotAndNotify selectors)
  const cssIdentifier = "[a-zA-][a-zA-Z0-9_-]*";

  // String modes (single and double quoted)
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
      // Numeric values (e.g., 10px, 1.5em)
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
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      // Pseudo selectors (e.g., :hover, ::before)
      {
        className: "selector-pseudo",
        variants: [
          {
            begin: ":(" + iu9.join("|") + ")" // Single colon pseudo-classes
          },
          {
            begin: "::(" + nu9.join("|") + ")" // Double colon pseudo-elements
          }
        ]
      },
      // Attribute names (e.g., color, background)
      {
        className: "attribute",
        begin: "\\b(" + au9.join("|") + ")\\b"
      },
      // Property value blocks (e.g., color: red;)
      {
        begin: ":",
        end: "[;}]",
        contains: [
          cssHighlightModes.HEXCOLOR, // Hex color values
          cssHighlightModes.IMPORTANT, // !important
          hljs.CSS_NUMBER_MODE, // Numeric values
          ...stringModes, // Strings
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
          builtInFunctionMode // Built-in functions
        ]
      },
      // At-rules (e.g., @media, @import)
      {
        begin: ru9(/@/), // ru9 is a helper for regex construction
        end: "[{;]",
        relevance: 0,
        illegal: /:/, // Disallow colon in at-rule prelude
        contains: [
          {
            className: "keyword",
            begin: atRuleRegex // Match @media, @import, etc.
          },
          {
            begin: /\\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: mediaQueryKeywords,
              attribute: lu9.join(" ") // Media feature attributes
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

module.exports = createCssSyntaxHighlightingDefinition;
