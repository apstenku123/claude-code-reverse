/**
 * Returns a syntax highlighting definition object for CSS, suitable for use with a syntax highlighter.
 * This includes rules for selectors, properties, values, at-rules, comments, numbers, strings, and more.
 *
 * @param {object} hljs - The highlight.js instance or a similar object providing string modes and number modes.
 * @returns {object} CSS syntax highlighting definition object.
 */
function getCssSyntaxHighlightingDefinition(hljs) {
  // Retrieve CSS-specific highlight modes (e.g., !important, hex colors, attribute selectors)
  const cssHighlightModes = getCssHighlightModes(hljs);

  // Built-in function highlighting (e.g., url(), rgba(), etc.)
  const builtInFunctionMode = {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  };

  // Vendor prefix highlighting (e.g., -webkit-, -moz-, etc.)
  const vendorPrefixMode = {
    begin: /-(webkit|moz|ms|processSubLanguageHighlighting)-(?=[a-z])/ // matches vendor prefixes
  };

  // Logical operators in media queries
  const mediaQueryOperators = "and or not only";

  // At-rule regex (e.g., @media, @import, etc.)
  const atRuleRegex = /@-?\w[\w]*(-\w+)*/;

  // CSS identifier regex (for classes, IDs, etc.)
  const cssIdentifier = "[a-zA-][a-zA-Z0-9_-]*";

  // String modes (single and double quotes)
  const stringModes = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];

  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/, // illegal characters in CSS selectors
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
      // Attribute selectors ([type="text"])
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      // Pseudo selectors (:hover, ::before, etc.)
      {
        className: "selector-pseudo",
        variants: [
          {
            // Single colon pseudo-classes
            begin: ":(" + pseudoClasses.join("|") + ")"
          },
          {
            // Double colon pseudo-elements
            begin: "::(" + pseudoElements.join("|") + ")"
          }
        ]
      },
      // CSS property names (e.g., color, background)
      {
        className: "attribute",
        begin: "\\b(" + cssProperties.join("|") + ")\\b"
      },
      // CSS property value blocks (e.g., color: red;)
      {
        begin: ":",
        end: "[;}]",
        contains: [
          cssHighlightModes.HEXCOLOR,
          cssHighlightModes.IMPORTANT,
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
        begin: escapeAtRuleRegex(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        contains: [
          {
            className: "keyword",
            begin: atRuleRegex
          },
          {
            begin: /\\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: mediaQueryOperators,
              attribute: mediaQueryAttributes.join(" ")
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
        begin: "\\b(" + tagNames.join("|") + ")\\b"
      }
    ]
  };
}

module.exports = getCssSyntaxHighlightingDefinition;
